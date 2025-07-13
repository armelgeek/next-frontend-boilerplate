'use client';

import type { DashboardLayout, WidgetConfig } from '@/features/dashboard/dashboard.schema';

export const mockDashboards: DashboardLayout[] = [
  {
    id: 'dashboard-1',
    name: 'Dashboard Commercial',
    description: 'Vue d\'ensemble des performances commerciales',
    isDefault: true,
    isPublic: false,
    columns: 3,
    widgets: [
      {
        id: 'widget-1',
        type: 'stats',
        title: 'Chiffre d\'affaires mensuel',
        description: 'Total des ventes ce mois',
        size: 'medium',
        position: { x: 0, y: 0, w: 2, h: 1 },
        config: {
          entity: 'orders',
          metric: 'total_amount',
          aggregation: 'sum',
          refreshInterval: 300
        }
      },
      {
        id: 'widget-2',
        type: 'stats',
        title: 'Nouveaux clients',
        description: 'Clients inscrits ce mois',
        size: 'medium',
        position: { x: 2, y: 0, w: 2, h: 1 },
        config: {
          entity: 'users',
          aggregation: 'count',
          filters: {
            created_at: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
            }
          }
        }
      },
      {
        id: 'widget-3',
        type: 'chart',
        title: 'Évolution des ventes',
        description: 'Graphique des ventes sur 30 jours',
        size: 'large',
        position: { x: 0, y: 1, w: 4, h: 2 },
        config: {
          chartType: 'area',
          entity: 'orders',
          dataKey: 'total_amount',
          xAxisKey: 'created_at',
          color: '#8884d8'
        }
      },
      {
        id: 'widget-4',
        type: 'list',
        title: 'Dernières commandes',
        description: 'Les 5 dernières commandes',
        size: 'medium',
        position: { x: 4, y: 0, w: 2, h: 2 },
        config: {
          entity: 'orders',
          limit: 5,
          sortBy: 'created_at',
          sortOrder: 'desc'
        }
      }
    ],
    widgetOrder: ['widget-1', 'widget-2', 'widget-3', 'widget-4'],
    createdAt: new Date().toISOString(),
    createdBy: 'admin'
  },
  {
    id: 'dashboard-2',
    name: 'Dashboard Utilisateurs',
    description: 'Statistiques et analyse des utilisateurs',
    isDefault: false,
    isPublic: true,
    columns: 2,
    widgets: [
      {
        id: 'widget-5',
        type: 'stats',
        title: 'Utilisateurs totaux',
        size: 'medium',
        position: { x: 0, y: 0, w: 2, h: 1 },
        config: {
          entity: 'users',
          aggregation: 'count'
        }
      },
      {
        id: 'widget-6',
        type: 'chart',
        title: 'Répartition par âge',
        size: 'large',
        position: { x: 2, y: 0, w: 2, h: 2 },
        config: {
          chartType: 'pie',
          entity: 'users',
          dataKey: 'age_group'
        }
      }
    ],
    widgetOrder: ['widget-5', 'widget-6'],
    createdAt: new Date().toISOString(),
    createdBy: 'admin'
  }
];

// Données mock pour les widgets
export const mockWidgetData = {
  'widget-1': {
    value: 125430,
    change: 12.5,
    trend: 'up'
  },
  'widget-2': {
    value: 342,
    change: -5.2,
    trend: 'down'
  },
  'widget-3': [
    { name: '01/01', value: 4000 },
    { name: '02/01', value: 3000 },
    { name: '03/01', value: 5000 },
    { name: '04/01', value: 4500 },
    { name: '05/01', value: 6000 },
    { name: '06/01', value: 5500 },
    { name: '07/01', value: 7000 }
  ],
  'widget-4': [
    {
      id: '1',
      title: 'Commande #1234',
      subtitle: 'Client: Jean Dupont',
      badge: 'Livré',
      badgeVariant: 'success'
    },
    {
      id: '2',
      title: 'Commande #1235',
      subtitle: 'Client: Marie Martin',
      badge: 'En cours',
      badgeVariant: 'warning'
    },
    {
      id: '3',
      title: 'Commande #1236',
      subtitle: 'Client: Pierre Durand',
      badge: 'Expédié',
      badgeVariant: 'info'
    }
  ],
  'widget-5': {
    value: 1234,
    change: 8.3,
    trend: 'up'
  },
  'widget-6': [
    { name: '18-25', value: 30 },
    { name: '26-35', value: 45 },
    { name: '36-45', value: 20 },
    { name: '46+', value: 5 }
  ]
};

// États de chargement mock
export const mockLoadingStates = {
  'widget-1': false,
  'widget-2': false,
  'widget-3': false,
  'widget-4': false,
  'widget-5': false,
  'widget-6': false
};

// Erreurs mock
export const mockErrors = {
  // 'widget-1': 'Erreur lors du chargement des données'
};
