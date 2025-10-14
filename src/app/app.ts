import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';
import { Footer } from "./footer/footer";
import { Header } from './navbar/header/header';
import { Header2 } from "./navbar/header2/header2";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, Header, Header2, TranslateModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  slides = signal<any[]>([]);
  private apiService = inject(ApiService);
  private translateService = inject(TranslateService);

  ngOnInit(): void {
    // Initialize translation service with saved language or default
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    this.translateService.setDefaultLang('en');
    this.translateService.use(savedLang);

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
