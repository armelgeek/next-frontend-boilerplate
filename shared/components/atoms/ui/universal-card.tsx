"use client";

import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/ui/avatar";
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  Eye,
  Building,
  Home,
  Car,
  Wifi,
  Coffee,
  Dumbbell,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  User,
  Phone,
  Mail,
  ExternalLink,
  ArrowRight,
  Bookmark,
  MoreHorizontal,
  PlayCircle,
  Music,
  Video,
  BookOpen,
  GraduationCap,
  Stethoscope,
  Utensils,
  Plane,
  Camera,
  Gamepad2,
  Palette,
  Code,
  FileText,
  MessageSquare,
  Gift,
  ShoppingBag,
  Zap,
  Target,
  Award,
  Trophy,
  Download,
  Upload,
  Settings,
  Wrench,
  Shield,
  Lock,
  Globe,
  Smartphone,
  Laptop,
  Monitor,
  Server,
  Database,
  Cloud,
  Cpu,
  HardDrive,
  Battery,
  Signal,
  Wallet,
  BanknoteIcon as Banknote,
  TrendingUp,
  BarChart,
  PieChart,
  Activity,
  Bell,
  Megaphone,
  Flag,
  Tag,
  Layers,
  Grid,
  Layout,
  Image,
  Film,
  Mic,
  Headphones,
  Radio,
  Tv,
  Volume2,
  ChefHat,
  Pizza,
  IceCream,
  Wine,
  School,
  Library,
  BookMarked,
  PenTool,
  Edit,
  Scissors,
  Ruler,
  Compass,
  Calculator,
  Archive,
  Folder,
  FolderOpen,
  FileImage,
  FileVideo,
  FileAudio,
  Clipboard,
  Copy,
  Save,
  Trash,
  RefreshCw,
  RotateCcw,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Search,
  Filter,
  List,
  Grid3X3,
  Menu,
  X,
  Plus,
  Minus,
  Check,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle
} from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

// Types de base pour les différents contextes
interface BaseCardItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  gallery?: string[];
  status?: "active" | "inactive" | "pending" | "sold" | "rented" | "available" | "completed" | "cancelled";
  featured?: boolean;
  urgent?: boolean;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  category?: string;
  rating?: number;
  reviews?: number;
  price?: {
    amount: number;
    currency: string;
    period?: "hour" | "day" | "week" | "month" | "year" | "once";
    original?: number;
    discount?: number;
  };
  location?: {
    address?: string;
    city?: string;
    country?: string;
    coordinates?: { lat: number; lng: number };
  };
  author?: {
    name?: string;
    username?: string;
    displayName?: string;
    avatar?: string;
    verified?: boolean;
  };
}

interface EventCardItem extends BaseCardItem {
  date: string;
  endDate?: string;
  time?: string;
  venue?: string;
  attendees?: number;
  maxAttendees?: number;
  isOnline?: boolean;
  ticketPrice?: number;
  organizer?: {
    name: string;
    avatar?: string;
  };
}

interface PropertyCardItem extends BaseCardItem {
  propertyType: "apartment" | "house" | "office" | "studio" | "villa" | "land";
  surface?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  amenities?: string[];
  energyClass?: string;
  availableFrom?: string;
  furnished?: boolean;
  petFriendly?: boolean;
  agent?: {
    name: string;
    phone?: string;
    avatar?: string;
  };
}

interface ProductCardItem extends BaseCardItem {
  brand?: string;
  model?: string;
  condition?: "new" | "used" | "refurbished";
  stock?: number;
  sku?: string;
  shipping?: {
    free: boolean;
    cost?: number;
    estimated?: string;
  };
  seller?: {
    name: string;
    rating?: number;
    verified?: boolean;
  };
}

interface ProfileCardItem extends BaseCardItem {
  profession?: string;
  company?: string;
  experience?: string;
  skills?: string[];
  availability?: "available" | "busy" | "offline";
  social?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
  };
}

interface CourseCardItem extends BaseCardItem {
  instructor?: {
    name: string;
    avatar?: string;
    rating?: number;
  };
  duration?: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  language?: string;
  chapters?: number;
  enrolled?: number;
  maxStudents?: number;
  certificateIncluded?: boolean;
  startDate?: string;
  endDate?: string;
  format?: "online" | "offline" | "hybrid";
  prerequisites?: string[];
}

