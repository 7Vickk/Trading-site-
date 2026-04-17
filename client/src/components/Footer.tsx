import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Leaf, Instagram, Facebook, Star } from 'lucide-react';
import { SERVICES, COMPANY } from '../data/services';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary-950 text-stone-300">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary-700 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-tight">MAZEAS Paysages</div>
                <div className="text-xs text-primary-300">Paysagiste professionnel</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5 text-stone-400 italic">
              « {COMPANY.slogan} »
            </p>
            <div className="flex gap-3">
              <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-800 hover:bg-primary-700 flex items-center justify-center transition-colors"
                aria-label="Instagram MAZEAS Paysages">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-800 hover:bg-primary-700 flex items-center justify-center transition-colors"
                aria-label="Facebook MAZEAS Paysages">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href={COMPANY.googleReview} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-800 hover:bg-primary-700 flex items-center justify-center transition-colors"
                aria-label="Laisser un avis Google">
                <Star className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Nos Services</h3>
            <ul className="space-y-2">
              {SERVICES.map(s => (
                <li key={s.id}>
                  <Link to={s.slug} className="text-sm text-stone-400 hover:text-primary-300 transition-colors flex items-center gap-2">
                    <span>{s.icon}</span> {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zone & infos */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Zone d'intervention</h3>
            <ul className="space-y-1.5 text-sm text-stone-400 mb-4">
              {['Nantes et périphérie', 'Saint-Philbert-de-Grand-Lieu', 'La Limouzinière', 'Sud Loire-Atlantique', 'Nord Vendée'].map(z => (
                <li key={z} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  {z}
                </li>
              ))}
            </ul>
            <div className="mt-4 bg-primary-900/60 rounded-lg px-3 py-2 text-xs text-primary-300">
              <strong className="text-white">Crédit d'impôt 50%</strong><br />
              Éligible via coopérative SAP pour les services d'entretien
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={COMPANY.phoneTel} className="flex items-start gap-3 text-sm text-stone-400 hover:text-primary-300 transition-colors">
                  <Phone className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                  <span>{COMPANY.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-3 text-sm text-stone-400 hover:text-primary-300 transition-colors">
                  <Mail className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                  <span className="break-all">{COMPANY.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-stone-400">
                  <MapPin className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                  <span>{COMPANY.address}<br />{COMPANY.zip} {COMPANY.city}</span>
                </div>
              </li>
            </ul>
            <Link to="/contact" className="mt-5 inline-block btn-primary text-sm py-2 px-4">
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-900">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <span>© {year} MAZEAS Paysages — {COMPANY.rcs}</span>
          <div className="flex gap-4">
            <Link to="/mentions-legales" className="hover:text-primary-300 transition-colors">Mentions légales</Link>
            <Link to="/contact" className="hover:text-primary-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
