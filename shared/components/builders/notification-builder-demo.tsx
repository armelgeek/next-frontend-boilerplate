"use client";

import React, { useState } from 'react';
import { Card } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { Bell, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export function NotificationBuilderDemo() {
  const [selectedType, setSelectedType] = useState('toast');
  
  const notificationTypes = {
    toast: {
      name: 'Toast Notifications',
      description: 'Notifications légères en overlay',
      preview: <ToastPreview />
    },
    modal: {
      name: 'Modal Dialogs',
      description: 'Notifications modales avec actions',
      preview: <ModalPreview />
    },
    banner: {
      name: 'Banner Alerts',
      description: 'Bannières d\'information persistantes',
      preview: <BannerPreview />
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Bell className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Notification System Builder
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Système unifié pour gérer toutes les notifications de votre application 
            avec templates métier et configuration centralisée.
          </p>
        </div>

        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {Object.entries(notificationTypes).map(([key, type]) => (
              <TabsTrigger key={key} value={key}>
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(notificationTypes).map(([key, type]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">{type.name}</h3>
                  <p className="text-muted-foreground mb-6">{type.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Fonctionnalités :</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>✅ Types multiples (success, error, warning, info)</li>
                        <li>✅ Templates métier prédéfinis</li>
                        <li>✅ Actions personnalisées</li>
                        <li>✅ Auto-dismiss configurable</li>
                        <li>✅ Persistence et historique</li>
                        <li>✅ Animation et transitions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Templates disponibles :</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-100 text-green-800">CRUD</Badge>
                          <span className="text-sm text-muted-foreground">Créer, modifier, supprimer</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">Auth</Badge>
                          <span className="text-sm text-muted-foreground">Connexion, inscription</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-red-100 text-red-800">System</Badge>
                          <span className="text-sm text-muted-foreground">Maintenance, erreurs</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      Configurer les notifications
                    </Button>
                  </div>
                </div>

                <Card className="p-6">
                  <h4 className="font-medium mb-4">Aperçu</h4>
                  {type.preview}
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

function ToastPreview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Exemples de notifications toast :
      </p>
      
      {/* Success Toast */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-green-800">Succès</p>
          <p className="text-xs text-green-600">Élément créé avec succès</p>
        </div>
        <X className="w-4 h-4 text-green-400 cursor-pointer" />
      </div>

      {/* Error Toast */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-800">Erreur</p>
          <p className="text-xs text-red-600">Impossible de sauvegarder</p>
        </div>
        <X className="w-4 h-4 text-red-400 cursor-pointer" />
      </div>

      {/* Info Toast */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-3">
        <Info className="w-5 h-5 text-blue-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-800">Information</p>
          <p className="text-xs text-blue-600">Nouvelle mise à jour disponible</p>
        </div>
        <X className="w-4 h-4 text-blue-400 cursor-pointer" />
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        💡 Auto-dismiss après 5 secondes
      </div>
    </div>
  );
}

function ModalPreview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Exemple de notification modale :
      </p>
      
      <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 bg-primary/5">
        <div className="bg-card border border-border rounded-lg p-6 max-w-sm mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Confirmer la suppression</h3>
              <p className="text-sm text-muted-foreground">Cette action est irréversible</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            Êtes-vous sûr de vouloir supprimer cet élément ? 
            Toutes les données associées seront perdues.
          </p>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex-1">
              Annuler
            </Button>
            <Button variant="destructive" size="sm" className="flex-1">
              Supprimer
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground text-center">
        🎯 Avec overlay et gestion du focus
      </div>
    </div>
  );
}

function BannerPreview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Exemples de bannières d'alerte :
      </p>
      
      {/* Maintenance Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Maintenance programmée
              </p>
              <p className="text-xs text-yellow-600">
                Le service sera indisponible demain de 2h à 4h
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-yellow-600">
            En savoir plus
          </Button>
        </div>
      </div>

      {/* Update Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-800">
                Nouvelle version disponible
              </p>
              <p className="text-xs text-blue-600">
                Version 2.1.0 avec nouvelles fonctionnalités
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-blue-600">
              Plus tard
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Mettre à jour
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground text-center">
        📌 Persistantes jusqu'à action utilisateur
      </div>
    </div>
  );
}
