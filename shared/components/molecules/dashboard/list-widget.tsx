'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import { Button } from '@/shared/components/atoms/ui/button';
import { AlertCircle, ExternalLink, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import type { WidgetConfig } from '@/features/dashboard/dashboard.schema';

interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  href?: string;
  metadata?: Record<string, any>;
}

interface ListWidgetProps {
  config: WidgetConfig;
  data?: {
    items: ListItem[];
    total?: number;
    showViewAll?: boolean;
    viewAllHref?: string;
    isLoading?: boolean;
    error?: string;
  };
  isLoading?: boolean;
  error?: string;
  onItemClick?: (item: ListItem) => void;
}

export function ListWidget({ 
  config, 
  data, 
  isLoading, 
  error,
  onItemClick 
}: ListWidgetProps) {
  if (error || data?.error) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            {error || data?.error || 'Erreur de chargement'}
          </p>
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
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const items = data?.items || [];
  const limit = config.config?.limit || 5;
  const displayItems = items.slice(0, limit);

  const renderItem = (item: ListItem, index: number) => {
    const content = (
      <div className={cn(
        "flex items-center justify-between p-3 rounded-lg transition-colors",
        "hover:bg-gray-50 cursor-pointer group"
      )}>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium truncate">
            {item.title}
          </h4>
          {item.subtitle && (
            <p className="text-xs text-muted-foreground truncate mt-1">
              {item.subtitle}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-3">
          {item.badge && (
            <Badge 
              variant={item.badgeVariant || 'secondary'}
              className="text-xs"
            >
              {item.badge}
            </Badge>
          )}
          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
        </div>
      </div>
    );

    if (item.href) {
      return (
        <Link key={item.id} href={item.href}>
          {content}
        </Link>
      );
    }

    return (
      <div 
        key={item.id} 
        onClick={() => onItemClick?.(item)}
      >
        {content}
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {config.title}
          </CardTitle>
          {data?.total && (
            <Badge variant="outline" className="text-xs">
              {data.total}
            </Badge>
          )}
        </div>
        {config.description && (
          <p className="text-xs text-muted-foreground">
            {config.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-1">
        {displayItems.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">
              Aucun élément à afficher
            </p>
          </div>
        ) : (
          <>
            {displayItems.map(renderItem)}
            
            {(data?.showViewAll || (data?.total && data.total > limit)) && (
              <div className="pt-2 border-t">
                {data?.viewAllHref ? (
                  <Link href={data.viewAllHref}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-center"
                    >
                      <span>Voir tout</span>
                      {data?.total && data.total > limit && (
                        <span className="ml-1">
                          (+{data.total - limit})
                        </span>
                      )}
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-center"
                    onClick={() => onItemClick?.({ 
                      id: 'view-all', 
                      title: 'Voir tout',
                      metadata: { action: 'view-all', total: data?.total }
                    })}
                  >
                    <span>Voir tout</span>
                    {data?.total && data.total > limit && (
                      <span className="ml-1">
                        (+{data.total - limit})
                      </span>
                    )}
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
