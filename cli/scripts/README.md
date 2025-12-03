# CLI Scripts

## generate-resources.js

Automatically generates `config/resources.js` by scanning the `templates/` directory.

### Purpose

Ensures the CLI always has up-to-date resource definitions based on what's actually available in the templates, preventing:
- Outdated resource lists
- Manual maintenance errors
- Mismatched paths
- Missing new resources

### Usage

```bash
# Run manually
npm run generate

# Or directly
node scripts/generate-resources.js
```

### Auto-Generation

The script runs automatically before publishing:
```bash
npm publish  # Runs prepublishOnly hook → npm run generate
```

### What It Does

1. **Scans templates directory** for:
   - Themes (`templates/ui/themes/*.css`)
   - Components (`templates/ui/components/*/`)
   - Layouts (`templates/ui/layouts/*/`)
   - Examples (`templates/spartan-examples/components/(*)`)

2. **Generates metadata** for each resource:
   - Name, title, description
   - Path and default output location
   - Tags for searchability
   - Dependencies (if applicable)

3. **Writes `config/resources.js`** with structured data

### Output

```
🔍 Scanning templates directory...
✓ Found 6 themes
✓ Found 2 components
✓ Found 3 layouts
✓ Found 56 example components

✅ Generated /path/to/config/resources.js

📦 Resource Summary:
   Themes: 6
   Components: 2
   Layouts: 3
   Examples: 56
```

### Customizing Metadata

Edit the metadata constants in `generate-resources.js`:

```javascript
const THEME_METADATA = {
  'grg-theme.css': {
    description: 'Default theme with purple/orange accents',
    tags: ['default', 'purple', 'orange', 'colorful']
  }
};

const COMPONENT_METADATA = {
  'stepper': {
    description: 'Multi-step form component',
    tags: ['form', 'wizard'],
    dependencies: ['@spartan-ng/helm/button']
  }
};
```

### Benefits

✅ **Always accurate** - Resources match what's in templates  
✅ **No manual updates** - Add files to templates, run script  
✅ **Type-safe** - Consistent structure for all resources  
✅ **MCP-ready** - Structured metadata for LLM consumption  
✅ **Auto-discovery** - New resources automatically included  

### Development Workflow

1. Add new resource to `templates/` directory
2. (Optional) Add metadata to script constants
3. Run `npm run generate`
4. Test with `grg list` or `grg add`
5. Publish with `npm publish` (auto-generates)
