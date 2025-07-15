# HeroSection - Documentation des 20 Variants

Le composant `HeroSection` propose maintenant **20 variants** différents pour s'adapter à tous les contextes et besoins de design.

## 🎨 Variants Disponibles

### **Variants Modernes (14 nouveaux)**

1. **`fullscreen`** - Hero plein écran avec overlay et contenu centré
   - Usage : Landing pages impactantes, sites portfolio
   - Features : Overlay sombre, texte centré, actions prominentes

2. **`carousel`** - Hero avec carrousel d'images/slides
   - Usage : Sites e-commerce, portfolios, présentations
   - Features : Navigation de slides, indicateurs, transitions automatiques

3. **`parallax`** - Hero avec effet parallaxe sur l'image de fond
   - Usage : Sites créatifs, portfolios, expérience immersive
   - Features : Défilement parallaxe, overlay, animation fluide

4. **`animated`** - Hero avec animations et transitions
   - Usage : Sites modernes, startups tech, applications
   - Features : Animations d'entrée, transitions, effets hover

5. **`interactive`** - Hero avec éléments interactifs
   - Usage : Démos produits, sites tech, applications SaaS
   - Features : Boutons interactifs, hover effects, micro-animations

6. **`showcase`** - Hero orienté produit avec médias
   - Usage : Lancements produits, présentations, portfolios
   - Features : Mise en avant produit, galerie, call-to-actions

7. **`landing`** - Hero optimisé pour landing pages
   - Usage : Campagnes marketing, pages de conversion
   - Features : Formulaire de capture, testimonials, preuves sociales

8. **`saas`** - Hero spécialisé pour applications SaaS
   - Usage : Logiciels, applications web, services B2B
   - Features : Features highlights, pricing, démonstration

9. **`startup`** - Hero dynamique pour startups
   - Usage : Startups, levées de fonds, innovation
   - Features : Vision/mission, équipe, roadmap

10. **`creative`** - Hero créatif avec design artistique
    - Usage : Agences créatives, artistes, portfolios
    - Features : Layouts créatifs, typographies, couleurs

11. **`portfolio`** - Hero pour portfolios professionnels
    - Usage : Freelances, agences, professionnels créatifs
    - Features : Travaux récents, compétences, contact

12. **`blog`** - Hero optimisé pour blogs/contenus
    - Usage : Blogs, magazines, sites de contenu
    - Features : Articles récents, catégories, newsletter

13. **`ecommerce`** - Hero pour sites e-commerce
    - Usage : Boutiques en ligne, marketplaces
    - Features : Produits vedettes, promotions, catalogue

14. **`app`** - Hero pour applications mobiles/web
    - Usage : Apps mobiles, logiciels, téléchargements
    - Features : Captures d'écran, stores, fonctionnalités

15. **`corporate`** - Hero professionnel entreprise
    - Usage : Sites corporate, institutions, B2B
    - Features : Valeurs, services, contact professionnel

### **Variants Classiques (5 originaux)**

16. **`minimal`** - Design épuré et minimaliste
    - Usage : Sites élégants, portfolios minimalistes
    - Features : Typographie claire, espaces blancs

17. **`centered`** - Contenu centré avec statistiques
    - Usage : Pages d'accueil, présentations entreprise
    - Features : Statistiques, métriques, centrage parfait

18. **`split`** - Layout en deux colonnes
    - Usage : Présentations produits, services
    - Features : Texte + image, équilibre visuel

19. **`video`** - Hero avec vidéo de fond
    - Usage : Sites immersifs, présentations vidéo
    - Features : Vidéo autoplay, overlay, contrôles

20. **`gradient`** - Fond dégradé avec patterns
    - Usage : Sites modernes, tech, créatifs
    - Features : Dégradés, patterns, recherche intégrée

## 🛠️ Props Disponibles

### Props de Base
- `variant` : Type de hero (20 options)
- `title` : Titre principal
- `description` : Description/sous-titre
- `className` : Classes CSS personnalisées

### Props d'Actions
- `actions` : Boutons d'action avec variants
- `badge` : Badge/étiquette au-dessus du titre

### Props Médias
- `image` : Image principale
- `video` : Vidéo de fond
- `backgroundPattern` : Pattern de fond

### Props Interactives
- `searchable` : Activer la recherche
- `searchQuery` : Valeur de recherche
- `setSearchQuery` : Handler de recherche

### Props de Contenu
- `features` : Liste de fonctionnalités
- `stats` : Statistiques à afficher
- `testimonial` : Témoignage client
- `announcement` : Annonce/news
- `countdown` : Compte à rebours
- `products` : Produits vedettes
- `slides` : Slides pour carrousel

## 🎯 Exemples d'Usage

### Hero Fullscreen
```tsx
<HeroSection
  variant="fullscreen"
  title="Révolutionnez votre façon de travailler"
  description="Notre plateforme innovante transforme votre productivité"
  image="/hero-bg.jpg"
  actions={[
    { label: "Commencer", variant: "default", icon: <ArrowRight /> },
    { label: "En savoir plus", variant: "outline" }
  ]}
/>
```

### Hero SaaS avec Features
```tsx
<HeroSection
  variant="saas"
  title="La solution tout-en-un pour votre entreprise"
  description="Gérez, analysez et développez votre activité"
  badge="Nouvelle version 2.0"
  features={[
    { title: "Analytics", description: "Données en temps réel", icon: <BarChart /> },
    { title: "Automation", description: "Workflows automatisés", icon: <Zap /> },
    { title: "Security", description: "Sécurité enterprise", icon: <Shield /> }
  ]}
  actions={[
    { label: "Essai gratuit", variant: "default" },
    { label: "Voir la démo", variant: "outline" }
  ]}
/>
```

### Hero E-commerce
```tsx
<HeroSection
  variant="ecommerce"
  title="Collection Automne 2024"
  description="Découvrez nos nouveautés et tendances"
  products={[
    { name: "Veste Premium", price: "199€", image: "/product1.jpg" },
    { name: "Pantalon Slim", price: "89€", image: "/product2.jpg" }
  ]}
  actions={[
    { label: "Voir la collection", variant: "default" },
    { label: "Catalogue", variant: "outline" }
  ]}
/>
```

## 🎨 Personnalisation

Chaque variant peut être personnalisé avec :
- **Classes CSS** personnalisées via `className`
- **Couleurs** via les props de couleur
- **Animations** via les props d'animation
- **Layout** via les props de disposition

## 📱 Responsive Design

Tous les variants sont **entièrement responsives** avec :
- Breakpoints mobile, tablet, desktop
- Typographie adaptative
- Images et vidéos responsives
- Navigation mobile optimisée

## ♿ Accessibilité

Tous les variants respectent les standards :
- ARIA labels appropriés
- Navigation clavier
- Contraste suffisant
- Textes alternatifs

---

**Le HeroSection offre maintenant une flexibilité maximale avec 20 variants pour couvrir tous les besoins de design moderne !**
