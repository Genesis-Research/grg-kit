# Spartan-NG Component Examples

This directory contains comprehensive examples of all Spartan-NG components with various usage patterns and variants.

## Purpose

These examples are designed to help developers and LLMs understand:
- Component usage patterns
- Available variants and configurations
- Import requirements
- Template syntax
- Best practices

## Structure

Each component directory follows this pattern:

```
(component-name)/
├── component-name.preview.ts           # Basic preview component
├── component-name.page.ts              # Full page with all examples
├── component-name--variant.example.ts  # Specific variant examples
└── component-name--feature.example.ts  # Feature-specific examples
```

## Installation

### Pull All Examples

```bash
npx degit Genesis-Research/grg-kit/templates/spartan-examples ./src/app/spartan-examples --mode=git
```

### Pull Specific Component Examples

```bash
# Example: Pull button examples
npx degit Genesis-Research/grg-kit/templates/spartan-examples/components/(button) ./src/app/examples/button --mode=git

# Example: Pull dialog examples
npx degit Genesis-Research/grg-kit/templates/spartan-examples/components/(dialog) ./src/app/examples/dialog --mode=git
```

## Available Components

- **accordion** - Collapsible content sections
- **alert** - Status messages and notifications
- **alert-dialog** - Confirmation and alert dialogs
- **aspect-ratio** - Responsive containers with fixed aspect ratios
- **autocomplete** - Search-enabled input controls
- **avatar** - User profile images with fallbacks
- **badge** - Status indicators and tags
- **breadcrumb** - Hierarchical navigation indicators
- **button** - Interactive buttons with multiple variants
- **button-group** - Grouped button controls
- **calendar** - Date selection interfaces
- **card** - Content containers with header, content, and footer
- **carousel** - Image and content carousels
- **checkbox** - Boolean input controls
- **collapsible** - Expandable/collapsible content
- **combobox** - Searchable select controls
- **command** - Command palette and search interfaces
- **context-menu** - Right-click context menus
- **data-table** - Advanced data tables with sorting and filtering
- **date-picker** - Date input controls
- **dialog** - Modal dialogs and popups
- **dropdown-menu** - Dropdown menu controls
- **empty** - Empty state components
- **field** - Form field components
- **form-field** - Complete form fields with validation
- **hover-card** - Content previews on hover
- **icon** - Icon components
- **input** - Form input fields
- **input-group** - Grouped input controls
- **input-otp** - One-time password inputs
- **item** - List item components
- **kbd** - Keyboard shortcut displays
- **label** - Form labels
- **menubar** - Application menu bars
- **navigation-menu** - Primary navigation menus
- **pagination** - Data pagination controls
- **popover** - Contextual content overlays
- **progress** - Progress indicators
- **radio-group** - Single-choice selection controls
- **resizable** - Resizable panels
- **scroll-area** - Custom scrollable containers
- **select** - Dropdown selection controls
- **separator** - Visual dividers
- **sheet** - Slide-out panels
- **sidebar** - Application sidebars
- **skeleton** - Loading state placeholders
- **slider** - Range input controls
- **sonner** - Toast notifications
- **switch** - Toggle switches
- **table** - Data tables
- **tabs** - Tabbed interfaces
- **textarea** - Multi-line text inputs
- **toast** - Toast notifications
- **toggle** - Toggle buttons
- **toggle-group** - Grouped toggle controls
- **tooltip** - Contextual tooltips

## Usage

After pulling examples, you can:

1. **Reference the code patterns** for implementing components
2. **Copy specific examples** into your components
3. **Learn from the imports** and configuration
4. **Understand variants** and customization options

## Example Usage

```typescript
// From button.preview.ts
import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'button-preview',
  imports: [HlmButtonImports],
  template: `
    <button hlmBtn>Button</button>
  `,
})
export class ButtonPreview {}
```

## For LLMs

These examples provide:
- **Complete working code** for each component
- **Import patterns** following Spartan-NG conventions
- **Template syntax** with proper directives
- **Variant examples** showing all available options
- **Best practices** for component composition

Use these examples as reference when generating code that uses Spartan-NG components.
