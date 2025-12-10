# grg-kit

A shared resource library for Angular UI applications with themes, components, blocks, and spartan-ng examples.

## Prerequisites

- **Node.js**: v20.19+ or v22.12+
- **Angular**: v21+

## Setup

### 1. Install GRG CLI

```bash
npm install -g grg-kit-cli
```

### 2. Create Angular Project & Initialize GRG Kit

```bash
# Create Angular project first
ng new my-app --style=css
cd my-app

# Initialize GRG Kit
grg init
# or with a specific theme
grg init --theme claude
```

This installs Tailwind CSS v4, Spartan-NG, theme, and examples into your Angular project.

## Quick Start

```bash
# Create Angular project
ng new my-app --style=css
cd my-app

# Initialize GRG Kit (installs theme + all components + spartan-ng examples)
grg init

# Or with a specific theme
grg init --theme claude

# Add or switch theme
grg add theme claude

# Add blocks (all files)
grg add block auth
grg add block shell

# Add specific files from a block
grg add block auth login
grg add block shell sidebar

# Add components
grg add component file-upload

# List available resources
grg list
```

## Commands

| Command | Description |
|---------|-------------|
| `grg init` | Installs Tailwind v4, Spartan-NG, theme, components, and examples in current Angular project |
| `grg init --theme <name>` | Same with custom theme |
| `grg add theme <name>` | Add or switch theme in existing project |
| `grg add block <name>` | Add all files from a block (auth, shell, settings) |
| `grg add block <name> <files...>` | Add specific files from a block |
| `grg add block --all` | Add all blocks |
| `grg add component <name>` | Add GRG Kit component (file-upload) |
| `grg list` | List available blocks, themes, and components |
| `grg list blocks` | List available blocks |
| `grg list themes` | List available themes |
| `grg list components` | List available components |

## Available Resources

### Themes

Pre-built theme files with Tailwind CSS v4, spartan-ng integration, and light/dark mode support.

| Theme | Description |
|-------|-------------|
| `grg-theme` | Default theme with purple/orange accents |
| `claude` | Claude-inspired warm tones |
| `clean-slate` | Minimal grayscale palette |
| `modern-minimal` | Contemporary minimal design |
| `amber-minimal` | Warm amber accents |
| `mocks` | Theme for mockups and prototypes |

### Blocks

Page blocks that can be added individually.

| Block | Description |
|-------|-------------|
| `auth` | Authentication pages: `login`, `register`, `forgot-password` |
| `shell` | App shell layouts: `sidebar`, `sidebar-footer`, `topnav`, `topnav-footer`, `collapsible`, `collapsible-footer` |
| `settings` | Settings pages: `profile`, `security`, `notification`, `danger-zone` |

```bash
# Add entire block (all files)
grg add block auth
grg add block shell
grg add block settings

# Add specific files only
grg add block auth login                # Just login
grg add block auth login register       # Login and register
grg add block shell sidebar             # Just sidebar shell
grg add block shell topnav topnav-footer  # Topnav variants

# Add all blocks
grg add block --all
```

### Components & Examples

Components and spartan-ng examples are installed automatically via `grg init`:
- **2 GRG components** (file-upload)
- **56+ spartan-ng examples** (accordion, alert, button, card, dialog, form-field, table, etc.)

## MCP Server Integration

For AI assistants to automatically discover and use GRG Kit resources:

```bash
# Install CLI (includes MCP server)
npm install -g grg-kit-cli grg-kit-mcp-server
```

Configure your AI assistant (Windsurf, Cursor, Claude Code):

```json
{
  "mcpServers": {
    "grg-kit": {
      "command": "grg-mcp-server"
    }
  }
}
```

Generate AI rules:

```bash
grg llm-setup
```

## License

MIT
