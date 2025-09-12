import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // Import CurrencyPipe
import { ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../../services/api';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-top-rated-products',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], // Add CurrencyPipe
  templateUrl: './top-rated-products.html',
  styleUrls: ['./top-rated-products.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopRatedProducts implements OnInit {
  // Signal to hold all top-rated products from the API
  private allTopProducts = signal<any[]>([]);
  
  // Signal for the products currently displayed in the template
  products = signal<any[]>([]);
  
  // Signal to control the "View All" / "Show Less" state
  showAll = signal(false);

  private apiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit(): void {
    // Fetch a larger list of products to sort from
    this.apiService.getProducts(50, 0).subscribe((response) => {
      // Sort all products by rating in descending order
      const sortedProducts = response.products
        .filter((p: { rating: any; }) => typeof p.rating === 'number')
        .sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
      
      // Store the full sorted list
      this.allTopProducts.set(sortedProducts);
      
      // Initially display only the top 4 products
      this.products.set(sortedProducts.slice(0, 4));
    });
  }

  // Toggles the view between the top 4 and all top-rated products
  toggleView(): void {
    this.showAll.set(!this.showAll());

    if (this.showAll()) {
      // If showAll is true, display the entire list
      this.products.set(this.allTopProducts());
    } else {
      // Otherwise, display only the first 4
      this.products.set(this.allTopProducts().slice(0, 4));
    }
  }

  // Calculate the discounted price
  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    return price * (1 - discountPercentage / 100);
  }
}
