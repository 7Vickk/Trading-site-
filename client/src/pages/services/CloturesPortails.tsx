import { useSEO } from '../../hooks/useSEO';
import ServicePageLayout from '../../components/ServicePageLayout';

export default function CloturesPortails() {
  useSEO({
    title: 'Clôtures et Portails Nantes — Installation sur mesure | MAZEAS Paysages 44',
    description: 'Installation de clôtures et portails à Nantes, Loire-Atlantique et nord Vendée. Bois, PVC, aluminium, portails automatiques. Artisan paysagiste MAZEAS Paysages. Devis gratuit.',
    canonical: 'https://mazeaspaysages.fr/services/clotures-portails',
  });

  return (
    <ServicePageLayout
      title="Clôtures et Portails"
      subtitle="Installation sur mesure à Nantes et en Loire-Atlantique"
      breadcrumb="Clôtures et Portails"
      imageUrl="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop"
      imageAlt="Installation de clôture sur mesure par MAZEAS Paysages, paysagiste Loire-Atlantique Nantes"
      intro={[
        "MAZEAS Paysages installe vos clôtures et portails sur mesure à Nantes, dans le sud Loire-Atlantique et le nord Vendée. Que vous souhaitiez délimiter votre propriété, sécuriser votre jardin ou améliorer l'esthétique de votre extérieur, Victor et Gilles MAZEAS vous proposent une solution adaptée à vos besoins et à votre budget.",
        "Nous travaillons avec une large gamme de matériaux — bois, PVC, aluminium, métal galvanisé, grillage rigide — pour s'adapter à tous les styles de maisons et de jardins, des pavillons de Nantes aux propriétés rurales du sud Loire-Atlantique.",
        "Chaque installation est précédée d'une visite sur site gratuite et d'un devis détaillé. Nous respectons les règles d'urbanisme locales et assurons une pose soignée avec nivellement parfait et finitions impeccables.",
      ]}
      features={[
        "Clôtures en bois naturel ou traité",
        "Clôtures PVC (blanc, gris, imitation bois)",
        "Clôtures aluminium et métal galvanisé",
        "Grillage rigide et grillage souple",
        "Palissades et claustra décoratifs",
        "Portails battants sur mesure",
        "Portails coulissants motorisés",
        "Automatisation de portails existants",
        "Interphones et visiophone",
        "Poteaux béton, bois ou métal",
      ]}
      details={[
        {
          heading: "Clôtures en bois : le charme naturel",
          text: "Le bois reste le matériau favori des paysagistes de Loire-Atlantique pour sa chaleur et son intégration naturelle dans l'environnement. MAZEAS Paysages propose des clôtures en bois autoclave ou traité en classe 4, résistantes aux intempéries du climat nantais. Palissades, lames verticales ou horizontales, claustra : nous adaptons le style à votre maison.",
        },
        {
          heading: "Portails automatiques : confort et sécurité",
          text: "Nos portails coulissants ou battants peuvent être motorisés avec des systèmes de marques reconnues (FAAC, BFT, NICE). Télécommande, badge ou visiophone : nous installons la solution de contrôle d'accès adaptée à votre usage. Idéal pour les maisons de Nantes et la périphérie où la sécurité est une priorité.",
        },
        {
          heading: "Devis gratuit pour votre clôture à Nantes",
          text: "Vous souhaitez installer une clôture ou un portail à Nantes, Saint-Philbert-de-Grand-Lieu, La Limouzinière ou dans le nord Vendée ? Contactez MAZEAS Paysages pour un devis gratuit et sans engagement. Victor ou Gilles se déplace chez vous pour évaluer votre projet.",
        },
      ]}
    />
  );
}
