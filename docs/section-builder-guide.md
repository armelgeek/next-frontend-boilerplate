# Section Builder - Guide Complet

## 🎯 Vue d'ensemble

Le **Section Builder** est un système de génération de sections génériques avec différents thèmes et dispositions. Il permet de créer rapidement des sections de landing page comme FAQ, témoignages, hero, pricing, etc., avec une grande flexibilité de personnalisation.

## 🏗️ Architecture

### Composants principaux

1. **section-builder-generator.ts** - Générateur principal avec schemas et templates
2. **section-renderer.tsx** - Composant React pour le rendu des sections
3. **section-builder-ui.tsx** - Interface d'administration pour créer/modifier
4. **Page /section-builder** - Studio visuel complet
5. **Page /section-builder-examples** - Exemples et documentation

## 📋 Types de sections disponibles

| Type | Variants | Description |
|------|----------|-------------|
| **hero** | simple, gradient, video | Sections d'en-tête avec CTA |
| **features** | grid, timeline | Présentation de fonctionnalités |
| **testimonials** | cards, carousel | Témoignages clients |
| **faq** | accordion, tabs | Questions fréquentes |
| **pricing** | cards | Plans et tarifs |
| **team** | grid | Présentation d'équipe |
| **stats** | simple | Statistiques et chiffres |
| **cta** | simple, newsletter | Appels à l'action |

## 🎨 Thèmes disponibles

- **minimal** - Design épuré et simple
- **modern** - Style contemporain
- **gradient** - Arrière-plans en dégradé
- **glass** - Effet glassmorphism
- **corporate** - Style professionnel
- **creative** - Design artistique
- **nature** - Couleurs naturelles
- **dark** - Mode sombre
- **colorful** - Multicolore vibrant

## 📐 Layouts disponibles

- **default** - Layout standard
- **centered** - Contenu centré
- **split** - Division en deux colonnes
- **grid** - Grille flexible
- **masonry** - Layout en maçonnerie
- **carousel** - Carrousel horizontal
- **tabs** - Navigation par onglets
- **accordion** - Contenu pliable
- **timeline** - Chronologie verticale

## 🚀 Utilisation

### 1. Utilisation des templates prêts

```typescript
import { SectionTemplates } from '@/shared/components/sections';

// Créer une section hero avec gradient
const heroSection = SectionTemplates.hero.gradient();

// Créer une section features en grille
const featuresSection = SectionTemplates.features.grid();

// Créer une section FAQ en accordéon
const faqSection = SectionTemplates.faq.accordion();
```

### 2. Personnalisation des sections

```typescript
import { SectionBuilder } from '@/shared/components/sections';

// Personnaliser une section existante
const customSection = SectionBuilder.customizeSection(heroSection, {
  theme: 'dark',
  layout: 'split',
  size: 'xl',
  title: 'Mon titre personnalisé',
  background: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
});
```

### 3. Création complète d'une section

```typescript
const customSection = SectionBuilder.createSection({
  id: 'my-custom-section',
  type: 'features',
  title: 'Nos fonctionnalités',
  subtitle: 'Ce qui nous rend uniques',
  description: 'Découvrez nos fonctionnalités innovantes',
  theme: 'modern',
  layout: 'grid',
  size: 'lg',
  variant: 'default',
  content: [
    {
      id: 'feature-1',
      title: 'Rapidité',
      description: 'Performances ultra-rapides',
      icon: 'Zap'
    },
    {
      id: 'feature-2',
      title: 'Sécurité',
      description: 'Protection maximale',
      icon: 'Shield'
    }
  ],
  responsive: {
    mobile: true,
    tablet: true,
    desktop: true,
    mobileColumns: 1,
    tabletColumns: 2,
    desktopColumns: 3
  }
});
```

### 4. Rendu des sections

```typescript
import { SectionRenderer, MultiSectionRenderer } from '@/shared/components/sections';

// Rendu d'une section unique
<SectionRenderer section={heroSection} />

// Rendu de plusieurs sections
<MultiSectionRenderer sections={[heroSection, featuresSection, faqSection]} />
```

### 5. Génération de pages complètes

```typescript
import { SectionBuilderUtils } from '@/shared/components/sections';

// Générer une landing page complète
const landingPageSections = SectionBuilderUtils.generateLandingPage();

// Générer une page à propos
const aboutPageSections = SectionBuilderUtils.generateAboutPage();

// Générer une page fonctionnalités
const featuresPageSections = SectionBuilderUtils.generateFeaturesPage();
```

## 🎛️ Interface d'administration

### Studio visuel `/section-builder`

L'interface complète permet de :
- Créer et modifier des sections visuellement
- Prévisualiser en temps réel
- Gérer plusieurs sections
- Exporter la configuration JSON
- Tester différents thèmes et layouts

### Onglets disponibles

1. **Templates** - Choisir parmi les templates prédéfinis
2. **Personnaliser** - Modifier thème, layout, taille, variant
3. **Contenu** - Éditer titre, sous-titre, description et éléments
4. **Aperçu** - Voir le rendu final de la section

## 📱 Responsive Design

Le système gère automatiquement le responsive avec :
- Configuration mobile/tablet/desktop
- Colonnes adaptatives par breakpoint
- Classes Tailwind générées automatiquement

