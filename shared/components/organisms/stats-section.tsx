"use client";

import React from "react";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { 
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Star,
  Award,
  Target,
  Clock,
  Globe,
  CheckCircle,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Minus,
  Calendar,
  Building,
  Heart,
  Coffee,
  Zap,
  Shield
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Statistic {
  id: string;
  label: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
    period: string;
  };
  icon?: React.ElementType;
  color?: string;
  suffix?: string;
  prefix?: string;
  description?: string;
  category?: string;
}

interface StatsSectionProps {
  variant?: "grid" | "cards" | "minimal" | "detailed" | "timeline" | "comparison";
  title?: string;
  description?: string;
  stats?: Statistic[];
  columns?: 2 | 3 | 4 | 5;
  showTrends?: boolean;
  showIcons?: boolean;
  showDescriptions?: boolean;
  animateOnView?: boolean;
  className?: string;
  theme?: "light" | "dark";
}

const defaultStats: Statistic[] = [
  {
    id: "1",
    label: "Clients satisfaits",
    value: 2500,
    change: { value: 12, type: "increase", period: "ce mois" },
    icon: Users,
    color: "text-blue-600",
    suffix: "+",
    description: "Clients ayant donné une note de 4/5 ou plus",
    category: "clients"
  },
  {
    id: "2",
    label: "Chiffre d'affaires",
    value: "1.2M",
    change: { value: 8, type: "increase", period: "cette année" },
    icon: DollarSign,
    color: "text-green-600",
    prefix: "",
    suffix: "€",
    description: "Revenus générés cette année",
    category: "financier"
  },
  {
    id: "3",
    label: "Projets réalisés",
    value: 450,
    change: { value: 15, type: "increase", period: "ce trimestre" },
    icon: CheckCircle,
    color: "text-purple-600",
    suffix: "+",
    description: "Projets livrés avec succès",
    category: "projets"
  },
  {
    id: "4",
    label: "Note moyenne",
    value: 4.9,
    change: { value: 2, type: "increase", period: "ce mois" },
    icon: Star,
    color: "text-yellow-600",
    suffix: "/5",
    description: "Note moyenne de nos clients",
    category: "qualité"
  },
  {
    id: "5",
    label: "Années d'expérience",
    value: 12,
    icon: Award,
    color: "text-orange-600",
    suffix: " ans",
    description: "D'expertise dans le domaine",
    category: "expérience"
  },
  {
    id: "6",
    label: "Équipe",
    value: 25,
    change: { value: 4, type: "increase", period: "cette année" },
    icon: Building,
    color: "text-indigo-600",
    description: "Professionnels dédiés",
    category: "équipe"
  },
  {
    id: "7",
    label: "Temps de réponse",
    value: "2h",
    change: { value: 30, type: "decrease", period: "ce mois" },
    icon: Clock,
    color: "text-red-600",
    description: "Temps moyen de première réponse",
    category: "support"
  },
  {
    id: "8",
    label: "Disponibilité",
    value: 99.9,
    change: { value: 0.1, type: "increase", period: "ce mois" },
    icon: Shield,
    color: "text-green-600",
    suffix: "%",
    description: "Uptime de nos services",
    category: "technique"
  }
];

