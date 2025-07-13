import { useState, useCallback } from 'react';

interface BaseEntity {
  id: string;
  [key: string]: any;
}

interface EntityStoreState<T extends BaseEntity> {
  // Sélection multiple
  selectedItems: T[];
  setSelectedItems: (items: T[]) => void;
  toggleSelection: (item: T) => void;
  selectAll: (items: T[]) => void;
  clearSelection: () => void;
  
  // Préférences d'affichage
  viewMode: 'grid' | 'list' | 'table';
  setViewMode: (mode: 'grid' | 'list' | 'table') => void;
  
  // Colonnes affichées (pour le mode table)
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
}

// Hook générique pour utiliser le store d'une entité
export function useEntityStore<T extends BaseEntity>(): EntityStoreState<T> {
  const [selectedItems, setSelectedItemsState] = useState<T[]>([]);
  const [viewMode, setViewModeState] = useState<'grid' | 'list' | 'table'>('grid');
  const [visibleColumns, setVisibleColumnsState] = useState<string[]>(['name', 'status', 'createdAt']);

  const setSelectedItems = useCallback((items: T[]) => {
    setSelectedItemsState(items);
  }, []);

  const toggleSelection = useCallback((item: T) => {
    setSelectedItemsState(prev => {
      const isSelected = prev.some(selected => selected.id === item.id);
      
      if (isSelected) {
        return prev.filter(selected => selected.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  }, []);

  const selectAll = useCallback((items: T[]) => {
    setSelectedItemsState(items);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedItemsState([]);
  }, []);

  const setViewMode = useCallback((mode: 'grid' | 'list' | 'table') => {
    setViewModeState(mode);
  }, []);

  const setVisibleColumns = useCallback((columns: string[]) => {
    setVisibleColumnsState(columns);
  }, []);

  return {
    selectedItems,
    setSelectedItems,
    toggleSelection,
    selectAll,
    clearSelection,
    viewMode,
    setViewMode,
    visibleColumns,
    setVisibleColumns,
  };
}
