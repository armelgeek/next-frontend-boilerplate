/**
 * Configuration des thèmes pour chaque variant de navbar
 * Système de thèmes global utilisable dans tout le projet
 */

export interface ThemeColors {
  // Couleurs primaires
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  
  // Couleurs de fond
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  
  // Couleurs d'accent
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  
  // Couleurs de bordure
  border: string;
  input: string;
  ring: string;
  
  // États
  destructive: string;
  destructiveForeground: string;
  warning: string;
  warningForeground: string;
  success: string;
  successForeground: string;
}

export interface ThemeTypography {
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
    black: string;
  };
}

export interface ThemeSpacing {
  borderRadius: {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
}

export interface ThemeEffects {
  boxShadow: {
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
  };
  animation: {
    duration: string;
    easing: string;
  };
  blur: {
    sm: string;
    base: string;
    md: string;
    lg: string;
  };
}

export interface NavbarTheme {
  name: string;
  variant: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  effects: ThemeEffects;
  customProperties?: Record<string, string>;
}

// Thèmes pour chaque variant de navbar
export const navbarThemes: Record<string, NavbarTheme> = {
  default: {
    name: "Default Theme",
    variant: "default",
    colors: {
      primary: "hsl(222, 84%, 55%)",
      primaryForeground: "hsl(210, 40%, 98%)",
      secondary: "hsl(210, 40%, 96%)",
      secondaryForeground: "hsl(222, 84%, 45%)",
      background: "hsl(0, 0%, 100%)",
      foreground: "hsl(222, 84%, 5%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(222, 84%, 5%)",
      accent: "hsl(210, 40%, 96%)",
      accentForeground: "hsl(222, 84%, 45%)",
      muted: "hsl(210, 40%, 96%)",
      mutedForeground: "hsl(215, 16%, 47%)",
      border: "hsl(214, 32%, 91%)",
      input: "hsl(214, 32%, 91%)",
      ring: "hsl(222, 84%, 55%)",
      destructive: "hsl(0, 84%, 60%)",
      destructiveForeground: "hsl(210, 40%, 98%)",
      warning: "hsl(38, 92%, 50%)",
      warningForeground: "hsl(48, 96%, 89%)",
      success: "hsl(142, 76%, 36%)",
      successForeground: "hsl(355, 100%, 97%)"
    },
    typography: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      },
      animation: {
        duration: "150ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    }
  },

  glassmorphism: {
    name: "Glassmorphism Theme",
    variant: "glassmorphism",
    colors: {
      primary: "hsl(280, 100%, 70%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "rgba(255, 255, 255, 0.1)",
      secondaryForeground: "hsl(0, 0%, 100%)",
      background: "rgba(255, 255, 255, 0.05)",
      foreground: "hsl(0, 0%, 100%)",
      card: "rgba(255, 255, 255, 0.1)",
      cardForeground: "hsl(0, 0%, 100%)",
      accent: "rgba(255, 255, 255, 0.2)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "rgba(255, 255, 255, 0.1)",
      mutedForeground: "rgba(255, 255, 255, 0.7)",
      border: "rgba(255, 255, 255, 0.2)",
      input: "rgba(255, 255, 255, 0.1)",
      ring: "hsl(280, 100%, 70%)",
      destructive: "hsl(0, 84%, 60%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(38, 92%, 50%)",
      warningForeground: "hsl(0, 0%, 100%)",
      success: "hsl(142, 76%, 36%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
        base: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      },
      animation: {
        duration: "300ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "12px",
        md: "16px",
        lg: "24px"
      }
    },
    customProperties: {
      "--glass-opacity": "0.1",
      "--glass-blur": "12px",
      "--glass-border": "rgba(255, 255, 255, 0.2)"
    }
  },

  dark: {
    name: "Dark Theme",
    variant: "dark",
    colors: {
      primary: "hsl(210, 40%, 98%)",
      primaryForeground: "hsl(222, 84%, 5%)",
      secondary: "hsl(217, 19%, 15%)",
      secondaryForeground: "hsl(210, 40%, 98%)",
      background: "hsl(222, 84%, 5%)",
      foreground: "hsl(210, 40%, 98%)",
      card: "hsl(222, 84%, 5%)",
      cardForeground: "hsl(210, 40%, 98%)",
      accent: "hsl(217, 19%, 15%)",
      accentForeground: "hsl(210, 40%, 98%)",
      muted: "hsl(217, 19%, 15%)",
      mutedForeground: "hsl(215, 20%, 65%)",
      border: "hsl(217, 19%, 15%)",
      input: "hsl(217, 19%, 15%)",
      ring: "hsl(212, 72%, 59%)",
      destructive: "hsl(0, 62%, 30%)",
      destructiveForeground: "hsl(210, 40%, 98%)",
      warning: "hsl(38, 92%, 50%)",
      warningForeground: "hsl(222, 84%, 5%)",
      success: "hsl(142, 76%, 36%)",
      successForeground: "hsl(355, 100%, 97%)"
    },
    typography: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        base: "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)"
      },
      animation: {
        duration: "150ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    }
  },

