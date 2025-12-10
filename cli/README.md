# grg-kit-cli

CLI tool for initializing Angular projects with GRG Kit and adding blocks.

## Installation

```bash
npm install -g grg-kit-cli
```

## Quick Start

```bash
# Create Angular project first
ng new my-app --style=css
cd my-app

# Initialize GRG Kit in the project
grg init

# Or with a specific theme
grg init --theme claude

# Add or switch theme
grg add theme claude
grg add theme modern-minimal

# Add blocks (all files)
grg add block auth
grg add block shell

# Add specific files from a block
grg add block auth login
grg add block shell sidebar

# Add all blocks
grg add block --all

# Add components
grg add component file-upload

# List available resources
grg list
grg list blocks
grg list themes
grg list components
```

## Commands

### `grg init`

Initialize GRG Kit in an existing Angular project.

```bash
grg init [options]

Options:
  -t, --theme <name>  Theme to install (default: "grg-theme")

Examples:
  grg init
  grg init --theme claude
  grg init -t modern-minimal
```

**Prerequisites:**
- Must be run inside an existing Angular project (with `angular.json`)
- Create one with: `ng new my-app --style=css`

**What it does:**
- Installs Tailwind CSS v4 (`tailwindcss @tailwindcss/postcss postcss`)
- Creates `.postcssrc.json` with PostCSS configuration
- Installs and configures Spartan-NG CLI
- Runs `ng g @spartan-ng/cli:ui all` to install all Spartan-NG UI components
- Downloads 56+ Spartan-NG examples to `libs/examples`
- Downloads the selected theme
- Updates `src/styles.css` with theme import

**Available themes:**
- `grg-theme` - Default theme with blue accents
- `claude` - Claude-inspired warm tones
- `clean-slate` - Minimal grayscale palette
- `modern-minimal` - Contemporary minimal design
- `amber-minimal` - Warm amber accents
- `chroma-clinic` - Professional blue theme for healthcare
- `bio-lab` - Fresh green theme for life sciences
- `pharma-teal` - Calming teal for pharmaceutical apps
- `helix-purple` - DNA-inspired purple for genomics

### `grg add theme`

Add or switch theme in an existing project.

```bash
grg add theme <themeName>

Options:
  -o, --output <path>    Custom themes directory (default: "src/themes")

Examples:
  grg add theme claude           # Download and set claude theme
  grg add theme modern-minimal   # Download and set modern-minimal
```

**What it does:**
- Downloads the theme CSS file to `src/themes/`
- Updates `src/styles.css` to import the new theme (replaces existing theme import)

### `grg add block`

Add blocks or specific block files to your project.

```bash
grg add block <blockName> [fileIds...]

Options:
  --all                  Add all blocks
  -o, --output <path>    Custom output directory

Examples:
  grg add block auth                    # All auth files
  grg add block auth login              # Only login
  grg add block auth login register     # Login and register
  grg add block shell sidebar           # Only sidebar shell
  grg add block shell topnav topnav-footer  # Topnav variants
  grg add block --all                   # All blocks
```

### `grg add component`

Add GRG Kit components to your project.

```bash
grg add component <componentName>

Options:
  --all                  Add all components
  -o, --output <path>    Custom output directory

Examples:
  grg add component file-upload    # Download file-upload component
  grg add component --all          # All components
```

**Available blocks and files:**

| Block | Files |
|-------|-------|
| `auth` | `login`, `register`, `forgot-password` |
| `shell` | `sidebar`, `sidebar-footer`, `topnav`, `topnav-footer`, `collapsible`, `collapsible-footer` |
| `settings` | `profile`, `security`, `notification`, `danger-zone` |

**Search tags** (for MCP server discoverability):

| Block | Search Terms |
|-------|--------------|
| `auth` | signin, sign-in, signup, register, password, credentials, onboarding |
| `shell` | dashboard, admin, navbar, menu, left-nav, top-bar, wrapper |
| `settings` | user-settings, my-account, configuration, notifications, privacy |

### `grg list [category]`

List available blocks and themes.

```bash
grg list [category] [options]

Options:
  --json             Output as JSON (for MCP server integration)

Examples:
  grg list           # Show overview
  grg list blocks    # List all blocks
  grg list themes    # List all themes
  grg list --json    # Output all resources as JSON
```

The `--json` flag outputs structured data used by the MCP server to get resource information.

### `grg llm-setup`

Generate design system rules for AI assistants (Windsurf, Cursor, Claude Code).

```bash
grg llm-setup [options]

Options:
  -o, --output <path>  Output directory for rules (default: ".windsurf/rules")

Examples:
  grg llm-setup                    # Windsurf/Cursor (design-system.md)
  grg llm-setup --output .claude   # Claude Code (single CLAUDE.md)
```

**What this creates:**
- `design-system.md` - Component usage patterns, styling rules, import patterns

**What this enables:**
- ✅ AI follows GRG Kit design system patterns
- ✅ AI uses Spartan-NG components correctly
- ✅ AI uses semantic colors instead of raw Tailwind colors

## Quick Reference

```bash
# Create Angular project first
ng new my-app --style=css
cd my-app

# Initialize GRG Kit
grg init                        # Default theme
grg init --theme claude         # Custom theme

# Add/switch theme
grg add theme claude            # Switch to claude theme
grg add theme modern-minimal    # Switch to modern-minimal

# Add blocks (all files)
grg add block auth              # All auth files
grg add block shell             # All shell layouts
grg add block settings          # All settings pages

# Add specific files
grg add block auth login        # Just login
grg add block shell sidebar     # Just sidebar shell
grg add block --all             # All blocks

# Add components
grg add component file-upload   # File upload component

# List resources
grg list                        # Overview
grg list blocks                 # Available blocks
grg list themes                 # Available themes
grg list components             # Available components

# AI setup
grg llm-setup                   # Generate AI rules
```

## License

MIT
