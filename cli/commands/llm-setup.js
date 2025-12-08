const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { RESOURCES } = require('../config/resources');

/**
 * LLM Setup command - generates LLM-specific prompts and rules
 * Helps AI assistants understand GRG Kit design system and use MCP server
 */
async function llmPrompts(options) {
  const outputDir = options.output || '.windsurf/rules';
  const isClaudeOutput = outputDir.includes('.claude') || outputDir.includes('CLAUDE');
  
  console.log(chalk.bold.cyan('\n🤖 Generating LLM Rules\n'));

  const spinner = ora();

  // For Claude Code, generate a single CLAUDE.md file
  if (isClaudeOutput) {
    // Step 1: Create output directory
    spinner.start('Creating directory...');
    try {
      await fs.mkdir(outputDir, { recursive: true });
      spinner.succeed(chalk.green(`✓ Created ${outputDir} directory`));
    } catch (error) {
      spinner.fail(chalk.red('Failed to create directory'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }

    // Step 2: Check if CLAUDE.md already exists
    const claudePath = path.join(outputDir, 'CLAUDE.md');
    let existingContent = '';
    let fileExists = false;
    
    try {
      existingContent = await fs.readFile(claudePath, 'utf-8');
      fileExists = true;
    } catch (error) {
      // File doesn't exist, that's fine
    }

    // Step 3: Generate CLAUDE.md (append GRG Kit section if file exists)
    spinner.start(fileExists ? 'Updating CLAUDE.md...' : 'Generating CLAUDE.md...');
    try {
      const claudeContent = generateClaudeMdRules();
      
      if (fileExists) {
        // Check if GRG Kit section already exists
        if (existingContent.includes('# GRG Kit Project Rules')) {
          // Replace existing GRG Kit section
          const grgKitStart = existingContent.indexOf('# GRG Kit Project Rules');
          const beforeGrgKit = existingContent.substring(0, grgKitStart).trim();
          const newContent = beforeGrgKit ? `${beforeGrgKit}\n\n${claudeContent}` : claudeContent;
          await fs.writeFile(claudePath, newContent);
          spinner.succeed(chalk.green('✓ Updated GRG Kit section in CLAUDE.md'));
        } else {
          // Append GRG Kit section
          const newContent = `${existingContent.trim()}\n\n${claudeContent}`;
          await fs.writeFile(claudePath, newContent);
          spinner.succeed(chalk.green('✓ Appended GRG Kit rules to existing CLAUDE.md'));
        }
      } else {
        await fs.writeFile(claudePath, claudeContent);
        spinner.succeed(chalk.green('✓ Generated CLAUDE.md'));
      }
    } catch (error) {
      spinner.fail(chalk.red('Failed to generate CLAUDE.md'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }

    // Success message for Claude
    console.log(chalk.bold.green('\n✨ Claude Code rules generated successfully!\n'));
    console.log(chalk.gray('File created:'));
    console.log(chalk.cyan(`  ${outputDir}/CLAUDE.md`));
    
    console.log(chalk.yellow('\nNext steps:'));
    console.log(chalk.gray('  1. The CLAUDE.md file will be automatically picked up by Claude Code'));
    console.log(chalk.gray('  2. Make sure the grg-kit MCP server is configured'));
    console.log(chalk.gray('  3. Claude will now check GRG Kit resources before writing custom code'));
    console.log();
    return;
  }

  // For Windsurf and other IDEs, generate multiple rule files
  // Step 1: Create output directory
  spinner.start('Creating rules directory...');
  try {
    await fs.mkdir(outputDir, { recursive: true });
    spinner.succeed(chalk.green(`✓ Created ${outputDir} directory`));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create directory'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Step 2: Generate design-system.md
  spinner.start('Generating design-system.md...');
  try {
    const designSystemContent = generateDesignSystemRules();
    const designSystemPath = path.join(outputDir, 'design-system.md');
    await fs.writeFile(designSystemPath, designSystemContent);
    spinner.succeed(chalk.green('✓ Generated design-system.md'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to generate design-system.md'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Step 3: Generate grg-kit-mcp.md
  spinner.start('Generating grg-kit-mcp.md...');
  try {
    const mcpContent = generateMCPRules();
    const mcpPath = path.join(outputDir, 'grg-kit-mcp.md');
    await fs.writeFile(mcpPath, mcpContent);
    spinner.succeed(chalk.green('✓ Generated grg-kit-mcp.md'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to generate grg-kit-mcp.md'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Step 4: Generate angular-components.md (glob-triggered)
  spinner.start('Generating angular-components.md...');
  try {
    const angularContent = generateAngularComponentRules();
    const angularPath = path.join(outputDir, 'angular-components.md');
    await fs.writeFile(angularPath, angularContent);
    spinner.succeed(chalk.green('✓ Generated angular-components.md'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to generate angular-components.md'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Success message
  console.log(chalk.bold.green('\n✨ LLM rules generated successfully!\n'));
  console.log(chalk.gray('Files created:'));
  console.log(chalk.cyan(`  ${outputDir}/design-system.md`));
  console.log(chalk.cyan(`  ${outputDir}/grg-kit-mcp.md`));
  console.log(chalk.cyan(`  ${outputDir}/angular-components.md`));
  
  console.log(chalk.yellow('\nNext steps:'));
  console.log(chalk.gray('  1. These rules will be automatically picked up by your AI assistant'));
  console.log(chalk.gray('  2. Make sure the grg-kit MCP server is configured in your IDE'));
  console.log(chalk.gray('  3. AI will now check GRG Kit resources before writing custom code'));
  console.log(chalk.gray('\nSupported IDEs: Windsurf, Claude Code, Claude Desktop'));
  console.log();
}

function generateDesignSystemRules() {
  return `---
trigger: always_on
---

# GRG Kit Design System Rules

## Overview

This project uses **GRG Kit**, a comprehensive Angular UI toolkit built on top of **Spartan-NG UI**. The design system is organized into two main layers:

- **Brain (\`@spartan-ng/brain\`)**: Provides unstyled, accessible behavioral components
- **Helm (\`@spartan-ng/helm\`)**: Provides styled visual components built on top of Brain components
- **GRG Kit (\`@grg-kit/ui\`)**: Custom components with \`grg-\` prefix

## Critical Rules

### 1. Always Check GRG Kit First
**BEFORE writing any UI component, layout, or page:**
1. Use the MCP server to search for existing resources: \`search_ui_resources\`
2. Check if a component, layout, or example already exists
3. Only write custom code if no suitable resource exists

### 2. Component Organization

**Spartan-NG Components** (in \`libs/ui/\`):
- Use \`hlm\` prefix for directives
- Import via \`HlmComponentImports\`
- Example: \`HlmButtonImports\`, \`HlmCardImports\`

**GRG Kit Components** (in \`libs/grg-ui/\`):
- Use \`grg-\` prefix for selectors
- Import via \`GrgComponentImports\`
- Example: \`GrgStepperImports\`
- Path alias: \`@grg-kit/ui/component-name\`

### 3. Import Patterns

#### Standard Spartan-NG Import
\`\`\`typescript
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  imports: [HlmButtonImports, HlmAlertImports, HlmCardImports],
  // ...
})
\`\`\`

#### Complex Components (Brain + Helm)
\`\`\`typescript
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';

@Component({
  imports: [BrnDialogImports, HlmDialogImports],
  // ...
})
\`\`\`

#### GRG Kit Components
\`\`\`typescript
import { GrgStepperImports } from '@grg-kit/ui/stepper';

@Component({
  imports: [GrgStepperImports],
  template: \`
    <grg-stepper>
      <grg-step>...</grg-step>
    </grg-stepper>
  \`
})
\`\`\`

## Component Usage Patterns

### Basic Components

#### Button
\`\`\`typescript
// Basic usage
<button hlmBtn>Button</button>

// With variants
<button hlmBtn variant="destructive">Destructive</button>
<button hlmBtn variant="outline">Outline</button>
<button hlmBtn variant="ghost">Ghost</button>
<button hlmBtn variant="link">Link</button>
<button hlmBtn variant="secondary">Secondary</button>

// With sizes
<button hlmBtn size="sm">Small</button>
<button hlmBtn size="lg">Large</button>
\`\`\`

#### Input
\`\`\`typescript
// Basic input
<input hlmInput type="email" placeholder="Email" />

// With sizing
<input class="w-80" hlmInput type="email" placeholder="Email" />
\`\`\`

### Composite Components

#### Alert
\`\`\`typescript
<div hlmAlert>
  <ng-icon hlm hlmAlertIcon name="lucideCircleCheck" />
  <h4 hlmAlertTitle>Success! Your changes have been saved</h4>
  <p hlmAlertDescription>This is an alert with icon, title and description.</p>
</div>

// Destructive variant
<div hlmAlert variant="destructive">
  <ng-icon hlm hlmAlertIcon name="lucideCircleAlert" />
  <h4 hlmAlertTitle>Unable to process your payment.</h4>
  <div hlmAlertDescription>
    <p>Please verify your billing information and try again.</p>
  </div>
</div>
\`\`\`

#### Card
\`\`\`typescript
<section hlmCard>
  <div hlmCardHeader>
    <h3 hlmCardTitle>Card Title</h3>
    <p hlmCardDescription>Card Description</p>
    <div hlmCardAction>
      <button hlmBtn variant="link">Action</button>
    </div>
  </div>
  <div hlmCardContent>
    <!-- Card content -->
  </div>
  <div hlmCardFooter>
    <!-- Card footer -->
  </div>
</section>
\`\`\`

#### Form Field
\`\`\`typescript
<hlm-form-field>
  <input class="w-80" hlmInput [formControl]="control" type="email" placeholder="Email" />
  <hlm-hint>This is your email address.</hlm-hint>
  <hlm-error>The email is required.</hlm-error>
</hlm-form-field>
\`\`\`

### Interactive Components

#### Dialog
\`\`\`typescript
<hlm-dialog>
  <button brnDialogTrigger hlmBtn variant="outline">Open Dialog</button>
  <hlm-dialog-content *brnDialogContent="let ctx">
    <hlm-dialog-header>
      <h3 hlmDialogTitle>Edit profile</h3>
      <p hlmDialogDescription>Make changes to your profile here.</p>
    </hlm-dialog-header>
    <div class="grid gap-4">
      <!-- Dialog content -->
    </div>
    <hlm-dialog-footer>
      <button hlmBtn variant="outline" brnDialogClose>Cancel</button>
      <button hlmBtn type="submit">Save changes</button>
    </hlm-dialog-footer>
  </hlm-dialog-content>
</hlm-dialog>
\`\`\`

## Styling Patterns

### TailwindCSS v4 Integration
The design system uses TailwindCSS v4 syntax for all styling:

\`\`\`typescript
// Layout classes
class="flex flex-col gap-4"
class="grid grid-cols-2 gap-2"
class="w-full max-w-sm"

// Responsive design
class="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center"

// State-based styling
[attr.data-state]="row.getIsSelected() && 'selected'"
\`\`\`

### Component Variants
Components support multiple variants through the \`variant\` attribute:

\`\`\`typescript
// Button variants
variant="default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

// Alert variants  
variant="default" | "destructive"

// Badge variants
variant="default" | "secondary" | "destructive" | "outline"
\`\`\`

### Size Variants
Many components support size variants:

\`\`\`typescript
// Button sizes
size="default" | "sm" | "lg" | "icon"

// Icon sizes
size="sm" | "md" | "lg"
\`\`\`

## Icon Integration

### Lucide Icons with ng-icons
The design system integrates with Lucide icons through the ng-icons library:

\`\`\`typescript
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleCheck, lucideCircleAlert } from '@ng-icons/lucide';

@Component({
  imports: [NgIcon, HlmIcon],
  providers: [provideIcons({ lucideCircleCheck, lucideCircleAlert })],
  template: \`
    <ng-icon hlm hlmAlertIcon name="lucideCircleCheck" />
    <ng-icon hlm name="lucideChevronDown" class="ml-2" size="sm" />
  \`
})
\`\`\`

## Advanced Patterns

### Data Tables
For complex data display, use TanStack Table integration:

\`\`\`typescript
import {
  createAngularTable,
  flexRenderComponent,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';

// Define columns with flexRenderComponent for custom cells
const columns: ColumnDef<DataType>[] = [
  {
    id: 'select',
    header: () => flexRenderComponent(TableHeadSelection),
    cell: () => flexRenderComponent(TableRowSelection),
  },
  // ... other columns
];
\`\`\`

### Form Integration
Use Angular Reactive Forms with form field components:

\`\`\`typescript
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, HlmFormFieldImports],
  template: \`
    <hlm-form-field>
      <input hlmInput [formControl]="emailControl" type="email" />
      <hlm-error>Email is required.</hlm-error>
    </hlm-form-field>
  \`
})
export class FormComponent {
  emailControl = new FormControl('', Validators.required);
}
\`\`\`

## Best Practices

### Component Composition
1. **Import Consistency**: Always use \`HlmComponentImports\` for importing related components
2. **Variant Usage**: Leverage built-in variants before creating custom styles
3. **Accessibility**: Brain components provide accessibility features - don't override them
4. **Icon Integration**: Use the ng-icons + Lucide pattern for consistent iconography

### Styling Guidelines
1. **TailwindCSS First**: Use Tailwind classes for layout and spacing
2. **Component Variants**: Use component variants for semantic styling
3. **Responsive Design**: Apply responsive classes following mobile-first approach
4. **State Management**: Use Angular signals for reactive state management

### Code Organization
1. **Reusable Components**: Add new reusable components to \`libs/ui/\` (Spartan) or \`libs/grg-ui/\` (GRG Kit)
2. **Example Components**: Keep examples in \`libs/examples/\` for documentation
3. **Import Grouping**: Group imports by source (Angular, third-party, internal)
4. **Type Safety**: Use TypeScript interfaces for component props and data structures

## Available Resources

### Basic Components
- **Button**: Interactive buttons with multiple variants and sizes
- **Input**: Form input fields with consistent styling
- **Label**: Form labels with proper accessibility
- **Badge**: Status indicators and tags
- **Avatar**: User profile images with fallbacks

### Layout Components
- **Card**: Content containers with header, content, and footer sections
- **Separator**: Visual dividers between content sections
- **Aspect Ratio**: Responsive containers with fixed aspect ratios
- **Scroll Area**: Custom scrollable containers

### Form Components
- **Form Field**: Complete form field with validation and hints
- **Checkbox**: Boolean input controls
- **Radio Group**: Single-choice selection controls
- **Select**: Dropdown selection controls
- **Autocomplete**: Search-enabled selection controls

### Navigation Components
- **Breadcrumb**: Hierarchical navigation indicators
- **Navigation Menu**: Primary navigation menus
- **Menubar**: Application menu bars
- **Pagination**: Data pagination controls

### Overlay Components
- **Dialog**: Modal dialogs and popups
- **Alert Dialog**: Confirmation and alert dialogs
- **Popover**: Contextual content overlays
- **Hover Card**: Content previews on hover
- **Sheet**: Slide-out panels

### Data Display Components
- **Table**: Data tables with sorting and filtering
- **Data Table**: Advanced data tables with TanStack integration
- **Alert**: Status messages and notifications
- **Progress**: Progress indicators
- **Skeleton**: Loading state placeholders

### Interactive Components
- **Command**: Command palette and search interfaces
- **Combobox**: Searchable select controls
- **Calendar**: Date selection interfaces
- **Date Picker**: Date input controls
- **Slider**: Range input controls

### GRG Kit Custom Components
- **Stepper**: Multi-step form wizard component

## Package Manager

Use npm for package management operations:
- \`npm install\` for installing dependencies
- \`npm install <package>\` for adding packages
- \`npm uninstall\` for removing packages

This design system provides a comprehensive foundation for building consistent, accessible, and maintainable Angular applications using modern UI patterns and best practices.
`;
}

function generateMCPRules() {
  // Dynamically build resource lists from resources.js
  // Note: Spartan-NG components are pre-installed, so we only list GRG Kit resources
  const themes = RESOURCES.themes || [];
  const components = RESOURCES.components || [];
  const blocks = RESOURCES.blocks || [];
  
  const themesList = themes.map(t => `- \`theme:${t.name}\` - ${t.description}`).join('\n');
  const componentsList = components.map(c => `- \`component:${c.name}\` - ${c.description}`).join('\n');
  const blocksList = blocks.map(b => `- \`block:${b.name}\` - ${b.description}`).join('\n');
  
  const totalResources = themes.length + components.length + blocks.length;

  return `---
trigger: always_on
---

# GRG Kit MCP Server Integration

## Setup

Add the grg-kit MCP server to your AI assistant configuration:

**Windsurf:** \`~/.codeium/windsurf/mcp_config.json\`
**Claude Code:** \`~/.claude/settings.json\`
**Claude Desktop (macOS):** \`~/Library/Application Support/Claude/claude_desktop_config.json\`

\`\`\`json
{
  "mcpServers": {
    "grg-kit": {
      "command": "grg-mcp-server"
    }
  }
}
\`\`\`

After adding, restart your IDE for the MCP server to be available.

## Important: Spartan-NG is Pre-installed

**Spartan-NG components are already installed** in this project. You do NOT need to use MCP to install them.

- For Spartan-NG usage patterns → Refer to \`design-system.md\`
- For themes, blocks, and GRG Kit components → Use MCP tools below

## When to Use MCP

Use the MCP server for:
1. **Themes** - Install different color themes
2. **Blocks** - Pre-built page layouts (auth, shell, settings)
3. **GRG Kit Components** - Custom components like stepper, file-upload

**Do NOT use MCP for:**
- Spartan-NG components (button, card, dialog, etc.) - already installed
- Basic UI patterns - see \`design-system.md\`

## MCP Server Tools

The \`grg-kit\` MCP server provides these tools:

### 1. mcp2_search_ui_resources

Search for GRG Kit resources (themes, blocks, components).

\`\`\`typescript
mcp2_search_ui_resources({
  query: "auth",
  category: "all" // or "themes", "components", "blocks"
})
\`\`\`

**When to use:**
- User needs a page layout or block
- Looking for a theme
- Need a GRG Kit component (stepper, file-upload)

### 2. mcp2_suggest_resources

Get suggestions based on user requirements.

\`\`\`typescript
mcp2_suggest_resources({
  requirement: "I need a login page"
})

// Returns: block:auth, theme suggestions
\`\`\`

### 3. mcp2_get_resource_details

Get detailed information about a resource.

\`\`\`typescript
mcp2_get_resource_details({
  resource: "block:auth"
})

// Returns: dependencies, tags, install command
\`\`\`

### 4. mcp2_install_resource

Get the install command for a block. Returns a command to run via run_command tool.

\`\`\`typescript
mcp2_install_resource({
  resource: "auth",  // Just the block name, NOT "block:auth"
  files: ["login"],  // Optional: specific files to install
  output: "src/app/pages/auth" // Optional: custom output directory
})
// Returns: { command: "grg add block auth login", instruction: "Run this command..." }
\`\`\`

**Important:** The resource parameter should be just the block name (e.g., "auth", "shell", "settings"), NOT prefixed with "block:".

### 5. mcp2_list_available_resources

List all available resources.

\`\`\`typescript
mcp2_list_available_resources({
  category: "all" // or "themes", "components", "blocks"
})
\`\`\`

## Workflow Examples

### Example 1: User Wants a Dashboard

\`\`\`
User: "Create a dashboard with a sidebar"

AI Workflow:
1. mcp2_search_ui_resources({ query: "shell sidebar" })
   → Finds: block:shell
   
2. mcp2_install_resource({ resource: "shell", files: ["sidebar"] })
   → Returns command: "grg add block shell sidebar"
   
3. Run the command via run_command tool in the Angular project root
   
4. Customize using Spartan-NG components (from design-system.md)
   → Add cards, tables, etc.
\`\`\`

### Example 2: User Wants a Login Page

\`\`\`
User: "I need a login page"

AI Workflow:
1. mcp2_search_ui_resources({ query: "auth login" })
   → Finds: block:auth
   
2. mcp2_install_resource({ resource: "auth", files: ["login"] })
   → Returns command: "grg add block auth login"
   
3. Run the command via run_command tool in the Angular project root
   
4. Customize as needed
\`\`\`

### Example 3: User Wants a Theme

\`\`\`
User: "Change the theme to something warmer"

AI Workflow:
1. mcp2_list_available_resources({ category: "themes" })
   → Show: claude, amber-minimal, etc.
   
2. Themes are set via: grg init --theme <name>
   → Run: grg init --theme claude
   
3. Update src/styles.css import if needed
\`\`\`

### Example 4: User Wants a Form Component

\`\`\`
User: "I need a multi-step form"

AI Workflow:
1. mcp2_search_ui_resources({ query: "stepper form" })
   → Finds: component:stepper
   
2. Components are included automatically with grg init
   → Just import and use: import { GrgStepperImports } from '@grg-kit/ui/stepper';
   
3. Use with Spartan-NG form components (from design-system.md)
\`\`\`

## Available Resources (${totalResources} total)

### Themes (${themes.length} available)
${themesList}

### GRG Kit Components (${components.length} available)
${componentsList}

### Blocks/Layouts (${blocks.length} available)
${blocksList}

## Decision Tree

\`\`\`
User request:
│
├─ Need a button, card, dialog, form field, table, etc.?
│  └─ Use Spartan-NG (see design-system.md) - ALREADY INSTALLED
│
├─ Need a page layout (dashboard, auth, settings)?
│  └─ Use MCP: mcp2_search_ui_resources({ query: "..." })
│
├─ Need a theme?
│  └─ Use MCP: mcp2_list_available_resources({ category: "themes" })
│
└─ Need stepper, file-upload, or other GRG Kit component?
   └─ Use MCP: mcp2_search_ui_resources({ query: "..." })
\`\`\`

## Remember

- **Spartan-NG is pre-installed** - Don't search for button, card, dialog, etc.
- **Use design-system.md** for Spartan-NG patterns
- **Use MCP** only for themes, blocks, and GRG Kit components
- **Check blocks first** when building pages - don't start from scratch
`;
}

function generateAngularComponentRules() {
  // Spartan-NG components are pre-installed - list the common ones
  const spartanComponents = [
    'accordion', 'alert', 'alert-dialog', 'avatar', 'badge', 'breadcrumb',
    'button', 'calendar', 'card', 'checkbox', 'collapsible', 'combobox',
    'command', 'context-menu', 'data-table', 'date-picker', 'dialog',
    'dropdown-menu', 'form-field', 'hover-card', 'input', 'label', 'menubar',
    'navigation-menu', 'pagination', 'popover', 'progress', 'radio-group',
    'scroll-area', 'select', 'separator', 'sheet', 'sidebar', 'skeleton',
    'slider', 'sonner', 'spinner', 'switch', 'table', 'tabs', 'textarea',
    'toggle', 'tooltip'
  ];
  const componentNames = spartanComponents.join(', ');

  return `---
trigger: glob
globs: ["**/*.component.ts", "**/*.component.html"]
---

# Angular Component Development with GRG Kit

You are editing an Angular component. Before writing UI code:

## Quick Reference

### Spartan-NG Components (Pre-installed)
These components are already available - just import and use them:
${componentNames}

### Import Patterns

**Spartan-NG (hlm prefix):**
\`\`\`typescript
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
\`\`\`

**GRG Kit (grg- prefix):**
\`\`\`typescript
import { GrgStepperImports } from '@grg-kit/ui/stepper';
\`\`\`

### Common Patterns

**Button:**
\`\`\`html
<button hlmBtn>Default</button>
<button hlmBtn variant="outline">Outline</button>
<button hlmBtn variant="destructive">Destructive</button>
\`\`\`

**Card:**
\`\`\`html
<section hlmCard>
  <div hlmCardHeader>
    <h3 hlmCardTitle>Title</h3>
    <p hlmCardDescription>Description</p>
  </div>
  <div hlmCardContent>Content</div>
</section>
\`\`\`

**Form Field:**
\`\`\`html
<hlm-form-field>
  <input hlmInput [formControl]="control" placeholder="Email" />
  <hlm-error>Required</hlm-error>
</hlm-form-field>
\`\`\`

**Dialog:**
\`\`\`html
<hlm-dialog>
  <button brnDialogTrigger hlmBtn>Open</button>
  <hlm-dialog-content *brnDialogContent="let ctx">
    <hlm-dialog-header>
      <h3 hlmDialogTitle>Title</h3>
    </hlm-dialog-header>
    <!-- content -->
  </hlm-dialog-content>
</hlm-dialog>
\`\`\`

### Icons
\`\`\`typescript
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideX } from '@ng-icons/lucide';

@Component({
  providers: [provideIcons({ lucideCheck, lucideX })],
  template: \`<ng-icon hlm name="lucideCheck" />\`
})
\`\`\`

## When to Use MCP

Use MCP only for:
- **Blocks** (auth, shell, settings) - \`mcp2_search_ui_resources({ query: "auth" })\`
- **Themes** - \`mcp2_list_available_resources({ category: "themes" })\`
- **GRG Kit components** (stepper, file-upload) - \`mcp2_search_ui_resources({ query: "stepper" })\`

**Do NOT use MCP for Spartan-NG components** - they are already installed!

## Remember
- Spartan-NG components are pre-installed - just import and use
- Follow existing patterns in the codebase
- Use TailwindCSS v4 for styling
- Prefer signals for state management
`;
}

function generateClaudeMdRules() {
  // Generate a combined CLAUDE.md file for Claude Code
  const themes = RESOURCES.themes || [];
  const components = RESOURCES.components || [];
  const blocks = RESOURCES.blocks || [];
  
  const themesList = themes.map(t => `- \`theme:${t.name}\` - ${t.description}`).join('\n');
  const componentsList = components.map(c => `- \`component:${c.name}\` - ${c.description}`).join('\n');
  const blocksList = blocks.map(b => `- \`block:${b.name}\` - ${b.description}`).join('\n');

  return `# GRG Kit Project Rules

This project uses **GRG Kit**, an Angular UI toolkit built on **Spartan-NG UI**.

## Critical: Check GRG Kit First

**BEFORE writing any UI component:**
1. Use MCP tool \`mcp2_search_ui_resources\` to search for existing resources
2. Check if a component, layout, or block already exists
3. Only write custom code if no suitable resource exists

## Architecture

- **Spartan-NG** (\`@spartan-ng/helm\`): Pre-installed UI components with \`hlm\` prefix
- **GRG Kit** (\`@grg-kit/ui\`): Custom components with \`grg-\` prefix
- **Blocks**: Pre-built page layouts (auth, shell, settings)

## Import Patterns

**Spartan-NG:**
\`\`\`typescript
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
\`\`\`

**GRG Kit:**
\`\`\`typescript
import { GrgStepperImports } from '@grg-kit/ui/stepper';
\`\`\`

## Common Components

**Button:**
\`\`\`html
<button hlmBtn>Default</button>
<button hlmBtn variant="outline">Outline</button>
<button hlmBtn variant="destructive">Destructive</button>
\`\`\`

**Card:**
\`\`\`html
<section hlmCard>
  <div hlmCardHeader>
    <h3 hlmCardTitle>Title</h3>
    <p hlmCardDescription>Description</p>
  </div>
  <div hlmCardContent>Content</div>
</section>
\`\`\`

**Form Field:**
\`\`\`html
<hlm-form-field>
  <input hlmInput [formControl]="control" placeholder="Email" />
  <hlm-error>Required</hlm-error>
</hlm-form-field>
\`\`\`

**Dialog:**
\`\`\`html
<hlm-dialog>
  <button brnDialogTrigger hlmBtn>Open</button>
  <hlm-dialog-content *brnDialogContent="let ctx">
    <hlm-dialog-header>
      <h3 hlmDialogTitle>Title</h3>
    </hlm-dialog-header>
    <!-- content -->
  </hlm-dialog-content>
</hlm-dialog>
\`\`\`

**Icons:**
\`\`\`typescript
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';

@Component({
  providers: [provideIcons({ lucideCheck })],
  template: \`<ng-icon hlm name="lucideCheck" />\`
})
\`\`\`

## MCP Server Tools

Use the \`grg-kit\` MCP server for themes, blocks, and GRG Kit components:

- \`mcp2_search_ui_resources({ query: "auth" })\` - Search resources
- \`mcp2_suggest_resources({ requirement: "login page" })\` - Get suggestions
- \`mcp2_install_resource({ resource: "auth", files: ["login"] })\` - Get install command (returns command to run)
- \`mcp2_list_available_resources({ category: "blocks" })\` - List all

**Note:** \`mcp2_install_resource\` returns a command string. Use \`run_command\` to execute it in the Angular project root.

## Available Resources

### Themes
${themesList}

### GRG Kit Components
${componentsList}

### Blocks
${blocksList}

## Decision Tree

- Need button, card, dialog, form field, table? → Use Spartan-NG (already installed)
- Need page layout (dashboard, auth, settings)? → Use MCP: \`mcp2_search_ui_resources\`
- Need theme? → Use MCP: \`mcp2_list_available_resources({ category: "themes" })\`
- Need stepper, file-upload? → Use MCP: \`mcp2_search_ui_resources\`

## Package Manager

Use npm for package management.

## Styling

Use TailwindCSS v4 for all styling. Prefer signals for state management.
`;
}

module.exports = { llmPrompts };
