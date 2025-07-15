"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { ArrowLeft, Edit, Trash2, Share2, Download, Heart, Star } from 'lucide-react';
import { 
  EntityCard, 
  EntityList, 
  EntitySearch, 
  EntityPagination 
} from '@/shared/components/molecules/entity-components';
import { 
  EntityFilters, 
  SortableHeader 
} from '@/shared/components/molecules/entity-form-components';
import { ThemeSelector } from '@/shared/components/theme/theme-selector';
import { useTheme } from '@/shared/providers/theme-provider';
import { useInlineThemeStyles } from '@/shared/hooks/use-theme-utils';

// Template de page de liste générique
function EntityPage({
  title,
  description,
  entities,
  renderCard,
  filters,
  searchPlaceholder = "Rechercher...",
  createButtonLabel = "Créer",
  onCreateNew,
  stats
}: {
  title: string;
  description?: string;
  entities: any[];
  renderCard: (entity: any, index: number) => React.ReactNode;
  filters?: any[];
  searchPlaceholder?: string;
  createButtonLabel?: string;
  onCreateNew?: () => void;
  stats?: Array<{ label: string; value: string | number; variant?: 'primary' | 'secondary' | 'accent' }>;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'title',
    direction: 'asc'
  });

  const { getCardStyle, getButtonStyle } = useInlineThemeStyles();

  // Filtrage et tri des données
  const filteredEntities = React.useMemo(() => {
    let filtered = entities.filter(entity => {
      const matchesSearch = !searchTerm || 
        entity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (entity.description && entity.description.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesSearch;
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
  }, [entities, searchTerm, sortConfig]);

  const totalPages = Math.ceil(filteredEntities.length / pageSize);
  const paginatedEntities = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredEntities.slice(startIndex, startIndex + pageSize);
  }, [filteredEntities, currentPage, pageSize]);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        {onCreateNew && (
          <Button onClick={onCreateNew} style={getButtonStyle('primary')}>
            {createButtonLabel}
          </Button>
        )}
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} style={getCardStyle()}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Filtres et recherche */}
      {filters && (
        <EntityFilters
          filters={filters}
          values={filterValues}
          onChange={(key, value) => setFilterValues(prev => ({ ...prev, [key]: value }))}
          onReset={() => setFilterValues({})}
        />
      )}

      {/* Contrôles */}
      <Card style={getCardStyle()}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <EntitySearch
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={searchPlaceholder}
            />
            
            <div className="flex items-center gap-2">
              <SortableHeader
                label="Nom"
                sortKey="title"
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
        </CardContent>
      </Card>

      {/* Liste */}
      <EntityList
        entities={paginatedEntities}
        renderCard={renderCard}
        variant="grid"
        columns={3}
        emptyMessage={`Aucun ${title.toLowerCase()} trouvé`}
      />

      {/* Pagination */}
      <EntityPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        totalItems={filteredEntities.length}
      />
    </div>
  );
}

