import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { WishlistService } from '../../../app/services/wishlist.service';
import { ApiService } from '../../../app/services/api';
import { AddToWishlistDirective } from '../../../app/directives/add-to-wishlist'; 
import { AddToCartDirective } from '../../../app/directives/add-to-cart'; 
import { CartService } from '../../../app/services/cart';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, AddToWishlistDirective, AddToCartDirective], 
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.scss']
})
export class Wishlist implements OnInit {
  public wishlistService = inject(WishlistService);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private cartService = inject(CartService);

  justForYouProducts = signal<any[]>([]); 
  showAllJustForYou = signal(false);

  ngOnInit(): void {
    this.apiService.getJustForYou().subscribe(products => {
      this.justForYouProducts.set(products);
    });
  }

  removeItem(productId: string): void {
    this.wishlistService.removeFromWishlist(productId);
  }

  toggleViewAll(): void {
    this.showAllJustForYou.set(!this.showAllJustForYou());
  }

  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    return price * (1 - discountPercentage / 100);
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  moveAllToCart(): void {
    this.wishlistService.wishlistItems().forEach(product => {
      this.cartService.addToCart(product);
      this.wishlistService.removeFromWishlist(product.id);
    });
  }
}
