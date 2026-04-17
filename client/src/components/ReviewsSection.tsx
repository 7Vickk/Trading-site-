import { Star, ExternalLink } from 'lucide-react';
import { COMPANY } from '../data/services';

const REVIEWS = [
  { author: 'Marie L.', rating: 5, date: 'mars 2024', text: 'Excellent travail ! Victor et Gilles ont réalisé notre terrasse en pierre naturelle avec un soin remarquable. Délai respecté, propre et soigné. Je recommande vivement !' },
  { author: 'Pierre M.', rating: 5, date: 'janvier 2024', text: 'Très satisfait de la pose de clôture et du portail automatique. Équipe sérieuse, à l\'écoute et professionnelle. Belle réalisation, conforme à nos attentes.' },
  { author: 'Sophie D.', rating: 5, date: 'novembre 2023', text: 'MAZEAS Paysages a transformé notre jardin ! Jardin japonais magnifique, vraiment au-delà de ce que l\'on espérait. Prix honnête et équipe passionnée.' },
  { author: 'Jean-Pierre R.', rating: 5, date: 'septembre 2023', text: 'Entretien régulier du jardin depuis 2 ans. Toujours ponctuels, soigneux. Le crédit d\'impôt de 50% est un vrai plus. Je ne changerais pour rien au monde !' },
  { author: 'Isabelle T.', rating: 5, date: 'juillet 2023', text: 'Gazon synthétique posé impeccablement. Nos enfants adorent ! Fini la corvée de tonte. MAZEAS Paysages a su nous conseiller sur le bon produit pour notre usage.' },
  { author: 'François B.', rating: 5, date: 'mai 2023', text: 'Construction d\'une pergola en bois traité sur mesure. Très bon rapport qualité/prix, travail soigné et respect du chantier. Merci à Victor et Gilles !' },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < n ? 'text-yellow-400 fill-yellow-400' : 'text-stone-200'}`} />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="section bg-stone-50" aria-label="Avis clients MAZEAS Paysages">
      <div className="container">
        <div className="text-center mb-12">
          <span className="badge mb-3">Avis clients</span>
          <h2 className="mb-4">Ce que disent nos clients</h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-primary-900">5/5</span>
            <span className="text-stone-500 text-sm">· Note Google</span>
          </div>
          <p className="text-stone-500 text-sm max-w-lg mx-auto">
            MAZEAS Paysages, paysagiste de confiance à Nantes et Loire-Atlantique, recommandé par ses clients depuis plus de 10 ans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {REVIEWS.map((r, i) => (
            <article key={i} className="card p-6 flex flex-col gap-3">
              <Stars n={r.rating} />
              <p className="text-stone-700 text-sm leading-relaxed flex-1">« {r.text} »</p>
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-stone-100">
                <span className="font-semibold text-stone-800 text-sm">{r.author}</span>
                <span className="text-xs text-stone-400">{r.date}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
          <a href={COMPANY.googleReview} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2">
            <Star className="w-4 h-4" />
            Laisser un avis Google
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
          <a href={COMPANY.googleReview} target="_blank" rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2">
            Voir tous les avis
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
}
