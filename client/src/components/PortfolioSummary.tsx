import { TrendingUp, TrendingDown, Wallet, BarChart2 } from 'lucide-react';
import { useStore } from '../store/useStore';

function fmt(n: number, showSign = false) {
  const s = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(Math.abs(n));
  if (showSign) return `${n >= 0 ? '+' : '-'}${s}`;
  return `${n < 0 ? '-' : ''}${s}`;
}

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean | null;
  icon: React.ReactNode;
}

function StatCard({ label, value, sub, positive, icon }: StatCardProps) {
  const valueColor = positive === null || positive === undefined ? 'text-white' : positive ? 'text-green-400' : 'text-red-400';

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
        <div className="text-gray-600">{icon}</div>
      </div>
      <div className={`text-2xl font-bold font-mono ${valueColor}`}>{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

export default function PortfolioSummary() {
  const portfolio = useStore(s => s.portfolio);

  if (!portfolio) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-5 animate-pulse">
            <div className="h-3 bg-gray-800 rounded w-24 mb-4" />
            <div className="h-7 bg-gray-800 rounded w-32" />
          </div>
        ))}
      </div>
    );
  }

  const totalValue = portfolio.portfolioValue.value;
  const prevClose = portfolio.previousCloseValue.value;
  const dailyChange = totalValue - prevClose;
  const dailyPct = prevClose > 0 ? (dailyChange / prevClose) * 100 : 0;

  const invested = portfolio.positions.reduce((acc, p) => acc + p.averageBuyIn * p.netSize, 0);
  const totalPnl = totalValue - invested;
  const totalPnlPct = invested > 0 ? (totalPnl / invested) * 100 : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Valeur totale"
        value={fmt(totalValue)}
        icon={<Wallet className="w-4 h-4" />}
        positive={null}
      />
      <StatCard
        label="Variation du jour"
        value={fmt(dailyChange, true)}
        sub={`${dailyChange >= 0 ? '+' : ''}${dailyPct.toFixed(2)}%`}
        icon={dailyChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        positive={dailyChange >= 0}
      />
      <StatCard
        label="Plus-value totale"
        value={fmt(totalPnl, true)}
        sub={`${totalPnl >= 0 ? '+' : ''}${totalPnlPct.toFixed(2)}% investi`}
        icon={<TrendingUp className="w-4 h-4" />}
        positive={totalPnl >= 0}
      />
      <StatCard
        label="Positions"
        value={`${portfolio.positions.length}`}
        sub={`Capital investi: ${fmt(invested)}`}
        icon={<BarChart2 className="w-4 h-4" />}
        positive={null}
      />
    </div>
  );
}
