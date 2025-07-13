"use client";

import React from 'react';
import { SectionTemplates, MultiSectionRenderer } from '@/shared/components/sections';

export default function SectionBuilderTestPage() {
  // Générer quelques sections de test
  const testSections = [
    SectionTemplates.hero.gradient(),
    SectionTemplates.features.grid(),
    SectionTemplates.testimonials.cards(),
    SectionTemplates.faq.accordion(),
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Section Builder - Test</h1>
          <p className="text-gray-600">
            Test des sections générées automatiquement
          </p>
        </div>
        
        <MultiSectionRenderer sections={testSections} />
      </div>
    </div>
  );
}