// Template de page de détail générique
function EntityDetailPage({
  entity,
  onBack,
  onEdit,
  onDelete,
  actions,
  children
}: {
  entity: any;
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { getCardStyle, getButtonStyle } = useInlineThemeStyles();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} style={getButtonStyle('secondary')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
      </div>

      <Card style={getCardStyle()}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl">{entity.title}</CardTitle>
              {entity.description && (
                <CardDescription className="mt-2 text-base">
                  {entity.description}
                </CardDescription>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {entity.status && (
                <Badge className={
                  entity.status === 'active' ? 'bg-green-100 text-green-800' :
                  entity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  entity.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  'bg-blue-100 text-blue-800'
                }>
                  {entity.status}
                </Badge>
              )}
              
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" style={getButtonStyle('secondary')}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" style={getButtonStyle('secondary')}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" style={getButtonStyle('secondary')}>
                  <Heart className="w-4 h-4" />
                </Button>
                {onEdit && (
                  <Button variant="ghost" size="sm" onClick={onEdit} style={getButtonStyle('secondary')}>
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button variant="ghost" size="sm" onClick={onDelete} style={getButtonStyle('secondary')}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {children}
        </CardContent>
      </Card>

      {actions && (
        <Card style={getCardStyle()}>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            {actions}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Données de démonstration
const mockProducts = [
  {
    id: 1,
    title: "Smartphone Galaxy Ultra",
    description: "Smartphone haut de gamme avec caméra professionnelle et écran AMOLED 6.8 pouces",
    status: "active",
    category: "Électronique",
    price: 1299.99,
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    specs: {
      brand: "Samsung",
      model: "Galaxy S24 Ultra",
      storage: "256GB",
      ram: "12GB",
      camera: "200MP + 50MP + 12MP + 10MP",
      battery: "5000mAh",
      os: "Android 14"
    },
    reviews: 4.8,
    totalReviews: 1247
  },
  {
    id: 2,
    title: "Ordinateur Portable Pro",
    description: "Laptop professionnel avec processeur Intel i7 et 16Go de RAM",
    status: "active",
    category: "Informatique",
    price: 1899.00,
    date: "2024-01-20",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    specs: {
      brand: "Dell",
      model: "XPS 15",
      processor: "Intel i7-13700H",
      storage: "1TB SSD",
      ram: "16GB DDR5",
      screen: "15.6\" 4K OLED",
      graphics: "NVIDIA RTX 4060"
    },
    reviews: 4.6,
    totalReviews: 892
  },
  {
    id: 3,
    title: "Casque Audio Bluetooth",
    description: "Casque sans fil avec réduction de bruit active et autonomie 30h",
    status: "pending",
    category: "Audio",
    price: 299.99,
    date: "2024-01-25",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    specs: {
      brand: "Sony",
      model: "WH-1000XM5",
      connectivity: "Bluetooth 5.2",
      battery: "30 heures",
      noiseCancelling: "Oui",
      weight: "250g"
    },
    reviews: 4.7,
    totalReviews: 2156
  }
];

export default function EntityTemplatesDemo() {
  const { currentTheme } = useTheme();
  const { getCardStyle, getButtonStyle } = useInlineThemeStyles();
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);

  const renderProductCard = (product: any, index: number) => {
    const actions = (
      <>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => {
            setSelectedProduct(product);
            setCurrentView('detail');
          }}
          style={getButtonStyle('secondary')}
        >
          Voir détails
        </Button>
        <Button size="sm" variant="outline" style={getButtonStyle('accent')}>
          Modifier
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
        variant="detailed"
        actions={actions}
      />
    );
  };

  const productStats = [
    { label: "Total produits", value: mockProducts.length },
    { label: "Produits actifs", value: mockProducts.filter(p => p.status === 'active').length },
    { label: "En attente", value: mockProducts.filter(p => p.status === 'pending').length },
    { label: "Prix moyen", value: `${Math.round(mockProducts.reduce((sum, p) => sum + p.price, 0) / mockProducts.length)}€` }
  ];

  const filters = [
    {
      key: 'category',
      label: 'Catégorie',
      type: 'select' as const,
      options: [
        { value: 'Électronique', label: 'Électronique' },
        { value: 'Informatique', label: 'Informatique' },
        { value: 'Audio', label: 'Audio' }
      ]
    },
    {
      key: 'status',
      label: 'Statut',
      type: 'select' as const,
      options: [
        { value: 'active', label: 'Actif' },
        { value: 'pending', label: 'En attente' },
        { value: 'inactive', label: 'Inactif' }
      ]
    },
    {
      key: 'minPrice',
      label: 'Prix minimum',
      type: 'number' as const,
      placeholder: 'Prix min'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Templates de Pages Entity
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Templates génériques prêts à l'emploi pour les pages de liste et de détail d'entités, 
            avec intégration automatique des thèmes et composants réutilisables.
          </p>
          <Badge variant="outline" className="text-sm">
            Thème actuel: {currentTheme.name}
          </Badge>
        </div>

        {/* Sélecteur de thème */}
        <ThemeSelector />

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">Template de Liste</TabsTrigger>
            <TabsTrigger value="detail">Template de Détail</TabsTrigger>
            <TabsTrigger value="combined">Vue Combinée</TabsTrigger>
          </TabsList>

          {/* Template de liste */}
          <TabsContent value="list" className="space-y-6">
            <Card style={getCardStyle()}>
              <CardHeader>
                <CardTitle>EntityPage Template</CardTitle>
                <CardDescription>
                  Template générique pour les pages de liste avec filtres, recherche, tri et pagination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EntityPage
                  title="Catalogue Produits"
                  description="Gérez votre catalogue de produits avec des outils de recherche et de filtrage avancés"
                  entities={mockProducts}
                  renderCard={renderProductCard}
                  filters={filters}
                  searchPlaceholder="Rechercher un produit..."
                  createButtonLabel="Nouveau produit"
                  onCreateNew={() => alert('Créer un nouveau produit')}
                  stats={productStats}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Template de détail */}
          <TabsContent value="detail" className="space-y-6">
            <Card style={getCardStyle()}>
              <CardHeader>
                <CardTitle>EntityDetailPage Template</CardTitle>
                <CardDescription>
                  Template générique pour les pages de détail avec actions et informations complètes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EntityDetailPage
                  entity={selectedProduct}
                  onBack={() => setCurrentView('list')}
                  onEdit={() => alert('Modifier le produit')}
                  onDelete={() => alert('Supprimer le produit')}
                  actions={
                    <div className="flex gap-2">
                      <Button style={getButtonStyle('primary')}>
                        Ajouter au panier
                      </Button>
                      <Button variant="outline" style={getButtonStyle('secondary')}>
                        Ajouter aux favoris
                      </Button>
                      <Button variant="outline" style={getButtonStyle('accent')}>
                        Comparer
                      </Button>
                    </div>
                  }
                >
                  <div className="space-y-6">
                    {/* Image et infos principales */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <img 
                          src={selectedProduct.image} 
                          alt={selectedProduct.title}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Prix</h3>
                          <div className="text-3xl font-bold text-primary">
                            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(selectedProduct.price)}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Évaluations</h3>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < Math.floor(selectedProduct.reviews) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="font-medium">{selectedProduct.reviews}</span>
                            <span className="text-muted-foreground">({selectedProduct.totalReviews} avis)</span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2">Catégorie</h3>
                          <Badge variant="outline">{selectedProduct.category}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Spécifications */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Spécifications techniques</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(selectedProduct.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between p-3 bg-muted rounded-lg">
                            <span className="font-medium capitalize">{key}:</span>
                            <span className="text-muted-foreground">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Description détaillée */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>
                  </div>
                </EntityDetailPage>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vue combinée */}
          <TabsContent value="combined" className="space-y-6">
            <Card style={getCardStyle()}>
              <CardHeader>
                <CardTitle>Interface Complète</CardTitle>
                <CardDescription>
                  Démonstration de la navigation entre les templates de liste et de détail
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentView === 'list' ? (
                  <EntityPage
                    title="Catalogue Produits"
                    description="Interface complète avec navigation vers les détails"
                    entities={mockProducts}
                    renderCard={(product, index) => {
                      const actions = (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setSelectedProduct(product);
                              setCurrentView('detail');
                            }}
                            style={getButtonStyle('primary')}
                          >
                            Voir détails
                          </Button>
                          <Button size="sm" variant="outline" style={getButtonStyle('secondary')}>
                            Modifier
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
                          variant="detailed"
                          actions={actions}
                        />
                      );
                    }}
                    filters={filters}
                    stats={productStats}
                  />
                ) : (
                  <EntityDetailPage
                    entity={selectedProduct}
                    onBack={() => setCurrentView('list')}
                    onEdit={() => alert('Modifier le produit')}
                    onDelete={() => alert('Supprimer le produit')}
                    actions={
                      <div className="flex gap-2">
                        <Button style={getButtonStyle('primary')}>
                          Ajouter au panier
                        </Button>
                        <Button variant="outline" style={getButtonStyle('secondary')}>
                          Ajouter aux favoris
                        </Button>
                        <Button variant="outline" style={getButtonStyle('accent')}>
                          Comparer
                        </Button>
                      </div>
                    }
                  >
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <img 
                            src={selectedProduct.image} 
                            alt={selectedProduct.title}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Prix</h3>
                            <div className="text-3xl font-bold text-primary">
                              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(selectedProduct.price)}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Évaluations</h3>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < Math.floor(selectedProduct.reviews) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="font-medium">{selectedProduct.reviews}</span>
                              <span className="text-muted-foreground">({selectedProduct.totalReviews} avis)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Spécifications techniques</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(selectedProduct.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between p-3 bg-muted rounded-lg">
                              <span className="font-medium capitalize">{key}:</span>
                              <span className="text-muted-foreground">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </EntityDetailPage>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
