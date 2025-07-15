"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

import { 
  Palette,
  Layout,
  Component,
  Layers,
  Grid,
  Navigation,
  Zap,
  Building,
  Users,
  FileText,
  Settings,
  Smartphone,
  Globe,
  ArrowRight,
  Sparkles,
  Target,
  Briefcase
} from 'lucide-react';

// Configuration des pages de démonstration
const DEMO_PAGES = [
  {
    id: 'theme-studio',
    title: 'Theme Studio',
    description: 'Studio de création et de personnalisation des thèmes',
    category: 'Styling',
    href: '/theme-studio',
    icon: <Palette className="w-6 h-6" />,
    tags: ['thèmes', 'couleurs', 'design'],
    features: ['23 thèmes prédéfinis', 'Personnalisation avancée', 'Export CSS'],
    color: 'bg-purple-500'
  },
  {
    id: 'sections-demo',
    title: 'Sections Demo',
    description: 'Galerie complète de toutes les sections disponibles',
    category: 'Components',
    href: '/sections-demo',
    icon: <Layers className="w-6 h-6" />,
    tags: ['sections', 'composants', 'ui'],
    features: ['12+ sections', 'Aperçu interactif', 'Code d\'exemple'],
    color: 'bg-blue-500'
  },
  {
    id: 'organisms-demo',
    title: 'Organisms Demo',
    description: 'Démonstration des composants organisms avec thèmes',
    category: 'Components',
    href: '/organisms-demo',
    icon: <Component className="w-6 h-6" />,
    tags: ['organisms', 'components', 'atomic'],
    features: ['25+ organisms', 'Catégorisation', 'Recherche avancée'],
    color: 'bg-green-500'
  },
  {
    id: 'footer-variants',
    title: 'Footer Variants',
    description: 'Collection complète de variants de footer',
    category: 'Layout',
    href: '/footer-variants',
    icon: <Layout className="w-6 h-6" />,
    tags: ['footer', 'variants', 'layout'],
    features: ['23 variants', 'Secteurs spécialisés', 'Configuration live'],
    color: 'bg-orange-500'
  },
  {
    id: 'hero-variants',
    title: 'Hero Variants',
    description: 'Variants de sections hero pour différents usages',
    category: 'Components',
    href: '/hero-variants',
    icon: <Zap className="w-6 h-6" />,
    tags: ['hero', 'bannière', 'accueil'],
    features: ['Multiple layouts', 'Animations', 'CTAs optimisés'],
    color: 'bg-yellow-500'
  },
  {
    id: 'navbar-variants',
    title: 'Navbar Variants',
    description: 'Barres de navigation adaptatives et thématiques',
    category: 'Navigation',
    href: '/navbar-variants',
    icon: <Navigation className="w-6 h-6" />,
    tags: ['navigation', 'header', 'menu'],
    features: ['Responsive design', 'Mega menus', 'Styles variés'],
    color: 'bg-red-500'
  },
  {
    id: 'universal-card-themes',
    title: 'Universal Cards',
    description: 'Cartes universelles avec thèmes et contextes',
    category: 'Components',
    href: '/universal-card-themes',
    icon: <Grid className="w-6 h-6" />,
    tags: ['cartes', 'thèmes', 'contextes'],
    features: ['13+ contextes', '5 thèmes', 'Studio interactif'],
    color: 'bg-indigo-500'
  },
  {
    id: 'entity-demo',
    title: 'Entity Demo',
    description: 'Démonstration des composants d\'entités',
    category: 'Data',
    href: '/entity-demo',
    icon: <FileText className="w-6 h-6" />,
    tags: ['entités', 'data', 'crud'],
    features: ['CRUD complet', 'Formulaires', 'Tables'],
    color: 'bg-teal-500'
  },
  {
    id: 'entity-templates',
    title: 'Entity Templates',
    description: 'Templates prêts à l\'emploi pour entités',
    category: 'Templates',
    href: '/entity-templates',
    icon: <Building className="w-6 h-6" />,
    tags: ['templates', 'modèles', 'entités'],
    features: ['Templates variés', 'Customisation', 'Génération auto'],
    color: 'bg-pink-500'
  },
  {
    id: 'section-builder',
    title: 'Section Builder',
    description: 'Constructeur de sections drag & drop',
    category: 'Builder',
    href: '/section-builder',
    icon: <Settings className="w-6 h-6" />,
    tags: ['builder', 'constructeur', 'drag-drop'],
    features: ['Interface visuelle', 'Drag & drop', 'Export code'],
    color: 'bg-cyan-500'
  },
  {
    id: 'navigation-example',
    title: 'Navigation Examples',
    description: 'Exemples de navigation avancée',
    category: 'Navigation',
    href: '/navigation-example',
    icon: <Globe className="w-6 h-6" />,
    tags: ['navigation', 'exemples', 'UX'],
    features: ['Patterns avancés', 'Responsive', 'Accessibilité'],
    color: 'bg-emerald-500'
  },
  {
    id: 'builders',
    title: 'Builders Studio',
    description: 'Collection d\'outils de construction UI',
    category: 'Builder',
    href: '/builders',
    icon: <Briefcase className="w-6 h-6" />,
    tags: ['builders', 'outils', 'studio'],
    features: ['Outils intégrés', 'Interface unifiée', 'Export multiple'],
    color: 'bg-violet-500'
  }
] as const;

// Catégories disponibles
const CATEGORIES = [
  'Tous',
  'Styling',
  'Components', 
  'Layout',
  'Navigation',
  'Data',
  'Templates',
  'Builder'
] as const;

export default function UIStudioIndex() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('Tous');

  // Filtrage par catégorie
  const filteredPages = DEMO_PAGES.filter(page => 
    selectedCategory === 'Tous' || page.category === selectedCategory
  );

  // Statistiques
  const totalPages = DEMO_PAGES.length;
  const totalFeatures = DEMO_PAGES.reduce((acc, page) => acc + page.features.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            UI Studio
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explorez notre collection complète d'outils de développement UI, de composants thématiques,
            et de systèmes de design. Tout ce dont vous avez besoin pour créer des interfaces exceptionnelles.
          </p>

          {/* Statistiques */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalPages}</div>
              <div className="text-sm text-gray-500">Outils disponibles</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{totalFeatures}</div>
              <div className="text-sm text-gray-500">Fonctionnalités</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{CATEGORIES.length - 1}</div>
              <div className="text-sm text-gray-500">Catégories</div>
            </div>
          </div>

          {/* Filtres de catégorie */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Grille des pages de démonstration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPages.map((page) => (
            <Card 
              key={page.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "inline-flex items-center justify-center w-12 h-12 rounded-xl text-white",
                    page.color
                  )}>
                    {page.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {page.category}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {page.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {page.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {page.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Fonctionnalités clés */}
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Fonctionnalités :</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {page.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bouton d'accès */}
                <Link href={page.href} className="block">
                  <Button className="w-full group-hover:bg-blue-600 transition-colors">
                    Découvrir
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section informative */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Système de Design Complet
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Notre UI Studio offre une approche modulaire et cohérente pour le développement d'interfaces.
              Chaque outil est conçu pour s'intégrer parfaitement avec les autres, créant un écosystème
              de développement puissant et flexible.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Component className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Composants Modulaires</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Bibliothèque complète de composants réutilisables
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Palette className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Thèmes Avancés</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Système de thématisation flexible et personnalisable
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Prêt Production</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Code optimisé et testé pour vos projets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
