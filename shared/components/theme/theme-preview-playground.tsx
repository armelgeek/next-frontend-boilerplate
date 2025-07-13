"use client";

import React from 'react';
import { Card } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Alert } from '@/shared/components/atoms/ui/alert';
import { Input } from '@/shared/components/atoms/ui/input';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import { ThemeConfig } from '@/shared/lib/generators/theme-builder-generator';
import { useThemeColors } from './theme-provider';

interface ThemePreviewPlaygroundProps {
  theme?: ThemeConfig;
  className?: string;
}

export function ThemePreviewPlayground({ theme, className }: ThemePreviewPlaygroundProps) {
  const { colors } = useThemeColors();

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Section Typography */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Typography & Texte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Heading 1</h1>
            <h2 className="text-3xl font-semibold text-foreground mb-2">Heading 2</h2>
            <h3 className="text-2xl font-medium text-foreground mb-2">Heading 3</h3>
            <h4 className="text-xl font-medium text-foreground mb-2">Heading 4</h4>
          </div>
          <div>
            <p className="text-foreground mb-2">
              Paragraphe normal avec du texte régulier pour tester la lisibilité.
            </p>
            <p className="text-muted-foreground mb-2">
              Texte avec couleur muted pour les descriptions secondaires.
            </p>
            <p className="text-sm text-muted-foreground">
              Petit texte pour les annotations et métadonnées.
            </p>
          </div>
        </div>
      </div>

      {/* Section Couleurs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Palette de Couleurs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="w-full h-16 bg-primary rounded-md border border-border"></div>
            <p className="text-sm font-medium text-foreground">Primary</p>
            <p className="text-xs text-muted-foreground">{colors?.primary}</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-secondary rounded-md border border-border"></div>
            <p className="text-sm font-medium text-foreground">Secondary</p>
            <p className="text-xs text-muted-foreground">{colors?.secondary}</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-accent rounded-md border border-border"></div>
            <p className="text-sm font-medium text-foreground">Accent</p>
            <p className="text-xs text-muted-foreground">{colors?.accent}</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-muted rounded-md border border-border"></div>
            <p className="text-sm font-medium text-foreground">Muted</p>
            <p className="text-xs text-muted-foreground">{colors?.muted}</p>
          </div>
        </div>
      </div>

      {/* Section Boutons */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Boutons & Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>

      {/* Section Badges */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Badges & Statuts</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      {/* Section Formulaires */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Formulaires & Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Nom complet
              </label>
              <Input placeholder="Entrez votre nom" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Email
              </label>
              <Input type="email" placeholder="exemple@email.com" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Message
            </label>
            <Textarea 
              placeholder="Tapez votre message ici..."
              className="min-h-[120px]"
            />
          </div>
        </div>
      </div>

      {/* Section Cartes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Cartes & Conteneurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-2">Carte Simple</h3>
            <p className="text-muted-foreground text-sm">
              Contenu de la carte avec du texte descriptif.
            </p>
          </Card>
          <Card className="p-4 border-primary">
            <h3 className="font-semibold text-primary mb-2">Carte Accent</h3>
            <p className="text-muted-foreground text-sm">
              Carte avec bordure colorée pour attirer l'attention.
            </p>
          </Card>
          <Card className="p-4 bg-muted">
            <h3 className="font-semibold text-foreground mb-2">Carte Muted</h3>
            <p className="text-muted-foreground text-sm">
              Carte avec arrière-plan muted pour variation.
            </p>
          </Card>
        </div>
      </div>

      {/* Section Alertes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Alertes & Messages</h2>
        <div className="space-y-3">
          <Alert>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-info rounded-full"></div>
              <div>
                <p className="font-medium">Information</p>
                <p className="text-sm text-muted-foreground">
                  Message d'information standard.
                </p>
              </div>
            </div>
          </Alert>
          
          <Alert className="border-success">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-success rounded-full"></div>
              <div>
                <p className="font-medium text-success">Succès</p>
                <p className="text-sm text-muted-foreground">
                  Opération réalisée avec succès.
                </p>
              </div>
            </div>
          </Alert>
          
          <Alert className="border-warning">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-warning rounded-full"></div>
              <div>
                <p className="font-medium text-warning">Attention</p>
                <p className="text-sm text-muted-foreground">
                  Attention requise pour cette action.
                </p>
              </div>
            </div>
          </Alert>
          
          <Alert className="border-destructive">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-destructive rounded-full"></div>
              <div>
                <p className="font-medium text-destructive">Erreur</p>
                <p className="text-sm text-muted-foreground">
                  Une erreur s'est produite.
                </p>
              </div>
            </div>
          </Alert>
        </div>
      </div>

      {/* Section Grille de Layout */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Layout & Grilles</h2>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <div className="bg-primary/10 border border-primary/20 rounded-md p-4">
              <h3 className="font-medium text-foreground">Contenu Principal (8/12)</h3>
              <p className="text-sm text-muted-foreground">Zone de contenu principale</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="bg-secondary/10 border border-secondary/20 rounded-md p-4">
              <h3 className="font-medium text-foreground">Sidebar (4/12)</h3>
              <p className="text-sm text-muted-foreground">Zone secondaire</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-accent/10 border border-accent/20 rounded-md p-4">
            <h4 className="font-medium text-foreground">Item 1</h4>
            <p className="text-sm text-muted-foreground">Description courte</p>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-md p-4">
            <h4 className="font-medium text-foreground">Item 2</h4>
            <p className="text-sm text-muted-foreground">Description courte</p>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-md p-4">
            <h4 className="font-medium text-foreground">Item 3</h4>
            <p className="text-sm text-muted-foreground">Description courte</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant avec toggle de mode pour tester
export function ThemePreviewWithModeToggle({ theme, className }: ThemePreviewPlaygroundProps) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Aperçu du Thème
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Mode:</span>
          {/* Toggle de mode sera ajouté avec ThemeProvider */}
        </div>
      </div>
      
      <ThemePreviewPlayground theme={theme} />
    </div>
  );
}
