# Guide des Composants Entity

Ce guide explique l'utilisation des composants génériques réutilisables pour la gestion d'entités avec intégration automatique des thèmes.

## 🎯 Vue d'ensemble

Les composants Entity offrent une collection complète d'éléments UI pour créer rapidement des interfaces de gestion d'entités (CRUD) avec une cohérence visuelle automatique selon le thème sélectionné.

## 📁 Structure des composants

```
shared/components/molecules/
├── entity-components.tsx          # Composants de base (Card, List, Search, Pagination)
└── entity-form-components.tsx     # Composants de formulaire (Form, Filters, SortableHeader)

app/(ui)/
├── entity-demo/                   # Démonstration des composants
├── entity-templates/              # Templates de pages
└── theme-studio/                  # Studio de thèmes
```

## 🧩 Composants disponibles

### 1. EntityCard

Carte d'affichage d'entité avec plusieurs variants.

```tsx
import { EntityCard } from '@/shared/components/molecules/entity-components';

function ProductCard({ product }) {
  return (
    <EntityCard
      title={product.name}
      description={product.description}
      status={product.status}           // 'active' | 'inactive' | 'pending' | 'draft'
      category={product.category}
      date={product.createdAt}
      price={product.price}
      image={product.image}
      variant="detailed"                // 'default' | 'compact' | 'detailed' | 'minimal'
      actions={
        <>
          <Button size="sm">Modifier</Button>
          <Button size="sm" variant="outline">Voir</Button>
        </>
      }
    />
  );
}
```

**Variants disponibles :**
- `default` : Carte standard avec toutes les informations
- `compact` : Version condensée pour les listes denses
- `detailed` : Version étendue avec image et plus d'espace
- `minimal` : Version minimaliste avec bordures subtiles

### 2. EntityList

Container de liste avec gestion des états et layouts.

```tsx
import { EntityList } from '@/shared/components/molecules/entity-components';

function ProductList({ products }) {
  const renderCard = (product, index) => (
    <EntityCard key={product.id} {...product} />
  );

  return (
    <EntityList
      entities={products}
      renderCard={renderCard}
      loading={isLoading}
      error={error}
      emptyMessage="Aucun produit trouvé"
      variant="grid"                    // 'grid' | 'list' | 'table'
      columns={3}                       // 1-6 pour la grille
    />
  );
}
```

### 3. EntitySearch

Champ de recherche avec debounce intégré.

```tsx
import { EntitySearch } from '@/shared/components/molecules/entity-components';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <EntitySearch
      value={searchTerm}
      onChange={setSearchTerm}
      placeholder="Rechercher un produit..."
      debounceMs={300}                  // Délai en millisecondes
    />
  );
}
```

### 4. EntityPagination

Pagination complète avec contrôle de la taille de page.

```tsx
import { EntityPagination } from '@/shared/components/molecules/entity-components';

function ProductPagination() {
  return (
    <EntityPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      pageSize={pageSize}
      onPageSizeChange={setPageSize}
      totalItems={totalItems}
      showPageSize={true}               // Afficher le sélecteur de taille
    />
  );
}
```

### 5. EntityForm

Formulaire générique avec validation Zod.

```tsx
import { EntityForm } from '@/shared/components/molecules/entity-form-components';

const fields = [
  {
    name: 'title',
    label: 'Titre',
    type: 'text',                       // 'text' | 'textarea' | 'select' | 'checkbox' | 'switch' | 'number' | 'email' | 'password' | 'date'
    required: true,
    placeholder: 'Nom du produit',
    validation: { min: 3, max: 100 }
  },
  {
    name: 'category',
    label: 'Catégorie',
    type: 'select',
    options: [
      { value: 'electronics', label: 'Électronique' },
      { value: 'clothing', label: 'Vêtements' }
    ]
  },
  {
    name: 'featured',
    label: 'Produit vedette',
    type: 'switch',
    placeholder: 'Afficher en première page'
  }
];

function ProductForm() {
  return (
    <EntityForm
      fields={fields}
      initialValues={initialData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      loading={isSubmitting}
      title="Créer un produit"
      description="Remplissez les informations du produit"
      layout="two-column"               // 'single' | 'two-column' | 'sections'
      submitLabel="Enregistrer"
      cancelLabel="Annuler"
    />
  );
}
```

### 6. EntityFilters

Système de filtres avancés avec dropdown.

