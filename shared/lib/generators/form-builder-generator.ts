'use client';

import { z } from 'zod';
import { UseFormReturn, FieldValues } from 'react-hook-form';

// Types pour le Form Builder
export type FieldType = 
  | 'text' | 'email' | 'password' | 'number' | 'date' | 'datetime' 
  | 'select' | 'multiselect' | 'radio' | 'checkbox' | 'textarea'
  | 'file' | 'image' | 'boolean' | 'relation' | 'array' | 'object'
  | 'rating' | 'slider' | 'color' | 'url' | 'phone' | 'richtext';

export type FieldCondition = {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'is_empty' | 'is_not_empty';
  value: unknown;
};

export type FormFieldConfig = {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  
  // Validation
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: unknown, formData: Record<string, unknown>) => boolean | string;
  };
  
  // Options pour select, radio, etc.
  options?: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
    icon?: string;
  }>;
  
  // Conditional rendering
  conditions?: {
    show?: FieldCondition[];
    hide?: FieldCondition[];
    enable?: FieldCondition[];
    disable?: FieldCondition[];
  };
  
  // Layout & styling
  width?: 'full' | 'half' | 'third' | 'quarter';
  order?: number;
  group?: string;
  
  // Field-specific properties
  multiple?: boolean; // pour file, select
  accept?: string; // pour file
  rows?: number; // pour textarea
  step?: number; // pour number, slider
  format?: string; // pour date, number
  
  // Default value
  defaultValue?: unknown;
  
  // Advanced features
  dependsOn?: string[]; // autres champs dont dépend ce champ
  validates?: string[]; // champs que ce champ doit valider
  computedValue?: (formData: Record<string, unknown>) => unknown;
};

export type FormStep = {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  fields: string[]; // IDs des champs
  validation?: {
    required?: boolean; // tous les champs requis doivent être remplis
    custom?: (stepData: Record<string, unknown>, formData: Record<string, unknown>) => boolean | string;
  };
  conditions?: {
    show?: FieldCondition[];
    skip?: FieldCondition[]; // conditions pour passer automatiquement cette étape
  };
};

export type FormSection = {
  id: string;
  title: string;
  description?: string;
  fields: string[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
  conditions?: {
    show?: FieldCondition[];
  };
};

export type FormLayout = 'single' | 'steps' | 'sections' | 'tabs' | 'accordion' | 'wizard';

export type FormBuilderConfig = {
  id: string;
  title: string;
  description?: string;
  layout: FormLayout;
  
  // Champs
  fields: FormFieldConfig[];
  
  // Organisation
  steps?: FormStep[];
  sections?: FormSection[];
  
  // Paramètres généraux
  settings: {
    // Validation
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    showValidationSummary?: boolean;
    
    // UI
    showProgress?: boolean;
    showFieldCount?: boolean;
    allowSaveProgress?: boolean;
    
    // Navigation (pour steps/wizard)
    allowBackNavigation?: boolean;
    allowSkipOptionalSteps?: boolean;
    showStepNumbers?: boolean;
    
    // Submission
    submitButtonText?: string;
    saveDraftButtonText?: string;
    resetButtonText?: string;
    
    // Auto-save
    autoSave?: boolean;
    autoSaveInterval?: number; // en secondes
  };
  
  // Actions
  onSubmit?: (data: Record<string, unknown>) => Promise<void>;
  onSaveDraft?: (data: Record<string, unknown>) => Promise<void>;
  onStepChange?: (fromStep: number, toStep: number, data: Record<string, unknown>) => Promise<boolean>;
  onFieldChange?: (fieldName: string, value: unknown, formData: Record<string, unknown>) => void;
  
  // Validation globale
  validation?: {
    schema?: z.ZodSchema;
    custom?: (data: Record<string, unknown>) => Record<string, string> | null;
  };
};

// Schema Zod pour valider la configuration
export const FormBuilderConfigSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  layout: z.enum(['single', 'steps', 'sections', 'tabs', 'accordion', 'wizard']),
  fields: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    label: z.string(),
    required: z.boolean().optional(),
    // ... autres propriétés
  })),
  settings: z.object({
    validateOnChange: z.boolean().optional(),
    showProgress: z.boolean().optional(),
    autoSave: z.boolean().optional(),
    // ... autres settings
  }),
});

