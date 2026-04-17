import { useSEO } from '../../hooks/useSEO';
import ServicePageLayout from '../../components/ServicePageLayout';

export default function MaconneriePaysagere() {
  useSEO({
    title: 'Maçonnerie Paysagère Nantes — Pavage, Murets, Allées | MAZEAS Paysages 44',
    description: 'Pavage, murets, allées et parkings par MAZEAS Paysages, artisan maçon paysagiste à Nantes et Loire-Atlantique. Matériaux de qualité, finitions soignées. Devis gratuit.',
    canonical: 'https://mazeaspaysages.fr/services/maconnerie-paysagere',
  });

  return (
    <ServicePageLayout
      title="Maçonnerie Paysagère"
      subtitle="Pavage, murets, allées et parkings à Nantes et Loire-Atlantique"
      breadcrumb="Maçonnerie Paysagère"
      imageUrl="https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&q=80&auto=format&fit=crop"
      imageAlt="Allée pavée et maçonnerie paysagère réalisées par MAZEAS Paysages à Nantes"
      intro={[
        "La maçonnerie paysagère regroupe tous les travaux de construction liés à l'aménagement extérieur : allées, parkings, murets, escaliers, bordures et bassins. MAZEAS Paysages maîtrise ces techniques pour créer des espaces extérieurs fonctionnels, solides et esthétiques à Nantes et dans toute la Loire-Atlantique.",
        "Du simple muret en pierre sèche au parking béton capable d'accueillir plusieurs véhicules, nos artisans réalisent chaque ouvrage avec des matériaux de qualité et une expertise technique éprouvée. Nous adaptons les fondations au type de sol de votre terrain.",
        "En Loire-Atlantique, les sols argileux nécessitent une attention particulière lors de la pose de pavés ou de dallages. MAZEAS Paysages connaît parfaitement les contraintes locales pour garantir des ouvrages durables, sans affaissement ni fissuration.",
      ]}
      features={[
        "Allées en pavés autobloquants",
        "Allées et parkings en béton désactivé",
        "Pavage en pierre naturelle",
        "Murets en pierre sèche ou maçonnés",
        "Escaliers extérieurs pierre ou béton",
        "Bordures et caniveaux",
        "Bassins et fontaines de jardin",
        "Dallage de cours et cours de ferme",
        "Murs de soutènement",
        "Revêtement de parking engazonné",
      ]}
      details={[
        {
          heading: "Allées en pavés : durabilité et esthétique",
          text: "Les allées en pavés autobloquants ou en pavés de granit naturel sont la solution idéale pour les entrées de maison à Nantes et en Loire-Atlantique. Drainants, résistants au gel et à la charge des véhicules, ils embellissent immédiatement l'entrée d'une propriété. MAZEAS Paysages réalise la fondation (grave ciment ou grave-émulsion), le sablage et la pose des pavés selon les règles de l'art.",
        },
        {
          heading: "Murets en pierre : le charme du paysage nantais",
          text: "Les murets en pierre naturelle sont emblématiques du paysage bocager de Loire-Atlantique et de Vendée. MAZEAS Paysages construit des murets en pierres locales (schiste, granit, calcaire) pour délimiter les espaces, créer des niveaux ou soutenir des talus. Technique de pierre sèche ou maçonnée au mortier selon les besoins.",
        },
      ]}
    />
  );
}