```tsx
import { EntityFilters } from '@/shared/components/molecules/entity-form-components';

const filterOptions = [
  {
    key: 'category',
    label: 'Catégorie',
    type: 'select',
    options: [
      { value: 'electronics', label: 'Électronique' },
      { value: 'clothing', label: 'Vêtements' }
    ]
  },
  {
    key: 'minPrice',
    label: 'Prix minimum',
    type: 'number',
    placeholder: 'Prix min'
  },
  {
    key: 'status',
    label: 'Statut',
    type: 'select',
    options: [
      { value: 'active', label: 'Actif' },
      { value: 'inactive', label: 'Inactif' }
    ]
  }
];

function ProductFilters() {
  const [filters, setFilters] = useState({});

  return (
    <EntityFilters
      filters={filterOptions}
      values={filters}
      onChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
      onReset={() => setFilters({})}
    />
  );
}
```

### 7. SortableHeader

En-têtes de colonnes triables.

```tsx
import { SortableHeader } from '@/shared/components/molecules/entity-form-components';

function ProductTable() {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="flex gap-4">
      <SortableHeader
        label="Nom"
        sortKey="name"
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
        sortKey="createdAt"
        currentSort={sortConfig}
        onSort={handleSort}
      />
    </div>
  );
}
```

## 🏗️ Templates de pages

### EntityPage Template

Template complet pour les pages de liste.

```tsx
import { EntityPage } from '@/app/(ui)/entity-templates/page';

function ProductsPage() {
  const renderCard = (product, index) => (
    <EntityCard key={product.id} {...product} />
  );

  const stats = [
    { label: "Total produits", value: products.length },
    { label: "Actifs", value: activeProducts.length },
    { label: "Prix moyen", value: `${averagePrice}€` }
  ];

  return (
    <EntityPage
      title="Catalogue Produits"
      description="Gérez votre catalogue de produits"
      entities={products}
      renderCard={renderCard}
      filters={filterOptions}
      searchPlaceholder="Rechercher un produit..."
      createButtonLabel="Nouveau produit"
      onCreateNew={handleCreateNew}
      stats={stats}
    />
  );
}
```

### EntityDetailPage Template

Template pour les pages de détail.

```tsx
import { EntityDetailPage } from '@/app/(ui)/entity-templates/page';

function ProductDetailPage({ product }) {
  return (
    <EntityDetailPage
      entity={product}
      onBack={() => router.back()}
      onEdit={() => router.push(`/products/${product.id}/edit`)}
      onDelete={handleDelete}
      actions={
        <div className="flex gap-2">
          <Button>Ajouter au panier</Button>
          <Button variant="outline">Favoris</Button>
        </div>
      }
    >
      {/* Contenu personnalisé de la page */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <img src={product.image} alt={product.name} />
          <div>
            <h2>Spécifications</h2>
            {/* ... */}
          </div>
        </div>
      </div>
    </EntityDetailPage>
  );
}
```

## 🎨 Intégration avec les thèmes

### Utilisation automatique des thèmes

Tous les composants utilisent automatiquement les styles du thème actuel :

```tsx
import { useTheme } from '@/shared/providers/theme-provider';
import { useInlineThemeStyles } from '@/shared/hooks/use-theme-utils';

function MyComponent() {
  const { currentTheme } = useTheme();
  const { getCardStyle, getButtonStyle } = useInlineThemeStyles();

  return (
    <div style={getCardStyle()}>
      <Button style={getButtonStyle('primary')}>
        Action principale
      </Button>
      <Button style={getButtonStyle('secondary')}>
        Action secondaire
      </Button>
    </div>
  );
}
```

### Classes CSS thématiques

Les composants utilisent aussi des classes CSS qui s'adaptent automatiquement :

```tsx
// Ces classes s'adaptent automatiquement au thème
<div className="bg-background text-foreground border-border">
  <div className="bg-card text-card-foreground">
    <Button className="bg-primary text-primary-foreground">
      Bouton thématique
    </Button>
  </div>
</div>
```

## 🚀 Utilisation rapide

### 1. Page de liste complète

```tsx
"use client"

import { useState, useMemo } from 'react';
import { 
  EntityCard, 
  EntityList, 
  EntitySearch, 
  EntityPagination 
} from '@/shared/components/molecules/entity-components';
import { EntityFilters } from '@/shared/components/molecules/entity-form-components';

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const filteredProducts = useMemo(() => {
    // Logique de filtrage
    return products.filter(/* ... */);
  }, [products, searchTerm, filters]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Produits</h1>
      
      <EntityFilters
        filters={filterOptions}
        values={filters}
        onChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
        onReset={() => setFilters({})}
      />

      <EntitySearch
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Rechercher un produit..."
      />

      <EntityList
        entities={paginatedProducts}
        renderCard={(product) => (
          <EntityCard key={product.id} {...product} />
        )}
        variant="grid"
        columns={3}
      />

      <EntityPagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / pageSize)}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        totalItems={filteredProducts.length}
      />
    </div>
  );
}
```

### 2. Formulaire de création

