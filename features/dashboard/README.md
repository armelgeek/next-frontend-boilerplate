# Dashboard Builder

Un système complet de création et de gestion de dashboards personnalisés pour Next.js avec TypeScript.

## 📋 Vue d'ensemble

Le Dashboard Builder permet aux utilisateurs de créer, personnaliser et gérer des dashboards interactifs avec un système de widgets modulaires. Il inclut :

- **Builder Interface** : Interface drag & drop pour créer des dashboards
- **Widget System** : Widgets réutilisables (stats, charts, lists, etc.)
- **Layout Management** : Gestion des layouts responsifs avec grille flexible
- **Data Integration** : Connexion avec des sources de données via API
- **Permission System** : Contrôle d'accès granulaire

## 🏗️ Architecture

```
features/dashboard/
├── dashboard.schema.ts          # Schemas Zod & types TypeScript
├── dashboard.service.ts         # Services API (dashboards, widgets)
├── dashboard.mock.ts           # Données de test
└── hooks/
    └── use-dashboard.ts        # Hooks React Query

shared/components/
├── dashboard/
│   └── index.ts               # Exports principaux
├── molecules/dashboard/
│   ├── dashboard-grid-simple.tsx    # Grille de widgets
│   ├── widget-renderer.tsx          # Rendu conditionnel des widgets
│   ├── stats-widget.tsx            # Widget statistiques
│   ├── chart-widget.tsx            # Widget graphiques (Recharts)
│   └── list-widget.tsx             # Widget listes
└── organisms/dashboard/
    ├── dashboard-builder.tsx        # Interface de création
    └── dashboard-viewer.tsx         # Affichage en lecture seule
```

## 🧩 Types de Widgets

### 1. Stats Widget
```typescript
{
  type: 'stats',
  config: {
    entity: 'users',
    metric: 'count', 
    aggregation: 'count'
  }
}
```

### 2. Chart Widget  
```typescript
{
  type: 'chart',
  config: {
    chartType: 'area' | 'bar' | 'line' | 'pie',
    entity: 'orders',
    dataKey: 'total_amount',
    xAxisKey: 'created_at'
  }
}
```

### 3. List Widget
```typescript
{
  type: 'list',
  config: {
    entity: 'orders',
    limit: 5,
    sortBy: 'created_at',
    sortOrder: 'desc'
  }
}
```

## 📊 Schema de Données

### DashboardLayout
```typescript
{
  id: string;
  name: string;
  description?: string;
  columns: number;                    // 1-4 colonnes
  widgetOrder: string[];             // Ordre des widgets
  widgets: WidgetConfig[];
  isDefault: boolean;
  isPublic: boolean;
  permissions?: {
    canEdit: string[];
    canView: string[];
  };
}
```

### WidgetConfig
```typescript
{
  id: string;
  type: 'stats' | 'chart' | 'list' | 'table' | 'metric' | 'progress' | 'calendar';
  title: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'extra-large';
  position: { x: number; y: number; w: number; h: number };
  config: {
    entity?: string;
    metric?: string;
    aggregation?: 'count' | 'sum' | 'avg' | 'min' | 'max';
    chartType?: 'area' | 'bar' | 'line' | 'pie';
    // ... autres configurations
  };
}
```

## 🚀 Utilisation

### 1. Dashboard Builder (Création)

```tsx
import { DashboardBuilder } from '@/shared/components/dashboard';

function CreateDashboard() {
  const handleSave = (layout: DashboardLayout) => {
    // Sauvegarder le dashboard
    console.log('Dashboard saved:', layout);
  };

  return (
    <DashboardBuilder
      initialLayout={existingLayout}
      onSave={handleSave}
      onCancel={() => router.back()}
    />
  );
}
```

### 2. Dashboard Viewer (Affichage)

```tsx
import { DashboardViewer } from '@/shared/components/dashboard';

function ViewDashboard({ dashboardId }: { dashboardId: string }) {
  return (
    <DashboardViewer
      dashboardId={dashboardId}
      isEditable={true}
      onEdit={() => router.push(`/dashboard/${dashboardId}/edit`)}
    />
  );
}
```

### 3. Dashboard Grid (Composant standalone)

```tsx
import { DashboardGrid } from '@/shared/components/dashboard';

function CustomDashboard() {
  return (
    <DashboardGrid
      layout={layout}
      widgets={widgets}
      widgetData={data}
      isLoading={loadingStates}
      errors={errors}
      isEditMode={false}
    />
  );
}
```

## 🎨 Personnalisation

### Templates de Widgets

