import { Component, OnInit, computed, inject, signal, effect, Pipe } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart'; 
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './header2.html',
  styleUrls: ['./header2.scss']
})
export class Header2 implements OnInit {
  isRegistrationPage = false;
  isDropdownOpen = signal(false);

  authService = inject(AuthService);
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  isLoggedIn = computed(() => !!this.authService.currentUser());

  constructor(private router: Router) {
    effect(() => {
      console.log('Is Logged In:', this.isLoggedIn());
      console.log('Wishlist Count:', this.wishlistService.wishlistCount());
      console.log('Cart Count:', this.cartService.cartCount());
    });
  }

  viewCart(): void {
    this.router.navigate(['/cart']);
  }

  ngOnInit(): void {
    this.setFlag(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setFlag(event.urlAfterRedirects);
      }
    });
  }

  private setFlag(url: string): void {
    this.isRegistrationPage =
      url === '/registration' || url.startsWith('/registration?');
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update(value => !value);
  }

  logout(): void {
    this.isDropdownOpen.set(false);
    this.authService.logout();
  }
}
