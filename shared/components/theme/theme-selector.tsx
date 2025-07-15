"use client"

import React from 'react';
import { Button } from '@/shared/components/atoms/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { useTheme, useThemeClasses } from '@/shared/providers/theme-provider';
import { Palette, Check } from 'lucide-react';

interface ThemeSelectorProps {
  className?: string;
  compact?: boolean;
}

export function ThemeSelector({ className = "", compact = false }: ThemeSelectorProps) {
  const { currentTheme, setTheme, themeKey, availableThemes } = useTheme();
  const { getBackgroundClass, getColorClass } = useThemeClasses();

  const themes = Object.entries(availableThemes);

  if (compact) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {themes.map(([key, theme]) => (
          <Button
            key={key}
            variant={themeKey === key ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme(key)}
            className="relative"
          >
            {themeKey === key && <Check className="w-3 h-3 mr-1" />}
            {theme.name}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Sélecteur de Thème
        </CardTitle>
        <CardDescription>
          Choisissez un thème pour personnaliser l'apparence de l'interface
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map(([key, theme]) => (
            <div
              key={key}
              className={`
                relative p-4 rounded-lg border-2 cursor-pointer transition-all
                ${themeKey === key 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
                }
              `}
              onClick={() => setTheme(key)}
            >
              {themeKey === key && (
                <div className="absolute top-2 right-2">
                  <Badge variant="default">
                    <Check className="w-3 h-3 mr-1" />
                    Actuel
                  </Badge>
                </div>
              )}
              
              <div className="space-y-3">
                <h3 className="font-semibold">{theme.name}</h3>
                
                {/* Aperçu des couleurs */}
                <div className="flex gap-1">
                  <div 
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div 
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: theme.colors.secondary }}
                  />
                  <div 
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: theme.colors.background }}
                  />
                </div>

                {/* Informations du thème */}
                <div className="text-sm text-muted-foreground">
                  <p>Variant: <Badge variant="outline">{theme.variant}</Badge></p>
                  <p>Police: {theme.typography.fontFamily.sans[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Thème actuel */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Thème Actuel</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Nom:</strong> {currentTheme.name}</p>
              <p><strong>Variant:</strong> {currentTheme.variant}</p>
            </div>
            <div>
              <p><strong>Police principale:</strong> {currentTheme.typography.fontFamily.sans[0]}</p>
              <p><strong>Animation:</strong> {currentTheme.effects.animation.duration}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Composant pour prévisualiser un thème
interface ThemePreviewProps {
  themeKey: string;
  className?: string;
}

export function ThemePreview({ themeKey, className = "" }: ThemePreviewProps) {
  const { availableThemes } = useTheme();
  const theme = availableThemes[themeKey];

  if (!theme) {
    return <div className={className}>Thème non trouvé</div>;
  }

  return (
    <div className={`p-4 rounded-lg border ${className}`}>
      <h3 className="font-semibold mb-3">{theme.name}</h3>
      
      {/* Simulation d'interface avec le thème */}
      <div 
        className="space-y-3 p-3 rounded"
        style={{ 
          backgroundColor: theme.colors.background,
          color: theme.colors.foreground,
          fontFamily: theme.typography.fontFamily.sans.join(', ')
        }}
      >
        {/* Navbar simulée */}
        <div 
          className="flex items-center justify-between p-2 rounded"
          style={{ 
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border
          }}
        >
          <span 
            className="font-semibold"
            style={{ color: theme.colors.primary }}
          >
            Logo
          </span>
          <div className="flex gap-2">
            <span 
              className="px-2 py-1 rounded text-sm"
              style={{ 
                backgroundColor: theme.colors.primary,
                color: theme.colors.primaryForeground
              }}
            >
              Bouton
            </span>
          </div>
        </div>

        {/* Contenu simulé */}
        <div 
          className="p-3 rounded"
          style={{ backgroundColor: theme.colors.card }}
        >
          <h4 style={{ color: theme.colors.foreground }}>Titre</h4>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.colors.mutedForeground }}
          >
            Texte d'exemple pour prévisualiser le thème
          </p>
        </div>
      </div>
    </div>
  );
}
