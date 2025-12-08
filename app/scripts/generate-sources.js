#!/usr/bin/env node
/**
 * Generalized script to generate source code strings from Angular components.
 * 
 * This script:
 * 1. Reads component files from specified source directories
 * 2. Generates TypeScript files with source code as exported strings
 * 3. Optionally copies clean, standalone templates to output directories
 *
 * Run with: pnpm generate:sources
 * Or for specific types: pnpm generate:layouts / pnpm generate:components
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// Configuration
// ============================================================================

const CONFIG = {
  blocks: {
    sourceDir: path.join(__dirname, '../src/app/blocks'),
    outputFile: path.join(__dirname, '../src/app/blocks/generated-sources.ts'),
    templatesDir: path.join(__dirname, '../../templates/ui/blocks'),
    mapName: 'blockSourceMap',
    sources: [
      // Auth blocks
      { id: 'auth-login', name: 'authLoginSource', filePath: 'auth/auth-login-block.component.ts', templateFile: 'auth/login.component.ts' },
      { id: 'auth-register', name: 'authRegisterSource', filePath: 'auth/auth-register-block.component.ts', templateFile: 'auth/register.component.ts' },
      { id: 'auth-forgot-password', name: 'authForgotPasswordSource', filePath: 'auth/auth-forgot-password-block.component.ts', templateFile: 'auth/forgot-password.component.ts' },
      // Shell blocks
      { id: 'shell-sidebar', name: 'shellSidebarSource', filePath: 'shell/shell-sidebar-block.component.ts', templateFile: 'shell/sidebar-shell.component.ts' },
      { id: 'shell-topnav', name: 'shellTopnavSource', filePath: 'shell/shell-topnav-block.component.ts', templateFile: 'shell/topnav-shell.component.ts' },
      { id: 'shell-collapsible', name: 'shellCollapsibleSource', filePath: 'shell/shell-collapsible-block.component.ts', templateFile: 'shell/collapsible-shell.component.ts' },
      // Shell blocks with footer
      { id: 'shell-sidebar-footer', name: 'shellSidebarFooterSource', filePath: 'shell/shell-sidebar-footer-block.component.ts', templateFile: 'shell/sidebar-shell-footer.component.ts' },
      { id: 'shell-topnav-footer', name: 'shellTopnavFooterSource', filePath: 'shell/shell-topnav-footer-block.component.ts', templateFile: 'shell/topnav-shell-footer.component.ts' },
      { id: 'shell-collapsible-footer', name: 'shellCollapsibleFooterSource', filePath: 'shell/shell-collapsible-footer-block.component.ts', templateFile: 'shell/collapsible-shell-footer.component.ts' },
      // Settings blocks
      { id: 'settings-profile', name: 'settingsProfileSource', filePath: 'settings/settings-profile-block.component.ts', templateFile: 'settings/profile-settings.component.ts' },
      { id: 'settings-notifications', name: 'settingsNotificationsSource', filePath: 'settings/settings-notifications-block.component.ts', templateFile: 'settings/notification-settings.component.ts' },
      { id: 'settings-security', name: 'settingsSecuritySource', filePath: 'settings/settings-security-block.component.ts', templateFile: 'settings/security-settings.component.ts' },
      { id: 'settings-danger', name: 'settingsDangerSource', filePath: 'settings/settings-danger-block.component.ts', templateFile: 'settings/danger-zone.component.ts' },
    ],
    transformForTemplate: transformBlockForTemplate,
    generateReadme: generateBlocksReadme,
  },
  components: {
    sourceDir: path.join(__dirname, '../libs/spartan-examples/components'),
    outputFile: path.join(__dirname, '../src/app/components/generated-sources.ts'),
    templatesDir: path.join(__dirname, '../../templates/ui/components'),
    mapName: 'componentSourceMap',
    sources: [], // Will be auto-discovered
    autoDiscover: true,
    transformForTemplate: transformComponentForTemplate,
    generateReadme: generateComponentsReadme,
  },
  grgComponents: {
    sourceDir: path.join(__dirname, '../libs/grg-ui'),
    outputFile: path.join(__dirname, '../src/app/grg-components/generated-sources.ts'),
    templatesDir: path.join(__dirname, '../../templates/ui/components'),
    mapName: 'blockSourceMap',
    sources: [], // Will be auto-discovered
    autoDiscover: true,
    autoDiscoverFn: discoverBlocks,
    transformForTemplate: transformGrgComponentForTemplate,
    generateReadme: generateGrgComponentsReadme,
  },
};

// ============================================================================
// Utility Functions
// ============================================================================

function escapeForTemplate(content) {
  // Escape backticks and ${} for template literal
  return content
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function cleanSourceCode(content) {
  // Remove any existing sourceCode exports to avoid duplication
  const lines = content.split('\n');
  const cleanedLines = [];
  let skipUntilSemicolon = false;

  for (const line of lines) {
    if (line.includes('export const') && (line.includes('SourceCode') || line.includes('Source ='))) {
      skipUntilSemicolon = true;
      continue;
    }
    if (skipUntilSemicolon) {
      if (line.includes('`;')) {
        skipUntilSemicolon = false;
      }
      continue;
    }
    cleanedLines.push(line);
  }

  return cleanedLines.join('\n').trim();
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function toPascalCase(str) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// ============================================================================
// Block-specific Functions (page blocks like auth, shell, settings)
// ============================================================================

function transformBlockForTemplate(content, source) {
  let transformed = content;
  
  // Extract the base name from the id (e.g., 'auth-login' -> 'login')
  const baseName = source.id.replace(/^(auth|shell|settings)-/, '');
  const className = toPascalCase(baseName) + 'Component';
  const selector = 'app-' + baseName;
  
  // Replace selector
  transformed = transformed.replace(
    /selector:\s*'app-[^']+'/,
    `selector: '${selector}'`
  );
  
  // Replace class name
  transformed = transformed.replace(
    /export class \w+BlockComponent/,
    `export class ${className}`
  );
  
  // Add header comment
  const header = `/**
 * ${source.id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} Component
 * 
 * A standalone Angular component ready to use in your project.
 * Copy this file to your project and customize as needed.
 * 
 * Dependencies:
 * - @spartan-ng/helm (UI components)
 * - @ng-icons/lucide (icons)
 * - @angular/forms (if using forms)
 */
