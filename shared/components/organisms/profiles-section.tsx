"use client";

import React from "react";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Button } from "@/shared/components/atoms/ui/button";
import { 
  User,
  Users,
  Star,
  Heart,
  Share,
  MessageSquare,
  ThumbsUp,
  Eye,
  Calendar,
  MapPin,
  Trophy,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Palette,
  Camera,
  Music,
  Gamepad2,
  Coffee,
  Car,
  Home,
  Plane,
  Utensils,
  ShoppingBag,
  Dumbbell,
  Book,
  Globe,
  Zap,
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Youtube,
  Facebook,
  Link,
  Building,
  Clock,
  Target,
  TrendingUp,
  Medal,
  UserPlus,
  Send,
  Settings,
  Download,
  Bookmark
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
  website?: string;
}

interface ProfileItem {
  id: string;
  type: "professional" | "personal" | "business" | "freelancer" | "student" | "creator" | "influencer" | "expert";
  name: string;
  title?: string;
  company?: string;
  location?: {
    city: string;
    country?: string;
    remote?: boolean;
  };
  avatar?: string;
  coverImage?: string;
  bio: string;
  description?: string;
  experience?: string;
  skills: string[];
  specialties?: string[];
  interests?: string[];
  languages?: string[];
  availability?: "available" | "busy" | "not-available";
  rating?: number;
  reviews?: number;
  followers?: number;
  following?: number;
  posts?: number;
  projects?: number;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    badge?: string;
  }>;
  achievements?: Array<{
    title: string;
    description: string;
    date: string;
    icon?: string;
  }>;
  portfolio?: Array<{
    title: string;
    description: string;
    image?: string;
    url?: string;
    tags: string[];
  }>;
  socialLinks?: SocialLinks;
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  badges?: Array<{
    label: string;
    type: "verified" | "premium" | "expert" | "top-rated" | "featured";
    color?: string;
  }>;
  stats?: {
    projectsCompleted?: number;
    clientsSatisfied?: number;
    yearsExperience?: number;
    responseTime?: string;
    successRate?: number;
  };
  hourlyRate?: {
    amount: number;
    currency: string;
  };
  featured?: boolean;
  verified?: boolean;
  premium?: boolean;
  online?: boolean;
  lastSeen?: string;
  joinDate?: string;
  categories?: string[];
}

interface ProfilesSectionProps {
  variant?: "grid" | "list" | "cards" | "table" | "masonry" | "detailed";
  title?: string;
  description?: string;
  profiles?: ProfileItem[];
  showSearch?: boolean;
  showFilters?: boolean;
  showStats?: boolean;
  maxVisible?: number;
  enableContact?: boolean;
  enableFollow?: boolean;
  enableBookmark?: boolean;
  className?: string;
  theme?: "light" | "dark";
  onProfileClick?: (profile: ProfileItem) => void;
  onContact?: (profile: ProfileItem) => void;
  onFollow?: (profile: ProfileItem) => void;
  onBookmark?: (profile: ProfileItem) => void;
  onMessage?: (profile: ProfileItem) => void;
  onHire?: (profile: ProfileItem) => void;
}

