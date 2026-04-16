import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Info, AlertTriangle, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { AppNotification } from '../types';

const ICONS = {
  gain: <TrendingUp className="w-4 h-4 text-green-400 shrink-0" />,
  loss: <TrendingDown className="w-4 h-4 text-red-400 shrink-0" />,
  info: <Info className="w-4 h-4 text-blue-400 shrink-0" />,
  alert: <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
};

const KIND_BORDER = {
  gain: 'border-l-green-500',
  loss: 'border-l-red-500',
  info: 'border-l-blue-500',
  alert: 'border-l-yellow-500'
};

interface ToastState {
  notification: AppNotification;
  exiting: boolean;
}

export default function NotificationToasts() {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const notifications = useStore(s => s.notifications);
  const prevLen = useRef(0);

  useEffect(() => {
    if (notifications.length > prevLen.current) {
      const newest = notifications[0];
      if (newest) {
        setToasts(prev => [{ notification: newest, exiting: false }, ...prev].slice(0, 4));
      }
    }
    prevLen.current = notifications.length;
  }, [notifications]);

  function dismiss(id: string) {
    setToasts(prev => prev.map(t => t.notification.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.notification.id !== id));
    }, 300);
  }

  // Auto-dismiss after 5s
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      const oldest = toasts[toasts.length - 1];
      if (oldest) dismiss(oldest.notification.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80 pointer-events-none">
      {toasts.map(({ notification: n, exiting }) => (
        <div
          key={n.id}
          className={`
            pointer-events-auto card border-l-4 ${KIND_BORDER[n.kind]}
            shadow-xl shadow-black/40 px-4 py-3 flex items-start gap-3
            ${exiting ? 'notification-exit' : 'notification-enter'}
          `}
        >
          {ICONS[n.kind]}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white leading-tight">{n.title}</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{n.message}</p>
          </div>
          <button
            onClick={() => dismiss(n.id)}
            className="text-gray-600 hover:text-gray-300 transition-colors shrink-0 -mt-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
