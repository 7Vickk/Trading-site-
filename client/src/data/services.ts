export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  metaTitle: string;
  metaDesc: string;
  imageUrl: string;
  imageAlt: string;
  color: string;
}

export const SERVICES: Service[] = [
  {
    id: 'clotures-portails',
    slug: '/services/clotures-portails',
    title: 'Clôtures et Portails',
    icon: '🏡',
    shortDesc: 'Installation sur mesure de clôtures en bois, PVC, aluminium et de portails battants ou coulissants pour sécuriser votre propriété.',
    metaTitle: 'Clôtures et Portails à Nantes — MAZEAS Paysages, paysagiste Loire-Atlantique',
    metaDesc: 'MAZEAS Paysages installe vos clôtures et portails sur mesure à Nantes, Loire-Atlantique et nord Vendée. Bois, PVC, aluminium, portails automatiques. Devis gratuit.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Installation de clôture en bois par MAZEAS Paysages, paysagiste en Loire-Atlantique',
    color: 'from-amber-700 to-amber-900',
  },
  {
    id: 'terrasses-dallage',
    slug: '/services/terrasses-dallage',
    title: 'Terrasses et Dallage',
    icon: '🪨',
    shortDesc: 'Création de terrasses en pierre naturelle, béton, carrelage extérieur et dallages pour sublimer vos espaces extérieurs.',
    metaTitle: 'Terrasses et Dallage Nantes — MAZEAS Paysages paysagiste 44',
    metaDesc: 'Création de terrasses et dallages à Nantes et en Loire-Atlantique. Pierre naturelle, béton désactivé, carrelage extérieur. MAZEAS Paysages, artisan qualifié. Devis gratuit.',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Terrasse en pierre naturelle réalisée par MAZEAS Paysages à Nantes',
    color: 'from-stone-600 to-stone-800',
  },
  {
    id: 'gazon-synthetique',
    slug: '/services/gazon-synthetique',
    title: 'Gazon Synthétique',
    icon: '🌿',
    shortDesc: 'Pose de gazon synthétique haute qualité, résistant et esthétique, pour un jardin verdoyant toute l\'année sans entretien.',
    metaTitle: 'Gazon Synthétique Nantes — MAZEAS Paysages Loire-Atlantique',
    metaDesc: 'Pose de gazon synthétique à Nantes, Loire-Atlantique et Vendée. Résistant, esthétique, sans entretien. Garantie qualité MAZEAS Paysages. Devis gratuit.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Gazon synthétique posé par MAZEAS Paysages paysagiste Loire-Atlantique',
    color: 'from-green-600 to-green-800',
  },
  {
    id: 'maconnerie-paysagere',
    slug: '/services/maconnerie-paysagere',
    title: 'Maçonnerie Paysagère',
    icon: '🧱',
    shortDesc: 'Pavage, murets, allées, parkings… MAZEAS Paysages réalise tous vos travaux de maçonnerie pour des espaces fonctionnels et esthétiques.',
    metaTitle: 'Maçonnerie Paysagère Nantes — Pavage, Murets, Allées | MAZEAS Paysages',
    metaDesc: 'Pavage, murets, allées et parkings par MAZEAS Paysages, maçon paysagiste à Nantes et Loire-Atlantique. Matériaux de qualité, finitions soignées. Devis gratuit.',
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Allée pavée réalisée par MAZEAS Paysages, maçonnerie paysagère Nantes',
    color: 'from-slate-600 to-slate-800',
  },
  {
    id: 'constructions-bois',
    slug: '/services/constructions-bois',
    title: 'Constructions Bois',
    icon: '🪵',
    shortDesc: 'Fabrication et installation de pergolas, chalets de jardin et abris en bois traité pour créer des espaces de vie extérieurs durables.',
    metaTitle: 'Pergola et Chalet Bois Nantes — MAZEAS Paysages Loire-Atlantique',
    metaDesc: 'Construction de pergolas et chalets en bois à Nantes, Loire-Atlantique et Vendée. Bois traité, sur mesure, finitions qualité. MAZEAS Paysages. Devis gratuit.',
    imageUrl: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Pergola en bois construite par MAZEAS Paysages paysagiste à Nantes',
    color: 'from-yellow-800 to-yellow-950',
  },
  {
    id: 'creation-jardins',
    slug: '/services/creation-jardins',
    title: 'Création de Jardins',
    icon: '🌸',
    shortDesc: 'De la conception à la réalisation, MAZEAS Paysages crée votre jardin sur mesure : japonais, méditerranéen, contemporain, à la française ou anglais.',
    metaTitle: 'Création de Jardins Nantes — Paysagiste Loire-Atlantique | MAZEAS Paysages',
    metaDesc: 'Création de jardins sur mesure à Nantes et en Loire-Atlantique : japonais, méditerranéen, contemporain, français, anglais. MAZEAS Paysages, paysagiste créateur. Devis gratuit.',
    imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Création d\'un jardin japonais par MAZEAS Paysages à Nantes Loire-Atlantique',
    color: 'from-rose-700 to-rose-900',
  },
  {
    id: 'entretien-espaces-verts',
    slug: '/services/entretien-espaces-verts',
    title: 'Entretien Espaces Verts',
    icon: '✂️',
    shortDesc: 'Taille de haies, tonte, débroussaillage, abattage… Confiez l\'entretien de vos espaces verts à MAZEAS Paysages. Crédit d\'impôt 50% via SAP.',
    metaTitle: 'Entretien Espaces Verts Nantes — Taille Haie, Tonte | MAZEAS Paysages',
    metaDesc: 'Entretien espaces verts à Nantes, Loire-Atlantique et Vendée. Taille haie, tonte, débroussaillage, abattage. Crédit d\'impôt 50% SAP. MAZEAS Paysages. Devis gratuit.',
    imageUrl: 'https://images.unsplash.com/photo-1585911171167-0e91b61a7b13?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Entretien espaces verts et taille de haie par MAZEAS Paysages Nantes',
    color: 'from-primary-700 to-primary-900',
  },
];

export const COMPANY = {
  name: 'MAZEAS Paysages',
  slogan: "Le bien-être dans votre jardin est notre priorité",
  phone: '06 33 46 37 37',
  phoneTel: 'tel:+33633463737',
  email: 'mazeaspaysage@orange.fr',
  address: '7 chemin du bois clair, Lieu-dit Les Étangs',
  city: 'La Limouzinière',
  zip: '44310',
  rcs: 'SARL RCS 891 700 924 Nantes',
  zone: 'Nantes et périphérie, sud Loire-Atlantique, nord Vendée',
  instagram: 'https://www.instagram.com/mazeaspaysages/',
  facebook: 'https://www.facebook.com/mazeaspaysages/',
  googleReview: 'https://g.page/r/CWw1hKpGk0PvEBM/review',
};
