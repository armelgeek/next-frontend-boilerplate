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
  DollarSign,
  Percent,
  Calculator,
  PiggyBank,
  CreditCard,
  Wallet,
  TrendingUpIcon,
  TrendingDownIcon,
  BarChart,
  Euro,
  Coins,
  Banknote,
  Receipt,
  ShoppingCart,
  Home,
  Car,
  Ship,
  Building2,
  Landmark,
  Briefcase as BusinessIcon,
  Handshake,
  FileChartLine,
  CircleDollarSign,
  CandlestickChart
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface FinanceItem {
  id: string;
  title: string;
  description: string;
  type: "budget" | "expense" | "income" | "investment" | "loan" | "saving" | "insurance" | "tax" | "report" | "goal" | "transaction" | "account";
  category: string;
  subcategory?: string;
  amount: {
    value: number;
    currency: string;
    formatted?: string;
  };
  date: string;
  dueDate?: string;
  status: "pending" | "completed" | "overdue" | "cancelled" | "processing" | "approved" | "rejected";
  priority?: "low" | "medium" | "high" | "critical";
  tags: string[];
  account?: {
    id: string;
    name: string;
    type: "checking" | "savings" | "credit" | "investment" | "loan";
    balance?: number;
    institution?: string;
  };
  merchant?: {
    name: string;
    category: string;
    location?: string;
  };
  budget?: {
    total: number;
    spent: number;
    remaining: number;
    period: "weekly" | "monthly" | "yearly";
  };
  investment?: {
    symbol: string;
    quantity: number;
    purchasePrice: number;
    currentPrice: number;
    gain: number;
    gainPercent: number;
    portfolio?: string;
  };
  loan?: {
    principal: number;
    interestRate: number;
    term: number;
    monthlyPayment: number;
    remainingBalance: number;
    nextPayment?: string;
  };
  recurring?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    nextOccurrence?: string;
    endDate?: string;
  };
  analytics?: {
    trend: "up" | "down" | "stable";
    changePercent: number;
    comparison?: {
      period: string;
      value: number;
    };
  };
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  notes?: string;
  labels?: string[];
  featured?: boolean;
  verified?: boolean;
  icon?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface FinanceSectionProps {
  variant?: "dashboard" | "transactions" | "budgets" | "investments" | "reports" | "summary";
  title?: string;
  description?: string;
  items?: FinanceItem[];
  showSearch?: boolean;
  showFilters?: boolean;
  showSummary?: boolean;
  showChart?: boolean;
  maxVisible?: number;
  enableExport?: boolean;
  enableNotifications?: boolean;
  enableQuickActions?: boolean;
  className?: string;
  theme?: "light" | "dark";
  onItemClick?: (item: FinanceItem) => void;
  onEdit?: (item: FinanceItem) => void;
  onDelete?: (item: FinanceItem) => void;
  onExport?: (items: FinanceItem[]) => void;
  onAddTransaction?: () => void;
  onViewAccount?: (account: FinanceItem['account']) => void;
  onViewMerchant?: (merchant: FinanceItem['merchant']) => void;
}

