"use client";

import React from "react";
import { Button } from "@/shared/components/atoms/ui/button";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { 
  Star,
  ArrowRight,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Check,
  X,
  ThumbsUp,
  MessageSquare,
  Share2,
  Award,
  Building,
  Calendar,
  MapPin,
  Globe,
  Users,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Review {
  id: string;
  rating: number;
  title?: string;
  content: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
    verified?: boolean;
  };
  date?: string;
  helpful?: number;
  platform?: string;
  featured?: boolean;
  tags?: string[];
  responses?: {
    from: string;
    role: string;
    content: string;
    date: string;
  }[];
}

interface ReviewsSectionProps {
  variant?: "grid" | "carousel" | "masonry" | "featured" | "compact" | "detailed";
  title?: string;
  description?: string;
  reviews?: Review[];
  showRating?: boolean;
  showStats?: boolean;
  showPlatforms?: boolean;
  showFilters?: boolean;
  maxReviews?: number;
  className?: string;
  theme?: "light" | "dark";
  onLoadMore?: () => void;
  onFilterChange?: (filter: string) => void;
}

const defaultReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    title: "Excellent service, équipe réactive",
    content: "J'utilise cette plateforme depuis 6 mois et je suis totalement satisfait. L'interface est intuitive, les fonctionnalités sont complètes et le support client est exceptionnel. Je recommande vivement !",
    author: {
      name: "Marie Dubois",
      role: "CEO",
      company: "TechStart",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c04c?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    date: "2024-06-15",
    helpful: 23,
    platform: "Trustpilot",
    featured: true,
    tags: ["Interface", "Support", "Fiabilité"]
  },
  {
    id: "2",
    rating: 5,
    title: "ROI impressionnant dès le premier mois",
    content: "Nous avons vu une amélioration de 300% de notre productivité. L'automatisation des tâches nous fait gagner un temps précieux. C'est exactement ce dont nous avions besoin pour notre croissance.",
    author: {
      name: "Thomas Martin",
      role: "Directeur Technique",
      company: "InnovCorp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    date: "2024-06-10",
    helpful: 18,
    platform: "Google",
    featured: true,
    tags: ["Productivité", "ROI", "Automatisation"],
    responses: [
      {
        from: "Équipe Support",
        role: "Customer Success",
        content: "Merci Thomas ! Nous sommes ravis de voir ces résultats. N'hésitez pas à nous contacter pour optimiser encore plus votre utilisation.",
        date: "2024-06-11"
      }
    ]
  },
  {
    id: "3",
    rating: 4,
    title: "Bon produit avec quelques améliorations possibles",
    content: "Dans l'ensemble très satisfait. Les fonctionnalités principales fonctionnent parfaitement. J'aimerais voir plus d'options de personnalisation dans les prochaines versions, mais c'est déjà très bien.",
    author: {
      name: "Sophie Chen",
      role: "Product Manager",
      company: "DesignStudio",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    date: "2024-06-08",
    helpful: 12,
    platform: "Capterra",
    tags: ["Fonctionnalités", "Personnalisation"]
  },
  {
    id: "4",
    rating: 5,
    title: "Migration facile, résultats immédiats",
    content: "La migration depuis notre ancienne solution s'est faite sans accroc. L'équipe nous a accompagnés tout au long du processus. Nous recommandons sans hésitation !",
    author: {
      name: "Alex Johnson",
      role: "IT Manager",
      company: "GlobalTech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    date: "2024-06-05",
    helpful: 15,
    platform: "G2",
    tags: ["Migration", "Support", "Simplicité"]
  },
  {
    id: "5",
    rating: 5,
    title: "Parfait pour les équipes distribuées",
    content: "Avec nos équipes réparties sur 3 continents, nous avions besoin d'une solution collaborative robuste. Cette plateforme répond parfaitement à nos besoins avec une excellente stabilité.",
    author: {
      name: "Elena Rodriguez",
      role: "Operations Director",
      company: "WorldWide Inc",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    date: "2024-06-02",
    helpful: 20,
    platform: "Trustpilot",
    featured: true,
    tags: ["Collaboration", "International", "Stabilité"]
  },
  {
    id: "6",
    rating: 4,
    title: "Excellent rapport qualité-prix",
    content: "Pour le prix, c'est imbattable. Nous avons testé plusieurs alternatives plus chères et celle-ci offre le meilleur rapport qualité-prix du marché.",
    author: {
      name: "David Kim",
      role: "CFO",
      company: "StartupLab",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    date: "2024-05-28",
    helpful: 14,
    platform: "GetApp",
    tags: ["Prix", "Rapport qualité-prix"]
  }
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= rating 
              ? "fill-yellow-400 text-yellow-400" 
              : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}

function ReviewCard({ 
  review, 
  variant = "grid", 
  theme = "light" 
}: { 
  review: Review; 
  variant?: ReviewsSectionProps['variant'];
  theme?: "light" | "dark";
}) {
  if (variant === "compact") {
    return (
      <div className={cn(
        "p-4 rounded-lg border",
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {review.author.avatar ? (
              <img 
                src={review.author.avatar} 
                alt={review.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">
                  {review.author.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <StarRating rating={review.rating} size="sm" />
              {review.author.verified && (
                <Badge variant="secondary" className="text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  Vérifié
                </Badge>
              )}
            </div>
            <p className={cn(
              "text-sm line-clamp-2",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {review.content}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-medium">{review.author.name}</span>
              {review.platform && (
                <span className={cn(
                  "text-xs",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  via {review.platform}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <Card className={cn(
        "h-full",
        theme === "dark" && "bg-gray-800 border-gray-700",
        review.featured && "ring-2 ring-blue-500 ring-opacity-50"
      )}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {review.author.avatar ? (
                <img 
                  src={review.author.avatar} 
                  alt={review.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {review.author.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">{review.author.name}</h4>
                  {review.author.verified && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <p className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  {review.author.role} {review.author.company && `chez ${review.author.company}`}
                </p>
              </div>
            </div>
            {review.featured && (
              <Badge variant="default" className="bg-blue-100 text-blue-800">
                Featured
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <StarRating rating={review.rating} size="md" />
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {review.platform && (
                <span>via {review.platform}</span>
              )}
              {review.date && (
                <span>{new Date(review.date).toLocaleDateString('fr-FR')}</span>
              )}
            </div>
          </div>

          {review.title && (
            <CardTitle className="text-lg">{review.title}</CardTitle>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <blockquote className={cn(
            "text-sm leading-relaxed",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            <Quote className="w-4 h-4 text-gray-400 mb-2" />
            {review.content}
          </blockquote>

          {review.tags && review.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {review.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {review.responses && review.responses.length > 0 && (
            <div className={cn(
              "border-l-4 border-blue-500 pl-4 py-2",
              theme === "dark" ? "bg-gray-900/50" : "bg-blue-50/50"
            )}>
              <div className="text-xs font-medium text-blue-600 mb-1">
                Réponse de {review.responses[0].from}
              </div>
              <p className="text-sm">{review.responses[0].content}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              {review.helpful && (
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{review.helpful}</span>
                </button>
              )}
              <button className="flex items-center space-x-1 hover:text-gray-700">
                <MessageSquare className="w-3 h-3" />
                <span>Répondre</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-gray-700">
                <Share2 className="w-3 h-3" />
                <span>Partager</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default grid variant
  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg",
      theme === "dark" && "bg-gray-800 border-gray-700",
      review.featured && "ring-2 ring-blue-500 ring-opacity-50"
    )}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <StarRating rating={review.rating} />
          {review.platform && (
            <span className={cn(
              "text-xs px-2 py-1 rounded",
              theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
            )}>
              {review.platform}
            </span>
          )}
        </div>
        {review.title && (
          <CardTitle className="text-lg leading-tight">{review.title}</CardTitle>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <blockquote className={cn(
          "text-sm leading-relaxed",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          {review.content}
        </blockquote>

        <div className="flex items-center space-x-3">
          {review.author.avatar ? (
            <img 
              src={review.author.avatar} 
              alt={review.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {review.author.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <p className="font-medium text-sm">{review.author.name}</p>
              {review.author.verified && (
                <Check className="w-4 h-4 text-green-500" />
              )}
            </div>
            <p className={cn(
              "text-xs",
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            )}>
              {review.author.role} {review.author.company && `chez ${review.author.company}`}
            </p>
          </div>
        </div>

        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {review.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ReviewsSection({
  variant = "grid",
  title = "Ce que disent nos clients",
  description = "Découvrez les témoignages authentiques de nos utilisateurs qui nous font confiance au quotidien.",
  reviews = defaultReviews,
  showRating = true,
  showStats = true,
  showPlatforms = true,
  showFilters = false,
  maxReviews,
  className,
  theme = "light",
  onLoadMore,
  onFilterChange
}: ReviewsSectionProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [selectedFilter, setSelectedFilter] = React.useState("all");
  
  const displayedReviews = maxReviews ? reviews.slice(0, maxReviews) : reviews;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const stats = [
    { icon: Star, value: averageRating.toFixed(1), label: "Note moyenne", color: "text-yellow-500" },
    { icon: MessageSquare, value: `${totalReviews}+`, label: "Avis clients", color: "text-blue-500" },
    { icon: Users, value: "95%", label: "Satisfaction", color: "text-green-500" },
    { icon: Award, value: "4.8/5", label: "Score qualité", color: "text-purple-500" }
  ];

  const platforms = ["Trustpilot", "Google", "Capterra", "G2", "GetApp"];
  const filters = ["all", "5-stars", "recent", "featured"];

  const getGridClasses = () => {
    switch (variant) {
      case "compact":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
      case "detailed":
        return "grid grid-cols-1 lg:grid-cols-2 gap-8";
      case "masonry":
        return "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  if (variant === "carousel") {
    const slidesToShow = 3;
    const maxSlides = Math.ceil(displayedReviews.length / slidesToShow);

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
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={cn(
                    "inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3",
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  )}>
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className={cn(
                    "text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  )}>
                    {stat.label}
                  </div>
                </div>
              ))}
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {displayedReviews
                        .slice(slideIndex * slidesToShow, (slideIndex + 1) * slidesToShow)
                        .map((review) => (
                          <ReviewCard 
                            key={review.id} 
                            review={review} 
                            variant="grid"
                            theme={theme}
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

  if (variant === "featured") {
    const featuredReviews = reviews.filter(review => review.featured);
    const regularReviews = reviews.filter(review => !review.featured);

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

          {/* Featured Reviews */}
          {featuredReviews.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Témoignages mis en avant
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredReviews.slice(0, 2).map((review) => (
                  <ReviewCard 
                    key={review.id} 
                    review={review} 
                    variant="detailed"
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regularReviews.slice(0, 6).map((review) => (
              <ReviewCard 
                key={review.id} 
                review={review} 
                variant="grid"
                theme={theme}
              />
            ))}
          </div>

          {/* Load More */}
          {reviews.length > 8 && (
            <div className="text-center mt-12">
              <Button onClick={onLoadMore} className="group">
                Voir plus d'avis
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
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

        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={cn(
                  "inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3",
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedFilter(filter);
                  onFilterChange?.(filter);
                }}
              >
                {filter === "all" && "Tous"}
                {filter === "5-stars" && "5 étoiles"}
                {filter === "recent" && "Récents"}
                {filter === "featured" && "Mis en avant"}
              </Button>
            ))}
          </div>
        )}

        {/* Reviews Grid */}
        <div className={getGridClasses()}>
          {displayedReviews.map((review) => (
            <div key={review.id} className={variant === "masonry" ? "break-inside-avoid" : ""}>
              <ReviewCard review={review} variant={variant} theme={theme} />
            </div>
          ))}
        </div>

        {/* Platforms */}
        {showPlatforms && (
          <div className="text-center mt-12">
            <p className={cn(
              "text-sm mb-4",
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            )}>
              Avis collectés sur les plateformes :
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {platforms.map((platform) => (
                <Badge key={platform} variant="outline" className="text-sm">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Load More */}
        {reviews.length > displayedReviews.length && (
          <div className="text-center mt-12">
            <Button onClick={onLoadMore} variant="outline" className="group">
              Charger plus d'avis
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export type { ReviewsSectionProps, Review };
