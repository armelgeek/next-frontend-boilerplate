/**
 * Hook utilitaires pour la gestion des thèmes
 * Fournit des helpers pour appliquer les styles de thème dans les composants
 */

import { useMemo } from 'react';
import { useTheme } from '@/shared/providers/theme-provider';
import { NavbarTheme } from '@/shared/lib/themes/navbar-themes';

export interface ThemeStyles {
  colors: Record<string, string>;
  shadows: Record<string, React.CSSProperties>;
  borders: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, string>;
}

export function useThemeStyles(): ThemeStyles {
  const { currentTheme } = useTheme();

  return useMemo(() => {
    const colors = Object.entries(currentTheme.colors).reduce((acc, [key, value]) => {
      acc[key] = value;
      acc[`${key}Class`] = `text-[${value}]`;
      acc[`${key}BgClass`] = `bg-[${value}]`;
      acc[`${key}BorderClass`] = `border-[${value}]`;
      return acc;
    }, {} as Record<string, string>);

    const shadows = Object.entries(currentTheme.effects.boxShadow).reduce((acc, [key, value]) => {
      acc[key] = { boxShadow: value };
      return acc;
    }, {} as Record<string, React.CSSProperties>);

    const borders = Object.entries(currentTheme.spacing.borderRadius).reduce((acc, [key, value]) => {
      acc[key] = `rounded-[${value}]`;
      return acc;
    }, {} as Record<string, string>);

    const spacing = Object.entries(currentTheme.spacing.spacing).reduce((acc, [key, value]) => {
      acc[key] = value;
      acc[`${key}Class`] = `p-[${value}]`;
      acc[`${key}MarginClass`] = `m-[${value}]`;
      return acc;
    }, {} as Record<string, string>);

    const typography = Object.entries(currentTheme.typography.fontSize).reduce((acc, [key, value]) => {
      acc[key] = `text-[${value}]`;
      return acc;
    }, {} as Record<string, string>);

    return {
      colors,
      shadows,
      borders,
      spacing,
      typography
    };
  }, [currentTheme]);
}

// Hook pour générer des styles CSS inline
export function useInlineThemeStyles() {
  const { currentTheme } = useTheme();

  const getColorStyle = (colorKey: keyof NavbarTheme['colors']): React.CSSProperties => ({
    color: currentTheme.colors[colorKey]
  });

  const getBackgroundStyle = (colorKey: keyof NavbarTheme['colors']): React.CSSProperties => ({
    backgroundColor: currentTheme.colors[colorKey]
  });

  const getBorderStyle = (colorKey: keyof NavbarTheme['colors']): React.CSSProperties => ({
    borderColor: currentTheme.colors[colorKey]
  });

  const getShadowStyle = (size: keyof NavbarTheme['effects']['boxShadow']): React.CSSProperties => ({
    boxShadow: currentTheme.effects.boxShadow[size]
  });

  const getCardStyle = (): React.CSSProperties => ({
    backgroundColor: currentTheme.colors.card,
    color: currentTheme.colors.cardForeground,
    borderColor: currentTheme.colors.border,
    borderRadius: currentTheme.spacing.borderRadius.lg,
    ...getShadowStyle('md')
  });

  const getButtonStyle = (variant: 'primary' | 'secondary' | 'accent' = 'primary'): React.CSSProperties => {
    const colorMap = {
      primary: { bg: 'primary', fg: 'primaryForeground' },
      secondary: { bg: 'secondary', fg: 'secondaryForeground' },
      accent: { bg: 'accent', fg: 'accentForeground' }
    };

    const colors = colorMap[variant];
    return {
      backgroundColor: currentTheme.colors[colors.bg as keyof NavbarTheme['colors']],
      color: currentTheme.colors[colors.fg as keyof NavbarTheme['colors']],
      borderRadius: currentTheme.spacing.borderRadius.md,
      transition: `all ${currentTheme.effects.animation.duration} ${currentTheme.effects.animation.easing}`,
      ...getShadowStyle('sm')
    };
  };

  const getInputStyle = (): React.CSSProperties => ({
    backgroundColor: currentTheme.colors.input,
    color: currentTheme.colors.foreground,
    borderColor: currentTheme.colors.border,
    borderRadius: currentTheme.spacing.borderRadius.md
  });

  return {
    getColorStyle,
    getBackgroundStyle,
    getBorderStyle,
    getShadowStyle,
    getCardStyle,
    getButtonStyle,
    getInputStyle,
    currentTheme
  };
}

