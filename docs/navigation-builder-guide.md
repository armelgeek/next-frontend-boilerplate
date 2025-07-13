# 🧭 Navigation Builder - Guide d'Utilisation Pratique

## Vue d'ensemble

Le Navigation Builder vous permet de générer automatiquement des systèmes de navigation complexes avec permissions, responsive design, et templates prédéfinis.

## 🚀 Démarrage Rapide

### 1. Import de base

```typescript
import { NavigationGenerator } from '@/shared/lib/generators/navigation-generator';
```

### 2. Créer une navigation simple

```typescript
const navigationConfig = NavigationGenerator.createNavigationConfig(
  'Mon App',           // Titre
  'sidebar',          // Type: 'sidebar' | 'header' | 'tabs' | 'mobile'
  [                   // Items de navigation
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
      icon: 'Users'
    }
  ],
  {                   // Options (optionnel)
    collapsible: true,
    searchable: true
  }
);
```

## 📋 Exemples Pratiques par Cas d'Usage

### 1. Navigation Admin Complète

```typescript
// Configuration pour une interface d'administration
const adminNav = NavigationGenerator.createNavigationConfig(
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
      key: 'users',
      label: 'Utilisateurs',
      href: '/admin/users',
      icon: 'Users',
      badge: 'NEW',
      permissions: ['admin:users']
    }
  ],
  {
    collapsible: true,
    searchable: true,
    showBadges: true
  }
);
```

### 2. Header de Site E-commerce

```typescript
const ecommerceHeader = NavigationGenerator.createNavigationConfig(
  'MonShop',
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
      children: [
        {
          key: 'electronics',
          label: 'Électronique',
          href: '/products/electronics'
        },
        {
          key: 'clothing',
          label: 'Vêtements',
          href: '/products/clothing'
        }
      ]
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
);
```

### 3. Navigation Mobile avec Drawer

```typescript
const mobileNav = NavigationGenerator.createMobileNavigationConfig([
  {
    key: 'home',
    label: 'Accueil',
    href: '/',
    icon: 'Home'
  },
  {
    key: 'search',
    label: 'Recherche',
    href: '/search',
    icon: 'Search'
  },
  {
    key: 'favorites',
    label: 'Favoris',
    href: '/favorites',
    icon: 'Heart',
    badge: '12'
  },
  {
    key: 'profile',
    label: 'Profil',
    href: '/profile',
    icon: 'User'
  }
]);
```

## 🔐 Gestion des Permissions

### Filtrer la navigation selon les permissions utilisateur

```typescript
const userPermissions = ['read:products', 'write:orders', 'admin:users'];

const filteredNavigation = NavigationGenerator.filterNavigationByPermissions(
  navigationConfig.items,
  userPermissions
);

// Seuls les éléments autorisés seront affichés
```

### Permissions par item

```typescript
{
  key: 'admin-panel',
  label: 'Administration',
  href: '/admin',
  icon: 'Shield',
  permissions: ['admin:access', 'admin:users'] // L'utilisateur doit avoir ces permissions
}
```

## 🍞 Breadcrumbs Automatiques

### Génération de fil d'Ariane

```typescript
const pathname = '/admin/products/categories/electronics';

const breadcrumbs = NavigationGenerator.generateBreadcrumbs(pathname, {
  '/admin': 'Administration',
  '/admin/products': 'Produits',
  '/admin/products/categories': 'Catégories',
  '/admin/products/categories/electronics': 'Électronique'
});

// Résultat:
// [
//   { label: 'Administration', href: '/admin', isActive: false },
//   { label: 'Produits', href: '/admin/products', isActive: false },
//   { label: 'Catégories', href: '/admin/products/categories', isActive: false },
//   { label: 'Électronique', href: '/admin/products/categories/electronics', isActive: true }
// ]
```

## 🎯 Navigation Contextuelle

### Actions contextuelles sur une page

```typescript
const contextualActions = NavigationGenerator.createContextualNavigation(
  'Produit: iPhone 15 Pro',
  [
    {
      key: 'edit',
      label: 'Modifier',
      action: () => editProduct(),
      icon: 'Edit',
      variant: 'default'
    },
    {
      key: 'duplicate',
      label: 'Dupliquer',
      action: () => duplicateProduct(),
      icon: 'Copy',
      variant: 'outline'
    },
    {
      key: 'delete',
      label: 'Supprimer',
      action: () => deleteProduct(),
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
```

## 🎨 Templates Prédéfinis

### Utilisation des templates

