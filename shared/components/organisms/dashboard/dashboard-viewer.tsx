'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import { DashboardGrid } from '@/shared/components/molecules/dashboard/dashboard-grid-simple';
import { RefreshCw, Settings, Share2, Download } from 'lucide-react';
import { mockDashboards } from '@/features/dashboard/dashboard.mock';
import type { DashboardLayout, WidgetConfig } from '@/features/dashboard/dashboard.schema';

interface DashboardViewerProps {
  dashboardId: string;
  dashboards?: DashboardLayout[];
  isEditable?: boolean;
  onEdit?: () => void;
  className?: string;
}

export function DashboardViewer({
  dashboardId,
  dashboards = mockDashboards,
  isEditable = false,
  onEdit,
  className
}: DashboardViewerProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [widgetData, setWidgetData] = useState<Record<string, any>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const dashboard = dashboards.find((d: DashboardLayout) => d.id === dashboardId);

  // Simuler le chargement des données des widgets
  useEffect(() => {
    if (!dashboard) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    dashboard.widgets.forEach((widget: WidgetConfig) => {
      setLoadingStates(prev => ({ ...prev, [widget.id]: true }));
      
      // Simuler un appel API
      setTimeout(() => {
        // Données mock basées sur le type de widget
        let mockData;
        switch (widget.type) {
          case 'stats':
          case 'metric':
            mockData = {
              value: Math.floor(Math.random() * 10000),
              change: (Math.random() * 40 - 20), // -20 à +20
              trend: Math.random() > 0.5 ? 'up' : 'down'
            };
            break;
          case 'chart':
            mockData = Array.from({ length: 7 }, (_, i) => ({
              name: `Jour ${i + 1}`,
              value: Math.floor(Math.random() * 1000)
            }));
            break;
          case 'list':
          case 'recent-activity':
            mockData = Array.from({ length: 5 }, (_, i) => ({
              id: `item-${i}`,
              title: `Élément ${i + 1}`,
              subtitle: `Description de l'élément ${i + 1}`,
              badge: ['Actif', 'En attente', 'Terminé'][Math.floor(Math.random() * 3)],
              badgeVariant: ['success', 'warning', 'secondary'][Math.floor(Math.random() * 3)]
            }));
            break;
          default:
            mockData = null;
        }

        setWidgetData(prev => ({ ...prev, [widget.id]: mockData }));
        setLoadingStates(prev => ({ ...prev, [widget.id]: false }));
      }, Math.random() * 1000 + 500); // 500-1500ms
    });

    // Marquer le chargement initial comme terminé
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [dashboard, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleShare = () => {
    // Implémenter le partage
    navigator.clipboard.writeText(window.location.href);
    console.log('URL copiée dans le presse-papier');
  };

  const handleExport = () => {
    // Implémenter l'export
    const dataStr = JSON.stringify(dashboard, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-${dashboard?.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center">
          <h3 className="text-lg font-medium text-muted-foreground">
            Dashboard introuvable
          </h3>
          <p className="text-sm text-muted-foreground">
            Le dashboard avec l'ID "{dashboardId}" n'existe pas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header du dashboard */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{dashboard.name}</h1>
            {dashboard.isDefault && (
              <Badge variant="secondary">Par défaut</Badge>
            )}
            {dashboard.isPublic && (
              <Badge variant="outline">Public</Badge>
            )}
          </div>
          {dashboard.description && (
            <p className="text-muted-foreground">{dashboard.description}</p>
          )}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{dashboard.widgets.length} widget(s)</span>
            <span>Dernière mise à jour: {new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          {isEditable && (
            <Button size="sm" onClick={onEdit}>
              <Settings className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      {/* Grille de widgets */}
      <DashboardGrid
        layout={dashboard}
        widgets={dashboard.widgets}
        widgetData={widgetData}
        isLoading={loadingStates}
        errors={errors}
        isEditMode={false}
      />

      {/* Informations supplémentaires */}
      {dashboard.tags && dashboard.tags.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Tags:</span>
          <div className="flex gap-1">
            {dashboard.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
