'use client';

import { z } from 'zod';

export const WidgetTypeSchema = z.enum([
  'stats',
  'chart',
  'list',
  'table',
  'metric',
  'progress',
  'calendar',
  'recent-activity'
]);

export const ChartTypeSchema = z.enum([
  'area',
  'bar',
  'line',
  'pie',
  'doughnut',
  'radar'
]);

export const WidgetSizeSchema = z.enum([
  'small',    // 1x1
  'medium',   // 2x1
  'large',    // 2x2
  'wide',     // 3x1
  'tall',     // 1x3
  'extra-large' // 3x2
]);

export const WidgetConfigSchema = z.object({
  id: z.string(),
  type: WidgetTypeSchema,
  title: z.string(),
  description: z.string().optional(),
  size: WidgetSizeSchema.default('medium'),
  position: z.object({
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number()
  }),
  config: z.object({
    // Configuration pour les widgets de stats
    entity: z.string().optional(),
    metric: z.string().optional(),
    aggregation: z.enum(['count', 'sum', 'avg', 'min', 'max']).optional(),
    field: z.string().optional(),
    
    // Configuration pour les charts
    chartType: ChartTypeSchema.optional(),
    dataKey: z.string().optional(),
    xAxisKey: z.string().optional(),
    color: z.string().optional(),
    
    // Configuration pour les listes
    limit: z.number().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    
    // Filtres
    filters: z.record(z.unknown()).optional(),
    
    // Refresh interval en secondes
    refreshInterval: z.number().optional(),
    
    // Configuration personnalisée
    customConfig: z.record(z.unknown()).optional()
  }).optional(),
  
  // Métadonnées
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  createdBy: z.string().optional()
});

export const DashboardLayoutSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  isDefault: z.boolean().default(false),
  isPublic: z.boolean().default(false),
  widgets: z.array(WidgetConfigSchema),
  
  // Configuration de la grille simple
  columns: z.number().min(1).max(4).default(3),
  widgetOrder: z.array(z.string()).default([]),
  
  // Configuration du layout avancé (pour le futur)
  layout: z.object({
    cols: z.number().default(12),
    rows: z.number().default(12),
    rowHeight: z.number().default(60),
    margin: z.array(z.number()).default([10, 10]),
    containerPadding: z.array(z.number()).default([10, 10]),
    isDraggable: z.boolean().default(true),
    isResizable: z.boolean().default(true)
  }).optional(),
  
  // Permissions
  permissions: z.object({
    canEdit: z.array(z.string()).optional(),
    canView: z.array(z.string()).optional()
  }).optional(),
  
  // Métadonnées
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  createdBy: z.string().optional(),
  tags: z.array(z.string()).optional()
});

export const DashboardWidgetTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: WidgetTypeSchema,
  category: z.string(),
  icon: z.string().optional(),
  thumbnail: z.string().optional(),
  defaultSize: WidgetSizeSchema.default('medium'),
  defaultConfig: z.record(z.unknown()),
  isCustom: z.boolean().default(false),
  requiredFields: z.array(z.string()).optional(),
  supportedEntities: z.array(z.string()).optional()
});

// Types TypeScript
export type WidgetType = z.infer<typeof WidgetTypeSchema>;
export type ChartType = z.infer<typeof ChartTypeSchema>;
export type WidgetSize = z.infer<typeof WidgetSizeSchema>;
export type WidgetConfig = z.infer<typeof WidgetConfigSchema>;
export type DashboardLayout = z.infer<typeof DashboardLayoutSchema>;
export type DashboardWidgetTemplate = z.infer<typeof DashboardWidgetTemplateSchema>;

// Constantes utiles
export const WIDGET_SIZES = {
  small: { w: 1, h: 1 },
  medium: { w: 2, h: 1 },
  large: { w: 2, h: 2 },
  wide: { w: 3, h: 1 },
  tall: { w: 1, h: 3 },
  'extra-large': { w: 3, h: 2 }
} as const;

export const WIDGET_CATEGORIES = [
  'Analytics',
  'Sales',
  'Users',
  'Performance',
  'Content',
  'Social',
  'Finance',
  'Custom'
] as const;
