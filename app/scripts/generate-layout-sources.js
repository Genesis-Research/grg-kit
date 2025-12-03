#!/usr/bin/env node
/**
 * Script to generate layout sources from app/layouts (source of truth).
 * 
 * This script:
 * 1. Reads layout components from app/src/app/layouts/
 * 2. Generates generated-sources.ts for the demo code view
 * 3. Copies clean, standalone templates to templates/ui/layouts/
 *
 * Run with: pnpm generate:layouts
 */

const fs = require('fs');
const path = require('path');

const LAYOUTS_DIR = path.join(__dirname, '../src/app/layouts');
const OUTPUT_FILE = path.join(LAYOUTS_DIR, 'generated-sources.ts');
const TEMPLATES_DIR = path.join(__dirname, '../../templates/ui/layouts');

// Define all layout components to process
// filePath: source in app/layouts, templateFile: output in templates/ui/layouts
const layoutSources = [
  // Auth layouts
  { id: 'auth-login', name: 'authLoginSource', filePath: 'auth/auth-login-layout.component.ts', templateFile: 'auth/login.component.ts' },
  { id: 'auth-register', name: 'authRegisterSource', filePath: 'auth/auth-register-layout.component.ts', templateFile: 'auth/register.component.ts' },
  { id: 'auth-forgot-password', name: 'authForgotPasswordSource', filePath: 'auth/auth-forgot-password-layout.component.ts', templateFile: 'auth/forgot-password.component.ts' },
  // Shell layouts
  { id: 'shell-sidebar', name: 'shellSidebarSource', filePath: 'shell/shell-sidebar-layout.component.ts', templateFile: 'shell/sidebar-shell.component.ts' },
  { id: 'shell-topnav', name: 'shellTopnavSource', filePath: 'shell/shell-topnav-layout.component.ts', templateFile: 'shell/topnav-shell.component.ts' },
  { id: 'shell-collapsible', name: 'shellCollapsibleSource', filePath: 'shell/shell-collapsible-layout.component.ts', templateFile: 'shell/collapsible-shell.component.ts' },
  // Settings layouts
  { id: 'settings-profile', name: 'settingsProfileSource', filePath: 'settings/settings-profile-layout.component.ts', templateFile: 'settings/profile-settings.component.ts' },
  { id: 'settings-notifications', name: 'settingsNotificationsSource', filePath: 'settings/settings-notifications-layout.component.ts', templateFile: 'settings/notification-settings.component.ts' },
  { id: 'settings-security', name: 'settingsSecuritySource', filePath: 'settings/settings-security-layout.component.ts', templateFile: 'settings/security-settings.component.ts' },
  { id: 'settings-danger', name: 'settingsDangerSource', filePath: 'settings/settings-danger-layout.component.ts', templateFile: 'settings/danger-zone.component.ts' },
];

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
    if (line.includes('export const') && line.includes('SourceCode') || line.includes('Source =')) {
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

/**
 * Transform source code for standalone template use.
 * - Simplifies selector names (removes 'auth-', 'shell-', 'settings-' prefixes and '-layout' suffix)
 * - Simplifies class names
 * - Adds header comment
 */
function transformForTemplate(content, layout) {
  let transformed = content;
  
  // Extract the base name from the id (e.g., 'auth-login' -> 'login')
  const baseName = layout.id.replace(/^(auth|shell|settings)-/, '');
  const className = baseName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Component';
  const selector = 'app-' + baseName;
  
  // Replace selector
  transformed = transformed.replace(
    /selector:\s*'app-[^']+'/,
    `selector: '${selector}'`
  );
  
  // Replace class name (handles both patterns like AuthLoginLayoutComponent and SettingsProfileLayoutComponent)
  transformed = transformed.replace(
    /export class \w+LayoutComponent/,
    `export class ${className}`
  );
  
  // Add header comment
  const header = `/**
 * ${layout.id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} Component
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

/**
 * Ensure directory exists, create if not
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function generateSources() {
  console.log('🔄 Generating layout sources from app/layouts...\n');

  const exports = [];
  const mapEntries = [];
  let templatesGenerated = 0;

  for (const layout of layoutSources) {
    const fullPath = path.join(LAYOUTS_DIR, layout.filePath);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Skipping ${layout.id}: File not found at ${layout.filePath}`);
      exports.push(`export const ${layout.name} = '// Source code not available';`);
      mapEntries.push(`  '${layout.id}': ${layout.name},`);
      continue;
    }

    try {
      let content = fs.readFileSync(fullPath, 'utf-8');
      content = cleanSourceCode(content);
      
      // 1. Generate escaped source for demo code view
      const escaped = escapeForTemplate(content);
      exports.push(`export const ${layout.name} = \`${escaped}\`;`);
      mapEntries.push(`  '${layout.id}': ${layout.name},`);

      // 2. Generate standalone template file
      if (layout.templateFile) {
        const templateContent = transformForTemplate(content, layout);
        const templatePath = path.join(TEMPLATES_DIR, layout.templateFile);
        ensureDir(path.dirname(templatePath));
        fs.writeFileSync(templatePath, templateContent, 'utf-8');
        templatesGenerated++;
      }

      console.log(`✅ ${layout.id}`);
    } catch (error) {
      console.error(`❌ Error processing ${layout.filePath}:`, error);
      exports.push(`export const ${layout.name} = '// Error loading source code';`);
      mapEntries.push(`  '${layout.id}': ${layout.name},`);
    }
  }

  // Generate the demo sources file
  const output = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 * Generated by: scripts/generate-layout-sources.js
 * Run: pnpm generate:layouts
 * 
 * Source of truth: app/src/app/layouts/
 */

${exports.join('\n\n')}

// Map of layout IDs to their source code
export const layoutSourceMap: Record<string, string> = {
${mapEntries.join('\n')}
};
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  
  // Generate README for templates
  generateTemplatesReadme();
  
  console.log(`\n✨ Done!`);
  console.log(`   📄 Demo sources: ${OUTPUT_FILE}`);
  console.log(`   📁 Templates: ${TEMPLATES_DIR} (${templatesGenerated} files)`);
}

function generateTemplatesReadme() {
  const readme = `# Layout Templates

> **AUTO-GENERATED** - Do not edit directly.  
> Source of truth: \`app/src/app/layouts/\`  
> Run \`pnpm generate:layouts\` to regenerate.

## Available Layouts

### Authentication
| File | Description |
|------|-------------|
| \`auth/login.component.ts\` | Login form with email/password and Microsoft 365 SSO |
| \`auth/register.component.ts\` | Registration form with password strength indicator |
| \`auth/forgot-password.component.ts\` | Password reset request form |

### App Shell
| File | Description |
|------|-------------|
| \`shell/sidebar-shell.component.ts\` | Classic sidebar navigation layout |
| \`shell/topnav-shell.component.ts\` | Top navigation bar layout |
| \`shell/collapsible-shell.component.ts\` | Collapsible sidebar layout |

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

  fs.writeFileSync(path.join(TEMPLATES_DIR, 'README.md'), readme, 'utf-8');
}

// Run the script
generateSources();
