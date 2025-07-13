'use client';

import { z } from 'zod';
import { ReactNode } from 'react';

// Types pour le Layout Builder
export type LayoutType = 
  | 'grid' | 'flex' | 'masonry' | 'sidebar' | 'header' | 'footer'
  | 'hero' | 'section' | 'card' | 'list' | 'table' | 'form';

export type ResponsiveValue<T> = {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  wide?: T;
} | T;

export type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;
export type AlignmentValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type LayoutComponent = {
  id: string;
  type: LayoutType;
  name: string;
  
  // Contenu
  children?: LayoutComponent[];
  content?: ReactNode;
  
  // Grid properties
  columns?: ResponsiveValue<number>;
  rows?: ResponsiveValue<number>;
  gap?: ResponsiveValue<SpacingValue>;
  
  // Flex properties
  direction?: ResponsiveValue<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
  wrap?: ResponsiveValue<'wrap' | 'nowrap' | 'wrap-reverse'>;
  justify?: ResponsiveValue<'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'>;
  align?: ResponsiveValue<AlignmentValue>;
  
  // Positioning
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  
  // Sizing
  width?: ResponsiveValue<string | number>;
  height?: ResponsiveValue<string | number>;
  minWidth?: ResponsiveValue<string | number>;
  minHeight?: ResponsiveValue<string | number>;
  maxWidth?: ResponsiveValue<string | number>;
  maxHeight?: ResponsiveValue<string | number>;
  
  // Spacing
  padding?: ResponsiveValue<SpacingValue>;
  margin?: ResponsiveValue<SpacingValue>;
  
  // Appearance
  background?: string;
  border?: string;
  borderRadius?: ResponsiveValue<SpacingValue>;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  
  // Layout-specific properties
  properties?: {
    // Sidebar
    sidebarWidth?: ResponsiveValue<string>;
    sidebarPosition?: 'left' | 'right';
    collapsible?: boolean;
    
    // Hero
    heroHeight?: ResponsiveValue<string>;
    heroBackground?: string;
    heroOverlay?: boolean;
    
    // Card
    cardPadding?: ResponsiveValue<SpacingValue>;
    cardElevation?: 'none' | 'sm' | 'md' | 'lg';
    
    // Section
    sectionMaxWidth?: ResponsiveValue<string>;
    sectionCentered?: boolean;
    
    // List
    listOrientation?: 'vertical' | 'horizontal';
    listSpacing?: ResponsiveValue<SpacingValue>;
    
    // Table
    tableStriped?: boolean;
    tableHover?: boolean;
    tableBordered?: boolean;
    
    // Form
    formColumns?: ResponsiveValue<number>;
    formSpacing?: ResponsiveValue<SpacingValue>;
  };
  
  // Conditional rendering
  conditions?: {
    showOn?: ('mobile' | 'tablet' | 'desktop')[];
    hideOn?: ('mobile' | 'tablet' | 'desktop')[];
    roles?: string[];
    permissions?: string[];
  };
  
  // Styling
  className?: string;
  style?: Record<string, unknown>;
  
  // Animation
  animation?: {
    type: 'fade' | 'slide' | 'zoom' | 'bounce' | 'flip';
    duration: number;
    delay?: number;
    trigger?: 'onMount' | 'onScroll' | 'onHover' | 'onClick';
  };
};

// Schema de validation
export const LayoutComponentSchema = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string(),
  columns: z.number().optional(),
  rows: z.number().optional(),
  gap: z.number().optional(),
  padding: z.number().optional(),
  margin: z.number().optional(),
  className: z.string().optional(),
});

// Configuration de page complète
export type PageLayoutConfig = {
  id: string;
  title: string;
  description?: string;
  
  // Layout principal
  layout: LayoutComponent;
  
  // Métadonnées
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
    robots?: string;
  };
  
  // Scripts et styles
  assets?: {
    css?: string[];
    js?: string[];
  };
  
  // Paramètres
  settings: {
    responsive: boolean;
    rtl: boolean;
    darkMode: boolean;
    animations: boolean;
  };
};

