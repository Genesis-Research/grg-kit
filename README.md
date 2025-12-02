# grg-kit

A shared resource library for Angular UI applications. Pull specific resources into your projects using [degit](https://github.com/Rich-Harris/degit).

## Installation

```bash
# Install degit globally (optional)
npm install -g degit
```

## Available Resources

### Themes

Pre-built theme files with Tailwind CSS v4, spartan-ng integration, and light/dark mode support.

```bash
# Pull all themes
npx degit your-username/grg-kit/ui/themes ./src/styles/themes

# Pull a specific theme
npx degit your-username/grg-kit/ui/themes/grg-theme.css ./src/styles/theme.css
```

| Theme | Description |
|-------|-------------|
| `grg-theme.css` | Default theme with purple/orange accents |
| `claude.css` | Claude-inspired warm tones |
| `clean-slate.css` | Minimal grayscale palette |
| `modern-minimal.css` | Contemporary minimal design |
| `amber-minimal.css` | Warm amber accents |
| `mocks.css` | Theme for mockups and prototypes |

### Components

Reusable Angular component snippets.

```bash
# Pull all components
npx degit your-username/grg-kit/ui/components ./src/app/components

# Pull a specific component
npx degit your-username/grg-kit/ui/components/button ./src/app/components/button
```

### Layouts

Page layout templates and patterns.

```bash
# Pull all layouts
npx degit your-username/grg-kit/ui/layouts ./src/app/layouts

# Pull a specific layout
npx degit your-username/grg-kit/ui/layouts/dashboard ./src/app/layouts/dashboard
```

### Utils

Utility functions, directives, and pipes.

```bash
# Pull all utilities
npx degit your-username/grg-kit/ui/utils ./src/app/utils

# Pull a specific utility
npx degit your-username/grg-kit/ui/utils/validators ./src/app/utils/validators
```

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
