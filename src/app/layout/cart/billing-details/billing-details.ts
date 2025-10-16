import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CartService } from '../../../core/services/cart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule, NgOptimizedImage],
  templateUrl: './billing-details.html',
  styleUrls: ['./billing-details.scss']
})
export class BillingDetails {
  cartService = inject(CartService);

  paymentMethod = 'cod';
  coupon = '';
  infoSaved = true;

  placeOrder() {
    alert('Order placed!');
  }
}
