import { Directive, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { WishlistService, Product } from '../services/wishlist.service';

@Directive({
  selector: '[appAddToWishlist]',
  standalone: true,
})
export class AddToWishlistDirective {
  @Input('appAddToWishlist') productData: any;

  private authService = inject(AuthService);
  private wishlistService = inject(WishlistService);
  private router = inject(Router);

  @HostListener('click')
  onClick(): void {
    if (this.authService.currentUser()) {
      if (!this.productData) {
        console.error('AddToWishlistDirective: No product data provided!');
        return;
      }

      // --- MODIFIED LOGIC ---
      // Check if a valid discount exists.
      const hasDiscount = this.productData.discountPercentage && this.productData.discountPercentage > 0;

      // Create the base product object.
      const product: Product = {
        id: this.productData.id,
        name: this.productData.title,
        price: hasDiscount ? this.calculateDiscountedPrice(this.productData.price, this.productData.discountPercentage) : this.productData.price,
        imageUrl: this.productData.thumbnail,
      };

      // Only add discount-related properties if a discount exists.
      if (hasDiscount) {
        product.originalPrice = this.productData.price;
        product.discount = this.productData.discountPercentage;
      }

      this.wishlistService.addToWishlist(product);
      alert('Added to Wishlist');

    } else {
      alert('Please log in to add items to your wishlist.');
      this.router.navigate(['/login']);
    }
  }

  private calculateDiscountedPrice(price: number, discountPercentage: number): number {
    return price * (1 - discountPercentage / 100);
  }
}
