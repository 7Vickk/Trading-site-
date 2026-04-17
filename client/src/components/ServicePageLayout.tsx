import { Link } from 'react-router-dom';
import { Phone, ChevronRight, CheckCircle } from 'lucide-react';
import ContactForm from './ContactForm';
import { COMPANY, SERVICES } from '../data/services';

interface Props {
  title: string;
  subtitle: string;
  intro: string[];
  features: string[];
  details?: { heading: string; text: string }[];
  imageUrl: string;
  imageAlt: string;
  breadcrumb: string;
}

export default function ServicePageLayout({ title, subtitle, intro, features, details, imageUrl, imageAlt, breadcrumb }: Props) {
  const otherServices = SERVICES.filter(s => s.title !== title).slice(0, 4);

  return (
    <>
      {/* Hero banner */}
      <div className="relative h-72 sm:h-80 lg:h-96 flex items-end overflow-hidden">
        <img src={imageUrl} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/50 to-transparent" />
        <div className="container relative pb-8 lg:pb-12">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-xs text-green-300 mb-3">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{breadcrumb}</span>
          </nav>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">{title}</h1>
          <p className="text-green-200 text-lg max-w-xl">{subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Intro paragraphs */}
            <div className="prose prose-stone max-w-none">
              {intro.map((p, i) => <p key={i} className="text-stone-700 leading-relaxed text-base mb-4">{p}</p>)}
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-bold text-primary-900 mb-5">Ce que nous réalisons</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 bg-primary-50 rounded-lg px-4 py-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                    <span className="text-stone-700 text-sm font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details sections */}
            {details && details.map((d, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-primary-900 mb-3">{d.heading}</h2>
                <p className="text-stone-700 leading-relaxed">{d.text}</p>
              </div>
            ))}

            {/* Zone intervention */}
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-primary-900 mb-2">Zone d'intervention</h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                MAZEAS Paysages intervient à <strong>Nantes et sa périphérie</strong>, dans le <strong>sud Loire-Atlantique</strong> (Saint-Philbert-de-Grand-Lieu, La Limouzinière, Legé, Machecoul…) et dans le <strong>nord Vendée</strong>. Contactez-nous pour vérifier que votre commune est couverte.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA card */}
            <div className="card p-6 bg-primary-900 text-white">
              <h3 className="text-lg font-bold mb-2">Devis gratuit sous 24 h</h3>
              <p className="text-green-200 text-sm mb-5">Décrivez votre projet et recevez une réponse rapide de Victor ou Gilles.</p>
              <a href={COMPANY.phoneTel}
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-3 rounded-lg transition-colors w-full mb-3">
                <Phone className="w-4 h-4" /> {COMPANY.phone}
              </a>
              <p className="text-xs text-center text-green-300">Lun–Ven · 8h–18h</p>
            </div>

            {/* Credit impot */}
            <div className="card p-5 border-l-4 border-primary-500">
              <div className="text-3xl font-extrabold text-primary-700 mb-1">50%</div>
              <div className="font-semibold text-primary-900 mb-1">Crédit d'impôt</div>
              <p className="text-xs text-stone-500 leading-relaxed">Éligible via la coopérative SAP pour les travaux d'entretien. Renseignez-nous lors de votre devis.</p>
            </div>

            {/* Other services */}
            <div>
              <h3 className="font-semibold text-stone-700 mb-3 text-sm uppercase tracking-wider">Autres services</h3>
              <ul className="space-y-2">
                {otherServices.map(s => (
                  <li key={s.id}>
                    <Link to={s.slug}
                      className="flex items-center gap-2 text-sm text-stone-600 hover:text-primary-700 transition-colors py-1.5">
                      <span>{s.icon}</span> {s.title}
                      <ChevronRight className="w-3 h-3 ml-auto text-stone-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Contact form */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary-900 mb-2 text-center">Demandez votre devis gratuit</h2>
          <p className="text-stone-500 text-center mb-8 text-sm">Sans engagement · Réponse sous 24 h · Victor &amp; Gilles MAZEAS</p>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
