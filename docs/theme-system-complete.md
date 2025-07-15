# 🎨 Système de Thèmes Complet pour Next.js

## Vue d'ensemble

Le système de thèmes complet permet d'appliquer **21 thèmes différents** à toutes les pages de votre application Next.js. Chaque thème est conçu pour un secteur ou un style spécifique, avec des palettes de couleurs, typographies, espacements et effets personnalisés.

## 🎯 Thèmes Disponibles

### **Thèmes de Base**
1. **default** - Thème par défaut propre et moderne
2. **dark** - Thème sombre élégant
3. **glassmorphism** - Effet verre moderne avec transparence
4. **minimal** - Design épuré et minimaliste

### **Thèmes Gaming & Divertissement**
5. **gaming** - Couleurs vives pour gaming
6. **neon** - Style cyberpunk avec effets néon
7. **retro** - Style vintage années 80-90

### **Thèmes Professionnels**
8. **corporate** - Thème d'entreprise professionnel
9. **agency** - Design agence créative minimaliste
10. **finance** - Thème financier sérieux et fiable

### **Thèmes Sectoriels**
11. **medical** - Couleurs apaisantes pour la santé
12. **education** - Thème éducatif stimulant
13. **restaurant** - Couleurs chaleureuses gastronomiques
14. **travel** - Thème voyage avec couleurs ciel/soleil
15. **luxury** - Thème haut de gamme avec dorures

### **Thèmes Tech & Digital**
16. **saas** - Thème SaaS moderne et tech
17. **tech** - Couleurs cyber et technologiques
18. **app** - Design mobile app avec coins arrondis

### **Thèmes Contenu & Média**
19. **blog** - Thème blog lisible et élégant
20. **magazine** - Style éditorial classique
21. **portfolio** - Thème portfolio créatif
22. **ecommerce** - Couleurs e-commerce engageantes
23. **creative** - Thème créatif avec couleurs vibrantes

## 🏗️ Architecture Technique

### **Fichiers Principaux**

```typescript
// Configuration centralisée
/shared/lib/themes/navbar-themes.ts

// Provider React global
/shared/providers/theme-provider.tsx

// Hooks utilitaires
/shared/hooks/use-theme-utils.ts

// Composants UI
/shared/components/theme/theme-selector.tsx

// Styles CSS globaux
/shared/styles/themes.css

// Page de démonstration
/app/(ui)/theme-studio/page.tsx
```

### **Interface TypeScript**

```typescript
interface NavbarTheme {
  name: string;
  variant: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  effects: ThemeEffects;
  customProperties: Record<string, string>;
}
```

## 🚀 Utilisation

### **1. Changer de thème globalement**

```tsx
import { useTheme } from '@/shared/providers/theme-provider';

function MonComposant() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme('luxury')}>
      Activer le thème Luxury
    </button>
  );
}
```

### **2. Utiliser les couleurs du thème**

```tsx
// Classes Tailwind automatiques
<div className="bg-primary text-primary-foreground">
  Contenu avec couleurs du thème actif
</div>

// Couleurs personnalisées
<div className="bg-accent text-accent-foreground">
  Accent du thème actif
</div>
```

### **3. Styles inline avec le thème**

```tsx
import { useInlineThemeStyles } from '@/shared/hooks/use-theme-utils';

function MonComposant() {
  const themeStyles = useInlineThemeStyles();
  
  return (
    <div style={{
      backgroundColor: themeStyles.colors.primary,
      color: themeStyles.colors.primaryForeground,
      fontFamily: themeStyles.typography.fontFamily.sans.join(', ')
    }}>
      Contenu stylé avec le thème
    </div>
  );
}
```

### **4. Composant sélecteur de thème**

```tsx
import { ThemeSelector } from '@/shared/components/theme/theme-selector';

function MaPage() {
  return (
    <div>
      <h1>Ma Page</h1>
      <ThemeSelector />
    </div>
  );
}
```

