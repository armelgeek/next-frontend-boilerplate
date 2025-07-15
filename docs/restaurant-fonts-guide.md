# Polices Restaurant - Guide d'utilisation

## Vue d'ensemble

Le système de polices restaurant comprend 6 polices Google Fonts soigneusement sélectionnées pour créer une expérience typographique cohérente et élégante pour les sites de restaurants gastronomiques.

## Polices incluses

### 1. **Merriweather** (Body)
- **Usage** : Texte principal, paragraphes, descriptions
- **Weights** : 300, 400, 700, 900
- **Variable CSS** : `--font-merriweather`
- **Caractéristiques** : Lisibilité excellente, serif moderne, professionnel

### 2. **Playfair Display** (Heading)
- **Usage** : Titres principaux, en-têtes de section
- **Weights** : 400, 500, 600, 700, 800, 900
- **Variable CSS** : `--font-playfair-display`
- **Caractéristiques** : Élégant, contrasté, parfait pour les titres

### 3. **Great Vibes** (Decorative)
- **Usage** : Éléments décoratifs, accents spéciaux
- **Weight** : 400
- **Variable CSS** : `--font-great-vibes`
- **Caractéristiques** : Script élégant, artistique, pour les touches spéciales

### 4. **Pacifico** (Accent)
- **Usage** : Boutons, appels à l'action, éléments d'interface
- **Weight** : 400
- **Variable CSS** : `--font-pacifico`
- **Caractéristiques** : Moderne, amical, décontracté

### 5. **Satisfy** (Handwriting)
- **Usage** : Citations, témoignages, éléments personnalisés
- **Weight** : 400
- **Variable CSS** : `--font-satisfy`
- **Caractéristiques** : Manuscrit naturel, personnel, chaleureux

### 6. **Dancing Script** (Menu)
- **Usage** : Cartes de menu, prix, éléments gastronomiques
- **Weights** : 400, 500, 600, 700
- **Variable CSS** : `--font-dancing-script`
- **Caractéristiques** : Fluide, élégant, parfait pour les menus

## Configuration thème

```typescript
restaurant: {
  sans: 'var(--font-merriweather)',
  serif: 'var(--font-playfair-display)',
  mono: 'var(--font-dancing-script)',
  decorative: 'var(--font-great-vibes)',
  accent: 'var(--font-pacifico)',
  handwriting: 'var(--font-satisfy)',
  casual: 'var(--font-caveat)',
}
```

## Utilisation avec le composant RestaurantText

```tsx
import { RestaurantText } from '@/shared/hooks/use-restaurant-fonts';

// Titre principal
<RestaurantText variant="heading" className="text-4xl text-amber-900">
  Notre Histoire
</RestaurantText>

// Contenu principal
<RestaurantText variant="body" className="text-amber-700">
  Description du restaurant et de sa cuisine...
</RestaurantText>

// Élément décoratif
<RestaurantText variant="decorative" className="text-6xl text-amber-900">
  Bienvenue
</RestaurantText>

// Menu et prix
<RestaurantText variant="menu" className="text-2xl text-amber-800">
  Filet de Bœuf Wellington - 35€
</RestaurantText>
```

## Classes CSS utilitaires

```css
.font-restaurant-body { font-family: var(--font-merriweather); }
.font-restaurant-heading { font-family: var(--font-playfair-display); }
.font-restaurant-decorative { font-family: var(--font-great-vibes); }
.font-restaurant-accent { font-family: var(--font-pacifico); }
.font-restaurant-handwriting { font-family: var(--font-satisfy); }
.font-restaurant-menu { font-family: var(--font-dancing-script); }
```

## Exemples d'utilisation

### Hero Section
```tsx
<RestaurantText variant="decorative" className="text-8xl text-amber-900">
  Saveurs d'Exception
</RestaurantText>
```

### Menu Item
```tsx
<div className="menu-item">
  <RestaurantText variant="menu" className="text-2xl text-amber-800">
    Homard aux Truffes
  </RestaurantText>
  <RestaurantText variant="body" className="text-amber-600">
    Homard breton grillé avec émulsion de truffe noire
  </RestaurantText>
  <RestaurantText variant="accent" className="text-xl text-amber-800">
    45€
  </RestaurantText>
</div>
```

### Citation / Témoignage
```tsx
<RestaurantText variant="handwriting" className="text-lg text-amber-500 italic">
  "Une expérience culinaire absolument exceptionnelle"
</RestaurantText>
```

## Bonnes pratiques

1. **Cohérence** : Utilisez toujours les mêmes polices pour les mêmes types de contenu
2. **Hiérarchie** : Respectez la hiérarchie typographique (decorative > heading > body)
3. **Lisibilité** : Privilégiez Merriweather pour les longs textes
4. **Contraste** : Assurez-vous que les couleurs offrent un bon contraste
5. **Performance** : Les polices sont optimisées et chargées via Google Fonts

## Intégration

Les polices sont automatiquement incluses dans le layout principal via `allFontVariables` et sont disponibles partout dans l'application.

```typescript
// Dans app/layout.tsx
<body className={`${allFontVariables} font-sans`}>
```

## Tests et démo

Visitez `/resto/fonts-demo` pour voir toutes les polices en action avec des exemples d'utilisation réels.
