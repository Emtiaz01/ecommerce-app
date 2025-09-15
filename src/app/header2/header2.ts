import { Component, OnInit, computed, inject, signal, effect } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; // <-- Import AuthService

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- Add RouterModule
  templateUrl: './header2.html',
  styleUrl: './header2.scss'
})
export class Header2 implements OnInit {
  // --- Existing Functionality ---
  isRegistrationPage = false;

  // --- New Authentication Functionality ---
  authService = inject(AuthService);
  isLoggedIn = computed(() => !!this.authService.currentUser());
  isDropdownOpen = signal(false);

  constructor(private router: Router) {

    // --- ADD THIS FOR DEBUGGING ---
    effect(() => {
      console.log('Is Logged In:', this.isLoggedIn());
    });
  }
  

  ngOnInit(): void {
    // --- Existing Logic ---
    this.setFlag(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setFlag(event.urlAfterRedirects);
      }
    });
  }

  private setFlag(url: string) {
    this.isRegistrationPage = url === '/registration' || url.startsWith('/registration?');
  }

  // --- New Dropdown and Logout Methods ---
  toggleDropdown(): void {
    this.isDropdownOpen.update(value => !value);
  }

  logout(): void {
    this.isDropdownOpen.set(false); // Close dropdown on logout
    this.authService.logout();
  }
}
