"use client";

import React, { useState } from 'react';
import { Card } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { Layout, Grid, Sidebar, Monitor } from 'lucide-react';

export function LayoutBuilderDemo() {
  const [selectedLayout, setSelectedLayout] = useState('dashboard');
  
  const layouts = {
    dashboard: {
      name: 'Dashboard Layout',
      description: 'Layout admin avec sidebar et header',
      preview: <DashboardLayoutPreview />
    },
    ecommerce: {
      name: 'E-commerce Layout',
      description: 'Layout e-commerce avec filtres sidebar',
      preview: <EcommerceLayoutPreview />
    },
    blog: {
      name: 'Blog Layout',
      description: 'Layout blog avec sidebar et contenu principal',
      preview: <BlogLayoutPreview />
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Layout className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Layout Builder
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Générez des layouts complexes avec grilles responsives, sections automatiques 
            et composants prédéfinis pour tous types d'applications.
          </p>
        </div>

        <Tabs value={selectedLayout} onValueChange={setSelectedLayout}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {Object.entries(layouts).map(([key, layout]) => (
              <TabsTrigger key={key} value={key}>
                {layout.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(layouts).map(([key, layout]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">{layout.name}</h3>
                  <p className="text-muted-foreground mb-6">{layout.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Fonctionnalités :</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>✅ Grilles responsives automatiques</li>
                        <li>✅ Breakpoints optimisés</li>
                        <li>✅ Layouts flexbox avancés</li>
                        <li>✅ Sections hero, cards, forms</li>
                        <li>✅ Animation et transitions</li>
                        <li>✅ Accessibilité intégrée</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Composants inclus :</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Badge variant="outline" className="justify-center">
                          <Grid className="w-3 h-3 mr-1" />
                          Grid
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          <Sidebar className="w-3 h-3 mr-1" />
                          Sidebar
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          <Monitor className="w-3 h-3 mr-1" />
                          Header
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          <Layout className="w-3 h-3 mr-1" />
                          Content
                        </Badge>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      Générer ce layout
                    </Button>
                  </div>
                </div>

                <Card className="p-6">
                  <h4 className="font-medium mb-4">Aperçu</h4>
                  {layout.preview}
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            🔧 En développement - Version bêta disponible bientôt
          </Badge>
        </div>
      </div>
    </div>
  );
}

function DashboardLayoutPreview() {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-primary-foreground/20 rounded"></div>
          <span className="font-medium">Dashboard Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-foreground/20 rounded-full"></div>
        </div>
      </div>
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 bg-muted border-r border-border p-3">
          <div className="space-y-2">
            <div className="w-full h-6 bg-primary/20 rounded"></div>
            <div className="w-3/4 h-6 bg-muted-foreground/20 rounded"></div>
            <div className="w-full h-6 bg-muted-foreground/20 rounded"></div>
            <div className="w-2/3 h-6 bg-muted-foreground/20 rounded"></div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-2">
              <div className="w-full h-4 bg-blue-300 rounded mb-1"></div>
              <div className="w-2/3 h-3 bg-blue-200 rounded"></div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-2">
              <div className="w-full h-4 bg-green-300 rounded mb-1"></div>
              <div className="w-2/3 h-3 bg-green-200 rounded"></div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded p-2">
              <div className="w-full h-4 bg-orange-300 rounded mb-1"></div>
              <div className="w-2/3 h-3 bg-orange-200 rounded"></div>
            </div>
          </div>
          
          {/* Chart Area */}
          <div className="bg-muted/50 border border-border rounded p-3 h-20 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Zone graphiques</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EcommerceLayoutPreview() {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Header */}
      <div className="bg-card border-b border-border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-bold text-primary">Shop</div>
            <div className="flex gap-3 text-sm">
              <span>Accueil</span>
              <span>Produits</span>
              <span>Contact</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted rounded"></div>
            <div className="w-6 h-6 bg-muted rounded"></div>
          </div>
        </div>
      </div>
      
      <div className="flex">
        {/* Filters Sidebar */}
        <div className="w-40 bg-muted/50 border-r border-border p-3">
          <div className="text-xs font-medium mb-2">Filtres</div>
          <div className="space-y-2">
            <div className="w-full h-4 bg-muted rounded"></div>
            <div className="w-3/4 h-4 bg-muted rounded"></div>
            <div className="w-full h-4 bg-muted rounded"></div>
            <div className="space-y-1 mt-3">
              <div className="w-2 h-2 bg-primary rounded-full inline-block mr-2"></div>
              <span className="text-xs">Option 1</span>
            </div>
            <div className="space-y-1">
              <div className="w-2 h-2 bg-muted rounded-full inline-block mr-2"></div>
              <span className="text-xs">Option 2</span>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border border-border rounded p-2">
                <div className="w-full h-12 bg-muted/50 rounded mb-2"></div>
                <div className="w-full h-3 bg-muted/50 rounded mb-1"></div>
                <div className="w-2/3 h-3 bg-muted/50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogLayoutPreview() {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-border p-4 text-center">
        <div className="font-bold text-lg text-foreground mb-1">Mon Blog</div>
        <div className="text-sm text-muted-foreground">Articles et actualités</div>
      </div>
      
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Featured Article */}
          <div className="border border-border rounded mb-4 overflow-hidden">
            <div className="w-full h-16 bg-gradient-to-r from-blue-100 to-purple-100"></div>
            <div className="p-3">
              <div className="w-3/4 h-4 bg-muted rounded mb-2"></div>
              <div className="w-full h-3 bg-muted/50 rounded mb-1"></div>
              <div className="w-5/6 h-3 bg-muted/50 rounded"></div>
            </div>
          </div>
          
          {/* Articles List */}
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="flex gap-3 p-3 border border-border rounded">
                <div className="w-16 h-12 bg-muted/50 rounded"></div>
                <div className="flex-1">
                  <div className="w-3/4 h-3 bg-muted rounded mb-2"></div>
                  <div className="w-full h-2 bg-muted/50 rounded mb-1"></div>
                  <div className="w-2/3 h-2 bg-muted/50 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-48 bg-muted/30 border-l border-border p-3">
          <div className="space-y-4">
            {/* Search */}
            <div>
              <div className="text-xs font-medium mb-2">Recherche</div>
              <div className="w-full h-6 bg-white border border-border rounded"></div>
            </div>
            
            {/* Categories */}
            <div>
              <div className="text-xs font-medium mb-2">Catégories</div>
              <div className="space-y-1">
                <div className="w-full h-4 bg-muted rounded"></div>
                <div className="w-3/4 h-4 bg-muted rounded"></div>
                <div className="w-5/6 h-4 bg-muted rounded"></div>
              </div>
            </div>
            
            {/* Recent Posts */}
            <div>
              <div className="text-xs font-medium mb-2">Articles récents</div>
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="text-xs p-2 bg-white border border-border rounded">
                    <div className="w-full h-2 bg-muted/50 rounded mb-1"></div>
                    <div className="w-2/3 h-2 bg-muted/50 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