`;
  
  return header + transformed;
}

function generateBlocksReadme(templatesDir) {
  const readme = `# Block Templates

> **AUTO-GENERATED** - Do not edit directly.  
> Source of truth: \`app/src/app/blocks/\`  
> Run \`pnpm generate:blocks\` to regenerate.

## Available Blocks

### Authentication
| File | Description |
|------|-------------|
| \`auth/login.component.ts\` | Login form with email/password and Microsoft 365 SSO |
| \`auth/register.component.ts\` | Registration form with password strength indicator |
| \`auth/forgot-password.component.ts\` | Password reset request form |

### App Shell
| File | Description |
|------|--------------|
| \`shell/sidebar-shell.component.ts\` | Classic sidebar navigation layout |
| \`shell/topnav-shell.component.ts\` | Top navigation bar layout |
| \`shell/collapsible-shell.component.ts\` | Collapsible sidebar layout |
| \`shell/sidebar-shell-footer.component.ts\` | Sidebar layout with footer |
| \`shell/topnav-shell-footer.component.ts\` | Top navigation layout with footer |
| \`shell/collapsible-shell-footer.component.ts\` | Collapsible sidebar layout with footer |

### Settings
| File | Description |
|------|-------------|
| \`settings/profile-settings.component.ts\` | User profile settings form |
| \`settings/notification-settings.component.ts\` | Notification preferences |
| \`settings/security-settings.component.ts\` | Security and password settings |
| \`settings/danger-zone.component.ts\` | Destructive actions (delete account) |

## Usage

1. Copy the desired component file to your project
2. Update the selector and class name as needed
3. Import and use in your application

\`\`\`typescript
import { LoginComponent } from './login.component';

@Component({
  imports: [LoginComponent],
  template: \`<app-login (login)="onLogin($event)" />\`
})
export class AuthPage {}
\`\`\`

## Dependencies

- \`@spartan-ng/helm\` - UI components
- \`@ng-icons/lucide\` - Icons
- \`@angular/forms\` - Reactive forms (for auth components)
`;

  fs.writeFileSync(path.join(templatesDir, 'README.md'), readme, 'utf-8');
}

