'use client';

import { usePermissions, Permission } from '@/shared/hooks/use-permissions';
import { ReactNode } from 'react';

interface ProtectedComponentProps {
  resource: string;
  action: Permission['action'];
  scope?: Permission['scope'];
  targetResource?: any;
  fallback?: ReactNode;
  children: ReactNode;
  renderFallback?: (missingPermission: string) => ReactNode;
}

// Composant pour protéger l'affichage selon les permissions
export function ProtectedComponent({
  resource,
  action,
  scope,
  targetResource,
  fallback = null,
  children,
  renderFallback,
}: ProtectedComponentProps) {
  const { hasPermission } = usePermissions();

  const isAllowed = hasPermission(resource, action, scope, targetResource);

  if (!isAllowed) {
    if (renderFallback) {
      return <>{renderFallback(`${action} ${resource}`)}</>;
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface ProtectedButtonProps {
  resource: string;
  action: Permission['action'];
  scope?: Permission['scope'];
  targetResource?: any;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

// Bouton qui s'affiche seulement si l'utilisateur a la permission
export function ProtectedButton({
  resource,
  action,
  scope,
  targetResource,
  children,
  className = '',
  onClick,
  disabled = false,
  variant = 'primary',
}: ProtectedButtonProps) {
  const { hasPermission } = usePermissions();

  const isAllowed = hasPermission(resource, action, scope, targetResource);

  if (!isAllowed) return null;

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

interface PermissionGateProps {
  permissions: Array<{
    resource: string;
    action: Permission['action'];
    scope?: Permission['scope'];
  }>;
  requireAll?: boolean; // Si true, toutes les permissions sont requises, sinon au moins une
  children: ReactNode;
  fallback?: ReactNode;
}

// Composant pour contrôler l'accès avec plusieurs permissions
export function PermissionGate({
  permissions,
  requireAll = false,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { hasAnyPermission, hasAllPermissions } = usePermissions();

  const isAllowed = requireAll 
    ? hasAllPermissions(permissions)
    : hasAnyPermission(permissions);

  if (!isAllowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface RoleGateProps {
  roles: string[];
  requireAll?: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

// Composant pour contrôler l'accès par rôle
export function RoleGate({
  roles,
  requireAll = false,
  children,
  fallback = null,
}: RoleGateProps) {
  const { hasRole } = usePermissions();

  const isAllowed = requireAll
    ? roles.every(role => hasRole(role))
    : roles.some(role => hasRole(role));

  if (!isAllowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
