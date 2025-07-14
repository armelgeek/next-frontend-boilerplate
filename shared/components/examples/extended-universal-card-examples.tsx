"use client";

import { UniversalCard } from "@/shared/components/atoms/ui/universal-card";
import type { 
  CourseCardItem,
  MediaCardItem,
  RestaurantCardItem,
  TravelCardItem,
  TechCardItem,
  HealthCardItem,
  FinanceCardItem,
  NewsCardItem,
  SocialCardItem
} from "@/shared/components/atoms/ui/universal-card";

// Données d'exemple pour les nouveaux contextes
const sampleCourse: CourseCardItem = {
  id: "course1",
  title: "React & TypeScript : Maîtrise Complète",
  description: "Apprenez React et TypeScript de zéro jusqu'au niveau expert avec des projets pratiques.",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
  instructor: {
    name: "Marie Dubois",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5e8?w=100",
    rating: 4.9
  },
  duration: "25 heures",
  level: "intermediate",
  language: "Français",
  chapters: 12,
  enrolled: 2834,
  maxStudents: 5000,
  certificateIncluded: true,
  startDate: "2025-08-01",
  format: "online",
  price: {
    amount: 89,
    currency: "€",
    period: "once",
    original: 149,
    discount: 40
  },
  category: "Développement",
  rating: 4.8,
  reviews: 456,
  tags: ["React", "TypeScript", "Frontend"],
  featured: true,
  status: "active",
  prerequisites: ["JavaScript de base", "HTML/CSS"],
  author: {
    name: "Marie Dubois",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5e8?w=100",
    verified: true
  },
  createdAt: "2025-07-01"
};

const sampleMedia: MediaCardItem = {
  id: "media1",
  title: "Podcast Tech Weekly - Épisode 42",
  description: "Discussion sur l'intelligence artificielle et son impact sur le développement web.",
  image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400",
  mediaType: "podcast",
  duration: "1h 23min",
  artist: "Tech Weekly",
  genre: "Technologie",
  year: 2025,
  quality: "HD",
  views: 15623,
  likes: 892,
  downloads: 3421,
  chapters: [
    { title: "Introduction", timestamp: "00:00" },
    { title: "IA et développement", timestamp: "05:30" },
    { title: "Outils recommandés", timestamp: "45:12" }
  ],
  category: "Podcast",
  rating: 4.7,
  reviews: 234,
  tags: ["IA", "Développement", "Tech"],
  status: "active",
  author: {
    name: "Tech Weekly",
    verified: true
  },
  createdAt: "2025-07-14"
};

const sampleRestaurant: RestaurantCardItem = {
  id: "restaurant1",
  title: "Le Petit Bistrot",
  description: "Restaurant français traditionnel avec une cuisine authentique et une ambiance chaleureuse.",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
  cuisine: "Française",
  priceRange: "$$",
  openingHours: {
    "Lundi": "12h-14h, 19h-22h",
    "Mardi": "12h-14h, 19h-22h",
    "Mercredi": "Fermé"
  },
  phone: "01 42 34 56 78",
  website: "lepetitbistrot.fr",
  deliveryAvailable: true,
  deliveryTime: "30-45 min",
  minimumOrder: 25,
  features: ["Terrasse", "WiFi", "Réservation"],
  menu: [
    { name: "Coq au vin", price: 18, description: "Spécialité de la maison" },
    { name: "Bouillabaisse", price: 24 },
    { name: "Tarte Tatin", price: 8 }
  ],
  chefSpecial: "Coq au vin aux champignons",
  location: {
    address: "15 rue de la Paix",
    city: "Paris",
    country: "France"
  },
  category: "Restaurant",
  rating: 4.6,
  reviews: 387,
  tags: ["Authentique", "Terrasse", "Réservation"],
  status: "active",
  author: {
    name: "Le Petit Bistrot",
    verified: true
  },
  createdAt: "2025-06-15"
};

const sampleTravel: TravelCardItem = {
  id: "travel1",
  title: "Circuit Découverte du Japon",
  description: "Voyage de 14 jours à travers le Japon : Tokyo, Kyoto, Osaka et Mont Fuji.",
  image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400",
  destination: "Japon",
  travelType: "package",
  duration: "14 jours",
  departureDate: "2025-10-15",
  returnDate: "2025-10-29",
  departure: "Paris CDG",
  arrival: "Tokyo Narita",
  includes: ["Vols", "Hôtels 4*", "Guide francophone", "Transports"],
  excludes: ["Repas", "Assurance", "Pourboires"],
  difficulty: "easy",
  groupSize: 24,
  guide: {
    name: "Takeshi Yamamoto",
    languages: ["Français", "Japonais", "Anglais"],
    experience: "15 ans"
  },
  price: {
    amount: 3299,
    currency: "€",
    period: "once",
    original: 3899,
    discount: 15
  },
  location: {
    city: "Tokyo",
    country: "Japon"
  },
  category: "Voyage organisé",
  rating: 4.9,
  reviews: 156,
  tags: ["Culture", "Temples", "Gastronomie"],
  featured: true,
  status: "active",
  author: {
    name: "Voyages Sakura",
    verified: true
  },
  createdAt: "2025-06-01"
};

