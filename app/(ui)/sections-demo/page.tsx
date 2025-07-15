"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/atoms/ui/select';
import { Switch } from '@/shared/components/atoms/ui/switch';
import { Label } from '@/shared/components/atoms/ui/label';
import { Separator } from '@/shared/components/atoms/ui/separator';
import { cn } from '@/shared/lib/utils';

// Import des sections
import { HeroSection } from '@/shared/components/organisms/hero-section';
import { FeaturesSection } from '@/shared/components/organisms/features-section';
import { AboutSection } from '@/shared/components/organisms/about-section';
import { TeamSection } from '@/shared/components/organisms/team-section';
import { TestimonialsSection } from '@/shared/components/organisms/testimonials-section';
import { PricingSection } from '@/shared/components/organisms/pricing-section';
import { ContactSection } from '@/shared/components/organisms/contact-section';
import { CTASection } from '@/shared/components/organisms/cta-section';
import { BlogSection } from '@/shared/components/organisms/blog-section';
import { NewsSection } from '@/shared/components/organisms/news-section';
import { PortfolioSection } from '@/shared/components/organisms/portfolio-section';
import { PartnersSection } from '@/shared/components/organisms/partners-section';
import { StatsSection } from '@/shared/components/organisms/stats-section';
import { EventsSection } from '@/shared/components/organisms/events-section';
import { JobsSection } from '@/shared/components/organisms/jobs-section';
import { ReviewsSection } from '@/shared/components/organisms/reviews-section';
import { FAQSection } from '@/shared/components/organisms/faq-advanced-section';
import { NotificationSection } from '@/shared/components/organisms/notifications-section';
import { ProfilesSection } from '@/shared/components/organisms/profiles-section';
import { LearningSection } from '@/shared/components/organisms/learning-section';
import { FinanceSection } from '@/shared/components/organisms/finance-section';
import { MediaSection } from '@/shared/components/organisms/media-section';
import { ToolsSection } from '@/shared/components/organisms/tools-section';
import { KnowledgeBaseSection } from '@/shared/components/organisms/knowledge-base-section';
import { ComparisonsSection } from '@/shared/components/organisms/comparisons-section';

import { 
  Search,
  Eye,
  Code,
  Palette,
  Layers,
  Filter,
  Grid,
  List,
  Globe,
  Users,
  Star,
  Briefcase,
  Calendar,
  MessageSquare,
  BookOpen,
  TrendingUp,
  Zap,
  Heart,
  Target,
  Award,
  Settings,
  Database,
  Camera,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Building,
  Rocket,
  Shield,
  Clock,
  Download,
  Share2,
  HelpCircle
} from 'lucide-react';

