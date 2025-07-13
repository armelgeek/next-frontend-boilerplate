"use client";

import React, { useState } from 'react';
import { Card } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { 
  Palette, 
  Navigation, 
  FileText, 
  Bell, 
  Layout, 
  Zap,
  Download,
  Eye,
  Settings,
  Sparkles,
  Grid3X3
} from 'lucide-react';

import { ThemeStudio } from '@/shared/components/theme';
import { NavigationBuilderDemo } from '@/shared/components/builders/navigation-builder-demo';
import { FormBuilderDemo } from '@/shared/components/builders/form-builder-demo';
import { NotificationBuilderDemo } from '@/shared/components/builders/notification-builder-demo';
import { LayoutBuilderDemo } from '@/shared/components/builders/layout-builder-demo';
import { EntityGeneratorDemo } from '@/shared/components/builders/entity-generator-demo';
import { SectionBuilderDemo } from '@/shared/components/builders/section-builder-demo';

// Interface pour les builders
interface Builder {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'coming-soon' | 'beta';
  category: 'design' | 'layout' | 'content' | 'system';
  features: string[];
  component?: React.ComponentType;
}

// Configuration des builders disponibles
const builders: Builder[] = [
  {
    id: 'theme-builder',
    name: 'Theme Builder',
    description: 'Créez et personnalisez des thèmes complets avec palette de couleurs, typographie et modes clair/sombre.',
    icon: <Palette className="w-6 h-6" />,
    status: 'available',
    category: 'design',
    features: [
      'Palette de couleurs harmoniques',
      'Mode clair/sombre automatique',
      'Export CSS/Tailwind/JSON',
      'Templates prédéfinis',
      'Aperçu en temps réel'
    ],
    component: ThemeStudio
  },
  {
    id: 'section-builder',
    name: 'Section Builder',
    description: 'Générateur de sections génériques (Hero, FAQ, Testimonials, etc.) avec thèmes et layouts différents.',
    icon: <Grid3X3 className="w-6 h-6" />,
    status: 'available',
    category: 'content',
    features: [
      '12 types de sections',
      '9 thèmes et layouts',
      'Templates prêts à l\'emploi',
      'Export React/CSS',
      'Interface visuelle'
    ],
    component: SectionBuilderDemo
  },
  {
    id: 'navigation-builder',
    name: 'Navigation Builder',
    description: 'Générez automatiquement des systèmes de navigation (sidebars, headers, breadcrumbs) avec permissions.',
    icon: <Navigation className="w-6 h-6" />,
    status: 'available',
    category: 'layout',
    features: [
      'Sidebars responsive',
      'Headers avec dropdowns',
      'Breadcrumbs automatiques',
      'Gestion des permissions',
      'Templates admin/client'
    ],
    component: NavigationBuilderDemo
  },
  {
    id: 'form-builder',
    name: 'Form Builder',
    description: 'Construisez des formulaires complexes avec validation, étapes multiples et champs conditionnels.',
    icon: <FileText className="w-6 h-6" />,
    status: 'beta',
    category: 'content',
    features: [
      'Formulaires multi-étapes',
      'Champs conditionnels',
      'Validation Zod intégrée',
      'Auto-save et brouillons',
      'Templates métier'
    ],
    component: FormBuilderDemo
  },
  {
    id: 'notification-builder',
    name: 'Notification System',
    description: 'Système unifié pour gérer toutes les notifications (toasts, modals, banners) avec templates.',
    icon: <Bell className="w-6 h-6" />,
    status: 'beta',
    category: 'system',
    features: [
      'Types multiples (toast, modal, banner)',
      'Templates métier prédéfinis',
      'Actions personnalisées',
      'Historique et persistence',
      'Configuration centralisée'
    ],
    component: NotificationBuilderDemo
  },
  {
    id: 'layout-builder',
    name: 'Layout Builder',
    description: 'Générez des layouts complexes avec grilles responsives, sections et composants automatiques.',
    icon: <Layout className="w-6 h-6" />,
    status: 'beta',
    category: 'layout',
    features: [
      'Grilles responsives',
      'Layouts flexbox avancés',
      'Sections hero, cards, formulaires',
      'Templates de pages complètes',
      'Animation et transitions'
    ],
    component: LayoutBuilderDemo
  },
  {
    id: 'entity-generator',
    name: 'Entity Generator',
    description: 'Génération automatique d\'entités front-office avec CRUD, recherche et pagination.',
    icon: <Zap className="w-6 h-6" />,
    status: 'available',
    category: 'system',
    features: [
      'Pages CRUD complètes',
      'Hooks React Query',
      'Composants génériques',
      'Recherche et filtres',
      'Mode mock/API'
    ],
    component: EntityGeneratorDemo
  }
];

