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
  variant?: 
    // Variants classiques (8 existants)
    | "default" | "minimal" | "corporate" | "ecommerce" | "dashboard" | "landing" | "blog" | "app"
    // Nouveaux variants avancés (25 nouveaux)
    | "glassmorphism" | "sidebar" | "mega-menu" | "floating" | "split" | "centered" | "gradient"
    | "dark" | "neon" | "retro" | "brutalist" | "magazine" | "portfolio" | "agency" | "startup"
    | "saas" | "mobile-first" | "sticky-tabs" | "breadcrumb" | "notification-bar" | "social"
    | "restaurant" | "travel" | "medical" | "education" | "finance" | "gaming";
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
      
      // Nouveaux variants avancés
      case 'glassmorphism':
        return "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl";
      case 'floating':
        return "bg-white rounded-full shadow-lg border mx-4 mt-4";
      case 'gradient':
        return "bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white";
      case 'dark':
        return "bg-black text-white border-b border-gray-800";
      case 'neon':
        return "bg-black text-green-400 border-b-2 border-green-400 shadow-lg shadow-green-400/20";
      case 'retro':
        return "bg-orange-100 border-b-4 border-orange-800 text-orange-900";
      case 'brutalist':
        return "bg-yellow-300 border-b-8 border-black text-black font-black";
      case 'magazine':
        return "bg-white border-b-2 border-red-600";
      case 'portfolio':
        return "bg-gray-900 text-white border-b border-gray-700";
      case 'agency':
        return "bg-white shadow-xl border-0";
      case 'startup':
        return "bg-gradient-to-r from-indigo-500 to-purple-600 text-white";
      case 'saas':
        return "bg-white border-b shadow-sm";
      case 'mobile-first':
        return "bg-white border-b md:bg-gray-50";
      case 'sticky-tabs':
        return "bg-white border-b-0 shadow-md";
      case 'notification-bar':
        return "bg-blue-600 text-white";
      case 'social':
        return "bg-gradient-to-r from-pink-500 to-purple-600 text-white";
      case 'restaurant':
        return "bg-amber-50 border-b-2 border-amber-800 text-amber-900";
      case 'travel':
        return "bg-sky-100 border-b-2 border-sky-600 text-sky-900";
      case 'medical':
        return "bg-green-50 border-b-2 border-green-600 text-green-900";
      case 'education':
        return "bg-blue-50 border-b-2 border-blue-600 text-blue-900";
      case 'finance':
        return "bg-emerald-900 text-white border-b border-emerald-700";
      case 'gaming':
        return "bg-purple-900 text-purple-100 border-b-2 border-purple-400";
      
      default:
        return "bg-white border-b";
    }
  };

  const navbarClass = cn(
    "w-full transition-all py-2 duration-300",
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

  // Glassmorphism variant
  if (variant === 'glassmorphism') {
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
                  className="text-sm font-medium text-white hover:text-white/80 transition-colors backdrop-blur-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30" onClick={onLogin}>
                  Se connecter
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Floating variant
  if (variant === 'floating') {
    return (
      <header className={navbarClass}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between h-16 px-8">
            <Logo logo={logo} />
            
            <nav className="hidden md:flex items-center space-x-6">
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
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <Button variant="default" onClick={onLogin}>
                  Se connecter
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Gradient variant
  if (variant === 'gradient') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo logo={logo} />
            
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.slice(0, 5).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-white hover:text-white/80 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {showSearch && (
                <Button variant="ghost" size="sm" onClick={onSearchClick} className="text-white hover:bg-white/20">
                  <Search className="h-4 w-4" />
                </Button>
              )}
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" onClick={onLogin}>
                  Se connecter
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Dark variant
  if (variant === 'dark') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo logo={logo} />
            
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-white hover:text-gray-300 transition-colors flex items-center space-x-1"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {showSearch && (
                <Button variant="ghost" size="sm" onClick={onSearchClick} className="text-white hover:bg-gray-800">
                  <Search className="h-4 w-4" />
                </Button>
              )}
              {showNotifications && (
                <Button variant="ghost" size="sm" onClick={onNotificationClick} className="relative text-white hover:bg-gray-800">
                  <Bell className="h-4 w-4" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-red-500">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              )}
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800" onClick={onLogin}>
                  Se connecter
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Neon variant
  if (variant === 'neon') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center animate-pulse">
                <span className="text-black font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-xl text-green-400">{logo?.text || "NEON"}</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.slice(0, 4).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-green-400 hover:text-green-300 transition-colors border border-green-400 px-3 py-1 rounded hover:shadow-lg hover:shadow-green-400/50"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <Button className="bg-green-400 text-black hover:bg-green-300 font-bold" onClick={onLogin}>
                  CONNECT
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Retro variant
  if (variant === 'retro') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-800 rounded-full flex items-center justify-center">
                <span className="text-orange-100 font-bold text-lg">R</span>
              </div>
              <span className="font-black text-2xl text-orange-900">{logo?.text || "RETRO"}</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.slice(0, 4).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-black text-orange-800 hover:text-orange-600 transition-colors border-b-4 border-transparent hover:border-orange-800 pb-1"
                >
                  {item.label.toUpperCase()}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <Button className="bg-orange-800 text-orange-100 hover:bg-orange-700 font-black text-lg px-6 py-3 rounded-none border-4 border-orange-900" onClick={onLogin}>
                  LOGIN
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Brutalist variant
  if (variant === 'brutalist') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center">
                <span className="text-yellow-300 font-black text-2xl">B</span>
              </div>
              <span className="font-black text-3xl text-black">{logo?.text || "BRUTAL"}</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-2">
              {navigation.slice(0, 4).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xl font-black text-black hover:text-white hover:bg-black transition-all border-4 border-black px-4 py-2 bg-yellow-300"
                >
                  {item.label.toUpperCase()}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <Button className="bg-black text-yellow-300 hover:bg-yellow-300 hover:text-black font-black text-xl px-8 py-4 rounded-none border-4 border-black" onClick={onLogin}>
                  LOGIN!
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Magazine variant
  if (variant === 'magazine') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-black text-red-600">{logo?.text || "MAGAZINE"}</div>
              <div className="text-xs text-gray-500 hidden md:block">
                {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors uppercase tracking-wide"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onSearchClick}>
                <Search className="h-4 w-4" />
              </Button>
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white" onClick={onLogin}>
                  S'abonner
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Agency variant
  if (variant === 'agency') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Logo logo={logo} />
            
            <nav className="hidden lg:flex items-center space-x-12">
              {navigation.slice(0, 5).map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              {showCTA && (
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full" onClick={onCtaClick}>
                  {ctaText}
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // SaaS variant
  if (variant === 'saas') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Logo logo={logo} />
              
              <nav className="hidden lg:flex items-center space-x-8">
                {navigation.slice(0, 4).map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <a href="/pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Tarifs
                </a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {showSearch && (
                <Button variant="ghost" size="sm" onClick={onSearchClick}>
                  <Search className="h-4 w-4" />
                </Button>
              )}
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" onClick={onLogin}>
                    Se connecter
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onCtaClick}>
                    Essai gratuit
                  </Button>
                </div>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Restaurant variant
  if (variant === 'restaurant') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center">
                <Utensils className="w-6 h-6 text-amber-100" />
              </div>
              <div>
                <div className="font-bold text-xl text-amber-900">{logo?.text || "Restaurant"}</div>
                <div className="text-xs text-amber-700">Cuisine authentique</div>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/menu" className="text-sm font-medium text-amber-800 hover:text-amber-600 transition-colors flex items-center space-x-1">
                <Utensils className="w-4 h-4" />
                <span>Menu</span>
              </a>
              <a href="/reservations" className="text-sm font-medium text-amber-800 hover:text-amber-600 transition-colors flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Réservations</span>
              </a>
              <a href="/about" className="text-sm font-medium text-amber-800 hover:text-amber-600 transition-colors">
                À propos
              </a>
              <a href="/contact" className="text-sm font-medium text-amber-800 hover:text-amber-600 transition-colors flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-amber-800">
                <Phone className="w-4 h-4" />
                <span>01 23 45 67 89</span>
              </div>
              <Button className="bg-amber-800 hover:bg-amber-700 text-amber-100">
                Réserver
              </Button>
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Travel variant
  if (variant === 'travel') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-sky-900">{logo?.text || "TravelCorp"}</span>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/destinations" className="text-sm font-medium text-sky-800 hover:text-sky-600 transition-colors flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>Destinations</span>
              </a>
              <a href="/hotels" className="text-sm font-medium text-sky-800 hover:text-sky-600 transition-colors flex items-center space-x-1">
                <Building className="w-4 h-4" />
                <span>Hôtels</span>
              </a>
              <a href="/flights" className="text-sm font-medium text-sky-800 hover:text-sky-600 transition-colors flex items-center space-x-1">
                <Plane className="w-4 h-4" />
                <span>Vols</span>
              </a>
              <a href="/packages" className="text-sm font-medium text-sky-800 hover:text-sky-600 transition-colors">
                Packages
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onSearchClick}>
                <Search className="h-4 w-4" />
              </Button>
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <Button className="bg-sky-600 hover:bg-sky-700 text-white" onClick={onLogin}>
                  Mon compte
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Medical variant
  if (variant === 'medical') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-green-900">{logo?.text || "MediCare"}</div>
                <div className="text-xs text-green-700">Votre santé, notre priorité</div>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/services" className="text-sm font-medium text-green-800 hover:text-green-600 transition-colors">
                Services
              </a>
              <a href="/doctors" className="text-sm font-medium text-green-800 hover:text-green-600 transition-colors flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Médecins</span>
              </a>
              <a href="/appointments" className="text-sm font-medium text-green-800 hover:text-green-600 transition-colors flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>RDV</span>
              </a>
              <a href="/emergency" className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                Urgences
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-green-800">
                <Phone className="w-4 h-4" />
                <span>15 (Urgences)</span>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Prendre RDV
              </Button>
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Education variant
  if (variant === 'education') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-blue-900">{logo?.text || "EduPlatform"}</div>
                <div className="text-xs text-blue-700">Apprendre sans limites</div>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/courses" className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors flex items-center space-x-1">
                <GraduationCap className="w-4 h-4" />
                <span>Cours</span>
              </a>
              <a href="/teachers" className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Professeurs</span>
              </a>
              <a href="/library" className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>Bibliothèque</span>
              </a>
              <a href="/support" className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors flex items-center space-x-1">
                <HelpCircle className="w-4 h-4" />
                <span>Support</span>
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onSearchClick}>
                <Search className="h-4 w-4" />
              </Button>
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" onClick={onLogin}>
                    Se connecter
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    S'inscrire
                  </Button>
                </div>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Finance variant
  if (variant === 'finance') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-400 rounded-sm flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-900" />
              </div>
              <span className="font-bold text-xl text-white">{logo?.text || "FinanceCorpᵗᵐ"}</span>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/investment" className="text-sm font-medium text-emerald-100 hover:text-white transition-colors">
                Investissement
              </a>
              <a href="/banking" className="text-sm font-medium text-emerald-100 hover:text-white transition-colors">
                Banque
              </a>
              <a href="/insurance" className="text-sm font-medium text-emerald-100 hover:text-white transition-colors">
                Assurance
              </a>
              <a href="/consulting" className="text-sm font-medium text-emerald-100 hover:text-white transition-colors">
                Conseil
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 text-sm text-emerald-100">
                <div className="flex items-center space-x-1">
                  <span>CAC 40:</span>
                  <span className="text-green-400 font-semibold">+2.3%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>USD/EUR:</span>
                  <span className="text-emerald-200 font-semibold">0.85</span>
                </div>
              </div>
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <Button variant="outline" className="border-emerald-400 text-emerald-100 hover:bg-emerald-400 hover:text-emerald-900" onClick={onLogin}>
                  Espace client
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Gaming variant
  if (variant === 'gaming') {
    return (
      <header className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center animate-pulse">
                <Zap className="w-5 h-5 text-purple-900" />
              </div>
              <span className="font-black text-xl text-purple-100 tracking-wider">{logo?.text || "GAMEVERSE"}</span>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-6">
              <a href="/games" className="text-sm font-medium text-purple-200 hover:text-purple-100 transition-colors border border-purple-400 px-3 py-1 rounded-full hover:bg-purple-400/20">
                GAMES
              </a>
              <a href="/esports" className="text-sm font-medium text-purple-200 hover:text-purple-100 transition-colors border border-purple-400 px-3 py-1 rounded-full hover:bg-purple-400/20">
                ESPORTS
              </a>
              <a href="/community" className="text-sm font-medium text-purple-200 hover:text-purple-100 transition-colors border border-purple-400 px-3 py-1 rounded-full hover:bg-purple-400/20">
                COMMUNITY
              </a>
              <a href="/store" className="text-sm font-medium text-purple-200 hover:text-purple-100 transition-colors border border-purple-400 px-3 py-1 rounded-full hover:bg-purple-400/20">
                STORE
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-purple-200">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>1,247 online</span>
              </div>
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-purple-200">
                    <div>Level 42</div>
                    <div className="text-yellow-400">★★★★☆</div>
                  </div>
                  <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
                </div>
              ) : (
                <Button className="bg-purple-400 hover:bg-purple-300 text-purple-900 font-bold" onClick={onLogin}>
                  JOIN GAME
                </Button>
              )}
              <MobileMenu navigation={navigation} user={user} onLogin={onLogin} onLogout={onLogout} onProfileClick={onProfileClick} />
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
