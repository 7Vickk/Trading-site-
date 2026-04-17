import { useSEO } from '../../hooks/useSEO';
import ServicePageLayout from '../../components/ServicePageLayout';

export default function EntretienEspacesVerts() {
  useSEO({
    title: 'Entretien Espaces Verts Nantes — Taille Haie, Tonte, Débroussaillage | MAZEAS Paysages',
    description: 'Entretien espaces verts à Nantes, Loire-Atlantique et Vendée. Taille haie, tonte, débroussaillage, abattage. Crédit d\'impôt 50% SAP. MAZEAS Paysages. Devis gratuit.',
    canonical: 'https://mazeaspaysages.fr/services/entretien-espaces-verts',
  });

  return (
    <ServicePageLayout
      title="Entretien Espaces Verts"
      subtitle="Taille, tonte, débroussaillage et abattage — Crédit d'impôt 50%"
      breadcrumb="Entretien Espaces Verts"
      imageUrl="https://images.unsplash.com/photo-1585911171167-0e91b61a7b13?w=1200&q=80&auto=format&fit=crop"
      imageAlt="Taille de haie et entretien espaces verts par MAZEAS Paysages à Nantes Loire-Atlantique"
      intro={[
        "MAZEAS Paysages assure l'entretien de vos espaces verts à Nantes, en Loire-Atlantique et dans le nord Vendée. Taille de haies, tonte de pelouse, débroussaillage, élagage et abattage d'arbres : nos équipes interviennent régulièrement pour maintenir votre jardin en parfait état tout au long de l'année.",
        "Grâce à notre agrément via la coopérative SAP (Service À la Personne), vous bénéficiez d'un crédit d'impôt de 50% sur le montant des travaux d'entretien. Concrètement, pour 200 € de travaux, vous ne payez que 100 € après déduction fiscale. Une raison de plus de confier votre jardin à des professionnels !",
        "MAZEAS Paysages intervient ponctuellement pour une intervention unique ou propose des contrats d'entretien régulier adaptés à votre jardin. Nous nous engageons sur des horaires précis, des équipes stables et un travail soigné à chaque passage.",
      ]}
      features={[
        "Taille de haies (toutes essences)",
        "Tonte et scarification de pelouse",
        "Débroussaillage de terrain",
        "Élagage et recépage d'arbres",
        "Abattage d'arbres dangereux",
        "Broyage de végétaux et évacuation",
        "Ramassage de feuilles",
        "Désherbage et binage de massifs",
        "Taille de rosiers et arbustes",
        "Entretien régulier (contrat annuel)",
      ]}
      details={[
        {
          heading: "Crédit d'impôt 50% : économisez sur votre entretien de jardin",
          text: "MAZEAS Paysages est agréé via la coopérative SAP (Services À la Personne), ce qui vous permet de bénéficier d'un crédit d'impôt de 50% sur toutes les prestations d'entretien de jardin réalisées à votre domicile principal. Cette réduction s'applique directement sur votre impôt sur le revenu. Nous vous fournissons une attestation fiscale annuelle à joindre à votre déclaration d'impôts.",
        },
        {
          heading: "Taille de haies à Nantes et en Loire-Atlantique",
          text: "La taille de haie est une prestation phare de MAZEAS Paysages en Loire-Atlantique. Nous intervenons sur toutes les essences : thuyas, lauriers, charmes, troènes, photinias, bambous, etc. Nos professionnels utilisent du matériel professionnel pour des coupes nettes et des haies parfaitement entretenues. La période idéale pour tailler vos haies à Nantes s'étend de mars à septembre selon les essences.",
        },
        {
          heading: "Abattage et élagage en toute sécurité",
          text: "L'élagage et l'abattage d'arbres sont des opérations techniques qui nécessitent formation et matériel adapté. MAZEAS Paysages dispose des équipements de sécurité et des compétences pour intervenir sur tout type d'arbre, des fruitiers aux grands chênes. Broyage sur place ou évacuation des déchets verts selon votre préférence.",
        },
      ]}
    />
  );
}