```typescript
responsive: {
  mobile: true,
  tablet: true,
  desktop: true,
  mobileColumns: 1,    // 1 colonne sur mobile
  tabletColumns: 2,    // 2 colonnes sur tablet
  desktopColumns: 3    // 3 colonnes sur desktop
}
```

## 🎭 Animations (optionnel)

```typescript
animation: {
  enabled: true,
  type: 'fade',        // fade, slide, scale, bounce, rotate
  direction: 'up',     // up, down, left, right
  duration: 500,       // durée en millisecondes
  delay: 0,           // délai avant animation
  stagger: 100        // décalage entre éléments
}
```

## 🎨 Backgrounds personnalisés

```typescript
background: {
  type: 'gradient',    // none, color, gradient, image, pattern
  value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  overlay: false,      // superposition pour les images
  opacity: 1          // transparence
}
```

## 🔧 Génération de CSS

Le système génère automatiquement les classes CSS appropriées :

```typescript
// Générer les classes CSS pour une section
const cssClasses = SectionBuilder.generateSectionCSS(section);

// Générer les classes responsive
const responsiveClasses = SectionBuilder.generateResponsiveClasses(section.responsive);

// Générer les classes d'animation
const animationClasses = SectionBuilder.generateAnimationClasses(section.animation);
```

## 📦 Générateurs de contenu

Le système inclut des générateurs pour créer du contenu rapidement :

```typescript
import { SectionContentGenerators } from '@/shared/components/sections';

// Générer du contenu FAQ
const faqContent = SectionContentGenerators.generateFAQContent('general', 5);

// Générer des témoignages
const testimonialContent = SectionContentGenerators.generateTestimonialContent(3);

// Générer des features
const featureContent = SectionContentGenerators.generateFeatureContent(6);

// Générer du contenu équipe
const teamContent = SectionContentGenerators.generateTeamContent(4);
```

## 📚 Exemples d'intégration

### Dans une page Next.js

```typescript
"use client";

import React from 'react';
import { SectionTemplates, MultiSectionRenderer } from '@/shared/components/sections';

export default function MyLandingPage() {
  const sections = [
    SectionTemplates.hero.gradient(),
    SectionTemplates.features.grid(),
    SectionTemplates.testimonials.cards(),
    SectionTemplates.pricing.cards(),
    SectionTemplates.faq.accordion(),
    SectionTemplates.cta.simple(),
  ];

  return (
    <div>
      <MultiSectionRenderer sections={sections} />
    </div>
  );
}
```

### Avec état et modification dynamique

```typescript
"use client";

import React, { useState } from 'react';
import { SectionConfig, SectionBuilder, SectionRenderer } from '@/shared/components/sections';

export default function DynamicSection() {
  const [section, setSection] = useState<SectionConfig>(
    SectionTemplates.hero.simple()
  );

  const updateTheme = (theme: string) => {
    const updatedSection = SectionBuilder.customizeSection(section, { theme });
    setSection(updatedSection);
  };

  return (
    <div>
      <div className="controls">
        <button onClick={() => updateTheme('dark')}>Thème sombre</button>
        <button onClick={() => updateTheme('gradient')}>Thème gradient</button>
      </div>
      <SectionRenderer section={section} />
    </div>
  );
}
```

## 🎯 Cas d'usage recommandés

### 1. Landing Pages
- Hero + Features + Testimonials + Pricing + FAQ + CTA
- Utiliser `SectionBuilderUtils.generateLandingPage()`

### 2. Pages Produit
- Hero + Features + Timeline + Stats + CTA
- Thèmes : modern, corporate, minimal

### 3. Pages À Propos
- Hero + Team + Stats + Newsletter
- Thèmes : nature, creative, minimal

### 4. Pages Support
- Hero + FAQ + Contact + CTA
- Layouts : accordion, tabs pour les FAQ

## 🔍 Validation et Types

Le système utilise Zod pour la validation complète :
- Validation des configurations
- Types TypeScript générés automatiquement
- Sécurité des données garantie

## 🚀 Performance

- Composants optimisés pour React
- CSS généré à la demande
- Responsive automatique
- Animations performantes
- Lazy loading compatible

## 🎨 Personnalisation avancée

### Créer ses propres templates

```typescript
const myCustomTemplate = (): SectionConfig => ({
  id: 'custom-hero',
  type: 'hero',
  title: 'Mon Hero Personnalisé',
  theme: 'gradient',
  layout: 'split',
  size: 'xl',
  variant: 'default',
  content: [],
  // ... configuration complète
});

// Ajouter au système
SectionTemplates.hero.custom = myCustomTemplate;
```

### Thèmes personnalisés

Le système peut être étendu avec de nouveaux thèmes en modifiant les classes CSS générées dans `getThemeClasses()`.

---

## 📋 Checklist d'utilisation

- [ ] Importer les composants nécessaires
- [ ] Choisir le type de section approprié
- [ ] Sélectionner le thème et layout
- [ ] Configurer le contenu
- [ ] Définir les paramètres responsive
- [ ] Tester sur différents breakpoints
- [ ] Valider l'accessibilité
- [ ] Optimiser les performances

Le Section Builder offre une solution complète pour créer rapidement des sections de landing page professionnelles avec une grande flexibilité de personnalisation.
