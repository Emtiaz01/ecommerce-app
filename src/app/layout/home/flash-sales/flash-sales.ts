import { Component, OnInit, OnDestroy, signal, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule, DecimalPipe, CurrencyPipe, NgOptimizedImage } from '@angular/common'; 
import { ApiService } from '../../../services/api';
import { Router } from '@angular/router';
import { ProtectedClickDirective } from '../../../directives/protected-click'; 
import { AddToWishlistDirective } from '../../../directives/add-to-wishlist';
import { AddToCartDirective } from '../../../directives/add-to-cart';
import { TranslateModule } from '@ngx-translate/core';

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

@Component({
  selector: 'app-flash-sales',
  standalone: true,
  imports: [CommonModule, DecimalPipe, CurrencyPipe, ProtectedClickDirective, AddToWishlistDirective, AddToCartDirective, TranslateModule, NgOptimizedImage],
  templateUrl: './flash-sales.html',
  styleUrls: ['./flash-sales.scss']
})
export class FlashSales implements OnInit, OnDestroy {
  products = signal<any[]>([]);
  timeLeft = signal<TimeLeft>({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  private countdownInterval: any;
  

  @ViewChild('productCarousel') productCarousel!: ElementRef;

  showAll = signal(false);

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getFlashSaleProducts().subscribe(products => {
      this.products.set(products);
    });
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  startCountdown(): void {
    const targetDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(this.countdownInterval);
        this.timeLeft.set({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.timeLeft.set({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    }, 1000);
  }

  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    return price * (1 - discountPercentage / 100);
  }

  scroll(direction: 'left' | 'right'): void {
    if (this.showAll()) return;

    const carousel = this.productCarousel.nativeElement as HTMLElement;
    const scrollAmount = 300; 
    carousel.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }

  toggleViewAll(): void {
    this.showAll.set(!this.showAll());
  }
  AddToCart(){
     console.log('User is logged in. Adding to cart...');
  }
  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  navigateToAllProducts(): void {
    this.router.navigate(['/all-products']);
  }
}
