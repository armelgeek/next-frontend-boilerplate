'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LoadingSpinner } from '../atoms/loading-spinner';

interface BaseEntity {
  id: string;
  name?: string;
  title?: string;
  [key: string]: any;
}

interface EntityDetailPageProps<T extends BaseEntity> {
  // Navigation
  backUrl: string;
  backLabel?: string;
  
  // Données
  entity: T | null;
  isLoading: boolean;
  error?: Error | null;
  
  // Configuration
  title?: string;
  subtitle?: string;
  
  // Customisation
  renderContent?: (entity: T) => ReactNode;
  renderActions?: (entity: T) => ReactNode;
  renderSidebar?: (entity: T) => ReactNode;
  
  // Messages
  notFoundMessage?: string;
  
  // Classes CSS
  className?: string;
  containerClassName?: string;
}

export function EntityDetailPage<T extends BaseEntity>({
  backUrl,
  backLabel = 'Retour à la liste',
  entity,
  isLoading,
  error,
  title,
  subtitle,
  renderContent,
  renderActions,
  renderSidebar,
  notFoundMessage = 'Élément non trouvé.',
  className = '',
  containerClassName = 'container mx-auto px-4 py-8',
}: EntityDetailPageProps<T>) {
  // État de chargement
  if (isLoading) {
    return (
      <div className={containerClassName}>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className={containerClassName}>
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600 font-medium mb-2">Erreur lors du chargement</p>
            <p className="text-red-500 text-sm mb-4">{error.message}</p>
            <Link 
              href={backUrl} 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 underline"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Entité non trouvée
  if (!entity) {
    return (
      <div className={containerClassName}>
        <div className="text-center max-w-md mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-600 mb-4">{notFoundMessage}</p>
            <Link 
              href={backUrl} 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 underline"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayTitle = title || entity.name || entity.title || `Détail ${entity.id}`;

  // Contenu par défaut
  const defaultContent = (
    <div className="space-y-6">
      {/* Informations principales */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Informations générales</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">ID</dt>
              <dd className="text-sm text-gray-900 font-mono">{entity.id}</dd>
            </div>
            
            {entity.name && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Nom</dt>
                <dd className="text-sm text-gray-900">{entity.name}</dd>
              </div>
            )}
            
            {entity.description && (
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="text-sm text-gray-900 mt-1">{entity.description}</dd>
              </div>
            )}
            
            {entity.createdAt && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Créé le</dt>
                <dd className="text-sm text-gray-900">
                  {new Date(entity.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </dd>
              </div>
            )}
            
            {entity.updatedAt && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Modifié le</dt>
                <dd className="text-sm text-gray-900">
                  {new Date(entity.updatedAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Autres propriétés de l'entité */}
      {Object.entries(entity)
        .filter(([key]) => !['id', 'name', 'title', 'description', 'createdAt', 'updatedAt'].includes(key))
        .length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Détails supplémentaires</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(entity)
                .filter(([key]) => !['id', 'name', 'title', 'description', 'createdAt', 'updatedAt'].includes(key))
                .map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </dd>
                  </div>
                ))
              }
            </dl>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={containerClassName}>
      {/* Navigation et en-tête */}
      <div className="mb-6">
        <Link 
          href={backUrl} 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 underline mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {backLabel}
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{displayTitle}</h1>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          
          {renderActions && (
            <div className="flex items-center space-x-2">
              {renderActions(entity)}
            </div>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className={`grid gap-8 ${renderSidebar ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} ${className}`}>
        {/* Contenu principal */}
        <div className={renderSidebar ? 'lg:col-span-2' : 'lg:col-span-1'}>
          <div className="bg-white shadow-sm border rounded-lg p-6">
            {renderContent ? renderContent(entity) : defaultContent}
          </div>
        </div>

        {/* Sidebar */}
        {renderSidebar && (
          <div className="lg:col-span-1">
            {renderSidebar(entity)}
          </div>
        )}
      </div>
    </div>
  );
}
