"use client";

import React from "react";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Button } from "@/shared/components/atoms/ui/button";
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
  Music,
  Gamepad2,
  Coffee,
  Car,
  Home,
  Briefcase,
  GraduationCap,
  Globe,
  Zap,
  Ticket,
  PartyPopper,
  Building,
  Utensils,
  ShoppingBag,
  Palette,
  Plane,
  Mic,
  Camera,
  Dumbbell,
  Monitor
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface EventItem {
  id: string;
  title: string;
  description: string;
  type: "conference" | "workshop" | "webinar" | "meetup" | "concert" | "exhibition" | "sports" | "networking" | "launch" | "festival";
  category: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  location: {
    venue?: string;
    address?: string;
    city: string;
    country?: string;
    online?: boolean;
    hybrid?: boolean;
  };
  organizer: {
    name: string;
    avatar?: string;
    organization?: string;
    verified?: boolean;
  };
  speakers?: Array<{
    name: string;
    avatar?: string;
    title: string;
    bio?: string;
  }>;
  price: {
    free: boolean;
    amount?: number;
    currency?: string;
    originalPrice?: number;
  };
  capacity?: number;
  registered: number;
  waitlist?: number;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  soldOut?: boolean;
  earlyBird?: boolean;
  image?: string;
  agenda?: Array<{
    time: string;
    title: string;
    speaker?: string;
    duration?: number;
  }>;
  requirements?: string[];
  benefits?: string[];
  rating?: number;
  reviews?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  language?: string;
  recordingAvailable?: boolean;
  certificateProvided?: boolean;
}

interface EventsSectionProps {
  variant?: "grid" | "list" | "calendar" | "timeline" | "featured" | "minimal";
  title?: string;
  description?: string;
  events?: EventItem[];
  showSearch?: boolean;
  showFilters?: boolean;
  showStats?: boolean;
  maxVisible?: number;
  enableBookmark?: boolean;
  enableShare?: boolean;
  className?: string;
  theme?: "light" | "dark";
  onEventClick?: (event: EventItem) => void;
  onRegister?: (event: EventItem) => void;
  onBookmark?: (event: EventItem) => void;
  onShare?: (event: EventItem) => void;
  onOrganizerClick?: (organizer: EventItem['organizer']) => void;
}

