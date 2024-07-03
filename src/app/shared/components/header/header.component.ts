import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

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

  currentTheme: theme = 'light';

  dropDownOpen = false;

  // Injections
  private themeService: ThemeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.getTheme().subscribe(theme => {
      this.currentTheme = theme;
    });
  }


  // Toggle the menu
  toggleMenu(): void {
    this.dropDownOpen = !this.dropDownOpen;
  }

  themeChange(theme: theme): void {
    this.themeService.setTheme(theme);
  }

  // Close the menu when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.menuContainer.nativeElement.contains(event.target)) {
      this.dropDownOpen = false;
    }
  }

}