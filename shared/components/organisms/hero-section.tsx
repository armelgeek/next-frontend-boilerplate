"use client";

import { Button } from "@/shared/components/atoms/ui/button";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Input } from "@/shared/components/atoms/ui/input";
import { 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Star,
  Users,
  Trophy,
  TrendingUp
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost";
  icon?: React.ReactNode;
}

interface HeroFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HeroStats {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface HeroSectionProps {
  variant?: "default" | "centered" | "split" | "video" | "minimal" | "gradient";
  title: string;
  subtitle?: string;
  description: string;
  actions?: HeroAction[];
  features?: HeroFeature[];
  stats?: HeroStats[];
  image?: string;
  video?: string;
  badge?: string;
  className?: string;
  backgroundPattern?: boolean;
  searchable?: boolean;
  onSearch?: (query: string) => void;
}

export function HeroSection({
  variant = "default",
  title,
  subtitle,
  description,
  actions = [],
  features = [],
  stats = [],
  image,
  video,
  badge,
  className,
  backgroundPattern = false,
  searchable = false,
  onSearch
}: HeroSectionProps) {
  if (variant === "minimal") {
    return (
      <section className={cn("py-20 text-center", className)}>
        <div className="max-w-4xl mx-auto px-4">
          {badge && (
            <Badge variant="secondary" className="mb-4">
              {badge}
            </Badge>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={action.onClick}
                >
                  {action.label}
                  {action.icon}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "gradient") {
    return (
      <section className={cn(
        "relative py-24 overflow-hidden",
        "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700",
        backgroundPattern && "before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-10",
        className
      )}>
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          {badge && (
            <Badge variant="outline" className="mb-6 border-white/20 text-white">
              {badge}
            </Badge>
          )}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-2xl mb-4 text-white/90">
              {subtitle}
            </p>
          )}
          <p className="text-xl mb-10 max-w-3xl mx-auto text-white/80">
            {description}
          </p>
          
          {searchable && (
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Input
                  placeholder="Rechercher..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-12"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
                <Button size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "secondary" : "outline"}
                  size="lg"
                  className={cn(
                    "flex items-center gap-2",
                    index === 0 ? "bg-white text-blue-600 hover:bg-white/90" : "border-white/20 text-white hover:bg-white/10"
                  )}
                  onClick={action.onClick}
                >
                  {action.label}
                  {action.icon}
                </Button>
              ))}
            </div>
          )}

          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  {stat.icon && <div className="mb-2 text-white/80">{stat.icon}</div>}
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {badge && (
                <Badge variant="secondary" className="mb-4">
                  {badge}
                </Badge>
              )}
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {title}
              </h1>
              {subtitle && (
                <p className="text-2xl mb-4 text-gray-600">
                  {subtitle}
                </p>
              )}
              <p className="text-lg text-gray-600 mb-8">
                {description}
              </p>
              
              {features.length > 0 && (
                <div className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-green-600 mt-1">{feature.icon}</div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {actions.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant}
                      size="lg"
                      className="flex items-center gap-2"
                      onClick={action.onClick}
                    >
                      {action.label}
                      {action.icon}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              {video ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="absolute inset-0 w-full h-full bg-black/50 hover:bg-black/40 text-white"
                  >
                    <Play className="w-16 h-16" />
                  </Button>
                  {image && (
                    <img
                      src={image}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ) : image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full rounded-xl shadow-2xl"
                />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-12 h-12" />
                    </div>
                    <p>Image ou vidéo</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "centered") {
    return (
      <section className={cn("py-24 text-center", className)}>
        <div className="max-w-5xl mx-auto px-4">
          {badge && (
            <Badge variant="secondary" className="mb-6">
              {badge}
            </Badge>
          )}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-2xl mb-6 text-gray-600">
              {subtitle}
            </p>
          )}
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            {description}
          </p>

          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={action.onClick}
                >
                  {action.label}
                  {action.icon}
                </Button>
              ))}
            </div>
          )}

          {image && (
            <div className="relative max-w-4xl mx-auto">
              <img
                src={image}
                alt={title}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
          )}

          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    {stat.icon && <div className="mb-3 text-blue-600">{stat.icon}</div>}
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className={cn("py-20", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          {badge && (
            <Badge variant="secondary" className="mb-4">
              {badge}
            </Badge>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-2xl mb-4 text-gray-600">
              {subtitle}
            </p>
          )}
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            {description}
          </p>
          
          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={action.onClick}
                >
                  {action.label}
                  {action.icon}
                </Button>
              ))}
            </div>
          )}
        </div>

        {image && (
          <div className="relative max-w-5xl mx-auto">
            <img
              src={image}
              alt={title}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
}
