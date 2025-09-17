import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../../app/services/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart {
  public cartService = inject(CartService);

  updateQuantity(id: string, event: Event) {
    const newQuantity = parseInt((event.target as HTMLInputElement).value, 10);
    if (newQuantity >= 1) {
      this.cartService.updateQuantity(id, newQuantity);
    }
  }

  increaseQuantity(id: string, currentQuantity: number) {
    this.cartService.updateQuantity(id, currentQuantity + 1);
  }

  decreaseQuantity(id: string, currentQuantity: number) {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(id, currentQuantity - 1);
    }
  }

  removeItem(id: string) {
    this.cartService.removeFromCart(id);
  }
}
