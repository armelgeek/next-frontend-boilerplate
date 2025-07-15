"use client";

import React from 'react';
import { FoodIcon, type FoodIconName } from '@/shared/components/atoms/icons/food-icons';

interface RestaurantBackgroundProps {
  density?: 'light' | 'medium' | 'dense' | 'ultra-dense' | 'mega-dense';
  variant?: 'default' | 'hero' | 'section';
  className?: string;
  maxIcons?: number; // Limite le nombre d'icônes affichées
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}

const ICON_SETS = {
  light: [
    { name: 'Pizza', size: 60, color: 'text-amber-600', opacity: 'opacity-5' },
    { name: 'Wine', size: 40, color: 'text-purple-600', opacity: 'opacity-8' },
    { name: 'ChefHat', size: 45, color: 'text-amber-700', opacity: 'opacity-6' },
    { name: 'Coffee', size: 38, color: 'text-orange-700', opacity: 'opacity-7' },
    { name: 'Burger', size: 52, color: 'text-amber-600', opacity: 'opacity-4' },
    { name: 'Cake', size: 44, color: 'text-pink-600', opacity: 'opacity-6' },
  ],
  medium: [
    { name: 'Pizza', size: 60, color: 'text-amber-600', opacity: 'opacity-5' },
    { name: 'Wine', size: 40, color: 'text-purple-600', opacity: 'opacity-8' },
    { name: 'Cake', size: 50, color: 'text-pink-600', opacity: 'opacity-6' },
    { name: 'ChefHat', size: 45, color: 'text-amber-700', opacity: 'opacity-7' },
    { name: 'Utensils', size: 35, color: 'text-amber-800', opacity: 'opacity-6' },
    { name: 'Coffee', size: 38, color: 'text-orange-700', opacity: 'opacity-8' },
    { name: 'Burger', size: 55, color: 'text-amber-600', opacity: 'opacity-5' },
    { name: 'IceCream', size: 42, color: 'text-blue-400', opacity: 'opacity-7' },
    { name: 'Fish', size: 44, color: 'text-blue-600', opacity: 'opacity-5' },
    { name: 'Cook', size: 40, color: 'text-amber-700', opacity: 'opacity-6' },
    { name: 'Beer', size: 36, color: 'text-amber-700', opacity: 'opacity-7' },
    { name: 'Apple', size: 34, color: 'text-red-500', opacity: 'opacity-5' },
  ],
  dense: [
    { name: 'Pizza', size: 60, color: 'text-amber-600', opacity: 'opacity-5' },
    { name: 'Wine', size: 40, color: 'text-purple-600', opacity: 'opacity-8' },
    { name: 'Cake', size: 50, color: 'text-pink-600', opacity: 'opacity-6' },
    { name: 'ChefHat', size: 45, color: 'text-amber-700', opacity: 'opacity-7' },
    { name: 'Utensils', size: 35, color: 'text-amber-800', opacity: 'opacity-6' },
    { name: 'Coffee', size: 38, color: 'text-orange-700', opacity: 'opacity-8' },
    { name: 'Burger', size: 55, color: 'text-amber-600', opacity: 'opacity-5' },
    { name: 'IceCream', size: 42, color: 'text-blue-400', opacity: 'opacity-7' },
    { name: 'Fish', size: 48, color: 'text-blue-600', opacity: 'opacity-6' },
    { name: 'FineFood', size: 38, color: 'text-amber-500', opacity: 'opacity-7' },
    { name: 'Cook', size: 42, color: 'text-amber-700', opacity: 'opacity-4' },
    { name: 'CookingPot', size: 36, color: 'text-orange-600', opacity: 'opacity-6' },
    { name: 'Cookie', size: 40, color: 'text-yellow-600', opacity: 'opacity-5' },
    { name: 'Croissant', size: 36, color: 'text-amber-600', opacity: 'opacity-7' },
    { name: 'Beer', size: 35, color: 'text-amber-700', opacity: 'opacity-6' },
    { name: 'Apple', size: 32, color: 'text-red-500', opacity: 'opacity-5' },
    { name: 'Grape', size: 30, color: 'text-purple-500', opacity: 'opacity-6' },
    { name: 'Wheat', size: 38, color: 'text-yellow-600', opacity: 'opacity-4' },
  ],
  'ultra-dense': [
    // Plats principaux
    { name: 'Pizza', size: 60, color: 'text-amber-600', opacity: 'opacity-5' },
    { name: 'Burger', size: 55, color: 'text-amber-600', opacity: 'opacity-5' },
    { name: 'Fish', size: 48, color: 'text-blue-600', opacity: 'opacity-6' },
    { name: 'Beef', size: 52, color: 'text-red-600', opacity: 'opacity-5' },
    { name: 'FineFood', size: 38, color: 'text-amber-500', opacity: 'opacity-7' },
    { name: 'CookingPot', size: 36, color: 'text-orange-600', opacity: 'opacity-6' },
    
    // Boissons
    { name: 'Wine', size: 40, color: 'text-purple-600', opacity: 'opacity-8' },
    { name: 'Coffee', size: 38, color: 'text-orange-700', opacity: 'opacity-8' },
    { name: 'Beer', size: 35, color: 'text-amber-700', opacity: 'opacity-6' },
    
    // Desserts
    { name: 'Cake', size: 50, color: 'text-pink-600', opacity: 'opacity-6' },
    { name: 'IceCream', size: 42, color: 'text-blue-400', opacity: 'opacity-7' },
    { name: 'Cookie', size: 44, color: 'text-yellow-600', opacity: 'opacity-5' },
    { name: 'Croissant', size: 38, color: 'text-amber-600', opacity: 'opacity-7' },
    
    // Fruits et légumes
    { name: 'Apple', size: 32, color: 'text-red-500', opacity: 'opacity-5' },
    { name: 'Grape', size: 30, color: 'text-purple-500', opacity: 'opacity-6' },
    
    // Ustensiles et service
    { name: 'ChefHat', size: 45, color: 'text-amber-700', opacity: 'opacity-7' },
    { name: 'Utensils', size: 35, color: 'text-amber-800', opacity: 'opacity-6' },
    { name: 'Cook', size: 42, color: 'text-amber-700', opacity: 'opacity-4' },
    { name: 'TableService', size: 40, color: 'text-amber-600', opacity: 'opacity-5' },
    { name: 'MenuCard', size: 36, color: 'text-orange-600', opacity: 'opacity-6' },
    { name: 'Delivery', size: 38, color: 'text-green-600', opacity: 'opacity-5' },
    { name: 'Reservation', size: 34, color: 'text-blue-600', opacity: 'opacity-6' },
    { name: 'StarRestaurant', size: 32, color: 'text-yellow-500', opacity: 'opacity-7' },
    
    // Ingrédients
    { name: 'Wheat', size: 40, color: 'text-yellow-600', opacity: 'opacity-4' },
    { name: 'FreshIngredients', size: 36, color: 'text-green-600', opacity: 'opacity-5' },
  ],
  'mega-dense': [
    // Collection complète avec toutes les icônes disponibles
    // Plats principaux - variés en taille et couleur
    { name: 'Pizza', size: 65, color: 'text-amber-600', opacity: 'opacity-5' },
    { name: 'Burger', size: 58, color: 'text-amber-600', opacity: 'opacity-4' },
    { name: 'Fish', size: 50, color: 'text-blue-600', opacity: 'opacity-6' },
    { name: 'Beef', size: 55, color: 'text-red-600', opacity: 'opacity-5' },
    { name: 'FineFood', size: 42, color: 'text-amber-500', opacity: 'opacity-7' },
    { name: 'CookingPot', size: 40, color: 'text-orange-600', opacity: 'opacity-6' },
    
    // Boissons - palette variée
    { name: 'Wine', size: 45, color: 'text-purple-600', opacity: 'opacity-8' },
    { name: 'Coffee', size: 42, color: 'text-orange-700', opacity: 'opacity-8' },
    { name: 'Beer', size: 38, color: 'text-amber-700', opacity: 'opacity-6' },
    
    // Desserts - couleurs gourmandes
    { name: 'Cake', size: 55, color: 'text-pink-600', opacity: 'opacity-6' },
    { name: 'IceCream', size: 46, color: 'text-blue-400', opacity: 'opacity-7' },
    { name: 'Cookie', size: 48, color: 'text-yellow-600', opacity: 'opacity-5' },
    { name: 'Croissant', size: 42, color: 'text-amber-600', opacity: 'opacity-7' },
    
    // Fruits et légumes - couleurs naturelles
    { name: 'Apple', size: 36, color: 'text-red-500', opacity: 'opacity-5' },
    { name: 'Grape', size: 34, color: 'text-purple-500', opacity: 'opacity-6' },
    
    // Ustensiles et service - teintes professionnelles
    { name: 'ChefHat', size: 50, color: 'text-amber-700', opacity: 'opacity-7' },
    { name: 'Utensils', size: 40, color: 'text-amber-800', opacity: 'opacity-6' },
    { name: 'Cook', size: 46, color: 'text-amber-700', opacity: 'opacity-4' },
    { name: 'TableService', size: 44, color: 'text-amber-600', opacity: 'opacity-5' },
    { name: 'MenuCard', size: 40, color: 'text-orange-600', opacity: 'opacity-6' },
    { name: 'Delivery', size: 42, color: 'text-green-600', opacity: 'opacity-5' },
    { name: 'Reservation', size: 38, color: 'text-blue-600', opacity: 'opacity-6' },
    { name: 'StarRestaurant', size: 36, color: 'text-yellow-500', opacity: 'opacity-7' },
    
    // Ingrédients - couleurs organiques
    { name: 'Wheat', size: 44, color: 'text-yellow-600', opacity: 'opacity-4' },
    { name: 'FreshIngredients', size: 40, color: 'text-green-600', opacity: 'opacity-5' },
    
    // Doublons avec variations pour plus de densité
    { name: 'Pizza', size: 45, color: 'text-orange-600', opacity: 'opacity-4' },
    { name: 'Wine', size: 35, color: 'text-red-600', opacity: 'opacity-6' },
    { name: 'Coffee', size: 32, color: 'text-amber-800', opacity: 'opacity-5' },
    { name: 'Burger', size: 48, color: 'text-yellow-700', opacity: 'opacity-4' },
    { name: 'ChefHat', size: 38, color: 'text-orange-700', opacity: 'opacity-6' },
    { name: 'Cake', size: 40, color: 'text-purple-400', opacity: 'opacity-5' },
    { name: 'Fish', size: 42, color: 'text-teal-600', opacity: 'opacity-6' },
    { name: 'IceCream', size: 36, color: 'text-cyan-400', opacity: 'opacity-6' },
  ],
} as const;