interface MediaCardItem extends BaseCardItem {
  mediaType: "video" | "audio" | "podcast" | "music" | "photo" | "album" | "playlist";
  duration?: string;
  artist?: string;
  album?: string;
  genre?: string;
  year?: number;
  quality?: string;
  size?: string;
  format?: string;
  views?: number;
  likes?: number;
  downloads?: number;
  chapters?: Array<{
    title: string;
    timestamp: string;
  }>;
}

interface RestaurantCardItem extends BaseCardItem {
  cuisine?: string;
  priceRange?: "$" | "$$" | "$$$" | "$$$$";
  openingHours?: {
    [key: string]: string;
  };
  phone?: string;
  website?: string;
  deliveryAvailable?: boolean;
  deliveryTime?: string;
  minimumOrder?: number;
  features?: string[];
  menu?: Array<{
    name: string;
    price: number;
    description?: string;
  }>;
  chefSpecial?: string;
}

interface TravelCardItem extends BaseCardItem {
  destination?: string;
  travelType: "flight" | "hotel" | "package" | "activity" | "transport" | "cruise";
  duration?: string;
  departureDate?: string;
  returnDate?: string;
  departure?: string;
  arrival?: string;
  airline?: string;
  hotelStars?: number;
  roomType?: string;
  includes?: string[];
  excludes?: string[];
  difficulty?: "easy" | "moderate" | "challenging" | "extreme";
  groupSize?: number;
  guide?: {
    name: string;
    languages: string[];
    experience: string;
  };
}

interface TechCardItem extends BaseCardItem {
  techType: "software" | "hardware" | "app" | "game" | "tool" | "api" | "library" | "framework";
  version?: string;
  platform?: string[];
  compatibility?: string[];
  requirements?: string[];
  license?: "free" | "paid" | "freemium" | "open-source" | "subscription";
  developer?: string;
  releaseDate?: string;
  lastUpdate?: string;
  downloadSize?: string;
  language?: string[];
  framework?: string[];
  stars?: number;
  forks?: number;
  contributors?: number;
  documentation?: string;
  demo?: string;
}

interface HealthCardItem extends BaseCardItem {
  healthType: "doctor" | "clinic" | "hospital" | "pharmacy" | "therapy" | "wellness" | "fitness";
  specialty?: string;
  doctor?: {
    name: string;
    title: string;
    experience: string;
    avatar?: string;
  };
  availability?: {
    nextAvailable: string;
    schedule: string[];
  };
  insurance?: string[];
  languages?: string[];
  consultationType?: "in-person" | "video" | "phone" | "chat";
  consultationFee?: number;
  emergency?: boolean;
  certifications?: string[];
  affiliatedHospitals?: string[];
}

interface FinanceCardItem extends BaseCardItem {
  financeType: "bank" | "investment" | "loan" | "insurance" | "crypto" | "card" | "budget";
  interestRate?: number;
  term?: string;
  minimumAmount?: number;
  maximumAmount?: number;
  fees?: Array<{
    type: string;
    amount: number;
  }>;
  benefits?: string[];
  eligibility?: string[];
  riskLevel?: "low" | "medium" | "high" | "very-high";
  returns?: {
    min: number;
    max: number;
    average: number;
  };
  provider?: {
    name: string;
    license: string;
    rating: number;
  };
}

interface NewsCardItem extends BaseCardItem {
  newsType: "article" | "breaking" | "opinion" | "analysis" | "interview" | "report";
  publishedAt: string;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  source?: {
    name: string;
    logo?: string;
    credibility?: number;
  };
  readTime?: string;
  topic?: string;
  region?: string;
  breaking?: boolean;
  trending?: boolean;
  verified?: boolean;
  reactions?: {
    likes: number;
    comments: number;
    shares: number;
  };
  relatedArticles?: string[];
}

interface SocialCardItem extends BaseCardItem {
  socialType: "post" | "story" | "reel" | "live" | "poll" | "event" | "group";
  author: {
    username: string;
    displayName: string;
    avatar?: string;
    verified?: boolean;
    followers?: number;
  };
  postedAt: string;
  content?: {
    text?: string;
    media?: Array<{
      type: "image" | "video" | "audio";
      url: string;
      thumbnail?: string;
    }>;
    poll?: {
      question: string;
      options: Array<{
        text: string;
        votes: number;
      }>;
    };
  };
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  hashtags?: string[];
  mentions?: string[];
  postLocation?: string;
  privacy?: "public" | "friends" | "private";
}

