# 🎨 Theme Builder - Guide d'Utilisation Complet

Le **Theme Builder** est un système complet de génération et gestion de thèmes pour votre application Next.js. Il permet de créer, éditer, prévisualiser et exporter des thèmes personnalisés avec support du mode clair/sombre.

## 📋 Table des Matières

1. [Installation et Configuration](#installation-et-configuration)
2. [Utilisation Rapide](#utilisation-rapide)
3. [Système de Thèmes](#système-de-thèmes)
4. [Provider et Hooks](#provider-et-hooks)
5. [Composants Disponibles](#composants-disponibles)
6. [Génération de Thèmes](#génération-de-thèmes)
7. [Export et Import](#export-et-import)
8. [Exemples Pratiques](#exemples-pratiques)
9. [Personnalisation Avancée](#personnalisation-avancée)

## 🚀 Installation et Configuration

### 1. Configuration de Base

```tsx
// app/layout.tsx - Wrappez votre app avec le ThemeProvider
import { ThemeProvider } from '@/shared/components/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Configuration Avancée

```tsx
// Avec thème par défaut et stockage personnalisé
import { ThemeBuilder } from '@/shared/lib/generators/theme-builder-generator';

const defaultTheme = ThemeBuilder.generateFromTemplate('modern');

<ThemeProvider 
  defaultTheme={defaultTheme}
  storageKey="mon-app-themes"
>
  {children}
</ThemeProvider>
```

## ⚡ Utilisation Rapide

### Studio de Thèmes Complet

```tsx
// Page dédiée au Theme Studio
import { ThemeStudio } from '@/shared/components/theme';

export default function ThemeStudioPage() {
  return <ThemeStudio />;
}
```

### Composants de Base

```tsx
import { 
  ThemeModeToggle, 
  ThemeSelector, 
  useThemeMode,
  useThemeColors 
} from '@/shared/components/theme';

function MyComponent() {
  const { mode, toggle } = useThemeMode();
  const { colors } = useThemeColors();
  
  return (
    <div>
      <ThemeModeToggle />
      <ThemeSelector />
      <p>Mode actuel: {mode}</p>
      <div style={{ backgroundColor: colors?.primary }}>
        Couleur primaire
      </div>
    </div>
  );
}
```

## 🎯 Système de Thèmes

### Structure d'un Thème

```typescript
interface ThemeConfig {
  name: string;              // Identifiant unique
  displayName: string;       // Nom affiché
  description: string;       // Description
  colors: {
    light: ColorPalette;     // Couleurs mode clair
    dark: ColorPalette;      // Couleurs mode sombre
  };
  typography: Typography;    // Typographie
  spacing: Spacing;          // Espacement
  borderRadius: BorderRadius; // Bordures
  animation: Animation;      // Animations
}
```

### Templates Prédéfinis

```typescript
import { ThemeTemplates, ThemeBuilder } from '@/shared/lib/generators/theme-builder-generator';

// Templates disponibles
const themes = {
  modern: ThemeBuilder.generateFromTemplate('modern'),
  nature: ThemeBuilder.generateFromTemplate('nature'),
  luxury: ThemeBuilder.generateFromTemplate('luxury'),
  minimal: ThemeBuilder.generateFromTemplate('minimal'),
};
```

## 🔧 Provider et Hooks

### useThemeContext - Gestion Globale

```tsx
import { useThemeContext } from '@/shared/components/theme';

function ThemeManager() {
  const { 
    currentTheme, 
    availableThemes, 
    setTheme, 
    addTheme, 
    removeTheme 
  } = useThemeContext();

  const saveCustomTheme = () => {
    const customTheme = {
      name: 'custom',
      displayName: 'Mon Thème',
      // ... configuration
    };
    addTheme(customTheme);
    setTheme(customTheme);
  };

  return (
    <div>
      <p>Thème actuel: {currentTheme?.displayName}</p>
      <p>Thèmes disponibles: {availableThemes.length}</p>
      <button onClick={saveCustomTheme}>Sauvegarder thème</button>
    </div>
  );
}
```

### useThemeMode - Mode Clair/Sombre

```tsx
import { useThemeMode } from '@/shared/components/theme';

function ModeController() {
  const { mode, toggle, setLight, setDark, setAuto, isLight, isDark } = useThemeMode();

  return (
    <div>
      <p>Mode: {mode}</p>
      <button onClick={toggle}>Toggle Mode</button>
      <button onClick={setLight}>Mode Clair</button>
      <button onClick={setDark}>Mode Sombre</button>
      <button onClick={setAuto}>Mode Auto</button>
      
      {isLight && <span>☀️</span>}
      {isDark && <span>🌙</span>}
    </div>
  );
}
```

### useThemeColors - Accès aux Couleurs

```tsx
import { useThemeColors } from '@/shared/components/theme';

function ColoredComponent() {
  const { colors, getColorValue } = useThemeColors();

  return (
    <div>
      <div style={{ backgroundColor: colors?.primary }}>Primary</div>
      <div style={{ backgroundColor: colors?.secondary }}>Secondary</div>
      <div style={{ backgroundColor: getColorValue('accent') }}>Accent</div>
    </div>
  );
}
```

### useThemeAnimations - Animations

```tsx
import { useThemeAnimations } from '@/shared/components/theme';

function AnimatedComponent() {
  const { durations, easings, transition } = useThemeAnimations();

  return (
    <div 
      style={{ 
        transition: transition('all', 'normal', 'easeInOut'),
        // ou transition: `all ${durations.normal} ${easings.easeInOut}`
      }}
    >
      Élément animé
    </div>
  );
}
```

### useThemePersistence - Sauvegarde et Export

```tsx
import { useThemePersistence } from '@/shared/components/theme';

function ThemeExporter() {
  const { exportToFile, importFromFile, saveToLocalStorage } = useThemePersistence();

  const handleExport = async (theme: ThemeConfig) => {
    // Export en fichier
    exportToFile(theme, 'css');
    exportToFile(theme, 'tailwind');
    exportToFile(theme, 'json');
  };

  const handleImport = async (file: File) => {
    try {
      const theme = await importFromFile(file);
      saveToLocalStorage(theme);
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleExport(currentTheme)}>
        Exporter Thème
      </button>
      <input 
        type="file" 
        accept=".json"
        onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])}
      />
    </div>
  );
}
```

## 🧩 Composants Disponibles

### ThemeGenerator - Éditeur Complet

```tsx
import { ThemeGenerator } from '@/shared/components/theme';

function ThemeEditorPage() {
  return (
    <div className="container mx-auto p-6">
      <h1>Éditeur de Thème</h1>
      <ThemeGenerator />
    </div>
  );
}
```

### ThemePreviewPlayground - Aperçu Interactif

```tsx
import { ThemePreviewPlayground } from '@/shared/components/theme';

function PreviewPage() {
  const [selectedTheme, setSelectedTheme] = useState(null);

  return (
    <div>
      <ThemePreviewPlayground theme={selectedTheme} />
    </div>
  );
}
```

### ThemeStudio - Interface Complète

```tsx
import { ThemeStudio } from '@/shared/components/theme';

// Interface complète avec éditeur, aperçu, gestion des thèmes
export default function StudioPage() {
  return <ThemeStudio />;
}
```

## 🎨 Génération de Thèmes

### Thèmes depuis Templates

```typescript
import { ThemeBuilder, ThemeTemplates } from '@/shared/lib/generators/theme-builder-generator';

// Générer depuis un template
const modernTheme = ThemeBuilder.generateFromTemplate('modern');
const natureTheme = ThemeBuilder.generateFromTemplate('nature');

// Personnaliser un template
const customModern = ThemeBuilder.generateFromTemplate('modern');
customModern.colors.light.primary.value = 'hsl(350, 100%, 50%)';
```

### Thèmes Personnalisés

```typescript
// Créer un thème from scratch
const customTheme = ThemeBuilder.generateCustomTheme({
  name: 'my-brand',
  displayName: 'Ma Marque',
  description: 'Thème aux couleurs de ma marque',
  primaryColor: { h: 220, s: 100, l: 50 },
  secondaryColor: { h: 280, s: 70, l: 60 },
  accentColor: { h: 45, s: 100, l: 55 },
  fontFamily: 'Inter',
  borderRadius: 'rounded',
});
```

### Génération Dynamique

```typescript
// Générer une palette depuis une couleur
const palette = ThemeBuilder.generateColorPalette({ h: 200, s: 80, l: 50 });

// Créer des variations harmoniques
const harmonicColors = ThemeBuilder.generateHarmonicColors(palette.primary);

// Adapter pour l'accessibilité
const accessibleColors = ThemeBuilder.ensureAccessibility(palette);
```

## 📦 Export et Import

### Export CSS

```typescript
const cssContent = ThemeBuilder.generateThemeCSS(theme);
// Génère des variables CSS personnalisées :
// :root { --primary: hsl(220, 100%, 50%); ... }
```

### Export Tailwind

```typescript
const tailwindConfig = ThemeBuilder.generateTailwindConfig(theme);
// Génère la configuration Tailwind :
// module.exports = { theme: { colors: { primary: 'hsl(220, 100%, 50%)' } } }
```

### Export JSON

```typescript
const jsonTheme = JSON.stringify(theme, null, 2);
// Theme complet en JSON pour réimport
```

### Utilisation des Exports

```bash
# 1. Export CSS dans votre feuille de style
# Le CSS généré peut être ajouté directement à votre globals.css

# 2. Export Tailwind dans votre config
# Remplacez votre tailwind.config.js par la config générée

# 3. Export JSON pour backup/partage
# Sauvegardez vos thèmes et partagez-les entre projets
```

## 💡 Exemples Pratiques

### 1. Thème Complet avec Branding

```tsx
import { ThemeProvider, useThemeContext } from '@/shared/components/theme';
import { ThemeBuilder } from '@/shared/lib/generators/theme-builder-generator';

// Créer le thème de marque
const brandTheme = ThemeBuilder.generateCustomTheme({
  name: 'brand-2024',
  displayName: 'Marque 2024',
  description: 'Thème officiel de notre marque',
  primaryColor: { h: 220, s: 85, l: 55 },    // Bleu corporate
  secondaryColor: { h: 200, s: 70, l: 45 },  // Bleu secondaire
  accentColor: { h: 45, s: 95, l: 60 },      // Orange accent
  fontFamily: 'Inter',
  borderRadius: 'rounded',
});

function App() {
  return (
    <ThemeProvider defaultTheme={brandTheme}>
      <MyApplication />
    </ThemeProvider>
  );
}
```

### 2. Sélecteur de Thème Utilisateur

```tsx
function UserThemeSelector() {
  const { availableThemes, currentTheme, setTheme } = useThemeContext();
  
  return (
    <div className="theme-selector">
      <h3>Choisissez votre thème</h3>
      <div className="grid grid-cols-2 gap-4">
        {availableThemes.map((theme) => (
          <div 
            key={theme.name}
            className={`theme-card ${currentTheme?.name === theme.name ? 'active' : ''}`}
            onClick={() => setTheme(theme)}
          >
            <div className="theme-preview">
              <div style={{ backgroundColor: theme.colors.light.primary.value }} />
              <div style={{ backgroundColor: theme.colors.light.secondary.value }} />
              <div style={{ backgroundColor: theme.colors.light.accent.value }} />
            </div>
            <p>{theme.displayName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Thème Adaptatif selon l'Heure

```tsx
function AdaptiveThemeProvider({ children }: { children: React.ReactNode }) {
  const [autoTheme, setAutoTheme] = useState(null);
  
  useEffect(() => {
    const hour = new Date().getHours();
    
    const themeByTime = {
      morning: ThemeBuilder.generateFromTemplate('nature'),   // 6h-12h
      afternoon: ThemeBuilder.generateFromTemplate('modern'), // 12h-18h
      evening: ThemeBuilder.generateFromTemplate('luxury'),   // 18h-22h
      night: ThemeBuilder.generateFromTemplate('minimal'),    // 22h-6h
    };
    
    let selectedTheme;
    if (hour >= 6 && hour < 12) selectedTheme = themeByTime.morning;
    else if (hour >= 12 && hour < 18) selectedTheme = themeByTime.afternoon;
    else if (hour >= 18 && hour < 22) selectedTheme = themeByTime.evening;
    else selectedTheme = themeByTime.night;
    
    setAutoTheme(selectedTheme);
  }, []);
  
  return (
    <ThemeProvider defaultTheme={autoTheme}>
      {children}
    </ThemeProvider>
  );
}
```

## 🔧 Personnalisation Avancée

### 1. Thème avec Variables CSS Personnalisées

```typescript
// Étendre le système avec vos propres variables
const extendedTheme = {
  ...baseTheme,
  customVariables: {
    '--header-height': '64px',
    '--sidebar-width': '280px',
    '--max-content-width': '1200px',
  }
};

// Génération CSS étendue
const cssWithCustomVars = `
  ${ThemeBuilder.generateThemeCSS(extendedTheme)}
  
  :root {
    ${Object.entries(extendedTheme.customVariables)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n    ')}
  }
`;
```

### 2. Hook Personnalisé pour Thème Métier

```tsx
// Hook spécialisé pour votre domaine métier
function useEcommerceTheme() {
  const { colors } = useThemeColors();
  
  const productStatusColors = {
    inStock: colors?.success || '#22c55e',
    outOfStock: colors?.destructive || '#ef4444',
    lowStock: colors?.warning || '#f59e0b',
    preOrder: colors?.info || '#3b82f6',
  };
  
  const categoryColors = {
    electronics: colors?.primary,
    clothing: colors?.secondary,
    home: colors?.accent,
    books: colors?.muted,
  };
  
  return {
    productStatusColors,
    categoryColors,
  };
}
```

### 3. Middleware de Thème

```typescript
// Middleware pour appliquer automatiquement les thèmes
export function themeMiddleware(theme: ThemeConfig) {
  // Injection automatique du CSS
  const style = document.createElement('style');
  style.textContent = ThemeBuilder.generateThemeCSS(theme);
  document.head.appendChild(style);
  
  // Classes CSS conditionnelles
  document.body.className = `theme-${theme.name}`;
  
  // Métadonnées de thème
  document.documentElement.setAttribute('data-theme', theme.name);
  
  return () => {
    // Cleanup
    document.head.removeChild(style);
    document.body.className = document.body.className.replace(`theme-${theme.name}`, '');
  };
}
```

## 📚 Ressources et Références

### Outils de Couleur Recommandés
- [Coolors.co](https://coolors.co) - Génération de palettes
- [Contrast Ratio](https://contrast-ratio.com) - Vérification d'accessibilité
- [Adobe Color](https://color.adobe.com) - Harmonies coloristiques

### Inspiration Design
- [Dribbble](https://dribbble.com/colors) - Tendances couleurs
- [Behance](https://behance.net) - Portfolios design
- [Material Design](https://material.io/design/color) - Guidelines couleurs

### Documentation Technique
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) - Variables CSS
- [Tailwind Theming](https://tailwindcss.com/docs/theming) - Configuration Tailwind
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibilité

---

## ✅ Checklist de Mise en Production

- [ ] Thème par défaut configuré
- [ ] Provider correctement wrappé
- [ ] Variables CSS exportées et intégrées
- [ ] Tests d'accessibilité passés
- [ ] Mode sombre fonctionnel
- [ ] Persistance localStorage testée
- [ ] Performance vérifiée (pas de re-renders excessifs)
- [ ] Responsive design validé
- [ ] Export/Import fonctionnels

Le **Theme Builder** offre une solution complète pour la gestion de thèmes dans votre application Next.js, avec une approche moderne, accessible et performante. 🎨✨
