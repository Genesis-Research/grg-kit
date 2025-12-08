#!/usr/bin/env node

/**
 * Generate resources.js from actual template files
 * This ensures CLI always has up-to-date resource definitions
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '../../templates');
const OUTPUT_FILE = path.join(__dirname, '../config/resources.js');

// Theme metadata (can be enhanced by reading CSS files)
const THEME_METADATA = {
  'grg-theme.css': {
    description: 'Default theme with purple/orange accents',
    tags: ['default', 'purple', 'orange', 'colorful']
  },
  'claude.css': {
    description: 'Claude-inspired warm tones',
    tags: ['warm', 'orange', 'brown', 'claude']
  },
  'clean-slate.css': {
    description: 'Minimal grayscale palette',
    tags: ['minimal', 'grayscale', 'neutral', 'clean']
  },
  'modern-minimal.css': {
    description: 'Contemporary minimal design',
    tags: ['minimal', 'modern', 'contemporary', 'clean']
  },
  'amber-minimal.css': {
    description: 'Warm amber accents',
    tags: ['minimal', 'warm', 'amber', 'orange']
  },
  'mocks.css': {
    description: 'Theme for mockups and prototypes',
    tags: ['mockup', 'prototype', 'design']
  }
};

// Component metadata
const COMPONENT_METADATA = {
  'stepper': {
    description: 'Multi-step form component with progress indicator',
    tags: ['form', 'wizard', 'multi-step', 'progress'],
    dependencies: ['@spartan-ng/helm/button', '@spartan-ng/helm/card'],
    type: 'grg-component',
    prefix: 'grg'
  }
};

// Block metadata (formerly layouts)
const BLOCK_METADATA = {
  'dashboard': {
    description: 'Full dashboard layout with sidebar and header',
    tags: ['dashboard', 'admin', 'sidebar', 'navigation'],
    dependencies: ['@spartan-ng/helm/button', '@spartan-ng/helm/card', '@spartan-ng/helm/navigation-menu']
  },
  'auth': {
    description: 'Authentication pages layout (login, signup, forgot password)',
    tags: ['auth', 'login', 'signup', 'authentication'],
    dependencies: ['@spartan-ng/helm/button', '@spartan-ng/helm/card', '@spartan-ng/helm/form-field']
  },
  'shell': {
    description: 'Application shell layouts: sidebar, topnav, collapsible - each with optional footer variant',
    tags: ['shell', 'layout', 'sidebar', 'header', 'footer', 'navigation', 'topnav', 'collapsible'],
    dependencies: ['@spartan-ng/helm/button', '@spartan-ng/helm/icon', '@spartan-ng/helm/dropdown-menu']
  },
  'settings': {
    description: 'Settings pages: profile, notifications, security, danger zone',
    tags: ['settings', 'preferences', 'account', 'profile', 'security'],
    dependencies: ['@spartan-ng/helm/button', '@spartan-ng/helm/card', '@spartan-ng/helm/form-field', '@spartan-ng/helm/switch']
  }
};

function scanDirectory(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}`);
    return [];
  }
}

function generateThemes() {
  const themesDir = path.join(TEMPLATES_DIR, 'ui/themes');
  const files = scanDirectory(themesDir);
  
  return files
    .filter(file => file.isFile() && file.name.endsWith('.css'))
    .map(file => {
      const name = file.name.replace('.css', '');
      const metadata = THEME_METADATA[file.name] || {
        description: `${name} theme`,
        tags: []
      };
      
      return {
        name,
        title: name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: metadata.description,
        file: file.name,
        path: `templates/ui/themes/${file.name}`,
        defaultOutput: `src/themes/${file.name}`,
        tags: metadata.tags,
        features: ['dark-mode', 'tailwind-v4', 'spartan-ng', 'oklch']
      };
    });
}

function generateComponents() {
  const componentsDir = path.join(TEMPLATES_DIR, 'ui/components');
  const dirs = scanDirectory(componentsDir);
  
  return dirs
    .filter(dir => dir.isDirectory())
    .map(dir => {
      const metadata = COMPONENT_METADATA[dir.name] || {
        description: `${dir.name} component`,
        tags: [],
        dependencies: []
      };
      
      return {
        name: dir.name,
        title: dir.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Component',
        description: metadata.description,
        path: `templates/ui/components/${dir.name}`,
        defaultOutput: `src/app/components/${dir.name}`,
        tags: metadata.tags,
        dependencies: metadata.dependencies,
        ...(metadata.type && { type: metadata.type }),
        ...(metadata.prefix && { prefix: metadata.prefix })
      };
    });
}

function generateBlocks() {
  const blocksDir = path.join(TEMPLATES_DIR, 'ui/blocks');
  const dirs = scanDirectory(blocksDir);
  
  return dirs
    .filter(dir => dir.isDirectory())
    .map(dir => {
      const metadata = BLOCK_METADATA[dir.name] || {
        description: `${dir.name} block`,
        tags: [dir.name],
        dependencies: []
      };
      
      return {
        name: dir.name,
        title: dir.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Block',
        description: metadata.description,
        path: `templates/ui/blocks/${dir.name}`,
        defaultOutput: `src/app/blocks/${dir.name}`,
        tags: metadata.tags,
        dependencies: metadata.dependencies
      };
    });
}

function generateResourcesFile() {
  console.log('🔍 Scanning templates directory...');
  
  const themes = generateThemes();
  const components = generateComponents();
  const blocks = generateBlocks();
  
  console.log(`✓ Found ${themes.length} themes`);
  console.log(`✓ Found ${components.length} components`);
  console.log(`✓ Found ${blocks.length} blocks`);
  
  const output = `/**
 * Resource definitions for GRG Kit
 * This file is auto-generated from templates directory
 * Run: node scripts/generate-resources.js to update
 *
 * Note: Spartan-NG examples are NOT included here.
 * They are pre-installed via grg init and documented in design-system.md
 */

const RESOURCES = ${JSON.stringify({ themes, components, blocks }, null, 2)};

const REPO = 'Genesis-Research/grg-kit';

module.exports = { RESOURCES, REPO };
`;
  
  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`\n✅ Generated ${OUTPUT_FILE}`);
  console.log('\n📦 Resource Summary:');
  console.log(`   Themes: ${themes.length}`);
  console.log(`   Components: ${components.length}`);
  console.log(`   Blocks: ${blocks.length}`);
}

// Run the generator
generateResourcesFile();
