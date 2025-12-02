import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSun, lucideMoon } from '@ng-icons/lucide';
import { ThemeService } from './theme.service';

@Component({
  selector: 'grg-theme-toggle',
  standalone: true,
  imports: [AsyncPipe, NgIcon],
  viewProviders: [provideIcons({ lucideSun, lucideMoon })],
  template: `
    <button
      type="button"
      (click)="themeService.toggleDarkMode()"
      class="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      [attr.aria-label]="(themeService.theme$ | async) === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      @if ((themeService.theme$ | async) === 'dark') {
        <ng-icon name="lucideSun" class="h-5 w-5" />
      } @else {
        <ng-icon name="lucideMoon" class="h-5 w-5" />
      }
    </button>
  `,
})
export class ThemeToggleComponent {
  protected themeService = inject(ThemeService);
}
