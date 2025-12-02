import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  OnDestroy,
  PLATFORM_ID,
  RendererFactory2,
} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  // Platform check for SSR compatibility
  private _platformId = inject(PLATFORM_ID);
  // Renderer for DOM manipulation
  private _renderer = inject(RendererFactory2).createRenderer(null, null);
  // Document injection token
  private _document = inject(DOCUMENT);

  // Theme state management
  private _theme$ = new ReplaySubject<Theme>(1);
  public theme$ = this._theme$.asObservable();
  private _destroyed$ = new Subject<void>();

  constructor() {
    this.syncThemeFromLocalStorage();
    this.toggleClassOnThemeChanges();
  }

  /**
   * Sync theme from localStorage (set by index.html script)
   */
  private syncThemeFromLocalStorage(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._theme$.next(
        localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
      );
    }
  }

  /**
   * Subscribe to theme changes and update DOM
   */
  private toggleClassOnThemeChanges(): void {
    this.theme$.pipe(takeUntil(this._destroyed$)).subscribe((theme: Theme) => {
      if (theme === 'dark') {
        this._renderer.addClass(this._document.documentElement, 'dark');
      } else {
        if (this._document.documentElement.className.includes('dark')) {
          this._renderer.removeClass(this._document.documentElement, 'dark');
        }
      }
    });
  }

  /**
   * Toggle between light and dark themes
   */
  public toggleDarkMode(): void {
    if (isPlatformBrowser(this._platformId)) {
      const newTheme: Theme =
        localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      this._theme$.next(newTheme);
    }
  }

  /**
   * Set a specific theme
   */
  public setTheme(theme: Theme): void {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem('theme', theme);
      this._theme$.next(theme);
    }
  }

  /**
   * Get current theme synchronously
   */
  public getCurrentTheme(): Theme {
    if (isPlatformBrowser(this._platformId)) {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
