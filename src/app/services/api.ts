import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DetailedCategory {
  slug: string;
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://dummyjson.com';
  private http = inject(HttpClient);

  getAllProduct(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products`);
  }
  getProduct(limit: number = 8, skip: number = 0): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/category/tablets`);
  }
  getProducts(limit: number = 8, skip: number = 0): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/category/motorcycle`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/category-list`);
  }

  getDetailedCategories(): Observable<DetailedCategory[]> {
    return this.http.get<DetailedCategory[]>(`${this.baseUrl}/products/categories`);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/category/${category}`);
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/search?q=${query}`);
  }

  getFlashSaleProducts(): Observable<any[]> {
    const laptops$ = this.http.get<any>(`${this.baseUrl}/products/category/laptops`);
    const smartphones$ = this.http.get<any>(`${this.baseUrl}/products/category/smartphones`);

    return forkJoin([laptops$, smartphones$]).pipe(
      map(([laptopsResponse, smartphonesResponse]) => {
        return [...laptopsResponse.products, ...smartphonesResponse.products];
      })
    );
  }
  getExploreProducts(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/products/category/mobile-accessories`).pipe(
      map(response => response.products)
    );
  }

  getJustForYou(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/products/category/mens-shirts`).pipe(
      map(response => response.products)
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/add`, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }
}
