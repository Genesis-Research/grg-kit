# @grg-kit/mcp-server

MCP (Model Context Protocol) server for GRG Kit - enables AI assistants to discover and use Angular UI components automatically.

## Purpose

Makes GRG Kit the **first choice** for AI when building Angular UIs by:
- Advertising available themes, components, and blocks
- Providing intelligent search and suggestions
- Enabling direct installation from AI tools
- Offering rich context (tags, descriptions, dependencies)

## Installation

```bash
pnpm install -g grg-kit-mcp-server
```

**Prerequisites:**
- Node.js >= 18
- pnpm (recommended) or npm

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
| `grg init` | Sets up theme and all Spartan-NG components |
| `grg init --theme <name>` | Same with custom theme |
| `grg add block --<name>` | Add a block (auth, shell, settings) |
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
// Returns: block:auth with install command (grg add block --auth)
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
Install a block into the project.

```typescript
install_resource({
  resource: "auth",
  output: "src/app/blocks/auth" // optional
})
// Executes: grg add block --auth
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
2. Finds: block:shell
3. install_resource({ resource: "shell" })
   → Executes: grg add block --shell
```

### Scenario 2: User Wants to Initialize Project

```
User: "Set up GRG Kit with the Claude theme"

AI:
1. Run: grg init --theme claude
2. This installs theme + all Spartan-NG components
```

### Scenario 3: User Wants Login Page

```
User: "I need a login page"

AI:
1. suggest_resources({ requirement: "login page" })
2. Finds: block:auth
3. install_resource({ resource: "auth" })
   → Executes: grg add block --auth
```

## Why This Matters

### Before MCP Server:
- AI doesn't know GRG Kit exists
- AI might use other libraries or write from scratch
- User has to manually tell AI about GRG Kit

### After MCP Server:
- ✅ AI **automatically** knows about GRG Kit
- ✅ AI searches GRG Kit **first** for UI needs
- ✅ AI can browse 6 themes, 2 components, 3 blocks
- ✅ AI installs blocks directly
- ✅ AI uses actual GRG Kit code patterns

## Development

```bash
pnpm install
pnpm run build
pnpm run watch
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
   → Installs theme + Spartan-NG components
   
3. install_resource("shell")
   → grg add block --shell
   
4. install_resource("auth")
   → grg add block --auth

AI (to user):
"I've set up your project with:
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
