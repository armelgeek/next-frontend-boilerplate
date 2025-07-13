import { z } from 'zod';

// ================================
// 🎨 SCHEMAS DE VALIDATION
// ================================

export const SectionThemeSchema = z.enum([
  'minimal',
  'modern',
  'gradient',
  'glass',
  'corporate',
  'creative',
  'nature',
  'dark',
  'colorful'
]);

export const SectionLayoutSchema = z.enum([
  'default',
  'centered',
  'split',
  'grid',
  'masonry',
  'carousel',
  'tabs',
  'accordion',
  'timeline'
]);

export const SectionSizeSchema = z.enum(['sm', 'md', 'lg', 'xl', 'full']);
export const SectionVariantSchema = z.enum(['default', 'outlined', 'filled', 'ghost', 'subtle']);

export const AnimationSchema = z.object({
  enabled: z.boolean().default(true),
  type: z.enum(['fade', 'slide', 'scale', 'bounce', 'rotate']).default('fade'),
  direction: z.enum(['up', 'down', 'left', 'right']).default('up'),
  duration: z.number().min(100).max(2000).default(500),
  delay: z.number().min(0).max(1000).default(0),
  stagger: z.number().min(0).max(500).default(100),
});

export const ResponsiveConfigSchema = z.object({
  mobile: z.boolean().default(true),
  tablet: z.boolean().default(true),
  desktop: z.boolean().default(true),
  mobileColumns: z.number().min(1).max(4).default(1),
  tabletColumns: z.number().min(1).max(6).default(2),
  desktopColumns: z.number().min(1).max(12).default(3),
});

export const CTAConfigSchema = z.object({
  text: z.string(),
  href: z.string().optional(),
  onClick: z.string().optional(),
  variant: SectionVariantSchema.default('default'),
  size: SectionSizeSchema.default('md'),
  icon: z.string().optional(),
  external: z.boolean().default(false),
}).partial({ external: true });

export const ContentItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  icon: z.string().optional(),
  badge: z.string().optional(),
  link: z.string().optional(),
  cta: CTAConfigSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const SectionConfigSchema = z.object({
  id: z.string(),
  type: z.enum([
    'hero',
    'features',
    'testimonials',
    'faq',
    'pricing',
    'team',
    'portfolio',
    'blog',
    'contact',
    'stats',
    'logos',
    'cta'
  ]),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  theme: SectionThemeSchema.default('minimal'),
  layout: SectionLayoutSchema.default('default'),
  size: SectionSizeSchema.default('lg'),
  variant: SectionVariantSchema.default('default'),
  animation: AnimationSchema.optional(),
  responsive: ResponsiveConfigSchema.optional(),
  content: z.array(ContentItemSchema),
  cta: CTAConfigSchema.optional(),
  background: z.object({
    type: z.enum(['none', 'color', 'gradient', 'image', 'pattern']).default('none'),
    value: z.string().optional(),
    overlay: z.boolean().default(false),
    opacity: z.number().min(0).max(1).default(1),
  }).optional(),
  spacing: z.object({
    top: SectionSizeSchema.default('lg'),
    bottom: SectionSizeSchema.default('lg'),
    inner: SectionSizeSchema.default('md'),
  }).optional(),
});

export type SectionTheme = z.infer<typeof SectionThemeSchema>;
export type SectionLayout = z.infer<typeof SectionLayoutSchema>;
export type SectionSize = z.infer<typeof SectionSizeSchema>;
export type SectionVariant = z.infer<typeof SectionVariantSchema>;
export type Animation = z.infer<typeof AnimationSchema>;
export type ResponsiveConfig = z.infer<typeof ResponsiveConfigSchema>;
export type CTAConfig = z.infer<typeof CTAConfigSchema>;
export type ContentItem = z.infer<typeof ContentItemSchema>;
export type SectionConfig = z.infer<typeof SectionConfigSchema>;

