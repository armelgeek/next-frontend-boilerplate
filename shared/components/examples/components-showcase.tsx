"use client";

// Exemples d'utilisation des composants avec différents variants

import { HeroSection } from "@/shared/components/organisms/hero-section";
import { FeaturesSection } from "@/shared/components/organisms/features-section";
import { TestimonialsSection } from "@/shared/components/organisms/testimonials-section";
import { PricingSection } from "@/shared/components/organisms/pricing-section";
import { CTASection } from "@/shared/components/organisms/cta-section";
import { AboutSection } from "@/shared/components/organisms/about-section";
import { FAQ } from "@/shared/components/organisms/faq";
import { 
  Star, 
  Users, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle,
  Trophy,
  Target,
  Clock,
  Heart
} from "lucide-react";

// Données d'exemple
const mockFeatures = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Sécurité avancée",
    description: "Protection des données avec chiffrement de bout en bout et conformité RGPD.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Performance optimale",
    description: "Rapidité d'exécution et temps de réponse ultrarapides pour une expérience fluide.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaboration équipe",
    description: "Travaillez en équipe avec des outils de collaboration intégrés et en temps réel.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Excellence garantie",
    description: "Qualité premium avec support 24/7 et engagement de satisfaction client.",
    color: "bg-yellow-100 text-yellow-600"
  }
];

const mockTestimonials = [
  {
    id: "1",
    name: "Marie Dubois",
    role: "Directrice Marketing",
    company: "TechStart",
    avatar: "/api/placeholder/64/64",
    rating: 5,
    content: "Une solution exceptionnelle qui a transformé notre façon de travailler. L'équipe est très professionnelle et le support client remarquable.",
    featured: true,
    verified: true
  },
  {
    id: "2",
    name: "Jean Martin",
    role: "CEO",
    company: "Innovation Inc",
    rating: 5,
    content: "Depuis que nous utilisons cette plateforme, notre productivité a augmenté de 40%. Je recommande vivement !",
    verified: true
  },
  {
    id: "3",
    name: "Sophie Laurent",
    role: "Chef de projet",
    company: "Digital Solutions",
    rating: 4,
    content: "Interface intuitive et fonctionnalités puissantes. Exactement ce dont notre équipe avait besoin.",
    verified: false
  }
];

const mockPricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Parfait pour débuter",
    price: 29,
    period: "mois",
    features: [
      { name: "Jusqu'à 5 utilisateurs", included: true },
      { name: "10 GB de stockage", included: true },
      { name: "Support email", included: true },
      { name: "Intégrations de base", included: true },
      { name: "Analytics avancés", included: false },
      { name: "Support prioritaire", included: false }
    ],
    buttonText: "Commencer gratuitement"
  },
  {
    id: "pro",
    name: "Professional",
    description: "Pour les équipes en croissance",
    price: 79,
    period: "mois",
    popular: true,
    badge: "Populaire",
    features: [
      { name: "Jusqu'à 25 utilisateurs", included: true },
      { name: "100 GB de stockage", included: true },
      { name: "Support chat en direct", included: true },
      { name: "Toutes les intégrations", included: true },
      { name: "Analytics avancés", included: true, highlight: true },
      { name: "Support prioritaire", included: true, highlight: true }
    ],
    buttonText: "Essayer 14 jours gratuits"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Solutions sur mesure",
    price: 199,
    period: "mois",
    features: [
      { name: "Utilisateurs illimités", included: true },
      { name: "Stockage illimité", included: true },
      { name: "Support dédié 24/7", included: true },
      { name: "Intégrations personnalisées", included: true },
      { name: "Analytics complets", included: true },
      { name: "SLA garantie", included: true }
    ],
    buttonText: "Contactez-nous"
  }
];

const mockFAQs = [
  {
    id: "1",
    question: "Comment puis-je commencer ?",
    answer: "Il suffit de créer un compte et de suivre notre guide d'intégration. Notre équipe support est disponible pour vous accompagner.",
    category: "Démarrage",
    tags: ["guide", "onboarding"]
  },
  {
    id: "2",
    question: "Quelles sont les méthodes de paiement acceptées ?",
    answer: "Nous acceptons toutes les cartes de crédit principales, PayPal, et les virements bancaires pour les comptes entreprise.",
    category: "Facturation",
    tags: ["paiement", "carte", "paypal"]
  },
  {
    id: "3",
    question: "Puis-je annuler mon abonnement à tout moment ?",
    answer: "Oui, vous pouvez annuler votre abonnement à tout moment sans frais cachés. Votre accès reste actif jusqu'à la fin de la période payée.",
    category: "Facturation",
    tags: ["annulation", "abonnement"]
  }
];

