import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Award, Clock, MapPin, Leaf, Star, Percent } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import ReviewsSection from '../components/ReviewsSection';
import ContactForm from '../components/ContactForm';
import { SERVICES, COMPANY } from '../data/services';

const HERO_IMG = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=85&auto=format&fit=crop';

const ATOUTS = [
  { icon: <Award className="w-6 h-6 text-primary-600" />, title: 'Artisans qualifiés', text: 'Victor et Gilles MAZEAS, professionnels passionnés avec plus de 15 ans d\'expérience en aménagement paysager.' },
  { icon: <Clock className="w-6 h-6 text-primary-600" />, title: 'Réactivité garantie', text: 'Devis sous 24 h, chantiers planifiés et réalisés dans les délais convenus. Vous êtes informé à chaque étape.' },
  { icon: <MapPin className="w-6 h-6 text-primary-600" />, title: 'Ancrage local', text: 'Basés à La Limouzinière, nous intervenons à Nantes, en Loire-Atlantique et en nord Vendée depuis notre création.' },
  { icon: <Percent className="w-6 h-6 text-primary-600" />, title: 'Crédit d\'impôt 50%', text: 'Éligible via la coopérative SAP pour les travaux d\'entretien. Réduisez votre facture de moitié.' },
];

export default function Home() {
  useSEO({
    title: 'MAZEAS Paysages — Paysagiste Nantes, Loire-Atlantique, Vendée | Devis gratuit',
    description: 'MAZEAS Paysages, paysagiste professionnel à Nantes et périphérie, Loire-Atlantique et nord Vendée. Clôtures, terrasses, jardins, entretien. Crédit d\'impôt 50%. Devis gratuit sous 24 h.',
    canonical: 'https://mazeaspaysages.fr/',
  });

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center" aria-label="Présentation MAZEAS Paysages">
        <img src={HERO_IMG} alt="Jardin aménagé par MAZEAS Paysages, paysagiste à Nantes Loire-Atlantique" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/25">
              🌿 Paysagiste Loire-Atlantique &amp; Vendée
            </span>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Créateurs d'espaces verts<br />
              <span className="text-green-300">à Nantes &amp; alentours</span>
            </h1>
            <p className="text-green-100 text-lg sm:text-xl mb-10 leading-relaxed">
              {COMPANY.slogan}.<br />
              MAZEAS Paysages réalise vos projets d'aménagement extérieur avec passion et savoir-faire artisanal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary bg-white text-primary-800 hover:bg-green-50 text-base px-8 py-4">
                <Leaf className="w-5 h-5" /> Devis gratuit
              </Link>
              <a href={COMPANY.phoneTel} className="btn-call text-base px-8 py-4">
                <Phone className="w-5 h-5" /> {COMPANY.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 mt-8">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              <span className="text-white/80 text-sm">5/5 · Avis vérifiés Google</span>
            </div>
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 lg:h-14">
            <path d="M0,60 C360,0 1080,60 1440,0 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" aria-label="Nos services paysagisme">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge mb-3">Expertise</span>
            <h2 className="mb-4">Nos services de paysagisme</h2>
            <p className="text-stone-500 max-w-xl mx-auto">De la clôture à la création de jardins en passant par l'entretien, MAZEAS Paysages couvre tous vos besoins en aménagement extérieur à Nantes et en Loire-Atlantique.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICES.map(s => (
              <Link key={s.id} to={s.slug} className="card group p-0 flex flex-col overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                <div className="relative h-44 overflow-hidden">
                  <img src={s.imageUrl} alt={s.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${s.color} opacity-60`} />
                  <span className="absolute top-3 left-3 text-3xl">{s.icon}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-primary-900 mb-2">{s.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed flex-1">{s.shortDesc}</p>
                  <div className="flex items-center gap-1 text-primary-700 text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="btn-outline">Voir tous nos services</Link>
          </div>
        </div>
      </section>

      {/* ── ATOUTS ── */}
      <section className="section bg-primary-50" aria-label="Pourquoi choisir MAZEAS Paysages">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge mb-3">Pourquoi nous choisir</span>
            <h2 className="mb-4">MAZEAS Paysages, votre paysagiste de confiance</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Paysagiste professionnel basé à La Limouzinière (44310), nous intervenons sur Nantes et toute la Loire-Atlantique.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ATOUTS.map((a, i) => (
              <div key={i} className="card p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">{a.icon}</div>
                <h3 className="font-bold text-primary-900 mb-2">{a.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section" aria-label="À propos MAZEAS Paysages">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge mb-4">Notre entreprise</span>
              <h2 className="mb-5">Victor &amp; Gilles MAZEAS, paysagistes passionnés</h2>
              <p className="text-stone-600 leading-relaxed mb-4">Fondée par Victor et Gilles MAZEAS, notre SARL est établie à La Limouzinière, au cœur du sud Loire-Atlantique. Avec plus de 15 ans d'expérience dans l'aménagement paysager, nous réalisons chaque projet avec le même exigence artisanale.</p>
              <p className="text-stone-600 leading-relaxed mb-4">Nous intervenons à <strong>Nantes et sa périphérie</strong>, dans le <strong>sud Loire-Atlantique</strong> (Saint-Philbert-de-Grand-Lieu, Legé, Machecoul…) et dans le <strong>nord Vendée</strong>. Chaque devis est gratuit et personnalisé.</p>
              <p className="text-stone-600 leading-relaxed mb-8">Notre coopérative SAP vous permet de bénéficier du <strong>crédit d'impôt de 50%</strong> sur les travaux d'entretien, rendant nos services encore plus accessibles.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">Demander un devis</Link>
                <a href={COMPANY.phoneTel} className="btn-outline"><Phone className="w-4 h-4" /> {COMPANY.phone}</a>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=700&q=80&auto=format&fit=crop"
                alt="Paysagiste professionnel MAZEAS Paysages travaillant dans un jardin à Nantes"
                className="rounded-2xl w-full object-cover h-80 lg:h-96 shadow-xl"
                loading="lazy"
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4 border border-stone-100">
                <div className="text-4xl font-extrabold text-primary-700">15+</div>
                <div>
                  <div className="font-bold text-stone-800 text-sm">ans d'expérience</div>
                  <div className="text-stone-400 text-xs">en paysagisme</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <ReviewsSection />

      {/* ── CONTACT ── */}
      <section className="section" id="contact" aria-label="Contact MAZEAS Paysages">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="badge mb-4">Contact</span>
              <h2 className="mb-5">Parlons de votre projet</h2>
              <p className="text-stone-600 mb-8 leading-relaxed">Vous avez un projet d'aménagement paysager à Nantes, en Loire-Atlantique ou en Vendée ? Contactez Victor ou Gilles pour un devis gratuit et sans engagement.</p>
              <div className="space-y-4">
                <a href={COMPANY.phoneTel} className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors group">
                  <div className="w-12 h-12 bg-primary-700 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-primary-900">{COMPANY.phone}</div>
                    <div className="text-xs text-stone-500">Lun–Ven · 8h–18h · Appel gratuit</div>
                  </div>
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors">
                  <div className="w-12 h-12 bg-stone-700 rounded-xl flex items-center justify-center shrink-0">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-800">{COMPANY.email}</div>
                    <div className="text-xs text-stone-500">Réponse sous 24 h</div>
                  </div>
                </a>
                <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl">
                  <div className="w-12 h-12 bg-stone-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-800">Notre siège</div>
                    <div className="text-sm text-stone-500">{COMPANY.address}<br />{COMPANY.zip} {COMPANY.city}</div>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
