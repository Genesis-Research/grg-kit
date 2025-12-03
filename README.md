# grg-kit

A shared resource library for Angular UI applications. Pull specific resources into your projects using [degit](https://github.com/Rich-Harris/degit).

## Prerequisites & Setup

Before using grg-kit resources, set up your Angular project with the required dependencies.

### 1. Install Angular CLI

```bash
# Install Angular CLI globally
npm install -g @angular/cli@latest

# Create a new Angular project with CSS as default stylesheet
ng new my-app --style=css --routing

# Navigate to your project
cd my-app
```

### 2. Install Tailwind CSS

```bash
# Install Tailwind CSS and PostCSS plugin
npm install tailwindcss @tailwindcss/postcss postcss --force
```

Create a `.postcssrc.json` file in the root of your project:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

Add to your `src/styles.css`:

```css
@import "tailwindcss";
```

### 3. Install Spartan-NG

```bash
# Install Spartan-NG CLI
npm install -D @spartan-ng/cli

# Initialize Spartan-NG (this will set up the required dependencies)
npx ng g @spartan-ng/cli:init

# Install specific Spartan components as needed, for example:
npx ng g @spartan-ng/cli:ui button
npx ng g @spartan-ng/cli:ui card
npx ng g @spartan-ng/cli:ui dialog
```

For more Spartan-NG components, visit [spartan-ng.dev](https://www.spartan.ng/).

## Installation

```bash
# Install GRG CLI globally
npm install -g grg-kit-cli
```

## Quick Start

```bash
# Initialize with a theme
grg init

# Add resources
grg add examples:all
grg add component:stepper
grg add layout:dashboard

# List available resources
grg list
```

## Available Resources

### Themes

Pre-built theme files with Tailwind CSS v4, spartan-ng integration, and light/dark mode support.

```bash
# Initialize with default theme
grg init

# Or choose a specific theme
grg init --theme claude
grg add theme:modern-minimal
```

| Theme | Description |
|-------|-------------|
| `grg-theme.css` | Default theme with purple/orange accents |
| `claude.css` | Claude-inspired warm tones |
| `clean-slate.css` | Minimal grayscale palette |
| `modern-minimal.css` | Contemporary minimal design |
| `amber-minimal.css` | Warm amber accents |
| `mocks.css` | Theme for mockups and prototypes |

### Spartan-NG Examples

Comprehensive examples of all Spartan-NG components with usage patterns, variants, and best practices. Perfect for developers and LLMs to understand component implementation.

```bash
# Pull all Spartan-NG examples
grg add examples:all

# Pull specific component examples
grg add examples:button
grg add examples:dialog
grg add examples:form-field

# List all available examples
grg list examples
```

**Includes 50+ component examples** covering accordion, alert, button, card, dialog, form-field, table, and many more.

### Components

Reusable Angular component snippets.

```bash
# Pull a specific component
grg add component:stepper

# List all components
grg list components
```

### Layouts

Page layout templates and patterns.

```bash
# Pull a specific layout
grg add layout:dashboard
grg add layout:auth

# List all layouts
grg list layouts
```

### Utils

Utility functions, directives, and pipes.

```bash
# Pull all utilities
npx degit your-username/grg-kit/ui/utils ./src/app/utils --mode=git

# Pull a specific utility
npx degit your-username/grg-kit/ui/utils/theme-switcher ./src/app/utils/theme-switcher --mode=git
```

| Utility | Description |
|---------|-------------|
| `theme-switcher` | Dark/light theme toggle with service and component |

## Theme Requirements

Themes are designed for Angular projects with:

- **Tailwind CSS v4** with `@theme inline` syntax
- **@angular/cdk** for overlay styles
- **spartan-ng** component library
- **oklch** color space support

### Usage in Angular

1. Import the theme in your `styles.css`:

```css
@import "theme.css";
```

2. Add dark mode toggle by applying `.dark` class to `<html>` or `<body>`.

## Future: MCP Server

An MCP server is planned to enable AI assistants to pull resources programmatically during code generation.

## License

MIT
