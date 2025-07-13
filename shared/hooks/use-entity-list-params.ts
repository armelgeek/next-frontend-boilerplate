import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export interface EntityListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: any;
}

export function useEntityListParams(defaultParams: EntityListParams = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Récupérer les paramètres actuels
  const getParams = useCallback((): EntityListParams => {
    const params: EntityListParams = { ...defaultParams };
    
    // Page
    const page = searchParams.get('page');
    if (page) params.page = parseInt(page, 10);
    
    // Limite
    const limit = searchParams.get('limit');
    if (limit) params.limit = parseInt(limit, 10);
    
    // Recherche
    const search = searchParams.get('search');
    if (search) params.search = search;
    
    // Tri
    const sortBy = searchParams.get('sortBy');
    if (sortBy) params.sortBy = sortBy;
    
    const sortOrder = searchParams.get('sortOrder');
    if (sortOrder && (sortOrder === 'asc' || sortOrder === 'desc')) {
      params.sortOrder = sortOrder;
    }
    
    // Autres paramètres dynamiques
    searchParams.forEach((value, key) => {
      if (!['page', 'limit', 'search', 'sortBy', 'sortOrder'].includes(key)) {
        params[key] = value;
      }
    });
    
    return params;
  }, [searchParams, defaultParams]);

  // Mettre à jour les paramètres
  const setParams = useCallback((newParams: Partial<EntityListParams>) => {
    const current = getParams();
    const updated = { ...current, ...newParams };
    
    // Construire la nouvelle URL
    const params = new URLSearchParams();
    
    Object.entries(updated).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });
    
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  }, [getParams, pathname, router]);

  // Méthodes utilitaires
  const setPage = useCallback((page: number) => {
    setParams({ page });
  }, [setParams]);

  const setSearch = useCallback((search: string) => {
    setParams({ search, page: 1 }); // Reset à la page 1 lors d'une recherche
  }, [setParams]);

  const setSort = useCallback((sortBy: string, sortOrder: 'asc' | 'desc' = 'asc') => {
    setParams({ sortBy, sortOrder, page: 1 });
  }, [setParams]);

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  // Générer la query string pour l'API
  const toQueryString = useCallback((): string => {
    const params = getParams();
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.set(key, String(value));
      }
    });
    
    return queryParams.toString();
  }, [getParams]);

  return {
    params: getParams(),
    setParams,
    setPage,
    setSearch,
    setSort,
    clearFilters,
    toQueryString,
  };
}