```typescript
// Template pour administration
const adminTemplate = NavigationTemplates.AdminNavigationTemplate;

// Template pour e-commerce
const ecommerceTemplate = NavigationTemplates.EcommerceNavigationTemplate;

// Template pour blog
const blogTemplate = NavigationTemplates.BlogNavigationTemplate;

// Template pour app mobile
const mobileTemplate = NavigationTemplates.MobileNavigationTemplate;
```

### Personnalisation d'un template

```typescript
const customAdminNav = {
  ...NavigationTemplates.AdminNavigationTemplate,
  title: 'Mon Admin',
  items: [
    ...NavigationTemplates.AdminNavigationTemplate.items,
    {
      key: 'custom-feature',
      label: 'Ma Fonctionnalité',
      href: '/admin/custom',
      icon: 'Star'
    }
  ]
};
```

## 📱 Responsive Design

### Navigation adaptative

```typescript
const responsiveNav = NavigationGenerator.createResponsiveNavigation({
  desktop: 'sidebar',    // Sidebar sur desktop
  tablet: 'header',      // Header sur tablet
  mobile: 'bottom-tabs'  // Tabs en bas sur mobile
}, navigationItems);
```

## 🎭 Badges et Notifications

### Ajouter des badges

```typescript
{
  key: 'notifications',
  label: 'Notifications',
  href: '/notifications',
  icon: 'Bell',
  badge: '5',              // Nombre
  badgeVariant: 'destructive' // Style du badge
}

{
  key: 'new-feature',
  label: 'Nouvelle Fonctionnalité',
  href: '/new-feature',
  icon: 'Sparkles',
  badge: 'NEW',           // Texte
  badgeVariant: 'secondary'
}
```

## 🔍 Recherche dans la Navigation

### Navigation avec recherche

```typescript
const searchableNav = NavigationGenerator.createNavigationConfig(
  'Mon App',
  'sidebar',
  navigationItems,
  {
    searchable: true,
    searchPlaceholder: 'Rechercher...',
    searchKeys: ['label', 'description', 'keywords']
  }
);
```

## 🎛️ Configuration Avancée

### Options complètes

```typescript
const advancedConfig = NavigationGenerator.createNavigationConfig(
  'Mon App',
  'sidebar',
  navigationItems,
  {
    // Apparence
    collapsible: true,
    defaultCollapsed: false,
    
    // Recherche
    searchable: true,
    searchPlaceholder: 'Rechercher...',
    
    // Badges
    showBadges: true,
    
    // Groupes
    showGroups: true,
    
    // Animations
    animated: true,
    
    // Thème
    theme: 'auto', // 'light' | 'dark' | 'auto'
    
    // Persistance
    persistState: true,
    storageKey: 'nav-state'
  }
);
```

## 🔗 Intégration avec Next.js

### Hook pour la navigation active

```typescript
import { usePathname } from 'next/navigation';

function NavigationComponent({ config }) {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };
  
  return (
    <nav>
      {config.items.map(item => (
        <Link
          key={item.key}
          href={item.href}
          className={isActive(item.href) ? 'active' : ''}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
```

## 🚀 Mise en Pratique

### 1. Créer votre première navigation

```bash
# Dans votre composant
import { NavigationGenerator } from '@/shared/lib/generators/navigation-generator';

const myNav = NavigationGenerator.createNavigationConfig(
  'Mon App',
  'sidebar',
  [
    { key: 'home', label: 'Accueil', href: '/', icon: 'Home' }
  ]
);
```

### 2. Ajouter des permissions

```typescript
const navWithPermissions = NavigationGenerator.filterNavigationByPermissions(
  myNav.items,
  userPermissions
);
```

### 3. Générer des breadcrumbs

```typescript
const breadcrumbs = NavigationGenerator.generateBreadcrumbs(
  router.pathname,
  routeLabels
);
```

### 4. Utiliser dans votre layout

```tsx
export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar config={myNav} />
      <main className="flex-1">
        <Breadcrumbs items={breadcrumbs} />
        {children}
      </main>
    </div>
  );
}
```

## 💡 Conseils d'Utilisation

1. **Commencez simple** : Utilisez un template prédéfini et personnalisez progressivement
2. **Permissions** : Intégrez la gestion des permissions dès le début
3. **Responsive** : Testez votre navigation sur tous les écrans
4. **Performance** : Utilisez la recherche pour les grandes navigations
5. **UX** : Ajoutez des badges pour les notifications importantes
6. **Cohérence** : Utilisez les mêmes icônes et styles dans toute l'app

Ce guide vous donne toutes les clés pour utiliser efficacement le Navigation Builder et créer des systèmes de navigation professionnels ! 🎯
