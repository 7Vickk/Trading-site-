// Demo data simulating a Trade Republic portfolio
const DEMO_POSITIONS = [
  {
    instrumentId: 'US0378331005.XNAS',
    netSize: 12,
    averageBuyIn: 172.50,
    instrument: { name: 'Apple Inc.', shortName: 'AAPL', isin: 'US0378331005', type: 'stock' }
  },
  {
    instrumentId: 'US88160R1014.XNAS',
    netSize: 5,
    averageBuyIn: 218.30,
    instrument: { name: 'Tesla, Inc.', shortName: 'TSLA', isin: 'US88160R1014', type: 'stock' }
  },
  {
    instrumentId: 'US67066G1040.XNAS',
    netSize: 3,
    averageBuyIn: 495.20,
    instrument: { name: 'NVIDIA Corporation', shortName: 'NVDA', isin: 'US67066G1040', type: 'stock' }
  },
  {
    instrumentId: 'DE0007164600.XETR',
    netSize: 20,
    averageBuyIn: 118.40,
    instrument: { name: 'SAP SE', shortName: 'SAP', isin: 'DE0007164600', type: 'stock' }
  },
  {
    instrumentId: 'IE00B4L5Y983.XETR',
    netSize: 8,
    averageBuyIn: 82.15,
    instrument: { name: 'iShares Core MSCI World ETF', shortName: 'IWDA', isin: 'IE00B4L5Y983', type: 'etf' }
  }
];

const BASE_PRICES = {
  'US0378331005.XNAS': 189.40,
  'US88160R1014.XNAS': 245.80,
  'US67066G1040.XNAS': 875.60,
  'DE0007164600.XETR': 125.70,
  'IE00B4L5Y983.XETR': 89.30
};

const PREV_CLOSE = {
  'US0378331005.XNAS': 187.20,
  'US88160R1014.XNAS': 238.40,
  'US67066G1040.XNAS': 862.10,
  'DE0007164600.XETR': 124.50,
  'IE00B4L5Y983.XETR': 88.90
};

function getCurrentPrices() {
  const prices = {};
  for (const [id, base] of Object.entries(BASE_PRICES)) {
    const noise = (Math.random() - 0.5) * base * 0.002;
    prices[id] = parseFloat((base + noise).toFixed(2));
  }
  return prices;
}

function buildPortfolio(prices) {
  let totalValue = 0;
  let prevCloseTotal = 0;

  const positions = DEMO_POSITIONS.map((pos) => {
    const price = prices[pos.instrumentId];
    const posValue = price * pos.netSize;
    const prevPrice = PREV_CLOSE[pos.instrumentId];
    const prevValue = prevPrice * pos.netSize;
    totalValue += posValue;
    prevCloseTotal += prevValue;

    return {
      ...pos,
      currentPrice: price,
      positionValue: posValue,
      dailyPnl: posValue - prevValue,
      totalPnl: posValue - pos.averageBuyIn * pos.netSize
    };
  });

  return {
    portfolioValue: { value: parseFloat(totalValue.toFixed(2)) },
    previousCloseValue: { value: parseFloat(prevCloseTotal.toFixed(2)) },
    positions
  };
}

function buildTicker(instrumentId, price) {
  const prev = PREV_CLOSE[instrumentId];
  const open = parseFloat((prev * (1 + (Math.random() - 0.5) * 0.005)).toFixed(2));
  const high = parseFloat((Math.max(open, price) * (1 + Math.random() * 0.003)).toFixed(2));
  const low = parseFloat((Math.min(open, price) * (1 - Math.random() * 0.003)).toFixed(2));

  return {
    instrumentId,
    last: { price, time: Date.now() },
    open: { price: open },
    high: { price: high },
    low: { price: low },
    pre: { price: prev }
  };
}

function generatePriceHistory(instrumentId, points = 50) {
  const base = PREV_CLOSE[instrumentId] || 100;
  const history = [];
  let price = base;
  const now = Date.now();
  const interval = 5 * 60 * 1000; // 5 min

  for (let i = points; i >= 0; i--) {
    price = parseFloat((price * (1 + (Math.random() - 0.5) * 0.004)).toFixed(2));
    history.push({
      time: now - i * interval,
      price
    });
  }
  return history;
}

module.exports = {
  DEMO_POSITIONS,
  BASE_PRICES,
  PREV_CLOSE,
  getCurrentPrices,
  buildPortfolio,
  buildTicker,
  generatePriceHistory
};
