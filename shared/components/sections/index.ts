// Section Builder - Générateur de sections génériques avec thèmes et layouts
export { 
  default as SectionBuilder, 
  SectionTemplates, 
  SectionContentGenerators 
} from '@/shared/lib/generators/section-builder-generator';

export type {
  SectionConfig,
  SectionTheme,
  SectionLayout,
  SectionSize,
  SectionVariant,
  Animation,
  ResponsiveConfig,
  CTAConfig,
  ContentItem,
} from '@/shared/lib/generators/section-builder-generator';

// Composants React pour le rendu des sections
export { SectionRenderer, MultiSectionRenderer } from './section-renderer';
export { default as SectionBuilderUI } from './section-builder-ui';

// Imports pour les utilitaires
import { 
  SectionBuilder, 
  SectionTemplates, 
  SectionContentGenerators 
} from '@/shared/lib/generators/section-builder-generator';
import { SectionRenderer } from './section-renderer';
import SectionBuilderUI from './section-builder-ui';

// Types d'exportation pour l'intégration
export interface SectionBuilderExport {
  generator: typeof SectionBuilder;
  templates: typeof SectionTemplates;
  contentGenerators: typeof SectionContentGenerators;
  renderer: typeof SectionRenderer;
  ui: typeof SectionBuilderUI;
}

// Configuration par défaut recommandée
export const DEFAULT_SECTION_CONFIG = {
  theme: 'minimal' as const,
  layout: 'default' as const,
  size: 'lg' as const,
  variant: 'default' as const,
  animation: {
    enabled: true,
    type: 'fade' as const,
    direction: 'up' as const,
    duration: 500,
    delay: 0,
    stagger: 100,
  },
  responsive: {
    mobile: true,
    tablet: true,
    desktop: true,
    mobileColumns: 1,
    tabletColumns: 2,
    desktopColumns: 3,
  },
};

// Utilitaires pour la génération rapide
export const SectionBuilderUtils = {
  // Générer une page complète avec des sections prédéfinies
  generateLandingPage: () => [
    SectionTemplates.hero.gradient(),
    SectionTemplates.features.grid(),
    SectionTemplates.testimonials.cards(),
    SectionTemplates.pricing.cards(),
    SectionTemplates.faq.accordion(),
    SectionTemplates.cta.simple(),
  ],

  // Générer une page About
  generateAboutPage: () => [
    SectionTemplates.hero.simple(),
    SectionTemplates.team.grid(),
    SectionTemplates.stats.simple(),
    SectionTemplates.cta.newsletter(),
  ],

  // Générer une page de fonctionnalités
  generateFeaturesPage: () => [
    SectionTemplates.hero.simple(),
    SectionTemplates.features.grid(),
    SectionTemplates.features.timeline(),
    SectionTemplates.cta.simple(),
  ],
};
