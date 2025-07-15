"use client";

import React from "react";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Button } from "@/shared/components/atoms/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/ui/avatar";
import { 
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Eye,
  ThumbsUp,
  Share,
  Download,
  Clock,
  Calendar,
  Tag,
  User,
  Heart,
  Bookmark,
  ExternalLink,
  Filter,
  Search,
  ArrowRight,
  ChevronRight,
  Star,
  TrendingUp,
  PlayCircle,
  Monitor,
  Smartphone,
  Tablet,
  Headphones,
  Camera,
  Film,
  Mic,
  Music,
  Image as ImageIcon,
  FileText,
  Award,
  Users,
  MessageSquare,
  GraduationCap
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: "video" | "audio" | "image" | "document" | "livestream" | "podcast" | "course";
  category: string;
  tags: string[];
  url: string;
  thumbnailUrl?: string;
  duration?: number; // in seconds
  fileSize?: number; // in bytes
  resolution?: string;
  quality?: "HD" | "4K" | "FHD" | "SD";
  publishedAt: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
    verified?: boolean;
  };
  views: number;
  likes: number;
  downloads: number;
  shares: number;
  rating?: number;
  featured?: boolean;
  trending?: boolean;
  premium?: boolean;
  live?: boolean;
  language?: string;
  subtitles?: string[];
  chapters?: Array<{
    title: string;
    startTime: number;
  }>;
  relatedItems?: string[];
  bookmarked?: boolean;
}

interface MediaSectionProps {
  variant?: "grid" | "list" | "carousel" | "playlist" | "gallery" | "studio";
  title?: string;
  description?: string;
  items?: MediaItem[];
  showSearch?: boolean;
  showFilters?: boolean;
  showStats?: boolean;
  maxVisible?: number;
  enableDownload?: boolean;
  enableBookmark?: boolean;
  enableShare?: boolean;
  autoplay?: boolean;
  className?: string;
  theme?: "light" | "dark";
  onItemClick?: (item: MediaItem) => void;
  onPlay?: (item: MediaItem) => void;
  onDownload?: (item: MediaItem) => void;
  onBookmark?: (item: MediaItem) => void;
  onShare?: (item: MediaItem) => void;
  onAuthorClick?: (author: MediaItem['author']) => void;
}

