"use client";

import { UniversalCard } from "@/shared/components/atoms/ui/universal-card";
import type { 
  EventCardItem, 
  PropertyCardItem, 
  ProductCardItem, 
  ProfileCardItem,
  UniversalCardProps
} from "@/shared/components/atoms/ui/universal-card";
import { useUniversalCardTheme } from "@/shared/hooks/use-universal-card-theme";
import type { UniversalCardThemeName } from "@/shared/lib/themes/universal-card-themes";
import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface ThemedUniversalCardProps extends Omit<UniversalCardProps, 'className'> {
  themeName?: UniversalCardThemeName;
  className?: string;
}

/**
 * Composant UniversalCard avec support des thèmes intégré
 * Wrapper autour du composant UniversalCard original avec styles thématiques
 */
export function ThemedUniversalCard({
  themeName,
  className,
  variant = "default",
  size = "md",
  ...props
}: ThemedUniversalCardProps) {
  const {
    getCardStyles,
    getThemeClassName,
    getCSSVariables,
  } = useUniversalCardTheme(themeName);
  
  const cardStyles = getCardStyles(
    variant === "detailed" || variant === "featured" ? "default" : variant,
    size,
    props.item.featured,
    props.item.urgent
  );
  
  const themeVariables = getCSSVariables();
  
  return (
    <div 
      style={{...themeVariables, ...cardStyles}}
      className={cn(getThemeClassName(), className)}
    >
      <UniversalCard
        {...props}
        variant={variant}
        size={size}
        className="!bg-transparent !border-transparent !shadow-none !p-0"
      />
    </div>
  );
}

// Export du composant avec nom plus simple
export { ThemedUniversalCard as UniversalCardThemed };

// Données d'exemple étendues pour la démonstration
const sampleEvent: EventCardItem = {
  id: "1",
  title: "Conférence IA & Innovation 2025",
  description: "Découvrez les dernières avancées en intelligence artificielle, robotique et technologies émergentes avec les experts mondiaux du secteur.",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  date: "2025-08-15",
  endDate: "2025-08-17",
  time: "09:00",
  venue: "Palais des Congrès de Paris",
  attendees: 850,
  maxAttendees: 1200,
  isOnline: false,
  ticketPrice: 299,
  price: {
    amount: 249,
    currency: "€",
    period: "once",
    original: 299,
    discount: 17
  },
  location: {
    address: "2 Place de la Porte Maillot",
    city: "Paris",
    country: "France",
    coordinates: { lat: 48.8786, lng: 2.2840 }
  },
  category: "Technologie",
  rating: 4.8,
  reviews: 342,
  tags: ["IA", "Innovation", "Networking", "Tech", "Experts"],
  featured: true,
  urgent: false,
  status: "active",
  organizer: {
    name: "TechEvents Global",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
  },
  author: {
    name: "TechEvents Global",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    verified: true
  },
  createdAt: "2025-07-01T10:00:00Z"
};

const sampleProperty: PropertyCardItem = {
  id: "2",
  title: "Appartement de Luxe Vue Seine",
  description: "Exceptionnel appartement de 4 pièces entièrement rénové avec vue panoramique sur la Seine. Prestations haut de gamme, parking privatif.",
  image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=600&q=80"
  ],
  propertyType: "apartment",
  surface: 125,
  rooms: 4,
  bedrooms: 3,
  bathrooms: 2,
  floor: 8,
  price: {
    amount: 3500,
    currency: "€",
    period: "month"
  },
  location: {
    address: "15 Quai de Bourbon",
    city: "Paris 4ème",
    country: "France",
    coordinates: { lat: 48.8534, lng: 2.3488 }
  },
  amenities: ["Balcon", "Parking", "Ascenseur", "Cave", "Gardien", "Climatisation"],
  energyClass: "B",
  availableFrom: "2025-09-01",
  furnished: true,
  petFriendly: false,
  category: "Location Premium",
  rating: 4.9,
  reviews: 23,
  tags: ["Luxe", "Vue Seine", "Rénové", "Centre Paris"],
  featured: true,
  urgent: false,
  status: "available",
  agent: {
    name: "Sophie Martin",
    phone: "01 42 33 44 55",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5e8?w=100&q=80"
  },
  author: {
    name: "Immobilier Prestige Paris",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5e8?w=100&q=80",
    verified: true
  },
  createdAt: "2025-07-10T14:30:00Z"
};

