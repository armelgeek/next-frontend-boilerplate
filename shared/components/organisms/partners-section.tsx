"use client";

import React from "react";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Button } from "@/shared/components/atoms/ui/button";
import { 
  ArrowRight,
  ExternalLink,
  Star,
  Quote,
  Users,
  Building,
  Globe,
  Award,
  TrendingUp,
  CheckCircle,
  Calendar,
  MapPin
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  category: string;
  featured?: boolean;
  partnership?: {
    since: string;
    type: "client" | "partner" | "sponsor" | "vendor";
    projects?: number;
    testimonial?: string;
  };
  location?: string;
  size?: "startup" | "sme" | "enterprise" | "corporation";
}

interface PartnersSectionProps {
  variant?: "grid" | "logos" | "carousel" | "testimonials" | "detailed" | "categories";
  title?: string;
  description?: string;
  partners?: Partner[];
  showCategories?: boolean;
  showDetails?: boolean;
  showTestimonials?: boolean;
  maxPartners?: number;
  autoplay?: boolean;
  className?: string;
  theme?: "light" | "dark";
  onPartnerClick?: (partner: Partner) => void;
}

const defaultPartners: Partner[] = [
  {
    id: "1",
    name: "TechCorp Global",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=80&fit=crop",
    website: "https://techcorp.example.com",
    description: "Leader mondial des solutions technologiques innovantes",
    category: "Technologie",
    featured: true,
    partnership: {
      since: "2020",
      type: "client",
      projects: 15,
      testimonial: "Une équipe exceptionnelle qui a transformé notre vision en réalité."
    },
    location: "San Francisco, CA",
    size: "corporation"
  },
  {
    id: "2",
    name: "Green Energy Solutions",
    logo: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=200&h=80&fit=crop",
    website: "https://greenenergy.example.com",
    description: "Pionniers des énergies renouvelables",
    category: "Énergie",
    featured: true,
    partnership: {
      since: "2021",
      type: "partner",
      projects: 8,
      testimonial: "Un partenariat qui a accéléré notre transition énergétique."
    },
    location: "Amsterdam, NL",
    size: "enterprise"
  },
  {
    id: "3",
    name: "FinTech Innovations",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=80&fit=crop",
    website: "https://fintech.example.com",
    description: "Révolutionner les services financiers",
    category: "Finance",
    partnership: {
      since: "2022",
      type: "client",
      projects: 12
    },
    location: "London, UK",
    size: "enterprise"
  },
  {
    id: "4",
    name: "Healthcare Plus",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=80&fit=crop",
    website: "https://healthcareplus.example.com",
    description: "Solutions de santé numérique",
    category: "Santé",
    partnership: {
      since: "2019",
      type: "client",
      projects: 20,
      testimonial: "Ils ont digitalisé notre système de santé avec brio."
    },
    location: "Toronto, CA",
    size: "enterprise"
  },
  {
    id: "5",
    name: "EduTech Academy",
    logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&h=80&fit=crop",
    website: "https://edutech.example.com",
    description: "Plateforme d'apprentissage en ligne",
    category: "Éducation",
    partnership: {
      since: "2023",
      type: "client",
      projects: 5
    },
    location: "Sydney, AU",
    size: "sme"
  },
  {
    id: "6",
    name: "RetailMax",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=80&fit=crop",
    website: "https://retailmax.example.com",
    description: "Chaîne de magasins moderne",
    category: "Retail",
    partnership: {
      since: "2021",
      type: "client",
      projects: 10
    },
    location: "New York, NY",
    size: "corporation"
  },
  {
    id: "7",
    name: "StartupLab",
    logo: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=200&h=80&fit=crop",
    website: "https://startuplab.example.com",
    description: "Incubateur de startups tech",
    category: "Incubateur",
    partnership: {
      since: "2022",
      type: "sponsor",
      projects: 3
    },
    location: "Berlin, DE",
    size: "startup"
  },
  {
    id: "8",
    name: "AutoDrive Systems",
    logo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=80&fit=crop",
    website: "https://autodrive.example.com",
    description: "Véhicules autonomes du futur",
    category: "Automobile",
    featured: true,
    partnership: {
      since: "2020",
      type: "partner",
      projects: 7,
      testimonial: "Innovation et excellence technique au rendez-vous."
    },
    location: "Detroit, MI",
    size: "enterprise"
  }
];

