"use client";

import React from 'react';
import { 
  Utensils, 
  ChefHat, 
  Coffee, 
  Cake, 
  Pizza, 
  Wine, 
  IceCream,
  Beer,
  CookingPot,
  Beef,
  Fish,
  Apple,
  Grape,
  Wheat,
  Cookie,
  Croissant
} from 'lucide-react';

// Icônes de nourriture spécialisées
export const FoodIcons = {
  // Plats principaux
  Pizza: Pizza,
  Beef: Beef,
  Fish: Fish,
  CookingPot: CookingPot,
  
  // Boissons
  Coffee: Coffee,
  Wine: Wine,
  Beer: Beer,
  
  // Desserts
  Cake: Cake,
  IceCream: IceCream,
  Cookie: Cookie,
  Croissant: Croissant,
  
  // Fruits et légumes
  Apple: Apple,
  Grape: Grape,
  Wheat: Wheat,
  
  // Ustensiles et équipements
  Utensils: Utensils,
  ChefHat: ChefHat,
} as const;

// Icônes SVG custom pour une meilleure variété
export const CustomFoodIcons = {
  // Icône de burger custom
  Burger: ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M4 8h16c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z" 
        fill="currentColor"
        opacity="0.8"
      />
      <rect x="3" y="9" width="18" height="2" fill="currentColor" />
      <rect x="3" y="12" width="18" height="1" fill="currentColor" opacity="0.6" />
      <rect x="3" y="14" width="18" height="1" fill="currentColor" opacity="0.6" />
      <path 
        d="M3 16h18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-1z" 
        fill="currentColor"
      />
    </svg>
  ),

  // Icône de plat gastronomique
  FineFood: ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path 
        d="M8 12c0-2 2-4 4-4s4 2 4 4" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
      />
      <circle cx="12" cy="14" r="2" fill="currentColor"/>
      <path d="M7 18h10" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),

  // Icône de cuisinier
  Cook: ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M8 3h8c1.1 0 2 .9 2 2v2H6V5c0-1.1.9-2 2-2z" 
        fill="currentColor"
      />
      <rect x="6" y="7" width="12" height="14" rx="1" fill="currentColor" opacity="0.8"/>
      <circle cx="12" cy="14" r="3" fill="white"/>
      <line x1="12" y1="12" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/>
      <line x1="10" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),

  // Icône de service de table
  TableService: ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="12" cy="10" rx="8" ry="2" fill="currentColor" opacity="0.8"/>
      <path 
        d="M4 10v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
      />
      <line x1="8" y1="6" x2="8" y2="10" stroke="currentColor" strokeWidth="2"/>
      <line x1="12" y1="4" x2="12" y2="10" stroke="currentColor" strokeWidth="2"/>
      <line x1="16" y1="6" x2="16" y2="10" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),

  // Icône de menu
  MenuCard: ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="2"/>
      <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="2"/>
      <line x1="7" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="2"/>
      <circle cx="17" cy="16" r="1" fill="currentColor"/>
    </svg>
  ),

  // Icône de livraison
  Delivery: ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6h2" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
      />
      <path 
        d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2h12z" 
        fill="currentColor"
      />
      <circle cx="7" cy="16" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="17" cy="16" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path 
        d="M16 8h2l2 4v4h-2" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
      />
      <path d="M12 6h4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),

  // Icône de réservation
  Reservation: ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="7" y1="2" x2="7" y2="6" stroke="currentColor" strokeWidth="2"/>
      <line x1="17" y1="2" x2="17" y2="6" stroke="currentColor" strokeWidth="2"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
      <rect x="8" y="13" width="8" height="2" fill="currentColor" rx="1"/>
      <circle cx="12" cy="17" r="1" fill="currentColor"/>
    </svg>
  ),

  // Icône de restaurant étoilé
  StarRestaurant: ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
        fill="currentColor"
        opacity="0.9"
      />
      <path 
        d="M8 14h8" 
        stroke="white" 
        strokeWidth="2"
      />
      <path 
        d="M10 16h4" 
        stroke="white" 
        strokeWidth="2"
      />
    </svg>
  ),

  // Icône d'ingrédients frais
  FreshIngredients: ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path 
        d="M15 15l6 6" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      <path 
        d="M9 6v6" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      <path 
        d="M6 9h6" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      <circle cx="18" cy="6" r="2" fill="currentColor"/>
    </svg>
  ),
} as const;

// Export combiné de toutes les icônes
export const AllFoodIcons = {
  ...FoodIcons,
  ...CustomFoodIcons,
} as const;

// Types pour TypeScript
export type FoodIconName = keyof typeof AllFoodIcons;

// Composant wrapper pour faciliter l'utilisation
interface FoodIconProps {
  name: FoodIconName;
  size?: number;
  className?: string;
}

export function FoodIcon({ name, size = 24, className }: FoodIconProps) {
  const IconComponent = AllFoodIcons[name];
  
  if (!IconComponent) {
    console.warn(`Icône "${name}" non trouvée`);
    return <Utensils size={size} className={className} />;
  }

  // Si c'est un composant Lucide
  if (typeof IconComponent === 'function' && 'displayName' in IconComponent) {
    const LucideIcon = IconComponent as React.ComponentType<{ size?: number; className?: string }>;
    return <LucideIcon size={size} className={className} />;
  }

  // Si c'est un composant custom
  const CustomIcon = IconComponent as React.ComponentType<{ size?: number; className?: string }>;
  return <CustomIcon size={size} className={className} />;
}

// Hook pour obtenir des icônes par catégorie
export function useFoodIconsByCategory() {
  return {
    plats: ['Pizza', 'Burger', 'Beef', 'Fish', 'CookingPot', 'FineFood'] as FoodIconName[],
    boissons: ['Coffee', 'Wine', 'Beer'] as FoodIconName[],
    desserts: ['Cake', 'IceCream', 'Cookie', 'Croissant'] as FoodIconName[],
    fruits: ['Apple', 'Grape'] as FoodIconName[],
    ustensiles: ['Utensils', 'ChefHat'] as FoodIconName[],
    service: ['TableService', 'MenuCard', 'Delivery', 'Reservation', 'StarRestaurant', 'Cook'] as FoodIconName[],
    ingredients: ['FreshIngredients', 'Wheat'] as FoodIconName[],
  };
}

export default FoodIcon;