type UniversalCardItem = EventCardItem | PropertyCardItem | ProductCardItem | ProfileCardItem | CourseCardItem | MediaCardItem | RestaurantCardItem | TravelCardItem | TechCardItem | HealthCardItem | FinanceCardItem | NewsCardItem | SocialCardItem;

interface UniversalCardProps {
  item: UniversalCardItem;
  variant?: "default" | "compact" | "detailed" | "minimal" | "featured" | "list";
  context: "event" | "property" | "product" | "profile" | "blog" | "job" | "service" | "course" | "media" | "restaurant" | "travel" | "tech" | "health" | "finance" | "news" | "social";
  size?: "sm" | "md" | "lg";
  showImage?: boolean;
  showActions?: boolean;
  showRating?: boolean;
  showPrice?: boolean;
  showStatus?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showLocation?: boolean;
  actions?: {
    primary?: {
      label: string;
      onClick: () => void;
      variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    };
    secondary?: {
      label: string;
      onClick: () => void;
      variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    };
    bookmark?: () => void;
    share?: () => void;
    view?: () => void;
  };
  className?: string;
  onClick?: () => void;
}

function formatPrice(price: UniversalCardItem['price']) {
  if (!price) return null;
  
  const { amount, currency, period, original, discount } = price;
  const formattedAmount = amount.toLocaleString();
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-green-600">
        {formattedAmount} {currency}
        {period && period !== 'once' && (
          <span className="text-sm text-gray-500">
            /{period === 'year' ? 'an' : period === 'month' ? 'mois' : period === 'week' ? 'sem' : period === 'day' ? 'jour' : 'h'}
          </span>
        )}
      </span>
      {original && original > amount && (
        <span className="text-sm text-gray-400 line-through">
          {original.toLocaleString()} {currency}
        </span>
      )}
      {discount && (
        <Badge className="bg-red-100 text-red-800 text-xs">
          -{discount}%
        </Badge>
      )}
    </div>
  );
}

function getAuthorName(author: any): string {
  if (author.name) return author.name;
  if (author.displayName) return author.displayName;
  if (author.username) return author.username;
  return 'Unknown';
}

function getAuthorInitial(author: any): string {
  const name = getAuthorName(author);
  return name[0]?.toUpperCase() || '?';
}

function getContextIcon(context: string, className = "w-4 h-4") {
  switch (context) {
    case 'event': return <Calendar className={className} />;
    case 'property': return <Home className={className} />;
    case 'product': return <Package className={className} />;
    case 'profile': return <User className={className} />;
    case 'blog': return <BookOpen className={className} />;
    case 'job': return <Building className={className} />;
    case 'service': return <Settings className={className} />;
    case 'course': return <GraduationCap className={className} />;
    case 'media': return <PlayCircle className={className} />;
    case 'restaurant': return <Utensils className={className} />;
    case 'travel': return <Plane className={className} />;
    case 'tech': return <Code className={className} />;
    case 'health': return <Stethoscope className={className} />;
    case 'finance': return <Banknote className={className} />;
    case 'news': return <FileText className={className} />;
    case 'social': return <MessageSquare className={className} />;
    default: return <Package className={className} />;
  }
}

function getStatusBadge(status: string, context: string) {
  const getStatusConfig = () => {
    switch (context) {
      case 'event':
        switch (status) {
          case 'active': return { label: 'Ouvert', className: 'bg-green-100 text-green-800' };
          case 'completed': return { label: 'Terminé', className: 'bg-gray-100 text-gray-800' };
          case 'cancelled': return { label: 'Annulé', className: 'bg-red-100 text-red-800' };
          default: return { label: status, className: 'bg-blue-100 text-blue-800' };
        }
      case 'property':
        switch (status) {
          case 'available': return { label: 'Disponible', className: 'bg-green-100 text-green-800' };
          case 'sold': return { label: 'Vendu', className: 'bg-red-100 text-red-800' };
          case 'rented': return { label: 'Loué', className: 'bg-orange-100 text-orange-800' };
          default: return { label: status, className: 'bg-blue-100 text-blue-800' };
        }
      case 'product':
        switch (status) {
          case 'available': return { label: 'En stock', className: 'bg-green-100 text-green-800' };
          case 'sold': return { label: 'Épuisé', className: 'bg-red-100 text-red-800' };
          default: return { label: status, className: 'bg-blue-100 text-blue-800' };
        }
      default:
        return { label: status, className: 'bg-blue-100 text-blue-800' };
    }
  };

  const config = getStatusConfig();
  return <Badge className={config.className}>{config.label}</Badge>;
}

