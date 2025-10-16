import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiService } from '../../../core/services/api';
import { ProtectedClickDirective } from "../../../shared/directives/protected-click"; 
import { TranslateModule } from '@ngx-translate/core';

interface Slide {
  brand: string;
  title: string;
  image: { src: string; alt: string };
  link: string;
}

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, ProtectedClickDirective, TranslateModule, NgOptimizedImage],
  templateUrl: './banner.html',
  styleUrls: ['./banner.scss']
})
export class Banner implements OnInit, OnDestroy {
  slides = signal<Slide[]>([]);
  currentSlide = 0;
  private intervalId: any;

  isDropdownOpen = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProductsByCategory('tablets', 50, 0).subscribe(response => {
      const slides = response.products.map((product: any) => ({
        brand: product.brand,
        title: product.title,
        image: { src: product.thumbnail, alt: product.title },
        link: `/product/${product.id}`
      }));
      this.slides.set(slides);
      this.startAutoSlider();
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlider(): void {
    if (this.slides().length > 0) {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 5000); 
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides().length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    clearInterval(this.intervalId);
    this.startAutoSlider();
  }
  
  shop() {
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