// Générateur de layouts
export class LayoutGenerator {
  // Générateurs de composants de base
  static createGrid(
    id: string,
    columns: ResponsiveValue<number>,
    children: LayoutComponent[] = [],
    options?: Partial<LayoutComponent>
  ): LayoutComponent {
    return {
      id,
      type: 'grid',
      name: `Grid ${id}`,
      columns,
      gap: 4,
      children,
      ...options,
    };
  }
  
  static createFlex(
    id: string,
    direction: ResponsiveValue<'row' | 'column'> = 'row',
    children: LayoutComponent[] = [],
    options?: Partial<LayoutComponent>
  ): LayoutComponent {
    return {
      id,
      type: 'flex',
      name: `Flex ${id}`,
      direction,
      gap: 4,
      children,
      ...options,
    };
  }
  
  static createSidebar(
    id: string,
    sidebarContent: LayoutComponent,
    mainContent: LayoutComponent,
    options?: Partial<LayoutComponent>
  ): LayoutComponent {
    return {
      id,
      type: 'sidebar',
      name: `Sidebar ${id}`,
      children: [sidebarContent, mainContent],
      properties: {
        sidebarWidth: { mobile: '100%', tablet: '300px', desktop: '350px' },
        sidebarPosition: 'left',
        collapsible: true,
      },
      ...options,
    };
  }
  
  static createHero(
    id: string,
    content: ReactNode,
    options?: Partial<LayoutComponent>
  ): LayoutComponent {
    return {
      id,
      type: 'hero',
      name: `Hero ${id}`,
      content,
      properties: {
        heroHeight: { mobile: '400px', tablet: '500px', desktop: '600px' },
        heroBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        heroOverlay: true,
      },
      justify: 'center',
      align: 'center',
      ...options,
    };
  }
  
  static createSection(
    id: string,
    children: LayoutComponent[] = [],
    options?: Partial<LayoutComponent>
  ): LayoutComponent {
    return {
      id,
      type: 'section',
      name: `Section ${id}`,
      children,
      padding: { mobile: 4, desktop: 8 },
      properties: {
        sectionMaxWidth: '1200px',
        sectionCentered: true,
      },
      ...options,
    };
  }
  
  static createCard(
    id: string,
    content: ReactNode,
    options?: Partial<LayoutComponent>
  ): LayoutComponent {
    return {
      id,
      type: 'card',
      name: `Card ${id}`,
      content,
      properties: {
        cardPadding: 6,
        cardElevation: 'md',
      },
      borderRadius: 2,
      background: 'white',
      shadow: 'md',
      ...options,
    };
  }
  
  // Générateurs de layouts de page complexes
  static createDashboardLayout(
    id: string,
    sidebar: LayoutComponent,
    header: LayoutComponent,
    main: LayoutComponent
  ): PageLayoutConfig {
    const layout = this.createGrid('dashboard-root', 1, [
      // Header
      {
        ...header,
        id: 'dashboard-header',
        height: '64px',
        position: 'sticky',
      },
      // Main content avec sidebar
      this.createSidebar('dashboard-main', sidebar, main, {
        height: 'calc(100vh - 64px)',
      }),
    ], {
      height: '100vh',
      className: 'dashboard-layout',
    });
    
    return {
      id,
      title: 'Dashboard Layout',
      layout,
      settings: {
        responsive: true,
        rtl: false,
        darkMode: true,
        animations: true,
      },
    };
  }
  
