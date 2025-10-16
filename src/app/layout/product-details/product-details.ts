import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ApiService } from '../../core/services/api';
import { FormsModule } from '@angular/forms';
import { AddToCartDirective } from '../../shared/directives/add-to-cart';
import { AddToWishlistDirective } from '../../shared/directives/add-to-wishlist';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule, RouterModule, AddToCartDirective, AddToWishlistDirective, NgOptimizedImage],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetails implements OnInit {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);

  product: any = null;
  relatedProducts: any[] = [];
  images: string[] = [];
  selectedImage: string = '';
  quantity: number = 1;
  
  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.apiService.getProductById(productId).subscribe(product => {
      this.product = product;
      this.images = [product.thumbnail, ...product.images || []];
      this.selectedImage = product.thumbnail;
      // Fetch related
      this.apiService.getProductsByCategory(product.category).subscribe(res =>
        this.relatedProducts = res.products.filter((p: any) => p.id !== productId).slice(0, 4));
    });
  }
  //   calculateDiscountedPrice(price: number, discountPercentage: number): number {
  //   return price * (1 - discountPercentage / 100);
  // }
  viewProduct(productId: number): void {
    window.location.href = `/product/${productId}`;
  }

  setImage(img: string) { this.selectedImage = img; }
  decQty() { if (this.quantity > 1) this.quantity--; }
  incQty() { this.quantity++; }
  
}
