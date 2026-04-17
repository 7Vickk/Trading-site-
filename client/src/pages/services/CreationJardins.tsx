import { useSEO } from '../../hooks/useSEO';
import ServicePageLayout from '../../components/ServicePageLayout';

export default function CreationJardins() {
  useSEO({
    title: 'Création de Jardins Nantes — Japonais, Méditerranéen, Contemporain | MAZEAS Paysages',
    description: 'Création de jardins sur mesure à Nantes et Loire-Atlantique : japonais, méditerranéen, contemporain, à la française, anglais. MAZEAS Paysages paysagiste créateur. Devis gratuit.',
    canonical: 'https://mazeaspaysages.fr/services/creation-jardins',
  });

  return (
    <ServicePageLayout
      title="Création de Jardins"
      subtitle="Conception et réalisation de jardins sur mesure à Nantes et Loire-Atlantique"
      breadcrumb="Création de Jardins"
      imageUrl="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80&auto=format&fit=crop"
      imageAlt="Jardin japonais créé par MAZEAS Paysages paysagiste à Nantes Loire-Atlantique"
      intro={[
        "La création d'un jardin est un projet unique qui reflète votre personnalité et votre style de vie. MAZEAS Paysages accompagne les particuliers et professionnels de Nantes, Loire-Atlantique et nord Vendée dans la conception et la réalisation de jardins sur mesure, du plan à la plantation finale.",
        "Victor et Gilles MAZEAS maîtrisent différents styles de jardins — japonais, méditerranéen, contemporain, à la française, anglais — et s'adaptent à la configuration de votre terrain, à votre exposition et à vos préférences végétales. Chaque jardin est pensé pour être beau en toutes saisons.",
        "Nous assurons la maîtrise d'œuvre complète : étude du terrain, plan de plantation, terrassement si nécessaire, préparation du sol, apport de terre végétale, pose de géotextile, plantation et paillage. Nous vous conseillons également sur l'arrosage automatique pour faciliter l'entretien.",
      ]}
      features={[
        "Jardin japonais (bambous, lanterne, eau)",
        "Jardin méditerranéen (lavande, olivier, romarin)",
        "Jardin contemporain (minimaliste, structuré)",
        "Jardin à la française (symétrie, buis taillés)",
        "Jardin anglais (romantique, naturel)",
        "Jardin potager paysager",
        "Jardin de rocaille et galets décoratifs",
        "Plan de plantation personnalisé",
        "Sélection et fourniture des végétaux",
        "Système d'arrosage automatique",
      ]}
      details={[
        {
          heading: "Jardin japonais à Nantes : sérénité et minimalisme",
          text: "Le jardin japonais est particulièrement adapté au style de vie nantais : calme, contemplatif et demandant peu d'entretien. MAZEAS Paysages crée des jardins japonais authentiques avec bassins à koïs, ponts en bois, lanternes en pierre, bambous, érables du Japon, mousses et rakes de gravier. Un espace de sérénité qui prend toute sa valeur en Loire-Atlantique.",
        },
        {
          heading: "Jardin méditerranéen : chaleur et garrigue dans votre jardin",
          text: "Avec le réchauffement climatique, le jardin méditerranéen se développe en Loire-Atlantique. Lavandes, romarins, sauges, oliviers, agaves, graminées et pierres calcaires : MAZEAS Paysages crée des espaces lumineux et colorés qui résistent à la sécheresse et demandent peu d'arrosage.",
        },
        {
          heading: "Création de jardin : notre méthode à Nantes",
          text: "Tout commence par une visite de votre terrain à Nantes ou en Loire-Atlantique. Nous analysons l'exposition, le type de sol, les vents dominants et votre budget. Nous rédigeons ensuite un plan de jardin avec les végétaux sélectionnés et un devis détaillé. Après validation, nous réalisons les travaux de terrassement, préparation du sol, plantation et finitions.",
        },
      ]}
    />
  );
}
