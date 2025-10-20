import { Injectable, signal, computed, inject } from '@angular/core';
import { IndexedDBService } from './indexeddb.service';

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
  private indexedDBService = inject(IndexedDBService);
  wishlistItems = signal<Product[]>([]);

  wishlistCount = computed(() => this.wishlistItems().length);

  constructor() {
    this.loadWishlistFromIndexedDB();
  }

  private async loadWishlistFromIndexedDB(): Promise<void> {
    const wishlist = await this.indexedDBService.getWishlist();
    this.wishlistItems.set(wishlist);
  }

  addToWishlist(product: Product): void {
    this.wishlistItems.update(items => {
      if (items.some(item => item.id === product.id)) {
        console.log(`Product "${product.name}" is already in the wishlist.`);
        return items;
      }
      console.log(`Adding product "${product.name}" to wishlist.`);
      const newItems = [...items, product];
      this.indexedDBService.saveWishlistItem(product);
      return newItems;
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistItems.update(items =>
      items.filter(item => item.id !== productId)
    );
    this.indexedDBService.removeWishlistItem(productId);
  }

  clearWishlist(): void {
    this.wishlistItems.set([]);
    this.indexedDBService.clearWishlist();
  }
}