// ================================
// 🎨 TEMPLATES DE SECTIONS
// ================================

export const SectionTemplates = {
  // Hero Sections
  hero: {
    simple: (): SectionConfig => ({
      id: 'hero-simple',
      type: 'hero',
      title: 'Bienvenue sur notre plateforme',
      subtitle: 'La solution qui transforme votre business',
      description: 'Découvrez notre solution innovante qui simplifie votre quotidien et booste votre productivité.',
      theme: 'minimal',
      layout: 'centered',
      size: 'xl',
      variant: 'default',
      content: [],
      cta: {
        text: 'Commencer maintenant',
        href: '/get-started',
        variant: 'filled',
        size: 'lg',
      },
      animation: {
        enabled: true,
        type: 'fade',
        direction: 'up',
        duration: 600,
        delay: 0,
        stagger: 200,
      },
    }),

    gradient: (): SectionConfig => ({
      id: 'hero-gradient',
      type: 'hero',
      title: 'Révolutionnez votre approche',
      subtitle: 'Innovation • Performance • Simplicité',
      description: 'Une expérience utilisateur exceptionnelle avec des technologies de pointe.',
      theme: 'gradient',
      layout: 'split',
      size: 'full',
      variant: 'default',
      content: [],
      cta: {
        text: 'Découvrir',
        href: '/discover',
        variant: 'filled',
        size: 'lg',
        icon: 'ArrowRight',
      },
      background: {
        type: 'gradient',
        value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overlay: false,
        opacity: 1,
      },
    }),

    video: (): SectionConfig => ({
      id: 'hero-video',
      type: 'hero',
      title: 'L\'avenir commence ici',
      subtitle: 'Technologie de demain, disponible aujourd\'hui',
      description: 'Rejoignez des milliers d\'utilisateurs qui ont déjà fait le choix de l\'innovation.',
      theme: 'dark',
      layout: 'centered',
      size: 'full',
      variant: 'default',
      content: [],
      cta: {
        text: 'Voir la démo',
        href: '#demo',
        variant: 'outlined',
        size: 'lg',
        icon: 'Play',
      },
      background: {
        type: 'image',
        value: '/images/hero-video-bg.jpg',
        overlay: true,
        opacity: 0.7,
      },
    }),
  },

  // Features Sections
  features: {
    grid: (): SectionConfig => ({
      id: 'features-grid',
      type: 'features',
      title: 'Fonctionnalités principales',
      subtitle: 'Tout ce dont vous avez besoin',
      description: 'Des outils puissants et intuitifs pour maximiser votre efficacité.',
      theme: 'modern',
      layout: 'grid',
      size: 'lg',
      variant: 'default',
      content: [
        {
          id: 'feature-1',
          title: 'Interface intuitive',
          description: 'Une interface pensée pour l\'utilisateur, simple et efficace.',
          icon: 'Zap',
        },
        {
          id: 'feature-2',
          title: 'Performance optimale',
          description: 'Des temps de réponse ultra-rapides pour une expérience fluide.',
          icon: 'Rocket',
        },
        {
          id: 'feature-3',
          title: 'Sécurité avancée',
          description: 'Vos données sont protégées par les dernières technologies.',
          icon: 'Shield',
        },
        {
          id: 'feature-4',
          title: 'Support 24/7',
          description: 'Une équipe dédiée pour vous accompagner à tout moment.',
          icon: 'Heart',
        },
        {
          id: 'feature-5',
          title: 'Intégrations',
          description: 'Compatible avec vos outils favoris et APIs tierces.',
          icon: 'Plug',
        },
        {
          id: 'feature-6',
          title: 'Analytics',
          description: 'Suivez vos performances avec des tableaux de bord détaillés.',
          icon: 'BarChart',
        },
      ],
      responsive: {
        mobile: true,
        tablet: true,
        desktop: true,
        mobileColumns: 1,
        tabletColumns: 2,
        desktopColumns: 3,
      },
    }),

    timeline: (): SectionConfig => ({
      id: 'features-timeline',
      type: 'features',
      title: 'Comment ça fonctionne',
      subtitle: 'En 3 étapes simples',
      description: 'Un processus optimisé pour des résultats rapides.',
      theme: 'minimal',
      layout: 'timeline',
      size: 'lg',
      variant: 'default',
      content: [
        {
          id: 'step-1',
          title: 'Inscription',
          description: 'Créez votre compte en moins de 2 minutes.',
          icon: 'UserPlus',
          badge: '1',
        },
        {
          id: 'step-2',
          title: 'Configuration',
          description: 'Personnalisez votre espace selon vos besoins.',
          icon: 'Settings',
          badge: '2',
        },
        {
          id: 'step-3',
          title: 'Utilisation',
          description: 'Profitez de toutes les fonctionnalités immédiatement.',
          icon: 'Sparkles',
          badge: '3',
        },
      ],
    }),
  },

  // Testimonials Sections
  testimonials: {
    cards: (): SectionConfig => ({
      id: 'testimonials-cards',
      type: 'testimonials',
      title: 'Ce que disent nos clients',
      subtitle: 'Témoignages authentiques',
      description: 'Découvrez pourquoi ils nous font confiance.',
      theme: 'nature',
      layout: 'grid',
      size: 'lg',
      variant: 'default',
      content: [
        {
          id: 'testimonial-1',
          title: 'Sarah Martin',
          subtitle: 'CEO, TechStart',
          description: 'Cette solution a transformé notre façon de travailler. Gain de temps et d\'efficacité impressionnant !',
          image: '/images/testimonials/sarah.jpg',
        },
        {
          id: 'testimonial-2',
          title: 'Marc Dubois',
          subtitle: 'Directeur Marketing, Innovcorp',
          description: 'Interface excellente et support client réactif. Je recommande vivement cette plateforme.',
          image: '/images/testimonials/marc.jpg',
        },
        {
          id: 'testimonial-3',
          title: 'Julie Chen',
          subtitle: 'Product Manager, Digital Solutions',
          description: 'Les fonctionnalités avancées nous ont permis d\'atteindre nos objectifs plus rapidement.',
          image: '/images/testimonials/julie.jpg',
        },
      ],
      responsive: {
        mobile: true,
        tablet: true,
        desktop: true,
        mobileColumns: 1,
        tabletColumns: 2,
        desktopColumns: 3,
      },
    }),

    carousel: (): SectionConfig => ({
      id: 'testimonials-carousel',
      type: 'testimonials',
      title: 'Avis clients',
      subtitle: 'Plus de 10,000 utilisateurs satisfaits',
      theme: 'glass',
      layout: 'carousel',
      size: 'lg',
      variant: 'default',
      content: [
        {
          id: 'testimonial-1',
          title: 'Alexandre Rousseau',
          subtitle: 'Fondateur, StartupLab',
          description: 'La meilleure décision que nous ayons prise pour notre entreprise. ROI exceptionnel en 3 mois.',
          image: '/images/testimonials/alex.jpg',
        },
        {
          id: 'testimonial-2',
          title: 'Marie Lefebvre',
          subtitle: 'Responsable Opérations, GrowthCorp',
          description: 'Simplicité d\'utilisation remarquable. Mon équipe a adopté l\'outil en quelques heures.',
          image: '/images/testimonials/marie.jpg',
        },
        {
          id: 'testimonial-3',
          title: 'Thomas Bernard',
          subtitle: 'CTO, NextGen',
          description: 'Architecture solide et évolutive. Parfait pour nos besoins techniques complexes.',
          image: '/images/testimonials/thomas.jpg',
        },
      ],
    }),
  },

  // FAQ Sections
  faq: {
    accordion: (): SectionConfig => ({
      id: 'faq-accordion',
      type: 'faq',
      title: 'Questions fréquentes',
      subtitle: 'Tout ce que vous devez savoir',
      description: 'Trouvez rapidement les réponses à vos questions.',
      theme: 'minimal',
      layout: 'accordion',
      size: 'lg',
      variant: 'default',
      content: [
        {
          id: 'faq-1',
          title: 'Comment commencer ?',
          description: 'Inscrivez-vous gratuitement et suivez notre guide de démarrage. Vous serez opérationnel en quelques minutes.',
        },
        {
          id: 'faq-2',
          title: 'Quels sont les tarifs ?',
          description: 'Nous proposons plusieurs formules adaptées à tous les besoins, avec un essai gratuit de 14 jours.',
        },
        {
          id: 'faq-3',
          title: 'Y a-t-il un support technique ?',
          description: 'Oui, notre équipe support est disponible 24/7 par chat, email et téléphone pour tous nos clients.',
        },
        {
          id: 'faq-4',
          title: 'Puis-je intégrer avec mes outils existants ?',
          description: 'Absolument ! Nous supportons plus de 100 intégrations natives et une API REST complète.',
        },
        {
          id: 'faq-5',
          title: 'Mes données sont-elles sécurisées ?',
          description: 'La sécurité est notre priorité. Chiffrement SSL, sauvegardes automatiques et conformité RGPD.',
        },
      ],
    }),

    tabs: (): SectionConfig => ({
      id: 'faq-tabs',
      type: 'faq',
      title: 'Centre d\'aide',
      subtitle: 'Questions organisées par catégorie',
      theme: 'modern',
      layout: 'tabs',
      size: 'lg',
      variant: 'default',
      content: [
        {
          id: 'general',
          title: 'Général',
          description: 'Questions générales sur la plateforme',
          metadata: {
            questions: [
              {
                q: 'Qu\'est-ce que votre service ?',
                r: 'Notre plateforme est une solution complète pour...',
              },
              {
                q: 'Comment créer un compte ?',
                r: 'Cliquez sur "S\'inscrire" et suivez les étapes...',
              },
            ],
          },
        },
        {
          id: 'billing',
          title: 'Facturation',
          description: 'Questions sur les tarifs et paiements',
          metadata: {
            questions: [
              {
                q: 'Quels sont vos tarifs ?',
                r: 'Nous proposons plusieurs formules adaptées...',
              },
              {
                q: 'Puis-je changer de plan ?',
                r: 'Oui, vous pouvez modifier votre abonnement...',
              },
            ],
          },
        },
        {
          id: 'technical',
          title: 'Technique',
          description: 'Questions techniques et intégrations',
          metadata: {
            questions: [
              {
                q: 'Comment intégrer l\'API ?',
                r: 'Consultez notre documentation technique...',
              },
              {
                q: 'Quels navigateurs sont supportés ?',
                r: 'Nous supportons tous les navigateurs modernes...',
              },
            ],
          },
        },
      ],
    }),
  },

  // Pricing Sections
  pricing: {
    cards: (): SectionConfig => ({
      id: 'pricing-cards',
      type: 'pricing',
      title: 'Choisissez votre plan',
      subtitle: 'Des tarifs transparents et flexibles',
      description: 'Commencez gratuitement et évoluez selon vos besoins.',
      theme: 'corporate',
      layout: 'grid',
      size: 'lg',
      variant: 'default',
      content: [
        {
          id: 'plan-starter',
          title: 'Starter',
          subtitle: 'Parfait pour commencer',
          description: 'Toutes les fonctionnalités de base pour débuter.',
          badge: 'Populaire',
          metadata: {
            price: '0',
            period: 'mois',
            features: [
              'Jusqu\'à 5 projets',
              'Support par email',
              '1 GB de stockage',
              'Fonctionnalités de base',
            ],
          },
          cta: {
            text: 'Commencer gratuitement',
            href: '/signup?plan=starter',
            variant: 'outlined',
            size: 'md',
          },
        },
        {
          id: 'plan-pro',
          title: 'Pro',
          subtitle: 'Pour les équipes actives',
          description: 'Fonctionnalités avancées et support prioritaire.',
          badge: 'Recommandé',
          metadata: {
            price: '29',
            period: 'mois',
            features: [
              'Projets illimités',
              'Support prioritaire',
              '50 GB de stockage',
              'Analytics avancés',
              'Intégrations tierces',
            ],
          },
          cta: {
            text: 'Choisir Pro',
            href: '/signup?plan=pro',
            variant: 'filled',
            size: 'md',
          },
        },
        {
          id: 'plan-enterprise',
          title: 'Enterprise',
          subtitle: 'Pour les grandes organisations',
          description: 'Solution complète avec support dédié.',
          metadata: {
            price: 'Sur devis',
            period: '',
            features: [
              'Tout de Pro',
              'Support dédié',
              'Stockage illimité',
              'Sécurité renforcée',
              'Déploiement sur site',
              'Formation personnalisée',
            ],
          },
          cta: {
            text: 'Nous contacter',
            href: '/contact?plan=enterprise',
            variant: 'outlined',
            size: 'md',
          },
        },
      ],
      responsive: {
        mobile: true,
        tablet: true,
        desktop: true,
        mobileColumns: 1,
        tabletColumns: 2,
        desktopColumns: 3,
      },
    }),
  },

  // Team Section
  team: {
    grid: (): SectionConfig => ({
      id: 'team-grid',
      type: 'team',
      title: 'Notre équipe',
      subtitle: 'Les talents derrière notre succès',
      description: 'Une équipe passionnée et expérimentée à votre service.',
      theme: 'creative',
      layout: 'grid',
      size: 'lg',
      variant: 'default',
      content: [
        {
          id: 'member-1',
          title: 'Sophie Dubois',
          subtitle: 'CEO & Fondatrice',
          description: '15 ans d\'expérience dans le développement de produits innovants.',
          image: '/images/team/sophie.jpg',
          metadata: {
            social: {
              linkedin: 'https://linkedin.com/in/sophie-dubois',
              twitter: 'https://twitter.com/sophiedubois',
            },
          },
        },
        {
          id: 'member-2',
          title: 'Jean Martin',
          subtitle: 'CTO',
          description: 'Expert en architecture logicielle et intelligence artificielle.',
          image: '/images/team/jean.jpg',
          metadata: {
            social: {
              linkedin: 'https://linkedin.com/in/jean-martin',
              github: 'https://github.com/jeanmartin',
            },
          },
        },
        {
          id: 'member-3',
          title: 'Emma Chen',
          subtitle: 'Lead Designer',
          description: 'Spécialiste UX/UI avec une passion pour le design centré utilisateur.',
          image: '/images/team/emma.jpg',
          metadata: {
            social: {
              dribbble: 'https://dribbble.com/emmachen',
              behance: 'https://behance.net/emmachen',
            },
          },
        },
      ],
      responsive: {
        mobile: true,
        tablet: true,
        desktop: true,
        mobileColumns: 1,
        tabletColumns: 2,
        desktopColumns: 3,
      },
    }),
  },

  // Stats Section
  stats: {
    simple: (): SectionConfig => ({
      id: 'stats-simple',
      type: 'stats',
      title: 'Nos chiffres parlent',
      subtitle: 'La confiance de milliers d\'utilisateurs',
      theme: 'minimal',
      layout: 'grid',
      size: 'md',
      variant: 'default',
      content: [
        {
          id: 'stat-1',
          title: '10,000+',
          subtitle: 'Utilisateurs actifs',
          description: 'Font confiance à notre plateforme',
          icon: 'Users',
        },
        {
          id: 'stat-2',
          title: '99.9%',
          subtitle: 'Uptime',
          description: 'Disponibilité garantie',
          icon: 'Zap',
        },
        {
          id: 'stat-3',
          title: '1M+',
          subtitle: 'Projets créés',
          description: 'Depuis notre lancement',
          icon: 'Folder',
        },
        {
          id: 'stat-4',
          title: '24/7',
          subtitle: 'Support',
          description: 'Assistance continue',
          icon: 'Clock',
        },
      ],
      responsive: {
        mobile: true,
        tablet: true,
        desktop: true,
        mobileColumns: 2,
        tabletColumns: 2,
        desktopColumns: 4,
      },
    }),
  },

  // CTA Sections
  cta: {
    simple: (): SectionConfig => ({
      id: 'cta-simple',
      type: 'cta',
      title: 'Prêt à commencer ?',
      subtitle: 'Rejoignez des milliers d\'utilisateurs satisfaits',
      description: 'Créez votre compte gratuitement et découvrez tout le potentiel de notre plateforme.',
      theme: 'gradient',
      layout: 'centered',
      size: 'lg',
      variant: 'default',
      content: [],
      cta: {
        text: 'Commencer maintenant',
        href: '/signup',
        variant: 'filled',
        size: 'lg',
        icon: 'ArrowRight',
      },
      background: {
        type: 'gradient',
        value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overlay: false,
        opacity: 1,
      },
      animation: {
        enabled: true,
        type: 'scale',
        direction: 'up',
        duration: 400,
        delay: 0,
        stagger: 0,
      },
    }),

    newsletter: (): SectionConfig => ({
      id: 'cta-newsletter',
      type: 'cta',
      title: 'Restez informé',
      subtitle: 'Recevez nos dernières nouveautés',
      description: 'Inscrivez-vous à notre newsletter pour ne rien manquer de nos mises à jour et conseils.',
      theme: 'dark',
      layout: 'centered',
      size: 'md',
      variant: 'default',
      content: [],
      cta: {
        text: 'S\'abonner',
        variant: 'filled',
        size: 'md',
        icon: 'Mail',
      },
    }),
  },
};

