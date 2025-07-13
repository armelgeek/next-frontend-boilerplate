'use client';

import { z } from 'zod';
import { ReactNode } from 'react';

// Types pour le système de notifications
export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type NotificationPosition = 
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'center';

export type NotificationVariant = 
  | 'toast' | 'banner' | 'modal' | 'inline' | 'popup' | 'badge' | 'alert';

export type NotificationAction = {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
  action: () => void | Promise<void>;
  loading?: boolean;
};

export type NotificationConfig = {
  id: string;
  type: NotificationType;
  variant: NotificationVariant;
  title: string;
  message?: string;
  description?: string;
  
  // Contenu personnalisé
  content?: ReactNode;
  icon?: ReactNode | string;
  
  // Actions
  actions?: NotificationAction[];
  dismissible?: boolean;
  
  // Comportement
  duration?: number; // ms, 0 = persistent
  autoClose?: boolean;
  
  // Apparence
  position?: NotificationPosition;
  showProgress?: boolean;
  persistent?: boolean;
  
  // Métadonnées
  category?: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  timestamp?: Date;
  
  // Callbacks
  onShow?: () => void;
  onDismiss?: () => void;
  onAction?: (actionId: string) => void;
  
  // Conditions d'affichage
  conditions?: {
    showOnce?: boolean; // ne pas montrer si déjà vue
    maxOccurrences?: number;
    userRoles?: string[];
    pages?: string[];
    devices?: ('mobile' | 'tablet' | 'desktop')[];
  };
};

