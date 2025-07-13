'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import { Label } from '@/shared/components/atoms/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/atoms/ui/select';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/atoms/ui/dialog';
import { ScrollArea } from '@/shared/components/atoms/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { DashboardGrid } from '@/shared/components/molecules/dashboard/dashboard-grid-simple';
import { 
  Plus, 
  Save, 
  Eye, 
  Edit, 
  BarChart, 
  PieChart, 
  TrendingUp, 
  List, 
  Calendar,
  Users,
  ShoppingCart,
  DollarSign,
  Activity
} from 'lucide-react';
import type { DashboardLayout, WidgetConfig, WidgetType } from '@/features/dashboard/dashboard.schema';

interface DashboardBuilderProps {
  initialLayout?: DashboardLayout;
  onSave?: (layout: DashboardLayout) => void;
  onCancel?: () => void;
}

// Templates de widgets prédéfinis
const WIDGET_TEMPLATES = [
  {
    id: 'sales-stats',
    type: 'stats' as WidgetType,
    title: 'Ventes du mois',
    description: 'Statistiques de ventes',
    icon: DollarSign,
    category: 'Sales',
    defaultConfig: {
      entity: 'orders',
      metric: 'total_amount',
      aggregation: 'sum' as const
    }
  },
  {
    id: 'user-count',
    type: 'stats' as WidgetType,
    title: 'Utilisateurs actifs',
    description: 'Nombre d\'utilisateurs',
    icon: Users,
    category: 'Users',
    defaultConfig: {
      entity: 'users',
      metric: 'count',
      aggregation: 'count' as const
    }
  },
  {
    id: 'sales-chart',
    type: 'chart' as WidgetType,
    title: 'Évolution des ventes',
    description: 'Graphique des ventes',
    icon: BarChart,
    category: 'Analytics',
    defaultConfig: {
      chartType: 'area' as const,
      entity: 'orders',
      dataKey: 'total_amount',
      xAxisKey: 'created_at'
    }
  },
  {
    id: 'performance-pie',
    type: 'chart' as WidgetType,
    title: 'Répartition des performances',
    description: 'Graphique en secteurs',
    icon: PieChart,
    category: 'Analytics',
    defaultConfig: {
      chartType: 'pie' as const,
      entity: 'categories',
      dataKey: 'value'
    }
  },
  {
    id: 'recent-orders',
    type: 'list' as WidgetType,
    title: 'Commandes récentes',
    description: 'Liste des dernières commandes',
    icon: List,
    category: 'Sales',
    defaultConfig: {
      entity: 'orders',
      limit: 5,
      sortBy: 'created_at',
      sortOrder: 'desc' as const
    }
  },
  {
    id: 'activity-feed',
    type: 'recent-activity' as WidgetType,
    title: 'Activité récente',
    description: 'Flux d\'activité',
    icon: Activity,
    category: 'General',
    defaultConfig: {
      entity: 'activities',
      limit: 10
    }
  }
];

const WIDGET_CATEGORIES = ['All', 'Sales', 'Users', 'Analytics', 'General'];