const defaultProfiles: ProfileItem[] = [
  {
    id: "1",
    type: "professional",
    name: "Sarah Chen",
    title: "Senior Full Stack Developer",
    company: "Google",
    location: {
      city: "Paris",
      country: "France",
      remote: true
    },
    avatar: "/avatars/sarah-chen.jpg",
    coverImage: "/covers/tech-bg.jpg",
    bio: "Développeuse passionnée avec 8 ans d'expérience en développement web. Experte en React, Node.js et architectures cloud.",
    description: "Spécialisée dans la création d'applications web scalables et performantes. J'adore résoudre des problèmes complexes et mentorer les jeunes développeurs.",
    experience: "8 ans",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "GraphQL", "PostgreSQL"],
    specialties: ["Architectures microservices", "Performance optimization", "Mentorat technique"],
    interests: ["Open Source", "Machine Learning", "Photographie"],
    languages: ["Français", "Anglais", "Mandarin"],
    availability: "available",
    rating: 4.9,
    reviews: 156,
    followers: 2340,
    following: 567,
    posts: 89,
    projects: 45,
    certifications: [
      {
        name: "AWS Solutions Architect",
        issuer: "Amazon",
        date: "2023-06",
        badge: "/badges/aws-architect.png"
      },
      {
        name: "React Advanced Certification",
        issuer: "Meta",
        date: "2023-02",
        badge: "/badges/react-advanced.png"
      }
    ],
    achievements: [
      {
        title: "Top Contributor",
        description: "Contributrice principale sur 5 projets open source",
        date: "2023-12",
        icon: "trophy"
      },
      {
        title: "Mentor de l'année",
        description: "Reconnue pour son impact sur la communauté",
        date: "2023-08",
        icon: "award"
      }
    ],
    portfolio: [
      {
        title: "E-commerce Platform",
        description: "Plateforme de vente en ligne moderne avec React et Stripe",
        image: "/portfolio/ecommerce.jpg",
        url: "https://github.com/sarah/ecommerce",
        tags: ["React", "Stripe", "Node.js"]
      },
      {
        title: "Analytics Dashboard",
        description: "Dashboard temps réel avec visualisations avancées",
        image: "/portfolio/dashboard.jpg",
        url: "https://analytics-demo.sarah.dev",
        tags: ["D3.js", "WebSocket", "Python"]
      }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
      twitter: "https://twitter.com/sarahcodes",
      website: "https://sarah.dev"
    },
    contact: {
      email: "sarah@example.com",
      website: "https://sarah.dev"
    },
    badges: [
      { label: "Verified", type: "verified" },
      { label: "Expert", type: "expert" },
      { label: "Top Rated", type: "top-rated" }
    ],
    stats: {
      projectsCompleted: 45,
      clientsSatisfied: 38,
      yearsExperience: 8,
      responseTime: "< 2h",
      successRate: 98
    },
    hourlyRate: {
      amount: 85,
      currency: "EUR"
    },
    featured: true,
    verified: true,
    premium: true,
    online: true,
    lastSeen: "Il y a 5 minutes",
    joinDate: "2019-03",
    categories: ["Développement", "Consultation", "Formation"]
  },
  {
    id: "2",
    type: "freelancer",
    name: "Alexandre Martin",
    title: "Designer UX/UI Freelance",
    location: {
      city: "Lyon",
      country: "France"
    },
    avatar: "/avatars/alex-martin.jpg",
    bio: "Designer créatif spécialisé dans les interfaces utilisateur modernes et accessibles.",
    description: "Je crée des expériences utilisateur exceptionnelles pour les startups et les entreprises. Design thinking, prototypage rapide et tests utilisateurs.",
    experience: "5 ans",
    skills: ["Figma", "Adobe Creative Suite", "Prototypage", "Design System", "User Research"],
    specialties: ["Mobile Design", "Accessibilité", "Design System"],
    availability: "available",
    rating: 4.8,
    reviews: 89,
    followers: 1250,
    following: 234,
    posts: 45,
    projects: 67,
    portfolio: [
      {
        title: "Banking App Redesign",
        description: "Refonte complète de l'application mobile d'une banque",
        image: "/portfolio/banking-app.jpg",
        tags: ["Mobile", "Fintech", "UX Research"]
      }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/alexmartin",
      website: "https://designstudio.fr"
    },
    contact: {
      email: "alex@designstudio.fr"
    },
    badges: [
      { label: "Premium", type: "premium" },
      { label: "Featured", type: "featured" }
    ],
    stats: {
      projectsCompleted: 67,
      clientsSatisfied: 62,
      yearsExperience: 5,
      responseTime: "< 4h",
      successRate: 95
    },
    hourlyRate: {
      amount: 65,
      currency: "EUR"
    },
    verified: true,
    online: false,
    lastSeen: "Il y a 2 heures",
    categories: ["Design", "UX/UI", "Consultation"]
  },
  {
    id: "3",
    type: "business",
    name: "Innovation Labs",
    title: "Agence de Développement Web",
    location: {
      city: "Bordeaux",
      country: "France"
    },
    avatar: "/avatars/innovation-labs.jpg",
    bio: "Agence spécialisée dans le développement d'applications web innovantes pour les startups et PME.",
    description: "Nous accompagnons les entreprises dans leur transformation digitale avec des solutions sur mesure. Équipe de 15 développeurs et designers expérimentés.",
    skills: ["React", "Vue.js", "Laravel", "Symfony", "Mobile", "E-commerce"],
    specialties: ["MVP Development", "E-commerce", "Applications mobiles"],
    rating: 4.7,
    reviews: 234,
    followers: 890,
    projects: 156,
    stats: {
      projectsCompleted: 156,
      clientsSatisfied: 142,
      yearsExperience: 7,
      responseTime: "< 1h",
      successRate: 96
    },
    contact: {
      email: "hello@innovationlabs.fr",
      phone: "+33 5 56 78 90 12",
      website: "https://innovationlabs.fr"
    },
    badges: [
      { label: "Agency", type: "verified" },
      { label: "Top Rated", type: "top-rated" }
    ],
    verified: true,
    categories: ["Agence", "Développement", "E-commerce"]
  },
  {
    id: "4",
    type: "creator",
    name: "Emma Dubois",
    title: "Content Creator & Photographe",
    location: {
      city: "Nice",
      country: "France"
    },
    avatar: "/avatars/emma-dubois.jpg",
    bio: "Créatrice de contenu passionnée par la photographie lifestyle et les voyages.",
    description: "Je crée du contenu visuel authentique pour les marques de mode, voyage et lifestyle. Spécialisée dans la photographie de portrait et les stories Instagram.",
    skills: ["Photographie", "Vidéo", "Réseaux sociaux", "Adobe Lightroom", "Story telling"],
    specialties: ["Portrait", "Lifestyle", "Voyage", "Mode"],
    rating: 4.6,
    reviews: 78,
    followers: 45000,
    following: 1200,
    posts: 890,
    socialLinks: {
      instagram: "https://instagram.com/emmadubois",
      youtube: "https://youtube.com/emmadubois",
      website: "https://emmadubois.photo"
    },
    contact: {
      email: "hello@emmadubois.photo"
    },
    badges: [
      { label: "Influencer", type: "featured" },
      { label: "Verified", type: "verified" }
    ],
    online: true,
    categories: ["Photographie", "Contenu", "Influence"]
  },
  {
    id: "5",
    type: "student",
    name: "Thomas Leroy",
    title: "Étudiant en Informatique",
    company: "École 42",
    location: {
      city: "Paris",
      country: "France"
    },
    avatar: "/avatars/thomas-leroy.jpg",
    bio: "Étudiant passionné par le développement web et l'intelligence artificielle.",
    description: "En formation à l'École 42, je recherche des stages et projets pour développer mes compétences en développement full-stack.",
    skills: ["JavaScript", "Python", "Git", "Linux", "C", "SQL"],
    interests: ["IA", "Blockchain", "Gaming", "Open Source"],
    availability: "available",
    followers: 156,
    projects: 12,
    socialLinks: {
      github: "https://github.com/thomasleroy",
      linkedin: "https://linkedin.com/in/thomasleroy"
    },
    contact: {
      email: "thomas.leroy@student.42.fr"
    },
    badges: [
      { label: "Student", type: "verified" }
    ],
    online: true,
    categories: ["Étudiant", "Développement", "Stage"]
  },
  {
    id: "6",
    type: "expert",
    name: "Dr. Marie Rousseau",
    title: "Expert en Cybersécurité",
    company: "SecureIT Consulting",
    location: {
      city: "Lille",
      country: "France"
    },
    avatar: "/avatars/marie-rousseau.jpg",
    bio: "Experte en cybersécurité avec 12 ans d'expérience, spécialisée dans l'audit et la conformité RGPD.",
    description: "Je conseille les entreprises sur leurs stratégies de sécurité informatique et accompagne la mise en conformité RGPD.",
    experience: "12 ans",
    skills: ["Audit sécurité", "RGPD", "Pentesting", "ISO 27001", "Forensic", "Formation"],
    specialties: ["Audit de sécurité", "Conformité RGPD", "Formation cyber"],
    certifications: [
      {
        name: "CISSP",
        issuer: "ISC²",
        date: "2020-09"
      },
      {
        name: "CISA",
        issuer: "ISACA",
        date: "2019-06"
      }
    ],
    rating: 4.9,
    reviews: 45,
    stats: {
      projectsCompleted: 78,
      clientsSatisfied: 75,
      yearsExperience: 12,
      responseTime: "< 6h",
      successRate: 100
    },
    hourlyRate: {
      amount: 150,
      currency: "EUR"
    },
    contact: {
      email: "marie.rousseau@secureit.fr",
      website: "https://secureit-consulting.fr"
    },
    badges: [
      { label: "Expert", type: "expert" },
      { label: "Certified", type: "verified" }
    ],
    verified: true,
    categories: ["Cybersécurité", "Consultation", "Formation"]
  }
];

