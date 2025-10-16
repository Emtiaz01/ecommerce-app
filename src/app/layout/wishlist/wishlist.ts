import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { ApiService } from '../../core/services/api';
import { AddToWishlistDirective } from '../../shared/directives/add-to-wishlist'; 
import { AddToCartDirective } from '../../shared/directives/add-to-cart'; 
import { CartService } from '../../core/services/cart';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, AddToWishlistDirective, AddToCartDirective, NgxSkeletonLoaderModule, TranslateModule, NgOptimizedImage], 
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
  loading = signal(true);

  ngOnInit(): void {
    setTimeout(() => {
      this.apiService.getJustForYou().subscribe(products => {
        this.justForYouProducts.set(products);
        this.loading.set(false);
      });
    }, 1500);
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
