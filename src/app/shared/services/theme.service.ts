import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeKey = 'theme';
  private themeSignal = signal<'light' | 'dark'>('light');

  constructor() {
  }

  setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem(this.themeKey, theme);
    this.themeSignal.set(theme);
    this.applyTheme(theme);
    this.loadBgImage(theme);
  }

  applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }

  getTheme() {
    const storedTheme = localStorage.getItem(this.themeKey) as 'light' | 'dark' || 'light';
    this.themeSignal.set(storedTheme);
    return this.themeSignal();
  }

  loadBgImage(theme: 'light' | 'dark'): void {
    if (theme === 'light') {
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add('theme-dark');
    }
  }


  loadTheme(): void {
    this.getTheme();
    const storedTheme = this.themeSignal()
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyPreferedTheme = (event: MediaQueryListEvent): void => {
      this.applyTheme(event.matches ? 'dark' : 'light');
    }

    if (storedTheme) {
      this.applyTheme(storedTheme);
      this.loadBgImage(storedTheme);
    } else {
      applyPreferedTheme(darkModeMediaQuery as unknown as MediaQueryListEvent);
      darkModeMediaQuery.addEventListener('change', applyPreferedTheme);
    }
  }


}