#!/usr/bin/env node

/**
 * Generate resources.js from actual template files
 * This ensures CLI always has up-to-date resource definitions
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '../../templates');
const OUTPUT_FILE = path.join(__dirname, '../config/resources.js');
const CATALOG_FILE = path.join(TEMPLATES_DIR, 'catalog.json');

/**
 * Read meta.json from a directory if it exists
 */
function readMeta(dir) {
  const metaPath = path.join(dir, 'meta.json');
  try {
    if (fs.existsSync(metaPath)) {
      return JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    }
  } catch (error) {
    console.warn(`Warning: Could not read ${metaPath}`);
  }
  return null;
}

/**
 * Default metadata generators
 */
function defaultBlockMeta(name) {
  return {
    description: `${name} block`,
    tags: [name],
    dependencies: []
  };
}

function defaultComponentMeta(name) {
  return {
    description: `${name} component`,
    tags: [],
    dependencies: []
  };
}

function defaultThemeMeta(name) {
  return {
    description: `${name} theme`,
    tags: []
  };
}

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
  
  // Read themes meta.json (contains all theme metadata keyed by filename)
  const themesMeta = readMeta(themesDir) || {};
  
  return files
    .filter(file => file.isFile() && file.name.endsWith('.css'))
    .map(file => {
      const name = file.name.replace('.css', '');
      const metadata = themesMeta[file.name] || defaultThemeMeta(name);
      
      return {
        name,
        title: name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: metadata.description,
        file: file.name,
        path: `templates/ui/themes/${file.name}`,
        defaultOutput: `src/themes/${file.name}`,
        tags: metadata.tags || [],
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
      const componentDir = path.join(componentsDir, dir.name);
      const metadata = readMeta(componentDir) || defaultComponentMeta(dir.name);
      
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

/**
 * Convert filename to readable title
 * e.g., 'sidebar-shell-footer.component.ts' -> 'Sidebar Shell Footer'
 */
function fileToTitle(filename) {
  return filename
    .replace('.component.ts', '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Convert filename to id
 * e.g., 'sidebar-shell-footer.component.ts' -> 'sidebar-footer'
 */
function fileToId(filename, blockName) {
  const base = filename.replace('.component.ts', '');
  // Remove block name prefix if present (e.g., 'sidebar-shell' -> 'sidebar')
  return base.replace(`-${blockName}`, '').replace(`${blockName}-`, '');
}

/**
 * Scan block directory for individual component files
 */
function scanBlockFiles(blockDir, blockName) {
  const files = scanDirectory(blockDir);
  
  return files
    .filter(file => file.isFile() && file.name.endsWith('.component.ts'))
    .map(file => {
      const id = fileToId(file.name, blockName);
      const title = fileToTitle(file.name);
      
      return {
        id,
        file: file.name,
        title,
        description: title
      };
    })
    .sort((a, b) => a.file.localeCompare(b.file));
}

function generateBlocks() {
  const blocksDir = path.join(TEMPLATES_DIR, 'ui/blocks');
  const dirs = scanDirectory(blocksDir);
  
  return dirs
    .filter(dir => dir.isDirectory())
    .map(dir => {
      const blockDir = path.join(blocksDir, dir.name);
      const metadata = readMeta(blockDir) || defaultBlockMeta(dir.name);
      
      return {
        name: dir.name,
        title: dir.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: metadata.description,
        path: `templates/ui/blocks/${dir.name}`,
        defaultOutput: `src/app/blocks/${dir.name}`,
        tags: metadata.tags || [],
        dependencies: metadata.dependencies || [],
        files: scanBlockFiles(blockDir, dir.name)  // Always include files
      };
    });
}

/**
 * Generate catalog.json for themes (with features)
 */
function generateThemesForCatalog() {
  const themesDir = path.join(TEMPLATES_DIR, 'ui/themes');
  const files = scanDirectory(themesDir);
  
  // Read themes meta.json
  const themesMeta = readMeta(themesDir) || {};
  
  return files
    .filter(file => file.isFile() && file.name.endsWith('.css'))
    .map(file => {
      const name = file.name.replace('.css', '');
      const metadata = themesMeta[file.name] || defaultThemeMeta(name);
      
      return {
        name,
        title: name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: metadata.description,
        file: file.name,
        tags: metadata.tags || [],
        features: ['dark-mode', 'tailwind-v4', 'spartan-ng', 'oklch']
      };
    });
}

/**
 * Generate catalog.json for components
 */
function generateComponentsForCatalog() {
  const componentsDir = path.join(TEMPLATES_DIR, 'ui/components');
  const dirs = scanDirectory(componentsDir);
  
  return dirs
    .filter(dir => dir.isDirectory())
    .map(dir => {
      const componentDir = path.join(componentsDir, dir.name);
      const metadata = readMeta(componentDir) || defaultComponentMeta(dir.name);
      
      return {
        name: dir.name,
        title: dir.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: metadata.description,
        tags: metadata.tags || [],
        dependencies: metadata.dependencies || []
      };
    });
}

/**
 * Generate catalog.json for blocks (with files)
 */
function generateBlocksForCatalog() {
  const blocksDir = path.join(TEMPLATES_DIR, 'ui/blocks');
  const dirs = scanDirectory(blocksDir);
  
  return dirs
    .filter(dir => dir.isDirectory())
    .map(dir => {
      const blockDir = path.join(blocksDir, dir.name);
      const metadata = readMeta(blockDir) || defaultBlockMeta(dir.name);
      const files = scanBlockFiles(blockDir, dir.name);
      
      return {
        name: dir.name,
        title: dir.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: metadata.description,
        tags: metadata.tags || [],
        dependencies: metadata.dependencies,
        files
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
  
  // Generate resources.js (static fallback for CLI)
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
  
  // Generate catalog.json (dynamic, fetched at runtime)
  const catalogThemes = generateThemesForCatalog();
  const catalogComponents = generateComponentsForCatalog();
  const catalogBlocks = generateBlocksForCatalog();
  
  const totalFiles = catalogBlocks.reduce((sum, b) => sum + (b.files?.length || 0), 0);
  
  // Read CLI version from package.json
  const cliPackage = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
  
  const catalog = {
    _generated: 'AUTO-GENERATED FILE - DO NOT EDIT MANUALLY. Run: npm catalog',
    version: '1.0.1',
    lastUpdated: new Date().toISOString().split('T')[0],
    cli: {
      name: 'grg',
      version: cliPackage.version,
      commands: {
        init: {
          usage: 'grg init [--theme <name>]',
          description: 'Initialize GRG Kit in current Angular project',
          themeFlag: '--theme'
        },
        addTheme: {
          usage: 'grg add theme <themeName>',
          description: 'Add or switch theme in existing project',
          validThemes: catalogThemes.map(t => t.name)
        },
        addBlock: {
          usage: 'grg add block <blockName> [fileIds...]',
          description: 'Add blocks to your project',
          validBlocks: catalogBlocks.map(b => b.name)
        },
        addComponent: {
          usage: 'grg add component <componentName>',
          description: 'Add GRG components to your project',
          validComponents: catalogComponents.map(c => c.name)
        },
        list: {
          usage: 'grg list [category]',
          description: 'List available resources'
        }
      }
    },
    themes: catalogThemes,
    components: catalogComponents,
    blocks: catalogBlocks
  };
  
  fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2));
  console.log(`✅ Generated ${CATALOG_FILE}`);
  
  console.log('\n📦 Resource Summary:');
  console.log(`   Themes: ${themes.length}`);
  console.log(`   Components: ${components.length}`);
  console.log(`   Blocks: ${blocks.length} (${totalFiles} files)`);
}

// Run the generator
generateResourcesFile();
