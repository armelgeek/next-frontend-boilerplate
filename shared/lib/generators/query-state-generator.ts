import { z } from 'zod';
import { parseAsInteger, parseAsString, parseAsStringLiteral, parseAsBoolean, parseAsIsoDateTime, parseAsJson } from 'nuqs';

// Types et schemas pour la gestion d'état URL
export const QueryStateTypeSchema = z.enum([
  'string',
  'number', 
  'boolean',
  'enum',
  'array',
  'date',
  'json'
]);

export const QueryParamConfigSchema = z.object({
  key: z.string(),
  type: QueryStateTypeSchema,
  defaultValue: z.unknown().optional(),
  options: z.array(z.string()).optional(), // Pour les enums
  validator: z.function().optional(),
  serialize: z.function().optional(),
  deserialize: z.function().optional(),
  serverOnly: z.boolean().default(false),
  shallow: z.boolean().default(true),
  history: z.enum(['push', 'replace']).default('replace'),
});

export const QueryStateConfigSchema = z.object({
  entity: z.string(),
  params: z.array(QueryParamConfigSchema),
  generateHook: z.boolean().default(true),
  generateUtils: z.boolean().default(true),
  typescript: z.boolean().default(true),
});

export type QueryStateType = z.infer<typeof QueryStateTypeSchema>;
export type QueryParamConfig = z.infer<typeof QueryParamConfigSchema>;
export type QueryStateConfig = z.infer<typeof QueryStateConfigSchema>;

// Templates prédéfinis pour différents cas d'usage
const QueryStateTemplatesInternal = {
  // Template pour pagination
  pagination: {
    entity: 'pagination',
    params: [
      {
        key: 'page',
        type: 'number' as QueryStateType,
        defaultValue: 1,
        validator: (value: number) => value > 0,
      },
      {
        key: 'pageSize', 
        type: 'number' as QueryStateType,
        defaultValue: 10,
        validator: (value: number) => [10, 20, 50, 100].includes(value),
      },
    ],
  },

  // Template pour recherche et filtres
  search: {
    entity: 'search',
    params: [
      {
        key: 'q',
        type: 'string' as QueryStateType,
        defaultValue: '',
      },
      {
        key: 'category',
        type: 'string' as QueryStateType,
        defaultValue: '',
      },
      {
        key: 'status',
        type: 'enum' as QueryStateType,
        defaultValue: 'all',
        options: ['all', 'active', 'inactive', 'pending'],
      },
    ],
  },

  // Template pour tri
  sorting: {
    entity: 'sorting',
    params: [
      {
        key: 'sortBy',
        type: 'string' as QueryStateType,
        defaultValue: 'created_at',
      },
      {
        key: 'sortDir',
        type: 'enum' as QueryStateType,
        defaultValue: 'desc',
        options: ['asc', 'desc'],
      },
    ],
  },

  // Template pour tableau admin complet
  adminTable: {
    entity: 'adminTable',
    params: [
      {
        key: 'q',
        type: 'string' as QueryStateType,
        defaultValue: '',
      },
      {
        key: 'page',
        type: 'number' as QueryStateType,
        defaultValue: 1,
      },
      {
        key: 'pageSize',
        type: 'number' as QueryStateType,
        defaultValue: 10,
      },
      {
        key: 'sortBy',
        type: 'string' as QueryStateType,
        defaultValue: '',
      },
      {
        key: 'sortDir',
        type: 'enum' as QueryStateType,
        defaultValue: 'asc',
        options: ['asc', 'desc'],
      },
      {
        key: 'filters',
        type: 'json' as QueryStateType,
        defaultValue: {},
      },
    ],
  },

  // Template pour e-commerce
  ecommerce: {
    entity: 'ecommerce',
    params: [
      {
        key: 'category',
        type: 'string' as QueryStateType,
        defaultValue: '',
      },
      {
        key: 'priceMin',
        type: 'number' as QueryStateType,
        defaultValue: 0,
      },
      {
        key: 'priceMax',
        type: 'number' as QueryStateType,
        defaultValue: 1000,
      },
      {
        key: 'rating',
        type: 'number' as QueryStateType,
        defaultValue: 0,
      },
      {
        key: 'inStock',
        type: 'boolean' as QueryStateType,
        defaultValue: false,
      },
    ],
  },

  // Template pour dashboard avec filtres temporels
  dashboard: {
    entity: 'dashboard',
    params: [
      {
        key: 'period',
        type: 'enum' as QueryStateType,
        defaultValue: '7d',
        options: ['1d', '7d', '30d', '90d', '1y'],
      },
      {
        key: 'startDate',
        type: 'date' as QueryStateType,
        defaultValue: null,
      },
      {
        key: 'endDate',
        type: 'date' as QueryStateType,
        defaultValue: null,
      },
      {
        key: 'metric',
        type: 'enum' as QueryStateType,
        defaultValue: 'revenue',
        options: ['revenue', 'users', 'orders', 'sessions'],
      },
    ],
  },
};