function renderContextSpecificInfo(item: UniversalCardItem, context: string, variant: string) {
  switch (context) {
    case 'event':
      const eventItem = item as EventCardItem;
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(eventItem.date).toLocaleDateString('fr-FR')}</span>
            {eventItem.time && <span>à {eventItem.time}</span>}
          </div>
          {eventItem.venue && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{eventItem.venue}</span>
            </div>
          )}
          {eventItem.attendees !== undefined && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>
                {eventItem.attendees} participants
                {eventItem.maxAttendees && ` / ${eventItem.maxAttendees}`}
              </span>
            </div>
          )}
        </div>
      );

    case 'property':
      const propertyItem = item as PropertyCardItem;
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {propertyItem.surface && (
              <span>{propertyItem.surface}m²</span>
            )}
            {propertyItem.rooms && (
              <span>{propertyItem.rooms} pièces</span>
            )}
            {propertyItem.bedrooms && (
              <span>{propertyItem.bedrooms} ch.</span>
            )}
          </div>
          {propertyItem.amenities && propertyItem.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {propertyItem.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {propertyItem.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{propertyItem.amenities.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      );

    case 'product':
      const productItem = item as ProductCardItem;
      return (
        <div className="space-y-2">
          {productItem.brand && (
            <div className="text-sm text-gray-600">
              <strong>{productItem.brand}</strong>
              {productItem.model && <span> - {productItem.model}</span>}
            </div>
          )}
          {productItem.condition && (
            <Badge variant="outline" className="text-xs">
              {productItem.condition === 'new' ? 'Neuf' : 
               productItem.condition === 'used' ? 'Occasion' : 'Reconditionné'}
            </Badge>
          )}
          {productItem.shipping && (
            <div className="text-sm text-gray-600">
              {productItem.shipping.free ? (
                <span className="text-green-600">Livraison gratuite</span>
              ) : (
                <span>Livraison: {productItem.shipping.cost}€</span>
              )}
            </div>
          )}
        </div>
      );

    case 'profile':
      const profileItem = item as ProfileCardItem;
      return (
        <div className="space-y-2">
          {profileItem.profession && (
            <div className="text-sm font-medium">{profileItem.profession}</div>
          )}
          {profileItem.company && (
            <div className="text-sm text-gray-600">{profileItem.company}</div>
          )}
          {profileItem.skills && profileItem.skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {profileItem.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>
      );

    case 'course':
      const courseItem = item as CourseCardItem;
      return (
        <div className="space-y-2">
          {courseItem.instructor && (
            <div className="text-sm text-gray-600">
              Par {courseItem.instructor.name}
            </div>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {courseItem.duration && <span>{courseItem.duration}</span>}
            {courseItem.level && (
              <Badge variant="outline" className="text-xs">
                {courseItem.level}
              </Badge>
            )}
          </div>
          {courseItem.enrolled !== undefined && (
            <div className="text-sm text-gray-600">
              {courseItem.enrolled} inscrits
              {courseItem.maxStudents && ` / ${courseItem.maxStudents}`}
            </div>
          )}
        </div>
      );

    case 'media':
      const mediaItem = item as MediaCardItem;
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {mediaItem.mediaType === 'video' && <Video className="w-4 h-4" />}
            {mediaItem.mediaType === 'audio' && <Headphones className="w-4 h-4" />}
            {mediaItem.mediaType === 'music' && <Music className="w-4 h-4" />}
            {mediaItem.mediaType === 'photo' && <Camera className="w-4 h-4" />}
            <span className="capitalize">{mediaItem.mediaType}</span>
            {mediaItem.duration && <span>• {mediaItem.duration}</span>}
          </div>
          {mediaItem.artist && (
            <div className="text-sm text-gray-600">
              <strong>{mediaItem.artist}</strong>
              {mediaItem.album && <span> - {mediaItem.album}</span>}
            </div>
          )}
          {mediaItem.views && (
            <div className="text-sm text-gray-600">
              {mediaItem.views.toLocaleString()} vues
            </div>
          )}
        </div>
      );

    case 'restaurant':
      const restaurantItem = item as RestaurantCardItem;
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {restaurantItem.cuisine && <span>{restaurantItem.cuisine}</span>}
            {restaurantItem.priceRange && (
              <Badge variant="outline" className="text-xs">
                {restaurantItem.priceRange}
              </Badge>
            )}
          </div>
          {restaurantItem.deliveryAvailable && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <Truck className="w-4 h-4" />
              <span>Livraison disponible</span>
              {restaurantItem.deliveryTime && (
                <span>({restaurantItem.deliveryTime})</span>
              )}
            </div>
          )}
          {restaurantItem.features && restaurantItem.features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {restaurantItem.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          )}
        </div>
      );

    case 'travel':
      const travelItem = item as TravelCardItem;
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Plane className="w-4 h-4" />
            <span className="capitalize">{travelItem.travelType}</span>
            {travelItem.duration && <span>• {travelItem.duration}</span>}
          </div>
          {travelItem.destination && (
            <div className="text-sm font-medium">{travelItem.destination}</div>
          )}
          {travelItem.departureDate && (
            <div className="text-sm text-gray-600">
              Départ: {new Date(travelItem.departureDate).toLocaleDateString('fr-FR')}
            </div>
          )}
          {travelItem.difficulty && (
            <Badge variant="outline" className="text-xs">
              {travelItem.difficulty}
            </Badge>
          )}
        </div>
      );

    case 'tech':
      const techItem = item as TechCardItem;
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Code className="w-4 h-4" />
            <span className="capitalize">{techItem.techType}</span>
            {techItem.version && <span>v{techItem.version}</span>}
          </div>
          {techItem.platform && techItem.platform.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {techItem.platform.slice(0, 3).map((platform, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {platform}
                </Badge>
              ))}
            </div>
          )}
          {techItem.license && (
            <Badge variant="outline" className="text-xs">
              {techItem.license}
            </Badge>
          )}
          {techItem.stars && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-4 h-4" />
              <span>{techItem.stars} stars</span>
            </div>
          )}
        </div>
      );

    case 'health':
      const healthItem = item as HealthCardItem;
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Stethoscope className="w-4 h-4" />
            <span className="capitalize">{healthItem.healthType}</span>
          </div>
          {healthItem.specialty && (
            <div className="text-sm font-medium">{healthItem.specialty}</div>
          )}
          {healthItem.doctor && (
            <div className="text-sm text-gray-600">
              Dr. {healthItem.doctor.name}
              {healthItem.doctor.experience && (
                <span> • {healthItem.doctor.experience}</span>
              )}
            </div>
          )}
          {healthItem.consultationType && (
            <Badge variant="outline" className="text-xs">
              {healthItem.consultationType}
            </Badge>
          )}
        </div>
      );

    case 'finance':
      const financeItem = item as FinanceCardItem;
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Banknote className="w-4 h-4" />
            <span className="capitalize">{financeItem.financeType}</span>
          </div>
          {financeItem.interestRate && (
            <div className="text-sm font-medium text-green-600">
              {financeItem.interestRate}% de taux
            </div>
          )}
          {financeItem.riskLevel && (
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs",
                financeItem.riskLevel === 'low' && "text-green-600",
                financeItem.riskLevel === 'medium' && "text-yellow-600",
                financeItem.riskLevel === 'high' && "text-red-600"
              )}
            >
              Risque {financeItem.riskLevel}
            </Badge>
          )}
        </div>
      );

    case 'news':
      const newsItem = item as NewsCardItem;
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span className="capitalize">{newsItem.newsType}</span>
            {newsItem.readTime && <span>• {newsItem.readTime}</span>}
          </div>
          {newsItem.source && (
            <div className="text-sm text-gray-600">
              {newsItem.source.name}
            </div>
          )}
          {newsItem.breaking && (
            <Badge className="bg-red-100 text-red-800 text-xs">
              Breaking News
            </Badge>
          )}
          {newsItem.reactions && (
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{newsItem.reactions.likes} ❤️</span>
              <span>{newsItem.reactions.comments} 💬</span>
              <span>{newsItem.reactions.shares} 🔄</span>
            </div>
          )}
        </div>
      );

    case 'social':
      const socialItem = item as SocialCardItem;
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MessageSquare className="w-4 h-4" />
            <span className="capitalize">{socialItem.socialType}</span>
            <span>• @{socialItem.author.username}</span>
          </div>
          {socialItem.content?.text && (
            <p className="text-sm line-clamp-2">{socialItem.content.text}</p>
          )}
          {socialItem.engagement && (
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{socialItem.engagement.likes} ❤️</span>
              <span>{socialItem.engagement.comments} 💬</span>
              <span>{socialItem.engagement.shares} 🔄</span>
            </div>
          )}
          {socialItem.hashtags && socialItem.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {socialItem.hashtags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs text-blue-600">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}

export function UniversalCard({
  item,
  variant = "default",
  context,
  size = "md",
  showImage = true,
  showActions = true,
  showRating = true,
  showPrice = true,
  showStatus = true,
  showAuthor = true,
  showDate = true,
  showLocation = true,
  actions,
  className,
  onClick
}: UniversalCardProps) {
  const cardSizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6"
  };

  const imageSizeClasses = {
    sm: "h-32",
    md: "h-48",
    lg: "h-64"
  };

  if (variant === "minimal") {
    return (
      <Card 
        className={cn(
          "hover:shadow-lg transition-all duration-300 cursor-pointer",
          item.featured && "ring-2 ring-blue-500/20 border-blue-500",
          className
        )}
        onClick={onClick}
      >
        <CardContent className={cardSizeClasses[size]}>
          <div className="flex items-center gap-3">
            {showImage && item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 rounded object-cover flex-shrink-0"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {getContextIcon(context, "w-3 h-3")}
                <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
              </div>
              
              {showPrice && item.price && (
                <div className="text-sm font-semibold text-green-600">
                  {item.price.amount.toLocaleString()} {item.price.currency}
                </div>
              )}
              
              {showRating && item.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{item.rating}</span>
                </div>
              )}
            </div>

            {showActions && actions?.bookmark && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  actions.bookmark?.();
                }}
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card 
        className={cn(
          "hover:shadow-lg transition-all duration-300 cursor-pointer",
          item.featured && "ring-2 ring-blue-500/20 border-blue-500",
          className
        )}
        onClick={onClick}
      >
        <CardContent className={cardSizeClasses[size]}>
          <div className="flex gap-4">
            {showImage && item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 rounded object-cover flex-shrink-0"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {showStatus && item.status && getStatusBadge(item.status, context)}
                  {item.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800">Vedette</Badge>
                  )}
                </div>
                
                {showActions && (
                  <div className="flex items-center gap-1">
                    {actions?.bookmark && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.bookmark?.();
                        }}
                      >
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    )}
                    {actions?.share && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.share?.();
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
              
              {item.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
              )}

              {renderContextSpecificInfo(item, context, variant)}

              <div className="flex items-center justify-between mt-3">
                {showPrice && item.price && formatPrice(item.price)}
                
                {showRating && item.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{item.rating}</span>
                    {item.reviews && (
                      <span className="text-xs text-gray-500">({item.reviews})</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "list") {
    return (
      <Card 
        className={cn(
          "hover:shadow-lg transition-all duration-300 cursor-pointer",
          item.featured && "ring-2 ring-blue-500/20 border-blue-500",
          className
        )}
        onClick={onClick}
      >
        <CardContent className={cardSizeClasses[size]}>
          <div className="flex gap-6">
            {showImage && item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-24 rounded-lg object-cover flex-shrink-0"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    {item.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800">Vedette</Badge>
                    )}
                    {item.urgent && (
                      <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                    )}
                  </div>
                  
                  {item.category && (
                    <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                  )}
                </div>

                {showActions && (
                  <div className="flex items-center gap-2">
                    {actions?.bookmark && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.bookmark?.();
                        }}
                      >
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    )}
                    {actions?.share && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.share?.();
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {item.description && (
                <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
              )}

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  {renderContextSpecificInfo(item, context, variant)}
                </div>
                
                <div className="space-y-2">
                  {showPrice && item.price && (
                    <div>{formatPrice(item.price)}</div>
                  )}
                  
                  {showRating && item.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{item.rating}</span>
                      {item.reviews && (
                        <span className="text-sm text-gray-500">({item.reviews} avis)</span>
                      )}
                    </div>
                  )}

                  {showAuthor && item.author && (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        {item.author.avatar && (
                          <AvatarImage src={item.author.avatar} alt={getAuthorName(item.author)} />
                        )}
                        <AvatarFallback>{getAuthorInitial(item.author)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{getAuthorName(item.author)}</span>
                      {(item.author as any)?.verified && (
                        <Badge variant="outline" className="text-xs">Vérifié</Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {showActions && (actions?.primary || actions?.secondary) && (
                <div className="flex items-center gap-2">
                  {actions.primary && (
                    <Button
                      variant={actions.primary.variant}
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.primary?.onClick();
                      }}
                    >
                      {actions.primary.label}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                  {actions.secondary && (
                    <Button
                      variant={actions.secondary.variant || "outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.secondary?.onClick();
                      }}
                    >
                      {actions.secondary.label}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default card variant
  return (
    <Card 
      className={cn(
        "hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden",
        item.featured && "ring-2 ring-blue-500/20 border-blue-500",
        item.urgent && "ring-2 ring-red-500/20 border-red-500",
        className
      )}
      onClick={onClick}
    >
      {showImage && item.image && (
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className={cn("w-full object-cover", imageSizeClasses[size])}
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {showStatus && item.status && getStatusBadge(item.status, context)}
            {item.featured && (
              <Badge className="bg-yellow-100 text-yellow-800">Vedette</Badge>
            )}
            {item.urgent && (
              <Badge className="bg-red-100 text-red-800">Urgent</Badge>
            )}
          </div>
          
          {showActions && (
            <div className="absolute top-3 right-3 flex gap-1">
              {actions?.bookmark && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    actions.bookmark?.();
                  }}
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
              )}
              {actions?.share && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    actions.share?.();
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      <CardContent className={cardSizeClasses[size]}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getContextIcon(context)}
            {item.category && (
              <Badge variant="secondary" className="text-xs">{item.category}</Badge>
            )}
          </div>
          
          {showRating && item.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{item.rating}</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2">{item.title}</h3>

        {item.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
        )}

        {renderContextSpecificInfo(item, context, variant)}

        {showPrice && item.price && (
          <div className="mt-4">{formatPrice(item.price)}</div>
        )}

        {showLocation && item.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <MapPin className="w-4 h-4" />
            <span>
              {typeof item.location === 'string' 
                ? item.location 
                : item.location.city || item.location.address
              }
            </span>
          </div>
        )}

        {showAuthor && item.author && (
          <div className="flex items-center gap-2 mt-4">
            <Avatar className="w-8 h-8">
              {item.author.avatar && (
                <AvatarImage src={item.author.avatar} alt={getAuthorName(item.author)} />
              )}
              <AvatarFallback>{getAuthorInitial(item.author)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">{getAuthorName(item.author)}</div>
              {(item.author as any)?.verified && (
                <Badge variant="outline" className="text-xs">Vérifié</Badge>
              )}
            </div>
          </div>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-4">
            {item.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {showDate && item.createdAt && (
          <div className="text-xs text-gray-500 mt-4">
            {new Date(item.createdAt).toLocaleDateString('fr-FR')}
          </div>
        )}

        {showActions && (actions?.primary || actions?.secondary) && (
          <div className="flex gap-2 mt-4">
            {actions.primary && (
              <Button
                className="flex-1"
                variant={actions.primary.variant}
                onClick={(e) => {
                  e.stopPropagation();
                  actions.primary?.onClick();
                }}
              >
                {actions.primary.label}
              </Button>
            )}
            {actions.secondary && (
              <Button
                variant={actions.secondary.variant || "outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  actions.secondary?.onClick();
                }}
              >
                {actions.secondary.label}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { 
  UniversalCardItem, 
  EventCardItem, 
  PropertyCardItem, 
  ProductCardItem, 
  ProfileCardItem,
  CourseCardItem,
  MediaCardItem,
  RestaurantCardItem,
  TravelCardItem,
  TechCardItem,
  HealthCardItem,
  FinanceCardItem,
  NewsCardItem,
  SocialCardItem,
  UniversalCardProps 
};