export function DashboardBuilder({
  initialLayout,
  onSave,
  onCancel
}: DashboardBuilderProps) {
  const [layout, setLayout] = useState<DashboardLayout>(
    initialLayout || {
      id: '',
      name: 'Nouveau Dashboard',
      description: '',
      isDefault: false,
      isPublic: false,
      widgets: [],
      columns: 3,
      widgetOrder: []
    }
  );

  const [isEditMode, setIsEditMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isWidgetDialogOpen, setIsWidgetDialogOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState<WidgetConfig | null>(null);

  const filteredTemplates = selectedCategory === 'All' 
    ? WIDGET_TEMPLATES 
    : WIDGET_TEMPLATES.filter(t => t.category === selectedCategory);

  const addWidget = (template: typeof WIDGET_TEMPLATES[0]) => {
    const newWidget: WidgetConfig = {
      id: `widget-${Date.now()}`,
      type: template.type,
      title: template.title,
      description: template.description,
      size: 'medium',
      position: { x: 0, y: 0, w: 2, h: 1 },
      config: template.defaultConfig
    };

    const newWidgets = [...layout.widgets, newWidget];
    const newWidgetOrder = [...layout.widgetOrder, newWidget.id];

    setLayout({
      ...layout,
      widgets: newWidgets,
      widgetOrder: newWidgetOrder
    });

    setIsWidgetDialogOpen(false);
  };

  const deleteWidget = (widgetId: string) => {
    const newWidgets = layout.widgets.filter(w => w.id !== widgetId);
    const newWidgetOrder = layout.widgetOrder.filter(id => id !== widgetId);

    setLayout({
      ...layout,
      widgets: newWidgets,
      widgetOrder: newWidgetOrder
    });
  };

  const editWidget = (widget: WidgetConfig) => {
    setEditingWidget(widget);
    setIsWidgetDialogOpen(true);
  };

  const updateWidget = (updatedWidget: WidgetConfig) => {
    const newWidgets = layout.widgets.map(w => 
      w.id === updatedWidget.id ? updatedWidget : w
    );

    setLayout({
      ...layout,
      widgets: newWidgets
    });

    setEditingWidget(null);
    setIsWidgetDialogOpen(false);
  };

  const handleSave = () => {
    onSave?.(layout);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Dashboard Builder</h1>
            <p className="text-sm text-muted-foreground">
              Créez et configurez votre dashboard personnalisé
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? <Eye className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {isEditMode ? 'Aperçu' : 'Éditer'}
            </Button>
            <Button onClick={onCancel} variant="outline">
              Annuler
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>

        {/* Configuration du dashboard */}
        {isEditMode && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dashboard-name">Nom du dashboard</Label>
                  <Input
                    id="dashboard-name"
                    value={layout.name}
                    onChange={(e) => setLayout({ ...layout, name: e.target.value })}
                    placeholder="Mon Dashboard"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dashboard-columns">Colonnes</Label>
                  <Select
                    value={layout.columns.toString()}
                    onValueChange={(value) => setLayout({ ...layout, columns: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 colonne</SelectItem>
                      <SelectItem value="2">2 colonnes</SelectItem>
                      <SelectItem value="3">3 colonnes</SelectItem>
                      <SelectItem value="4">4 colonnes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Widgets: {layout.widgets.length}</Label>
                  <div className="text-sm text-muted-foreground">
                    {layout.widgets.length} widget(s) configuré(s)
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dashboard-description">Description</Label>
                <Textarea
                  id="dashboard-description"
                  value={layout.description || ''}
                  onChange={(e) => setLayout({ ...layout, description: e.target.value })}
                  placeholder="Description du dashboard..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-4">
        <DashboardGrid
          layout={layout}
          widgets={layout.widgets}
          isEditMode={isEditMode}
          onLayoutChange={setLayout}
          onWidgetAdd={() => setIsWidgetDialogOpen(true)}
          onWidgetEdit={editWidget}
          onWidgetDelete={deleteWidget}
        />
      </div>

      {/* Dialog d'ajout/édition de widget */}
      <Dialog open={isWidgetDialogOpen} onOpenChange={setIsWidgetDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              {editingWidget ? 'Modifier le widget' : 'Ajouter un widget'}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="templates" className="h-full">
            <TabsList>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              {editingWidget && <TabsTrigger value="config">Configuration</TabsTrigger>}
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              {/* Filtres par catégorie */}
              <div className="flex gap-2 flex-wrap">
                {WIDGET_CATEGORIES.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Grille de templates */}
              <ScrollArea className="h-96">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map(template => {
                    const IconComponent = template.icon;
                    return (
                      <Card
                        key={template.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => addWidget(template)}
                      >
                        <CardContent className="p-4 text-center space-y-2">
                          <IconComponent className="h-8 w-8 mx-auto text-primary" />
                          <h3 className="font-medium">{template.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            {editingWidget && (
              <TabsContent value="config" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Titre du widget</Label>
                      <Input
                        value={editingWidget.title}
                        onChange={(e) => setEditingWidget({
                          ...editingWidget,
                          title: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Taille</Label>
                      <Select
                        value={editingWidget.size}
                        onValueChange={(value) => setEditingWidget({
                          ...editingWidget,
                          size: value as any
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Petit</SelectItem>
                          <SelectItem value="medium">Moyen</SelectItem>
                          <SelectItem value="large">Grand</SelectItem>
                          <SelectItem value="wide">Large</SelectItem>
                          <SelectItem value="extra-large">Très grand</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editingWidget.description || ''}
                      onChange={(e) => setEditingWidget({
                        ...editingWidget,
                        description: e.target.value
                      })}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsWidgetDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={() => updateWidget(editingWidget)}>
                      Sauvegarder
                    </Button>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