const sampleTech: TechCardItem = {
  id: "tech1",
  title: "NextAuth.js",
  description: "Solution d'authentification complète pour Next.js avec support de nombreux providers.",
  image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
  techType: "library",
  version: "4.24.7",
  platform: ["Next.js", "React", "Node.js"],
  compatibility: ["Next.js 13+", "React 18+"],
  requirements: ["Node.js 16+", "Next.js 12+"],
  license: "open-source",
  developer: "NextAuth.js Team",
  releaseDate: "2021-01-15",
  lastUpdate: "2025-07-10",
  downloadSize: "2.4 MB",
  language: ["TypeScript", "JavaScript"],
  framework: ["Next.js"],
  stars: 24567,
  forks: 3421,
  contributors: 234,
  documentation: "next-auth.js.org",
  demo: "demo.authjs.dev",
  category: "Authentification",
  rating: 4.8,
  reviews: 892,
  tags: ["Auth", "OAuth", "JWT", "Security"],
  status: "active",
  author: {
    name: "NextAuth.js",
    verified: true
  },
  createdAt: "2021-01-15"
};

const sampleHealth: HealthCardItem = {
  id: "health1",
  title: "Dr. Sophie Martin - Cardiologue",
  description: "Spécialiste en cardiologie avec 15 ans d'expérience. Consultations en cabinet et téléconsultations.",
  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
  healthType: "doctor",
  specialty: "Cardiologie",
  doctor: {
    name: "Sophie Martin",
    title: "Dr.",
    experience: "15 ans",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100"
  },
  availability: {
    nextAvailable: "2025-07-18",
    schedule: ["Lun-Ven 9h-17h", "Sam 9h-12h"]
  },
  insurance: ["CPAM", "Mutuelle", "Privé"],
  languages: ["Français", "Anglais"],
  consultationType: "in-person",
  consultationFee: 70,
  emergency: false,
  certifications: ["Diplôme de cardiologie", "Formation échographie"],
  affiliatedHospitals: ["Hôpital Saint-Louis", "Clinique du Parc"],
  location: {
    address: "25 Avenue des Champs",
    city: "Lyon",
    country: "France"
  },
  category: "Médecin spécialiste",
  rating: 4.9,
  reviews: 267,
  tags: ["Cardiologie", "Urgences", "Téléconsultation"],
  status: "active",
  author: {
    name: "Dr. Sophie Martin",
    verified: true
  },
  createdAt: "2024-01-15"
};

const sampleFinance: FinanceCardItem = {
  id: "finance1",
  title: "Livret Épargne Plus",
  description: "Livret d'épargne avec un taux attractif et disponibilité immédiate des fonds.",
  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
  financeType: "investment",
  interestRate: 3.5,
  term: "Durée libre",
  minimumAmount: 100,
  maximumAmount: 50000,
  fees: [
    { type: "Ouverture", amount: 0 },
    { type: "Tenue de compte", amount: 0 }
  ],
  benefits: ["Taux garanti 12 mois", "Pas de frais", "Disponibilité immédiate"],
  eligibility: ["Résider en France", "Être majeur"],
  riskLevel: "low",
  returns: {
    min: 3.0,
    max: 4.0,
    average: 3.5
  },
  provider: {
    name: "Banque Populaire",
    license: "Agrément ACPR",
    rating: 4.2
  },
  category: "Épargne",
  rating: 4.4,
  reviews: 523,
  tags: ["Épargne", "Taux garanti", "Sans frais"],
  status: "active",
  author: {
    name: "Banque Populaire",
    verified: true
  },
  createdAt: "2025-01-01"
};

