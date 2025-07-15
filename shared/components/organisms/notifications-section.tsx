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
  Bell,
  Megaphone,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  X,
  Volume,
  VolumeX,
  Settings2,
  Archive,
  Trash2,
  Pin,
  RotateCcw,
  Timer,
  Loader,
  Wifi,
  WifiOff,
  BatteryLow,
  Power,
  Smartphone as Mobile,
  Tablet
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "update" | "reminder" | "message" | "system" | "security" | "promotion";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  source: {
    app: string;
    icon?: string;
    name: string;
    type: "system" | "app" | "website" | "email" | "sms" | "push";
  };
  status: "unread" | "read" | "dismissed" | "archived" | "snoozed" | "starred";
  timestamp: string;
  scheduledFor?: string;
  expiresAt?: string;
  actions?: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary" | "danger";
    action: string;
    icon?: string;
  }>;
  metadata?: {
    url?: string;
    deepLink?: string;
    imageUrl?: string;
    videoUrl?: string;
    attachments?: Array<{
      name: string;
      url: string;
      type: string;
      size?: number;
    }>;
    sender?: {
      name: string;
      email?: string;
      avatar?: string;
    };
    context?: {
      entityId?: string;
      entityType?: string;
      roomId?: string;
      threadId?: string;
    };
  };
  settings?: {
    sound: boolean;
    vibration: boolean;
    led: boolean;
    screen: boolean;
    banner: boolean;
    lockScreen: boolean;
  };
  delivery?: {
    devices: string[];
    channels: string[];
    attempts: number;
    delivered: boolean;
    deliveredAt?: string;
    opened?: boolean;
    openedAt?: string;
    clicked?: boolean;
    clickedAt?: string;
  };
  grouping?: {
    groupId: string;
    groupName: string;
    count: number;
    latest: boolean;
  };
  interactive?: boolean;
  recurring?: {
    enabled: boolean;
    frequency: "daily" | "weekly" | "monthly";
    until?: string;
  };
  geolocation?: {
    enabled: boolean;
    latitude?: number;
    longitude?: number;
    radius?: number;
    triggered?: boolean;
  };
  featured?: boolean;
  silent?: boolean;
  badge?: number;
}

interface NotificationSectionProps {
  variant?: "list" | "cards" | "timeline" | "grouped" | "compact" | "dashboard";
  title?: string;
  description?: string;
  items?: NotificationItem[];
  showSearch?: boolean;
  showFilters?: boolean;
  showActions?: boolean;
  showGrouping?: boolean;
  maxVisible?: number;
  enableMarkAll?: boolean;
  enableArchive?: boolean;
  enableSnooze?: boolean;
  enableSound?: boolean;
  className?: string;
  theme?: "light" | "dark";
  onItemClick?: (item: NotificationItem) => void;
  onMarkAsRead?: (item: NotificationItem) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (item: NotificationItem) => void;
  onArchive?: (item: NotificationItem) => void;
  onSnooze?: (item: NotificationItem, duration: number) => void;
  onAction?: (item: NotificationItem, action: string) => void;
  onClearAll?: () => void;
  onSettingsClick?: () => void;
}

