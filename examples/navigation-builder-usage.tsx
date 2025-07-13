"use client";

import React from 'react';
import { NavigationGenerator, NavigationTemplates } from '@/shared/lib/generators/navigation-generator';

// Exemple 1: Navigation Admin Simple
export function AdminNavigationExample() {
  // Configuration de la navigation admin
  const adminNavConfig = NavigationGenerator.createNavigationConfig(
    'Administration',
    'sidebar',
    [
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
        key: 'products',
        label: 'Produits',
        href: '/admin/products',
        icon: 'Package',
        children: [
          {
            key: 'products-list',
            label: 'Liste des produits',
            href: '/admin/products'
          },
          {
            key: 'categories',
            label: 'Catégories',
            href: '/admin/products/categories'
          },
          {
            key: 'inventory',
            label: 'Inventaire',
            href: '/admin/products/inventory'
          }
        ]
      },
      {
        key: 'orders',
        label: 'Commandes',
        href: '/admin/orders',
        icon: 'ShoppingCart',
        badge: '12',
        badgeVariant: 'destructive'
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
    {
      collapsible: true,
      searchable: true,
      showBadges: true
    }
  );

  return (
    <div className="w-64 h-screen bg-background border-r">
      {/* Le composant de navigation sera généré automatiquement */}
      <pre className="p-4 text-xs">
        {JSON.stringify(adminNavConfig, null, 2)}
      </pre>
    </div>
  );
}

// Exemple 2: Navigation Client avec Permissions
export function ClientNavigationExample() {
  const userPermissions = ['read:products', 'read:orders', 'write:profile'];

  const clientNavConfig = NavigationGenerator.createNavigationConfig(
    'Mon Compte',
    'header',
    [
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
        icon: 'Package',
        permissions: ['read:products']
      },
      {
        key: 'orders',
        label: 'Mes Commandes',
        href: '/orders',
        icon: 'ShoppingCart',
        permissions: ['read:orders']
      },
      {
        key: 'profile',
        label: 'Mon Profil',
        href: '/profile',
        icon: 'User',
        children: [
          {
            key: 'profile-edit',
            label: 'Modifier le profil',
            href: '/profile/edit',
            permissions: ['write:profile']
          },
          {
            key: 'profile-security',
            label: 'Sécurité',
            href: '/profile/security'
          }
        ]
      }
    ]
  );

  // Filtrer la navigation selon les permissions
  const filteredNav = NavigationGenerator.filterNavigationByPermissions(
    clientNavConfig.items,
    userPermissions
  );

  return (
    <nav className="bg-background border-b p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">Mon App</h1>
        <div className="flex gap-4">
          {filteredNav.map(item => (
            <a key={item.key} href={item.href} className="hover:text-primary">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Exemple 3: Breadcrumbs Automatiques
export function BreadcrumbsExample() {
  const pathname = '/admin/products/categories/electronics';

  const breadcrumbs = NavigationGenerator.generateBreadcrumbs(pathname, {
    '/admin': 'Administration',
    '/admin/products': 'Produits',
    '/admin/products/categories': 'Catégories',
    '/admin/products/categories/electronics': 'Électronique'
  });

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.href}>
          {index > 0 && <span>/</span>}
          <a
            href={crumb.href}
            className={`hover:text-foreground ${
              crumb.isActive ? 'text-foreground font-medium' : ''
            }`}
          >
            {crumb.label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
}

// Exemple 4: Navigation Mobile avec Drawer
export function MobileNavigationExample() {
  const [isOpen, setIsOpen] = React.useState(false);

  const mobileNavConfig = NavigationGenerator.createMobileNavigationConfig([
    {
      key: 'home',
      label: 'Accueil',
      href: '/',
      icon: 'Home'
    },
    {
      key: 'catalog',
      label: 'Catalogue',
      href: '/catalog',
      icon: 'Grid3x3'
    },
    {
      key: 'cart',
      label: 'Panier',
      href: '/cart',
      icon: 'ShoppingCart',
      badge: '3'
    },
    {
      key: 'account',
      label: 'Compte',
      href: '/account',
      icon: 'User'
    }
  ]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-primary text-primary-foreground"
      >
        Menu
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-background border-r p-4">
            {/* Contenu de navigation mobile */}
            <pre className="text-xs">
              {JSON.stringify(mobileNavConfig, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

// Exemple 5: Navigation avec Templates Prédéfinis
export function TemplateNavigationExample() {
  // Template e-commerce
  const ecommerceNav = NavigationTemplates.ecommerce;
  
  // Template dashboard admin
  const dashboardNav = NavigationTemplates.dashboard;
  
  // Template blog
  const blogNav = NavigationTemplates.blog;

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold mb-4">Navigation E-commerce</h3>
        <div className="bg-muted p-4 rounded-lg">
          <pre className="text-xs">{JSON.stringify(ecommerceNav, null, 2)}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Navigation Dashboard</h3>
        <div className="bg-muted p-4 rounded-lg">
          <pre className="text-xs">{JSON.stringify(dashboardNav, null, 2)}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Navigation Blog</h3>
        <div className="bg-muted p-4 rounded-lg">
          <pre className="text-xs">{JSON.stringify(blogNav, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
}

// Exemple 6: Navigation Contextuelle avec Actions
export function ContextualNavigationExample() {
  const contextualConfig = NavigationGenerator.createContextualNavigation(
    'Produit: iPhone 15',
    [
      {
        key: 'edit',
        label: 'Modifier',
        action: () => console.log('Modifier le produit'),
        icon: 'Edit',
        variant: 'default'
      },
      {
        key: 'duplicate',
        label: 'Dupliquer',
        action: () => console.log('Dupliquer le produit'),
        icon: 'Copy',
        variant: 'outline'
      },
      {
        key: 'delete',
        label: 'Supprimer',
        action: () => console.log('Supprimer le produit'),
        icon: 'Trash2',
        variant: 'destructive',
        confirmation: {
          title: 'Supprimer le produit',
          description: 'Cette action est irréversible.',
          confirmText: 'Supprimer',
          cancelText: 'Annuler'
        }
      }
    ]
  );

  return (
    <div className="flex items-center justify-between p-4 bg-background border-b">
      <h1 className="text-xl font-semibold">{contextualConfig.title}</h1>
      <div className="flex gap-2">
        {contextualConfig.actions.map(action => (
          <button
            key={action.key}
            onClick={action.action}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              action.variant === 'destructive'
                ? 'bg-destructive text-destructive-foreground'
                : action.variant === 'outline'
                ? 'border border-input bg-background'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Exemple d'utilisation complète dans une page
export function CompleteNavigationExample() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header avec navigation principale */}
      <ClientNavigationExample />
      
      {/* Breadcrumbs */}
      <div className="border-b px-4 py-2">
        <BreadcrumbsExample />
      </div>
      
      {/* Layout avec sidebar admin */}
      <div className="flex">
        <AdminNavigationExample />
        
        <main className="flex-1 p-6">
          {/* Navigation contextuelle */}
          <ContextualNavigationExample />
          
          {/* Contenu principal */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Contenu Principal</h2>
            <p>Votre contenu ici...</p>
          </div>
        </main>
      </div>
      
      {/* Navigation mobile */}
      <MobileNavigationExample />
    </div>
  );
}
