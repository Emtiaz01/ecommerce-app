import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../../services/api';
import { Router } from '@angular/router';
import { ProtectedClickDirective } from '../../../directives/protected-click'; 
import { AddToWishlistDirective } from '../../../directives/add-to-wishlist';
import { AddToCartDirective } from "../../../directives/add-to-cart";

@Component({
  selector: 'app-explore-product',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, AddToWishlistDirective, AddToCartDirective],
  templateUrl: './explore-product.html',
  styleUrls: ['./explore-product.scss']
})
export class ExploreProduct implements OnInit {
  products = signal<any[]>([]);
  currentPage = signal(0);
  readonly PAGE_SIZE = 8;
  
  showAll = signal(false);

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getExploreProducts().subscribe(productsFromApi => {
      const productsWithDisplayImage = productsFromApi.map(product => ({
        ...product,
        displayImage: product.thumbnail
      }));
      this.products.set(productsWithDisplayImage);
    });
  }

  get paginatedProducts() {
    if (this.showAll()) {
      return this.products();
    }
    const start = this.currentPage() * this.PAGE_SIZE;
    return this.products().slice(start, start + this.PAGE_SIZE);
  }

  changeProductImage(product: any, image: string): void {
    product.displayImage = image;
  }

  scroll(direction: 'left' | 'right'): void {
    if (this.showAll()) return; 

    const totalPages = Math.ceil(this.products().length / this.PAGE_SIZE);
    if (direction === 'left' && this.currentPage() > 0) {
      this.currentPage.set(this.currentPage() - 1);
    } else if (direction === 'right' && this.currentPage() < totalPages - 1) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }
  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  viewAllProducts(): void {
    this.showAll.set(!this.showAll());
    if (!this.showAll()) {
      this.currentPage.set(0);
    }
  }
}
