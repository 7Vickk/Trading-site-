import { useState, FormEvent } from 'react';
import { TrendingUp, Smartphone, Lock, Play, Server } from 'lucide-react';
import { connectSocket, hasServer } from '../hooks/useSocket';
import { useStore } from '../store/useStore';

export default function LoginPage() {
  const [phone, setPhone] = useState('+33');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setPhoneNumber, setDemo, setView, addNotification } = useStore();

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!phone.match(/^\+\d{8,15}$/)) {
      setError('Numéro invalide — ex: +33612345678');
      return;
    }
    if (pin.length < 4) {
      setError('PIN trop court (minimum 4 chiffres)');
      return;
    }

    setLoading(true);
    setPhoneNumber(phone);

    const s = connectSocket();
    s.emit('login', { phoneNumber: phone, pin });

    s.once('otp_required', () => setLoading(false));
    s.once('tr_error', ({ message }: { message: string }) => {
      setLoading(false);
      setError(message);
    });
  }

  function handleDemo() {
    setDemo(true);
    setView('dashboard');
    addNotification({
      kind: 'info',
      title: 'Mode démo activé',
      message: 'Données simulées en temps réel — aucune connexion requise.'
    });
  }

  const serverAvailable = hasServer();

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">TR Dashboard</h1>
          <p className="text-gray-400 mt-2 text-sm">Votre portefeuille Trade Republic en temps réel</p>
        </div>

        <div className="card p-8">
          {/* Real login (only shown when backend is configured) */}
          {serverAvailable && (
            <>
              <h2 className="text-lg font-semibold text-white mb-6">Connexion Trade Republic</h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    Numéro de téléphone
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+33612345678"
                      className="input-field pl-10"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    PIN Trade Republic
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="password"
                      value={pin}
                      onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="••••"
                      className="input-field pl-10 font-mono tracking-widest"
                      inputMode="numeric"
                      maxLength={6}
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connexion…
                    </>
                  ) : (
                    'Se connecter'
                  )}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800" />
                </div>
                <div className="relative flex justify-center text-xs text-gray-600">
                  <span className="bg-bg-card px-3">ou</span>
                </div>
              </div>
            </>
          )}

          {/* Demo mode button */}
          <button
            onClick={handleDemo}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg border border-gray-700 hover:border-blue-500/50 hover:bg-blue-900/10 text-gray-300 hover:text-white transition-all duration-150 font-medium"
          >
            <Play className="w-4 h-4 text-blue-400" />
            {serverAvailable ? 'Essayer le mode démo' : 'Lancer le tableau de bord démo'}
          </button>

          {!serverAvailable && (
            <div className="mt-4 flex items-start gap-2.5 bg-bg-secondary border border-gray-700 rounded-lg px-4 py-3">
              <Server className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-500 leading-relaxed">
                Pour connecter votre vrai compte Trade Republic, déployez le backend
                sur Railway et ajoutez la variable <code className="text-gray-400 font-mono">VITE_SERVER_URL</code> dans Vercel.
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-gray-700 text-xs mt-6 px-4">
          Vos identifiants ne transitent que vers Trade Republic · Jamais stockés
        </p>
      </div>
    </div>
  );
}