export class QueryStateGenerator {
  /**
   * Génère un hook personnalisé pour la gestion d'état URL
   */
  static generateHook(config: QueryStateConfig): string {
    const { entity, params } = config;
    const hookName = `use${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryState`;
    
    const imports = this.generateImports(params);
    const hookContent = this.generateHookContent(params);
    const returnType = this.generateReturnType(params, entity);
    
    return `${imports}

export interface ${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryState {
${params.map(param => `  ${param.key}: ${this.getTypeScriptType(param)};`).join('\n')}
}

export interface ${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryActions {
${params.map(param => `  set${param.key.charAt(0).toUpperCase() + param.key.slice(1)}: (value: ${this.getTypeScriptType(param)} | null) => void;`).join('\n')}
  reset: () => void;
  getQueryObject: () => Record<string, unknown>;
}

export function ${hookName}(): ${returnType} {
${hookContent}

  const reset = () => {
${params.map(param => `    set${param.key.charAt(0).toUpperCase() + param.key.slice(1)}(null);`).join('\n')}
  };

  const getQueryObject = () => ({
${params.map(param => `    ${param.key},`).join('\n')}
  });

  return {
    // State
${params.map(param => `    ${param.key},`).join('\n')}
    
    // Actions
${params.map(param => `    set${param.key.charAt(0).toUpperCase() + param.key.slice(1)},`).join('\n')}
    reset,
    getQueryObject,
  };
}`;
  }

  /**
   * Génère les imports nécessaires
   */
  private static generateImports(params: QueryParamConfig[]): string {
    const needsParseAsInteger = params.some(p => p.type === 'number');
    const needsParseAsString = params.some(p => p.type === 'string' || p.type === 'enum');
    const needsParseAsBoolean = params.some(p => p.type === 'boolean');
    const needsParseAsDate = params.some(p => p.type === 'date');
    const needsParseAsJson = params.some(p => p.type === 'json');

    const imports = ['useQueryState'];
    if (needsParseAsInteger) imports.push('parseAsInteger');
    if (needsParseAsString) imports.push('parseAsString');
    if (needsParseAsBoolean) imports.push('parseAsBoolean');
    if (needsParseAsDate) imports.push('parseAsIsoDateTime');
    if (needsParseAsJson) imports.push('parseAsJson');

    return `import { ${imports.join(', ')} } from 'nuqs';`;
  }

  /**
   * Génère le contenu principal du hook
   */
  private static generateHookContent(params: QueryParamConfig[]): string {
    return params.map(param => {
      const parser = this.getParser(param);
      const options = parser ? `, ${parser}` : '';
      
      return `  const [${param.key}, set${param.key.charAt(0).toUpperCase() + param.key.slice(1)}] = useQueryState('${param.key}'${options});`;
    }).join('\n');
  }

  /**
   * Génère le type de retour du hook
   */
  private static generateReturnType(params: QueryParamConfig[], entity: string): string {
    const stateName = `${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryState`;
    const actionsName = `${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryActions`;
    return `${stateName} & ${actionsName}`;
  }

  /**
   * Détermine le parser nuqs approprié pour un paramètre
   */
  private static getParser(param: QueryParamConfig): string {
    switch (param.type) {
      case 'number':
        return `parseAsInteger.withDefault(${param.defaultValue})`;
      case 'boolean':
        return `parseAsBoolean.withDefault(${param.defaultValue})`;
      case 'date':
        return `parseAsIsoDateTime.withDefault(${param.defaultValue ? `new Date('${param.defaultValue}')` : 'null'})`;
      case 'json':
        return `parseAsJson().withDefault(${JSON.stringify(param.defaultValue)})`;
      case 'enum':
        if (param.options && param.options.length > 0) {
          return `parseAsStringLiteral([${param.options.map(opt => `'${opt}'`).join(', ')}]).withDefault('${param.defaultValue}')`;
        }
        return `parseAsString.withDefault('${param.defaultValue}')`;
      case 'string':
      default:
        return `parseAsString.withDefault('${param.defaultValue}')`;
    }
  }

  /**
   * Détermine le type TypeScript pour un paramètre
   */
  private static getTypeScriptType(param: QueryParamConfig): string {
    switch (param.type) {
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'date':
        return 'Date | null';
      case 'json':
        return 'Record<string, unknown>';
      case 'enum':
        if (param.options && param.options.length > 0) {
          return param.options.map(opt => `'${opt}'`).join(' | ');
        }
        return 'string';
      case 'array':
        return 'string[]';
      case 'string':
      default:
        return 'string';
    }
  }

