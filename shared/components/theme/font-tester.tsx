"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/atoms/ui/select';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import { themeFonts } from '@/shared/lib/themes/theme-fonts';
import { useTheme } from '@/shared/providers/theme-provider';

const fontVariables = {
  'Inter': 'var(--font-inter)',
  'Playfair Display': 'var(--font-playfair-display)',
  'Roboto': 'var(--font-roboto)',
  'Open Sans': 'var(--font-open-sans)',
  'Montserrat': 'var(--font-montserrat)',
  'Poppins': 'var(--font-poppins)',
  'Source Sans 3': 'var(--font-source-sans-3)',
  'Lato': 'var(--font-lato)',
  'JetBrains Mono': 'var(--font-jetbrains-mono)',
  'Crimson Text': 'var(--font-crimson-text)',
  'Crimson Pro': 'var(--font-crimson-pro)',
  'Nunito': 'var(--font-nunito)',
  'Lora': 'var(--font-lora)',
  'Inconsolata': 'var(--font-inconsolata)',
  'Roboto Slab': 'var(--font-roboto-slab)',
  'Fira Code': 'var(--font-fira-code)',
  'Source Serif 4': 'var(--font-source-serif-4)',
  'Source Code Pro': 'var(--font-source-code-pro)',
  'Cormorant Garamond': 'var(--font-cormorant-garamond)',
  'Courier Prime': 'var(--font-courier-prime)',
  'Space Grotesk': 'var(--font-space-grotesk)',
  'DM Sans': 'var(--font-dm-sans)',
  'Plus Jakarta Sans': 'var(--font-plus-jakarta-sans)',
};

const sampleTexts = {
  'paragraph': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  'heading': 'The Quick Brown Fox Jumps Over The Lazy Dog',
  'code': 'function calculateSum(a: number, b: number): number {\n  return a + b;\n}\n\nconst result = calculateSum(10, 20);',
  'numbers': '0123456789 | €$£¥ | +-×÷= | ()[]{}',
  'custom': 'Tapez votre propre texte ici...'
};

export function FontTester() {
  const { currentTheme } = useTheme();
  const [selectedFont, setSelectedFont] = useState<string>('Inter');
  const [textType, setTextType] = useState<keyof typeof sampleTexts>('paragraph');
  const [customText, setCustomText] = useState('');
  const [fontSize, setFontSize] = useState('16');
  const [fontWeight, setFontWeight] = useState('400');

  const currentText = textType === 'custom' ? customText : sampleTexts[textType];
  const currentFontVariable = fontVariables[selectedFont as keyof typeof fontVariables];

  // Récupérer les fonts du thème actuel
  const currentThemeFonts = themeFonts[currentTheme.variant as keyof typeof themeFonts];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testeur de Fonts Google</CardTitle>
        <CardDescription>
          Testez toutes les Google Fonts intégrées au système avec différents textes et styles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration du thème actuel */}
        {currentThemeFonts && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h4 className="font-medium">Fonts configurées pour le thème "{currentTheme.name}"</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Sans-serif:</span> {currentThemeFonts.sans}
              </div>
              <div>
                <span className="font-medium">Serif:</span> {currentThemeFonts.serif}
              </div>
              <div>
                <span className="font-medium">Monospace:</span> {currentThemeFonts.mono}
              </div>
            </div>
          </div>
        )}

        {/* Contrôles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Police</label>
            <Select value={selectedFont} onValueChange={setSelectedFont}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(fontVariables).map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type de texte</label>
            <Select value={textType} onValueChange={(value) => setTextType(value as keyof typeof sampleTexts)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paragraph">Paragraphe</SelectItem>
                <SelectItem value="heading">Titre</SelectItem>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="numbers">Chiffres & Symboles</SelectItem>
                <SelectItem value="custom">Texte personnalisé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Taille (px)</label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12px</SelectItem>
                <SelectItem value="14">14px</SelectItem>
                <SelectItem value="16">16px</SelectItem>
                <SelectItem value="18">18px</SelectItem>
                <SelectItem value="20">20px</SelectItem>
                <SelectItem value="24">24px</SelectItem>
                <SelectItem value="32">32px</SelectItem>
                <SelectItem value="48">48px</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Poids</label>
            <Select value={fontWeight} onValueChange={setFontWeight}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="300">Light (300)</SelectItem>
                <SelectItem value="400">Regular (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semi Bold (600)</SelectItem>
                <SelectItem value="700">Bold (700)</SelectItem>
                <SelectItem value="800">Extra Bold (800)</SelectItem>
                <SelectItem value="900">Black (900)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Zone de texte personnalisé */}
        {textType === 'custom' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Votre texte personnalisé</label>
            <Textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Tapez votre texte ici..."
              rows={4}
            />
          </div>
        )}

        {/* Aperçu */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Aperçu</h4>
            <div className="text-sm text-muted-foreground">
              {selectedFont} • {fontSize}px • {fontWeight}
            </div>
          </div>
          
          <div className="min-h-32 p-6 border rounded-lg bg-background">
            <div
              style={{
                fontFamily: currentFontVariable,
                fontSize: `${fontSize}px`,
                fontWeight: fontWeight,
                lineHeight: textType === 'code' ? '1.5' : '1.6',
                whiteSpace: textType === 'code' ? 'pre-wrap' : 'normal',
              }}
            >
              {currentText}
            </div>
          </div>
        </div>

        {/* Comparaison avec les fonts du thème */}
        {currentThemeFonts && (
          <div className="space-y-4">
            <h4 className="font-medium">Comparaison avec les fonts du thème actuel</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Sans-serif du thème</div>
                <div
                  className="p-4 border rounded bg-background"
                  style={{
                    fontFamily: currentThemeFonts.sans,
                    fontSize: `${fontSize}px`,
                    fontWeight: fontWeight,
                  }}
                >
                  {sampleTexts.heading}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Serif du thème</div>
                <div
                  className="p-4 border rounded bg-background"
                  style={{
                    fontFamily: currentThemeFonts.serif,
                    fontSize: `${fontSize}px`,
                    fontWeight: fontWeight,
                  }}
                >
                  {sampleTexts.heading}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Monospace du thème</div>
                <div
                  className="p-4 border rounded bg-background"
                  style={{
                    fontFamily: currentThemeFonts.mono,
                    fontSize: `${fontSize}px`,
                    fontWeight: fontWeight,
                  }}
                >
                  {sampleTexts.code.split('\n')[0]}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions rapides */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setFontSize('24');
              setFontWeight('600');
              setTextType('heading');
            }}
          >
            Style Titre
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setFontSize('16');
              setFontWeight('400');
              setTextType('paragraph');
            }}
          >
            Style Corps
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setFontSize('14');
              setFontWeight('400');
              setTextType('code');
            }}
          >
            Style Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
