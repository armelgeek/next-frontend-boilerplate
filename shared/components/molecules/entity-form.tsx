'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ReactNode } from 'react';
import { Button } from '../atoms/ui/button';

interface BaseEntity {
  id: string;
  [key: string]: any;
}

interface EntityFormProps<T extends BaseEntity> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: Omit<T, 'id'> | Partial<T>) => void;
  initialData?: Partial<T>;
  isLoading?: boolean;
  mode?: 'create' | 'update';
  className?: string;
  renderFields?: (register: any, errors: any, watch: any) => ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

export function EntityForm<T extends BaseEntity>({
  schema,
  onSubmit,
  initialData,
  isLoading = false,
  mode = 'create',
  className = '',
  renderFields,
  submitLabel,
  cancelLabel = 'Annuler',
  onCancel,
}: EntityFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData as any,
    mode: 'onChange',
  });

  const handleFormSubmit = (data: T) => {
    if (mode === 'create') {
      const { id, ...createData } = data;
      onSubmit(createData);
    } else {
      onSubmit(data);
    }
  };

  const defaultSubmitLabel = mode === 'create' ? 'Créer' : 'Mettre à jour';

  // Rendu par défaut des champs basé sur le schéma
  const defaultFieldRenderer = (register: any, errors: any) => {
    const schemaShape = (schema as any)._def?.shape;
    if (!schemaShape) return null;

    return Object.entries(schemaShape).map(([key, fieldSchema]: [string, any]) => {
      if (key === 'id') return null;

      const error = errors[key];
      const fieldType = fieldSchema._def?.typeName;
      
      return (
        <div key={key} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </label>
          
          {fieldType === 'ZodString' && !key.includes('description') && (
            <input
              {...register(key)}
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          )}
          
          {fieldType === 'ZodString' && key.includes('description') && (
            <textarea
              {...register(key)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          )}
          
          {fieldType === 'ZodNumber' && (
            <input
              {...register(key, { valueAsNumber: true })}
              type="number"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          )}
          
          {fieldType === 'ZodBoolean' && (
            <div className="flex items-center">
              <input
                {...register(key)}
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Activé</span>
            </div>
          )}
          
          {error && (
            <p className="text-sm text-red-600">{error.message}</p>
          )}
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={`space-y-4 ${className}`}>
      <div className="space-y-4">
        {renderFields ? renderFields(register, errors, watch) : defaultFieldRenderer(register, errors)}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
        )}
        
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          className="min-w-[100px]"
        >
          {isLoading ? 'En cours...' : (submitLabel || defaultSubmitLabel)}
        </Button>
      </div>
    </form>
  );
}
