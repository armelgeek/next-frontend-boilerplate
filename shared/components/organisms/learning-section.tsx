"use client";

import React from "react";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Button } from "@/shared/components/atoms/ui/button";
import { 
  Clock,
  Calendar,
  User,
  Users,
  Star,
  Heart,
  Share,
  MessageSquare,
  ThumbsUp,
  Eye,
  MapPin,
  Bookmark,
  ArrowRight,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Download,
  ExternalLink,
  Search,
  Filter,
  Grid,
  List,
  Tag,
  Zap,
  TrendingUp,
  Award,
  CheckCircle,
  Building,
  Briefcase,
  GraduationCap,
  Code,
  Palette,
  Camera,
  Music,
  Video,
  Mic,
  Monitor,
  Smartphone,
  Globe,
  Database,
  Server,
  Cloud,
  Shield,
  Settings,
  Target,
  Layers,
  BarChart3,
  PieChart,
  LineChart,
  TrendingDown,
  AlertCircle,
  Info,
  HelpCircle,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Github,
  FileText,
  Book
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface LearningItem {
  id: string;
  title: string;
  description: string;
  type: "course" | "tutorial" | "workshop" | "webinar" | "certification" | "bootcamp" | "masterclass" | "video" | "article" | "book";
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: string;
  subject: string;
  duration: {
    value: number;
    unit: "minutes" | "hours" | "days" | "weeks" | "months";
  };
  format: "online" | "offline" | "hybrid" | "self-paced" | "live" | "recorded";
  language: string;
  instructor?: {
    name: string;
    avatar?: string;
    title: string;
    company?: string;
    bio?: string;
    rating?: number;
    students?: number;
    verified?: boolean;
  };
  institution?: {
    name: string;
    logo?: string;
    verified?: boolean;
    accredited?: boolean;
  };
  price: {
    free: boolean;
    amount?: number;
    currency?: string;
    originalPrice?: number;
    scholarshipAvailable?: boolean;
  };
  rating?: number;
  reviews?: number;
  students?: number;
  completions?: number;
  difficulty?: number; // 1-5 scale
  prerequisites?: string[];
  skills: string[];
  tools?: string[];
  certificate?: {
    provided: boolean;
    accredited?: boolean;
    cpe?: number; // continuing education credits
  };
  schedule?: {
    startDate?: string;
    endDate?: string;
    sessions?: Array<{
      date: string;
      time: string;
      duration: number;
      topic: string;
    }>;
  };
  content?: {
    modules?: number;
    lessons?: number;
    exercises?: number;
    projects?: number;
    quizzes?: number;
  };
  features?: string[];
  requirements?: string[];
  outcomes?: string[];
  image?: string;
  video?: string;
  tags: string[];
  badges?: Array<{
    label: string;
    type: "bestseller" | "popular" | "new" | "updated" | "certified" | "featured";
    color?: string;
  }>;
  stats?: {
    enrollment?: number;
    completion?: number;
    satisfaction?: number;
    jobPlacement?: number;
  };
  provider?: {
    name: string;
    logo?: string;
    website?: string;
    verified?: boolean;
  };
  access?: {
    lifetime?: boolean;
    mobile?: boolean;
    offline?: boolean;
    community?: boolean;
  };
  featured?: boolean;
  trending?: boolean;
  popular?: boolean;
  updated?: string;
  created?: string;
}

interface LearningSectionProps {
  variant?: "grid" | "list" | "cards" | "table" | "featured" | "catalog";
  title?: string;
  description?: string;
  items?: LearningItem[];
  showSearch?: boolean;
  showFilters?: boolean;
  showStats?: boolean;
  maxVisible?: number;
  enableWishlist?: boolean;
  enableShare?: boolean;
  enablePreview?: boolean;
  className?: string;
  theme?: "light" | "dark";
  onItemClick?: (item: LearningItem) => void;
  onEnroll?: (item: LearningItem) => void;
  onWishlist?: (item: LearningItem) => void;
  onShare?: (item: LearningItem) => void;
  onPreview?: (item: LearningItem) => void;
  onInstructorClick?: (instructor: LearningItem['instructor']) => void;
}

const defaultItems: LearningItem[] = [
  {
    id: "1",
    title: "Développement Web Complet : HTML, CSS, JavaScript & React",
    description: "Apprenez le développement web moderne de A à Z. Créez des applications web réelles avec les dernières technologies et frameworks.",
    type: "course",
    level: "beginner",
    category: "Développement",
    subject: "Web Development",
    duration: { value: 40, unit: "hours" },
    format: "self-paced",
    language: "français",
    instructor: {
      name: "Alexandre Martin",
      avatar: "/instructors/alex-martin.jpg",
      title: "Senior Full Stack Developer",
      company: "Google",
      bio: "10 ans d'expérience en développement web",
      rating: 4.9,
      students: 45000,
      verified: true
    },
    price: {
      free: false,
      amount: 89,
      currency: "EUR",
      originalPrice: 149,
      scholarshipAvailable: true
    },
    rating: 4.8,
    reviews: 3542,
    students: 28340,
    completions: 23890,
    difficulty: 2,
    prerequisites: ["Connaissances informatiques de base"],
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
    tools: ["VS Code", "Git", "Chrome DevTools", "Figma"],
    certificate: {
      provided: true,
      accredited: true,
      cpe: 40
    },
    content: {
      modules: 12,
      lessons: 156,
      exercises: 89,
      projects: 8,
      quizzes: 45
    },
    features: [
      "Projets pratiques",
      "Support instructeur",
      "Communauté étudiants",
      "Accès à vie",
      "Mises à jour gratuites"
    ],
    requirements: [
      "Ordinateur avec accès internet",
      "Aucune expérience préalable requise"
    ],
    outcomes: [
      "Créer des sites web modernes",
      "Maîtriser React et Node.js",
      "Déployer des applications",
      "Travailler en équipe avec Git"
    ],
    image: "/courses/web-development.jpg",
    video: "/previews/web-dev-intro.mp4",
    tags: ["web", "react", "javascript", "frontend", "backend"],
    badges: [
      { label: "Bestseller", type: "bestseller" },
      { label: "Mis à jour", type: "updated" }
    ],
    stats: {
      enrollment: 28340,
      completion: 84,
      satisfaction: 96,
      jobPlacement: 78
    },
    provider: {
      name: "TechAcademy",
      logo: "/providers/tech-academy.png",
      website: "https://techacademy.fr",
      verified: true
    },
    access: {
      lifetime: true,
      mobile: true,
      offline: true,
      community: true
    },
    featured: true,
    popular: true,
    updated: "2024-06-15",
    created: "2023-01-10"
  },
  {
    id: "2",
    title: "Data Science avec Python : de Zero à Expert",
    description: "Maîtrisez la science des données avec Python. Pandas, NumPy, Matplotlib, Machine Learning et projets réels.",
    type: "course",
    level: "intermediate",
    category: "Data Science",
    subject: "Python & Analytics",
    duration: { value: 60, unit: "hours" },
    format: "self-paced",
    language: "français",
    instructor: {
      name: "Dr. Sarah Chen",
      avatar: "/instructors/sarah-chen.jpg",
      title: "Data Scientist Principal",
      company: "Netflix",
      bio: "PhD en Machine Learning, 8 ans d'expérience",
      rating: 4.9,
      students: 32000,
      verified: true
    },
    price: {
      free: false,
      amount: 129,
      currency: "EUR",
      originalPrice: 199
    },
    rating: 4.9,
    reviews: 2876,
    students: 18560,
    completions: 14200,
    difficulty: 3,
    prerequisites: ["Python de base", "Mathématiques niveau lycée"],
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "Machine Learning"],
    tools: ["Jupyter Notebook", "Anaconda", "Git", "Tableau"],
    certificate: {
      provided: true,
      accredited: true,
      cpe: 60
    },
    content: {
      modules: 15,
      lessons: 189,
      exercises: 120,
      projects: 12,
      quizzes: 60
    },
    features: [
      "Projets avec datasets réels",
      "Portfolio GitHub",
      "Mentorat personnalisé",
      "Certification reconnue"
    ],
    requirements: [
      "Connaissances Python de base",
      "Mathématiques niveau terminale"
    ],
    outcomes: [
      "Analyser des données complexes",
      "Créer des modèles ML",
      "Visualiser des insights",
      "Décrocher un emploi Data Scientist"
    ],
    image: "/courses/data-science.jpg",
    tags: ["python", "data", "machine-learning", "analytics"],
    badges: [
      { label: "Populaire", type: "popular" },
      { label: "Certifié", type: "certified" }
    ],
    stats: {
      enrollment: 18560,
      completion: 76,
      satisfaction: 98,
      jobPlacement: 85
    },
    featured: true,
    trending: true
  },
  {
    id: "3",
    title: "Workshop : Design UI/UX avec Figma",
    description: "Atelier pratique de 2 jours pour maîtriser Figma et les principes du design d'interface utilisateur moderne.",
    type: "workshop",
    level: "beginner",
    category: "Design",
    subject: "UI/UX Design",
    duration: { value: 2, unit: "days" },
    format: "live",
    language: "français",
    instructor: {
      name: "Marie Dubois",
      avatar: "/instructors/marie-dubois.jpg",
      title: "UX Designer Senior",
      company: "Airbnb",
      rating: 4.8,
      students: 5600,
      verified: true
    },
    schedule: {
      startDate: "2024-08-15",
      endDate: "2024-08-16",
      sessions: [
        {
          date: "2024-08-15",
          time: "09:00",
          duration: 480,
          topic: "Fondamentaux UI/UX et prise en main Figma"
        },
        {
          date: "2024-08-16",
          time: "09:00",
          duration: 480,
          topic: "Prototypage et tests utilisateurs"
        }
      ]
    },
    price: {
      free: false,
      amount: 299,
      currency: "EUR",
      originalPrice: 399
    },
    rating: 4.7,
    reviews: 234,
    students: 480,
    difficulty: 1,
    skills: ["Figma", "UI Design", "UX Research", "Prototypage", "Design System"],
    tools: ["Figma", "FigJam", "Maze", "Hotjar"],
    certificate: {
      provided: true,
      accredited: false
    },
    features: [
      "Petit groupe (max 20)",
      "Projets personnalisés",
      "Feedback individuel",
      "Templates Figma inclus"
    ],
    outcomes: [
      "Maîtriser Figma Professional",
      "Créer des prototypes interactifs",
      "Conduire des tests utilisateurs",
      "Construire un design system"
    ],
    image: "/courses/figma-workshop.jpg",
    tags: ["figma", "ui", "ux", "design", "prototyping"],
    badges: [
      { label: "Nouveau", type: "new" },
      { label: "Petit groupe", type: "featured" }
    ],
    stats: {
      enrollment: 480,
      completion: 95,
      satisfaction: 94
    }
  },
  {
    id: "4",
    title: "Certification AWS Solutions Architect",
    description: "Préparation complète à la certification AWS Solutions Architect Associate. Labs pratiques et examens blancs inclus.",
    type: "certification",
    level: "intermediate",
    category: "Cloud",
    subject: "AWS & Architecture",
    duration: { value: 8, unit: "weeks" },
    format: "hybrid",
    language: "français",
    instructor: {
      name: "Thomas Laurent",
      avatar: "/instructors/thomas-laurent.jpg",
      title: "AWS Solutions Architect",
      company: "Amazon",
      rating: 4.9,
      students: 12000,
      verified: true
    },
    price: {
      free: false,
      amount: 599,
      currency: "EUR",
      originalPrice: 899
    },
    rating: 4.8,
    reviews: 1456,
    students: 8900,
    completions: 7120,
    difficulty: 4,
    prerequisites: ["Expérience IT de base", "Notions de réseaux"],
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "VPC", "IAM", "Lambda"],
    certificate: {
      provided: true,
      accredited: true,
      cpe: 80
    },
    content: {
      modules: 10,
      lessons: 95,
      exercises: 150,
      projects: 6,
      quizzes: 200
    },
    features: [
      "Labs AWS gratuits",
      "Examens blancs",
      "Support certification",
      "Garantie réussite"
    ],
    outcomes: [
      "Réussir la certification AWS SAA",
      "Architecturer des solutions cloud",
      "Augmenter son salaire de 30%",
      "Décrocher un poste Cloud Architect"
    ],
    image: "/courses/aws-certification.jpg",
    tags: ["aws", "cloud", "certification", "architecture"],
    badges: [
      { label: "Certifiant", type: "certified" },
      { label: "Garantie réussite", type: "featured" }
    ],
    stats: {
      enrollment: 8900,
      completion: 80,
      satisfaction: 97,
      jobPlacement: 92
    },
    featured: true
  },
  {
    id: "5",
    title: "Webinaire : Intelligence Artificielle et Éthique",
    description: "Conférence en ligne sur les enjeux éthiques de l'IA avec des experts internationaux. Questions-réponses incluses.",
    type: "webinar",
    level: "beginner",
    category: "Intelligence Artificielle",
    subject: "AI Ethics",
    duration: { value: 90, unit: "minutes" },
    format: "live",
    language: "français",
    schedule: {
      startDate: "2024-07-20",
      sessions: [
        {
          date: "2024-07-20",
          time: "14:00",
          duration: 90,
          topic: "IA et Éthique : Défis et Solutions"
        }
      ]
    },
    price: {
      free: true
    },
    rating: 4.6,
    reviews: 890,
    students: 15600,
    difficulty: 1,
    skills: ["AI Ethics", "Machine Learning", "Regulation", "Society Impact"],
    features: [
      "Accès gratuit",
      "Replay 30 jours",
      "Q&A en direct",
      "Certificat de participation"
    ],
    outcomes: [
      "Comprendre les enjeux éthiques de l'IA",
      "Identifier les biais algorithmiques",
      "Connaître la réglementation",
      "Participer au débat sociétal"
    ],
    image: "/courses/ai-ethics.jpg",
    tags: ["ai", "ethics", "society", "regulation"],
    badges: [
      { label: "Gratuit", type: "featured" },
      { label: "Expert speakers", type: "new" }
    ],
    stats: {
      enrollment: 15600,
      completion: 92,
      satisfaction: 89
    },
    trending: true
  },
  {
    id: "6",
    title: "Tutoriel : API REST avec Node.js et Express",
    description: "Guide pratique pour créer une API REST complète avec authentification, base de données et tests.",
    type: "tutorial",
    level: "intermediate",
    category: "Développement",
    subject: "Backend Development",
    duration: { value: 6, unit: "hours" },
    format: "self-paced",
    language: "français",
    instructor: {
      name: "Pierre Martin",
      avatar: "/instructors/pierre-martin.jpg",
      title: "Backend Developer",
      company: "Freelance",
      rating: 4.7,
      students: 8900,
      verified: false
    },
    price: {
      free: true
    },
    rating: 4.5,
    reviews: 567,
    students: 4520,
    completions: 3890,
    difficulty: 3,
    prerequisites: ["JavaScript ES6+", "Notions de HTTP"],
    skills: ["Node.js", "Express", "MongoDB", "JWT", "Testing"],
    tools: ["Node.js", "MongoDB", "Postman", "Jest"],
    content: {
      modules: 5,
      lessons: 28,
      exercises: 15,
      projects: 1
    },
    features: [
      "Code source complet",
      "Exercices corrigés",
      "Communauté Discord"
    ],
    outcomes: [
      "Créer une API REST professionnelle",
      "Implémenter l'authentification JWT",
      "Tester son code",
      "Déployer en production"
    ],
    image: "/courses/nodejs-api.jpg",
    tags: ["nodejs", "api", "backend", "express"],
    badges: [
      { label: "Gratuit", type: "featured" }
    ],
    stats: {
      enrollment: 4520,
      completion: 86,
      satisfaction: 91
    }
  }
];

