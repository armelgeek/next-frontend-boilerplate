# 🛠️ Builders Studio - Guide Complet

Le **Builders Studio** est une interface centralisée qui regroupe tous les outils de génération automatique pour accélérer le développement de votre application Next.js.

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Builders Disponibles](#builders-disponibles)
3. [Utilisation](#utilisation)
4. [Workflow Recommandé](#workflow-recommandé)
5. [Intégration dans votre Projet](#intégration-dans-votre-projet)

## 🎯 Vue d'ensemble

Le Builders Studio propose **6 builders spécialisés** regroupés en 3 catégories :

### 🎨 **Design**
- **Theme Builder** - Création de thèmes complets avec palettes de couleurs

### 📐 **Layout** 
- **Navigation Builder** - Systèmes de navigation (sidebars, headers, breadcrumbs)
- **Layout Builder** - Layouts complexes avec grilles responsives

### ⚙️ **Système**
- **Form Builder** - Formulaires avec validation et étapes multiples
- **Notification System** - Gestion unifiée des notifications
- **Entity Generator** - Génération d'entités CRUD complètes

## 🛠️ Builders Disponibles

### 1. 🎨 **Theme Builder** ✅ Disponible

**Fonctionnalités :**
- Palette de couleurs harmoniques automatique
- Mode clair/sombre avec basculement
- Export CSS/Tailwind/JSON
- 4 templates prédéfinis (Modern, Nature, Luxury, Minimal)
- Aperçu en temps réel avec tous les composants UI

**Utilisation :**
```bash
# Accès direct
/theme-studio

# Via Builders Studio
/builders → Theme Builder
```

**Cas d'usage :**
- Personnalisation de l'identité visuelle
- Création de thèmes pour différents clients
- Test de variations colorimétriques
- Export pour équipes design/dev

---

### 2. 🧭 **Navigation Builder** 🔧 Bêta

**Fonctionnalités :**
- Sidebars responsive avec collapse
- Headers avec dropdowns utilisateur
- Breadcrumbs automatiques basés sur l'URL
- Gestion des permissions par rôles
- Templates admin/client/mobile

**Templates disponibles :**
- **Admin Dashboard** - Navigation complète pour interfaces d'administration
- **Client Portal** - Navigation orientée utilisateur final
- **Mobile First** - Navigation optimisée mobile avec drawer

**Structure générée :**
```typescript
NavigationGenerator.createNavigationConfig(
  'Administration',
  'sidebar',
  navigationItems,
  { collapsible: true, searchable: true }
)
```

---

### 3. 📝 **Form Builder** 🔧 Bêta

**Fonctionnalités :**
- Formulaires multi-étapes avec navigation
- Champs conditionnels basés sur d'autres valeurs
- Validation Zod intégrée avec messages personnalisés
- Auto-save et sauvegarde de brouillons
- Types de champs avancés (file, date, select, etc.)

**Templates disponibles :**
- **Contact** - Formulaire simple avec validation
- **Inscription Multi-étapes** - Processus d'onboarding complet
- **Questionnaire Dynamique** - Logique conditionnelle avancée

**Exemple de configuration :**
```typescript
const formConfig = {
  layout: 'steps',
  fields: [...],
  validation: zodSchema,
  steps: [
    { title: 'Infos générales', fields: [...] },
    { title: 'Détails', fields: [...] }
  ]
}
```

---

### 4. 🔔 **Notification System** 🔧 Bêta

**Fonctionnalités :**
- Types multiples : Toast, Modal, Banner, Inline
- Templates métier prédéfinis (CRUD, Auth, System)
- Actions personnalisées avec confirmations
- Auto-dismiss configurable
- Historique et persistence

**Types de notifications :**
- **Toast** - Notifications légères en overlay
- **Modal** - Dialogs avec actions (confirmations)
- **Banner** - Alertes persistantes (maintenance, mises à jour)

**Usage prévu :**
```typescript
// Templates métier
NotificationTemplates.crud.itemCreated('Produit');
NotificationTemplates.auth.sessionExpired();
NotificationTemplates.system.maintenance('2 heures');
```

---

### 5. 📐 **Layout Builder** 🔧 Bêta

**Fonctionnalités :**
- Grilles responsives avec breakpoints optimisés
- Layouts flexbox avec alignement avancé
- Sections hero, cards, formulaires automatiques
- Templates de pages complètes
- Animation et transitions intégrées

**Templates disponibles :**
- **Dashboard Layout** - Admin avec sidebar et header
- **E-commerce Layout** - Boutique avec filtres sidebar
- **Blog Layout** - Blog avec sidebar et contenu principal

**Structure générée :**
```typescript
LayoutGenerator.createDashboardLayout(
  'dashboard',
  sidebarComponent,
  headerComponent,
  contentComponent
)
```

---

### 6. ⚡ **Entity Generator** ✅ Disponible

**Fonctionnalités :**
- Pages CRUD complètes (List, Create, Edit, Detail)
- Hooks React Query optimisés avec cache
- Composants génériques réutilisables
- Recherche et filtres avancés
- Pagination automatique
- Mode mock/API switchable

**Structure générée :**
```
features/[entity]/
├── [entity].schema.ts     # Schéma Zod + types
├── [entity].service.ts    # Service API (BaseService)
├── [entity].mock.ts       # Service mock avec persistance
└── hooks/
    └── use-[entity].ts    # Hooks React Query

app/(root)/[entity]s/
├── page.tsx              # Liste avec recherche/filtres
├── create/page.tsx       # Création
└── [id]/
    ├── page.tsx          # Détail
    └── edit/page.tsx     # Édition
```

**Utilisation :**
```bash
npm run generate:entity
```

## 🚀 Utilisation

### Accès au Builders Studio

```typescript
// Page dédiée accessible via l'URL
/builders

// Ou intégration dans votre navigation
import BuildersPage from '@/app/(ui)/builders/page';
```

### Interface principale

1. **Vue d'ensemble** - Tous les builders avec statut et description
2. **Onglets par catégorie** - Design, Layout, Système
3. **Cartes détaillées** - Fonctionnalités et status de chaque builder
4. **Accès direct** - Bouton "Ouvrir" pour les builders disponibles

### Navigation dans un builder

1. **Header avec retour** - Retour vers la liste des builders
2. **Interface dédiée** - Chaque builder a sa propre interface
3. **Aperçus interactifs** - Démos et prévisualisations
4. **Actions d'export** - Génération de code ou de fichiers

## 📋 Workflow Recommandé

### 1. 🎨 **Phase Design (Début de projet)**
```
Theme Builder → Créer la palette de couleurs et l'identité visuelle
↓
Export CSS/Tailwind → Intégrer dans le projet
```

### 2. 📐 **Phase Structure (Architecture)**
```
Navigation Builder → Définir la navigation principale
↓
Layout Builder → Créer les layouts de pages
↓
Entity Generator → Générer les entités métier
```

### 3. 🔧 **Phase Fonctionnel (Développement)**
```
Form Builder → Créer les formulaires complexes
↓
Notification System → Standardiser les retours utilisateur
```

### 4. ⚡ **Phase Itération (Amélioration continue)**
```
Utiliser les builders pour :
- Ajouter de nouvelles entités
- Créer des variants de thèmes
- Optimiser les formulaires
- Étendre la navigation
```

## 🔧 Intégration dans votre Projet

### 1. **Ajouter la page Builders à votre navigation**

```typescript
// Dans votre navigation principale
{
  name: 'Builders Studio',
  href: '/builders',
  icon: '🛠️',
  description: 'Outils de génération automatique'
}
```

### 2. **Utiliser les composants générés**

```typescript
// Intégrer un thème généré
import { ThemeProvider } from '@/shared/components/theme';

// Utiliser une navigation générée
import { AdminNavigation } from '@/shared/components/navigation';

// Intégrer une entité générée
import { ProductList } from '@/features/product/components';
```

### 3. **Étendre les builders**

```typescript
// Ajouter vos propres templates
const customThemeTemplate = {
  name: 'brand-2024',
  colors: { /* ... */ },
  // ...
};

// Personnaliser les générateurs
const customEntityTemplate = {
  schema: customSchema,
  pages: customPages,
  // ...
};
```

## 📊 **Status des Builders**

| Builder | Status | Description |
|---------|--------|-------------|
| 🎨 Theme Builder | ✅ **Disponible** | Interface complète, prêt en production |
| ⚡ Entity Generator | ✅ **Disponible** | Script npm fonctionnel |
| 🧭 Navigation Builder | 🔧 **Bêta** | Générateur back-end terminé, UI en cours |
| 📝 Form Builder | 🔧 **Bêta** | Architecture définie, implémentation en cours |
| 🔔 Notification System | 🔧 **Bêta** | Système conçu, templates à implémenter |
| 📐 Layout Builder | 🔧 **Bêta** | Générateur créé, composants React à ajouter |

## 🎯 **Prochaines Étapes**

1. **Finaliser les builders Bêta** - Compléter les interfaces React
2. **Ajouter des templates** - Étendre les bibliothèques de templates
3. **Créer des workflows** - Chaîner les builders pour des tâches complexes
4. **Optimiser les exports** - Améliorer la qualité du code généré
5. **Ajouter des tests** - Validation automatique du code généré

---

**Le Builders Studio transforme le développement répétitif en génération automatique intelligente, vous permettant de vous concentrer sur la logique métier unique de votre application.** 🚀✨