// Utilitaires pour la génération de formulaires
export class FormGenerator {
  static createField(
    id: string,
    type: FieldType,
    label: string,
    options?: Partial<FormFieldConfig>
  ): FormFieldConfig {
    return {
      id,
      name: id,
      type,
      label,
      required: false,
      width: 'full',
      order: 0,
      ...options,
    };
  }
  
  static createStep(
    id: string,
    title: string,
    fields: string[],
    options?: Partial<FormStep>
  ): FormStep {
    return {
      id,
      title,
      fields,
      validation: { required: true },
      ...options,
    };
  }
  
  static createSection(
    id: string,
    title: string,
    fields: string[],
    options?: Partial<FormSection>
  ): FormSection {
    return {
      id,
      title,
      fields,
      collapsible: false,
      defaultExpanded: true,
      ...options,
    };
  }
  
  // Génère un formulaire de contact
  static generateContactForm(): FormBuilderConfig {
    return {
      id: 'contact-form',
      title: 'Formulaire de Contact',
      layout: 'sections',
      fields: [
        this.createField('firstName', 'text', 'Prénom', { required: true, width: 'half' }),
        this.createField('lastName', 'text', 'Nom', { required: true, width: 'half' }),
        this.createField('email', 'email', 'Email', { required: true }),
        this.createField('phone', 'phone', 'Téléphone'),
        this.createField('subject', 'select', 'Sujet', {
          required: true,
          options: [
            { value: 'general', label: 'Question générale' },
            { value: 'support', label: 'Support technique' },
            { value: 'sales', label: 'Commercial' },
          ],
        }),
        this.createField('message', 'textarea', 'Message', { required: true, rows: 5 }),
        this.createField('newsletter', 'boolean', 'Je souhaite recevoir la newsletter'),
      ],
      sections: [
        this.createSection('personal', 'Informations personnelles', ['firstName', 'lastName', 'email', 'phone']),
        this.createSection('inquiry', 'Votre demande', ['subject', 'message']),
        this.createSection('preferences', 'Préférences', ['newsletter']),
      ],
      settings: {
        validateOnBlur: true,
        showValidationSummary: true,
        submitButtonText: 'Envoyer le message',
      },
    };
  }
  
  // Génère un formulaire de commande multi-étapes
  static generateOrderForm(): FormBuilderConfig {
    return {
      id: 'order-form',
      title: 'Passer une Commande',
      layout: 'steps',
      fields: [
        // Étape 1: Produits
        this.createField('products', 'array', 'Produits sélectionnés', { required: true }),
        this.createField('quantity', 'number', 'Quantité', { 
          required: true, 
          validation: { min: 1 } 
        }),
        
        // Étape 2: Livraison
        this.createField('deliveryType', 'radio', 'Type de livraison', {
          required: true,
          options: [
            { value: 'standard', label: 'Livraison standard (5-7 jours)' },
            { value: 'express', label: 'Livraison express (2-3 jours)' },
            { value: 'pickup', label: 'Retrait en magasin' },
          ],
        }),
        this.createField('address', 'textarea', 'Adresse de livraison', {
          conditions: {
            show: [{ field: 'deliveryType', operator: 'not_equals', value: 'pickup' }],
          },
        }),
        this.createField('deliveryNotes', 'textarea', 'Instructions de livraison'),
        
        // Étape 3: Paiement
        this.createField('paymentMethod', 'radio', 'Mode de paiement', {
          required: true,
          options: [
            { value: 'card', label: 'Carte bancaire' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'transfer', label: 'Virement bancaire' },
          ],
        }),
        this.createField('cardNumber', 'text', 'Numéro de carte', {
          conditions: {
            show: [{ field: 'paymentMethod', operator: 'equals', value: 'card' }],
          },
          validation: { pattern: '[0-9]{16}' },
        }),
        
        // Étape 4: Confirmation
        this.createField('terms', 'boolean', 'J\'accepte les conditions générales', { required: true }),
        this.createField('marketing', 'boolean', 'J\'accepte de recevoir des offres promotionnelles'),
      ],
      steps: [
        this.createStep('products', 'Sélection des produits', ['products', 'quantity']),
        this.createStep('delivery', 'Livraison', ['deliveryType', 'address', 'deliveryNotes']),
        this.createStep('payment', 'Paiement', ['paymentMethod', 'cardNumber']),
        this.createStep('confirmation', 'Confirmation', ['terms', 'marketing']),
      ],
      settings: {
        showProgress: true,
        showStepNumbers: true,
        allowBackNavigation: true,
        allowSaveProgress: true,
        validateOnBlur: true,
        submitButtonText: 'Finaliser la commande',
        saveDraftButtonText: 'Sauvegarder le panier',
      },
    };
  }
}

