export interface Instrument {
  name: string;
  shortName: string;
  isin: string;
  type: 'stock' | 'etf' | 'crypto' | string;
}

export interface Position {
  instrumentId: string;
  netSize: number;
  averageBuyIn: number;
  instrument: Instrument;
  currentPrice?: number;
  positionValue?: number;
  dailyPnl?: number;
  totalPnl?: number;
}

export interface Portfolio {
  portfolioValue: { value: number };
  previousCloseValue: { value: number };
  positions: Position[];
}

export interface PricePoint {
  price: number;
  time: number;
}

export interface Ticker {
  instrumentId: string;
  last: { price: number; time: number };
  open: { price: number };
  high: { price: number };
  low: { price: number };
  pre: { price: number };
}

export type NotificationKind = 'gain' | 'loss' | 'info' | 'alert';

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export type AppView = 'login' | 'otp' | 'dashboard';
