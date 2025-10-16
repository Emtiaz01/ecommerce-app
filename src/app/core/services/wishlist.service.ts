import { Injectable, signal, computed } from '@angular/core';

// Define an interface for what a Product looks like
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  discount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistItems = signal<Product[]>([]);

  wishlistCount = computed(() => this.wishlistItems().length);

  constructor() {

    const savedWishlist = localStorage.getItem('userWishlist');
    if (savedWishlist) {
      this.wishlistItems.set(JSON.parse(savedWishlist));
    }
  }

  addToWishlist(product: Product): void {
    this.wishlistItems.update(items => {

      if (items.some(item => item.id === product.id)) {
        console.log(`Product "${product.name}" is already in the wishlist.`);
        return items; 
      }
      console.log(`Adding product "${product.name}" to wishlist.`);
      return [...items, product];
    });
    this.saveWishlistToStorage();
  }

  removeFromWishlist(productId: string): void {
    this.wishlistItems.update(items => 
      items.filter(item => item.id !== productId)
    );
    this.saveWishlistToStorage();
  }

  private saveWishlistToStorage(): void {
    localStorage.setItem('userWishlist', JSON.stringify(this.wishlistItems()));
  }
}
