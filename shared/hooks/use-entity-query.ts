import { useQuery, useMutation, QueryKey } from '@tanstack/react-query';
import BaseService from '../lib/services/base-service';

export function useEntityQuery<T, TVariables = unknown, TSelected = T>({
  service,
  queryKey,
  params,
  enabled = true,
  mutationFn,
  mutationOptions,
  select,
}: {
  service: BaseService;
  queryKey: QueryKey;
  params?: Record<string, unknown>;
  enabled?: boolean;
  mutationFn?: (variables: TVariables) => Promise<unknown>;
  mutationOptions?: Record<string, unknown>;
  select?: (data: T) => TSelected;
}) {
  const query = useQuery<T, Error, TSelected>({
    queryKey: [queryKey, params],
    queryFn: () => service.get<T>('', params as Record<string, string> | undefined).then(r => r.data),
    enabled,
    select,
  });
  const mutation = useMutation({
    mutationFn: mutationFn ?? ((variables: TVariables) => service.post('', variables)),
    ...mutationOptions,
    onSuccess: mutationOptions && typeof mutationOptions.onSuccess === 'function'
      ? (...args: unknown[]) => (mutationOptions.onSuccess as (...args: unknown[]) => void)(...args)
      : undefined,
  });
  const update = useMutation({
    mutationFn: (variables: TVariables & { id: string }) => service.put(`/${variables.id}`, variables),
    ...mutationOptions,
  });
  const remove = useMutation({
    mutationFn: (id: string) => service.delete(`/${id}`),
    ...mutationOptions,
  });
  const patch = useMutation({
    mutationFn: (variables: TVariables & { id: string }) => service.patch(`/${variables.id}`, variables),
    ...mutationOptions,
  });
  return { ...query, mutation, update, remove, patch };
}

// Types pour les entités de base
interface BaseEntity {
  id: string;
  [key: string]: any;
}

interface EntityService<T> {
  list: (queryString?: string) => Promise<T[]>;
  detail: (id: string) => Promise<T | null>;
  create?: (data: Omit<T, 'id'>) => Promise<T>;
  update?: (id: string, data: Partial<T>) => Promise<T>;
  delete?: (id: string) => Promise<boolean>;
}

interface UseEntityListOptions<T> {
  service: EntityService<T>;
  queryKey: string[];
  queryString?: string;
  enabled?: boolean;
  staleTime?: number;
}

interface UseEntityDetailOptions<T> {
  service: EntityService<T>;
  queryKey: string[];
  id: string;
  enabled?: boolean;
  staleTime?: number;
}

interface UseEntitySearchOptions<T> {
  service: EntityService<T>;
  queryKey: string[];
  searchTerm: string;
  minLength?: number;
  enabled?: boolean;
  staleTime?: number;
}

// Hook générique pour lister des entités
export function useEntityList<T extends BaseEntity>(options: UseEntityListOptions<T>) {
  return useQuery({
    queryKey: [...options.queryKey, 'list', options.queryString || ''],
    queryFn: () => options.service.list(options.queryString),
    enabled: options.enabled !== false,
    staleTime: options.staleTime || 5 * 60 * 1000, // 5 minutes par défaut
  });
}

// Hook générique pour récupérer une entité par ID
export function useEntityDetail<T extends BaseEntity>(options: UseEntityDetailOptions<T>) {
  return useQuery({
    queryKey: [...options.queryKey, 'detail', options.id],
    queryFn: () => options.service.detail(options.id),
    enabled: options.enabled !== false && !!options.id,
    staleTime: options.staleTime || 5 * 60 * 1000,
  });
}

// Hook générique pour la recherche
export function useEntitySearch<T extends BaseEntity>(options: UseEntitySearchOptions<T>) {
  const minLength = options.minLength || 2;
  const queryString = options.searchTerm ? `search=${encodeURIComponent(options.searchTerm)}` : '';
  
  return useQuery({
    queryKey: [...options.queryKey, 'search', options.searchTerm],
    queryFn: () => options.service.list(queryString),
    enabled: options.enabled !== false && options.searchTerm.length >= minLength,
    staleTime: options.staleTime || 2 * 60 * 1000, // 2 minutes pour les recherches
  });
}