// Configuration des sections avec métadonnées
const SECTIONS_CONFIG = [
  {
    id: 'hero',
    name: 'Hero Section',
    component: HeroSection,
    description: 'Section d\'accueil principale avec titre, sous-titre et CTA',
    category: 'Introduction',
    tags: ['accueil', 'bannière', 'cta'],
    icon: <Rocket className="w-5 h-5" />,
    useCases: ['Page d\'accueil', 'Landing page', 'Campagne marketing'],
    props: {
      title: "Bienvenue dans l'avenir",
      subtitle: "Découvrez notre plateforme révolutionnaire qui transforme votre façon de travailler",
      description: "Une solution complète pour optimiser vos processus et maximiser votre productivité.",
      primaryCta: { text: "Commencer", href: "/start" },
      secondaryCta: { text: "En savoir plus", href: "/learn" },
      backgroundImage: "/api/placeholder/1200/600",
      variant: "default"
    }
  },
  {
    id: 'features',
    name: 'Features Section',
    component: FeaturesSection,
    description: 'Présentation des fonctionnalités principales',
    category: 'Produit',
    tags: ['fonctionnalités', 'avantages', 'produit'],
    icon: <Zap className="w-5 h-5" />,
    useCases: ['Page produit', 'Site SaaS', 'Présentation service'],
    props: {
      title: "Fonctionnalités puissantes",
      subtitle: "Tout ce dont vous avez besoin pour réussir",
      features: [
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Sécurité avancée",
          description: "Protection complète de vos données avec chiffrement end-to-end"
        },
        {
          icon: <Zap className="w-6 h-6" />,
          title: "Performance optimale",
          description: "Vitesse de traitement ultra-rapide pour tous vos projets"
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "Collaboration simple",
          description: "Travaillez en équipe efficacement avec nos outils collaboratifs"
        }
      ],
      variant: "grid"
    }
  },
  {
    id: 'about',
    name: 'About Section',
    component: AboutSection,
    description: 'Section à propos de l\'entreprise ou du projet',
    category: 'Entreprise',
    tags: ['à propos', 'histoire', 'mission'],
    icon: <Building className="w-5 h-5" />,
    useCases: ['Page à propos', 'Site corporate', 'Présentation entreprise'],
    props: {
      title: "À propos de nous",
      description: "Nous sommes une équipe passionnée dédiée à créer des solutions innovantes qui transforment la façon dont les entreprises travaillent et grandissent.",
      image: "/api/placeholder/600/400",
      stats: [
        { value: "1000+", label: "Clients satisfaits" },
        { value: "5 ans", label: "D'expérience" },
        { value: "24/7", label: "Support client" }
      ],
      variant: "side-by-side"
    }
  },
  {
    id: 'team',
    name: 'Team Section',
    component: TeamSection,
    description: 'Présentation de l\'équipe',
    category: 'Entreprise',
    tags: ['équipe', 'membres', 'collaborateurs'],
    icon: <Users className="w-5 h-5" />,
    useCases: ['Page équipe', 'Site corporate', 'À propos'],
    props: {
      title: "Notre équipe",
      subtitle: "Rencontrez les experts derrière notre succès",
      members: [
        {
          name: "Sarah Johnson",
          role: "CEO & Fondatrice",
          image: "/api/placeholder/300/300",
          bio: "10+ années d'expérience dans la tech",
          social: [
            { platform: "linkedin", url: "#" },
            { platform: "twitter", url: "#" }
          ]
        },
        {
          name: "Mike Chen",
          role: "CTO",
          image: "/api/placeholder/300/300",
          bio: "Expert en architecture logicielle",
          social: [
            { platform: "linkedin", url: "#" },
            { platform: "github", url: "#" }
          ]
        },
        {
          name: "Lisa Martinez",
          role: "Head of Design",
          image: "/api/placeholder/300/300",
          bio: "Designer UX/UI passionnée",
          social: [
            { platform: "dribbble", url: "#" },
            { platform: "behance", url: "#" }
          ]
        }
      ],
      variant: "cards"
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials Section',
    component: TestimonialsSection,
    description: 'Témoignages clients et avis',
    category: 'Social Proof',
    tags: ['témoignages', 'avis', 'clients'],
    icon: <MessageSquare className="w-5 h-5" />,
    useCases: ['Page d\'accueil', 'Landing page', 'Preuve sociale'],
    props: {
      title: "Ce que disent nos clients",
      subtitle: "Découvrez pourquoi ils nous font confiance",
      testimonials: [
        {
          content: "Cette plateforme a complètement transformé notre façon de travailler. L'efficacité a augmenté de 300%.",
          author: "Jean Dupont",
          role: "CEO, TechCorp",
          avatar: "/api/placeholder/100/100",
          rating: 5
        },
        {
          content: "Interface intuitive, fonctionnalités puissantes. Exactement ce dont nous avions besoin.",
          author: "Marie Martin",
          role: "Manager, StartupInc",
          avatar: "/api/placeholder/100/100",
          rating: 5
        },
        {
          content: "Support client exceptionnel et produit de qualité. Nous recommandons vivement.",
          author: "Paul Bernard",
          role: "Directeur, BigCorp",
          avatar: "/api/placeholder/100/100",
          rating: 5
        }
      ],
      variant: "carousel"
    }
  },
  {
    id: 'pricing',
    name: 'Pricing Section',
    component: PricingSection,
    description: 'Grilles tarifaires et plans d\'abonnement',
    category: 'Commerce',
    tags: ['tarifs', 'prix', 'abonnement'],
    icon: <Target className="w-5 h-5" />,
    useCases: ['SaaS', 'Services', 'E-commerce'],
    props: {
      title: "Choisissez votre plan",
      subtitle: "Des tarifs transparents adaptés à vos besoins",
      plans: [
        {
          id: "starter",
          name: "Starter",
          price: 9,
          period: "/mois",
          description: "Parfait pour commencer",
          features: [
            { name: "5 projets", included: true },
            { name: "10 Go de stockage", included: true },
            { name: "Support email", included: true },
            { name: "Intégrations de base", included: true }
          ],
          buttonText: "Commencer",
          popular: false
        },
        {
          id: "professional",
          name: "Professional",
          price: 29,
          period: "/mois",
          description: "Pour les équipes en croissance",
          features: [
            { name: "Projets illimités", included: true },
            { name: "100 Go de stockage", included: true },
            { name: "Support prioritaire", included: true },
            { name: "Toutes les intégrations", included: true },
            { name: "Analytics avancées", included: true }
          ],
          buttonText: "Choisir Pro",
          popular: true
        },
        {
          id: "enterprise",
          name: "Enterprise",
          price: 99999, // Prix spécial pour "Sur devis"
          period: "",
          description: "Solutions sur mesure",
          features: [
            { name: "Tout de Pro", included: true },
            { name: "Stockage illimité", included: true },
            { name: "Support dédié", included: true },
            { name: "SLA garanti", included: true },
            { name: "Onboarding personnalisé", included: true }
          ],
          buttonText: "Nous contacter",
          popular: false
        }
      ],
      variant: "cards"
    }
  },
  {
    id: 'contact',
    name: 'Contact Section',
    component: ContactSection,
    description: 'Formulaire de contact et informations',
    category: 'Communication',
    tags: ['contact', 'formulaire', 'coordonnées'],
    icon: <Mail className="w-5 h-5" />,
    useCases: ['Page contact', 'Support', 'Lead generation'],
    props: {
      title: "Contactez-nous",
      subtitle: "Nous sommes là pour vous aider",
      description: "Une question ? Un projet ? N'hésitez pas à nous contacter.",
      contactInfo: {
        email: "contact@example.com",
        phone: "+33 1 23 45 67 89",
        address: "123 Rue de l'Innovation, 75001 Paris"
      },
      showForm: true,
      variant: "split"
    }
  },
  {
    id: 'cta',
    name: 'CTA Section',
    component: CTASection,
    description: 'Section d\'appel à l\'action',
    category: 'Conversion',
    tags: ['cta', 'conversion', 'action'],
    icon: <Target className="w-5 h-5" />,
    useCases: ['Fin de page', 'Newsletter', 'Conversion'],
    props: {
      title: "Prêt à commencer ?",
      description: "Rejoignez des milliers d'utilisateurs qui font déjà confiance à notre plateforme.",
      primaryCta: { text: "Démarrer gratuitement", href: "/signup" },
      secondaryCta: { text: "Planifier une démo", href: "/demo" },
      variant: "centered",
      background: "gradient"
    }
  },
  {
    id: 'blog',
    name: 'Blog Section',
    component: BlogSection,
    description: 'Articles de blog et actualités',
    category: 'Contenu',
    tags: ['blog', 'articles', 'actualités'],
    icon: <BookOpen className="w-5 h-5" />,
    useCases: ['Blog', 'Actualités', 'Content marketing'],
    props: {
      title: "Derniers articles",
      subtitle: "Restez informé des dernières tendances",
      articles: [
        {
          title: "Guide complet de l'automatisation",
          excerpt: "Découvrez comment automatiser vos processus métier pour gagner en efficacité.",
          author: "Sarah Johnson",
          date: "2024-01-15",
          readTime: "5 min",
          image: "/api/placeholder/400/250",
          category: "Guide",
          href: "/blog/automatisation-guide"
        },
        {
          title: "Les tendances tech de 2024",
          excerpt: "Analyse des technologies émergentes qui vont façonner l'avenir.",
          author: "Mike Chen",
          date: "2024-01-10",
          readTime: "8 min",
          image: "/api/placeholder/400/250",
          category: "Tendances",
          href: "/blog/tendances-2024"
        },
        {
          title: "Optimiser son workflow",
          excerpt: "Conseils pratiques pour améliorer votre productivité au quotidien.",
          author: "Lisa Martinez",
          date: "2024-01-05",
          readTime: "6 min",
          image: "/api/placeholder/400/250",
          category: "Productivité",
          href: "/blog/optimiser-workflow"
        }
      ],
      variant: "grid",
      showAll: true
    }
  },
  {
    id: 'portfolio',
    name: 'Portfolio Section',
    component: PortfolioSection,
    description: 'Galerie de projets et réalisations',
    category: 'Showcase',
    tags: ['portfolio', 'projets', 'réalisations'],
    icon: <Camera className="w-5 h-5" />,
    useCases: ['Portfolio', 'Agence', 'Galerie'],
    props: {
      title: "Nos réalisations",
      subtitle: "Découvrez quelques-uns de nos projets les plus réussis",
      projects: [
        {
          title: "E-commerce Platform",
          category: "E-commerce",
          image: "/api/placeholder/600/400",
          description: "Plateforme e-commerce complète avec paiement intégré",
          tags: ["React", "Node.js", "Stripe"],
          href: "/portfolio/ecommerce"
        },
        {
          title: "Mobile Banking App",
          category: "Fintech",
          image: "/api/placeholder/600/400",
          description: "Application bancaire mobile sécurisée",
          tags: ["React Native", "Blockchain", "Biometrics"],
          href: "/portfolio/banking"
        },
        {
          title: "Learning Management System",
          category: "EdTech",
          image: "/api/placeholder/600/400",
          description: "Plateforme d'apprentissage en ligne",
          tags: ["Vue.js", "Python", "AI"],
          href: "/portfolio/lms"
        }
      ],
      variant: "masonry"
    }
  },
  {
    id: 'stats',
    name: 'Stats Section',
    component: StatsSection,
    description: 'Statistiques et chiffres clés',
    category: 'Données',
    tags: ['statistiques', 'chiffres', 'données'],
    icon: <TrendingUp className="w-5 h-5" />,
    useCases: ['Preuves sociales', 'KPI', 'Croissance'],
    props: {
      title: "Nos chiffres parlent",
      subtitle: "Des résultats concrets qui témoignent de notre expertise",
      stats: [
        {
          value: "10,000+",
          label: "Utilisateurs actifs",
          description: "Font confiance à notre plateforme",
          icon: <Users className="w-6 h-6" />
        },
        {
          value: "99.9%",
          label: "Uptime",
          description: "Disponibilité garantie",
          icon: <Shield className="w-6 h-6" />
        },
        {
          value: "24/7",
          label: "Support",
          description: "Assistance continue",
          icon: <Headphones className="w-6 h-6" />
        },
        {
          value: "150+",
          label: "Pays",
          description: "Présence mondiale",
          icon: <Globe className="w-6 h-6" />
        }
      ],
      variant: "highlighted"
    }
  },
  {
    id: 'partners',
    name: 'Partners Section',
    component: PartnersSection,
    description: 'Logos et partenaires de l\'entreprise',
    category: 'Showcase',
    tags: ['partenaires', 'logos', 'confiance'],
    icon: <Building className="w-5 h-5" />,
    useCases: ['Page d\'accueil', 'Partenariats', 'Confiance'],
    props: {
      title: "Ils nous font confiance",
      subtitle: "Nos partenaires de référence",
      partners: [
        {
          name: "TechCorp",
          logo: "/api/placeholder/200/100",
          href: "https://techcorp.com"
        },
        {
          name: "StartupInc",
          logo: "/api/placeholder/200/100",
          href: "https://startupinc.com"
        },
        {
          name: "BigCompany",
          logo: "/api/placeholder/200/100",
          href: "https://bigcompany.com"
        },
        {
          name: "Innovation Labs",
          logo: "/api/placeholder/200/100",
          href: "https://innovationlabs.com"
        }
      ],
      variant: "grid"
    }
  },
  {
    id: 'events',
    name: 'Events Section',
    component: EventsSection,
    description: 'Événements et actualités à venir',
    category: 'Contenu',
    tags: ['événements', 'actualités', 'agenda'],
    icon: <Calendar className="w-5 h-5" />,
    useCases: ['Site événementiel', 'Agenda', 'Actualités'],
    props: {
      title: "Événements à venir",
      subtitle: "Ne manquez aucun de nos événements",
      events: [
        {
          title: "Conférence Tech 2024",
          description: "La plus grande conférence technologique de l'année",
          date: "2024-03-15",
          time: "09:00",
          location: "Paris, France",
          image: "/api/placeholder/400/250",
          category: "Conférence",
          price: "99€",
          href: "/events/tech-conference-2024"
        },
        {
          title: "Workshop IA & Machine Learning",
          description: "Atelier pratique sur l'intelligence artificielle",
          date: "2024-03-22",
          time: "14:00",
          location: "Lyon, France",
          image: "/api/placeholder/400/250",
          category: "Workshop",
          price: "149€",
          href: "/events/ai-workshop"
        },
        {
          title: "Meetup Développeurs",
          description: "Rencontre mensuelle de la communauté",
          date: "2024-03-30",
          time: "18:30",
          location: "Marseille, France",
          image: "/api/placeholder/400/250",
          category: "Meetup",
          price: "Gratuit",
          href: "/events/dev-meetup"
        }
      ],
      variant: "cards"
    }
  },
  {
    id: 'news',
    name: 'News Section',
    component: NewsSection,
    description: 'Actualités et communiqués de presse',
    category: 'Contenu',
    tags: ['actualités', 'presse', 'news'],
    icon: <BookOpen className="w-5 h-5" />,
    useCases: ['Actualités', 'Presse', 'Médias'],
    props: {
      title: "Actualités",
      subtitle: "Toutes les dernières nouvelles",
      news: [
        {
          title: "Levée de fonds série A",
          excerpt: "Nous avons levé 10M€ pour accélérer notre croissance internationale.",
          date: "2024-01-20",
          category: "Finance",
          image: "/api/placeholder/400/250",
          href: "/news/serie-a-funding"
        },
        {
          title: "Nouveau partenariat stratégique",
          excerpt: "Alliance avec un leader du marché pour étendre notre offre.",
          date: "2024-01-18",
          category: "Partenariat",
          image: "/api/placeholder/400/250",
          href: "/news/strategic-partnership"
        },
        {
          title: "Prix de l'innovation 2024",
          excerpt: "Notre solution a été récompensée au concours national d'innovation.",
          date: "2024-01-15",
          category: "Récompense",
          image: "/api/placeholder/400/250",
          href: "/news/innovation-award"
        }
      ],
      variant: "timeline"
    }
  },
  {
    id: 'jobs',
    name: 'Jobs Section',
    component: JobsSection,
    description: 'Offres d\'emploi et carrières',
    category: 'RH',
    tags: ['emploi', 'carrières', 'recrutement'],
    icon: <Briefcase className="w-5 h-5" />,
    useCases: ['Page carrières', 'Recrutement', 'RH'],
    props: {
      title: "Rejoignez notre équipe",
      subtitle: "Découvrez nos offres d'emploi",
      jobs: [
        {
          title: "Développeur Full Stack Senior",
          department: "Engineering",
          location: "Paris, France",
          type: "CDI",
          remote: true,
          description: "Nous recherchons un développeur expérimenté pour rejoindre notre équipe technique.",
          requirements: ["5+ ans d'expérience", "React/Node.js", "TypeScript"],
          href: "/jobs/senior-fullstack-developer"
        },
        {
          title: "Product Manager",
          department: "Product",
          location: "Lyon, France",
          type: "CDI",
          remote: false,
          description: "Définissez la vision produit et pilotez le développement de nouvelles fonctionnalités.",
          requirements: ["3+ ans en Product Management", "Expérience SaaS", "Analytics"],
          href: "/jobs/product-manager"
        },
        {
          title: "UX/UI Designer",
          department: "Design",
          location: "Remote",
          type: "Freelance",
          remote: true,
          description: "Créez des expériences utilisateur exceptionnelles pour nos produits.",
          requirements: ["Portfolio solide", "Figma/Sketch", "Design System"],
          href: "/jobs/ux-ui-designer"
        }
      ],
      variant: "cards"
    }
  },
  {
    id: 'reviews',
    name: 'Reviews Section',
    component: ReviewsSection,
    description: 'Avis clients et évaluations',
    category: 'Social Proof',
    tags: ['avis', 'évaluations', 'satisfaction'],
    icon: <Star className="w-5 h-5" />,
    useCases: ['E-commerce', 'Services', 'Satisfaction client'],
    props: {
      title: "Avis clients",
      subtitle: "4.8/5 basé sur 1,245 avis",
      reviews: [
        {
          author: "Alice Dubois",
          role: "Directrice Marketing",
          company: "TechStart",
          rating: 5,
          content: "Excellent service client et produit très intuitif. Nous avons gagné énormément de temps.",
          avatar: "/api/placeholder/100/100",
          date: "2024-01-10"
        },
        {
          author: "Marc Lefebvre",
          role: "CEO",
          company: "InnovateCorp",
          rating: 5,
          content: "La meilleure solution du marché. ROI visible dès le premier mois d'utilisation.",
          avatar: "/api/placeholder/100/100",
          date: "2024-01-08"
        },
        {
          author: "Sophie Martin",
          role: "Chef de projet",
          company: "DigitalAgency",
          rating: 4,
          content: "Très satisfaite de la plateforme. Quelques améliorations possibles mais globalement excellent.",
          avatar: "/api/placeholder/100/100",
          date: "2024-01-05"
        }
      ],
      variant: "masonry"
    }
  },
  {
    id: 'faq',
    name: 'FAQ Section',
    component: FAQSection,
    description: 'Questions fréquemment posées',
    category: 'Support',
    tags: ['faq', 'aide', 'questions'],
    icon: <HelpCircle className="w-5 h-5" />,
    useCases: ['Support', 'Documentation', 'Self-service'],
    props: {
      title: "Questions fréquentes",
      subtitle: "Trouvez rapidement les réponses à vos questions",
      faqs: [
        {
          question: "Comment commencer avec votre plateforme ?",
          answer: "Il suffit de créer un compte gratuit et de suivre notre guide d'onboarding. Vous serez opérationnel en moins de 5 minutes."
        },
        {
          question: "Proposez-vous un support technique ?",
          answer: "Oui, nous offrons un support 24/7 par chat, email et téléphone pour tous nos clients payants."
        },
        {
          question: "Puis-je changer de plan à tout moment ?",
          answer: "Absolument ! Vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre tableau de bord."
        },
        {
          question: "Vos données sont-elles sécurisées ?",
          answer: "La sécurité est notre priorité. Nous utilisons un chiffrement AES-256 et sommes conformes aux normes SOC 2 et GDPR."
        }
      ],
      variant: "accordion"
    }
  }
  // ... Ajout d'autres sections ci-dessous
] as const;

