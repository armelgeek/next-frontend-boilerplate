"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components/atoms/ui/sheet';
import { 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Menu,
  X,
  Home,
  Users,
  Package,
  ShoppingCart,
  LayoutDashboard,
  Settings,
  FileText,
  BarChart3
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

// Types pour la navigation
export interface NavigationItem {
  key: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children?: NavigationItem[];
  permissions?: string[];
  description?: string;
  keywords?: string[];
}

export interface NavigationConfig {
  title: string;
  type: 'sidebar' | 'header' | 'tabs' | 'mobile';
  items: NavigationItem[];
  options?: {
    collapsible?: boolean;
    searchable?: boolean;
    showBadges?: boolean;
    defaultCollapsed?: boolean;
    searchPlaceholder?: string;
  };
}

// Mapping des icônes
const IconMap = {
  Home,
  Users,
  Package,
  ShoppingCart,
  LayoutDashboard,
  Settings,
  FileText,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Search,
  Menu,
  X
};

// Hook pour vérifier si un lien est actif
function useActiveLink() {
  const pathname = usePathname();
  
  return (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };
}

// Composant pour afficher une icône
function NavIcon({ icon, className }: { icon?: string; className?: string }) {
  if (!icon) return null;
  
  const Icon = IconMap[icon as keyof typeof IconMap];
  if (!Icon) return null;
  
  return <Icon className={className} />;
}

// Composant pour un item de navigation
interface NavItemProps {
  item: NavigationItem;
  isActive: boolean;
  level?: number;
  collapsed?: boolean;
  onItemClick?: () => void;
}

function NavItem({ item, isActive, level = 0, collapsed = false, onItemClick }: NavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const checkActive = useActiveLink();

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onItemClick?.();
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
          level > 0 && "ml-6 pl-3",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
        onClick={handleClick}
      >
        {/* Icône */}
        {level === 0 && (
          <NavIcon 
            icon={item.icon} 
            className="h-4 w-4 flex-shrink-0" 
          />
        )}
        
        {/* Label */}
        {!collapsed && (
          <>
            <span className="flex-1">{item.label}</span>
            
            {/* Badge */}
            {item.badge && (
              <Badge variant={item.badgeVariant || 'default'} className="text-xs">
                {item.badge}
              </Badge>
            )}
            
            {/* Chevron pour les items avec enfants */}
            {hasChildren && (
              <NavIcon 
                icon={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
                className="h-3 w-3 flex-shrink-0" 
              />
            )}
          </>
        )}
      </div>

      {/* Enfants */}
      {hasChildren && isExpanded && !collapsed && (
        <div className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <Link key={child.key} href={child.href}>
              <NavItem
                item={child}
                isActive={checkActive(child.href)}
                level={level + 1}
                onItemClick={onItemClick}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Composant Sidebar
interface SidebarProps {
  config: NavigationConfig;
  className?: string;
  userPermissions?: string[];
}

export function Sidebar({ config, className, userPermissions = [] }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(config.options?.defaultCollapsed || false);
  const [searchQuery, setSearchQuery] = useState('');
  const checkActive = useActiveLink();

  // Filtrer les items selon les permissions
  const filterItemsByPermissions = (items: NavigationItem[]): NavigationItem[] => {
    return items.filter(item => {
      if (item.permissions && item.permissions.length > 0) {
        return item.permissions.some(permission => userPermissions.includes(permission));
      }
      return true;
    }).map(item => ({
      ...item,
      children: item.children ? filterItemsByPermissions(item.children) : undefined
    }));
  };

  // Filtrer les items selon la recherche
  const filterItemsBySearch = (items: NavigationItem[]): NavigationItem[] => {
    if (!searchQuery) return items;
    
    return items.filter(item => {
      const matchesSearch = (
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords?.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      
      const hasMatchingChildren = item.children?.some(child =>
        child.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      return matchesSearch || hasMatchingChildren;
    });
  };

  const filteredItems = filterItemsBySearch(
    filterItemsByPermissions(config.items)
  );

  return (
    <div className={cn(
      "flex flex-col h-full bg-background border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h2 className="text-lg font-semibold">{config.title}</h2>}
        
        {config.options?.collapsible && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Recherche */}
      {config.options?.searchable && !collapsed && (
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={config.options.searchPlaceholder || "Rechercher..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredItems.map((item) => (
          <Link key={item.key} href={item.href}>
            <NavItem
              item={item}
              isActive={checkActive(item.href)}
              collapsed={collapsed}
            />
          </Link>
        ))}
      </nav>
    </div>
  );
}

// Composant Header Navigation
export function HeaderNavigation({ config, userPermissions = [] }: SidebarProps) {
  const checkActive = useActiveLink();

  const filteredItems = config.items.filter(item => {
    if (item.permissions && item.permissions.length > 0) {
      return item.permissions.some(permission => userPermissions.includes(permission));
    }
    return true;
  });

  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold">{config.title}</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {filteredItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  checkActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <NavIcon icon={item.icon} className="h-4 w-4" />
                {item.label}
                {item.badge && (
                  <Badge variant={item.badgeVariant || 'default'} className="text-xs ml-1">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu */}
          <MobileNavigation config={config} userPermissions={userPermissions} />
        </div>
      </div>
    </header>
  );
}

// Composant Mobile Navigation
function MobileNavigation({ config, userPermissions = [] }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const checkActive = useActiveLink();

  const filteredItems = config.items.filter(item => {
    if (item.permissions && item.permissions.length > 0) {
      return item.permissions.some(permission => userPermissions.includes(permission));
    }
    return true;
  });

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">{config.title}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {filteredItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <NavItem
                  item={item}
                  isActive={checkActive(item.href)}
                  onItemClick={() => setIsOpen(false)}
                />
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Composant Breadcrumbs
interface BreadcrumbItem {
  label: string;
  href: string;
  isActive: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && <span className="text-muted-foreground/50">/</span>}
          <Link
            href={item.href}
            className={cn(
              "hover:text-foreground transition-colors",
              item.isActive && "text-foreground font-medium"
            )}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}

// Fonction helper pour créer des configurations rapides
export const NavigationHelpers = {
  createAdminSidebar: (): NavigationConfig => ({
    title: 'Administration',
    type: 'sidebar',
    items: [
      {
        key: 'dashboard',
        label: 'Dashboard',
        href: '/admin',
        icon: 'LayoutDashboard'
      },
      {
        key: 'users',
        label: 'Utilisateurs',
        href: '/admin/users',
        icon: 'Users',
        badge: 'NEW'
      },
      {
        key: 'content',
        label: 'Contenu',
        href: '/admin/content',
        icon: 'FileText',
        children: [
          {
            key: 'posts',
            label: 'Articles',
            href: '/admin/content/posts'
          },
          {
            key: 'categories',
            label: 'Catégories',
            href: '/admin/content/categories'
          }
        ]
      },
      {
        key: 'analytics',
        label: 'Analytics',
        href: '/admin/analytics',
        icon: 'BarChart3'
      },
      {
        key: 'settings',
        label: 'Paramètres',
        href: '/admin/settings',
        icon: 'Settings'
      }
    ],
    options: {
      collapsible: true,
      searchable: true,
      showBadges: true
    }
  }),

  createEcommerceHeader: (): NavigationConfig => ({
    title: 'MonShop',
    type: 'header',
    items: [
      {
        key: 'home',
        label: 'Accueil',
        href: '/',
        icon: 'Home'
      },
      {
        key: 'products',
        label: 'Produits',
        href: '/products',
        icon: 'Package'
      },
      {
        key: 'cart',
        label: 'Panier',
        href: '/cart',
        icon: 'ShoppingCart',
        badge: '3',
        badgeVariant: 'secondary'
      }
    ]
  }),

  generateBreadcrumbs: (pathname: string, routeLabels: Record<string, string>): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let currentPath = '';
    
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const isActive = index === paths.length - 1;
      
      breadcrumbs.push({
        label: routeLabels[currentPath] || path,
        href: currentPath,
        isActive
      });
    });
    
    return breadcrumbs;
  }
};
