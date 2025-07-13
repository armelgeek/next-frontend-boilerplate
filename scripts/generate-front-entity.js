#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function toPascalCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function toCamelCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function createDirectoryIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Dossier créé: ${dirPath}`);
  }
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Fichier créé: ${filePath}`);
}

function updateApiEndpoints(entityName) {
  const apiPath = path.join(process.cwd(), 'shared/config/api.ts');
  
  if (fs.existsSync(apiPath)) {
    let content = fs.readFileSync(apiPath, 'utf8');
    
    // Vérifier si l'entité existe déjà
    if (content.includes(`${entityName}:`)) {
      console.log(`⚠️  L'entité ${entityName} existe déjà dans API_ENDPOINTS`);
      return;
    }
    
    // Ajouter la nouvelle entité avant la fermeture de l'objet
    const newEndpoint = `  ${entityName}: {
    base: "/api/v1/${entityName}",
    create: "/api/v1/${entityName}",
    list: (qs: string = "") => \`/api/v1/${entityName}\${qs ? \`?\${qs}\` : ""}\`,
    detail: (id: string) => \`/api/v1/${entityName}/\${id}\`,
    update: (id: string) => \`/api/v1/${entityName}/\${id}\`,
    delete: (id: string) => \`/api/v1/${entityName}/\${id}\`
  },`;
    
    content = content.replace(/(export const API_ENDPOINTS = {[\s\S]*?)(};)/, `$1${newEndpoint}\n$2`);
    
    fs.writeFileSync(apiPath, content, 'utf8');
    console.log(`✓ API_ENDPOINTS mis à jour avec ${entityName}`);
  }
}

