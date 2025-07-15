import { themeFonts } from '@/shared/lib/themes/theme-fonts';

// Hook pour récupérer les polices d'un thème spécifique
export const useThemeFonts = (theme: keyof typeof themeFonts = 'default') => {
  return themeFonts[theme];
};

// Polices restaurant spécifiques
export const restaurantFonts = {
  // Police principale pour le contenu
  body: 'var(--font-merriweather)', // Lisible et élégante
  // Police pour les titres
  heading: 'var(--font-playfair-display)', // Élégante et distinguée
  // Police décorative pour les éléments spéciaux
  decorative: 'var(--font-great-vibes)', // Script élégant
  // Police pour les accents et boutons
  accent: 'var(--font-pacifico)', // Moderne et amicale
  // Police manuscrite pour les éléments personnalisés
  handwriting: 'var(--font-satisfy)', // Décontractée
  // Police décontractée pour les éléments secondaires
  casual: 'var(--font-caveat)', // Sympathique
  // Police pour les menus et prix
  menu: 'var(--font-dancing-script)', // Élégante pour les menus
};

// Classes CSS utilitaires pour les polices restaurant
export const restaurantFontClasses = {
  body: 'font-[family-name:var(--font-merriweather)]',
  heading: 'font-[family-name:var(--font-playfair-display)]',
  decorative: 'font-[family-name:var(--font-great-vibes)]',
  accent: 'font-[family-name:var(--font-pacifico)]',
  handwriting: 'font-[family-name:var(--font-satisfy)]',
  casual: 'font-[family-name:var(--font-caveat)]',
  menu: 'font-[family-name:var(--font-dancing-script)]',
};

// Classes CSS globales pour utilisation directe dans className
export const restaurantFontUtilities = {
  body: 'restaurant-font-body',
  heading: 'restaurant-font-heading',
  decorative: 'restaurant-font-decorative',
  accent: 'restaurant-font-accent',
  handwriting: 'restaurant-font-handwriting',
  casual: 'restaurant-font-casual',
  menu: 'restaurant-font-menu',
};

// Composant utilitaire pour appliquer facilement les polices
export const RestaurantText = ({ 
  variant = 'body', 
  children, 
  className = '', 
  ...props 
}: {
  variant?: keyof typeof restaurantFonts;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  const fontClass = restaurantFontClasses[variant];
  
  return (
    <span className={`${fontClass} ${className}`} {...props}>
      {children}
    </span>
  );
};