const sampleProduct: ProductCardItem = {
  id: "3",
  title: "MacBook Pro M3 Pro 14\" 1TB",
  description: "Le MacBook Pro le plus avancé jamais créé. Puce M3 Pro révolutionnaire, écran Liquid Retina XDR, autonomie exceptionnelle jusqu'à 18h.",
  image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80"
  ],
  brand: "Apple",
  model: "MacBook Pro 14\" M3 Pro",
  condition: "new",
  stock: 12,
  sku: "MBP-M3PRO-14-1TB-SG",
  price: {
    amount: 2899,
    currency: "€",
    period: "once",
    original: 3199,
    discount: 9
  },
  shipping: {
    free: true,
    cost: 0,
    estimated: "24-48h"
  },
  category: "Ordinateurs Portables",
  rating: 4.9,
  reviews: 1847,
  tags: ["Apple", "M3 Pro", "Professionnel", "Nouveauté 2024", "Performance"],
  featured: true,
  urgent: false,
  status: "available",
  seller: {
    name: "Apple Store Officiel",
    rating: 4.9,
    verified: true
  },
  author: {
    name: "Apple",
    verified: true
  },
  createdAt: "2025-07-12T09:00:00Z"
};

const sampleProfile: ProfileCardItem = {
  id: "4",
  title: "Jean Dupont",
  description: "Développeur Full-Stack Senior spécialisé en React, Node.js et DevOps. Expert en architecture cloud AWS. 8 ans d'expérience en startup et scale-up.",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  profession: "Lead Developer Full-Stack",
  company: "TechCorp Innovation",
  experience: "8 ans",
  skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL", "GraphQL", "Next.js"],
  availability: "available",
  price: {
    amount: 650,
    currency: "€",
    period: "day"
  },
  location: {
    city: "Marseille",
    country: "France"
  },
  social: {
    linkedin: "linkedin.com/in/jeandupont-dev",
    twitter: "@jeandupont_dev",
    website: "jeandupont.dev"
  },
  contact: {
    email: "jean@jeandupont.dev",
    phone: "+33 6 98 76 54 32"
  },
  category: "Développement",
  rating: 4.8,
  reviews: 156,
  tags: ["React Expert", "AWS Certified", "Remote", "Startup", "Agile"],
  featured: false,
  urgent: false,
  status: "available",
  author: {
    name: "Jean Dupont",
    username: "jeandupont_dev",
    displayName: "Jean Dupont - Full-Stack Dev",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    verified: true
  },
  createdAt: "2025-07-05T16:45:00Z"
};

// Exemples de données pour d'autres contextes
const sampleCourse = {
  id: "5",
  title: "Maîtriser React & TypeScript",
  description: "Formation complète pour devenir expert en React et TypeScript. Projets réels, bonnes pratiques, déploiement.",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
  instructor: {
    name: "Marie Dubois",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5e8?w=100&q=80",
    rating: 4.9
  },
  duration: "40 heures",
  level: "intermediate" as const,
  language: "Français",
  chapters: 12,
  enrolled: 2847,
  maxStudents: 5000,
  certificateIncluded: true,
  startDate: "2025-09-15",
  format: "online" as const,
  price: {
    amount: 299,
    currency: "€",
    period: "once" as const,
    original: 399,
    discount: 25
  },
  category: "Développement Web",
  rating: 4.8,
  reviews: 892,
  tags: ["React", "TypeScript", "Frontend", "Certification"],
  featured: true,
  status: "active" as const,
  author: {
    name: "CodeAcademy Pro",
    verified: true
  },
  createdAt: "2025-07-08T11:00:00Z"
};

