import { useSEO } from '../../hooks/useSEO';
import ServicePageLayout from '../../components/ServicePageLayout';

export default function GazonSynthetique() {
  useSEO({
    title: 'Gazon Synthétique Nantes — Pose professionnelle | MAZEAS Paysages Loire-Atlantique',
    description: 'Pose de gazon synthétique à Nantes, Loire-Atlantique et nord Vendée. Résistant, esthétique, sans entretien. Garantie qualité MAZEAS Paysages. Devis gratuit.',
    canonical: 'https://mazeaspaysages.fr/services/gazon-synthetique',
  });

  return (
    <ServicePageLayout
      title="Gazon Synthétique"
      subtitle="Un jardin verdoyant toute l'année, sans tonte ni arrosage"
      breadcrumb="Gazon Synthétique"
      imageUrl="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop"
      imageAlt="Gazon synthétique posé par MAZEAS Paysages paysagiste Loire-Atlantique Nantes"
      intro={[
        "Le gazon synthétique est de plus en plus plébiscité à Nantes et en Loire-Atlantique pour son aspect naturel, sa durabilité et son entretien quasi nul. MAZEAS Paysages sélectionne des gazons synthétiques de haute qualité, conçus pour résister aux UV, aux intempéries et à un usage intensif.",
        "Fini la tonte hebdomadaire, les zones jaunes en été et les semis ratés ! Votre pelouse reste verte et soignée 365 jours par an, sans arrosage ni traitement phytosanitaire. Une solution idéale pour les familles avec enfants, les propriétaires de chiens, et tous ceux qui souhaitent un jardin beau sans contrainte.",
        "MAZEAS Paysages assure la préparation du sol, la pose d'une membrane anti-mauvaises herbes, du drainage adapté et la fixation du gazon synthétique pour une durée de vie de 15 à 20 ans.",
      ]}
      features={[
        "Gazon synthétique aspect naturel réaliste",
        "Hauteur de mèche de 20 à 45 mm selon usage",
        "Résistant UV, gel et usage intensif",
        "Préparation et terrassement du sol",
        "Pose de membrane géotextile anti-mauvaises herbes",
        "Drainage intégré pour évacuation des eaux",
        "Fixation périphérique durable",
        "Finitions bordures soignées",
        "Gazon pour terrasse, jardin ou usage sportif",
        "Entretien minimal (brossage occasionnel)",
      ]}
      details={[
        {
          heading: "Gazon synthétique vs gazon naturel à Nantes",
          text: "Le climat de Loire-Atlantique, avec ses étés parfois secs et ses hivers humides, peut être difficile pour le gazon naturel. Les périodes de sécheresse créent des zones brûlées, tandis que les sols argileux nantais favorisent les zones boueuses. Le gazon synthétique élimine ces problèmes tout en conservant un beau rendu visuel tout au long de l'année.",
        },
        {
          heading: "Installation professionnelle pour une durée de 15 à 20 ans",
          text: "Une installation réussie commence par une préparation du sol irréprochable. MAZEAS Paysages procède au décaissement, à la mise en place d'un lit de sable ou de gravillons drainant, d'une géogrille de stabilisation et de la membrane anti-racines. Le gazon est ensuite fixé et tendu pour éviter tout plissement. Nos installations sont garanties.",
        },
      ]}
    />
  );
}
