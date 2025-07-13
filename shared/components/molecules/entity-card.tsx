'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useEntityPermissions } from '@/shared/hooks/use-permissions';
import { ProtectedButton } from './permission-components';

interface BaseEntity {
  id: string;
  name?: string;
  title?: string;
  [key: string]: any;
}

interface EntityCardProps<T extends BaseEntity> {
  entity: T;
  href: string;
  children?: ReactNode;
  className?: string;
  renderContent?: (entity: T) => ReactNode;
  renderActions?: (entity: T) => ReactNode;
}

export function EntityCard<T extends BaseEntity>({
  entity,
  href,
  children,
  className = '',
  renderContent,
  renderActions,
  entityName, // Nouveau prop pour les permissions
}: EntityCardProps<T> & { entityName?: string }) {
  const displayName = entity.name || entity.title || `Item ${entity.id}`;
  const { canUpdate, canDelete } = useEntityPermissions(entityName || 'entity', entity);

  const defaultContent = (
    <div>
      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{displayName}</h3>
      {entity.description && (
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {entity.description}
        </p>
      )}
      <div className="text-xs text-gray-500">
        {entity.createdAt && (
          <span>Créé le {new Date(entity.createdAt).toLocaleDateString('fr-FR')}</span>
        )}
      </div>
    </div>
  );

  const defaultActions = entityName ? (
    <div className="flex space-x-2">
      <ProtectedButton
        resource={entityName}
        action="update"
        targetResource={entity}
        variant="secondary"
        className="text-xs px-2 py-1"
        onClick={() => window.location.href = `${href}/edit`}
      >
        Modifier
      </ProtectedButton>
      <ProtectedButton
        resource={entityName}
        action="delete"
        targetResource={entity}
        variant="danger"
        className="text-xs px-2 py-1"
        onClick={() => {
          if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
            // Logique de suppression
          }
        }}
      >
        Supprimer
      </ProtectedButton>
    </div>
  ) : null;

  return (
    <div className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white ${className}`}>
      <Link href={href} className="block mb-3">
        {renderContent ? renderContent(entity) : defaultContent}
      </Link>
      
      {children}
      
      {(renderActions || defaultActions) && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2">
          {renderActions ? renderActions(entity) : defaultActions}
        </div>
      )}
    </div>
  );
}
