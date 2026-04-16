import { useEffect } from 'react';
import Header from './Header';
import PortfolioSummary from './PortfolioSummary';
import PositionCard from './PositionCard';
import PriceChart from './PriceChart';
import MarketTicker from './MarketTicker';
import { useStore } from '../store/useStore';
import { getSocket } from '../hooks/useSocket';

export default function Dashboard() {
  const { portfolio, selectedInstrumentId } = useStore();

  // Request price history when a position is selected
  useEffect(() => {
    if (!selectedInstrumentId) return;
    getSocket().emit('request_history', { instrumentId: selectedInstrumentId });
  }, [selectedInstrumentId]);

  const positions = portfolio?.positions ?? [];

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Market overview strip */}
        <MarketTicker />

        {/* KPI cards */}
        <PortfolioSummary />

        {/* Chart (shown when a position is selected) */}
        {selectedInstrumentId && (
          <div className="mb-6">
            <PriceChart />
          </div>
        )}

        {/* Positions */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold text-white">Mes positions</h2>
            <span className="text-xs text-gray-500">{positions.length} actifs</span>
          </div>

          {positions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-600">
              <div className="text-4xl mb-3">📊</div>
              <p className="text-sm">Aucune position dans le portefeuille</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800/60">
              {positions
                .slice()
                .sort((a, b) => {
                  const valA = (a.currentPrice ?? a.averageBuyIn) * a.netSize;
                  const valB = (b.currentPrice ?? b.averageBuyIn) * b.netSize;
                  return valB - valA;
                })
                .map(pos => (
                  <PositionCard key={pos.instrumentId} position={pos} />
                ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-700">
          Données fournies par Trade Republic · Actualisation toutes les 3 secondes
        </div>
      </main>
    </div>
  );
}
