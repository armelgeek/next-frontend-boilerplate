# Universal Card Themes - Documentation Complète

## 🎨 Vue d'ensemble

Le système **Universal Card Themes** est une extension complète du composant `UniversalCard` existant qui ajoute 5 thèmes visuels distincts pour s'adapter à tous vos besoins de design. Chaque thème transforme complètement l'apparence des cartes tout en conservant toutes les fonctionnalités et la flexibilité du composant original.

## 🚀 Fonctionnalités principales

### ✨ 5 Thèmes uniques
- **Default** : Style élégant et neutre, parfait pour toutes les applications
- **Glassmorphism** : Effet de verre moderne avec transparence et flou
- **Dark** : Interface sombre élégante pour une expérience nocturne
- **Neon** : Style cyberpunk avec des effets néon éclatants
- **Retro** : Nostalgie vintage avec les couleurs chaudes des années 80

### 🔧 Intégration transparente
- Compatible avec tous les 13+ contextes du `UniversalCard` original
- Support de toutes les variantes (default, compact, minimal, list)
- Intégration avec le système de thèmes global du projet
- Aucune modification nécessaire aux données existantes

### 🎯 Personnalisation avancée
- Styles CSS personnalisables par thème
- Variables CSS pour faciliter la personnalisation
- Effets d'animation et transitions fluides
- Support des états featured, urgent, hover, focus

## 📦 Structure des fichiers

```
shared/
├── lib/themes/
│   └── universal-card-themes.ts          # Définitions des thèmes
├── hooks/
│   └── use-universal-card-theme.ts       # Hook pour styles thématiques
├── components/examples/
│   ├── universal-card-theme-showcase.tsx # Showcase complet
│   └── universal-card-theme-studio.tsx   # Studio interactif
├── styles/
│   └── universal-card-themes.css         # Styles CSS des thèmes
app/(ui)/
└── universal-card-themes/
    └── page.tsx                          # Page de démonstration
```

## 🛠️ Installation et utilisation

### 1. Import basique

```tsx
import { ThemedUniversalCard } from '@/shared/components/examples/universal-card-theme-showcase';

// Utilisation avec thème spécifique
<ThemedUniversalCard
  item={productData}
  context="product"
  themeName="glassmorphism"
  variant="default"
  size="md"
/>
```

### 2. Utilisation avec le hook

```tsx
import { useUniversalCardTheme } from '@/shared/hooks/use-universal-card-theme';

function CustomCard({ data, themeName }) {
  const {
    getCardStyles,
    getTitleStyles,
    getPriceStyles,
    getBadgeStyles
  } = useUniversalCardTheme(themeName);

  return (
    <div style={getCardStyles('default', 'md', data.featured, data.urgent)}>
      <h3 style={getTitleStyles('md')}>{data.title}</h3>
      <p style={getPriceStyles(true)}>{data.price}</p>
    </div>
  );
}
```

### 3. Intégration avec le système de thèmes global

```tsx
import { useTheme } from '@/shared/providers/theme-provider';

function App() {
  const { currentTheme } = useTheme();
  
  return (
    <ThemedUniversalCard
      item={data}
      context="event"
      // Le thème sera automatiquement synchronisé avec le thème global
      onClick={handleClick}
    />
  );
}
```

## 🎨 Guide des thèmes

### Default Theme
```tsx
<ThemedUniversalCard
  item={data}
  context="product"
  themeName="default"
  variant="default"
/>
```
- **Couleurs** : Neutres avec bleu comme accent
- **Usage** : Applications professionnelles, e-commerce
- **Avantages** : Lisibilité maximale, accessibilité optimisée

### Glassmorphism Theme
```tsx
<ThemedUniversalCard
  item={data}
  context="profile"
  themeName="glassmorphism"
  variant="default"
/>
```
- **Couleurs** : Transparences et effets de flou
- **Usage** : Applications modernes, portfolios créatifs
- **Avantages** : Design contemporain, effet "premium"

### Dark Theme
```tsx
<ThemedUniversalCard
  item={data}
  context="event"
  themeName="dark"
  variant="default"
/>
```
- **Couleurs** : Fonds sombres avec accents lumineux
- **Usage** : Mode nuit, applications gaming
- **Avantages** : Réduit la fatigue visuelle, économie d'énergie

### Neon Theme
```tsx
<ThemedUniversalCard
  item={data}
  context="tech"
  themeName="neon"
  variant="default"
/>
```
- **Couleurs** : Néons rose/cyan sur fond sombre
- **Usage** : Gaming, tech, événements nightlife
- **Avantages** : Impact visuel fort, ambiance futuriste

### Retro Theme
```tsx
<ThemedUniversalCard
  item={data}
  context="restaurant"
  themeName="retro"
  variant="default"
/>
```
- **Couleurs** : Tons chauds oranges et beiges
- **Usage** : Vintage, food, créatif, lifestyle
- **Avantages** : Charme nostalgique, atmosphère chaleureuse

## 🔧 API et propriétés

### ThemedUniversalCard Props

```typescript
interface ThemedUniversalCardProps extends Omit<UniversalCardProps, 'className'> {
  themeName?: 'default' | 'glassmorphism' | 'dark' | 'neon' | 'retro';
  className?: string;
}
```

### useUniversalCardTheme Hook

```typescript
const {
  theme,                    // Objet thème complet
  getCardStyles,           // Styles pour la carte principale
  getCardHoverStyles,      // Styles pour l'état hover
  getTitleStyles,          // Styles pour les titres
  getDescriptionStyles,    // Styles pour les descriptions
  getPriceStyles,          // Styles pour les prix
  getBadgeStyles,          // Styles pour les badges
  getButtonStyles,         // Styles pour les boutons
  getIconStyles,           // Styles pour les icônes
  getRatingStyles,         // Styles pour les ratings
  getCSSVariables,         // Variables CSS personnalisées
  getThemeClassName,       // Nom de classe CSS du thème
} = useUniversalCardTheme(themeName);
```