const defaultItems: NotificationItem[] = [
  {
    id: "1",
    title: "Nouveau message de Sarah",
    message: "Hey ! J'ai terminé la review de ton code, tout semble bon. Merge quand tu veux 👍",
    type: "message",
    priority: "medium",
    category: "Communication",
    source: {
      app: "slack",
      icon: "💬",
      name: "Slack",
      type: "app"
    },
    status: "unread",
    timestamp: "2025-07-14T10:30:00Z",
    actions: [
      {
        id: "reply",
        label: "Répondre",
        type: "primary",
        action: "reply",
        icon: "💬"
      },
      {
        id: "mark_read",
        label: "Marquer comme lu",
        type: "secondary",
        action: "mark_read"
      }
    ],
    metadata: {
      deepLink: "slack://channel/general",
      sender: {
        name: "Sarah Martin",
        email: "sarah@company.com",
        avatar: "/avatars/sarah.jpg"
      },
      context: {
        roomId: "general",
        threadId: "thread_123"
      }
    },
    settings: {
      sound: true,
      vibration: true,
      led: false,
      screen: true,
      banner: true,
      lockScreen: true
    },
    delivery: {
      devices: ["desktop", "mobile"],
      channels: ["push", "email"],
      attempts: 1,
      delivered: true,
      deliveredAt: "2025-07-14T10:30:05Z",
      opened: false
    },
    interactive: true,
    featured: false,
    silent: false
  },
  {
    id: "2",
    title: "Mise à jour de sécurité disponible",
    message: "Une mise à jour critique de sécurité est disponible pour votre système. Installation recommandée dans les 24h.",
    type: "security",
    priority: "high",
    category: "Système",
    source: {
      app: "system",
      icon: "🛡️",
      name: "Système",
      type: "system"
    },
    status: "unread",
    timestamp: "2025-07-14T09:15:00Z",
    expiresAt: "2025-07-15T09:15:00Z",
    actions: [
      {
        id: "install",
        label: "Installer maintenant",
        type: "primary",
        action: "install_update",
        icon: "⬇️"
      },
      {
        id: "schedule",
        label: "Programmer",
        type: "secondary",
        action: "schedule_update"
      },
      {
        id: "ignore",
        label: "Ignorer",
        type: "danger",
        action: "ignore_update"
      }
    ],
    metadata: {
      url: "https://security.example.com/update-123"
    },
    settings: {
      sound: true,
      vibration: true,
      led: true,
      screen: true,
      banner: true,
      lockScreen: true
    },
    delivery: {
      devices: ["desktop", "mobile", "tablet"],
      channels: ["push", "email", "sms"],
      attempts: 1,
      delivered: true,
      deliveredAt: "2025-07-14T09:15:02Z"
    },
    interactive: true,
    featured: true,
    silent: false
  },
  {
    id: "3",
    title: "Rappel : Réunion équipe dans 15 minutes",
    message: "Daily standup avec l'équipe dev - Salle de conférence A ou lien Zoom dans l'invitation",
    type: "reminder",
    priority: "high",
    category: "Agenda",
    source: {
      app: "calendar",
      icon: "📅",
      name: "Calendrier",
      type: "app"
    },
    status: "unread",
    timestamp: "2025-07-14T08:45:00Z",
    scheduledFor: "2025-07-14T09:00:00Z",
    actions: [
      {
        id: "join",
        label: "Rejoindre",
        type: "primary",
        action: "join_meeting",
        icon: "🎥"
      },
      {
        id: "snooze",
        label: "Reporter 5min",
        type: "secondary",
        action: "snooze_5"
      }
    ],
    metadata: {
      url: "https://zoom.us/j/123456789",
      context: {
        entityId: "meeting_456",
        entityType: "calendar_event"
      }
    },
    settings: {
      sound: true,
      vibration: true,
      led: false,
      screen: true,
      banner: true,
      lockScreen: false
    },
    delivery: {
      devices: ["desktop", "mobile"],
      channels: ["push"],
      attempts: 1,
      delivered: true,
      deliveredAt: "2025-07-14T08:45:01Z"
    },
    recurring: {
      enabled: true,
      frequency: "daily",
      until: "2025-12-31T23:59:59Z"
    },
    interactive: true,
    featured: false,
    silent: false
  },
  {
    id: "4",
    title: "Déploiement réussi",
    message: "L'application v2.1.4 a été déployée avec succès en production. Toutes les vérifications sont au vert ✅",
    type: "success",
    priority: "medium",
    category: "DevOps",
    source: {
      app: "github_actions",
      icon: "🚀",
      name: "GitHub Actions",
      type: "app"
    },
    status: "read",
    timestamp: "2025-07-14T07:30:00Z",
    actions: [
      {
        id: "view_deployment",
        label: "Voir les détails",
        type: "secondary",
        action: "view_deployment"
      },
      {
        id: "rollback",
        label: "Rollback",
        type: "danger",
        action: "rollback"
      }
    ],
    metadata: {
      url: "https://github.com/company/app/actions/runs/123456",
      context: {
        entityId: "deployment_789",
        entityType: "github_deployment"
      }
    },
    settings: {
      sound: false,
      vibration: false,
      led: false,
      screen: true,
      banner: false,
      lockScreen: false
    },
    delivery: {
      devices: ["desktop"],
      channels: ["push", "email"],
      attempts: 1,
      delivered: true,
      deliveredAt: "2025-07-14T07:30:02Z",
      opened: true,
      openedAt: "2025-07-14T07:35:00Z"
    },
    interactive: true,
    featured: false,
    silent: true
  },
  {
    id: "5",
    title: "Offre spéciale : 50% de réduction",
    message: "Profitez de notre offre estivale ! 50% de réduction sur tous nos plans premium. Offre limitée jusqu'au 20 juillet.",
    type: "promotion",
    priority: "low",
    category: "Marketing",
    source: {
      app: "newsletter",
      icon: "🎉",
      name: "Newsletter",
      type: "email"
    },
    status: "unread",
    timestamp: "2025-07-14T06:00:00Z",
    expiresAt: "2025-07-20T23:59:59Z",
    actions: [
      {
        id: "view_offer",
        label: "Voir l'offre",
        type: "primary",
        action: "view_offer",
        icon: "🛍️"
      },
      {
        id: "unsubscribe",
        label: "Se désabonner",
        type: "secondary",
        action: "unsubscribe"
      }
    ],
    metadata: {
      url: "https://company.com/summer-offer",
      imageUrl: "/promos/summer-2025.jpg",
      sender: {
        name: "Marketing Team",
        email: "marketing@company.com"
      }
    },
    settings: {
      sound: false,
      vibration: false,
      led: false,
      screen: false,
      banner: false,
      lockScreen: false
    },
    delivery: {
      devices: ["desktop", "mobile"],
      channels: ["email", "push"],
      attempts: 1,
      delivered: true,
      deliveredAt: "2025-07-14T06:00:30Z"
    },
    interactive: true,
    featured: false,
    silent: true
  },
  {
    id: "6",
    title: "Erreur serveur détectée",
    message: "Le serveur API-PROD-01 rencontre des problèmes de performance. Temps de réponse augmenté de 300%. Investigation en cours.",
    type: "error",
    priority: "urgent",
    category: "Infrastructure",
    source: {
      app: "monitoring",
      icon: "⚠️",
      name: "Monitoring",
      type: "system"
    },
    status: "unread",
    timestamp: "2025-07-14T10:45:00Z",
    actions: [
      {
        id: "investigate",
        label: "Enquêter",
        type: "primary",
        action: "investigate_error",
        icon: "🔍"
      },
      {
        id: "escalate",
        label: "Escalader",
        type: "danger",
        action: "escalate"
      },
      {
        id: "acknowledge",
        label: "Acquitter",
        type: "secondary",
        action: "acknowledge"
      }
    ],
    metadata: {
      url: "https://monitoring.company.com/alerts/server-001",
      context: {
        entityId: "server_api_prod_01",
        entityType: "server_alert"
      }
    },
    settings: {
      sound: true,
      vibration: true,
      led: true,
      screen: true,
      banner: true,
      lockScreen: true
    },
    delivery: {
      devices: ["desktop", "mobile"],
      channels: ["push", "sms", "email"],
      attempts: 2,
      delivered: true,
      deliveredAt: "2025-07-14T10:45:01Z"
    },
    grouping: {
      groupId: "server_alerts",
      groupName: "Alertes serveur",
      count: 3,
      latest: true
    },
    interactive: true,
    featured: true,
    silent: false
  }
];

