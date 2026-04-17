import type { Position } from '../types';

export const DEMO_POSITIONS: Position[] = [
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

export const BASE_PRICES: Record<string, number> = {
  'US0378331005.XNAS': 189.40,
  'US88160R1014.XNAS': 245.80,
  'US67066G1040.XNAS': 875.60,
  'DE0007164600.XETR': 125.70,
  'IE00B4L5Y983.XETR': 89.30
};

export const PREV_CLOSE: Record<string, number> = {
  'US0378331005.XNAS': 187.20,
  'US88160R1014.XNAS': 238.40,
  'US67066G1040.XNAS': 862.10,
  'DE0007164600.XETR': 124.50,
  'IE00B4L5Y983.XETR': 88.90
};

export function randomPrice(base: number, volatility = 0.002): number {
  return parseFloat((base * (1 + (Math.random() - 0.5) * volatility)).toFixed(2));
}

export function generateHistory(instrumentId: string, points = 60): { time: number; price: number }[] {
  const base = PREV_CLOSE[instrumentId] ?? 100;
  const history: { time: number; price: number }[] = [];
  let price = base;
  const now = Date.now();
  const interval = 5 * 60 * 1000;

  for (let i = points; i >= 0; i--) {
    price = randomPrice(price, 0.004);
    history.push({ time: now - i * interval, price });
  }
  return history;
}
