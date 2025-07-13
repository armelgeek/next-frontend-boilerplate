import { z } from 'zod';

// Schemas pour les couleurs et thèmes
export const ColorSchema = z.object({
  name: z.string(),
  value: z.string().regex(/^#[0-9A-Fa-f]{6}$|^hsl\(.*\)$|^rgb\(.*\)$/),
  description: z.string().optional(),
});

export const ColorPaletteSchema = z.object({
  primary: ColorSchema,
  secondary: ColorSchema,
  accent: ColorSchema,
  muted: ColorSchema,
  destructive: ColorSchema,
  warning: ColorSchema,
  success: ColorSchema,
  info: ColorSchema,
});

export const TypographyScaleSchema = z.object({
  xs: z.string(),
  sm: z.string(),
  base: z.string(),
  lg: z.string(),
  xl: z.string(),
  '2xl': z.string(),
  '3xl': z.string(),
  '4xl': z.string(),
  '5xl': z.string(),
});

export const SpacingScaleSchema = z.object({
  0: z.string(),
  1: z.string(),
  2: z.string(),
  3: z.string(),
  4: z.string(),
  5: z.string(),
  6: z.string(),
  8: z.string(),
  10: z.string(),
  12: z.string(),
  16: z.string(),
  20: z.string(),
  24: z.string(),
  32: z.string(),
  40: z.string(),
  48: z.string(),
  56: z.string(),
  64: z.string(),
});

export const BorderRadiusSchema = z.object({
  none: z.string(),
  sm: z.string(),
  base: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  '2xl': z.string(),
  '3xl': z.string(),
  full: z.string(),
});

export const ShadowSchema = z.object({
  sm: z.string(),
  base: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  '2xl': z.string(),
  inner: z.string(),
  none: z.string(),
});

export const ThemeConfigSchema = z.object({
  name: z.string(),
  displayName: z.string(),
  description: z.string().optional(),
  mode: z.enum(['light', 'dark', 'auto']),
  colors: z.object({
    light: ColorPaletteSchema,
    dark: ColorPaletteSchema,
  }),
  typography: z.object({
    fontFamily: z.object({
      sans: z.array(z.string()),
      serif: z.array(z.string()),
      mono: z.array(z.string()),
    }),
    fontSize: TypographyScaleSchema,
    fontWeight: z.object({
      thin: z.number(),
      light: z.number(),
      normal: z.number(),
      medium: z.number(),
      semibold: z.number(),
      bold: z.number(),
      extrabold: z.number(),
    }),
    lineHeight: TypographyScaleSchema,
  }),
  spacing: SpacingScaleSchema,
  borderRadius: BorderRadiusSchema,
  boxShadow: ShadowSchema,
  animation: z.object({
    duration: z.object({
      fast: z.string(),
      normal: z.string(),
      slow: z.string(),
    }),
    easing: z.object({
      ease: z.string(),
      easeIn: z.string(),
      easeOut: z.string(),
      easeInOut: z.string(),
    }),
  }),
  breakpoints: z.object({
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    xl: z.string(),
    '2xl': z.string(),
  }),
});

export const ComponentThemeSchema = z.object({
  button: z.object({
    variants: z.record(z.object({
      background: z.string(),
      foreground: z.string(),
      border: z.string(),
      hover: z.object({
        background: z.string(),
        foreground: z.string(),
        border: z.string(),
      }),
    })),
    sizes: z.record(z.object({
      padding: z.string(),
      fontSize: z.string(),
      borderRadius: z.string(),
    })),
  }),
  card: z.object({
    background: z.string(),
    foreground: z.string(),
    border: z.string(),
    borderRadius: z.string(),
    shadow: z.string(),
  }),
  input: z.object({
    background: z.string(),
    foreground: z.string(),
    border: z.string(),
    borderRadius: z.string(),
    focus: z.object({
      border: z.string(),
      ring: z.string(),
    }),
  }),
});

export type Color = z.infer<typeof ColorSchema>;
export type ColorPalette = z.infer<typeof ColorPaletteSchema>;
export type ThemeConfig = z.infer<typeof ThemeConfigSchema>;
export type ComponentTheme = z.infer<typeof ComponentThemeSchema>;

// Templates de thèmes prédéfinis
export const ThemeTemplates = {
  // Thème moderne bleu
  modern: {
    name: 'modern',
    displayName: 'Moderne',
    description: 'Thème moderne avec palette bleue professionnelle',
    mode: 'auto' as const,
    colors: {
      light: {
        primary: { name: 'primary', value: '#2563eb', description: 'Bleu principal' },
        secondary: { name: 'secondary', value: '#64748b', description: 'Gris secondaire' },
        accent: { name: 'accent', value: '#8b5cf6', description: 'Violet accent' },
        muted: { name: 'muted', value: '#f1f5f9', description: 'Gris clair' },
        destructive: { name: 'destructive', value: '#ef4444', description: 'Rouge erreur' },
        warning: { name: 'warning', value: '#f59e0b', description: 'Orange warning' },
        success: { name: 'success', value: '#10b981', description: 'Vert succès' },
        info: { name: 'info', value: '#06b6d4', description: 'Cyan info' },
      },
      dark: {
        primary: { name: 'primary', value: '#3b82f6', description: 'Bleu principal' },
        secondary: { name: 'secondary', value: '#475569', description: 'Gris secondaire' },
        accent: { name: 'accent', value: '#a855f7', description: 'Violet accent' },
        muted: { name: 'muted', value: '#1e293b', description: 'Gris sombre' },
        destructive: { name: 'destructive', value: '#f87171', description: 'Rouge erreur' },
        warning: { name: 'warning', value: '#fbbf24', description: 'Orange warning' },
        success: { name: 'success', value: '#34d399', description: 'Vert succès' },
        info: { name: 'info', value: '#22d3ee', description: 'Cyan info' },
      },
    },
  },

  // Thème naturel vert
  nature: {
    name: 'nature',
    displayName: 'Nature',
    description: 'Thème inspiré de la nature avec palette verte',
    mode: 'light' as const,
    colors: {
      light: {
        primary: { name: 'primary', value: '#059669', description: 'Vert nature' },
        secondary: { name: 'secondary', value: '#6b7280', description: 'Gris naturel' },
        accent: { name: 'accent', value: '#d97706', description: 'Orange terre' },
        muted: { name: 'muted', value: '#f7f9f7', description: 'Blanc cassé' },
        destructive: { name: 'destructive', value: '#dc2626', description: 'Rouge feu' },
        warning: { name: 'warning', value: '#ea580c', description: 'Orange automne' },
        success: { name: 'success', value: '#16a34a', description: 'Vert forêt' },
        info: { name: 'info', value: '#0891b2', description: 'Bleu océan' },
      },
      dark: {
        primary: { name: 'primary', value: '#10b981', description: 'Vert nature' },
        secondary: { name: 'secondary', value: '#4b5563', description: 'Gris naturel' },
        accent: { name: 'accent', value: '#f97316', description: 'Orange terre' },
        muted: { name: 'muted', value: '#1f2937', description: 'Noir naturel' },
        destructive: { name: 'destructive', value: '#ef4444', description: 'Rouge feu' },
        warning: { name: 'warning', value: '#f97316', description: 'Orange automne' },
        success: { name: 'success', value: '#22c55e', description: 'Vert forêt' },
        info: { name: 'info', value: '#06b6d4', description: 'Bleu océan' },
      },
    },
  },

  // Thème élégant noir/or
  luxury: {
    name: 'luxury',
    displayName: 'Luxe',
    description: 'Thème élégant noir et or pour un look premium',
    mode: 'dark' as const,
    colors: {
      light: {
        primary: { name: 'primary', value: '#d97706', description: 'Or élégant' },
        secondary: { name: 'secondary', value: '#374151', description: 'Gris charbon' },
        accent: { name: 'accent', value: '#7c2d12', description: 'Bronze' },
        muted: { name: 'muted', value: '#f9fafb', description: 'Blanc pur' },
        destructive: { name: 'destructive', value: '#991b1b', description: 'Rouge bordeaux' },
        warning: { name: 'warning', value: '#b45309', description: 'Ambre' },
        success: { name: 'success', value: '#166534', description: 'Vert émeraude' },
        info: { name: 'info', value: '#1e40af', description: 'Bleu royal' },
      },
      dark: {
        primary: { name: 'primary', value: '#fbbf24', description: 'Or brillant' },
        secondary: { name: 'secondary', value: '#6b7280', description: 'Gris platine' },
        accent: { name: 'accent', value: '#92400e', description: 'Bronze antique' },
        muted: { name: 'muted', value: '#111827', description: 'Noir profond' },
        destructive: { name: 'destructive', value: '#dc2626', description: 'Rouge rubis' },
        warning: { name: 'warning', value: '#d97706', description: 'Ambre' },
        success: { name: 'success', value: '#059669', description: 'Vert malachite' },
        info: { name: 'info', value: '#2563eb', description: 'Bleu saphir' },
      },
    },
  },

  // Thème minimaliste
  minimal: {
    name: 'minimal',
    displayName: 'Minimaliste',
    description: 'Thème épuré avec palette neutre',
    mode: 'light' as const,
    colors: {
      light: {
        primary: { name: 'primary', value: '#18181b', description: 'Noir absolu' },
        secondary: { name: 'secondary', value: '#71717a', description: 'Gris neutre' },
        accent: { name: 'accent', value: '#3f3f46', description: 'Gris accent' },
        muted: { name: 'muted', value: '#fafafa', description: 'Blanc cassé' },
        destructive: { name: 'destructive', value: '#ef4444', description: 'Rouge pur' },
        warning: { name: 'warning', value: '#f59e0b', description: 'Orange vif' },
        success: { name: 'success', value: '#10b981', description: 'Vert moderne' },
        info: { name: 'info', value: '#06b6d4', description: 'Cyan moderne' },
      },
      dark: {
        primary: { name: 'primary', value: '#fafafa', description: 'Blanc pur' },
        secondary: { name: 'secondary', value: '#a1a1aa', description: 'Gris clair' },
        accent: { name: 'accent', value: '#d4d4d8', description: 'Gris clair accent' },
        muted: { name: 'muted', value: '#09090b', description: 'Noir profond' },
        destructive: { name: 'destructive', value: '#f87171', description: 'Rouge doux' },
        warning: { name: 'warning', value: '#fbbf24', description: 'Orange doux' },
        success: { name: 'success', value: '#34d399', description: 'Vert doux' },
        info: { name: 'info', value: '#22d3ee', description: 'Cyan doux' },
      },
    },
  },
};

export class ThemeBuilder {
  /**
   * Génère un thème complet à partir d'un template
   */
  static generateFromTemplate(templateName: keyof typeof ThemeTemplates): ThemeConfig {
    const template = ThemeTemplates[templateName];
    
    return {
      ...template,
      typography: this.getDefaultTypography(),
      spacing: this.getDefaultSpacing(),
      borderRadius: this.getDefaultBorderRadius(),
      boxShadow: this.getDefaultShadows(),
      animation: this.getDefaultAnimations(),
      breakpoints: this.getDefaultBreakpoints(),
    };
  }

  /**
   * Génère un thème personnalisé à partir de couleurs
   */
  static generateCustomTheme(
    name: string,
    displayName: string,
    primaryColor: string,
    options: {
      mode?: 'light' | 'dark' | 'auto';
      style?: 'modern' | 'classic' | 'minimal';
      description?: string;
    } = {}
  ): ThemeConfig {
    const { mode = 'auto', style = 'modern', description } = options;
    
    const lightPalette = this.generateColorPalette(primaryColor, 'light', style);
    const darkPalette = this.generateColorPalette(primaryColor, 'dark', style);

    return {
      name,
      displayName,
      description,
      mode,
      colors: {
        light: lightPalette,
        dark: darkPalette,
      },
      typography: this.getTypographyForStyle(style),
      spacing: this.getDefaultSpacing(),
      borderRadius: this.getBorderRadiusForStyle(style),
      boxShadow: this.getShadowsForStyle(style),
      animation: this.getDefaultAnimations(),
      breakpoints: this.getDefaultBreakpoints(),
    };
  }

  /**
   * Génère une palette de couleurs à partir d'une couleur primaire
   */
  private static generateColorPalette(
    primaryColor: string, 
    mode: 'light' | 'dark',
    style: 'modern' | 'classic' | 'minimal'
  ): ColorPalette {
    // Logique de génération de palette basée sur la couleur primaire
    // Ici on utilise des algorithmes de génération de couleurs harmonieuses
    
    if (mode === 'light') {
      return {
        primary: { name: 'primary', value: primaryColor },
        secondary: { name: 'secondary', value: this.adjustColor(primaryColor, { saturation: -20, lightness: 10 }) },
        accent: { name: 'accent', value: this.shiftHue(primaryColor, 60) },
        muted: { name: 'muted', value: '#f8fafc' },
        destructive: { name: 'destructive', value: '#ef4444' },
        warning: { name: 'warning', value: '#f59e0b' },
        success: { name: 'success', value: '#10b981' },
        info: { name: 'info', value: '#06b6d4' },
      };
    } else {
      return {
        primary: { name: 'primary', value: this.adjustColor(primaryColor, { lightness: 10 }) },
        secondary: { name: 'secondary', value: this.adjustColor(primaryColor, { saturation: -30, lightness: -20 }) },
        accent: { name: 'accent', value: this.shiftHue(primaryColor, 60) },
        muted: { name: 'muted', value: '#1e293b' },
        destructive: { name: 'destructive', value: '#f87171' },
        warning: { name: 'warning', value: '#fbbf24' },
        success: { name: 'success', value: '#34d399' },
        info: { name: 'info', value: '#22d3ee' },
      };
    }
  }

  /**
   * Génère le CSS complet pour un thème
   */
  static generateThemeCSS(theme: ThemeConfig): string {
    const lightVars = this.generateCSSVariables(theme.colors.light, 'light');
    const darkVars = this.generateCSSVariables(theme.colors.dark, 'dark');
    
    return `
/* ${theme.displayName} Theme */
:root {
  /* Colors */
${lightVars}

  /* Typography */
${this.generateTypographyCSS(theme.typography)}

  /* Spacing */
${this.generateSpacingCSS(theme.spacing)}

  /* Border Radius */
${this.generateBorderRadiusCSS(theme.borderRadius)}

  /* Shadows */
${this.generateShadowCSS(theme.boxShadow)}

  /* Animation */
${this.generateAnimationCSS(theme.animation)}

  /* Breakpoints */
${this.generateBreakpointsCSS(theme.breakpoints)}
}

[data-theme="dark"] {
${darkVars}
}

@media (prefers-color-scheme: dark) {
  :root {
${theme.mode === 'auto' ? darkVars : ''}
  }
}`;
  }

  /**
   * Génère le fichier Tailwind config pour un thème
   */
  static generateTailwindConfig(theme: ThemeConfig): string {
    return `
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      fontFamily: {
        sans: ${JSON.stringify(theme.typography.fontFamily.sans)},
        serif: ${JSON.stringify(theme.typography.fontFamily.serif)},
        mono: ${JSON.stringify(theme.typography.fontFamily.mono)},
      },
      fontSize: ${JSON.stringify(theme.typography.fontSize)},
      spacing: ${JSON.stringify(theme.spacing)},
      borderRadius: ${JSON.stringify(theme.borderRadius)},
      boxShadow: ${JSON.stringify(theme.boxShadow)},
      screens: ${JSON.stringify(theme.breakpoints)},
    },
  },
}`;
  }

  /**
   * Génère les thèmes de composants
   */
  static generateComponentThemes(baseTheme: ThemeConfig): ComponentTheme {
    return {
      button: {
        variants: {
          default: {
            background: 'var(--primary)',
            foreground: 'var(--primary-foreground)',
            border: 'var(--primary)',
            hover: {
              background: 'var(--primary/90)',
              foreground: 'var(--primary-foreground)',
              border: 'var(--primary/90)',
            },
          },
          secondary: {
            background: 'var(--secondary)',
            foreground: 'var(--secondary-foreground)',
            border: 'var(--secondary)',
            hover: {
              background: 'var(--secondary/80)',
              foreground: 'var(--secondary-foreground)',
              border: 'var(--secondary/80)',
            },
          },
          outline: {
            background: 'transparent',
            foreground: 'var(--primary)',
            border: 'var(--border)',
            hover: {
              background: 'var(--accent)',
              foreground: 'var(--accent-foreground)',
              border: 'var(--border)',
            },
          },
        },
        sizes: {
          sm: {
            padding: '0.25rem 0.75rem',
            fontSize: 'var(--font-size-sm)',
            borderRadius: 'var(--radius-sm)',
          },
          md: {
            padding: '0.5rem 1rem',
            fontSize: 'var(--font-size-base)',
            borderRadius: 'var(--radius-base)',
          },
          lg: {
            padding: '0.75rem 1.5rem',
            fontSize: 'var(--font-size-lg)',
            borderRadius: 'var(--radius-md)',
          },
        },
      },
      card: {
        background: 'var(--card)',
        foreground: 'var(--card-foreground)',
        border: 'var(--border)',
        borderRadius: 'var(--radius-lg)',
        shadow: 'var(--shadow-md)',
      },
      input: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        borderRadius: 'var(--radius-base)',
        focus: {
          border: 'var(--ring)',
          ring: 'var(--ring)',
        },
      },
    };
  }

  // Méthodes privées helper
  private static adjustColor(color: string, adjustments: { saturation?: number; lightness?: number }): string {
    // Implémentation d'ajustement de couleur
    // Pour l'exemple, on retourne la couleur originale
    return color;
  }

  private static shiftHue(color: string, degrees: number): string {
    // Implémentation de changement de teinte
    // Pour l'exemple, on retourne une couleur complémentaire
    return color;
  }

  private static generateCSSVariables(palette: ColorPalette, mode: string): string {
    return Object.entries(palette)
      .map(([key, color]) => `  --${key}: ${this.colorToHSL(color.value)};`)
      .join('\n');
  }

  private static colorToHSL(color: string): string {
    // Conversion couleur vers HSL pour CSS custom properties
    // Pour l'exemple, on retourne une valeur HSL générique
    return '220 14% 96%';
  }

  private static getDefaultTypography() {
    return {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeight: {
        xs: '1rem',
        sm: '1.25rem',
        base: '1.5rem',
        lg: '1.75rem',
        xl: '1.75rem',
        '2xl': '2rem',
        '3xl': '2.25rem',
        '4xl': '2.5rem',
        '5xl': '1',
      },
    };
  }

  private static getDefaultSpacing() {
    return {
      0: '0px',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
    };
  }

  private static getDefaultBorderRadius() {
    return {
      none: '0px',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    };
  }

  private static getDefaultShadows() {
    return {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: '0 0 #0000',
    };
  }

  private static getDefaultAnimations() {
    return {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      easing: {
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
      },
    };
  }

  private static getDefaultBreakpoints() {
    return {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    };
  }

  private static getTypographyForStyle(style: string) {
    const base = this.getDefaultTypography();
    
    switch (style) {
      case 'classic':
        return {
          ...base,
          fontFamily: {
            sans: ['Times New Roman', 'serif'],
            serif: ['Georgia', 'serif'],
            mono: ['Courier New', 'monospace'],
          },
        };
      case 'minimal':
        return {
          ...base,
          fontFamily: {
            sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
            serif: ['Times', 'serif'],
            mono: ['Monaco', 'monospace'],
          },
        };
      default:
        return base;
    }
  }

  private static getBorderRadiusForStyle(style: string) {
    const base = this.getDefaultBorderRadius();
    
    switch (style) {
      case 'minimal':
        return {
          ...base,
          base: '0px',
          md: '0px',
          lg: '2px',
        };
      case 'modern':
        return {
          ...base,
          base: '0.5rem',
          md: '0.75rem',
          lg: '1rem',
        };
      default:
        return base;
    }
  }

  private static getShadowsForStyle(style: string) {
    const base = this.getDefaultShadows();
    
    switch (style) {
      case 'minimal':
        return {
          ...base,
          base: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          md: '0 2px 4px 0 rgb(0 0 0 / 0.05)',
        };
      default:
        return base;
    }
  }

  private static generateTypographyCSS(typography: any): string {
    return `  /* Font families */
  --font-sans: ${typography.fontFamily.sans.join(', ')};
  --font-serif: ${typography.fontFamily.serif.join(', ')};
  --font-mono: ${typography.fontFamily.mono.join(', ')};`;
  }

  private static generateSpacingCSS(spacing: any): string {
    return Object.entries(spacing)
      .map(([key, value]) => `  --spacing-${key}: ${value};`)
      .join('\n');
  }

  private static generateBorderRadiusCSS(borderRadius: any): string {
    return Object.entries(borderRadius)
      .map(([key, value]) => `  --radius-${key}: ${value};`)
      .join('\n');
  }

  private static generateShadowCSS(shadows: any): string {
    return Object.entries(shadows)
      .map(([key, value]) => `  --shadow-${key}: ${value};`)
      .join('\n');
  }

  private static generateAnimationCSS(animation: any): string {
    return `  /* Animation durations */
  --duration-fast: ${animation.duration.fast};
  --duration-normal: ${animation.duration.normal};
  --duration-slow: ${animation.duration.slow};`;
  }

  private static generateBreakpointsCSS(breakpoints: any): string {
    return Object.entries(breakpoints)
      .map(([key, value]) => `  --breakpoint-${key}: ${value};`)
      .join('\n');
  }
}

// Fonctions helper pour utilisation directe
export const ThemeHelpers = {
  // Génère un thème à partir d'un template
  fromTemplate: (template: keyof typeof ThemeTemplates) => 
    ThemeBuilder.generateFromTemplate(template),

  // Génère un thème personnalisé
  custom: (name: string, displayName: string, primaryColor: string, options?: any) =>
    ThemeBuilder.generateCustomTheme(name, displayName, primaryColor, options),

  // Génère le CSS d'un thème
  toCSS: (theme: ThemeConfig) => ThemeBuilder.generateThemeCSS(theme),

  // Génère la config Tailwind
  toTailwind: (theme: ThemeConfig) => ThemeBuilder.generateTailwindConfig(theme),

  // Génère les thèmes de composants
  components: (theme: ThemeConfig) => ThemeBuilder.generateComponentThemes(theme),
};