export default function ComponentsShowcase() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Variant Gradient */}
      <HeroSection
        variant="gradient"
        title="Composants avec Multiple Variants"
        subtitle="Collection complète de sections réutilisables"
        description="Découvrez notre gamme de composants modulaires avec plusieurs variants pour créer des pages web modernes et attrayantes."
        backgroundPattern={true}
        actions={[
          {
            label: "Voir les exemples",
            icon: <ArrowRight className="w-4 h-4" />,
            onClick: () => console.log("Voir exemples")
          },
          {
            label: "Documentation",
            variant: "outline",
            onClick: () => console.log("Documentation")
          }
        ]}
        stats={[
          { value: "6+", label: "Composants", icon: <Trophy className="w-8 h-8" /> },
          { value: "30+", label: "Variants", icon: <Star className="w-8 h-8" /> },
          { value: "100%", label: "Responsive", icon: <Target className="w-8 h-8" /> },
          { value: "24/7", label: "Support", icon: <Clock className="w-8 h-8" /> }
        ]}
      />

      {/* Features Section - Variant Alternating */}
      <FeaturesSection
        variant="alternating"
        title="Fonctionnalités Principales"
        subtitle="Tout ce dont vous avez besoin pour créer des expériences exceptionnelles"
        features={mockFeatures}
        showCta={true}
        ctaText="Découvrir toutes les fonctionnalités"
        ctaAction={() => console.log("CTA Features")}
      />

      {/* About Section - Variant Split */}
      <AboutSection
        variant="split"
        title="À Propos de Notre Solution"
        subtitle="Innovation et Excellence depuis 2020"
        description="Nous développons des solutions technologiques innovantes qui transforment la façon dont les équipes collaborent et travaillent ensemble. Notre mission est de simplifier les processus complexes tout en offrant des performances exceptionnelles."
        features={[
          {
            icon: <CheckCircle className="w-5 h-5" />,
            title: "Fiabilité prouvée",
            description: "99.9% de disponibilité garantie"
          },
          {
            icon: <Shield className="w-5 h-5" />,
            title: "Sécurité maximale",
            description: "Conformité aux standards internationaux"
          },
          {
            icon: <Heart className="w-5 h-5" />,
            title: "Support exceptionnel",
            description: "Équipe dédiée et réactive"
          }
        ]}
        stats={[
          { value: "10K+", label: "Clients satisfaits", icon: <Users className="w-8 h-8" /> },
          { value: "99.9%", label: "Disponibilité", icon: <Shield className="w-8 h-8" /> },
          { value: "24/7", label: "Support", icon: <Clock className="w-8 h-8" /> },
          { value: "50+", label: "Pays", icon: <Trophy className="w-8 h-8" /> }
        ]}
        showCta={true}
        ctaText="Notre histoire"
        ctaAction={() => console.log("About CTA")}
      />

      {/* Testimonials Section - Variant Featured */}
      <TestimonialsSection
        variant="featured"
        title="Ce que Disent Nos Clients"
        subtitle="Plus de 10,000 clients nous font confiance dans le monde entier"
        testimonials={mockTestimonials}
        showRating={true}
        showCompany={true}
      />

      {/* Pricing Section - Variant Toggle */}
      <PricingSection
        variant="toggle"
        title="Choisissez Votre Plan"
        subtitle="Des tarifs transparents qui s'adaptent à vos besoins"
        plans={mockPricingPlans}
        showAnnual={true}
        annualDiscount={20}
        currencySymbol="€"
      />

      {/* FAQ Section - Variant Searchable */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Questions Fréquentes</h2>
            <p className="text-xl text-gray-600">Trouvez rapidement les réponses à vos questions</p>
          </div>
          <FAQ
            variant="searchable"
            faqs={mockFAQs}
            showCategories={true}
          />
        </div>
      </section>

      {/* CTA Section - Variant Newsletter */}
      <CTASection
        variant="newsletter"
        title="Restez Informé"
        subtitle="Newsletter hebdomadaire"
        description="Recevez les dernières actualités, conseils et mises à jour directement dans votre boîte mail."
        badge="Gratuit"
        showSocialProof={true}
        socialProofText="Rejoignez plus de 5,000 abonnés satisfaits"
        onEmailSubmit={(email) => console.log("Email:", email)}
      />

      {/* CTA Section Final - Variant Gradient */}
      <CTASection
        variant="gradient"
        title="Prêt à Commencer ?"
        description="Rejoignez des milliers d'entreprises qui font déjà confiance à notre plateforme pour transformer leur façon de travailler."
        badge="Offre limitée"
        backgroundPattern={true}
        actions={[
          {
            label: "Essai gratuit 14 jours",
            variant: "default",
            onClick: () => console.log("Free trial")
          },
          {
            label: "Demander une démo",
            variant: "outline",
            onClick: () => console.log("Demo")
          }
        ]}
        showSocialProof={true}
        socialProofText="Plus de 10,000 utilisateurs actifs"
      />
    </div>
  );
}
