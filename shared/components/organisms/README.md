# Composants avec Multiple Variants

Collection complète de composants avec plusieurs variants pour créer des sections répétitives modernes et attrayantes.

## 🎯 Composants Disponibles

### 1. HeroSection
**Variants disponibles :** `default` | `centered` | `split` | `video` | `minimal` | `gradient`

```tsx
import { HeroSection } from "@/shared/components/organisms";

<HeroSection
  variant="gradient"
  title="Votre Titre Principal"
  subtitle="Sous-titre optionnel"
  description="Description détaillée..."
  backgroundPattern={true}
  searchable={true}
  actions={[
    {
      label: "Action principale",
      icon: <ArrowRight className="w-4 h-4" />,
      onClick: () => {}
    }
  ]}
  stats={[
    { value: "10K+", label: "Utilisateurs", icon: <Users /> }
  ]}
/>
```

**Fonctionnalités :**
- Support des patterns de fond
- Barre de recherche intégrée
- Actions multiples avec icônes
- Statistiques avec icônes
- Responsive design

### 2. FeaturesSection
**Variants disponibles :** `grid` | `alternating` | `centered` | `cards` | `list` | `icons-only`

```tsx
import { FeaturesSection } from "@/shared/components/organisms";

<FeaturesSection
  variant="alternating"
  title="Nos Fonctionnalités"
  features={[
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sécurité",
      description: "Protection avancée...",
      color: "bg-blue-100 text-blue-600"
    }
  ]}
  columns={3}
  showCta={true}
  ctaText="En savoir plus"
/>
```

**Fonctionnalités :**
- Layout alternant avec images
- Colonnes configurables (2-4)
- CTA intégré
- Couleurs personnalisables par feature

### 3. TestimonialsSection
**Variants disponibles :** `grid` | `carousel` | `masonry` | `video` | `minimal` | `featured`

```tsx
import { TestimonialsSection } from "@/shared/components/organisms";

<TestimonialsSection
  variant="featured"
  title="Témoignages Clients"
  testimonials={[
    {
      id: "1",
      name: "Marie Dubois",
      role: "CEO",
      company: "TechStart",
      rating: 5,
      content: "Excellent service...",
      featured: true,
      verified: true
    }
  ]}
  autoplay={true}
  showRating={true}
  showCompany={true}
/>
```

**Fonctionnalités :**
- Carousel avec autoplay
- Support vidéo
- Système de notation
- Badge "vérifié"
- Layout masonry

### 4. PricingSection
**Variants disponibles :** `default` | `cards` | `table` | `toggle` | `minimal`

```tsx
import { PricingSection } from "@/shared/components/organisms";

<PricingSection
  variant="toggle"
  title="Nos Tarifs"
  plans={[
    {
      id: "pro",
      name: "Professional",
      price: 79,
      period: "mois",
      popular: true,
      features: [
        { name: "Feature 1", included: true, highlight: true },
        { name: "Feature 2", included: false }
      ]
    }
  ]}
  showAnnual={true}
  annualDiscount={20}
  currencySymbol="€"
/>
```

**Fonctionnalités :**
- Toggle mensuel/annuel
- Plans populaires mis en avant
- Tableau comparatif
- Calcul automatique des remises
- Features avec highlights

### 5. CTASection
**Variants disponibles :** `default` | `gradient` | `centered` | `split` | `newsletter` | `contact` | `minimal`

```tsx
import { CTASection } from "@/shared/components/organisms";

<CTASection
  variant="newsletter"
  title="Restez Informé"
  description="Newsletter hebdomadaire..."
  badge="Gratuit"
  showSocialProof={true}
  onEmailSubmit={(email) => {}}
  onContactSubmit={(data) => {}}
/>
```

**Fonctionnalités :**
- Formulaire newsletter intégré
- Formulaire de contact complet
- Social proof
- Actions multiples
- Patterns de fond

### 6. AboutSection
**Variants disponibles :** `default` | `split` | `centered` | `timeline` | `stats` | `team`

```tsx
import { AboutSection } from "@/shared/components/organisms";

<AboutSection
  variant="timeline"
  title="Notre Histoire"
  timeline={[
    {
      year: "2020",
      title: "Création",
      description: "Début de l'aventure..."
    }
  ]}
  team={[
    {
      name: "Jean Dupont",
      role: "CEO",
      bio: "Passionné de tech..."
    }
  ]}
  stats={[
    { value: "10K+", label: "Clients", icon: <Users /> }
  ]}
/>
```

**Fonctionnalités :**
- Timeline avec animations
- Galerie équipe
- Statistiques visuelles
- Layout divisé avec features

### 7. FAQ (amélioré)
**Variants disponibles :** `accordion` | `grid` | `searchable`

```tsx
import { FAQ } from "@/shared/components/organisms";

<FAQ
  variant="searchable"
  faqs={[
    {
      id: "1",
      question: "Comment commencer ?",
      answer: "Il suffit de...",
      category: "Démarrage",
      tags: ["guide", "onboarding"]
    }
  ]}
  showCategories={true}
/>
```

**Fonctionnalités :**
- Recherche en temps réel
- Filtrage par catégories
- Tags pour chaque FAQ
- Icônes par catégorie

## 🎨 Utilisation

### Import Simple
```tsx
import { 
  HeroSection, 
  FeaturesSection, 
  TestimonialsSection 
} from "@/shared/components/organisms";
```

### Exemple Complet
```tsx
// Voir le fichier examples/components-showcase.tsx
import ComponentsShowcase from "@/shared/components/examples/components-showcase";
```

## 🎯 Variants Recommandés par Cas d'Usage

### Page d'Accueil
- **Hero :** `gradient` ou `split`
- **Features :** `alternating` ou `cards`
- **Testimonials :** `featured` ou `carousel`
- **CTA :** `gradient` ou `centered`

### Page Produit
- **Hero :** `split` avec image produit
- **Features :** `grid` ou `list`
- **Pricing :** `toggle` pour flexibilité
- **FAQ :** `searchable`

### Page À Propos
- **Hero :** `minimal` ou `centered`
- **About :** `timeline` ou `team`
- **Testimonials :** `masonry`
- **CTA :** `contact`

### Landing Page
- **Hero :** `gradient` avec stats
- **Features :** `icons-only` ou `centered`
- **Testimonials :** `carousel`
- **Pricing :** `cards`
- **CTA :** `newsletter`

## 🔧 Personnalisation

### Couleurs
Chaque composant supporte les couleurs personnalisées via la prop `color` ou `className`.

### Responsive
Tous les composants sont entièrement responsive avec des breakpoints adaptés.

### Accessibilité
- Support complet du clavier
- Attributs ARIA appropriés
- Contraste optimisé
- Screen readers friendly

## 📱 Responsive Design

Tous les composants s'adaptent automatiquement :
- **Mobile :** 1 colonne, navigation simplifiée
- **Tablet :** 2 colonnes, interactions tactiles
- **Desktop :** 3-4 colonnes, animations hover

## 🚀 Performance

- Lazy loading des images
- Animations CSS optimisées
- Bundle size minimal
- Tree shaking supporté

## 🎭 Thématique

Les composants respectent votre système de design avec :
- Variables CSS custom
- Support Tailwind complet
- Mode sombre compatible
- Tokens de design cohérents

---

*Pour voir tous les variants en action, consultez le fichier `examples/components-showcase.tsx`*