function StatCard({ 
  stat, 
  variant = "grid",
  showTrends = true,
  showIcons = true,
  showDescriptions = false,
  animateOnView = true,
  theme = "light" 
}: { 
  stat: Statistic;
  variant?: StatsSectionProps['variant'];
  showTrends?: boolean;
  showIcons?: boolean;
  showDescriptions?: boolean;
  animateOnView?: boolean;
  theme?: "light" | "dark";
}) {
  const [isVisible, setIsVisible] = React.useState(!animateOnView);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!animateOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [animateOnView]);

  const getTrendIcon = () => {
    if (!stat.change) return null;
    
    switch (stat.change.type) {
      case "increase":
        return <ArrowUp className="w-4 h-4 text-green-500" />;
      case "decrease":
        return <ArrowDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    if (!stat.change) return "text-gray-500";
    
    switch (stat.change.type) {
      case "increase":
        return "text-green-500";
      case "decrease":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  if (variant === "minimal") {
    return (
      <div 
        ref={cardRef}
        className={cn(
          "text-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {showIcons && stat.icon && (
          <div className={cn(
            "inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3",
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          )}>
            <stat.icon className={cn("w-6 h-6", stat.color)} />
          </div>
        )}
        
        <div className="text-3xl font-bold mb-1">
          {stat.prefix}{stat.value}{stat.suffix}
        </div>
        
        <div className={cn(
          "text-sm",
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        )}>
          {stat.label}
        </div>

        {showTrends && stat.change && (
          <div className={cn("flex items-center justify-center mt-2 text-xs", getTrendColor())}>
            {getTrendIcon()}
            <span className="ml-1">
              {stat.change.value}% {stat.change.period}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <Card 
        ref={cardRef}
        className={cn(
          "transition-all duration-1000 hover:shadow-lg",
          theme === "dark" && "bg-gray-800 border-gray-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {showIcons && stat.icon && (
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                )}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
              )}
              <div>
                <div className="text-2xl font-bold">
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div className={cn(
                  "text-sm font-medium",
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                )}>
                  {stat.label}
                </div>
              </div>
            </div>

            {showTrends && stat.change && (
              <div className={cn(
                "flex items-center px-2 py-1 rounded-lg text-xs font-medium",
                stat.change.type === "increase" && "bg-green-100 text-green-800",
                stat.change.type === "decrease" && "bg-red-100 text-red-800",
                stat.change.type === "neutral" && "bg-gray-100 text-gray-800",
                theme === "dark" && stat.change.type === "increase" && "bg-green-900/30 text-green-400",
                theme === "dark" && stat.change.type === "decrease" && "bg-red-900/30 text-red-400",
                theme === "dark" && stat.change.type === "neutral" && "bg-gray-800 text-gray-400"
              )}>
                {getTrendIcon()}
                <span className="ml-1">{stat.change.value}%</span>
              </div>
            )}
          </div>

          {showDescriptions && stat.description && (
            <div className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              {stat.description}
            </div>
          )}

          {stat.change && (
            <div className={cn(
              "text-xs mt-2",
              theme === "dark" ? "text-gray-500" : "text-gray-500"
            )}>
              {stat.change.period}
            </div>
          )}

          {stat.category && (
            <Badge variant="outline" className="mt-3 text-xs">
              {stat.category}
            </Badge>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default grid variant
  return (
    <Card 
      ref={cardRef}
      className={cn(
        "text-center transition-all duration-1000 hover:shadow-lg",
        theme === "dark" && "bg-gray-800 border-gray-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <CardContent className="p-6">
        {showIcons && stat.icon && (
          <div className={cn(
            "inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4",
            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
          )}>
            <stat.icon className={cn("w-6 h-6", stat.color)} />
          </div>
        )}
        
        <div className="text-3xl font-bold mb-2">
          {stat.prefix}{stat.value}{stat.suffix}
        </div>
        
        <div className={cn(
          "text-sm font-medium mb-2",
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        )}>
          {stat.label}
        </div>

        {showDescriptions && stat.description && (
          <div className={cn(
            "text-xs mb-3",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>
            {stat.description}
          </div>
        )}

        {showTrends && stat.change && (
          <div className={cn("flex items-center justify-center text-xs", getTrendColor())}>
            {getTrendIcon()}
            <span className="ml-1">
              {stat.change.value}% {stat.change.period}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsSection({
  variant = "grid",
  title = "Nos Performances",
  description = "Découvrez les chiffres qui témoignent de notre expertise et de la confiance que nous accordent nos clients.",
  stats = defaultStats,
  columns = 4,
  showTrends = true,
  showIcons = true,
  showDescriptions = false,
  animateOnView = true,
  className,
  theme = "light"
}: StatsSectionProps) {
  const getGridClasses = () => {
    const colsMap = {
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4",
      5: "md:grid-cols-3 lg:grid-cols-5"
    };
    
    return `grid grid-cols-1 ${colsMap[columns]} gap-6`;
  };

  if (variant === "timeline") {
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

          {/* Timeline */}
          <div className="relative">
            <div className={cn(
              "absolute left-1/2 transform -translate-x-1/2 h-full w-0.5",
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            )} />
            
            <div className="space-y-12">
              {stats.map((stat, index) => (
                <div key={stat.id} className={cn(
                  "flex items-center",
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                )}>
                  <div className="flex-1">
                    <div className={cn(
                      "max-w-md",
                      index % 2 === 0 ? "ml-auto pr-8" : "mr-auto pl-8"
                    )}>
                      <StatCard 
                        stat={stat} 
                        variant="detailed"
                        showTrends={showTrends}
                        showIcons={showIcons}
                        showDescriptions={showDescriptions}
                        animateOnView={animateOnView}
                        theme={theme}
                      />
                    </div>
                  </div>
                  
                  <div className={cn(
                    "w-4 h-4 rounded-full border-4 border-white z-10",
                    theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                  )} />
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "comparison") {
    const categories = Array.from(new Set(stats.map(stat => stat.category).filter(Boolean)));
    
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

          {/* Categories */}
          {categories.map((category, categoryIndex) => {
            const categoryStats = stats.filter(stat => stat.category === category);
            
            return (
              <div key={category} className="mb-12 last:mb-0">
                <h3 className="text-xl font-semibold mb-6 text-center capitalize">
                  {category}
                </h3>
                
                <div className={getGridClasses()}>
                  {categoryStats.map((stat) => (
                    <StatCard 
                      key={stat.id}
                      stat={stat} 
                      variant={variant}
                      showTrends={showTrends}
                      showIcons={showIcons}
                      showDescriptions={showDescriptions}
                      animateOnView={animateOnView}
                      theme={theme}
                    />
                  ))}
                </div>
              </div>
            );
          })}
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

        {/* Stats Grid */}
        <div className={getGridClasses()}>
          {stats.map((stat) => (
            <StatCard 
              key={stat.id}
              stat={stat} 
              variant={variant}
              showTrends={showTrends}
              showIcons={showIcons}
              showDescriptions={showDescriptions}
              animateOnView={animateOnView}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export type { StatsSectionProps, Statistic };