// Templates
const templates = {
  schema: (entityName, displayName) => `import { z } from 'zod';

export const ${toPascalCase(entityName)}Schema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  // TODO: Ajoutez vos champs spécifiques ici
});

export type ${toPascalCase(entityName)} = z.infer<typeof ${toPascalCase(entityName)}Schema>;
`,

  service: (entityName) => `import BaseService from '@/shared/lib/services/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';
import type { ${toPascalCase(entityName)} } from './${entityName}.schema';

export const ${toCamelCase(entityName)}Service = new BaseService<${toPascalCase(entityName)}>(
  API_ENDPOINTS.${entityName}
);
`,

  hooks: (entityName, entityNamePlural, displayName) => `import { useEntityList, useEntityDetail, useEntitySearch } from '@/shared/hooks/use-entity-query';
import { useEntityActions } from '@/shared/hooks/use-entity-actions';
import { useEntityListParams } from '@/shared/hooks/use-entity-list-params';
import { ${toCamelCase(entityName)}Service } from '../${entityName}.service';
import type { ${toPascalCase(entityName)} } from '../${entityName}.schema';

// Hook pour lister les ${entityNamePlural} avec paramètres URL
export function use${toPascalCase(entityName)}s() {
  const { params, toQueryString } = useEntityListParams({
    page: 1,
    limit: 12,
  });
  
  return useEntityList<${toPascalCase(entityName)}>({
    service: ${toCamelCase(entityName)}Service,
    queryKey: ['${entityNamePlural}', params],
    queryString: toQueryString(),
  });
}

// Hook pour récupérer un ${entityName} par ID
export function use${toPascalCase(entityName)}(id: string) {
  return useEntityDetail<${toPascalCase(entityName)}>({
    service: ${toCamelCase(entityName)}Service,
    queryKey: ['${entityName}'],
    id,
  });
}

// Hook pour rechercher des ${entityNamePlural}
export function use${toPascalCase(entityName)}Search(searchTerm: string) {
  return useEntitySearch<${toPascalCase(entityName)}>({
    service: ${toCamelCase(entityName)}Service,
    queryKey: ['${entityNamePlural}'],
    searchTerm,
  });
}

// Hook pour les actions CRUD
export function use${toPascalCase(entityName)}Actions() {
  return useEntityActions<${toPascalCase(entityName)}>({
    service: ${toCamelCase(entityName)}Service,
    queryKey: ['${entityNamePlural}'],
    entityName: '${displayName}',
  });
}

// Hook pour les paramètres de liste avec URL sync
export function use${toPascalCase(entityName)}ListParams() {
  return useEntityListParams({
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
}
`,

  // Template pour page de création/édition
  formPage: (entityName, displayName) => `'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { use${toPascalCase(entityName)}, use${toPascalCase(entityName)}Actions } from '@/features/${entityName}/hooks/use-${entityName}';
import { EntityForm } from '@/shared/components/molecules/entity-form';
import { ${toPascalCase(entityName)}Schema } from '@/features/${entityName}/${entityName}.schema';

interface ${toPascalCase(entityName)}FormPageProps {
  params?: {
    id?: string;
  };
}

export default function ${toPascalCase(entityName)}FormPage({ params }: ${toPascalCase(entityName)}FormPageProps) {
  const router = useRouter();
  const isEdit = !!params?.id;
  
  const { data: ${entityName}, isLoading: isLoadingEntity } = use${toPascalCase(entityName)}(params?.id || '');
  const { create, update, isCreating, isUpdating } = use${toPascalCase(entityName)}Actions();

  const handleSubmit = async (data: any) => {
    try {
      if (isEdit && params?.id) {
        await update({ id: params.id, data });
      } else {
        await create(data);
      }
      router.push('/${entityName}s');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleCancel = () => {
    router.push('/${entityName}s');
  };

  if (isEdit && isLoadingEntity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {isEdit ? \`Modifier \${${entityName}?.name || '${displayName}'}\` : \`Créer un ${displayName}\`}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEdit ? 'Modifiez les informations de ce ${displayName.toLowerCase()}' : 'Ajoutez un nouveau ${displayName.toLowerCase()}'}
        </p>
      </div>

      <div className="bg-white shadow-sm border rounded-lg p-6">
        <EntityForm
          schema={${toPascalCase(entityName)}Schema}
          onSubmit={handleSubmit}
          initialData={isEdit ? ${entityName} : undefined}
          isLoading={isCreating || isUpdating}
          mode={isEdit ? 'update' : 'create'}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
`,

  // Template pour la page de liste améliorée
  enhancedListPage: (entityName, entityNamePlural, displayName, displayNamePlural) => `'use client';

import { use${toPascalCase(entityName)}s, use${toPascalCase(entityName)}ListParams } from '@/features/${entityName}/hooks/use-${entityName}';
import { EntityPage } from '@/shared/components/organisms/entity-page';
import { EntityFilters, FilterOption } from '@/shared/components/molecules/entity-filters';
import { Button } from '@/shared/components/atoms/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ${toPascalCase(entityNamePlural)}Page() {
  const { params, setSearch, setPage, setSort, setParams, clearFilters } = use${toPascalCase(entityName)}ListParams();
  const { data: entities = [], isLoading, error } = use${toPascalCase(entityName)}s();

  // Configuration des filtres (à personnaliser selon vos besoins)
  const filterOptions: FilterOption[] = [
    {
      key: 'status',
      label: 'Statut',
      type: 'select',
      options: [
        { value: 'active', label: 'Actif' },
        { value: 'inactive', label: 'Inactif' },
      ],
    },
    {
      key: 'category',
      label: 'Catégorie',
      type: 'select',
      options: [
        { value: 'cat1', label: 'Catégorie 1' },
        { value: 'cat2', label: 'Catégorie 2' },
      ],
    },
  ];

  // Pagination simple côté client (adaptez pour votre API)
  const page = params.page || 1;
  const limit = params.limit || 12;
  const totalItems = entities.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedEntities = entities.slice(startIndex, startIndex + limit);

  return (
    <EntityPage
      title="${displayNamePlural}"
      subtitle="Gérez vos ${displayNamePlural.toLowerCase()}"
      entities={paginatedEntities}
      isLoading={isLoading}
      error={error as Error}
      searchTerm={params.search || ''}
      onSearchChange={setSearch}
      searchPlaceholder="Rechercher des ${displayNamePlural.toLowerCase()}..."
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      itemsPerPage={limit}
      onPageChange={setPage}
      getEntityHref={(entity) => \`/${entityNamePlural}/\${entity.id}\`}
      emptyMessage="Aucun ${displayName.toLowerCase()} trouvé."
      columns={3}
      renderHeader={() => (
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <EntityFilters
              filters={filterOptions}
              values={params}
              onChange={(key, value) => setParams({ [key]: value, page: 1 })}
              onClear={clearFilters}
            />
          </div>
          <Link href="/${entityNamePlural}/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un ${displayName.toLowerCase()}
            </Button>
          </Link>
        </div>
      )}
    />
  );
}
`,

  // Template pour la page de liste améliorée avec permissions
  enhancedListPageWithPermissions: (entityName, entityNamePlural, displayName, displayNamePlural) => `'use client';

import { use${toPascalCase(entityName)}s, use${toPascalCase(entityName)}ListParams } from '@/features/${entityName}/hooks/use-${entityName}';
import { useEntityPermissions } from '@/shared/hooks/use-permissions';
import { EntityPage } from '@/shared/components/organisms/entity-page';
import { EntityFilters, FilterOption } from '@/shared/components/molecules/entity-filters';
import { ProtectedButton, PermissionGate } from '@/shared/components/molecules/permission-components';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ${toPascalCase(entityNamePlural)}Page() {
  const { params, setSearch, setPage, setSort, setParams, clearFilters } = use${toPascalCase(entityName)}ListParams();
  const { data: entities = [], isLoading, error } = use${toPascalCase(entityName)}s();
  const { canCreate, canList } = useEntityPermissions('${entityName}');

  // Vérifier l'accès à la liste
  if (!canList) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès refusé</h1>
          <p className="text-gray-600">Vous n'avez pas les permissions pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  // Configuration des filtres (à personnaliser selon vos besoins)
  const filterOptions: FilterOption[] = [
    {
      key: 'status',
      label: 'Statut',
      type: 'select',
      options: [
        { value: 'active', label: 'Actif' },
        { value: 'inactive', label: 'Inactif' },
      ],
    },
    {
      key: 'category',
      label: 'Catégorie',
      type: 'select',
      options: [
        { value: 'cat1', label: 'Catégorie 1' },
        { value: 'cat2', label: 'Catégorie 2' },
      ],
    },
  ];

  // Pagination simple côté client (adaptez pour votre API)
  const page = params.page || 1;
  const limit = params.limit || 12;
  const totalItems = entities.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedEntities = entities.slice(startIndex, startIndex + limit);

  return (
    <EntityPage
      title="${displayNamePlural}"
      subtitle="Gérez vos ${displayNamePlural.toLowerCase()}"
      entities={paginatedEntities}
      isLoading={isLoading}
      error={error as Error}
      searchTerm={params.search || ''}
      onSearchChange={setSearch}
      searchPlaceholder="Rechercher des ${displayNamePlural.toLowerCase()}..."
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      itemsPerPage={limit}
      onPageChange={setPage}
      getEntityHref={(entity) => \`/${entityNamePlural}/\${entity.id}\`}
      emptyMessage="Aucun ${displayName.toLowerCase()} trouvé."
      columns={3}
      renderHeader={() => (
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <EntityFilters
              filters={filterOptions}
              values={params}
              onChange={(key, value) => setParams({ [key]: value, page: 1 })}
              onClear={clearFilters}
            />
          </div>
          
          <PermissionGate
            permissions={[{ resource: '${entityName}', action: 'create' }]}
            fallback={null}
          >
            <Link href="/${entityNamePlural}/create">
              <ProtectedButton
                resource="${entityName}"
                action="create"
                variant="primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un ${displayName.toLowerCase()}
              </ProtectedButton>
            </Link>
          </PermissionGate>
        </div>
      )}
    />
  );
}
`,

  // Template pour page de détail avec permissions
  detailPageWithPermissions: (entityName, entityNamePlural, displayName) => `'use client';

import { use${toPascalCase(entityName)} } from '@/features/${entityName}/hooks/use-${entityName}';
import { useEntityPermissions } from '@/shared/hooks/use-permissions';
import { EntityDetailPage } from '@/shared/components/organisms/entity-detail-page';
import { ProtectedButton, PermissionGate } from '@/shared/components/molecules/permission-components';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface ${toPascalCase(entityName)}DetailPageProps {
  params: {
    id: string;
  };
}

export default function ${toPascalCase(entityName)}DetailPage({ params }: ${toPascalCase(entityName)}DetailPageProps) {
  const { data: ${entityName}, isLoading, error } = use${toPascalCase(entityName)}(params.id);
  const { canRead, canUpdate, canDelete } = useEntityPermissions('${entityName}', ${entityName});

  // Vérifier l'accès en lecture
  if (!isLoading && !canRead) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès refusé</h1>
          <p className="text-gray-600">Vous n'avez pas les permissions pour voir ce ${displayName.toLowerCase()}.</p>
          <Link href="/${entityNamePlural}" className="text-blue-600 hover:text-blue-800 underline mt-4 inline-block">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce ${displayName.toLowerCase()} ?')) {
      // TODO: Implémenter la logique de suppression
      console.log('Suppression de', ${entityName}?.id);
    }
  };

  return (
    <EntityDetailPage
      entity={${entityName}}
      isLoading={isLoading}
      error={error as Error}
      backUrl="/${entityNamePlural}"
      backLabel="Retour aux ${displayNamePlural.toLowerCase()}"
      title={${entityName}?.name}
      subtitle="${displayName}"
      notFoundMessage="${displayName} non trouvé."
      renderActions={(entity) => (
        <div className="flex items-center space-x-2">
          <PermissionGate
            permissions={[{ resource: '${entityName}', action: 'update' }]}
          >
            <Link href={\`/${entityNamePlural}/\${entity.id}/edit\`}>
              <ProtectedButton
                resource="${entityName}"
                action="update"
                targetResource={entity}
                variant="secondary"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </ProtectedButton>
            </Link>
          </PermissionGate>
          
          <PermissionGate
            permissions={[{ resource: '${entityName}', action: 'delete' }]}
          >
            <ProtectedButton
              resource="${entityName}"
              action="delete"
              targetResource={entity}
              variant="danger"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </ProtectedButton>
          </PermissionGate>
        </div>
      )}
    />
  );
}
`,

  layout: (displayNamePlural) => `export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>
    </div>
  );
}
`,

  mock: (entityName, entityNamePlural, displayName) => `import type { ${toPascalCase(entityName)} } from './${entityName}.schema';

// Données mock pour ${displayName}
export const mock${toPascalCase(entityNamePlural)}: ${toPascalCase(entityName)}[] = [
  {
    id: '1',
    name: '${displayName} 1',
    description: 'Description du premier ${displayName.toLowerCase()}',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: '${displayName} 2',
    description: 'Description du deuxième ${displayName.toLowerCase()}',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: '${displayName} 3',
    description: 'Description du troisième ${displayName.toLowerCase()}',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Service mock avec persistance localStorage
class Mock${toPascalCase(entityName)}Service {
  private storageKey = 'mock_${entityNamePlural}';
  
  private getData(): ${toPascalCase(entityName)}[] {
    if (typeof window === 'undefined') return mock${toPascalCase(entityNamePlural)};
    
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : mock${toPascalCase(entityNamePlural)};
  }
  
  private saveData(data: ${toPascalCase(entityName)}[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
  }
  
  async list(queryString?: string): Promise<${toPascalCase(entityName)}[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let result = this.getData();
    
    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      const search = searchParams.get('search');
      
      if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(item => 
          item.name?.toLowerCase().includes(searchLower) ||
          (item.description && item.description.toLowerCase().includes(searchLower))
        );
      }
    }
    
    return result;
  }
  
  async detail(id: string): Promise<${toPascalCase(entityName)} | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const data = this.getData();
    return data.find(item => item.id === id) || null;
  }
  
  async create(data: Omit<${toPascalCase(entityName)}, 'id' | 'createdAt' | 'updatedAt'>): Promise<${toPascalCase(entityName)}> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const items = this.getData();
    const newItem: ${toPascalCase(entityName)} = {
      ...data,
      id: (items.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    items.push(newItem);
    this.saveData(items);
    return newItem;
  }
  
  async update(id: string, data: Partial<Omit<${toPascalCase(entityName)}, 'id' | 'createdAt'>>): Promise<${toPascalCase(entityName)} | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const items = this.getData();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    items[index] = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    this.saveData(items);
    return items[index];
  }
  
  async delete(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const items = this.getData();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    items.splice(index, 1);
    this.saveData(items);
    return true;
  }
}

export const mock${toPascalCase(entityName)}Service = new Mock${toPascalCase(entityName)}Service();
`
};

