# grg-kit-cli

CLI tool for initializing Angular projects with GRG Kit and adding blocks.

## Installation

```bash
npm install -g grg-kit-cli
```

## Quick Start

```bash
# Initialize GRG Kit (theme + all components + spartan-ng examples)
grg init

# Initialize with a specific theme
grg init --theme claude

# Add blocks
grg add block --auth
grg add block --shell
grg add block --all

# List available resources
grg list
grg list blocks
grg list themes
```

## Commands

### `grg init`

Initialize GRG Kit in your Angular project. One command to set up everything.

```bash
grg init [options]

Options:
  -t, --theme <name>  Theme to install (default: "grg-theme")

Examples:
  grg init
  grg init --theme claude
  grg init -t modern-minimal
```

**What it does:**
- Installs Tailwind CSS v4 (`tailwindcss @tailwindcss/postcss postcss`)
- Creates `.postcssrc.json` with PostCSS configuration
- Runs `npx ng g @spartan-ng/cli:init` to initialize Spartan-NG
- Downloads the selected theme
- Downloads all GRG Kit components
- Downloads all spartan-ng examples (56+)
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

### `grg llm-prompts`

Generate LLM-specific prompts and rules for AI assistants (Windsurf, Cursor, etc.).

```bash
grg llm-prompts [options]

Options:
  -o, --output <path>  Output directory for rules (default: ".windsurf/rules")

Examples:
  grg llm-prompts
  grg llm-prompts --output .cursor/rules
```

## MCP Server Integration

For AI assistants to automatically discover and use GRG Kit resources:

### 1. Install the MCP Server

```bash
npm install -g @grg-kit/mcp-server
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
grg llm-prompts
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
grg init                        # Default theme
grg init --theme claude         # Custom theme

# Add blocks
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
grg llm-prompts                 # Generate AI rules
```

## License

MIT
