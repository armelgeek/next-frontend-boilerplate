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
  Book,
  Calendar as CalendarIcon,
  MapPin as LocationIcon,
  Timer,
  Clock3,
  Plus,
  Minus,
  Edit,
  Trash,
  Copy,
  Move,
  RotateCcw,
  RefreshCw,
  Archive,
  FolderOpen,
  FileImage,
  FileVideo,
  Upload,
  Link,
  Hash,
  AtSign,
  DollarSign,
  Percent,
  Calculator,
  Ruler,
  Palette as ColorPalette,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Image,
  Layout,
  Layers2,
  Box,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "utility" | "productivity" | "development" | "design" | "calculator" | "converter" | "generator" | "validator" | "analyzer" | "formatter";
  tags: string[];
  icon?: string;
  color?: string;
  url?: string;
  features: string[];
  usage: {
    description: string;
    instructions?: string[];
    examples?: Array<{
      input: string;
      output: string;
      description: string;
    }>;
  };
  technical?: {
    language?: string;
    framework?: string;
    api?: string;
    version?: string;
    dependencies?: string[];
    requirements?: string[];
  };
  stats?: {
    uses: number;
    rating: number;
    reviews: number;
    favorites: number;
    lastUsed?: string;
  };
  access: {
    free: boolean;
    premium?: boolean;
    apiKey?: boolean;
    registration?: boolean;
    offline?: boolean;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    version: string;
    author?: string;
    license?: string;
    source?: string;
  };
  integrations?: Array<{
    name: string;
    type: "import" | "export" | "api" | "webhook";
    description: string;
  }>;
  limits?: {
    requests?: number;
    size?: string;
    duration?: string;
    concurrent?: number;
  };
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
  verified?: boolean;
}

interface ToolsSectionProps {
  variant?: "grid" | "list" | "categories" | "featured" | "compact" | "dashboard";
  title?: string;
  description?: string;
  items?: ToolItem[];
  showSearch?: boolean;
  showFilters?: boolean;
  showCategories?: boolean;
  showStats?: boolean;
  maxVisible?: number;
  enableFavorites?: boolean;
  enableShare?: boolean;
  enableExport?: boolean;
  className?: string;
  theme?: "light" | "dark";
  onItemClick?: (item: ToolItem) => void;
  onFavorite?: (item: ToolItem) => void;
  onShare?: (item: ToolItem) => void;
  onExport?: (item: ToolItem) => void;
  onCategoryClick?: (category: string) => void;
  onUse?: (item: ToolItem) => void;
}

