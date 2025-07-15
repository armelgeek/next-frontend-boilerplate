"use client"

import React from 'react';
import { Navbar } from '@/shared/components/organisms/navbar';
import { ThemeSelector, ThemePreview } from '@/shared/components/theme/theme-selector';
import { FontTester } from '@/shared/components/theme/font-tester';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { useTheme } from '@/shared/providers/theme-provider';
import { useInlineThemeStyles, useThemeVariants } from '@/shared/hooks/use-theme-utils';
import { themeFonts } from '@/shared/lib/themes/theme-fonts';

export default function ThemeStudioPage() {
  const { currentTheme, availableThemes } = useTheme();
  const { getCardStyle, getButtonStyle } = useInlineThemeStyles();
  const { cardVariants, buttonVariants } = useThemeVariants();

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar avec thème appliqué */}
      <Navbar 
        variant={currentTheme.variant as any}
        logo={{ text: "ThemeStudio" }}
      />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Studio de Thèmes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explorez et testez tous les thèmes disponibles pour les composants navbar. 
            Changez de thème en temps réel et voyez l'impact sur toute l'interface.
          </p>
          <Badge variant="outline" className="text-sm">
            Thème actuel: {currentTheme.name}
          </Badge>
        </div>

        {/* Sélecteur de thème */}
        <ThemeSelector />

        {/* Démonstration en temps réel */}
        <Card style={getCardStyle()}>
          <CardHeader>
            <CardTitle>Démonstration en Temps Réel</CardTitle>
            <CardDescription>
              Voici comment les composants s'affichent avec le thème sélectionné
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Boutons */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Boutons</h3>
              <div className="flex flex-wrap gap-3">
                <Button style={getButtonStyle('primary')}>
                  Bouton Principal
                </Button>
                <Button style={getButtonStyle('secondary')}>
                  Bouton Secondaire
                </Button>
                <Button style={getButtonStyle('accent')}>
                  Bouton Accent
                </Button>
              </div>
            </div>

            {/* Cards avec variants */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Cartes avec Variants</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={cardVariants.default}>
                  <CardHeader>
                    <CardTitle>Card Default</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Style de carte par défaut</p>
                  </CardContent>
                </Card>

                {currentTheme.variant === 'glassmorphism' && (
                  <Card className={cardVariants.glassmorphism}>
                    <CardHeader>
                      <CardTitle>Card Glassmorphism</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Effet de verre avec flou</p>
                    </CardContent>
                  </Card>
                )}

                {currentTheme.variant === 'neon' && (
                  <Card className={cardVariants.neon}>
                    <CardHeader>
                      <CardTitle>Card Neon</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Style néon avec effets lumineux</p>
                    </CardContent>
                  </Card>
                )}

                {currentTheme.variant === 'retro' && (
                  <Card className={cardVariants.retro}>
                    <CardHeader>
                      <CardTitle>Card Retro</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Style rétro avec ombres</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Palette de couleurs */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Palette de Couleurs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(currentTheme.colors).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div 
                      className="w-full h-16 rounded border"
                      style={{ backgroundColor: value }}
                    />
                    <div className="text-sm">
                      <p className="font-medium">{key}</p>
                      <p className="text-muted-foreground text-xs">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typographie */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Typographie</h3>
              <div className="space-y-4">
                {/* Fonts par défaut du thème */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Fonts par défaut du thème</h4>
                  <p style={{ fontFamily: currentTheme.typography.fontFamily.sans.join(', ') }}>
                    Police Sans-serif: {currentTheme.typography.fontFamily.sans[0]}
                  </p>
                  <p style={{ fontFamily: currentTheme.typography.fontFamily.serif.join(', ') }}>
                    Police Serif: {currentTheme.typography.fontFamily.serif[0]}
                  </p>
                  <p style={{ fontFamily: currentTheme.typography.fontFamily.mono.join(', ') }}>
                    Police Monospace: {currentTheme.typography.fontFamily.mono[0]}
                  </p>
                </div>

                {/* Fonts Google intégrées pour ce thème */}
                {themeFonts[currentTheme.variant as keyof typeof themeFonts] && (
                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="font-medium text-sm text-muted-foreground">Google Fonts intégrées</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Sans-serif</p>
                        <p style={{ fontFamily: themeFonts[currentTheme.variant as keyof typeof themeFonts].sans }}>
                          The quick brown fox jumps over the lazy dog
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Serif</p>
                        <p style={{ fontFamily: themeFonts[currentTheme.variant as keyof typeof themeFonts].serif }}>
                          The quick brown fox jumps over the lazy dog
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Monospace</p>
                        <p style={{ fontFamily: themeFonts[currentTheme.variant as keyof typeof themeFonts].mono }}>
                          The quick brown fox jumps over the lazy dog
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Démonstration des tailles */}
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="font-medium text-sm text-muted-foreground">Tailles de police</h4>
                  <div className="space-y-2">
                    <p className="text-xs">Extra petit texte (xs)</p>
                    <p className="text-sm">Petit texte (sm)</p>
                    <p className="text-base">Texte normal (base)</p>
                    <p className="text-lg">Grand texte (lg)</p>
                    <p className="text-xl">Très grand texte (xl)</p>
                    <p className="text-2xl">Titre niveau 2 (2xl)</p>
                    <p className="text-3xl">Titre niveau 1 (3xl)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Effets spéciaux selon le thème */}
            {currentTheme.customProperties && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Effets Spéciaux</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(currentTheme.customProperties).map(([key, value]) => (
                    <div key={key} className="p-3 border rounded">
                      <p className="font-medium">{key}</p>
                      <p className="text-sm text-muted-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Testeur de fonts Google */}
        <FontTester />

        {/* Aperçu de tous les thèmes */}
        <Card>
          <CardHeader>
            <CardTitle>Aperçu de Tous les Thèmes</CardTitle>
            <CardDescription>
              Comparaison visuelle de tous les thèmes disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(availableThemes).map((themeKey) => (
                <ThemePreview 
                  key={themeKey} 
                  themeKey={themeKey}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions d'utilisation */}
        <Card>
          <CardHeader>
            <CardTitle>Comment Utiliser les Thèmes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Envelopper votre app avec ThemeProvider</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`import { ThemeProvider } from '@/shared/providers/theme-provider';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider defaultTheme="default">
      {children}
    </ThemeProvider>
  );
}`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. Utiliser les hooks de thème</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`import { useTheme, useInlineThemeStyles } from '@/shared/providers/theme-provider';

function MyComponent() {
  const { currentTheme, setTheme } = useTheme();
  const { getCardStyle } = useInlineThemeStyles();
  
  return (
    <div style={getCardStyle()}>
      Thème actuel: {currentTheme.name}
    </div>
  );
}`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3. Importer les styles CSS</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`// Dans votre globals.css
@import '@/shared/styles/themes.css';`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
