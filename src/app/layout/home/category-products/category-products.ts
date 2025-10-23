import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule, SharedModule, TranslateModule, RouterModule, CurrencyPipe],
  templateUrl: './category-products.html',
  styleUrls: ['./category-products.scss']
})
export class CategoryProducts implements OnInit {
  products$!: Observable<any[]>;
  categoryName$!: Observable<string | null>;

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit(): void {
    this.categoryName$ = this.route.paramMap.pipe(
      map(params => params.get('categoryName'))
    );

    this.products$ = this.route.paramMap.pipe(
      switchMap(params => {
        const categoryName = params.get('categoryName');
        if (categoryName) {
          return this.apiService.getProductsByCategory(categoryName, 100, 0).pipe(
            map(response => response.products.map((product: any) => ({
              ...product,
              displayImage: product.thumbnail
            })))
          );
        }
        return of([]);
      })
    );
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  changeProductImage(product: any, image: string): void {
    product.displayImage = image;
  }

  capitalizeCategory(categoryName: string): string {
    return categoryName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
