import { Component } from '@angular/core';
import { Supports } from '../../layout/home/supports/supports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [Supports, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
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
    this.startSlider();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startSlider(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.teamMembers.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    clearInterval(this.intervalId);
    this.startSlider();
  }
}
