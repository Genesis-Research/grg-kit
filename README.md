# grg-kit

A shared resource library for Angular UI applications with themes, components, blocks, and spartan-ng examples.

## Prerequisites & Setup

### 1. Install GRG CLI

```bash
pnpm install -g grg-kit-cli
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

# Add blocks
grg add block --auth
grg add block --shell

# List available resources
grg list
```

## Commands

| Command | Description |
|---------|-------------|
| `grg init` | Installs Tailwind v4, Spartan-NG, theme, components, and examples in current Angular project |
| `grg init --theme <name>` | Same with custom theme |
| `grg add block --<name>` | Add a block (auth, shell, settings) |
| `grg add block --all` | Add all blocks |
| `grg list` | List available blocks and themes |
| `grg list blocks` | List available blocks |
| `grg list themes` | List available themes |

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
| `auth` | Authentication pages (login, signup, forgot password) |
| `shell` | Application shell with sidebar, header, and content area |
| `settings` | Settings page with sidebar navigation |

```bash
grg add block --auth
grg add block --shell
grg add block --settings
grg add block --all
```

### Components & Examples

Components and spartan-ng examples are installed automatically via `grg init`:
- **2 GRG components** (stepper, file-upload)
- **56+ spartan-ng examples** (accordion, alert, button, card, dialog, form-field, table, etc.)

## MCP Server Integration

For AI assistants to automatically discover and use GRG Kit resources:

```bash
# Install CLI and MCP server
pnpm install -g grg-kit-cli @grg-kit/mcp-server
```

Configure your AI assistant (Windsurf, Cursor):

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
