# grg-kit-cli

CLI tool for pulling GRG Kit resources into your Angular project with simple, memorable commands.

## Installation

```bash
npm install -g grg-kit-cli
```

### Optional: MCP Server Integration (Recommended for AI Assistants)

To enable AI assistants (Windsurf, Cursor, Claude Desktop) to automatically discover and use GRG Kit resources:

#### 1. Install the MCP Server

```bash
npm install -g @grg-kit/mcp-server
```

#### 2. Configure Your AI Assistant

**Windsurf:**

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "grg-kit": {
      "command": "grg-mcp-server"
    }
  }
}
```

**Cursor:**

Add to `~/.cursor/mcp_config.json`:

```json
{
  "mcpServers": {
    "grg-kit": {
      "command": "grg-mcp-server"
    }
  }
}
```

**Claude Desktop:**

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "grg-kit": {
      "command": "grg-mcp-server"
    }
  }
}
```

#### 3. Generate AI Rules

```bash
cd your-angular-project

# For Windsurf (default)
grg llm-prompts

# For Cursor
grg llm-prompts --output .cursor/rules

# For other IDEs
grg llm-prompts --output .ai-rules
```

This creates rule files with:
- `design-system.md` - GRG Kit design patterns and component usage
- `grg-kit-mcp.md` - MCP integration workflow and best practices

#### 4. Restart Your IDE

Restart your IDE to load the MCP server and rules.

**What this enables:**
- ✅ AI automatically searches GRG Kit before writing custom code
- ✅ AI knows about 60+ available resources (themes, components, layouts, examples)
- ✅ AI follows GRG Kit design system patterns
- ✅ AI can install resources directly via MCP tools

**How it works:**
```
User: "I need a button component"
         ↓
AI reads .windsurf/rules/grg-kit-mcp.md
         ↓
AI calls MCP tool: search_ui_resources({ query: "button" })
         ↓
MCP Server → grg metadata → Returns: examples:button
         ↓
AI calls MCP tool: install_resource({ resource: "examples:button" })
         ↓
MCP Server → grg add examples:button → Downloads resource
         ↓
AI: "I've installed button examples. Here's how to use them..."
```

## Quick Start

```bash
# Interactive mode (easiest way to get started)
grg
# or
grg interactive
grg i

# Or use direct commands
grg init                    # Initialize with theme
grg add theme:claude        # Add specific resources
grg list                    # Browse available resources
grg llm-prompts             # Setup AI assistant rules (recommended!)
```

## Commands

### `grg` or `grg interactive` or `grg i`

Interactive mode - browse and add resources with a guided interface.

```bash
grg
grg interactive
grg i
```

**What it does:**
- Presents a simple menu to choose actions
- Browse resources with descriptions
- Select multiple examples at once
- Minimal surface area, focused experience

**Perfect for:**
- First-time users
- Exploring available resources
- Quick resource selection

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

### `grg llm-prompts`

Generate LLM-specific prompts and rules for AI assistants (Windsurf, Cursor, etc.).

```bash
grg llm-prompts [options]

Options:
  -o, --output <path>  Output directory for rules (default: ".windsurf/rules")

Examples:
  grg llm-prompts
  grg llm-prompts --output .cursor/rules
  grg llm-prompts -o .ai-rules
```

**What it does:**
- Creates output directory if it doesn't exist
- Generates `design-system.md` with GRG Kit design patterns and component usage
- Generates `grg-kit-mcp.md` with MCP server integration rules
- Configures AI assistants to use GRG Kit resources first

**Benefits:**
- 🤖 AI assistants will check GRG Kit resources before writing custom code
- 🎯 Ensures consistent usage of Spartan-NG and GRG Kit components
- 📚 Provides AI with comprehensive design system knowledge
- 🔌 Integrates with MCP server for automatic resource discovery
- ⚡ Speeds up development by leveraging pre-built components

**Perfect for:**
- Setting up AI-assisted development workflows
- Ensuring team consistency when using AI tools
- Maximizing the value of GRG Kit resources
- Reducing custom code in favor of tested components

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

## Troubleshooting MCP Integration

### Verify MCP Server is Running

```bash
# Check if grg-mcp-server is installed
which grg-mcp-server

# Test the CLI is working
grg metadata
```

### Verify AI Assistant Configuration

**Windsurf:**
- Check `~/.codeium/windsurf/mcp_config.json` exists
- Restart Windsurf completely
- Check Windsurf logs for MCP connection

**Cursor:**
- Check `~/.cursor/mcp_config.json` exists
- Restart Cursor completely
- Look for MCP status in Cursor settings

### Test MCP Tools

Ask your AI assistant:
```
"Search for GRG Kit button components"
```

The AI should use the `search_ui_resources` MCP tool. If it doesn't:
1. Verify MCP server is configured correctly
2. Ensure rules are generated (`grg llm-prompts`)
3. Restart your IDE
4. Check IDE logs for MCP errors

### Common Issues

**"grg-mcp-server: command not found"**
- Run: `npm install -g @grg-kit/mcp-server`
- Verify npm global bin is in PATH: `npm bin -g`

**"AI doesn't use GRG Kit resources"**
- Generate rules: `grg llm-prompts`
- Verify rules exist in `.windsurf/rules/` or `.cursor/rules/`
- Restart IDE to load rules

**"MCP server not connecting"**
- Check MCP config file syntax (valid JSON)
- Ensure `grg-kit-cli` is installed: `grg --version`
- Try removing and re-adding MCP config

## Quick Reference

### Setup with MCP (Recommended)
```bash
# 1. Install CLI and MCP server
npm install -g grg-kit-cli @grg-kit/mcp-server

# 2. Configure Windsurf (add to ~/.codeium/windsurf/mcp_config.json)
{
  "mcpServers": {
    "grg-kit": { "command": "grg-mcp-server" }
  }
}

# 3. Generate AI rules in your project
cd your-project
grg llm-prompts

# 4. Restart Windsurf
```

### Common Commands
```bash
grg                          # Interactive mode
grg init                     # Initialize with theme
grg add theme:claude         # Add theme
grg add component:stepper    # Add component
grg add layout:dashboard     # Add layout
grg add examples:button      # Add example
grg add examples:all         # Add all examples
grg list                     # List all resources
grg list themes              # List themes only
grg llm-prompts              # Generate AI rules
grg metadata                 # Output metadata (for MCP)
```

### MCP Tools (for AI Assistants)
```typescript
search_ui_resources({ query: "form" })           // Search resources
suggest_resources({ requirement: "login page" }) // Get suggestions
get_resource_details({ resource: "theme:claude" }) // Get details
install_resource({ resource: "theme:claude" })   // Install resource
list_available_resources({ category: "all" })    // List all
```

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
grg llm-prompts
```

## License

MIT
