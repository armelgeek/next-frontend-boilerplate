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
import { Footer } from '@/shared/components/organisms/footer';
import { cn } from '@/shared/lib/utils';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Search,
  Eye,
  Code,
  Palette,
  Layers,
  Filter,
  Grid,
  List
} from 'lucide-react';

// Configuration des variants avec métadonnées
const FOOTER_VARIANTS = [
  {
    id: 'default',
    name: 'Par défaut',
    description: 'Footer simple et polyvalent pour tout type de site',
    category: 'Général',
    tags: ['simple', 'polyvalent', 'basique'],
    useCases: ['Site vitrine', 'Blog personnel', 'Portfolio simple']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Design épuré avec navigation essentielle uniquement',
    category: 'Général',
    tags: ['épuré', 'minimaliste', 'simple'],
    useCases: ['Portfolio créatif', 'Site artistique', 'Landing page']
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Footer professionnel pour entreprises',
    category: 'Business',
    tags: ['professionnel', 'entreprise', 'formel'],
    useCases: ['Site d\'entreprise', 'Service B2B', 'Consultation']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Optimisé pour les boutiques en ligne',
    category: 'Commerce',
    tags: ['boutique', 'vente', 'commerce'],
    useCases: ['Boutique en ligne', 'Marketplace', 'Catalogue produits']
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'Parfait pour les blogs et sites de contenu',
    category: 'Contenu',
    tags: ['blog', 'articles', 'contenu'],
    useCases: ['Blog personnel', 'Magazine', 'Site d\'actualités']
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'Design moderne et dynamique pour startups',
    category: 'Tech',
    tags: ['moderne', 'dynamique', 'tech'],
    useCases: ['Startup tech', 'SaaS', 'Application web']
  },
  {
    id: 'agency',
    name: 'Agence',
    description: 'Pour agences créatives et studios',
    category: 'Créatif',
    tags: ['créatif', 'agence', 'portfolio'],
    useCases: ['Agence créative', 'Studio design', 'Freelance']
  },
  {
    id: 'saas',
    name: 'SaaS',
    description: 'Optimisé pour les plateformes SaaS',
    category: 'Tech',
    tags: ['saas', 'plateforme', 'logiciel'],
    useCases: ['Plateforme SaaS', 'Outil web', 'Dashboard']
  },
  {
    id: 'creative',
    name: 'Créatif',
    description: 'Design artistique avec effets visuels',
    category: 'Créatif',
    tags: ['artistique', 'créatif', 'original'],
    useCases: ['Portfolio artistique', 'Site créatif', 'Galerie']
  },
  {
    id: 'magazine',
    name: 'Magazine',
    description: 'Style magazine avec sections organisées',
    category: 'Contenu',
    tags: ['magazine', 'presse', 'actualités'],
    useCases: ['Magazine en ligne', 'Site d\'actualités', 'Presse']
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Élégant pour portfolios professionnels',
    category: 'Créatif',
    tags: ['portfolio', 'élégant', 'professionnel'],
    useCases: ['Portfolio pro', 'CV en ligne', 'Showcase']
  },
  {
    id: 'landing',
    name: 'Landing',
    description: 'Optimisé pour les landing pages',
    category: 'Marketing',
    tags: ['landing', 'conversion', 'marketing'],
    useCases: ['Landing page', 'Page de vente', 'Campagne']
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Style technologique moderne',
    category: 'Tech',
    tags: ['technologique', 'futuriste', 'innovation'],
    useCases: ['Startup tech', 'SaaS', 'Produit tech']
  },
  {
    id: 'nonprofit',
    name: 'Association',
    description: 'Pour organisations à but non lucratif',
    category: 'Social',
    tags: ['association', 'ong', 'solidarité'],
    useCases: ['ONG', 'Association', 'Cause sociale']
  },
  {
    id: 'education',
    name: 'Éducation',
    description: 'Pour institutions éducatives',
    category: 'Éducation',
    tags: ['éducation', 'école', 'formation'],
    useCases: ['École', 'Université', 'Formation en ligne']
  },
  {
    id: 'medical',
    name: 'Médical',
    description: 'Pour professionnels de santé',
    category: 'Santé',
    tags: ['médical', 'santé', 'professionnel'],
    useCases: ['Cabinet médical', 'Clinique', 'Site santé']
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Pour restaurants et établissements culinaires',
    category: 'Restauration',
    tags: ['restaurant', 'gastronomie', 'cuisine'],
    useCases: ['Restaurant', 'Café', 'Traiteur']
  },
  {
    id: 'travel',
    name: 'Voyage',
    description: 'Pour agences de voyage et tourisme',
    category: 'Voyage',
    tags: ['voyage', 'tourisme', 'destination'],
    useCases: ['Agence voyage', 'Guide touristique', 'Hôtel']
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Pour services financiers et bancaires',
    category: 'Finance',
    tags: ['finance', 'banque', 'investissement'],
    useCases: ['Banque', 'Assurance', 'Conseil financier']
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Pour l\'industrie du jeu vidéo',
    category: 'Divertissement',
    tags: ['gaming', 'jeux', 'esport'],
    useCases: ['Studio de jeux', 'Communauté gaming', 'Esport']
  },
  {
    id: 'music',
    name: 'Musique',
    description: 'Pour artistes et industrie musicale',
    category: 'Divertissement',
    tags: ['musique', 'artiste', 'audio'],
    useCases: ['Artiste musical', 'Label', 'Streaming']
  },
  {
    id: 'fitness',
    name: 'Fitness',
    description: 'Pour salles de sport et coaching',
    category: 'Sport',
    tags: ['fitness', 'sport', 'santé'],
    useCases: ['Salle de sport', 'Coach sportif', 'Fitness en ligne']
  },
  {
    id: 'luxury',
    name: 'Luxe',
    description: 'Design haut de gamme pour marques de luxe',
    category: 'Luxe',
    tags: ['luxe', 'premium', 'élégant'],
    useCases: ['Marque de luxe', 'Bijouterie', 'Mode haut de gamme']
  }
] as const;

