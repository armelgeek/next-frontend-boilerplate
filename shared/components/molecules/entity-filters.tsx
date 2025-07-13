'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '../atoms/ui/button';

export interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'daterange' | 'number' | 'text';
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

interface EntityFiltersProps {
  filters: FilterOption[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onClear: () => void;
  className?: string;
}

export function EntityFilters({
  filters,
  values,
  onChange,
  onClear,
  className = '',
}: EntityFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const activeFiltersCount = Object.values(values).filter(v => 
    v !== undefined && v !== null && v !== ''
  ).length;

  const renderFilterInput = (filter: FilterOption) => {
    const value = values[filter.key];

    switch (filter.type) {
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(filter.key, e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{filter.placeholder || `Tous les ${filter.label.toLowerCase()}`}</option>
            {filter.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(filter.key, e.target.value || undefined)}
            placeholder={filter.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
        
      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(filter.key, e.target.value ? Number(e.target.value) : undefined)}
            placeholder={filter.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
        
      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(filter.key, e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Bouton de filtres */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filtres
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </Button>

      {/* Panel de filtres */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 min-w-[300px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Filtres</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {filters.map((filter) => (
              <div key={filter.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {filter.label}
                </label>
                {renderFilterInput(filter)}
              </div>
            ))}
          </div>

          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClear();
                  setIsOpen(false);
                }}
                className="w-full"
              >
                Effacer tous les filtres
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
