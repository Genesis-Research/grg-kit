---
trigger: always_on
---

# GRG Kit Design System Rules

## Overview

This project uses **GRG Kit**, a comprehensive Angular UI toolkit built on top of **Spartan-NG UI**. The design system is organized into two main layers:

- **Brain (`@spartan-ng/brain`)**: Provides unstyled, accessible behavioral components
- **Helm (`@spartan-ng/helm`)**: Provides styled visual components built on top of Brain components
- **GRG Kit (`@grg-kit/ui`)**: Custom components with `grg-` prefix

## Critical Rules

### 1. Always Check GRG Kit First
**BEFORE writing any UI component, layout, or page:**
1. Use the MCP server to search for existing resources: `search_ui_resources`
2. Check if a component, layout, or example already exists
3. Only write custom code if no suitable resource exists

### 2. Component Organization

**Spartan-NG Components** (in `libs/ui/`):
- Use `hlm` prefix for directives
- Import via `HlmComponentImports`
- Example: `HlmButtonImports`, `HlmCardImports`

**GRG Kit Components** (in `libs/grg-ui/`):
- Use `grg-` prefix for selectors
- Import via `GrgComponentImports`
- Example: `GrgFileUploadImports`
- Path alias: `@grg-kit/ui/component-name`

### 3. Import Patterns

#### Standard Spartan-NG Import
```typescript
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  imports: [HlmButtonImports, HlmAlertImports, HlmCardImports],
  // ...
})
```

#### Complex Components (Brain + Helm)
```typescript
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';

@Component({
  imports: [BrnDialogImports, HlmDialogImports],
  // ...
})
```

#### GRG Kit Components
```typescript
import { GrgFileUploadImports } from '@grg-kit/ui/file-upload';

@Component({
  imports: [GrgFileUploadImports],
  template: `
    <grg-file-upload>
      <grg-file-upload-trigger>Drop files here</grg-file-upload-trigger>
    </grg-file-upload>
  `
})
```

## Component Usage Patterns

### Basic Components

#### Button
```typescript
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
```

#### Input
```typescript
// Basic input
<input hlmInput type="email" placeholder="Email" />

// With sizing
<input class="w-80" hlmInput type="email" placeholder="Email" />
```

### Composite Components

#### Alert
```typescript
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
```

#### Card
```typescript
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
```

#### Form Field
```typescript
<hlm-form-field>
  <input class="w-80" hlmInput [formControl]="control" type="email" placeholder="Email" />
  <hlm-hint>This is your email address.</hlm-hint>
  <hlm-error>The email is required.</hlm-error>
</hlm-form-field>
```

### Interactive Components

#### Dialog
```typescript
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
```

## Styling Patterns

### TailwindCSS v4 Integration
The design system uses TailwindCSS v4 syntax for all styling:

```typescript
// Layout classes
class="flex flex-col gap-4"
class="grid grid-cols-2 gap-2"
class="w-full max-w-sm"

// Responsive design
class="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center"

// State-based styling
[attr.data-state]="row.getIsSelected() && 'selected'"
```

## TailwindCSS Best Practices (CRITICAL)

### NEVER Use Raw Color Classes

**FORBIDDEN - Do NOT use these patterns:**
```typescript
// ❌ WRONG - Raw Tailwind colors
class="text-green-600 bg-green-100"     // No raw green
class="text-red-500 bg-red-50"          // No raw red
class="text-yellow-600 bg-yellow-100"   // No raw yellow
class="text-blue-500 bg-blue-100"       // No raw blue
class="border-gray-200"                 // No raw gray
class="text-slate-700"                  // No raw slate
```

**REQUIRED - Use semantic color tokens:**
```typescript
// ✅ CORRECT - Semantic colors from design system
class="text-foreground"                 // Primary text
class="text-muted-foreground"           // Secondary/muted text
class="bg-background"                   // Page background
class="bg-card"                         // Card background
class="bg-muted"                        // Muted/subtle background
class="bg-primary text-primary-foreground"  // Primary actions
class="bg-secondary text-secondary-foreground"  // Secondary elements
class="bg-destructive text-destructive-foreground"  // Errors/danger
class="bg-accent text-accent-foreground"  // Accents/highlights
class="border-border"                   // Standard borders
class="border-input"                    // Input borders
```

### Available Semantic Colors

These are the ONLY colors you should use (defined in `styles.css` and theme files):

| Token | Usage |
|-------|-------|
| `background` / `foreground` | Page background and primary text |
| `card` / `card-foreground` | Card containers |
| `popover` / `popover-foreground` | Popovers, dropdowns |
| `primary` / `primary-foreground` | Primary buttons, links |
| `secondary` / `secondary-foreground` | Secondary actions |
| `muted` / `muted-foreground` | Subtle backgrounds, secondary text |
| `accent` / `accent-foreground` | Highlights, hover states |
| `destructive` / `destructive-foreground` | Errors, delete actions |
| `border` | Standard borders |
| `input` | Form input borders |
| `ring` | Focus rings |
| `chart-1` through `chart-5` | Chart/data visualization colors |
| `sidebar-*` | Sidebar-specific colors |

### Adding New Semantic Colors

If you need a color that doesn't exist (e.g., success, warning, info):

