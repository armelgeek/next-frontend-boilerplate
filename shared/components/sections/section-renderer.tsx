"use client";

import React from 'react';
import { SectionConfig, SectionBuilder } from '@/shared/lib/generators/section-builder-generator';

interface SectionRendererProps {
  section: SectionConfig;
  index?: number;
}

export function SectionRenderer({ section, index = 0 }: SectionRendererProps) {
  const cssClasses = SectionBuilder.generateSectionCSS(section);
  
  const sectionStyle: React.CSSProperties = {};
  
  // Gestion du background personnalisé
  if (section.background) {
    switch (section.background.type) {
      case 'gradient':
        sectionStyle.background = section.background.value;
        break;
      case 'image':
        sectionStyle.backgroundImage = `url(${section.background.value})`;
        if (section.background.overlay) {
          sectionStyle.position = 'relative';
        }
        break;
      case 'color':
        sectionStyle.backgroundColor = section.background.value;
        break;
    }
    
    if (section.background.opacity !== undefined && section.background.opacity !== 1) {
      sectionStyle.opacity = section.background.opacity;
    }
  }

  const renderSectionContent = () => {
    switch (section.type) {
      case 'hero':
        return <DefaultSectionContent section={section} />;
      case 'features':
        return <DefaultSectionContent section={section} />;
      case 'testimonials':
        return <DefaultSectionContent section={section} />;
      case 'faq':
        return <DefaultSectionContent section={section} />;
      case 'pricing':
        return <DefaultSectionContent section={section} />;
      case 'team':
        return <DefaultSectionContent section={section} />;
      case 'stats':
        return <DefaultSectionContent section={section} />;
      case 'cta':
        return <DefaultSectionContent section={section} />;
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Section type "{section.type}" not implemented</p>
          </div>
        );
    }
  };

  return (
    <section
      id={section.id}
      className={cssClasses}
      style={sectionStyle}
    >
      {/* Overlay pour les backgrounds d'image */}
      {section.background?.type === 'image' && section.background.overlay && (
        <div className="absolute inset-0 bg-black/50 z-0" />
      )}
      
      {/* Contenu de la section */}
      <div className="relative z-10">
        {renderSectionContent()}
      </div>
    </section>
  );
}

// Composant de contenu par défaut pour toutes les sections
function DefaultSectionContent({ section }: { section: SectionConfig }) {
  const responsiveClasses = SectionBuilder.generateResponsiveClasses(section.responsive);

  return (
    <div>
      {/* Header de section */}
      {(section.title || section.subtitle || section.description) && (
        <div className="text-center mb-8 lg:mb-12">
          {section.subtitle && (
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
              {section.subtitle}
            </p>
          )}
          {section.title && (
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-4">
              {section.title}
            </h2>
          )}
          {section.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {section.description}
            </p>
          )}
        </div>
      )}

      {/* Contenu de la section */}
      {section.content && section.content.length > 0 && (
        <div className={responsiveClasses}>
          {section.content.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border p-6">
              {item.badge && (
                <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                  {item.badge}
                </span>
              )}
              {item.icon && (
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-semibold">{item.icon}</span>
                </div>
              )}
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-16 rounded-full object-cover mb-4"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-sm text-gray-600 mb-2">
                  {item.subtitle}
                </p>
              )}
              {item.description && (
                <p className="text-gray-600">
                  {item.description}
                </p>
              )}
              {item.cta && (
                <div className="mt-4">
                  <a
                    href={item.cta.href}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {item.cta.text}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CTA principal de la section */}
      {section.cta && (
        <div className="text-center mt-8 lg:mt-12">
          <a
            href={section.cta.href}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {section.cta.text}
          </a>
        </div>
      )}
    </div>
  );
}

interface MultiSectionRendererProps {
  sections: SectionConfig[];
  className?: string;
}

export function MultiSectionRenderer({ sections, className = '' }: MultiSectionRendererProps) {
  return (
    <div className={className}>
      {sections.map((section, index) => (
        <SectionRenderer 
          key={section.id} 
          section={section} 
          index={index}
        />
      ))}
    </div>
  );
}
