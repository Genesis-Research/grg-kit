import { inject, Injectable, OnDestroy, signal, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type DarkMode = 'light' | 'dark';

export type ColorTheme = 'claude' | 'grg' | 'amber-minimal' | 'clean-slate' | 'modern-minimal' | 'mocks';

export interface ThemeConfig {
  id: ColorTheme;
  name: string;
  description: string;
}

export const AVAILABLE_THEMES: ThemeConfig[] = [
  { id: 'claude', name: 'Claude', description: 'Inspired by Claude\'s interface' },
  { id: 'grg', name: 'GRG', description: 'Default GRG theme with purple/violet accents' },
  { id: 'amber-minimal', name: 'Amber Minimal', description: 'Warm amber tones with minimal styling' },
  { id: 'clean-slate', name: 'Clean Slate', description: 'Clean blue/indigo palette' },
  { id: 'modern-minimal', name: 'Modern Minimal', description: 'Modern purple with subtle accents' },
  { id: 'mocks', name: 'Mocks', description: 'Sketch-style theme for wireframes' },
];

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  private _document = inject(DOCUMENT);

  // Dark mode state (light/dark)
  private _darkMode$ = new ReplaySubject<DarkMode>(1);
  public darkMode$ = this._darkMode$.asObservable();
  private _destroyed$ = new Subject<void>();

  // Color theme state (signal-based)
  private _colorTheme = signal<ColorTheme>(this.getStoredColorTheme());
  public colorTheme = this._colorTheme.asReadonly();

  // Computed for current theme config
  public currentThemeConfig = computed(() => 
    AVAILABLE_THEMES.find(t => t.id === this._colorTheme()) ?? AVAILABLE_THEMES[0]
  );

  // Available themes for UI
  public readonly availableThemes = AVAILABLE_THEMES;

  constructor() {
    this.syncDarkModeFromLocalStorage();
    this.syncColorThemeFromLocalStorage();
    this.toggleClassOnDarkModeChanges();
  }

  private getStoredColorTheme(): ColorTheme {
    const stored = localStorage.getItem('colorTheme') as ColorTheme;
    return AVAILABLE_THEMES.some(t => t.id === stored) ? stored : 'claude';
  }

  private syncDarkModeFromLocalStorage(): void {
    this._darkMode$.next(
      localStorage.getItem('darkMode') === 'dark' ? 'dark' : 'light'
    );
  }

  private syncColorThemeFromLocalStorage(): void {
    const theme = this.getStoredColorTheme();
    this._colorTheme.set(theme);
    this.applyColorTheme(theme);
  }

  private toggleClassOnDarkModeChanges(): void {
    this.darkMode$.pipe(takeUntil(this._destroyed$)).subscribe((mode: DarkMode) => {
      const html = this._document.documentElement;
      if (mode === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    });
  }

  private applyColorTheme(theme: ColorTheme): void {
    this._document.documentElement.setAttribute('data-theme', theme);
  }

  // Dark mode methods
  public toggleDarkMode(): void {
    const newMode: DarkMode =
      localStorage.getItem('darkMode') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('darkMode', newMode);
    this._darkMode$.next(newMode);
  }

  public setDarkMode(mode: DarkMode): void {
    localStorage.setItem('darkMode', mode);
    this._darkMode$.next(mode);
  }

  public isDarkMode(): boolean {
    return localStorage.getItem('darkMode') === 'dark';
  }

  // Color theme methods
  public setColorTheme(theme: ColorTheme): void {
    localStorage.setItem('colorTheme', theme);
    this._colorTheme.set(theme);
    this.applyColorTheme(theme);
  }

  public getColorTheme(): ColorTheme {
    return this._colorTheme();
  }

  // Legacy compatibility
  public getCurrentTheme(): DarkMode {
    return localStorage.getItem('darkMode') === 'dark' ? 'dark' : 'light';
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
