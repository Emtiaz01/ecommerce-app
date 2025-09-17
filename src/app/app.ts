import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';
import { Footer } from "./footer/footer";
import { Header } from './navbar/header/header';
import { Header2 } from "./navbar/header2/header2";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, Header, Header2],
  templateUrl: './app.html',
})
export class App implements OnInit {
  slides = signal<any[]>([]);

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.apiService.getProducts(5).subscribe({
      next: (data) => {
        const formattedSlides = data.products.map((product: any) => ({
          brand: product.brand,
          title: `The All New<br>${product.title}`,
          image: {
            src: product.thumbnail,
            alt: product.title
          },
          link: `/product/${product.id}` 
        }));
        this.slides.set(formattedSlides);
      },
      error: (err) => console.error('Failed to load slide data', err)
    });
  }
}
