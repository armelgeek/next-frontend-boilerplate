"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NavbarTheme, navbarThemes } from '@/shared/lib/themes/navbar-themes';
import { themeFonts } from '@/shared/lib/themes/theme-fonts';

interface ThemeContextType {
  currentTheme: NavbarTheme;
  setTheme: (themeKey: string) => void;
  themeKey: string;
  availableThemes: Record<string, NavbarTheme>;
  applyThemeToDocument: (theme: NavbarTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'default',
  storageKey = 'navbar-theme'
}: ThemeProviderProps) {
  const [themeKey, setThemeKey] = useState<string>(defaultTheme);
  const [currentTheme, setCurrentTheme] = useState<NavbarTheme>(navbarThemes[defaultTheme]);

  // Charger le thème depuis le localStorage
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey);
      if (storedTheme && navbarThemes[storedTheme]) {
        setThemeKey(storedTheme);
        setCurrentTheme(navbarThemes[storedTheme]);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
  }, [storageKey]);

  const applyThemeToDocument = (theme: NavbarTheme) => {
    const root = document.documentElement;
    
    // Appliquer les couleurs CSS custom properties
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVarName, value);
      });
    }

    // Appliquer les propriétés personnalisées
    if (theme.customProperties) {
      Object.entries(theme.customProperties).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }

    // Appliquer les fonts spécifiques du thème
    const themeVariant = theme.variant as keyof typeof themeFonts;
    if (themeFonts[themeVariant]) {
      const fonts = themeFonts[themeVariant];
      root.style.setProperty('--font-sans', fonts.sans);
      root.style.setProperty('--font-serif', fonts.serif);
      root.style.setProperty('--font-mono', fonts.mono);
    } else {
      // Fallback vers les fonts par défaut du thème
      root.style.setProperty('--font-sans', theme.typography.fontFamily.sans.join(', '));
      root.style.setProperty('--font-serif', theme.typography.fontFamily.serif.join(', '));
      root.style.setProperty('--font-mono', theme.typography.fontFamily.mono.join(', '));
    }

    // Appliquer les variables d'animation
    root.style.setProperty('--animation-duration', theme.effects.animation.duration);
    root.style.setProperty('--animation-easing', theme.effects.animation.easing);

    // Ajouter/enlever des classes CSS globales selon le variant
    root.classList.remove(...Object.keys(navbarThemes).map(key => `theme-${key}`));
    root.classList.add(`theme-${theme.variant}`);
  };

  const setTheme = (newThemeKey: string) => {
    if (navbarThemes[newThemeKey]) {
      setThemeKey(newThemeKey);
      setCurrentTheme(navbarThemes[newThemeKey]);
      
      // Sauvegarder dans localStorage
      try {
        localStorage.setItem(storageKey, newThemeKey);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    }
  };

  // Appliquer le thème à chaque changement
  useEffect(() => {
    applyThemeToDocument(currentTheme);
  }, [currentTheme]);

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    themeKey,
    availableThemes: navbarThemes,
    applyThemeToDocument
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook pour obtenir les classes CSS d'un thème spécifique
export function useThemeClasses(themeKey?: string) {
  const { currentTheme } = useTheme();
  const theme = themeKey ? navbarThemes[themeKey] : currentTheme;

  const getColorClass = (colorKey: keyof typeof theme.colors) => {
    return `text-[${theme.colors[colorKey]}]`;
  };

  const getBackgroundClass = (colorKey: keyof typeof theme.colors) => {
    return `bg-[${theme.colors[colorKey]}]`;
  };

  const getBorderClass = (colorKey: keyof typeof theme.colors) => {
    return `border-[${theme.colors[colorKey]}]`;
  };

  const getShadowClass = (size: keyof typeof theme.effects.boxShadow) => {
    return {
      boxShadow: theme.effects.boxShadow[size]
    };
  };

  const getBorderRadiusClass = (size: keyof typeof theme.spacing.borderRadius) => {
    return `rounded-[${theme.spacing.borderRadius[size]}]`;
  };

  return {
    theme,
    getColorClass,
    getBackgroundClass,
    getBorderClass,
    getShadowClass,
    getBorderRadiusClass
  };
}

// Hook pour appliquer un thème temporaire à un composant
export function useTemporaryTheme(themeKey: string) {
  const { applyThemeToDocument, currentTheme } = useTheme();
  const [isApplied, setIsApplied] = useState(false);

  const applyTheme = () => {
    if (navbarThemes[themeKey] && !isApplied) {
      applyThemeToDocument(navbarThemes[themeKey]);
      setIsApplied(true);
    }
  };

  const resetTheme = () => {
    if (isApplied) {
      applyThemeToDocument(currentTheme);
      setIsApplied(false);
    }
  };

  return { applyTheme, resetTheme, isApplied };
}
