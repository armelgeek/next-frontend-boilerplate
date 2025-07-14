"use client";

import React from "react";
import { Button } from "@/shared/components/atoms/ui/button";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { 
  Eye,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  Search,
  Calendar,
  User,
  Tag,
  ArrowRight,
  Heart,
  Share2,
  Download,
  Play,
  Image as ImageIcon,
  Video,
  FileText,
  Code,
  Palette,
  Camera
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  tags?: string[];
  client?: string;
  date?: string;
  url?: string;
  likes?: number;
  views?: number;
  type: "image" | "video" | "document" | "code" | "design";
  featured?: boolean;
  status?: "completed" | "in-progress" | "draft";
}

interface PortfolioSectionProps {
  variant?: "grid" | "masonry" | "carousel" | "list" | "slider" | "filtered";
  title?: string;
  description?: string;
  items?: PortfolioItem[];
  columns?: 2 | 3 | 4;
  showFilters?: boolean;
  showSearch?: boolean;
  showStats?: boolean;
  maxItems?: number;
  className?: string;
  theme?: "light" | "dark";
  onViewItem?: (item: PortfolioItem) => void;
  onLoadMore?: () => void;
}

const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Application E-commerce Mobile",
    description: "Design et développement d'une application mobile complète pour la vente en ligne avec paiement intégré.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    category: "Mobile App",
    tags: ["React Native", "UI/UX", "E-commerce"],
    client: "TechStore",
    date: "2024-06-01",
    url: "https://example.com",
    likes: 124,
    views: 2580,
    type: "design",
    featured: true,
    status: "completed"
  },
  {
    id: "2",
    title: "Site Web Corporate",
    description: "Refonte complète du site web d'entreprise avec système de gestion de contenu personnalisé.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Web Design",
    tags: ["Next.js", "CMS", "SEO"],
    client: "Corporate Solutions",
    date: "2024-05-15",
    url: "https://example.com",
    likes: 89,
    views: 1450,
    type: "code",
    featured: true,
    status: "completed"
  },
  {
    id: "3",
    title: "Identité Visuelle Restaurant",
    description: "Création d'une identité visuelle complète incluant logo, charte graphique et supports de communication.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    category: "Branding",
    tags: ["Logo", "Print", "Branding"],
    client: "Le Petit Bistrot",
    date: "2024-04-20",
    likes: 156,
    views: 3200,
    type: "design",
    status: "completed"
  },
  {
    id: "4",
    title: "Dashboard Analytics",
    description: "Interface d'administration pour l'analyse de données avec graphiques interactifs et tableaux de bord.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    category: "Dashboard",
    tags: ["React", "D3.js", "Analytics"],
    client: "DataCorp",
    date: "2024-04-10",
    url: "https://example.com",
    likes: 203,
    views: 4100,
    type: "code",
    featured: true,
    status: "completed"
  },
  {
    id: "5",
    title: "Campagne Publicitaire Digitale",
    description: "Création de visuels pour une campagne publicitaire multi-canaux incluant réseaux sociaux et display.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    category: "Marketing",
    tags: ["Advertising", "Social Media", "Creative"],
    client: "Fashion Brand",
    date: "2024-03-25",
    likes: 98,
    views: 2100,
    type: "image",
    status: "completed"
  },
  {
    id: "6",
    title: "Application de Gestion",
    description: "Développement d'une application de gestion interne avec authentification et permissions avancées.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop",
    category: "Software",
    tags: ["Node.js", "Database", "Security"],
    client: "Enterprise Co",
    date: "2024-03-10",
    url: "https://example.com",
    likes: 167,
    views: 2890,
    type: "code",
    status: "completed"
  }
];

function getTypeIcon(type: PortfolioItem['type']) {
  switch (type) {
    case "image":
      return ImageIcon;
    case "video":
      return Video;
    case "document":
      return FileText;
    case "code":
      return Code;
    case "design":
      return Palette;
    default:
      return ImageIcon;
  }
}

