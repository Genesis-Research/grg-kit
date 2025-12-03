import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHome, lucideUsers, lucideSettings, lucideFileText, lucideBarChart3, lucideBell, lucideUser } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-shell-sidebar-layout',
  standalone: true,
  imports: [NgIcon, HlmIcon, HlmButtonImports],
  viewProviders: [provideIcons({ lucideHome, lucideUsers, lucideSettings, lucideFileText, lucideBarChart3, lucideBell, lucideUser })],
  template: `
    <div class="flex h-full">
      <aside class="w-64 border-r bg-card flex flex-col">
        <div class="p-4 border-b">
          <div class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span class="text-sm font-bold">A</span>
            </div>
            <span class="font-semibold">Acme Inc</span>
          </div>
        </div>
        <nav class="flex-1 p-4 space-y-1">
          @for (item of navItems; track item.label) {
            <a href="#" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
               [class]="item.active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'">
              <ng-icon hlm [name]="item.icon" size="sm" />
              {{ item.label }}
            </a>
          }
        </nav>
        <div class="p-4 border-t">
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <ng-icon hlm name="lucideUser" size="sm" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate">John Doe</p>
              <p class="text-xs text-muted-foreground truncate">john&#64;example.com</p>
            </div>
          </div>
        </div>
      </aside>
      <div class="flex-1 flex flex-col">
        <header class="h-14 border-b px-6 flex items-center justify-between">
          <h1 class="text-lg font-semibold">Dashboard</h1>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="ghost" size="icon"><ng-icon hlm name="lucideBell" size="sm" /></button>
            <button hlmBtn variant="ghost" size="icon"><ng-icon hlm name="lucideSettings" size="sm" /></button>
          </div>
        </header>
        <main class="flex-1 p-6 bg-muted/30 overflow-auto">
          <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-lg border bg-card p-4"><p class="text-sm text-muted-foreground">Total Users</p><p class="text-2xl font-bold">1,234</p></div>
            <div class="rounded-lg border bg-card p-4"><p class="text-sm text-muted-foreground">Revenue</p><p class="text-2xl font-bold">$12,345</p></div>
            <div class="rounded-lg border bg-card p-4"><p class="text-sm text-muted-foreground">Active Projects</p><p class="text-2xl font-bold">23</p></div>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class ShellSidebarLayoutComponent {
  navItems = [
    { icon: 'lucideHome', label: 'Dashboard', active: true },
    { icon: 'lucideUsers', label: 'Users', active: false },
    { icon: 'lucideFileText', label: 'Documents', active: false },
    { icon: 'lucideBarChart3', label: 'Analytics', active: false },
    { icon: 'lucideSettings', label: 'Settings', active: false },
  ];
}
