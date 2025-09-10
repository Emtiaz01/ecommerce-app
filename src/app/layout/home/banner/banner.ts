import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api'; // Import your ApiService

// Define an interface for a single slide for type safety
interface Slide {
  brand: string;
  title: string;
  image: { src: string; alt: string };
  link: string;
}

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrls: ['./banner.scss']
})
export class Banner implements OnInit, OnDestroy {
  slides = signal<Slide[]>([]); // Use signal instead of input

  currentSlide = 0;
  private intervalId: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch products for the banner (e.g., first 3 products)
    this.apiService.getProducts(5, 9).subscribe(response => {
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
}