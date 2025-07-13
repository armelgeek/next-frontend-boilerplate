import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { useToast } from './use-toast';

interface BaseEntity {
  id: string;
  [key: string]: any;
}

interface EntityService<T> {
  create?: (data: Omit<T, 'id'>) => Promise<T>;
  update?: (id: string, data: Partial<T>) => Promise<T>;
  delete?: (id: string) => Promise<boolean>;
}

interface UseEntityActionsOptions<T> {
  service: EntityService<T>;
  queryKey: string[];
  entityName?: string;
  onSuccess?: {
    create?: (data: T) => void;
    update?: (data: T) => void;
    delete?: (id: string) => void;
  };
  onError?: {
    create?: (error: Error) => void;
    update?: (error: Error) => void;
    delete?: (error: Error) => void;
  };
}

export function useEntityActions<T extends BaseEntity>(options: UseEntityActionsOptions<T>) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const entityName = options.entityName || 'entité';

  // Fonction pour invalider les queries liées à l'entité
  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: options.queryKey });
  };

  // Mutation pour créer une entité
  const createMutation = useMutation({
    mutationFn: (data: Omit<T, 'id'>) => {
      if (!options.service.create) {
        throw new Error(`Service de création non disponible pour ${entityName}`);
      }
      return options.service.create(data);
    },
    onSuccess: (data) => {
      invalidateQueries();
      toast({
        title: 'Succès',
        description: `${entityName} créé(e) avec succès`,
      });
      options.onSuccess?.create?.(data);
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: `Erreur lors de la création : ${error.message}`,
        variant: 'destructive',
      });
      options.onError?.create?.(error);
    },
  });

  // Mutation pour mettre à jour une entité
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T> }) => {
      if (!options.service.update) {
        throw new Error(`Service de mise à jour non disponible pour ${entityName}`);
      }
      return options.service.update(id, data);
    },
    onSuccess: (data) => {
      invalidateQueries();
      toast({
        title: 'Succès',
        description: `${entityName} mis(e) à jour avec succès`,
      });
      options.onSuccess?.update?.(data);
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: `Erreur lors de la mise à jour : ${error.message}`,
        variant: 'destructive',
      });
      options.onError?.update?.(error);
    },
  });

  // Mutation pour supprimer une entité
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      if (!options.service.delete) {
        throw new Error(`Service de suppression non disponible pour ${entityName}`);
      }
      return options.service.delete(id);
    },
    onSuccess: (_, id) => {
      invalidateQueries();
      toast({
        title: 'Succès',
        description: `${entityName} supprimé(e) avec succès`,
      });
      options.onSuccess?.delete?.(id);
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: `Erreur lors de la suppression : ${error.message}`,
        variant: 'destructive',
      });
      options.onError?.delete?.(error);
    },
  });

  return {
    // Actions
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    
    // Async actions
    createAsync: createMutation.mutateAsync,
    updateAsync: updateMutation.mutateAsync,
    deleteAsync: deleteMutation.mutateAsync,
    
    // États
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    
    // Erreurs
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    
    // Utilitaires
    invalidateQueries,
    reset: () => {
      createMutation.reset();
      updateMutation.reset();
      deleteMutation.reset();
    },
  };
}
