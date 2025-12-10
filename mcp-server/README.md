# grg-kit-mcp-server

MCP (Model Context Protocol) server for GRG Kit - enables AI assistants to discover and use Angular UI components automatically.

## Purpose

Makes GRG Kit the **first choice** for AI when building Angular UIs by:
- Advertising available themes, components, and blocks
- Providing intelligent search with rich tags
- Enabling direct installation from AI tools
- Offering rich context (tags, descriptions, dependencies)

## Installation

```bash
npm install -g grg-kit-mcp-server
```

**Prerequisites:**
- Node.js >= 18
- GRG CLI installed: `npm install -g grg-kit-cli`

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

The MCP server exposes **2 simple tools**:

### 1. `catalog`

Search, list, or get details for GRG Kit resources. Every result includes the install command.

```typescript
// List all resources (23 items: 9 themes, 1 component, 13 block files)
catalog()

// Search by query
catalog({ query: "sidebar footer" })
// → Finds: block/shell/sidebar-footer

catalog({ query: "signin" })
// → Finds: block/auth/login, block/auth/register, block/auth/forgot-password

catalog({ query: "hospital" })
// → Finds: theme/chroma-clinic

// Filter by category
catalog({ category: "themes" })
catalog({ category: "blocks" })

// Get specific resource details
catalog({ name: "sidebar-footer" })
catalog({ name: "theme/claude" })
```

**Response format:**
```json
{
  "count": 1,
  "items": [{
    "type": "block",
    "name": "block/shell/sidebar-footer",
    "id": "sidebar-footer",
    "block": "shell",
    "title": "Sidebar Shell Footer",
    "description": "Sidebar Shell Footer",
    "tags": ["shell", "layout", "sidebar", "footer", "dashboard", "admin", "navbar"],
    "install": "grg add block shell sidebar-footer"
  }]
}
```

### 2. `install`

Get CLI command to install a GRG Kit resource.

```typescript
// Install using full name from catalog
install({ name: "block/shell/sidebar-footer" })
// → { command: "grg add block shell sidebar-footer", postInstall: "..." }

install({ name: "theme/claude" })
// → { command: "grg add theme claude", postInstall: "..." }

install({ name: "component/file-upload" })
// → { command: "grg add component file-upload", postInstall: "..." }

// Short names also work (auto-detected)
install({ name: "claude" })
install({ name: "file-upload" })
```

## Resource Naming

All resources use a consistent `type/name` format:

| Type | Examples |
|------|----------|
| Themes | `theme/claude`, `theme/chroma-clinic`, `theme/modern-minimal` |
| Components | `component/file-upload` |
| Blocks | `block/auth/login`, `block/shell/sidebar-footer`, `block/settings/profile` |

## Rich Search Tags

Resources have extensive tags for better discoverability:

| Resource | Search Terms |
|----------|--------------|
| **auth** | login, signin, sign-in, signup, register, password, credentials, onboarding |
| **shell** | dashboard, admin, navbar, menu, left-nav, top-bar, sidebar, topnav |
| **settings** | user-settings, my-account, configuration, notifications, privacy |
| **file-upload** | dropzone, attachment, file-picker, document, image-upload |
| **chroma-clinic** | medical, hospital, clinic, doctor, patient, healthcare |
| **bio-lab** | laboratory, research, science, biotech, nature |

## How AI Uses This

### Scenario 1: User Wants a Dashboard

```
User: "Create a dashboard with a sidebar"

AI:
1. catalog({ query: "dashboard sidebar" })
   → Finds: block/shell/sidebar, block/shell/sidebar-footer
2. install({ name: "block/shell/sidebar" })
   → Returns: { command: "grg add block shell sidebar" }
3. Runs the command
```

### Scenario 2: User Wants Login Page

```
User: "I need a sign in page"

AI:
1. catalog({ query: "signin" })
   → Finds: block/auth/login (tags include "signin", "sign-in")
2. install({ name: "block/auth/login" })
   → Returns: { command: "grg add block auth login" }
```

### Scenario 3: User Wants Medical Theme

```
User: "Use a theme for a hospital app"

AI:
1. catalog({ query: "hospital" })
   → Finds: theme/chroma-clinic (tags include "hospital", "clinic", "healthcare")
2. install({ name: "theme/chroma-clinic" })
   → Returns: { command: "grg add theme chroma-clinic" }
```

## Available Resources (via MCP Resources Protocol)

- `grg://catalog/themes` - All available themes
- `grg://catalog/components` - All components  
- `grg://catalog/blocks` - All blocks

## CLI Commands

The MCP server works with the GRG CLI:

| Command | Description |
|---------|-------------|
| `grg init` | Initialize GRG Kit in Angular project |
| `grg init --theme <name>` | Initialize with specific theme |
| `grg add theme <name>` | Add or switch theme |
| `grg add block <name> [files...]` | Add block files |
| `grg add component <name>` | Add component |
| `grg list` | List available resources |
| `grg list --json` | JSON output (used by MCP server) |

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
- 1-minute cache for performance

## Development

```bash
npm install
npm run build
npm run watch
```

## Benefits

- 🚀 **Simple API**: Just 2 tools - `catalog` and `install`
- 🔍 **Rich Search**: Find resources by natural language queries
- 📦 **Flat Catalog**: All 23 resources as individual searchable items
- 🏷️ **Extensive Tags**: "signin", "dashboard", "hospital" all work
- 🤖 **AI-First**: Designed for LLM consumption

## License

MIT
