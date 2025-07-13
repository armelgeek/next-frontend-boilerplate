'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import { AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { WidgetConfig } from '@/features/dashboard/dashboard.schema';

interface StatsWidgetProps {
  config: WidgetConfig;
  data?: {
    value: number | string;
    previousValue?: number;
    change?: number;
    changeType?: 'increase' | 'decrease' | 'neutral';
    label?: string;
    description?: string;
    isLoading?: boolean;
    error?: string;
  };
  isLoading?: boolean;
  error?: string;
}

export function StatsWidget({ config, data, isLoading, error }: StatsWidgetProps) {
  if (error) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Erreur de chargement</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || data?.isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  const formatValue = (value: number | string): string => {
    if (typeof value === 'number') {
      // Format des nombres avec séparateurs de milliers
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return value.toLocaleString();
    }
    return String(value);
  };

  const getChangeIcon = (changeType?: 'increase' | 'decrease' | 'neutral') => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'neutral':
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getChangeColor = (changeType?: 'increase' | 'decrease' | 'neutral') => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      case 'neutral':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {config.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            {formatValue(data?.value ?? 0)}
          </div>
          
          {data?.change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-sm",
              getChangeColor(data.changeType)
            )}>
              {getChangeIcon(data.changeType)}
              <span>
                {data.change > 0 ? '+' : ''}{data.change}%
              </span>
              {data.previousValue && (
                <span className="text-muted-foreground">
                  vs {formatValue(data.previousValue)}
                </span>
              )}
            </div>
          )}
          
          {data?.description && (
            <p className="text-xs text-muted-foreground">
              {data.description}
            </p>
          )}
          
          {data?.label && (
            <Badge variant="secondary" className="text-xs">
              {data.label}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