  neon: {
    name: "Neon Theme",
    variant: "neon",
    colors: {
      primary: "hsl(120, 100%, 50%)",
      primaryForeground: "hsl(222, 84%, 5%)",
      secondary: "hsl(222, 84%, 5%)",
      secondaryForeground: "hsl(120, 100%, 50%)",
      background: "hsl(222, 84%, 5%)",
      foreground: "hsl(120, 100%, 50%)",
      card: "hsl(222, 84%, 5%)",
      cardForeground: "hsl(120, 100%, 50%)",
      accent: "hsl(120, 100%, 25%)",
      accentForeground: "hsl(120, 100%, 50%)",
      muted: "hsl(222, 84%, 10%)",
      mutedForeground: "hsl(120, 50%, 70%)",
      border: "hsl(120, 100%, 50%)",
      input: "hsl(222, 84%, 10%)",
      ring: "hsl(120, 100%, 50%)",
      destructive: "hsl(0, 100%, 50%)",
      destructiveForeground: "hsl(222, 84%, 5%)",
      warning: "hsl(60, 100%, 50%)",
      warningForeground: "hsl(222, 84%, 5%)",
      success: "hsl(120, 100%, 50%)",
      successForeground: "hsl(222, 84%, 5%)"
    },
    typography: {
      fontFamily: {
        sans: ["Orbitron", "monospace"],
        serif: ["Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 0 5px hsl(120, 100%, 50%)",
        base: "0 0 10px hsl(120, 100%, 50%)",
        md: "0 0 15px hsl(120, 100%, 50%)",
        lg: "0 0 20px hsl(120, 100%, 50%)",
        xl: "0 0 30px hsl(120, 100%, 50%)"
      },
      animation: {
        duration: "200ms",
        easing: "ease-in-out"
      },
      blur: {
        sm: "2px",
        base: "4px",
        md: "6px",
        lg: "8px"
      }
    },
    customProperties: {
      "--neon-glow": "0 0 10px hsl(120, 100%, 50%)",
      "--neon-pulse": "pulse 2s infinite"
    }
  },

  retro: {
    name: "Retro Theme",
    variant: "retro",
    colors: {
      primary: "hsl(25, 95%, 53%)",
      primaryForeground: "hsl(33, 92%, 18%)",
      secondary: "hsl(33, 92%, 18%)",
      secondaryForeground: "hsl(25, 95%, 53%)",
      background: "hsl(33, 100%, 85%)",
      foreground: "hsl(33, 92%, 18%)",
      card: "hsl(33, 100%, 90%)",
      cardForeground: "hsl(33, 92%, 18%)",
      accent: "hsl(25, 95%, 53%)",
      accentForeground: "hsl(33, 100%, 85%)",
      muted: "hsl(33, 100%, 75%)",
      mutedForeground: "hsl(33, 60%, 35%)",
      border: "hsl(33, 92%, 18%)",
      input: "hsl(33, 100%, 75%)",
      ring: "hsl(25, 95%, 53%)",
      destructive: "hsl(0, 84%, 60%)",
      destructiveForeground: "hsl(33, 100%, 85%)",
      warning: "hsl(38, 92%, 50%)",
      warningForeground: "hsl(33, 92%, 18%)",
      success: "hsl(142, 76%, 36%)",
      successForeground: "hsl(33, 100%, 85%)"
    },
    typography: {
      fontFamily: {
        sans: ["Bungee", "cursive"],
        serif: ["Georgia", "serif"],
        mono: ["Courier New", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0",
        base: "0",
        md: "0",
        lg: "0",
        xl: "0",
        full: "0"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "2px 2px 0 hsl(33, 92%, 18%)",
        base: "4px 4px 0 hsl(33, 92%, 18%)",
        md: "6px 6px 0 hsl(33, 92%, 18%)",
        lg: "8px 8px 0 hsl(33, 92%, 18%)",
        xl: "12px 12px 0 hsl(33, 92%, 18%)"
      },
      animation: {
        duration: "100ms",
        easing: "ease-out"
      },
      blur: {
        sm: "0px",
        base: "0px",
        md: "0px",
        lg: "0px"
      }
    },
    customProperties: {
      "--retro-shadow": "4px 4px 0 hsl(33, 92%, 18%)",
      "--retro-border": "4px solid hsl(33, 92%, 18%)"
    }
  },

  // Thèmes pour les variants professionnels

  corporate: {
    name: "Corporate Theme",
    variant: "corporate",
    colors: {
      primary: "hsl(210, 100%, 25%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(210, 15%, 85%)",
      secondaryForeground: "hsl(210, 100%, 25%)",
      background: "hsl(0, 0%, 98%)",
      foreground: "hsl(210, 20%, 15%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(210, 20%, 15%)",
      accent: "hsl(210, 100%, 40%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(210, 15%, 92%)",
      mutedForeground: "hsl(210, 10%, 50%)",
      border: "hsl(210, 15%, 88%)",
      input: "hsl(210, 15%, 95%)",
      ring: "hsl(210, 100%, 25%)",
      destructive: "hsl(0, 75%, 50%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(45, 100%, 45%)",
      warningForeground: "hsl(210, 20%, 15%)",
      success: "hsl(120, 50%, 35%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        serif: ["IBM Plex Serif", "serif"],
        mono: ["IBM Plex Mono", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      },
      animation: {
        duration: "200ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    }
  },

  medical: {
    name: "Medical Theme",
    variant: "medical",
    colors: {
      primary: "hsl(195, 100%, 35%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(195, 20%, 90%)",
      secondaryForeground: "hsl(195, 100%, 25%)",
      background: "hsl(0, 0%, 99%)",
      foreground: "hsl(195, 30%, 20%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(195, 30%, 20%)",
      accent: "hsl(150, 60%, 45%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(195, 20%, 95%)",
      mutedForeground: "hsl(195, 15%, 55%)",
      border: "hsl(195, 20%, 88%)",
      input: "hsl(195, 20%, 96%)",
      ring: "hsl(195, 100%, 35%)",
      destructive: "hsl(0, 70%, 45%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(40, 95%, 50%)",
      warningForeground: "hsl(195, 30%, 20%)",
      success: "hsl(150, 60%, 45%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Source Sans Pro", "system-ui", "sans-serif"],
        serif: ["Source Serif Pro", "serif"],
        mono: ["Source Code Pro", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      },
      animation: {
        duration: "150ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--medical-clean": "hsl(195, 20%, 95%)",
      "--medical-trust": "hsl(195, 100%, 35%)"
    }
  },

  gaming: {
    name: "Gaming Theme",
    variant: "gaming",
    colors: {
      primary: "hsl(270, 100%, 60%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(330, 100%, 50%)",
      secondaryForeground: "hsl(0, 0%, 100%)",
      background: "hsl(220, 25%, 8%)",
      foreground: "hsl(0, 0%, 95%)",
      card: "hsl(220, 25%, 12%)",
      cardForeground: "hsl(0, 0%, 95%)",
      accent: "hsl(180, 100%, 50%)",
      accentForeground: "hsl(220, 25%, 8%)",
      muted: "hsl(220, 25%, 16%)",
      mutedForeground: "hsl(0, 0%, 70%)",
      border: "hsl(270, 50%, 30%)",
      input: "hsl(220, 25%, 16%)",
      ring: "hsl(270, 100%, 60%)",
      destructive: "hsl(0, 100%, 60%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(50, 100%, 60%)",
      warningForeground: "hsl(220, 25%, 8%)",
      success: "hsl(120, 100%, 50%)",
      successForeground: "hsl(220, 25%, 8%)"
    },
    typography: {
      fontFamily: {
        sans: ["Rajdhani", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Fira Code", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 0 5px hsl(270, 100%, 60%)",
        base: "0 0 10px hsl(270, 100%, 60%)",
        md: "0 0 15px hsl(270, 100%, 60%)",
        lg: "0 0 20px hsl(270, 100%, 60%)",
        xl: "0 0 30px hsl(270, 100%, 60%)"
      },
      animation: {
        duration: "250ms",
        easing: "ease-in-out"
      },
      blur: {
        sm: "2px",
        base: "4px",
        md: "6px",
        lg: "8px"
      }
    },
    customProperties: {
      "--gaming-glow": "0 0 15px hsl(270, 100%, 60%)",
      "--gaming-pulse": "gaming-pulse 1.5s infinite"
    }
  },

  restaurant: {
    name: "Restaurant Theme",
    variant: "restaurant",
    colors: {
      primary: "hsl(25, 80%, 45%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(45, 60%, 85%)",
      secondaryForeground: "hsl(25, 80%, 25%)",
      background: "hsl(45, 60%, 95%)",
      foreground: "hsl(25, 40%, 15%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(25, 40%, 15%)",
      accent: "hsl(350, 70%, 50%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(45, 40%, 88%)",
      mutedForeground: "hsl(25, 20%, 45%)",
      border: "hsl(45, 40%, 80%)",
      input: "hsl(45, 40%, 92%)",
      ring: "hsl(25, 80%, 45%)",
      destructive: "hsl(0, 70%, 50%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(40, 90%, 55%)",
      warningForeground: "hsl(25, 40%, 15%)",
      success: "hsl(120, 60%, 40%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Playfair Display", "serif"],
        serif: ["Crimson Text", "serif"],
        mono: ["Courier New", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(139 69 19 / 0.1)",
        base: "0 1px 3px 0 rgb(139 69 19 / 0.2), 0 1px 2px -1px rgb(139 69 19 / 0.1)",
        md: "0 4px 6px -1px rgb(139 69 19 / 0.2), 0 2px 4px -2px rgb(139 69 19 / 0.1)",
        lg: "0 10px 15px -3px rgb(139 69 19 / 0.2), 0 4px 6px -4px rgb(139 69 19 / 0.1)",
        xl: "0 20px 25px -5px rgb(139 69 19 / 0.2), 0 8px 10px -6px rgb(139 69 19 / 0.1)"
      },
      animation: {
        duration: "200ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--restaurant-warm": "hsl(25, 80%, 45%)",
      "--restaurant-comfort": "hsl(45, 60%, 85%)"
    }
  },

  // Thèmes pour les secteurs spécialisés

  travel: {
    name: "Travel Theme",
    variant: "travel",
    colors: {
      primary: "hsl(200, 85%, 50%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(200, 30%, 85%)",
      secondaryForeground: "hsl(200, 85%, 30%)",
      background: "hsl(200, 30%, 98%)",
      foreground: "hsl(200, 50%, 15%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(200, 50%, 15%)",
      accent: "hsl(35, 90%, 55%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(200, 30%, 92%)",
      mutedForeground: "hsl(200, 20%, 50%)",
      border: "hsl(200, 30%, 85%)",
      input: "hsl(200, 30%, 95%)",
      ring: "hsl(200, 85%, 50%)",
      destructive: "hsl(0, 75%, 50%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(35, 90%, 55%)",
      warningForeground: "hsl(200, 50%, 15%)",
      success: "hsl(150, 70%, 40%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Nunito", "system-ui", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Monaco", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(59 130 246 / 0.1)",
        base: "0 1px 3px 0 rgb(59 130 246 / 0.15), 0 1px 2px -1px rgb(59 130 246 / 0.1)",
        md: "0 4px 6px -1px rgb(59 130 246 / 0.15), 0 2px 4px -2px rgb(59 130 246 / 0.1)",
        lg: "0 10px 15px -3px rgb(59 130 246 / 0.15), 0 4px 6px -4px rgb(59 130 246 / 0.1)",
        xl: "0 20px 25px -5px rgb(59 130 246 / 0.15), 0 8px 10px -6px rgb(59 130 246 / 0.1)"
      },
      animation: {
        duration: "200ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--travel-sky": "hsl(200, 85%, 50%)",
      "--travel-sun": "hsl(35, 90%, 55%)"
    }
  },

  finance: {
    name: "Finance Theme",
    variant: "finance",
    colors: {
      primary: "hsl(210, 70%, 35%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(210, 15%, 88%)",
      secondaryForeground: "hsl(210, 70%, 25%)",
      background: "hsl(210, 15%, 98%)",
      foreground: "hsl(210, 30%, 12%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(210, 30%, 12%)",
      accent: "hsl(140, 60%, 40%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(210, 15%, 93%)",
      mutedForeground: "hsl(210, 15%, 45%)",
      border: "hsl(210, 15%, 85%)",
      input: "hsl(210, 15%, 96%)",
      ring: "hsl(210, 70%, 35%)",
      destructive: "hsl(0, 75%, 45%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(45, 85%, 50%)",
      warningForeground: "hsl(210, 30%, 12%)",
      success: "hsl(140, 60%, 40%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
        serif: ["Roboto Slab", "serif"],
        mono: ["Roboto Mono", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(30 64 175 / 0.1)",
        base: "0 1px 3px 0 rgb(30 64 175 / 0.15), 0 1px 2px -1px rgb(30 64 175 / 0.1)",
        md: "0 4px 6px -1px rgb(30 64 175 / 0.15), 0 2px 4px -2px rgb(30 64 175 / 0.1)",
        lg: "0 10px 15px -3px rgb(30 64 175 / 0.15), 0 4px 6px -4px rgb(30 64 175 / 0.1)",
        xl: "0 20px 25px -5px rgb(30 64 175 / 0.15), 0 8px 10px -6px rgb(30 64 175 / 0.1)"
      },
      animation: {
        duration: "150ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--finance-trust": "hsl(210, 70%, 35%)",
      "--finance-growth": "hsl(140, 60%, 40%)"
    }
  },

  education: {
    name: "Education Theme",
    variant: "education",
    colors: {
      primary: "hsl(210, 80%, 50%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(45, 70%, 85%)",
      secondaryForeground: "hsl(210, 80%, 30%)",
      background: "hsl(45, 70%, 98%)",
      foreground: "hsl(210, 40%, 15%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(210, 40%, 15%)",
      accent: "hsl(270, 60%, 55%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(45, 50%, 92%)",
      mutedForeground: "hsl(210, 20%, 50%)",
      border: "hsl(45, 50%, 85%)",
      input: "hsl(45, 50%, 95%)",
      ring: "hsl(210, 80%, 50%)",
      destructive: "hsl(0, 75%, 50%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(35, 90%, 55%)",
      warningForeground: "hsl(210, 40%, 15%)",
      success: "hsl(140, 70%, 45%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Open Sans", "system-ui", "sans-serif"],
        serif: ["Lora", "serif"],
        mono: ["Inconsolata", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(59 130 246 / 0.1)",
        base: "0 1px 3px 0 rgb(59 130 246 / 0.15), 0 1px 2px -1px rgb(59 130 246 / 0.1)",
        md: "0 4px 6px -1px rgb(59 130 246 / 0.15), 0 2px 4px -2px rgb(59 130 246 / 0.1)",
        lg: "0 10px 15px -3px rgb(59 130 246 / 0.15), 0 4px 6px -4px rgb(59 130 246 / 0.1)",
        xl: "0 20px 25px -5px rgb(59 130 246 / 0.15), 0 8px 10px -6px rgb(59 130 246 / 0.1)"
      },
      animation: {
        duration: "200ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--education-knowledge": "hsl(210, 80%, 50%)",
      "--education-wisdom": "hsl(270, 60%, 55%)"
    }
  },

  // Thèmes créatifs et artistiques

  creative: {
    name: "Creative Theme",
    variant: "creative",
    colors: {
      primary: "hsl(300, 80%, 60%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(50, 90%, 80%)",
      secondaryForeground: "hsl(300, 80%, 30%)",
      background: "hsl(50, 90%, 98%)",
      foreground: "hsl(300, 50%, 15%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(300, 50%, 15%)",
      accent: "hsl(180, 70%, 50%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(50, 70%, 92%)",
      mutedForeground: "hsl(300, 30%, 50%)",
      border: "hsl(50, 70%, 85%)",
      input: "hsl(50, 70%, 95%)",
      ring: "hsl(300, 80%, 60%)",
      destructive: "hsl(0, 75%, 55%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(40, 90%, 60%)",
      warningForeground: "hsl(300, 50%, 15%)",
      success: "hsl(140, 70%, 50%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(192 38 211 / 0.1)",
        base: "0 1px 3px 0 rgb(192 38 211 / 0.2), 0 1px 2px -1px rgb(192 38 211 / 0.1)",
        md: "0 4px 6px -1px rgb(192 38 211 / 0.2), 0 2px 4px -2px rgb(192 38 211 / 0.1)",
        lg: "0 10px 15px -3px rgb(192 38 211 / 0.2), 0 4px 6px -4px rgb(192 38 211 / 0.1)",
        xl: "0 20px 25px -5px rgb(192 38 211 / 0.2), 0 8px 10px -6px rgb(192 38 211 / 0.1)"
      },
      animation: {
        duration: "300ms",
        easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--creative-vibrant": "hsl(300, 80%, 60%)",
      "--creative-bright": "hsl(50, 90%, 80%)"
    }
  },

  agency: {
    name: "Agency Theme",
    variant: "agency",
    colors: {
      primary: "hsl(0, 0%, 10%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(0, 0%, 92%)",
      secondaryForeground: "hsl(0, 0%, 10%)",
      background: "hsl(0, 0%, 100%)",
      foreground: "hsl(0, 0%, 10%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(0, 0%, 10%)",
      accent: "hsl(350, 85%, 55%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(0, 0%, 96%)",
      mutedForeground: "hsl(0, 0%, 45%)",
      border: "hsl(0, 0%, 88%)",
      input: "hsl(0, 0%, 98%)",
      ring: "hsl(0, 0%, 10%)",
      destructive: "hsl(0, 85%, 55%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(40, 90%, 55%)",
      warningForeground: "hsl(0, 0%, 10%)",
      success: "hsl(140, 70%, 45%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        serif: ["Crimson Pro", "serif"],
        mono: ["Fira Code", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.1)",
        base: "0 1px 3px 0 rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.15), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      },
      animation: {
        duration: "150ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--agency-bold": "hsl(0, 0%, 10%)",
      "--agency-accent": "hsl(350, 85%, 55%)"
    }
  },

  // Thèmes technologiques et startups

  saas: {
    name: "SaaS Theme",
    variant: "saas",
    colors: {
      primary: "hsl(260, 85%, 60%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(260, 25%, 90%)",
      secondaryForeground: "hsl(260, 85%, 25%)",
      background: "hsl(260, 25%, 98%)",
      foreground: "hsl(260, 40%, 12%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(260, 40%, 12%)",
      accent: "hsl(190, 80%, 55%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(260, 25%, 94%)",
      mutedForeground: "hsl(260, 20%, 45%)",
      border: "hsl(260, 25%, 87%)",
      input: "hsl(260, 25%, 96%)",
      ring: "hsl(260, 85%, 60%)",
      destructive: "hsl(0, 80%, 55%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(40, 90%, 60%)",
      warningForeground: "hsl(260, 40%, 12%)",
      success: "hsl(150, 75%, 45%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Inter", "serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(124 58 237 / 0.1)",
        base: "0 1px 3px 0 rgb(124 58 237 / 0.15), 0 1px 2px -1px rgb(124 58 237 / 0.1)",
        md: "0 4px 6px -1px rgb(124 58 237 / 0.15), 0 2px 4px -2px rgb(124 58 237 / 0.1)",
        lg: "0 10px 15px -3px rgb(124 58 237 / 0.15), 0 4px 6px -4px rgb(124 58 237 / 0.1)",
        xl: "0 20px 25px -5px rgb(124 58 237 / 0.15), 0 8px 10px -6px rgb(124 58 237 / 0.1)"
      },
      animation: {
        duration: "200ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--saas-primary": "hsl(260, 85%, 60%)",
      "--saas-accent": "hsl(190, 80%, 55%)"
    }
  },

  portfolio: {
    name: "Portfolio Theme",
    variant: "portfolio",
    colors: {
      primary: "hsl(200, 70%, 40%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(40, 60%, 88%)",
      secondaryForeground: "hsl(200, 70%, 20%)",
      background: "hsl(40, 60%, 97%)",
      foreground: "hsl(200, 40%, 15%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(200, 40%, 15%)",
      accent: "hsl(320, 70%, 55%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(40, 40%, 92%)",
      mutedForeground: "hsl(200, 25%, 50%)",
      border: "hsl(40, 40%, 85%)",
      input: "hsl(40, 40%, 95%)",
      ring: "hsl(200, 70%, 40%)",
      destructive: "hsl(0, 75%, 50%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(35, 85%, 55%)",
      warningForeground: "hsl(200, 40%, 15%)",
      success: "hsl(140, 70%, 45%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Source Sans Pro", "system-ui", "sans-serif"],
        serif: ["Source Serif Pro", "serif"],
        mono: ["Source Code Pro", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(56 134 170 / 0.1)",
        base: "0 1px 3px 0 rgb(56 134 170 / 0.15), 0 1px 2px -1px rgb(56 134 170 / 0.1)",
        md: "0 4px 6px -1px rgb(56 134 170 / 0.15), 0 2px 4px -2px rgb(56 134 170 / 0.1)",
        lg: "0 10px 15px -3px rgb(56 134 170 / 0.15), 0 4px 6px -4px rgb(56 134 170 / 0.1)",
        xl: "0 20px 25px -5px rgb(56 134 170 / 0.15), 0 8px 10px -6px rgb(56 134 170 / 0.1)"
      },
      animation: {
        duration: "250ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--portfolio-professional": "hsl(200, 70%, 40%)",
      "--portfolio-creative": "hsl(320, 70%, 55%)"
    }
  },

  // Thèmes pour contenus et médias

  blog: {
    name: "Blog Theme",
    variant: "blog",
    colors: {
      primary: "hsl(220, 60%, 50%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(50, 50%, 88%)",
      secondaryForeground: "hsl(220, 60%, 25%)",
      background: "hsl(50, 50%, 98%)",
      foreground: "hsl(220, 40%, 12%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(220, 40%, 12%)",
      accent: "hsl(30, 80%, 55%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(50, 40%, 93%)",
      mutedForeground: "hsl(220, 25%, 45%)",
      border: "hsl(50, 40%, 87%)",
      input: "hsl(50, 40%, 96%)",
      ring: "hsl(220, 60%, 50%)",
      destructive: "hsl(0, 70%, 50%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(40, 85%, 55%)",
      warningForeground: "hsl(220, 40%, 12%)",
      success: "hsl(140, 65%, 45%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Lato", "system-ui", "sans-serif"],
        serif: ["Lora", "serif"],
        mono: ["Inconsolata", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(37 99 235 / 0.1)",
        base: "0 1px 3px 0 rgb(37 99 235 / 0.15), 0 1px 2px -1px rgb(37 99 235 / 0.1)",
        md: "0 4px 6px -1px rgb(37 99 235 / 0.15), 0 2px 4px -2px rgb(37 99 235 / 0.1)",
        lg: "0 10px 15px -3px rgb(37 99 235 / 0.15), 0 4px 6px -4px rgb(37 99 235 / 0.1)",
        xl: "0 20px 25px -5px rgb(37 99 235 / 0.15), 0 8px 10px -6px rgb(37 99 235 / 0.1)"
      },
      animation: {
        duration: "200ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--blog-primary": "hsl(220, 60%, 50%)",
      "--blog-accent": "hsl(30, 80%, 55%)"
    }
  },

  ecommerce: {
    name: "E-commerce Theme",
    variant: "ecommerce",
    colors: {
      primary: "hsl(160, 80%, 35%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(25, 70%, 85%)",
      secondaryForeground: "hsl(160, 80%, 20%)",
      background: "hsl(25, 70%, 98%)",
      foreground: "hsl(160, 40%, 12%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(160, 40%, 12%)",
      accent: "hsl(15, 85%, 55%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(25, 50%, 93%)",
      mutedForeground: "hsl(160, 25%, 45%)",
      border: "hsl(25, 50%, 87%)",
      input: "hsl(25, 50%, 96%)",
      ring: "hsl(160, 80%, 35%)",
      destructive: "hsl(0, 75%, 50%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(35, 90%, 55%)",
      warningForeground: "hsl(160, 40%, 12%)",
      success: "hsl(160, 80%, 35%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
        serif: ["Roboto Slab", "serif"],
        mono: ["Roboto Mono", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(16 185 129 / 0.1)",
        base: "0 1px 3px 0 rgb(16 185 129 / 0.15), 0 1px 2px -1px rgb(16 185 129 / 0.1)",
        md: "0 4px 6px -1px rgb(16 185 129 / 0.15), 0 2px 4px -2px rgb(16 185 129 / 0.1)",
        lg: "0 10px 15px -3px rgb(16 185 129 / 0.15), 0 4px 6px -4px rgb(16 185 129 / 0.1)",
        xl: "0 20px 25px -5px rgb(16 185 129 / 0.15), 0 8px 10px -6px rgb(16 185 129 / 0.1)"
      },
      animation: {
        duration: "200ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--ecommerce-primary": "hsl(160, 80%, 35%)",
      "--ecommerce-accent": "hsl(15, 85%, 55%)"
    }
  },

  magazine: {
    name: "Magazine Theme",
    variant: "magazine",
    colors: {
      primary: "hsl(0, 0%, 15%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(0, 0%, 85%)",
      secondaryForeground: "hsl(0, 0%, 15%)",
      background: "hsl(0, 0%, 98%)",
      foreground: "hsl(0, 0%, 10%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(0, 0%, 10%)",
      accent: "hsl(350, 75%, 50%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(0, 0%, 92%)",
      mutedForeground: "hsl(0, 0%, 45%)",
      border: "hsl(0, 0%, 88%)",
      input: "hsl(0, 0%, 96%)",
      ring: "hsl(0, 0%, 15%)",
      destructive: "hsl(0, 75%, 50%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(40, 85%, 55%)",
      warningForeground: "hsl(0, 0%, 10%)",
      success: "hsl(140, 65%, 45%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Georgia", "serif"],
        serif: ["Times", "serif"],
        mono: ["Courier", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.1)",
        base: "0 1px 3px 0 rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.15), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      },
      animation: {
        duration: "180ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--magazine-text": "hsl(0, 0%, 15%)",
      "--magazine-accent": "hsl(350, 75%, 50%)"
    }
  },

  app: {
    name: "Mobile App Theme",
    variant: "app",
    colors: {
      primary: "hsl(240, 100%, 60%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(240, 30%, 90%)",
      secondaryForeground: "hsl(240, 100%, 30%)",
      background: "hsl(240, 30%, 98%)",
      foreground: "hsl(240, 50%, 12%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(240, 50%, 12%)",
      accent: "hsl(300, 80%, 60%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(240, 30%, 94%)",
      mutedForeground: "hsl(240, 25%, 45%)",
      border: "hsl(240, 30%, 87%)",
      input: "hsl(240, 30%, 96%)",
      ring: "hsl(240, 100%, 60%)",
      destructive: "hsl(0, 80%, 55%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(40, 90%, 60%)",
      warningForeground: "hsl(240, 50%, 12%)",
      success: "hsl(150, 75%, 45%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["SF Pro Display", "system-ui", "sans-serif"],
        serif: ["SF Pro Display", "serif"],
        mono: ["SF Mono", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        base: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(79 70 229 / 0.1)",
        base: "0 1px 3px 0 rgb(79 70 229 / 0.15), 0 1px 2px -1px rgb(79 70 229 / 0.1)",
        md: "0 4px 6px -1px rgb(79 70 229 / 0.15), 0 2px 4px -2px rgb(79 70 229 / 0.1)",
        lg: "0 10px 15px -3px rgb(79 70 229 / 0.15), 0 4px 6px -4px rgb(79 70 229 / 0.1)",
        xl: "0 20px 25px -5px rgb(79 70 229 / 0.15), 0 8px 10px -6px rgb(79 70 229 / 0.1)"
      },
      animation: {
        duration: "300ms",
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--app-primary": "hsl(240, 100%, 60%)",
      "--app-accent": "hsl(300, 80%, 60%)"
    }
  },

  // Thèmes avancés et stylistiques

  tech: {
    name: "Tech Theme",
    variant: "tech",
    colors: {
      primary: "hsl(195, 100%, 45%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(215, 25%, 85%)",
      secondaryForeground: "hsl(195, 100%, 25%)",
      background: "hsl(215, 25%, 98%)",
      foreground: "hsl(215, 50%, 12%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(215, 50%, 12%)",
      accent: "hsl(285, 80%, 60%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(215, 25%, 93%)",
      mutedForeground: "hsl(215, 25%, 45%)",
      border: "hsl(215, 25%, 87%)",
      input: "hsl(215, 25%, 96%)",
      ring: "hsl(195, 100%, 45%)",
      destructive: "hsl(0, 80%, 55%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(40, 90%, 60%)",
      warningForeground: "hsl(215, 50%, 12%)",
      success: "hsl(150, 75%, 45%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
        serif: ["Roboto Slab", "serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(6 182 212 / 0.1)",
        base: "0 1px 3px 0 rgb(6 182 212 / 0.15), 0 1px 2px -1px rgb(6 182 212 / 0.1)",
        md: "0 4px 6px -1px rgb(6 182 212 / 0.15), 0 2px 4px -2px rgb(6 182 212 / 0.1)",
        lg: "0 10px 15px -3px rgb(6 182 212 / 0.15), 0 4px 6px -4px rgb(6 182 212 / 0.1)",
        xl: "0 20px 25px -5px rgb(6 182 212 / 0.15), 0 8px 10px -6px rgb(6 182 212 / 0.1)"
      },
      animation: {
        duration: "200ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--tech-cyber": "hsl(195, 100%, 45%)",
      "--tech-neon": "hsl(285, 80%, 60%)"
    }
  },

  luxury: {
    name: "Luxury Theme",
    variant: "luxury",
    colors: {
      primary: "hsl(45, 90%, 35%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(25, 15%, 85%)",
      secondaryForeground: "hsl(45, 90%, 20%)",
      background: "hsl(25, 15%, 98%)",
      foreground: "hsl(25, 30%, 8%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(25, 30%, 8%)",
      accent: "hsl(345, 70%, 45%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(25, 15%, 93%)",
      mutedForeground: "hsl(25, 15%, 40%)",
      border: "hsl(25, 15%, 87%)",
      input: "hsl(25, 15%, 96%)",
      ring: "hsl(45, 90%, 35%)",
      destructive: "hsl(0, 75%, 50%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(40, 85%, 55%)",
      warningForeground: "hsl(25, 30%, 8%)",
      success: "hsl(140, 65%, 45%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Playfair Display", "serif"],
        serif: ["Cormorant Garamond", "serif"],
        mono: ["Courier Prime", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(180 83 9 / 0.1)",
        base: "0 1px 3px 0 rgb(180 83 9 / 0.2), 0 1px 2px -1px rgb(180 83 9 / 0.1)",
        md: "0 4px 6px -1px rgb(180 83 9 / 0.2), 0 2px 4px -2px rgb(180 83 9 / 0.1)",
        lg: "0 10px 15px -3px rgb(180 83 9 / 0.2), 0 4px 6px -4px rgb(180 83 9 / 0.1)",
        xl: "0 20px 25px -5px rgb(180 83 9 / 0.2), 0 8px 10px -6px rgb(180 83 9 / 0.1)"
      },
      animation: {
        duration: "300ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--luxury-gold": "hsl(45, 90%, 35%)",
      "--luxury-accent": "hsl(345, 70%, 45%)"
    }
  },

  minimal: {
    name: "Minimal Theme",
    variant: "minimal",
    colors: {
      primary: "hsl(0, 0%, 20%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      secondary: "hsl(0, 0%, 95%)",
      secondaryForeground: "hsl(0, 0%, 20%)",
      background: "hsl(0, 0%, 100%)",
      foreground: "hsl(0, 0%, 10%)",
      card: "hsl(0, 0%, 100%)",
      cardForeground: "hsl(0, 0%, 10%)",
      accent: "hsl(210, 80%, 50%)",
      accentForeground: "hsl(0, 0%, 100%)",
      muted: "hsl(0, 0%, 98%)",
      mutedForeground: "hsl(0, 0%, 50%)",
      border: "hsl(0, 0%, 90%)",
      input: "hsl(0, 0%, 98%)",
      ring: "hsl(0, 0%, 20%)",
      destructive: "hsl(0, 70%, 50%)",
      destructiveForeground: "hsl(0, 0%, 100%)",
      warning: "hsl(40, 80%, 55%)",
      warningForeground: "hsl(0, 0%, 10%)",
      success: "hsl(140, 60%, 45%)",
      successForeground: "hsl(0, 0%, 100%)"
    },
    typography: {
      fontFamily: {
        sans: ["Helvetica Neue", "system-ui", "sans-serif"],
        serif: ["Times New Roman", "serif"],
        mono: ["Monaco", "monospace"]
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      }
    },
    spacing: {
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem"
      }
    },
    effects: {
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      },
      animation: {
        duration: "150ms",
        easing: "ease-in-out"
      },
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px"
      }
    },
    customProperties: {
      "--minimal-pure": "hsl(0, 0%, 100%)",
      "--minimal-text": "hsl(0, 0%, 10%)"
    }
  }
};

export default navbarThemes;