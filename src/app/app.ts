import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { Header2 } from "./header2/header2";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, Header, Header2],
  templateUrl: './app.html',
})
export class App implements OnInit {
  // Signal to hold the complete slide data
  slides = signal<any[]>([]);

  private apiService = inject(ApiService);

  ngOnInit(): void {
    // Fetch products to build the slides
    this.apiService.getProducts(5).subscribe({
      next: (data) => {
        // Map the raw product data to our desired slide format
        const formattedSlides = data.products.map((product: any) => ({
          brand: product.brand,
          // Create a more engaging title. Use <br> for line breaks.
          title: `The All New<br>${product.title}`,
          image: {
            src: product.thumbnail,
            alt: product.title
          },
          link: `/product/${product.id}` // Link to the product page
        }));
        this.slides.set(formattedSlides);
      },
      error: (err) => console.error('Failed to load slide data', err)
    });
  }
}
