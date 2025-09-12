import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit, OnDestroy {
  // Set your countdown target date/time (e.g., 5 days 23 hours 59 minutes 35 seconds from now)
  private targetDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 35 * 1000);
  timeLeft = signal(this.calculateTimeLeft());
  private intervalId!: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.timeLeft.set(this.calculateTimeLeft());
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  // Helper to calculate days/hours/minutes/seconds left
  private calculateTimeLeft() {
    const now = new Date();
    const diff = Math.max(0, this.targetDate.getTime() - now.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  buyNow(): void {
    alert('Buy Now clicked!');
  }
}