## 🎯 Contextes supportés

Le système de thèmes fonctionne avec tous les contextes du `UniversalCard` :

- **event** : Événements, conférences, formations
- **property** : Immobilier, locations, ventes
- **product** : E-commerce, marketplace
- **profile** : Profils utilisateurs, freelances
- **blog** : Articles, actualités
- **job** : Offres d'emploi
- **service** : Services professionnels
- **course** : Cours en ligne, formations
- **media** : Vidéos, podcasts, musique
- **restaurant** : Restaurants, gastronomie
- **travel** : Voyages, hôtels, activités
- **tech** : Logiciels, outils de développement
- **health** : Médecins, services de santé
- **finance** : Banques, investissements
- **news** : Articles de presse
- **social** : Posts réseaux sociaux

## 🎨 Personnalisation avancée

### Créer un thème personnalisé

```typescript
import { UniversalCardTheme } from '@/shared/lib/themes/universal-card-themes';

const customTheme: UniversalCardTheme = {
  name: 'custom',
  description: 'Mon thème personnalisé',
  colors: {
    cardBackground: 'hsl(210 100% 95%)',
    cardBorder: 'hsl(210 50% 80%)',
    titleColor: 'hsl(210 100% 20%)',
    // ... autres couleurs
  },
  typography: {
    titleFont: 'Inter',
    bodyFont: 'Roboto',
    titleWeight: '700',
    // ... autres propriétés
  },
  spacing: {
    cardPadding: {
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
    },
    // ... autres espacements
  },
  effects: {
    hoverTransition: 'all 0.2s ease',
    hoverScale: '1.03',
    // ... autres effets
  },
};
```

### Modifier les variables CSS

```css
:root {
  --universal-card-transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --universal-card-hover-scale: 1.05;
}

.universal-card-theme-custom {
  --card-bg: #f0f9ff;
  --title-color: #1e40af;
  --price-color: #059669;
}
```

## 📱 Responsive Design

Tous les thèmes sont entièrement responsives et s'adaptent automatiquement :

```tsx
// Les tailles s'adaptent automatiquement selon l'écran
<ThemedUniversalCard
  item={data}
  context="product"
  themeName="glassmorphism"
  size="md"  // sm sur mobile, md sur tablet, lg sur desktop
/>
```

## ♿ Accessibilité

- **Contraste** : Tous les thèmes respectent les ratios WCAG 2.1 AA
- **Focus** : États de focus visibles et cohérents
- **Navigation** : Support complet du clavier
- **Lecteurs d'écran** : Structures sémantiques préservées

## 🚀 Performance

- **CSS optimisé** : Variables CSS natives pour des changements instantanés
- **Lazy loading** : Thèmes chargés à la demande
- **Bundle size** : Impact minimal sur la taille du bundle
- **Animations** : GPU-accelerated transforms et opacity

## 📊 Cas d'usage recommandés

### E-commerce
```tsx
// Produits avec style professionnel
<ThemedUniversalCard themeName="default" context="product" />
// Produits premium avec effet moderne
<ThemedUniversalCard themeName="glassmorphism" context="product" />
```

### Gaming / Tech
```tsx
// Jeux et tech avec ambiance cyberpunk
<ThemedUniversalCard themeName="neon" context="tech" />
// Applications dark mode
<ThemedUniversalCard themeName="dark" context="tech" />
```

### Creative / Portfolio
```tsx
// Projets créatifs vintage
<ThemedUniversalCard themeName="retro" context="blog" />
// Portfolios modernes
<ThemedUniversalCard themeName="glassmorphism" context="profile" />
```

### Events / Hospitality
```tsx
// Événements corporates
<ThemedUniversalCard themeName="default" context="event" />
// Restaurants et lifestyle
<ThemedUniversalCard themeName="retro" context="restaurant" />
```

## 🛠️ Outils de développement

### Theme Studio
Interface interactive pour tester les thèmes en temps réel :
```
/app/(ui)/universal-card-themes/
```

### Showcase complet
Galerie complète de tous les thèmes et variantes :
```tsx
import UniversalCardThemeShowcase from '@/shared/components/examples/universal-card-theme-showcase';
```

## 🔍 Debugging et troubleshooting

### Variables CSS non appliquées
```css
/* Vérifiez que les variables sont bien définies */
.universal-card-theme-custom {
  --card-bg: var(--custom-background, #ffffff);
}
```

### Thème non trouvé
```tsx
// Utilisez le thème par défaut en fallback
const theme = getUniversalCardTheme(themeName) || getUniversalCardTheme('default');
```

### Performance lente
```tsx
// Utilisez useMemo pour les styles coûteux
const cardStyles = useMemo(
  () => getCardStyles(variant, size, featured, urgent),
  [variant, size, featured, urgent]
);
```

## 🚀 Roadmap

### Version actuelle (1.0)
- ✅ 5 thèmes de base
- ✅ Intégration complète
- ✅ Documentation complète
- ✅ Outils de développement

### Prochaines versions
- 🔄 Thèmes sectoriels (medical, finance, education)
- 🔄 Générateur de thèmes automatique
- 🔄 Export de thèmes personnalisés
- 🔄 Animations avancées par thème

## 📞 Support

Pour toute question ou suggestion :
- **Documentation** : `/docs/universal-card-themes.md`
- **Exemples** : `/app/(ui)/universal-card-themes/`
- **Code source** : `/shared/lib/themes/universal-card-themes.ts`

---

**Universal Card Themes** - Transformez vos interfaces avec style ! 🎨✨
