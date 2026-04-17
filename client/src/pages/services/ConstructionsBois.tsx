import { useSEO } from '../../hooks/useSEO';
import ServicePageLayout from '../../components/ServicePageLayout';

export default function ConstructionsBois() {
  useSEO({
    title: 'Pergola et Chalet Bois Nantes — Constructions Bois | MAZEAS Paysages Loire-Atlantique',
    description: 'Construction de pergolas et chalets en bois à Nantes, Loire-Atlantique et Vendée. Sur mesure, bois traité, finitions qualité. MAZEAS Paysages paysagiste artisan. Devis gratuit.',
    canonical: 'https://mazeaspaysages.fr/services/constructions-bois',
  });

  return (
    <ServicePageLayout
      title="Constructions Bois"
      subtitle="Pergolas, chalets et abris sur mesure pour vos espaces extérieurs"
      breadcrumb="Constructions Bois"
      imageUrl="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&q=80&auto=format&fit=crop"
      imageAlt="Pergola en bois construite sur mesure par MAZEAS Paysages à Nantes Loire-Atlantique"
      intro={[
        "Le bois apporte chaleur et authenticité à vos espaces extérieurs. MAZEAS Paysages conçoit et construit des pergolas, chalets de jardin et abris en bois traité sur mesure à Nantes et en Loire-Atlantique. Chaque réalisation est adaptée à votre espace, votre style architectural et vos besoins.",
        "Nos constructions bois sont réalisées avec du bois traité en classe 4, résistant aux intempéries du climat nantais. Nous sélectionnons des essences durables (pin sylvestre, douglas, mélèze) pour garantir une longévité de 20 à 30 ans avec un entretien minimal.",
        "Que vous souhaitiez créer un espace ombragé pour vos repas en extérieur, un atelier au fond du jardin ou un pool house autour de votre piscine, MAZEAS Paysages dispose des compétences pour concevoir et réaliser votre projet clé en main.",
      ]}
      features={[
        "Pergolas adossées ou autoportées",
        "Pergolas bioclimatiques à lames orientables",
        "Chalets de jardin et abris de stockage",
        "Pool house et locaux techniques",
        "Carports en bois (abris voiture)",
        "Terrasses bois (ipé, pin traité, composite)",
        "Bardage bois façade",
        "Traitement et lasure des bois",
        "Escaliers et passerelles bois",
        "Mobilier de jardin sur mesure",
      ]}
      details={[
        {
          heading: "Pergolas : créez votre espace de vie extérieur",
          text: "La pergola est l'aménagement tendance pour profiter de votre jardin nantais même par temps couvert. MAZEAS Paysages propose des pergolas adossées à la maison ou autoportées, avec toiture en polycarbonate, bâche imperméable, végétaux grimpants ou lames orientables. Une pergola bioclimatique permet même de réguler l'ensoleillement et la ventilation selon les saisons.",
        },
        {
          heading: "Chalets de jardin : espace de stockage ou bureau",
          text: "Un chalet de jardin bien construit est un investissement durable. MAZEAS Paysages réalise des chalets sur mesure avec isolation possible, fenêtres double vitrage, porte sécurisée et électricité. Idéal pour créer un atelier, un bureau de jardin ou un espace de jeu pour les enfants. Dimensions et aménagement intérieur selon vos besoins.",
        },
      ]}
    />
  );
}