const defaultEvents: EventItem[] = [
  {
    id: "1",
    title: "DevCon 2024 : L'avenir du développement web",
    description: "La plus grande conférence de développement web en France. Rejoignez plus de 2000 développeurs pour découvrir les dernières technologies et tendances.",
    type: "conference",
    category: "Technologie",
    startDate: "2024-09-15",
    endDate: "2024-09-17",
    startTime: "09:00",
    endTime: "18:00",
    location: {
      venue: "Palais des Congrès",
      address: "2 Place de la Porte Maillot",
      city: "Paris",
      country: "France"
    },
    organizer: {
      name: "Tech Events France",
      avatar: "/avatars/tech-events.jpg",
      organization: "Association DevCon",
      verified: true
    },
    speakers: [
      {
        name: "Sarah Chen",
        avatar: "/avatars/sarah-chen.jpg",
        title: "Senior Full Stack Developer @ Google",
        bio: "Experte en React et Node.js avec 10 ans d'expérience"
      },
      {
        name: "Alexandre Martin",
        avatar: "/avatars/alex-martin.jpg",
        title: "Tech Lead @ Meta",
        bio: "Spécialiste en architectures web modernes"
      }
    ],
    price: {
      free: false,
      amount: 299,
      currency: "EUR",
      originalPrice: 399
    },
    capacity: 2000,
    registered: 1650,
    waitlist: 234,
    tags: ["développement", "web", "react", "javascript", "conférence"],
    featured: true,
    trending: true,
    earlyBird: true,
    image: "/images/devcon-2024.jpg",
    agenda: [
      { time: "09:00", title: "Ouverture et keynote", speaker: "Sarah Chen", duration: 60 },
      { time: "10:30", title: "React Server Components", speaker: "Alexandre Martin", duration: 45 },
      { time: "14:00", title: "TypeScript avancé", duration: 90 },
      { time: "16:00", title: "Table ronde : Futur du web", duration: 60 }
    ],
    requirements: ["Connaissance de base en JavaScript", "Ordinateur portable recommandé"],
    benefits: ["Certificat de participation", "Accès aux replays", "Networking"],
    rating: 4.8,
    reviews: 156,
    difficulty: "intermediate",
    language: "français",
    recordingAvailable: true,
    certificateProvided: true
  },
  {
    id: "2",
    title: "Workshop : Design System avec Figma",
    description: "Apprenez à créer et maintenir un design system professionnel avec Figma dans cet atelier pratique de 4 heures.",
    type: "workshop",
    category: "Design",
    startDate: "2024-07-22",
    startTime: "14:00",
    endTime: "18:00",
    location: {
      venue: "Creative Hub",
      address: "15 Rue de la Créativité",
      city: "Lyon",
      country: "France"
    },
    organizer: {
      name: "Marie Dubois",
      avatar: "/avatars/marie-dubois.jpg",
      organization: "UX Academy",
      verified: true
    },
    speakers: [
      {
        name: "Thomas Leroy",
        avatar: "/avatars/thomas-leroy.jpg",
        title: "Senior UX Designer @ Airbnb",
        bio: "Expert en design systems et composants réutilisables"
      }
    ],
    price: {
      free: false,
      amount: 89,
      currency: "EUR"
    },
    capacity: 25,
    registered: 23,
    tags: ["design", "figma", "ui", "ux", "workshop"],
    featured: true,
    soldOut: true,
    image: "/images/figma-workshop.jpg",
    requirements: ["Compte Figma", "Connaissance de base du design"],
    benefits: ["Templates Figma", "1h de mentorat", "Certificat"],
    rating: 4.9,
    reviews: 67,
    difficulty: "beginner",
    language: "français",
    certificateProvided: true
  },
  {
    id: "3",
    title: "Webinaire : SEO & Performance Web",
    description: "Masterclass en ligne sur l'optimisation SEO et les performances web. Techniques avancées pour améliorer votre référencement.",
    type: "webinar",
    category: "Marketing",
    startDate: "2024-07-25",
    startTime: "19:00",
    endTime: "21:00",
    location: {
      online: true,
      city: "En ligne"
    },
    organizer: {
      name: "Digital Academy",
      organization: "Institut du Marketing Digital",
      verified: true
    },
    speakers: [
      {
        name: "Pierre Martin",
        title: "SEO Expert @ Moz",
        bio: "15 ans d'expérience en SEO et performance web"
      }
    ],
    price: {
      free: true
    },
    capacity: 500,
    registered: 387,
    tags: ["seo", "performance", "web", "marketing", "webinaire"],
    trending: true,
    requirements: ["Connaissance de base du web"],
    benefits: ["Replay 30 jours", "PDF de résumé", "Q&A"],
    rating: 4.6,
    reviews: 234,
    difficulty: "intermediate",
    language: "français",
    recordingAvailable: true
  },
  {
    id: "4",
    title: "Meetup : Communauté JavaScript Paris",
    description: "Rencontre mensuelle de la communauté JavaScript parisienne. Talks, networking et pizza ! Venez échanger avec d'autres développeurs.",
    type: "meetup",
    category: "Communauté",
    startDate: "2024-07-18",
    startTime: "19:00",
    endTime: "22:00",
    location: {
      venue: "Station F",
      address: "5 Parvis Alan Turing",
      city: "Paris",
      country: "France"
    },
    organizer: {
      name: "JS Paris Community",
      organization: "Association JavaScript Paris"
    },
    price: {
      free: true
    },
    capacity: 100,
    registered: 67,
    tags: ["javascript", "communauté", "networking", "meetup"],
    image: "/images/js-meetup.jpg",
    benefits: ["Networking", "Pizza offerte", "Stickers"],
    rating: 4.4,
    reviews: 89,
    language: "français"
  },
  {
    id: "5",
    title: "Concert : Électro Festival Summer",
    description: "Le plus grand festival de musique électronique de l'été avec les meilleurs DJs internationaux. 3 jours de musique non-stop.",
    type: "concert",
    category: "Musique",
    startDate: "2024-08-10",
    endDate: "2024-08-12",
    startTime: "20:00",
    endTime: "06:00",
    location: {
      venue: "Parc des Expositions",
      address: "Avenue du Festival",
      city: "Marseille",
      country: "France"
    },
    organizer: {
      name: "Summer Events",
      organization: "Productions Musicales du Sud"
    },
    price: {
      free: false,
      amount: 159,
      currency: "EUR",
      originalPrice: 199
    },
    capacity: 15000,
    registered: 12500,
    tags: ["musique", "électro", "festival", "dj"],
    featured: true,
    trending: true,
    earlyBird: true,
    image: "/images/electro-festival.jpg",
    rating: 4.7,
    reviews: 892,
    language: "multilingue"
  },
  {
    id: "6",
    title: "Exposition : Art & Technologie",
    description: "Découvrez l'intersection entre l'art contemporain et les nouvelles technologies. Installations interactives et œuvres numériques.",
    type: "exhibition",
    category: "Culture",
    startDate: "2024-09-01",
    endDate: "2024-12-15",
    startTime: "10:00",
    endTime: "19:00",
    location: {
      venue: "Musée d'Art Moderne",
      address: "11 Avenue du Président Wilson",
      city: "Paris",
      country: "France"
    },
    organizer: {
      name: "Musée d'Art Moderne",
      organization: "Ville de Paris",
      verified: true
    },
    price: {
      free: false,
      amount: 14,
      currency: "EUR"
    },
    registered: 2543,
    tags: ["art", "technologie", "exposition", "culture"],
    image: "/images/art-tech-expo.jpg",
    benefits: ["Visite guidée", "Catalogue", "Audioguide"],
    rating: 4.5,
    reviews: 167,
    language: "français"
  }
];

