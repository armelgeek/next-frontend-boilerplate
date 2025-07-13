'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import { WidgetRenderer } from './widget-renderer';
import { Button } from '@/shared/components/atoms/ui/button';
import { Plus, Settings, Trash2, GripVertical } from 'lucide-react';
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
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

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
      case 'xlarge':
        return 'h-[32rem]';
      default:
        return 'h-80';
    }
  };

  const getWidgetSpan = (size: string) => {
    switch (size) {
      case 'wide':
        return 'md:col-span-2';
      case 'full':
        return 'md:col-span-full';
      default:
        return '';
    }
  };

  const handleDragEnd = (result: DropResult) => {
    setDraggedItem(null);

    if (!result.destination || !onLayoutChange) {
      return;
    }

    const { source, destination } = result;
    
    if (source.index === destination.index) {
      return;
    }

    const newWidgetOrder = Array.from(layout.widgetOrder);
    const [movedWidget] = newWidgetOrder.splice(source.index, 1);
    newWidgetOrder.splice(destination.index, 0, movedWidget);

    onLayoutChange({
      ...layout,
      widgetOrder: newWidgetOrder
    });
  };

  const handleDragStart = (result: any) => {
    setDraggedItem(result.draggableId);
  };

  const orderedWidgets = layout.widgetOrder
    .map(id => widgets.find(w => w.id === id))
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
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Droppable droppableId="dashboard-grid">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`
                grid gap-6 ${getGridColumns()}
                ${snapshot.isDraggingOver ? 'bg-muted/50 rounded-lg p-2' : ''}
              `}
            >
              {orderedWidgets.map((widget, index) => (
                <Draggable
                  key={widget.id}
                  draggableId={widget.id}
                  index={index}
                  isDragDisabled={!isEditMode}
                >
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`
                        ${getWidgetSize(widget.size)}
                        ${getWidgetSpan(widget.size)}
                        transition-all duration-200
                        ${snapshot.isDragging ? 'rotate-2 shadow-lg scale-105' : ''}
                        ${draggedItem === widget.id ? 'opacity-90' : ''}
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

                      {/* Handle de drag */}
                      {isEditMode && (
                        <div
                          {...provided.dragHandleProps}
                          className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                        >
                          <div className="p-1 rounded bg-background/80 backdrop-blur-sm">
                            <GripVertical className="h-3 w-3 text-muted-foreground" />
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              {/* Zone de drop vide */}
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
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
