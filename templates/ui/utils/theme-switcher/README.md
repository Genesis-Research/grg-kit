# Theme Switcher

A dark/light theme switcher utility for Angular + Spartan UI + Tailwind CSS v4.

## Requirements

- Angular 17+
- Tailwind CSS v4
- `@ng-icons/core` and `@ng-icons/lucide`

```bash
npm install @ng-icons/core @ng-icons/lucide
```

## Installation

```bash
# Pull the theme switcher utility
npx degit your-username/grg-kit/ui/utils/theme-switcher ./src/app/utils/theme-switcher
```

## Setup

### 1. Add Script to index.html

Add this script inside the `<head>` tag of your `index.html` to prevent flash of unstyled content:

```html
<script>
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    if (document && document.documentElement) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  } else {
    if (document && document.documentElement) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
</script>
```

### 2. Configure Tailwind CSS v4

Ensure your Tailwind config supports dark mode with the `dark` class selector. In Tailwind v4, add to your CSS:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

### 3. Use the Theme Toggle Component

```typescript
import { Component } from '@angular/core';
import { ThemeToggleComponent } from './utils/theme-switcher';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeToggleComponent],
  template: `
    <header class="flex items-center justify-between p-4">
      <h1>My App</h1>
      <grg-theme-toggle />
    </header>
  `,
})
export class HeaderComponent {}
```

### 4. Use the Theme Service Directly

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from './utils/theme-switcher';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div>
      <button (click)="themeService.setTheme('light')">Light</button>
      <button (click)="themeService.setTheme('dark')">Dark</button>
      <button (click)="themeService.toggleDarkMode()">Toggle</button>
    </div>
  `,
})
export class SettingsComponent {
  protected themeService = inject(ThemeService);
}
```

## API

### ThemeService

| Method | Description |
|--------|-------------|
| `theme$` | Observable of current theme (`'light'` \| `'dark'`) |
| `toggleDarkMode()` | Toggle between light and dark themes |
| `setTheme(theme)` | Set a specific theme |
| `getCurrentTheme()` | Get current theme synchronously |

### ThemeToggleComponent

A ready-to-use toggle button with sun/moon icons.

| Selector | Description |
|----------|-------------|
| `grg-theme-toggle` | Renders a theme toggle button |

## Customization

### Custom Toggle Component

Create your own toggle using the service:

```typescript
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSunMedium, lucideMoonStar } from '@ng-icons/lucide';
import { ThemeService } from './utils/theme-switcher';

@Component({
  selector: 'app-custom-toggle',
  standalone: true,
  imports: [AsyncPipe, NgIcon],
  viewProviders: [provideIcons({ lucideSunMedium, lucideMoonStar })],
  template: `
    <button
      (click)="themeService.toggleDarkMode()"
      class="p-2 rounded-full bg-primary text-primary-foreground"
    >
      @if ((themeService.theme$ | async) === 'dark') {
        <ng-icon name="lucideSunMedium" />
      } @else {
        <ng-icon name="lucideMoonStar" />
      }
    </button>
  `,
})
export class CustomToggleComponent {
  protected themeService = inject(ThemeService);
}
```