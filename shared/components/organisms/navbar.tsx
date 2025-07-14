"use client";

import React, { useState } from "react";
import { Button } from "@/shared/components/atoms/ui/button";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/atoms/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/components/atoms/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/atoms/ui/sheet";
import { 
  Menu,
  X,
  Search,
  ShoppingCart,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  Info,
  Mail,
  Phone,
  Globe,
  Building,
  Package,
  Users,
  Heart,
  Star,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Stethoscope,
  Utensils,
  Plane,
  Camera,
  Music,
  MessageSquare,
  Code,
  DollarSign,
  FileText,
  HelpCircle,
  Zap
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  children?: NavItem[];
  description?: string;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface NavbarProps {
  variant?: "default" | "minimal" | "corporate" | "ecommerce" | "dashboard" | "landing" | "blog" | "app";
  logo?: {
    src?: string;
    text?: string;
    href?: string;
  };
  navigation?: NavItem[];
  user?: User;
  showSearch?: boolean;
  showCart?: boolean;
  cartCount?: number;
  showNotifications?: boolean;
  notificationCount?: number;
  showCTA?: boolean;
  ctaText?: string;
  ctaVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onCtaClick?: () => void;
  className?: string;
  sticky?: boolean;
  transparent?: boolean;
  theme?: "light" | "dark" | "auto";
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onNotificationClick?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
}

const defaultNavigation: NavItem[] = [
  {
    label: "Accueil",
    href: "/",
    icon: <Home className="w-4 h-4" />
  },
  {
    label: "Produits",
    href: "/products",
    icon: <Package className="w-4 h-4" />,
    children: [
      { label: "Tous les produits", href: "/products", description: "Parcourir tous nos produits" },
      { label: "Nouveautés", href: "/products/new", description: "Les derniers ajouts" },
      { label: "Promotions", href: "/products/sale", description: "Offres spéciales" }
    ]
  },
  {
    label: "Services",
    href: "/services",
    icon: <Briefcase className="w-4 h-4" />,
    children: [
      { label: "Consultation", href: "/services/consulting" },
      { label: "Support", href: "/services/support" },
      { label: "Formation", href: "/services/training" }
    ]
  },
  {
    label: "À propos",
    href: "/about",
    icon: <Info className="w-4 h-4" />
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <Mail className="w-4 h-4" />
  }
];

function Logo({ logo }: { logo?: NavbarProps['logo'] }) {
  const href = logo?.href || "/";
  
  return (
    <a href={href} className="flex items-center space-x-2">
      {logo?.src ? (
        <img src={logo.src} alt="Logo" className="h-8 w-auto" />
      ) : (
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">L</span>
        </div>
      )}
      {logo?.text && (
        <span className="font-bold text-xl">{logo.text}</span>
      )}
    </a>
  );
}

function MobileMenu({ 
  navigation, 
  user, 
  onLogin, 
  onLogout, 
  onProfileClick 
}: {
  navigation: NavItem[];
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <nav className="flex-1 space-y-2">
            {navigation.map((item) => (
              <div key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </a>
                {item.children && (
                  <div className="ml-6 space-y-1 mt-1">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="border-t pt-4">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <Avatar className="h-8 w-8">
                    {user.avatar && <AvatarImage src={user.avatar} />}
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onProfileClick?.();
                    setOpen(false);
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onLogout?.();
                    setOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={() => {
                  onLogin?.();
                  setOpen(false);
                }}
              >
                Se connecter
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function UserMenu({ 
  user, 
  onLogout, 
  onProfileClick 
}: { 
  user: User; 
  onLogout?: () => void; 
  onProfileClick?: () => void; 
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            {user.role && (
              <Badge variant="outline" className="w-fit text-xs">
                {user.role}
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onProfileClick}>
          <User className="mr-2 h-4 w-4" />
          <span>Profil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Paramètres</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar({
  variant = "default",
  logo,
  navigation = defaultNavigation,
  user,
  showSearch = true,
  showCart = false,
  cartCount = 0,
  showNotifications = false,
  notificationCount = 0,
  showCTA = true,
  ctaText = "Commencer",
  ctaVariant = "default",
  onCtaClick,
  className,
  sticky = true,
  transparent = false,
  theme = "light",
  onSearchClick,
  onCartClick,
  onNotificationClick,
  onLogin,
  onLogout,
  onProfileClick
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky navbar
  React.useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return "border-b bg-white/80 backdrop-blur-sm";
      case 'corporate':
        return "bg-slate-900 text-white border-b border-slate-800";
      case 'ecommerce':
        return "bg-white border-b shadow-sm";
      case 'dashboard':
        return "bg-gray-50 border-b border-gray-200";
      case 'landing':
        return transparent && !isScrolled 
          ? "bg-transparent" 
          : "bg-white/90 backdrop-blur-sm border-b";
      case 'blog':
        return "bg-white border-b";
      case 'app':
        return "bg-white border-b shadow-sm";
      default:
        return "bg-white border-b";
    }
  };

  const navbarClass = cn(
    "w-full transition-all duration-300",
    sticky && "sticky top-0 z-50",
    getVariantStyles(),
    isScrolled && sticky && "shadow-sm",
    className
  );

  if (variant === 'minimal') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo logo={logo} />
            
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.slice(0, 4).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <UserMenu 
                  user={user} 
                  onLogout={onLogout} 
                  onProfileClick={onProfileClick} 
                />
              ) : (
                <Button variant="ghost" onClick={onLogin}>
                  Se connecter
                </Button>
              )}
              
              <MobileMenu 
                navigation={navigation}
                user={user}
                onLogin={onLogin}
                onLogout={onLogout}
                onProfileClick={onProfileClick}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (variant === 'ecommerce') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Logo logo={logo} />
              
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  {navigation.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      {item.children ? (
                        <>
                          <NavigationMenuTrigger className="text-sm font-medium">
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="grid w-[400px] gap-3 p-4">
                              {item.children.map((child) => (
                                <NavigationMenuLink
                                  key={child.href}
                                  href={child.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {child.label}
                                  </div>
                                  {child.description && (
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {child.description}
                                    </p>
                                  )}
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink
                          href={item.href}
                          className="text-sm font-medium hover:text-blue-600 transition-colors"
                        >
                          {item.label}
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center space-x-4">
              {showSearch && (
                <Button variant="ghost" size="sm" onClick={onSearchClick}>
                  <Search className="h-4 w-4" />
                </Button>
              )}

              {showNotifications && (
                <Button variant="ghost" size="sm" onClick={onNotificationClick} className="relative">
                  <Bell className="h-4 w-4" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </Badge>
                  )}
                </Button>
              )}

              {showCart && (
                <Button variant="ghost" size="sm" onClick={onCartClick} className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                      {cartCount > 99 ? '99+' : cartCount}
                    </Badge>
                  )}
                </Button>
              )}

              {user ? (
                <UserMenu 
                  user={user} 
                  onLogout={onLogout} 
                  onProfileClick={onProfileClick} 
                />
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" onClick={onLogin}>
                    Se connecter
                  </Button>
                  {showCTA && (
                    <Button variant={ctaVariant} onClick={onCtaClick}>
                      {ctaText}
                    </Button>
                  )}
                </div>
              )}
              
              <MobileMenu 
                navigation={navigation}
                user={user}
                onLogin={onLogin}
                onLogout={onLogout}
                onProfileClick={onProfileClick}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Default variant
  return (
    <header className={navbarClass}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Logo logo={logo} />
            
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <div key={item.href} className="relative group">
                  <a
                    href={item.href}
                    className="flex items-center space-x-1 text-sm font-medium hover:text-blue-600 transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.children && <ChevronDown className="w-3 h-3" />}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                  
                  {item.children && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {showSearch && (
              <Button variant="ghost" size="sm" onClick={onSearchClick}>
                <Search className="h-4 w-4" />
              </Button>
            )}

            {showNotifications && (
              <Button variant="ghost" size="sm" onClick={onNotificationClick} className="relative">
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Badge>
                )}
              </Button>
            )}

            {showCart && (
              <Button variant="ghost" size="sm" onClick={onCartClick} className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                    {cartCount > 99 ? '99+' : cartCount}
                  </Badge>
                )}
              </Button>
            )}

            {user ? (
              <UserMenu 
                user={user} 
                onLogout={onLogout} 
                onProfileClick={onProfileClick} 
              />
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" onClick={onLogin}>
                  Se connecter
                </Button>
                {showCTA && (
                  <Button variant={ctaVariant} onClick={onCtaClick}>
                    {ctaText}
                  </Button>
                )}
              </div>
            )}
            
            <MobileMenu 
              navigation={navigation}
              user={user}
              onLogin={onLogin}
              onLogout={onLogout}
              onProfileClick={onProfileClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export type { NavbarProps, NavItem, User };
