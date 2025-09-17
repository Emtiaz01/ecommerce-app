import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { WishlistService } from '../../../app/services/wishlist.service';
import { ApiService } from '../../../app/services/api';
import { ProtectedClickDirective } from '../../../app/directives/protected-click';
import { AddToWishlistDirective } from '../../../app/directives/add-to-wishlist'; 
import { AddToCartDirective } from '../../../app/directives/add-to-cart'; 

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ProtectedClickDirective, AddToWishlistDirective, AddToCartDirective], 
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.scss']
})
export class Wishlist implements OnInit {
  public wishlistService = inject(WishlistService);
  private apiService = inject(ApiService);
  private router = inject(Router);

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

}
