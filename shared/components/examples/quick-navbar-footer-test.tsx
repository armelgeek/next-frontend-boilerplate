"use client";

import React from "react";
import { Navbar } from "../organisms/navbar";
import { Footer } from "../organisms/footer";

// Configuration de test rapide
const quickTestUser = {
  name: "Jean Dupont",
  email: "jean@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
};

const quickTestNav = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/products", badge: "Nouveau" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" }
];

const quickTestSocials = [
  { name: "Facebook", href: "#", icon: <span>📘</span> },
  { name: "Twitter", href: "#", icon: <span>🐦</span> },
  { name: "LinkedIn", href: "#", icon: <span>💼</span> }
];

export function QuickNavbarFooterTest() {
  const [selectedVariant, setSelectedVariant] = React.useState("default");

  const variants = [
    "default",
    "minimal", 
    "corporate",
    "ecommerce",
    "blog",
    "startup",
    "agency",
    "saas"
  ];

  const renderNavbar = () => {
    const commonProps = {
      logo: { text: "TestApp", href: "/" },
      navigation: quickTestNav,
      user: quickTestUser,
      onLogin: () => console.log("Login"),
      onLogout: () => console.log("Logout"),
      onSearchClick: () => console.log("Search"),
      onCartClick: () => console.log("Cart"),
      onNotificationClick: () => console.log("Notifications")
    };

    switch (selectedVariant) {
      case "minimal":
        return <Navbar variant="minimal" {...commonProps} showSearch={false} showCTA={false} />;
      case "corporate":
        return <Navbar variant="corporate" {...commonProps} showCTA={true} ctaText="Demo" />;
      case "ecommerce":
        return <Navbar variant="ecommerce" {...commonProps} showCart={true} cartCount={5} showSearch={true} />;
      case "blog":
        return <Navbar variant="blog" {...commonProps} showCTA={true} ctaText="S'abonner" />;
      case "landing":
        return <Navbar variant="landing" {...commonProps} transparent={true} showCTA={true} ctaText="Commencer" />;
      case "app":
        return <Navbar variant="app" {...commonProps} showNotifications={true} notificationCount={3} />;
      default:
        return <Navbar {...commonProps} showSearch={true} showCTA={true} ctaText="Essayer" />;
    }
  };

  const renderFooter = () => {
    const commonProps = {
      logo: { text: "TestApp", href: "/" },
      description: "Une application de test pour démontrer les variantes des composants.",
      socialLinks: quickTestSocials,
      onNewsletterSubmit: (email: string) => console.log("Newsletter:", email)
    };

    switch (selectedVariant) {
      case "minimal":
        return <Footer variant="minimal" {...commonProps} showNewsletter={false} />;
      case "corporate":
        return <Footer variant="corporate" {...commonProps} theme="dark" />;
      case "ecommerce":
        return <Footer variant="ecommerce" {...commonProps} showTrustBadges={true} />;
      case "blog":
        return <Footer variant="blog" {...commonProps} theme="light" />;
      case "startup":
        return <Footer variant="startup" {...commonProps} />;
      case "agency":
        return <Footer variant="agency" {...commonProps} />;
      case "saas":
        return <Footer variant="saas" {...commonProps} theme="light" />;
      default:
        return <Footer {...commonProps} showTrustBadges={true} showLanguageSelector={true} languages={[
          { code: 'fr', label: 'Français', flag: '🇫🇷' },
          { code: 'en', label: 'English', flag: '🇺🇸' }
        ]} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Contrôles de test */}
      <div className="bg-yellow-100 border-b border-yellow-200 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-lg font-bold mb-2">🧪 Test Rapide Navbar & Footer</h1>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedVariant === variant
                    ? 'bg-yellow-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-yellow-50'
                }`}
              >
                {variant}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Variante actuelle: <strong>{selectedVariant}</strong> 
            - Cliquez sur les boutons pour tester différents styles
          </p>
        </div>
      </div>

      {/* Navbar à tester */}
      {renderNavbar()}

      {/* Contenu principal */}
      <main className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🚀</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Test en cours</h2>
          <p className="text-gray-600 mb-6">
            Testez les différentes variantes de navbar et footer en utilisant les boutons en haut de la page.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-blue-600 mb-2">Navbar Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Responsive design</li>
                <li>• User authentication</li>
                <li>• Search & cart</li>
                <li>• Multiple variants</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-green-600 mb-2">Footer Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Newsletter signup</li>
                <li>• Social links</li>
                <li>• Trust badges</li>
                <li>• Multiple themes</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer à tester */}
      {renderFooter()}
    </div>
  );
}

export default QuickNavbarFooterTest;
