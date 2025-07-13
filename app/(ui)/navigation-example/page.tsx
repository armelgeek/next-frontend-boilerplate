"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { 
  Sidebar, 
  HeaderNavigation, 
  Breadcrumbs, 
  NavigationHelpers,
  type NavigationConfig 
} from '@/shared/components/navigation/navigation-components';

// Exemple d'utilisation complète du Navigation Builder
export default function NavigationExamplePage() {
  const pathname = usePathname();

  // Permissions utilisateur simulées
  const userPermissions = ['read:dashboard', 'read:users', 'write:content', 'admin:settings'];

  // Configuration de la sidebar admin
  const adminSidebarConfig = NavigationHelpers.createAdminSidebar();

  // Configuration du header e-commerce
  const ecommerceHeaderConfig = NavigationHelpers.createEcommerceHeader();

  // Configuration de navigation personnalisée
  const customNavConfig: NavigationConfig = {
    title: 'Mon Projet',
    type: 'sidebar',
    items: [
      {
        key: 'dashboard',
        label: 'Tableau de Bord',
        href: '/dashboard',
        icon: 'LayoutDashboard',
        description: 'Vue d\'ensemble des données',
        keywords: ['stats', 'overview', 'résumé']
      },
      {
        key: 'projects',
        label: 'Projets',
        href: '/projects',
        icon: 'Package',
        badge: '12',
        children: [
          {
            key: 'active-projects',
            label: 'Projets Actifs',
            href: '/projects/active',
            badge: '8',
            badgeVariant: 'default'
          },
          {
            key: 'completed-projects',
            label: 'Projets Terminés',
            href: '/projects/completed',
            badge: '4',
            badgeVariant: 'secondary'
          }
        ]
      },
      {
        key: 'team',
        label: 'Équipe',
        href: '/team',
        icon: 'Users',
        permissions: ['read:users'],
        badge: 'NEW',
        badgeVariant: 'destructive'
      },
      {
        key: 'reports',
        label: 'Rapports',
        href: '/reports',
        icon: 'BarChart3',
        permissions: ['read:reports']
      },
      {
        key: 'settings',
        label: 'Paramètres',
        href: '/settings',
        icon: 'Settings',
        permissions: ['admin:settings']
      }
    ],
    options: {
      collapsible: true,
      searchable: true,
      showBadges: true,
      searchPlaceholder: 'Rechercher dans le menu...'
    }
  };

  // Breadcrumbs pour différentes routes
  const routeLabels = {
    '/dashboard': 'Tableau de Bord',
    '/projects': 'Projets',
    '/projects/active': 'Projets Actifs',
    '/projects/completed': 'Projets Terminés',
    '/projects/new': 'Nouveau Projet',
    '/team': 'Équipe',
    '/team/members': 'Membres',
    '/team/roles': 'Rôles',
    '/reports': 'Rapports',
    '/reports/analytics': 'Analytics',
    '/settings': 'Paramètres',
    '/settings/profile': 'Profil',
    '/settings/notifications': 'Notifications'
  };

  const breadcrumbs = NavigationHelpers.generateBreadcrumbs(pathname, routeLabels);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Navigation Builder - Exemples</h1>
          <p className="text-muted-foreground">
            Découvrez les différents types de navigation générés automatiquement
          </p>
        </div>

        {/* Breadcrumbs Example */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Breadcrumbs Automatiques</h2>
          <div className="p-4 border rounded-lg bg-muted/20">
            <p className="text-sm text-muted-foreground mb-2">
              Route actuelle: <code className="bg-muted px-2 py-1 rounded">{pathname}</code>
            </p>
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Navigation Layouts */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Sidebar Admin */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Sidebar Administration</h2>
            <div className="h-96 border rounded-lg overflow-hidden">
              <Sidebar 
                config={customNavConfig} 
                userPermissions={userPermissions}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              ✅ Recherche intégrée<br/>
              ✅ Navigation collapsible<br/>
              ✅ Badges de notification<br/>
              ✅ Gestion des permissions<br/>
              ✅ Items avec sous-menus
            </div>
          </section>

          {/* Header E-commerce */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Header E-commerce</h2>
            <div className="border rounded-lg overflow-hidden">
              <HeaderNavigation 
                config={ecommerceHeaderConfig}
                userPermissions={userPermissions}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              ✅ Responsive (mobile menu)<br/>
              ✅ Badges pour panier<br/>
              ✅ Icônes intégrées<br/>
              ✅ Layout horizontal
            </div>
          </section>
        </div>

        {/* Configuration Examples */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Exemples de Configuration</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {/* Configuration Sidebar */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Configuration Sidebar</h3>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`const sidebarConfig = {
  title: 'Mon Projet',
  type: 'sidebar',
  items: [
    {
      key: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
      icon: 'LayoutDashboard',
      badge: 'NEW'
    },
    {
      key: 'projects',
      label: 'Projets',
      href: '/projects',
      icon: 'Package',
      children: [
        {
          key: 'active',
          label: 'Actifs',
          href: '/projects/active'
        }
      ]
    }
  ],
  options: {
    collapsible: true,
    searchable: true
  }
};`}
              </pre>
            </div>

            {/* Configuration Header */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Configuration Header</h3>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`const headerConfig = {
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
      key: 'cart',
      label: 'Panier',
      href: '/cart',
      icon: 'ShoppingCart',
      badge: '3'
    }
  ]
};`}
              </pre>
            </div>
          </div>
        </section>

        {/* Permission Example */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Gestion des Permissions</h2>
          <div className="p-4 border rounded-lg bg-blue-50/50">
            <p className="text-sm mb-3">
              <strong>Permissions utilisateur actuelles:</strong> 
              <code className="ml-2 bg-blue-100 px-2 py-1 rounded text-xs">
                {userPermissions.join(', ')}
              </code>
            </p>
            <p className="text-sm text-muted-foreground">
              Les éléments de navigation sont automatiquement filtrés selon les permissions de l'utilisateur.
              Certains items peuvent être masqués si vous n'avez pas les permissions requises.
            </p>
          </div>
        </section>

        {/* Features List */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Fonctionnalités Disponibles</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-green-700 mb-2">🎯 Navigation</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Sidebar collapsible</li>
                <li>• Header responsive</li>
                <li>• Navigation mobile</li>
                <li>• Breadcrumbs automatiques</li>
                <li>• Items avec sous-menus</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">🔐 Sécurité</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Gestion des permissions</li>
                <li>• Filtrage automatique</li>
                <li>• Navigation conditionnelle</li>
                <li>• Contrôle d'accès</li>
                <li>• Rôles utilisateur</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-purple-700 mb-2">✨ UX/UI</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Badges de notification</li>
                <li>• Icônes automatiques</li>
                <li>• Recherche intégrée</li>
                <li>• Animations fluides</li>
                <li>• Thème adaptatif</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Integration Guide */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Guide d'Intégration Rapide</h2>
          <div className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                <span>
                  <strong>Import :</strong> 
                  <code className="ml-2 bg-white px-2 py-1 rounded text-xs">
                    import &#123; Sidebar &#125; from '@/shared/components/navigation/navigation-components';
                  </code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                <span>
                  <strong>Configuration :</strong> Créez votre config navigation avec items, icônes et permissions
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                <span>
                  <strong>Utilisation :</strong> 
                  <code className="ml-2 bg-white px-2 py-1 rounded text-xs">
                    &lt;Sidebar config=&#123;navConfig&#125; userPermissions=&#123;permissions&#125; /&gt;
                  </code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
                <span>
                  <strong>Personnalisation :</strong> Adaptez les styles, ajoutez des badges et gérez les permissions
                </span>
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