function getTypeIcon(type: LearningItem['type'], className = "w-4 h-4") {
  const iconMap = {
    "course": <GraduationCap className={className} />,
    "tutorial": <Video className={className} />,
    "workshop": <Users className={className} />,
    "webinar": <Monitor className={className} />,
    "certification": <Award className={className} />,
    "bootcamp": <Zap className={className} />,
    "masterclass": <Star className={className} />,
    "video": <Play className={className} />,
    "article": <FileText className={className} />,
    "book": <Book className={className} />
  };
  
  return iconMap[type] || <GraduationCap className={className} />;
}

function getLevelColor(level: string) {
  const colorMap = {
    "beginner": "bg-green-100 text-green-800",
    "intermediate": "bg-yellow-100 text-yellow-800",
    "advanced": "bg-orange-100 text-orange-800",
    "expert": "bg-red-100 text-red-800"
  };
  return colorMap[level as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
}

function getBadgeColor(type: string) {
  const colorMap = {
    "bestseller": "bg-yellow-100 text-yellow-800",
    "popular": "bg-blue-100 text-blue-800",
    "new": "bg-green-100 text-green-800",
    "updated": "bg-purple-100 text-purple-800",
    "certified": "bg-orange-100 text-orange-800",
    "featured": "bg-red-100 text-red-800"
  };
  return colorMap[type as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
}

function formatDuration(duration: LearningItem['duration']) {
  const units = {
    "minutes": "min",
    "hours": "h",
    "days": "j",
    "weeks": "sem",
    "months": "mois"
  };
  return `${duration.value} ${units[duration.unit]}`;
}

function LearningCard({ 
  item, 
  variant = "cards",
  theme = "light",
  onItemClick,
  onEnroll,
  onWishlist,
  onShare,
  onPreview,
  onInstructorClick,
  enableWishlist = false,
  enableShare = false,
  enablePreview = false
}: { 
  item: LearningItem;
  variant?: LearningSectionProps['variant'];
  theme?: "light" | "dark";
  onItemClick?: (item: LearningItem) => void;
  onEnroll?: (item: LearningItem) => void;
  onWishlist?: (item: LearningItem) => void;
  onShare?: (item: LearningItem) => void;
  onPreview?: (item: LearningItem) => void;
  onInstructorClick?: (instructor: LearningItem['instructor']) => void;
  enableWishlist?: boolean;
  enableShare?: boolean;
  enablePreview?: boolean;
}) {

  if (variant === "list") {
    return (
      <div className={cn(
        "flex items-start space-x-6 p-6 border rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
        item.featured && "ring-2 ring-blue-500 ring-opacity-50"
      )} onClick={() => onItemClick?.(item)}>
        
        {/* Image */}
        {item.image && (
          <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {getTypeIcon(item.type, "w-3 h-3")}
                  <span className="ml-1 capitalize">{item.type}</span>
                </Badge>
                <Badge className={cn("text-xs", getLevelColor(item.level))}>
                  {item.level}
                </Badge>
                {item.badges?.slice(0, 2).map((badge, index) => (
                  <Badge key={index} className={cn("text-xs", getBadgeColor(badge.type))}>
                    {badge.label}
                  </Badge>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold leading-tight mb-2">{item.title}</h3>
              <p className={cn(
                "text-sm leading-relaxed mb-3 line-clamp-2",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>
                {item.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {enableWishlist && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onWishlist?.(item); }}>
                  <Heart className="w-4 h-4" />
                </Button>
              )}
              {enableShare && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onShare?.(item); }}>
                  <Share className="w-4 h-4" />
                </Button>
              )}
              {enablePreview && item.video && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onPreview?.(item); }}>
                  <Play className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatDuration(item.duration)}
              </span>
              
              <span className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {item.students?.toLocaleString()} étudiants
              </span>
              
              {item.rating && (
                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                  {item.rating} ({item.reviews})
                </span>
              )}
              
              {item.format === "live" && item.schedule?.startDate && (
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(item.schedule.startDate).toLocaleDateString('fr-FR')}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {item.price.free ? (
                <span className="text-green-600 font-medium">Gratuit</span>
              ) : (
                <div className="text-right">
                  {item.price.originalPrice && (
                    <span className="text-gray-400 line-through text-xs">
                      {item.price.originalPrice}€
                    </span>
                  )}
                  <span className="font-bold text-blue-600 ml-1">
                    {item.price.amount}€
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            {item.instructor && (
              <button
                onClick={(e) => { e.stopPropagation(); onInstructorClick?.(item.instructor); }}
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
              >
                <span className="text-sm font-medium">{item.instructor.name}</span>
                {item.instructor.verified && (
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                )}
              </button>
            )}
            
            <Button
              onClick={(e) => { e.stopPropagation(); onEnroll?.(item); }}
              className="ml-4"
            >
              {item.type === "webinar" ? "S'inscrire" : "Commencer"}
            </Button>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
    );
  }

  if (variant === "featured" && item.featured) {
    return (
      <Card className={cn(
        "col-span-full transition-all duration-300 hover:shadow-lg cursor-pointer group overflow-hidden",
        theme === "dark" && "bg-gray-800 border-gray-700"
      )} onClick={() => onItemClick?.(item)}>
        
        <div className="md:flex">
          {/* Image */}
          {item.image && (
            <div className="md:w-1/2 relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {enablePreview && item.video && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm border-white/30"
                    onClick={(e) => { e.stopPropagation(); onPreview?.(item); }}
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Aperçu
                  </Button>
                </div>
              )}
              
              <div className="absolute top-4 left-4 flex gap-2">
                {item.badges?.slice(0, 3).map((badge, index) => (
                  <Badge key={index} className={cn("text-xs", getBadgeColor(badge.type))}>
                    {badge.label}
                  </Badge>
                ))}
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                {enableWishlist && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm border-white/30"
                    onClick={(e) => { e.stopPropagation(); onWishlist?.(item); }}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                )}
                {enableShare && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm border-white/30"
                    onClick={(e) => { e.stopPropagation(); onShare?.(item); }}
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="md:w-1/2 p-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="outline" className="text-sm">
                {getTypeIcon(item.type, "w-4 h-4")}
                <span className="ml-2 capitalize">{item.type}</span>
              </Badge>
              <Badge className={cn("text-sm", getLevelColor(item.level))}>
                {item.level}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {item.category}
              </Badge>
            </div>
            
            <CardTitle className="text-2xl leading-tight mb-4">{item.title}</CardTitle>
            
            <p className={cn(
              "text-base leading-relaxed mb-6",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {item.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                <span>{formatDuration(item.duration)}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                <span>{item.students?.toLocaleString()} étudiants</span>
              </div>
              
              {item.rating && (
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>{item.rating} ({item.reviews} avis)</span>
                </div>
              )}
              
              {item.certificate?.provided && (
                <div className="flex items-center text-sm">
                  <Award className="w-4 h-4 mr-2 text-purple-600" />
                  <span>Certificat inclus</span>
                </div>
              )}
            </div>

            {item.instructor && (
              <div className="flex items-center space-x-3 mb-6">
                {item.instructor.avatar && (
                  <img 
                    src={item.instructor.avatar} 
                    alt={item.instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onInstructorClick?.(item.instructor); }}
                    className="font-medium hover:text-blue-600 transition-colors"
                  >
                    {item.instructor.name}
                    {item.instructor.verified && (
                      <CheckCircle className="w-4 h-4 inline ml-1 text-blue-600" />
                    )}
                  </button>
                  <p className={cn(
                    "text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  )}>
                    {item.instructor.title}
                    {item.instructor.company && ` @ ${item.instructor.company}`}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                {item.price.free ? (
                  <div className="text-2xl font-bold text-green-600">Gratuit</div>
                ) : (
                  <div>
                    {item.price.originalPrice && (
                      <div className="text-lg text-gray-400 line-through">
                        {item.price.originalPrice}€
                      </div>
                    )}
                    <div className="text-2xl font-bold text-blue-600">
                      {item.price.amount}€
                    </div>
                  </div>
                )}
              </div>
              
              <Button
                size="lg"
                onClick={(e) => { e.stopPropagation(); onEnroll?.(item); }}
              >
                {item.type === "webinar" ? "S'inscrire" : "Commencer maintenant"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Default cards variant
  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg cursor-pointer group",
      theme === "dark" && "bg-gray-800 border-gray-700",
      item.featured && "ring-2 ring-blue-500 ring-opacity-50"
    )} onClick={() => onItemClick?.(item)}>
      
      {item.image && (
        <div className="relative overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={cn("text-xs", getLevelColor(item.level))}>
              {item.level}
            </Badge>
            {item.badges?.slice(0, 1).map((badge, index) => (
              <Badge key={index} className={cn("text-xs", getBadgeColor(badge.type))}>
                {badge.label}
              </Badge>
            ))}
          </div>
          
          <div className="absolute top-4 right-4 flex gap-2">
            {enableWishlist && (
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/30"
                onClick={(e) => { e.stopPropagation(); onWishlist?.(item); }}
              >
                <Heart className="w-4 h-4" />
              </Button>
            )}
            {enablePreview && item.video && (
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/30"
                onClick={(e) => { e.stopPropagation(); onPreview?.(item); }}
              >
                <Play className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Duration overlay */}
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-black/70 text-white text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {formatDuration(item.duration)}
            </Badge>
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {getTypeIcon(item.type, "w-3 h-3")}
                <span className="ml-1 capitalize">{item.type}</span>
              </Badge>
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
            </div>
            <CardTitle className="text-lg leading-tight line-clamp-2">{item.title}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className={cn(
          "text-sm leading-relaxed mb-4 line-clamp-3",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          {item.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2 text-blue-600" />
            <span>{item.students?.toLocaleString()} étudiants</span>
          </div>
          
          {item.rating && (
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              <span>{item.rating} ({item.reviews} avis)</span>
            </div>
          )}
          
          {item.format === "live" && item.schedule?.startDate && (
            <div className="flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              <span>Début : {new Date(item.schedule.startDate).toLocaleDateString('fr-FR')}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="flex items-center space-x-1 mb-4 flex-wrap gap-1">
          {item.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {item.skills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{item.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Instructor */}
        {item.instructor && (
          <div className="flex items-center space-x-2 mb-4">
            {item.instructor.avatar && (
              <img 
                src={item.instructor.avatar} 
                alt={item.instructor.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <button
                onClick={(e) => { e.stopPropagation(); onInstructorClick?.(item.instructor); }}
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                {item.instructor.name}
                {item.instructor.verified && (
                  <CheckCircle className="w-3 h-3 inline ml-1 text-blue-600" />
                )}
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            {item.price.free ? (
              <div className="text-lg font-bold text-green-600">Gratuit</div>
            ) : (
              <div>
                {item.price.originalPrice && (
                  <div className="text-sm text-gray-400 line-through">
                    {item.price.originalPrice}€
                  </div>
                )}
                <div className="text-lg font-bold text-blue-600">
                  {item.price.amount}€
                </div>
              </div>
            )}
          </div>
          
          <Button
            onClick={(e) => { e.stopPropagation(); onEnroll?.(item); }}
          >
            {item.type === "webinar" ? "S'inscrire" : "Commencer"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function LearningSection({
  variant = "cards",
  title = "Formations",
  description = "Développez vos compétences avec nos formations en ligne dispensées par des experts reconnus.",
  items = defaultItems,
  showSearch = true,
  showFilters = true,
  showStats = true,
  maxVisible,
  enableWishlist = false,
  enableShare = false,
  enablePreview = false,
  className,
  theme = "light",
  onItemClick,
  onEnroll,
  onWishlist,
  onShare,
  onPreview,
  onInstructorClick
}: LearningSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedLevel, setSelectedLevel] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState("all");
  const [showFreeOnly, setShowFreeOnly] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || item.level === selectedLevel;
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesFree = !showFreeOnly || item.price.free;
    return matchesSearch && matchesCategory && matchesLevel && matchesType && matchesFree;
  });

  const displayedItems = maxVisible && !showAll 
    ? filteredItems.slice(0, maxVisible)
    : filteredItems;

  const categories = Array.from(new Set(items.map(item => item.category)));
  const levels = Array.from(new Set(items.map(item => item.level)));
  const types = Array.from(new Set(items.map(item => item.type)));

  // Stats
  const totalItems = items.length;
  const freeItems = items.filter(item => item.price.free).length;
  const avgRating = items.reduce((acc, item) => acc + (item.rating || 0), 0) / items.length;
  const totalStudents = items.reduce((acc, item) => acc + (item.students || 0), 0);

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
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalItems}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Formations
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{freeItems}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Gratuites
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
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{(totalStudents / 1000).toFixed(0)}k</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Étudiants
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
                  placeholder="Rechercher une formation..."
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
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className={cn(
                    "px-3 py-2 border rounded-lg text-sm",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                >
                  <option value="all">Tous niveaux</option>
                  {levels.map((level) => (
                    <option key={level} value={level} className="capitalize">{level}</option>
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

                <label className="flex items-center space-x-2 px-3 py-2 border rounded-lg text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={(e) => setShowFreeOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>Gratuit uniquement</span>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Items */}
        <div className={cn(
          variant === "list" 
            ? "space-y-6" 
            : variant === "featured"
            ? "grid grid-cols-1 gap-8"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        )}>
          {displayedItems.map((item) => (
            <LearningCard
              key={item.id}
              item={item}
              variant={variant}
              theme={theme}
              onItemClick={onItemClick}
              onEnroll={onEnroll}
              onWishlist={onWishlist}
              onShare={onShare}
              onPreview={onPreview}
              onInstructorClick={onInstructorClick}
              enableWishlist={enableWishlist}
              enableShare={enableShare}
              enablePreview={enablePreview}
            />
          ))}
        </div>

        {/* Load More */}
        {maxVisible && filteredItems.length > maxVisible && !showAll && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              onClick={() => setShowAll(true)}
              className="group"
            >
              Voir toutes les formations ({filteredItems.length})
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export type { LearningSectionProps, LearningItem };