const defaultItems: ToolItem[] = [
  {
    id: "1",
    name: "Générateur de mots de passe",
    description: "Créez des mots de passe sécurisés et personnalisables avec différents critères de complexité.",
    category: "Sécurité",
    type: "generator",
    tags: ["sécurité", "mot de passe", "générateur", "cryptographie"],
    icon: "🔐",
    color: "blue",
    url: "/tools/password-generator",
    features: [
      "Longueur personnalisable (4-128 caractères)",
      "Inclusion/exclusion de caractères spéciaux",
      "Support majuscules/minuscules",
      "Exclusion de caractères ambigus",
      "Génération en lot",
      "Vérification de force",
      "Historique des mots de passe"
    ],
    usage: {
      description: "Sélectionnez vos critères et générez instantanément des mots de passe sécurisés.",
      instructions: [
        "Choisissez la longueur souhaitée",
        "Sélectionnez les types de caractères",
        "Cliquez sur 'Générer'",
        "Copiez le mot de passe généré"
      ],
      examples: [
        {
          input: "Longueur: 16, Majuscules: Oui, Chiffres: Oui, Symboles: Oui",
          output: "K9$mP7@nX2qR8#Lz",
          description: "Mot de passe fort de 16 caractères"
        },
        {
          input: "Longueur: 12, Lettres uniquement",
          output: "AbCdEfGhIjKl",
          description: "Mot de passe alphabétique simple"
        }
      ]
    },
    technical: {
      language: "JavaScript",
      framework: "React",
      version: "2.1.0"
    },
    stats: {
      uses: 45670,
      rating: 4.8,
      reviews: 1234,
      favorites: 2890,
      lastUsed: "2025-07-14T10:30:00Z"
    },
    access: {
      free: true,
      offline: true
    },
    metadata: {
      createdAt: "2024-01-15T00:00:00Z",
      updatedAt: "2025-06-20T00:00:00Z",
      version: "2.1.0",
      author: "Security Team",
      license: "MIT"
    },
    integrations: [
      {
        name: "API REST",
        type: "api",
        description: "Génération via API pour applications tierces"
      }
    ],
    limits: {
      requests: 1000,
      concurrent: 10
    },
    featured: true,
    popular: true,
    verified: true
  },
  {
    id: "2",
    name: "Convertisseur d'unités",
    description: "Convertissez facilement entre différentes unités de mesure : longueur, poids, température, volume, etc.",
    category: "Conversion",
    type: "converter",
    tags: ["conversion", "unités", "mesure", "calculateur"],
    icon: "⚖️",
    color: "green",
    url: "/tools/unit-converter",
    features: [
      "Plus de 20 catégories d'unités",
      "Conversion bidirectionnelle",
      "Précision haute (15 décimales)",
      "Historique des conversions",
      "Favoris personnalisés",
      "Mode calculatrice",
      "Export des résultats"
    ],
    usage: {
      description: "Sélectionnez la catégorie, entrez la valeur et choisissez les unités source et cible.",
      instructions: [
        "Choisissez une catégorie (longueur, poids, etc.)",
        "Entrez la valeur à convertir",
        "Sélectionnez l'unité source",
        "Choisissez l'unité de destination",
        "Le résultat s'affiche automatiquement"
      ],
      examples: [
        {
          input: "100 kilomètres vers miles",
          output: "62.137 miles",
          description: "Conversion distance métrique vers impériale"
        },
        {
          input: "25°C vers Fahrenheit",
          output: "77°F",
          description: "Conversion température Celsius vers Fahrenheit"
        }
      ]
    },
    technical: {
      language: "TypeScript",
      framework: "React",
      version: "3.0.1"
    },
    stats: {
      uses: 89230,
      rating: 4.9,
      reviews: 567,
      favorites: 1456,
      lastUsed: "2025-07-14T09:15:00Z"
    },
    access: {
      free: true,
      offline: true
    },
    metadata: {
      createdAt: "2024-03-10T00:00:00Z",
      updatedAt: "2025-07-01T00:00:00Z",
      version: "3.0.1",
      author: "Math Tools Team",
      license: "Apache 2.0"
    },
    featured: true,
    popular: true,
    verified: true
  },
  {
    id: "3",
    name: "Générateur de QR Code",
    description: "Créez des codes QR personnalisés pour URLs, texte, cartes de visite, WiFi et plus encore.",
    category: "Générateurs",
    type: "generator",
    tags: ["qr code", "générateur", "codes", "partage"],
    icon: "📱",
    color: "purple",
    url: "/tools/qr-generator",
    features: [
      "Multiples types de contenu",
      "Personnalisation des couleurs",
      "Logos personnalisés au centre",
      "Différents formats d'export",
      "Correction d'erreur ajustable",
      "Prévisualisation en temps réel",
      "Génération en lot"
    ],
    usage: {
      description: "Choisissez le type de contenu, entrez les données et personnalisez l'apparence.",
      instructions: [
        "Sélectionnez le type de QR Code",
        "Entrez le contenu (URL, texte, etc.)",
        "Personnalisez les couleurs si souhaité",
        "Ajoutez un logo (optionnel)",
        "Téléchargez au format souhaité"
      ],
      examples: [
        {
          input: "URL: https://example.com",
          output: "QR Code scannable",
          description: "Code QR pour site web"
        },
        {
          input: "WiFi: SSID + mot de passe",
          output: "QR Code WiFi",
          description: "Connexion WiFi automatique"
        }
      ]
    },
    technical: {
      language: "JavaScript",
      framework: "React",
      api: "qrcode.js",
      version: "1.8.0"
    },
    stats: {
      uses: 23450,
      rating: 4.7,
      reviews: 345,
      favorites: 789,
      lastUsed: "2025-07-13T16:22:00Z"
    },
    access: {
      free: true,
      premium: true,
      offline: true
    },
    metadata: {
      createdAt: "2024-05-20T00:00:00Z",
      updatedAt: "2025-06-15T00:00:00Z",
      version: "1.8.0",
      author: "Design Tools",
      license: "MIT"
    },
    integrations: [
      {
        name: "API génération",
        type: "api",
        description: "Génération programmatique de QR codes"
      },
      {
        name: "Export Figma",
        type: "export",
        description: "Export direct vers Figma"
      }
    ],
    limits: {
      requests: 500,
      size: "10MB"
    },
    featured: false,
    popular: true,
    verified: true
  },
  {
    id: "4",
    name: "Minificateur CSS/JS",
    description: "Optimisez vos fichiers CSS et JavaScript en supprimant les espaces et commentaires inutiles.",
    category: "Développement",
    type: "utility",
    tags: ["minification", "css", "javascript", "optimisation", "performance"],
    icon: "🗜️",
    color: "orange",
    url: "/tools/minifier",
    features: [
      "Support CSS et JavaScript",
      "Minification avancée",
      "Préservation des licences",
      "Mode batch pour plusieurs fichiers",
      "Comparaison avant/après",
      "Statistiques de compression",
      "Download automatique"
    ],
    usage: {
      description: "Collez votre code ou uploadez un fichier pour le minifier instantanément.",
      instructions: [
        "Choisissez CSS ou JavaScript",
        "Collez le code ou uploadez un fichier",
        "Sélectionnez les options de minification",
        "Cliquez sur 'Minifier'",
        "Téléchargez le résultat optimisé"
      ],
      examples: [
        {
          input: "body { margin: 0; padding: 0; }",
          output: "body{margin:0;padding:0}",
          description: "CSS minifié"
        },
        {
          input: "function hello() { console.log('Hello'); }",
          output: "function hello(){console.log('Hello')}",
          description: "JavaScript minifié"
        }
      ]
    },
    technical: {
      language: "Node.js",
      framework: "Express",
      dependencies: ["terser", "clean-css"],
      version: "2.5.0"
    },
    stats: {
      uses: 12890,
      rating: 4.6,
      reviews: 156,
      favorites: 423,
      lastUsed: "2025-07-12T14:30:00Z"
    },
    access: {
      free: true,
      apiKey: false,
      offline: false
    },
    metadata: {
      createdAt: "2024-02-28T00:00:00Z",
      updatedAt: "2025-05-10T00:00:00Z",
      version: "2.5.0",
      author: "Dev Tools Team",
      license: "MIT",
      source: "https://github.com/devtools/minifier"
    },
    integrations: [
      {
        name: "CLI Tool",
        type: "api",
        description: "Outil en ligne de commande"
      },
      {
        name: "Webpack Plugin",
        type: "api",
        description: "Plugin pour Webpack"
      }
    ],
    limits: {
      size: "5MB",
      concurrent: 3
    },
    featured: false,
    popular: false,
    new: false,
    verified: true
  },
  {
    id: "5",
    name: "Calculatrice de couleurs",
    description: "Explorez les palettes de couleurs, convertissez entre formats et générez des harmonies colorimetriques.",
    category: "Design",
    type: "calculator",
    tags: ["couleurs", "palette", "design", "hex", "rgb", "hsl"],
    icon: "🎨",
    color: "pink",
    url: "/tools/color-calculator",
    features: [
      "Conversion HEX/RGB/HSL/CMYK",
      "Génération de palettes harmoniques",
      "Sélecteur de couleurs avancé",
      "Contraste et accessibilité",
      "Gradient generator",
      "Export palette vers design tools",
      "Historique des couleurs"
    ],
    usage: {
      description: "Entrez une couleur dans n'importe quel format et explorez les possibilités.",
      instructions: [
        "Entrez une couleur (HEX, RGB, etc.)",
        "Ou utilisez le sélecteur visuel",
        "Explorez les conversions automatiques",
        "Générez des palettes harmoniques",
        "Exportez vos couleurs favorites"
      ],
      examples: [
        {
          input: "#FF5733",
          output: "RGB(255, 87, 51), HSL(12°, 100%, 60%)",
          description: "Conversion couleur complète"
        },
        {
          input: "Couleur primaire: #3498db",
          output: "Palette complémentaire générée",
          description: "Harmonie colorimétrique"
        }
      ]
    },
    technical: {
      language: "JavaScript",
      framework: "React",
      dependencies: ["chroma-js", "color"],
      version: "1.3.2"
    },
    stats: {
      uses: 34560,
      rating: 4.8,
      reviews: 289,
      favorites: 1123,
      lastUsed: "2025-07-14T11:45:00Z"
    },
    access: {
      free: true,
      premium: true,
      offline: true
    },
    metadata: {
      createdAt: "2024-04-12T00:00:00Z",
      updatedAt: "2025-06-30T00:00:00Z",
      version: "1.3.2",
      author: "Design Studio",
      license: "Creative Commons"
    },
    integrations: [
      {
        name: "Adobe Creative Suite",
        type: "export",
        description: "Export vers Photoshop/Illustrator"
      },
      {
        name: "Figma Plugin",
        type: "export",
        description: "Plugin Figma intégré"
      }
    ],
    featured: true,
    popular: true,
    verified: true
  },
  {
    id: "6",
    name: "Validateur JSON",
    description: "Validez, formatez et analysez vos fichiers JSON avec détection d'erreurs avancée.",
    category: "Développement",
    type: "validator",
    tags: ["json", "validation", "formatting", "api", "data"],
    icon: "✅",
    color: "cyan",
    url: "/tools/json-validator",
    features: [
      "Validation syntaxique JSON",
      "Formatage automatique",
      "Détection d'erreurs précise",
      "Coloration syntaxique",
      "Compression/Décompression",
      "Schema validation (JSON Schema)",
      "Import/Export fichiers"
    ],
    usage: {
      description: "Collez votre JSON pour le valider et le formater automatiquement.",
      instructions: [
        "Collez ou uploadez votre JSON",
        "La validation se fait en temps réel",
        "Corrigez les erreurs indiquées",
        "Utilisez le formatage automatique",
        "Téléchargez le JSON corrigé"
      ],
      examples: [
        {
          input: '{"name":"John","age":30}',
          output: "✓ JSON valide - Formaté avec indentation",
          description: "JSON simple validé"
        },
        {
          input: '{"name":"John","age":}',
          output: "✗ Erreur ligne 1: valeur manquante",
          description: "Détection d'erreur de syntaxe"
        }
      ]
    },
    technical: {
      language: "JavaScript",
      framework: "React",
      dependencies: ["jsonlint", "monaco-editor"],
      version: "2.2.1"
    },
    stats: {
      uses: 67890,
      rating: 4.9,
      reviews: 445,
      favorites: 1567,
      lastUsed: "2025-07-14T08:20:00Z"
    },
    access: {
      free: true,
      offline: true
    },
    metadata: {
      createdAt: "2024-01-08T00:00:00Z",
      updatedAt: "2025-07-05T00:00:00Z",
      version: "2.2.1",
      author: "API Tools Team",
      license: "MIT",
      source: "https://github.com/api-tools/json-validator"
    },
    integrations: [
      {
        name: "VS Code Extension",
        type: "api",
        description: "Extension pour Visual Studio Code"
      },
      {
        name: "API Validation",
        type: "api",
        description: "Validation via API REST"
      }
    ],
    limits: {
      size: "10MB",
      requests: 2000
    },
    featured: false,
    popular: true,
    verified: true
  }
];

