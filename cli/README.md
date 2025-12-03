# grg-kit-cli

CLI tool for pulling GRG Kit resources into your Angular project with simple, memorable commands.

## Installation

```bash
npm install -g grg-kit-cli
```

## Quick Start

```bash
# Initialize GRG Kit with a theme
grg init

# Or choose a specific theme
grg init --theme claude

# List available resources
grg list

# Add resources
grg add theme:claude
grg add component:stepper
grg add examples:all
```

## Commands

### `grg init`

Initialize GRG Kit in your Angular project with themes directory and configuration.

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
- Creates `src/themes` directory
- Downloads the selected theme
- Updates `src/styles.css` with theme import

**Available themes:**
- `grg-theme` - Default theme with purple/orange accents
- `claude` - Claude-inspired warm tones
- `clean-slate` - Minimal grayscale palette
- `modern-minimal` - Contemporary minimal design
- `amber-minimal` - Warm amber accents
- `mocks` - Theme for mockups and prototypes

### `grg add <resource>`

Add a GRG Kit resource to your project.

```bash
grg add <category>:<name> [options]

Options:
  -o, --output <path>  Custom output directory

Examples:
  grg add theme:claude
  grg add component:stepper
  grg add layout:dashboard
  grg add examples:button
  grg add examples:all
```

**Resource format:** `<category>:<name>`

**Categories:**
- `theme` - Pre-built theme files
- `component` - Reusable components
- `layout` - Page layouts
- `examples` - Spartan-NG component examples

### `grg list [category]`

List available GRG Kit resources.

```bash
grg list [category]

Examples:
  grg list           # Show all categories
  grg list themes    # List all themes
  grg list components
  grg list layouts
  grg list examples
```

### `grg metadata`

Output structured metadata about all available commands and resources (for MCP servers and LLMs).

```bash
grg metadata [options]

Options:
  -f, --format <type>  Output format: json, yaml (default: "json")

Examples:
  grg metadata
  grg metadata --format json
```

**Purpose:**
This command outputs structured JSON/YAML metadata that can be consumed by:
- MCP (Model Context Protocol) servers
- LLMs for automated resource discovery
- CI/CD pipelines
- Documentation generators

## MCP Server Integration

The CLI is designed to work seamlessly with MCP servers. The `metadata` command provides structured information that LLMs can use to:

1. **Discover available resources** - Themes, components, layouts, examples
2. **Understand command usage** - Syntax, options, examples
3. **Execute commands automatically** - Based on user intent
4. **Provide contextual help** - Descriptions, tags, dependencies

### Metadata Structure

```json
{
  "version": "0.1.0",
  "name": "grg-kit-cli",
  "description": "CLI tool for pulling GRG Kit resources into Angular projects",
  "commands": [
    {
      "name": "init",
      "description": "Initialize GRG Kit in your Angular project",
      "usage": "grg init [options]",
      "options": [...],
      "examples": [...],
      "effects": [...]
    }
  ],
  "resources": {
    "themes": [...],
    "components": [...],
    "layouts": [...],
    "examples": {...}
  }
}
```

## Examples

### Initialize a new project

```bash
# Initialize with default theme
grg init

# Initialize with Claude theme
grg init --theme claude
```

### Add resources

```bash
# Add a different theme
grg add theme:modern-minimal

# Add a component
grg add component:stepper

# Add a layout
grg add layout:dashboard

# Add all Spartan-NG examples
grg add examples:all

# Add specific component examples
grg add examples:button
grg add examples:dialog
```

### Browse resources

```bash
# See all categories
grg list

# See all themes
grg list themes

# See all components
grg list components

# See all examples
grg list examples
```

## Comparison with degit

### Before (with degit):
```bash
npx degit gh:Genesis-Research/grg-kit/templates/ui/themes/grg-theme.css src/themes/grg-theme.css
npx degit gh:Genesis-Research/grg-kit/templates/spartan-examples src/app/spartan-examples
```

### After (with @grg-kit/cli):
```bash
grg add theme:grg-theme
grg add examples:all
```

**Benefits:**
- ✅ Shorter, memorable commands
- ✅ Built-in resource discovery
- ✅ Automatic path management
- ✅ Helpful error messages
- ✅ MCP server integration
- ✅ Structured metadata for LLMs

## Development

```bash
# Install dependencies
npm install

# Link for local development
npm link

# Test commands
grg --help
grg list
grg metadata
```

## License

MIT
