  import { Component, signal, OnInit, inject } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { Banner } from "./layout/home/banner/banner";
  import { ApiService } from './services/api';
  import { Header } from './layout/home/header/header';
  import { Header2 } from './layout/home/header2/header2';
  import { FlashSales } from './layout/home/flash-sales/flash-sales';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, Banner, Header, Header2, FlashSales],
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