function getNotificationTypeIcon(type: NotificationItem['type'], className = "w-4 h-4") {
  const iconMap = {
    "info": <Info className={className} />,
    "success": <CheckCircle2 className={className} />,
    "warning": <AlertTriangle className={className} />,
    "error": <XCircle className={className} />,
    "update": <Download className={className} />,
    "reminder": <Bell className={className} />,
    "message": <MessageSquare className={className} />,
    "system": <Settings className={className} />,
    "security": <Shield className={className} />,
    "promotion": <Tag className={className} />
  };
  
  return iconMap[type] || <Bell className={className} />;
}

function getNotificationTypeColor(type: string) {
  const colorMap = {
    "info": "bg-blue-100 text-blue-800",
    "success": "bg-green-100 text-green-800",
    "warning": "bg-yellow-100 text-yellow-800",
    "error": "bg-red-100 text-red-800",
    "update": "bg-purple-100 text-purple-800",
    "reminder": "bg-orange-100 text-orange-800",
    "message": "bg-cyan-100 text-cyan-800",
    "system": "bg-gray-100 text-gray-800",
    "security": "bg-red-100 text-red-800",
    "promotion": "bg-pink-100 text-pink-800"
  };
  return colorMap[type as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
}

function getPriorityColor(priority: string) {
  const colorMap = {
    "low": "bg-gray-100 text-gray-800",
    "medium": "bg-yellow-100 text-yellow-800",
    "high": "bg-orange-100 text-orange-800",
    "urgent": "bg-red-100 text-red-800"
  };
  return colorMap[priority as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
}

function getStatusColor(status: string) {
  const colorMap = {
    "unread": "bg-blue-100 text-blue-800",
    "read": "bg-gray-100 text-gray-800",
    "dismissed": "bg-gray-100 text-gray-800",
    "archived": "bg-gray-100 text-gray-800",
    "snoozed": "bg-yellow-100 text-yellow-800",
    "starred": "bg-yellow-100 text-yellow-800"
  };
  return colorMap[status as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
}

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function NotificationCard({ 
  item, 
  variant = "list",
  theme = "light",
  onItemClick,
  onMarkAsRead,
  onDismiss,
  onArchive,
  onSnooze,
  onAction,
  enableMarkAll = false,
  enableArchive = false,
  enableSnooze = false,
  showActions = true
}: { 
  item: NotificationItem;
  variant?: NotificationSectionProps['variant'];
  theme?: "light" | "dark";
  onItemClick?: (item: NotificationItem) => void;
  onMarkAsRead?: (item: NotificationItem) => void;
  onDismiss?: (item: NotificationItem) => void;
  onArchive?: (item: NotificationItem) => void;
  onSnooze?: (item: NotificationItem, duration: number) => void;
  onAction?: (item: NotificationItem, action: string) => void;
  enableMarkAll?: boolean;
  enableArchive?: boolean;
  enableSnooze?: boolean;
  showActions?: boolean;
}) {

  if (variant === "compact") {
    return (
      <div className={cn(
        "flex items-center justify-between p-3 border-b transition-all duration-300 hover:bg-gray-50 cursor-pointer",
        theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "border-gray-200",
        item.status === "unread" && "bg-blue-50 border-l-4 border-l-blue-500",
        item.priority === "urgent" && "bg-red-50 border-l-4 border-l-red-500"
      )} onClick={() => onItemClick?.(item)}>
        
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Icon */}
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
            item.status === "unread" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
          )}>
            {item.source.icon ? (
              <span className="text-sm">{item.source.icon}</span>
            ) : (
              getNotificationTypeIcon(item.type, "w-4 h-4")
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className={cn(
                "text-sm truncate",
                item.status === "unread" ? "font-semibold" : "font-medium"
              )}>
                {item.title}
              </h4>
              {item.priority === "urgent" && (
                <Badge className="bg-red-100 text-red-800 text-xs">
                  Urgent
                </Badge>
              )}
            </div>
            <p className={cn(
              "text-xs truncate",
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            )}>
              {item.message}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>{formatTimestamp(item.timestamp)}</span>
          {showActions && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => { e.stopPropagation(); onMarkAsRead?.(item); }}
            >
              <CheckCircle className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (variant === "timeline") {
    return (
      <div className="relative">
        <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-200" />
        
        <div className={cn(
          "relative flex items-start space-x-4 p-4 ml-8 border rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer",
          theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
          item.featured && "ring-2 ring-blue-500 ring-opacity-50"
        )} onClick={() => onItemClick?.(item)}>
          
          {/* Timeline dot */}
          <div className={cn(
            "absolute -left-6 top-4 w-3 h-3 rounded-full border-2 bg-white",
            item.status === "unread" ? "border-blue-500" : "border-gray-300"
          )} />
          
          {/* Icon */}
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
            getNotificationTypeColor(item.type)
          )}>
            {item.source.icon ? (
              <span className="text-lg">{item.source.icon}</span>
            ) : (
              getNotificationTypeIcon(item.type, "w-5 h-5")
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className={cn(
                  "font-semibold leading-tight",
                  item.status === "unread" && "text-blue-600"
                )}>
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={cn("text-xs", getNotificationTypeColor(item.type))}>
                    {item.type}
                  </Badge>
                  <Badge className={cn("text-xs", getPriorityColor(item.priority))}>
                    {item.priority}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {item.source.name}
                  </span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                {formatTimestamp(item.timestamp)}
              </div>
            </div>
            
            <p className={cn(
              "text-sm leading-relaxed mb-3",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {item.message}
            </p>
            
            {/* Actions */}
            {showActions && item.actions && item.actions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.actions.slice(0, 3).map((action) => (
                  <Button
                    key={action.id}
                    variant={action.type === "primary" ? "default" : action.type === "danger" ? "destructive" : "outline"}
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); onAction?.(item, action.action); }}
                  >
                    {action.icon && <span className="mr-1">{action.icon}</span>}
                    {action.label}
                  </Button>
                ))}
                {item.actions.length > 3 && (
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default list variant
  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md cursor-pointer",
      theme === "dark" && "bg-gray-800 border-gray-700",
      item.featured && "ring-2 ring-blue-500 ring-opacity-50",
      item.status === "unread" && "border-l-4 border-l-blue-500"
    )} onClick={() => onItemClick?.(item)}>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
              getNotificationTypeColor(item.type)
            )}>
              {item.source.icon ? (
                <span className="text-lg">{item.source.icon}</span>
              ) : (
                getNotificationTypeIcon(item.type, "w-5 h-5")
              )}
            </div>
            
            <div className="flex-1">
              <CardTitle className={cn(
                "text-lg leading-tight",
                item.status === "unread" && "text-blue-600"
              )}>
                {item.title}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={cn("text-xs", getNotificationTypeColor(item.type))}>
                  {item.type}
                </Badge>
                <Badge className={cn("text-xs", getPriorityColor(item.priority))}>
                  {item.priority}
                </Badge>
                <span className={cn(
                  "text-xs",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  {item.source.name}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {formatTimestamp(item.timestamp)}
            </span>
            {showActions && (
              <div className="flex space-x-1">
                {enableArchive && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); onArchive?.(item); }}
                  >
                    <Archive className="w-4 h-4" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); onDismiss?.(item); }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className={cn(
          "text-sm leading-relaxed mb-4",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          {item.message}
        </p>

        {/* Metadata */}
        {item.metadata?.sender && (
          <div className="flex items-center space-x-2 mb-3">
            {item.metadata.sender.avatar && (
              <img 
                src={item.metadata.sender.avatar} 
                alt={item.metadata.sender.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-sm font-medium">{item.metadata.sender.name}</span>
            {item.metadata.sender.email && (
              <span className="text-xs text-gray-500">{item.metadata.sender.email}</span>
            )}
          </div>
        )}

        {/* Grouping info */}
        {item.grouping && (
          <div className="mb-3">
            <Badge variant="outline" className="text-xs">
              {item.grouping.groupName} ({item.grouping.count})
            </Badge>
          </div>
        )}

        {/* Actions */}
        {showActions && item.actions && item.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3 border-t">
            {item.actions.map((action) => (
              <Button
                key={action.id}
                variant={action.type === "primary" ? "default" : action.type === "danger" ? "destructive" : "outline"}
                size="sm"
                onClick={(e) => { e.stopPropagation(); onAction?.(item, action.action); }}
              >
                {action.icon && <span className="mr-1">{action.icon}</span>}
                {action.label}
              </Button>
            ))}
          </div>
        )}

        {/* Settings indicators */}
        {item.settings && (
          <div className="flex items-center space-x-2 pt-3 border-t mt-3">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              {item.settings.sound && <Volume className="w-3 h-3" />}
              {!item.settings.sound && <VolumeX className="w-3 h-3" />}
              {item.silent && <span>Mode silencieux</span>}
            </div>
            
            <div className="flex space-x-1">
              {item.delivery?.devices.map((device) => (
                <Badge key={device} variant="outline" className="text-xs">
                  {device === "desktop" && <Monitor className="w-3 h-3" />}
                  {device === "mobile" && <Mobile className="w-3 h-3" />}
                  {device === "tablet" && <Tablet className="w-3 h-3" />}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function NotificationSection({
  variant = "list",
  title = "Notifications",
  description = "Restez informé des dernières mises à jour, messages et alertes importantes.",
  items = defaultItems,
  showSearch = true,
  showFilters = true,
  showActions = true,
  showGrouping = false,
  maxVisible,
  enableMarkAll = true,
  enableArchive = true,
  enableSnooze = true,
  enableSound = true,
  className,
  theme = "light",
  onItemClick,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onArchive,
  onSnooze,
  onAction,
  onClearAll,
  onSettingsClick
}: NotificationSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("all");
  const [selectedPriority, setSelectedPriority] = React.useState("all");
  const [selectedStatus, setSelectedStatus] = React.useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    const matchesUnread = !showUnreadOnly || item.status === "unread";
    return matchesSearch && matchesType && matchesPriority && matchesStatus && matchesUnread;
  });

  const displayedItems = maxVisible && !showAll 
    ? filteredItems.slice(0, maxVisible)
    : filteredItems;

  const types = Array.from(new Set(items.map(item => item.type)));
  const priorities = Array.from(new Set(items.map(item => item.priority)));
  const statuses = Array.from(new Set(items.map(item => item.status)));

  // Stats
  const unreadCount = items.filter(item => item.status === "unread").length;
  const urgentCount = items.filter(item => item.priority === "urgent").length;
  const todayCount = items.filter(item => {
    const today = new Date().toDateString();
    return new Date(item.timestamp).toDateString() === today;
  }).length;

  return (
    <section className={cn(
      "py-16",
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
      className
    )}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className={cn(
              "text-lg max-w-3xl leading-relaxed",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {description}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {enableMarkAll && unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={onMarkAllAsRead}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Tout marquer comme lu ({unreadCount})
              </Button>
            )}
            
            {onClearAll && (
              <Button
                variant="outline"
                onClick={onClearAll}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Tout effacer
              </Button>
            )}
            
            {onSettingsClick && (
              <Button
                variant="outline"
                onClick={onSettingsClick}
              >
                <Settings2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className={cn(
            "p-4 rounded-lg border text-center",
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <div className="text-2xl font-bold text-blue-600 mb-1">{unreadCount}</div>
            <div className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            )}>
              Non lues
            </div>
          </div>
          
          <div className={cn(
            "p-4 rounded-lg border text-center",
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <div className="text-2xl font-bold text-red-600 mb-1">{urgentCount}</div>
            <div className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            )}>
              Urgentes
            </div>
          </div>
          
          <div className={cn(
            "p-4 rounded-lg border text-center",
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <div className="text-2xl font-bold text-green-600 mb-1">{todayCount}</div>
            <div className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            )}>
              Aujourd'hui
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        {(showSearch || showFilters) && (
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {showSearch && (
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher des notifications..."
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
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className={cn(
                    "px-3 py-2 border rounded-lg text-sm",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                >
                  <option value="all">Toutes priorités</option>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority} className="capitalize">{priority}</option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className={cn(
                    "px-3 py-2 border rounded-lg text-sm",
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-300"
                  )}
                >
                  <option value="all">Tous statuts</option>
                  {statuses.map((status) => (
                    <option key={status} value={status} className="capitalize">{status}</option>
                  ))}
                </select>

                <label className="flex items-center space-x-2 px-3 py-2 border rounded-lg text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showUnreadOnly}
                    onChange={(e) => setShowUnreadOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>Non lues uniquement</span>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Items */}
        <div className={cn(
          variant === "timeline" 
            ? "space-y-6" 
            : variant === "compact"
            ? "border rounded-lg overflow-hidden"
            : "space-y-4"
        )}>
          {displayedItems.map((item) => (
            <NotificationCard
              key={item.id}
              item={item}
              variant={variant}
              theme={theme}
              onItemClick={onItemClick}
              onMarkAsRead={onMarkAsRead}
              onDismiss={onDismiss}
              onArchive={onArchive}
              onSnooze={onSnooze}
              onAction={onAction}
              enableMarkAll={enableMarkAll}
              enableArchive={enableArchive}
              enableSnooze={enableSnooze}
              showActions={showActions}
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
              Voir toutes les notifications ({filteredItems.length})
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune notification</h3>
            <p className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            )}>
              Vous êtes à jour ! Aucune notification ne correspond à vos critères.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export type { NotificationSectionProps, NotificationItem };
