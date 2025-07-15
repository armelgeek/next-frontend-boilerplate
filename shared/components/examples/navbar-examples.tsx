"use client";

import React, { useState } from 'react';
import { Navbar } from '@/shared/components/organisms/navbar';
import { 
  Home, Package, Briefcase, Info, Mail, Users, Calendar, 
  Utensils, Plane, Stethoscope, GraduationCap, DollarSign, Zap,
  Globe, Building, MapPin, Phone, FileText, HelpCircle, Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';

/**
 * Exemples complets des 33 variants du Navbar
 * Page de démonstration pour tester tous les variants disponibles
 */

const NavbarExamples = () => {
  const [activeVariant, setActiveVariant] = useState<string>('default');

  // Navigation de base
  const defaultNavigation = [
    { label: "Accueil", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "Produits", href: "/products", icon: <Package className="w-4 h-4" /> },
    { label: "Services", href: "/services", icon: <Briefcase className="w-4 h-4" /> },
    { label: "À propos", href: "/about", icon: <Info className="w-4 h-4" /> },
    { label: "Contact", href: "/contact", icon: <Mail className="w-4 h-4" /> }
  ];

  // Navigation restaurant
  const restaurantNavigation = [
    { label: "Menu", href: "/menu", icon: <Utensils className="w-4 h-4" /> },
    { label: "Réservations", href: "/book", icon: <Calendar className="w-4 h-4" /> },
    { label: "À propos", href: "/about", icon: <Info className="w-4 h-4" /> },
    { label: "Contact", href: "/contact", icon: <MapPin className="w-4 h-4" /> }
  ];

  // Navigation voyage
  const travelNavigation = [
    { label: "Destinations", href: "/destinations", icon: <Globe className="w-4 h-4" /> },
    { label: "Hôtels", href: "/hotels", icon: <Building className="w-4 h-4" /> },
    { label: "Vols", href: "/flights", icon: <Plane className="w-4 h-4" /> },
    { label: "Packages", href: "/packages", icon: <Package className="w-4 h-4" /> }
  ];

  // Navigation médicale
  const medicalNavigation = [
    { label: "Services", href: "/services", icon: <Stethoscope className="w-4 h-4" /> },
    { label: "Médecins", href: "/doctors", icon: <Users className="w-4 h-4" /> },
    { label: "RDV", href: "/appointments", icon: <Calendar className="w-4 h-4" /> },
    { label: "Urgences", href: "/emergency", icon: <Phone className="w-4 h-4" /> }
  ];

  // Navigation éducation
  const educationNavigation = [
    { label: "Cours", href: "/courses", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Professeurs", href: "/teachers", icon: <Users className="w-4 h-4" /> },
    { label: "Bibliothèque", href: "/library", icon: <FileText className="w-4 h-4" /> },
    { label: "Support", href: "/support", icon: <HelpCircle className="w-4 h-4" /> }
  ];

  // Navigation gaming
  const gamingNavigation = [
    { label: "GAMES", href: "/games", icon: <Zap className="w-4 h-4" /> },
    { label: "ESPORTS", href: "/esports", icon: <Users className="w-4 h-4" /> },
    { label: "COMMUNITY", href: "/community", icon: <Globe className="w-4 h-4" /> },
    { label: "STORE", href: "/store", icon: <Package className="w-4 h-4" /> }
  ];

  // Utilisateur exemple
  const sampleUser = {
    name: "Marie Dubois",
    email: "marie@example.com",
    avatar: "/api/placeholder/40/40",
    role: "Admin"
  };

  const variants = [
    // Variants classiques
    {
      name: 'default',
      title: 'Default Navbar',
      description: 'Navbar standard avec toutes les fonctionnalités',
      component: (
        <Navbar
          variant="default"
          logo={{ text: "DefaultApp" }}
          navigation={defaultNavigation}
          showSearch={true}
          showNotifications={true}
          notificationCount={3}
          user={sampleUser}
          showCTA={true}
          ctaText="Commencer"
        />
      )
    },
    {
      name: 'minimal',
      title: 'Minimal Navbar',
      description: 'Design épuré et simplifié',
      component: (
        <Navbar
          variant="minimal"
          logo={{ text: "Minimal" }}
          navigation={defaultNavigation.slice(0, 4)}
          user={sampleUser}
        />
      )
    },
    {
      name: 'corporate',
      title: 'Corporate Navbar',
      description: 'Style professionnel entreprise',
      component: (
        <Navbar
          variant="corporate"
          logo={{ text: "CorpTech" }}
          navigation={defaultNavigation}
          user={sampleUser}
          showCTA={true}
          ctaText="Solutions"
        />
      )
    },
    {
      name: 'ecommerce',
      title: 'E-commerce Navbar',
      description: 'Optimisé pour boutiques en ligne',
      component: (
        <Navbar
          variant="ecommerce"
          logo={{ text: "ShopApp" }}
          navigation={defaultNavigation}
          showSearch={true}
          showCart={true}
          cartCount={5}
          showNotifications={true}
          notificationCount={2}
          user={sampleUser}
          showCTA={true}
          ctaText="Voir panier"
        />
      )
    },
    {
      name: 'glassmorphism',
      title: 'Glassmorphism Navbar',
      description: 'Effet verre avec transparence',
      component: (
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-32">
          <Navbar
            variant="glassmorphism"
            logo={{ text: "GlassApp" }}
            navigation={defaultNavigation.slice(0, 4)}
            user={sampleUser}
            transparent={true}
          />
        </div>
      )
    },
    {
      name: 'floating',
      title: 'Floating Navbar',
      description: 'Navbar flottante avec coins arrondis',
      component: (
        <div className="bg-gray-100 h-32">
          <Navbar
            variant="floating"
            logo={{ text: "FloatApp" }}
            navigation={defaultNavigation.slice(0, 4)}
            user={sampleUser}
          />
        </div>
      )
    },
    {
      name: 'gradient',
      title: 'Gradient Navbar',
      description: 'Fond dégradé coloré moderne',
      component: (
        <Navbar
          variant="gradient"
          logo={{ text: "GradientApp" }}
          navigation={defaultNavigation.slice(0, 5)}
          showSearch={true}
          user={sampleUser}
        />
      )
    },
    {
      name: 'dark',
      title: 'Dark Navbar',
      description: 'Mode sombre élégant',
      component: (
        <Navbar
          variant="dark"
          logo={{ text: "DarkApp" }}
          navigation={defaultNavigation}
          showSearch={true}
          showNotifications={true}
          notificationCount={7}
          user={sampleUser}
        />
      )
    },
    {
      name: 'neon',
      title: 'Neon Navbar',
      description: 'Style néon cyberpunk',
      component: (
        <Navbar
          variant="neon"
          logo={{ text: "NEON" }}
          navigation={defaultNavigation.slice(0, 4)}
          user={sampleUser}
        />
      )
    },
    {
      name: 'retro',
      title: 'Retro Navbar',
      description: 'Design vintage années 80',
      component: (
        <Navbar
          variant="retro"
          logo={{ text: "RETRO" }}
          navigation={defaultNavigation.slice(0, 4)}
          user={sampleUser}
        />
      )
    },
    {
      name: 'brutalist',
      title: 'Brutalist Navbar',
      description: 'Style brut et imposant',
      component: (
        <Navbar
          variant="brutalist"
          logo={{ text: "BRUTAL" }}
          navigation={defaultNavigation.slice(0, 4)}
          user={sampleUser}
        />
      )
    },
    {
      name: 'magazine',
      title: 'Magazine Navbar',
      description: 'Style magazine avec date',
      component: (
        <Navbar
          variant="magazine"
          logo={{ text: "MAGAZINE" }}
          navigation={defaultNavigation}
          showSearch={true}
          user={sampleUser}
          showCTA={true}
          ctaText="S'abonner"
        />
      )
    },
    {
      name: 'agency',
      title: 'Agency Navbar',
      description: 'Agences et studios créatifs',
      component: (
        <Navbar
          variant="agency"
          logo={{ text: "Creative Agency" }}
          navigation={defaultNavigation.slice(0, 5)}
          showCTA={true}
          ctaText="Demander un devis"
        />
      )
    },
    {
      name: 'saas',
      title: 'SaaS Navbar',
      description: 'Applications SaaS professionnelles',
      component: (
        <Navbar
          variant="saas"
          logo={{ text: "DataApp" }}
          navigation={[
            ...defaultNavigation.slice(0, 4),
            { label: "Tarifs", href: "/pricing", icon: <DollarSign className="w-4 h-4" /> }
          ]}
          showSearch={true}
          user={sampleUser}
          showCTA={true}
          ctaText="Essai gratuit"
        />
      )
    },
    {
      name: 'restaurant',
      title: 'Restaurant Navbar',
      description: 'Restaurants et gastronomie',
      component: (
        <Navbar
          variant="restaurant"
          logo={{ text: "Le Bistrot" }}
          navigation={restaurantNavigation}
          showCTA={true}
          ctaText="Réserver"
        />
      )
    },
    {
      name: 'travel',
      title: 'Travel Navbar',
      description: 'Agences de voyage',
      component: (
        <Navbar
          variant="travel"
          logo={{ text: "TravelCorp" }}
          navigation={travelNavigation}
          showSearch={true}
          user={sampleUser}
          showCTA={true}
          ctaText="Réserver"
        />
      )
    },
    {
      name: 'medical',
      title: 'Medical Navbar',
      description: 'Secteur médical et santé',
      component: (
        <Navbar
          variant="medical"
          logo={{ text: "MediCare" }}
          navigation={medicalNavigation}
          showCTA={true}
          ctaText="Prendre RDV"
        />
      )
    },
    {
      name: 'education',
      title: 'Education Navbar',
      description: 'Établissements éducatifs',
      component: (
        <Navbar
          variant="education"
          logo={{ text: "EduPlatform" }}
          navigation={educationNavigation}
          showSearch={true}
          user={sampleUser}
          showCTA={true}
          ctaText="S'inscrire"
        />
      )
    },
    {
      name: 'finance',
      title: 'Finance Navbar',
      description: 'Services financiers',
      component: (
        <Navbar
          variant="finance"
          logo={{ text: "FinanceCorpᵗᵐ" }}
          navigation={[
            { label: "Investissement", href: "/investment" },
            { label: "Banque", href: "/banking" },
            { label: "Assurance", href: "/insurance" },
            { label: "Conseil", href: "/consulting" }
          ]}
          user={sampleUser}
          showCTA={true}
          ctaText="Espace client"
        />
      )
    },
    {
      name: 'gaming',
      title: 'Gaming Navbar',
      description: 'Gaming et esports',
      component: (
        <Navbar
          variant="gaming"
          logo={{ text: "GAMEVERSE" }}
          navigation={gamingNavigation}
          user={{
            ...sampleUser,
            name: "Player1",
            role: "Level 42"
          }}
          showNotifications={true}
          notificationCount={12}
        />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de la page */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Navbar - 33 Variants
              </h1>
              <p className="text-gray-600 mt-1">
                Explorez tous les variants de navbar disponibles
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={activeVariant}
                onChange={(e) => setActiveVariant(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choisir un variant</option>
                {variants.map((variant) => (
                  <option key={variant.name} value={variant.name}>
                    {variant.title}
                  </option>
                ))}
              </select>
              <Button 
                variant="outline"
                onClick={() => setActiveVariant("")}
              >
                Voir tous
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Vue filtrée */}
        {activeVariant && (
          <div className="mb-8">
            {(() => {
              const variant = variants.find(v => v.name === activeVariant);
              if (!variant) return null;

              return (
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{variant.title}</span>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        variant="{variant.name}"
                      </code>
                    </CardTitle>
                    <p className="text-gray-600">{variant.description}</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="bg-white">
                      {variant.component}
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </div>
        )}

        {/* Vue grille */}
        {!activeVariant && (
          <div className="space-y-8">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">33</div>
                  <div className="text-sm text-gray-600">Variants Total</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600">Variants Classiques</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600">25</div>
                  <div className="text-sm text-gray-600">Nouveaux Variants</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">Responsive</div>
                </CardContent>
              </Card>
            </div>

            {/* Grille des variants */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {variants.map((variant) => (
                <Card key={variant.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{variant.title}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveVariant(variant.name)}
                      >
                        Voir seul
                      </Button>
                    </CardTitle>
                    <p className="text-sm text-gray-600">{variant.description}</p>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded w-fit">
                      variant="{variant.name}"
                    </code>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="bg-white border-t">
                      {variant.component}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Code exemple */}
        {activeVariant && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Code d'exemple</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`<Navbar
  variant="${activeVariant}"
  logo={{ text: "VotreApp" }}
  navigation={navigationItems}
  user={userData}
  // ... autres props selon le variant
/>`}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NavbarExamples;
