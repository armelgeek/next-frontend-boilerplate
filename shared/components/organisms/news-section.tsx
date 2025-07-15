"use client";

import React from "react";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Button } from "@/shared/components/atoms/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/ui/avatar";
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  Share,
  ExternalLink,
  Filter,
  Search,
  ArrowRight,
  ChevronRight,
  Tag,
  TrendingUp,
  Award,
  CheckCircle,
  Eye,
  MessageSquare,
  ThumbsUp,
  Bookmark,
  Play,
  Download,
  Globe,
  Smartphone,
  Video,
  Music,
  Gamepad2,
  Coffee,
  Car,
  Home,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  readingTime: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  featured?: boolean;
  trending?: boolean;
  breaking?: boolean;
  image?: string;
  videoUrl?: string;
  audioUrl?: string;
  source?: string;
  location?: string;
  rating?: number;
  bookmarked?: boolean;
  premium?: boolean;
}

interface NewsSectionProps {
  variant?: "grid" | "list" | "cards" | "magazine" | "timeline" | "breaking";
  title?: string;
  description?: string;
  articles?: NewsArticle[];
  showSearch?: boolean;
  showFilters?: boolean;
  showStats?: boolean;
  maxVisible?: number;
  enableBookmark?: boolean;
  enableShare?: boolean;
  className?: string;
  theme?: "light" | "dark";
  onArticleClick?: (article: NewsArticle) => void;
  onBookmark?: (article: NewsArticle) => void;
  onShare?: (article: NewsArticle) => void;
  onAuthorClick?: (author: NewsArticle['author']) => void;
}

const defaultArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Révolution de l'IA : Les nouvelles avancées qui changent tout",
    excerpt: "L'intelligence artificielle franchit un nouveau cap avec des innovations qui transforment radicalement notre approche de la technologie. Découvrez les dernières percées qui redéfinissent l'avenir.",
    category: "Technologie",
    tags: ["IA", "innovation", "technologie", "futur"],
    publishedAt: "2024-06-16T09:00:00Z",
    author: {
      name: "Dr. Marie Dubois",
      avatar: "/avatars/marie.jpg",
      role: "Expert en IA"
    },
    readingTime: 8,
    views: 25400,
    likes: 1890,
    comments: 234,
    shares: 456,
    featured: true,
    trending: true,
    breaking: true,
    image: "/images/ai-revolution.jpg",
    rating: 4.8
  },
  {
    id: "2",
    title: "Startup française lève 50M€ pour la transition écologique",
    excerpt: "Une startup parisienne spécialisée dans les technologies vertes annonce une levée de fonds record pour accélérer la transition énergétique en Europe.",
    category: "Business",
    tags: ["startup", "écologie", "financement", "énergie"],
    publishedAt: "2024-06-15T14:30:00Z",
    author: {
      name: "Thomas Martin",
      avatar: "/avatars/thomas.jpg",
      role: "Journaliste Business"
    },
    readingTime: 6,
    views: 18200,
    likes: 967,
    comments: 145,
    shares: 289,
    trending: true,
    image: "/images/startup-funding.jpg",
    location: "Paris, France",
    rating: 4.5
  },
  {
    id: "3",
    title: "Les crypto-monnaies rebondissent après une semaine difficile",
    excerpt: "Après plusieurs jours de baisse, le marché des cryptomonnaies montre des signes de reprise avec Bitcoin qui franchit à nouveau les 45 000$.",
    category: "Finance",
    tags: ["crypto", "bitcoin", "finance", "marché"],
    publishedAt: "2024-06-15T11:15:00Z",
    author: {
      name: "Sarah Chen",
      role: "Analyste Finance"
    },
    readingTime: 5,
    views: 31500,
    likes: 1245,
    comments: 423,
    shares: 167,
    image: "/images/crypto-market.jpg",
    rating: 4.2
  },
  {
    id: "4",
    title: "Podcast : L'avenir du télétravail post-pandémie",
    excerpt: "Dans ce podcast exclusif, nous explorons comment le télétravail continue d'évoluer et reshape le monde professionnel trois ans après la pandémie.",
    category: "Société",
    tags: ["télétravail", "podcast", "société", "travail"],
    publishedAt: "2024-06-14T16:00:00Z",
    author: {
      name: "Pierre Leroy",
      avatar: "/avatars/pierre.jpg",
      role: "Sociologue"
    },
    readingTime: 0,
    views: 12800,
    likes: 678,
    comments: 89,
    shares: 234,
    audioUrl: "/audio/remote-work-future.mp3",
    rating: 4.6,
    premium: true
  },
  {
    id: "5",
    title: "Vidéo : Démonstration de la voiture autonome de demain",
    excerpt: "Regardez en exclusivité les tests de la nouvelle génération de véhicules autonomes qui promettent de révolutionner nos déplacements urbains.",
    category: "Transport",
    tags: ["voiture", "autonome", "transport", "innovation"],
    publishedAt: "2024-06-14T10:45:00Z",
    author: {
      name: "Julie Moreau",
      role: "Reporter Tech"
    },
    readingTime: 0,
    views: 45600,
    likes: 2340,
    comments: 567,
    shares: 890,
    featured: true,
    videoUrl: "/videos/autonomous-car-demo.mp4",
    image: "/images/autonomous-car.jpg",
    rating: 4.9
  },
  {
    id: "6",
    title: "Breaking: Accord historique sur le climat européen",
    excerpt: "L'Union européenne vient d'annoncer un accord sans précédent pour atteindre la neutralité carbone d'ici 2035, deux ans plus tôt que prévu.",
    category: "Politique",
    tags: ["climat", "europe", "politique", "environnement"],
    publishedAt: "2024-06-16T07:20:00Z",
    author: {
      name: "Élise Bertrand",
      role: "Correspondante UE"
    },
    readingTime: 7,
    views: 67800,
    likes: 3450,
    comments: 892,
    shares: 1234,
    breaking: true,
    trending: true,
    image: "/images/eu-climate-deal.jpg",
    location: "Bruxelles, Belgique",
    rating: 4.7
  }
];