function getProfileTypeIcon(type: ProfileItem['type'], className = "w-4 h-4") {
  const iconMap = {
    "professional": <Briefcase className={className} />,
    "personal": <User className={className} />,
    "business": <Building className={className} />,
    "freelancer": <Code className={className} />,
    "student": <GraduationCap className={className} />,
    "creator": <Camera className={className} />,
    "influencer": <Star className={className} />,
    "expert": <Award className={className} />
  };
  
  return iconMap[type] || <User className={className} />;
}

function getBadgeColor(type: string) {
  const colorMap = {
    "verified": "bg-blue-100 text-blue-800",
    "premium": "bg-purple-100 text-purple-800", 
    "expert": "bg-orange-100 text-orange-800",
    "top-rated": "bg-green-100 text-green-800",
    "featured": "bg-yellow-100 text-yellow-800"
  };
  return colorMap[type as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
}

function getAvailabilityColor(availability?: string) {
  switch (availability) {
    case "available": return "bg-green-500";
    case "busy": return "bg-yellow-500";
    case "not-available": return "bg-red-500";
    default: return "bg-gray-400";
  }
}

function ProfileCard({ 
  profile, 
  variant = "grid",
  theme = "light",
  onProfileClick,
  onContact,
  onFollow,
  onBookmark,
  onMessage,
  onHire,
  enableContact = false,
  enableFollow = false,
  enableBookmark = false
}: { 
  profile: ProfileItem;
  variant?: ProfilesSectionProps['variant'];
  theme?: "light" | "dark";
  onProfileClick?: (profile: ProfileItem) => void;
  onContact?: (profile: ProfileItem) => void;
  onFollow?: (profile: ProfileItem) => void;
  onBookmark?: (profile: ProfileItem) => void;
  onMessage?: (profile: ProfileItem) => void;
  onHire?: (profile: ProfileItem) => void;
  enableContact?: boolean;
  enableFollow?: boolean;
  enableBookmark?: boolean;
}) {

  if (variant === "list") {
    return (
      <div className={cn(
        "flex items-start space-x-6 p-6 border rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
        profile.featured && "ring-2 ring-blue-500 ring-opacity-50"
      )} onClick={() => onProfileClick?.(profile)}>
        
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {getProfileTypeIcon(profile.type, "w-8 h-8 text-gray-400")}
              </div>
            )}
          </div>
          {profile.online && (
            <div className={cn(
              "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white",
              getAvailabilityColor(profile.availability)
            )} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold leading-tight">{profile.name}</h3>
                {profile.verified && (
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                )}
                {profile.badges?.slice(0, 2).map((badge, index) => (
                  <Badge key={index} className={cn("text-xs", getBadgeColor(badge.type))}>
                    {badge.label}
                  </Badge>
                ))}
              </div>
              
              {profile.title && (
                <p className="text-blue-600 font-medium mb-1">{profile.title}</p>
              )}
              
              {profile.company && (
                <p className={cn(
                  "text-sm mb-2",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  <Building className="w-4 h-4 inline mr-1" />
                  {profile.company}
                </p>
              )}
              
              <p className={cn(
                "text-sm leading-relaxed mb-3 line-clamp-2",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>
                {profile.bio}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {enableBookmark && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onBookmark?.(profile); }}>
                  <Bookmark className="w-4 h-4" />
                </Button>
              )}
              {enableFollow && (
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onFollow?.(profile); }}>
                  <UserPlus className="w-4 h-4 mr-1" />
                  Suivre
                </Button>
              )}
              {enableContact && (
                <Button size="sm" onClick={(e) => { e.stopPropagation(); onContact?.(profile); }}>
                  <Mail className="w-4 h-4 mr-1" />
                  Contact
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-4">
              {profile.location && (
                <span className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {profile.location.city}
                  {profile.location.remote && (
                    <Badge className="ml-1 text-xs bg-green-100 text-green-800">Remote</Badge>
                  )}
                </span>
              )}
              
              {profile.rating && (
                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                  {profile.rating} ({profile.reviews})
                </span>
              )}
              
              {profile.hourlyRate && (
                <span className="font-medium text-blue-600">
                  {profile.hourlyRate.amount}€/h
                </span>
              )}
              
              {profile.followers && (
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {profile.followers.toLocaleString()} followers
                </span>
              )}
            </div>
            
            {profile.lastSeen && !profile.online && (
              <span className="text-gray-400">
                {profile.lastSeen}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1 mb-3 flex-wrap gap-1">
            {profile.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {profile.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{profile.skills.length - 4}
              </Badge>
            )}
          </div>

          {profile.stats && (
            <div className="flex items-center space-x-4 text-xs">
              {profile.stats.projectsCompleted && (
                <span>
                  <strong>{profile.stats.projectsCompleted}</strong> projets
                </span>
              )}
              {profile.stats.successRate && (
                <span>
                  <strong>{profile.stats.successRate}%</strong> succès
                </span>
              )}
              {profile.stats.responseTime && (
                <span>
                  Répond en <strong>{profile.stats.responseTime}</strong>
                </span>
              )}
            </div>
          )}
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
    );
  }

  if (variant === "table") {
    return (
      <tr className={cn(
        "transition-colors hover:bg-gray-50 cursor-pointer",
        theme === "dark" && "hover:bg-gray-800"
      )} onClick={() => onProfileClick?.(profile)}>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {getProfileTypeIcon(profile.type, "w-5 h-5 text-gray-400")}
                  </div>
                )}
              </div>
              {profile.online && (
                <div className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white",
                  getAvailabilityColor(profile.availability)
                )} />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{profile.name}</span>
                {profile.verified && <CheckCircle className="w-4 h-4 text-blue-600" />}
              </div>
              <span className="text-sm text-gray-500">{profile.title}</span>
            </div>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <Badge variant="outline" className="text-xs">
            {getProfileTypeIcon(profile.type, "w-3 h-3")}
            <span className="ml-1 capitalize">{profile.type}</span>
          </Badge>
        </td>
        
        <td className="px-6 py-4">
          {profile.location?.city}
          {profile.location?.remote && (
            <Badge className="ml-1 text-xs bg-green-100 text-green-800">Remote</Badge>
          )}
        </td>
        
        <td className="px-6 py-4">
          {profile.rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              {profile.rating}
            </div>
          )}
        </td>
        
        <td className="px-6 py-4">
          {profile.hourlyRate && (
            <span className="font-medium">{profile.hourlyRate.amount}€/h</span>
          )}
        </td>
        
        <td className="px-6 py-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onContact?.(profile); }}>
              Contact
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  // Default grid variant
  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg cursor-pointer group",
      theme === "dark" && "bg-gray-800 border-gray-700",
      profile.featured && "ring-2 ring-blue-500 ring-opacity-50"
    )} onClick={() => onProfileClick?.(profile)}>
      
      {/* Cover Image */}
      {profile.coverImage && (
        <div className="relative h-24 overflow-hidden">
          <img 
            src={profile.coverImage} 
            alt={`${profile.name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <CardHeader className="relative">
        {/* Avatar */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className={cn(
              "w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-4 border-white",
              profile.coverImage && "-mt-8"
            )}>
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {getProfileTypeIcon(profile.type, "w-8 h-8 text-gray-400")}
                </div>
              )}
            </div>
            {profile.online && (
              <div className={cn(
                "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white",
                getAvailabilityColor(profile.availability)
              )} />
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {enableBookmark && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => { e.stopPropagation(); onBookmark?.(profile); }}
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            )}
            {profile.hourlyRate && (
              <Badge className="text-sm font-medium">
                {profile.hourlyRate.amount}€/h
              </Badge>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <CardTitle className="text-lg leading-tight">{profile.name}</CardTitle>
            {profile.verified && (
              <CheckCircle className="w-5 h-5 text-blue-600" />
            )}
          </div>
          
          {profile.title && (
            <p className="text-blue-600 font-medium mb-2">{profile.title}</p>
          )}
          
          {profile.company && (
            <p className={cn(
              "text-sm mb-3 flex items-center",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              <Building className="w-4 h-4 mr-1" />
              {profile.company}
            </p>
          )}
        </div>

        {/* Badges */}
        <div className="flex items-center space-x-1 mb-3 flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            {getProfileTypeIcon(profile.type, "w-3 h-3")}
            <span className="ml-1 capitalize">{profile.type}</span>
          </Badge>
          
          {profile.badges?.slice(0, 2).map((badge, index) => (
            <Badge key={index} className={cn("text-xs", getBadgeColor(badge.type))}>
              {badge.label}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {/* Bio */}
        <p className={cn(
          "text-sm leading-relaxed mb-4 line-clamp-3",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          {profile.bio}
        </p>

        {/* Location & Info */}
        <div className="space-y-2 mb-4">
          {profile.location && (
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              <span>
                {profile.location.city}
                {profile.location.remote && (
                  <Badge className="ml-2 text-xs bg-green-100 text-green-800">
                    Remote
                  </Badge>
                )}
              </span>
            </div>
          )}
          
          {profile.experience && (
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              <span>{profile.experience} d'expérience</span>
            </div>
          )}
          
          {profile.rating && (
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              <span>{profile.rating} ({profile.reviews} avis)</span>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="flex items-center space-x-1 mb-4 flex-wrap gap-1">
          {profile.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {profile.skills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{profile.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Stats */}
        {profile.stats && (
          <div className="grid grid-cols-2 gap-2 mb-4 text-center">
            {profile.stats.projectsCompleted && (
              <div>
                <div className="text-lg font-bold text-blue-600">
                  {profile.stats.projectsCompleted}
                </div>
                <div className="text-xs text-gray-500">Projets</div>
              </div>
            )}
            {profile.stats.successRate && (
              <div>
                <div className="text-lg font-bold text-green-600">
                  {profile.stats.successRate}%
                </div>
                <div className="text-xs text-gray-500">Succès</div>
              </div>
            )}
          </div>
        )}

        {/* Social Links */}
        {profile.socialLinks && (
          <div className="flex items-center justify-center space-x-2 mb-4">
            {profile.socialLinks.linkedin && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); window.open(profile.socialLinks?.linkedin); }}>
                <Linkedin className="w-4 h-4" />
              </Button>
            )}
            {profile.socialLinks.github && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); window.open(profile.socialLinks?.github); }}>
                <Github className="w-4 h-4" />
              </Button>
            )}
            {profile.socialLinks.twitter && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); window.open(profile.socialLinks?.twitter); }}>
                <Twitter className="w-4 h-4" />
              </Button>
            )}
            {profile.socialLinks.website && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); window.open(profile.socialLinks?.website); }}>
                <Globe className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          {enableFollow && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={(e) => { e.stopPropagation(); onFollow?.(profile); }}
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Suivre
            </Button>
          )}
          
          {enableContact && (
            <Button
              size="sm"
              className="flex-1"
              onClick={(e) => { e.stopPropagation(); onContact?.(profile); }}
            >
              <Mail className="w-4 h-4 mr-1" />
              Contact
            </Button>
          )}
          
          {onMessage && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onMessage?.(profile); }}
            >
              <MessageSquare className="w-4 h-4" />
            </Button>
          )}
          
          {onHire && profile.type === "freelancer" && (
            <Button
              size="sm"
              className="flex-1"
              onClick={(e) => { e.stopPropagation(); onHire?.(profile); }}
            >
              Embaucher
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfilesSection({
  variant = "grid",
  title = "Profils",
  description = "Découvrez des professionnels talentueux et connectez-vous avec eux pour vos projets.",
  profiles = defaultProfiles,
  showSearch = true,
  showFilters = true,
  showStats = true,
  maxVisible,
  enableContact = false,
  enableFollow = false,
  enableBookmark = false,
  className,
  theme = "light",
  onProfileClick,
  onContact,
  onFollow,
  onBookmark,
  onMessage,
  onHire
}: ProfilesSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("all");
  const [selectedLocation, setSelectedLocation] = React.useState("all");
  const [selectedSkill, setSelectedSkill] = React.useState("all");
  const [showAll, setShowAll] = React.useState(false);

  // Filter profiles
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = !searchTerm || 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || profile.type === selectedType;
    const matchesLocation = selectedLocation === "all" || 
      (selectedLocation === "remote" && profile.location?.remote) ||
      profile.location?.city === selectedLocation;
    const matchesSkill = selectedSkill === "all" || 
      profile.skills.some(skill => skill === selectedSkill);
    return matchesSearch && matchesType && matchesLocation && matchesSkill;
  });

  const displayedProfiles = maxVisible && !showAll 
    ? filteredProfiles.slice(0, maxVisible)
    : filteredProfiles;

  const types = Array.from(new Set(profiles.map(profile => profile.type)));
  const cities = Array.from(new Set(profiles.map(profile => profile.location?.city).filter(Boolean)));
  const skills = Array.from(new Set(profiles.flatMap(profile => profile.skills)));

  // Stats
  const totalProfiles = profiles.length;
  const availableProfiles = profiles.filter(profile => profile.availability === "available").length;
  const verifiedProfiles = profiles.filter(profile => profile.verified).length;
  const avgRating = profiles.reduce((acc, profile) => acc + (profile.rating || 0), 0) / profiles.length;

  if (variant === "table") {
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
                  <input
                    type="text"
                    placeholder="Rechercher un profil..."
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
                    <option value="remote">Remote</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>

                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className={cn(
                      "px-3 py-2 border rounded-lg text-sm",
                      theme === "dark" 
                        ? "bg-gray-800 border-gray-700 text-white" 
                        : "bg-white border-gray-300"
                    )}
                  >
                    <option value="all">Toutes compétences</option>
                    {skills.slice(0, 10).map((skill) => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={cn(
                  "border-b",
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                )}>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Profil
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Localisation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Tarif
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={cn(
                "divide-y",
                theme === "dark" ? "divide-gray-700" : "divide-gray-200"
              )}>
                {displayedProfiles.map((profile) => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    variant="table"
                    theme={theme}
                    onProfileClick={onProfileClick}
                    onContact={onContact}
                    onFollow={onFollow}
                    onBookmark={onBookmark}
                    onMessage={onMessage}
                    onHire={onHire}
                    enableContact={enableContact}
                    enableFollow={enableFollow}
                    enableBookmark={enableBookmark}
                  />
                ))}
              </tbody>
            </table>
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
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalProfiles}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Profils
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{availableProfiles}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Disponibles
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{verifiedProfiles}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Vérifiés
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
                  placeholder="Rechercher un profil..."
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
                  <option value="remote">Remote</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>

                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className={cn(
                    "px-3 py-2 border rounded-lg text-sm",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                >
                  <option value="all">Toutes compétences</option>
                  {skills.slice(0, 10).map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Profiles */}
        <div className={cn(
          variant === "list" 
            ? "space-y-6" 
            : variant === "masonry"
            ? "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        )}>
          {displayedProfiles.map((profile) => (
            <div key={profile.id} className={variant === "masonry" ? "break-inside-avoid" : ""}>
              <ProfileCard
                profile={profile}
                variant={variant}
                theme={theme}
                onProfileClick={onProfileClick}
                onContact={onContact}
                onFollow={onFollow}
                onBookmark={onBookmark}
                onMessage={onMessage}
                onHire={onHire}
                enableContact={enableContact}
                enableFollow={enableFollow}
                enableBookmark={enableBookmark}
              />
            </div>
          ))}
        </div>

        {/* Load More */}
        {maxVisible && filteredProfiles.length > maxVisible && !showAll && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              onClick={() => setShowAll(true)}
              className="group"
            >
              Voir tous les profils ({filteredProfiles.length})
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export type { ProfilesSectionProps, ProfileItem };
