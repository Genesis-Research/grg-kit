import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-background text-foreground p-8">
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold">GRG Kit Demo</h1>
        <button
          (click)="themeService.toggleDarkMode()"
          class="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Toggle Theme
        </button>
      </header>

      <main class="space-y-8">
        <section class="p-6 rounded-lg bg-card text-card-foreground border border-border">
          <h2 class="text-xl font-semibold mb-4">Color Palette</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-4 rounded bg-primary text-primary-foreground">Primary</div>
            <div class="p-4 rounded bg-secondary text-secondary-foreground">Secondary</div>
            <div class="p-4 rounded bg-accent text-accent-foreground">Accent</div>
            <div class="p-4 rounded bg-muted text-muted-foreground">Muted</div>
            <div class="p-4 rounded bg-destructive text-destructive-foreground">Destructive</div>
            <div class="p-4 rounded bg-card text-card-foreground border border-border">Card</div>
            <div class="p-4 rounded bg-popover text-popover-foreground border border-border">Popover</div>
            <div class="p-4 rounded bg-sidebar text-sidebar-foreground border border-border">Sidebar</div>
          </div>
        </section>

        <section class="p-6 rounded-lg bg-card text-card-foreground border border-border">
          <h2 class="text-xl font-semibold mb-4">Typography</h2>
          <p class="font-sans mb-2">Sans: The quick brown fox jumps over the lazy dog</p>
          <p class="font-serif mb-2">Serif: The quick brown fox jumps over the lazy dog</p>
          <p class="font-mono">Mono: The quick brown fox jumps over the lazy dog</p>
        </section>

        <router-outlet />
      </main>
    </div>
  `,
  styles: [],
})
export class App {
  themeService = inject(ThemeService);
}
