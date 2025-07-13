"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { 
  Sidebar, 
  HeaderNavigation, 
  Breadcrumbs, 
  NavigationHelpers 
} from '@/shared/components/navigation/navigation-components';

// Layout avec navigation complète
export function NavigationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Configuration de navigation
  const mainNavConfig = NavigationHelpers.createAdminSidebar();
  
  // Permissions utilisateur (simulées)
  const userPermissions = ['read:dashboard', 'read:users', 'write:content'];
  
  // Labels pour les breadcrumbs
  const routeLabels = {
    '/admin': 'Administration',
    '/admin/users': 'Utilisateurs',
    '/admin/content': 'Contenu',
    '/admin/content/posts': 'Articles',
    '/admin/analytics': 'Analytics',
    '/admin/settings': 'Paramètres'
  };
  
  const breadcrumbs = NavigationHelpers.generateBreadcrumbs(pathname, routeLabels);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        config={mainNavConfig}
        userPermissions={userPermissions}
        className="flex-shrink-0"
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header avec breadcrumbs */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-6 py-4">
            <Breadcrumbs items={breadcrumbs} />
            
            {/* Actions header (profil, notifications, etc.) */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Admin User</span>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// Layout avec header (e-commerce)
export function EcommerceNavigationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const headerConfig = NavigationHelpers.createEcommerceHeader();
  const userPermissions: string[] = [];
  
  const routeLabels = {
    '/': 'Accueil',
    '/products': 'Produits',
    '/products/electronics': 'Électronique',
    '/cart': 'Panier',
    '/checkout': 'Commande'
  };
  
  const breadcrumbs = NavigationHelpers.generateBreadcrumbs(pathname, routeLabels);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <HeaderNavigation 
        config={headerConfig}
        userPermissions={userPermissions}
      />
      
      {/* Breadcrumbs */}
      {pathname !== '/' && (
        <div className="border-b bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}

// Hook pour utiliser la navigation dans un composant
export function useNavigation() {
  const pathname = usePathname();
  
  const generateBreadcrumbs = (routeLabels: Record<string, string>) => {
    return NavigationHelpers.generateBreadcrumbs(pathname, routeLabels);
  };
  
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };
  
  return {
    pathname,
    generateBreadcrumbs,
    isActive
  };
}