// ============================================================================
// Component-specific Functions
// ============================================================================

function discoverComponents(sourceDir) {
  const sources = [];
  
  if (!fs.existsSync(sourceDir)) {
    console.log(`⚠️  Components source directory not found: ${sourceDir}`);
    return sources;
  }

  const componentDirs = fs.readdirSync(sourceDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('(') && dirent.name.endsWith(')'))
    .map(dirent => dirent.name);

  for (const dir of componentDirs) {
    const componentName = dir.slice(1, -1); // Remove parentheses
    const componentDir = path.join(sourceDir, dir);
    
    // Look for preview file first, then example files
    const files = fs.readdirSync(componentDir);
    
    // Add preview file
    const previewFile = files.find(f => f.endsWith('.preview.ts'));
    if (previewFile) {
      sources.push({
        id: componentName,
        name: `${toCamelCase(componentName)}PreviewSource`,
        filePath: `${dir}/${previewFile}`,
        variant: 'default',
      });
    }
    
    // Add example files
    const exampleFiles = files.filter(f => f.includes('.example.ts'));
    for (const exampleFile of exampleFiles) {
      // Extract variant name from filename (e.g., 'button--destructive.example.ts' -> 'destructive')
      const match = exampleFile.match(/--([^.]+)\.example\.ts$/);
      if (match) {
        const variant = match[1];
        sources.push({
          id: `${componentName}--${variant}`,
          name: `${toCamelCase(componentName)}${toPascalCase(variant)}Source`,
          filePath: `${dir}/${exampleFile}`,
          variant,
          componentName,
        });
      }
    }
  }

  return sources;
}

function transformComponentForTemplate(content, source) {
  // For components, we keep them mostly as-is but add a header
  const header = `/**
 * ${toPascalCase(source.id.replace('--', ' '))} Component
 * 
 * A standalone Angular component example.
 * Copy this file to your project and customize as needed.
 * 
 * Dependencies:
 * - @spartan-ng/helm (UI components)
 * - @ng-icons/lucide (icons)
 */
`;
  
  return header + content;
}

function generateComponentsReadme(templatesDir, sources) {
  // Group sources by component
  const componentGroups = {};
  for (const source of sources) {
    const componentName = source.componentName || source.id;
    if (!componentGroups[componentName]) {
      componentGroups[componentName] = [];
    }
    componentGroups[componentName].push(source);
  }

  let tableRows = '';
  for (const [componentName, variants] of Object.entries(componentGroups)) {
    const variantList = variants.map(v => v.variant || 'default').join(', ');
    tableRows += `| \`${componentName}\` | ${variantList} |\n`;
  }

  const readme = `# Component Templates

> **AUTO-GENERATED** - Do not edit directly.  
> Source of truth: \`app/libs/spartan-examples/components/\`  
> Run \`pnpm generate:components\` to regenerate.

## Available Components

| Component | Variants |
|-----------|----------|
${tableRows}

## Usage

Import the generated source map and use it to display component source code:

\`\`\`typescript
import { componentSourceMap } from './generated-sources';

// Get source code for a specific component variant
const buttonSource = componentSourceMap['button'];
const buttonDestructiveSource = componentSourceMap['button--destructive'];
\`\`\`

## Dependencies

- \`@spartan-ng/helm\` - UI components
- \`@spartan-ng/brain\` - Behavioral components
- \`@ng-icons/lucide\` - Icons
`;

  fs.writeFileSync(path.join(templatesDir, 'README.md'), readme, 'utf-8');
}

