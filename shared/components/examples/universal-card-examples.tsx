"use client";

import { UniversalCard } from "@/shared/components/atoms/ui/universal-card";
import type { 
  EventCardItem, 
  PropertyCardItem, 
  ProductCardItem, 
  ProfileCardItem 
} from "@/shared/components/atoms/ui/universal-card";

// Données d'exemple pour différents contextes
const sampleEvent: EventCardItem = {
  id: "1",
  title: "Conférence Tech 2025",
  description: "Découvrez les dernières innovations en intelligence artificielle et développement web.",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
  date: "2025-08-15",
  time: "14:00",
  venue: "Centre de Conférences Paris",
  attendees: 150,
  maxAttendees: 200,
  price: {
    amount: 75,
    currency: "€",
    period: "once",
    original: 100,
    discount: 25
  },
  location: {
    city: "Paris",
    country: "France"
  },
  category: "Technologie",
  rating: 4.8,
  reviews: 120,
  tags: ["IA", "Web", "Innovation"],
  featured: true,
  status: "active",
  organizer: {
    name: "TechEvents",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
  },
  author: {
    name: "TechEvents",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    verified: true
  },
  createdAt: "2025-07-01"
};

const sampleProperty: PropertyCardItem = {
  id: "2",
  title: "Appartement moderne 3 pièces",
  description: "Magnifique appartement rénové avec vue sur le parc, proche transports.",
  image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
  propertyType: "apartment",
  surface: 85,
  rooms: 3,
  bedrooms: 2,
  bathrooms: 1,
  floor: 4,
  price: {
    amount: 1500,
    currency: "€",
    period: "month"
  },
  location: {
    address: "123 Avenue des Champs",
    city: "Lyon",
    country: "France"
  },
  amenities: ["Balcon", "Parking", "Ascenseur", "Cave"],
  energyClass: "B",
  furnished: true,
  category: "Location",
  rating: 4.5,
  reviews: 45,
  tags: ["Moderne", "Lumineux", "Transports"],
  featured: false,
  status: "available",
  agent: {
    name: "Sophie Martin",
    phone: "06 12 34 56 78",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5e8?w=100"
  },
  author: {
    name: "Sophie Martin",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5e8?w=100",
    verified: true
  },
  createdAt: "2025-07-10"
};

const sampleProduct: ProductCardItem = {
  id: "3",
  title: "MacBook Pro M3 14 pouces",
  description: "Ordinateur portable haute performance pour professionnels et créatifs.",
  image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
  brand: "Apple",
  model: "MacBook Pro 14",
  condition: "new",
  stock: 5,
  sku: "MBP-M3-14-512",
  price: {
    amount: 2299,
    currency: "€",
    period: "once",
    original: 2499,
    discount: 8
  },
  shipping: {
    free: true,
    estimated: "2-3 jours"
  },
  category: "Informatique",
  rating: 4.9,
  reviews: 234,
  tags: ["Apple", "Professionnel", "M3", "Nouveau"],
  featured: true,
  status: "available",
  seller: {
    name: "TechStore",
    rating: 4.8,
    verified: true
  },
  author: {
    name: "TechStore",
    verified: true
  },
  createdAt: "2025-07-12"
};

const sampleProfile: ProfileCardItem = {
  id: "4",
  title: "Jean Dupont",
  description: "Développeur Full-Stack spécialisé en React et Node.js avec 5 ans d'expérience.",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  profession: "Développeur Full-Stack",
  company: "TechCorp",
  experience: "5 ans",
  skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  availability: "available",
  price: {
    amount: 500,
    currency: "€",
    period: "day"
  },
  location: {
    city: "Marseille",
    country: "France"
  },
  social: {
    linkedin: "linkedin.com/in/jeandupont",
    website: "jeandupont.dev"
  },
  contact: {
    email: "jean@example.com",
    phone: "06 98 76 54 32"
  },
  category: "Développement",
  rating: 4.7,
  reviews: 89,
  tags: ["React", "Expert", "Freelance"],
  featured: false,
  status: "available",
  author: {
    name: "Jean Dupont",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    verified: true
  },
  createdAt: "2025-07-05"
};

