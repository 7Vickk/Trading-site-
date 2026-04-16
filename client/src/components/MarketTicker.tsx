import { useStore } from '../store/useStore';

const MARKET_INDICES = [
  { name: 'CAC 40', symbol: 'CAC', base: 7842.30, change: +0.42 },
  { name: 'DAX', symbol: 'DAX', base: 18246.50, change: +0.18 },
  { name: 'S&P 500', symbol: 'SPX', base: 5243.80, change: -0.11 },
  { name: 'NASDAQ', symbol: 'NDX', base: 18456.20, change: +0.63 },
  { name: 'Bitcoin', symbol: 'BTC', base: 68420.00, change: +1.24 },
  { name: 'EUR/USD', symbol: 'EURUSD', base: 1.0856, change: -0.08 }
];

function fmt(n: number, decimals = 2) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export default function MarketTicker() {
  const portfolio = useStore(s => s.portfolio);

  // Simulate slight variation on each render
  const items = MARKET_INDICES.map(idx => ({
    ...idx,
    current: idx.base * (1 + idx.change / 100)
  }));

  return (
    <div className="card p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Marchés en temps réel</h3>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {items.map(idx => (
          <div key={idx.symbol} className="text-center">
            <div className="text-[11px] text-gray-500 mb-0.5">{idx.name}</div>
            <div className="text-sm font-mono font-semibold text-white">
              {idx.symbol === 'EURUSD' ? fmt(idx.current, 4) : idx.symbol === 'BTC' ? fmt(idx.current, 0) : fmt(idx.current)}
            </div>
            <div className={`text-[11px] font-medium ${idx.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {idx.change >= 0 ? '+' : ''}{idx.change}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