function PortfolioItemCard({ 
  item, 
  variant = "grid",
  theme = "light",
  onViewItem 
}: { 
  item: PortfolioItem; 
  variant?: PortfolioSectionProps['variant'];
  theme?: "light" | "dark";
  onViewItem?: (item: PortfolioItem) => void;
}) {
  const TypeIcon = getTypeIcon(item.type);

  if (variant === "list") {
    return (
      <div className={cn(
        "flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 hover:shadow-md",
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="relative flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="absolute -top-1 -right-1">
            <TypeIcon className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg truncate">{item.title}</h3>
              <p className={cn(
                "text-sm line-clamp-1",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                {item.description}
              </p>
            </div>
            <Badge variant="outline" className="ml-2">
              {item.category}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              {item.client && <span>{item.client}</span>}
              {item.date && <span>{new Date(item.date).toLocaleDateString('fr-FR')}</span>}
            </div>
            
            <div className="flex items-center space-x-2">
              {item.views && (
                <span className="flex items-center text-xs text-gray-500">
                  <Eye className="w-3 h-3 mr-1" />
                  {item.views}
                </span>
              )}
              {item.likes && (
                <span className="flex items-center text-xs text-gray-500">
                  <Heart className="w-3 h-3 mr-1" />
                  {item.likes}
                </span>
              )}
              <Button size="sm" variant="ghost" onClick={() => onViewItem?.(item)}>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={cn(
      "group cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden",
      theme === "dark" && "bg-gray-800 border-gray-700",
      item.featured && "ring-2 ring-blue-500 ring-opacity-50"
    )}>
      <div className="relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            <Button size="sm" variant="secondary" onClick={() => onViewItem?.(item)}>
              <Eye className="w-4 h-4 mr-2" />
              Voir
            </Button>
            {item.url && (
              <Button size="sm" variant="secondary" asChild>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="absolute top-2 left-2">
          <TypeIcon className={cn(
            "w-5 h-5 p-1 rounded",
            theme === "dark" ? "bg-gray-900/80 text-white" : "bg-white/80 text-gray-700"
          )} />
        </div>

        <div className="absolute top-2 right-2 flex space-x-1">
          {item.featured && (
            <Badge variant="default" className="bg-blue-500 text-white text-xs">
              Featured
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        </div>

        <div className="absolute bottom-2 right-2 flex items-center space-x-2 text-white text-xs">
          {item.views && (
            <span className="flex items-center bg-black/50 px-2 py-1 rounded">
              <Eye className="w-3 h-3 mr-1" />
              {item.views}
            </span>
          )}
          {item.likes && (
            <span className="flex items-center bg-black/50 px-2 py-1 rounded">
              <Heart className="w-3 h-3 mr-1" />
              {item.likes}
            </span>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
        
        {item.description && (
          <p className={cn(
            "text-sm mb-3 line-clamp-2",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>
            {item.description}
          </p>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div>
            {item.client && <span className="font-medium">{item.client}</span>}
            {item.date && (
              <span className="ml-2">
                {new Date(item.date).toLocaleDateString('fr-FR')}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Heart className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Share2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PortfolioSection({
  variant = "grid",
  title = "Notre Portfolio",
  description = "Découvrez une sélection de nos réalisations et projets qui illustrent notre expertise et notre créativité.",
  items = defaultPortfolioItems,
  columns = 3,
  showFilters = true,
  showSearch = false,
  showStats = true,
  maxItems,
  className,
  theme = "light",
  onViewItem,
  onLoadMore
}: PortfolioSectionProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const displayedItems = maxItems ? items.slice(0, maxItems) : items;
  
  // Filter items
  const filteredItems = displayedItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(items.map(item => item.category)));
  const totalProjects = items.length;
  const featuredProjects = items.filter(item => item.featured).length;
  const totalViews = items.reduce((acc, item) => acc + (item.views || 0), 0);

  const getGridClasses = () => {
    const colsMap = {
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4"
    };
    
    switch (variant) {
      case "masonry":
        return `columns-1 ${colsMap[columns]} gap-6 space-y-6`;
      case "list":
        return "space-y-4";
      default:
        return `grid grid-cols-1 ${colsMap[columns]} gap-6`;
    }
  };

  if (variant === "carousel") {
    const slidesToShow = columns;
    const maxSlides = Math.ceil(filteredItems.length / slidesToShow);

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
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{totalProjects}+</div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  Projets réalisés
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{featuredProjects}</div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  Projets mis en avant
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{totalViews.toLocaleString()}</div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  Vues totales
                </div>
              </div>
            </div>
          )}

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className={`grid grid-cols-1 md:grid-cols-${slidesToShow} gap-6`}>
                      {filteredItems
                        .slice(slideIndex * slidesToShow, (slideIndex + 1) * slidesToShow)
                        .map((item) => (
                          <PortfolioItemCard 
                            key={item.id} 
                            item={item} 
                            variant="grid"
                            theme={theme}
                            onViewItem={onViewItem}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex space-x-2">
                {Array.from({ length: maxSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                    )}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSlide(Math.min(maxSlides - 1, currentSlide + 1))}
                disabled={currentSlide === maxSlides - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
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
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalProjects}+</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Projets réalisés
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{featuredProjects}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Projets mis en avant
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{totalViews.toLocaleString()}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Vues totales
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search */}
        {(showFilters || showSearch) && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            {/* Search */}
            {showSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "pl-10 pr-4 py-2 border rounded-lg w-64",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                />
              </div>
            )}

            {/* Filters */}
            {showFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "px-4 py-2 text-sm rounded-lg border transition-colors",
                    selectedCategory === "all"
                      ? "bg-blue-600 text-white border-blue-600"
                      : theme === "dark"
                      ? "border-gray-700 text-gray-300 hover:border-gray-600"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  )}
                >
                  Tous
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-4 py-2 text-sm rounded-lg border transition-colors",
                      selectedCategory === category
                        ? "bg-blue-600 text-white border-blue-600"
                        : theme === "dark"
                        ? "border-gray-700 text-gray-300 hover:border-gray-600"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Portfolio Grid */}
        <div className={getGridClasses()}>
          {filteredItems.map((item) => (
            <div key={item.id} className={variant === "masonry" ? "break-inside-avoid mb-6" : ""}>
              <PortfolioItemCard 
                item={item} 
                variant={variant} 
                theme={theme}
                onViewItem={onViewItem}
              />
            </div>
          ))}
        </div>

        {/* Load More */}
        {items.length > filteredItems.length && (
          <div className="text-center mt-12">
            <Button onClick={onLoadMore} variant="outline" className="group">
              Voir plus de projets
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export type { PortfolioSectionProps, PortfolioItem };
