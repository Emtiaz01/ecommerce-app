import { Directive, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/guards/auth.service';
import { CartService } from '../../core/services/cart';
import { Product } from '../../core/services/wishlist.service';

@Directive({
  selector: '[appAddToCart]',
})
export class AddToCartDirective {
  @Input('appAddToCart') productData: any;

  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);

  @HostListener('click')
  onClick(): void {
    if (!this.authService.currentUser()) {
      alert('Please log in to add items to your cart.');
      this.router.navigate(['/login']);
      return;
    }

    if (!this.productData) {
      console.error('AddToCartDirective: No product data provided!');
      return;
    }
    const product: Product = {
      id: this.productData.id,
      name: this.productData.name || this.productData.title,
      price: this.productData.price,
      imageUrl: this.productData.imageUrl || this.productData.thumbnail,
      originalPrice: this.productData.originalPrice || this.productData.price,
      discount: this.productData.discount || this.productData.discountPercentage
    };

    this.cartService.addToCart(product);
  }
}