const sampleNews: NewsCardItem = {
  id: "news1",
  title: "L'Intelligence Artificielle transforme l'industrie automobile",
  description: "Les constructeurs automobiles investissent massivement dans l'IA pour développer des véhicules autonomes plus sûrs.",
  image: "https://images.unsplash.com/photo-1555992336-03a23c3f8d96?w=400",
  newsType: "analysis",
  publishedAt: "2025-07-14T10:30:00Z",
  author: {
    name: "Jean Dupont",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    bio: "Journaliste spécialisé en technologie"
  },
  source: {
    name: "TechNews France",
    logo: "https://images.unsplash.com/photo-1586871608370-4adee64d1794?w=100",
    credibility: 8.5
  },
  readTime: "5 min",
  topic: "Technologie",
  region: "France",
  breaking: false,
  trending: true,
  verified: true,
  reactions: {
    likes: 1247,
    comments: 89,
    shares: 156
  },
  relatedArticles: ["article2", "article3"],
  category: "Technologie",
  rating: 4.3,
  tags: ["IA", "Automobile", "Innovation"],
  status: "active",
  createdAt: "2025-07-14"
};

const sampleSocial: SocialCardItem = {
  id: "social1",
  title: "Post sur les nouvelles tendances tech",
  description: "Partage d'expérience sur les dernières technologies web",
  image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
  socialType: "post",
  author: {
    username: "dev_marie",
    displayName: "Marie Développeuse",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5e8?w=100",
    verified: true,
    followers: 15420
  },
  postedAt: "2025-07-14T14:20:00Z",
  content: {
    text: "Excited to share my latest project using Next.js 14 and the new App Router! 🚀 The developer experience is amazing. #NextJS #React #WebDev",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
        thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200"
      }
    ]
  },
  engagement: {
    likes: 234,
    comments: 45,
    shares: 18,
    views: 3421
  },
  hashtags: ["NextJS", "React", "WebDev", "JavaScript"],
  mentions: ["@nextjs", "@vercel"],
  postLocation: "Paris, France",
  privacy: "public",
  category: "Social",
  tags: ["Développement", "Next.js", "React"],
  status: "active",
  createdAt: "2025-07-14"
};

