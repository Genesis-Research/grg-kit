/**
 * Shell Topnav Component
 * 
 * A standalone Angular component ready to use in your project.
 * Copy this file to your project and customize as needed.
 * 
 * Dependencies:
 * - @spartan-ng/helm (UI components)
 * - @ng-icons/lucide (icons)
 * - @angular/forms (if using forms)
 */
import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBell, lucideSearch, lucideChevronDown, lucideLogOut, lucideUser, lucideSettings, lucideSun, lucideMoon } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [NgIcon, HlmIcon, HlmButtonImports, HlmInputImports, HlmDropdownMenuImports],
  viewProviders: [provideIcons({ lucideBell, lucideSearch, lucideChevronDown, lucideLogOut, lucideUser, lucideSettings, lucideSun, lucideMoon })],
  template: `
    <div class="flex flex-col h-full">
      <header class="border-b bg-card">
        <div class="flex h-14 items-center px-6 gap-6">
          <div class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span class="text-sm font-bold">A</span>
            </div>
            <span class="font-semibold">Acme Inc</span>
          </div>
          <nav class="flex items-center gap-1">
            @for (item of navItems; track item.label) {
              <a href="#" class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
                 [class]="item.active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'">
                {{ item.label }}
              </a>
            }
          </nav>
          <div class="flex-1"></div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <ng-icon hlm name="lucideSearch" size="sm" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input hlmInput type="search" placeholder="Search..." class="pl-9 w-64" />
            </div>
            <button hlmBtn variant="ghost" size="icon" (click)="toggleTheme()">
              <ng-icon hlm [name]="isDark() ? 'lucideSun' : 'lucideMoon'" size="sm" />
            </button>
            <button hlmBtn variant="ghost" size="icon"><ng-icon hlm name="lucideBell" size="sm" /></button>
            <button hlmBtn variant="ghost" size="sm" [hlmDropdownMenuTrigger]="userMenu">
              <div class="flex h-6 w-6 items-center justify-center rounded-full bg-muted"><ng-icon hlm name="lucideUser" size="xs" /></div>
              <ng-icon hlm name="lucideChevronDown" size="xs" />
            </button>
            <ng-template #userMenu>
              <hlm-dropdown-menu class="w-48">
                <hlm-dropdown-menu-label>My Account</hlm-dropdown-menu-label>
                <hlm-dropdown-menu-separator />
                <button hlmDropdownMenuItem><ng-icon hlm name="lucideUser" class="mr-2" size="sm" />Profile</button>
                <button hlmDropdownMenuItem><ng-icon hlm name="lucideSettings" class="mr-2" size="sm" />Settings</button>
                <hlm-dropdown-menu-separator />
                <button hlmDropdownMenuItem><ng-icon hlm name="lucideLogOut" class="mr-2" size="sm" />Log out</button>
              </hlm-dropdown-menu>
            </ng-template>
          </div>
        </div>
      </header>
      <main class="flex-1 p-6 bg-muted/30 overflow-auto">
        <div class="max-w-5xl mx-auto space-y-6">
          <div><h1 class="text-2xl font-bold">Welcome back, John</h1><p class="text-muted-foreground">Here's what's happening with your projects today.</p></div>
          <div class="grid gap-4 md:grid-cols-4">
            <div class="rounded-lg border bg-card p-4"><p class="text-sm text-muted-foreground">Total Users</p><p class="text-2xl font-bold">1,234</p></div>
            <div class="rounded-lg border bg-card p-4"><p class="text-sm text-muted-foreground">Revenue</p><p class="text-2xl font-bold">$12,345</p></div>
            <div class="rounded-lg border bg-card p-4"><p class="text-sm text-muted-foreground">Active Projects</p><p class="text-2xl font-bold">23</p></div>
            <div class="rounded-lg border bg-card p-4"><p class="text-sm text-muted-foreground">Pending Tasks</p><p class="text-2xl font-bold">8</p></div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class TopnavComponent {
  isDark = signal(typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));

  toggleTheme() {
    document.documentElement.classList.toggle('dark');
    this.isDark.set(document.documentElement.classList.contains('dark'));
  }

  navItems = [
    { label: 'Dashboard', active: true },
    { label: 'Projects', active: false },
    { label: 'Team', active: false },
    { label: 'Reports', active: false },
  ];
}