import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeKey = 'theme';
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  private themeSignal = signal<'light' | 'dark'>('light');

  constructor() {
    const storedTheme = localStorage.getItem(this.themeKey) as 'light' | 'dark' || 'light';
    this.themeSubject = new BehaviorSubject<'light' | 'dark'>(storedTheme);    
    this.applyTheme(storedTheme);
  }

  setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem(this.themeKey, theme);
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }

  getTheme(): Observable<'light' | 'dark'> {
    return this.themeSubject.asObservable();
  }

  loadBgImage(theme: 'light' | 'dark'): void {
    if ( theme === 'light') {
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add('theme-dark');
    }
  }


  loadTheme(): void {
    const storedTheme = this.getTheme();
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyPreferedTheme = (event: MediaQueryListEvent): void => {
      this.applyTheme(event.matches ? 'dark' : 'light');
    }

    if (storedTheme) {
      storedTheme.subscribe(theme => {
        this.applyTheme(theme);
        this.loadBgImage(theme);
      });
    } else {
      applyPreferedTheme(darkModeMediaQuery as unknown as MediaQueryListEvent);
      darkModeMediaQuery.addEventListener('change', applyPreferedTheme);      
    }
  }


}