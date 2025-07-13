"use client";

import React, { useState } from 'react';
import { Card } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { FileText, Plus, CheckCircle, AlertCircle } from 'lucide-react';

export function FormBuilderDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState('contact');
  
  const templates = {
    contact: {
      name: 'Formulaire de Contact',
      description: 'Formulaire simple avec validation et envoi email',
      fields: ['Nom', 'Email', 'Sujet', 'Message'],
      preview: <ContactFormPreview />
    },
    registration: {
      name: 'Inscription Multi-étapes',
      description: 'Formulaire d\'inscription avec étapes progressives',
      fields: ['Infos personnelles', 'Compte', 'Préférences', 'Confirmation'],
      preview: <RegistrationFormPreview />
    },
    survey: {
      name: 'Questionnaire Dynamique',
      description: 'Formulaire avec champs conditionnels et logique métier',
      fields: ['Questions', 'Conditions', 'Validation', 'Résultats'],
      preview: <SurveyFormPreview />
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Form Builder
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Créez des formulaires complexes avec validation Zod, étapes multiples, 
            champs conditionnels et auto-save automatique.
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
                      <h4 className="font-medium mb-2">Fonctionnalités :</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>✅ Validation Zod intégrée</li>
                        <li>✅ Champs conditionnels</li>
                        <li>✅ Auto-save et brouillons</li>
                        <li>✅ Multi-étapes avec navigation</li>
                        <li>✅ Messages d'erreur personnalisés</li>
                        <li>✅ Types de champs avancés</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Champs inclus :</h4>
                      <div className="flex flex-wrap gap-2">
                        {template.fields.map((field) => (
                          <Badge key={field} variant="outline">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Créer ce formulaire
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

function ContactFormPreview() {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground block mb-1">Nom complet *</label>
        <div className="w-full h-9 bg-muted/50 border border-border rounded"></div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-1">Email *</label>
        <div className="w-full h-9 bg-muted/50 border border-border rounded"></div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-1">Sujet</label>
        <div className="w-full h-9 bg-muted/50 border border-border rounded"></div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-1">Message *</label>
        <div className="w-full h-20 bg-muted/50 border border-border rounded"></div>
      </div>
      <Button className="w-full">Envoyer le message</Button>
    </div>
  );
}

function RegistrationFormPreview() {
  return (
    <div className="space-y-4">
      {/* Steps indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
            1
          </div>
          <span className="text-sm text-primary font-medium">Infos personnelles</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm">
            2
          </div>
          <span className="text-sm text-muted-foreground">Compte</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm">
            3
          </div>
          <span className="text-sm text-muted-foreground">Confirmation</span>
        </div>
      </div>

      {/* Current step fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Prénom *</label>
          <div className="w-full h-9 bg-muted/50 border border-border rounded"></div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Nom *</label>
          <div className="w-full h-9 bg-muted/50 border border-border rounded"></div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-1">Date de naissance</label>
        <div className="w-full h-9 bg-muted/50 border border-border rounded"></div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" disabled>Précédent</Button>
        <Button>Suivant</Button>
      </div>
    </div>
  );
}

function SurveyFormPreview() {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Quel est votre niveau d'expérience ?
        </label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-border rounded-full bg-primary"></div>
            <span className="text-sm">Débutant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-border rounded-full"></div>
            <span className="text-sm">Intermédiaire</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-border rounded-full"></div>
            <span className="text-sm">Avancé</span>
          </div>
        </div>
      </div>

      {/* Conditional field */}
      <div className="bg-blue-50 border border-blue-200 rounded p-3">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Champ conditionnel</span>
        </div>
        <label className="text-sm text-blue-700 block mb-1">
          Combien d'années d'expérience avez-vous ?
        </label>
        <div className="w-full h-9 bg-white border border-blue-300 rounded"></div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground block mb-1">Commentaires</label>
        <div className="w-full h-16 bg-muted/50 border border-border rounded"></div>
      </div>
      
      <Button className="w-full">
        <CheckCircle className="w-4 h-4 mr-2" />
        Soumettre le questionnaire
      </Button>
    </div>
  );
}