  /**
   * Génère un hook combiné avec plusieurs templates
   */
  static generateCombinedHook(name: string, templates: string[]): string {
    const configs = templates.map(template => QueryStateTemplates[template as keyof typeof QueryStateTemplates]);
    const allParams = configs.reduce((acc, config) => [...acc, ...config.params], [] as QueryParamConfig[]);
    
    const combinedConfig: QueryStateConfig = {
      entity: name,
      params: allParams,
    };

    return this.generateHook(combinedConfig);
  }

  /**
   * Génère des utilitaires pour la manipulation de query state
   */
  static generateUtils(entity: string): string {
    return `// Utilitaires pour ${entity}
export const ${entity}QueryUtils = {
  /**
   * Construit une URL avec les paramètres de query
   */
  buildUrl(baseUrl: string, params: Record<string, unknown>): string {
    const url = new URL(baseUrl, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (typeof value === 'object') {
          url.searchParams.set(key, JSON.stringify(value));
        } else {
          url.searchParams.set(key, String(value));
        }
      }
    });
    return url.toString();
  },

  /**
   * Parse les paramètres de query depuis une URL
   */
  parseFromUrl(url: string): Record<string, unknown> {
    const urlObj = new URL(url);
    const params: Record<string, unknown> = {};
    
    urlObj.searchParams.forEach((value, key) => {
      try {
        // Essaie de parser comme JSON
        params[key] = JSON.parse(value);
      } catch {
        // Sinon garde comme string
        params[key] = value;
      }
    });
    
    return params;
  },

  /**
   * Génère un état de query par défaut
   */
  getDefaultState(): Record<string, unknown> {
    return {
      // À personnaliser selon l'entité
    };
  },

  /**
   * Valide les paramètres de query
   */
  validateParams(params: Record<string, unknown>): boolean {
    // À personnaliser selon l'entité
    return true;
  },
};`;
  }

  /**
   * Génère un provider React pour centraliser l'état
   */
  static generateProvider(entity: string): string {
    const providerName = `${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryProvider`;
    const hookName = `use${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryState`;
    const contextName = `${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryContext`;

    return `import React, { createContext, useContext, ReactNode } from 'react';
import { ${hookName} } from './${entity}-query-state';

type ${contextName}Type = ReturnType<typeof ${hookName}> | null;

const ${contextName} = createContext<${contextName}Type>(null);

export function ${providerName}({ children }: { children: ReactNode }) {
  const queryState = ${hookName}();

  return (
    <${contextName}.Provider value={queryState}>
      {children}
    </${contextName}.Provider>
  );
}

export function use${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryContext() {
  const context = useContext(${contextName});
  if (!context) {
    throw new Error('use${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryContext must be used within ${providerName}');
  }
  return context;
}`;
  }

  /**
   * Génère les types TypeScript pour l'entité
   */
  static generateTypes(config: QueryStateConfig): string {
    const { entity, params } = config;
    
    return `// Types pour ${entity} query state
export interface ${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryParams {
${params.map(param => `  ${param.key}?: ${this.getTypeScriptType(param)};`).join('\n')}
}

export interface ${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryMeta {
  entity: '${entity}';
  version: string;
  lastUpdated: Date;
}

export type ${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryFilter = {
  [K in keyof ${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryParams]: ${entity.charAt(0).toUpperCase() + entity.slice(1)}QueryParams[K];
};`;
  }
}

// Export des templates pour utilisation directe
export { QueryStateTemplates };

// Fonction helper pour générer rapidement un hook d'état de query
export function createQueryStateHook(entityName: string, templateNames: (keyof typeof QueryStateTemplates)[]): string {
  return QueryStateGenerator.generateCombinedHook(entityName, templateNames);
}

// Fonctions helpers pour les cas d'usage courants
export const QueryStateHelpers = {
  // Hook pour pagination simple
  generatePaginationHook: (entityName: string) => 
    QueryStateGenerator.generateHook({
      entity: entityName,
      params: QueryStateTemplates.pagination.params,
    }),

  // Hook pour recherche et filtres
  generateSearchHook: (entityName: string) =>
    QueryStateGenerator.generateHook({
      entity: entityName,
      params: QueryStateTemplates.search.params,
    }),

  // Hook complet pour admin table
  generateAdminTableHook: (entityName: string) =>
    QueryStateGenerator.generateHook({
      entity: entityName,
      params: QueryStateTemplates.adminTable.params,
    }),

  // Hook pour e-commerce
  generateEcommerceHook: (entityName: string) =>
    QueryStateGenerator.generateHook({
      entity: entityName,
      params: QueryStateTemplates.ecommerce.params,
    }),
};
