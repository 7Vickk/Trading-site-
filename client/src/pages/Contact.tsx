import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import ContactForm from '../components/ContactForm';
import { COMPANY } from '../data/services';

export default function Contact() {
  useSEO({
    title: 'Contact MAZEAS Paysages — Devis gratuit paysagiste Nantes Loire-Atlantique',
    description: 'Contactez MAZEAS Paysages pour un devis gratuit. Paysagiste à Nantes, Loire-Atlantique et Vendée. Victor et Gilles MAZEAS. Tél : 06 33 46 37 37. Réponse sous 24 h.',
    canonical: 'https://mazeaspaysages.fr/contact',
  });

  return (
    <>
      {/* Hero */}
      <div className="bg-primary-950 pt-32 pb-16 text-center">
        <div className="container">
          <span className="inline-block bg-primary-800 text-green-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">Devis gratuit</span>
          <h1 className="text-white mb-4">Contactez MAZEAS Paysages</h1>
          <p className="text-green-200 max-w-xl mx-auto text-lg">Victor et Gilles se déplacent gratuitement pour étudier votre projet et vous remettre un devis sans engagement sous 24 h.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Coordonnées */}
            <aside className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-primary-900 mb-5">Nos coordonnées</h2>
                <ul className="space-y-5">
                  <li>
                    <a href={COMPANY.phoneTel}
                      className="flex items-start gap-4 p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors group">
                      <div className="w-11 h-11 bg-primary-700 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary-600 transition-colors">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-stone-400 font-medium uppercase tracking-wider mb-0.5">Téléphone</div>
                        <div className="font-bold text-primary-900 text-lg">{COMPANY.phone}</div>
                        <div className="text-xs text-stone-500">Appel gratuit · Lun–Ven 8h–18h</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${COMPANY.email}`}
                      className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors">
                      <div className="w-11 h-11 bg-stone-600 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-stone-400 font-medium uppercase tracking-wider mb-0.5">E-mail</div>
                        <div className="font-bold text-stone-800 break-all">{COMPANY.email}</div>
                        <div className="text-xs text-stone-500">Réponse sous 24 h</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl">
                      <div className="w-11 h-11 bg-stone-500 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-stone-400 font-medium uppercase tracking-wider mb-0.5">Adresse</div>
                        <div className="font-semibold text-stone-800">{COMPANY.address}</div>
                        <div className="text-stone-600">{COMPANY.zip} {COMPANY.city}</div>
                        <div className="text-xs text-stone-400 mt-1">{COMPANY.rcs}</div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl">
                      <div className="w-11 h-11 bg-primary-600 rounded-xl flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-stone-400 font-medium uppercase tracking-wider mb-0.5">Horaires</div>
                        <div className="text-stone-700 text-sm">Lundi – Vendredi : 8h – 18h</div>
                        <div className="text-stone-500 text-sm">Samedi : sur rendez-vous</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Zone */}
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-5">
                <h3 className="font-bold text-primary-900 mb-3">Zone d'intervention</h3>
                <ul className="space-y-1.5 text-sm text-stone-600">
                  {['Nantes et agglomération', 'Saint-Philbert-de-Grand-Lieu', 'La Limouzinière', 'Legé · Machecoul', 'Challans · Saint-Gilles-Croix-de-Vie', 'Nord Vendée'].map(z => (
                    <li key={z} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                      {z}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-bold text-stone-800 mb-3">Suivez-nous</h3>
                <div className="flex gap-3">
                  <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    aria-label="Instagram MAZEAS Paysages">
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                  <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    aria-label="Facebook MAZEAS Paysages">
                    <Facebook className="w-4 h-4" /> Facebook
                  </a>
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-primary-900 mb-2">Demander un devis gratuit</h2>
              <p className="text-stone-500 mb-6 text-sm">Décrivez votre projet, nous vous répondons sous 24 heures. Sans engagement.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
