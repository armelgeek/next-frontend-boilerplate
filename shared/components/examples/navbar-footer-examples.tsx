"use client";

import React from "react";
import { Navbar } from "../organisms/navbar";
import { Footer } from "../organisms/footer";

// Exemple de données utilisateur
const sampleUser = {
  name: "Marie Dubois",
  email: "marie.dubois@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c04c?w=150&h=150&fit=crop&crop=face",
  role: "Administrateur"
};

// Exemple de navigation personnalisée
const customNavigation = [
  {
    label: "Accueil",
    href: "/",
    icon: <span>🏠</span>
  },
  {
    label: "Produits",
    href: "/products",
    icon: <span>📦</span>,
    children: [
      { label: "Tous les produits", href: "/products", description: "Parcourir tous nos produits" },
      { label: "Nouveautés", href: "/products/new", description: "Les derniers ajouts", badge: "Nouveau" },
      { label: "Promotions", href: "/products/sale", description: "Offres spéciales" }
    ]
  },
  {
    label: "Services",
    href: "/services",
    icon: <span>💼</span>,
    badge: "Pro"
  },
  {
    label: "Blog",
    href: "/blog",
    icon: <span>📝</span>
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <span>✉️</span>
  }
];

// Exemple de sections footer personnalisées
const customFooterSections = [
  {
    title: "Produits",
    links: [
      { label: "Fonctionnalités", href: "/features" },
      { label: "Tarifs", href: "/pricing" },
      { label: "API", href: "/api", badge: "Bêta" },
      { label: "Documentation", href: "/docs" },
      { label: "Intégrations", href: "/integrations", isNew: true }
    ]
  },
  {
    title: "Ressources",
    links: [
      { label: "Centre d'aide", href: "/help" },
      { label: "Tutoriels", href: "/tutorials" },
      { label: "Webinaires", href: "/webinars", isPopular: true },
      { label: "Templates", href: "/templates" },
      { label: "Guides", href: "/guides" }
    ]
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/about" },
      { label: "Équipe", href: "/team" },
      { label: "Carrières", href: "/careers", badge: "5 postes" },
      { label: "Presse", href: "/press" },
      { label: "Investisseurs", href: "/investors" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Statut", href: "/status" },
      { label: "Communauté", href: "/community" },
      { label: "Signaler un bug", href: "/bug-report" },
      { label: "Demander une fonctionnalité", href: "/feature-request" }
    ]
  }
];

// Exemple de liens sociaux
const customSocialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: <span>🐙</span>
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: <span>🐦</span>
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <span>💼</span>
  },
  {
    name: "Discord",
    href: "https://discord.com",
    icon: <span>💬</span>
  }
];

// Exemple d'informations de contact
const contactInfo = {
  address: "123 Avenue des Innovations, 75001 Paris, France",
  phone: "+33 1 23 45 67 89",
  email: "contact@monentreprise.com",
  hours: "Lun-Ven: 9h-18h, Sam: 9h-12h"
};

