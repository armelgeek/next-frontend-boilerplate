"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { 
  Grid3X3, 
  Palette, 
  Layout, 
  Zap, 
  Eye,
  Code,
  Download,
  Sparkles
} from 'lucide-react';

export function SectionBuilderDemo() {
  const [activeTab, setActiveTab] = useState('overview');

  const sectionTypes = [
    { id: 'hero', name: 'Hero', count: 3, icon: '🚀' },
    { id: 'features', name: 'Features', count: 2, icon: '⭐' },
    { id: 'testimonials', name: 'Testimonials', count: 2, icon: '💬' },
    { id: 'faq', name: 'FAQ', count: 2, icon: '❓' },
    { id: 'pricing', name: 'Pricing', count: 1, icon: '💰' },
    { id: 'team', name: 'Team', count: 1, icon: '👥' },
    { id: 'stats', name: 'Stats', count: 1, icon: '📊' },
    { id: 'cta', name: 'CTA', count: 2, icon: '🎯' },
  ];

  const themes = [
    { name: 'Minimal', color: 'bg-gray-100', preview: '🤍' },
    { name: 'Modern', color: 'bg-blue-100', preview: '💙' },
    { name: 'Gradient', color: 'bg-purple-100', preview: '💜' },
    { name: 'Glass', color: 'bg-cyan-100', preview: '🔷' },
    { name: 'Corporate', color: 'bg-indigo-100', preview: '💼' },
    { name: 'Creative', color: 'bg-pink-100', preview: '🎨' },
    { name: 'Nature', color: 'bg-green-100', preview: '🌿' },
    { name: 'Dark', color: 'bg-gray-800', preview: '🖤' },
    { name: 'Colorful', color: 'bg-rainbow-100', preview: '🌈' },
  ];

  const layouts = [
    { name: 'Default', description: 'Layout standard' },
    { name: 'Centered', description: 'Contenu centré' },
    { name: 'Split', description: 'Deux colonnes' },
    { name: 'Grid', description: 'Grille flexible' },
    { name: 'Masonry', description: 'Layout en maçonnerie' },
    { name: 'Carousel', description: 'Carrousel horizontal' },
    { name: 'Tabs', description: 'Navigation par onglets' },
    { name: 'Accordion', description: 'Contenu pliable' },
    { name: 'Timeline', description: 'Chronologie' },
  ];

  const features = [
    {
      title: 'Templates Prêts',
      description: '50+ templates de sections prédéfinis',
      icon: <Grid3X3 className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: '9 Thèmes',
      description: 'Styles variés pour tous les besoins',
      icon: <Palette className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: '9 Layouts',
      description: 'Dispositions flexibles et responsive',
      icon: <Layout className="w-5 h-5" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Génération Auto',
      description: 'CSS et code React générés',
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Grid3X3 className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">Section Builder</h1>
        </div>
        <p className="text-lg text-gray-600 mb-4">
          Générateur de sections génériques avec thèmes et layouts différents
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            ✅ 12 Types de sections
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            🎨 9 Thèmes disponibles
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            📱 100% Responsive
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="sections">Types de sections</TabsTrigger>
          <TabsTrigger value="themes">Thèmes & Layouts</TabsTrigger>
          <TabsTrigger value="code">Exemples de code</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className={`inline-flex p-2 rounded-lg ${feature.color} mb-3`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Workflow de création</CardTitle>
              <CardDescription>
                Comment utiliser le Section Builder en 4 étapes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                  <h4 className="font-medium mb-1">Choisir le type</h4>
                  <p className="text-xs text-gray-600">Hero, Features, FAQ, etc.</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                  <h4 className="font-medium mb-1">Sélectionner thème</h4>
                  <p className="text-xs text-gray-600">Minimal, Modern, Gradient...</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                  <h4 className="font-medium mb-1">Configurer layout</h4>
                  <p className="text-xs text-gray-600">Grid, Split, Carousel...</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
                  <h4 className="font-medium mb-1">Générer le code</h4>
                  <p className="text-xs text-gray-600">React + CSS automatique</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Types de sections */}
        <TabsContent value="sections" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectionTypes.map((section) => (
              <Card key={section.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{section.icon}</div>
                  <h3 className="font-semibold mb-1">{section.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {section.count} variant{section.count > 1 ? 's' : ''}
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Eye className="w-3 h-3 mr-1" />
                    Aperçu
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sections Hero</CardTitle>
                <CardDescription>3 variants disponibles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Simple</span>
                  <Badge variant="outline">Centré</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Gradient</span>
                  <Badge variant="outline">Split</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Video</span>
                  <Badge variant="outline">Overlay</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sections Features</CardTitle>
                <CardDescription>2 variants disponibles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Grid</span>
                  <Badge variant="outline">3 colonnes</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Timeline</span>
                  <Badge variant="outline">Étapes</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Thèmes & Layouts */}
        <TabsContent value="themes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thèmes disponibles (9)</CardTitle>
              <CardDescription>
                Chaque thème applique un style cohérent avec couleurs et typographie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
                {themes.map((theme) => (
                  <div key={theme.name} className="text-center">
                    <div className={`w-12 h-12 ${theme.color} rounded-lg flex items-center justify-center mx-auto mb-2 text-lg`}>
                      {theme.preview}
                    </div>
                    <p className="text-xs font-medium">{theme.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Layouts disponibles (9)</CardTitle>
              <CardDescription>
                Dispositions flexibles pour organiser votre contenu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {layouts.map((layout) => (
                  <div key={layout.name} className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-1">{layout.name}</h4>
                    <p className="text-sm text-gray-600">{layout.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exemples de code */}
        <TabsContent value="code" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Utilisation des templates</CardTitle>
                <CardDescription>Créer une section à partir d'un template</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
{`import { SectionTemplates } from '@/components/sections';

// Hero avec gradient
const heroSection = SectionTemplates.hero.gradient();

// Features en grille
const featuresSection = SectionTemplates.features.grid();

// FAQ en accordéon
const faqSection = SectionTemplates.faq.accordion();`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personnalisation</CardTitle>
                <CardDescription>Modifier une section existante</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
{`import { SectionBuilder } from '@/components/sections';

const customSection = SectionBuilder.customizeSection(
  heroSection, 
  {
    theme: 'dark',
    layout: 'split',
    title: 'Mon titre personnalisé',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  }
);`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rendu des sections</CardTitle>
                <CardDescription>Afficher les sections dans votre app</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
{`import { MultiSectionRenderer } from '@/components/sections';

export default function MyPage() {
  const sections = [
    SectionTemplates.hero.gradient(),
    SectionTemplates.features.grid(),
    SectionTemplates.testimonials.cards(),
  ];

  return (
    <MultiSectionRenderer sections={sections} />
  );
}`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pages complètes</CardTitle>
                <CardDescription>Générer des pages entières</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
{`import { SectionBuilderUtils } from '@/components/sections';

// Landing page complète
const landingPage = SectionBuilderUtils.generateLandingPage();

// Page à propos
const aboutPage = SectionBuilderUtils.generateAboutPage();

// Page fonctionnalités
const featuresPage = SectionBuilderUtils.generateFeaturesPage();`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 pt-6">
        <Button>
          <Sparkles className="w-4 h-4 mr-2" />
          Essayer le Builder
        </Button>
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Voir les exemples
        </Button>
        <Button variant="outline">
          <Code className="w-4 h-4 mr-2" />
          Documentation
        </Button>
      </div>
    </div>
  );
}
