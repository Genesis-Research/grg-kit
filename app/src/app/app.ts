import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService, ColorTheme } from './services/theme.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSun, lucideMoon, lucidePalette } from '@ng-icons/lucide';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HlmButtonImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmSwitchImports,
    HlmLabelImports,
    NgIcon,
  ],
  providers: [provideIcons({ lucideSun, lucideMoon, lucidePalette })],
  template: `
    <div class="min-h-screen bg-background text-foreground">
      <header class="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex h-14 items-center justify-between">
            <div class="flex items-center gap-6">
              <h1 class="text-lg font-semibold">GRG Kit</h1>
              <nav class="flex items-center gap-1">
                <a
                  routerLink="/"
                  routerLinkActive="bg-accent text-accent-foreground"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Getting Started
                </a>
                <a
                  routerLink="/components"
                  routerLinkActive="bg-accent text-accent-foreground"
                  class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Spartan Components
                </a>
                <a
                  routerLink="/blocks"
                  routerLinkActive="bg-accent text-accent-foreground"
                  class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Blocks
                </a>
                <a
                  routerLink="/grg-components"
                  routerLinkActive="bg-accent text-accent-foreground"
                  class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  GRG Components
                </a>
                <a
                  routerLink="/colors"
                  routerLinkActive="bg-accent text-accent-foreground"
                  class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Colors
                </a>
                <a
                  routerLink="/typography"
                  routerLinkActive="bg-accent text-accent-foreground"
                  class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Typography
                </a>
                <a
                  routerLink="/data-table"
                  routerLinkActive="bg-accent text-accent-foreground"
                  class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Data Table
                </a>
              </nav>
            </div>
            <div class="flex items-center gap-4">
              <!-- Theme Dropdown -->
              <brn-select
                class="inline-block"
                [value]="themeService.colorTheme()"
                (valueChange)="onThemeChange($event)"
              >
                <hlm-select-trigger class="w-44">
                  <ng-icon name="lucidePalette" class="mr-2 h-4 w-4" />
                  <hlm-select-value />
                </hlm-select-trigger>
                <hlm-select-content>
                  @for (theme of themeService.availableThemes; track theme.id) {
                    <hlm-option [value]="theme.id">{{ theme.name }}</hlm-option>
                  }
                </hlm-select-content>
              </brn-select>

              <!-- Dark Mode Toggle -->
              <label class="flex items-center gap-2 cursor-pointer" hlmLabel>
                <ng-icon name="lucideSun" class="h-4 w-4" />
                <hlm-switch
                  [checked]="themeService.isDarkMode()"
                  (checkedChange)="onDarkModeChange($event)"
                />
                <ng-icon name="lucideMoon" class="h-4 w-4" />
              </label>
            </div>
          </div>
        </div>
      </header>

      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [],
})
export class App {
  themeService = inject(ThemeService);

  onThemeChange(theme: ColorTheme | ColorTheme[] | undefined): void {
    if (theme && typeof theme === 'string') {
      this.themeService.setColorTheme(theme);
    }
  }

  onDarkModeChange(isDark: boolean): void {
    this.themeService.setDarkMode(isDark ? 'dark' : 'light');
  }
}