  static createLandingPageLayout(id: string): PageLayoutConfig {
    const layout = this.createFlex('landing-root', 'column', [
      // Hero section
      this.createHero('hero', 'Hero Content', {
        properties: {
          heroHeight: { mobile: '500px', desktop: '700px' },
        },
      }),
      
      // Features section
      this.createSection('features', [
        this.createGrid('features-grid', { mobile: 1, tablet: 2, desktop: 3 }, [
          this.createCard('feature-1', 'Feature 1'),
          this.createCard('feature-2', 'Feature 2'),
          this.createCard('feature-3', 'Feature 3'),
        ]),
      ]),
      
      // Testimonials section
      this.createSection('testimonials', [
        this.createGrid('testimonials-grid', { mobile: 1, desktop: 2 }, [
          this.createCard('testimonial-1', 'Testimonial 1'),
          this.createCard('testimonial-2', 'Testimonial 2'),
        ]),
      ]),
      
      // CTA section
      this.createSection('cta', [
        this.createCard('cta-card', 'Call to Action', {
          padding: 8,
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
        }),
      ]),
    ]);
    
    return {
      id,
      title: 'Landing Page Layout',
      layout,
      settings: {
        responsive: true,
        rtl: false,
        darkMode: false,
        animations: true,
      },
    };
  }
  
  static createBlogLayout(id: string): PageLayoutConfig {
    const layout = this.createSidebar(
      'blog-layout',
      // Sidebar avec navigation
      this.createFlex('blog-sidebar', 'column', [
        this.createCard('categories', 'Categories'),
        this.createCard('recent-posts', 'Recent Posts'),
        this.createCard('tags', 'Tags'),
      ], {
        width: '300px',
        gap: 4,
      }),
      // Contenu principal
      this.createFlex('blog-main', 'column', [
        this.createCard('blog-post', 'Blog Post Content'),
        this.createCard('comments', 'Comments'),
      ], {
        gap: 6,
      })
    );
    
    return {
      id,
      title: 'Blog Layout',
      layout,
      settings: {
        responsive: true,
        rtl: false,
        darkMode: false,
        animations: false,
      },
    };
  }
  
  static createEcommerceLayout(id: string): PageLayoutConfig {
    const layout = this.createFlex('ecommerce-root', 'column', [
      // Header avec navigation
      this.createFlex('ecommerce-header', 'row', [], {
        height: '80px',
        justify: 'between',
        align: 'center',
        padding: 4,
        background: 'white',
        shadow: 'sm',
      }),
      
      // Main content
      this.createSidebar(
        'ecommerce-main',
        // Sidebar avec filtres
        this.createFlex('filters-sidebar', 'column', [
          this.createCard('price-filter', 'Price Filter'),
          this.createCard('brand-filter', 'Brand Filter'),
          this.createCard('rating-filter', 'Rating Filter'),
        ], {
          width: '280px',
          gap: 4,
        }),
        // Grille de produits
        this.createSection('products', [
          this.createGrid('products-grid', { mobile: 1, tablet: 2, desktop: 3, wide: 4 }, [
            this.createCard('product-1', 'Product 1'),
            this.createCard('product-2', 'Product 2'),
            this.createCard('product-3', 'Product 3'),
            this.createCard('product-4', 'Product 4'),
          ], {
            gap: 6,
          }),
        ])
      ),
    ]);
    
    return {
      id,
      title: 'E-commerce Layout',
      layout,
      settings: {
        responsive: true,
        rtl: false,
        darkMode: false,
        animations: true,
      },
    };
  }
}

