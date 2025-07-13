'use client';

import React from 'react';
import { StatsWidget } from './stats-widget';
import { ChartWidget } from './chart-widget';
import { ListWidget } from './list-widget';
import type { WidgetConfig, WidgetType } from '@/features/dashboard/dashboard.schema';

interface WidgetRendererProps {
  config: WidgetConfig;
  data?: any;
  isLoading?: boolean;
  error?: string;
  onWidgetAction?: (action: string, data?: any) => void;
}

export function WidgetRenderer({ 
  config, 
  data, 
  isLoading, 
  error,
  onWidgetAction 
}: WidgetRendererProps) {
  const handleItemClick = (item: any) => {
    onWidgetAction?.('item-click', { widget: config, item });
  };

  const renderWidget = () => {
    switch (config.type as WidgetType) {
      case 'stats':
      case 'metric':
        return (
          <StatsWidget
            config={config}
            data={data}
            isLoading={isLoading}
            error={error}
          />
        );

      case 'chart':
        return (
          <ChartWidget
            config={config}
            data={data}
            isLoading={isLoading}
            error={error}
          />
        );

      case 'list':
      case 'recent-activity':
        return (
          <ListWidget
            config={config}
            data={data}
            isLoading={isLoading}
            error={error}
            onItemClick={handleItemClick}
          />
        );

      case 'table':
        // TODO: Implémenter TableWidget
        return (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Widget Table - En cours d'implémentation
            </p>
          </div>
        );

      case 'progress':
        // TODO: Implémenter ProgressWidget
        return (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Widget Progress - En cours d'implémentation
            </p>
          </div>
        );

      case 'calendar':
        // TODO: Implémenter CalendarWidget
        return (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Widget Calendar - En cours d'implémentation
            </p>
          </div>
        );

      default:
        return (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Type de widget non supporté: {config.type}
            </p>
          </div>
        );
    }
  };

  return renderWidget();
}
