'use client';

import { z } from 'zod';
import { LucideIcon } from 'lucide-react';

// Types first to avoid circular reference
export type NavigationItem = {
  key: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
  permissions?: string[];
  active?: boolean;
  visible?: boolean;
};

// Schémas pour la génération de navigation
export const NavigationItemSchema: z.ZodType<NavigationItem> = z.object({
  key: z.string(),
  label: z.string(),
  href: z.string(),
  icon: z.string().optional(),
  badge: z.string().optional(),
  children: z.array(z.lazy(() => NavigationItemSchema)).optional(),
  permissions: z.array(z.string()).optional(),
  active: z.boolean().optional(),
  visible: z.boolean().optional(),
});

export const NavigationConfigSchema = z.object({
  title: z.string(),
  type: z.enum(['sidebar', 'header', 'tabs', 'breadcrumbs', 'dropdown']),
  variant: z.enum(['admin', 'client', 'mobile', 'desktop']).optional(),
  items: z.array(NavigationItemSchema),
  settings: z.object({
    collapsible: z.boolean().default(false),
    searchable: z.boolean().default(false),
    grouped: z.boolean().default(false),
    showBadges: z.boolean().default(true),
    showIcons: z.boolean().default(true),
  }).optional(),
});

export type NavigationConfig = z.infer<typeof NavigationConfigSchema>;

// Générateur de navigation automatique
export function createNavigationConfig(
  title: string,
  type: 'sidebar' | 'header' | 'tabs' | 'breadcrumbs' | 'dropdown',
  items: NavigationItem[],
  options?: Partial<NavigationConfig['settings']>
): NavigationConfig {
  return {
    title,
    type,
    items,
    settings: {
      collapsible: false,
      searchable: false,
      grouped: false,
      showBadges: true,
      showIcons: true,
      ...options,
    },
  };
}

// Template de navigation admin
export const AdminNavigationTemplate: NavigationConfig = {
  title: 'Administration',
  type: 'sidebar',
  variant: 'admin',
  items: [
    {
      key: 'dashboard',
      label: 'Dashboard',
      href: '/admin',
      icon: 'LayoutDashboard',
    },
    {
      key: 'users',
      label: 'Utilisateurs',
      href: '/admin/users',
      icon: 'Users',
      badge: 'NEW',
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
          href: '/admin/content/posts',
          icon: 'FileText',
        },
        {
          key: 'categories',
          label: 'Catégories',
          href: '/admin/content/categories',
          icon: 'Tag',
        },
      ],
    },
    {
      key: 'settings',
      label: 'Paramètres',
      href: '/admin/settings',
      icon: 'Settings',
      permissions: ['admin.settings'],
    },
  ],
  settings: {
    collapsible: true,
    searchable: true,
    grouped: true,
    showBadges: true,
    showIcons: true,
  },
};

// Template de navigation client
export const ClientNavigationTemplate: NavigationConfig = {
  title: 'Menu Principal',
  type: 'header',
  variant: 'client',
  items: [
    {
      key: 'home',
      label: 'Accueil',
      href: '/',
    },
    {
      key: 'products',
      label: 'Produits',
      href: '/products',
      children: [
        {
          key: 'electronics',
          label: 'Électronique',
          href: '/products/electronics',
        },
        {
          key: 'clothing',
          label: 'Vêtements',
          href: '/products/clothing',
        },
      ],
    },
    {
      key: 'about',
      label: 'À propos',
      href: '/about',
    },
    {
      key: 'contact',
      label: 'Contact',
      href: '/contact',
    },
  ],
  settings: {
    collapsible: false,
    searchable: false,
    grouped: false,
    showBadges: false,
    showIcons: false,
  },
};

// Générateur de breadcrumbs automatique
export function generateBreadcrumbs(pathname: string, config: Record<string, string>): NavigationItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: NavigationItem[] = [];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = config[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbs.push({
      key: segment,
      label,
      href: currentPath,
      active: index === segments.length - 1,
      visible: true,
    });
  });

  return breadcrumbs;
}

// Hook pour navigation active
export function useActiveNavigation(items: NavigationItem[], pathname: string): NavigationItem[] {
  return items.map(item => ({
    ...item,
    active: pathname === item.href || pathname.startsWith(`${item.href}/`),
    children: item.children ? useActiveNavigation(item.children, pathname) : undefined,
  }));
}

// Générateur de navigation par rôle
export function filterNavigationByPermissions(
  items: NavigationItem[],
  userPermissions: string[]
): NavigationItem[] {
  return items
    .filter(item => {
      if (!item.permissions) return true;
      return item.permissions.some((permission: string) => userPermissions.includes(permission));
    })
    .map(item => ({
      ...item,
      children: item.children ? filterNavigationByPermissions(item.children, userPermissions) : undefined,
    }));
}

export default {
  createNavigationConfig,
  generateBreadcrumbs,
  useActiveNavigation,
  filterNavigationByPermissions,
  AdminNavigationTemplate,
  ClientNavigationTemplate,
};