```tsx
"use client"

import { EntityForm } from '@/shared/components/molecules/entity-form-components';

const productFields = [
  {
    name: 'name',
    label: 'Nom du produit',
    type: 'text',
    required: true,
    validation: { min: 3, max: 100 }
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: true
  },
  {
    name: 'price',
    label: 'Prix',
    type: 'number',
    required: true,
    validation: { min: 0 }
  },
  {
    name: 'category',
    label: 'Catégorie',
    type: 'select',
    options: [
      { value: 'electronics', label: 'Électronique' },
      { value: 'clothing', label: 'Vêtements' }
    ]
  },
  {
    name: 'featured',
    label: 'Produit vedette',
    type: 'switch'
  }
];

export default function CreateProductPage() {
  const handleSubmit = async (values) => {
    try {
      await createProduct(values);
      router.push('/products');
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <EntityForm
      fields={productFields}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      title="Créer un produit"
      description="Ajoutez un nouveau produit au catalogue"
      layout="two-column"
    />
  );
}
```

## 🎛️ Personnalisation

### Styles personnalisés

```tsx
// Utiliser les hooks de thème pour des styles personnalisés
import { useInlineThemeStyles } from '@/shared/hooks/use-theme-utils';

function CustomComponent() {
  const { getCardStyle, getButtonStyle } = useInlineThemeStyles();

  const customCardStyle = {
    ...getCardStyle(),
    border: '2px solid var(--primary)',
    borderRadius: '12px'
  };

  return (
    <div style={customCardStyle}>
      <Button style={getButtonStyle('primary')}>
        Action
      </Button>
    </div>
  );
}
```

### Variants personnalisés

```tsx
// Étendre les variants existants
const customCardVariants = {
  ...cardVariants,
  highlighted: 'border-2 border-primary shadow-lg transform scale-105',
  dimmed: 'opacity-60 grayscale'
};
```

## 📊 Pages de démonstration

### Accès aux démonstrations

1. **Composants de base :** `http://localhost:4000/(ui)/entity-demo`
   - Démonstration de tous les composants individuels
   - Test des variants et configurations
   - Intégration avec le système de thèmes

2. **Templates de pages :** `http://localhost:4000/(ui)/entity-templates`
   - Templates complets de pages
   - Navigation entre liste et détail
   - Exemples d'intégration

3. **Studio de thèmes :** `http://localhost:4000/(ui)/theme-studio`
   - Test de tous les thèmes
   - Aperçu en temps réel des changements
   - Guide d'utilisation des thèmes

## 🔧 Configuration avancée

### Validation personnalisée

```tsx
const customValidation = {
  min: 5,
  max: 50,
  pattern: '^[A-Za-z0-9]+$',
  message: 'Seuls les caractères alphanumériques sont autorisés'
};

const field = {
  name: 'code',
  label: 'Code produit',
  type: 'text',
  validation: customValidation
};
```

### Layouts de formulaire

```tsx
// Layout en sections
<EntityForm
  fields={fields}
  layout="sections"
  onSubmit={handleSubmit}
/>

// Layout en deux colonnes
<EntityForm
  fields={fields}
  layout="two-column"
  onSubmit={handleSubmit}
/>

// Layout simple
<EntityForm
  fields={fields}
  layout="single"
  onSubmit={handleSubmit}
/>
```

## 🆘 Dépannage

### Problèmes courants

1. **Styles non appliqués**
   - Vérifiez que ThemeProvider enveloppe votre application
   - Assurez-vous d'importer les styles CSS des thèmes

2. **Performance lente**
   - Utilisez React.memo pour les composants renderCard
   - Implémentez la virtualisation pour de grandes listes

3. **Validation qui ne fonctionne pas**
   - Vérifiez la structure des objets de validation
   - Assurez-vous que les noms des champs correspondent

### Optimisations

```tsx
// Mémorisation des composants lourds
const MemoizedEntityCard = React.memo(EntityCard);

// Debounce pour les recherches
const debouncedSearch = useMemo(
  () => debounce(setSearchTerm, 300),
  []
);

// Pagination côté serveur
const { data, isLoading } = useQuery({
  queryKey: ['products', currentPage, pageSize, filters],
  queryFn: () => fetchProducts({ page: currentPage, size: pageSize, ...filters })
});
```

## 🔗 Ressources

- [Démonstration en direct](http://localhost:4000/(ui)/entity-demo)
- [Templates de pages](http://localhost:4000/(ui)/entity-templates)
- [Studio de thèmes](http://localhost:4000/(ui)/theme-studio)
- [Guide des thèmes](./theme-system-guide.md)
- [Documentation React Hook Form](https://react-hook-form.com/)
- [Documentation Zod](https://zod.dev/)
