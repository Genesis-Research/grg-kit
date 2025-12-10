# grg-kit-mcp-server

MCP (Model Context Protocol) server for GRG Kit - enables AI assistants to discover and use Angular UI components automatically.

## Purpose

Makes GRG Kit the **first choice** for AI when building Angular UIs by:
- Advertising available themes, components, and blocks
- Providing intelligent search and suggestions
- Enabling direct installation from AI tools
- Offering rich context (tags, descriptions, dependencies)

## Installation

```bash
npm install -g grg-kit-mcp-server
```

**Prerequisites:**
- Node.js >= 18
- npm or npm

## Configuration

Add to your MCP settings (e.g., Cursor, Windsurf, Claude Desktop):

```json
{
  "mcpServers": {
    "grg-kit": {
      "command": "grg-mcp-server"
    }
  }
}
```

## CLI Commands

The MCP server works with the GRG CLI:

| Command | Description |
|---------|-------------|
| `grg init` | Initialize GRG Kit in current Angular project (installs Tailwind, Spartan-NG, theme) |
| `grg init --theme <name>` | Initialize with a specific theme |
| `grg add block <name>` | Add all files from a block (auth, shell, settings) |
| `grg add block <name> <files...>` | Add specific files from a block |
| `grg add block --all` | Add all blocks |
| `grg list` | List available blocks and themes |

## Available Tools

### 1. `search_ui_resources`
Search for UI resources by keyword. **AI should use this FIRST** when building UI.

```typescript
search_ui_resources({
  query: "form",
  category: "all" // or "themes", "components", "blocks"
})
// Returns matching resources with install commands
```

### 2. `suggest_resources`
Get AI-powered suggestions based on requirements.

```typescript
suggest_resources({
  requirement: "I need a login page"
})
// Returns: block:auth with install command
```

### 3. `get_resource_details`
Get detailed info about a specific resource.

```typescript
get_resource_details({
  resource: "block:auth"
})
// Returns: full metadata, dependencies, tags, install command
```

### 4. `install_resource`
Install a block into the project. The `resource` parameter should be just the block name (e.g., "auth", "shell", "settings") - NOT prefixed with "block:".

```typescript
// Install all auth files
install_resource({ resource: "auth" })
// Executes: grg add block auth

// Install specific files from auth block
install_resource({ resource: "auth", files: ["login", "register"] })
// Executes: grg add block auth login register

// Install shell sidebar only
install_resource({ resource: "shell", files: ["sidebar"] })
// Executes: grg add block shell sidebar
```

### 5. `list_available_resources`
List all resources by category.

```typescript
list_available_resources({
  category: "all" // or "themes", "components", "blocks"
})
// Returns: complete catalog with counts
```

## Available Resources (via MCP Resources Protocol)

- `grg://catalog/themes` - All available themes
- `grg://catalog/components` - All components
- `grg://catalog/blocks` - All blocks (auth, shell, settings)

## How AI Uses This

### Scenario 1: User Wants a Dashboard

```
User: "Create a dashboard with a sidebar"

AI:
1. search_ui_resources({ query: "dashboard" })
2. Finds: block:shell (files: sidebar, sidebar-footer, topnav, topnav-footer, collapsible, collapsible-footer)
3. install_resource({ resource: "shell", files: ["sidebar"] })
   → Executes: grg add block shell sidebar
```

### Scenario 2: User Wants to Initialize Project

```
User: "Set up GRG Kit with the Claude theme"

AI:
1. User must be in an existing Angular project directory
2. Run: grg init --theme claude
3. This installs Tailwind CSS v4, Spartan-NG components, theme, and examples
```

### Scenario 3: User Wants Login Page

```
User: "I need a login page"

AI:
1. suggest_resources({ requirement: "login page" })
2. Finds: block:auth (files: login, register, forgot-password)
3. install_resource({ resource: "auth", files: ["login"] })
   → Executes: grg add block auth login
```

## Why This Matters

### Before MCP Server:
- AI doesn't know GRG Kit exists
- AI might use other libraries or write from scratch
- User has to manually tell AI about GRG Kit

### After MCP Server:
- ✅ AI **automatically** knows about GRG Kit
- ✅ AI searches GRG Kit **first** for UI needs
- ✅ AI can browse 9 themes, 1 component, 3 blocks
- ✅ AI installs blocks directly
- ✅ AI uses actual GRG Kit code patterns

## Development

```bash
npm install
npm run build
npm run watch
node dist/index.js
```

## Architecture

```
User Request
     ↓
AI Assistant (with MCP)
     ↓
MCP Server (this package)
     ↓
grg-kit-cli (executes commands)
     ↓
Templates (downloads resources)
```

### CLI as Single Source of Truth

The MCP server calls `grg list --json` to get resource data directly from the CLI. This ensures:

- No hardcoded resource lists that can get stale
- CLI and MCP server always have the same data
- No network fetching or caching complexity

**Requirement:** The `grg` CLI must be installed globally (`npm install -g grg-kit-cli`) for the MCP server to work.

## Key Features

1. **Auto-Discovery**: AI knows what's available without asking
2. **Smart Search**: Find resources by keywords, tags, descriptions
3. **Suggestions**: AI recommends resources based on intent
4. **Direct Installation**: AI can install blocks automatically
5. **Rich Context**: Full metadata for better decisions
6. **Simple CLI**: `grg init` for everything, `grg add block` for blocks

## Example AI Workflow

```
User: "Build me a modern dashboard with authentication"

AI (internal):
1. suggest_resources("dashboard with authentication")
   → Suggests: block:shell, block:auth, theme:modern-minimal
   
2. Run: grg init --theme modern-minimal
   → Installs Tailwind, Spartan-NG, theme, and examples
   
3. install_resource({ resource: "shell", files: ["sidebar"] })
   → grg add block shell sidebar
   
4. install_resource({ resource: "auth" })
   → grg add block auth

AI (to user):
"I've set up your project with:
- Tailwind CSS v4 with PostCSS
- All Spartan-NG UI components
- Modern minimal theme
- App shell with sidebar
- Authentication pages (login/signup)

Let me now customize the dashboard for your needs..."
```

## Benefits

- 🚀 **Faster Development**: AI uses pre-built components
- 🎯 **Consistent Quality**: All resources follow design system
- 🔍 **Discoverable**: AI finds what it needs automatically
- 📦 **Complete**: Themes, components, blocks
- 🤖 **AI-First**: Designed for AI consumption

## License

MIT