const sampleRestaurant = {
  id: "6",
  title: "Le Petit Bistrot",
  description: "Bistrot traditionnel français au cœur de Montmartre. Cuisine authentique, produits frais, ambiance chaleureuse.",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  cuisine: "Française Traditionnelle",
  priceRange: "$$" as const,
  openingHours: {
    "lundi": "12h-14h30, 19h-22h30",
    "mardi": "12h-14h30, 19h-22h30",
    "mercredi": "12h-14h30, 19h-22h30",
    "jeudi": "12h-14h30, 19h-23h",
    "vendredi": "12h-14h30, 19h-23h",
    "samedi": "12h-15h, 19h-23h30",
    "dimanche": "12h-15h"
  },
  phone: "+33 1 42 54 32 18",
  website: "lepetitbistrot-montmartre.fr",
  deliveryAvailable: true,
  deliveryTime: "30-45 min",
  minimumOrder: 25,
  features: ["Terrasse", "Wi-Fi", "Animaux acceptés", "Groupes"],
  chefSpecial: "Coq au vin de la grand-mère",
  location: {
    address: "18 Rue des Abbesses",
    city: "Paris 18ème",
    country: "France"
  },
  price: {
    amount: 35,
    currency: "€",
    period: "once" as const
  },
  category: "Restaurant",
  rating: 4.6,
  reviews: 324,
  tags: ["Bistrot", "Traditionnel", "Montmartre", "Terrasse"],
  featured: false,
  status: "active" as const,
  author: {
    name: "Le Petit Bistrot",
    verified: true
  },
  createdAt: "2025-07-03T08:30:00Z"
};

interface ThemeShowcaseProps {
  themeName: UniversalCardThemeName;
  title: string;
  description: string;
}

