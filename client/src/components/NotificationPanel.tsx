import { TrendingUp, TrendingDown, Info, AlertTriangle, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { AppNotification } from '../types';

const ICONS = {
  gain: <TrendingUp className="w-4 h-4 text-green-400" />,
  loss: <TrendingDown className="w-4 h-4 text-red-400" />,
  info: <Info className="w-4 h-4 text-blue-400" />,
  alert: <AlertTriangle className="w-4 h-4 text-yellow-400" />
};

const KIND_BG = {
  gain: 'border-green-500/20 bg-green-900/10',
  loss: 'border-red-500/20 bg-red-900/10',
  info: 'border-blue-500/20 bg-blue-900/10',
  alert: 'border-yellow-500/20 bg-yellow-900/10'
};

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}min`;
  return `${Math.floor(s / 3600)}h`;
}

function NotifItem({ n }: { n: AppNotification }) {
  return (
    <div className={`flex gap-3 p-3 rounded-lg border ${KIND_BG[n.kind]}`}>
      <div className="mt-0.5 shrink-0">{ICONS[n.kind]}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-white leading-tight">{n.title}</p>
          <span className="text-[11px] text-gray-500 shrink-0">{timeAgo(n.timestamp)}</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{n.message}</p>
      </div>
    </div>
  );
}

interface Props {
  onClose: () => void;
}

export default function NotificationPanel({ onClose }: Props) {
  const { notifications, clearNotifications } = useStore();

  return (
    <div className="w-80 card shadow-2xl shadow-black/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h3 className="font-semibold text-white text-sm">Notifications</h3>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Effacer
            </button>
          )}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-600">
            <Info className="w-8 h-8 mb-2 opacity-40" />
            <p className="text-sm">Aucune notification</p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {notifications.map(n => (
              <NotifItem key={n.id} n={n} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
