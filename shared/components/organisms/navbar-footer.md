# Navbar & Footer Components

Composants navbar et footer avec plusieurs variantes pour s'adapter à différents types de sites web et applications.

## 🚀 Caractéristiques principales

### Navbar
- **8 variantes** : default, minimal, corporate, ecommerce, dashboard, landing, blog, app
- **Navigation responsive** avec menu mobile automatique
- **Authentification utilisateur** avec menu déroulant
- **Recherche, panier, notifications** configurables
- **Sous-menus** avec descriptions
- **Logo personnalisable** (image ou texte)
- **Themes** : light/dark/auto
- **Position sticky** avec transparence optionnelle

### Footer
- **8 variantes** : default, minimal, corporate, ecommerce, blog, startup, agency, saas  
- **Newsletter** avec validation email
- **Liens sociaux** personnalisables
- **Sections de liens** organisées avec badges
- **Informations de contact** complètes
- **Badges de confiance** (SSL, ISO, RGPD)
- **Sélecteur de langue**
- **Retour en haut** automatique
- **Themes** : light/dark

## 📦 Installation

Les composants utilisent les dépendances suivantes (déjà incluses dans le projet) :

```bash
# Dépendances UI
@radix-ui/react-navigation-menu
@radix-ui/react-dropdown-menu
@radix-ui/react-sheet
@radix-ui/react-separator

# Icônes
lucide-react

# Utilitaires
tailwindcss
class-variance-authority
```

## 🎨 Utilisation de base

### Navbar Simple

```tsx
import { Navbar } from '@/shared/components/organisms/navbar';

function App() {
  return (
    <Navbar
      logo={{ text: "MonApp", href: "/" }}
      navigation={[
        { label: "Accueil", href: "/" },
        { label: "À propos", href: "/about" },
        { label: "Contact", href: "/contact" }
      ]}
      showCTA={true}
      ctaText="Commencer"
      onLogin={() => console.log("Login")}
    />
  );
}
```

### Footer Simple

```tsx
import { Footer } from '@/shared/components/organisms/footer';

function App() {
  return (
    <Footer
      logo={{ text: "MonApp", href: "/" }}
      description="Description de votre application"
      showNewsletter={true}
      onNewsletterSubmit={(email) => console.log(email)}
    />
  );
}
```

## 🎯 Variantes et exemples

### Navbar - Variantes disponibles

#### 1. Default
Navigation standard avec toutes les fonctionnalités.

```tsx
<Navbar
  variant="default"
  logo={{ text: "MonApp" }}
  navigation={navigation}
  user={user}
  showSearch={true}
  showCart={true}
  cartCount={3}
  showNotifications={true}
  notificationCount={5}
/>
```

#### 2. Minimal
Version épurée pour sites simples.

```tsx
<Navbar
  variant="minimal"
  logo={{ text: "Simple" }}
  navigation={[
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" }
  ]}
/>
```

#### 3. E-commerce
Optimisé pour boutiques en ligne.

```tsx
<Navbar
  variant="ecommerce"
  logo={{ text: "Shop" }}
  navigation={productCategories}
  showSearch={true}
  showCart={true}
  cartCount={items.length}
  onCartClick={() => openCart()}
  onSearchClick={() => openSearch()}
/>
```

#### 4. Corporate
Style professionnel pour entreprises.

```tsx
<Navbar
  variant="corporate"
  logo={{ src: "/corporate-logo.png" }}
  navigation={corporateNav}
  showCTA={true}
  ctaText="Demander une démo"
  ctaVariant="secondary"
/>
```

#### 5. Landing Page
Transparent au début, devient opaque au scroll.

```tsx
<Navbar
  variant="landing"
  logo={{ text: "StartupCo" }}
  navigation={landingNav}
  transparent={true}
  sticky={true}
  showCTA={true}
  ctaText="Essai gratuit"
/>
```

### Footer - Variantes disponibles

#### 1. Default
Footer complet avec toutes les sections.

```tsx
<Footer
  variant="default"
  logo={{ text: "MonApp" }}
  description="Description complète"
  sections={footerSections}
  socialLinks={socialLinks}
  contactInfo={contactInfo}
  showNewsletter={true}
  showTrustBadges={true}
/>
```

#### 2. Minimal
Version simplifiée.

```tsx
<Footer
  variant="minimal"
  logo={{ text: "Simple" }}
  sections={[basicSection]}
  socialLinks={socialLinks.slice(0, 3)}
  showNewsletter={false}
/>
```

#### 3. Startup
Style moderne avec gradient.

```tsx
<Footer
  variant="startup"
  logo={{ text: "StartupCo" }}
  description="Vision audacieuse du futur"
  socialLinks={socialLinks}
  showNewsletter={true}
  newsletterTitle="Rejoignez la révolution"
/>
```

#### 4. Corporate
Style professionnel sombre.

```tsx
<Footer
  variant="corporate"
  logo={{ src: "/corporate-logo-white.png" }}
  description="Solutions d'entreprise"
  sections={corporateSections}
  theme="dark"
  showTrustBadges={true}
/>
```

## 🔧 Configuration avancée

### Navigation avec sous-menus

