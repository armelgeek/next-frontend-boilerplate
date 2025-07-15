"use client";

import { useTheme } from '@/shared/providers/theme-provider';
import { getUniversalCardTheme } from '@/shared/lib/themes/universal-card-themes';
import type { UniversalCardThemeName } from '@/shared/lib/themes/universal-card-themes';
import { CSSProperties } from 'react';

/**
 * Hook pour utiliser les styles thématiques des Universal Cards
 * Intégré avec le système de thèmes global
 */
export function useUniversalCardTheme(themeName?: UniversalCardThemeName) {
  const { currentTheme } = useTheme();
  
  // Utilise le thème spécifié ou le thème global actuel
  const selectedThemeName = themeName || (currentTheme?.name as UniversalCardThemeName) || 'default';
  const theme = getUniversalCardTheme(selectedThemeName);
  
  /**
   * Génère les styles CSS inline pour une carte
   */
  const getCardStyles = (
    variant: 'default' | 'compact' | 'minimal' | 'list' = 'default',
    size: 'sm' | 'md' | 'lg' = 'md',
    featured = false,
    urgent = false
  ): CSSProperties => {
    const baseStyles: CSSProperties = {
      backgroundColor: theme.colors.cardBackground,
      border: `1px solid ${theme.colors.cardBorder}`,
      borderRadius: theme.spacing.cardRadius,
      padding: theme.spacing.cardPadding[size],
      boxShadow: `0 1px 3px ${theme.colors.cardShadow}`,
      transition: theme.effects.hoverTransition,
      fontFamily: theme.typography.bodyFont,
      fontWeight: theme.typography.bodyWeight,
    };
    
    // Styles pour featured
    if (featured) {
      baseStyles.borderColor = theme.colors.featuredBorder;
      baseStyles.boxShadow = `0 0 0 1px ${theme.colors.featuredBorder}, 0 0 20px ${theme.colors.featuredGlow}`;
    }
    
    // Styles pour urgent
    if (urgent) {
      baseStyles.borderColor = theme.colors.urgentBorder;
      baseStyles.boxShadow = `0 0 0 1px ${theme.colors.urgentBorder}, 0 0 20px ${theme.colors.urgentGlow}`;
    }
    
    return baseStyles;
  };
  
  /**
   * Styles pour le hover d'une carte
   */
  const getCardHoverStyles = (): CSSProperties => ({
    backgroundColor: theme.colors.cardHover,
    boxShadow: `0 4px 12px ${theme.colors.cardShadowHover}`,
    transform: `scale(${theme.effects.hoverScale})`,
  });
  
  /**
   * Styles pour les titres
   */
  const getTitleStyles = (size: 'sm' | 'md' | 'lg' = 'md'): CSSProperties => ({
    color: theme.colors.titleColor,
    fontSize: theme.typography.titleSize[size],
    fontWeight: theme.typography.titleWeight,
    fontFamily: theme.typography.titleFont || theme.typography.bodyFont,
  });
  
  /**
   * Styles pour les descriptions
   */
  const getDescriptionStyles = (size: 'sm' | 'md' | 'lg' = 'md'): CSSProperties => ({
    color: theme.colors.descriptionColor,
    fontSize: theme.typography.descriptionSize[size],
    fontWeight: theme.typography.bodyWeight,
  });
  
  /**
   * Styles pour les métadonnées (date, lieu, etc.)
   */
  const getMetaStyles = (): CSSProperties => ({
    color: theme.colors.metaColor,
    fontSize: '0.875rem',
  });
  
  /**
   * Styles pour les prix
   */
  const getPriceStyles = (gradient = false): CSSProperties => {
    const baseStyles: CSSProperties = {
      color: theme.colors.priceColor,
      fontWeight: '600',
    };
    
    if (gradient) {
      baseStyles.background = theme.colors.priceGradient;
      baseStyles.WebkitBackgroundClip = 'text';
      baseStyles.WebkitTextFillColor = 'transparent';
    }
    
    return baseStyles;
  };
  
  /**
   * Styles pour les badges
   */
  const getBadgeStyles = (
    type: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary'
  ): CSSProperties => ({
    backgroundColor: theme.colors[`badge${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof theme.colors] as string,
    color: type === 'secondary' ? theme.colors.titleColor : 'white',
    fontSize: '0.75rem',
    fontWeight: '500',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.375rem',
  });
  
  /**
   * Styles pour les boutons
   */
  const getButtonStyles = (
    variant: 'primary' | 'secondary' = 'primary'
  ): CSSProperties => ({
    backgroundColor: theme.colors[`${variant}Button`],
    color: theme.colors[`${variant}ButtonText`],
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontWeight: '500',
    transition: theme.effects.hoverTransition,
    cursor: 'pointer',
  });
  
  /**
   * Styles pour le hover des boutons
   */
  const getButtonHoverStyles = (
    variant: 'primary' | 'secondary' = 'primary'
  ): CSSProperties => ({
    backgroundColor: theme.colors[`${variant}ButtonHover`],
  });
  
  /**
   * Styles pour les icônes
   */
  const getIconStyles = (secondary = false): CSSProperties => ({
    color: secondary ? theme.colors.iconColorSecondary : theme.colors.iconColor,
  });
  
  /**
   * Styles pour les rating/étoiles
   */
  const getRatingStyles = (): CSSProperties => ({
    color: theme.colors.ratingColor,
  });
  
  /**
   * Styles pour les auteurs
   */
  const getAuthorStyles = (): CSSProperties => ({
    backgroundColor: theme.colors.authorBackground,
    color: theme.colors.authorText,
    padding: '0.5rem',
    borderRadius: '0.5rem',
  });
  
  /**
   * Styles pour les images
   */
  const getImageStyles = (): CSSProperties => ({
    borderRadius: theme.spacing.imageRadius,
    overflow: 'hidden',
  });
  
  /**
   * Styles pour l'overlay des images
   */
  const getImageOverlayStyles = (): CSSProperties => ({
    background: theme.colors.imageOverlay,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  });
  
  /**
   * Variables CSS personnalisées pour le thème
   */
  const getCSSVariables = (): CSSProperties => ({
    '--card-bg': theme.colors.cardBackground,
    '--card-border': theme.colors.cardBorder,
    '--card-hover': theme.colors.cardHover,
    '--title-color': theme.colors.titleColor,
    '--description-color': theme.colors.descriptionColor,
    '--meta-color': theme.colors.metaColor,
    '--price-color': theme.colors.priceColor,
    '--icon-color': theme.colors.iconColor,
    '--rating-color': theme.colors.ratingColor,
    '--transition': theme.effects.hoverTransition,
    '--hover-scale': theme.effects.hoverScale,
    '--card-radius': theme.spacing.cardRadius,
    '--image-radius': theme.spacing.imageRadius,
  } as CSSProperties);
  
  /**
   * Classe CSS générée pour le thème
   */
  const getThemeClassName = () => `universal-card-theme-${theme.name}`;
  
  return {
    theme,
    getCardStyles,
    getCardHoverStyles,
    getTitleStyles,
    getDescriptionStyles,
    getMetaStyles,
    getPriceStyles,
    getBadgeStyles,
    getButtonStyles,
    getButtonHoverStyles,
    getIconStyles,
    getRatingStyles,
    getAuthorStyles,
    getImageStyles,
    getImageOverlayStyles,
    getCSSVariables,
    getThemeClassName,
  };
}

/**
 * Hook simplifié pour les styles inline uniquement
 */
export function useUniversalCardStyles(themeName?: UniversalCardThemeName) {
  const {
    getCardStyles,
    getTitleStyles,
    getDescriptionStyles,
    getPriceStyles,
    getBadgeStyles,
    getButtonStyles,
  } = useUniversalCardTheme(themeName);
  
  return {
    cardStyles: getCardStyles(),
    titleStyles: getTitleStyles(),
    descriptionStyles: getDescriptionStyles(),
    priceStyles: getPriceStyles(),
    badgeStyles: getBadgeStyles(),
    buttonStyles: getButtonStyles(),
  };
}
