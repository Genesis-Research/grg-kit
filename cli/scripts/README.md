# Resource Generation Flow

## Overview

GRG Kit uses a **two-stage generation pipeline** to ensure CLI and MCP server always have up-to-date resource definitions.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SOURCE OF TRUTH                                    │
│                                                                              │
│  app/src/app/blocks/{block}/meta.json    ← Block metadata                   │
│  app/src/themes/meta.json                ← Theme metadata                   │
│  app/libs/grg-ui/{component}/meta.json   ← Component metadata               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STAGE 1: pnpm generate:sources (in app/)                                   │
│                                                                              │
│  • Transforms source components → template files                            │
│  • Copies meta.json files → templates/ directory                            │
│  • Generates generated-sources.ts for showcase app                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TEMPLATES DIRECTORY                                  │
│                                                                              │
│  templates/ui/blocks/{block}/meta.json      ← Copied from app               │
│  templates/ui/blocks/{block}/*.component.ts ← Generated                     │
│  templates/ui/themes/meta.json              ← Copied from app               │
│  templates/ui/components/{comp}/meta.json   ← Copied from app               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STAGE 2: node scripts/generate-resources.js (in cli/)                      │
│                                                                              │
│  • Scans templates/ directory                                               │
│  • Reads meta.json files for metadata                                       │
│  • Generates cli/config/resources.js (static fallback)                      │
│  • Generates templates/catalog.json (dynamic, fetched at runtime)           │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         RUNTIME (CLI & MCP)                                  │
│                                                                              │
│  1. Check memory cache (instant)                                            │
│  2. Check file cache (~1ms)                                                 │
│  3. Fetch catalog.json from GitHub (~100-200ms)                             │
│  4. Fallback to static resources.js                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Adding New Resources

### 1. Add a New Block

```bash
# 1. Create block component in app
app/src/app/blocks/my-block/my-block.component.ts

# 2. Add metadata
app/src/app/blocks/my-block/meta.json
```

```json
{
  "description": "Description for AI and CLI",
  "tags": ["keyword1", "keyword2", "searchable"],
  "dependencies": ["@spartan-ng/helm/button", "@spartan-ng/helm/card"]
}
```

```bash
# 3. Update generate-sources.js CONFIG.blocks.sources array

# 4. Run generation
cd app && pnpm generate:sources
cd ../cli && node scripts/generate-resources.js

# 5. Commit and push - CLI/MCP pick up changes automatically
```

### 2. Add a New Theme

```bash
# 1. Create theme CSS
app/src/themes/my-theme.css

# 2. Add entry to themes meta.json
app/src/themes/meta.json
```

```json
{
  "my-theme.css": {
    "description": "My custom theme description",
    "tags": ["custom", "dark", "modern"]
  }
}
```

### 3. Add a New GRG Component

```bash
# 1. Create component in libs/grg-ui
app/libs/grg-ui/my-component/src/...

# 2. Add metadata
app/libs/grg-ui/my-component/meta.json
```

---

## Scripts

### `app/scripts/generate-sources.js`

Generates template files and copies metadata.

```bash
cd app
pnpm generate:sources
```

**What it does:**
- Transforms block components → standalone template files
- Copies `meta.json` files to `templates/` directory
- Generates `generated-sources.ts` for showcase app

### `cli/scripts/generate-resources.js`

Generates CLI resources and dynamic catalog.

```bash
cd cli
node scripts/generate-resources.js
```

**What it does:**
- Scans `templates/` directory
- Reads `meta.json` files for metadata
- Generates `cli/config/resources.js` (static fallback)
- Generates `templates/catalog.json` (dynamic catalog)

---

## Dynamic Catalog Fetching

CLI and MCP server fetch `catalog.json` from GitHub at runtime with caching:

| Cache Level | TTL | Speed |
|-------------|-----|-------|
| Memory cache | 15 min | <1ms |
| File cache | 15 min | ~1ms |
| GitHub fetch | - | ~100-200ms |
| Static fallback | - | <1ms |

**Benefits:**
- No CLI/MCP redeploy needed for new resources
- Changes propagate within 15 minutes
- Graceful fallback if network fails

---

## File Structure

```
grg-kit/
├── app/
│   ├── src/
│   │   ├── app/blocks/
│   │   │   ├── auth/
│   │   │   │   ├── meta.json           ← Source metadata
│   │   │   │   └── *.component.ts
│   │   │   ├── shell/
│   │   │   │   ├── meta.json
│   │   │   │   └── *.component.ts
│   │   │   └── settings/
│   │   │       ├── meta.json
│   │   │       └── *.component.ts
│   │   └── themes/
│   │       ├── meta.json               ← All themes metadata
│   │       └── *.css
│   ├── libs/grg-ui/
│   │   ├── stepper/meta.json
│   │   └── file-upload/meta.json
│   └── scripts/
│       └── generate-sources.js         ← Stage 1
│
├── cli/
│   ├── config/
│   │   ├── resources.js                ← Generated (static fallback)
│   │   └── catalog-fetcher.js          ← Dynamic fetcher
│   └── scripts/
│       └── generate-resources.js       ← Stage 2
│
├── mcp-server/
│   └── src/
│       ├── index.ts
│       └── catalog-fetcher.ts          ← Dynamic fetcher
│
└── templates/
    ├── catalog.json                    ← Generated (dynamic)
    └── ui/
        ├── blocks/
        │   ├── auth/
        │   │   ├── meta.json           ← Copied from app
        │   │   └── *.component.ts      ← Generated
        │   └── ...
        ├── themes/
        │   ├── meta.json               ← Copied from app
        │   └── *.css
        └── components/
            ├── stepper/meta.json       ← Copied from app
            └── file-upload/meta.json
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Generate templates + copy meta | `cd app && pnpm generate:sources` |
| Generate resources + catalog | `cd cli && node scripts/generate-resources.js` |
| Full regeneration | Run both above |
| Test CLI | `cd cli && node bin/grg.js list` |
| Build MCP | `cd mcp-server && pnpm build` |
