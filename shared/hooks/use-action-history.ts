import { useState, useCallback } from 'react';

export interface ActionHistory {
  id: string;
  type: 'create' | 'update' | 'delete' | 'bulk';
  entityType: string;
  entityId?: string;
  entityName?: string;
  changes?: Record<string, { old: any; new: any }>;
  timestamp: Date;
  userId?: string;
  success: boolean;
  error?: string;
}

interface UseActionHistoryOptions {
  maxHistorySize?: number;
  persistToStorage?: boolean;
  storageKey?: string;
}

export function useActionHistory(options: UseActionHistoryOptions = {}) {
  const {
    maxHistorySize = 100,
    persistToStorage = true,
    storageKey = 'action_history'
  } = options;

  const [history, setHistory] = useState<ActionHistory[]>(() => {
    if (persistToStorage && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const addAction = useCallback((action: Omit<ActionHistory, 'id' | 'timestamp'>) => {
    const newAction: ActionHistory = {
      ...action,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };

    setHistory(prev => {
      const updated = [newAction, ...prev].slice(0, maxHistorySize);
      
      if (persistToStorage && typeof window !== 'undefined') {
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (error) {
          console.error('Erreur lors de la sauvegarde de l\'historique:', error);
        }
      }
      
      return updated;
    });

    return newAction;
  }, [maxHistorySize, persistToStorage, storageKey]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    if (persistToStorage && typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }, [persistToStorage, storageKey]);

  const getEntityHistory = useCallback((entityType: string, entityId?: string) => {
    return history.filter(action => 
      action.entityType === entityType && 
      (!entityId || action.entityId === entityId)
    );
  }, [history]);

  const getRecentActions = useCallback((limit: number = 10) => {
    return history.slice(0, limit);
  }, [history]);

  const undoLastAction = useCallback(() => {
    // Cette fonction pourrait être étendue pour supporter l'undo
    // selon la logique métier de votre application
    const lastAction = history[0];
    if (lastAction && lastAction.type === 'delete') {
      // Logique pour restaurer un élément supprimé
      console.log('Undo delete action:', lastAction);
    }
    return lastAction;
  }, [history]);

  return {
    history,
    addAction,
    clearHistory,
    getEntityHistory,
    getRecentActions,
    undoLastAction,
  };
}