function ThemeShowcase({ themeName, title, description }: ThemeShowcaseProps) {
  const handleCardClick = (item: any) => {
    console.log(`Card clicked (${themeName}):`, item.title);
  };

  const handleAction = (action: string, item: any) => {
    console.log(`${action} clicked (${themeName}):`, item.title);
  };

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>

      {/* Variantes d'événements */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Événements - Différentes variantes</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          <ThemedUniversalCard
            item={sampleEvent}
            context="event"
            variant="default"
            themeName={themeName}
            onClick={() => handleCardClick(sampleEvent)}
            actions={{
              primary: {
                label: "S'inscrire",
                onClick: () => handleAction("Register", sampleEvent)
              },
              bookmark: () => handleAction("Bookmark", sampleEvent),
              share: () => handleAction("Share", sampleEvent)
            }}
          />
          <ThemedUniversalCard
            item={sampleEvent}
            context="event"
            variant="compact"
            themeName={themeName}
            onClick={() => handleCardClick(sampleEvent)}
          />
          <ThemedUniversalCard
            item={sampleEvent}
            context="event"
            variant="minimal"
            themeName={themeName}
            onClick={() => handleCardClick(sampleEvent)}
          />
        </div>
      </div>

      {/* Propriété en format liste */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Immobilier - Format liste</h3>
        <ThemedUniversalCard
          item={sampleProperty}
          context="property"
          variant="list"
          themeName={themeName}
          onClick={() => handleCardClick(sampleProperty)}
          actions={{
            primary: {
              label: "Visiter",
              onClick: () => handleAction("Visit", sampleProperty)
            },
            secondary: {
              label: "Contacter",
              onClick: () => handleAction("Contact", sampleProperty),
              variant: "outline"
            },
            bookmark: () => handleAction("Bookmark", sampleProperty),
            share: () => handleAction("Share", sampleProperty)
          }}
        />
      </div>

      {/* Produits et profils côte à côte */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">E-commerce & Profils</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          <ThemedUniversalCard
            item={sampleProduct}
            context="product"
            variant="default"
            themeName={themeName}
            onClick={() => handleCardClick(sampleProduct)}
            actions={{
              primary: {
                label: "Ajouter au panier",
                onClick: () => handleAction("Add to cart", sampleProduct)
              },
              bookmark: () => handleAction("Bookmark", sampleProduct)
            }}
          />
          <ThemedUniversalCard
            item={sampleProfile}
            context="profile"
            variant="default"
            themeName={themeName}
            onClick={() => handleCardClick(sampleProfile)}
            actions={{
              primary: {
                label: "Contacter",
                onClick: () => handleAction("Contact", sampleProfile)
              },
              secondary: {
                label: "Portfolio",
                onClick: () => handleAction("Portfolio", sampleProfile),
                variant: "outline"
              },
              bookmark: () => handleAction("Bookmark", sampleProfile)
            }}
          />
        </div>
      </div>

      {/* Cours et restaurant */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Formation & Restaurant</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          <ThemedUniversalCard
            item={sampleCourse as any}
            context="course"
            variant="default"
            themeName={themeName}
            onClick={() => handleCardClick(sampleCourse)}
            actions={{
              primary: {
                label: "S'inscrire",
                onClick: () => handleAction("Enroll", sampleCourse)
              },
              bookmark: () => handleAction("Bookmark", sampleCourse)
            }}
          />
          <ThemedUniversalCard
            item={sampleRestaurant as any}
            context="restaurant"
            variant="default"
            themeName={themeName}
            onClick={() => handleCardClick(sampleRestaurant)}
            actions={{
              primary: {
                label: "Réserver",
                onClick: () => handleAction("Book", sampleRestaurant)
              },
              secondary: {
                label: "Menu",
                onClick: () => handleAction("Menu", sampleRestaurant),
                variant: "outline"
              },
              bookmark: () => handleAction("Bookmark", sampleRestaurant)
            }}
          />
        </div>
      </div>

      {/* Différentes tailles */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Différentes tailles</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          <ThemedUniversalCard
            item={sampleProduct}
            context="product"
            variant="default"
            size="sm"
            themeName={themeName}
            onClick={() => handleCardClick(sampleProduct)}
          />
          <ThemedUniversalCard
            item={sampleProduct}
            context="product"
            variant="default"
            size="md"
            themeName={themeName}
            onClick={() => handleCardClick(sampleProduct)}
          />
          <ThemedUniversalCard
            item={sampleProduct}
            context="product"
            variant="default"
            size="lg"
            themeName={themeName}
            onClick={() => handleCardClick(sampleProduct)}
          />
        </div>
      </div>
    </section>
  );
}

export default function UniversalCardThemeShowcase() {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Universal Card - Showcase des Thèmes
        </h1>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto">
          Découvrez toutes les variantes thématiques du composant UniversalCard 
          avec des exemples réels pour différents contextes et cas d'usage.
        </p>
      </div>

      {/* Thème par défaut */}
      <ThemeShowcase
        themeName="default"
        title="🎨 Thème Default"
        description="Style élégant et neutre, parfait pour toutes les applications"
      />

      {/* Thème Glassmorphisme */}
      <ThemeShowcase
        themeName="glassmorphism"
        title="✨ Thème Glassmorphism"
        description="Effet de verre moderne avec transparence et flou"
      />

      {/* Thème sombre */}
      <ThemeShowcase
        themeName="dark"
        title="🌙 Thème Dark"
        description="Interface sombre élégante pour une expérience nocturne"
      />

      {/* Thème néon */}
      <ThemeShowcase
        themeName="neon"
        title="⚡ Thème Neon"
        description="Style cyberpunk avec des effets néon éclatants"
      />

      {/* Thème rétro */}
      <ThemeShowcase
        themeName="retro"
        title="📼 Thème Retro"
        description="Nostalgie vintage avec les couleurs chaudes des années 80"
      />

      {/* Section comparative */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">🔍 Comparaison des Thèmes</h2>
          <p className="text-gray-600 text-lg">
            Le même produit avec tous les thèmes pour voir les différences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {(['default', 'glassmorphism', 'dark', 'neon', 'retro'] as UniversalCardThemeName[]).map((themeName) => (
            <div key={themeName} className="space-y-4">
              <h3 className="text-lg font-semibold text-center capitalize">
                {themeName === 'default' ? 'Default' : 
                 themeName === 'glassmorphism' ? 'Glassmorphism' :
                 themeName === 'dark' ? 'Dark' :
                 themeName === 'neon' ? 'Neon' : 'Retro'}
              </h3>
              <ThemedUniversalCard
                item={sampleProduct}
                context="product"
                variant="default"
                themeName={themeName}
                onClick={() => console.log(`Comparison click: ${themeName}`)}
                actions={{
                  primary: {
                    label: "Acheter",
                    onClick: () => console.log(`Buy - ${themeName}`)
                  },
                  bookmark: () => console.log(`Bookmark - ${themeName}`)
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Guide d'utilisation */}
      <section className="bg-gray-50 rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">📚 Guide d'utilisation</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Installation</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`import { ThemedUniversalCard } from './themed-universal-card';

// Utilisation basique
<ThemedUniversalCard
  item={cardData}
  context="product"
  themeName="glassmorphism"
  variant="default"
  size="md"
/>`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Propriétés disponibles</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>themeName:</strong> 'default' | 'glassmorphism' | 'dark' | 'neon' | 'retro'</li>
              <li><strong>variant:</strong> 'default' | 'compact' | 'minimal' | 'list'</li>
              <li><strong>size:</strong> 'sm' | 'md' | 'lg'</li>
              <li><strong>context:</strong> 'event' | 'property' | 'product' | 'profile'...</li>
              <li><strong>+ toutes les props du UniversalCard original</strong></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