// Hook pour créer des variantes de composants basées sur le thème
export function useThemeVariants() {
  const { currentTheme } = useTheme();

  const createVariant = (baseClasses: string, themeOverrides?: Partial<Record<string, string>>) => {
    const variant = currentTheme.variant;
    const overrideClass = themeOverrides?.[variant] || '';
    return `${baseClasses} ${overrideClass}`.trim();
  };

  // Variantes prédéfinies pour différents composants
  const cardVariants = {
    default: createVariant('rounded-lg border bg-card text-card-foreground shadow-sm'),
    glassmorphism: createVariant('rounded-lg border bg-card/10 backdrop-blur-md text-card-foreground shadow-lg'),
    neon: createVariant('rounded-lg border-2 border-primary bg-card text-card-foreground shadow-[0_0_10px_theme(colors.primary)]'),
    retro: createVariant('border-4 border-foreground bg-card text-card-foreground shadow-[4px_4px_0_theme(colors.foreground)]')
  };

  const buttonVariants = {
    default: createVariant('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors'),
    glassmorphism: createVariant('inline-flex items-center justify-center rounded-md text-sm font-medium backdrop-blur-md border border-white/20'),
    neon: createVariant('inline-flex items-center justify-center rounded-md text-sm font-medium shadow-[0_0_10px_theme(colors.primary)] border-2 border-primary'),
    retro: createVariant('inline-flex items-center justify-center text-sm font-bold border-4 border-foreground shadow-[4px_4px_0_theme(colors.foreground)]')
  };

  const inputVariants = {
    default: createVariant('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'),
    glassmorphism: createVariant('flex h-10 w-full rounded-md border border-white/20 bg-background/50 backdrop-blur-md px-3 py-2 text-sm'),
    neon: createVariant('flex h-10 w-full rounded-md border-2 border-primary bg-background px-3 py-2 text-sm shadow-[0_0_5px_theme(colors.primary)]'),
    retro: createVariant('flex h-10 w-full border-4 border-foreground bg-background px-3 py-2 text-sm shadow-[2px_2px_0_theme(colors.foreground)]')
  };

  return {
    createVariant,
    cardVariants,
    buttonVariants,
    inputVariants,
    variant: currentTheme.variant
  };
}

// Hook pour des animations basées sur le thème
export function useThemeAnimations() {
  const { currentTheme } = useTheme();

  const getTransitionStyle = (property = 'all'): React.CSSProperties => ({
    transition: `${property} ${currentTheme.effects.animation.duration} ${currentTheme.effects.animation.easing}`
  });

  const getHoverAnimation = (scale = 1.05): React.CSSProperties => ({
    ...getTransitionStyle('transform'),
    transform: 'scale(1)',
    // Note: hover effects should be applied via CSS classes or styled-components
  });

  const getPulseAnimation = (): React.CSSProperties => ({
    animation: currentTheme.customProperties?.['--neon-pulse'] || 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  });

  const getGlowEffect = (): React.CSSProperties => ({
    filter: currentTheme.variant === 'neon' 
      ? `drop-shadow(0 0 10px ${currentTheme.colors.primary})` 
      : 'none'
  });

  return {
    getTransitionStyle,
    getHoverAnimation,
    getPulseAnimation,
    getGlowEffect,
    duration: currentTheme.effects.animation.duration,
    easing: currentTheme.effects.animation.easing
  };
}

export default {
  useThemeStyles,
  useInlineThemeStyles,
  useThemeVariants,
  useThemeAnimations
};
