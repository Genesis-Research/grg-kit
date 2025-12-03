const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

/**
 * LLM Prompts command - generates LLM-specific prompts and rules
 * Helps AI assistants understand GRG Kit design system and use MCP server
 */
async function llmPrompts(options) {
  const outputDir = options.output || '.windsurf/rules';
  
  console.log(chalk.bold.cyan('\n🤖 Generating LLM Prompts and Rules\n'));

  // Step 1: Create output directory
  const spinner = ora('Creating rules directory...').start();
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

  // Success message
  console.log(chalk.bold.green('\n✨ LLM prompts and rules generated successfully!\n'));
  console.log(chalk.gray('Files created:'));
  console.log(chalk.cyan(`  ${outputDir}/design-system.md`));
  console.log(chalk.cyan(`  ${outputDir}/grg-kit-mcp.md`));
  
  console.log(chalk.yellow('\nNext steps:'));
  console.log(chalk.gray('  1. These rules will be automatically picked up by Windsurf/Cascade'));
  console.log(chalk.gray('  2. Make sure the grg-kit MCP server is configured in your IDE'));
  console.log(chalk.gray('  3. AI will now check GRG Kit resources before writing custom code'));
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

**ALWAYS use pnpm** instead of npm for all package management operations:
- \`pnpm install\` instead of \`npm install\`
- \`pnpm add\` instead of \`npm install <package>\`
- \`pnpm remove\` instead of \`npm uninstall\`

This design system provides a comprehensive foundation for building consistent, accessible, and maintainable Angular applications using modern UI patterns and best practices.
`;
}