const defaultItems: MediaItem[] = [
  {
    id: "1",
    title: "Masterclass : Développement Web Moderne",
    description: "Apprenez les dernières technologies du développement web avec React, Next.js et TypeScript dans cette masterclass complète de 2 heures.",
    type: "video",
    category: "Éducation",
    tags: ["développement", "react", "javascript", "tutorial"],
    url: "/videos/web-dev-masterclass.mp4",
    thumbnailUrl: "/images/masterclass-thumb.jpg",
    duration: 7200, // 2 hours
    resolution: "1920x1080",
    quality: "FHD",
    publishedAt: "2024-06-15T10:00:00Z",
    author: {
      name: "Alexandre Martin",
      avatar: "/avatars/alexandre.jpg",
      role: "Lead Developer",
      verified: true
    },
    views: 45600,
    likes: 3200,
    downloads: 890,
    shares: 567,
    rating: 4.9,
    featured: true,
    trending: true,
    premium: true,
    language: "français",
    subtitles: ["français", "anglais"],
    chapters: [
      { title: "Introduction", startTime: 0 },
      { title: "Setup de l'environnement", startTime: 600 },
      { title: "Composants React", startTime: 1800 },
      { title: "Gestion d'état", startTime: 3600 },
      { title: "Déploiement", startTime: 6000 }
    ]
  },
  {
    id: "2",
    title: "Podcast Tech Talk : L'avenir de l'IA",
    description: "Discussion approfondie sur les dernières avancées en intelligence artificielle et leur impact sur l'industrie tech.",
    type: "podcast",
    category: "Technologie",
    tags: ["ia", "podcast", "technologie", "futur"],
    url: "/audio/ai-future-podcast.mp3",
    thumbnailUrl: "/images/podcast-thumb.jpg",
    duration: 2700, // 45 minutes
    publishedAt: "2024-06-14T16:00:00Z",
    author: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      role: "AI Researcher",
      verified: true
    },
    views: 23400,
    likes: 1890,
    downloads: 456,
    shares: 234,
    rating: 4.7,
    trending: true,
    language: "français"
  },
  {
    id: "3",
    title: "Live Stream : Développement en direct",
    description: "Codage en direct d'une application React avec interaction en temps réel avec la communauté.",
    type: "livestream",
    category: "Live",
    tags: ["live", "coding", "react", "communauté"],
    url: "/streams/live-coding-session",
    thumbnailUrl: "/images/livestream-thumb.jpg",
    quality: "HD",
    publishedAt: "2024-06-16T20:00:00Z",
    author: {
      name: "Marie Dubois",
      avatar: "/avatars/marie.jpg",
      role: "Full Stack Developer",
      verified: true
    },
    views: 1200,
    likes: 340,
    downloads: 0,
    shares: 89,
    featured: true,
    live: true,
    language: "français"
  },
  {
    id: "4",
    title: "Course Complete : UX/UI Design",
    description: "Formation complète en design UX/UI avec des projets pratiques et des études de cas réels.",
    type: "course",
    category: "Design",
    tags: ["ux", "ui", "design", "formation"],
    url: "/courses/ux-ui-complete",
    thumbnailUrl: "/images/course-thumb.jpg",
    duration: 18000, // 5 hours
    publishedAt: "2024-06-12T09:00:00Z",
    author: {
      name: "Thomas Roux",
      role: "UX Designer"
    },
    views: 12800,
    likes: 890,
    downloads: 234,
    shares: 156,
    rating: 4.6,
    premium: true,
    language: "français",
    chapters: [
      { title: "Principes UX", startTime: 0 },
      { title: "Recherche utilisateur", startTime: 3600 },
      { title: "Wireframing", startTime: 7200 },
      { title: "Prototypage", startTime: 10800 },
      { title: "Tests utilisateur", startTime: 14400 }
    ]
  },
  {
    id: "5",
    title: "Galerie Photo : Conférence Tech 2024",
    description: "Collection de photos officielles de la plus grande conférence tech de l'année avec les moments forts.",
    type: "image",
    category: "Événement",
    tags: ["conférence", "tech", "photos", "événement"],
    url: "/galleries/tech-conference-2024",
    thumbnailUrl: "/images/gallery-thumb.jpg",
    publishedAt: "2024-06-10T18:00:00Z",
    author: {
      name: "Photo Team",
      role: "Photographes officiels"
    },
    views: 8900,
    likes: 567,
    downloads: 123,
    shares: 345,
    rating: 4.4
  },
  {
    id: "6",
    title: "Documentation API Complete",
    description: "Guide complet de notre API REST avec exemples de code, références et tutoriels d'intégration.",
    type: "document",
    category: "Documentation",
    tags: ["api", "documentation", "guide", "référence"],
    url: "/docs/api-complete-guide.pdf",
    thumbnailUrl: "/images/doc-thumb.jpg",
    fileSize: 2500000, // 2.5 MB
    publishedAt: "2024-06-08T14:30:00Z",
    author: {
      name: "Dev Team",
      role: "Équipe de développement"
    },
    views: 15600,
    likes: 678,
    downloads: 890,
    shares: 234,
    rating: 4.8,
    featured: true
  }
];