const defaultItems: FinanceItem[] = [
  {
    id: "1",
    title: "Salaire mensuel",
    description: "Salaire de décembre 2024",
    type: "income",
    category: "Emploi",
    subcategory: "Salaire fixe",
    amount: {
      value: 3500,
      currency: "EUR",
      formatted: "3 500,00 €"
    },
    date: "2024-12-01",
    status: "completed",
    tags: ["salaire", "mensuel", "emploi"],
    account: {
      id: "acc1",
      name: "Compte Courant",
      type: "checking",
      balance: 4250.50,
      institution: "Banque de France"
    },
    recurring: {
      frequency: "monthly",
      nextOccurrence: "2025-01-01"
    },
    analytics: {
      trend: "stable",
      changePercent: 0,
      comparison: {
        period: "Mois précédent",
        value: 3500
      }
    },
    verified: true,
    icon: "💰",
    color: "green",
    createdAt: "2024-12-01T08:00:00Z"
  },
  {
    id: "2",
    title: "Courses alimentaires",
    description: "Achats supermarché Carrefour",
    type: "expense",
    category: "Alimentation",
    subcategory: "Courses",
    amount: {
      value: -127.45,
      currency: "EUR",
      formatted: "-127,45 €"
    },
    date: "2024-12-15",
    status: "completed",
    tags: ["courses", "alimentation", "supermarché"],
    account: {
      id: "acc1",
      name: "Compte Courant",
      type: "checking"
    },
    merchant: {
      name: "Carrefour",
      category: "Supermarché",
      location: "Paris 15ème"
    },
    budget: {
      total: 400,
      spent: 280.75,
      remaining: 119.25,
      period: "monthly"
    },
    attachments: [
      {
        id: "att1",
        name: "ticket_carrefour.pdf",
        type: "application/pdf",
        url: "/attachments/ticket_carrefour.pdf"
      }
    ],
    notes: "Promotion sur les produits bio",
    featured: false,
    icon: "🛒",
    color: "red",
    createdAt: "2024-12-15T14:30:00Z"
  },
  {
    id: "3",
    title: "Actions Apple Inc.",
    description: "Achat de 10 actions AAPL",
    type: "investment",
    category: "Investissements",
    subcategory: "Actions",
    amount: {
      value: 1890.50,
      currency: "EUR",
      formatted: "1 890,50 €"
    },
    date: "2024-12-10",
    status: "completed",
    tags: ["actions", "apple", "technologie", "investissement"],
    account: {
      id: "acc3",
      name: "Compte Titres",
      type: "investment",
      institution: "Boursorama"
    },
    investment: {
      symbol: "AAPL",
      quantity: 10,
      purchasePrice: 189.05,
      currentPrice: 195.80,
      gain: 67.50,
      gainPercent: 3.57,
      portfolio: "Tech Portfolio"
    },
    analytics: {
      trend: "up",
      changePercent: 3.57,
      comparison: {
        period: "Depuis l'achat",
        value: 1890.50
      }
    },
    featured: true,
    icon: "📈",
    color: "blue",
    createdAt: "2024-12-10T09:15:00Z"
  },
  {
    id: "4",
    title: "Loyer appartement",
    description: "Loyer mensuel décembre 2024",
    type: "expense",
    category: "Logement",
    subcategory: "Loyer",
    amount: {
      value: -1200,
      currency: "EUR",
      formatted: "-1 200,00 €"
    },
    date: "2024-12-01",
    dueDate: "2024-12-05",
    status: "completed",
    priority: "high",
    tags: ["loyer", "logement", "mensuel"],
    account: {
      id: "acc1",
      name: "Compte Courant",
      type: "checking"
    },
    recurring: {
      frequency: "monthly",
      nextOccurrence: "2025-01-01"
    },
    budget: {
      total: 1200,
      spent: 1200,
      remaining: 0,
      period: "monthly"
    },
    featured: false,
    icon: "🏠",
    color: "orange",
    createdAt: "2024-12-01T00:00:00Z"
  },
  {
    id: "5",
    title: "Objectif vacances été",
    description: "Épargne pour les vacances d'été 2025",
    type: "goal",
    category: "Objectifs",
    subcategory: "Vacances",
    amount: {
      value: 2500,
      currency: "EUR",
      formatted: "2 500,00 €"
    },
    date: "2025-07-01",
    status: "pending",
    tags: ["épargne", "vacances", "objectif"],
    account: {
      id: "acc2",
      name: "Livret A",
      type: "savings",
      balance: 850,
      institution: "Banque Postale"
    },
    budget: {
      total: 2500,
      spent: 850,
      remaining: 1650,
      period: "yearly"
    },
    analytics: {
      trend: "up",
      changePercent: 34,
      comparison: {
        period: "Progression",
        value: 850
      }
    },
    featured: true,
    icon: "🏖️",
    color: "purple",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "6",
    title: "Prêt immobilier",
    description: "Remboursement mensuel prêt immobilier",
    type: "loan",
    category: "Crédits",
    subcategory: "Immobilier",
    amount: {
      value: -890.25,
      currency: "EUR",
      formatted: "-890,25 €"
    },
    date: "2024-12-05",
    dueDate: "2024-12-05",
    status: "completed",
    priority: "high",
    tags: ["prêt", "immobilier", "mensuel"],
    account: {
      id: "acc1",
      name: "Compte Courant",
      type: "checking"
    },
    loan: {
      principal: 200000,
      interestRate: 1.8,
      term: 240,
      monthlyPayment: 890.25,
      remainingBalance: 156780.50,
      nextPayment: "2025-01-05"
    },
    recurring: {
      frequency: "monthly",
      nextOccurrence: "2025-01-05",
      endDate: "2035-12-05"
    },
    featured: false,
    icon: "🏡",
    color: "red",
    createdAt: "2024-12-05T00:00:00Z"
  }
];