function getToolTypeIcon(type: ToolItem['type'], className = "w-4 h-4") {
  const iconMap = {
    "utility": <Settings className={className} />,
    "productivity": <Zap className={className} />,
    "development": <Code className={className} />,
    "design": <Palette className={className} />,
    "calculator": <Calculator className={className} />,
    "converter": <RefreshCw className={className} />,
    "generator": <Plus className={className} />,
    "validator": <CheckCircle className={className} />,
    "analyzer": <BarChart3 className={className} />,
    "formatter": <AlignLeft className={className} />
  };
  
  return iconMap[type] || <Settings className={className} />;
}

function getToolTypeColor(type: string) {
  const colorMap = {
    "utility": "bg-gray-100 text-gray-800",
    "productivity": "bg-green-100 text-green-800",
    "development": "bg-blue-100 text-blue-800",
    "design": "bg-purple-100 text-purple-800",
    "calculator": "bg-orange-100 text-orange-800",
    "converter": "bg-cyan-100 text-cyan-800",
    "generator": "bg-pink-100 text-pink-800",
    "validator": "bg-emerald-100 text-emerald-800",
    "analyzer": "bg-indigo-100 text-indigo-800",
    "formatter": "bg-yellow-100 text-yellow-800"
  };
  return colorMap[type as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
}

function formatNumber(num: number) {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

function ToolCard({ 
  item, 
  variant = "grid",
  theme = "light",
  onItemClick,
  onFavorite,
  onShare,
  onUse,
  enableFavorites = false,
  enableShare = false
}: { 
  item: ToolItem;
  variant?: ToolsSectionProps['variant'];
  theme?: "light" | "dark";
  onItemClick?: (item: ToolItem) => void;
  onFavorite?: (item: ToolItem) => void;
  onShare?: (item: ToolItem) => void;
  onUse?: (item: ToolItem) => void;
  enableFavorites?: boolean;
  enableShare?: boolean;
}) {

  if (variant === "compact") {
    return (
      <div className={cn(
        "flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
        item.featured && "ring-2 ring-blue-500 ring-opacity-50"
      )} onClick={() => onItemClick?.(item)}>
        
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center text-lg",
            `bg-${item.color}-100 text-${item.color}-600`
          )}>
            {item.icon || getToolTypeIcon(item.type, "w-6 h-6")}
          </div>
          
          <div>
            <h4 className="font-semibold">{item.name}</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{item.category}</span>
              <Badge className={cn("text-xs", getToolTypeColor(item.type))}>
                {item.type}
              </Badge>
              {item.stats && (
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {formatNumber(item.stats.uses)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {item.stats?.rating && (
            <div className="flex items-center text-sm text-yellow-600">
              <Star className="w-4 h-4 mr-1" />
              {item.stats.rating}
            </div>
          )}
          
          {enableFavorites && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => { e.stopPropagation(); onFavorite?.(item); }}
            >
              <Heart className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            onClick={(e) => { e.stopPropagation(); onUse?.(item); }}
          >
            Utiliser
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={cn(
        "flex items-start space-x-6 p-6 border rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
        item.featured && "ring-2 ring-blue-500 ring-opacity-50"
      )} onClick={() => onItemClick?.(item)}>
        
        {/* Icon */}
        <div className={cn(
          "w-16 h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
          `bg-${item.color}-100 text-${item.color}-600`
        )}>
          {item.icon || getToolTypeIcon(item.type, "w-8 h-8")}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                {item.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                    Featured
                  </Badge>
                )}
                {item.popular && (
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    Popular
                  </Badge>
                )}
                {item.new && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    New
                  </Badge>
                )}
                {item.verified && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
              
              <p className={cn(
                "text-sm leading-relaxed mb-3",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>
                {item.description}
              </p>
              
              <div className="flex items-center space-x-2 mb-3">
                <Badge className={cn("text-xs", getToolTypeColor(item.type))}>
                  {getToolTypeIcon(item.type, "w-3 h-3")}
                  <span className="ml-1 capitalize">{item.type}</span>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
                {item.access.free && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    Gratuit
                  </Badge>
                )}
                {item.access.offline && (
                  <Badge className="bg-gray-100 text-gray-800 text-xs">
                    Hors ligne
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {enableShare && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onShare?.(item); }}>
                  <Share className="w-4 h-4" />
                </Button>
              )}
              {enableFavorites && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onFavorite?.(item); }}>
                  <Heart className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              {item.stats && (
                <>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {formatNumber(item.stats.uses)} utilisations
                  </span>
                  
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {item.stats.rating} ({formatNumber(item.stats.reviews)} avis)
                  </span>
                  
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1 text-red-500" />
                    {formatNumber(item.stats.favorites)} favoris
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Features preview */}
          <div className="flex flex-wrap gap-1 mb-4">
            {item.features.slice(0, 4).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {item.features.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{item.features.length - 4} autres
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
            
            <Button
              onClick={(e) => { e.stopPropagation(); onUse?.(item); }}
              className="ml-4"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Utiliser l'outil
            </Button>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
    );
  }

  // Default grid variant
  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg cursor-pointer group",
      theme === "dark" && "bg-gray-800 border-gray-700",
      item.featured && "ring-2 ring-blue-500 ring-opacity-50"
    )} onClick={() => onItemClick?.(item)}>
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center text-xl",
              `bg-${item.color}-100 text-${item.color}-600`
            )}>
              {item.icon || getToolTypeIcon(item.type, "w-6 h-6")}
            </div>
            <div>
              <CardTitle className="text-lg leading-tight line-clamp-1">{item.name}</CardTitle>
              <div className="flex items-center space-x-1 mt-1">
                <Badge className={cn("text-xs", getToolTypeColor(item.type))}>
                  {item.type}
                </Badge>
                {item.verified && (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {item.featured && (
              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                Featured
              </Badge>
            )}
            {item.new && (
              <Badge className="bg-green-100 text-green-800 text-xs">
                New
              </Badge>
            )}
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

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <Building className="w-4 h-4 mr-2 text-blue-600" />
              {item.category}
            </span>
            {item.stats?.rating && (
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                {item.stats.rating}
              </span>
            )}
          </div>
          
          {item.stats && (
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-green-600" />
                {formatNumber(item.stats.uses)} utilisations
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1 text-red-500" />
                {formatNumber(item.stats.favorites)}
              </span>
            </div>
          )}
        </div>

        {/* Access badges */}
        <div className="flex items-center space-x-2 mb-4">
          {item.access.free && (
            <Badge className="bg-green-100 text-green-800 text-xs">
              Gratuit
            </Badge>
          )}
          {item.access.offline && (
            <Badge className="bg-gray-100 text-gray-800 text-xs">
              Hors ligne
            </Badge>
          )}
          {item.access.premium && (
            <Badge className="bg-purple-100 text-purple-800 text-xs">
              Premium
            </Badge>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-2">
            {enableFavorites && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={(e) => { e.stopPropagation(); onFavorite?.(item); }}
              >
                <Heart className="w-4 h-4" />
              </Button>
            )}
            
            {enableShare && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={(e) => { e.stopPropagation(); onShare?.(item); }}
              >
                <Share className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <Button
            onClick={(e) => { e.stopPropagation(); onUse?.(item); }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Utiliser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ToolsSection({
  variant = "grid",
  title = "Boîte à Outils",
  description = "Découvrez notre collection d'outils en ligne pour simplifier votre travail quotidien.",
  items = defaultItems,
  showSearch = true,
  showFilters = true,
  showCategories = true,
  showStats = true,
  maxVisible,
  enableFavorites = false,
  enableShare = false,
  enableExport = false,
  className,
  theme = "light",
  onItemClick,
  onFavorite,
  onShare,
  onExport,
  onCategoryClick,
  onUse
}: ToolsSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState("all");
  const [showFreeOnly, setShowFreeOnly] = React.useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesFree = !showFreeOnly || item.access.free;
    const matchesFeatured = !showFeaturedOnly || item.featured;
    return matchesSearch && matchesCategory && matchesType && matchesFree && matchesFeatured;
  });

  const displayedItems = maxVisible && !showAll 
    ? filteredItems.slice(0, maxVisible)
    : filteredItems;

  const categories = Array.from(new Set(items.map(item => item.category)));
  const types = Array.from(new Set(items.map(item => item.type)));

  // Stats
  const totalTools = items.length;
  const freeTools = items.filter(item => item.access.free).length;
  const featuredTools = items.filter(item => item.featured).length;
  const totalUses = items.reduce((sum, item) => sum + (item.stats?.uses || 0), 0);

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
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalTools}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Outils disponibles
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{freeTools}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Outils gratuits
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{featuredTools}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Outils recommandés
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{formatNumber(totalUses)}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Utilisations totales
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        {showCategories && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              Toutes les catégories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category);
                  onCategoryClick?.(category);
                }}
              >
                {category}
              </Button>
            ))}
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
                  placeholder="Rechercher un outil..."
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

                <label className="flex items-center space-x-2 px-3 py-2 border rounded-lg text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={(e) => setShowFreeOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>Gratuit uniquement</span>
                </label>

                <label className="flex items-center space-x-2 px-3 py-2 border rounded-lg text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>Recommandés</span>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Items */}
        <div className={cn(
          variant === "list" 
            ? "space-y-6" 
            : variant === "compact"
            ? "space-y-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        )}>
          {displayedItems.map((item) => (
            <ToolCard
              key={item.id}
              item={item}
              variant={variant}
              theme={theme}
              onItemClick={onItemClick}
              onFavorite={onFavorite}
              onShare={onShare}
              onUse={onUse}
              enableFavorites={enableFavorites}
              enableShare={enableShare}
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
              Voir tous les outils ({filteredItems.length})
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun outil trouvé</h3>
            <p className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            )}>
              Essayez de modifier vos critères de recherche ou parcourez toutes les catégories.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export type { ToolsSectionProps, ToolItem };
