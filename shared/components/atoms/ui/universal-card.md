# Universal Card - Documentation

## Vue d'ensemble

Le composant `UniversalCard` est une carte adaptative qui peut être utilisée dans différents contextes (événements, propriétés, produits, profils, etc.) avec plusieurs variantes d'affichage.

## Caractéristiques principales

### 🎯 Multi-contextes
- **Events** : Événements, conférences, formations
- **Property** : Immobilier, locations, ventes
- **Product** : E-commerce, marketplace
- **Profile** : Profils utilisateurs, freelances
- **Blog** : Articles, actualités
- **Job** : Offres d'emploi
- **Service** : Services professionnels
- **Course** : Cours en ligne, formations, tutoriels
- **Media** : Vidéos, podcasts, musique, photos
- **Restaurant** : Restaurants, cafés, gastronomie
- **Travel** : Voyages, hôtels, activités touristiques
- **Tech** : Logiciels, librairies, outils de développement
- **Health** : Médecins, cliniques, services de santé
- **Finance** : Banques, investissements, assurances
- **News** : Articles de presse, actualités
- **Social** : Posts réseaux sociaux, contenus communautaires

### 🎨 Variantes d'affichage
- **default** : Carte standard avec image en haut
- **compact** : Version condensée avec image à gauche
- **minimal** : Version très simple pour listes
- **list** : Format liste étendu
- **featured** : Mise en avant spéciale

### 📐 Tailles disponibles
- **sm** : Petite (padding réduit, image 32px de haut)
- **md** : Moyenne (padding normal, image 48px de haut)
- **lg** : Grande (padding étendu, image 64px de haut)

## Types de données

### Structure de base (BaseCardItem)
```typescript
interface BaseCardItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  gallery?: string[];
  status?: "active" | "inactive" | "pending" | "sold" | "rented" | "available" | "completed" | "cancelled";
  featured?: boolean;
  urgent?: boolean;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  category?: string;
  rating?: number;
  reviews?: number;
  price?: {
    amount: number;
    currency: string;
    period?: "hour" | "day" | "week" | "month" | "year" | "once";
    original?: number;
    discount?: number;
  };
  location?: {
    address?: string;
    city?: string;
    country?: string;
    coordinates?: { lat: number; lng: number };
  };
  author?: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
}
```

### Types spécialisés

#### EventCardItem (Événements)
```typescript
interface EventCardItem extends BaseCardItem {
  date: string;
  endDate?: string;
  time?: string;
  venue?: string;
  attendees?: number;
  maxAttendees?: number;
  isOnline?: boolean;
  ticketPrice?: number;
  organizer?: {
    name: string;
    avatar?: string;
  };
}
```

#### PropertyCardItem (Immobilier)
```typescript
interface PropertyCardItem extends BaseCardItem {
  propertyType: "apartment" | "house" | "office" | "studio" | "villa" | "land";
  surface?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  amenities?: string[];
  energyClass?: string;
  availableFrom?: string;
  furnished?: boolean;
  petFriendly?: boolean;
  agent?: {
    name: string;
    phone?: string;
    avatar?: string;
  };
}
```

#### ProductCardItem (E-commerce)
```typescript
interface ProductCardItem extends BaseCardItem {
  brand?: string;
  model?: string;
  condition?: "new" | "used" | "refurbished";
  stock?: number;
  sku?: string;
  shipping?: {
    free: boolean;
    cost?: number;
    estimated?: string;
  };
  seller?: {
    name: string;
    rating?: number;
    verified?: boolean;
  };
}
```

#### ProfileCardItem (Profils)
```typescript
interface ProfileCardItem extends BaseCardItem {
  profession?: string;
  company?: string;
  experience?: string;
  skills?: string[];
  availability?: "available" | "busy" | "offline";
  social?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
  };
}
```

## Utilisation

### Exemple basique - Événement
```tsx
import { UniversalCard } from "@/shared/components/atoms/ui/universal-card";

const eventData = {
  id: "1",
  title: "Conférence Tech 2025",
  description: "Découvrez les dernières innovations en IA",
  image: "/images/event.jpg",
  date: "2025-08-15",
  time: "14:00",
  venue: "Centre de Conférences Paris",
  attendees: 150,
  maxAttendees: 200,
  price: {
    amount: 75,
    currency: "€",
    period: "once"
  },
  location: {
    city: "Paris",
    country: "France"
  },
  category: "Technologie",
  rating: 4.8,
  featured: true,
  status: "active"
};

<UniversalCard
  item={eventData}
  context="event"
  variant="default"
  onClick={() => console.log('Event clicked')}
  actions={{
    primary: {
      label: "S'inscrire",
      onClick: () => console.log('Register clicked')
    },
    bookmark: () => console.log('Bookmark clicked'),
    share: () => console.log('Share clicked')
  }}
/>
```

### Exemple - Propriété immobilière
```tsx
const propertyData = {
  id: "2",
  title: "Appartement moderne 3 pièces",
  description: "Magnifique appartement rénové avec vue sur le parc",
  image: "/images/apartment.jpg",
  propertyType: "apartment",
  surface: 85,
  rooms: 3,
  bedrooms: 2,
  bathrooms: 1,
  price: {
    amount: 1500,
    currency: "€",
    period: "month"
  },
  location: {
    city: "Lyon",
    country: "France"
  },
  amenities: ["Balcon", "Parking", "Ascenseur"],
  furnished: true,
  status: "available"
};

<UniversalCard
  item={propertyData}
  context="property"
  variant="list"
  actions={{
    primary: {
      label: "Visiter",
      onClick: () => console.log('Visit requested')
    },
    secondary: {
      label: "Contacter",
      onClick: () => console.log('Contact agent'),
      variant: "outline"
    }
  }}
/>
```

