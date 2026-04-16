import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useStore } from '../store/useStore';
import type { Portfolio, Ticker, PricePoint } from '../types';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SERVER_URL, { transports: ['websocket', 'polling'] });
  }
  return socket;
}

export function useSocketEvents() {
  const mounted = useRef(false);
  const {
    setView,
    setPortfolio,
    setTicker,
    setPriceHistory,
    setProcessId,
    addNotification,
    reset
  } = useStore();

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const s = getSocket();

    s.on('authenticated', () => {
      setView('dashboard');
      addNotification({
        kind: 'info',
        title: 'Connecté',
        message: 'Connexion à Trade Republic établie avec succès.'
      });
    });

    s.on('portfolio_update', (portfolio: Portfolio) => {
      setPortfolio(portfolio);
    });

    s.on('ticker_update', (ticker: Ticker) => {
      setTicker(ticker);
    });

    s.on('price_history', ({ instrumentId, history }: { instrumentId: string; history: PricePoint[] }) => {
      setPriceHistory(instrumentId, history);
    });

    s.on('otp_required', ({ processId }: { processId: string }) => {
      setProcessId(processId);
      setView('otp');
    });

    s.on('tr_error', ({ message }: { message: string }) => {
      addNotification({ kind: 'alert', title: 'Erreur', message });
    });

    s.on('tr_disconnected', () => {
      addNotification({
        kind: 'alert',
        title: 'Déconnecté',
        message: 'La connexion avec Trade Republic a été interrompue.'
      });
    });

    s.on('disconnect', () => {
      addNotification({
        kind: 'alert',
        title: 'Serveur hors ligne',
        message: 'Connexion au serveur perdue.'
      });
    });

    return () => {
      // keep socket alive across renders
    };
  }, []);
}

export function useSocket() {
  useSocketEvents();
  return getSocket();
}
