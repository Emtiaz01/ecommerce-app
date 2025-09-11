import {
  Component,
  OnInit,
  signal,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api';

// Defines the structure for a category object used in the template
interface Category {
  name: string; 
  iconUrl: string; 
  apiName: string; 
}

@Component({
  selector: 'app-category-browser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-browser.html',
  styleUrls: ['./category-browser.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryBrowser implements OnInit {
  categories = signal<Category[]>([]);
  activeCategory = signal<string>('');

  // Material Design Icons (mdi) from Iconify for each category
  private readonly iconMap: Record<string, string> = {
    'smartphones': 'mdi:cellphone',
    'laptops': 'mdi:laptop',
    'fragrances': 'mdi:perfume',
    'skincare': 'mdi:face-woman-shimmer',
    'groceries': 'mdi:cart-outline',
    'home-decoration': 'mdi:sofa',
    'furniture': 'mdi:table-chair',
    'tops': 'mdi:tshirt-crew',
    'womens-dresses': 'mdi:human-female',
    'womens-shoes': 'mdi:shoe-heel',
    'mens-shirts': 'mdi:tshirt-crew',
    'mens-shoes': 'mdi:shoe-formal',
    'mens-watches': 'mdi:watch',
    'womens-watches': 'mdi:watch-variant',
    'womens-bags': 'mdi:handbag',
    'womens-jewellery': 'mdi:diamond-stone',
    'sunglasses': 'mdi:sunglasses',
    'automotive': 'mdi:car',
    'motorcycle': 'mdi:motorbike',
    'lighting': 'mdi:lightbulb-outline',
    'tablets': 'mdi:tablet',
    'mobile-accessories': 'mdi:headphones',
    'vehicle': 'mdi:truck',
    'beauty': 'mdi:lipstick',
    'kitchen-accessories': 'mdi:silverware-fork-knife',
    'sports-accessories': 'mdi:basketball',
  };

  @ViewChild('categoryCarousel') categoryCarousel!: ElementRef;

  private apiService = inject(ApiService);

  ngOnInit(): void {
  this.apiService.getCategories().subscribe((apiCategorySlugs) => {
    const mappedCategories = apiCategorySlugs
      .filter(slug => typeof slug === 'string' && slug.length > 0)
      .map(slug => {
        const categorySlug = slug.toLowerCase();
        const iconName = this.iconMap[categorySlug] || 'mdi:apps'; 
        const displayName = categorySlug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return {
          name: displayName,
          iconUrl: `https://api.iconify.design/${iconName}.svg`,
          apiName: categorySlug,
        };
      });

    this.categories.set(mappedCategories);
  });
}
  selectCategory(categoryApiName: string): void {
    this.activeCategory.set(categoryApiName);
  }

  scroll(direction: 'left' | 'right'): void {
    const carousel = this.categoryCarousel.nativeElement as HTMLElement;
    const scrollAmount = 200;
    carousel.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
}
