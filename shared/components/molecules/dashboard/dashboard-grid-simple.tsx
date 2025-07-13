'use client';

import React from 'react';
import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import { WidgetRenderer } from './widget-renderer';
import { Button } from '@/shared/components/atoms/ui/button';
import { Plus, Settings, Trash2 } from 'lucide-react';
import type { DashboardLayout, WidgetConfig } from '@/features/dashboard/dashboard.schema';

interface DashboardGridProps {
  layout: DashboardLayout;
  widgets: WidgetConfig[];
  widgetData?: Record<string, any>;
  isLoading?: Record<string, boolean>;
  errors?: Record<string, string>;
  isEditMode?: boolean;
  onLayoutChange?: (layout: DashboardLayout) => void;
  onWidgetAdd?: () => void;
  onWidgetEdit?: (widget: WidgetConfig) => void;
  onWidgetDelete?: (widgetId: string) => void;
  onWidgetAction?: (action: string, data?: any) => void;
}

export function DashboardGrid({
  layout,
  widgets,
  widgetData = {},
  isLoading = {},
  errors = {},
  isEditMode = false,
  onLayoutChange,
  onWidgetAdd,
  onWidgetEdit,
  onWidgetDelete,
  onWidgetAction
}: DashboardGridProps) {
  const getGridColumns = () => {
    switch (layout.columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getWidgetSize = (size: string) => {
    switch (size) {
      case 'small':
        return 'h-64';
      case 'medium':
        return 'h-80';
      case 'large':
        return 'h-96';
      case 'extra-large':
        return 'h-[32rem]';
      default:
        return 'h-80';
    }
  };

  const getWidgetSpan = (size: string) => {
    switch (size) {
      case 'wide':
        return 'md:col-span-2';
      case 'extra-large':
        return 'md:col-span-full';
      default:
        return '';
    }
  };

  const moveWidget = (fromIndex: number, toIndex: number) => {
    if (!onLayoutChange) return;

    const newWidgetOrder = Array.from(layout.widgetOrder);
    const [movedWidget] = newWidgetOrder.splice(fromIndex, 1);
    newWidgetOrder.splice(toIndex, 0, movedWidget);

    onLayoutChange({
      ...layout,
      widgetOrder: newWidgetOrder
    });
  };

  const orderedWidgets = layout.widgetOrder
    .map((id: string) => widgets.find(w => w.id === id))
    .filter(Boolean) as WidgetConfig[];

  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      {isEditMode && (
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Configuration du Dashboard</h2>
          <Button onClick={onWidgetAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un widget
          </Button>
        </div>
      )}

      {/* Grille de widgets */}
      <div className={`grid gap-6 ${getGridColumns()}`}>
        {orderedWidgets.map((widget, index) => (
          <Card
            key={widget.id}
            className={`
              ${getWidgetSize(widget.size)}
              ${getWidgetSpan(widget.size)}
              transition-all duration-200
              ${isEditMode ? 'ring-2 ring-transparent hover:ring-primary/20' : ''}
              relative group
            `}
          >
            {/* Header du widget en mode édition */}
            {isEditMode && (
              <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 bg-background/80 backdrop-blur-sm"
                  onClick={() => onWidgetEdit?.(widget)}
                >
                  <Settings className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 bg-background/80 backdrop-blur-sm text-destructive hover:text-destructive"
                  onClick={() => onWidgetDelete?.(widget.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}

            {/* Contrôles de réorganisation */}
            {isEditMode && (
              <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-1 rounded bg-background/80 backdrop-blur-sm flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => moveWidget(index, Math.max(0, index - 1))}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => moveWidget(index, Math.min(orderedWidgets.length - 1, index + 1))}
                    disabled={index === orderedWidgets.length - 1}
                  >
                    ↓
                  </Button>
                </div>
              </div>
            )}

            <CardContent className="p-4 h-full">
              <WidgetRenderer
                config={widget}
                data={widgetData[widget.id]}
                isLoading={isLoading[widget.id]}
                error={errors[widget.id]}
                onWidgetAction={onWidgetAction}
              />
            </CardContent>
          </Card>
        ))}

        {/* Zone vide */}
        {orderedWidgets.length === 0 && (
          <div className="col-span-full h-64 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Aucun widget dans ce dashboard
              </p>
              {isEditMode && (
                <Button onClick={onWidgetAdd} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter votre premier widget
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
