"use client";

import React, { useState } from 'react';
import { Card } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { Zap, Database, Search, Filter, Edit, Trash2, Plus } from 'lucide-react';

export function EntityGeneratorDemo() {
  const [selectedEntity, setSelectedEntity] = useState('product');
  
  const entities = {
    product: {
      name: 'E-commerce Product',
      description: 'Entité produit pour boutique en ligne',
      fields: ['name', 'price', 'description', 'category', 'image', 'stock'],
      preview: <ProductEntityPreview />
    },
    user: {
      name: 'User Management',
      description: 'Gestion complète des utilisateurs',
      fields: ['name', 'email', 'role', 'avatar', 'status', 'lastLogin'],
      preview: <UserEntityPreview />
    },
    blog: {
      name: 'Blog Article',
      description: 'Articles de blog avec métadonnées',
      fields: ['title', 'content', 'author', 'category', 'tags', 'publishedAt'],
      preview: <BlogEntityPreview />
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Entity Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Génération automatique d'entités front-office complètes avec CRUD, 
            recherche, pagination et gestion d'état optimisée.
          </p>
        </div>

        <Tabs value={selectedEntity} onValueChange={setSelectedEntity}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {Object.entries(entities).map(([key, entity]) => (
              <TabsTrigger key={key} value={key}>
                {entity.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(entities).map(([key, entity]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">{entity.name}</h3>
                  <p className="text-muted-foreground mb-6">{entity.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Fonctionnalités générées :</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>✅ Pages CRUD complètes (List, Create, Edit, Detail)</li>
                        <li>✅ Hooks React Query optimisés</li>
                        <li>✅ Composants génériques réutilisables</li>
                        <li>✅ Recherche et filtres avancés</li>
                        <li>✅ Pagination automatique</li>
                        <li>✅ Mode mock/API switchable</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Structure générée :</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>📁 features/{key}/</div>
                        <div className="ml-4">📄 {key}.schema.ts</div>
                        <div className="ml-4">📄 {key}.service.ts</div>
                        <div className="ml-4">📄 {key}.mock.ts</div>
                        <div className="ml-4">📁 hooks/</div>
                        <div className="ml-8">📄 use-{key}.ts</div>
                        <div>📁 app/(root)/{key}s/</div>
                        <div className="ml-4">📄 page.tsx (liste)</div>
                        <div className="ml-4">📄 create/page.tsx</div>
                        <div className="ml-4">📄 [id]/page.tsx</div>
                        <div className="ml-4">📄 [id]/edit/page.tsx</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Champs du schéma :</h4>
                      <div className="flex flex-wrap gap-2">
                        {entity.fields.map((field) => (
                          <Badge key={field} variant="outline">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Générer cette entité
                    </Button>
                  </div>
                </div>

                <Card className="p-6">
                  <h4 className="font-medium mb-4">Aperçu des pages générées</h4>
                  {entity.preview}
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <Badge variant="outline" className="bg-green-100 text-green-800">
            ✅ Disponible - Prêt à utiliser avec npm run generate:entity
          </Badge>
        </div>
      </div>
    </div>
  );
}

function ProductEntityPreview() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="list" className="text-xs">Liste</TabsTrigger>
          <TabsTrigger value="detail" className="text-xs">Détail</TabsTrigger>
          <TabsTrigger value="create" className="text-xs">Créer</TabsTrigger>
          <TabsTrigger value="edit" className="text-xs">Éditer</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <div className="space-y-3">
            {/* Search and filters */}
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-muted/50 border border-border rounded px-2 py-1">
                <Search className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Rechercher produits...</span>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-3 h-3" />
              </Button>
            </div>
            
            {/* Product cards */}
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border border-border rounded p-2">
                  <div className="w-full h-12 bg-blue-100 rounded mb-2"></div>
                  <div className="text-xs font-medium">Produit {item}</div>
                  <div className="text-xs text-muted-foreground">29,99 €</div>
                  <div className="flex gap-1 mt-1">
                    <Button variant="outline" size="sm" className="h-5 text-xs">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-5 text-xs">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center gap-1">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded text-xs flex items-center justify-center">1</div>
              <div className="w-6 h-6 bg-muted rounded text-xs flex items-center justify-center">2</div>
              <div className="w-6 h-6 bg-muted rounded text-xs flex items-center justify-center">3</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="detail" className="mt-4">
          <div className="space-y-3">
            <div className="w-full h-20 bg-blue-100 rounded"></div>
            <div>
              <div className="font-medium text-sm">iPhone 15 Pro</div>
              <div className="text-xs text-muted-foreground">Smartphone premium</div>
            </div>
            <div className="text-lg font-bold text-primary">1 299,99 €</div>
            <div className="text-xs text-muted-foreground">
              Description complète du produit avec toutes les spécifications...
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">Ajouter au panier</Button>
              <Button variant="outline" size="sm">
                <Edit className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="create" className="mt-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium">Nom du produit</label>
              <div className="w-full h-6 bg-muted/50 border border-border rounded mt-1"></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium">Prix</label>
                <div className="w-full h-6 bg-muted/50 border border-border rounded mt-1"></div>
              </div>
              <div>
                <label className="text-xs font-medium">Stock</label>
                <div className="w-full h-6 bg-muted/50 border border-border rounded mt-1"></div>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium">Description</label>
              <div className="w-full h-12 bg-muted/50 border border-border rounded mt-1"></div>
            </div>
            <Button size="sm" className="w-full">Créer le produit</Button>
          </div>
        </TabsContent>

        <TabsContent value="edit" className="mt-4">
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-800">
              Modification : iPhone 15 Pro
            </div>
            <div>
              <label className="text-xs font-medium">Nom du produit</label>
              <div className="w-full h-6 bg-white border border-border rounded mt-1 px-2 flex items-center">
                <span className="text-xs">iPhone 15 Pro</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium">Prix</label>
                <div className="w-full h-6 bg-white border border-border rounded mt-1 px-2 flex items-center">
                  <span className="text-xs">1299.99</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium">Stock</label>
                <div className="w-full h-6 bg-white border border-border rounded mt-1 px-2 flex items-center">
                  <span className="text-xs">25</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">Sauvegarder</Button>
              <Button variant="outline" size="sm">Annuler</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UserEntityPreview() {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Utilisateurs (156)</div>
        <Button size="sm">
          <Plus className="w-3 h-3 mr-1" />
          Nouveau
        </Button>
      </div>
      
      <div className="space-y-2">
        {[
          { name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'active' },
          { name: 'Bob Durant', email: 'bob@example.com', role: 'User', status: 'active' },
          { name: 'Claire Doe', email: 'claire@example.com', role: 'User', status: 'inactive' }
        ].map((user, index) => (
          <div key={index} className="flex items-center gap-3 p-2 border border-border rounded">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
            <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="text-xs">
              {user.role}
            </Badge>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="h-5 w-5 p-0">
                <Edit className="w-3 h-3" />
              </Button>
              <Button variant="outline" size="sm" className="h-5 w-5 p-0">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogEntityPreview() {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Articles (42)</div>
        <Button size="sm">
          <Plus className="w-3 h-3 mr-1" />
          Nouvel article
        </Button>
      </div>
      
      <div className="space-y-2">
        {[
          { title: 'Guide Next.js 2024', author: 'Alice', category: 'Tech', status: 'published' },
          { title: 'React vs Vue', author: 'Bob', category: 'Comparaison', status: 'draft' },
          { title: 'CSS Grid avancé', author: 'Claire', category: 'CSS', status: 'published' }
        ].map((article, index) => (
          <div key={index} className="p-2 border border-border rounded">
            <div className="flex items-start justify-between mb-1">
              <div className="text-xs font-medium">{article.title}</div>
              <Badge variant={article.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                {article.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Par {article.author}</span>
              <span>•</span>
              <span>{article.category}</span>
            </div>
            <div className="flex gap-1 mt-2">
              <Button variant="outline" size="sm" className="h-5 text-xs">
                <Edit className="w-3 h-3 mr-1" />
                Éditer
              </Button>
              <Button variant="outline" size="sm" className="h-5 text-xs">
                👁️ Voir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