// Hook pour gérer les conditions de champs
export function useFieldConditions(
  conditions: FieldCondition[] | undefined,
  formData: Record<string, unknown>
): boolean {
  if (!conditions || conditions.length === 0) return true;
  
  return conditions.every(condition => {
    const fieldValue = formData[condition.field];
    
    switch (condition.operator) {
      case 'equals':
        return fieldValue === condition.value;
      case 'not_equals':
        return fieldValue !== condition.value;
      case 'contains':
        return String(fieldValue).includes(String(condition.value));
      case 'greater_than':
        return Number(fieldValue) > Number(condition.value);
      case 'less_than':
        return Number(fieldValue) < Number(condition.value);
      case 'is_empty':
        return !fieldValue || fieldValue === '' || fieldValue === null || fieldValue === undefined;
      case 'is_not_empty':
        return !!fieldValue && fieldValue !== '';
      default:
        return true;
    }
  });
}

// Template de formulaires prédéfinis
export const FormTemplates = {
  contact: FormGenerator.generateContactForm(),
  order: FormGenerator.generateOrderForm(),
  
  // Formulaire d'inscription simple
  registration: {
    id: 'registration',
    title: 'Créer un compte',
    layout: 'single' as FormLayout,
    fields: [
      FormGenerator.createField('email', 'email', 'Adresse email', { required: true }),
      FormGenerator.createField('password', 'password', 'Mot de passe', { required: true }),
      FormGenerator.createField('confirmPassword', 'password', 'Confirmer le mot de passe', { required: true }),
      FormGenerator.createField('firstName', 'text', 'Prénom', { required: true, width: 'half' }),
      FormGenerator.createField('lastName', 'text', 'Nom', { required: true, width: 'half' }),
      FormGenerator.createField('terms', 'boolean', 'J\'accepte les conditions d\'utilisation', { required: true }),
    ],
    settings: {
      validateOnChange: true,
      showValidationSummary: true,
      submitButtonText: 'Créer mon compte',
    },
  } as FormBuilderConfig,
  
  // Formulaire de profil avec sections
  profile: {
    id: 'profile',
    title: 'Mon Profil',
    layout: 'sections' as FormLayout,
    fields: [
      FormGenerator.createField('avatar', 'image', 'Photo de profil'),
      FormGenerator.createField('firstName', 'text', 'Prénom', { required: true, width: 'half' }),
      FormGenerator.createField('lastName', 'text', 'Nom', { required: true, width: 'half' }),
      FormGenerator.createField('email', 'email', 'Email', { required: true }),
      FormGenerator.createField('phone', 'phone', 'Téléphone'),
      FormGenerator.createField('bio', 'textarea', 'Biographie', { rows: 4 }),
      FormGenerator.createField('company', 'text', 'Entreprise'),
      FormGenerator.createField('position', 'text', 'Poste'),
      FormGenerator.createField('website', 'url', 'Site web'),
      FormGenerator.createField('notifications', 'boolean', 'Recevoir les notifications email'),
      FormGenerator.createField('newsletter', 'boolean', 'S\'abonner à la newsletter'),
    ],
    sections: [
      FormGenerator.createSection('personal', 'Informations personnelles', ['avatar', 'firstName', 'lastName', 'email', 'phone', 'bio']),
      FormGenerator.createSection('professional', 'Informations professionnelles', ['company', 'position', 'website']),
      FormGenerator.createSection('preferences', 'Préférences', ['notifications', 'newsletter']),
    ],
    settings: {
      validateOnBlur: true,
      autoSave: true,
      autoSaveInterval: 30,
      submitButtonText: 'Enregistrer les modifications',
    },
  } as FormBuilderConfig,
};

export default {
  FormGenerator,
  FormTemplates,
  useFieldConditions,
  FormBuilderConfigSchema,
};
