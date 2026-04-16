import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from 'recharts';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { useStore } from '../store/useStore';

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n);
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

interface TooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: number;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-card border border-gray-700 rounded-lg px-3 py-2 text-xs shadow-xl">
      <div className="text-gray-400 mb-1">{label ? formatTime(label) : ''}</div>
      <div className="text-white font-bold font-mono">{fmt(payload[0].value)}</div>
    </div>
  );
}

export default function PriceChart() {
  const { selectedInstrumentId, priceHistory, tickers, portfolio, setSelectedInstrumentId } = useStore();

  const position = portfolio?.positions.find(p => p.instrumentId === selectedInstrumentId);
  const ticker = selectedInstrumentId ? tickers[selectedInstrumentId] : null;
  const history = selectedInstrumentId ? (priceHistory[selectedInstrumentId] ?? []) : [];

  const chartData = useMemo(
    () => history.map(p => ({ time: p.time, price: p.price })),
    [history]
  );

  if (!selectedInstrumentId || !position) return null;

  const currentPrice = ticker?.last?.price ?? 0;
  const openPrice = ticker?.open?.price ?? (chartData[0]?.price ?? currentPrice);
  const highPrice = ticker?.high?.price ?? Math.max(...chartData.map(d => d.price));
  const lowPrice = ticker?.low?.price ?? Math.min(...chartData.map(d => d.price));
  const dailyChange = currentPrice - openPrice;
  const dailyPct = openPrice > 0 ? (dailyChange / openPrice) * 100 : 0;
  const isPositive = dailyChange >= 0;

  const color = isPositive ? '#4ade80' : '#f87171';
  const gradientId = `grad-${selectedInstrumentId.replace(/[^a-z0-9]/gi, '')}`;

  const minY = Math.min(...chartData.map(d => d.price)) * 0.999;
  const maxY = Math.max(...chartData.map(d => d.price)) * 1.001;

  return (
    <div className="card p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white text-lg">{position.instrument?.shortName}</h3>
            <span className="text-sm text-gray-400">{position.instrument?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold font-mono text-white">{fmt(currentPrice)}</span>
            <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isPositive ? '+' : ''}{fmt(dailyChange)} ({isPositive ? '+' : ''}{dailyPct.toFixed(2)}%)
            </div>
          </div>
        </div>
        <button
          onClick={() => setSelectedInstrumentId(null)}
          className="text-gray-600 hover:text-gray-300 transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* OHLC stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Ouverture', value: openPrice },
          { label: 'Haut', value: highPrice },
          { label: 'Bas', value: lowPrice },
          { label: 'PRU', value: position.averageBuyIn }
        ].map(({ label, value }) => (
          <div key={label} className="bg-bg-secondary rounded-lg p-3">
            <div className="text-[11px] text-gray-500 mb-1">{label}</div>
            <div className="text-sm font-mono font-semibold text-white">{fmt(value)}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      {chartData.length > 1 ? (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis
                dataKey="time"
                tickFormatter={formatTime}
                tick={{ fill: '#6b7280', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[minY, maxY]}
                tickFormatter={v => fmt(v)}
                tick={{ fill: '#6b7280', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={75}
                tickCount={4}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={openPrice} stroke="#374151" strokeDasharray="4 4" />
              <Area
                type="monotone"
                dataKey="price"
                stroke={color}
                strokeWidth={1.5}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-48 flex items-center justify-center text-gray-600 text-sm">
          Chargement de l'historique des prix…
        </div>
      )}
    </div>
  );
}
