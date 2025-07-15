"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Input } from '@/shared/components/atoms/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/atoms/ui/select';
import { useTheme } from '@/shared/providers/theme-provider';
import { useInlineThemeStyles, useThemeVariants } from '@/shared/hooks/use-theme-utils';

interface EntityCardProps {
  title: string;
  description?: string;
  status?: 'active' | 'inactive' | 'pending' | 'draft';
  category?: string;
  date?: string;
  image?: string;
  price?: number;
  actions?: React.ReactNode;
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
}

export function EntityCard({
  title,
  description,
  status = 'active',
  category,
  date,
  image,
  price,
  actions,
  variant = 'default'
}: EntityCardProps) {
  const { currentTheme } = useTheme();
  const { getCardStyle, getButtonStyle } = useInlineThemeStyles();
  const { cardVariants } = useThemeVariants();

  const statusColors = {
    active: 'bg-green-100 text-green-800 border-green-200',
    inactive: 'bg-gray-100 text-gray-800 border-gray-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    draft: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  const cardStyle = variant === 'minimal' 
    ? { ...getCardStyle(), border: '1px solid var(--border)', boxShadow: 'none' }
    : getCardStyle();

  if (variant === 'compact') {
    return (
      <Card className={`transition-all duration-200 hover:scale-105 ${cardVariants.default}`} style={cardStyle}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-sm truncate">{title}</h3>
              {category && (
                <p className="text-xs text-muted-foreground mt-1">{category}</p>
              )}
            </div>
            <Badge className={`ml-2 text-xs ${statusColors[status]}`}>
              {status}
            </Badge>
          </div>
          {price && (
            <div className="mt-2 font-bold text-primary">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={`transition-all duration-200 hover:shadow-lg ${cardVariants.default}`} style={cardStyle}>
        {image && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{title}</CardTitle>
              {category && (
                <Badge variant="outline" className="mt-2">
                  {category}
                </Badge>
              )}
            </div>
            <Badge className={statusColors[status]}>
              {status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {description && (
            <CardDescription className="text-sm leading-relaxed">
              {description}
            </CardDescription>
          )}
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {date && <span>{date}</span>}
            {price && (
              <span className="font-bold text-primary text-base">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)}
              </span>
            )}
          </div>
          
          {actions && (
            <div className="flex gap-2 pt-2 border-t">
              {actions}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${cardVariants.default}`} style={cardStyle}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge className={statusColors[status]}>
            {status}
          </Badge>
        </div>
        {description && (
          <CardDescription className="text-sm">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {category && (
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
            )}
            {date && (
              <p className="text-xs text-muted-foreground">{date}</p>
            )}
          </div>
          {price && (
            <div className="font-bold text-primary">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)}
            </div>
          )}
        </div>
        {actions && (
          <div className="flex gap-2 mt-4 pt-3 border-t">
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface EntityListProps {
  entities: any[];
  renderCard: (entity: any, index: number) => React.ReactNode;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  variant?: 'grid' | 'list' | 'table';
  columns?: number;
}

export function EntityList({
  entities,
  renderCard,
  loading = false,
  error,
  emptyMessage = "Aucun élément trouvé",
  variant = 'grid',
  columns = 3
}: EntityListProps) {
  const { getCardStyle } = useInlineThemeStyles();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse" style={getCardStyle()}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card style={getCardStyle()}>
        <CardContent className="p-6 text-center">
          <div className="text-destructive">
            <h3 className="font-semibold mb-2">Erreur</h3>
            <p className="text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (entities.length === 0) {
    return (
      <Card style={getCardStyle()}>
        <CardContent className="p-6 text-center">
          <div className="text-muted-foreground">
            <h3 className="font-semibold mb-2">Aucun résultat</h3>
            <p className="text-sm">{emptyMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6'
  };

  if (variant === 'grid') {
    return (
      <div className={`grid gap-4 ${gridClasses[columns as keyof typeof gridClasses] || gridClasses[3]}`}>
        {entities.map(renderCard)}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {entities.map(renderCard)}
      </div>
    );
  }

  // Table variant
  return (
    <div className="space-y-2">
      {entities.map(renderCard)}
    </div>
  );
}

interface EntitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function EntitySearch({
  value,
  onChange,
  placeholder = "Rechercher...",
  debounceMs = 300
}: EntitySearchProps) {
  const [localValue, setLocalValue] = useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, onChange, debounceMs]);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      className="max-w-sm"
    />
  );
}

interface EntityPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
  showPageSize?: boolean;
}

export function EntityPagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
  showPageSize = true
}: EntityPaginationProps) {
  const { getButtonStyle } = useInlineThemeStyles();

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <p className="text-sm text-muted-foreground">
          {totalItems > 0 ? `${startItem}-${endItem} sur ${totalItems}` : '0 résultat'}
        </p>
        {showPageSize && totalItems > 0 && (
          <>
            <span className="text-sm text-muted-foreground">|</span>
            <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          style={getButtonStyle('secondary')}
        >
          Précédent
        </Button>
        
        <div className="flex space-x-1">
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            const isActive = pageNum === currentPage;
            
            return (
              <Button
                key={pageNum}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                style={isActive ? getButtonStyle('primary') : getButtonStyle('secondary')}
                className="w-10"
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          style={getButtonStyle('secondary')}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
