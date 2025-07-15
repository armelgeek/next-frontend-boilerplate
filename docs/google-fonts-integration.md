# Google Fonts Integration Guide

Ce guide explique comment utiliser le système de fonts Google intégré au projet Next.js.

## 🎯 Vue d'ensemble

Le système de fonts Google permet d'utiliser 23 polices différentes optimisées pour le web, avec une configuration automatique par thème.

## 📁 Structure des fichiers

```
shared/
├── lib/
│   └── themes/
│       ├── theme-fonts.ts      # Configuration des Google Fonts
│       └── navbar-themes.ts    # Thèmes avec fonts associées
├── providers/
│   └── theme-provider.tsx      # Provider avec gestion des fonts
└── components/
    └── theme/
        ├── font-tester.tsx     # Composant de test des fonts
        └── theme-selector.tsx  # Sélecteur de thèmes
```

## 🚀 Utilisation

### 1. Configuration automatique

Les fonts sont automatiquement chargées dans `app/layout.tsx` :

```tsx
import { allFontVariables } from '@/shared/lib/themes/theme-fonts';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${allFontVariables} font-sans`}>
        {children}
      </body>
    </html>
  );
}
```

### 2. Utilisation dans les composants

#### Via les variables CSS automatiques

```tsx
// Les fonts du thème actuel sont automatiquement appliquées
function MyComponent() {
  return (
    <div className="font-sans">  {/* Utilise la font sans-serif du thème */}
      <h1 className="font-serif">Titre en serif</h1>
      <code className="font-mono">Code en monospace</code>
    </div>
  );
}
```

#### Via les variables CSS directes

```tsx
// Utilisation d'une font spécifique
function CustomComponent() {
  return (
    <div style={{ fontFamily: 'var(--font-playfair-display)' }}>
      Texte en Playfair Display
    </div>
  );
}
```

#### Via le hook useTheme

```tsx
import { useTheme } from '@/shared/providers/theme-provider';
import { themeFonts } from '@/shared/lib/themes/theme-fonts';

function ThemeAwareComponent() {
  const { currentTheme } = useTheme();
  const fonts = themeFonts[currentTheme.variant];
  
  return (
    <div style={{ fontFamily: fonts.sans }}>
      Font automatique selon le thème
    </div>
  );
}
```

## 📝 Fonts disponibles

### Fonts Sans-serif
- **Inter**: Police moderne et lisible
- **Roboto**: Classique de Google
- **Open Sans**: Très populaire pour le web
- **Montserrat**: Style géométrique
- **Poppins**: Arrondie et moderne
- **Source Sans 3**: Famille Adobe mise à jour
- **Lato**: Humaniste et chaleureuse
- **Nunito**: Arrondie et amicale
- **Space Grotesk**: Futuriste
- **DM Sans**: Design moderne
- **Plus Jakarta Sans**: Style contemporain

### Fonts Serif
- **Playfair Display**: Élégante pour les titres
- **Lora**: Lisible pour le corps de texte
- **Crimson Text**: Classique pour les livres
- **Crimson Pro**: Version professionnelle
- **Roboto Slab**: Serif mécanique
- **Source Serif 4**: Famille Adobe mise à jour
- **Cormorant Garamond**: Style classique français

### Fonts Monospace
- **JetBrains Mono**: Optimisée pour le code
- **Fira Code**: Avec ligatures de programmation
- **Inconsolata**: Lisible et compacte
- **Source Code Pro**: Standard Adobe
- **Courier Prime**: Style machine à écrire

## 🎨 Configuration par thème

Chaque thème a ses fonts prédéfinies dans `theme-fonts.ts` :

```tsx
export const themeFonts = {
  default: {
    sans: 'var(--font-inter)',
    serif: 'var(--font-lora)',
    mono: 'var(--font-jetbrains-mono)',
  },
  glassmorphism: {
    sans: 'var(--font-inter)',
    serif: 'var(--font-lora)',
    mono: 'var(--font-jetbrains-mono)',
  },
  corporate: {
    sans: 'var(--font-roboto)',
    serif: 'var(--font-roboto-slab)',
    mono: 'var(--font-source-code-pro)',
  },
  creative: {
    sans: 'var(--font-montserrat)',
    serif: 'var(--font-playfair-display)',
    mono: 'var(--font-fira-code)',
  },
  // ... autres thèmes
};
```

## 🛠️ Testeur de fonts

Utilisez le composant `FontTester` pour expérimenter :

```tsx
import { FontTester } from '@/shared/components/theme/font-tester';