const ANIMATIONS = [
  'animate-float',
  'animate-drift', 
  'animate-pulse-food',
  'animate-fade-in-out',
  'animate-spin-slow',
  'animate-bounce-subtle'
] as const;

const POSITIONS = {
  hero: [
    'top-10 left-10',
    'top-32 right-20', 
    'top-64 left-32',
    'top-96 right-10',
    'bottom-32 left-20',
    'bottom-64 right-32',
    'top-80 left-1/2',
    'bottom-20 left-1/3',
    'top-40 left-1/4',
    'bottom-40 right-1/4',
    'top-20 right-1/3',
    'bottom-80 left-1/2',
    'top-1/2 right-40',
    'bottom-1/3 left-40',
    'top-1/3 right-1/4',
    'bottom-1/4 left-1/3',
    'top-3/4 right-1/3',
    'bottom-2/3 left-20',
    'top-52 left-16',
    'bottom-52 right-16',
    'top-24 left-2/3',
    'bottom-24 right-2/3',
    'top-72 right-12',
    'bottom-72 left-12',
    'top-1/4 left-1/2',
    'bottom-3/4 right-1/2',
    'top-16 right-1/6',
    'bottom-16 left-1/6',
  ],
  section: [
    'top-4 left-4',
    'top-8 right-8',
    'bottom-4 left-8',
    'bottom-8 right-4',
    'top-1/2 left-4',
    'top-1/4 right-4',
    'bottom-1/2 left-8',
    'bottom-1/4 right-8',
    'top-6 left-1/3',
    'bottom-6 right-1/3',
    'top-2 right-1/4',
    'bottom-2 left-1/4',
  ],
  default: [
    'top-6 left-6',
    'top-12 right-12',
    'bottom-6 left-12',
    'bottom-12 right-6',
    'top-1/3 left-8',
    'top-2/3 right-8',
    'bottom-1/3 left-16',
    'bottom-2/3 right-16',
    'top-8 left-1/4',
    'bottom-8 right-1/4',
    'top-16 right-1/3',
    'bottom-16 left-1/3',
  ]
} as const;

