import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useStore } from '../store/useStore';
import type { Portfolio, Ticker, PricePoint } from '../types';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string | undefined;

let socket: Socket | null = null;

export function hasServer(): boolean {
  return Boolean(SERVER_URL);
}

export function getSocket(): Socket {
  if (!socket) {
    const url = SERVER_URL || 'http://localhost:3001';
    socket = io(url, {
      transports: ['websocket', 'polling'],
      autoConnect: false
    });
  }
  return socket;
}

export function connectSocket() {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
}

export function useSocketEvents() {
  const mounted = useRef(false);
  const isDemo = useStore(s => s.isDemo);
  const { setView, setPortfolio, setTicker, setPriceHistory, setProcessId, addNotification, reset } =
    useStore();

  useEffect(() => {
    // Demo mode uses client-side simulation — no socket needed
    if (isDemo) return;
    if (mounted.current) return;
    mounted.current = true;

    const s = getSocket();

    s.on('authenticated', () => {
      setView('dashboard');
      addNotification({
        kind: 'info',
        title: 'Connecté',
        message: 'Connexion à Trade Republic établie.'
      });
    });

    s.on('portfolio_update', (p: Portfolio) => setPortfolio(p));
    s.on('ticker_update', (t: Ticker) => setTicker(t));

    s.on('price_history', ({ instrumentId, history }: { instrumentId: string; history: PricePoint[] }) => {
      setPriceHistory(instrumentId, history);
    });

    s.on('otp_required', ({ processId }: { processId: string }) => {
      setProcessId(processId);
      setView('otp');
    });

    s.on('tr_error', ({ message }: { message: string }) => {
      addNotification({ kind: 'alert', title: 'Erreur Trade Republic', message });
    });

    s.on('tr_disconnected', () => {
      addNotification({ kind: 'alert', title: 'Déconnecté', message: 'Connexion Trade Republic perdue.' });
    });

    s.on('disconnect', () => {
      addNotification({ kind: 'alert', title: 'Serveur hors ligne', message: 'Connexion au serveur perdue.' });
    });

    return () => { /* keep socket alive across renders */ };
  }, [isDemo]);
}

export function useSocket() {
  useSocketEvents();
}
