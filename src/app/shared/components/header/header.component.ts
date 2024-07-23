import { Component, ElementRef, HostListener, OnInit, ViewChild, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

type theme = 'light' | 'dark';

@Component({
  selector: 'header[app-header]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @ViewChild('menuContainer') menuContainer!: ElementRef;

  currentTheme = signal<'light' | 'dark'>('light');

  dropDownOpen = false;

  // Injections
  private themeService: ThemeService = inject(ThemeService);

  ngOnInit(): void {
    this.currentTheme.set(this.themeService.getTheme());
  }

  // Toggle the menu
  toggleMenu(): void {
    this.dropDownOpen = !this.dropDownOpen;
  }

  themeChange(theme: theme): void {
    this.themeService.setTheme(theme);
    this.currentTheme.set(theme);
  }

  // Close the menu when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.menuContainer.nativeElement.contains(event.target)) {
      this.dropDownOpen = false;
    }
  }

}