function getTypeIcon(type: FinanceItem['type'], className = "w-4 h-4") {
  const iconMap = {
    "budget": <PiggyBank className={className} />,
    "expense": <ArrowRight className={cn(className, "rotate-45")} />,
    "income": <ArrowRight className={cn(className, "-rotate-45 text-green-600")} />,
    "investment": <TrendingUp className={className} />,
    "loan": <Calculator className={className} />,
    "saving": <PiggyBank className={className} />,
    "insurance": <Shield className={className} />,
    "tax": <Receipt className={className} />,
    "report": <FileChartLine className={className} />,
    "goal": <Target className={className} />,
    "transaction": <CreditCard className={className} />,
    "account": <Wallet className={className} />
  };
  
  return iconMap[type] || <DollarSign className={className} />;
}

function getStatusColor(status: string) {
  const colorMap = {
    "pending": "bg-yellow-100 text-yellow-800",
    "completed": "bg-green-100 text-green-800",
    "overdue": "bg-red-100 text-red-800",
    "cancelled": "bg-gray-100 text-gray-800",
    "processing": "bg-blue-100 text-blue-800",
    "approved": "bg-green-100 text-green-800",
    "rejected": "bg-red-100 text-red-800"
  };
  return colorMap[status as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
}

function getPriorityColor(priority: string) {
  const colorMap = {
    "low": "bg-gray-100 text-gray-800",
    "medium": "bg-yellow-100 text-yellow-800",
    "high": "bg-orange-100 text-orange-800",
    "critical": "bg-red-100 text-red-800"
  };
  return colorMap[priority as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
}

function formatAmount(amount: FinanceItem['amount']) {
  if (amount.formatted) return amount.formatted;
  
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: amount.currency
  });
  
  return formatter.format(amount.value);
}

