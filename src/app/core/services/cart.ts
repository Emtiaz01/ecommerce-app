import { Injectable, signal, computed, inject } from '@angular/core';
import { Product } from './wishlist.service'; 
import { IndexedDBService } from './indexeddb.service';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private indexedDBService = inject(IndexedDBService);
  cartItems = signal<CartItem[]>([]);
  cartCount = computed(() => this.cartItems().length);

  subtotal = computed(() => 
    this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0)
  );

  total = computed(() => this.subtotal());

  constructor() {
    this.loadCartFromIndexedDB();
  }

  private async loadCartFromIndexedDB(): Promise<void> {
    const cart = await this.indexedDBService.getCart();
    this.cartItems.set(cart);
  }

  addToCart(product: Product): void {
    this.cartItems.update(items => {
      const itemInCart = items.find(item => item.id === product.id);
      let updatedItem;
      if (itemInCart) {
        itemInCart.quantity++;
        updatedItem = { ...itemInCart };
        this.indexedDBService.saveCartItem(updatedItem);
        return [...items];
      } else {
        updatedItem = { ...product, quantity: 1 };
        this.indexedDBService.saveCartItem(updatedItem);
        return [...items, updatedItem];
      }
    });
    alert('Product added to cart!');
  }

  updateQuantity(productId: string, newQuantity: number): void {
    this.cartItems.update(items => {
      const newItems = items.map(item => {
        if (item.id === productId) {
          const updatedItem = { ...item, quantity: newQuantity };
          this.indexedDBService.saveCartItem(updatedItem);
          return updatedItem;
        }
        return item;
      });
      return newItems;
    });
  }

  removeFromCart(productId: string): void {
    this.cartItems.update(items => items.filter(item => item.id !== productId));
    this.indexedDBService.removeCartItem(productId);
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.indexedDBService.clearCart();
  }
}
