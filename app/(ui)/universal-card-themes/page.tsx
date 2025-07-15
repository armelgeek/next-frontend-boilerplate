"use client";

import { useState } from 'react';
import { Button } from "@/shared/components/atoms/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/atoms/ui/tabs";
import { Badge } from "@/shared/components/atoms/ui/badge";
import UniversalCardThemeShowcase from "@/shared/components/examples/universal-card-theme-showcase";
import UniversalCardThemeStudio from "@/shared/components/examples/universal-card-theme-studio";
import { 
  Palette,
  Eye,
  Code,
  Sparkles,
  Zap,
  Moon,
  Layers,
  Clock,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

// Types et constantes
interface ThemeFeature {
  icon: React.ReactNode;
  color: string;
  features: string[];
}

interface UseCase {
  title: string;
  description: string;
  themes: string[];
  icon: string;
}

interface HeroBadge {
  icon: React.ReactNode;
  text: string;
}

interface KeyFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Configuration des données
const HERO_BADGES: HeroBadge[] = [
  { icon: <Star className="w-3 h-3" />, text: "5 Thèmes Premium" },
  { icon: <Zap className="w-3 h-3" />, text: "Temps Réel" },
  { icon: <CheckCircle className="w-3 h-3" />, text: "Plug & Play" }
];

const THEME_FEATURES: Record<string, ThemeFeature> = {
  default: {
    icon: <Layers className="w-4 h-4" />,
    color: "bg-blue-500",
    features: ["Design épuré", "Polyvalent", "Accessible"]
  },
  glassmorphism: {
    icon: <Sparkles className="w-4 h-4" />,
    color: "bg-purple-500",
    features: ["Effet verre", "Moderne", "Élégant"]
  },
  dark: {
    icon: <Moon className="w-4 h-4" />,
    color: "bg-gray-800",
    features: ["Mode sombre", "Contrasté", "Reposant"]
  },
  neon: {
    icon: <Zap className="w-4 h-4" />,
    color: "bg-cyan-500",
    features: ["Futuriste", "Vibrant", "Immersif"]
  },
  retro: {
    icon: <Clock className="w-4 h-4" />,
    color: "bg-orange-500",
    features: ["Vintage", "Nostalgique", "Chaleureux"]
  }
};

const KEY_FEATURES: KeyFeature[] = [
  {
    icon: <Palette className="w-5 h-5" />,
    title: "5 Thèmes Préconfigurés",
    description: "Default, Glassmorphism, Dark, Neon, et Retro avec leurs propres identités visuelles"
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Prévisualisation Temps Réel",
    description: "Studio interactif pour tester et configurer les thèmes instantanément"
  },
  {
    icon: <Code className="w-5 h-5" />,
    title: "API Simple",
    description: "Hook useUniversalCardTheme() pour intégrer facilement les thèmes"
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "13+ Contextes Supportés",
    description: "Event, Product, Profile, Blog, Job, Service, Course, et plus encore"
  }
];

const USE_CASES: UseCase[] = [
  {
    title: "E-commerce",
    description: "Catalogues de produits avec différentes ambiances selon la saison",
    themes: ["default", "neon"],
    icon: "🛍️"
  },
  {
    title: "Portfolio Créatif",
    description: "Présentations de projets avec des styles visuels variés",
    themes: ["glassmorphism", "dark"],
    icon: "🎨"
  },
  {
    title: "Plateforme d'Événements",
    description: "Cartes d'événements adaptées à l'ambiance (concert, conférence, etc.)",
    themes: ["neon", "retro"],
    icon: "🎪"
  },
  {
    title: "Blog Personnel",
    description: "Articles avec des thèmes qui reflètent l'humeur du contenu",
    themes: ["retro", "default"],
    icon: "📝"
  }
];

// Composants réutilisables
function HeroSection() {
  return (
    <div className="text-center space-y-8 py-16">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Universal Card Themes
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Système de thèmes complet pour vos Universal Cards. 
          5 thèmes uniques, personnalisables et prêts à l'emploi.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        {HERO_BADGES.map((badge, index) => (
          <Badge key={index} variant="outline" className="text-sm px-4 py-2">
            {badge.icon}
            <span className="ml-2">{badge.text}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}

function ThemesOverview() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {Object.entries(THEME_FEATURES).map(([themeName, theme]) => (
        <Card key={themeName} className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="text-center">
            <div className={`mx-auto p-3 rounded-full ${theme.color} text-white w-fit`}>
              {theme.icon}
            </div>
            <CardTitle className="capitalize">{themeName}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {theme.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function QuickStartSection() {
  const [copiedCode, setCopiedCode] = useState(false);
  
  const codeExample = `import { ThemedUniversalCard } from '@/components/universal-card-themed';

// Utilisation basique
<ThemedUniversalCard
  item={productData}
  context="product"
  themeName="glassmorphism"
  variant="default"
  size="md"
  actions={{
    primary: { label: "Acheter", onClick: () => handlePurchase() },
    bookmark: () => handleBookmark()
  }}
/>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Démarrage rapide</h2>
        <p className="text-gray-600 text-lg">
          Intégrez les thèmes Universal Card en quelques lignes de code
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <CodeExample codeExample={codeExample} onCopy={handleCopyCode} copied={copiedCode} />
        <FeaturesCard />
      </div>
    </section>
  );
}

function CodeExample({ codeExample, onCopy, copied }: { codeExample: string; onCopy: () => void; copied: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          Code d'exemple
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{codeExample}</code>
          </pre>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2"
            onClick={onCopy}
          >
            {copied ? "Copié !" : "Copier"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FeaturesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Fonctionnalités clés
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {KEY_FEATURES.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="text-green-500 mt-0.5">{feature.icon}</div>
              <div>
                <span className="font-medium">{feature.title}</span>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function UseCasesSection() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Cas d'usage</h2>
        <p className="text-gray-600 text-lg">
          Découvrez les possibilités d'utilisation des thèmes Universal Card
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {USE_CASES.map((useCase, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-2xl">{useCase.icon}</span>
                {useCase.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{useCase.description}</p>
              <div className="flex flex-wrap gap-2">
                {useCase.themes.map((theme) => (
                  <Badge key={theme} variant="outline" className="text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Explorez les Démos</h2>
        <p className="text-gray-600 text-lg">
          Découvrez toutes les possibilités avec nos outils interactifs
        </p>
      </div>

      <div className="space-y-8">
        <DemoCard 
          title="Showcase Complet"
          icon={<Eye className="w-6 h-6 text-purple-600" />}
          description="Explorez tous les thèmes avec des exemples réels pour chaque contexte et variante d'affichage."
          tabValue="showcase"
        >
          <UniversalCardThemeShowcase />
        </DemoCard>

        <DemoCard 
          title="Theme Studio"
          icon={<Palette className="w-6 h-6 text-blue-600" />}
          description="Studio interactif pour personnaliser et prévisualiser les thèmes en temps réel."
          tabValue="studio"
        >
          <UniversalCardThemeStudio />
        </DemoCard>
      </div>
    </section>
  );
}

function DemoCard({ title, icon, description, tabValue, children }: {
  title: string;
  icon: React.ReactNode;
  description: string;
  tabValue: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">{description}</p>
        <Tabs defaultValue={tabValue} className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value={tabValue}>
              {tabValue === 'showcase' ? 'Voir le Showcase' : 'Ouvrir le Studio'}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={tabValue} className="mt-6">
            {children}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function CallToActionSection() {
  return (
    <section className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
      <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
      <p className="text-xl mb-8 opacity-90">
        Intégrez les Universal Card Themes dans votre projet dès maintenant
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" variant="secondary">
          <Code className="w-5 h-5 mr-2" />
          Documentation
        </Button>
        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
          <Sparkles className="w-5 h-5 mr-2" />
          Voir les Exemples
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
}

function ThemesSection() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Aperçu des Thèmes</h2>
        <p className="text-gray-600 text-lg">
          5 thèmes uniques pour tous vos besoins de design
        </p>
      </div>
      <ThemesOverview />
    </section>
  );
}

// Composant principal refactorisé
export default function UniversalCardThemesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-8 py-16 space-y-16">
        
        <HeroSection />
        
        <ThemesSection />
        
        <QuickStartSection />
        
        <UseCasesSection />
        
        <DemoSection />
        
        <CallToActionSection />
        
      </div>
    </div>
  );
}
