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
  }
};

// Example component descriptions
const EXAMPLE_DESCRIPTIONS = {
  'accordion': 'Collapsible content sections examples',
  'alert': 'Status messages and notifications examples',
  'alert-dialog': 'Confirmation and alert dialogs examples',
  'aspect-ratio': 'Responsive containers with fixed aspect ratios examples',
  'autocomplete': 'Search-enabled input controls examples',
  'avatar': 'User profile images with fallbacks examples',
  'badge': 'Status indicators and tags examples',
  'breadcrumb': 'Hierarchical navigation indicators examples',
  'button': 'Interactive buttons with multiple variants examples',
  'button-group': 'Grouped button controls examples',
  'calendar': 'Date selection interfaces examples',
  'card': 'Content containers with header, content, and footer examples',
  'carousel': 'Image and content carousels examples',
  'checkbox': 'Boolean input controls examples',
  'collapsible': 'Expandable/collapsible content examples',
  'combobox': 'Searchable select controls examples',
  'command': 'Command palette and search interfaces examples',
  'context-menu': 'Right-click context menus examples',
  'data-table': 'Advanced data tables with sorting and filtering examples',
  'date-picker': 'Date input controls examples',
  'dialog': 'Modal dialogs and popups examples',
  'dropdown-menu': 'Dropdown menu controls examples',
  'empty': 'Empty state components examples',
  'field': 'Form field components examples',
  'form-field': 'Complete form fields with validation examples',
  'hover-card': 'Content previews on hover examples',
  'icon': 'Icon components examples',
  'input': 'Form input fields examples',
  'input-group': 'Grouped input controls examples',
  'input-otp': 'One-time password inputs examples',
  'item': 'List item components examples',
  'kbd': 'Keyboard shortcut displays examples',
  'label': 'Form labels examples',
  'menubar': 'Application menu bars examples',
  'navigation-menu': 'Primary navigation menus examples',
  'pagination': 'Data pagination controls examples',
  'popover': 'Contextual content overlays examples',
  'progress': 'Progress indicators examples',
  'radio-group': 'Single-choice selection controls examples',
  'resizable': 'Resizable panels examples',
  'scroll-area': 'Custom scrollable containers examples',
  'select': 'Dropdown selection controls examples',
  'separator': 'Visual dividers examples',
  'sheet': 'Slide-out panels examples',
  'sidebar': 'Application sidebars examples',
  'skeleton': 'Loading state placeholders examples',
  'slider': 'Range input controls examples',
  'sonner': 'Toast notifications examples',
  'spinner': 'Loading spinners examples',
  'switch': 'Toggle switches examples',
  'table': 'Data tables examples',
  'tabs': 'Tabbed interfaces examples',
  'textarea': 'Multi-line text inputs examples',
  'toast': 'Toast notifications examples',
  'toggle': 'Toggle buttons examples',
  'toggle-group': 'Grouped toggle controls examples',
  'tooltip': 'Contextual tooltips examples'
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
  const blocksDir = path.join(TEMPLATES_DIR, 'ui/layouts');
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
        path: `templates/ui/layouts/${dir.name}`,
        defaultOutput: `src/app/blocks/${dir.name}`,
        tags: metadata.tags,
        dependencies: metadata.dependencies
      };
    });
}

function generateExamples() {
  const examplesDir = path.join(TEMPLATES_DIR, 'spartan-examples/components');
  const dirs = scanDirectory(examplesDir);
  
  const components = dirs
    .filter(dir => dir.isDirectory() && dir.name.startsWith('('))
    .map(dir => {
      const name = dir.name.replace(/[()]/g, '');
      const description = EXAMPLE_DESCRIPTIONS[name] || `${name} examples`;
      
      return {
        name,
        title: name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Examples',
        description,
        path: `templates/spartan-examples/components/${dir.name}`,
        defaultOutput: `src/app/examples/${name}`,
        tags: [name, 'example', 'spartan-ng']
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  
  return {
    all: {
      name: 'all',
      title: 'All Spartan-NG Examples',
      description: `Complete collection of ${components.length}+ Spartan-NG component examples with usage patterns and variants`,
      path: 'templates/spartan-examples',
      defaultOutput: 'src/app/spartan-examples',
      tags: ['examples', 'spartan-ng', 'all', 'reference'],
      count: `${components.length}+`,
      purpose: 'Learning and reference for developers and LLMs'
    },
    components
  };
}

function generateResourcesFile() {
  console.log('🔍 Scanning templates directory...');
  
  const themes = generateThemes();
  const components = generateComponents();
  const blocks = generateBlocks();
  const examples = generateExamples();
  
  console.log(`✓ Found ${themes.length} themes`);
  console.log(`✓ Found ${components.length} components`);
  console.log(`✓ Found ${blocks.length} blocks`);
  console.log(`✓ Found ${examples.components.length} example components`);
  
  const output = `/**
 * Resource definitions for GRG Kit
 * This file is auto-generated from templates directory
 * Run: node scripts/generate-resources.js to update
 */

const RESOURCES = ${JSON.stringify({ themes, components, blocks, examples }, null, 2)};

const REPO = 'Genesis-Research/grg-kit';

module.exports = { RESOURCES, REPO };
`;
  
  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`\n✅ Generated ${OUTPUT_FILE}`);
  console.log('\n📦 Resource Summary:');
  console.log(`   Themes: ${themes.length}`);
  console.log(`   Components: ${components.length}`);
  console.log(`   Blocks: ${blocks.length}`);
  console.log(`   Examples: ${examples.components.length}`);
}

// Run the generator
generateResourcesFile();
