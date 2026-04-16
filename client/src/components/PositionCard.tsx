import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Position } from '../types';

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n);
}

function fmtSign(n: number) {
  const abs = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(Math.abs(n));
  return `${n >= 0 ? '+' : '-'}${abs}`;
}

const TYPE_BADGE: Record<string, string> = {
  stock: 'bg-blue-900/30 text-blue-400 border-blue-500/20',
  etf: 'bg-purple-900/30 text-purple-400 border-purple-500/20',
  crypto: 'bg-orange-900/30 text-orange-400 border-orange-500/20'
};

interface Props {
  position: Position;
}

export default function PositionCard({ position }: Props) {
  const { tickers, selectedInstrumentId, setSelectedInstrumentId } = useStore();
  const ticker = tickers[position.instrumentId];
  const prevPriceRef = useRef<number | null>(null);
  const [flashClass, setFlashClass] = useState('');

  const currentPrice = ticker?.last?.price ?? position.currentPrice ?? position.averageBuyIn;
  const posValue = currentPrice * position.netSize;
  const totalPnl = posValue - position.averageBuyIn * position.netSize;
  const totalPnlPct = ((currentPrice - position.averageBuyIn) / position.averageBuyIn) * 100;
  const dailyPnl = ticker ? (ticker.last.price - ticker.pre.price) * position.netSize : (position.dailyPnl ?? 0);
  const dailyPct = ticker ? ((ticker.last.price - ticker.pre.price) / ticker.pre.price) * 100 : 0;

  const isSelected = selectedInstrumentId === position.instrumentId;

  // Flash on price change
  useEffect(() => {
    if (!ticker?.last?.price) return;
    const price = ticker.last.price;
    if (prevPriceRef.current !== null && prevPriceRef.current !== price) {
      const cls = price > prevPriceRef.current ? 'flash-gain' : 'flash-loss';
      setFlashClass(cls);
      const t = setTimeout(() => setFlashClass(''), 700);
      prevPriceRef.current = price;
      return () => clearTimeout(t);
    }
    prevPriceRef.current = price;
  }, [ticker?.last?.price]);

  function handleClick() {
    setSelectedInstrumentId(isSelected ? null : position.instrumentId);
  }

  const badgeClass = TYPE_BADGE[position.instrument?.type ?? 'stock'] ?? TYPE_BADGE.stock;

  return (
    <div
      onClick={handleClick}
      className={`
        card px-4 py-3.5 cursor-pointer transition-all duration-150
        hover:border-gray-700 hover:bg-bg-hover
        ${isSelected ? 'border-blue-500/50 bg-blue-900/5' : ''}
        ${flashClass}
      `}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: name + badge */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-bg-secondary border border-gray-700 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-gray-300">
              {position.instrument?.shortName?.slice(0, 2) ?? '??'}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-sm truncate">
                {position.instrument?.shortName}
              </span>
              <span className={`text-[10px] font-medium border px-1.5 py-0.5 rounded uppercase tracking-wider ${badgeClass}`}>
                {position.instrument?.type ?? 'stock'}
              </span>
            </div>
            <div className="text-xs text-gray-500 truncate">{position.instrument?.name}</div>
          </div>
        </div>

        {/* Right: price + pnl */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Daily change */}
          <div className="text-right hidden sm:block">
            <div className={`text-xs font-medium ${dailyPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {fmtSign(dailyPnl)}
            </div>
            <div className={`text-[11px] ${dailyPct >= 0 ? 'text-green-400/70' : 'text-red-400/70'}`}>
              {dailyPct >= 0 ? '+' : ''}{dailyPct.toFixed(2)}% jour
            </div>
          </div>

          {/* Total PnL */}
          <div className="text-right hidden md:block">
            <div className={`text-xs font-medium ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {fmtSign(totalPnl)}
            </div>
            <div className={`text-[11px] ${totalPnlPct >= 0 ? 'text-green-400/70' : 'text-red-400/70'}`}>
              {totalPnlPct >= 0 ? '+' : ''}{totalPnlPct.toFixed(2)}% total
            </div>
          </div>

          {/* Current price */}
          <div className="text-right min-w-[80px]">
            <div className="text-sm font-bold text-white font-mono price-value">{fmt(currentPrice)}</div>
            <div className="text-[11px] text-gray-500">{fmt(posValue)} · ×{position.netSize}</div>
          </div>

          <ChevronRight className={`w-4 h-4 transition-colors ${isSelected ? 'text-blue-400' : 'text-gray-700'}`} />
        </div>
      </div>
    </div>
  );
}
