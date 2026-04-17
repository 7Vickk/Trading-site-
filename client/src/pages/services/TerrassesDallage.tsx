import { useSEO } from '../../hooks/useSEO';
import ServicePageLayout from '../../components/ServicePageLayout';

export default function TerrassesDallage() {
  useSEO({
    title: 'Terrasses et Dallage Nantes — Pierre naturelle, Béton | MAZEAS Paysages 44',
    description: 'Création de terrasses et dallages à Nantes et Loire-Atlantique. Pierre naturelle, béton désactivé, carrelage extérieur. MAZEAS Paysages, paysagiste artisan qualifié. Devis gratuit.',
    canonical: 'https://mazeaspaysages.fr/services/terrasses-dallage',
  });

  return (
    <ServicePageLayout
      title="Terrasses et Dallage"
      subtitle="Aménagement de terrasses en pierre, béton et carrelage extérieur"
      breadcrumb="Terrasses et Dallage"
      imageUrl="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format&fit=crop"
      imageAlt="Terrasse en pierre naturelle réalisée par MAZEAS Paysages à Nantes Loire-Atlantique"
      intro={[
        "La terrasse est le prolongement naturel de votre maison : un espace de vie extérieur où vous profitez du jardin en toute saison. MAZEAS Paysages crée et rénove des terrasses à Nantes et dans toute la Loire-Atlantique, avec des matériaux de qualité et des finitions soignées.",
        "Qu'il s'agisse d'une terrasse attenante à la maison, d'un dallage au fond du jardin ou d'un revêtement pour votre entrée, nos artisans paysagistes réalisent des travaux durables adaptés au sol et aux contraintes de votre terrain.",
        "Nous vous conseillons sur le choix des matériaux en fonction de votre budget, du style de votre maison et de l'usage prévu. Pierre naturelle, béton désactivé, carrelage extérieur antidérapant : chaque option a ses avantages que nous vous expliquons lors de notre visite gratuite.",
      ]}
      features={[
        "Terrasses en pierre naturelle (calcaire, ardoise, granite)",
        "Dallage en béton désactivé",
        "Terrasses en carrelage extérieur antidérapant",
        "Pose de dalles sur lit de sable ou mortier",
        "Margelles de piscine",
        "Escaliers extérieurs en pierre",
        "Drainage et évacuation des eaux pluviales",
        "Joints polymères résistants aux intempéries",
        "Rénovation de terrasses existantes",
        "Terrasses de plain-pied ou surélevées",
      ]}
      details={[
        {
          heading: "Pierre naturelle : élégance et durabilité",
          text: "La pierre naturelle est le matériau noble par excellence pour les terrasses nantaises. Calcaire du Limousin, ardoise de Corrèze, granite breton : nous sélectionnons des pierres adaptées au climat de Loire-Atlantique, résistantes au gel et aux intempéries. Chaque dalle est posée avec soin sur une fondation stable pour garantir une terrasse sans problème d'affaissement.",
        },
        {
          heading: "Béton désactivé : moderne et économique",
          text: "Le béton désactivé est une solution populaire à Nantes pour les terrasses et allées. Son aspect granuleux naturel s'intègre parfaitement aux jardins contemporains. Antidérapant, résistant et facile d'entretien, il offre un excellent rapport qualité/prix pour les grands espaces.",
        },
      ]}
    />
  );
}
