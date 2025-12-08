# grg-kit-cli

CLI tool for initializing Angular projects with GRG Kit and adding blocks.

## Installation

```bash
pnpm install -g grg-kit-cli
```

## Quick Start

```bash
# Initialize a new Angular project with GRG Kit
grg init my-app

# Initialize with a specific theme
grg init my-app --theme claude

# Add blocks (inside project directory)
cd my-app
grg add block --auth
grg add block --shell
grg add block --all

# List available resources
grg list
grg list blocks
grg list themes
```

## Commands

### `grg init <project-name>`

Create a new Angular project with GRG Kit fully configured. One command to set up everything.

```bash
grg init <project-name> [options]

Options:
  -t, --theme <name>  Theme to install (default: "grg-theme")

Examples:
  grg init my-app
  grg init my-app --theme claude
  grg init dashboard -t modern-minimal
```

**What it does:**
- Creates Angular project with CSS styling
- Installs Tailwind CSS v4 (`tailwindcss @tailwindcss/postcss postcss`)
- Creates `.postcssrc.json` with PostCSS configuration
- Installs and configures Spartan-NG CLI
- Runs `ng g @spartan-ng/cli:ui all` to install all Spartan-NG UI components
- Downloads 56+ Spartan-NG examples to `libs/examples`
- Downloads the selected theme
- Updates `src/styles.css` with theme import

**Available themes:**
- `grg-theme` - Default theme with purple/orange accents
- `claude` - Claude-inspired warm tones
- `clean-slate` - Minimal grayscale palette
- `modern-minimal` - Contemporary minimal design
- `amber-minimal` - Warm amber accents
- `mocks` - Theme for mockups and prototypes

### `grg add block`

Add blocks to your project.

```bash
grg add block [options]

Options:
  --all       Add all blocks
  --auth      Add authentication block (login, signup, forgot password)
  --shell     Add app shell block (sidebar, header, content area)
  --settings  Add settings block (settings page with sidebar navigation)
  -o, --output <path>  Custom output directory

Examples:
  grg add block --auth
  grg add block --shell --settings
  grg add block --all
```

### `grg list [category]`

List available blocks and themes.

```bash
grg list [category]

Examples:
  grg list           # Show overview
  grg list blocks    # List all blocks
  grg list themes    # List all themes
```

### `grg llm-setup`

Generate LLM-specific prompts and rules for AI assistants (Windsurf, Cursor, etc.).

```bash
grg llm-setup [options]

Options:
  -o, --output <path>  Output directory for rules (default: ".windsurf/rules")

Examples:
  grg llm-setup
  grg llm-setup --output .cursor/rules
```

## MCP Server Integration

For AI assistants to automatically discover and use GRG Kit resources:

### 1. Install the MCP Server

```bash
pnpm install -g @grg-kit/mcp-server
```

### 2. Configure Your AI Assistant

**Windsurf** (`~/.codeium/windsurf/mcp_config.json`):

```json
{
  "mcpServers": {
    "grg-kit": {
      "command": "grg-mcp-server"
    }
  }
}
```

**Cursor** (`~/.cursor/mcp_config.json`):

```json
{
  "mcpServers": {
    "grg-kit": {
      "command": "grg-mcp-server"
    }
  }
}
```

### 3. Generate AI Rules

```bash
cd your-angular-project
grg llm-setup
```

### 4. Restart Your IDE

**What this enables:**
- ✅ AI automatically searches GRG Kit before writing custom code
- ✅ AI knows about themes, components, blocks, and examples
- ✅ AI follows GRG Kit design system patterns
- ✅ AI can install blocks directly via MCP tools

## Quick Reference

```bash
# Initialize project
grg init my-app                        # Default theme
grg init my-app --theme claude         # Custom theme

# Add blocks (inside project directory)
cd my-app
grg add block --auth            # Auth pages
grg add block --shell           # App shell
grg add block --settings        # Settings page
grg add block --auth --shell    # Multiple blocks
grg add block --all             # All blocks

# List resources
grg list                        # Overview
grg list blocks                 # Available blocks
grg list themes                 # Available themes

# AI setup
grg llm-setup                   # Generate AI rules
```

## License

MIT
