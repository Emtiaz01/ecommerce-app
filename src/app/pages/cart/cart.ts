import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../../app/services/cart';
import { Router, RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, NgxSkeletonLoaderModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart implements OnInit {
  public cartService = inject(CartService);
  private router = inject(Router);
  loading = signal(true);

  ngOnInit() {
    // Simulate a loading delay
    setTimeout(() => {
      this.loading.set(false);
    }, 1500); // 1.5-second delay
  }

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

  checkout() {
    this.router.navigate(['/billing']);
  }
}
