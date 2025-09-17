import { Injectable, signal, computed } from '@angular/core';
import { Product } from './wishlist.service'; 

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>([]);
  cartCount = computed(() => this.cartItems().length);

  subtotal = computed(() => 
    this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0)
  );

  total = computed(() => this.subtotal());

  constructor() {
    const savedCart = localStorage.getItem('userCart');
    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart));
    }
  }

  addToCart(product: Product): void {
    this.cartItems.update(items => {
      const itemInCart = items.find(item => item.id === product.id);
      if (itemInCart) {
        itemInCart.quantity++;
        return [...items];
      } else {

        return [...items, { ...product, quantity: 1 }];
      }
    });
    this.saveCartToStorage();
    alert('Product added to cart!');
  }

  updateQuantity(productId: string, newQuantity: number): void {
    this.cartItems.update(items => 
      items.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    this.saveCartToStorage();
  }

  removeFromCart(productId: string): void {
    this.cartItems.update(items => items.filter(item => item.id !== productId));
    this.saveCartToStorage();
  }

  private saveCartToStorage(): void {
    localStorage.setItem('userCart', JSON.stringify(this.cartItems()));
  }
}
