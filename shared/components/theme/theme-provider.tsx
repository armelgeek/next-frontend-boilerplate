"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeConfig, ThemeHelpers } from '@/shared/lib/generators/theme-builder-generator';

// Types pour le contexte de thème
interface ThemeContextType {
  currentTheme: ThemeConfig | null;
  availableThemes: ThemeConfig[];
  mode: 'light' | 'dark' | 'auto';
  setTheme: (theme: ThemeConfig) => void;
  setMode: (mode: 'light' | 'dark' | 'auto') => void;
  addTheme: (theme: ThemeConfig) => void;
  removeTheme: (themeName: string) => void;
  exportTheme: (theme: ThemeConfig, format: 'css' | 'tailwind' | 'json') => string;
  saveToLocalStorage: (theme: ThemeConfig) => void;
  loadFromLocalStorage: (themeName: string) => ThemeConfig | null;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// Provider de thème
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeConfig;
  storageKey?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme,
  storageKey = 'app-themes' 
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig | null>(defaultTheme || null);
  const [availableThemes, setAvailableThemes] = useState<ThemeConfig[]>([]);
  const [mode, setModeState] = useState<'light' | 'dark' | 'auto'>('auto');

  // Charge les thèmes depuis le localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const themes = JSON.parse(stored);
        setAvailableThemes(themes);
      }

      // Charge le thème actuel
      const currentStored = localStorage.getItem(`${storageKey}-current`);
      if (currentStored) {
        const theme = JSON.parse(currentStored);
        setCurrentTheme(theme);
        applyThemeCSS(theme);
      }

      // Charge le mode
      const modeStored = localStorage.getItem(`${storageKey}-mode`);
      if (modeStored && ['light', 'dark', 'auto'].includes(modeStored)) {
        setModeState(modeStored as 'light' | 'dark' | 'auto');
        applyMode(modeStored as 'light' | 'dark' | 'auto');
      }
    } catch (error) {
      console.warn('Failed to load themes from localStorage:', error);
    }
  }, [storageKey]);

  // Applique le CSS du thème
  const applyThemeCSS = (theme: ThemeConfig) => {
    const css = ThemeHelpers.toCSS(theme);
    
    let styleElement = document.getElementById('dynamic-theme');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'dynamic-theme';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  };

  // Applique le mode (clair/sombre)
  const applyMode = (newMode: 'light' | 'dark' | 'auto') => {
    const root = document.documentElement;
    
    if (newMode === 'auto') {
      // Utilise la préférence système
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', newMode);
    }
  };

  // Définit un nouveau thème
  const setTheme = (theme: ThemeConfig) => {
    setCurrentTheme(theme);
    applyThemeCSS(theme);
    
    // Sauvegarde dans localStorage
    try {
      localStorage.setItem(`${storageKey}-current`, JSON.stringify(theme));
    } catch (error) {
      console.warn('Failed to save current theme:', error);
    }
  };

  // Définit le mode
  const setMode = (newMode: 'light' | 'dark' | 'auto') => {
    setModeState(newMode);
    applyMode(newMode);
    
    try {
      localStorage.setItem(`${storageKey}-mode`, newMode);
    } catch (error) {
      console.warn('Failed to save theme mode:', error);
    }
  };

  // Ajoute un thème à la collection
  const addTheme = (theme: ThemeConfig) => {
    const updatedThemes = [...availableThemes.filter(t => t.name !== theme.name), theme];
    setAvailableThemes(updatedThemes);
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedThemes));
    } catch (error) {
      console.warn('Failed to save themes:', error);
    }
  };

  // Supprime un thème
  const removeTheme = (themeName: string) => {
    const updatedThemes = availableThemes.filter(t => t.name !== themeName);
    setAvailableThemes(updatedThemes);
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedThemes));
    } catch (error) {
      console.warn('Failed to save themes:', error);
    }
  };

  // Exporte un thème
  const exportTheme = (theme: ThemeConfig, format: 'css' | 'tailwind' | 'json'): string => {
    switch (format) {
      case 'css':
        return ThemeHelpers.toCSS(theme);
      case 'tailwind':
        return ThemeHelpers.toTailwind(theme);
      case 'json':
        return JSON.stringify(theme, null, 2);
      default:
        return '';
    }
  };

  // Sauvegarde un thème dans localStorage
  const saveToLocalStorage = (theme: ThemeConfig) => {
    addTheme(theme);
  };

  // Charge un thème depuis localStorage
  const loadFromLocalStorage = (themeName: string): ThemeConfig | null => {
    return availableThemes.find(t => t.name === themeName) || null;
  };

  // Écoute les changements de préférence système
  useEffect(() => {
    if (mode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyMode('auto');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode]);

  const value: ThemeContextType = {
    currentTheme,
    availableThemes,
    mode,
    setTheme,
    setMode,
    addTheme,
    removeTheme,
    exportTheme,
    saveToLocalStorage,
    loadFromLocalStorage,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook pour utiliser le contexte de thème
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

// Hook pour basculer le mode clair/sombre
export function useThemeMode() {
  const { mode, setMode } = useThemeContext();
  
  const toggle = () => {
    if (mode === 'light') {
      setMode('dark');
    } else if (mode === 'dark') {
      setMode('auto');
    } else {
      setMode('light');
    }
  };

  const setLight = () => setMode('light');
  const setDark = () => setMode('dark');
  const setAuto = () => setMode('auto');

  return {
    mode,
    toggle,
    setLight,
    setDark,
    setAuto,
    isLight: mode === 'light',
    isDark: mode === 'dark',
    isAuto: mode === 'auto',
  };
}

// Hook pour gérer les couleurs de thème
export function useThemeColors() {
  const { currentTheme, mode } = useThemeContext();
  
  const getColorValue = (colorName: keyof import('@/shared/lib/generators/theme-builder-generator').ColorPalette) => {
    if (!currentTheme) return '';
    
    const currentMode = mode === 'auto' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    
    return currentTheme.colors[currentMode][colorName]?.value || '';
  };

  const colors = currentTheme ? {
    primary: getColorValue('primary'),
    secondary: getColorValue('secondary'),
    accent: getColorValue('accent'),
    muted: getColorValue('muted'),
    destructive: getColorValue('destructive'),
    warning: getColorValue('warning'),
    success: getColorValue('success'),
    info: getColorValue('info'),
  } : null;

  return {
    colors,
    getColorValue,
    currentTheme,
  };
}

// Hook pour les animations de thème
export function useThemeAnimations() {
  const { currentTheme } = useThemeContext();
  
  const durations = currentTheme?.animation.duration || {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  };

  const easings = currentTheme?.animation.easing || {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  };

  return {
    durations,
    easings,
    transition: (property: string, duration: keyof typeof durations = 'normal', easing: keyof typeof easings = 'ease') => 
      `${property} ${durations[duration]} ${easings[easing]}`,
  };
}

// Hook pour la persistance de thème
export function useThemePersistence() {
  const { 
    availableThemes, 
    addTheme, 
    removeTheme, 
    saveToLocalStorage, 
    loadFromLocalStorage 
  } = useThemeContext();

  const exportToFile = (theme: ThemeConfig, format: 'css' | 'tailwind' | 'json') => {
    const content = format === 'css' 
      ? ThemeHelpers.toCSS(theme)
      : format === 'tailwind'
      ? ThemeHelpers.toTailwind(theme)
      : JSON.stringify(theme, null, 2);

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.name}-theme.${format === 'tailwind' ? 'js' : format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFromFile = (file: File): Promise<ThemeConfig> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const theme = JSON.parse(content) as ThemeConfig;
          resolve(theme);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  return {
    availableThemes,
    addTheme,
    removeTheme,
    saveToLocalStorage,
    loadFromLocalStorage,
    exportToFile,
    importFromFile,
  };
}

// Composant Toggle de mode de thème
export function ThemeModeToggle({ className }: { className?: string }) {
  const { mode, toggle } = useThemeMode();
  
  const icons = {
    light: '☀️',
    dark: '🌙',
    auto: '💻',
  };

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-md border border-border hover:bg-muted transition-colors ${className}`}
      title={`Mode actuel: ${mode === 'light' ? 'Clair' : mode === 'dark' ? 'Sombre' : 'Automatique'}`}
    >
      <span className="text-lg">{icons[mode]}</span>
    </button>
  );
}

// Composant sélecteur de thème
export function ThemeSelector({ className }: { className?: string }) {
  const { currentTheme, availableThemes, setTheme } = useThemeContext();

  if (availableThemes.length === 0) {
    return null;
  }

  return (
    <select
      value={currentTheme?.name || ''}
      onChange={(e) => {
        const theme = availableThemes.find(t => t.name === e.target.value);
        if (theme) setTheme(theme);
      }}
      className={`px-3 py-2 border border-border rounded-md bg-background ${className}`}
    >
      <option value="">Sélectionner un thème</option>
      {availableThemes.map((theme) => (
        <option key={theme.name} value={theme.name}>
          {theme.displayName}
        </option>
      ))}
    </select>
  );
}
