"use client";

import React from "react";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Button } from "@/shared/components/atoms/ui/button";
import { 
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  Download,
  Share,
  Eye,
  Heart,
  Bookmark,
  ArrowRight,
  ChevronRight,
  Star,
  Calendar,
  User,
  Tag,
  CheckCircle,
  TrendingUp,
  BarChart3,
  FileText,
  FileImage,
  FileVideo,
  Database,
  Globe,
  Layers,
  Zap,
  Target,
  Award,
  Clock,
  MapPin,
  Users,
  ThumbsUp,
  MessageSquare,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  Settings,
  Grid,
  List,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ComparisonItem {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "product" | "service" | "plan" | "feature" | "technology" | "solution";
  image?: string;
  logo?: string;
  rating?: number;
  reviews?: number;
  price?: {
    value: number;
    currency: string;
    period?: string;
    originalPrice?: number;
  };
  features: Array<{
    name: string;
    value: string | number | boolean;
    type: "text" | "number" | "boolean" | "rating" | "percentage" | "currency";
    icon?: string;
    highlight?: boolean;
  }>;
  pros?: string[];
  cons?: string[];
  tags: string[];
  badges?: Array<{
    label: string;
    type: "best" | "popular" | "recommended" | "new" | "featured";
    color?: string;
  }>;
  vendor?: {
    name: string;
    logo?: string;
    website?: string;
    verified?: boolean;
  };
  stats?: {
    users?: number;
    marketShare?: number;
    satisfaction?: number;
    uptime?: number;
  };
  availability?: {
    freeTrial?: boolean;
    freeVersion?: boolean;
    demo?: boolean;
    support?: string;
  };
  link?: string;
  featured?: boolean;
  trending?: boolean;
  bestValue?: boolean;
  mostPopular?: boolean;
}

interface ComparisonsSectionProps {
  variant?: "table" | "cards" | "grid" | "detailed" | "minimal" | "side-by-side";
  title?: string;
  description?: string;
  items?: ComparisonItem[];
  showSearch?: boolean;
  showFilters?: boolean;
  showStats?: boolean;
  maxVisible?: number;
  enableExport?: boolean;
  enableShare?: boolean;
  enableBookmark?: boolean;
  compareLimit?: number;
  className?: string;
  theme?: "light" | "dark";
  onItemClick?: (item: ComparisonItem) => void;
  onCompare?: (items: ComparisonItem[]) => void;
  onViewDetails?: (item: ComparisonItem) => void;
  onBookmark?: (item: ComparisonItem) => void;
  onShare?: (item: ComparisonItem) => void;
  onExport?: () => void;
}

const defaultItems: ComparisonItem[] = [
  {
    id: "1",
    name: "React.js",
    description: "Bibliothèque JavaScript pour construire des interfaces utilisateur interactives et dynamiques.",
    category: "Framework Frontend",
    type: "technology",
    image: "/logos/react.png",
    rating: 4.8,
    reviews: 15420,
    features: [
      { name: "Courbe d'apprentissage", value: "Moyenne", type: "text", icon: "📚" },
      { name: "Performance", value: 95, type: "percentage", highlight: true },
      { name: "Communauté", value: 9.5, type: "rating", icon: "👥" },
      { name: "Écosystème", value: "Excellent", type: "text" },
      { name: "Support mobile", value: true, type: "boolean" },
      { name: "TypeScript", value: true, type: "boolean", highlight: true },
      { name: "SSR/SSG", value: true, type: "boolean" }
    ],
    pros: [
      "Composants réutilisables",
      "Virtual DOM performant",
      "Écosystème riche",
      "Support officiel Meta",
      "Excellente documentation"
    ],
    cons: [
      "Courbe d'apprentissage initiale",
      "Évolution rapide",
      "Nécessite des outils supplémentaires"
    ],
    tags: ["javascript", "frontend", "spa", "composants"],
    badges: [
      { label: "Most Popular", type: "popular" },
      { label: "Best Ecosystem", type: "best" }
    ],
    vendor: {
      name: "Meta (Facebook)",
      logo: "/logos/meta.png",
      website: "https://reactjs.org",
      verified: true
    },
    stats: {
      users: 20000000,
      marketShare: 35,
      satisfaction: 95,
      uptime: 99.9
    },
    availability: {
      freeTrial: false,
      freeVersion: true,
      demo: true,
      support: "Community + Enterprise"
    },
    link: "https://reactjs.org",
    featured: true,
    mostPopular: true
  },
  {
    id: "2",
    name: "Vue.js",
    description: "Framework JavaScript progressif pour construire des interfaces utilisateur modernes et réactives.",
    category: "Framework Frontend",
    type: "technology",
    image: "/logos/vue.png",
    rating: 4.7,
    reviews: 8930,
    features: [
      { name: "Courbe d'apprentissage", value: "Facile", type: "text", icon: "📚", highlight: true },
      { name: "Performance", value: 92, type: "percentage" },
      { name: "Communauté", value: 8.5, type: "rating", icon: "👥" },
      { name: "Écosystème", value: "Bon", type: "text" },
      { name: "Support mobile", value: true, type: "boolean" },
      { name: "TypeScript", value: true, type: "boolean" },
      { name: "SSR/SSG", value: true, type: "boolean" }
    ],
    pros: [
      "Très facile à apprendre",
      "Documentation excellente",
      "Flexibilité architecturale",
      "Performance optimale",
      "Écosystème cohérent"
    ],
    cons: [
      "Communauté plus petite",
      "Moins d'emplois",
      "Écosystème moins mature"
    ],
    tags: ["javascript", "frontend", "progressive", "simple"],
    badges: [
      { label: "Easiest to Learn", type: "best" },
      { label: "Developer Friendly", type: "recommended" }
    ],
    vendor: {
      name: "Evan You",
      website: "https://vuejs.org",
      verified: true
    },
    stats: {
      users: 4200000,
      marketShare: 18,
      satisfaction: 92,
      uptime: 99.8
    },
    availability: {
      freeTrial: false,
      freeVersion: true,
      demo: true,
      support: "Community"
    },
    link: "https://vuejs.org",
    bestValue: true
  },
  {
    id: "3",
    name: "Angular",
    description: "Plateforme et framework complet pour développer des applications web d'entreprise robustes.",
    category: "Framework Frontend",
    type: "technology",
    image: "/logos/angular.png",
    rating: 4.5,
    reviews: 6780,
    features: [
      { name: "Courbe d'apprentissage", value: "Difficile", type: "text", icon: "📚" },
      { name: "Performance", value: 88, type: "percentage" },
      { name: "Communauté", value: 8.0, type: "rating", icon: "👥" },
      { name: "Écosystème", value: "Complet", type: "text", highlight: true },
      { name: "Support mobile", value: true, type: "boolean" },
      { name: "TypeScript", value: true, type: "boolean", highlight: true },
      { name: "SSR/SSG", value: true, type: "boolean" }
    ],
    pros: [
      "Framework complet",
      "TypeScript natif",
      "Architecture structurée",
      "Parfait pour l'entreprise",
      "CLI puissant"
    ],
    cons: [
      "Courbe d'apprentissage élevée",
      "Verbeux",
      "Bundle size important",
      "Fréquentes mises à jour"
    ],
    tags: ["typescript", "frontend", "enterprise", "mvc"],
    badges: [
      { label: "Enterprise Ready", type: "best" },
      { label: "Full Framework", type: "featured" }
    ],
    vendor: {
      name: "Google",
      logo: "/logos/google.png",
      website: "https://angular.io",
      verified: true
    },
    stats: {
      users: 3800000,
      marketShare: 22,
      satisfaction: 85,
      uptime: 99.9
    },
    availability: {
      freeTrial: false,
      freeVersion: true,
      demo: true,
      support: "Community + Enterprise"
    },
    link: "https://angular.io",
    featured: true
  },
  {
    id: "4",
    name: "Svelte",
    description: "Compilateur qui génère du JavaScript vanille optimisé pour des performances exceptionnelles.",
    category: "Framework Frontend",
    type: "technology",
    image: "/logos/svelte.png",
    rating: 4.9,
    reviews: 3240,
    features: [
      { name: "Courbe d'apprentissage", value: "Facile", type: "text", icon: "📚" },
      { name: "Performance", value: 98, type: "percentage", highlight: true },
      { name: "Communauté", value: 7.5, type: "rating", icon: "👥" },
      { name: "Écosystème", value: "Émergent", type: "text" },
      { name: "Support mobile", value: false, type: "boolean" },
      { name: "TypeScript", value: true, type: "boolean" },
      { name: "SSR/SSG", value: true, type: "boolean" }
    ],
    pros: [
      "Performance exceptionnelle",
      "Bundle size minimal",
      "Syntaxe intuitive",
      "Pas de Virtual DOM",
      "Compilation optimisée"
    ],
    cons: [
      "Écosystème jeune",
      "Communauté petite",
      "Moins de ressources",
      "Support mobile limité"
    ],
    tags: ["javascript", "compiler", "performance", "minimal"],
    badges: [
      { label: "Best Performance", type: "best" },
      { label: "Lightweight", type: "new" }
    ],
    vendor: {
      name: "Rich Harris",
      website: "https://svelte.dev",
      verified: true
    },
    stats: {
      users: 850000,
      marketShare: 5,
      satisfaction: 98,
      uptime: 99.7
    },
    availability: {
      freeTrial: false,
      freeVersion: true,
      demo: true,
      support: "Community"
    },
    link: "https://svelte.dev",
    trending: true
  },
  {
    id: "5",
    name: "Next.js",
    description: "Framework React avec rendu côté serveur et génération statique pour des applications production-ready.",
    category: "Full-Stack Framework",
    type: "technology",
    image: "/logos/nextjs.png",
    rating: 4.8,
    reviews: 9850,
    features: [
      { name: "Courbe d'apprentissage", value: "Moyenne", type: "text", icon: "📚" },
      { name: "Performance", value: 96, type: "percentage", highlight: true },
      { name: "Communauté", value: 9.0, type: "rating", icon: "👥" },
      { name: "Écosystème", value: "Excellent", type: "text" },
      { name: "Support mobile", value: true, type: "boolean" },
      { name: "TypeScript", value: true, type: "boolean" },
      { name: "SSR/SSG", value: true, type: "boolean", highlight: true }
    ],
    pros: [
      "SSR/SSG intégré",
      "Performance optimale",
      "Écosystème React",
      "Déploiement simplifié",
      "API routes"
    ],
    cons: [
      "Dépendant de React",
      "Configuration complexe",
      "Vendor lock-in Vercel"
    ],
    tags: ["react", "ssr", "ssg", "fullstack"],
    badges: [
      { label: "Production Ready", type: "best" },
      { label: "Popular", type: "popular" }
    ],
    vendor: {
      name: "Vercel",
      logo: "/logos/vercel.png",
      website: "https://nextjs.org",
      verified: true
    },
    stats: {
      users: 5600000,
      marketShare: 28,
      satisfaction: 94,
      uptime: 99.9
    },
    availability: {
      freeTrial: true,
      freeVersion: true,
      demo: true,
      support: "Community + Pro"
    },
    link: "https://nextjs.org",
    featured: true
  },
  {
    id: "6",
    name: "Nuxt.js",
    description: "Framework Vue.js intuitif pour créer des applications web universelles performantes et SEO-friendly.",
    category: "Full-Stack Framework",
    type: "technology",
    image: "/logos/nuxt.png",
    rating: 4.6,
    reviews: 4320,
    features: [
      { name: "Courbe d'apprentissage", value: "Facile", type: "text", icon: "📚" },
      { name: "Performance", value: 93, type: "percentage" },
      { name: "Communauté", value: 8.2, type: "rating", icon: "👥" },
      { name: "Écosystème", value: "Bon", type: "text" },
      { name: "Support mobile", value: true, type: "boolean" },
      { name: "TypeScript", value: true, type: "boolean" },
      { name: "SSR/SSG", value: true, type: "boolean" }
    ],
    pros: [
      "Configuration zéro",
      "Modules riches",
      "Performance excellente",
      "SEO optimisé",
      "Developer experience"
    ],
    cons: [
      "Dépendant de Vue.js",
      "Communauté plus petite",
      "Modules parfois obsolètes"
    ],
    tags: ["vue", "ssr", "ssg", "universal"],
    badges: [
      { label: "Zero Config", type: "best" },
      { label: "SEO Friendly", type: "recommended" }
    ],
    vendor: {
      name: "NuxtLabs",
      website: "https://nuxtjs.org",
      verified: true
    },
    stats: {
      users: 1200000,
      marketShare: 8,
      satisfaction: 91,
      uptime: 99.8
    },
    availability: {
      freeTrial: true,
      freeVersion: true,
      demo: true,
      support: "Community + Enterprise"
    },
    link: "https://nuxtjs.org"
  }
];

function getBadgeColor(type: string) {
  const colorMap = {
    "best": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "popular": "bg-blue-100 text-blue-800 border-blue-300",
    "recommended": "bg-green-100 text-green-800 border-green-300",
    "new": "bg-purple-100 text-purple-800 border-purple-300",
    "featured": "bg-orange-100 text-orange-800 border-orange-300"
  };
  return colorMap[type as keyof typeof colorMap] || "bg-gray-100 text-gray-800 border-gray-300";
}

function renderFeatureValue(feature: ComparisonItem['features'][0]) {
  switch (feature.type) {
    case "boolean":
      return feature.value ? (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ) : (
        <span className="text-gray-400">—</span>
      );
    case "rating":
      return (
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>{feature.value}/10</span>
        </div>
      );
    case "percentage":
      return (
        <div className="flex items-center space-x-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full" 
              style={{ width: `${feature.value}%` }}
            />
          </div>
          <span className="text-sm font-medium">{feature.value}%</span>
        </div>
      );
    case "currency":
      return <span className="font-medium">{feature.value}€</span>;
    default:
      return <span>{feature.value}</span>;
  }
}

function ComparisonCard({ 
  item, 
  variant = "cards",
  theme = "light",
  isSelected = false,
  onItemClick,
  onViewDetails,
  onBookmark,
  onShare,
  onSelect,
  enableBookmark = false,
  enableShare = false
}: { 
  item: ComparisonItem;
  variant?: ComparisonsSectionProps['variant'];
  theme?: "light" | "dark";
  isSelected?: boolean;
  onItemClick?: (item: ComparisonItem) => void;
  onViewDetails?: (item: ComparisonItem) => void;
  onBookmark?: (item: ComparisonItem) => void;
  onShare?: (item: ComparisonItem) => void;
  onSelect?: (item: ComparisonItem, selected: boolean) => void;
  enableBookmark?: boolean;
  enableShare?: boolean;
}) {

  if (variant === "minimal") {
    return (
      <div className={cn(
        "flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
        isSelected && "ring-2 ring-blue-500 bg-blue-50",
        item.featured && "border-blue-500"
      )} onClick={() => onItemClick?.(item)}>
        
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect?.(item, e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          
          {item.image && (
            <img src={item.image} alt={item.name} className="w-8 h-8 object-contain" />
          )}
          
          <div>
            <h4 className="font-semibold">{item.name}</h4>
            <p className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              {item.vendor?.name}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {item.rating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">{item.rating}</span>
            </div>
          )}
          
          {item.price && (
            <div className="text-right">
              <div className="font-bold text-blue-600">
                {item.price.value}€
                {item.price.period && (
                  <span className="text-sm text-gray-500">/{item.price.period}</span>
                )}
              </div>
            </div>
          )}
          
          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onViewDetails?.(item); }}>
            Voir détails
          </Button>
        </div>
      </div>
    );
  }

  // Default cards variant
  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg cursor-pointer group relative",
      theme === "dark" && "bg-gray-800 border-gray-700",
      item.featured && "ring-2 ring-blue-500 ring-opacity-50",
      isSelected && "ring-2 ring-blue-600 bg-blue-50"
    )} onClick={() => onItemClick?.(item)}>
      
      {/* Selection Checkbox */}
      <div className="absolute top-4 left-4 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect?.(item, e.target.checked)}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />
      </div>

      {/* Header */}
      <CardHeader>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 ml-8">
            {/* Badges */}
            <div className="flex items-center space-x-1 mb-3 flex-wrap gap-1">
              {item.badges?.slice(0, 2).map((badge, index) => (
                <Badge key={index} className={cn("text-xs", getBadgeColor(badge.type))}>
                  {badge.label}
                </Badge>
              ))}
              {item.mostPopular && (
                <Badge className="bg-blue-600 text-white text-xs">
                  Most Popular
                </Badge>
              )}
              {item.bestValue && (
                <Badge className="bg-green-600 text-white text-xs">
                  Best Value
                </Badge>
              )}
            </div>
            
            {/* Logo & Name */}
            <div className="flex items-center space-x-3 mb-3">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
              )}
              <div>
                <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                {item.vendor && (
                  <p className={cn(
                    "text-sm flex items-center",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}>
                    {item.vendor.name}
                    {item.vendor.verified && (
                      <CheckCircle className="w-4 h-4 ml-1 text-blue-600" />
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {enableBookmark && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => { e.stopPropagation(); onBookmark?.(item); }}
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            )}
            {enableShare && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => { e.stopPropagation(); onShare?.(item); }}
              >
                <Share className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        <p className={cn(
          "text-sm leading-relaxed mb-4 line-clamp-2",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          {item.description}
        </p>

        {/* Rating & Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {item.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{item.rating}</span>
                <span className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  ({item.reviews})
                </span>
              </div>
            )}
          </div>
          
          {item.price && (
            <div className="text-right">
              {item.price.originalPrice && (
                <div className="text-sm text-gray-400 line-through">
                  {item.price.originalPrice}€
                </div>
              )}
              <div className="text-xl font-bold text-blue-600">
                {item.price.value}€
                {item.price.period && (
                  <span className="text-sm text-gray-500">/{item.price.period}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {/* Key Features */}
        <div className="space-y-3 mb-6">
          {item.features.slice(0, 5).map((feature, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {feature.icon && <span className="text-sm">{feature.icon}</span>}
                <span className="text-sm font-medium">{feature.name}</span>
                {feature.highlight && (
                  <Badge variant="secondary" className="text-xs">✨</Badge>
                )}
              </div>
              <div className="flex items-center">
                {renderFeatureValue(feature)}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        {item.stats && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {item.stats.users && (
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {(item.stats.users / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-gray-500">Utilisateurs</div>
              </div>
            )}
            {item.stats.satisfaction && (
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {item.stats.satisfaction}%
                </div>
                <div className="text-xs text-gray-500">Satisfaction</div>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex items-center space-x-1 mb-6 flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => { e.stopPropagation(); onViewDetails?.(item); }}
          >
            <Eye className="w-4 h-4 mr-1" />
            Détails
          </Button>
          
          <Button
            size="sm"
            className="flex-1"
            onClick={(e) => { e.stopPropagation(); window.open(item.link); }}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Visiter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ComparisonsSection({
  variant = "cards",
  title = "Comparaisons",
  description = "Comparez les meilleures solutions et faites le bon choix pour votre projet.",
  items = defaultItems,
  showSearch = true,
  showFilters = true,
  showStats = true,
  maxVisible,
  enableExport = false,
  enableShare = false,
  enableBookmark = false,
  compareLimit = 4,
  className,
  theme = "light",
  onItemClick,
  onCompare,
  onViewDetails,
  onBookmark,
  onShare,
  onExport
}: ComparisonsSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("rating");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [showAll, setShowAll] = React.useState(false);

  // Filter and sort items
  const filteredItems = items
    .filter(item => {
      const matchesSearch = !searchTerm || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesType = selectedType === "all" || item.type === selectedType;
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      let aValue: number;
      let bValue: number;
      
      switch (sortBy) {
        case "rating":
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case "price":
          aValue = a.price?.value || 0;
          bValue = b.price?.value || 0;
          break;
        case "popularity":
          aValue = a.stats?.users || 0;
          bValue = b.stats?.users || 0;
          break;
        default:
          return 0;
      }
      
      return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    });

  const displayedItems = maxVisible && !showAll 
    ? filteredItems.slice(0, maxVisible)
    : filteredItems;

  const categories = Array.from(new Set(items.map(item => item.category)));
  const types = Array.from(new Set(items.map(item => item.type)));

  // Handle selection
  const handleItemSelect = (item: ComparisonItem, selected: boolean) => {
    if (selected && selectedItems.length >= compareLimit) {
      return; // Limit reached
    }
    
    setSelectedItems(prev => 
      selected 
        ? [...prev, item.id]
        : prev.filter(id => id !== item.id)
    );
  };

  const handleCompare = () => {
    const itemsToCompare = items.filter(item => selectedItems.includes(item.id));
    onCompare?.(itemsToCompare);
  };

  // Stats
  const totalItems = items.length;
  const avgRating = items.reduce((acc, item) => acc + (item.rating || 0), 0) / items.length;
  const freeItems = items.filter(item => item.availability?.freeVersion).length;
  const topRated = items.filter(item => (item.rating || 0) >= 4.5).length;

  if (variant === "table") {
    return (
      <section className={cn(
        "py-16",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
        className
      )}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className={cn(
              "text-lg max-w-3xl mx-auto leading-relaxed",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {description}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {showSearch && (
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-4 py-3 border rounded-lg",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Button
                onClick={handleCompare}
                disabled={selectedItems.length < 2}
                className="whitespace-nowrap"
              >
                Comparer ({selectedItems.length})
              </Button>
              {enableExport && (
                <Button variant="outline" onClick={onExport}>
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className={cn(
                  "border-b-2",
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                )}>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(displayedItems.slice(0, compareLimit).map(item => item.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Produit</th>
                  <th className="px-4 py-3 text-left font-semibold">Note</th>
                  <th className="px-4 py-3 text-left font-semibold">Prix</th>
                  <th className="px-4 py-3 text-left font-semibold">Utilisateurs</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedItems.map((item) => (
                  <tr key={item.id} className={cn(
                    "border-b transition-colors hover:bg-gray-50",
                    theme === "dark" && "hover:bg-gray-800",
                    selectedItems.includes(item.id) && "bg-blue-50"
                  )}>
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => handleItemSelect(item, e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-3">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-contain" />
                        )}
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.vendor?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {item.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{item.rating}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {item.price ? (
                        <span className="font-medium">
                          {item.price.value}€
                          {item.price.period && `/${item.price.period}`}
                        </span>
                      ) : (
                        <span className="text-green-600">Gratuit</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {item.stats?.users && (
                        <span>{(item.stats.users / 1000000).toFixed(1)}M</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => onViewDetails?.(item)}>
                          Détails
                        </Button>
                        <Button size="sm" onClick={() => window.open(item.link)}>
                          Visiter
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn(
      "py-16",
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className={cn(
            "text-lg max-w-3xl mx-auto leading-relaxed",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {description}
          </p>
        </div>

        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalItems}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Solutions
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{avgRating.toFixed(1)}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Note moyenne
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{freeItems}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Versions gratuites
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{topRated}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Top rated (4.5+)
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {showSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher une solution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-3 border rounded-lg",
                  theme === "dark" 
                    ? "bg-gray-800 border-gray-700 text-white" 
                    : "bg-white border-gray-300"
                )}
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            {showFilters && (
              <>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={cn(
                    "px-3 py-2 border rounded-lg text-sm",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                >
                  <option value="all">Toutes catégories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={cn(
                    "px-3 py-2 border rounded-lg text-sm",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                >
                  <option value="rating">Note</option>
                  <option value="price">Prix</option>
                  <option value="popularity">Popularité</option>
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
                >
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </>
            )}

            <Button
              onClick={handleCompare}
              disabled={selectedItems.length < 2}
              className="whitespace-nowrap"
            >
              Comparer ({selectedItems.length})
            </Button>

            {enableExport && (
              <Button variant="outline" onClick={onExport}>
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Comparison Limit Notice */}
        {selectedItems.length >= compareLimit && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-6">
            Limite de {compareLimit} éléments atteinte pour la comparaison.
          </div>
        )}

        {/* Items */}
        <div className={cn(
          variant === "minimal" 
            ? "space-y-4" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        )}>
          {displayedItems.map((item) => (
            <ComparisonCard
              key={item.id}
              item={item}
              variant={variant}
              theme={theme}
              isSelected={selectedItems.includes(item.id)}
              onItemClick={onItemClick}
              onViewDetails={onViewDetails}
              onBookmark={onBookmark}
              onShare={onShare}
              onSelect={handleItemSelect}
              enableBookmark={enableBookmark}
              enableShare={enableShare}
            />
          ))}
        </div>

        {/* Load More */}
        {maxVisible && filteredItems.length > maxVisible && !showAll && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              onClick={() => setShowAll(true)}
              className="group"
            >
              Voir toutes les solutions ({filteredItems.length})
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export type { ComparisonsSectionProps, ComparisonItem };
