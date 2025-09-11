// top-rated-products.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, inject } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-top-rated-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-rated-products.html',
  styleUrls: ['./top-rated-products.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopRatedProducts implements OnInit {
  products = signal<any[]>([]);

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.apiService.getProducts(50, 0).subscribe((response) => {
      // Sort all products by rating descending and take top 4
      const topProducts = response.products
        .filter((p: { rating: any; }) => typeof p.rating === 'number')
        .sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating)
        .slice(0, 4);
      this.products.set(topProducts);
    });
  }
    // Calculate the discounted price.
  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    return price * (1 - discountPercentage / 100);
  }

}