export function RestaurantBackground({ 
  density = 'medium', 
  variant = 'default',
  className = '',
  maxIcons,
  colors
}: RestaurantBackgroundProps) {
  const allIcons = ICON_SETS[density] || ICON_SETS.medium;
  const icons = maxIcons ? allIcons.slice(0, maxIcons) : allIcons;
  const positions = POSITIONS[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {icons.map((icon: any, index: number) => {
        const animation = ANIMATIONS[index % ANIMATIONS.length];
        const position = positions[index % positions.length];
        const delay = (index * 2) + 's';
        
        // Override colors if provided
        let iconColor = icon.color;
        if (colors?.primary && icon.color.includes('amber')) {
          iconColor = colors.primary as typeof icon.color;
        } else if (colors?.secondary && icon.color.includes('orange')) {
          iconColor = colors.secondary as typeof icon.color;
        } else if (colors?.accent && (icon.color.includes('purple') || icon.color.includes('blue'))) {
          iconColor = colors.accent as typeof icon.color;
        }

        return (
          <div
            key={`${icon.name}-${index}`}
            className={`absolute ${position} ${icon.opacity} ${animation}`}
            style={{ animationDelay: delay }}
          >
            <FoodIcon 
              name={icon.name as FoodIconName} 
              size={icon.size} 
              className={iconColor} 
            />
          </div>
        );
      })}
    </div>
  );
}

export default RestaurantBackground;
