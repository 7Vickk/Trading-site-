import { create } from 'zustand';
import type { Portfolio, Ticker, AppNotification, AppView, PricePoint } from '../types';

interface Store {
  // Auth / navigation
  view: AppView;
  isDemo: boolean;
  processId: string;
  phoneNumber: string;
  setView: (v: AppView) => void;
  setDemo: (d: boolean) => void;
  setProcessId: (id: string) => void;
  setPhoneNumber: (n: string) => void;

  // Portfolio
  portfolio: Portfolio | null;
  setPortfolio: (p: Portfolio) => void;

  // Tickers: instrumentId → Ticker
  tickers: Record<string, Ticker>;
  setTicker: (t: Ticker) => void;

  // Price history: instrumentId → PricePoint[]
  priceHistory: Record<string, PricePoint[]>;
  setPriceHistory: (instrumentId: string, history: PricePoint[]) => void;
  appendPricePoint: (instrumentId: string, point: PricePoint) => void;

  // Selected position for chart
  selectedInstrumentId: string | null;
  setSelectedInstrumentId: (id: string | null) => void;

  // Notifications
  notifications: AppNotification[];
  addNotification: (n: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markAllRead: () => void;
  clearNotifications: () => void;

  // Reset
  reset: () => void;
}

const initialState = {
  view: 'login' as AppView,
  isDemo: false,
  processId: '',
  phoneNumber: '',
  portfolio: null,
  tickers: {},
  priceHistory: {},
  selectedInstrumentId: null,
  notifications: []
};

export const useStore = create<Store>((set, get) => ({
  ...initialState,

  setView: (view) => set({ view }),
  setDemo: (isDemo) => set({ isDemo }),
  setProcessId: (processId) => set({ processId }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),

  setPortfolio: (portfolio) => {
    const prev = get().portfolio;
    set({ portfolio });

    // Generate notifications for significant changes
    if (prev && portfolio) {
      const prevValue = prev.portfolioValue.value;
      const newValue = portfolio.portfolioValue.value;
      const changePct = ((newValue - prevValue) / prevValue) * 100;

      if (Math.abs(changePct) >= 0.5) {
        get().addNotification({
          kind: changePct > 0 ? 'gain' : 'loss',
          title: changePct > 0 ? 'Portefeuille en hausse' : 'Portefeuille en baisse',
          message: `${changePct > 0 ? '+' : ''}${changePct.toFixed(2)}% (${newValue > prevValue ? '+' : ''}${(newValue - prevValue).toFixed(2)} €)`
        });
      }
    }
  },

  setTicker: (ticker) => {
    const prev = get().tickers[ticker.instrumentId];
    set((state) => ({
      tickers: { ...state.tickers, [ticker.instrumentId]: ticker }
    }));

    // Append to price history
    if (ticker.last) {
      get().appendPricePoint(ticker.instrumentId, {
        price: ticker.last.price,
        time: ticker.last.time
      });
    }

    // Notify on large moves (>1% vs open)
    if (prev && ticker.last && ticker.open) {
      const prevPrice = prev.last.price;
      const newPrice = ticker.last.price;
      const changePct = ((newPrice - prevPrice) / prevPrice) * 100;
      const vsOpen = ((newPrice - ticker.open.price) / ticker.open.price) * 100;

      if (Math.abs(vsOpen) >= 2 && Math.abs(changePct) >= 0.3) {
        const portfolio = get().portfolio;
        const pos = portfolio?.positions.find(p => p.instrumentId === ticker.instrumentId);
        const name = pos?.instrument?.shortName ?? ticker.instrumentId;

        get().addNotification({
          kind: vsOpen > 0 ? 'gain' : 'loss',
          title: `${name} ${vsOpen > 0 ? '▲' : '▼'} ${Math.abs(vsOpen).toFixed(2)}%`,
          message: `Prix actuel: ${newPrice.toFixed(2)} € (${vsOpen > 0 ? '+' : ''}${vsOpen.toFixed(2)}% vs ouverture)`
        });
      }
    }
  },

  setPriceHistory: (instrumentId, history) =>
    set((state) => ({
      priceHistory: { ...state.priceHistory, [instrumentId]: history }
    })),

  appendPricePoint: (instrumentId, point) =>
    set((state) => {
      const existing = state.priceHistory[instrumentId] ?? [];
      const updated = [...existing, point].slice(-200);
      return { priceHistory: { ...state.priceHistory, [instrumentId]: updated } };
    }),

  setSelectedInstrumentId: (id) => set({ selectedInstrumentId: id }),

  addNotification: (n) =>
    set((state) => ({
      notifications: [
        {
          ...n,
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          timestamp: Date.now(),
          read: false
        },
        ...state.notifications
      ].slice(0, 50)
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true }))
    })),

  clearNotifications: () => set({ notifications: [] }),

  reset: () => set(initialState)
}));
