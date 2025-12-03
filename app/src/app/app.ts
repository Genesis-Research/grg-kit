import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HlmButtonImports],
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
                  Spartan Components
                </a>
                <a
                  routerLink="/layouts"
                  routerLinkActive="bg-accent text-accent-foreground"
                  class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Layouts
                </a>
                <a
                  routerLink="/blocks"
                  routerLinkActive="bg-accent text-accent-foreground"
                  class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  GRG Components
                </a>
                <a
                  routerLink="/demos"
                  routerLinkActive="bg-accent text-accent-foreground"
                  class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Component Demos
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
            <button hlmBtn variant="outline" size="sm" (click)="themeService.toggleDarkMode()">
              Toggle Theme
            </button>
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
}