// ================================
// 🛠️ GÉNÉRATEUR DE SECTIONS
// ================================

export class SectionBuilder {
  static createSection(config: Partial<SectionConfig>): SectionConfig {
    return SectionConfigSchema.parse({
      id: config.id || `section-${Date.now()}`,
      type: config.type || 'hero',
      theme: config.theme || 'minimal',
      layout: config.layout || 'default',
      size: config.size || 'lg',
      variant: config.variant || 'default',
      content: config.content || [],
      ...config,
    });
  }

  static fromTemplate(sectionType: keyof typeof SectionTemplates, variant: string): SectionConfig {
    const sectionTemplates = SectionTemplates[sectionType] as Record<string, () => SectionConfig>;
    const template = sectionTemplates?.[variant];
    if (!template) {
      throw new Error(`Template ${sectionType}.${variant} not found`);
    }
    return template();
  }

  static customizeSection(section: SectionConfig, customizations: Partial<SectionConfig>): SectionConfig {
    return SectionConfigSchema.parse({
      ...section,
      ...customizations,
    });
  }

  static generateSectionCSS(section: SectionConfig): string {
    const themeClasses = this.getThemeClasses(section.theme);
    const layoutClasses = this.getLayoutClasses(section.layout);
    const sizeClasses = this.getSizeClasses(section.size);
    const spacingClasses = this.getSpacingClasses(section.spacing);
    const backgroundClasses = this.getBackgroundClasses(section.background);

    return [themeClasses, layoutClasses, sizeClasses, spacingClasses, backgroundClasses]
      .filter(Boolean)
      .join(' ');
  }

