"use client";

import React, { useState } from 'react';
import { Card } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { Navigation, Menu, ChevronRight, Search, Bell } from 'lucide-react';

export function NavigationBuilderDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState('admin');
  
  const templates = {
    admin: {
      name: 'Admin Dashboard',
      description: 'Navigation complète pour interface d\'administration',
      preview: <AdminNavigationPreview />
    },
    client: {
      name: 'Client Portal',
      description: 'Navigation orientée utilisateur final',
      preview: <ClientNavigationPreview />
    },
    mobile: {
      name: 'Mobile First',
      description: 'Navigation optimisée mobile avec drawer',
      preview: <MobileNavigationPreview />
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Navigation className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Navigation Builder
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Génération automatique de systèmes de navigation avec permissions, 
            responsive design et accessibilité intégrée.
          </p>
        </div>

        <Tabs value={selectedTemplate} onValueChange={setSelectedTemplate}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {Object.entries(templates).map(([key, template]) => (
              <TabsTrigger key={key} value={key}>
                {template.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(templates).map(([key, template]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">{template.name}</h3>
                  <p className="text-muted-foreground mb-6">{template.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Fonctionnalités incluses :</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>✅ Sidebar responsive avec collapse</li>
                        <li>✅ Header avec dropdown utilisateur</li>
                        <li>✅ Breadcrumbs automatiques</li>
                        <li>✅ Gestion des permissions</li>
                        <li>✅ Recherche intégrée</li>
                        <li>✅ Badges et notifications</li>
                      </ul>
                    </div>
                    
                    <Button className="w-full">
                      Générer ce template
                    </Button>
                  </div>
                </div>

                <Card className="p-6">
                  <h4 className="font-medium mb-4">Aperçu</h4>
                  {template.preview}
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

function AdminNavigationPreview() {
  return (
    <div className="border border-border rounded-md overflow-hidden bg-card">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5" />
          <span className="font-medium">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          <Bell className="w-4 h-4" />
          <div className="w-6 h-6 bg-primary-foreground/20 rounded-full"></div>
        </div>
      </div>
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 bg-muted p-3 space-y-1">
          <div className="text-xs text-muted-foreground mb-2">MENU</div>
          <div className="space-y-1">
            <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">📊 Dashboard</div>
            <div className="px-2 py-1 text-sm text-muted-foreground">👥 Utilisateurs</div>
            <div className="px-2 py-1 text-sm text-muted-foreground">📝 Contenu</div>
            <div className="px-2 py-1 text-sm text-muted-foreground">⚙️ Paramètres</div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <span>Accueil</span>
            <ChevronRight className="w-3 h-3" />
            <span>Dashboard</span>
          </div>
          <div className="h-16 bg-muted/50 rounded border-2 border-dashed border-border flex items-center justify-center text-sm text-muted-foreground">
            Zone de contenu principal
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientNavigationPreview() {
  return (
    <div className="border border-border rounded-md overflow-hidden bg-card">
      {/* Header */}
      <div className="bg-card border-b border-border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-bold text-primary">Mon App</div>
            <nav className="flex items-center gap-4 text-sm">
              <span className="text-primary">Accueil</span>
              <span className="text-muted-foreground">Produits</span>
              <span className="text-muted-foreground">À propos</span>
              <span className="text-muted-foreground">Contact</span>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">Connexion</Button>
            <Button size="sm">Inscription</Button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
        <div className="h-20 bg-muted/50 rounded border-2 border-dashed border-border flex items-center justify-center text-sm text-muted-foreground">
          Contenu utilisateur
        </div>
      </div>
    </div>
  );
}

function MobileNavigationPreview() {
  return (
    <div className="border border-border rounded-md overflow-hidden bg-card">
      {/* Mobile Header */}
      <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
        <Menu className="w-5 h-5" />
        <span className="font-medium">Mon App</span>
        <div className="w-6 h-6 bg-primary-foreground/20 rounded-full"></div>
      </div>
      
      {/* Mobile Content with drawer hint */}
      <div className="p-3">
        <div className="mb-3 text-xs text-muted-foreground">
          👈 Menu drawer (slide depuis la gauche)
        </div>
        <div className="h-16 bg-muted/50 rounded border-2 border-dashed border-border flex items-center justify-center text-sm text-muted-foreground">
          Interface mobile optimisée
        </div>
      </div>
    </div>
  );
}
