import { useMemo } from 'react';
import { z } from 'zod';

interface DataQualityRule<T> {
  name: string;
  description: string;
  validator: (item: T) => boolean;
  severity: 'error' | 'warning' | 'info';
  suggestion?: string;
}

interface DataQualityIssue {
  ruleId: string;
  ruleName: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
  suggestion?: string;
  itemId: string;
  itemName?: string;
}

interface UseDataQualityOptions<T> {
  data: T[];
  rules: DataQualityRule<T>[];
  schema?: z.ZodSchema<T>;
}

export function useDataQuality<T extends { id: string; name?: string }>({
  data,
  rules,
  schema,
}: UseDataQualityOptions<T>) {
  
  const analysis = useMemo(() => {
    const issues: DataQualityIssue[] = [];
    const stats = {
      total: data.length,
      valid: 0,
      warnings: 0,
      errors: 0,
      duplicates: 0,
      completeness: 0,
    };

    // Vérification des doublons
    const duplicateIds = new Set<string>();
    const seenIds = new Set<string>();
    
    data.forEach(item => {
      if (seenIds.has(item.id)) {
        duplicateIds.add(item.id);
      } else {
        seenIds.add(item.id);
      }
    });

    stats.duplicates = duplicateIds.size;

    // Validation avec le schéma Zod
    data.forEach(item => {
      let hasError = false;
      
      if (schema) {
        try {
          schema.parse(item);
        } catch (error) {
          if (error instanceof z.ZodError) {
            error.errors.forEach(err => {
              issues.push({
                ruleId: 'schema-validation',
                ruleName: 'Validation du schéma',
                description: `${err.path.join('.')}: ${err.message}`,
                severity: 'error',
                itemId: item.id,
                itemName: item.name,
              });
            });
            hasError = true;
          }
        }
      }

      // Application des règles personnalisées
      rules.forEach(rule => {
        try {
          if (!rule.validator(item)) {
            issues.push({
              ruleId: rule.name,
              ruleName: rule.name,
              description: rule.description,
              severity: rule.severity,
              suggestion: rule.suggestion,
              itemId: item.id,
              itemName: item.name,
            });

            if (rule.severity === 'error') {
              hasError = true;
            } else if (rule.severity === 'warning') {
              stats.warnings++;
            }
          }
        } catch (error) {
          console.error(`Erreur dans la règle ${rule.name}:`, error);
        }
      });

      // Vérification des doublons
      if (duplicateIds.has(item.id)) {
        issues.push({
          ruleId: 'duplicate-id',
          ruleName: 'ID dupliqué',
          description: 'Cet ID existe déjà dans les données',
          severity: 'error',
          suggestion: 'Utilisez un ID unique',
          itemId: item.id,
          itemName: item.name,
        });
        hasError = true;
      }

      if (!hasError) {
        stats.valid++;
      } else {
        stats.errors++;
      }
    });

    // Calcul de la complétude
    if (data.length > 0) {
      const totalFields = Object.keys(data[0]).length;
      const completenessSum = data.reduce((sum, item) => {
        const filledFields = Object.values(item).filter(value => 
          value !== null && value !== undefined && value !== ''
        ).length;
        return sum + (filledFields / totalFields);
      }, 0);
      stats.completeness = Math.round((completenessSum / data.length) * 100);
    }

    return { issues, stats };
  }, [data, rules, schema]);

  const getIssuesByItem = (itemId: string) => {
    return analysis.issues.filter(issue => issue.itemId === itemId);
  };

  const getIssuesBySeverity = (severity: 'error' | 'warning' | 'info') => {
    return analysis.issues.filter(issue => issue.severity === severity);
  };

  const getHealthScore = () => {
    const total = data.length;
    if (total === 0) return 100;
    
    const errorsWeight = 0.6;
    const warningsWeight = 0.3;
    const completenessWeight = 0.1;
    
    const errorScore = Math.max(0, 100 - (analysis.stats.errors / total) * 100);
    const warningScore = Math.max(0, 100 - (analysis.stats.warnings / total) * 50);
    const completenessScore = analysis.stats.completeness;
    
    return Math.round(
      errorScore * errorsWeight + 
      warningScore * warningsWeight + 
      completenessScore * completenessWeight
    );
  };

  return {
    ...analysis,
    getIssuesByItem,
    getIssuesBySeverity,
    getHealthScore,
  };
}

// Règles de qualité communes
export const commonDataQualityRules = {
  notEmpty: <T extends { name?: string }>(field: keyof T): DataQualityRule<T> => ({
    name: `${String(field)}-not-empty`,
    description: `Le champ ${String(field)} ne doit pas être vide`,
    validator: (item) => {
      const value = item[field];
      return value !== null && value !== undefined && value !== '';
    },
    severity: 'warning',
    suggestion: `Remplissez le champ ${String(field)}`,
  }),

  validEmail: <T extends { email?: string }>(): DataQualityRule<T> => ({
    name: 'valid-email',
    description: 'L\'email doit avoir un format valide',
    validator: (item) => {
      if (!item.email) return true; // Optionnel
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(item.email);
    },
    severity: 'error',
    suggestion: 'Utilisez un format d\'email valide (ex: user@domain.com)',
  }),

  validUrl: <T extends { url?: string }>(field: keyof T): DataQualityRule<T> => ({
    name: `${String(field)}-valid-url`,
    description: `Le champ ${String(field)} doit être une URL valide`,
    validator: (item) => {
      const value = item[field] as string;
      if (!value) return true; // Optionnel
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    severity: 'warning',
    suggestion: 'Utilisez une URL complète (ex: https://example.com)',
  }),

  positiveNumber: <T>(field: keyof T): DataQualityRule<T> => ({
    name: `${String(field)}-positive`,
    description: `Le champ ${String(field)} doit être un nombre positif`,
    validator: (item) => {
      const value = item[field];
      return typeof value === 'number' && value >= 0;
    },
    severity: 'error',
    suggestion: 'Utilisez un nombre positif ou zéro',
  }),

  futureDate: <T>(field: keyof T): DataQualityRule<T> => ({
    name: `${String(field)}-future`,
    description: `Le champ ${String(field)} doit être une date future`,
    validator: (item) => {
      const value = item[field];
      if (!value) return true; // Optionnel
      const date = new Date(value as string);
      return date > new Date();
    },
    severity: 'warning',
    suggestion: 'Utilisez une date future',
  }),
};
