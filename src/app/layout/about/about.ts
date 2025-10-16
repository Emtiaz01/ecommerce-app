import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Supports } from '../../layout/home/supports/supports';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [Supports, CommonModule, TranslateModule, NgOptimizedImage],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit, OnDestroy {

  teamMembers = [
    { name: 'Tom Cruise', title: 'Founder & Chairman', image: 'assets/images/tom-cruise.png' },
    { name: 'Emma Watson', title: 'Managing Director', image: 'assets/images/emma-watson.png' },
    { name: 'Will Smith', title: 'Product Designer', image: 'assets/images/wil-smith.png' },
    { name: 'Jane Doe', title: 'Marketing Head', image: 'assets/images/jane-doe.png' }
  ];

  socialLinks = [
    { name: 'Twitter', iconUrl: 'assets/icons/twiit.png' },
    { name: 'Instagram', iconUrl: 'assets/icons/insta.png' },
    { name: 'LinkedIn', iconUrl: 'assets/icons/link.png' }
  ];

  currentSlide = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.handleSliderByScreen(); // Decide what to do at load time
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // This runs whenever the window is resized
  @HostListener('window:resize')
  onResize() {
    this.handleSliderByScreen();
  }

  // Core function: Starts/stops slider based on screen width
  private handleSliderByScreen(): void {
    const isTabletOrDown = window.innerWidth <= 768;
    if (isTabletOrDown) {
      // If on tablet or smaller, stop the slider if running
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    } else {
      // If on desktop, ensure auto sliding starts (if not already running)
      if (!this.intervalId) {
        this.startSlider();
      }
    }
  }

  // Start the automatic slider cycling
  startSlider(): void {
    // Prevent multiple intervals
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  // Go to the next slide
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.teamMembers.length;
  }

  // Allow user to jump to a slide and restart slider (desktop only)
  goToSlide(index: number): void {
    this.currentSlide = index;
    const isTabletOrDown = window.innerWidth <= 768;
    if (!isTabletOrDown) {
      clearInterval(this.intervalId);
      this.startSlider();
    }
  }
}
