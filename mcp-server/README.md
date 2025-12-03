# @grg-kit/mcp-server

MCP (Model Context Protocol) server for GRG Kit - enables AI assistants to discover and use Angular UI components automatically.

## Purpose

Makes GRG Kit the **first choice** for AI when building Angular UIs by:
- Advertising available themes, components, layouts, and examples
- Providing intelligent search and suggestions
- Enabling direct installation from AI tools
- Offering rich context (tags, descriptions, dependencies)

## Installation

```bash
npm install -g @grg-kit/mcp-server
```

**Prerequisites:**
- `grg-kit-cli` must be installed globally
- Node.js >= 18

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

## Available Tools

### 1. `search_ui_resources`
Search for UI resources by keyword. **AI should use this FIRST** when building UI.

```typescript
// Example: User says "I need a form"
search_ui_resources({
  query: "form",
  category: "all" // or "themes", "components", "layouts", "examples"
})

// Returns matching resources with install commands
```

### 2. `suggest_resources`
Get AI-powered suggestions based on requirements.

```typescript
// Example: User says "build a login page"
suggest_resources({
  requirement: "I need a login page"
})

// Returns: layout:auth, examples:form-field, examples:input, etc.
```

### 3. `get_resource_details`
Get detailed info about a specific resource.

```typescript
get_resource_details({
  resource: "theme:claude"
})

// Returns: full metadata, dependencies, tags, install command
```

### 4. `install_resource`
Install a resource into the project.

```typescript
install_resource({
  resource: "theme:claude",
  output: "src/themes" // optional
})

// Executes: grg add theme:claude
```

### 5. `list_available_resources`
List all resources by category.

```typescript
list_available_resources({
  category: "all" // or specific category
})

// Returns: complete catalog with counts
```

## Available Resources (via MCP Resources Protocol)

The server exposes these resources that AI can read:

- `grg://catalog/themes` - All available themes
- `grg://catalog/components` - All components
- `grg://catalog/layouts` - All layouts
- `grg://catalog/examples` - All Spartan-NG examples

## How AI Uses This

### Scenario 1: User Wants a Dashboard

```
User: "Create a dashboard with a sidebar"

AI thinks:
1. Search for dashboard resources
   → search_ui_resources({ query: "dashboard" })
2. Finds: layout:dashboard, examples:navigation-menu, examples:card
3. Suggests and installs:
   → install_resource({ resource: "layout:dashboard" })
   → install_resource({ resource: "examples:card" })
4. Uses the installed code to build the dashboard
```

### Scenario 2: User Wants a Theme

```
User: "Add a nice theme to my app"

AI thinks:
1. List available themes
   → list_available_resources({ category: "themes" })
2. Shows options: grg-theme, claude, modern-minimal, etc.
3. User picks "claude"
4. Install:
   → install_resource({ resource: "theme:claude" })
```

### Scenario 3: User Wants Form Components

```
User: "I need form validation"

AI thinks:
1. Search for form resources
   → search_ui_resources({ query: "form" })
2. Finds: component:stepper, examples:form-field, examples:input
3. Get details:
   → get_resource_details({ resource: "examples:form-field" })
4. Install what's needed:
   → install_resource({ resource: "examples:form-field" })
```

## Why This Matters

### Before MCP Server:
- AI doesn't know GRG Kit exists
- AI might use generic examples or other libraries
- User has to manually tell AI about GRG Kit
- No automatic discovery

### After MCP Server:
- ✅ AI **automatically** knows about GRG Kit
- ✅ AI searches GRG Kit **first** for UI needs
- ✅ AI can browse 6 themes, 2 components, 3 layouts, 56+ examples
- ✅ AI installs resources directly
- ✅ AI uses actual GRG Kit code patterns

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run watch

# Test locally
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
4. **Direct Installation**: AI can install resources automatically
5. **Rich Context**: Full metadata for better decisions
6. **Always Up-to-Date**: Uses `grg metadata` for live data

## Example AI Workflow

```
User: "Build me a modern dashboard with authentication"

AI (internal):
1. suggest_resources("dashboard with authentication")
   → Suggests: layout:dashboard, layout:auth, theme:modern-minimal
   
2. install_resource("theme:modern-minimal")
   → Installs theme
   
3. install_resource("layout:dashboard")
   → Gets dashboard layout
   
4. install_resource("layout:auth")
   → Gets auth pages
   
5. search_ui_resources("navigation")
   → Finds examples:navigation-menu
   
6. install_resource("examples:navigation-menu")
   → Gets navigation examples

AI (to user):
"I've set up your project with:
- Modern minimal theme
- Dashboard layout with sidebar
- Authentication pages (login/signup)
- Navigation menu examples

Let me now customize the dashboard for your needs..."
```

## Benefits

- 🚀 **Faster Development**: AI uses pre-built components
- 🎯 **Consistent Quality**: All resources follow design system
- 🔍 **Discoverable**: AI finds what it needs automatically
- 📦 **Complete**: Themes, components, layouts, examples
- 🤖 **AI-First**: Designed for AI consumption

## License

MIT
