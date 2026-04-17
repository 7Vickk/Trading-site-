require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const TradeRepublicClient = require('./tradeRepublic');
const demo = require('./demoData');

const app = express();
const httpServer = createServer(app);

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const io = new Server(httpServer, {
  cors: { origin: CLIENT_URL, methods: ['GET', 'POST'] }
});

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: Date.now() }));

// ─── Per-socket state ────────────────────────────────────────────────────────
const sessions = new Map(); // socketId → { tr, intervals, tickerSubs }

function clearSession(socketId) {
  const s = sessions.get(socketId);
  if (!s) return;
  if (s.tr) s.tr.close();
  for (const iv of s.intervals) clearInterval(iv);
  sessions.delete(socketId);
}

// ─── Demo mode helpers ────────────────────────────────────────────────────────
function startDemoMode(socket) {
  const intervals = [];

  // Send initial portfolio
  const prices = demo.getCurrentPrices();
  const portfolio = demo.buildPortfolio(prices);
  socket.emit('portfolio_update', portfolio);

  // Send initial tickers
  for (const [id, price] of Object.entries(prices)) {
    socket.emit('ticker_update', demo.buildTicker(id, price));
  }

  // Send price history for each position
  for (const pos of demo.DEMO_POSITIONS) {
    socket.emit('price_history', {
      instrumentId: pos.instrumentId,
      history: demo.generatePriceHistory(pos.instrumentId)
    });
  }

  // Live price simulation every 3s
  const priceInterval = setInterval(() => {
    const newPrices = demo.getCurrentPrices();
    const updatedPortfolio = demo.buildPortfolio(newPrices);
    socket.emit('portfolio_update', updatedPortfolio);

    for (const [id, price] of Object.entries(newPrices)) {
      socket.emit('ticker_update', demo.buildTicker(id, price));
    }
  }, 3000);

  intervals.push(priceInterval);
  sessions.set(socket.id, { tr: null, intervals, tickerSubs: new Map() });
}

// ─── Real TR mode helpers ─────────────────────────────────────────────────────
function attachTRListeners(socket, tr) {
  const tickerSubs = new Map();

  const portfolioSub = tr.subscribePortfolio((portfolio) => {
    socket.emit('portfolio_update', portfolio);

    // Auto-subscribe tickers for all positions
    if (portfolio.positions) {
      for (const pos of portfolio.positions) {
        if (!tickerSubs.has(pos.instrumentId)) {
          const subId = tr.subscribeTicker(pos.instrumentId, (ticker) => {
            socket.emit('ticker_update', ticker);
          });
          tickerSubs.set(pos.instrumentId, subId);
        }
      }
    }
  });

  sessions.get(socket.id).portfolioSub = portfolioSub;
  sessions.get(socket.id).tickerSubs = tickerSubs;
}

// ─── Socket.io events ─────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`[+] Connected: ${socket.id}`);

  // ── Demo mode ──────────────────────────────────────────────────────────────
  socket.on('demo_login', () => {
    clearSession(socket.id);
    sessions.set(socket.id, { tr: null, intervals: [], tickerSubs: new Map() });
    startDemoMode(socket);
    socket.emit('authenticated', { demo: true });
  });

  // ── Real Trade Republic login ──────────────────────────────────────────────
  socket.on('login', async ({ phoneNumber, pin }) => {
    clearSession(socket.id);
    sessions.set(socket.id, { tr: null, intervals: [], tickerSubs: new Map() });

    try {
      const tr = new TradeRepublicClient();
      sessions.get(socket.id).tr = tr;

      tr.on('error', (err) => {
        socket.emit('tr_error', { message: err.message });
      });

      tr.on('disconnected', () => {
        socket.emit('tr_disconnected');
      });

      await tr.connect();
      const processId = await tr.login(phoneNumber, pin);
      socket.emit('otp_required', { processId });
    } catch (err) {
      socket.emit('tr_error', { message: err.message });
    }
  });

  // ── OTP verification ───────────────────────────────────────────────────────
  socket.on('verify_otp', async ({ processId, tan }) => {
    const session = sessions.get(socket.id);
    if (!session || !session.tr) {
      socket.emit('tr_error', { message: 'No active session. Please log in again.' });
      return;
    }

    try {
      await session.tr.verifyOTP(processId, tan);
      socket.emit('authenticated', { demo: false });
      attachTRListeners(socket, session.tr);
    } catch (err) {
      socket.emit('tr_error', { message: err.message });
    }
  });

  // ── Subscribe to additional ticker ────────────────────────────────────────
  socket.on('subscribe_ticker', ({ instrumentId }) => {
    const session = sessions.get(socket.id);
    if (!session) return;

    if (session.tr) {
      if (!session.tickerSubs.has(instrumentId)) {
        const subId = session.tr.subscribeTicker(instrumentId, (ticker) => {
          socket.emit('ticker_update', ticker);
        });
        session.tickerSubs.set(instrumentId, subId);
      }
    }
  });

  // ── Request price history ─────────────────────────────────────────────────
  socket.on('request_history', ({ instrumentId }) => {
    socket.emit('price_history', {
      instrumentId,
      history: demo.generatePriceHistory(instrumentId)
    });
  });

  // ── Cleanup on disconnect ─────────────────────────────────────────────────
  socket.on('disconnect', () => {
    clearSession(socket.id);
    console.log(`[-] Disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
