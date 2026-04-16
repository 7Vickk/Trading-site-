const WebSocket = require('ws');
const EventEmitter = require('events');

const TR_WS_URL = 'wss://api.traderepublic.com/';
const CLIENT_VERSION = '1.0.6177';

class TradeRepublicClient extends EventEmitter {
  constructor() {
    super();
    this.ws = null;
    this.subId = 0;
    this.subscriptions = new Map();
    this.sessionToken = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(TR_WS_URL, {
        headers: {
          'Origin': 'https://app.traderepublic.com',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const timeout = setTimeout(() => reject(new Error('Connection timeout')), 15000);

      this.ws.on('open', () => {
        const connectMsg = `connect ${CLIENT_VERSION} ${JSON.stringify({
          clientId: 'app.traderepublic.com',
          clientVersion: '1.0.6177',
          platformId: 'webApp',
          locale: 'fr'
        })}`;
        this.ws.send(connectMsg);
      });

      this.ws.on('message', (data) => {
        const msg = data.toString();

        if (msg === 'connected') {
          clearTimeout(timeout);
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.emit('connected');
          resolve();
          return;
        }

        this._handleMessage(msg);
      });

      this.ws.on('error', (err) => {
        clearTimeout(timeout);
        this.emit('error', err);
        reject(err);
      });

      this.ws.on('close', () => {
        this.isConnected = false;
        this.emit('disconnected');
      });
    });
  }

  _handleMessage(msg) {
    const spaceIdx = msg.indexOf(' ');
    if (spaceIdx === -1) return;

    const id = parseInt(msg.substring(0, spaceIdx));
    if (isNaN(id)) return;

    const rest = msg.substring(spaceIdx + 1);

    // Handle error responses
    if (rest.startsWith('E')) {
      this.emit(`error:${id}`, new Error(`Trade Republic error: ${rest}`));
      return;
    }

    try {
      const payload = JSON.parse(rest);
      const handler = this.subscriptions.get(id);
      if (handler) handler(null, payload);
      this.emit(`msg:${id}`, payload);
    } catch {
      const handler = this.subscriptions.get(id);
      if (handler) handler(null, { raw: rest });
    }
  }

  _send(id, type, params = {}) {
    const msg = `sub ${id} ${JSON.stringify({ type, ...params })}`;
    this.ws.send(msg);
  }

  _nextId() {
    return ++this.subId;
  }

  _subscribe(type, params, callback) {
    const id = this._nextId();
    this.subscriptions.set(id, callback);
    this._send(id, type, params);
    return id;
  }

  _unsubscribe(id) {
    this.subscriptions.delete(id);
    if (this.isConnected) {
      try { this.ws.send(`unsub ${id}`); } catch {}
    }
  }

  login(phoneNumber, pin) {
    return new Promise((resolve, reject) => {
      const id = this._nextId();
      const timeout = setTimeout(() => reject(new Error('Login timeout')), 30000);

      this.subscriptions.set(id, (err, data) => {
        clearTimeout(timeout);
        if (err) return reject(err);
        if (data && data.processId) {
          resolve(data.processId);
        } else if (data && data.errors) {
          reject(new Error('Invalid phone number or PIN'));
        } else {
          reject(new Error('Login failed'));
        }
      });

      this._send(id, 'login', { phoneNumber, pin });
    });
  }

  verifyOTP(processId, tan) {
    return new Promise((resolve, reject) => {
      const id = this._nextId();
      const timeout = setTimeout(() => reject(new Error('OTP timeout')), 30000);

      this.subscriptions.set(id, (err, data) => {
        clearTimeout(timeout);
        if (err) return reject(err);
        if (data && data.sessionToken) {
          this.sessionToken = data.sessionToken;
          resolve(data.sessionToken);
        } else {
          reject(new Error('Invalid OTP code'));
        }
      });

      this._send(id, 'processId', { processId, tan });
    });
  }

  subscribePortfolio(callback) {
    return this._subscribe('portfolio', {}, (err, data) => {
      if (!err) callback(data);
    });
  }

  subscribeTicker(instrumentId, callback) {
    return this._subscribe('ticker', { id: instrumentId }, (err, data) => {
      if (!err) callback({ instrumentId, ...data });
    });
  }

  subscribeInstrument(instrumentId, callback) {
    return this._subscribe('instrument', { id: instrumentId }, (err, data) => {
      if (!err) callback(data);
    });
  }

  subscribePortfolioHistory(period, callback) {
    return this._subscribe('portfolioAggregateHistory', { range: period }, (err, data) => {
      if (!err) callback(data);
    });
  }

  unsubscribeAll() {
    for (const id of this.subscriptions.keys()) {
      this._unsubscribe(id);
    }
  }

  close() {
    this.unsubscribeAll();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

module.exports = TradeRepublicClient;