// Catégories disponibles
const CATEGORIES = [
  'Tous',
  'Introduction',
  'Produit', 
  'Entreprise',
  'Social Proof',
  'Commerce',
  'Communication',
  'Conversion',
  'Contenu',
  'Showcase',
  'Données',
  'RH',
  'Support'
] as const;

export default function SectionsDemo() {
  const [selectedSection, setSelectedSection] = useState<string>('hero');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showPreview, setShowPreview] = useState(true);

  // Filtrage des sections
  const filteredSections = SECTIONS_CONFIG.filter(section => {
    const matchesSearch = section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tous' || section.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedSectionData = SECTIONS_CONFIG.find(s => s.id === selectedSection);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sections Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorez notre collection complète de {SECTIONS_CONFIG.length} sections prêtes à l'emploi.
            Chaque section est conçue pour s'adapter parfaitement à votre projet.
          </p>
        </div>

        <Tabs defaultValue="gallery" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Grid className="w-4 h-4" />
              Galerie
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Aperçu
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Code
            </TabsTrigger>
          </TabsList>

          {/* Galerie des sections */}
          <TabsContent value="gallery" className="space-y-6">
            {/* Filtres et contrôles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtres et Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Recherche</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher une section..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les catégories" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Affichage</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Résultats</Label>
                    <div className="text-sm text-gray-600 py-2">
                      {filteredSections.length} section{filteredSections.length > 1 ? 's' : ''} trouvée{filteredSections.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grille des sections */}
            <div className={cn(
              "grid gap-6",
              viewMode === 'grid' 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            )}>
              {filteredSections.map((section) => (
                <Card 
                  key={section.id} 
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-lg",
                    selectedSection === section.id && "ring-2 ring-blue-500"
                  )}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {section.icon}
                        {section.name}
                      </CardTitle>
                      <Badge variant="secondary">{section.category}</Badge>
                    </div>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {section.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Cas d'usage :</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {section.useCases.map(useCase => (
                            <li key={useCase} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-gray-400 rounded-full" />
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Aperçu interactif */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Aperçu Interactif
                    </CardTitle>
                    <CardDescription>
                      {selectedSectionData && (
                        <>
                          <Badge className="mr-2">{selectedSectionData.category}</Badge>
                          {selectedSectionData.description}
                        </>
                      )}
                    </CardDescription>
                  </div>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Sélectionner une section" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTIONS_CONFIG.map(section => (
                        <SelectItem key={section.id} value={section.id}>
                          {section.name} - {section.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Options de configuration */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="preview"
                      checked={showPreview}
                      onCheckedChange={setShowPreview}
                    />
                    <Label htmlFor="preview">Affichage de l'aperçu</Label>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Section sélectionnée : <span className="font-medium">{selectedSectionData?.name}</span>
                  </div>
                </div>

                {/* Aperçu de la section */}
                {showPreview && selectedSectionData && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-white">
                      <selectedSectionData.component {...selectedSectionData.props as any} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code d'utilisation */}
          <TabsContent value="code" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Code d'implémentation
                </CardTitle>
                <CardDescription>
                  Copiez le code suivant pour utiliser la section "{selectedSectionData?.name}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
{selectedSectionData && `import { ${selectedSectionData.component.name} } from '@/shared/components/organisms/${selectedSection}-section';

// Exemple d'utilisation de la section "${selectedSectionData.name}"
<${selectedSectionData.component.name}
${Object.entries(selectedSectionData.props).map(([key, value]) => {
  if (typeof value === 'string') {
    return `  ${key}="${value}"`;
  } else if (typeof value === 'boolean') {
    return `  ${key}={${value}}`;
  } else if (Array.isArray(value) || typeof value === 'object') {
    return `  ${key}={${JSON.stringify(value, null, 2).split('\n').join('\n  ')}}`;
  }
  return `  ${key}={${JSON.stringify(value)}}`;
}).join('\n')}
/>`}
                  </pre>
                </div>
                
                {selectedSectionData && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      À propos de la section "{selectedSectionData.name}"
                    </h4>
                    <p className="text-blue-800 text-sm mb-3">
                      {selectedSectionData.description}
                    </p>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-blue-900">Catégorie :</span>
                        <Badge className="ml-2">{selectedSectionData.category}</Badge>
                      </div>
                      <div>
                        <span className="font-medium text-blue-900">Cas d'usage recommandés :</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedSectionData.useCases.map(useCase => (
                            <Badge key={useCase} variant="outline" className="text-xs">
                              {useCase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-blue-900">Tags :</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedSectionData.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
