"use client";

import React, { useState } from 'react';
import { 
  SectionConfig, 
  SectionBuilder, 
  SectionTemplates,
  SectionTheme,
  SectionLayout,
  SectionSize,
  SectionVariant,
  ContentItem
} from '@/shared/lib/generators/section-builder-generator';
import { SectionRenderer } from './section-renderer';
import { Button } from '@/shared/components/atoms/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';

interface SectionBuilderUIProps {
  onSectionChange?: (section: SectionConfig) => void;
  className?: string;
}

export function SectionBuilderUI({ onSectionChange, className = '' }: SectionBuilderUIProps) {
  const [currentSection, setCurrentSection] = useState<SectionConfig>(
    SectionTemplates.hero.simple()
  );
  const [activeTab, setActiveTab] = useState('templates');

  const handleSectionUpdate = (updates: Partial<SectionConfig>) => {
    const updatedSection = SectionBuilder.customizeSection(currentSection, updates);
    setCurrentSection(updatedSection);
    onSectionChange?.(updatedSection);
  };

  const loadTemplate = (sectionType: keyof typeof SectionTemplates, variant: string) => {
    try {
      const template = SectionBuilder.fromTemplate(sectionType, variant);
      setCurrentSection(template);
      onSectionChange?.(template);
    } catch (error) {
      console.error('Error loading template:', error);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Section Builder</h2>
        <Badge variant="outline">
          {currentSection.type} - {currentSection.theme}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="customize">Personnaliser</TabsTrigger>
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="preview">Aperçu</TabsTrigger>
        </TabsList>

        {/* Tab Templates */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(SectionTemplates).map(([sectionType, variants]) => (
              <Card key={sectionType}>
                <CardHeader>
                  <CardTitle className="capitalize">{sectionType}</CardTitle>
                  <CardDescription>
                    Choisissez un variant pour {sectionType}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {Object.keys(variants).map((variant) => (
                      <Button
                        key={variant}
                        variant="outline"
                        className="justify-start"
                        onClick={() => loadTemplate(sectionType as keyof typeof SectionTemplates, variant)}
                      >
                        <span className="capitalize">{variant}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Customize */}
        <TabsContent value="customize" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Thème</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={currentSection.theme}
                  onValueChange={(value: SectionTheme) => 
                    handleSectionUpdate({ theme: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="colorful">Colorful</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={currentSection.layout}
                  onValueChange={(value: SectionLayout) => 
                    handleSectionUpdate({ layout: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="centered">Centered</SelectItem>
                    <SelectItem value="split">Split</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="masonry">Masonry</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                    <SelectItem value="tabs">Tabs</SelectItem>
                    <SelectItem value="accordion">Accordion</SelectItem>
                    <SelectItem value="timeline">Timeline</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taille</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={currentSection.size}
                  onValueChange={(value: SectionSize) => 
                    handleSectionUpdate({ size: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">Extra Large</SelectItem>
                    <SelectItem value="full">Full Screen</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variant</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={currentSection.variant}
                  onValueChange={(value: SectionVariant) => 
                    handleSectionUpdate({ variant: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="outlined">Outlined</SelectItem>
                    <SelectItem value="filled">Filled</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                    <SelectItem value="subtle">Subtle</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Content */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contenu de la section</CardTitle>
              <CardDescription>
                Personnalisez le titre, sous-titre et description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  value={currentSection.title || ''}
                  onChange={(e) => handleSectionUpdate({ title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Titre de la section"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sous-titre</label>
                <input
                  type="text"
                  value={currentSection.subtitle || ''}
                  onChange={(e) => handleSectionUpdate({ subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sous-titre de la section"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={currentSection.description || ''}
                  onChange={(e) => handleSectionUpdate({ description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description de la section"
                />
              </div>
            </CardContent>
          </Card>

          {/* Gestion des éléments de contenu */}
          {currentSection.content && currentSection.content.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Éléments de contenu</CardTitle>
                <CardDescription>
                  {currentSection.content.length} élément(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentSection.content.map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        {item.subtitle && (
                          <p className="text-sm text-gray-600">{item.subtitle}</p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newContent = [...currentSection.content];
                          newContent.splice(index, 1);
                          handleSectionUpdate({ content: newContent });
                        }}
                      >
                        Supprimer
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab Preview */}
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu de la section</CardTitle>
              <CardDescription>
                Voici comment votre section apparaîtra
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <SectionRenderer section={currentSection} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={() => {
            console.log('Section config:', JSON.stringify(currentSection, null, 2));
          }}
        >
          Exporter JSON
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(currentSection, null, 2));
          }}
        >
          Copier JSON
        </Button>
      </div>
    </div>
  );
}

export default SectionBuilderUI;