// Templates de layouts prédéfinis
export const LayoutTemplates = {
  // Layouts de base
  basic: {
    singleColumn: LayoutGenerator.createFlex('single-column', 'column'),
    twoColumns: LayoutGenerator.createGrid('two-columns', 2),
    threeColumns: LayoutGenerator.createGrid('three-columns', 3),
    sidebar: LayoutGenerator.createSidebar(
      'basic-sidebar',
      LayoutGenerator.createCard('sidebar-content', 'Sidebar'),
      LayoutGenerator.createCard('main-content', 'Main Content')
    ),
  },
  
  // Layouts de pages
  pages: {
    dashboard: LayoutGenerator.createDashboardLayout(
      'dashboard',
      LayoutGenerator.createCard('nav-sidebar', 'Navigation'),
      LayoutGenerator.createCard('header', 'Header'),
      LayoutGenerator.createCard('dashboard-content', 'Dashboard Content')
    ),
    landing: LayoutGenerator.createLandingPageLayout('landing'),
    blog: LayoutGenerator.createBlogLayout('blog'),
    ecommerce: LayoutGenerator.createEcommerceLayout('ecommerce'),
  },
  
  // Sections communes
  sections: {
    hero: LayoutGenerator.createHero('common-hero', 'Hero Section'),
    features: LayoutGenerator.createSection('features-section', [
      LayoutGenerator.createGrid('features-grid', 3, [
        LayoutGenerator.createCard('feature-1', 'Feature 1'),
        LayoutGenerator.createCard('feature-2', 'Feature 2'),
        LayoutGenerator.createCard('feature-3', 'Feature 3'),
      ]),
    ]),
    testimonials: LayoutGenerator.createSection('testimonials-section', [
      LayoutGenerator.createGrid('testimonials-grid', 2),
    ]),
    pricing: LayoutGenerator.createSection('pricing-section', [
      LayoutGenerator.createGrid('pricing-grid', { mobile: 1, desktop: 3 }),
    ]),
    contact: LayoutGenerator.createSection('contact-section', [
      LayoutGenerator.createGrid('contact-grid', { mobile: 1, desktop: 2 }),
    ]),
  },
};

// Utilitaires pour responsive design
export class ResponsiveUtility {
  static createResponsiveValue<T>(
    mobile: T,
    tablet?: T,
    desktop?: T,
    wide?: T
  ): ResponsiveValue<T> {
    return {
      mobile,
      tablet: tablet || mobile,
      desktop: desktop || tablet || mobile,
      wide: wide || desktop || tablet || mobile,
    };
  }
  
  static getBreakpointValue<T>(
    responsiveValue: ResponsiveValue<T>,
    breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide'
  ): T {
    if (typeof responsiveValue === 'object' && responsiveValue !== null) {
      const responsive = responsiveValue as Record<string, T>;
      return responsive[breakpoint] || 
             responsive.desktop || 
             responsive.tablet || 
             responsive.mobile;
    }
    return responsiveValue as T;
  }
  
  static generateResponsiveClasses<T>(
    property: string,
    responsiveValue: ResponsiveValue<T>,
    valueToClass: (value: T) => string
  ): string {
    if (typeof responsiveValue === 'object' && responsiveValue !== null) {
      const responsive = responsiveValue as Record<string, T>;
      const classes: string[] = [];
      
      if (responsive.mobile) {
        classes.push(valueToClass(responsive.mobile));
      }
      if (responsive.tablet) {
        classes.push(`md:${valueToClass(responsive.tablet)}`);
      }
      if (responsive.desktop) {
        classes.push(`lg:${valueToClass(responsive.desktop)}`);
      }
      if (responsive.wide) {
        classes.push(`xl:${valueToClass(responsive.wide)}`);
      }
      
      return classes.join(' ');
    }
    
    return valueToClass(responsiveValue as T);
  }
}

// Hook pour utiliser le layout builder
export function useLayoutBuilder() {
  return {
    create: LayoutGenerator,
    templates: LayoutTemplates,
    responsive: ResponsiveUtility,
    
    // Méthodes utilitaires
    generateGrid: (columns: number, children?: LayoutComponent[]) => 
      LayoutGenerator.createGrid(`grid-${Date.now()}`, columns, children),
    
    generateFlex: (direction: 'row' | 'column', children?: LayoutComponent[]) =>
      LayoutGenerator.createFlex(`flex-${Date.now()}`, direction, children),
    
    generateSection: (children?: LayoutComponent[]) =>
      LayoutGenerator.createSection(`section-${Date.now()}`, children),
  };
}

export default {
  LayoutGenerator,
  LayoutTemplates,
  ResponsiveUtility,
  useLayoutBuilder,
  LayoutComponentSchema,
};