  private static getThemeClasses(theme: SectionTheme): string {
    const themes = {
      minimal: 'bg-white text-gray-900',
      modern: 'bg-gray-50 text-gray-900',
      gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      glass: 'bg-white/10 backdrop-blur-md text-white',
      corporate: 'bg-blue-900 text-white',
      creative: 'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 text-white',
      nature: 'bg-green-50 text-green-900',
      dark: 'bg-gray-900 text-white',
      colorful: 'bg-gradient-to-r from-red-400 via-yellow-400 to-pink-400 text-white',
    };
    return themes[theme] || themes.minimal;
  }

  private static getLayoutClasses(layout: SectionLayout): string {
    const layouts = {
      default: 'container mx-auto px-4',
      centered: 'container mx-auto px-4 text-center',
      split: 'container mx-auto px-4 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center',
      grid: 'container mx-auto px-4',
      masonry: 'container mx-auto px-4',
      carousel: 'container mx-auto px-4',
      tabs: 'container mx-auto px-4',
      accordion: 'container mx-auto px-4 max-w-3xl',
      timeline: 'container mx-auto px-4',
    };
    return layouts[layout] || layouts.default;
  }

  private static getSizeClasses(size: SectionSize): string {
    const sizes = {
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-24',
      full: 'min-h-screen py-16',
    };
    return sizes[size] || sizes.lg;
  }

