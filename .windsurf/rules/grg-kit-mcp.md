---
trigger: always_on
---

# GRG Kit MCP Server Integration

## Setup

Add the grg-kit MCP server to your AI assistant configuration:

**Windsurf:** `~/.codeium/windsurf/mcp_config.json`
**Claude Code:** `~/.claude/settings.json`
**Claude Desktop (macOS):** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "grg-kit": {
      "command": "grg-mcp-server"
    }
  }
}
```

After adding, restart your IDE for the MCP server to be available.

## Important: Spartan-NG is Pre-installed

**Spartan-NG components are already installed** in this project. You do NOT need to use MCP to install them.

- For Spartan-NG usage patterns → Refer to `design-system.md`
- For themes, blocks, and GRG Kit components → Use MCP tools below

## When to Use MCP

Use the MCP server for:
1. **Themes** - Install different color themes
2. **Blocks** - Pre-built page layouts (auth, shell, settings)
3. **GRG Kit Components** - Custom components like file-upload

**Do NOT use MCP for:**
- Spartan-NG components (button, card, dialog, etc.) - already installed
- Basic UI patterns - see `design-system.md`

## MCP Server Tools

The `grg-kit` MCP server provides these tools:

### 1. mcp2_search_ui_resources

Search for GRG Kit resources (themes, blocks, components).

```typescript
mcp2_search_ui_resources({
  query: "auth",
  category: "all" // or "themes", "components", "blocks"
})
```

**When to use:**
- User needs a page layout or block
- Looking for a theme
- Need a GRG Kit component (file-upload)

### 2. mcp2_suggest_resources

Get suggestions based on user requirements.

```typescript
mcp2_suggest_resources({
  requirement: "I need a login page"
})

// Returns: block:auth, theme suggestions
```

### 3. mcp2_get_resource_details

Get detailed information about a resource.

```typescript
mcp2_get_resource_details({
  resource: "block:auth"
})

// Returns: dependencies, tags, install command
```

### 4. mcp2_install_resource

Get the install command for a block. Returns a command to run via run_command tool.

```typescript
mcp2_install_resource({
  resource: "auth",  // Just the block name, NOT "block:auth"
  files: ["login"],  // Optional: specific files to install
  output: "src/app/pages/auth" // Optional: custom output directory
})
// Returns: { command: "grg add block auth login", instruction: "Run this command..." }
```

**Important:** The resource parameter should be just the block name (e.g., "auth", "shell", "settings"), NOT prefixed with "block:".

### 5. mcp2_list_available_resources

List all available resources.

```typescript
mcp2_list_available_resources({
  category: "all" // or "themes", "components", "blocks"
})
```

## Workflow Examples

### Example 1: User Wants a Dashboard

```
User: "Create a dashboard with a sidebar"

AI Workflow:
1. mcp2_search_ui_resources({ query: "shell sidebar" })
   → Finds: block:shell
   
2. mcp2_install_resource({ resource: "shell", files: ["sidebar"] })
   → Returns command: "grg add block shell sidebar"
   
3. Run the command via run_command tool in the Angular project root
   
4. Customize using Spartan-NG components (from design-system.md)
   → Add cards, tables, etc.
```

### Example 2: User Wants a Login Page

```
User: "I need a login page"

AI Workflow:
1. mcp2_search_ui_resources({ query: "auth login" })
   → Finds: block:auth
   
2. mcp2_install_resource({ resource: "auth", files: ["login"] })
   → Returns command: "grg add block auth login"
   
3. Run the command via run_command tool in the Angular project root
   
4. Customize as needed
```

### Example 3: User Wants a Theme

```
User: "Change the theme to something warmer"

AI Workflow:
1. mcp2_list_available_resources({ category: "themes" })
   → Show: claude, amber-minimal, etc.
   
2. Themes are set via: grg init --theme <name>
   → Run: grg init --theme claude
   
3. Update src/styles.css import if needed
```

### Example 4: User Wants a Form Component

```
User: "I need a file upload"

AI Workflow:
1. mcp2_search_ui_resources({ query: "file upload" })
   → Finds: component:file-upload
   
2. Components are included automatically with grg init
   → Just import and use: import { GrgFileUploadImports } from '@grg-kit/ui/file-upload';
   
3. Use with Spartan-NG form components (from design-system.md)
```

## Available Resources (10 total)

### Themes (6 available)
- `theme:amber-minimal` - Warm amber accents
- `theme:claude` - Claude-inspired warm tones
- `theme:clean-slate` - Minimal grayscale palette
- `theme:grg-theme` - Default theme with purple/orange accents
- `theme:mocks` - Theme for mockups and prototypes
- `theme:modern-minimal` - Contemporary minimal design

### GRG Kit Components (1 available)
- `component:file-upload` - Drag and drop file upload component

### Blocks/Layouts (3 available)
- `block:auth` - Authentication pages (login, signup, forgot password)
- `block:settings` - Settings pages: profile, notifications, security, danger zone
- `block:shell` - Application shell layouts: sidebar, topnav, collapsible - each with optional footer variant

## Decision Tree

```
User request:
│
├─ Need a button, card, dialog, form field, table, etc.?
│  └─ Use Spartan-NG (see design-system.md) - ALREADY INSTALLED
│
├─ Need a page layout (dashboard, auth, settings)?
│  └─ Use MCP: mcp2_search_ui_resources({ query: "..." })
│
├─ Need a theme?
│  └─ Use MCP: mcp2_list_available_resources({ category: "themes" })
│
└─ Need file-upload or other GRG Kit component?
   └─ Use MCP: mcp2_search_ui_resources({ query: "..." })
```

## Remember

- **Spartan-NG is pre-installed** - Don't search for button, card, dialog, etc.
- **Use design-system.md** for Spartan-NG patterns
- **Use MCP** only for themes, blocks, and GRG Kit components
- **Check blocks first** when building pages - don't start from scratch
