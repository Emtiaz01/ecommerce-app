import { Component, OnInit, OnDestroy, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, DecimalPipe, PercentPipe } from '@angular/common';
import { ApiService } from '../../../services/api'; 

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

@Component({
  selector: 'app-flash-sales',
  standalone: true,
  imports: [CommonModule, DecimalPipe, PercentPipe],
  templateUrl: './flash-sales.html',
  styleUrls: ['./flash-sales.scss']
})
export class FlashSales implements OnInit, OnDestroy {

  products = signal<any[]>([]);

  timeLeft = signal<TimeLeft>({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  
  private countdownInterval: any;

  @ViewChild('productCarousel') productCarousel!: ElementRef;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // 1. Fetch the products for the sale.
    this.apiService.getFlashSaleProducts().subscribe(products => {
      this.products.set(products);
    });

    // 2. Start the countdown timer.
    this.startCountdown();
  }

  ngOnDestroy(): void {
    // 3. Clean up the interval when the component is destroyed to prevent memory leaks.
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  startCountdown(): void {
    // Set a target date 3 days from now.
    const targetDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(this.countdownInterval);
        this.timeLeft.set({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      // Calculate days, hours, minutes, and seconds.
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the signal with formatted values (padding with a '0' if needed).
      this.timeLeft.set({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    }, 1000);
  }

  // Calculate the discounted price.
  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    return price * (1 - discountPercentage / 100);
  }

  // Handle scrolling of the carousel.
  scroll(direction: 'left' | 'right'): void {
    const carousel = this.productCarousel.nativeElement as HTMLElement;
    const scrollAmount = carousel.clientWidth * 0.8; // Scroll by 80% of the visible width.

    if (direction === 'left') {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