// ============================================================================
// Block-specific Functions (grg-ui components)
// ============================================================================

function discoverBlocks(sourceDir) {
  const sources = [];
  
  if (!fs.existsSync(sourceDir)) {
    console.log(`⚠️  Blocks source directory not found: ${sourceDir}`);
    return sources;
  }

  // Get all component directories in grg-ui
  const componentDirs = fs.readdirSync(sourceDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const componentName of componentDirs) {
    const componentDir = path.join(sourceDir, componentName, 'src');
    
    if (!fs.existsSync(componentDir)) {
      continue;
    }

    // Read all files from the lib directory
    const libDir = path.join(componentDir, 'lib');
    if (!fs.existsSync(libDir)) {
      continue;
    }

    const libFiles = fs.readdirSync(libDir)
      .filter(f => f.endsWith('.ts'))
      .sort(); // Sort to ensure consistent order

    // Collect all file contents to merge into single template
    const fileContents = [];
    for (const file of libFiles) {
      const filePath = path.join(libDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      fileContents.push({ file, content });
    }

    // Also read the index.ts for the exports array
    const indexPath = path.join(componentDir, 'index.ts');
    let indexContent = null;
    if (fs.existsSync(indexPath)) {
      indexContent = fs.readFileSync(indexPath, 'utf-8');
    }

    if (fileContents.length > 0) {
      sources.push({
        id: componentName,
        name: `${toCamelCase(componentName)}Source`,
        componentName,
        libDir,
        fileContents,
        indexContent,
        templateFile: `${componentName}/${componentName}.component.ts`,
      });
    }
  }

  return sources;
}

function mergeBlockFiles(fileContents) {
  // Collect all imports
  const imports = new Map(); // module -> Set of imports
  const codeBlocks = [];
  const exports = [];

  for (const { content } of fileContents) {
    const lines = content.split('\n');
    let inImport = false;
    let currentImport = '';
    const nonImportLines = [];

    for (const line of lines) {
      // Handle multi-line imports
      if (line.trim().startsWith('import ')) {
        inImport = true;
        currentImport = line;
        if (line.includes(';')) {
          inImport = false;
          parseImport(currentImport, imports);
          currentImport = '';
        }
        continue;
      }
      
      if (inImport) {
        currentImport += '\n' + line;
        if (line.includes(';')) {
          inImport = false;
          parseImport(currentImport, imports);
          currentImport = '';
        }
        continue;
      }

      // Skip export statements that re-export (we'll add our own)
      if (line.trim().startsWith('export *')) {
        continue;
      }

      // Collect export const for the imports array
      if (line.includes('export const') && line.includes('Imports')) {
        // Extract the exports array definition
        let exportBlock = line;
        let idx = lines.indexOf(line);
        while (!exportBlock.includes('] as const;') && idx < lines.length - 1) {
          idx++;
          exportBlock += '\n' + lines[idx];
        }
        exports.push(exportBlock);
        continue;
      }

      nonImportLines.push(line);
    }

    // Add non-import code
    const code = nonImportLines.join('\n').trim();
    if (code) {
      codeBlocks.push(code);
    }
  }

  // Build merged imports
  const mergedImports = [];
  for (const [module, importSet] of imports) {
    const importList = Array.from(importSet).sort();
    if (importList.length > 0) {
      if (importList.length <= 3) {
        mergedImports.push(`import { ${importList.join(', ')} } from '${module}';`);
      } else {
        mergedImports.push(`import {\n\t${importList.join(',\n\t')},\n} from '${module}';`);
      }
    }
  }

  return {
    imports: mergedImports.join('\n'),
    code: codeBlocks.join('\n\n'),
    exports: exports.join('\n\n'),
  };
}

function parseImport(importStatement, imports) {
  // Parse import { A, B, C } from 'module';
  // or import { A, B, type C } from 'module';
  // or import type { A } from 'module';
  const match = importStatement.match(/import\s*(type\s*)?\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/s);
  if (match) {
    const isTypeOnlyImport = !!match[1];
    const importedItems = match[2]
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    const module = match[3];
    
    if (!imports.has(module)) {
      imports.set(module, new Set());
    }
    
    for (let item of importedItems) {
      // If the whole import is type-only, prefix each item
      if (isTypeOnlyImport && !item.startsWith('type ')) {
        item = 'type ' + item;
      }
      imports.get(module).add(item);
    }
  }
}

function transformGrgComponentForTemplate(content, source) {
  // For grg components, we merge all lib files into a single template file
  const { imports, code } = mergeBlockFiles(source.fileContents);
  
  // Extract exports array from index.ts
  let exportsArray = '';
  if (source.indexContent) {
    const match = source.indexContent.match(/export const \w+Imports = \[[\s\S]*?\] as const;/);
    if (match) {
      exportsArray = match[0];
    }
  }
  
  const header = `/**
 * ${toPascalCase(source.componentName)} Component
 *
 * A flexible ${source.componentName.replace(/-/g, ' ')} component for Angular applications.
 *
 * Copy this file to your project and customize as needed.
 *
 * Dependencies:
 * - @spartan-ng/helm (UI components)
 * - class-variance-authority (styling variants)
 * - clsx (class utilities)
 *
 * Usage:
 * 1. Copy this file to your project (e.g., libs/ui/${source.componentName}/)
 * 2. Add path mapping in tsconfig.json:
 *    "@grg-kit/ui/${source.componentName}": ["./libs/ui/${source.componentName}/${source.componentName}.component.ts"]
 * 3. Import Grg${toPascalCase(source.componentName)}Imports in your component
 */

`;

  return header + imports + '\n\n' + code + (exportsArray ? '\n\n' + exportsArray : '');
}

function generateGrgComponentsReadme(templatesDir, sources) {
  let tableRows = '';
  for (const source of sources) {
    const fileCount = source.fileContents ? source.fileContents.length : 0;
    tableRows += `| \`${source.componentName}\` | ${fileCount} parts merged into single file |\n`;
  }

  const readme = `# GRG-Kit Component Templates

> **AUTO-GENERATED** - Do not edit directly.  
> Source of truth: \`app/libs/grg-ui/\`  
> Run \`pnpm generate:grgComponents\` to regenerate.

## Available Components

| Component | Description |
|-----------|-------------|
${tableRows}

## Usage

Each component is a single-file template that can be copied to your project:

\`\`\`typescript
import { GrgFileUploadImports } from '@grg-kit/ui/file-upload';

@Component({
  imports: [GrgFileUploadImports],
  template: \`
    <grg-file-upload [(files)]="files">
      <grg-file-upload-trigger>
        Drop files here
      </grg-file-upload-trigger>
    </grg-file-upload>
  \`
})
export class MyComponent {}
\`\`\`

## Dependencies

- \`@spartan-ng/helm\` - UI utilities
- \`class-variance-authority\` - Styling variants
- \`clsx\` - Class utilities
`;

  // Write to the grg-kit specific location
  const grgReadmePath = path.join(templatesDir, 'grg-kit-README.md');
  fs.writeFileSync(grgReadmePath, readme, 'utf-8');
}

// ============================================================================
// Core Generation Logic
// ============================================================================

function generateSourcesForType(type, config) {
  console.log(`\n🔄 Generating ${type} sources...\n`);

  let sources = config.sources;
  
  // Auto-discover sources if configured
  if (config.autoDiscover) {
    // Use custom discover function if provided, otherwise use default
    const discoverFn = config.autoDiscoverFn || discoverComponents;
    sources = discoverFn(config.sourceDir);
    if (sources.length === 0) {
      console.log(`⚠️  No ${type} found to process`);
      return { exports: [], mapEntries: [], templatesGenerated: 0 };
    }
  }

  const exports = [];
  const mapEntries = [];
  let templatesGenerated = 0;

  for (const source of sources) {
    try {
      let content;
      
      // Handle blocks with fileContents (multiple files merged)
      if (source.fileContents) {
        // For blocks, generate the merged template content
        const templateContent = config.transformForTemplate(null, source);
        content = templateContent;
        
        // Write template file
        if (source.templateFile && config.templatesDir) {
          const templatePath = path.join(config.templatesDir, source.templateFile);
          ensureDir(path.dirname(templatePath));
          fs.writeFileSync(templatePath, templateContent, 'utf-8');
          templatesGenerated++;
        }
      } else {
        // Handle single file sources (layouts, components)
        const fullPath = path.join(config.sourceDir, source.filePath);

        if (!fs.existsSync(fullPath)) {
          console.log(`⚠️  Skipping ${source.id}: File not found at ${source.filePath}`);
          exports.push(`export const ${source.name} = '// Source code not available';`);
          mapEntries.push(`  '${source.id}': ${source.name},`);
          continue;
        }

        content = fs.readFileSync(fullPath, 'utf-8');
        content = cleanSourceCode(content);

        // Generate standalone template file if configured
        if (source.templateFile && config.templatesDir) {
          const templateContent = config.transformForTemplate(content, source);
          const templatePath = path.join(config.templatesDir, source.templateFile);
          ensureDir(path.dirname(templatePath));
          fs.writeFileSync(templatePath, templateContent, 'utf-8');
          templatesGenerated++;
        }
      }
      
      // Generate escaped source for code view
      const escaped = escapeForTemplate(content);
      exports.push(`export const ${source.name} = \`${escaped}\`;`);
      mapEntries.push(`  '${source.id}': ${source.name},`);

      console.log(`✅ ${source.id}`);
    } catch (error) {
      console.error(`❌ Error processing ${source.id}:`, error.message);
      exports.push(`export const ${source.name} = '// Error loading source code';`);
      mapEntries.push(`  '${source.id}': ${source.name},`);
    }
  }

  return { exports, mapEntries, templatesGenerated, sources };
}

function writeOutputFile(config, exports, mapEntries, type) {
  ensureDir(path.dirname(config.outputFile));
  
  const output = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 * Generated by: scripts/generate-sources.js
 * Run: pnpm generate:${type}
 * 
 * Source of truth: ${config.sourceDir.replace(path.join(__dirname, '..'), 'app')}
 */

${exports.join('\n\n')}

// Map of ${type} IDs to their source code
export const ${config.mapName}: Record<string, string> = {
${mapEntries.join('\n')}
};
`;

  fs.writeFileSync(config.outputFile, output, 'utf-8');
}

// ============================================================================
// Main Entry Point
// ============================================================================

function main() {
  const args = process.argv.slice(2);
  const types = args.length > 0 ? args : ['blocks', 'components', 'grgComponents'];

  console.log('🚀 Source Code Generator');
  console.log('========================');

  for (const type of types) {
    if (!CONFIG[type]) {
      console.error(`❌ Unknown type: ${type}`);
      console.log(`   Available types: ${Object.keys(CONFIG).join(', ')}`);
      continue;
    }

    const config = CONFIG[type];
    const { exports, mapEntries, templatesGenerated, sources } = generateSourcesForType(type, config);

    if (exports.length > 0) {
      writeOutputFile(config, exports, mapEntries, type);
      
      // Generate README if configured
      if (config.generateReadme && config.templatesDir) {
        ensureDir(config.templatesDir);
        config.generateReadme(config.templatesDir, sources);
      }

      console.log(`\n✨ ${type} done!`);
      console.log(`   📄 Sources: ${config.outputFile}`);
      if (config.templatesDir) {
        console.log(`   📁 Templates: ${config.templatesDir} (${templatesGenerated} files)`);
      }
    }
  }

  console.log('\n🎉 All done!');
}

// Run the script
main();