Ajoutez des templates prédéfinis dans `dashboard-builder.tsx` :

```typescript
const WIDGET_TEMPLATES = [
  {
    id: 'custom-widget',
    type: 'stats',
    title: 'Mon Widget',
    description: 'Description du widget',
    icon: MyIcon,
    category: 'Custom',
    defaultConfig: {
      entity: 'my_entity',
      metric: 'my_metric'
    }
  }
];
```

### Nouveaux Types de Widgets

1. **Ajouter le type au schema** :
```typescript
// dashboard.schema.ts
export const WidgetTypeSchema = z.enum([
  'stats', 'chart', 'list',
  'my-new-widget' // ← Nouveau type
]);
```

2. **Créer le composant** :
```tsx
// my-new-widget.tsx
export function MyNewWidget({ config, data, isLoading }: WidgetProps) {
  return (
    <Card>
      <CardContent>
        {/* Logique du widget */}
      </CardContent>
    </Card>
  );
}
```

3. **Ajouter au renderer** :
```tsx
// widget-renderer.tsx
switch (config.type) {
  case 'my-new-widget':
    return <MyNewWidget {...props} />;
  // ... autres cases
}
```

## 🔌 Intégration API

### Services

Les services utilisent `BaseService` pour les appels API :

```typescript
// dashboard.service.ts
export const dashboardService = new BaseService(API_ENDPOINTS.dashboard);
export const widgetService = new BaseService(API_ENDPOINTS.widgets);
```

### Hooks React Query

```typescript
// Récupérer les dashboards
const { data: dashboards, isLoading } = useDashboards();

// Actions sur les dashboards  
const { createDashboard, updateDashboard, deleteDashboard } = useDashboardActions();

// Données des widgets
const { data: widgetData } = useWidgets(widgetIds);
```

## 📱 Responsive Design

Le système utilise Tailwind CSS pour la responsivité :

- **1 colonne** : `grid-cols-1`
- **2 colonnes** : `grid-cols-1 md:grid-cols-2`  
- **3 colonnes** : `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **4 colonnes** : `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

Les widgets s'adaptent automatiquement selon leur taille :
- `small`: `h-64`
- `medium`: `h-80` 
- `large`: `h-96`
- `wide`: `md:col-span-2`
- `extra-large`: `md:col-span-full`

## 🧪 Tests & Développement

### Page de Test

Une page de test est disponible : `/dashboard-test`

```tsx
// app/(root)/(others)/dashboard-test/page.tsx
export default function DashboardTestPage() {
  // Interface de test complète avec :
  // - Liste des dashboards
  // - Builder intégré
  // - Aperçus en temps réel
  // - Données mock
}
```

### Données Mock

```typescript
// dashboard.mock.ts
export const mockDashboards = [/* ... */];
export const mockWidgetData = {/* ... */};
export const mockLoadingStates = {/* ... */};
```

## 🔮 Roadmap

### ✅ Implémenté
- [x] Système de schémas Zod
- [x] Services API avec BaseService
- [x] Hooks React Query
- [x] Widgets de base (Stats, Chart, List)
- [x] Dashboard Builder UI
- [x] Dashboard Viewer
- [x] Grille responsive
- [x] Données mock pour les tests

### 🚧 En cours
- [ ] Drag & drop avancé (@hello-pangea/dnd)
- [ ] Widgets additionnels (Table, Progress, Calendar)
- [ ] Système de permissions
- [ ] Export/Import de dashboards

### 📋 À venir
- [ ] Templates de dashboards prédéfinis
- [ ] Intégration avec sources de données externes
- [ ] Dashboard public sharing
- [ ] Notifications en temps réel
- [ ] Dashboard analytics

## 🤝 Contribution

Pour ajouter de nouvelles fonctionnalités :

1. **Widgets** : Suivre le pattern des widgets existants
2. **Types** : Mettre à jour les schemas Zod
3. **Tests** : Utiliser la page de test pour valider
4. **Documentation** : Mettre à jour ce README

## 📚 Dépendances

- **React 19** : Framework principal
- **Next.js 15** : App router
- **TypeScript** : Typage statique
- **Zod** : Validation de schémas
- **React Query** : Gestion d'état serveur
- **Recharts** : Graphiques et visualisations
- **Tailwind CSS** : Styling utilitaire
- **Lucide Icons** : Icônes

## 🔗 Liens Utiles

- [Recharts Documentation](https://recharts.org/)
- [Zod Schema Validation](https://zod.dev/)
- [React Query Guide](https://tanstack.com/query/latest)
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
