'use client';

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface SortableHeaderProps {
  children: React.ReactNode;
  sortKey: string;
  currentSort?: string;
  currentOrder?: 'asc' | 'desc';
  onSort: (key: string, order: 'asc' | 'desc') => void;
  className?: string;
}

export function SortableHeader({
  children,
  sortKey,
  currentSort,
  currentOrder,
  onSort,
  className = '',
}: SortableHeaderProps) {
  const isActive = currentSort === sortKey;
  
  const handleClick = () => {
    if (isActive) {
      // Basculer l'ordre si déjà actif
      const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
      onSort(sortKey, newOrder);
    } else {
      // Commencer par 'asc' si nouveau tri
      onSort(sortKey, 'asc');
    }
  };

  const getSortIcon = () => {
    if (!isActive) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    
    return currentOrder === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-blue-600" />
      : <ArrowDown className="h-4 w-4 text-blue-600" />;
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-2 hover:text-blue-600 transition-colors ${
        isActive ? 'text-blue-600 font-medium' : 'text-gray-700'
      } ${className}`}
    >
      <span>{children}</span>
      {getSortIcon()}
    </button>
  );
}
