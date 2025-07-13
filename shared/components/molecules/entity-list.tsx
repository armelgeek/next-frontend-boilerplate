'use client';

import { ReactNode } from 'react';
import { EntityCard } from './entity-card';
import { LoadingSpinner } from '../atoms/loading-spinner';

interface BaseEntity {
  id: string;
  name?: string;
  title?: string;
  [key: string]: any;
}

interface EntityListProps<T extends BaseEntity> {
  entities: T[];
  isLoading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  renderCard?: (entity: T) => ReactNode;
  getEntityHref: (entity: T) => string;
  renderActions?: (entity: T) => ReactNode;
}

export function EntityList<T extends BaseEntity>({
  entities,
  isLoading,
  error,
  emptyMessage = 'Aucun élément trouvé.',
  className = '',
  columns = 3,
  renderCard,
  getEntityHref,
  renderActions,
}: EntityListProps<T>) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-red-600 font-medium">Erreur lors du chargement</p>
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!entities || entities.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-gray-600">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-4 ${className}`}>
      {entities.map((entity) => {
        if (renderCard) {
          return <div key={entity.id}>{renderCard(entity)}</div>;
        }

        return (
          <EntityCard
            key={entity.id}
            entity={entity}
            href={getEntityHref(entity)}
            renderActions={renderActions}
          />
        );
      })}
    </div>
  );
}