function getTypeIcon(type: MediaItem['type'], className = "w-4 h-4") {
  const iconMap = {
    "video": <Video className={className} />,
    "audio": <Headphones className={className} />,
    "image": <ImageIcon className={className} />,
    "document": <FileText className={className} />,
    "livestream": <PlayCircle className={className} />,
    "podcast": <Mic className={className} />,
    "course": <GraduationCap className={className} />
  };
  
  return iconMap[type] || <Video className={className} />;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function formatFileSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function MediaCard({ 
  item, 
  variant = "grid",
  theme = "light",
  onItemClick,
  onPlay,
  onDownload,
  onBookmark,
  onShare,
  onAuthorClick,
  enableDownload = false,
  enableBookmark = false,
  enableShare = false
}: { 
  item: MediaItem;
  variant?: MediaSectionProps['variant'];
  theme?: "light" | "dark";
  onItemClick?: (item: MediaItem) => void;
  onPlay?: (item: MediaItem) => void;
  onDownload?: (item: MediaItem) => void;
  onBookmark?: (item: MediaItem) => void;
  onShare?: (item: MediaItem) => void;
  onAuthorClick?: (author: MediaItem['author']) => void;
  enableDownload?: boolean;
  enableBookmark?: boolean;
  enableShare?: boolean;
}) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  if (variant === "list") {
    return (
      <div className={cn(
        "flex items-start space-x-4 p-6 border rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
        item.featured && "ring-2 ring-blue-500 ring-opacity-50"
      )} onClick={() => onItemClick?.(item)}>
        
        <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
          {item.thumbnailUrl ? (
            <img 
              src={item.thumbnailUrl} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={cn(
              "w-full h-full flex items-center justify-center",
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            )}>
              {getTypeIcon(item.type, "w-8 h-8 text-gray-400")}
            </div>
          )}
          
          {(item.type === "video" || item.type === "livestream") && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <button
                onClick={(e) => { e.stopPropagation(); onPlay?.(item); setIsPlaying(!isPlaying); }}
                className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-gray-800" />
                ) : (
                  <Play className="w-4 h-4 text-gray-800 ml-0.5" />
                )}
              </button>
            </div>
          )}
          
          {item.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {formatDuration(item.duration)}
            </div>
          )}
          
          {item.live && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded animate-pulse">
              LIVE
            </div>
          )}
          
          {item.quality && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {item.quality}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {item.featured && (
                  <Badge variant="default" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {item.trending && (
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {item.premium && (
                  <Badge className="bg-purple-100 text-purple-800 text-xs">
                    Premium
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {getTypeIcon(item.type, "w-3 h-3")}
                  <span className="ml-1 capitalize">{item.type}</span>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
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
              {enableBookmark && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onBookmark?.(item); }}>
                  <Bookmark className={cn("w-4 h-4", item.bookmarked && "fill-current text-blue-600")} />
                </Button>
              )}
              {enableDownload && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDownload?.(item); }}>
                  <Download className="w-4 h-4" />
                </Button>
              )}
              {enableShare && (
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onShare?.(item); }}>
                  <Share className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <button
                onClick={(e) => { e.stopPropagation(); onAuthorClick?.(item.author); }}
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
              >
                {item.author.avatar ? (
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={item.author.avatar} />
                    <AvatarFallback>{item.author.name[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">{item.author.name[0]}</span>
                  </div>
                )}
                <span>{item.author.name}</span>
                {item.author.verified && (
                  <Badge className="bg-blue-600 text-white text-xs p-0 w-3 h-3 rounded-full flex items-center justify-center">
                    ✓
                  </Badge>
                )}
              </button>
              
              <span>{new Date(item.publishedAt).toLocaleDateString('fr-FR')}</span>
              
              {item.fileSize && (
                <span>{formatFileSize(item.fileSize)}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {item.views > 1000 ? `${Math.floor(item.views / 1000)}k` : item.views}
              </span>
              <span className="flex items-center">
                <ThumbsUp className="w-3 h-3 mr-1" />
                {item.likes}
              </span>
              {item.downloads > 0 && (
                <span className="flex items-center">
                  <Download className="w-3 h-3 mr-1" />
                  {item.downloads}
                </span>
              )}
              {item.rating && (
                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                  {item.rating}
                </span>
              )}
            </div>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
    );
  }

  if (variant === "gallery") {
    return (
      <div className="relative group">
        <div className="aspect-video rounded-lg overflow-hidden">
          {item.thumbnailUrl ? (
            <img 
              src={item.thumbnailUrl} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => onItemClick?.(item)}
            />
          ) : (
            <div className={cn(
              "w-full h-full flex items-center justify-center cursor-pointer",
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            )} onClick={() => onItemClick?.(item)}>
              {getTypeIcon(item.type, "w-12 h-12 text-gray-400")}
            </div>
          )}
          
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onItemClick?.(item)}
                className="bg-white/90 backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                Voir
              </Button>
              {enableDownload && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); onDownload?.(item); }}
                  className="bg-white/90 backdrop-blur-sm"
                >
                  <Download className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          {item.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {formatDuration(item.duration)}
            </div>
          )}
          
          {item.live && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded animate-pulse">
              🔴 LIVE
            </div>
          )}
        </div>
        
        <div className="mt-2">
          <h4 className="font-medium text-sm leading-tight line-clamp-2">{item.title}</h4>
          <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {item.views > 1000 ? `${Math.floor(item.views / 1000)}k` : item.views}
            </span>
            {item.rating && (
              <span className="flex items-center">
                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                {item.rating}
              </span>
            )}
          </div>
        </div>
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
      
      <div className="relative overflow-hidden">
        <div className="aspect-video">
          {item.thumbnailUrl ? (
            <img 
              src={item.thumbnailUrl} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className={cn(
              "w-full h-full flex items-center justify-center",
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            )}>
              {getTypeIcon(item.type, "w-12 h-12 text-gray-400")}
            </div>
          )}
        </div>
        
        {(item.type === "video" || item.type === "livestream") && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={(e) => { e.stopPropagation(); onPlay?.(item); setIsPlaying(!isPlaying); }}
              className="w-16 h-16 bg-white bg-opacity-0 group-hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-gray-800" />
              ) : (
                <Play className="w-8 h-8 text-gray-800 ml-1" />
              )}
            </button>
          </div>
        )}
        
        <div className="absolute top-4 left-4 flex gap-2">
          {item.live && (
            <Badge className="bg-red-600 text-white text-xs animate-pulse">
              🔴 LIVE
            </Badge>
          )}
          {item.featured && (
            <Badge variant="default" className="text-xs">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {item.trending && (
            <Badge className="bg-orange-500 text-white text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          )}
          {item.premium && (
            <Badge className="bg-purple-600 text-white text-xs">
              Premium
            </Badge>
          )}
        </div>
        
        <div className="absolute top-4 right-4 flex gap-2">
          {enableBookmark && (
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-white/20 backdrop-blur-sm border-white/30"
              onClick={(e) => { e.stopPropagation(); onBookmark?.(item); }}
            >
              <Bookmark className={cn("w-4 h-4", item.bookmarked && "fill-current text-blue-600")} />
            </Button>
          )}
        </div>
        
        {item.duration && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {formatDuration(item.duration)}
          </div>
        )}
        
        {item.quality && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {item.quality}
          </div>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
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
          
          <div className="flex items-center space-x-1 ml-2">
            {enableDownload && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDownload?.(item); }}>
                <Download className="w-4 h-4" />
              </Button>
            )}
            {enableShare && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onShare?.(item); }}>
                <Share className="w-4 h-4" />
              </Button>
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

        <div className="flex items-center space-x-1 mb-4 flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {item.views > 1000 ? `${Math.floor(item.views / 1000)}k` : item.views}
            </span>
            <span className="flex items-center">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {item.likes}
            </span>
            {item.downloads > 0 && (
              <span className="flex items-center">
                <Download className="w-3 h-3 mr-1" />
                {item.downloads}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {item.rating && (
              <span className="flex items-center">
                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                {item.rating}
              </span>
            )}
            {item.fileSize && (
              <span>{formatFileSize(item.fileSize)}</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <button
            onClick={(e) => { e.stopPropagation(); onAuthorClick?.(item.author); }}
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
          >
            {item.author.avatar ? (
              <Avatar className="w-6 h-6">
                <AvatarImage src={item.author.avatar} />
                <AvatarFallback>{item.author.name[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">{item.author.name[0]}</span>
              </div>
            )}
            <div className="text-left">
              <div className="text-sm font-medium flex items-center">
                {item.author.name}
                {item.author.verified && (
                  <Badge className="bg-blue-600 text-white text-xs p-0 w-4 h-4 rounded-full flex items-center justify-center ml-1">
                    ✓
                  </Badge>
                )}
              </div>
              <div className="text-xs text-gray-500">{item.author.role}</div>
            </div>
          </button>
          
          <div className="text-xs text-gray-500 text-right">
            {new Date(item.publishedAt).toLocaleDateString('fr-FR')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MediaSection({
  variant = "grid",
  title = "Médiathèque",
  description = "Explorez notre collection de contenus multimédias : vidéos, podcasts, cours et bien plus encore.",
  items = defaultItems,
  showSearch = true,
  showFilters = true,
  showStats = true,
  maxVisible,
  enableDownload = false,
  enableBookmark = false,
  enableShare = false,
  className,
  theme = "light",
  onItemClick,
  onPlay,
  onDownload,
  onBookmark,
  onShare,
  onAuthorClick
}: MediaSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState("all");
  const [showAll, setShowAll] = React.useState(false);

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const displayedItems = maxVisible && !showAll 
    ? filteredItems.slice(0, maxVisible)
    : filteredItems;

  const categories = Array.from(new Set(items.map(item => item.category)));
  const types = Array.from(new Set(items.map(item => item.type)));
  const liveItems = items.filter(item => item.live);

  // Stats
  const totalViews = items.reduce((acc, item) => acc + item.views, 0);
  const totalItems = items.length;
  const totalDuration = items.reduce((acc, item) => acc + (item.duration || 0), 0);
  const avgRating = items.reduce((acc, item) => acc + (item.rating || 0), 0) / items.length;

  if (variant === "studio") {
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

          {/* Live Section */}
          {liveItems.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <PlayCircle className="w-6 h-6 mr-2 text-red-600" />
                En direct maintenant
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveItems.map((item) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    variant="grid"
                    theme={theme}
                    onItemClick={onItemClick}
                    onPlay={onPlay}
                    onDownload={onDownload}
                    onBookmark={onBookmark}
                    onShare={onShare}
                    onAuthorClick={onAuthorClick}
                    enableDownload={enableDownload}
                    enableBookmark={enableBookmark}
                    enableShare={enableShare}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Featured Content */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-600" />
              Contenus mis en avant
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.filter(item => item.featured).slice(0, 6).map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  variant="grid"
                  theme={theme}
                  onItemClick={onItemClick}
                  onPlay={onPlay}
                  onDownload={onDownload}
                  onBookmark={onBookmark}
                  onShare={onShare}
                  onAuthorClick={onAuthorClick}
                  enableDownload={enableDownload}
                  enableBookmark={enableBookmark}
                  enableShare={enableShare}
                />
              ))}
            </div>
          </div>

          {/* Content by Type */}
          {types.map((type) => {
            const typeItems = items.filter(item => item.type === type && !item.featured && !item.live);
            if (typeItems.length === 0) return null;
            
            return (
              <div key={type} className="mb-12 last:mb-0">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  {getTypeIcon(type, "w-5 h-5 mr-2 text-blue-600")}
                  <span className="capitalize">{type}s</span>
                  <Badge variant="outline" className="ml-2">
                    {typeItems.length}
                  </Badge>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {typeItems.slice(0, 8).map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      variant="gallery"
                      theme={theme}
                      onItemClick={onItemClick}
                      onPlay={onPlay}
                      onDownload={onDownload}
                      onBookmark={onBookmark}
                      onShare={onShare}
                      onAuthorClick={onAuthorClick}
                      enableDownload={enableDownload}
                      enableBookmark={enableBookmark}
                      enableShare={enableShare}
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
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalItems}</div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Médias
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {totalViews > 1000 ? `${Math.floor(totalViews / 1000)}k` : totalViews}
              </div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Vues
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.floor(totalDuration / 3600)}h{Math.floor((totalDuration % 3600) / 60)}min
              </div>
              <div className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                Durée totale
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
                  placeholder="Rechercher un média..."
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
              </div>
            )}
          </div>
        )}

        {/* Media Items */}
        <div className={cn(
          variant === "list" 
            ? "space-y-6" 
            : variant === "gallery"
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        )}>
          {displayedItems.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              variant={variant}
              theme={theme}
              onItemClick={onItemClick}
              onPlay={onPlay}
              onDownload={onDownload}
              onBookmark={onBookmark}
              onShare={onShare}
              onAuthorClick={onAuthorClick}
              enableDownload={enableDownload}
              enableBookmark={enableBookmark}
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
              Voir tous les médias ({filteredItems.length})
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export type { MediaSectionProps, MediaItem };
