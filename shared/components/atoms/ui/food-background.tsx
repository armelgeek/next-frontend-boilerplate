"use client";

import React from 'react';
import { FoodIcon, useFoodIconsByCategory } from '@/shared/components/atoms/icons/food-icons';

interface FoodBackgroundProps {
  density?: 'light' | 'medium' | 'dense';
  opacity?: number;
  className?: string;
}

export function FoodBackground({ 
  density = 'medium', 
  opacity = 0.03,
  className = '' 
}: FoodBackgroundProps) {
  const { plats, boissons, desserts, fruits, ustensiles, service } = useFoodIconsByCategory();
  
  // Combiner toutes les icônes
  const allIcons = [...plats, ...boissons, ...desserts, ...fruits, ...ustensiles, ...service];
  
  // Définir le nombre d'icônes selon la densité
  const iconCount = {
    light: 15,
    medium: 25,
    dense: 40
  }[density];

  // Générer des positions aléatoires
  const generateRandomPositions = () => {
    const positions = [];
    for (let i = 0; i < iconCount; i++) {
      positions.push({
        id: i,
        icon: allIcons[Math.floor(Math.random() * allIcons.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 20 + 20, // Taille entre 20 et 40px
        rotation: Math.random() * 360,
        opacity: Math.random() * opacity + opacity * 0.5, // Variation d'opacité
        animationDelay: Math.random() * 20, // Pour l'animation
      });
    }
    return positions;
  };

  const [positions] = React.useState(generateRandomPositions);

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="absolute animate-float"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            transform: `rotate(${pos.rotation}deg)`,
            opacity: pos.opacity,
            animationDelay: `${pos.animationDelay}s`,
            animationDuration: `${15 + Math.random() * 10}s`, // 15-25s
          }}
        >
          <FoodIcon 
            name={pos.icon} 
            size={pos.size} 
            className="text-amber-600/30" 
          />
        </div>
      ))}
      
      {/* Gradient overlay pour atténuer l'effet */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-orange-50/30 pointer-events-none" />
    </div>
  );
}

// Variante pour header/hero sections
export function FoodBackgroundHero({ 
  className = '',
  children 
}: { 
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <FoodBackground density="light" opacity={0.05} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Variante pour sections de contenu
export function FoodBackgroundSection({ 
  className = '',
  children,
  variant = 'light'
}: { 
  className?: string;
  children: React.ReactNode;
  variant?: 'light' | 'medium' | 'dense';
}) {
  return (
    <div className={`relative ${className}`}>
      <FoodBackground density={variant} opacity={0.04} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