export default function ExtendedUniversalCardExamples() {
  const handleCardClick = (item: any) => {
    console.log('Card clicked:', item.title);
  };

  const handleAction = (action: string, item: any) => {
    console.log(`${action} clicked:`, item.title);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Universal Card - Tous les Contextes</h1>
        <p className="text-gray-600 text-lg">
          Cartes adaptatives pour tous types de contenus et contextes
        </p>
      </div>

      {/* Cours en ligne */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Cours en ligne</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <UniversalCard
            item={sampleCourse}
            context="course"
            variant="default"
            onClick={() => handleCardClick(sampleCourse)}
            actions={{
              primary: {
                label: "S'inscrire",
                onClick: () => handleAction('Enroll', sampleCourse)
              },
              secondary: {
                label: "Aperçu",
                onClick: () => handleAction('Preview', sampleCourse),
                variant: "outline"
              },
              bookmark: () => handleAction('Bookmark', sampleCourse),
              share: () => handleAction('Share', sampleCourse)
            }}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Variante liste</h3>
          <UniversalCard
            item={sampleCourse}
            context="course"
            variant="list"
            onClick={() => handleCardClick(sampleCourse)}
            actions={{
              primary: {
                label: "Commencer",
                onClick: () => handleAction('Start', sampleCourse)
              },
              secondary: {
                label: "Syllabus",
                onClick: () => handleAction('Syllabus', sampleCourse),
                variant: "outline"
              }
            }}
          />
        </div>
      </section>

      {/* Médias */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Médias & Contenus</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <UniversalCard
            item={sampleMedia}
            context="media"
            variant="default"
            onClick={() => handleCardClick(sampleMedia)}
            actions={{
              primary: {
                label: "Écouter",
                onClick: () => handleAction('Play', sampleMedia)
              },
              secondary: {
                label: "Télécharger",
                onClick: () => handleAction('Download', sampleMedia),
                variant: "outline"
              },
              bookmark: () => handleAction('Bookmark', sampleMedia),
              share: () => handleAction('Share', sampleMedia)
            }}
          />
        </div>
      </section>

      {/* Restaurants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Restaurants & Gastronomie</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <UniversalCard
            item={sampleRestaurant}
            context="restaurant"
            variant="compact"
            onClick={() => handleCardClick(sampleRestaurant)}
            actions={{
              primary: {
                label: "Réserver",
                onClick: () => handleAction('Reserve', sampleRestaurant)
              },
              secondary: {
                label: "Commander",
                onClick: () => handleAction('Order', sampleRestaurant),
                variant: "outline"
              },
              bookmark: () => handleAction('Bookmark', sampleRestaurant)
            }}
          />
        </div>
      </section>

      {/* Voyages */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Voyages & Tourisme</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <UniversalCard
            item={sampleTravel}
            context="travel"
            variant="default"
            onClick={() => handleCardClick(sampleTravel)}
            actions={{
              primary: {
                label: "Réserver",
                onClick: () => handleAction('Book', sampleTravel)
              },
              secondary: {
                label: "Détails",
                onClick: () => handleAction('Details', sampleTravel),
                variant: "outline"
              },
              bookmark: () => handleAction('Bookmark', sampleTravel),
              share: () => handleAction('Share', sampleTravel)
            }}
          />
        </div>
      </section>

      {/* Technologies */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Technologies & Outils</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <UniversalCard
            item={sampleTech}
            context="tech"
            variant="list"
            onClick={() => handleCardClick(sampleTech)}
            actions={{
              primary: {
                label: "GitHub",
                onClick: () => handleAction('GitHub', sampleTech)
              },
              secondary: {
                label: "Documentation",
                onClick: () => handleAction('Docs', sampleTech),
                variant: "outline"
              },
              bookmark: () => handleAction('Star', sampleTech),
              share: () => handleAction('Share', sampleTech)
            }}
          />
        </div>
      </section>

      {/* Santé */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Santé & Médecine</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <UniversalCard
            item={sampleHealth}
            context="health"
            variant="default"
            onClick={() => handleCardClick(sampleHealth)}
            actions={{
              primary: {
                label: "Prendre RDV",
                onClick: () => handleAction('Appointment', sampleHealth)
              },
              secondary: {
                label: "Téléconsultation",
                onClick: () => handleAction('VideoCall', sampleHealth),
                variant: "outline"
              },
              bookmark: () => handleAction('Bookmark', sampleHealth)
            }}
          />
        </div>
      </section>

      {/* Finance */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Finance & Investissement</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <UniversalCard
            item={sampleFinance}
            context="finance"
            variant="default"
            onClick={() => handleCardClick(sampleFinance)}
            actions={{
              primary: {
                label: "Souscrire",
                onClick: () => handleAction('Subscribe', sampleFinance)
              },
              secondary: {
                label: "Simuler",
                onClick: () => handleAction('Simulate', sampleFinance),
                variant: "outline"
              },
              bookmark: () => handleAction('Bookmark', sampleFinance)
            }}
          />
        </div>
      </section>

      {/* Actualités */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Actualités & Presse</h2>
        
        <div className="space-y-4">
          <UniversalCard
            item={sampleNews}
            context="news"
            variant="list"
            onClick={() => handleCardClick(sampleNews)}
            actions={{
              primary: {
                label: "Lire l'article",
                onClick: () => handleAction('Read', sampleNews)
              },
              secondary: {
                label: "Commenter",
                onClick: () => handleAction('Comment', sampleNews),
                variant: "outline"
              },
              bookmark: () => handleAction('Bookmark', sampleNews),
              share: () => handleAction('Share', sampleNews)
            }}
          />
        </div>
      </section>

      {/* Réseaux sociaux */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Réseaux Sociaux</h2>
        
        <div className="max-w-2xl">
          <UniversalCard
            item={sampleSocial}
            context="social"
            variant="compact"
            onClick={() => handleCardClick(sampleSocial)}
            actions={{
              primary: {
                label: "J'aime",
                onClick: () => handleAction('Like', sampleSocial)
              },
              secondary: {
                label: "Commenter",
                onClick: () => handleAction('Comment', sampleSocial),
                variant: "outline"
              },
              share: () => handleAction('Share', sampleSocial)
            }}
          />
        </div>
      </section>

      {/* Comparaison des variantes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Comparaison des variantes</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Variante minimale</h3>
            <div className="grid gap-2 max-w-md">
              {[sampleCourse, sampleHealth, sampleTech].map((item, index) => (
                <UniversalCard
                  key={index}
                  item={item}
                  context={index === 0 ? "course" : index === 1 ? "health" : "tech"}
                  variant="minimal"
                  size="sm"
                  onClick={() => handleCardClick(item)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Variante compacte</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[sampleMedia, sampleFinance].map((item, index) => (
                <UniversalCard
                  key={index}
                  item={item}
                  context={index === 0 ? "media" : "finance"}
                  variant="compact"
                  onClick={() => handleCardClick(item)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Options d'affichage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Options d'affichage</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sans image</h3>
            <UniversalCard
              item={sampleCourse}
              context="course"
              variant="default"
              showImage={false}
              onClick={() => handleCardClick(sampleCourse)}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sans actions</h3>
            <UniversalCard
              item={sampleHealth}
              context="health"
              variant="default"
              showActions={false}
              onClick={() => handleCardClick(sampleHealth)}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Informations minimales</h3>
            <UniversalCard
              item={sampleTravel}
              context="travel"
              variant="default"
              showRating={false}
              showAuthor={false}
              showDate={false}
              onClick={() => handleCardClick(sampleTravel)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
