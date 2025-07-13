import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardService, widgetService, widgetTemplateService } from '../dashboard.service';
import { useToast } from '@/shared/hooks/use-toast';
import type { DashboardLayout, WidgetConfig, DashboardWidgetTemplate } from '../dashboard.schema';

// Hooks pour les dashboards
export function useDashboards() {
  return useQuery({
    queryKey: ['dashboards'],
    queryFn: () => dashboardService.list(),
  });
}

export function useDashboard(id: string) {
  return useQuery({
    queryKey: ['dashboard', id],
    queryFn: () => dashboardService.get(id),
    enabled: !!id,
  });
}

export function useDashboardActions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createDashboard = useMutation({
    mutationFn: (data: Partial<DashboardLayout>) => dashboardService.post('', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      toast({
        title: 'Succès',
        description: 'Dashboard créé avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateDashboard = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DashboardLayout> }) =>
      dashboardService.put(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      toast({
        title: 'Succès',
        description: 'Dashboard mis à jour avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteDashboard = useMutation({
    mutationFn: (id: string) => dashboardService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      toast({
        title: 'Succès',
        description: 'Dashboard supprimé avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const cloneDashboard = useMutation({
    mutationFn: (id: string) => dashboardService.post(`${id}/clone`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      toast({
        title: 'Succès',
        description: 'Dashboard dupliqué avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    createDashboard,
    updateDashboard,
    deleteDashboard,
    cloneDashboard,
    isCreating: createDashboard.isPending,
    isUpdating: updateDashboard.isPending,
    isDeleting: deleteDashboard.isPending,
    isCloning: cloneDashboard.isPending,
  };
}

// Hooks pour les widgets
export function useWidgets() {
  return useQuery({
    queryKey: ['widgets'],
    queryFn: () => widgetService.list(),
  });
}

export function useWidget(id: string) {
  return useQuery({
    queryKey: ['widget', id],
    queryFn: () => widgetService.get(id),
    enabled: !!id,
  });
}

export function useWidgetData(id: string, refreshInterval?: number) {
  return useQuery({
    queryKey: ['widget-data', id],
    queryFn: () => widgetService.get(`${id}/data`),
    enabled: !!id,
    refetchInterval: refreshInterval ? refreshInterval * 1000 : false,
  });
}

export function useWidgetActions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createWidget = useMutation({
    mutationFn: (data: Partial<WidgetConfig>) => widgetService.post('', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['widgets'] });
      toast({
        title: 'Succès',
        description: 'Widget créé avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateWidget = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WidgetConfig> }) =>
      widgetService.put(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['widget', id] });
      queryClient.invalidateQueries({ queryKey: ['widget-data', id] });
      queryClient.invalidateQueries({ queryKey: ['widgets'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteWidget = useMutation({
    mutationFn: (id: string) => widgetService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['widgets'] });
      toast({
        title: 'Succès',
        description: 'Widget supprimé avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    createWidget,
    updateWidget,
    deleteWidget,
    isCreating: createWidget.isPending,
    isUpdating: updateWidget.isPending,
    isDeleting: deleteWidget.isPending,
  };
}

// Hooks pour les templates de widgets
export function useWidgetTemplates() {
  return useQuery({
    queryKey: ['widget-templates'],
    queryFn: () => widgetTemplateService.list(),
  });
}

export function useWidgetTemplatesByCategory(category?: string) {
  return useQuery({
    queryKey: ['widget-templates', 'category', category],
    queryFn: () => widgetTemplateService.list(category ? { category } : undefined),
    enabled: !!category,
  });
}

export function useWidgetTemplate(id: string) {
  return useQuery({
    queryKey: ['widget-template', id],
    queryFn: () => widgetTemplateService.get(id),
    enabled: !!id,
  });
}

export function useWidgetCategories() {
  return useQuery({
    queryKey: ['widget-categories'],
    queryFn: () => widgetTemplateService.get('categories'),
  });
}