export default function UniversalCardExamples() {
  const handleCardClick = (item: any) => {
    console.log('Card clicked:', item.title);
  };

  const handleApply = (item: any) => {
    console.log('Apply clicked:', item.title);
  };

  const handleBookmark = (item: any) => {
    console.log('Bookmark clicked:', item.title);
  };

  const handleShare = (item: any) => {
    console.log('Share clicked:', item.title);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Universal Card - Exemples</h1>
        <p className="text-gray-600 text-lg">
          Cartes adaptatives pour différents contextes et variantes
        </p>
      </div>

      {/* Événements */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Événements</h2>
        
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Variante par défaut</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <UniversalCard
              item={sampleEvent}
              context="event"
              variant="default"
              onClick={() => handleCardClick(sampleEvent)}
              actions={{
                primary: {
                  label: "S'inscrire",
                  onClick: () => handleApply(sampleEvent)
                },
                bookmark: () => handleBookmark(sampleEvent),
                share: () => handleShare(sampleEvent)
              }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Variante liste</h3>
          <UniversalCard
            item={sampleEvent}
            context="event"
            variant="list"
            onClick={() => handleCardClick(sampleEvent)}
            actions={{
              primary: {
                label: "S'inscrire",
                onClick: () => handleApply(sampleEvent)
              },
              secondary: {
                label: "Détails",
                onClick: () => handleCardClick(sampleEvent),
                variant: "outline"
              },
              bookmark: () => handleBookmark(sampleEvent),
              share: () => handleShare(sampleEvent)
            }}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Variantes compactes</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <UniversalCard
              item={sampleEvent}
              context="event"
              variant="compact"
              onClick={() => handleCardClick(sampleEvent)}
              actions={{
                bookmark: () => handleBookmark(sampleEvent),
                share: () => handleShare(sampleEvent)
              }}
            />
            <UniversalCard
              item={sampleEvent}
              context="event"
              variant="minimal"
              onClick={() => handleCardClick(sampleEvent)}
              actions={{
                bookmark: () => handleBookmark(sampleEvent)
              }}
            />
          </div>
        </div>
      </section>

      {/* Propriétés */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Propriétés immobilières</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <UniversalCard
            item={sampleProperty}
            context="property"
            variant="default"
            onClick={() => handleCardClick(sampleProperty)}
            actions={{
              primary: {
                label: "Visiter",
                onClick: () => handleApply(sampleProperty)
              },
              secondary: {
                label: "Contacter",
                onClick: () => console.log('Contact agent'),
                variant: "outline"
              },
              bookmark: () => handleBookmark(sampleProperty),
              share: () => handleShare(sampleProperty)
            }}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Variante liste immobilier</h3>
          <UniversalCard
            item={sampleProperty}
            context="property"
            variant="list"
            onClick={() => handleCardClick(sampleProperty)}
            actions={{
              primary: {
                label: "Visiter",
                onClick: () => handleApply(sampleProperty)
              },
              secondary: {
                label: "Appeler",
                onClick: () => console.log('Call agent'),
                variant: "outline"
              },
              bookmark: () => handleBookmark(sampleProperty),
              share: () => handleShare(sampleProperty)
            }}
          />
        </div>
      </section>

      {/* Produits */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Produits e-commerce</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <UniversalCard
            item={sampleProduct}
            context="product"
            variant="default"
            onClick={() => handleCardClick(sampleProduct)}
            actions={{
              primary: {
                label: "Ajouter au panier",
                onClick: () => handleApply(sampleProduct)
              },
              bookmark: () => handleBookmark(sampleProduct),
              share: () => handleShare(sampleProduct)
            }}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Variante compacte produit</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <UniversalCard
              item={sampleProduct}
              context="product"
              variant="compact"
              size="sm"
              onClick={() => handleCardClick(sampleProduct)}
              actions={{
                bookmark: () => handleBookmark(sampleProduct)
              }}
            />
          </div>
        </div>
      </section>

      {/* Profils */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Profils professionnels</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <UniversalCard
            item={sampleProfile}
            context="profile"
            variant="default"
            onClick={() => handleCardClick(sampleProfile)}
            actions={{
              primary: {
                label: "Contacter",
                onClick: () => handleApply(sampleProfile)
              },
              secondary: {
                label: "Portfolio",
                onClick: () => console.log('View portfolio'),
                variant: "outline"
              },
              bookmark: () => handleBookmark(sampleProfile),
              share: () => handleShare(sampleProfile)
            }}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Variante liste profil</h3>
          <UniversalCard
            item={sampleProfile}
            context="profile"
            variant="list"
            onClick={() => handleCardClick(sampleProfile)}
            actions={{
              primary: {
                label: "Embaucher",
                onClick: () => handleApply(sampleProfile)
              },
              secondary: {
                label: "Message",
                onClick: () => console.log('Send message'),
                variant: "outline"
              },
              bookmark: () => handleBookmark(sampleProfile),
              share: () => handleShare(sampleProfile)
            }}
          />
        </div>
      </section>

      {/* Tailles et options */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Tailles et options</h2>
        
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Différentes tailles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <UniversalCard
              item={sampleEvent}
              context="event"
              variant="default"
              size="sm"
              onClick={() => handleCardClick(sampleEvent)}
            />
            <UniversalCard
              item={sampleEvent}
              context="event"
              variant="default"
              size="md"
              onClick={() => handleCardClick(sampleEvent)}
            />
            <UniversalCard
              item={sampleEvent}
              context="event"
              variant="default"
              size="lg"
              onClick={() => handleCardClick(sampleEvent)}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Options d'affichage</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <UniversalCard
              item={sampleProduct}
              context="product"
              variant="default"
              showImage={false}
              showRating={false}
              onClick={() => handleCardClick(sampleProduct)}
            />
            <UniversalCard
              item={sampleProduct}
              context="product"
              variant="default"
              showActions={false}
              showAuthor={false}
              onClick={() => handleCardClick(sampleProduct)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