  private static getSpacingClasses(spacing?: SectionConfig['spacing']): string {
    if (!spacing) return '';
    
    const topSpacing = {
      sm: 'pt-8',
      md: 'pt-12',
      lg: 'pt-16',
      xl: 'pt-24',
      full: 'pt-32',
    };
    
    const bottomSpacing = {
      sm: 'pb-8',
      md: 'pb-12',
      lg: 'pb-16',
      xl: 'pb-24',
      full: 'pb-32',
    };

    return [
      topSpacing[spacing.top || 'lg'],
      bottomSpacing[spacing.bottom || 'lg'],
    ].join(' ');
  }

  private static getBackgroundClasses(background?: SectionConfig['background']): string {
    if (!background || background.type === 'none') return '';
    
    switch (background.type) {
      case 'color':
        return `bg-[${background.value}]`;
      case 'gradient':
        return 'bg-gradient-custom';
      case 'image':
        return 'bg-cover bg-center bg-no-repeat relative';
      case 'pattern':
        return 'bg-pattern relative';
      default:
        return '';
    }
  }

  static generateResponsiveClasses(responsive?: ResponsiveConfig): string {
    if (!responsive) return 'grid gap-6 md:grid-cols-2 lg:grid-cols-3';
    
    const mobileClass = `grid-cols-${responsive.mobileColumns}`;
    const tabletClass = `md:grid-cols-${responsive.tabletColumns}`;
    const desktopClass = `lg:grid-cols-${responsive.desktopColumns}`;
    
    return `grid gap-6 ${mobileClass} ${tabletClass} ${desktopClass}`;
  }

