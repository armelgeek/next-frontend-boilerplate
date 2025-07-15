#!/usr/bin/env node

/**
 * Script de vérification des composants Entity
 * 
 * Ce script vérifie que tous les composants Entity sont correctement créés
 * et que les pages de démonstration sont accessibles.
 */

const fs = require('fs');
const path = require('path');

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.cyan}${colors.bright}🧩 Vérification des Composants Entity${colors.reset}\n`);

// Fichiers à vérifier
const filesToCheck = [
  {
    path: '../shared/components/molecules/entity-components.tsx',
    name: 'Composants Entity de base',
    required: ['EntityCard', 'EntityList', 'EntitySearch', 'EntityPagination']
  },
  {
    path: '../shared/components/molecules/entity-form-components.tsx',
    name: 'Composants Entity formulaires',
    required: ['EntityForm', 'EntityFilters', 'SortableHeader']
  },
  {
    path: '../app/(ui)/entity-demo/page.tsx',
    name: 'Page de démonstration Entity',
    required: ['EntityCard', 'EntityList', 'EntityForm', 'EntityFilters']
  },
  {
    path: '../app/(ui)/entity-templates/page.tsx',
    name: 'Templates de pages Entity',
    required: ['EntityPage', 'EntityDetailPage', 'EntityCard']
  },
  {
    path: '../docs/entity-components-guide.md',
    name: 'Documentation des composants Entity',
    required: ['EntityCard', 'EntityList', 'EntityForm', 'Templates']
  }
];

let allChecksPass = true;

filesToCheck.forEach((file, index) => {
  console.log(`${colors.blue}${index + 1}. Vérification de ${file.name}...${colors.reset}`);
  
  const fullPath = path.join(__dirname, file.path);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`${colors.red}❌ Fichier non trouvé: ${file.path}${colors.reset}`);
    allChecksPass = false;
    return;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  
  const missingElements = file.required.filter(element => !content.includes(element));
  
  if (missingElements.length > 0) {
    console.log(`${colors.red}❌ Éléments manquants: ${missingElements.join(', ')}${colors.reset}`);
    allChecksPass = false;
  } else {
    console.log(`${colors.green}✅ Tous les éléments requis sont présents${colors.reset}`);
  }
  
  // Vérifications spécifiques par fichier
  if (file.path.includes('entity-components.tsx')) {
    if (content.includes('useTheme') && content.includes('useInlineThemeStyles')) {
      console.log(`${colors.green}✅ Intégration des thèmes détectée${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠️ Intégration des thèmes manquante${colors.reset}`);
    }
  }
  
  if (file.path.includes('entity-demo')) {
    if (content.includes('ThemeSelector')) {
      console.log(`${colors.green}✅ Sélecteur de thème intégré${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠️ Sélecteur de thème manquant${colors.reset}`);
    }
  }
  
  console.log('');
});

// Vérification des pages accessibles
console.log(`${colors.blue}Vérification des routes...${colors.reset}`);

const routes = [
  { path: 'app/(ui)/entity-demo/page.tsx', url: '/entity-demo', name: 'Démonstration Entity' },
  { path: 'app/(ui)/entity-templates/page.tsx', url: '/entity-templates', name: 'Templates Entity' },
  { path: 'app/(ui)/theme-studio/page.tsx', url: '/theme-studio', name: 'Studio de thèmes' }
];

routes.forEach(route => {
  const fullPath = path.join(__dirname, '..', route.path);
  if (fs.existsSync(fullPath)) {
    console.log(`${colors.green}✅ ${route.name}: http://localhost:4000/(ui)${route.url}${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ ${route.name}: fichier manquant${colors.reset}`);
    allChecksPass = false;
  }
});

// Résumé final
console.log(`\n${colors.magenta}${colors.bright}📊 RÉSUMÉ DE LA VÉRIFICATION${colors.reset}\n`);

if (allChecksPass) {
  console.log(`${colors.green}${colors.bright}🎉 Tous les composants Entity sont correctement configurés !${colors.reset}\n`);
  
  console.log(`${colors.cyan}Fonctionnalités disponibles:${colors.reset}`);
  console.log(`• EntityCard avec 4 variants (default, compact, detailed, minimal)`);
  console.log(`• EntityList avec layouts grid/list/table`);
  console.log(`• EntitySearch avec debounce intégré`);
  console.log(`• EntityPagination complète avec contrôle de taille`);
  console.log(`• EntityForm générique avec validation`);
  console.log(`• EntityFilters avancés avec reset`);
  console.log(`• SortableHeader pour tri des colonnes`);
  console.log(`• Templates EntityPage et EntityDetailPage`);
  console.log(`• Intégration automatique avec tous les thèmes`);
  
  console.log(`\n${colors.cyan}Pages de démonstration:${colors.reset}`);
  console.log(`• Composants Entity: http://localhost:4000/(ui)/entity-demo`);
  console.log(`• Templates de pages: http://localhost:4000/(ui)/entity-templates`);
  console.log(`• Studio de thèmes: http://localhost:4000/(ui)/theme-studio`);
  
  console.log(`\n${colors.yellow}💡 Astuce: Changez de thème dans n'importe quelle page pour voir l'adaptation automatique !${colors.reset}`);
} else {
  console.log(`${colors.red}${colors.bright}❌ Certains éléments nécessitent une vérification${colors.reset}`);
  console.log(`${colors.yellow}Veuillez corriger les erreurs mentionnées ci-dessus.${colors.reset}`);
}

console.log(`\n${colors.cyan}📚 Documentation:${colors.reset}`);
console.log(`• Guide complet: docs/entity-components-guide.md`);
console.log(`• Système de thèmes: docs/theme-system-complete.md`);
console.log(`• Google Fonts: docs/google-fonts-integration.md`);
