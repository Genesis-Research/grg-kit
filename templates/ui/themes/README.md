# Themes

A collection of CSS themes for the GRG Kit design system.

## Available Themes

| Theme | File | Description |
|-------|------|-------------|
| `grg` | `grg-theme.css` | Default GRG theme with blue accents |
| `claude` | `claude.css` | Inspired by Claude's interface |
| `amber-minimal` | `amber-minimal.css` | Warm amber tones with minimal styling |
| `clean-slate` | `clean-slate.css` | Clean blue/indigo palette |
| `modern-minimal` | `modern-minimal.css` | Modern purple with subtle accents |
| `chroma-clinic` | `chroma-clinic.css` | Professional blue theme for healthcare |
| `bio-lab` | `bio-lab.css` | Fresh green theme for life sciences |
| `pharma-teal` | `pharma-teal.css` | Calming teal for pharmaceutical apps |
| `helix-purple` | `helix-purple.css` | DNA-inspired purple for genomics |

## Usage

Import the theme CSS file in your `styles.css`:

```css
@import 'grg-kit/ui/themes/grg-theme.css';
```

The theme applies to `:root` by default. For dark mode, add the `.dark` class to your root element:

```html
<html class="dark">
  <!-- Your app content -->
</html>
```

### Multiple Themes (Optional)

If you need to support multiple themes in your app, each theme also supports a `data-theme` attribute:

```html
<html data-theme="claude">
  <!-- Your app content -->
</html>
```

For dark mode with `data-theme`:

```html
<!-- Option A: Combine theme with .dark class -->
<html data-theme="claude" class="dark">

<!-- Option B: Use explicit dark theme name -->
<html data-theme="claude-dark">
```

## Theme Switching

To switch themes dynamically with JavaScript:

```typescript
// Set theme
document.documentElement.setAttribute('data-theme', 'amber-minimal');

// Set dark mode
document.documentElement.classList.add('dark');
// or use explicit dark theme
document.documentElement.setAttribute('data-theme', 'amber-minimal-dark');

// Remove theme (revert to default)
document.documentElement.removeAttribute('data-theme');
```

## Theme Structure

Each theme defines CSS custom properties for:

- **Colors**: `--background`, `--foreground`, `--primary`, `--secondary`, `--accent`, `--muted`, `--destructive`, `--border`, `--input`, `--ring`, `--card`, `--popover`, `--sidebar-*`, `--chart-*`
- **Typography**: `--font-sans`, `--font-serif`, `--font-mono`
- **Spacing**: `--spacing`, `--radius`
- **Shadows**: `--shadow-2xs` through `--shadow-2xl`
- **Tracking**: `--tracking-tighter` through `--tracking-widest`

## Creating Custom Themes

1. Copy an existing theme file as a starting point
2. Update the theme name comment at the top
3. Add your theme selectors:

```css
/* Theme: my-custom-theme */

:root,
[data-theme="my-custom-theme"] {
  /* Light mode variables */
}

.dark,
[data-theme="my-custom-theme"].dark,
[data-theme="my-custom-theme-dark"] {
  /* Dark mode variables */
}

@theme inline {
  /* Tailwind CSS v4 theme mappings */
}
```
