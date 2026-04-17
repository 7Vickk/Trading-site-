import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { SERVICES, COMPANY } from '../data/services';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://formsubmit.co/ajax/mazeaspaysage@orange.fr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `Demande de devis – ${form.service || 'MAZEAS Paysages'}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-primary-50 border border-primary-200 rounded-2xl p-10 text-center">
        <CheckCircle className="w-14 h-14 text-primary-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-primary-900 mb-2">Message envoyé !</h3>
        <p className="text-stone-600">Victor ou Gilles vous rappellera sous 24 h. Merci de votre confiance.</p>
        <button onClick={() => { setStatus('idle'); setForm({ name: '', phone: '', email: '', service: '', message: '' }); }}
          className="mt-6 btn-outline text-sm">
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const inputCls = 'w-full border border-stone-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 rounded-lg px-4 py-3 text-stone-800 outline-none transition-all placeholder-stone-400 text-sm';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Nom et prénom *</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
            placeholder="Jean Dupont" className={inputCls} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">Téléphone *</label>
          <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange}
            placeholder="06 00 00 00 00" className={inputCls} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">E-mail</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
          placeholder="jean.dupont@email.com" className={inputCls} />
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-stone-700 mb-1">Service souhaité</label>
        <select id="service" name="service" value={form.service} onChange={handleChange} className={inputCls}>
          <option value="">-- Choisir un service --</option>
          {SERVICES.map(s => <option key={s.id} value={s.title}>{s.icon} {s.title}</option>)}
          <option value="Autre">Autre / Plusieurs services</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Votre projet *</label>
        <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange}
          placeholder="Décrivez votre projet (surface, type de travaux, délai souhaité…)"
          className={`${inputCls} resize-none`} />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Erreur lors de l'envoi. Appelez-nous directement au{' '}
          <a href={COMPANY.phoneTel} className="font-semibold underline">{COMPANY.phone}</a>
        </div>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60">
        {status === 'loading'
          ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi en cours…</>
          : <><Send className="w-4 h-4" /> Envoyer ma demande de devis</>
        }
      </button>
      <p className="text-xs text-stone-400 text-center">Réponse sous 24 h · Devis 100% gratuit et sans engagement</p>
    </form>
  );
}
