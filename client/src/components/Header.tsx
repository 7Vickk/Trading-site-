import { useState } from 'react';
import { TrendingUp, Bell, LogOut, Wifi, WifiOff } from 'lucide-react';
import { useStore } from '../store/useStore';
import NotificationPanel from './NotificationPanel';
import { getSocket } from '../hooks/useSocket';

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n);
}

export default function Header() {
  const [notifOpen, setNotifOpen] = useState(false);
  const { portfolio, notifications, isDemo, markAllRead, reset } = useStore();

  const unread = notifications.filter(n => !n.read).length;
  const totalValue = portfolio?.portfolioValue?.value ?? 0;
  const prevClose = portfolio?.previousCloseValue?.value ?? 0;
  const dailyChange = totalValue - prevClose;
  const dailyPct = prevClose > 0 ? (dailyChange / prevClose) * 100 : 0;
  const isPositive = dailyChange >= 0;

  function handleLogout() {
    getSocket().disconnect();
    reset();
  }

  function toggleNotif() {
    setNotifOpen(v => !v);
    if (!notifOpen) markAllRead();
  }

  return (
    <header className="bg-bg-secondary border-b border-gray-800/80 sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 shrink-0">
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-bold text-white text-lg hidden sm:block">TR Dashboard</span>
          {isDemo && (
            <span className="text-[10px] font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Démo
            </span>
          )}
        </div>

        {/* Portfolio value */}
        {portfolio && (
          <div className="text-center hidden md:block">
            <div className="text-xl font-bold text-white font-mono">{fmt(totalValue)}</div>
            <div className={`text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{fmt(dailyChange)} ({isPositive ? '+' : ''}{dailyPct.toFixed(2)}%) aujourd'hui
            </div>
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
            <span>Live</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotif}
              className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-bg-hover transition-colors text-gray-400 hover:text-white"
            >
              <Bell className="w-5 h-5" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </button>

            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 top-11 z-50">
                  <NotificationPanel onClose={() => setNotifOpen(false)} />
                </div>
              </>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-400"
            title="Se déconnecter"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