## 🎨 Personnalisation

### **Ajouter un nouveau thème**

```typescript
// Dans /shared/lib/themes/navbar-themes.ts
export const navbarThemes = {
  // ...thèmes existants...
  
  monNouveauTheme: {
    name: "Mon Nouveau Thème",
    variant: "mon-nouveau-theme",
    colors: {
      primary: "hsl(120, 80%, 50%)",
      primaryForeground: "hsl(0, 0%, 100%)",
      // ...autres couleurs...
    },
    typography: {
      fontFamily: {
        sans: ["Ma Police", "sans-serif"],
        // ...
      },
      // ...
    },
    // ...autres propriétés...
  }
};
```

### **Ajouter les CSS correspondants**

```css
/* Dans /shared/styles/themes.css */
.theme-mon-nouveau-theme {
  --primary: 120 80% 50%;
  --primary-foreground: 0 0% 100%;
  /* ...autres variables CSS... */
  font-family: "Ma Police", sans-serif;
}
```

## 🔧 Hooks Avancés

### **useThemeStyles**
Retourne les classes CSS du thème actif
```tsx
const styles = useThemeStyles();
// styles.primary, styles.secondary, etc.
```

### **useInlineThemeStyles**
Retourne les valeurs brutes pour styles inline
```tsx
const themeStyles = useInlineThemeStyles();
// themeStyles.colors.primary, etc.
```

### **useThemeVariants**
Génère des variants de composants selon le thème
```tsx
const variants = useThemeVariants();
// variants.button, variants.card, etc.
```

### **useThemeAnimations**
Animations personnalisées du thème actif
```tsx
const animations = useThemeAnimations();
// animations.duration, animations.easing
```

## 📱 Fonctionnalités

- ✅ **Persistence** - Thème sauvegardé dans localStorage
- ✅ **SSR Safe** - Compatible avec Next.js SSR
- ✅ **TypeScript** - Types complets pour toutes les propriétés
- ✅ **Responsive** - Thèmes adaptés mobile et desktop
- ✅ **Animations** - Transitions fluides entre thèmes
- ✅ **Accessibilité** - Contraste et lisibilité optimisés
- ✅ **Performance** - CSS optimisé avec variables personnalisées
- ✅ **Extensible** - Facile d'ajouter de nouveaux thèmes

## 🎭 Page de Démonstration

Visitez `/theme-studio` pour :
- Tester tous les thèmes en temps réel
- Voir les palettes de couleurs complètes
- Prévisualiser les composants stylés
- Comparer les différents styles

## 🎯 Cas d'Usage par Secteur

### **E-commerce**
```tsx
setTheme('ecommerce'); // Vert commerce + orange accent
```

### **Application SaaS**
```tsx
setTheme('saas'); // Violet tech + cyan accent
```

### **Blog Personnel**
```tsx
setTheme('blog'); // Bleu lisible + orange chaleureux
```

### **Portfolio Créatif**
```tsx
setTheme('creative'); // Magenta vibrant + jaune énergique
```

### **Site Corporate**
```tsx
setTheme('corporate'); // Bleu professionnel + gris élégant
```

## 🔄 Migration depuis un thème existant

Si vous avez déjà un thème personnalisé :

1. **Gardez vos couleurs** en ajoutant un nouveau thème dans la configuration
2. **Utilisez le provider** pour appliquer votre thème existant
3. **Migrez progressivement** en remplaçant les couleurs hardcodées par les classes du thème

## 🚀 Performance

- **Chargement lazy** des styles de thème
- **Variables CSS natives** pour performance optimale
- **Bundle splitting** automatique
- **Cache localStorage** pour éviter les re-calculs

---

**Le système de thèmes est maintenant complet et prêt pour la production !** 🎨✨

Vous disposez de 23 thèmes professionnels couvrant tous les secteurs d'activité, avec une architecture extensible et des performances optimisées.