async function generateEntity() {
  console.log('🚀 Générateur d\'entité front-office\n');
  
  try {
    // Questions interactives
    const answers = {
      entityName: await prompt('Nom de l\'entité (singulier, ex: product) : '),
      displayName: await prompt('Nom d\'affichage (ex: Produit) : '),
      displayNamePlural: await prompt('Nom d\'affichage pluriel (ex: Produits) : '),
      advanced: (await prompt('Générer avec fonctionnalités avancées ? (y/n) : ')).toLowerCase() === 'y',
      permissions: false,
      forms: false
    };

    // Questions conditionnelles pour les fonctionnalités avancées
    if (answers.advanced) {
      answers.permissions = (await prompt('Inclure la gestion des permissions ? (y/n) : ')).toLowerCase() === 'y';
      answers.forms = (await prompt('Générer les formulaires complets ? (y/n) : ')).toLowerCase() === 'y';
    }

    const entityName = answers.entityName;
    const entityNamePlural = answers.displayNamePlural;
    const displayName = answers.displayName;
    const displayNamePlural = answers.displayNamePlural;
    const useMock = await prompt('Utiliser un service mock ? (y/n) : ');
    
    console.log('\n📁 Création des dossiers...');
    
    // Créer les dossiers
    const featurePath = path.join(process.cwd(), 'features', entityName);
    const hooksPath = path.join(featurePath, 'hooks');
    const pagesPath = path.join(process.cwd(), 'app', '(root)', entityNamePlural);
    const detailPath = path.join(pagesPath, '[id]');
    
    createDirectoryIfNotExists(featurePath);
    createDirectoryIfNotExists(hooksPath);
    createDirectoryIfNotExists(pagesPath);
    createDirectoryIfNotExists(detailPath);
    
    console.log('\n📝 Génération des fichiers...');
    
    // Générer les fichiers
    writeFile(
      path.join(featurePath, `${entityName}.schema.ts`),
      templates.schema(entityName, displayName)
    );
    
    writeFile(
      path.join(featurePath, `${entityName}.service.ts`),
      templates.service(entityName)
    );
    
    if (useMock.toLowerCase() === 'y') {
      writeFile(
        path.join(featurePath, `${entityName}.mock.ts`),
        templates.mock(entityName, entityNamePlural, displayName)
      );
    }
    
    writeFile(
      path.join(hooksPath, `use-${entityName}.ts`),
      templates.hooks(entityName, entityNamePlural, displayName)
    );
    
    writeFile(
      path.join(pagesPath, 'page.tsx'),
      templates.listPage(entityName, entityNamePlural, displayName, displayNamePlural)
    );
    
    writeFile(
      path.join(pagesPath, 'layout.tsx'),
      templates.layout(displayNamePlural)
    );
    
    // Créer la page de détail
    const detailPageDir = path.join(appDir, entityNamePlural, '[id]');
    if (!fs.existsSync(detailPageDir)) {
      fs.mkdirSync(detailPageDir, { recursive: true });
    }

    if (answers.advanced && answers.permissions) {
      fs.writeFileSync(
        path.join(detailPageDir, 'page.tsx'),
        templates.detailPageWithPermissions(entityName, entityNamePlural, displayName)
      );
    } else if (answers.advanced) {
      fs.writeFileSync(
        path.join(detailPageDir, 'page.tsx'),
        templates.enhancedDetailPage(entityName, entityNamePlural, displayName)
      );
    } else {
      fs.writeFileSync(
        path.join(detailPageDir, 'page.tsx'),
        templates.simplePage(entityName, entityNamePlural, displayName, displayNamePlural)
      );
    }

    if (answers.advanced && answers.permissions) {
      console.log(`📄 Page de détail créée avec permissions : app/(root)/${entityNamePlural}/[id]/page.tsx`);
    } else {
      console.log(`📄 Page de détail créée : app/(root)/${entityNamePlural}/[id]/page.tsx`);
    }

    // Mettre à jour API_ENDPOINTS
    console.log('\n🔧 Mise à jour de la configuration...');
    updateApiEndpoints(entityName);
    
    console.log('\n✅ Génération terminée !');
    console.log(`\n📋 Fichiers créés :`);
    console.log(`   - features/${entityName}/${entityName}.schema.ts`);
    console.log(`   - features/${entityName}/${entityName}.service.ts`);
    if (useMock.toLowerCase() === 'y') {
      console.log(`   - features/${entityName}/${entityName}.mock.ts`);
    }
    console.log(`   - features/${entityName}/hooks/use-${entityName}.ts`);
    console.log(`   - app/(root)/${entityNamePlural}/page.tsx`);
    console.log(`   - app/(root)/${entityNamePlural}/layout.tsx`);
    console.log(`   - app/(root)/${entityNamePlural}/[id]/page.tsx`);
    console.log(`\n🌐 URLs générées :`);
    console.log(`   - Liste : /${entityNamePlural}`);
    console.log(`   - Détail : /${entityNamePlural}/[id]`);
    
    console.log(`\n🔧 Prochaines étapes :`);
    console.log(`   1. Personnalisez le schéma dans ${entityName}.schema.ts`);
    if (useMock.toLowerCase() === 'y') {
      console.log(`   2. Modifiez les données mock dans ${entityName}.mock.ts`);
      console.log(`   3. Pour utiliser le mock, importez et utilisez mock${toPascalCase(entityName)}Service`);
    } else {
      console.log(`   2. Implémentez votre API backend pour /api/v1/${entityName}`);
    }
    console.log(`   4. Testez vos pages sur /${entityNamePlural}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération :', error.message);
  } finally {
    rl.close();
  }
}

generateEntity();