  static generateAnimationClasses(animation?: Animation): string {
    if (!animation?.enabled) return '';
    
    const baseClasses = 'transition-all duration-300 ease-in-out';
    const animationClasses = {
      fade: 'opacity-0 animate-fade-in',
      slide: `transform translate-y-4 opacity-0 animate-slide-${animation.direction}`,
      scale: 'transform scale-95 opacity-0 animate-scale-in',
      bounce: 'transform translate-y-4 opacity-0 animate-bounce-in',
      rotate: 'transform rotate-12 opacity-0 animate-rotate-in',
    };
    
    return `${baseClasses} ${animationClasses[animation.type] || animationClasses.fade}`;
  }
}

// ================================
// 🎨 UTILITAIRES DE CONTENU
// ================================

export const SectionContentGenerators = {
  generateFAQContent: (category: string, count: number = 5): ContentItem[] => {
    const faqTemplates = {
      general: [
        { q: 'Comment commencer ?', r: 'Suivez notre guide de démarrage rapide.' },
        { q: 'Quels sont les prérequis ?', r: 'Aucun prérequis particulier n\'est nécessaire.' },
        { q: 'Combien de temps pour la mise en place ?', r: 'La configuration prend environ 10 minutes.' },
      ],
      billing: [
        { q: 'Quels sont vos tarifs ?', r: 'Consultez notre page tarification pour tous les détails.' },
        { q: 'Puis-je annuler à tout moment ?', r: 'Oui, vous pouvez annuler votre abonnement à tout moment.' },
        { q: 'Acceptez-vous les cartes bancaires ?', r: 'Nous acceptons toutes les cartes majeures.' },
      ],
      technical: [
        { q: 'Quels navigateurs sont supportés ?', r: 'Tous les navigateurs modernes sont supportés.' },
        { q: 'Y a-t-il une API disponible ?', r: 'Oui, nous proposons une API REST complète.' },
        { q: 'Comment intégrer avec mes outils ?', r: 'Consultez notre documentation d\'intégration.' },
      ],
    };

    const questions = faqTemplates[category as keyof typeof faqTemplates] || faqTemplates.general;
    
    return questions.slice(0, count).map((item, index) => ({
      id: `faq-${index + 1}`,
      title: item.q,
      description: item.r,
    }));
  },

  generateTestimonialContent: (count: number = 3): ContentItem[] => {
    const testimonials = [
      {
        name: 'Sarah Martin',
        role: 'CEO, TechStart',
        content: 'Cette solution a révolutionné notre workflow. Recommandé !',
        avatar: '/images/testimonials/sarah.jpg',
      },
      {
        name: 'Marc Dubois',
        role: 'Product Manager, Innovcorp',
        content: 'Interface excellente et support client exceptionnel.',
        avatar: '/images/testimonials/marc.jpg',
      },
      {
        name: 'Julie Chen',
        role: 'CTO, Digital Solutions',
        content: 'Performances impressionnantes et facilité d\'utilisation.',
        avatar: '/images/testimonials/julie.jpg',
      },
    ];

    return testimonials.slice(0, count).map((item, index) => ({
      id: `testimonial-${index + 1}`,
      title: item.name,
      subtitle: item.role,
      description: item.content,
      image: item.avatar,
    }));
  },

  generateFeatureContent: (count: number = 6): ContentItem[] => {
    const features = [
      { title: 'Interface intuitive', description: 'Design pensé pour l\'utilisateur', icon: 'Zap' },
      { title: 'Performance optimale', description: 'Temps de réponse ultra-rapides', icon: 'Rocket' },
      { title: 'Sécurité avancée', description: 'Protection maximale de vos données', icon: 'Shield' },
      { title: 'Support 24/7', description: 'Équipe dédiée toujours disponible', icon: 'Heart' },
      { title: 'Intégrations', description: 'Compatible avec vos outils favoris', icon: 'Plug' },
      { title: 'Analytics', description: 'Tableaux de bord détaillés', icon: 'BarChart' },
    ];

    return features.slice(0, count).map((item, index) => ({
      id: `feature-${index + 1}`,
      title: item.title,
      description: item.description,
      icon: item.icon,
    }));
  },

  generateTeamContent: (count: number = 4): ContentItem[] => {
    const members = [
      {
        name: 'Sophie Dubois',
        role: 'CEO & Fondatrice',
        bio: 'Experte en développement produit et stratégie business',
        avatar: '/images/team/sophie.jpg',
      },
      {
        name: 'Jean Martin',
        role: 'CTO',
        bio: 'Architecte logiciel et expert en IA',
        avatar: '/images/team/jean.jpg',
      },
      {
        name: 'Emma Chen',
        role: 'Lead Designer',
        bio: 'Spécialiste UX/UI et design thinking',
        avatar: '/images/team/emma.jpg',
      },
      {
        name: 'Thomas Bernard',
        role: 'Head of Engineering',
        bio: 'Expert en scalabilité et performance',
        avatar: '/images/team/thomas.jpg',
      },
    ];

    return members.slice(0, count).map((item, index) => ({
      id: `member-${index + 1}`,
      title: item.name,
      subtitle: item.role,
      description: item.bio,
      image: item.avatar,
    }));
  },
};

export default SectionBuilder;