function generateMCPRules() {
  return `---
trigger: always_on
---

# GRG Kit MCP Server Integration

## Critical Workflow

**BEFORE writing ANY UI component, layout, or page, you MUST:**

1. **Search for existing resources** using the MCP server
2. **Install if found** - don't reinvent the wheel
3. **Only write custom code** if no suitable resource exists

## MCP Server Tools

The \`grg-kit\` MCP server provides these tools:

### 1. search_ui_resources (USE THIS FIRST!)

Search for UI resources by keyword. **This should be your FIRST action** when building UI.

\`\`\`typescript
// Example: User asks for a form
search_ui_resources({
  query: "form",
  category: "all" // or "themes", "components", "layouts", "examples"
})

// Returns: matching resources with install commands
\`\`\`

**When to use:**
- User asks for any UI component
- Building a new page or layout
- Need examples of how to use a component
- Looking for a theme

### 2. suggest_resources

Get AI-powered suggestions based on user requirements.

\`\`\`typescript
// Example: User says "build a login page"
suggest_resources({
  requirement: "I need a login page"
})

// Returns: layout:auth, examples:form-field, examples:input, etc.
\`\`\`

**When to use:**
- User describes what they want to build
- Need recommendations for a specific use case
- Want to see what's available for a feature

### 3. get_resource_details

Get detailed information about a specific resource.

\`\`\`typescript
get_resource_details({
  resource: "theme:claude"
})

// Returns: full metadata, dependencies, tags, install command
\`\`\`

**When to use:**
- Need to know dependencies before installing
- Want to understand what a resource provides
- Checking compatibility

### 4. install_resource

Install a resource into the project.

\`\`\`typescript
install_resource({
  resource: "theme:claude",
  output: "src/themes" // optional
})

// Executes: grg add theme:claude
\`\`\`

**When to use:**
- After finding a suitable resource
- User explicitly asks to install something
- Building a feature that needs specific components

### 5. list_available_resources

List all resources by category.

\`\`\`typescript
list_available_resources({
  category: "all" // or specific category
})

// Returns: complete catalog with counts
\`\`\`

**When to use:**
- User asks "what's available?"
- Need to show options
- Exploring the catalog

## Workflow Examples

### Example 1: User Wants a Dashboard

\`\`\`
User: "Create a dashboard with a sidebar"

AI Workflow:
1. search_ui_resources({ query: "dashboard" })
   → Finds: layout:dashboard, examples:navigation-menu, examples:card
   
2. get_resource_details({ resource: "layout:dashboard" })
   → Check what it includes
   
3. install_resource({ resource: "layout:dashboard" })
   → Install the layout
   
4. install_resource({ resource: "examples:navigation-menu" })
   → Install navigation examples
   
5. Use the installed code as a base
   → Customize as needed
\`\`\`

### Example 2: User Wants Form Components

\`\`\`
User: "I need a form with validation"

AI Workflow:
1. search_ui_resources({ query: "form" })
   → Finds: component:stepper, examples:form-field, examples:input
   
2. suggest_resources({ requirement: "form with validation" })
   → Get recommendations
   
3. install_resource({ resource: "examples:form-field" })
   → Install form field examples
   
4. install_resource({ resource: "examples:input" })
   → Install input examples
   
5. Build the form using installed examples
   → Follow the patterns from examples
\`\`\`

### Example 3: User Wants a Theme

\`\`\`
User: "Add a nice theme to my app"

AI Workflow:
1. list_available_resources({ category: "themes" })
   → Show available themes
   
2. Present options to user
   → Let them choose
   
3. install_resource({ resource: "theme:claude" })
   → Install chosen theme
   
4. Verify installation
   → Check src/styles.css for import
\`\`\`

## Available Resources

### Themes (6 available)
- \`theme:grg-theme\` - Default GRG Kit theme
- \`theme:claude\` - Claude-inspired theme
- \`theme:modern-minimal\` - Modern minimal theme
- \`theme:vibrant\` - Vibrant color theme
- \`theme:dark-pro\` - Professional dark theme
- \`theme:nature\` - Nature-inspired theme

### Components (2+ available)
- \`component:stepper\` - Multi-step form wizard
- More components available via search

### Layouts (3+ available)
- \`layout:dashboard\` - Dashboard with sidebar
- \`layout:auth\` - Authentication pages
- \`layout:landing\` - Landing page template
- More layouts available via search

### Examples (56+ available)
All Spartan-NG components with complete examples:
- \`examples:button\` - Button examples
- \`examples:card\` - Card examples
- \`examples:dialog\` - Dialog examples
- \`examples:form-field\` - Form field examples
- \`examples:table\` - Table examples
- \`examples:all\` - Install ALL examples
- Many more available via search

## Best Practices

### 1. Always Search First
\`\`\`typescript
// ❌ DON'T: Immediately write custom code
// User: "I need a button"
// AI: "Here's a custom button component..."

// ✅ DO: Search for existing resources first
// User: "I need a button"
// AI: search_ui_resources({ query: "button" })
//     → Finds examples:button
//     → install_resource({ resource: "examples:button" })
//     → "I've installed button examples. Let me show you how to use them..."
\`\`\`

### 2. Use Suggestions for Complex Requests
\`\`\`typescript
// User: "Build a user profile page"
// AI: suggest_resources({ requirement: "user profile page" })
//     → Get recommendations for layouts, components, examples
//     → Install relevant resources
//     → Build using installed code
\`\`\`

### 3. Check Details Before Installing
\`\`\`typescript
// Before installing, check what it includes
get_resource_details({ resource: "layout:dashboard" })
// → See dependencies, tags, description
// → Make informed decision
\`\`\`

### 4. Install Examples for Learning
\`\`\`typescript
// When user asks "how do I use X?"
// Install the example instead of explaining
install_resource({ resource: "examples:X" })
// → User can see working code
// → Better than verbal explanation
\`\`\`

## Error Handling

If a resource is not found:
1. Try broader search terms
2. Check if it's a Spartan-NG component (use examples)
3. Only then write custom code
4. Inform user that no pre-built resource exists

## Integration with Design System

After installing resources:
1. Follow the patterns from installed code
2. Use the same import style
3. Maintain consistency with design system
4. Leverage Tailwind CSS v4 for styling

## Remember

- **Search before you code** - GRG Kit has 60+ resources
- **Install examples** - They show best practices
- **Use layouts** - Don't build pages from scratch
- **Leverage themes** - Consistent styling out of the box
- **Check MCP first** - It knows what's available

This workflow ensures you're using GRG Kit to its full potential and providing users with production-ready, consistent code.
`;
}

module.exports = { llmPrompts };