function FinanceCard({ 
  item, 
  variant = "dashboard",
  theme = "light",
  onItemClick,
  onEdit,
  onDelete,
  onViewAccount,
  onViewMerchant,
  enableQuickActions = false
}: { 
  item: FinanceItem;
  variant?: FinanceSectionProps['variant'];
  theme?: "light" | "dark";
  onItemClick?: (item: FinanceItem) => void;
  onEdit?: (item: FinanceItem) => void;
  onDelete?: (item: FinanceItem) => void;
  onViewAccount?: (account: FinanceItem['account']) => void;
  onViewMerchant?: (merchant: FinanceItem['merchant']) => void;
  enableQuickActions?: boolean;
}) {

  if (variant === "transactions") {
    return (
      <div className={cn(
        "flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
        item.featured && "ring-2 ring-blue-500 ring-opacity-50"
      )} onClick={() => onItemClick?.(item)}>
        
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-lg",
            item.amount.value >= 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          )}>
            {item.icon || getTypeIcon(item.type, "w-6 h-6")}
          </div>
          
          <div>
            <h4 className="font-semibold">{item.title}</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{item.category}</span>
              {item.merchant && (
                <>
                  <span>•</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onViewMerchant?.(item.merchant); }}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.merchant.name}
                  </button>
                </>
              )}
              {item.account && (
                <>
                  <span>•</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onViewAccount?.(item.account); }}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.account.name}
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs mt-1">
              <Badge className={cn("text-xs", getStatusColor(item.status))}>
                {item.status}
              </Badge>
              {item.priority && (
                <Badge className={cn("text-xs", getPriorityColor(item.priority))}>
                  {item.priority}
                </Badge>
              )}
              <span className="text-gray-400">
                {new Date(item.date).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className={cn(
            "text-lg font-bold",
            item.amount.value >= 0 ? "text-green-600" : "text-red-600"
          )}>
            {formatAmount(item.amount)}
          </div>
          
          {item.analytics && (
            <div className={cn(
              "text-sm flex items-center justify-end space-x-1",
              item.analytics.trend === "up" ? "text-green-600" : 
              item.analytics.trend === "down" ? "text-red-600" : "text-gray-600"
            )}>
              {item.analytics.trend === "up" ? <TrendingUp className="w-3 h-3" /> :
               item.analytics.trend === "down" ? <TrendingDown className="w-3 h-3" /> :
               <span className="w-3 h-3 rounded-full bg-gray-400" />}
              <span>{Math.abs(item.analytics.changePercent)}%</span>
            </div>
          )}
          
          {enableQuickActions && (
            <div className="flex space-x-1 mt-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
              >
                <Settings className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "summary") {
    return (
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg cursor-pointer",
        theme === "dark" && "bg-gray-800 border-gray-700",
        item.featured && "ring-2 ring-blue-500 ring-opacity-50"
      )} onClick={() => onItemClick?.(item)}>
        
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "p-2 rounded-full",
                item.amount.value >= 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              )}>
                {item.icon ? (
                  <span className="text-lg">{item.icon}</span>
                ) : (
                  getTypeIcon(item.type, "w-5 h-5")
                )}
              </div>
              <div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <p className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  {item.category}
                  {item.subcategory && ` • ${item.subcategory}`}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={cn(
                "text-xl font-bold",
                item.amount.value >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {formatAmount(item.amount)}
              </div>
              {item.analytics && (
                <div className={cn(
                  "text-sm flex items-center justify-end space-x-1 mt-1",
                  item.analytics.trend === "up" ? "text-green-600" : 
                  item.analytics.trend === "down" ? "text-red-600" : "text-gray-600"
                )}>
                  {item.analytics.trend === "up" ? <TrendingUp className="w-3 h-3" /> :
                   item.analytics.trend === "down" ? <TrendingDown className="w-3 h-3" /> :
                   <span className="w-3 h-3 rounded-full bg-gray-400" />}
                  <span>{Math.abs(item.analytics.changePercent)}%</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Progress bar for budgets and goals */}
          {item.budget && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Budget utilisé</span>
                <span>{((item.budget.spent / item.budget.total) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    (item.budget.spent / item.budget.total) > 0.9 ? "bg-red-500" :
                    (item.budget.spent / item.budget.total) > 0.7 ? "bg-yellow-500" : "bg-green-500"
                  )}
                  style={{ width: `${Math.min((item.budget.spent / item.budget.total) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatAmount({ value: item.budget.spent, currency: item.amount.currency })}</span>
                <span>{formatAmount({ value: item.budget.total, currency: item.amount.currency })}</span>
              </div>
            </div>
          )}

          {/* Investment details */}
          {item.investment && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Symbole:</span>
                <span className="font-mono">{item.investment.symbol}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quantité:</span>
                <span>{item.investment.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Prix d'achat:</span>
                <span>{formatAmount({ value: item.investment.purchasePrice, currency: item.amount.currency })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Prix actuel:</span>
                <span>{formatAmount({ value: item.investment.currentPrice, currency: item.amount.currency })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Gain/Perte:</span>
                <span className={cn(
                  "font-medium",
                  item.investment.gain >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {formatAmount({ value: item.investment.gain, currency: item.amount.currency })} 
                  ({item.investment.gainPercent > 0 ? '+' : ''}{item.investment.gainPercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          )}

          {/* Loan details */}
          {item.loan && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Capital restant:</span>
                <span>{formatAmount({ value: item.loan.remainingBalance, currency: item.amount.currency })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taux d'intérêt:</span>
                <span>{item.loan.interestRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Mensualité:</span>
                <span>{formatAmount({ value: item.loan.monthlyPayment, currency: item.amount.currency })}</span>
              </div>
              {item.loan.nextPayment && (
                <div className="flex justify-between text-sm">
                  <span>Prochain paiement:</span>
                  <span>{new Date(item.loan.nextPayment).toLocaleDateString('fr-FR')}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Badge className={cn("text-xs", getStatusColor(item.status))}>
                {item.status}
              </Badge>
              {item.recurring && (
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.recurring.frequency}
                </Badge>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              {new Date(item.date).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default dashboard variant
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
              "p-3 rounded-full",
              item.amount.value >= 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            )}>
              {item.icon ? (
                <span className="text-xl">{item.icon}</span>
              ) : (
                getTypeIcon(item.type, "w-6 h-6")
              )}
            </div>
            <div>
              <CardTitle className="line-clamp-1">{item.title}</CardTitle>
              <p className={cn(
                "text-sm mt-1",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                {item.category}
              </p>
            </div>
          </div>
          
          {enableQuickActions && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className={cn(
              "text-2xl font-bold",
              item.amount.value >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {formatAmount(item.amount)}
            </div>
            {item.analytics && (
              <div className={cn(
                "text-sm flex items-center justify-center space-x-1 mt-1",
                item.analytics.trend === "up" ? "text-green-600" : 
                item.analytics.trend === "down" ? "text-red-600" : "text-gray-600"
              )}>
                {item.analytics.trend === "up" ? <TrendingUp className="w-4 h-4" /> :
                 item.analytics.trend === "down" ? <TrendingDown className="w-4 h-4" /> :
                 <span className="w-4 h-4 rounded-full bg-gray-400" />}
                <span>{Math.abs(item.analytics.changePercent)}%</span>
              </div>
            )}
          </div>

          <p className={cn(
            "text-sm text-center line-clamp-2",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {item.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            <Badge className={cn("text-xs", getStatusColor(item.status))}>
              {item.status}
            </Badge>
            <span className="text-gray-500">
              {new Date(item.date).toLocaleDateString('fr-FR')}
            </span>
          </div>

          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{item.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function FinanceSection({
  variant = "dashboard",
  title = "Finances",
  description = "Gérez vos finances personnelles avec des outils de suivi et d'analyse avancés.",
  items = defaultItems,
  showSearch = true,
  showFilters = true,
  showSummary = true,
  showChart = false,
  maxVisible,
  enableExport = false,
  enableNotifications = false,
  enableQuickActions = false,
  className,
  theme = "light",
  onItemClick,
  onEdit,
  onDelete,
  onExport,
  onAddTransaction,
  onViewAccount,
  onViewMerchant
}: FinanceSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("all");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedStatus, setSelectedStatus] = React.useState("all");
  const [showAll, setShowAll] = React.useState(false);

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  const displayedItems = maxVisible && !showAll 
    ? filteredItems.slice(0, maxVisible)
    : filteredItems;

  const types = Array.from(new Set(items.map(item => item.type)));
  const categories = Array.from(new Set(items.map(item => item.category)));
  const statuses = Array.from(new Set(items.map(item => item.status)));

  // Calculate summary stats
  const totalIncome = items.filter(item => item.amount.value > 0).reduce((sum, item) => sum + item.amount.value, 0);
  const totalExpenses = Math.abs(items.filter(item => item.amount.value < 0).reduce((sum, item) => sum + item.amount.value, 0));
  const netBalance = totalIncome - totalExpenses;
  const investmentGains = items.filter(item => item.investment).reduce((sum, item) => sum + (item.investment?.gain || 0), 0);

  return (
    <section className={cn(
      "py-16",
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4">
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
            {enableExport && (
              <Button
                variant="outline"
                onClick={() => onExport?.(filteredItems)}
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            )}
            
            {onAddTransaction && (
              <Button onClick={onAddTransaction}>
                <PiggyBank className="w-4 h-4 mr-2" />
                Nouvelle transaction
              </Button>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        {showSummary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className={cn(
              "p-6 rounded-lg border",
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            )}>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 text-green-600 rounded-full">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Revenus</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {formatAmount({ value: totalIncome, currency: "EUR" })}
              </div>
            </div>
            
            <div className={cn(
              "p-6 rounded-lg border",
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            )}>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-red-100 text-red-600 rounded-full">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Dépenses</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {formatAmount({ value: totalExpenses, currency: "EUR" })}
              </div>
            </div>
            
            <div className={cn(
              "p-6 rounded-lg border",
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            )}>
              <div className="flex items-center space-x-3 mb-2">
                <div className={cn(
                  "p-2 rounded-full",
                  netBalance >= 0 ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                )}>
                  <Wallet className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Solde</span>
              </div>
              <div className={cn(
                "text-2xl font-bold",
                netBalance >= 0 ? "text-blue-600" : "text-orange-600"
              )}>
                {formatAmount({ value: netBalance, currency: "EUR" })}
              </div>
            </div>
            
            <div className={cn(
              "p-6 rounded-lg border",
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            )}>
              <div className="flex items-center space-x-3 mb-2">
                <div className={cn(
                  "p-2 rounded-full",
                  investmentGains >= 0 ? "bg-purple-100 text-purple-600" : "bg-red-100 text-red-600"
                )}>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Gains investissement</span>
              </div>
              <div className={cn(
                "text-2xl font-bold",
                investmentGains >= 0 ? "text-purple-600" : "text-red-600"
              )}>
                {formatAmount({ value: investmentGains, currency: "EUR" })}
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
                  placeholder="Rechercher des transactions..."
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
              </div>
            )}
          </div>
        )}

        {/* Items */}
        <div className={cn(
          variant === "transactions" || variant === "reports"
            ? "space-y-4" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        )}>
          {displayedItems.map((item) => (
            <FinanceCard
              key={item.id}
              item={item}
              variant={variant}
              theme={theme}
              onItemClick={onItemClick}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewAccount={onViewAccount}
              onViewMerchant={onViewMerchant}
              enableQuickActions={enableQuickActions}
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
              Voir tous les éléments ({filteredItems.length})
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export type { FinanceSectionProps, FinanceItem };
