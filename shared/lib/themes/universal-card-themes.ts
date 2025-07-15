/**
 * Système de thèmes pour UniversalCard
 * Intégration avec le système de thèmes existant
 */

export interface UniversalCardTheme {
  name: string;
  description: string;
  colors: {
    // Background et conteneurs
    cardBackground: string;
    cardBorder: string;
    cardHover: string;
    cardShadow: string;
    cardShadowHover: string;
    
    // Text colors
    titleColor: string;
    descriptionColor: string;
    metaColor: string;
    priceColor: string;
    
    // Badges et status
    badgePrimary: string;
    badgeSecondary: string;
    badgeSuccess: string;
    badgeWarning: string;
    badgeError: string;
    badgeInfo: string;
    
    // Featured et urgent
    featuredBorder: string;
    featuredGlow: string;
    urgentBorder: string;
    urgentGlow: string;
    
    // Actions et boutons
    primaryButton: string;
    primaryButtonHover: string;
    primaryButtonText: string;
    secondaryButton: string;
    secondaryButtonHover: string;
    secondaryButtonText: string;
    
    // Rating et icons
    ratingColor: string;
    iconColor: string;
    iconColorSecondary: string;
    
    // Author et avatar
    authorBackground: string;
    authorText: string;
    verifiedBadge: string;
    
    // Overlay et gradient
    imageOverlay: string;
    priceGradient: string;
  };
  typography: {
    titleFont?: string;
    bodyFont?: string;
    titleWeight: string;
    bodyWeight: string;
    titleSize: {
      sm: string;
      md: string;
      lg: string;
    };
    descriptionSize: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  spacing: {
    cardPadding: {
      sm: string;
      md: string;
      lg: string;
    };
    elementGap: string;
    imageRadius: string;
    cardRadius: string;
  };
  effects: {
    hoverTransition: string;
    hoverScale: string;
    shadowTransition: string;
    borderTransition: string;
  };
}

// Thème par défaut (style neutre)
export const defaultUniversalCardTheme: UniversalCardTheme = {
  name: 'default',
  description: 'Thème par défaut élégant et neutre',
  colors: {
    cardBackground: 'hsl(0 0% 100%)',
    cardBorder: 'hsl(214 14% 90%)',
    cardHover: 'hsl(214 14% 95%)',
    cardShadow: 'hsl(214 14% 0% / 0.05)',
    cardShadowHover: 'hsl(214 14% 0% / 0.15)',
    
    titleColor: 'hsl(214 19% 15%)',
    descriptionColor: 'hsl(214 14% 45%)',
    metaColor: 'hsl(214 14% 55%)',
    priceColor: 'hsl(142 72% 29%)',
    
    badgePrimary: 'hsl(214 84% 56%)',
    badgeSecondary: 'hsl(214 14% 75%)',
    badgeSuccess: 'hsl(142 72% 29%)',
    badgeWarning: 'hsl(38 92% 50%)',
    badgeError: 'hsl(0 84% 60%)',
    badgeInfo: 'hsl(214 84% 56%)',
    
    featuredBorder: 'hsl(214 84% 56%)',
    featuredGlow: 'hsl(214 84% 56% / 0.2)',
    urgentBorder: 'hsl(0 84% 60%)',
    urgentGlow: 'hsl(0 84% 60% / 0.2)',
    
    primaryButton: 'hsl(214 84% 56%)',
    primaryButtonHover: 'hsl(214 84% 46%)',
    primaryButtonText: 'hsl(0 0% 100%)',
    secondaryButton: 'hsl(214 14% 95%)',
    secondaryButtonHover: 'hsl(214 14% 85%)',
    secondaryButtonText: 'hsl(214 19% 15%)',
    
    ratingColor: 'hsl(38 92% 50%)',
    iconColor: 'hsl(214 14% 45%)',
    iconColorSecondary: 'hsl(214 14% 65%)',
    
    authorBackground: 'hsl(214 14% 95%)',
    authorText: 'hsl(214 19% 15%)',
    verifiedBadge: 'hsl(142 72% 29%)',
    
    imageOverlay: 'linear-gradient(to bottom, hsl(0 0% 0% / 0), hsl(0 0% 0% / 0.3))',
    priceGradient: 'linear-gradient(135deg, hsl(142 72% 29%), hsl(142 72% 39%))',
  },
  typography: {
    titleFont: undefined,
    bodyFont: undefined,
    titleWeight: '600',
    bodyWeight: '400',
    titleSize: {
      sm: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
    },
    descriptionSize: {
      sm: '0.875rem',
      md: '0.875rem',
      lg: '1rem',
    },
  },
  spacing: {
    cardPadding: {
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
    },
    elementGap: '0.75rem',
    imageRadius: '0.5rem',
    cardRadius: '0.75rem',
  },
  effects: {
    hoverTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    hoverScale: '1.02',
    shadowTransition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderTransition: 'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Thème glassmorphisme
export const glassmorphismUniversalCardTheme: UniversalCardTheme = {
  name: 'glassmorphism',
  description: 'Style moderne avec effet de verre',
  colors: {
    cardBackground: 'hsl(0 0% 100% / 0.1)',
    cardBorder: 'hsl(0 0% 100% / 0.2)',
    cardHover: 'hsl(0 0% 100% / 0.15)',
    cardShadow: 'hsl(0 0% 0% / 0.1)',
    cardShadowHover: 'hsl(0 0% 0% / 0.2)',
    
    titleColor: 'hsl(0 0% 5%)',
    descriptionColor: 'hsl(0 0% 25%)',
    metaColor: 'hsl(0 0% 40%)',
    priceColor: 'hsl(142 72% 29%)',
    
    badgePrimary: 'hsl(214 84% 56% / 0.9)',
    badgeSecondary: 'hsl(0 0% 50% / 0.2)',
    badgeSuccess: 'hsl(142 72% 29% / 0.9)',
    badgeWarning: 'hsl(38 92% 50% / 0.9)',
    badgeError: 'hsl(0 84% 60% / 0.9)',
    badgeInfo: 'hsl(214 84% 56% / 0.9)',
    
    featuredBorder: 'hsl(214 84% 56% / 0.4)',
    featuredGlow: 'hsl(214 84% 56% / 0.3)',
    urgentBorder: 'hsl(0 84% 60% / 0.4)',
    urgentGlow: 'hsl(0 84% 60% / 0.3)',
    
    primaryButton: 'hsl(214 84% 56% / 0.9)',
    primaryButtonHover: 'hsl(214 84% 46% / 0.9)',
    primaryButtonText: 'hsl(0 0% 100%)',
    secondaryButton: 'hsl(0 0% 100% / 0.2)',
    secondaryButtonHover: 'hsl(0 0% 100% / 0.3)',
    secondaryButtonText: 'hsl(0 0% 5%)',
    
    ratingColor: 'hsl(38 92% 50%)',
    iconColor: 'hsl(0 0% 30%)',
    iconColorSecondary: 'hsl(0 0% 50%)',
    
    authorBackground: 'hsl(0 0% 100% / 0.1)',
    authorText: 'hsl(0 0% 5%)',
    verifiedBadge: 'hsl(142 72% 29%)',
    
    imageOverlay: 'linear-gradient(to bottom, hsl(0 0% 0% / 0), hsl(0 0% 0% / 0.4))',
    priceGradient: 'linear-gradient(135deg, hsl(142 72% 29% / 0.9), hsl(142 72% 39% / 0.9))',
  },
  typography: {
    titleFont: undefined,
    bodyFont: undefined,
    titleWeight: '700',
    bodyWeight: '500',
    titleSize: {
      sm: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
    },
    descriptionSize: {
      sm: '0.875rem',
      md: '0.875rem',
      lg: '1rem',
    },
  },
  spacing: {
    cardPadding: {
      sm: '1rem',
      md: '1.25rem',
      lg: '1.75rem',
    },
    elementGap: '1rem',
    imageRadius: '0.75rem',
    cardRadius: '1rem',
  },
  effects: {
    hoverTransition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    hoverScale: '1.03',
    shadowTransition: 'box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    borderTransition: 'border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Thème sombre
export const darkUniversalCardTheme: UniversalCardTheme = {
  name: 'dark',
  description: 'Thème sombre élégant',
  colors: {
    cardBackground: 'hsl(220 13% 13%)',
    cardBorder: 'hsl(220 13% 20%)',
    cardHover: 'hsl(220 13% 18%)',
    cardShadow: 'hsl(0 0% 0% / 0.3)',
    cardShadowHover: 'hsl(0 0% 0% / 0.5)',
    
    titleColor: 'hsl(0 0% 95%)',
    descriptionColor: 'hsl(0 0% 70%)',
    metaColor: 'hsl(0 0% 60%)',
    priceColor: 'hsl(142 72% 60%)',
    
    badgePrimary: 'hsl(214 84% 66%)',
    badgeSecondary: 'hsl(220 13% 30%)',
    badgeSuccess: 'hsl(142 72% 60%)',
    badgeWarning: 'hsl(38 92% 60%)',
    badgeError: 'hsl(0 84% 70%)',
    badgeInfo: 'hsl(214 84% 66%)',
    
    featuredBorder: 'hsl(214 84% 66%)',
    featuredGlow: 'hsl(214 84% 66% / 0.3)',
    urgentBorder: 'hsl(0 84% 70%)',
    urgentGlow: 'hsl(0 84% 70% / 0.3)',
    
    primaryButton: 'hsl(214 84% 66%)',
    primaryButtonHover: 'hsl(214 84% 76%)',
    primaryButtonText: 'hsl(220 13% 13%)',
    secondaryButton: 'hsl(220 13% 25%)',
    secondaryButtonHover: 'hsl(220 13% 35%)',
    secondaryButtonText: 'hsl(0 0% 95%)',
    
    ratingColor: 'hsl(38 92% 60%)',
    iconColor: 'hsl(0 0% 70%)',
    iconColorSecondary: 'hsl(0 0% 50%)',
    
    authorBackground: 'hsl(220 13% 20%)',
    authorText: 'hsl(0 0% 95%)',
    verifiedBadge: 'hsl(142 72% 60%)',
    
    imageOverlay: 'linear-gradient(to bottom, hsl(0 0% 0% / 0), hsl(0 0% 0% / 0.6))',
    priceGradient: 'linear-gradient(135deg, hsl(142 72% 60%), hsl(142 72% 70%))',
  },
  typography: {
    titleFont: undefined,
    bodyFont: undefined,
    titleWeight: '600',
    bodyWeight: '400',
    titleSize: {
      sm: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
    },
    descriptionSize: {
      sm: '0.875rem',
      md: '0.875rem',
      lg: '1rem',
    },
  },
  spacing: {
    cardPadding: {
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
    },
    elementGap: '0.75rem',
    imageRadius: '0.5rem',
    cardRadius: '0.75rem',
  },
  effects: {
    hoverTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    hoverScale: '1.02',
    shadowTransition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderTransition: 'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Thème néon cyberpunk
export const neonUniversalCardTheme: UniversalCardTheme = {
  name: 'neon',
  description: 'Style cyberpunk avec effets néon',
  colors: {
    cardBackground: 'hsl(240 6% 10%)',
    cardBorder: 'hsl(315 100% 50%)',
    cardHover: 'hsl(240 6% 15%)',
    cardShadow: 'hsl(315 100% 50% / 0.2)',
    cardShadowHover: 'hsl(315 100% 50% / 0.4)',
    
    titleColor: 'hsl(315 100% 90%)',
    descriptionColor: 'hsl(315 100% 70%)',
    metaColor: 'hsl(315 100% 60%)',
    priceColor: 'hsl(80 100% 50%)',
    
    badgePrimary: 'hsl(315 100% 50%)',
    badgeSecondary: 'hsl(240 6% 25%)',
    badgeSuccess: 'hsl(80 100% 50%)',
    badgeWarning: 'hsl(40 100% 50%)',
    badgeError: 'hsl(0 100% 50%)',
    badgeInfo: 'hsl(180 100% 50%)',
    
    featuredBorder: 'hsl(315 100% 50%)',
    featuredGlow: 'hsl(315 100% 50% / 0.5)',
    urgentBorder: 'hsl(0 100% 50%)',
    urgentGlow: 'hsl(0 100% 50% / 0.5)',
    
    primaryButton: 'hsl(315 100% 50%)',
    primaryButtonHover: 'hsl(315 100% 60%)',
    primaryButtonText: 'hsl(240 6% 10%)',
    secondaryButton: 'hsl(240 6% 20%)',
    secondaryButtonHover: 'hsl(240 6% 30%)',
    secondaryButtonText: 'hsl(315 100% 90%)',
    
    ratingColor: 'hsl(40 100% 50%)',
    iconColor: 'hsl(315 100% 70%)',
    iconColorSecondary: 'hsl(315 100% 50%)',
    
    authorBackground: 'hsl(240 6% 15%)',
    authorText: 'hsl(315 100% 90%)',
    verifiedBadge: 'hsl(80 100% 50%)',
    
    imageOverlay: 'linear-gradient(to bottom, hsl(315 100% 50% / 0), hsl(315 100% 50% / 0.3))',
    priceGradient: 'linear-gradient(135deg, hsl(80 100% 50%), hsl(40 100% 50%))',
  },
  typography: {
    titleFont: 'Orbitron',
    bodyFont: 'Roboto Mono',
    titleWeight: '700',
    bodyWeight: '500',
    titleSize: {
      sm: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
    },
    descriptionSize: {
      sm: '0.875rem',
      md: '0.875rem',
      lg: '1rem',
    },
  },
  spacing: {
    cardPadding: {
      sm: '1rem',
      md: '1.25rem',
      lg: '1.5rem',
    },
    elementGap: '1rem',
    imageRadius: '0.25rem',
    cardRadius: '0.5rem',
  },
  effects: {
    hoverTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    hoverScale: '1.05',
    shadowTransition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderTransition: 'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Thème rétro vintage
export const retroUniversalCardTheme: UniversalCardTheme = {
  name: 'retro',
  description: 'Style vintage années 80',
  colors: {
    cardBackground: 'hsl(45 29% 97%)',
    cardBorder: 'hsl(25 75% 70%)',
    cardHover: 'hsl(45 29% 94%)',
    cardShadow: 'hsl(25 75% 70% / 0.2)',
    cardShadowHover: 'hsl(25 75% 70% / 0.4)',
    
    titleColor: 'hsl(25 75% 25%)',
    descriptionColor: 'hsl(25 75% 45%)',
    metaColor: 'hsl(25 75% 55%)',
    priceColor: 'hsl(5 75% 55%)',
    
    badgePrimary: 'hsl(25 75% 55%)',
    badgeSecondary: 'hsl(45 29% 80%)',
    badgeSuccess: 'hsl(80 60% 50%)',
    badgeWarning: 'hsl(40 90% 60%)',
    badgeError: 'hsl(5 75% 55%)',
    badgeInfo: 'hsl(200 60% 60%)',
    
    featuredBorder: 'hsl(25 75% 55%)',
    featuredGlow: 'hsl(25 75% 55% / 0.3)',
    urgentBorder: 'hsl(5 75% 55%)',
    urgentGlow: 'hsl(5 75% 55% / 0.3)',
    
    primaryButton: 'hsl(25 75% 55%)',
    primaryButtonHover: 'hsl(25 75% 45%)',
    primaryButtonText: 'hsl(45 29% 97%)',
    secondaryButton: 'hsl(45 29% 90%)',
    secondaryButtonHover: 'hsl(45 29% 85%)',
    secondaryButtonText: 'hsl(25 75% 25%)',
    
    ratingColor: 'hsl(40 90% 60%)',
    iconColor: 'hsl(25 75% 45%)',
    iconColorSecondary: 'hsl(25 75% 65%)',
    
    authorBackground: 'hsl(45 29% 92%)',
    authorText: 'hsl(25 75% 25%)',
    verifiedBadge: 'hsl(80 60% 50%)',
    
    imageOverlay: 'linear-gradient(to bottom, hsl(25 75% 70% / 0), hsl(25 75% 70% / 0.4))',
    priceGradient: 'linear-gradient(135deg, hsl(5 75% 55%), hsl(25 75% 55%))',
  },
  typography: {
    titleFont: 'Fredoka One',
    bodyFont: 'Nunito',
    titleWeight: '600',
    bodyWeight: '500',
    titleSize: {
      sm: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
    },
    descriptionSize: {
      sm: '0.875rem',
      md: '0.875rem',
      lg: '1rem',
    },
  },
  spacing: {
    cardPadding: {
      sm: '1rem',
      md: '1.25rem',
      lg: '1.5rem',
    },
    elementGap: '0.875rem',
    imageRadius: '1rem',
    cardRadius: '1.5rem',
  },
  effects: {
    hoverTransition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    hoverScale: '1.08',
    shadowTransition: 'box-shadow 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    borderTransition: 'border-color 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// Collection de tous les thèmes
export const universalCardThemes = {
  default: defaultUniversalCardTheme,
  glassmorphism: glassmorphismUniversalCardTheme,
  dark: darkUniversalCardTheme,
  neon: neonUniversalCardTheme,
  retro: retroUniversalCardTheme,
} as const;

export type UniversalCardThemeName = keyof typeof universalCardThemes;

// Utilitaires pour récupérer les thèmes
export function getUniversalCardTheme(themeName: UniversalCardThemeName): UniversalCardTheme {
  return universalCardThemes[themeName] || universalCardThemes.default;
}

export function getAllUniversalCardThemes(): UniversalCardTheme[] {
  return Object.values(universalCardThemes);
}

export function getUniversalCardThemeNames(): UniversalCardThemeName[] {
  return Object.keys(universalCardThemes) as UniversalCardThemeName[];
}