export function NavbarFooterExamples() {
  const [currentExample, setCurrentExample] = React.useState("default");

  const examples = [
    {
      id: "default",
      title: "Default - Navbar & Footer complets",
      navbar: (
        <Navbar
          logo={{ text: "MonApp", href: "/" }}
          navigation={customNavigation}
          user={sampleUser}
          showSearch={true}
          showCart={true}
          cartCount={3}
          showNotifications={true}
          notificationCount={12}
          showCTA={true}
          ctaText="Essai gratuit"
          onLogin={() => console.log("Login clicked")}
          onLogout={() => console.log("Logout clicked")}
          onSearchClick={() => console.log("Search clicked")}
          onCartClick={() => console.log("Cart clicked")}
          onNotificationClick={() => console.log("Notifications clicked")}
        />
      ),
      footer: (
        <Footer
          logo={{ text: "MonApp", href: "/" }}
          description="Une plateforme innovante qui révolutionne votre façon de travailler avec des outils modernes et intuitifs."
          sections={customFooterSections}
          socialLinks={customSocialLinks}
          contactInfo={contactInfo}
          showNewsletter={true}
          newsletterTitle="Restez à jour"
          newsletterDescription="Recevez nos dernières actualités et conseils directement dans votre boîte mail."
          showTrustBadges={true}
          onNewsletterSubmit={(email) => console.log("Newsletter signup:", email)}
        />
      )
    },
    {
      id: "minimal",
      title: "Minimal - Version épurée",
      navbar: (
        <Navbar
          variant="minimal"
          logo={{ text: "Minimal", href: "/" }}
          navigation={customNavigation.slice(0, 4)}
          user={sampleUser}
          showSearch={false}
          showCTA={false}
          onLogin={() => console.log("Login clicked")}
          onLogout={() => console.log("Logout clicked")}
        />
      ),
      footer: (
        <Footer
          variant="minimal"
          logo={{ text: "Minimal", href: "/" }}
          sections={customFooterSections.slice(0, 1)}
          socialLinks={customSocialLinks.slice(0, 3)}
          showNewsletter={false}
          theme="light"
        />
      )
    },
    {
      id: "corporate",
      title: "Corporate - Style entreprise",
      navbar: (
        <Navbar
          variant="corporate"
          logo={{ text: "CorporateApp", href: "/" }}
          navigation={[
            { label: "Solutions", href: "/solutions" },
            { label: "Industries", href: "/industries" },
            { label: "Ressources", href: "/resources" },
            { label: "Support", href: "/support" },
            { label: "À propos", href: "/about" }
          ]}
          showSearch={true}
          showCTA={true}
          ctaText="Demander une démo"
          ctaVariant="secondary"
          onLogin={() => console.log("Login clicked")}
        />
      ),
      footer: (
        <Footer
          variant="corporate"
          logo={{ text: "CorporateApp", href: "/" }}
          description="Solutions d'entreprise de classe mondiale pour transformer votre organisation avec confiance et sécurité."
          sections={[
            {
              title: "Solutions",
              links: [
                { label: "Gestion d'équipe", href: "/team-management" },
                { label: "Analyse de données", href: "/analytics" },
                { label: "Automatisation", href: "/automation" },
                { label: "Sécurité", href: "/security" }
              ]
            },
            {
              title: "Industries",
              links: [
                { label: "Finance", href: "/finance" },
                { label: "Santé", href: "/healthcare" },
                { label: "E-commerce", href: "/ecommerce" },
                { label: "Éducation", href: "/education" }
              ]
            },
            {
              title: "Entreprise",
              links: [
                { label: "À propos", href: "/about" },
                { label: "Carrières", href: "/careers" },
                { label: "Partenaires", href: "/partners" },
                { label: "Investisseurs", href: "/investors" }
              ]
            }
          ]}
          socialLinks={customSocialLinks}
          contactInfo={contactInfo}
          theme="dark"
        />
      )
    },
    {
      id: "ecommerce",
      title: "E-commerce - Boutique en ligne",
      navbar: (
        <Navbar
          variant="ecommerce"
          logo={{ text: "ShopApp", href: "/" }}
          navigation={[
            { label: "Accueil", href: "/" },
            {
              label: "Produits",
              href: "/products",
              children: [
                { label: "Vêtements", href: "/clothes", description: "Mode homme et femme" },
                { label: "Électronique", href: "/electronics", description: "Gadgets et accessoires" },
                { label: "Maison", href: "/home", description: "Décoration et mobilier" }
              ]
            },
            { label: "Promotions", href: "/sale", badge: "-50%" },
            { label: "Blog", href: "/blog" }
          ]}
          showSearch={true}
          showCart={true}
          cartCount={7}
          showCTA={true}
          ctaText="S'inscrire"
          onLogin={() => console.log("Login clicked")}
          onSearchClick={() => console.log("Search clicked")}
          onCartClick={() => console.log("Cart clicked")}
        />
      ),
      footer: (
        <Footer
          variant="ecommerce"
          logo={{ text: "ShopApp", href: "/" }}
          description="Votre boutique en ligne de confiance avec des millions de produits de qualité et une livraison rapide."
          sections={[
            {
              title: "Boutique",
              links: [
                { label: "Nouveautés", href: "/new", isNew: true },
                { label: "Meilleures ventes", href: "/bestsellers", isPopular: true },
                { label: "Promotions", href: "/sale" },
                { label: "Marques", href: "/brands" }
              ]
            },
            {
              title: "Service client",
              links: [
                { label: "Aide", href: "/help" },
                { label: "Livraison", href: "/shipping" },
                { label: "Retours", href: "/returns" },
                { label: "Garantie", href: "/warranty" }
              ]
            },
            {
              title: "Mon compte",
              links: [
                { label: "Connexion", href: "/login" },
                { label: "Commandes", href: "/orders" },
                { label: "Liste de souhaits", href: "/wishlist" },
                { label: "Points fidélité", href: "/loyalty" }
              ]
            }
          ]}
          socialLinks={customSocialLinks}
          showNewsletter={true}
          newsletterTitle="Offres exclusives"
          newsletterDescription="Soyez le premier informé de nos promotions et nouveautés."
          showTrustBadges={true}
        />
      )
    },
    {
      id: "startup",
      title: "Startup - Style moderne et innovant",
      navbar: (
        <Navbar
          variant="landing"
          logo={{ text: "StartupCo", href: "/" }}
          navigation={[
            { label: "Produit", href: "/product" },
            { label: "Solutions", href: "/solutions" },
            { label: "Prix", href: "/pricing" },
            { label: "Blog", href: "/blog" },
            { label: "À propos", href: "/about" }
          ]}
          showSearch={false}
          showCTA={true}
          ctaText="Commencer gratuitement"
          transparent={true}
          onLogin={() => console.log("Login clicked")}
        />
      ),
      footer: (
        <Footer
          variant="startup"
          logo={{ text: "StartupCo", href: "/" }}
          description="Nous construisons le futur du travail avec des technologies de pointe et une vision audacieuse."
          socialLinks={customSocialLinks}
          contactInfo={{ email: "hello@startupco.com", phone: "+33 1 23 45 67 89" }}
          showNewsletter={true}
          newsletterTitle="Rejoignez la révolution"
          newsletterDescription="Découvrez nos innovations en avant-première."
        />
      )
    },
    {
      id: "blog",
      title: "Blog - Publication de contenu",
      navbar: (
        <Navbar
          variant="blog"
          logo={{ text: "Mon Blog", href: "/" }}
          navigation={[
            { label: "Accueil", href: "/" },
            { label: "Articles", href: "/posts" },
            { label: "Catégories", href: "/categories" },
            { label: "Auteurs", href: "/authors" },
            { label: "À propos", href: "/about" }
          ]}
          showSearch={true}
          showCTA={true}
          ctaText="S'abonner"
          ctaVariant="outline"
          onLogin={() => console.log("Login clicked")}
          onSearchClick={() => console.log("Search clicked")}
        />
      ),
      footer: (
        <Footer
          variant="blog"
          logo={{ text: "Mon Blog", href: "/" }}
          description="Un blog passionnant sur la technologie, l'innovation et les tendances du futur."
          sections={[
            {
              title: "Contenu",
              links: [
                { label: "Articles récents", href: "/recent" },
                { label: "Plus populaires", href: "/popular", isPopular: true },
                { label: "Catégories", href: "/categories" },
                { label: "Archives", href: "/archives" }
              ]
            },
            {
              title: "Communauté",
              links: [
                { label: "Newsletter", href: "/newsletter" },
                { label: "Commentaires", href: "/comments" },
                { label: "Contribuer", href: "/contribute", isNew: true },
                { label: "Auteurs", href: "/authors" }
              ]
            }
          ]}
          socialLinks={customSocialLinks}
          showNewsletter={true}
          theme="light"
        />
      )
    }
  ];

  const currentExampleData = examples.find(ex => ex.id === currentExample);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sélecteur d'exemples */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Exemples Navbar & Footer</h1>
          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example.id}
                onClick={() => setCurrentExample(example.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentExample === example.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exemple en cours */}
      {currentExampleData && (
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          {currentExampleData.navbar}

          {/* Contenu principal */}
          <main className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">
                {currentExampleData.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Ceci est un exemple d'implémentation du style <strong>{currentExample}</strong> 
                pour le navbar et le footer. Explorez les différentes variantes disponibles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="font-semibold mb-3 text-blue-600">Fonctionnalités Navbar</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Navigation responsive avec menu mobile</li>
                    <li>• Support des sous-menus déroulants</li>
                    <li>• Authentification utilisateur</li>
                    <li>• Recherche et notifications</li>
                    <li>• Panier d'achat (e-commerce)</li>
                    <li>• Boutons d'action personnalisables</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="font-semibold mb-3 text-green-600">Fonctionnalités Footer</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Sections de liens organisées</li>
                    <li>• Newsletter avec validation</li>
                    <li>• Liens sociaux et contact</li>
                    <li>• Badges de confiance</li>
                    <li>• Retour en haut de page</li>
                    <li>• Sélecteur de langue</li>
                  </ul>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          {currentExampleData.footer}
        </div>
      )}
    </div>
  );
}

export default NavbarFooterExamples;
