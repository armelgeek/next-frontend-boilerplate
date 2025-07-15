"use client";

import { useState } from 'react';
import { Button } from "@/shared/components/atoms/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/atoms/ui/select";
import { ThemedUniversalCard } from "@/shared/components/examples/universal-card-theme-showcase";
import { getUniversalCardThemeNames } from "@/shared/lib/themes/universal-card-themes";
import type { UniversalCardThemeName } from "@/shared/lib/themes/universal-card-themes";
import { Palette, Eye, Code, Download, Settings } from "lucide-react";

// Données d'exemple complètes pour TOUS les contextes
const sampleData = {
  event: {
    id: "1",
    title: "Conférence IA & Innovation 2025",
    description: "Découvrez les dernières avancées en intelligence artificielle et technologies émergentes.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    date: "2025-08-15",
    endDate: "2025-08-17",
    time: "09:00",
    venue: "Palais des Congrès de Paris",
    attendees: 850,
    maxAttendees: 1200,
    isOnline: false,
    price: { amount: 249, currency: "€", period: "once" as const, original: 299, discount: 17 },
    location: { city: "Paris", country: "France" },
    category: "Technologie",
    rating: 4.8,
    reviews: 342,
    tags: ["IA", "Innovation", "Tech"],
    featured: true,
    status: "active" as const,
    organizer: { name: "TechEvents Global", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
    createdAt: "2025-07-01"
  },
  product: {
    id: "2",
    title: "MacBook Pro M3 14\"",
    description: "Ordinateur portable haute performance pour créatifs et développeurs.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    brand: "Apple",
    model: "MacBook Pro 14",
    condition: "new" as const,
    price: { amount: 2299, currency: "€", period: "once" as const, original: 2499, discount: 8 },
    specs: { storage: "512GB", memory: "16GB", processor: "M3 Pro" },
    category: "Informatique",
    rating: 4.9,
    reviews: 234,
    tags: ["Apple", "M3", "Nouveau"],
    featured: true,
    status: "available" as const,
    author: { name: "TechStore", verified: true },
    createdAt: "2025-07-12"
  },
  property: {
    id: "3",
    title: "Appartement moderne 3 pièces",
    description: "Magnifique appartement rénové avec vue panoramique sur le parc.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
    propertyType: "apartment" as const,
    surface: 85,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    floor: 4,
    price: { amount: 1500, currency: "€", period: "month" as const },
    location: { city: "Lyon", country: "France" },
    amenities: ["Balcon", "Parking", "Ascenseur", "Cave"],
    category: "Location",
    rating: 4.5,
    reviews: 45,
    tags: ["Moderne", "Lumineux", "Vue parc"],
    status: "available" as const,
    author: { name: "Immobilier Pro", verified: true },
    createdAt: "2025-07-10"
  },
  profile: {
    id: "4",
    title: "Jean Dupont",
    description: "Développeur Full-Stack passionné par les technologies modernes et l'innovation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    profession: "Développeur Full-Stack",
    company: "TechCorp",
    experience: "5 ans",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    availability: "available" as const,
    price: { amount: 500, currency: "€", period: "day" as const },
    location: { city: "Marseille", country: "France" },
    category: "Développement",
    rating: 4.7,
    reviews: 89,
    tags: ["React", "Expert", "Full-Stack"],
    status: "available" as const,
    author: { name: "Jean Dupont", verified: true },
    createdAt: "2025-07-05"
  },
  course: {
    id: "5",
    title: "Maîtriser React & TypeScript",
    description: "Formation complète pour devenir expert en React et TypeScript avec projets réels.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
    instructor: { name: "Marie Dubois", avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5e8?w=100&q=80", rating: 4.9 },
    duration: "40 heures",
    level: "intermediate" as const,
    language: "Français",
    chapters: 12,
    enrolled: 2847,
    maxStudents: 5000,
    price: { amount: 299, currency: "€", period: "once" as const, original: 399, discount: 25 },
    category: "Développement Web",
    rating: 4.8,
    reviews: 892,
    tags: ["React", "TypeScript", "Frontend"],
    featured: true,
    status: "active" as const,
    author: { name: "CodeAcademy Pro", verified: true },
    createdAt: "2025-07-08"
  },
  media: {
    id: "6",
    title: "Guide du Développeur React",
    description: "Tutoriel complet pour apprendre React de zéro à expert avec exemples pratiques.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
    type: "video" as const,
    duration: "2h45",
    views: 125000,
    likes: 8900,
    author: { name: "DevTutorials", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80", verified: true },
    publishedAt: "2025-07-10",
    category: "Éducation",
    rating: 4.7,
    reviews: 456,
    tags: ["React", "Tutorial", "Débutant"],
    featured: false,
    status: "published" as const,
    createdAt: "2025-07-10"
  },
  restaurant: {
    id: "7",
    title: "Le Petit Bistrot",
    description: "Bistrot traditionnel français au cœur de Montmartre avec cuisine authentique.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
    cuisine: "Française Traditionnelle",
    priceRange: "$$" as const,
    deliveryAvailable: true,
    deliveryTime: "30-45 min",
    features: ["Terrasse", "Wi-Fi", "Animaux acceptés"],
    chefSpecial: "Coq au vin de la grand-mère",
    location: { address: "18 Rue des Abbesses", city: "Paris 18ème", country: "France" },
    price: { amount: 35, currency: "€", period: "once" as const },
    category: "Restaurant",
    rating: 4.6,
    reviews: 324,
    tags: ["Bistrot", "Traditionnel", "Terrasse"],
    status: "active" as const,
    author: { name: "Le Petit Bistrot", verified: true },
    createdAt: "2025-07-03"
  },
  travel: {
    id: "8",
    title: "Week-end à Rome",
    description: "Séjour découverte de 3 jours dans la Ville Éternelle avec guide francophone.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80",
    destination: "Rome, Italie",
    duration: "3 jours / 2 nuits",
    departureCity: "Paris",
    departureDate: "2025-09-15",
    returnDate: "2025-09-17",
    travelers: { min: 2, max: 8 },
    includes: ["Hôtel 4*", "Petit-déjeuner", "Guide", "Transferts"],
    price: { amount: 450, currency: "€", period: "person" as const, original: 520, discount: 13 },
    category: "Voyage",
    rating: 4.8,
    reviews: 156,
    tags: ["Rome", "Culture", "Week-end"],
    featured: true,
    status: "available" as const,
    author: { name: "VoyagesPro", verified: true },
    createdAt: "2025-07-12"
  },
  tech: {
    id: "9",
    title: "API GraphQL Node.js",
    description: "Bibliothèque complète pour créer des API GraphQL performantes avec Node.js.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    type: "library" as const,
    language: "JavaScript",
    framework: "Node.js",
    version: "v2.4.1",
    downloads: 45000,
    stars: 8900,
    forks: 1200,
    license: "MIT",
    repository: "github.com/example/graphql-api",
    documentation: "docs.example.com/graphql-api",
    category: "Développement",
    rating: 4.9,
    reviews: 234,
    tags: ["GraphQL", "Node.js", "API"],
    featured: true,
    status: "active" as const,
    author: { name: "TechLibs", verified: true },
    createdAt: "2025-07-01"
  },
  health: {
    id: "10",
    title: "Consultation Cardiologie",
    description: "Consultation spécialisée en cardiologie avec Dr. Martin, expert reconnu.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80",
    specialty: "Cardiologie",
    practitioner: { name: "Dr. Pierre Martin", title: "Cardiologue", experience: "15 ans" },
    clinic: "Cabinet Médical du Centre",
    duration: "30 minutes",
    nextAvailability: "2025-07-20T14:30:00Z",
    location: { address: "15 Avenue de la République", city: "Lyon", country: "France" },
    price: { amount: 80, currency: "€", period: "once" as const },
    category: "Santé",
    rating: 4.9,
    reviews: 167,
    tags: ["Cardiologie", "Expert", "Consultation"],
    status: "available" as const,
    author: { name: "Cabinet Médical du Centre", verified: true },
    createdAt: "2025-07-05"
  },
  finance: {
    id: "11",
    title: "Crédit Immobilier 2.5%",
    description: "Offre de crédit immobilier à taux préférentiel pour primo-accédants.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    productType: "Crédit Immobilier",
    interestRate: 2.5,
    duration: "20 ans",
    maxAmount: 500000,
    minAmount: 50000,
    conditions: ["Primo-accédant", "Apport 10%", "CDI"],
    institution: "Banque Populaire",
    advisor: { name: "Sophie Leroy", phone: "+33 1 23 45 67 89" },
    price: { amount: 2.5, currency: "%", period: "year" as const },
    category: "Finance",
    rating: 4.4,
    reviews: 89,
    tags: ["Crédit", "Immobilier", "Taux fixe"],
    status: "available" as const,
    author: { name: "Banque Populaire", verified: true },
    createdAt: "2025-07-08"
  },
  news: {
    id: "12",
    title: "IA : Révolution dans la médecine",
    description: "L'intelligence artificielle transforme le diagnostic médical avec une précision inégalée.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80",
    source: "Tech Today",
    author: { name: "Marie Lefevre", avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5e8?w=100&q=80" },
    publishedAt: "2025-07-14T10:30:00Z",
    readTime: "5 min",
    views: 12500,
    category: "Technologie",
    tags: ["IA", "Médecine", "Innovation"],
    featured: true,
    status: "published" as const,
    createdAt: "2025-07-14"
  },
  social: {
    id: "13",
    title: "Concert Rock au Zénith",
    description: "Soirée rock inoubliable avec The Lightning Band et invités spéciaux.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    eventType: "Concert",
    participants: 2500,
    maxParticipants: 3000,
    host: { name: "Music Events", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
    date: "2025-08-25T20:00:00Z",
    venue: "Zénith de Paris",
    hashtags: ["#RockNight", "#Lightning", "#ZenithParis"],
    price: { amount: 45, currency: "€", period: "once" as const },
    category: "Événement",
    rating: 4.7,
    reviews: 89,
    tags: ["Concert", "Rock", "Zénith"],
    featured: false,
    status: "active" as const,
    author: { name: "Music Events", verified: true },
    createdAt: "2025-07-11"
  }
};

type ContextType = keyof typeof sampleData;
type VariantType = "default" | "compact" | "minimal" | "list";
type SizeType = "sm" | "md" | "lg";

// Configuration des contextes avec icônes et descriptions
const CONTEXT_CONFIG = {
  event: { icon: "🎪", label: "Événement", description: "Conférences, concerts, formations" },
  product: { icon: "📦", label: "Produit", description: "E-commerce, articles, biens" },
  property: { icon: "🏠", label: "Propriété", description: "Immobilier, locations, ventes" },
  profile: { icon: "👤", label: "Profil", description: "Utilisateurs, freelances, experts" },
  course: { icon: "📚", label: "Formation", description: "Cours en ligne, certifications" },
  media: { icon: "🎬", label: "Média", description: "Vidéos, articles, contenus" },
  restaurant: { icon: "🍽️", label: "Restaurant", description: "Restaurants, livraisons, menus" },
  travel: { icon: "✈️", label: "Voyage", description: "Séjours, circuits, destinations" },
  tech: { icon: "⚙️", label: "Tech", description: "Outils, APIs, bibliothèques" },
  health: { icon: "🏥", label: "Santé", description: "Consultations, praticiens, soins" },
  finance: { icon: "💰", label: "Finance", description: "Prêts, investissements, assurances" },
  news: { icon: "📰", label: "Actualités", description: "Articles, nouvelles, informations" },
  social: { icon: "👥", label: "Social", description: "Événements sociaux, communautés" }
} as const;

interface ThemeConfigPanelProps {
  currentTheme: UniversalCardThemeName;
  onThemeChange: (theme: UniversalCardThemeName) => void;
  currentContext: ContextType;
  onContextChange: (context: ContextType) => void;
  currentVariant: VariantType;
  onVariantChange: (variant: VariantType) => void;
  currentSize: SizeType;
  onSizeChange: (size: SizeType) => void;
}

function ThemeConfigPanel({
  currentTheme,
  onThemeChange,
  currentContext,
  onContextChange,
  currentVariant,
  onVariantChange,
  currentSize,
  onSizeChange,
}: ThemeConfigPanelProps) {
  const themeNames = getUniversalCardThemeNames();
  
  const themeDescriptions = {
    default: "Style élégant et neutre",
    glassmorphism: "Effet de verre moderne",
    dark: "Interface sombre élégante",
    neon: "Style cyberpunk néon",
    retro: "Nostalgie vintage années 80"
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Configuration du Thème
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sélection du thème */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Thème</label>
          <Select value={currentTheme} onValueChange={onThemeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themeNames.map((theme) => (
                <SelectItem key={theme} value={theme}>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      theme === 'default' ? 'bg-blue-500' :
                      theme === 'glassmorphism' ? 'bg-cyan-400' :
                      theme === 'dark' ? 'bg-gray-800' :
                      theme === 'neon' ? 'bg-pink-500' :
                      'bg-orange-500'
                    }`} />
                    <span className="capitalize">{theme}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-600">
            {themeDescriptions[currentTheme]}
          </p>
        </div>

        {/* Sélection du contexte */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Contexte</label>
          <Select value={currentContext} onValueChange={onContextChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CONTEXT_CONFIG).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <span>{config.icon}</span>
                    <span>{config.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-600">
            {CONTEXT_CONFIG[currentContext]?.description}
          </p>
        </div>

        {/* Sélection de la variante */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Variante</label>
          <Select value={currentVariant} onValueChange={onVariantChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="list">Liste</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sélection de la taille */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Taille</label>
          <Select value={currentSize} onValueChange={onSizeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Petite</SelectItem>
              <SelectItem value="md">Moyenne</SelectItem>
              <SelectItem value="lg">Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button variant="outline" size="sm" className="flex-1">
            <Code className="w-4 h-4 mr-2" />
            Code
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface PreviewAreaProps {
  theme: UniversalCardThemeName;
  context: ContextType;
  variant: VariantType;
  size: SizeType;
}

function PreviewArea({ theme, context, variant, size }: PreviewAreaProps) {
  const data = sampleData[context];
  
  const handleCardClick = () => {
    console.log('Card clicked');
  };

  const handleAction = (action: string) => {
    console.log(`Action: ${action}`);
  };

  // Labels d'actions dynamiques selon le contexte
  const getActionLabels = (context: ContextType) => {
    const labels = {
      event: { primary: "S'inscrire", secondary: "Détails" },
      product: { primary: "Acheter", secondary: "Voir détails" },
      property: { primary: "Visiter", secondary: "Contacter" },
      profile: { primary: "Contacter", secondary: "Voir profil" },
      course: { primary: "S'inscrire", secondary: "Aperçu" },
      media: { primary: "Regarder", secondary: "Partager" },
      restaurant: { primary: "Commander", secondary: "Réserver" },
      travel: { primary: "Réserver", secondary: "Découvrir" },
      tech: { primary: "Télécharger", secondary: "Documentation" },
      health: { primary: "Prendre RDV", secondary: "Contacter" },
      finance: { primary: "Simuler", secondary: "Contacter" },
      news: { primary: "Lire", secondary: "Partager" },
      social: { primary: "Participer", secondary: "Partager" }
    };
    return labels[context] || { primary: "Action", secondary: "Détails" };
  };

  const actionLabels = getActionLabels(context);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Aperçu en temps réel</h3>
          <p className="text-sm text-gray-600">
            {theme} • {CONTEXT_CONFIG[context]?.label} • {variant} • {size}
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Eye className="w-3 h-3" />
          Aperçu live
        </Badge>
      </div>

      <div className="border rounded-lg p-6 bg-gray-50">
        <div className={variant === 'list' ? 'max-w-2xl' : 'max-w-md'}>
          <ThemedUniversalCard
            item={data as any}
            context={context as any}
            variant={variant}
            size={size}
            themeName={theme}
            onClick={handleCardClick}
            actions={{
              primary: {
                label: actionLabels.primary,
                onClick: () => handleAction('primary')
              },
              secondary: {
                label: actionLabels.secondary,
                onClick: () => handleAction('secondary'),
                variant: "outline"
              },
              bookmark: () => handleAction('bookmark'),
              share: () => handleAction('share')
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function UniversalCardThemeStudio() {
  const [currentTheme, setCurrentTheme] = useState<UniversalCardThemeName>('default');
  const [currentContext, setCurrentContext] = useState<ContextType>('product');
  const [currentVariant, setCurrentVariant] = useState<VariantType>('default');
  const [currentSize, setCurrentSize] = useState<SizeType>('md');

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Palette className="w-8 h-8 text-purple-600" />
          Universal Card Theme Studio
        </h1>
        <p className="text-gray-600 text-lg">
          Studio interactif pour personnaliser et prévisualiser les thèmes des Universal Cards en temps réel.
          <br />
          <span className="text-sm font-medium text-purple-600">
            ✨ Maintenant avec {Object.keys(CONTEXT_CONFIG).length} contextes complets !
          </span>
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Panel de configuration */}
        <div className="lg:col-span-1">
          <ThemeConfigPanel
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
            currentContext={currentContext}
            onContextChange={setCurrentContext}
            currentVariant={currentVariant}
            onVariantChange={setCurrentVariant}
            currentSize={currentSize}
            onSizeChange={setCurrentSize}
          />
        </div>

        {/* Zone de prévisualisation */}
        <div className="lg:col-span-2">
          <PreviewArea
            theme={currentTheme}
            context={currentContext}
            variant={currentVariant}
            size={currentSize}
          />
        </div>
      </div>

      {/* Explorateur de contextes */}
      <section className="mt-16 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Explorateur de Contextes</h2>
          <p className="text-gray-600">
            Découvrez tous les {Object.keys(CONTEXT_CONFIG).length} contextes disponibles avec le thème <strong>{currentTheme}</strong>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {Object.entries(CONTEXT_CONFIG).map(([contextKey, config]) => (
            <div key={contextKey} className="space-y-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">{config.icon}</span>
                  <h3 className="font-medium">{config.label}</h3>
                </div>
                <p className="text-xs text-gray-600 mb-3">{config.description}</p>
                <Button
                  variant={currentContext === contextKey ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentContext(contextKey as ContextType)}
                  className="text-xs"
                >
                  {currentContext === contextKey ? 'Actuel' : 'Tester'}
                </Button>
              </div>
              
              <div className="border rounded-lg p-3 bg-gray-50">
                <ThemedUniversalCard
                  item={sampleData[contextKey as ContextType] as any}
                  context={contextKey as any}
                  variant="compact"
                  size="sm"
                  themeName={currentTheme}
                  showActions={false}
                  onClick={() => setCurrentContext(contextKey as ContextType)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Galerie de thèmes */}
      <section className="mt-16 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Galerie des Thèmes</h2>
          <p className="text-gray-600">
            Aperçu rapide de tous les thèmes avec le contexte <strong>{CONTEXT_CONFIG[currentContext]?.label}</strong>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {getUniversalCardThemeNames().map((themeName) => (
            <div key={themeName} className="space-y-3">
              <div className="text-center">
                <h3 className="font-medium capitalize mb-1">{themeName}</h3>
                <Button
                  variant={currentTheme === themeName ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentTheme(themeName)}
                  className="text-xs"
                >
                  {currentTheme === themeName ? 'Actuel' : 'Appliquer'}
                </Button>
              </div>
              
              <div className="border rounded-lg p-3 bg-gray-50">
                <ThemedUniversalCard
                  item={sampleData[currentContext] as any}
                  context={currentContext as any}
                  variant="compact"
                  size="sm"
                  themeName={themeName}
                  showActions={false}
                  onClick={() => setCurrentTheme(themeName)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guide d'intégration */}
      <section className="mt-16 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Guide d'intégration</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Code d'exemple</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`import { ThemedUniversalCard } from './components';

<ThemedUniversalCard
  item={${currentContext}Data}
  context="${currentContext}"
  themeName="${currentTheme}"
  variant="${currentVariant}"
  size="${currentSize}"
  actions={{
    primary: { label: "Action", onClick: handleAction },
    bookmark: handleBookmark,
    share: handleShare
  }}
/>`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Configuration actuelle</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Thème:</span>
                <Badge variant="outline" className="capitalize">{currentTheme}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Contexte:</span>
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>{CONTEXT_CONFIG[currentContext]?.icon}</span>
                  {CONTEXT_CONFIG[currentContext]?.label}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Variante:</span>
                <Badge variant="outline">{currentVariant}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Taille:</span>
                <Badge variant="outline">{currentSize}</Badge>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">💡 Astuce</h4>
              <p className="text-sm text-blue-800">
                Tous les {Object.keys(CONTEXT_CONFIG).length} contextes supportent les 5 thèmes et 4 variantes. 
                Explorez les combinaisons pour trouver le style parfait !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Matrice comparative */}
      <section className="mt-16 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Matrice Complète</h2>
          <p className="text-gray-600">
            Aperçu de tous les contextes avec tous les thèmes pour une comparaison rapide
          </p>
        </div>

        <div className="grid gap-8">
          {getUniversalCardThemeNames().map((themeName) => (
            <div key={themeName} className="bg-white rounded-xl p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold capitalize flex items-center gap-3">
                  Thème {themeName}
                  <Badge variant="outline" className="capitalize">{themeName}</Badge>
                </h3>
                <Button
                  variant={currentTheme === themeName ? "default" : "outline"}
                  onClick={() => setCurrentTheme(themeName)}
                  size="sm"
                >
                  {currentTheme === themeName ? 'Thème actuel' : 'Définir comme thème'}
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(CONTEXT_CONFIG).map(([contextKey, config]) => (
                  <div key={`${themeName}-${contextKey}`} className="space-y-2">
                    <div className="text-center">
                      <span className="text-lg">{config.icon}</span>
                      <h4 className="text-xs font-medium">{config.label}</h4>
                    </div>
                    <div className="border rounded p-2 bg-gray-50">
                      <ThemedUniversalCard
                        item={sampleData[contextKey as ContextType] as any}
                        context={contextKey as any}
                        variant="compact"
                        size="sm"
                        themeName={themeName}
                        showActions={false}
                        onClick={() => {
                          setCurrentTheme(themeName);
                          setCurrentContext(contextKey as ContextType);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