### Exemple - Produit e-commerce
```tsx
const productData = {
  id: "3",
  title: "MacBook Pro M3 14 pouces",
  description: "Ordinateur portable haute performance",
  image: "/images/macbook.jpg",
  brand: "Apple",
  model: "MacBook Pro 14",
  condition: "new",
  stock: 5,
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
  featured: true,
  status: "available"
};

<UniversalCard
  item={productData}
  context="product"
  variant="compact"
  size="md"
  actions={{
    primary: {
      label: "Ajouter au panier",
      onClick: () => console.log('Add to cart')
    }
  }}
/>
```

## Props du composant

### UniversalCardProps
```typescript
interface UniversalCardProps {
  item: UniversalCardItem;                    // Données de l'élément
  variant?: "default" | "compact" | "detailed" | "minimal" | "featured" | "list";
  context: "event" | "property" | "product" | "profile" | "blog" | "job" | "service";
  size?: "sm" | "md" | "lg";                  // Taille de la carte
  showImage?: boolean;                        // Afficher l'image (défaut: true)
  showActions?: boolean;                      // Afficher les actions (défaut: true)
  showRating?: boolean;                       // Afficher les étoiles (défaut: true)
  showPrice?: boolean;                        // Afficher le prix (défaut: true)
  showStatus?: boolean;                       // Afficher le statut (défaut: true)
  showAuthor?: boolean;                       // Afficher l'auteur (défaut: true)
  showDate?: boolean;                         // Afficher la date (défaut: true)
  showLocation?: boolean;                     // Afficher la localisation (défaut: true)
  actions?: {
    primary?: {
      label: string;
      onClick: () => void;
      variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    };
    secondary?: {
      label: string;
      onClick: () => void;
      variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    };
    bookmark?: () => void;
    share?: () => void;
    view?: () => void;
  };
  className?: string;                         // Classes CSS personnalisées
  onClick?: () => void;                       // Clic sur la carte
}
```

## Fonctionnalités avancées

### 🏷️ Badges automatiques
- **Vedette** : Affiché automatiquement si `featured: true`
- **Urgent** : Affiché automatiquement si `urgent: true`
- **Nouveau** : Affiché si créé dans les 7 derniers jours
- **Statut** : Badge coloré selon le contexte et le statut

### 💰 Gestion des prix
- Affichage avec devise et période
- Prix barré si prix original supérieur
- Badge de remise automatique
- Formatage localisé des montants

### ⭐ Système de notation
- Étoiles avec note numérique
- Nombre d'avis entre parenthèses
- Couleur automatique (jaune pour les étoiles)

### 📍 Localisation
- Affichage de la ville/pays
- Badge "Remote" pour les événements en ligne
- Adresse complète dans les variantes détaillées

### 🏷️ Tags et catégories
- Affichage automatique des tags (limité selon la variante)
- Badge de catégorie avec couleur thématique
- Troncature intelligente avec compteur "+X"

## Personnalisation

### CSS et classes
```tsx
<UniversalCard
  item={data}
  context="event"
  className="shadow-xl border-2 border-blue-500"
  // ... autres props
/>
```

### Actions personnalisées
```tsx
const customActions = {
  primary: {
    label: "Action principale",
    onClick: () => console.log('Primary action'),
    variant: "default" as const
  },
  secondary: {
    label: "Action secondaire",
    onClick: () => console.log('Secondary action'),
    variant: "outline" as const
  },
  bookmark: () => toggleBookmark(item.id),
  share: () => shareItem(item),
  view: () => viewDetails(item.id)
};
```

### Masquer des éléments
```tsx
<UniversalCard
  item={data}
  context="product"
  showImage={false}
  showRating={false}
  showAuthor={false}
  showDate={false}
/>
```

## Bonnes pratiques

### ✅ À faire
- Utiliser le bon contexte selon le type de données
- Fournir des actions cohérentes avec le contexte
- Adapter la variante selon l'espace disponible
- Inclure des images optimisées (WebP, tailles appropriées)
- Utiliser des descriptions courtes et pertinentes

### ❌ À éviter
- Mélanger les types de données avec les mauvais contextes
- Surcharger avec trop d'actions
- Utiliser des images trop lourdes
- Omettre les informations essentielles (prix, date, etc.)
- Négliger l'accessibilité (alt text, aria-labels)

## Exemples d'usage

### Liste de résultats de recherche
```tsx
<div className="space-y-4">
  {searchResults.map(item => (
    <UniversalCard
      key={item.id}
      item={item}
      context="product"
      variant="list"
      onClick={() => navigateToDetails(item.id)}
      actions={{
        primary: {
          label: "Voir détails",
          onClick: () => navigateToDetails(item.id)
        },
        bookmark: () => toggleBookmark(item.id)
      }}
    />
  ))}
</div>
```

### Grille de produits
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map(product => (
    <UniversalCard
      key={product.id}
      item={product}
      context="product"
      variant="default"
      size="md"
      onClick={() => viewProduct(product.id)}
      actions={{
        primary: {
          label: "Ajouter au panier",
          onClick: () => addToCart(product)
        }
      }}
    />
  ))}
</div>
```

### Cards compactes dans sidebar
```tsx
<div className="space-y-2">
  {recentItems.map(item => (
    <UniversalCard
      key={item.id}
      item={item}
      context="event"
      variant="minimal"
      size="sm"
      showActions={false}
      showRating={false}
      onClick={() => quickView(item.id)}
    />
  ))}
</div>
```