function TestPage() {
  return (
    <div>
      <FontTester />
    </div>
  );
}
```

Le testeur permet de :
- ✅ Prévisualiser toutes les fonts disponibles
- ✅ Tester différents textes (paragraphe, titre, code)
- ✅ Ajuster la taille et le poids
- ✅ Comparer avec les fonts du thème actuel
- ✅ Utiliser un texte personnalisé

## 🎯 Bonnes pratiques

### 1. Cohérence thématique
```tsx
// ✅ Bon : Utiliser les fonts du thème
<div className="font-sans">
  <h1 className="font-serif">Titre</h1>
  <p className="font-sans">Contenu</p>
</div>

// ❌ Éviter : Mélanger trop de fonts différentes
<div style={{ fontFamily: 'var(--font-comic-sans)' }}>
  Incohérent avec le thème
</div>
```

### 2. Performance
```tsx
// ✅ Les fonts sont déjà optimisées et préchargées
// ✅ Utilisation des variables CSS pour éviter les redondances
// ✅ Display: swap pour un chargement progressif
```

### 3. Accessibilité
```tsx
// ✅ Toutes les fonts ont été testées pour la lisibilité
// ✅ Poids et tailles appropriés selon l'usage
// ✅ Contraste suffisant avec les couleurs du thème
```

## 🔧 Personnalisation

### Ajouter une nouvelle font

1. **Importer dans `theme-fonts.ts` :**
```tsx
import { Ma_Nouvelle_Font } from 'next/font/google';

export const maNouvelleFont = Ma_Nouvelle_Font({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ma-nouvelle-font',
  weight: ['400', '500', '600', '700'],
});
```

2. **Ajouter aux variables :**
```tsx
export const allFontVariables = [
  // ...autres fonts...
  maNouvelleFont.variable,
].join(' ');
```

3. **Configurer pour un thème :**
```tsx
export const themeFonts = {
  monTheme: {
    sans: 'var(--font-ma-nouvelle-font)',
    serif: 'var(--font-lora)',
    mono: 'var(--font-jetbrains-mono)',
  },
};
```

### Modifier les fonts d'un thème existant

```tsx
// Dans theme-fonts.ts
export const themeFonts = {
  corporate: {
    sans: 'var(--font-open-sans)',    // Changé de Roboto à Open Sans
    serif: 'var(--font-crimson-pro)', // Changé de Roboto Slab à Crimson Pro
    mono: 'var(--font-fira-code)',    // Changé de Source Code Pro à Fira Code
  },
};
```

## 📊 Variables CSS disponibles

Toutes les fonts sont disponibles via des variables CSS :

```css
/* Variables automatiquement générées */
--font-inter
--font-playfair-display
--font-roboto
--font-open-sans
--font-montserrat
--font-poppins
--font-source-sans-3
--font-lato
--font-jetbrains-mono
--font-crimson-text
--font-crimson-pro
--font-nunito
--font-lora
--font-inconsolata
--font-roboto-slab
--font-fira-code
--font-source-serif-4
--font-source-code-pro
--font-cormorant-garamond
--font-courier-prime
--font-space-grotesk
--font-dm-sans
--font-plus-jakarta-sans
```

## 🎭 Thèmes et leurs fonts

| Thème | Sans-serif | Serif | Monospace | Usage |
|-------|------------|-------|-----------|--------|
| `default` | Inter | Lora | JetBrains Mono | Polyvalent |
| `corporate` | Roboto | Roboto Slab | Source Code Pro | Entreprise |
| `creative` | Montserrat | Playfair Display | Fira Code | Créatif |
| `medical` | Open Sans | Crimson Text | Inconsolata | Médical |
| `gaming` | Poppins | Roboto Slab | Fira Code | Gaming |
| `restaurant` | Nunito | Cormorant Garamond | Courier Prime | Restaurant |
| `finance` | Source Sans 3 | Source Serif 4 | Source Code Pro | Finance |
| `education` | Lato | Lora | JetBrains Mono | Éducation |
| `luxury` | Montserrat | Playfair Display | Source Code Pro | Luxe |
| `tech` | Space Grotesk | Roboto Slab | Fira Code | Tech |
| `minimal` | Inter | Lora | JetBrains Mono | Minimaliste |

## 🔗 Ressources

- [Documentation Next.js Fonts](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts)
- [Google Fonts](https://fonts.google.com/)
- [Variables CSS Fonts](https://web.dev/variable-fonts/)
- [Font Performance](https://web.dev/font-display/)

## 🆘 Dépannage

### La font ne s'affiche pas
1. Vérifiez que la font est importée dans `theme-fonts.ts`
2. Vérifiez que la variable est ajoutée à `allFontVariables`
3. Vérifiez que `layout.tsx` inclut `allFontVariables`

### Performance lente
1. Les fonts sont automatiquement optimisées avec `display: swap`
2. Seules les fonts utilisées sont chargées
3. Préchargement automatique via Next.js

### Font pas lisible
1. Vérifiez le contraste avec les couleurs du thème
2. Ajustez la taille et le poids
3. Testez sur différents appareils