function PartnerCard({ 
  partner, 
  variant = "grid",
  showDetails = false,
  showTestimonials = false,
  theme = "light",
  onPartnerClick 
}: { 
  partner: Partner;
  variant?: PartnersSectionProps['variant'];
  showDetails?: boolean;
  showTestimonials?: boolean;
  theme?: "light" | "dark";
  onPartnerClick?: (partner: Partner) => void;
}) {
  
  if (variant === "logos") {
    return (
      <div 
        className={cn(
          "group relative p-6 rounded-lg border transition-all duration-300 hover:shadow-md cursor-pointer",
          theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}
        onClick={() => onPartnerClick?.(partner)}
      >
        <div className="flex items-center justify-center h-16">
          <img 
            src={partner.logo} 
            alt={partner.name}
            className="max-h-12 max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
          />
        </div>
        
        {partner.featured && (
          <Badge variant="default" className="absolute -top-2 -right-2 text-xs">
            ★
          </Badge>
        )}
      </div>
    );
  }

  if (variant === "testimonials" && partner.partnership?.testimonial) {
    return (
      <Card className={cn(
        "h-full transition-all duration-300 hover:shadow-lg",
        theme === "dark" && "bg-gray-800 border-gray-700"
      )}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <img 
              src={partner.logo} 
              alt={partner.name}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h3 className="font-semibold">{partner.name}</h3>
              <p className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}>
                {partner.category}
              </p>
            </div>
          </div>

          <blockquote className={cn(
            "text-sm leading-relaxed mb-4",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            <Quote className="w-4 h-4 text-gray-400 mb-2" />
            {partner.partnership.testimonial}
          </blockquote>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Partenaire depuis {partner.partnership.since}</span>
            {partner.partnership.projects && (
              <span>{partner.partnership.projects} projets</span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "group cursor-pointer transition-all duration-300 hover:shadow-lg",
      theme === "dark" && "bg-gray-800 border-gray-700",
      partner.featured && "ring-2 ring-blue-500 ring-opacity-50"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img 
              src={partner.logo} 
              alt={partner.name}
              className="w-16 h-16 object-contain"
            />
            <div>
              <h3 className="font-semibold text-lg">{partner.name}</h3>
              <Badge variant="outline" className="text-xs mt-1">
                {partner.category}
              </Badge>
            </div>
          </div>

          {partner.website && (
            <Button size="sm" variant="ghost" asChild>
              <a href={partner.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>

        {showDetails && partner.description && (
          <p className={cn(
            "text-sm mb-4",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>
            {partner.description}
          </p>
        )}

        {partner.partnership && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                {partner.partnership.type === "client" && "Client"}
                {partner.partnership.type === "partner" && "Partenaire"}
                {partner.partnership.type === "sponsor" && "Sponsor"}
                {partner.partnership.type === "vendor" && "Fournisseur"}
              </span>
              <span className="font-medium">depuis {partner.partnership.since}</span>
            </div>

            {partner.partnership.projects && (
              <div className="flex items-center justify-between text-sm">
                <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                  Projets réalisés
                </span>
                <span className="font-medium">{partner.partnership.projects}</span>
              </div>
            )}
          </div>
        )}

        {showTestimonials && partner.partnership?.testimonial && (
          <blockquote className={cn(
            "text-sm italic mt-4 p-3 rounded border-l-4 border-blue-500",
            theme === "dark" ? "bg-gray-900/50 text-gray-300" : "bg-blue-50/50 text-gray-600"
          )}>
            "{partner.partnership.testimonial}"
          </blockquote>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center text-xs text-gray-500">
            {partner.location && (
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {partner.location}
              </span>
            )}
          </div>
          
          {partner.size && (
            <Badge variant="secondary" className="text-xs">
              {partner.size === "startup" && "Startup"}
              {partner.size === "sme" && "PME"}
              {partner.size === "enterprise" && "Enterprise"}
              {partner.size === "corporation" && "Corporation"}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function PartnersSection({
  variant = "grid",
  title = "Nos Partenaires",
  description = "Découvrez les entreprises qui nous font confiance et avec lesquelles nous collaborons pour créer l'innovation.",
  partners = defaultPartners,
  showCategories = true,
  showDetails = true,
  showTestimonials = false,
  maxPartners,
  autoplay = false,
  className,
  theme = "light",
  onPartnerClick
}: PartnersSectionProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  
  const displayedPartners = maxPartners ? partners.slice(0, maxPartners) : partners;
  
  // Filter by category
  const filteredPartners = selectedCategory === "all" 
    ? displayedPartners 
    : displayedPartners.filter(partner => partner.category === selectedCategory);

  const categories = Array.from(new Set(partners.map(partner => partner.category)));
  const totalPartners = partners.length;
  const featuredPartners = partners.filter(partner => partner.featured).length;
  const totalProjects = partners.reduce((acc, partner) => acc + (partner.partnership?.projects || 0), 0);

  // Auto-carousel effect
  React.useEffect(() => {
    if (!autoplay || variant !== "carousel") return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % Math.ceil(filteredPartners.length / 4));
    }, 4000);

    return () => clearInterval(interval);
  }, [autoplay, variant, filteredPartners.length]);

  const getGridClasses = () => {
    switch (variant) {
      case "logos":
        return "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4";
      case "detailed":
        return "grid grid-cols-1 md:grid-cols-2 gap-8";
      case "testimonials":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  if (variant === "categories") {
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
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalPartners}+</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Partenaires
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{featuredPartners}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Partenaires premium
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{totalProjects}+</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Projets collaboratifs
              </div>
            </div>
          </div>

          {/* Categories */}
          {categories.map((category) => {
            const categoryPartners = partners.filter(partner => partner.category === category);
            
            return (
              <div key={category} className="mb-12 last:mb-0">
                <h3 className="text-xl font-semibold mb-6 text-center">
                  {category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryPartners.map((partner) => (
                    <PartnerCard 
                      key={partner.id}
                      partner={partner} 
                      variant="grid"
                      showDetails={showDetails}
                      showTestimonials={showTestimonials}
                      theme={theme}
                      onPartnerClick={onPartnerClick}
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

        {/* Stats */}
        {variant !== "logos" && (
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalPartners}+</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Partenaires
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{featuredPartners}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Partenaires premium
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{totalProjects}+</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Projets collaboratifs
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        {showCategories && categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
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

        {/* Partners Grid */}
        <div className={getGridClasses()}>
          {filteredPartners.map((partner) => (
            <PartnerCard 
              key={partner.id}
              partner={partner} 
              variant={variant}
              showDetails={showDetails}
              showTestimonials={showTestimonials}
              theme={theme}
              onPartnerClick={onPartnerClick}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className={cn(
            "inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-lg",
            theme === "dark" ? "bg-gray-800" : "bg-gray-50"
          )}>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-2">Devenez notre partenaire</h3>
              <p className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>
                Rejoignez notre écosystème d'innovation et développons ensemble l'avenir.
              </p>
            </div>
            <Button className="flex-shrink-0">
              Nous contacter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export type { PartnersSectionProps, Partner };
