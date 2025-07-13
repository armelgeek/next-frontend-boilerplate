'use client';

import { useState, ReactNode } from 'react';
import { EntityList } from '../molecules/entity-list';
import { EntitySearch } from '../molecules/entity-search';
import { EntityPagination } from '../molecules/entity-pagination';
import Heading from '../atoms/heading';

interface BaseEntity {
  id: string;
  name?: string;
  title?: string;
  [key: string]: any;
}

interface EntityPageProps<T extends BaseEntity> {
  // Configuration de base
  title: string;
  subtitle?: string;
  
  // Données
  entities: T[];
  isLoading: boolean;
  error?: Error | null;
  
  // Recherche
  searchTerm: string;
  onSearchChange: (term: string) => void;
  searchPlaceholder?: string;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  
  // Affichage
  emptyMessage?: string;
  columns?: 1 | 2 | 3 | 4;
  getEntityHref: (entity: T) => string;
  
  // Customisation
  renderCard?: (entity: T) => ReactNode;
  renderActions?: (entity: T) => ReactNode;
  renderHeader?: () => ReactNode;
  renderFilters?: () => ReactNode;
  
  // Classes CSS
  className?: string;
  containerClassName?: string;
}

export function EntityPage<T extends BaseEntity>({
  title,
  subtitle,
  entities,
  isLoading,
  error,
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  emptyMessage,
  columns = 3,
  getEntityHref,
  renderCard,
  renderActions,
  renderHeader,
  renderFilters,
  className = '',
  containerClassName = 'container mx-auto px-4 py-8',
}: EntityPageProps<T>) {
  return (
    <div className={containerClassName}>
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {subtitle && (
          <p className="text-gray-600 text-lg">{subtitle}</p>
        )}
        
        {renderHeader && (
          <div className="mt-4">
            {renderHeader()}
          </div>
        )}
      </div>

      {/* Barre de recherche et filtres */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 max-w-md">
            <EntitySearch
              value={searchTerm}
              onChange={onSearchChange}
              placeholder={searchPlaceholder || `Rechercher des ${title.toLowerCase()}...`}
            />
          </div>
          
          {renderFilters && (
            <div className="flex items-center space-x-2">
              {renderFilters()}
            </div>
          )}
        </div>
      </div>

      {/* Liste des entités */}
      <div className={`mb-8 ${className}`}>
        <EntityList
          entities={entities}
          isLoading={isLoading}
          error={error}
          emptyMessage={emptyMessage}
          columns={columns}
          getEntityHref={getEntityHref}
          renderCard={renderCard}
          renderActions={renderActions}
        />
      </div>

      {/* Pagination */}
      {!isLoading && !error && entities.length > 0 && (
        <EntityPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
