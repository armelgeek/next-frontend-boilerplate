# Documentation des Thèmes Navbar

## Vue d'ensemble
Le système de thèmes pour les composants navbar permet d'appliquer des styles cohérents dans toute l'application. Chaque variant de navbar possède son propre thème avec des couleurs, typographies et effets spécifiques.

## Architecture

### 1. Configuration des Thèmes (`navbar-themes.ts`)
Contient la définition de tous les thèmes disponibles avec leurs propriétés :
- **Couleurs** : palette complète (primary, secondary, background, etc.)
- **Typographie** : familles de polices et tailles
- **Espacement** : border-radius et spacing
- **Effets** : ombres, animations et flous
- **Propriétés personnalisées** : variables CSS spécifiques au thème

### 2. Provider de Thème (`theme-provider.tsx`)
Contexte React qui gère :
- État global du thème actuel
- Changement de thème en temps réel
- Sauvegarde dans localStorage
- Application des styles CSS au document

### 3. Hooks Utilitaires (`use-theme-utils.ts`)
Collection de hooks pour faciliter l'utilisation des thèmes :
- `useThemeStyles()` : Styles CSS générés automatiquement
- `useInlineThemeStyles()` : Styles inline pour React
- `useThemeVariants()` : Variantes de composants selon le thème
- `useThemeAnimations()` : Animations adaptées au thème

### 4. Composants UI (`theme-selector.tsx`)
Interface utilisateur pour :
- Sélection de thème interactive
- Aperçu des thèmes disponibles
- Démonstration en temps réel

### 5. Styles CSS (`themes.css`)
Styles globaux incluant :
- Variables CSS pour chaque thème
- Classes utilitaires (glassmorphism, neon, retro)
- Media queries pour responsivité
- Modes d'accessibilité

## Thèmes Disponibles

### 1. Default
- **Style** : Moderne et propre
- **Couleurs** : Bleu et gris
- **Usage** : Applications business, dashboards

### 2. Glassmorphism
- **Style** : Effet de verre avec flou
- **Couleurs** : Transparentes avec accent violet
- **Usage** : Interfaces modernes, landing pages

### 3. Dark
- **Style** : Mode sombre élégant
- **Couleurs** : Tons sombres avec accents clairs
- **Usage** : Applications nocturnes, développeurs

### 4. Neon
- **Style** : Cyberpunk avec effets lumineux
- **Couleurs** : Vert néon sur fond noir
- **Usage** : Gaming, tech, interfaces futuristes

### 5. Retro
- **Style** : Vintage avec ombres portées
- **Couleurs** : Orange et beige
- **Usage** : Brands vintage, designs nostalgiques

## Installation et Configuration

### 1. Setup Initial
```tsx
// app/layout.tsx
import { ThemeProvider } from '@/shared/providers/theme-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider defaultTheme="default">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Import des Styles
```css
/* globals.css */
@import '@/shared/styles/themes.css';
```

### 3. Utilisation dans les Composants
```tsx
import { useTheme, useInlineThemeStyles } from '@/shared/providers/theme-provider';

function MyComponent() {
  const { currentTheme, setTheme } = useTheme();
  const { getCardStyle, getButtonStyle } = useInlineThemeStyles();

  return (
    <div style={getCardStyle()}>
      <button 
        style={getButtonStyle('primary')}
        onClick={() => setTheme('neon')}
      >
        Changer de thème
      </button>
    </div>
  );
}
```

## Hooks Disponibles

### `useTheme()`
Hook principal pour accéder au contexte de thème :
```tsx
const { 
  currentTheme,      // Thème actuel
  setTheme,          // Changer de thème
  themeKey,          // Clé du thème actuel
  availableThemes    // Tous les thèmes disponibles
} = useTheme();
```

### `useInlineThemeStyles()`
Génère des styles CSS inline :
```tsx
const {
  getColorStyle,      // Couleur de texte
  getBackgroundStyle, // Couleur de fond
  getCardStyle,       // Style de carte
  getButtonStyle,     // Style de bouton
  getInputStyle       // Style d'input
} = useInlineThemeStyles();
```

### `useThemeVariants()`
Variantes de composants selon le thème :
```tsx
const {
  cardVariants,    // Classes pour les cartes
  buttonVariants,  // Classes pour les boutons
  inputVariants,   // Classes pour les inputs
  createVariant    // Créer une variante personnalisée
} = useThemeVariants();
```

### `useThemeAnimations()`
Animations adaptées au thème :
```tsx
const {
  getTransitionStyle,  // Transitions CSS
  getHoverAnimation,   // Animations au survol
  getPulseAnimation,   // Animation de pulsation
  getGlowEffect       // Effet de lueur
} = useThemeAnimations();
```

## Personnalisation

### Créer un Nouveau Thème
```typescript
// Ajouter dans navbar-themes.ts
export const navbarThemes = {
  // ...thèmes existants
  custom: {
    name: "Mon Thème",
    variant: "custom",
    colors: {
      primary: "hsl(350, 100%, 50%)",
      // ...autres couleurs
    },
    typography: {
      fontFamily: {
        sans: ["Custom Font", "sans-serif"]
      }
    },
    // ...autres propriétés
  }
};
```

### Styles CSS Personnalisés
```css
/* themes.css */
.theme-custom {
  --primary: 350 100% 50%;
  --custom-glow: 0 0 15px hsl(350, 100%, 50%);
}

.theme-custom .custom-effect {
  box-shadow: var(--custom-glow);
}
```

## Bonnes Pratiques

### 1. Cohérence
- Utilisez toujours les couleurs du thème via les hooks
- Évitez les couleurs hard-codées
- Respectez la hiérarchie typographique

### 2. Performance
- Les styles sont mis en cache automatiquement
- Les changements de thème sont optimisés
- Utilisez les variantes CSS plutôt que les styles inline quand possible

### 3. Accessibilité
- Tous les thèmes respectent les contrastes WCAG
- Support du mode contraste élevé
- Respect des préférences de mouvement réduit

### 4. Responsive
- Tous les thèmes s'adaptent aux écrans mobiles
- Les effets sont simplifiés sur mobile si nécessaire
- Utilisation des media queries appropriées

## Exemples d'Usage

### Page avec Thème
```tsx
function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar variant={currentTheme.variant} />
      <main className="container mx-auto">
        {/* Contenu */}
      </main>
    </div>
  );
}
```

### Composant Thématisé
```tsx
function Card({ children }) {
  const { getCardStyle } = useInlineThemeStyles();
  
  return (
    <div style={getCardStyle()}>
      {children}
    </div>
  );
}
```

### Sélecteur de Thème
```tsx
function ThemeToggle() {
  const { setTheme, availableThemes } = useTheme();
  
  return (
    <select onChange={(e) => setTheme(e.target.value)}>
      {Object.entries(availableThemes).map(([key, theme]) => (
        <option key={key} value={key}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}
```

## Troubleshooting

### Thème ne s'applique pas
1. Vérifiez que ThemeProvider enveloppe votre app
2. Assurez-vous que les styles CSS sont importés
3. Vérifiez les erreurs de console

### Styles incohérents
1. Utilisez les hooks fournis plutôt que les variables CSS directement
2. Évitez de mélanger plusieurs systèmes de thème
3. Respectez la structure des composants

### Performance
1. Évitez les changements de thème trop fréquents
2. Utilisez React.memo pour les composants coûteux
3. Préférez les classes CSS aux styles inline pour les éléments répétitifs