**Step 1: Add CSS variables to `src/styles.css`:**
```css
:root {
  /* Existing variables... */
  
  /* Add new semantic color with BOTH light and dark values */
  --success: oklch(0.72 0.19 142);           /* Green for light mode */
  --success-foreground: oklch(1 0 0);        /* White text */
  
  --warning: oklch(0.75 0.18 85);            /* Amber for light mode */
  --warning-foreground: oklch(0.2 0 0);      /* Dark text */
  
  --info: oklch(0.65 0.15 250);              /* Blue for light mode */
  --info-foreground: oklch(1 0 0);           /* White text */
}

.dark {
  /* Dark mode equivalents */
  --success: oklch(0.65 0.17 142);
  --success-foreground: oklch(1 0 0);
  
  --warning: oklch(0.70 0.16 85);
  --warning-foreground: oklch(0.15 0 0);
  
  --info: oklch(0.60 0.14 250);
  --info-foreground: oklch(1 0 0);
}
```

**Step 2: Register in `@theme inline` block (in theme file):**
```css
@theme inline {
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}
```

**Step 3: Now use in templates:**
```typescript
class="bg-success text-success-foreground"  // Success states
class="bg-warning text-warning-foreground"  // Warning states
class="bg-info text-info-foreground"        // Info states
```

### Typography Best Practices

**NEVER use arbitrary font sizes:**
```typescript
// ❌ WRONG - Arbitrary sizes
class="text-[13px]"     // No arbitrary values
class="text-[1.1rem]"   // No arbitrary values
```

**USE the Tailwind typography scale:**
```typescript
// ✅ CORRECT - Standard typography scale
class="text-xs"    // 0.75rem (12px)
class="text-sm"    // 0.875rem (14px)
class="text-base"  // 1rem (16px) - default body
class="text-lg"    // 1.125rem (18px)
class="text-xl"    // 1.25rem (20px)
class="text-2xl"   // 1.5rem (24px)
class="text-3xl"   // 1.875rem (30px)
class="text-4xl"   // 2.25rem (36px)
```

**Font weights:**
```typescript
class="font-normal"    // 400
class="font-medium"    // 500
class="font-semibold"  // 600
class="font-bold"      // 700
```

**Font families (from theme):**
```typescript
class="font-sans"   // System UI font stack
class="font-mono"   // Monospace for code
class="font-serif"  // Serif for special cases
```

### Spacing Best Practices

**USE the standard spacing scale:**
```typescript
// ✅ CORRECT - Standard spacing
class="p-4"      // 1rem
class="gap-2"    // 0.5rem
class="mt-6"     // 1.5rem
class="space-y-4" // 1rem between children
```

**AVOID arbitrary spacing unless absolutely necessary:**
```typescript
// ❌ AVOID - Arbitrary spacing
class="p-[13px]"  // Use p-3 or p-4 instead
```

### Dark Mode Support

All semantic colors automatically support dark mode. The theme system handles this via:
- `:root` for light mode values
- `.dark` or `[data-theme="theme-name"].dark` for dark mode values

**You do NOT need to add `dark:` prefixes** when using semantic colors:
```typescript
// ✅ CORRECT - Semantic colors auto-adapt
class="bg-background text-foreground"  // Works in both light and dark

// ❌ WRONG - Manual dark mode with raw colors
class="bg-white dark:bg-gray-900"  // Don't do this
```

### Component Variants
Components support multiple variants through the `variant` attribute:

```typescript
// Button variants
variant="default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

// Alert variants  
variant="default" | "destructive"

// Badge variants
variant="default" | "secondary" | "destructive" | "outline"
```

### Size Variants
Many components support size variants:

```typescript
// Button sizes
size="default" | "sm" | "lg" | "icon"

// Icon sizes
size="sm" | "md" | "lg"
```

## Icon Integration

### Lucide Icons with ng-icons
The design system integrates with Lucide icons through the ng-icons library:

```typescript
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleCheck, lucideCircleAlert } from '@ng-icons/lucide';

@Component({
  imports: [NgIcon, HlmIcon],
  providers: [provideIcons({ lucideCircleCheck, lucideCircleAlert })],
  template: `
    <ng-icon hlm hlmAlertIcon name="lucideCircleCheck" />
    <ng-icon hlm name="lucideChevronDown" class="ml-2" size="sm" />
  `
})
```

## Advanced Patterns

### Data Tables
For complex data display, use TanStack Table integration:

```typescript
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
```

### Form Integration
Use Angular Reactive Forms with form field components:

```typescript
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, HlmFormFieldImports],
  template: `
    <hlm-form-field>
      <input hlmInput [formControl]="emailControl" type="email" />
      <hlm-error>Email is required.</hlm-error>
    </hlm-form-field>
  `
})
export class FormComponent {
  emailControl = new FormControl('', Validators.required);
}
```

## Best Practices

### Component Composition
1. **Import Consistency**: Always use `HlmComponentImports` for importing related components
2. **Variant Usage**: Leverage built-in variants before creating custom styles
3. **Accessibility**: Brain components provide accessibility features - don't override them
4. **Icon Integration**: Use the ng-icons + Lucide pattern for consistent iconography

### Styling Guidelines
1. **TailwindCSS First**: Use Tailwind classes for layout and spacing
2. **Component Variants**: Use component variants for semantic styling
3. **Responsive Design**: Apply responsive classes following mobile-first approach
4. **State Management**: Use Angular signals for reactive state management

### Code Organization
1. **Reusable Components**: Add new reusable components to `libs/ui/` (Spartan) or `libs/grg-ui/` (GRG Kit)
2. **Example Components**: Keep examples in `libs/examples/` for documentation
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
- **File Upload**: Drag and drop file upload component

## Package Manager

Use npm for package management operations:
- `npm install` for installing dependencies
- `npm install <package>` for adding packages
- `npm uninstall` for removing packages

This design system provides a comprehensive foundation for building consistent, accessible, and maintainable Angular applications using modern UI patterns and best practices.
