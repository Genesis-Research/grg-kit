import { inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  private _document = inject(DOCUMENT);

  private _theme$ = new ReplaySubject<Theme>(1);
  public theme$ = this._theme$.asObservable();
  private _destroyed$ = new Subject<void>();

  constructor() {
    this.syncThemeFromLocalStorage();
    this.toggleClassOnThemeChanges();
  }

  private syncThemeFromLocalStorage(): void {
    this._theme$.next(
      localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    );
  }

  private toggleClassOnThemeChanges(): void {
    this.theme$.pipe(takeUntil(this._destroyed$)).subscribe((theme: Theme) => {
      const html = this._document.documentElement;
      if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    });
  }

  public toggleDarkMode(): void {
    const newTheme: Theme =
      localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    this._theme$.next(newTheme);
  }

  public setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    this._theme$.next(theme);
  }

  public getCurrentTheme(): Theme {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
