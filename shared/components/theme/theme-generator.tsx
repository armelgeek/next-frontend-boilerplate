"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/atoms/ui/select';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';
import { Switch } from '@/shared/components/atoms/ui/switch';
import { Slider } from '@/shared/components/atoms/ui/slider';
import { 
  Download, 
  Palette, 
  Eye, 
  Copy, 
  Check,
  Sun,
  Moon,
  Monitor,
  Brush,
  Type,
  Layout,
  Sparkles
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { 
  ThemeBuilder, 
  ThemeTemplates, 
  ThemeHelpers,
  type ThemeConfig, 
  type ColorPalette 
} from '@/shared/lib/generators/theme-builder-generator';

// Hook pour gérer l'état du thème
export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig | null>(null);
  const [mode, setMode] = useState<'light' | 'dark' | 'auto'>('auto');
  
  const applyTheme = (theme: ThemeConfig) => {
    setCurrentTheme(theme);
    
    // Applique le CSS du thème
    const css = ThemeHelpers.toCSS(theme);
    
    // Crée ou met à jour le style element
    let styleElement = document.getElementById('dynamic-theme');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'dynamic-theme';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  };

  const setThemeMode = (newMode: 'light' | 'dark' | 'auto') => {
    setMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode);
  };

  return {
    currentTheme,
    mode,
    applyTheme,
    setThemeMode,
  };
}

// Composant sélecteur de couleur
interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function ColorPicker({ label, value, onChange, className }: ColorPickerProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-2">
        <div 
          className="w-10 h-10 rounded border border-border cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'color';
            input.value = value;
            input.onchange = (e) => onChange((e.target as HTMLInputElement).value);
            input.click();
          }}
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1"
        />
      </div>
    </div>
  );
}

// Composant palette de couleurs
interface ColorPaletteEditorProps {
  palette: ColorPalette;
  mode: 'light' | 'dark';
  onChange: (palette: ColorPalette) => void;
}

