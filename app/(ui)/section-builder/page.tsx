"use client";

import React, { useState } from 'react';
import { SectionConfig, SectionTemplates } from '@/shared/lib/generators/section-builder-generator';
import { SectionBuilderUI } from '@/shared/components/sections/section-builder-ui';
import { MultiSectionRenderer } from '@/shared/components/sections/section-renderer';

export default function SectionBuilderPage() {
  const [sections, setSections] = useState<SectionConfig[]>([
    SectionTemplates.hero.simple(),
    SectionTemplates.features.grid(),
    SectionTemplates.testimonials.cards(),
  ]);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  const handleSectionChange = (updatedSection: SectionConfig) => {
    const newSections = [...sections];
    newSections[selectedSectionIndex] = updatedSection;
    setSections(newSections);
  };

  const addSection = (sectionType: keyof typeof SectionTemplates, variant: string) => {
    try {
      const sectionTemplates = SectionTemplates[sectionType] as Record<string, () => SectionConfig>;
      const templateFunction = sectionTemplates[variant];
      if (templateFunction) {
        const newSection = templateFunction();
        setSections([...sections, newSection]);
        setSelectedSectionIndex(sections.length);
      }
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
    if (selectedSectionIndex >= newSections.length) {
      setSelectedSectionIndex(Math.max(0, newSections.length - 1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Section Builder Studio</h1>
              <p className="text-gray-600">Créez et personnalisez vos sections avec différents thèmes et layouts</p>
            </div>
            <div className="text-sm text-gray-500">
              {sections.length} section(s)
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Panel de gauche - Section Builder */}
          <div className="space-y-6">
            {/* Gestion des sections */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Sections ({sections.length})</h3>
              <div className="space-y-2 mb-4">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedSectionIndex === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSectionIndex(index)}
                  >
                    <div>
                      <p className="font-medium">{section.title || `Section ${index + 1}`}</p>
                      <p className="text-sm text-gray-600">
                        {section.type} - {section.theme} - {section.layout}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSection(index);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>

              {/* Boutons d'ajout rapide */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => addSection('hero', 'simple')}
                  className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  + Hero
                </button>
                <button
                  onClick={() => addSection('features', 'grid')}
                  className="px-3 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                >
                  + Features
                </button>
                <button
                  onClick={() => addSection('testimonials', 'cards')}
                  className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
                >
                  + Testimonials
                </button>
                <button
                  onClick={() => addSection('pricing', 'cards')}
                  className="px-3 py-2 text-sm bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200"
                >
                  + Pricing
                </button>
              </div>
            </div>

            {/* Section Builder UI */}
            {sections.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <SectionBuilderUI
                  key={selectedSectionIndex} // Force re-render when section changes
                  onSectionChange={handleSectionChange}
                />
              </div>
            )}
          </div>

          {/* Panel de droite - Aperçu */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Aperçu complet</h3>
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                <MultiSectionRenderer sections={sections} />
              </div>
            </div>

            {/* Code JSON */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Configuration JSON</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm max-h-96">
                {JSON.stringify(sections, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
