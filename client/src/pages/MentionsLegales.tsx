import { useSEO } from '../hooks/useSEO';
import { COMPANY } from '../data/services';

export default function MentionsLegales() {
  useSEO({
    title: 'Mentions légales — MAZEAS Paysages',
    description: 'Mentions légales du site MAZEAS Paysages, paysagiste professionnel en Loire-Atlantique.',
    canonical: 'https://mazeaspaysages.fr/mentions-legales',
  });

  return (
    <div className="pt-24 section">
      <div className="container max-w-3xl">
        <h1 className="mb-8">Mentions légales</h1>

        <div className="prose prose-stone max-w-none space-y-8">
          <section>
            <h2>Éditeur du site</h2>
            <p><strong>MAZEAS Paysages</strong><br />
              SARL – {COMPANY.rcs}<br />
              {COMPANY.address}<br />
              {COMPANY.zip} {COMPANY.city}<br />
              Téléphone : <a href={COMPANY.phoneTel}>{COMPANY.phone}</a><br />
              E-mail : <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </p>
          </section>

          <section>
            <h2>Directeur de la publication</h2>
            <p>Victor MAZEAS et Gilles MAZEAS, gérants de la SARL MAZEAS Paysages.</p>
          </section>

          <section>
            <h2>Hébergement</h2>
            <p>Ce site est hébergé par <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis. <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
          </section>

          <section>
            <h2>Propriété intellectuelle</h2>
            <p>L'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété exclusive de MAZEAS Paysages ou de ses partenaires. Toute reproduction, même partielle, sans autorisation préalable est interdite.</p>
            <p>Les images d'illustration proviennent de <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>, utilisées sous licence libre.</p>
          </section>

          <section>
            <h2>Données personnelles</h2>
            <p>Les informations collectées via le formulaire de contact (nom, téléphone, e-mail, message) sont utilisées exclusivement pour répondre à vos demandes de devis. Elles ne sont ni revendues, ni transmises à des tiers.</p>
            <p>Conformément au RGPD et à la loi n°78-17 du 6 janvier 1978, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à : <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>Ce site n'utilise pas de cookies de traçage ou d'analyse. Aucune donnée de navigation n'est collectée à des fins publicitaires.</p>
          </section>

          <section>
            <h2>Limitation de responsabilité</h2>
            <p>MAZEAS Paysages s'efforce de fournir des informations exactes et à jour. Cependant, des erreurs ou omissions peuvent subsister. L'entreprise ne saurait être tenue responsable des dommages résultant de l'utilisation de ce site.</p>
          </section>

          <section>
            <h2>Droit applicable</h2>
            <p>Le présent site et ses mentions légales sont soumis au droit français. Tout litige sera soumis à la compétence des juridictions françaises.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