function ColorPaletteEditor({ palette, mode, onChange }: ColorPaletteEditorProps) {
  const updateColor = (colorKey: keyof ColorPalette, newValue: string) => {
    onChange({
      ...palette,
      [colorKey]: {
        ...palette[colorKey],
        value: newValue,
      },
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(palette).map(([key, color]) => (
        <ColorPicker
          key={key}
          label={color.description || key}
          value={color.value}
          onChange={(value) => updateColor(key as keyof ColorPalette, value)}
        />
      ))}
    </div>
  );
}

// Composant aperçu du thème
interface ThemePreviewProps {
  theme: ThemeConfig;
  className?: string;
}

export function ThemePreview({ theme, className }: ThemePreviewProps) {
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');
  
  const currentPalette = theme.colors[previewMode];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Mode toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Aperçu</h3>
        <div className="flex items-center gap-2">
          <Button
            variant={previewMode === 'light' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('light')}
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button
            variant={previewMode === 'dark' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('dark')}
          >
            <Moon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview container */}
      <div 
        className="p-6 rounded-lg border space-y-4"
        style={{
          backgroundColor: previewMode === 'light' ? '#ffffff' : '#0f172a',
          color: previewMode === 'light' ? '#1e293b' : '#f1f5f9',
          borderColor: currentPalette.muted.value,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold">{theme.displayName}</h4>
          <Badge 
            style={{ 
              backgroundColor: currentPalette.primary.value,
              color: '#ffffff'
            }}
          >
            Nouveau
          </Badge>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            className="px-4 py-2 rounded text-sm font-medium transition-colors"
            style={{
              backgroundColor: currentPalette.primary.value,
              color: '#ffffff',
            }}
          >
            Bouton Principal
          </button>
          <button
            className="px-4 py-2 rounded text-sm font-medium border transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: currentPalette.primary.value,
              borderColor: currentPalette.primary.value,
            }}
          >
            Bouton Outline
          </button>
          <button
            className="px-4 py-2 rounded text-sm font-medium transition-colors"
            style={{
              backgroundColor: currentPalette.secondary.value,
              color: previewMode === 'light' ? '#ffffff' : '#1e293b',
            }}
          >
            Secondaire
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <div 
            className="p-4 rounded border"
            style={{
              backgroundColor: previewMode === 'light' ? currentPalette.muted.value : '#1e293b',
              borderColor: currentPalette.muted.value,
            }}
          >
            <h5 className="font-semibold mb-2">Carte Exemple</h5>
            <p className="text-sm opacity-80">
              Contenu de la carte avec du texte d'exemple pour tester la lisibilité.
            </p>
          </div>
          <div 
            className="p-4 rounded border"
            style={{
              backgroundColor: previewMode === 'light' ? '#ffffff' : '#0f172a',
              borderColor: currentPalette.primary.value,
            }}
          >
            <h5 className="font-semibold mb-2">Carte Accent</h5>
            <p className="text-sm opacity-80">
              Une autre carte avec une bordure colorée.
            </p>
          </div>
        </div>

        {/* Alert variants */}
        <div className="space-y-2">
          <div 
            className="p-3 rounded text-sm"
            style={{
              backgroundColor: `${currentPalette.success.value}20`,
              color: currentPalette.success.value,
              border: `1px solid ${currentPalette.success.value}40`,
            }}
          >
            ✓ Message de succès avec la couleur success
          </div>
          <div 
            className="p-3 rounded text-sm"
            style={{
              backgroundColor: `${currentPalette.warning.value}20`,
              color: currentPalette.warning.value,
              border: `1px solid ${currentPalette.warning.value}40`,
            }}
          >
            ⚠ Message d'avertissement avec la couleur warning
          </div>
          <div 
            className="p-3 rounded text-sm"
            style={{
              backgroundColor: `${currentPalette.destructive.value}20`,
              color: currentPalette.destructive.value,
              border: `1px solid ${currentPalette.destructive.value}40`,
            }}
          >
            ✗ Message d'erreur avec la couleur destructive
          </div>
        </div>

        {/* Form elements */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Input Example</label>
            <input
              className="w-full px-3 py-2 border rounded text-sm"
              style={{
                backgroundColor: previewMode === 'light' ? '#ffffff' : '#1e293b',
                borderColor: currentPalette.muted.value,
                color: 'inherit',
              }}
              placeholder="Exemple d'input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Générateur de thème principal
export function ThemeGenerator() {
  const [activeTab, setActiveTab] = useState('templates');
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig | null>(null);
  const [customName, setCustomName] = useState('');
  const [customDisplayName, setCustomDisplayName] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customPrimaryColor, setCustomPrimaryColor] = useState('#2563eb');
  const [customMode, setCustomMode] = useState<'light' | 'dark' | 'auto'>('auto');
  const [customStyle, setCustomStyle] = useState<'modern' | 'classic' | 'minimal'>('modern');
  const [exportFormat, setExportFormat] = useState<'css' | 'tailwind' | 'json'>('css');
  const [copied, setCopied] = useState(false);

  const { applyTheme } = useTheme();

  // Applique un template
  const applyTemplate = (templateName: keyof typeof ThemeTemplates) => {
    const theme = ThemeHelpers.fromTemplate(templateName);
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  // Génère un thème personnalisé
  const generateCustomTheme = () => {
    if (!customName || !customDisplayName) return;

    const theme = ThemeHelpers.custom(
      customName,
      customDisplayName,
      customPrimaryColor,
      {
        mode: customMode,
        style: customStyle,
        description: customDescription,
      }
    );
    
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  // Met à jour une palette de couleurs
  const updateThemePalette = (mode: 'light' | 'dark', newPalette: ColorPalette) => {
    if (!currentTheme) return;

    const updatedTheme = {
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [mode]: newPalette,
      },
    };
    
    setCurrentTheme(updatedTheme);
    applyTheme(updatedTheme);
  };

  // Exporte le thème
  const exportTheme = () => {
    if (!currentTheme) return;

    let content = '';
    let filename = '';

    switch (exportFormat) {
      case 'css':
        content = ThemeHelpers.toCSS(currentTheme);
        filename = `${currentTheme.name}-theme.css`;
        break;
      case 'tailwind':
        content = ThemeHelpers.toTailwind(currentTheme);
        filename = `tailwind.config.js`;
        break;
      case 'json':
        content = JSON.stringify(currentTheme, null, 2);
        filename = `${currentTheme.name}-theme.json`;
        break;
    }

    // Copie dans le presse-papier
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

    // Télécharge le fichier
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Palette className="h-8 w-8" />
          Theme Builder
        </h1>
        <p className="text-muted-foreground">
          Créez et personnalisez des thèmes complets pour votre application
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Générateur */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="custom" className="flex items-center gap-2">
                <Brush className="h-4 w-4" />
                Personnalisé
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Avancé
              </TabsTrigger>
            </TabsList>

            {/* Templates prédéfinis */}
            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Templates Prédéfinis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {Object.entries(ThemeTemplates).map(([key, template]) => (
                      <Card 
                        key={key}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => applyTemplate(key as keyof typeof ThemeTemplates)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{template.displayName}</h3>
                              <Badge variant="outline">{template.mode}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {template.description}
                            </p>
                            <div className="flex gap-1">
                              {Object.values(template.colors.light).slice(0, 4).map((color, index) => (
                                <div
                                  key={index}
                                  className="w-6 h-6 rounded border border-border"
                                  style={{ backgroundColor: color.value }}
                                />
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Personnalisé */}
            <TabsContent value="custom" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Créer un Thème Personnalisé</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Nom du thème</Label>
                      <Input
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="mon-theme"
                      />
                    </div>
                    <div>
                      <Label>Nom d'affichage</Label>
                      <Input
                        value={customDisplayName}
                        onChange={(e) => setCustomDisplayName(e.target.value)}
                        placeholder="Mon Thème"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={customDescription}
                      onChange={(e) => setCustomDescription(e.target.value)}
                      placeholder="Description du thème..."
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <ColorPicker
                      label="Couleur Principale"
                      value={customPrimaryColor}
                      onChange={setCustomPrimaryColor}
                    />
                    <div>
                      <Label>Mode</Label>
                      <Select value={customMode} onValueChange={(value: any) => setCustomMode(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Clair</SelectItem>
                          <SelectItem value="dark">Sombre</SelectItem>
                          <SelectItem value="auto">Automatique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Style</Label>
                      <Select value={customStyle} onValueChange={(value: any) => setCustomStyle(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Moderne</SelectItem>
                          <SelectItem value="classic">Classique</SelectItem>
                          <SelectItem value="minimal">Minimaliste</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={generateCustomTheme} className="w-full">
                    <Brush className="h-4 w-4 mr-2" />
                    Générer le Thème
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Avancé */}
            <TabsContent value="advanced" className="space-y-4">
              {currentTheme && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Palette Clair</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ColorPaletteEditor
                        palette={currentTheme.colors.light}
                        mode="light"
                        onChange={(palette) => updateThemePalette('light', palette)}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Palette Sombre</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ColorPaletteEditor
                        palette={currentTheme.colors.dark}
                        mode="dark"
                        onChange={(palette) => updateThemePalette('dark', palette)}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Export */}
          {currentTheme && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Exporter le Thème
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="css">CSS</SelectItem>
                      <SelectItem value="tailwind">Tailwind</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={exportTheme} className="flex-1">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copié!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copier & Télécharger
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Aperçu */}
        <div className="space-y-6">
          {currentTheme ? (
            <ThemePreview theme={currentTheme} />
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Sélectionnez ou créez un thème pour voir l'aperçu
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
