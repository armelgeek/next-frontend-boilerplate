"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/atoms/ui/select';
import { Checkbox } from '@/shared/components/atoms/ui/checkbox';
import { Switch } from '@/shared/components/atoms/ui/switch';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { useTheme } from '@/shared/providers/theme-provider';
import { useInlineThemeStyles } from '@/shared/hooks/use-theme-utils';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'switch' | 'number' | 'email' | 'password' | 'date';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

interface EntityFormProps {
  fields: FormField[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  onCancel?: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  submitLabel?: string;
  cancelLabel?: string;
  layout?: 'single' | 'two-column' | 'sections';
}

export function EntityForm({
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
  loading = false,
  title = "Formulaire",
  description,
  submitLabel = "Enregistrer",
  cancelLabel = "Annuler",
  layout = 'single'
}: EntityFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { getCardStyle, getButtonStyle } = useInlineThemeStyles();

  const handleChange = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && (!value || value === '')) {
      return `${field.label} est requis`;
    }

    if (field.validation) {
      const { min, max, pattern, message } = field.validation;
      
      if (min !== undefined && value && value.length < min) {
        return message || `${field.label} doit contenir au moins ${min} caractères`;
      }
      
      if (max !== undefined && value && value.length > max) {
        return message || `${field.label} ne peut pas dépasser ${max} caractères`;
      }
      
      if (pattern && value && !new RegExp(pattern).test(value)) {
        return message || `${field.label} format invalide`;
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      const error = validateField(field, values[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(values);
  };

  const renderField = (field: FormField) => {
    const value = values[field.name] || '';
    const error = errors[field.name];

    const fieldContent = (
      <div key={field.name} className="space-y-2">
        <Label htmlFor={field.name} className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        
        {field.type === 'text' && (
          <Input
            id={field.name}
            type="text"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={error ? 'border-destructive' : ''}
          />
        )}

        {field.type === 'email' && (
          <Input
            id={field.name}
            type="email"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={error ? 'border-destructive' : ''}
          />
        )}

        {field.type === 'password' && (
          <Input
            id={field.name}
            type="password"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={error ? 'border-destructive' : ''}
          />
        )}

        {field.type === 'number' && (
          <Input
            id={field.name}
            type="number"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.name, Number(e.target.value))}
            className={error ? 'border-destructive' : ''}
          />
        )}

        {field.type === 'date' && (
          <Input
            id={field.name}
            type="date"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={error ? 'border-destructive' : ''}
          />
        )}

        {field.type === 'textarea' && (
          <Textarea
            id={field.name}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={error ? 'border-destructive' : ''}
            rows={4}
          />
        )}

        {field.type === 'select' && (
          <Select value={value} onValueChange={(val) => handleChange(field.name, val)}>
            <SelectTrigger className={error ? 'border-destructive' : ''}>
              <SelectValue placeholder={field.placeholder || `Sélectionner ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {field.type === 'checkbox' && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={value}
              onCheckedChange={(checked) => handleChange(field.name, checked)}
            />
            <Label htmlFor={field.name} className="text-sm">
              {field.placeholder || field.label}
            </Label>
          </div>
        )}

        {field.type === 'switch' && (
          <div className="flex items-center space-x-2">
            <Switch
              id={field.name}
              checked={value}
              onCheckedChange={(checked) => handleChange(field.name, checked)}
            />
            <Label htmlFor={field.name} className="text-sm">
              {field.placeholder || field.label}
            </Label>
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );

    return fieldContent;
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'two-column':
        return 'grid grid-cols-1 md:grid-cols-2 gap-4';
      case 'sections':
        return 'space-y-6';
      default:
        return 'space-y-4';
    }
  };

  return (
    <Card style={getCardStyle()}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={getLayoutClasses()}>
            {fields.map(renderField)}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
                style={getButtonStyle('secondary')}
              >
                {cancelLabel}
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading}
              style={getButtonStyle('primary')}
            >
              {loading ? 'Enregistrement...' : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'text' | 'number' | 'date';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface EntityFiltersProps {
  filters: FilterOption[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onReset: () => void;
}

export function EntityFilters({
  filters,
  values,
  onChange,
  onReset
}: EntityFiltersProps) {
  const { getCardStyle, getButtonStyle } = useInlineThemeStyles();
  const activeFiltersCount = Object.values(values).filter(v => v !== '' && v !== undefined && v !== null).length;

  return (
    <Card style={getCardStyle()}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Filtres</CardTitle>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              disabled={activeFiltersCount === 0}
              style={getButtonStyle('secondary')}
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filters.map(filter => (
            <div key={filter.key} className="space-y-2">
              <Label htmlFor={filter.key} className="text-sm font-medium">
                {filter.label}
              </Label>
              
              {filter.type === 'text' && (
                <Input
                  id={filter.key}
                  type="text"
                  placeholder={filter.placeholder}
                  value={values[filter.key] || ''}
                  onChange={(e) => onChange(filter.key, e.target.value)}
                />
              )}

              {filter.type === 'number' && (
                <Input
                  id={filter.key}
                  type="number"
                  placeholder={filter.placeholder}
                  value={values[filter.key] || ''}
                  onChange={(e) => onChange(filter.key, e.target.value)}
                />
              )}

              {filter.type === 'date' && (
                <Input
                  id={filter.key}
                  type="date"
                  value={values[filter.key] || ''}
                  onChange={(e) => onChange(filter.key, e.target.value)}
                />
              )}

              {filter.type === 'select' && (
                <Select
                  value={values[filter.key] || '__all__'}
                  onValueChange={(value) => onChange(filter.key, value === '__all__' ? undefined : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={filter.placeholder || 'Sélectionner'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Tous</SelectItem>
                    {filter.options?.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort?: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSort: (key: string) => void;
}

export function SortableHeader({
  label,
  sortKey,
  currentSort,
  onSort
}: SortableHeaderProps) {
  const isActive = currentSort?.key === sortKey;
  const direction = currentSort?.direction;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSort(sortKey)}
      className="h-auto p-2 font-medium justify-start"
    >
      {label}
      {isActive && (
        <span className="ml-1">
          {direction === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </Button>
  );
}