function getCategoryIcon(category: string, className = "w-4 h-4") {
  const iconMap: Record<string, React.ReactNode> = {
    "Technologie": <Smartphone className={className} />,
    "Business": <Briefcase className={className} />,
    "Finance": <TrendingUp className={className} />,
    "Société": <Users className={className} />,
    "Transport": <Car className={className} />,
    "Politique": <Globe className={className} />,
    "Santé": <Heart className={className} />,
    "Éducation": <GraduationCap className={className} />,
    "Sport": <Award className={className} />,
    "Culture": <Music className={className} />,
    "Gaming": <Gamepad2 className={className} />,
    "Lifestyle": <Coffee className={className} />,
    "Immobilier": <Home className={className} />
  };
  
  return iconMap[category] || <MessageSquare className={className} />;
}

function NewsCard({ 
  article, 
  variant = "grid",
  theme = "light",
  onArticleClick,
  onBookmark,
  onShare,
  onAuthorClick,
  enableBookmark = false,
  enableShare = false
}: { 
  article: NewsArticle;
  variant?: NewsSectionProps['variant'];
  theme?: "light" | "dark";
  onArticleClick?: (article: NewsArticle) => void;
  onBookmark?: (article: NewsArticle) => void;
  onShare?: (article: NewsArticle) => void;
  onAuthorClick?: (author: NewsArticle['author']) => void;
  enableBookmark?: boolean;
  enableShare?: boolean;
}) {
  const formatDate = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInHours < 48) return "Hier";
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  if (variant === "list") {
    return (
      <div className={cn(
        "flex items-start space-x-4 p-6 border rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
        article.breaking && "border-red-500 bg-red-50 dark:bg-red-900/20"
      )} onClick={() => onArticleClick?.(article)}>
        
        {article.image && (
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            {article.videoUrl && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
            )}
            {article.audioUrl && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {article.breaking && (
                  <Badge className="bg-red-600 text-white text-xs animate-pulse">
                    BREAKING
                  </Badge>
                )}
                {article.featured && (
                  <Badge variant="default" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {article.trending && (
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {article.premium && (
                  <Badge className="bg-purple-100 text-purple-800 text-xs">
                    Premium
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {getCategoryIcon(article.category, "w-3 h-3")}
                  <span className="ml-1">{article.category}</span>
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold leading-tight mb-2">{article.title}</h3>
              <p className={cn(
                "text-sm leading-relaxed mb-3 line-clamp-2",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>
                {article.excerpt}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {enableBookmark && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onBookmark?.(article); }}>
                  <Bookmark className={cn("w-4 h-4", article.bookmarked && "fill-current text-blue-600")} />
                </Button>
              )}
              {enableShare && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onShare?.(article); }}>
                  <Share className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <button
                onClick={(e) => { e.stopPropagation(); onAuthorClick?.(article.author); }}
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
              >
                {article.author.avatar ? (
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={article.author.avatar} />
                    <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">{article.author.name[0]}</span>
                  </div>
                )}
                <span>{article.author.name}</span>
              </button>
              
              <span>{formatDate(article.publishedAt)}</span>
              
              {article.readingTime > 0 && (
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {article.readingTime} min
                </span>
              )}
              
              {article.location && (
                <span className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {article.location}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {article.views > 1000 ? `${Math.floor(article.views / 1000)}k` : article.views}
              </span>
              <span className="flex items-center">
                <ThumbsUp className="w-3 h-3 mr-1" />
                {article.likes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="w-3 h-3 mr-1" />
                {article.comments}
              </span>
              {article.rating && (
                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                  {article.rating}
                </span>
              )}
            </div>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
    );
  }

  if (variant === "magazine") {
    return (
      <Card className={cn(
        "h-full transition-all duration-300 hover:shadow-lg cursor-pointer group overflow-hidden",
        theme === "dark" && "bg-gray-800 border-gray-700",
        article.breaking && "ring-2 ring-red-500 ring-opacity-50"
      )} onClick={() => onArticleClick?.(article)}>
        
        {article.image && (
          <div className="relative overflow-hidden h-48">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            <div className="absolute top-4 left-4 flex gap-2">
              {article.breaking && (
                <Badge className="bg-red-600 text-white text-xs animate-pulse">
                  🚨 BREAKING
                </Badge>
              )}
              {article.featured && (
                <Badge variant="default" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            
            <div className="absolute top-4 right-4 flex gap-2">
              {enableBookmark && (
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm border-white/30"
                  onClick={(e) => { e.stopPropagation(); onBookmark?.(article); }}
                >
                  <Bookmark className={cn("w-4 h-4", article.bookmarked && "fill-current text-blue-600")} />
                </Button>
              )}
            </div>
            
            {(article.videoUrl || article.audioUrl) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  {article.videoUrl ? (
                    <Play className="w-8 h-8 text-white" />
                  ) : (
                    <Music className="w-8 h-8 text-white" />
                  )}
                </div>
              </div>
            )}
            
            <div className="absolute bottom-4 left-4 right-4">
              <Badge variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white mb-2">
                {getCategoryIcon(article.category, "w-3 h-3")}
                <span className="ml-1">{article.category}</span>
              </Badge>
              <h3 className="text-white font-bold text-lg leading-tight">{article.title}</h3>
            </div>
          </div>
        )}

        <CardContent className="p-6">
          <p className={cn(
            "text-sm leading-relaxed mb-4 line-clamp-3",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {article.excerpt}
          </p>

          <div className="flex items-center space-x-1 mb-4 flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {article.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{article.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <button
              onClick={(e) => { e.stopPropagation(); onAuthorClick?.(article.author); }}
              className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
            >
              {article.author.avatar ? (
                <Avatar className="w-6 h-6">
                  <AvatarImage src={article.author.avatar} />
                  <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">{article.author.name[0]}</span>
                </div>
              )}
              <div>
                <div className="font-medium">{article.author.name}</div>
                <div className="text-gray-400">{article.author.role}</div>
              </div>
            </button>
            
            <div className="text-right">
              <div>{formatDate(article.publishedAt)}</div>
              {article.readingTime > 0 && (
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {article.readingTime} min
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {article.views > 1000 ? `${Math.floor(article.views / 1000)}k` : article.views}
              </span>
              <span className="flex items-center">
                <ThumbsUp className="w-3 h-3 mr-1" />
                {article.likes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="w-3 h-3 mr-1" />
                {article.comments}
              </span>
            </div>
            
            {enableShare && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => { e.stopPropagation(); onShare?.(article); }}
              >
                <Share className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default grid variant
  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg cursor-pointer group",
      theme === "dark" && "bg-gray-800 border-gray-700",
      article.featured && "ring-2 ring-blue-500 ring-opacity-50"
    )} onClick={() => onArticleClick?.(article)}>
      
      {article.image && (
        <div className="relative overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          <div className="absolute top-4 left-4 flex gap-2">
            {article.breaking && (
              <Badge className="bg-red-600 text-white text-xs animate-pulse">
                BREAKING
              </Badge>
            )}
            {article.trending && (
              <Badge className="bg-orange-500 text-white text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
          
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              {getCategoryIcon(article.category, "w-3 h-3")}
              <span className="ml-1">{article.category}</span>
            </Badge>
          </div>
          
          {(article.videoUrl || article.audioUrl) && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              {article.videoUrl ? (
                <Play className="w-12 h-12 text-white" />
              ) : (
                <Music className="w-12 h-12 text-white" />
              )}
            </div>
          )}
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight line-clamp-2">{article.title}</CardTitle>
          
          <div className="flex items-center space-x-1 ml-2">
            {enableBookmark && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onBookmark?.(article); }}>
                <Bookmark className={cn("w-4 h-4", article.bookmarked && "fill-current text-blue-600")} />
              </Button>
            )}
            {enableShare && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onShare?.(article); }}>
                <Share className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className={cn(
          "text-sm leading-relaxed mb-4 line-clamp-3",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            <span>{formatDate(article.publishedAt)}</span>
            {article.readingTime > 0 && (
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {article.readingTime} min
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {article.views > 1000 ? `${Math.floor(article.views / 1000)}k` : article.views}
            </span>
            <span className="flex items-center">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {article.likes}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <button
            onClick={(e) => { e.stopPropagation(); onAuthorClick?.(article.author); }}
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
          >
            {article.author.avatar ? (
              <Avatar className="w-6 h-6">
                <AvatarImage src={article.author.avatar} />
                <AvatarFallback>{article.author.name[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">{article.author.name[0]}</span>
              </div>
            )}
            <span className="text-sm font-medium">{article.author.name}</span>
          </button>
          
          {article.rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm">{article.rating}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function NewsSection({
  variant = "grid",
  title = "Actualités",
  description = "Restez informé des dernières nouvelles et analyses dans tous les domaines qui vous intéressent.",
  articles = defaultArticles,
  showSearch = true,
  showFilters = true,
  showStats = true,
  maxVisible,
  enableBookmark = false,
  enableShare = false,
  className,
  theme = "light",
  onArticleClick,
  onBookmark,
  onShare,
  onAuthorClick
}: NewsSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [showAll, setShowAll] = React.useState(false);

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedArticles = maxVisible && !showAll 
    ? filteredArticles.slice(0, maxVisible)
    : filteredArticles;

  const categories = Array.from(new Set(articles.map(article => article.category)));
  const breakingNews = articles.filter(article => article.breaking);
  const featuredArticles = articles.filter(article => article.featured);
  const trendingArticles = articles.filter(article => article.trending);

  // Stats
  const totalViews = articles.reduce((acc, article) => acc + article.views, 0);
  const totalArticles = articles.length;
  const totalLikes = articles.reduce((acc, article) => acc + article.likes, 0);
  const avgRating = articles.reduce((acc, article) => acc + (article.rating || 0), 0) / articles.length;

  if (variant === "breaking") {
    return (
      <section className={cn(
        "py-16",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
        className
      )}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Breaking News Banner */}
          {breakingNews.length > 0 && (
            <div className="bg-red-600 text-white p-4 rounded-lg mb-8">
              <div className="flex items-center space-x-3">
                <Badge className="bg-white text-red-600 animate-pulse">
                  🚨 BREAKING NEWS
                </Badge>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{breakingNews[0].title}</h3>
                  <p className="text-red-100 text-sm">{breakingNews[0].excerpt}</p>
                </div>
                <Button 
                  variant="secondary"
                  onClick={() => onArticleClick?.(breakingNews[0])}
                >
                  Lire maintenant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

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

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-600" />
                À la une
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredArticles.slice(0, 2).map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    variant="magazine"
                    theme={theme}
                    onArticleClick={onArticleClick}
                    onBookmark={onBookmark}
                    onShare={onShare}
                    onAuthorClick={onAuthorClick}
                    enableBookmark={enableBookmark}
                    enableShare={enableShare}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Latest News */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-600" />
              Dernières nouvelles
            </h3>
            <div className="space-y-4">
              {articles.slice(0, 5).map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  variant="list"
                  theme={theme}
                  onArticleClick={onArticleClick}
                  onBookmark={onBookmark}
                  onShare={onShare}
                  onAuthorClick={onAuthorClick}
                  enableBookmark={enableBookmark}
                  enableShare={enableShare}
                />
              ))}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalArticles}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Articles
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {totalViews > 1000 ? `${Math.floor(totalViews / 1000)}k` : totalViews}
              </div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Lectures
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{totalLikes}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Likes
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

        {/* Search & Filters */}
        {(showSearch || showFilters) && (
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {showSearch && (
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
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

            {showFilters && (
              <div className="flex gap-2 flex-wrap">
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
                  Toutes
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 text-sm rounded-lg border transition-colors",
                      selectedCategory === category
                        ? "bg-blue-600 text-white border-blue-600"
                        : theme === "dark"
                        ? "border-gray-700 text-gray-300 hover:border-gray-600"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    )}
                  >
                    {getCategoryIcon(category, "w-4 h-4")}
                    <span>{category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Articles */}
        <div className={cn(
          variant === "list" 
            ? "space-y-6" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        )}>
          {displayedArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              variant={variant}
              theme={theme}
              onArticleClick={onArticleClick}
              onBookmark={onBookmark}
              onShare={onShare}
              onAuthorClick={onAuthorClick}
              enableBookmark={enableBookmark}
              enableShare={enableShare}
            />
          ))}
        </div>

        {/* Load More */}
        {maxVisible && filteredArticles.length > maxVisible && !showAll && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              onClick={() => setShowAll(true)}
              className="group"
            >
              Voir tous les articles ({filteredArticles.length})
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export type { NewsSectionProps, NewsArticle };
