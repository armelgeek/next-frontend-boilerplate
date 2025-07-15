"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { 
  EntityCard, 
  EntityList, 
  EntitySearch, 
  EntityPagination 
} from '@/shared/components/molecules/entity-components';
import { 
  EntityForm, 
  EntityFilters, 
  SortableHeader 
} from '@/shared/components/molecules/entity-form-components';
import { ThemeSelector } from '@/shared/components/theme/theme-selector';
import { useTheme } from '@/shared/providers/theme-provider';
import { useInlineThemeStyles } from '@/shared/hooks/use-theme-utils';

// Données de démonstration
const mockProducts = [
  {
    id: 1,
    title: "Smartphone Galaxy Ultra",
    description: "Smartphone haut de gamme avec caméra professionnelle et écran AMOLED 6.8 pouces",
    status: "active" as const,
    category: "Électronique",
    price: 1299.99,
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Ordinateur Portable Pro",
    description: "Laptop professionnel avec processeur Intel i7 et 16Go de RAM pour les développeurs",
    status: "active" as const,
    category: "Informatique",
    price: 1899.00,
    date: "2024-01-20",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Casque Audio Bluetooth",
    description: "Casque sans fil avec réduction de bruit active et autonomie 30h",
    status: "pending" as const,
    category: "Audio",
    price: 299.99,
    date: "2024-01-25",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Tablette Design",
    description: "Tablette 12 pouces pour créatifs avec stylet inclus",
    status: "draft" as const,
    category: "Tablettes",
    price: 799.99,
    date: "2024-02-01",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Montre Connectée Sport",
    description: "Montre intelligente étanche avec GPS et suivi santé",
    status: "inactive" as const,
    category: "Wearable",
    price: 349.99,
    date: "2024-02-05",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Écouteurs True Wireless",
    description: "Écouteurs sans fil avec étui de charge et son haute fidélité",
    status: "active" as const,
    category: "Audio",
    price: 199.99,
    date: "2024-02-10",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
  }
];

const mockUsers = [
  {
    id: 1,
    title: "Alice Martin",
    description: "Développeuse Full-Stack spécialisée en React et Node.js",
    status: "active" as const,
    category: "Développement",
    date: "2024-01-10",
  },
  {
    id: 2,
    title: "Bob Dupont",
    description: "Designer UX/UI avec 5 ans d'expérience en design thinking",
    status: "active" as const,
    category: "Design",
    date: "2024-01-15",
  },
  {
    id: 3,
    title: "Claire Rousseau",
    description: "Chef de projet Agile certifiée Scrum Master",
    status: "pending" as const,
    category: "Management",
    date: "2024-01-20",
  }
];

const formFields = [
  {
    name: 'title',
    label: 'Titre',
    type: 'text' as const,
    required: true,
    placeholder: 'Nom du produit',
    validation: { min: 3, max: 100 }
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea' as const,
    required: true,
    placeholder: 'Description détaillée du produit',
    validation: { min: 10, max: 500 }
  },
  {
    name: 'category',
    label: 'Catégorie',
    type: 'select' as const,
    required: true,
    options: [
      { value: 'electronics', label: 'Électronique' },
      { value: 'computer', label: 'Informatique' },
      { value: 'audio', label: 'Audio' },
      { value: 'tablet', label: 'Tablettes' },
      { value: 'wearable', label: 'Objets connectés' }
    ]
  },
  {
    name: 'price',
    label: 'Prix (€)',
    type: 'number' as const,
    required: true,
    placeholder: '0.00',
    validation: { min: 0 }
  },
  {
    name: 'status',
    label: 'Statut',
    type: 'select' as const,
    required: true,
    options: [
      { value: 'active', label: 'Actif' },
      { value: 'inactive', label: 'Inactif' },
      { value: 'pending', label: 'En attente' },
      { value: 'draft', label: 'Brouillon' }
    ]
  },
  {
    name: 'featured',
    label: 'Produit mis en avant',
    type: 'switch' as const,
    placeholder: 'Afficher en première page'
  },
  {
    name: 'newsletter',
    label: 'Inclure dans la newsletter',
    type: 'checkbox' as const,
    placeholder: 'Envoyer dans la prochaine newsletter'
  }
];

const filterOptions = [
  {
    key: 'search',
    label: 'Recherche',
    type: 'text' as const,
    placeholder: 'Rechercher un produit...'
  },
  {
    key: 'category',
    label: 'Catégorie',
    type: 'select' as const,
    options: [
      { value: 'Électronique', label: 'Électronique' },
      { value: 'Informatique', label: 'Informatique' },
      { value: 'Audio', label: 'Audio' },
      { value: 'Tablettes', label: 'Tablettes' },
      { value: 'Wearable', label: 'Objets connectés' }
    ]
  },
  {
    key: 'status',
    label: 'Statut',
    type: 'select' as const,
    options: [
      { value: 'active', label: 'Actif' },
      { value: 'inactive', label: 'Inactif' },
      { value: 'pending', label: 'En attente' },
      { value: 'draft', label: 'Brouillon' }
    ]
  },
  {
    key: 'minPrice',
    label: 'Prix minimum',
    type: 'number' as const,
    placeholder: 'Prix min'
  },
  {
    key: 'maxPrice',
    label: 'Prix maximum',
    type: 'number' as const,
    placeholder: 'Prix max'
  }
];

