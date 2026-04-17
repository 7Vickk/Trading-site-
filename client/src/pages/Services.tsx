import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Percent } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { SERVICES, COMPANY } from '../data/services';

export default function Services() {
  useSEO({
    title: 'Nos Services de Paysagisme à Nantes — MAZEAS Paysages Loire-Atlantique',
    description: 'Découvrez tous les services de MAZEAS Paysages : clôtures, terrasses, gazon synthétique, maçonnerie, constructions bois, création de jardins, entretien. Paysagiste Nantes 44.',
    canonical: 'https://mazeaspaysages.fr/services',
  });

  return (
    <>
      {/* Hero */}
      <div className="bg-primary-950 pt-32 pb-16 text-center">
        <div className="container">
          <span className="inline-block bg-primary-800 text-green-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">Paysagiste Nantes</span>
          <h1 className="text-white mb-4">Nos services d'aménagement paysager</h1>
          <p className="text-green-200 max-w-2xl mx-auto text-lg leading-relaxed">MAZEAS Paysages réalise tous vos projets d'aménagement extérieur à Nantes, en Loire-Atlantique et en nord Vendée. Devis gratuit sous 24 h.</p>
        </div>
      </div>

      {/* Credit impot banner */}
      <div className="bg-primary-700 text-white py-4">
        <div className="container flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <Percent className="w-6 h-6 text-green-300 shrink-0" />
          <span className="font-semibold">Crédit d'impôt 50%</span>
          <span className="text-green-200 text-sm">— Éligible via coopérative SAP pour les services d'entretien des espaces verts</span>
          <Link to="/services/entretien-espaces-verts" className="text-white underline text-sm font-medium ml-2 whitespace-nowrap">En savoir plus</Link>
        </div>
      </div>

      {/* Services grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES.map(s => (
              <Link key={s.id} to={s.slug} className="card group flex flex-col sm:flex-row overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                <div className="relative sm:w-56 h-48 sm:h-auto shrink-0 overflow-hidden">
                  <img src={s.imageUrl} alt={s.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-50`} />
                  <span className="absolute top-3 left-3 text-4xl drop-shadow">{s.icon}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-primary-900 mb-3">{s.title}</h2>
                  <p className="text-stone-500 text-sm leading-relaxed flex-1">{s.shortDesc}</p>
                  <div className="flex items-center gap-2 text-primary-700 font-semibold text-sm mt-5 group-hover:gap-3 transition-all">
                    Découvrir ce service <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-900 text-white">
        <div className="container text-center">
          <h2 className="text-white mb-4">Vous avez un projet ?</h2>
          <p className="text-green-200 mb-8 max-w-xl mx-auto">Victor et Gilles MAZEAS se déplacent gratuitement pour étudier votre projet et vous remettre un devis détaillé sans engagement.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary bg-white text-primary-800 hover:bg-green-50 px-8 py-4 text-base">Demander un devis gratuit</Link>
            <a href={COMPANY.phoneTel} className="btn-call px-8 py-4 text-base"><Phone className="w-5 h-5" /> {COMPANY.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
