import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../../services/api';
import { Router } from '@angular/router'; 
import { AddToWishlistDirective } from '../../../directives/add-to-wishlist';
import { AddToCartDirective } from '../../../directives/add-to-cart'; 

@Component({
  selector: 'app-top-rated-products',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, AddToWishlistDirective, AddToCartDirective], 
  templateUrl: './top-rated-products.html',
  styleUrls: ['./top-rated-products.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopRatedProducts implements OnInit {
  private allTopProducts = signal<any[]>([]);
  products = signal<any[]>([]);
  showAll = signal(false);

  private apiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit(): void {
    this.apiService.getProducts(50, 0).subscribe((response) => {
      const sortedProducts = response.products
        .filter((p: { rating: any; }) => typeof p.rating === 'number')
        .sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
    
      this.allTopProducts.set(sortedProducts);
      this.products.set(sortedProducts.slice(0, 4));
    });
  }

  toggleView(): void {
    this.showAll.set(!this.showAll());

    if (this.showAll()) {
      this.products.set(this.allTopProducts());
    } else {
      this.products.set(this.allTopProducts().slice(0, 4));
    }
  }

  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    return price * (1 - discountPercentage / 100);
  }
}
