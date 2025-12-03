# Component Templates

> **AUTO-GENERATED** - Do not edit directly.  
> Source of truth: `app/libs/spartan-examples/components/`  
> Run `pnpm generate:components` to regenerate.

## Available Components

| Component | Variants |
|-----------|----------|
| `accordion` | default, multiple-opened |
| `alert` | default, destructive |
| `alert-dialog` | default |
| `aspect-ratio` | default |
| `autocomplete` | default, async, config, countries, form, transform-option-value |
| `avatar` | default |
| `badge` | default, link |
| `breadcrumb` | default, collapsed, custom-separator, dropdown |
| `button` | default, anchor, destructive, ghost, icon, link, outline, secondary, spinner, with-icon |
| `button-group` | default, dropdown-menu, input, nested, orientation, popover, select, separator, size, split, with-text |
| `calendar` | default, multiple, range, year-and-month |
| `card` | default |
| `carousel` | default, orientation, plugins, sizes, slide-count, spacing |
| `checkbox` | default |
| `collapsible` | default |
| `combobox` | default |
| `command` | default, dialog |
| `context-menu` | default |
| `data-table` | default |
| `date-picker` | default, config, date-time, form-multi, form-range, form, format, multi, range |
| `dialog` | default |
| `dropdown-menu` | default |
| `empty` | default |
| `field` | default |
| `form-field` | default |
| `hover-card` | default |
| `icon` | default, multiple, responsive, size |
| `input` | default |
| `input-group` | default |
| `input-otp` | default, form |
| `item` | default |
| `kbd` | default |
| `label` | default |
| `menubar` | default |
| `navigation-menu` | default, controlled, nested, vertical |
| `pagination` | default, advanced-query, advanced, icon-only, query-params |
| `popover` | default |
| `progress` | default |
| `radio-group` | default, card, form |
| `resizable` | default |
| `scroll-area` | default |
| `select` | default |
| `separator` | default |
| `sheet` | default |
| `sidebar` | default |
| `skeleton` | default |
| `slider` | default |
| `sonner` | default |
| `spinner` | default |
| `switch` | default |
| `table` | default |
| `tabs` | default |
| `textarea` | default |
| `toggle` | default |
| `toggle-group` | default |
| `tooltip` | default, simple |


## Usage

Import the generated source map and use it to display component source code:

```typescript
import { componentSourceMap } from './generated-sources';

// Get source code for a specific component variant
const buttonSource = componentSourceMap['button'];
const buttonDestructiveSource = componentSourceMap['button--destructive'];
```

## Dependencies

- `@spartan-ng/helm` - UI components
- `@spartan-ng/brain` - Behavioral components
- `@ng-icons/lucide` - Icons
