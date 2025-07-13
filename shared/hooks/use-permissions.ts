import { useAuth } from '@/features/auth/hooks/useAuth';
import { useMemo } from 'react';

export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'list' | 'export' | 'import';
  scope?: 'own' | 'all' | 'department' | 'organization';
}

export interface UserPermissions {
  permissions: Permission[];
  roles: string[];
  isAdmin?: boolean;
}

export interface PermissionRule {
  resource: string;
  actions: {
    [key in Permission['action']]?: {
      allowed: boolean;
      scope?: Permission['scope'];
      condition?: (user: any, resource?: any) => boolean;
    };
  };
}

// Extension du type User pour inclure les permissions
interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  role?: 'user' | 'admin';
  permissions?: Permission[];
  roles?: string[];
  isAdmin?: boolean;
  departmentId?: string;
}

// Hook principal pour vérifier les permissions
export function usePermissions() {
  const { user, isLoading } = useAuth();
  const extendedUser = user as ExtendedUser;

  // Récupérer les permissions de l'utilisateur
  const userPermissions = useMemo((): UserPermissions => {
    if (!extendedUser) return { permissions: [], roles: [] };

    // Permissions par défaut basées sur le rôle
    const defaultPermissions: Permission[] = [];
    
    if (extendedUser.role === 'admin') {
      // Les admins ont toutes les permissions
      const resources = ['user', 'product', 'order', 'category'];
      const actions: Permission['action'][] = ['create', 'read', 'update', 'delete', 'list', 'export', 'import'];
      
      resources.forEach(resource => {
        actions.forEach(action => {
          defaultPermissions.push({ resource, action, scope: 'all' });
        });
      });
    } else {
      // Utilisateurs normaux : lecture seule de leurs propres données
      defaultPermissions.push(
        { resource: 'user', action: 'read', scope: 'own' },
        { resource: 'user', action: 'update', scope: 'own' },
        { resource: 'product', action: 'read', scope: 'all' },
        { resource: 'product', action: 'list', scope: 'all' }
      );
    }

    return {
      permissions: extendedUser.permissions || defaultPermissions,
      roles: extendedUser.roles || [extendedUser.role || 'user'],
      isAdmin: extendedUser.role === 'admin' || extendedUser.isAdmin || false,
    };
  }, [extendedUser]);

  // Vérifier une permission spécifique
  const hasPermission = useMemo(() => 
    (resource: string, action: Permission['action'], scope?: Permission['scope'], targetResource?: any) => {
      if (isLoading) return false;
      if (!extendedUser) return false;
      
      // Les admins ont tous les droits
      if (userPermissions.isAdmin) return true;

      // Chercher la permission exacte
      const permission = userPermissions.permissions.find(p => 
        p.resource === resource && p.action === action
      );

      if (!permission) return false;

      // Vérifier le scope si spécifié
      if (scope && permission.scope) {
        if (permission.scope === 'own' && targetResource) {
          // Vérifier si l'utilisateur est propriétaire de la ressource
          return targetResource.userId === extendedUser.id || targetResource.createdBy === extendedUser.id;
        }
        
        if (permission.scope === 'department' && targetResource && extendedUser.departmentId) {
          // Vérifier si dans le même département
          return targetResource.departmentId === extendedUser.departmentId;
        }
        
        return permission.scope === scope;
      }

      return true;
    }, [userPermissions, extendedUser, isLoading]
  );

  // Vérifier plusieurs permissions à la fois
  const hasAnyPermission = useMemo(() => 
    (permissions: Array<{resource: string, action: Permission['action'], scope?: Permission['scope']}>) => {
      return permissions.some(p => hasPermission(p.resource, p.action, p.scope));
    }, [hasPermission]
  );

  // Vérifier toutes les permissions
  const hasAllPermissions = useMemo(() => 
    (permissions: Array<{resource: string, action: Permission['action'], scope?: Permission['scope']}>) => {
      return permissions.every(p => hasPermission(p.resource, p.action, p.scope));
    }, [hasPermission]
  );

  // Filtrer les actions autorisées pour une ressource
  const getAllowedActions = useMemo(() => 
    (resource: string, targetResource?: any): Permission['action'][] => {
      const actions: Permission['action'][] = ['create', 'read', 'update', 'delete', 'list', 'export', 'import'];
      
      return actions.filter(action => 
        hasPermission(resource, action, undefined, targetResource)
      );
    }, [hasPermission]
  );

  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = useMemo(() => 
    (role: string): boolean => {
      return userPermissions.roles.includes(role);
    }, [userPermissions.roles]
  );

  return {
    user: extendedUser,
    userPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getAllowedActions,
    hasRole,
    isLoading,
  };
}

// Hook spécialisé pour les permissions d'entité
export function useEntityPermissions<T extends { id: string; userId?: string; createdBy?: string }>(
  entityName: string,
  entity?: T
) {
  const { hasPermission, getAllowedActions } = usePermissions();

  const permissions = useMemo(() => ({
    canCreate: hasPermission(entityName, 'create'),
    canRead: hasPermission(entityName, 'read', undefined, entity),
    canUpdate: hasPermission(entityName, 'update', undefined, entity),
    canDelete: hasPermission(entityName, 'delete', undefined, entity),
    canList: hasPermission(entityName, 'list'),
    canExport: hasPermission(entityName, 'export'),
    canImport: hasPermission(entityName, 'import'),
  }), [hasPermission, entityName, entity]);

  const allowedActions = useMemo(() => 
    getAllowedActions(entityName, entity), 
    [getAllowedActions, entityName, entity]
  );

  return {
    ...permissions,
    allowedActions,
    hasAnyPermission: allowedActions.length > 0,
  };
}
