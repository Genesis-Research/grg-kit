# Design System Documentation

## Overview

This design system is built on top of **Spartan-NG UI**, a modern Angular component library that provides a comprehensive set of reusable components following design system principles. The library is organized into two main layers:

- **Brain (`@spartan-ng/brain`)**: Provides unstyled, accessible behavioral components
- **Helm (`@spartan-ng/helm`)**: Provides styled visual components built on top of Brain components

## Architecture Patterns

### Component Organization

The design system follows a clear organizational structure:

```
libs/
├── ui/                    # Reusable UI components
│   ├── button/
│   ├── alert/
│   ├── card/
│   └── ...
└── examples/              # Usage examples and patterns
    └── components/
        ├── (button)/
        ├── (alert)/
        └── ...
```

### Import Patterns

#### Standard Import Pattern
All components follow a consistent import pattern using `HlmComponentImports`:

```typescript
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  imports: [HlmButtonImports, HlmAlertImports, HlmCardImports],
  // ...
})
```

#### Complex Components with Brain + Helm
For interactive components, import both Brain (behavior) and Helm (styling):

```typescript
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';

@Component({
  imports: [BrnDialogImports, HlmDialogImports],
  // ...
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

## File Organization Patterns

### Example Structure
Each component example follows this structure:

```
(component-name)/
├── component-name.preview.ts           # Main preview component
├── component-name.page.ts              # Page wrapper (if needed)
├── component-name--variant.example.ts  # Variant examples
└── component-name--feature.example.ts  # Feature-specific examples
```

### Preview Component Pattern
Every preview component exports:

```typescript
export class ComponentPreview {
  // Component implementation
}

export const defaultImports = `
import { HlmComponentImports } from '@spartan-ng/helm/component';
`;

export const defaultSkeleton = `
<component-template />
`;
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
1. **Reusable Components**: Add new reusable components to `libs/ui/`
2. **Example Components**: Keep examples in `libs/examples/` for documentation
3. **Import Grouping**: Group imports by source (Angular, third-party, internal)
4. **Type Safety**: Use TypeScript interfaces for component props and data structures

## Component Catalog

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

This design system provides a comprehensive foundation for building consistent, accessible, and maintainable Angular applications using modern UI patterns and best practices.
