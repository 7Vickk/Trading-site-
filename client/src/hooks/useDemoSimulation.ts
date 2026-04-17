import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import {
  DEMO_POSITIONS,
  BASE_PRICES,
  PREV_CLOSE,
  randomPrice,
  generateHistory
} from '../data/demoPositions';
import type { Portfolio, Ticker } from '../types';

function buildPortfolio(prices: Record<string, number>): Portfolio {
  let total = 0;
  let prevTotal = 0;

  const positions = DEMO_POSITIONS.map(pos => {
    const price = prices[pos.instrumentId];
    const prev = PREV_CLOSE[pos.instrumentId];
    const posValue = price * pos.netSize;
    const prevValue = prev * pos.netSize;
    total += posValue;
    prevTotal += prevValue;

    return {
      ...pos,
      currentPrice: price,
      positionValue: posValue,
      dailyPnl: posValue - prevValue,
      totalPnl: posValue - pos.averageBuyIn * pos.netSize
    };
  });

  return {
    portfolioValue: { value: parseFloat(total.toFixed(2)) },
    previousCloseValue: { value: parseFloat(prevTotal.toFixed(2)) },
    positions
  };
}

function buildTicker(instrumentId: string, price: number): Ticker {
  const prev = PREV_CLOSE[instrumentId];
  const open = randomPrice(prev, 0.005);
  const high = parseFloat((Math.max(open, price) * (1 + Math.random() * 0.002)).toFixed(2));
  const low = parseFloat((Math.min(open, price) * (1 - Math.random() * 0.002)).toFixed(2));

  return {
    instrumentId,
    last: { price, time: Date.now() },
    open: { price: open },
    high: { price: high },
    low: { price: low },
    pre: { price: prev }
  };
}

export function useDemoSimulation(active: boolean) {
  const { setPortfolio, setTicker, setPriceHistory } = useStore();
  const pricesRef = useRef<Record<string, number>>({ ...BASE_PRICES });
  const initialised = useRef(false);

  useEffect(() => {
    if (!active) return;
    if (initialised.current) return;
    initialised.current = true;

    // Seed initial data
    const prices = pricesRef.current;
    setPortfolio(buildPortfolio(prices));
    for (const [id, price] of Object.entries(prices)) {
      setTicker(buildTicker(id, price));
      setPriceHistory(id, generateHistory(id));
    }

    // Live simulation every 3 s
    const iv = setInterval(() => {
      const next: Record<string, number> = {};
      for (const [id, price] of Object.entries(pricesRef.current)) {
        next[id] = randomPrice(price, 0.003);
      }
      pricesRef.current = next;

      setPortfolio(buildPortfolio(next));
      for (const [id, price] of Object.entries(next)) {
        setTicker(buildTicker(id, price));
      }
    }, 3000);

    return () => {
      clearInterval(iv);
      initialised.current = false;
    };
  }, [active]);
}