// Données d'exemple pour les footers
const SAMPLE_DATA = {
  logo: {
    text: 'Brand Name',
    href: '/'
  },
  description: 'Une description engageante qui présente votre marque et vos valeurs. Nous nous efforçons d\'offrir la meilleure expérience possible à nos clients.',
  sections: [
    {
      title: 'Produits',
      links: [
        { label: 'Fonctionnalités', href: '/features' },
        { label: 'Tarifs', href: '/pricing' },
        { label: 'Intégrations', href: '/integrations' },
        { label: 'API', href: '/api' }
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos', href: '/about' },
        { label: 'Carrières', href: '/careers' },
        { label: 'Presse', href: '/press' },
        { label: 'Partenaires', href: '/partners' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Centre d\'aide', href: '/help' },
        { label: 'Contact', href: '/contact' },
        { label: 'Statut', href: '/status' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { label: 'Conditions', href: '/terms' },
        { label: 'Confidentialité', href: '/privacy' },
        { label: 'Cookies', href: '/cookies' },
        { label: 'Sécurité', href: '/security' }
      ]
    }
  ],
  socialLinks: [
    { name: 'Facebook', href: '#', icon: <Facebook className="w-5 h-5" /> },
    { name: 'Twitter', href: '#', icon: <Twitter className="w-5 h-5" /> },
    { name: 'Instagram', href: '#', icon: <Instagram className="w-5 h-5" /> },
    { name: 'LinkedIn', href: '#', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'GitHub', href: '#', icon: <Github className="w-5 h-5" /> }
  ],
  contactInfo: {
    address: '123 Rue de la Innovation, 75001 Paris, France',
    phone: '+33 1 23 45 67 89',
    email: 'contact@example.com',
    hours: 'Lun-Ven: 9h-18h'
  }
};

export default function FooterVariantsPage() {
  const [selectedVariant, setSelectedVariant] = useState<string>('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(true);
  const [showTrustBadges, setShowTrustBadges] = useState(true);

  // Filtrage des variants
  const filteredVariants = FOOTER_VARIANTS.filter(variant => {
    const matchesSearch = variant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         variant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         variant.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || variant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Catégories uniques
  const categories = ['all', ...Array.from(new Set(FOOTER_VARIANTS.map(v => v.category)))];

  const selectedVariantData = FOOTER_VARIANTS.find(v => v.id === selectedVariant);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Footer Variants
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos {FOOTER_VARIANTS.length} variants de footer adaptés à différents secteurs et styles de sites web.
            Chaque variant est optimisé pour son contexte d'utilisation.
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

          {/* Galerie des variants */}
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
                        placeholder="Rechercher un variant..."
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
                        <SelectItem value="all">Toutes les catégories</SelectItem>
                        {categories.slice(1).map(category => (
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
                      {filteredVariants.length} variant{filteredVariants.length > 1 ? 's' : ''} trouvé{filteredVariants.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grille des variants */}
            <div className={cn(
              "grid gap-6",
              viewMode === 'grid' 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            )}>
              {filteredVariants.map((variant) => (
                <Card 
                  key={variant.id} 
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-lg",
                    selectedVariant === variant.id && "ring-2 ring-blue-500"
                  )}
                  onClick={() => setSelectedVariant(variant.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{variant.name}</CardTitle>
                      <Badge variant="secondary">{variant.category}</Badge>
                    </div>
                    <CardDescription>{variant.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {variant.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Cas d'usage :</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {variant.useCases.map(useCase => (
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
                      {selectedVariantData && (
                        <>
                          <Badge className="mr-2">{selectedVariantData.category}</Badge>
                          {selectedVariantData.description}
                        </>
                      )}
                    </CardDescription>
                  </div>
                  <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Sélectionner un variant" />
                    </SelectTrigger>
                    <SelectContent>
                      {FOOTER_VARIANTS.map(variant => (
                        <SelectItem key={variant.id} value={variant.id}>
                          {variant.name} - {variant.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Options de configuration */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="theme"
                      checked={theme === 'dark'}
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                    <Label htmlFor="theme">Mode sombre</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="newsletter"
                      checked={showNewsletter}
                      onCheckedChange={setShowNewsletter}
                    />
                    <Label htmlFor="newsletter">Newsletter</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="backToTop"
                      checked={showBackToTop}
                      onCheckedChange={setShowBackToTop}
                    />
                    <Label htmlFor="backToTop">Retour en haut</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="trustBadges"
                      checked={showTrustBadges}
                      onCheckedChange={setShowTrustBadges}
                    />
                    <Label htmlFor="trustBadges">Badges confiance</Label>
                  </div>
                </div>

                {/* Aperçu du footer */}
                <div className="border rounded-lg overflow-hidden">
                  {/* Contenu fictif pour simuler une page */}
                  <div className={cn(
                    "h-64 flex items-center justify-center",
                    theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                  )}>
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold">Contenu de la page</h2>
                      <p className="text-muted-foreground">Le footer apparaît ci-dessous</p>
                    </div>
                  </div>
                  
                  {/* Footer variant */}
                  <Footer
                    variant={selectedVariant as any}
                    theme={theme}
                    {...SAMPLE_DATA}
                    showNewsletter={showNewsletter}
                    showBackToTop={showBackToTop}
                    showTrustBadges={showTrustBadges}
                    onNewsletterSubmit={(email) => {
                      console.log('Newsletter subscription:', email);
                    }}
                  />
                </div>
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
                  Copiez le code suivant pour utiliser le variant "{selectedVariantData?.name}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
{`import { Footer } from '@/shared/components/organisms/footer';

// Exemple d'utilisation du variant "${selectedVariant}"
<Footer
  variant="${selectedVariant}"
  theme="${theme}"
  logo={{
    text: 'Brand Name',
    href: '/'
  }}
  description="Une description engageante de votre marque..."
  sections={[
    {
      title: 'Produits',
      links: [
        { label: 'Fonctionnalités', href: '/features' },
        { label: 'Tarifs', href: '/pricing' },
        // ... autres liens
      ]
    },
    // ... autres sections
  ]}
  socialLinks={[
    { name: 'Facebook', href: '#', icon: <Facebook /> },
    { name: 'Twitter', href: '#', icon: <Twitter /> },
    // ... autres réseaux sociaux
  ]}
  contactInfo={{
    address: '123 Rue de la Innovation, 75001 Paris',
    phone: '+33 1 23 45 67 89',
    email: 'contact@example.com',
    hours: 'Lun-Ven: 9h-18h'
  }}
  showNewsletter={${showNewsletter}}
  showBackToTop={${showBackToTop}}
  showTrustBadges={${showTrustBadges}}
  onNewsletterSubmit={(email) => {
    // Logique d'abonnement newsletter
    console.log('Newsletter subscription:', email);
  }}
/>`}
                  </pre>
                </div>
                
                {selectedVariantData && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      À propos du variant "{selectedVariantData.name}"
                    </h4>
                    <p className="text-blue-800 text-sm mb-3">
                      {selectedVariantData.description}
                    </p>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-blue-900">Catégorie :</span>
                        <Badge className="ml-2">{selectedVariantData.category}</Badge>
                      </div>
                      <div>
                        <span className="font-medium text-blue-900">Cas d'usage recommandés :</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedVariantData.useCases.map(useCase => (
                            <Badge key={useCase} variant="outline" className="text-xs">
                              {useCase}
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
