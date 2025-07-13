"use client";

import React from 'react';
import { SectionBuilderUtils, MultiSectionRenderer } from '@/shared/components/sections';

export default function SectionBuilderExamplePage() {
  // Générer différents types de pages avec les templates
  const landingPageSections = SectionBuilderUtils.generateLandingPage();
  const aboutPageSections = SectionBuilderUtils.generateAboutPage();
  const featuresPageSections = SectionBuilderUtils.generateFeaturesPage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Section Builder - Exemples
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez des exemples de pages générées automatiquement avec le Section Builder. 
              Chaque section utilise des thèmes et layouts différents pour créer des expériences uniques.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation vers les exemples */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a 
            href="#landing" 
            className="block p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Landing Page</h3>
            <p className="text-gray-600">Page d'accueil complète avec hero, features, testimonials, pricing, FAQ et CTA</p>
          </a>
          <a 
            href="#about" 
            className="block p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Page À Propos</h3>
            <p className="text-gray-600">Présentation d'équipe avec statistiques et newsletter</p>
          </a>
          <a 
            href="#features" 
            className="block p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Page Fonctionnalités</h3>
            <p className="text-gray-600">Showcase des fonctionnalités avec timeline et grille</p>
          </a>
        </div>
      </div>

      {/* Landing Page Example */}
      <section id="landing" className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Exemple : Landing Page Complète</h2>
            <p className="text-gray-600">
              Une page d'accueil avec tous les éléments essentiels
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <MultiSectionRenderer sections={landingPageSections} />
          </div>
        </div>
      </section>

      {/* About Page Example */}
      <section id="about" className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Exemple : Page À Propos</h2>
            <p className="text-gray-600">
              Présentation de l'équipe et des valeurs
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <MultiSectionRenderer sections={aboutPageSections} />
          </div>
        </div>
      </section>

      {/* Features Page Example */}
      <section id="features" className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Exemple : Page Fonctionnalités</h2>
            <p className="text-gray-600">
              Mise en avant des fonctionnalités produit
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <MultiSectionRenderer sections={featuresPageSections} />
          </div>
        </div>
      </section>

      {/* Guide d'utilisation */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment utiliser le Section Builder</h2>
            <p className="text-xl text-gray-300">
              Trois façons d'utiliser notre générateur de sections
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Templates Prêts</h3>
              <p className="text-gray-300">
                Utilisez nos templates prédéfinis pour créer rapidement des sections complètes
              </p>
              <div className="mt-4 p-4 bg-gray-800 rounded-lg text-left">
                <code className="text-sm text-green-400">
                  {`import { SectionTemplates } from '@/components/sections';
const heroSection = SectionTemplates.hero.gradient();`}
                </code>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Personnalisation</h3>
              <p className="text-gray-300">
                Modifiez les sections avec différents thèmes, layouts et contenus
              </p>
              <div className="mt-4 p-4 bg-gray-800 rounded-lg text-left">
                <code className="text-sm text-green-400">
                  {`const customSection = SectionBuilder.customizeSection(
  heroSection, 
  { theme: 'dark', layout: 'split' }
);`}
                </code>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Interface Visuelle</h3>
              <p className="text-gray-300">
                Utilisez notre interface graphique pour créer et prévisualiser vos sections
              </p>
              <div className="mt-4">
                <a 
                  href="/section-builder" 
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Ouvrir le Builder →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features du Section Builder */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fonctionnalités du Section Builder</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">9 Thèmes</h3>
              <p className="text-sm text-gray-600">Minimal, Modern, Gradient, Glass, Corporate, Creative, Nature, Dark, Colorful</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">📐</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">9 Layouts</h3>
              <p className="text-sm text-gray-600">Default, Centered, Split, Grid, Masonry, Carousel, Tabs, Accordion, Timeline</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Responsive</h3>
              <p className="text-sm text-gray-600">Configuration automatique pour mobile, tablet et desktop</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Types</h3>
              <p className="text-sm text-gray-600">Hero, Features, Testimonials, FAQ, Pricing, Team, Portfolio, Blog, Contact, Stats, Logos, CTA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