function getEventTypeIcon(type: EventItem['type'], className = "w-4 h-4") {
  const iconMap = {
    "conference": <Mic className={className} />,
    "workshop": <Users className={className} />,
    "webinar": <Monitor className={className} />,
    "meetup": <Coffee className={className} />,
    "concert": <Music className={className} />,
    "exhibition": <Palette className={className} />,
    "sports": <Dumbbell className={className} />,
    "networking": <Users className={className} />,
    "launch": <Zap className={className} />,
    "festival": <PartyPopper className={className} />
  };
  
  return iconMap[type] || <Calendar className={className} />;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });
}

function formatTime(timeString: string) {
  return timeString.slice(0, 5);
}

function calculateAvailability(event: EventItem) {
  if (!event.capacity) return null;
  const available = event.capacity - event.registered;
  const percentage = (available / event.capacity) * 100;
  return { available, percentage };
}

function EventCard({ 
  event, 
  variant = "grid",
  theme = "light",
  onEventClick,
  onRegister,
  onBookmark,
  onShare,
  onOrganizerClick,
  enableBookmark = false,
  enableShare = false
}: { 
  event: EventItem;
  variant?: EventsSectionProps['variant'];
  theme?: "light" | "dark";
  onEventClick?: (event: EventItem) => void;
  onRegister?: (event: EventItem) => void;
  onBookmark?: (event: EventItem) => void;
  onShare?: (event: EventItem) => void;
  onOrganizerClick?: (organizer: EventItem['organizer']) => void;
  enableBookmark?: boolean;
  enableShare?: boolean;
}) {
  const availability = calculateAvailability(event);
  const isUpcoming = new Date(event.startDate) > new Date();

  if (variant === "list") {
    return (
      <div className={cn(
        "flex items-start space-x-6 p-6 border rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
        event.featured && "ring-2 ring-blue-500 ring-opacity-50"
      )} onClick={() => onEventClick?.(event)}>
        
        {/* Date Block */}
        <div className={cn(
          "flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-center",
          theme === "dark" ? "bg-gray-700" : "bg-blue-50",
          event.featured && "bg-blue-600 text-white"
        )}>
          <div className="text-xs font-medium">
            {new Date(event.startDate).toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}
          </div>
          <div className="text-lg font-bold">
            {new Date(event.startDate).getDate()}
          </div>
        </div>

        {/* Event Image */}
        {event.image && (
          <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {event.featured && (
                  <Badge variant="default" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {event.trending && (
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {event.earlyBird && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    Early Bird
                  </Badge>
                )}
                {event.soldOut && (
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    Complet
                  </Badge>
                )}
                {event.location.online && (
                  <Badge variant="outline" className="text-xs">
                    En ligne
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {getEventTypeIcon(event.type, "w-3 h-3")}
                  <span className="ml-1 capitalize">{event.type}</span>
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold leading-tight mb-2">{event.title}</h3>
              <p className={cn(
                "text-sm leading-relaxed mb-3 line-clamp-2",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>
                {event.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {enableBookmark && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onBookmark?.(event); }}>
                  <Bookmark className="w-4 h-4" />
                </Button>
              )}
              {enableShare && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onShare?.(event); }}>
                  <Share className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatTime(event.startTime)}
                {event.endTime && ` - ${formatTime(event.endTime)}`}
              </span>
              
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {event.location.online ? "En ligne" : event.location.city}
              </span>
              
              {event.capacity && (
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {event.registered}/{event.capacity}
                </span>
              )}
              
              {event.rating && (
                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                  {event.rating} ({event.reviews})
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {event.price.free ? (
                <span className="text-green-600 font-medium">Gratuit</span>
              ) : (
                <div className="text-right">
                  {event.price.originalPrice && (
                    <span className="text-gray-400 line-through text-xs">
                      {event.price.originalPrice}€
                    </span>
                  )}
                  <span className="font-bold text-blue-600 ml-1">
                    {event.price.amount}€
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={(e) => { e.stopPropagation(); onOrganizerClick?.(event.organizer); }}
              className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
            >
              <span className="text-sm font-medium">{event.organizer.name}</span>
              {event.organizer.verified && (
                <CheckCircle className="w-4 h-4 text-blue-600" />
              )}
            </button>
            
            <Button
              onClick={(e) => { e.stopPropagation(); onRegister?.(event); }}
              disabled={event.soldOut || !isUpcoming}
              className="ml-4"
            >
              {event.soldOut ? "Complet" : isUpcoming ? "S'inscrire" : "Terminé"}
            </Button>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
    );
  }

  if (variant === "timeline") {
    return (
      <div className="flex items-start space-x-4">
        {/* Timeline Line */}
        <div className="flex flex-col items-center">
          <div className={cn(
            "w-3 h-3 rounded-full",
            event.featured ? "bg-blue-600" : "bg-gray-300"
          )} />
          <div className="w-px h-20 bg-gray-200 mt-2" />
        </div>

        {/* Event Content */}
        <Card className={cn(
          "flex-1 transition-all duration-300 hover:shadow-lg cursor-pointer",
          theme === "dark" && "bg-gray-800 border-gray-700"
        )} onClick={() => onEventClick?.(event)}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {formatTime(event.startTime)}
                  </Badge>
                  {event.featured && (
                    <Badge variant="default" className="text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                <h4 className="font-semibold leading-tight">{event.title}</h4>
                <p className={cn(
                  "text-sm mt-1 line-clamp-2",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  {event.description}
                </p>
              </div>
              
              <div className="flex items-center space-x-1 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); onRegister?.(event); }}
                  disabled={event.soldOut}
                >
                  {event.soldOut ? "Complet" : "Rejoindre"}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {event.location.online ? "En ligne" : event.location.venue}
                </span>
                {event.capacity && (
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {event.registered} inscrits
                  </span>
                )}
              </div>
              
              <div>
                {event.price.free ? (
                  <span className="text-green-600 font-medium">Gratuit</span>
                ) : (
                  <span className="font-medium">{event.price.amount}€</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default grid variant
  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg cursor-pointer group",
      theme === "dark" && "bg-gray-800 border-gray-700",
      event.featured && "ring-2 ring-blue-500 ring-opacity-50"
    )} onClick={() => onEventClick?.(event)}>
      
      {event.image && (
        <div className="relative overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          <div className="absolute top-4 left-4 flex gap-2">
            {event.featured && (
              <Badge variant="default" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {event.trending && (
              <Badge className="bg-orange-500 text-white text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
            {event.earlyBird && (
              <Badge className="bg-green-500 text-white text-xs">
                Early Bird
              </Badge>
            )}
          </div>
          
          <div className="absolute top-4 right-4 flex gap-2">
            {enableBookmark && (
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/30"
                onClick={(e) => { e.stopPropagation(); onBookmark?.(event); }}
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            )}
            {enableShare && (
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/30"
                onClick={(e) => { e.stopPropagation(); onShare?.(event); }}
              >
                <Share className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {event.soldOut && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <Badge className="bg-red-600 text-white text-lg px-4 py-2">
                COMPLET
              </Badge>
            </div>
          )}
          
          {/* Date overlay */}
          <div className="absolute bottom-4 left-4">
            <div className={cn(
              "bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center",
              theme === "dark" && "bg-gray-900/90"
            )}>
              <div className="text-xs font-medium text-blue-600">
                {new Date(event.startDate).toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}
              </div>
              <div className="text-lg font-bold">
                {new Date(event.startDate).getDate()}
              </div>
            </div>
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {getEventTypeIcon(event.type, "w-3 h-3")}
                <span className="ml-1 capitalize">{event.type}</span>
              </Badge>
              <Badge variant="outline" className="text-xs">
                {event.category}
              </Badge>
              {event.location.online && (
                <Badge className="bg-blue-100 text-blue-800 text-xs">
                  En ligne
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg leading-tight line-clamp-2">{event.title}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className={cn(
          "text-sm leading-relaxed mb-4 line-clamp-3",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          {event.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            <span>
              {formatDate(event.startDate)}
              {event.endDate && event.endDate !== event.startDate && 
                ` - ${formatDate(event.endDate)}`
              }
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            <span>
              {formatTime(event.startTime)}
              {event.endTime && ` - ${formatTime(event.endTime)}`}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            <span>
              {event.location.online 
                ? "En ligne" 
                : `${event.location.venue || event.location.address}, ${event.location.city}`
              }
            </span>
          </div>
          
          {event.capacity && (
            <div className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              <span>
                {event.registered}/{event.capacity} participants
              </span>
              {availability && availability.percentage < 20 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  Places limitées
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1 mb-4 flex-wrap gap-1">
          {event.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {event.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{event.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{event.organizer.name}</span>
            {event.organizer.verified && (
              <CheckCircle className="w-4 h-4 text-blue-600" />
            )}
            {event.rating && (
              <div className="flex items-center ml-2">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm">{event.rating}</span>
              </div>
            )}
          </div>
          
          <div className="text-right">
            {event.price.free ? (
              <div className="text-lg font-bold text-green-600">Gratuit</div>
            ) : (
              <div>
                {event.price.originalPrice && (
                  <div className="text-sm text-gray-400 line-through">
                    {event.price.originalPrice}€
                  </div>
                )}
                <div className="text-lg font-bold text-blue-600">
                  {event.price.amount}€
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          className="w-full mt-4"
          onClick={(e) => { e.stopPropagation(); onRegister?.(event); }}
          disabled={event.soldOut || !isUpcoming}
        >
          {event.soldOut 
            ? "Complet" 
            : !isUpcoming 
            ? "Événement terminé"
            : event.price.free 
            ? "S'inscrire gratuitement" 
            : "Réserver"
          }
        </Button>
      </CardContent>
    </Card>
  );
}

export function EventsSection({
  variant = "grid",
  title = "Événements",
  description = "Découvrez les événements les plus passionnants près de chez vous ou en ligne. Formations, conférences, ateliers et bien plus encore.",
  events = defaultEvents,
  showSearch = true,
  showFilters = true,
  showStats = true,
  maxVisible,
  enableBookmark = false,
  enableShare = false,
  className,
  theme = "light",
  onEventClick,
  onRegister,
  onBookmark,
  onShare,
  onOrganizerClick
}: EventsSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState("all");
  const [selectedLocation, setSelectedLocation] = React.useState("all");
  const [showAll, setShowAll] = React.useState(false);

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesType = selectedType === "all" || event.type === selectedType;
    const matchesLocation = selectedLocation === "all" || 
      (selectedLocation === "online" && event.location.online) ||
      (selectedLocation === "offline" && !event.location.online) ||
      event.location.city === selectedLocation;
    return matchesSearch && matchesCategory && matchesType && matchesLocation;
  });

  const displayedEvents = maxVisible && !showAll 
    ? filteredEvents.slice(0, maxVisible)
    : filteredEvents;

  const categories = Array.from(new Set(events.map(event => event.category)));
  const types = Array.from(new Set(events.map(event => event.type)));
  const cities = Array.from(new Set(events.map(event => event.location.city)));

  // Stats
  const totalEvents = events.length;
  const upcomingEvents = events.filter(event => new Date(event.startDate) > new Date()).length;
  const freeEvents = events.filter(event => event.price.free).length;
  const avgRating = events.reduce((acc, event) => acc + (event.rating || 0), 0) / events.length;

  if (variant === "timeline") {
    // Sort events by date for timeline view
    const sortedEvents = displayedEvents.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    return (
      <section className={cn(
        "py-16",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
        className
      )}>
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className={cn(
              "text-lg leading-relaxed",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {description}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />
            
            <div className="space-y-8">
              {sortedEvents.map((event, index) => (
                <div key={event.id}>
                  {/* Date header for new days */}
                  {(index === 0 || 
                    new Date(sortedEvents[index - 1].startDate).toDateString() !== 
                    new Date(event.startDate).toDateString()) && (
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {new Date(event.startDate).getDate()}
                      </div>
                      <h3 className="text-xl font-semibold">
                        {formatDate(event.startDate)}
                      </h3>
                    </div>
                  )}
                  
                  <div className="ml-20">
                    <EventCard
                      event={event}
                      variant="timeline"
                      theme={theme}
                      onEventClick={onEventClick}
                      onRegister={onRegister}
                      onBookmark={onBookmark}
                      onShare={onShare}
                      onOrganizerClick={onOrganizerClick}
                      enableBookmark={enableBookmark}
                      enableShare={enableShare}
                    />
                  </div>
                </div>
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
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalEvents}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Événements
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{upcomingEvents}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                À venir
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{freeEvents}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Gratuits
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
                  placeholder="Rechercher un événement..."
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
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={cn(
                    "px-3 py-2 border rounded-lg text-sm",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                >
                  <option value="all">Tous lieux</option>
                  <option value="online">En ligne</option>
                  <option value="offline">Présentiel</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Events */}
        <div className={cn(
          variant === "list" 
            ? "space-y-6" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        )}>
          {displayedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant={variant}
              theme={theme}
              onEventClick={onEventClick}
              onRegister={onRegister}
              onBookmark={onBookmark}
              onShare={onShare}
              onOrganizerClick={onOrganizerClick}
              enableBookmark={enableBookmark}
              enableShare={enableShare}
            />
          ))}
        </div>

        {/* Load More */}
        {maxVisible && filteredEvents.length > maxVisible && !showAll && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              onClick={() => setShowAll(true)}
              className="group"
            >
              Voir tous les événements ({filteredEvents.length})
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export type { EventsSectionProps, EventItem };
