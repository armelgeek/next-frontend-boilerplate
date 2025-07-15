"use client";

import { Button } from "@/shared/components/atoms/ui/button";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Input } from "@/shared/components/atoms/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/ui/avatar";
import { 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Star,
  Users,
  Trophy,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  ExternalLink,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  Camera,
  Heart,
  Share,
  ShoppingCart,
  Clock,
  Calendar,
  MapPin,
  Target,
  Rocket,
  Sparkles,
  Crown,
  Gift,
  Megaphone,
  Briefcase,
  Code,
  Palette,
  Layers,
  MousePointer,
  Eye,
  Headphones,
  Coffee,
  BookOpen,
  Award,
  Building,
  Lightbulb,
  Workflow,
  Utensils
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import React from "react";

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
  variant?: 
    "default" | "centered" | "split" | "video" | "minimal" | "gradient" |
    "fullscreen" | "carousel" | "parallax" | "animated" | "interactive" |
    "showcase" | "landing" | "saas" | "startup" | "creative" | "portfolio" |
    "blog" | "ecommerce" | "app" | "corporate" | "restaurant";
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
  slides?: Array<{
    title: string;
    description: string;
    image?: string;
    video?: string;
  }>;
  testimonial?: {
    text: string;
    author: string;
    role: string;
    avatar?: string;
    company?: string;
  };
  announcement?: {
    text: string;
    link?: string;
    urgent?: boolean;
  };
  countdown?: {
    target: Date;
    label: string;
  };
  products?: Array<{
    name: string;
    price: string;
    image: string;
    badge?: string;
  }>;
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
  onSearch,
  slides = [],
  testimonial,
  announcement,
  countdown,
  products = []
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Fullscreen Hero
  if (variant === "fullscreen") {
    return (
      <section className={cn(
        "min-h-screen flex items-center justify-center relative overflow-hidden",
        backgroundPattern && "bg-gradient-to-br from-blue-50 via-white to-purple-50",
        className
      )}>
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {image && (
            <img 
              src={image} 
              alt="Hero background"
              className="w-full h-full object-cover opacity-20"
            />
          )}
          {video && (
            <video 
              autoPlay 
              muted 
              loop 
              className="w-full h-full object-cover opacity-20"
            >
              <source src={video} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          {badge && (
            <Badge className="mb-6 px-4 py-2 text-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              {badge}
            </Badge>
          )}
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
              {subtitle}
            </p>
          )}
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="lg"
                className="text-lg px-8 py-4 h-auto"
                onClick={action.onClick}
              >
                {action.label}
                {action.icon}
              </Button>
            ))}
          </div>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Carousel Hero
  if (variant === "carousel") {
    const currentSlideData = slides[currentSlide] || { title, description, image, video };
    
    return (
      <section className={cn("relative py-20 overflow-hidden", className)}>
        {/* Background */}
        <div className="absolute inset-0">
          {currentSlideData.image && (
            <img 
              src={currentSlideData.image}
              alt="Slide background"
              className="w-full h-full object-cover"
            />
          )}
          {currentSlideData.video && (
            <video 
              autoPlay 
              muted 
              loop 
              className="w-full h-full object-cover"
            >
              <source src={currentSlideData.video} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            {badge && (
              <Badge className="mb-6 bg-white text-gray-900">
                {badge}
              </Badge>
            )}
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {currentSlideData.title}
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 opacity-90">
              {currentSlideData.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  onClick={action.onClick}
                >
                  {action.label}
                  {action.icon}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </section>
    );
  }

  // Parallax Hero
  if (variant === "parallax") {
    return (
      <section className={cn("relative py-32 overflow-hidden", className)}>
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 transform scale-110"
          style={{
            backgroundImage: image ? `url(${image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 opacity-80" />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          {badge && (
            <Badge className="mb-6 bg-white bg-opacity-20 text-white border-white border-opacity-30">
              <Crown className="w-4 h-4 mr-2" />
              {badge}
            </Badge>
          )}
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-2xl md:text-3xl font-light mb-6 opacity-90">
              {subtitle}
            </p>
          )}
          
          <p className="text-xl text-white text-opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Actions with animation */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="border-white border-2 text-white bg-transparent hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                onClick={action.onClick}
              >
                {action.label}
                {action.icon}
              </Button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Animated Hero
  if (variant === "animated") {
    return (
      <section className={cn("relative py-24 overflow-hidden", className)}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Floating shapes */}
              <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse" />
              <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {badge && (
              <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white animate-bounce">
                <Zap className="w-4 h-4 mr-2" />
                {badge}
              </Badge>
            )}
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent animate-fade-in-up">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {subtitle}
              </p>
            )}
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {description}
            </p>

            {/* Interactive Actions */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="lg"
                  className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={action.onClick}
                >
                  {action.label}
                  {action.icon}
                </Button>
              ))}
            </div>

            {/* Animated Features */}
            {features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                {features.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
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

  // Interactive Hero
  if (variant === "interactive") {
    return (
      <section className={cn("relative py-24 overflow-hidden", className)}>
        {/* Interactive Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-white border-opacity-10 hover:bg-white hover:bg-opacity-5 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          {badge && (
            <Badge className="mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 animate-pulse">
              <MousePointer className="w-4 h-4 mr-2" />
              {badge}
            </Badge>
          )}
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 hover:scale-105 transition-transform duration-300 cursor-pointer">
            {title}
          </h1>
          
          <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            {description}
          </p>

          {/* Interactive Elements */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group p-6 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="text-3xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Hover Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 group transform hover:scale-105"
                onClick={action.onClick}
              >
                <span className="group-hover:mr-2 transition-all duration-300">{action.label}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Showcase Hero
  if (variant === "showcase") {
    return (
      <section className={cn("relative py-32", className)}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {badge && (
                <Badge className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  {badge}
                </Badge>
              )}
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                {title}
              </h1>
              
              {subtitle && (
                <h2 className="text-2xl font-medium text-gray-700 mb-6">
                  {subtitle}
                </h2>
              )}
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {description}
              </p>

              {/* Feature List */}
              {features.length > 0 && (
                <div className="space-y-4 mb-8">
                  {features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{feature.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant}
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={action.onClick}
                  >
                    {action.label}
                    {action.icon}
                  </Button>
                ))}
              </div>
            </div>

            {/* Right Showcase */}
            <div className="relative">
              {image && (
                <div className="relative">
                  <img 
                    src={image} 
                    alt="Showcase"
                    className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Elements */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80 animate-pulse" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Landing Hero
  if (variant === "landing") {
    return (
      <section className={cn("relative py-24 overflow-hidden", className)}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        
        {/* Announcement Bar */}
        {announcement && (
          <div className={cn(
            "absolute top-0 left-0 right-0 z-20 py-3 px-4 text-center text-sm",
            announcement.urgent ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          )}>
            <div className="max-w-4xl mx-auto flex items-center justify-center space-x-2">
              {announcement.urgent && <Megaphone className="w-4 h-4" />}
              <span>{announcement.text}</span>
              {announcement.link && (
                <a href={announcement.link} className="underline hover:no-underline">
                  En savoir plus
                </a>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className={cn("relative z-10 max-w-6xl mx-auto px-4 text-center", announcement && "pt-16")}>
          {badge && (
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-6 py-2">
              <Rocket className="w-5 h-5 mr-2" />
              {badge}
            </Badge>
          )}
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Search Bar */}
          {searchable && (
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                  onClick={() => onSearch?.(searchQuery)}
                >
                  Rechercher
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="lg"
                className="text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={action.onClick}
              >
                {action.label}
                {action.icon}
              </Button>
            ))}
          </div>

          {/* Trust Indicators */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // SaaS Hero
  if (variant === "saas") {
    return (
      <section className={cn("relative py-24", className)}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            {badge && (
              <Badge className="mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <Workflow className="w-4 h-4 mr-2" />
                {badge}
              </Badge>
            )}
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              {title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={action.onClick}
                >
                  {action.label}
                  {action.icon}
                </Button>
              ))}
            </div>

            {/* Social Proof */}
            {testimonial && (
              <Card className="max-w-2xl mx-auto mb-12 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-1 mb-4 justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    {testimonial.avatar && (
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                      {testimonial.company && (
                        <div className="text-sm text-gray-500">{testimonial.company}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* App Preview */}
          {image && (
            <div className="text-center">
              <img 
                src={image} 
                alt="SaaS Preview"
                className="max-w-full h-auto rounded-2xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  // Startup Hero
  if (variant === "startup") {
    return (
      <section className={cn("relative py-32 overflow-hidden", className)}>
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          {badge && (
            <Badge className="mb-6 bg-gradient-to-r from-pink-500 to-orange-500 text-white animate-bounce">
              <Lightbulb className="w-4 h-4 mr-2" />
              {badge}
            </Badge>
          )}
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in-up">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            {description}
          </p>

          {/* Countdown Timer */}
          {countdown && (
            <div className="mb-12">
              <div className="text-lg mb-4 opacity-80">{countdown.label}</div>
              <div className="flex justify-center space-x-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-3xl font-bold">12</div>
                  <div className="text-sm">Jours</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-3xl font-bold">05</div>
                  <div className="text-sm">Heures</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-3xl font-bold">23</div>
                  <div className="text-sm">Minutes</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="border-white border-2 text-white bg-transparent hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                onClick={action.onClick}
              >
                {action.label}
                {action.icon}
              </Button>
            ))}
          </div>

          {/* Floating Stats */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Creative Hero
  if (variant === "creative") {
    return (
      <section className={cn("relative py-32 overflow-hidden", className)}>
        {/* Artistic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
            <div className="absolute inset-0 opacity-40">
              <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="creative-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                    <circle cx="25" cy="25" r="2" fill="white" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#creative-pattern)" />
              </svg>
            </div>
          </div>
          
          {/* Floating Creative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-16 h-16 border-4 border-white border-opacity-30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute top-40 right-32 w-20 h-20 bg-white bg-opacity-20 transform rotate-45 animate-pulse" />
            <div className="absolute bottom-32 left-1/4 w-12 h-24 bg-gradient-to-t from-yellow-400 to-transparent opacity-60 animate-bounce" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          {badge && (
            <Badge className="mb-6 bg-white bg-opacity-20 text-white border-white border-opacity-30 animate-pulse">
              <Palette className="w-4 h-4 mr-2" />
              {badge}
            </Badge>
          )}
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 transform hover:scale-105 transition-transform duration-500">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            {description}
          </p>

          {/* Creative Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="border-white border-2 text-white bg-transparent hover:bg-white hover:text-purple-600 transition-all duration-500 transform hover:rotate-2 hover:scale-110"
                onClick={action.onClick}
              >
                {action.label}
                {action.icon}
              </Button>
            ))}
          </div>

          {/* Creative Grid */}
          {features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.slice(0, 3).map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 hover:rotate-1 transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center text-white transform hover:rotate-180 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="opacity-80">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Portfolio Hero
  if (variant === "portfolio") {
    return (
      <section className={cn("relative py-24", className)}>
        {/* Elegant Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              {badge && (
                <Badge className="mb-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <Camera className="w-4 h-4 mr-2" />
                  {badge}
                </Badge>
              )}
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {description}
              </p>

              {/* Skills/Specialties */}
              {features.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {features.slice(0, 5).map((feature, index) => (
                    <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                      {feature.title}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant}
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={action.onClick}
                  >
                    {action.label}
                    {action.icon}
                  </Button>
                ))}
              </div>

              {/* Stats */}
              {stats.length > 0 && (
                <div className="grid grid-cols-3 gap-6 mt-12">
                  {stats.slice(0, 3).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-amber-400 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Portfolio Preview */}
            <div className="relative">
              {image && (
                <div className="relative">
                  <img 
                    src={image} 
                    alt="Portfolio preview"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 rounded-lg" />
                  {/* Play button for video portfolio */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 rounded-full w-16 h-16 p-0"
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Blog Hero
  if (variant === "blog") {
    return (
      <section className={cn("relative py-20", className)}>
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {badge && (
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              {badge}
            </Badge>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher des articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-4 text-lg rounded-lg border-2 border-gray-200 focus:border-blue-500"
              />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => onSearch?.(searchQuery)}
              >
                Rechercher
              </Button>
            </div>
          </div>

          {/* Categories */}
          {features.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {features.map((feature, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  {feature.title}
                </Button>
              ))}
            </div>
          )}

          {/* Newsletter Signup */}
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <div className="flex gap-2">
                <Input placeholder="Votre email" className="flex-1" />
                <Button>S'abonner</Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Recevez les derniers articles chaque semaine
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // E-commerce Hero
  if (variant === "ecommerce") {
    return (
      <section className={cn("relative py-24", className)}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {badge && (
                <Badge className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {badge}
                </Badge>
              )}
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                {title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {description}
              </p>

              {/* Special Offer */}
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg mb-8">
                <div className="flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span className="font-semibold">Offre spéciale :</span>
                  <span>-30% sur votre première commande</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant}
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={action.onClick}
                  >
                    {action.label}
                    {action.icon}
                  </Button>
                ))}
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div className="space-y-3">
                  {features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="text-gray-700">{feature.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Product Showcase */}
            <div>
              {products.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {products.slice(0, 4).map((product, index) => (
                    <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <CardContent className="p-4">
                        {product.badge && (
                          <Badge className="mb-2 bg-red-500 text-white">
                            {product.badge}
                          </Badge>
                        )}
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                        <div className="text-emerald-600 font-bold">{product.price}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : image && (
                <img 
                  src={image} 
                  alt="E-commerce showcase"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // App Hero
  if (variant === "app") {
    return (
      <section className={cn("relative py-24 overflow-hidden", className)}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-full bg-white bg-opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
              }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              {badge && (
                <Badge className="mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900">
                  <Smartphone className="w-4 h-4 mr-2" />
                  {badge}
                </Badge>
              )}
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {title}
              </h1>
              
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                {description}
              </p>

              {/* App Features */}
              {features.length > 0 && (
                <div className="space-y-4 mb-8">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <span className="text-indigo-100">{feature.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  App Store
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Google Play
                </Button>
              </div>
            </div>

            {/* Right App Mockup */}
            <div className="relative">
              {image && (
                <div className="relative max-w-sm mx-auto">
                  <img 
                    src={image} 
                    alt="App mockup"
                    className="w-full h-auto"
                  />
                  {/* Floating UI Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center text-white animate-bounce">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center text-white animate-pulse">
                    <Star className="w-6 h-6" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Corporate Hero
  if (variant === "corporate") {
    return (
      <section className={cn("relative py-24", className)}>
        {/* Professional Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            {badge && (
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <Building className="w-4 h-4 mr-2" />
                {badge}
              </Badge>
            )}
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              {title}
            </h1>
            
            {subtitle && (
              <h2 className="text-2xl md:text-3xl text-blue-600 font-medium mb-6">
                {subtitle}
              </h2>
            )}
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>

            {/* Trust Indicators */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-sm uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={action.onClick}
                >
                  {action.label}
                  {action.icon}
                </Button>
              ))}
            </div>

            {/* Company Values/Features */}
            {features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.slice(0, 3).map((feature, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Restaurant Hero
  if (variant === "restaurant") {
    return (
      <section className={cn("relative py-24", className)}>
        {/* Restaurant Background with warm amber tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D97706' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            {badge && (
              <Badge className="mb-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
                <Utensils className="w-4 h-4 mr-2" />
                {badge}
              </Badge>
            )}
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-amber-900 leading-tight">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-xl md:text-2xl text-amber-800 mb-6 font-medium">
                {subtitle}
              </p>
            )}
            
            <p className="text-lg text-amber-700 mb-10 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
            
            {/* Action Buttons */}
            {actions.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant}
                    size="lg"
                    className={cn(
                      "shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4",
                      action.variant === "default" 
                        ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0" 
                        : "border-2 border-amber-600 text-amber-800 hover:bg-amber-600 hover:text-white"
                    )}
                    onClick={action.onClick}
                  >
                    {action.label}
                    {action.icon}
                  </Button>
                ))}
              </div>
            )}

            {/* Restaurant Features */}
            {features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.slice(0, 3).map((feature, index) => (
                  <Card key={index} className="border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-amber-900">
                        {feature.title}
                      </h3>
                      <p className="text-amber-700 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Restaurant Stats */}
            {stats.length > 0 && (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-amber-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-amber-700 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className={cn("py-24", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {badge && (
            <Badge className="mb-6">
              {badge}
            </Badge>
          )}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            {title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
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
      </div>
    </section>
  );
}