export default function EntityDemoPage() {
  const { currentTheme } = useTheme();
  const { getCardStyle, getButtonStyle } = useInlineThemeStyles();

  // États pour la démonstration
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'title',
    direction: 'asc'
  });
  const [cardVariant, setCardVariant] = useState<'default' | 'compact' | 'detailed' | 'minimal'>('default');
  const [listVariant, setListVariant] = useState<'grid' | 'list' | 'table'>('grid');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filtrage et tri des données
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = !searchTerm || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesStatus = !filters.status || product.status === filters.status;
      const matchesMinPrice = !filters.minPrice || product.price >= Number(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || product.price <= Number(filters.maxPrice);

      return matchesSearch && matchesCategory && matchesStatus && matchesMinPrice && matchesMaxPrice;
    });

    // Tri
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (sortConfig.direction === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [searchTerm, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleFilterReset = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleFormSubmit = (values: Record<string, any>) => {
    setLoading(true);
    console.log('Form submitted:', values);
    
    // Simuler un délai d'API
    setTimeout(() => {
      setLoading(false);
      setShowForm(false);
      alert('Produit créé avec succès !');
    }, 2000);
  };

  const renderProductCard = (product: any, index: number) => {
    const actions = (
      <>
        <Button size="sm" variant="outline" style={getButtonStyle('secondary')}>
          Modifier
        </Button>
        <Button size="sm" variant="outline" style={getButtonStyle('accent')}>
          Voir
        </Button>
      </>
    );

    return (
      <EntityCard
        key={product.id}
        title={product.title}
        description={product.description}
        status={product.status}
        category={product.category}
        price={product.price}
        date={product.date}
        image={product.image}
        variant={cardVariant}
        actions={actions}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Démonstration des Composants Entity
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explorez tous les composants génériques réutilisables avec intégration automatique des thèmes. 
            Changez de thème en temps réel pour voir l'adaptation automatique des styles.
          </p>
          <Badge variant="outline" className="text-sm">
            Thème actuel: {currentTheme.name}
          </Badge>
        </div>

        {/* Sélecteur de thème */}
        <ThemeSelector />

        <Tabs defaultValue="components" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="components">Composants de base</TabsTrigger>
            <TabsTrigger value="lists">Listes et filtres</TabsTrigger>
            <TabsTrigger value="forms">Formulaires</TabsTrigger>
            <TabsTrigger value="integration">Intégration complète</TabsTrigger>
          </TabsList>

          {/* Onglet Composants de base */}
          <TabsContent value="components" className="space-y-6">
            <Card style={getCardStyle()}>
              <CardHeader>
                <CardTitle>EntityCard - Variants</CardTitle>
                <CardDescription>
                  Cartes d'affichage avec différents styles et informations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contrôles de variant */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={cardVariant === 'default' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCardVariant('default')}
                    style={cardVariant === 'default' ? getButtonStyle('primary') : getButtonStyle('secondary')}
                  >
                    Default
                  </Button>
                  <Button
                    variant={cardVariant === 'compact' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCardVariant('compact')}
                    style={cardVariant === 'compact' ? getButtonStyle('primary') : getButtonStyle('secondary')}
                  >
                    Compact
                  </Button>
                  <Button
                    variant={cardVariant === 'detailed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCardVariant('detailed')}
                    style={cardVariant === 'detailed' ? getButtonStyle('primary') : getButtonStyle('secondary')}
                  >
                    Detailed
                  </Button>
                  <Button
                    variant={cardVariant === 'minimal' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCardVariant('minimal')}
                    style={cardVariant === 'minimal' ? getButtonStyle('primary') : getButtonStyle('secondary')}
                  >
                    Minimal
                  </Button>
                </div>

                {/* Démonstration des cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockProducts.slice(0, 3).map(renderProductCard)}
                </div>
              </CardContent>
            </Card>

            {/* Démonstration des utilisateurs */}
            <Card style={getCardStyle()}>
              <CardHeader>
                <CardTitle>EntityCard - Utilisateurs</CardTitle>
                <CardDescription>
                  Exemple avec des données utilisateur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockUsers.map(user => (
                    <EntityCard
                      key={user.id}
                      title={user.title}
                      description={user.description}
                      status={user.status}
                      category={user.category}
                      date={user.date}
                      actions={
                        <Button size="sm" variant="outline" style={getButtonStyle('secondary')}>
                          Contacter
                        </Button>
                      }
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Listes et filtres */}
          <TabsContent value="lists" className="space-y-6">
            {/* Filtres */}
            <EntityFilters
              filters={filterOptions}
              values={filters}
              onChange={handleFilterChange}
              onReset={handleFilterReset}
            />

            {/* Contrôles de vue */}
            <Card style={getCardStyle()}>
              <CardHeader>
                <CardTitle>Contrôles de vue et tri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Vue:</span>
                    <Button
                      variant={listVariant === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setListVariant('grid')}
                      style={listVariant === 'grid' ? getButtonStyle('primary') : getButtonStyle('secondary')}
                    >
                      Grille
                    </Button>
                    <Button
                      variant={listVariant === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setListVariant('list')}
                      style={listVariant === 'list' ? getButtonStyle('primary') : getButtonStyle('secondary')}
                    >
                      Liste
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Trier par:</span>
                    <SortableHeader
                      label="Titre"
                      sortKey="title"
                      currentSort={sortConfig}
                      onSort={handleSort}
                    />
                    <SortableHeader
                      label="Prix"
                      sortKey="price"
                      currentSort={sortConfig}
                      onSort={handleSort}
                    />
                    <SortableHeader
                      label="Date"
                      sortKey="date"
                      currentSort={sortConfig}
                      onSort={handleSort}
                    />
                  </div>
                </div>

                <EntitySearch
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Rechercher un produit..."
                />
              </CardContent>
            </Card>

            {/* Liste des résultats */}
            <Card style={getCardStyle()}>
              <CardHeader>
                <CardTitle>
                  Résultats ({filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <EntityList
                  entities={paginatedProducts}
                  renderCard={renderProductCard}
                  variant={listVariant}
                  columns={listVariant === 'grid' ? 3 : 1}
                />

                <EntityPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  pageSize={pageSize}
                  onPageSizeChange={setPageSize}
                  totalItems={filteredProducts.length}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Formulaires */}
          <TabsContent value="forms" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Gestion des formulaires</h2>
                <p className="text-muted-foreground">
                  Formulaires génériques avec validation et thèmes
                </p>
              </div>
              <Button
                onClick={() => setShowForm(!showForm)}
                style={getButtonStyle('primary')}
              >
                {showForm ? 'Masquer' : 'Nouveau produit'}
              </Button>
            </div>

            {showForm && (
              <EntityForm
                fields={formFields}
                onSubmit={handleFormSubmit}
                onCancel={() => setShowForm(false)}
                loading={loading}
                title="Créer un nouveau produit"
                description="Remplissez les informations du produit"
                layout="two-column"
              />
            )}

            {/* Exemples de formulaires */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EntityForm
                fields={[
                  { name: 'name', label: 'Nom', type: 'text', required: true },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'role', label: 'Rôle', type: 'select', options: [
                    { value: 'admin', label: 'Administrateur' },
                    { value: 'user', label: 'Utilisateur' },
                    { value: 'guest', label: 'Invité' }
                  ]},
                  { name: 'active', label: 'Compte actif', type: 'switch' }
                ]}
                title="Formulaire utilisateur"
                description="Layout simple"
                onSubmit={() => {}}
                submitLabel="Créer utilisateur"
                layout="single"
              />

              <EntityForm
                fields={[
                  { name: 'title', label: 'Titre', type: 'text', required: true },
                  { name: 'content', label: 'Contenu', type: 'textarea', required: true },
                  { name: 'published', label: 'Publié', type: 'checkbox' },
                  { name: 'publishDate', label: 'Date de publication', type: 'date' }
                ]}
                title="Formulaire article"
                description="Layout à sections"
                onSubmit={() => {}}
                submitLabel="Publier article"
                layout="sections"
              />
            </div>
          </TabsContent>

          {/* Onglet Intégration complète */}
          <TabsContent value="integration" className="space-y-6">
            <Card style={getCardStyle()}>
              <CardHeader>
                <CardTitle>Dashboard complet</CardTitle>
                <CardDescription>
                  Intégration de tous les composants dans une interface complète
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stats rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card style={{ ...getCardStyle(), background: 'linear-gradient(135deg, var(--primary), var(--primary-foreground))' }}>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-foreground">{mockProducts.length}</div>
                        <div className="text-sm text-primary-foreground/80">Produits total</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card style={{ ...getCardStyle(), background: 'linear-gradient(135deg, var(--secondary), var(--secondary-foreground))' }}>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary-foreground">
                          {mockProducts.filter(p => p.status === 'active').length}
                        </div>
                        <div className="text-sm text-secondary-foreground/80">Actifs</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card style={{ ...getCardStyle(), background: 'linear-gradient(135deg, var(--accent), var(--accent-foreground))' }}>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent-foreground">
                          {mockProducts.filter(p => p.status === 'pending').length}
                        </div>
                        <div className="text-sm text-accent-foreground/80">En attente</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card style={getCardStyle()}>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">
                          {Math.round(mockProducts.reduce((sum, p) => sum + p.price, 0) / mockProducts.length)}€
                        </div>
                        <div className="text-sm text-muted-foreground">Prix moyen</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Interface complète */}
                <div className="space-y-4">
                  <EntityFilters
                    filters={filterOptions}
                    values={filters}
                    onChange={handleFilterChange}
                    onReset={handleFilterReset}
                  />

                  <EntityList
                    entities={paginatedProducts}
                    renderCard={renderProductCard}
                    variant="grid"
                    columns={3}
                  />

                  <EntityPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                    totalItems={filteredProducts.length}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
