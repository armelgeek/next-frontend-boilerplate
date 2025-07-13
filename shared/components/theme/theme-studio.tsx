"use client";

import React, { useState } from 'react';
import { Card } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { 
  ThemeProvider, 
  ThemeGenerator, 
  ThemeModeToggle, 
  ThemeSelector,
  useThemeContext,
  useThemePersistence 
} from './index';
import { ThemePreviewPlayground } from './theme-preview-playground';
import { ThemeTemplates, ThemeConfig, ThemeBuilder } from '@/shared/lib/generators/theme-builder-generator';

// Composant principal de démonstration
function ThemeStudioContent() {
  const { currentTheme, setTheme, availableThemes } = useThemeContext();
  const { exportToFile } = useThemePersistence();
  const [activeTab, setActiveTab] = useState('preview');

  const loadTemplate = (templateName: keyof typeof ThemeTemplates) => {
    const theme = ThemeBuilder.generateFromTemplate(templateName);
    setTheme(theme);
  };

  const handleExport = (format: 'css' | 'tailwind' | 'json') => {
    if (currentTheme) {
      exportToFile(currentTheme, format);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Theme Studio</h1>
              <p className="text-muted-foreground">
                Créez et testez vos thèmes en temps réel
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeSelector className="min-w-[200px]" />
              <ThemeModeToggle />
              
              {currentTheme && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('css')}
                  >
                    Export CSS
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('tailwind')}
                  >
                    Export Tailwind
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('json')}
                  >
                    Export JSON
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Templates rapides */}
      <div className="border-b border-border bg-muted/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-foreground">Templates rapides:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(ThemeTemplates).map((templateName) => (
              <Button
                key={templateName}
                variant="outline"
                size="sm"
                onClick={() => loadTemplate(templateName as keyof typeof ThemeTemplates)}
                className="capitalize"
              >
                {ThemeTemplates[templateName as keyof typeof ThemeTemplates].displayName}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Aperçu</TabsTrigger>
            <TabsTrigger value="editor">Éditeur</TabsTrigger>
            <TabsTrigger value="themes">Mes Thèmes</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-6">
            <Card className="p-0 overflow-hidden">
              {currentTheme ? (
                <ThemePreviewPlayground theme={currentTheme} />
              ) : (
                <div className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Aucun thème sélectionné
                  </p>
                  <Button onClick={() => loadTemplate('modern')}>
                    Charger le thème Moderne
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="editor" className="mt-6">
            <Card className="p-6">
              <ThemeGenerator />
            </Card>
          </TabsContent>

          <TabsContent value="themes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableThemes.length > 0 ? (
                availableThemes.map((theme) => (
                  <ThemeCard
                    key={theme.name}
                    theme={theme}
                    onSelect={() => setTheme(theme)}
                    isSelected={currentTheme?.name === theme.name}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Aucun thème sauvegardé
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Créez votre premier thème dans l'éditeur
                  </p>
                  <Button onClick={() => setActiveTab('editor')}>
                    Ouvrir l'éditeur
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Composant de carte de thème
interface ThemeCardProps {
  theme: ThemeConfig;
  onSelect: () => void;
  isSelected: boolean;
}

function ThemeCard({ theme, onSelect, isSelected }: ThemeCardProps) {
  const lightColors = theme.colors.light;
  const darkColors = theme.colors.dark;

  return (
    <Card className={`p-4 cursor-pointer transition-all hover:shadow-md ${
      isSelected ? 'ring-2 ring-primary' : ''
    }`} onClick={onSelect}>
      <div className="mb-3">
        <h3 className="font-semibold text-foreground">{theme.displayName}</h3>
        <p className="text-sm text-muted-foreground">{theme.description}</p>
      </div>
      
      {/* Aperçu couleurs */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Mode clair</p>
          <div className="flex gap-1">
            <div 
              className="w-4 h-4 rounded border border-border"
              style={{ backgroundColor: lightColors.primary.value }}
            />
            <div 
              className="w-4 h-4 rounded border border-border"
              style={{ backgroundColor: lightColors.secondary.value }}
            />
            <div 
              className="w-4 h-4 rounded border border-border"
              style={{ backgroundColor: lightColors.accent.value }}
            />
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Mode sombre</p>
          <div className="flex gap-1">
            <div 
              className="w-4 h-4 rounded border border-border"
              style={{ backgroundColor: darkColors.primary.value }}
            />
            <div 
              className="w-4 h-4 rounded border border-border"
              style={{ backgroundColor: darkColors.secondary.value }}
            />
            <div 
              className="w-4 h-4 rounded border border-border"
              style={{ backgroundColor: darkColors.accent.value }}
            />
          </div>
        </div>
      </div>
      
      {/* Badges */}
      <div className="flex gap-1 flex-wrap">
        <Badge variant="outline" className="text-xs">
          {theme.typography.fontFamily.sans[0] || 'Sans Serif'}
        </Badge>
        {theme.name.includes('luxury') && (
          <Badge variant="secondary" className="text-xs">Premium</Badge>
        )}
        {isSelected && (
          <Badge variant="default" className="text-xs">Actuel</Badge>
        )}
      </div>
    </Card>
  );
}

// Composant wrapper avec Provider
export function ThemeStudio() {
  return (
    <ThemeProvider defaultTheme={ThemeBuilder.generateFromTemplate('modern')}>
      <ThemeStudioContent />
    </ThemeProvider>
  );
}

// Export du composant principal
export default ThemeStudio;