// Schema de validation
export const NotificationConfigSchema = z.object({
  id: z.string(),
  type: z.enum(['success', 'error', 'warning', 'info', 'loading']),
  variant: z.enum(['toast', 'banner', 'modal', 'inline', 'popup', 'badge', 'alert']),
  title: z.string(),
  message: z.string().optional(),
  duration: z.number().optional(),
  dismissible: z.boolean().optional(),
  position: z.enum(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right', 'center']).optional(),
  persistent: z.boolean().optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
});

// Configuration du système de notifications
export type NotificationSystemConfig = {
  // Paramètres globaux
  defaultDuration: number;
  defaultPosition: NotificationPosition;
  maxVisible: number;
  
  // Comportements par type
  typeSettings: {
    [K in NotificationType]: {
      defaultDuration: number;
      defaultVariant: NotificationVariant;
      icon?: string;
      sound?: string;
    };
  };
  
  // Paramètres par variant
  variantSettings: {
    [K in NotificationVariant]: {
      maxWidth?: string;
      animation?: 'slide' | 'fade' | 'bounce' | 'zoom';
      stackable?: boolean;
      overlay?: boolean;
    };
  };
  
  // Persistence
  persistence: {
    enabled: boolean;
    storage: 'localStorage' | 'sessionStorage' | 'indexedDB';
    maxHistorySize: number;
  };
};

// Générateur de notifications
export class NotificationGenerator {
  static success(title: string, options?: Partial<NotificationConfig>): NotificationConfig {
    return {
      id: this.generateId(),
      type: 'success',
      variant: 'toast',
      title,
      duration: 5000,
      dismissible: true,
      position: 'top-right',
      ...options,
    };
  }
  
  static error(title: string, options?: Partial<NotificationConfig>): NotificationConfig {
    return {
      id: this.generateId(),
      type: 'error',
      variant: 'toast',
      title,
      duration: 8000,
      dismissible: true,
      position: 'top-right',
      persistent: true,
      ...options,
    };
  }
  
  static warning(title: string, options?: Partial<NotificationConfig>): NotificationConfig {
    return {
      id: this.generateId(),
      type: 'warning',
      variant: 'banner',
      title,
      duration: 6000,
      dismissible: true,
      position: 'top-center',
      ...options,
    };
  }
  
  static info(title: string, options?: Partial<NotificationConfig>): NotificationConfig {
    return {
      id: this.generateId(),
      type: 'info',
      variant: 'toast',
      title,
      duration: 4000,
      dismissible: true,
      position: 'top-right',
      ...options,
    };
  }
  
  static loading(title: string, options?: Partial<NotificationConfig>): NotificationConfig {
    return {
      id: this.generateId(),
      type: 'loading',
      variant: 'toast',
      title,
      duration: 0, // Persistent jusqu'à fermeture manuelle
      dismissible: false,
      position: 'top-right',
      ...options,
    };
  }
  
  // Notifications complexes
  static confirmation(
    title: string, 
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ): NotificationConfig {
    return {
      id: this.generateId(),
      type: 'warning',
      variant: 'modal',
      title,
      message,
      duration: 0,
      dismissible: true,
      actions: [
        {
          id: 'confirm',
          label: 'Confirmer',
          variant: 'destructive',
          action: onConfirm,
        },
        {
          id: 'cancel',
          label: 'Annuler',
          variant: 'outline',
          action: onCancel || (() => {}),
        },
      ],
    };
  }
  
  static actionRequired(
    title: string,
    message: string,
    actions: NotificationAction[]
  ): NotificationConfig {
    return {
      id: this.generateId(),
      type: 'info',
      variant: 'banner',
      title,
      message,
      duration: 0,
      dismissible: false,
      position: 'top-center',
      actions,
      priority: 'high',
    };
  }
  
  private static generateId(): string {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Templates de notifications prédéfinies
export const NotificationTemplates = {
  // Notifications de CRUD
  crud: {
    created: (entityName: string) => NotificationGenerator.success(
      `${entityName} créé avec succès`,
      { category: 'crud' }
    ),
    updated: (entityName: string) => NotificationGenerator.success(
      `${entityName} modifié avec succès`,
      { category: 'crud' }
    ),
    deleted: (entityName: string) => NotificationGenerator.success(
      `${entityName} supprimé avec succès`,
      { category: 'crud' }
    ),
    
    createError: (entityName: string, error?: string) => NotificationGenerator.error(
      `Erreur lors de la création de ${entityName}`,
      { message: error, category: 'crud' }
    ),
    updateError: (entityName: string, error?: string) => NotificationGenerator.error(
      `Erreur lors de la modification de ${entityName}`,
      { message: error, category: 'crud' }
    ),
    deleteError: (entityName: string, error?: string) => NotificationGenerator.error(
      `Erreur lors de la suppression de ${entityName}`,
      { message: error, category: 'crud' }
    ),
  },
  
  // Notifications d'authentification
  auth: {
    loginSuccess: () => NotificationGenerator.success(
      'Connexion réussie',
      { message: 'Bienvenue !', category: 'auth' }
    ),
    loginError: (error?: string) => NotificationGenerator.error(
      'Erreur de connexion',
      { message: error || 'Identifiants incorrects', category: 'auth' }
    ),
    logoutSuccess: () => NotificationGenerator.info(
      'Déconnexion réussie',
      { message: 'À bientôt !', category: 'auth' }
    ),
    sessionExpired: () => NotificationGenerator.warning(
      'Session expirée',
      { 
        message: 'Veuillez vous reconnecter',
        category: 'auth',
        persistent: true,
        actions: [
          {
            id: 'login',
            label: 'Se reconnecter',
            variant: 'primary',
            action: () => { window.location.href = '/login'; },
          },
        ],
      }
    ),
  },
  
  // Notifications système
  system: {
    maintenance: (duration?: string) => NotificationGenerator.warning(
      'Maintenance programmée',
      {
        message: `Le système sera indisponible ${duration || 'bientôt'}`,
        variant: 'banner',
        position: 'top-center',
        persistent: true,
        category: 'system',
      }
    ),
    
    newVersion: (version: string) => NotificationGenerator.info(
      'Nouvelle version disponible',
      {
        message: `Version ${version} est maintenant disponible`,
        variant: 'banner',
        category: 'system',
        actions: [
          {
            id: 'refresh',
            label: 'Actualiser',
            variant: 'primary',
            action: () => window.location.reload(),
          },
          {
            id: 'later',
            label: 'Plus tard',
            variant: 'outline',
            action: () => {},
          },
        ],
      }
    ),
    
    offline: () => NotificationGenerator.warning(
      'Mode hors ligne',
      {
        message: 'Vérifiez votre connexion internet',
        variant: 'banner',
        position: 'top-center',
        persistent: true,
        category: 'system',
      }
    ),
    
    online: () => NotificationGenerator.success(
      'Connexion rétablie',
      {
        message: 'Vous êtes de nouveau en ligne',
        category: 'system',
        duration: 3000,
      }
    ),
  },
  
  // Notifications de formulaire
  form: {
    saved: () => NotificationGenerator.success(
      'Formulaire sauvegardé',
      { category: 'form', duration: 3000 }
    ),
    autoSaved: () => NotificationGenerator.info(
      'Sauvegarde automatique',
      { 
        category: 'form', 
        duration: 2000, 
        variant: 'badge',
        position: 'bottom-right',
      }
    ),
    validationErrors: (count: number) => NotificationGenerator.error(
      'Erreurs de validation',
      { 
        message: `${count} erreur(s) à corriger`,
        category: 'form',
        variant: 'inline',
      }
    ),
    confirmExit: (onConfirm: () => void) => NotificationGenerator.confirmation(
      'Quitter sans sauvegarder ?',
      'Vos modifications seront perdues.',
      onConfirm
    ),
  },
  
  // Notifications business
  business: {
    orderPlaced: (orderNumber: string) => NotificationGenerator.success(
      'Commande confirmée',
      {
        message: `Commande n°${orderNumber} enregistrée`,
        category: 'business',
        actions: [
          {
            id: 'view',
            label: 'Voir la commande',
            variant: 'primary',
            action: () => { window.location.href = `/orders/${orderNumber}`; },
          },
        ],
      }
    ),
    
    paymentSuccess: (amount: string) => NotificationGenerator.success(
      'Paiement réussi',
      {
        message: `Montant de ${amount} débité`,
        category: 'business',
      }
    ),
    
    paymentFailed: (reason?: string) => NotificationGenerator.error(
      'Échec du paiement',
      {
        message: reason || 'Veuillez réessayer ou utiliser un autre moyen de paiement',
        category: 'business',
        persistent: true,
      }
    ),
    
    stockAlert: (productName: string, stock: number) => NotificationGenerator.warning(
      'Stock faible',
      {
        message: `${productName}: ${stock} unité(s) restante(s)`,
        category: 'business',
        variant: 'badge',
      }
    ),
  },
};

// Configuration par défaut du système
export const DefaultNotificationSystemConfig: NotificationSystemConfig = {
  defaultDuration: 5000,
  defaultPosition: 'top-right',
  maxVisible: 5,
  
  typeSettings: {
    success: {
      defaultDuration: 4000,
      defaultVariant: 'toast',
      icon: 'CheckCircle',
      sound: 'success.mp3',
    },
    error: {
      defaultDuration: 8000,
      defaultVariant: 'toast',
      icon: 'XCircle',
      sound: 'error.mp3',
    },
    warning: {
      defaultDuration: 6000,
      defaultVariant: 'banner',
      icon: 'AlertTriangle',
      sound: 'warning.mp3',
    },
    info: {
      defaultDuration: 5000,
      defaultVariant: 'toast',
      icon: 'Info',
    },
    loading: {
      defaultDuration: 0,
      defaultVariant: 'toast',
      icon: 'Loader2',
    },
  },
  
  variantSettings: {
    toast: {
      maxWidth: '420px',
      animation: 'slide',
      stackable: true,
      overlay: false,
    },
    banner: {
      maxWidth: '100%',
      animation: 'slide',
      stackable: false,
      overlay: false,
    },
    modal: {
      maxWidth: '500px',
      animation: 'zoom',
      stackable: false,
      overlay: true,
    },
    inline: {
      animation: 'fade',
      stackable: false,
      overlay: false,
    },
    popup: {
      maxWidth: '300px',
      animation: 'bounce',
      stackable: true,
      overlay: false,
    },
    badge: {
      maxWidth: '200px',
      animation: 'fade',
      stackable: false,
      overlay: false,
    },
    alert: {
      maxWidth: '100%',
      animation: 'fade',
      stackable: false,
      overlay: false,
    },
  },
  
  persistence: {
    enabled: true,
    storage: 'localStorage',
    maxHistorySize: 100,
  },
};

// Hook pour utiliser le système de notifications
export function useNotificationBuilder() {
  // Ce hook sera implémenté dans le composant React correspondant
  return {
    show: (config: NotificationConfig) => {
      // Logique d'affichage
    },
    hide: (id: string) => {
      // Logique de masquage
    },
    clear: (category?: string) => {
      // Logique de nettoyage
    },
    // Méthodes de raccourci
    success: (title: string, options?: Partial<NotificationConfig>) => {
      // Utilise NotificationGenerator.success
    },
    error: (title: string, options?: Partial<NotificationConfig>) => {
      // Utilise NotificationGenerator.error
    },
    warning: (title: string, options?: Partial<NotificationConfig>) => {
      // Utilise NotificationGenerator.warning
    },
    info: (title: string, options?: Partial<NotificationConfig>) => {
      // Utilise NotificationGenerator.info
    },
    loading: (title: string, options?: Partial<NotificationConfig>) => {
      // Utilise NotificationGenerator.loading
    },
    confirm: (title: string, message: string, onConfirm: () => void) => {
      // Utilise NotificationGenerator.confirmation
    },
  };
}

export default {
  NotificationGenerator,
  NotificationTemplates,
  DefaultNotificationSystemConfig,
  useNotificationBuilder,
  NotificationConfigSchema,
};