export default function BuildersPage() {
  const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const categories = {
    design: { name: 'Design', color: 'bg-purple-100 text-purple-800' },
    layout: { name: 'Layout', color: 'bg-blue-100 text-blue-800' },
    content: { name: 'Contenu', color: 'bg-green-100 text-green-800' },
    system: { name: 'Système', color: 'bg-orange-100 text-orange-800' }
  };

  const statusConfig = {
    available: { label: 'Disponible', color: 'bg-green-100 text-green-800' },
    beta: { label: 'Bêta', color: 'bg-yellow-100 text-yellow-800' },
    'coming-soon': { label: 'Bientôt', color: 'bg-gray-100 text-gray-800' }
  };

  if (selectedBuilder?.component) {
    const BuilderComponent = selectedBuilder.component;
    return (
      <div className="min-h-screen bg-background">
        {/* Header avec retour */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedBuilder(null)}
              >
                ← Retour aux Builders
              </Button>
              <div className="flex items-center gap-3">
                {selectedBuilder.icon}
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {selectedBuilder.name}
                  </h1>
                  <p className="text-muted-foreground">
                    {selectedBuilder.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Composant du builder */}
        <BuilderComponent />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Builders Studio
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Outils de génération automatique pour accélérer votre développement
            </p>
            <p className="text-muted-foreground">
              Créez des thèmes, des navigations, des formulaires et bien plus avec nos builders intelligents.
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="content">Contenu</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="system">Système</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {builders.map((builder) => (
                <BuilderCard
                  key={builder.id}
                  builder={builder}
                  onSelect={() => setSelectedBuilder(builder)}
                  categories={categories}
                  statusConfig={statusConfig}
                />
              ))}
            </div>
          </TabsContent>

          {['design', 'content', 'layout', 'system'].map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {categories[category as keyof typeof categories].name}
                </h2>
                <p className="text-muted-foreground">
                  Builders spécialisés dans la catégorie {categories[category as keyof typeof categories].name.toLowerCase()}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {builders
                  .filter((builder) => builder.category === category)
                  .map((builder) => (
                    <BuilderCard
                      key={builder.id}
                      builder={builder}
                      onSelect={() => setSelectedBuilder(builder)}
                      categories={categories}
                      statusConfig={statusConfig}
                      detailed
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Section d'aide */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Besoin d'aide ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Consultez la documentation de chaque builder pour des guides détaillés et des exemples.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline">
                📚 Documentation
              </Button>
              <Button variant="outline">
                💡 Exemples
              </Button>
              <Button variant="outline">
                🎯 Tutoriels
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant de carte de builder
interface BuilderCardProps {
  builder: Builder;
  onSelect: () => void;
  categories: Record<string, { name: string; color: string }>;
  statusConfig: Record<string, { label: string; color: string }>;
  detailed?: boolean;
}

function BuilderCard({ 
  builder, 
  onSelect, 
  categories, 
  statusConfig, 
  detailed = false 
}: BuilderCardProps) {
  const isAvailable = builder.status === 'available';

  return (
    <Card className={`p-6 cursor-pointer transition-all hover:shadow-md ${
      !isAvailable ? 'opacity-75' : ''
    } ${isAvailable ? 'hover:shadow-lg' : ''}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-2 rounded-md ${
          isAvailable ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
        }`}>
          {builder.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{builder.name}</h3>
            <Badge 
              variant="outline" 
              className={statusConfig[builder.status].color}
            >
              {statusConfig[builder.status].label}
            </Badge>
          </div>
          <Badge 
            variant="secondary" 
            className={`text-xs ${categories[builder.category].color}`}
          >
            {categories[builder.category].name}
          </Badge>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {builder.description}
      </p>

      {detailed && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Fonctionnalités :</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {builder.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-primary rounded-full" />
                {feature}
              </li>
            ))}
            {builder.features.length > 3 && (
              <li className="text-muted-foreground">
                +{builder.features.length - 3} autres fonctionnalités
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="flex gap-2">
        <Button 
          onClick={onSelect}
          disabled={!isAvailable}
          className="flex-1"
          variant={isAvailable ? "default" : "outline"}
        >
          {isAvailable ? (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Ouvrir
            </>
          ) : (
            <>
              <Settings className="w-4 h-4 mr-2" />
              Bientôt disponible
            </>
          )}
        </Button>
        {isAvailable && (
          <Button variant="outline" size="icon">
            <Download className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}