```tsx
const navigation = [
  {
    label: "Produits",
    href: "/products",
    icon: <Package className="w-4 h-4" />,
    children: [
      {
        label: "Tous les produits",
        href: "/products",
        description: "Parcourir le catalogue complet"
      },
      {
        label: "Nouveautés",
        href: "/products/new",
        description: "Derniers arrivages",
        badge: "Nouveau"
      }
    ]
  }
];
```

### Sections footer personnalisées

```tsx
const footerSections = [
  {
    title: "Produits",
    links: [
      { label: "Fonctionnalités", href: "/features" },
      { label: "API", href: "/api", badge: "Bêta" },
      { label: "Nouveautés", href: "/new", isNew: true },
      { label: "Populaire", href: "/popular", isPopular: true }
    ]
  }
];
```

### Gestion des événements

```tsx
<Navbar
  onLogin={() => router.push('/login')}
  onLogout={() => {
    logout();
    router.push('/');
  }}
  onSearchClick={() => setSearchOpen(true)}
  onCartClick={() => setCartOpen(true)}
  onNotificationClick={() => setNotificationsOpen(true)}
  onProfileClick={() => router.push('/profile')}
/>

<Footer
  onNewsletterSubmit={async (email) => {
    try {
      await subscribeToNewsletter(email);
      toast.success('Abonnement réussi !');
    } catch (error) {
      toast.error('Erreur lors de l\'abonnement');
    }
  }}
  onLanguageChange={(lang) => {
    i18n.changeLanguage(lang);
  }}
/>
```

## 📱 Responsive Design

Les composants sont entièrement responsifs :

- **Mobile** : Menu hamburger automatique, navigation simplifiée
- **Tablet** : Adaptation des espacements et tailles
- **Desktop** : Affichage complet des fonctionnalités

## 🎨 Personnalisation CSS

### Variables CSS personnalisables

```css
:root {
  --navbar-height: 4rem;
  --navbar-bg: rgb(255 255 255);
  --navbar-border: rgb(229 231 235);
  --footer-bg: rgb(17 24 39);
  --footer-text: rgb(209 213 219);
}
```

### Classes Tailwind utilisées

- **Layout** : `sticky`, `top-0`, `z-50`, `w-full`
- **Spacing** : `px-4`, `py-2`, `space-x-4`, `gap-8`
- **Colors** : `bg-white`, `text-gray-900`, `border-gray-200`
- **Effects** : `backdrop-blur-sm`, `shadow-sm`, `transition-all`

## 🌍 Internationalisation

Support pour multiple langues :

```tsx
<Footer
  showLanguageSelector={true}
  languages={[
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ]}
  currentLanguage="fr"
  onLanguageChange={(lang) => changeLanguage(lang)}
/>
```

## ♿ Accessibilité

- **Navigation clavier** complète
- **ARIA labels** sur tous les éléments interactifs
- **Contraste** respectant les standards WCAG
- **Focus visible** sur tous les éléments
- **Screen readers** supportés

## 🔐 Sécurité et bonnes pratiques

- **URLs externes** avec `rel="noopener noreferrer"`
- **Validation email** côté client et serveur
- **Sanitisation** des données utilisateur
- **HTTPS** requis pour production

## 🧪 Tests recommandés

### Tests unitaires

```tsx
describe('Navbar', () => {
  it('should render logo correctly', () => {
    render(<Navbar logo={{ text: "Test" }} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle login click', () => {
    const onLogin = jest.fn();
    render(<Navbar onLogin={onLogin} />);
    fireEvent.click(screen.getByText('Se connecter'));
    expect(onLogin).toHaveBeenCalled();
  });
});
```

### Tests d'intégration

```tsx
describe('Footer Newsletter', () => {
  it('should submit email correctly', async () => {
    const onSubmit = jest.fn();
    render(<Footer onNewsletterSubmit={onSubmit} />);
    
    const input = screen.getByPlaceholderText('votre@email.com');
    const button = screen.getByRole('button', { name: /envoyer/i });
    
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith('test@example.com');
    });
  });
});
```

## 📊 Performance

### Optimisations incluses

- **Code splitting** automatique des composants
- **Lazy loading** des icônes
- **Memoization** des calculs complexes
- **Debounce** sur les événements de scroll
- **Minimal bundle size** (~15KB gzippé)

### Métriques recommandées

- **FCP** : < 1.5s
- **LCP** : < 2.5s
- **CLS** : < 0.1
- **FID** : < 100ms

## 🔄 Migration depuis d'autres composants

### Depuis un navbar custom

```tsx
// Avant
<CustomNavbar 
  brand="MonApp"
  links={links}
  user={user}
/>

// Après
<Navbar
  logo={{ text: "MonApp" }}
  navigation={links}
  user={user}
/>
```

### Depuis un footer custom

```tsx
// Avant
<CustomFooter 
  companyName="MonApp"
  links={footerLinks}
  social={socialLinks}
/>

// Après
<Footer
  logo={{ text: "MonApp" }}
  sections={footerLinks}
  socialLinks={socialLinks}
/>
```

## 📚 Ressources complémentaires

- [Guide Radix UI Navigation](https://www.radix-ui.com/docs/primitives/components/navigation-menu)
- [Patterns de navigation](https://ui.shadcn.com/docs/components/navigation-menu)
- [Accessibilité web](https://web.dev/accessibility/)
- [Responsive design](https://web.dev/responsive-web-design-basics/)

---

Pour voir tous les exemples en action, consultez le fichier `navbar-footer-examples.tsx`.
