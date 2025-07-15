"use client";

import React from "react";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Button } from "@/shared/components/atoms/ui/button";
import { Input } from "@/shared/components/atoms/ui/input";
import { Textarea } from "@/shared/components/atoms/ui/textarea";
import { 
  BookOpen,
  Search,
  Filter,
  Download,
  Eye,
  Heart,
  Share,
  Clock,
  User,
  Tag,
  FileText,
  Video,
  Headphones,
  Image,
  ExternalLink,
  PlayCircle,
  Bookmark,
  Star,
  Calendar,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Award,
  CheckCircle
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface KnowledgeBaseItem {
  id: string;
  title: string;
  description: string;
  content?: string;
  type: "article" | "video" | "audio" | "guide" | "tutorial" | "faq" | "api" | "changelog";
  category: string;
  tags: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
  readingTime?: number;
  duration?: number; // in minutes
  views: number;
  likes: number;
  featured?: boolean;
  trending?: boolean;
  lastUpdated: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  rating?: number;
  downloads?: number;
  url?: string;
  thumbnail?: string;
  relatedItems?: string[];
}

interface KnowledgeBaseSectionProps {
  variant?: "grid" | "list" | "cards" | "search" | "featured" | "categories";
  title?: string;
  description?: string;
  items?: KnowledgeBaseItem[];
  showSearch?: boolean;
  showFilters?: boolean;
  showStats?: boolean;
  maxVisible?: number;
  enableDownload?: boolean;
  enableBookmark?: boolean;
  className?: string;
  theme?: "light" | "dark";
  onItemClick?: (item: KnowledgeBaseItem) => void;
  onDownload?: (item: KnowledgeBaseItem) => void;
  onBookmark?: (item: KnowledgeBaseItem) => void;
  onShare?: (item: KnowledgeBaseItem) => void;
}

const defaultItems: KnowledgeBaseItem[] = [
  {
    id: "1",
    title: "Guide de démarrage rapide",
    description: "Apprenez les bases de notre plateforme en moins de 10 minutes avec ce guide complet pour débutants.",
    content: "Contenu détaillé du guide...",
    type: "guide",
    category: "Getting Started",
    tags: ["débutant", "setup", "introduction"],
    difficulty: "beginner",
    readingTime: 8,
    views: 15420,
    likes: 892,
    featured: true,
    trending: true,
    lastUpdated: "2024-06-15",
    author: {
      name: "Sarah Martin",
      avatar: "/avatars/sarah.jpg",
      role: "Technical Writer"
    },
    rating: 4.8,
    thumbnail: "/images/guide-thumbnail.jpg"
  },
  {
    id: "2",
    title: "Configuration avancée de l'API",
    description: "Découvrez comment configurer et utiliser notre API REST pour des intégrations complexes et performantes.",
    type: "api",
    category: "API",
    tags: ["api", "rest", "intégration", "avancé"],
    difficulty: "advanced",
    readingTime: 25,
    views: 8340,
    likes: 567,
    lastUpdated: "2024-06-12",
    author: {
      name: "Alexandre Dubois",
      role: "Lead Developer"
    },
    rating: 4.6,
    downloads: 1250
  },
  {
    id: "3",
    title: "Tutoriel vidéo : Interface utilisateur",
    description: "Une démonstration complète de l'interface utilisateur avec des exemples pratiques et des conseils d'experts.",
    type: "video",
    category: "Tutorials",
    tags: ["ui", "interface", "démo", "pratique"],
    difficulty: "intermediate",
    duration: 18,
    views: 22100,
    likes: 1340,
    featured: true,
    lastUpdated: "2024-06-10",
    author: {
      name: "Marie Leclerc",
      role: "UX Designer"
    },
    rating: 4.9,
    thumbnail: "/images/video-thumbnail.jpg"
  },
  {
    id: "4",
    title: "Podcast : Meilleures pratiques",
    description: "Écoutez nos experts discuter des meilleures pratiques pour optimiser votre utilisation de la plateforme.",
    type: "audio",
    category: "Best Practices",
    tags: ["podcast", "bonnes pratiques", "optimisation"],
    difficulty: "intermediate",
    duration: 35,
    views: 5420,
    likes: 312,
    lastUpdated: "2024-06-08",
    author: {
      name: "Thomas Roux",
      role: "Product Manager"
    },
    rating: 4.5
  },
  {
    id: "5",
    title: "Résolution des problèmes courants",
    description: "Solutions rapides aux problèmes les plus fréquemment rencontrés par nos utilisateurs.",
    type: "faq",
    category: "Troubleshooting",
    tags: ["problèmes", "solutions", "dépannage"],
    difficulty: "beginner",
    readingTime: 12,
    views: 18750,
    likes: 945,
    trending: true,
    lastUpdated: "2024-06-14",
    author: {
      name: "Support Team",
      role: "Customer Success"
    },
    rating: 4.7
  },
  {
    id: "6",
    title: "Nouveautés version 2.0",
    description: "Découvrez toutes les nouvelles fonctionnalités et améliorations de notre dernière mise à jour majeure.",
    type: "changelog",
    category: "Updates",
    tags: ["nouveautés", "version", "update", "features"],
    difficulty: "intermediate",
    readingTime: 15,
    views: 12300,
    likes: 678,
    featured: true,
    lastUpdated: "2024-06-16",
    author: {
      name: "Product Team",
      role: "Product Management"
    },
    rating: 4.4
  }
];

function getTypeIcon(type: KnowledgeBaseItem['type'], className = "w-4 h-4") {
  switch (type) {
    case "article":
      return <FileText className={className} />;
    case "video":
      return <Video className={className} />;
    case "audio":
      return <Headphones className={className} />;
    case "guide":
      return <BookOpen className={className} />;
    case "tutorial":
      return <PlayCircle className={className} />;
    case "faq":
      return <FileText className={className} />;
    case "api":
      return <Globe className={className} />;
    case "changelog":
      return <Clock className={className} />;
    default:
      return <FileText className={className} />;
  }
}

function getDifficultyColor(difficulty?: string) {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800 border-green-200";
    case "intermediate":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "advanced":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function KnowledgeBaseCard({ 
  item, 
  variant = "grid",
  theme = "light",
  onItemClick,
  onDownload,
  onBookmark,
  onShare,
  enableDownload = false,
  enableBookmark = false
}: { 
  item: KnowledgeBaseItem;
  variant?: KnowledgeBaseSectionProps['variant'];
  theme?: "light" | "dark";
  onItemClick?: (item: KnowledgeBaseItem) => void;
  onDownload?: (item: KnowledgeBaseItem) => void;
  onBookmark?: (item: KnowledgeBaseItem) => void;
  onShare?: (item: KnowledgeBaseItem) => void;
  enableDownload?: boolean;
  enableBookmark?: boolean;
}) {
  if (variant === "list") {
    return (
      <div className={cn(
        "flex items-start space-x-4 p-6 border rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
        item.featured && "ring-2 ring-blue-500 ring-opacity-50"
      )} onClick={() => onItemClick?.(item)}>
        
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
        )}>
          {getTypeIcon(item.type, "w-6 h-6 text-blue-600")}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
                {item.difficulty && (
                  <Badge className={cn("text-xs border", getDifficultyColor(item.difficulty))}>
                    {item.difficulty}
                  </Badge>
                )}
                {item.featured && (
                  <Badge variant="default" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {item.trending && (
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {enableBookmark && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onBookmark?.(item); }}>
                  <Bookmark className="w-4 h-4" />
                </Button>
              )}
              {enableDownload && item.downloads && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDownload?.(item); }}>
                  <Download className="w-4 h-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onShare?.(item); }}>
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className={cn(
            "text-sm leading-relaxed mb-3",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {item.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                {item.author.name}
              </span>
              {item.readingTime && (
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.readingTime} min
                </span>
              )}
              {item.duration && (
                <span className="flex items-center">
                  <PlayCircle className="w-3 h-3 mr-1" />
                  {item.duration} min
                </span>
              )}
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {item.views.toLocaleString()}
              </span>
              <span className="flex items-center">
                <Heart className="w-3 h-3 mr-1" />
                {item.likes}
              </span>
              {item.rating && (
                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                  {item.rating}
                </span>
              )}
            </div>
            <span>
              {new Date(item.lastUpdated).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
    );
  }

  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg cursor-pointer group",
      theme === "dark" && "bg-gray-800 border-gray-700",
      item.featured && "ring-2 ring-blue-500 ring-opacity-50"
    )} onClick={() => onItemClick?.(item)}>
      {item.thumbnail && (
        <div className="relative overflow-hidden">
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-sm",
              theme === "dark" ? "bg-gray-900/80" : "bg-white/80"
            )}>
              {getTypeIcon(item.type, "w-5 h-5 text-blue-600")}
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            {item.featured && (
              <Badge variant="default" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {item.trending && (
              <Badge className="bg-orange-500 text-white text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Hot
              </Badge>
            )}
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2">{item.title}</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
              {item.difficulty && (
                <Badge className={cn("text-xs border", getDifficultyColor(item.difficulty))}>
                  {item.difficulty}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1 ml-2">
            {enableBookmark && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onBookmark?.(item); }}>
                <Bookmark className="w-4 h-4" />
              </Button>
            )}
            {enableDownload && item.downloads && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDownload?.(item); }}>
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className={cn(
          "text-sm leading-relaxed mb-4",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          {item.description}
        </p>

        <div className="flex items-center space-x-1 mb-4 flex-wrap gap-1">
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

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              {item.author.name}
            </span>
            {item.readingTime && (
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {item.readingTime}min
              </span>
            )}
            {item.duration && (
              <span className="flex items-center">
                <PlayCircle className="w-3 h-3 mr-1" />
                {item.duration}min
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {item.views > 1000 ? `${Math.floor(item.views / 1000)}k` : item.views}
            </span>
            <span className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              {item.likes}
            </span>
            {item.rating && (
              <span className="flex items-center">
                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                {item.rating}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function KnowledgeBaseSection({
  variant = "grid",
  title = "Base de connaissances",
  description = "Explorez notre documentation complète, guides et tutoriels pour maîtriser toutes les fonctionnalités.",
  items = defaultItems,
  showSearch = true,
  showFilters = true,
  showStats = true,
  maxVisible,
  enableDownload = false,
  enableBookmark = false,
  className,
  theme = "light",
  onItemClick,
  onDownload,
  onBookmark,
  onShare
}: KnowledgeBaseSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState("all");
  const [showAll, setShowAll] = React.useState(false);

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesDifficulty = selectedDifficulty === "all" || item.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesType && matchesDifficulty;
  });

  const displayedItems = maxVisible && !showAll 
    ? filteredItems.slice(0, maxVisible)
    : filteredItems;

  const categories = Array.from(new Set(items.map(item => item.category)));
  const types = Array.from(new Set(items.map(item => item.type)));
  const difficulties = Array.from(new Set(items.map(item => item.difficulty).filter(Boolean)));

  // Stats
  const totalViews = items.reduce((acc, item) => acc + item.views, 0);
  const totalItems = items.length;
  const featuredItems = items.filter(item => item.featured).length;
  const avgRating = items.reduce((acc, item) => acc + (item.rating || 0), 0) / items.length;

  if (variant === "search") {
    return (
      <section className={cn(
        "py-16",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
        className
      )}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className={cn(
              "text-lg leading-relaxed mb-8",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {description}
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher dans la base de connaissances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "w-full pl-12 pr-4 py-4 text-lg border rounded-lg",
                  theme === "dark" && "bg-gray-800 border-gray-700"
                )}
              />
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors",
                  selectedType === type
                    ? "bg-blue-600 text-white border-blue-600"
                    : theme === "dark"
                    ? "border-gray-700 text-gray-300 hover:border-gray-600"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                )}
              >
                {getTypeIcon(type, "w-4 h-4")}
                <span className="capitalize">{type}</span>
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="space-y-4">
            {displayedItems.map((item) => (
              <KnowledgeBaseCard
                key={item.id}
                item={item}
                variant="list"
                theme={theme}
                onItemClick={onItemClick}
                onDownload={onDownload}
                onBookmark={onBookmark}
                onShare={onShare}
                enableDownload={enableDownload}
                enableBookmark={enableBookmark}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
              <p className={cn(
                "mb-6",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}>
                Essayez avec d'autres mots-clés ou parcourez nos catégories.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "featured") {
    const featuredItemsList = items.filter(item => item.featured);
    const trendingItems = items.filter(item => item.trending);

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
                  Articles
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{featuredItems}</div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  Featured
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {totalViews > 1000 ? `${Math.floor(totalViews / 1000)}k` : totalViews}
                </div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  Vues
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
            </div>
          )}

          {/* Featured items */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-yellow-600" />
              Contenus mis en avant
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItemsList.map((item) => (
                <KnowledgeBaseCard
                  key={item.id}
                  item={item}
                  variant="grid"
                  theme={theme}
                  onItemClick={onItemClick}
                  onDownload={onDownload}
                  onBookmark={onBookmark}
                  onShare={onShare}
                  enableDownload={enableDownload}
                  enableBookmark={enableBookmark}
                />
              ))}
            </div>
          </div>

          {/* Trending items */}
          {trendingItems.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-orange-600" />
                Tendances actuelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingItems.map((item) => (
                  <KnowledgeBaseCard
                    key={item.id}
                    item={item}
                    variant="grid"
                    theme={theme}
                    onItemClick={onItemClick}
                    onDownload={onDownload}
                    onBookmark={onBookmark}
                    onShare={onShare}
                    enableDownload={enableDownload}
                    enableBookmark={enableBookmark}
                  />
                ))}
              </div>
            </div>
          )}
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

        {/* Search & Filters */}
        {(showSearch || showFilters) && (
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {showSearch && (
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "pl-10",
                    theme === "dark" && "bg-gray-800 border-gray-700"
                  )}
                />
              </div>
            )}

            {showFilters && (
              <div className="flex flex-wrap gap-2">
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
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={cn(
                    "px-3 py-2 border rounded-lg text-sm",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                >
                  <option value="all">Tous types</option>
                  {types.map((type) => (
                    <option key={type} value={type} className="capitalize">{type}</option>
                  ))}
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className={cn(
                    "px-3 py-2 border rounded-lg text-sm",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                >
                  <option value="all">Tous niveaux</option>
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty} className="capitalize">{difficulty}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Items */}
        <div className={cn(
          variant === "list" 
            ? "space-y-6" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        )}>
          {displayedItems.map((item) => (
            <KnowledgeBaseCard
              key={item.id}
              item={item}
              variant={variant}
              theme={theme}
              onItemClick={onItemClick}
              onDownload={onDownload}
              onBookmark={onBookmark}
              onShare={onShare}
              enableDownload={enableDownload}
              enableBookmark={enableBookmark}
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
              Voir tous les articles ({filteredItems.length})
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export type { KnowledgeBaseSectionProps, KnowledgeBaseItem };
