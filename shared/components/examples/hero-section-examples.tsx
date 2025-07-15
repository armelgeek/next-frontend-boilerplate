"use client";

import React, { useState } from 'react';
import { HeroSection } from '@/shared/components/organisms/hero-section';
import { ArrowRight, Play, Download, Star, Users, Zap, Shield, BarChart, Globe, Heart, Camera, Briefcase, ShoppingCart, Smartphone, Building } from 'lucide-react';

/**
 * Exemples complets des 20 variants du HeroSection
 * Utilisez cette page pour tester et prévisualiser tous les variants disponibles
 */

const HeroSectionExamples = () => {
  const [activeVariant, setActiveVariant] = useState<string>('fullscreen');

  // Actions communes
  const primaryActions = [
    { label: "Commencer", variant: "default" as const, icon: <ArrowRight className="w-4 h-4" /> },
    { label: "En savoir plus", variant: "outline" as const }
  ];

  const downloadActions = [
    { label: "Télécharger", variant: "default" as const, icon: <Download className="w-4 h-4" /> },
    { label: "Voir la démo", variant: "outline" as const, icon: <Play className="w-4 h-4" /> }
  ];

  // Features communes
  const saasFeatures = [
    { title: "Analytics", description: "Données en temps réel", icon: <BarChart className="w-6 h-6" /> },
    { title: "Automation", description: "Workflows automatisés", icon: <Zap className="w-6 h-6" /> },
    { title: "Security", description: "Sécurité enterprise", icon: <Shield className="w-6 h-6" /> }
  ];

  const creativeFeatures = [
    { title: "Design", description: "Créations uniques", icon: <Camera className="w-6 h-6" /> },
    { title: "Innovation", description: "Solutions créatives", icon: <Star className="w-6 h-6" /> },
    { title: "Collaboration", description: "Travail d'équipe", icon: <Users className="w-6 h-6" /> }
  ];

  // Stats communes
  const stats = [
    { value: "10K+", label: "Utilisateurs actifs" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
    { value: "150+", label: "Pays" }
  ];

  // Produits exemple
  const products = [
    { name: "Produit Premium", price: "199€", image: "/api/placeholder/300/200" },
    { name: "Produit Standard", price: "99€", image: "/api/placeholder/300/200" },
    { name: "Produit Basic", price: "49€", image: "/api/placeholder/300/200" }
  ];

  // Slides exemple
  const slides = [
    { title: "Innovation", description: "Solutions d'avenir", image: "/api/placeholder/800/400" },
    { title: "Performance", description: "Résultats exceptionnels", image: "/api/placeholder/800/400" },
    { title: "Fiabilité", description: "Service de confiance", image: "/api/placeholder/800/400" }
  ];

  // Témoignage exemple
  const testimonial = {
    text: "Cette solution a transformé notre façon de travailler. Résultats exceptionnels !",
    author: "Marie Dubois",
    role: "CEO, TechCorp",
    avatar: "/api/placeholder/64/64"
  };

  const variants = [
    {
      name: 'fullscreen',
      title: 'Fullscreen Hero',
      component: (
        <HeroSection
          variant="fullscreen"
          title="Révolutionnez votre façon de travailler"
          description="Notre plateforme innovante transforme votre productivité et optimise vos résultats avec des outils de pointe."
          image="/api/placeholder/1920/1080"
          badge="Nouveau"
          actions={primaryActions}
        />
      )
    },
    {
      name: 'carousel',
      title: 'Carousel Hero',
      component: (
        <HeroSection
          variant="carousel"
          title="Découvrez nos solutions"
          description="Une gamme complète de services pour répondre à tous vos besoins"
          slides={slides}
          actions={primaryActions}
        />
      )
    },
    {
      name: 'parallax',
      title: 'Parallax Hero',
      component: (
        <HeroSection
          variant="parallax"
          title="Expérience immersive"
          description="Plongez dans un univers de possibilités infinies avec notre technologie de pointe"
          image="/api/placeholder/1920/1080"
          badge="Innovation"
          actions={primaryActions}
        />
      )
    },
    {
      name: 'animated',
      title: 'Animated Hero',
      component: (
        <HeroSection
          variant="animated"
          title="Animation fluide"
          description="Des transitions élégantes pour une expérience utilisateur exceptionnelle"
          image="/api/placeholder/800/600"
          actions={primaryActions}
          features={saasFeatures.slice(0, 3)}
        />
      )
    },
    {
      name: 'interactive',
      title: 'Interactive Hero',
      component: (
        <HeroSection
          variant="interactive"
          title="Interface interactive"
          description="Explorez nos fonctionnalités avec des éléments interactifs innovants"
          actions={primaryActions}
          features={saasFeatures}
        />
      )
    },
    {
      name: 'showcase',
      title: 'Showcase Hero',
      component: (
        <HeroSection
          variant="showcase"
          title="Showcase produit"
          description="Découvrez notre produit phare avec une présentation complète"
          image="/api/placeholder/600/400"
          badge="Produit vedette"
          actions={downloadActions}
          stats={stats.slice(0, 3)}
        />
      )
    },
    {
      name: 'landing',
      title: 'Landing Hero',
      component: (
        <HeroSection
          variant="landing"
          title="Page de destination optimisée"
          description="Convertissez plus de visiteurs avec notre page d'atterrissage performante"
          testimonial={testimonial}
          actions={primaryActions}
          features={saasFeatures.slice(0, 2)}
        />
      )
    },
    {
      name: 'saas',
      title: 'SaaS Hero',
      component: (
        <HeroSection
          variant="saas"
          title="Solution SaaS complète"
          description="Gérez, analysez et développez votre activité avec notre plateforme tout-en-un"
          badge="Version 2.0"
          features={saasFeatures}
          actions={[
            { label: "Essai gratuit", variant: "default" as const },
            { label: "Voir la démo", variant: "outline" as const }
          ]}
          stats={stats}
        />
      )
    },
    {
      name: 'startup',
      title: 'Startup Hero',
      component: (
        <HeroSection
          variant="startup"
          title="Startup innovante"
          description="Rejoignez la révolution technologique avec notre vision d'avenir"
          badge="Levée de fonds"
          announcement={{ text: "Série A de 10M€ bouclée !", urgent: true }}
          actions={primaryActions}
          features={creativeFeatures}
        />
      )
    },
    {
      name: 'creative',
      title: 'Creative Hero',
      component: (
        <HeroSection
          variant="creative"
          title="Agence créative"
          description="Nous donnons vie à vos idées avec créativité et expertise"
          image="/api/placeholder/600/400"
          backgroundPattern={true}
          actions={[
            { label: "Voir portfolio", variant: "default" as const },
            { label: "Contact", variant: "outline" as const }
          ]}
          features={creativeFeatures}
        />
      )
    },
    {
      name: 'portfolio',
      title: 'Portfolio Hero',
      component: (
        <HeroSection
          variant="portfolio"
          title="Portfolio professionnel"
          description="Développeur Full-Stack passionné par la création d'expériences digitales exceptionnelles"
          image="/api/placeholder/400/400"
          actions={[
            { label: "Voir projets", variant: "default" as const },
            { label: "Me contacter", variant: "outline" as const }
          ]}
          stats={[
            { value: "50+", label: "Projets" },
            { value: "5 ans", label: "Expérience" },
            { value: "10+", label: "Technologies" }
          ]}
        />
      )
    },
    {
      name: 'blog',
      title: 'Blog Hero',
      component: (
        <HeroSection
          variant="blog"
          title="Blog Tech & Innovation"
          description="Découvrez les dernières tendances technologiques et insights d'experts"
          searchable={true}
          actions={[
            { label: "Articles récents", variant: "default" as const },
            { label: "Newsletter", variant: "outline" as const, icon: <Heart className="w-4 h-4" /> }
          ]}
        />
      )
    },
    {
      name: 'ecommerce',
      title: 'E-commerce Hero',
      component: (
        <HeroSection
          variant="ecommerce"
          title="Collection Automne 2024"
          description="Découvrez nos nouveautés et tendances mode de la saison"
          badge="Nouvelle collection"
          products={products}
          actions={[
            { label: "Voir collection", variant: "default" as const, icon: <ShoppingCart className="w-4 h-4" /> },
            { label: "Catalogue", variant: "outline" as const }
          ]}
        />
      )
    },
    {
      name: 'app',
      title: 'App Hero',
      component: (
        <HeroSection
          variant="app"
          title="Application mobile révolutionnaire"
          description="Téléchargez dès maintenant l'app qui va changer votre quotidien"
          image="/api/placeholder/300/600"
          badge="App Store"
          actions={[
            { label: "Télécharger iOS", variant: "default" as const, icon: <Smartphone className="w-4 h-4" /> },
            { label: "Télécharger Android", variant: "outline" as const, icon: <Download className="w-4 h-4" /> }
          ]}
          stats={[
            { value: "1M+", label: "Téléchargements" },
            { value: "4.9", label: "Note moyenne" },
            { value: "50K+", label: "Avis positifs" }
          ]}
        />
      )
    },
    {
      name: 'corporate',
      title: 'Corporate Hero',
      component: (
        <HeroSection
          variant="corporate"
          title="Excellence & Innovation"
          description="Leader mondial dans notre secteur, nous accompagnons les entreprises vers le succès depuis plus de 20 ans"
          image="/api/placeholder/600/400"
          actions={[
            { label: "Nos services", variant: "default" as const, icon: <Briefcase className="w-4 h-4" /> },
            { label: "Nous contacter", variant: "outline" as const }
          ]}
          features={[
            { title: "Expertise", description: "20+ années d'expérience", icon: <Star className="w-6 h-6" /> },
            { title: "Global", description: "Présence internationale", icon: <Globe className="w-6 h-6" /> },
            { title: "Innovation", description: "R&D continue", icon: <Zap className="w-6 h-6" /> }
          ]}
        />
      )
    },
    {
      name: 'minimal',
      title: 'Minimal Hero',
      component: (
        <HeroSection
          variant="minimal"
          title="Simplicité & Élégance"
          description="Un design épuré pour une expérience utilisateur optimale et intuitive"
          badge="Minimaliste"
          actions={primaryActions}
        />
      )
    },
    {
      name: 'centered',
      title: 'Centered Hero',
      component: (
        <HeroSection
          variant="centered"
          title="Centré sur vos besoins"
          description="Une approche personnalisée pour des résultats qui dépassent vos attentes"
          badge="Personnalisé"
          actions={primaryActions}
          stats={stats}
        />
      )
    },
    {
      name: 'split',
      title: 'Split Hero',
      component: (
        <HeroSection
          variant="split"
          title="Design en deux colonnes"
          description="Un équilibre parfait entre contenu textuel et visuel pour un impact maximal"
          image="/api/placeholder/600/400"
          badge="Équilibré"
          actions={primaryActions}
        />
      )
    },
    {
      name: 'video',
      title: 'Video Hero',
      component: (
        <HeroSection
          variant="video"
          title="Expérience immersive"
          description="Découvrez notre univers à travers une vidéo captivante qui raconte notre histoire"
          video="/api/placeholder/video"
          badge="Vidéo"
          actions={[
            { label: "Découvrir", variant: "outline" as const, icon: <Play className="w-4 h-4" /> },
            { label: "Contact", variant: "outline" as const }
          ]}
        />
      )
    },
    {
      name: 'gradient',
      title: 'Gradient Hero',
      component: (
        <HeroSection
          variant="gradient"
          title="Dégradés modernes"
          description="Un design contemporain avec des dégradés élégants et des patterns sophistiqués"
          badge="Moderne"
          backgroundPattern={true}
          searchable={true}
          actions={primaryActions}
          features={saasFeatures.slice(0, 3)}
        />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation des variants */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              HeroSection - 20 Variants
            </h1>
            <select
              value={activeVariant}
              onChange={(e) => setActiveVariant(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {variants.map((variant) => (
                <option key={variant.name} value={variant.name}>
                  {variant.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grille des variants */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {variants.map((variant) => (
            <button
              key={variant.name}
              onClick={() => setActiveVariant(variant.name)}
              className={`p-4 text-left border rounded-lg transition-all ${
                activeVariant === variant.name
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                {variant.title}
              </h3>
              <p className="text-sm text-gray-600">
                Variant: <code className="bg-gray-100 px-1 rounded">{variant.name}</code>
              </p>
            </button>
          ))}
        </div>

        {/* Variant actuel */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">
              {variants.find(v => v.name === activeVariant)?.title}
            </h2>
            <p className="text-gray-600 mt-1">
              Variant: <code className="bg-white px-2 py-1 rounded border">{activeVariant}</code>
            </p>
          </div>
          
          <div className="overflow-hidden">
            {variants.find(v => v.name === activeVariant)?.component}
          </div>
        </div>

        {/* Code example */}
        <div className="mt-8 bg-gray-900 rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">
            Code pour ce variant
          </h3>
          <pre className="text-green-400 text-sm overflow-x-auto">
{`<HeroSection
  variant="${activeVariant}"
  title="Votre titre ici"
  description="Votre description ici"
  // ... autres props selon le variant
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionExamples;
