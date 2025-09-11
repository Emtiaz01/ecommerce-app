import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

// Interface for detailed category objects
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

  // --- Methods for General Product & Category Data ---

  getProducts(limit: number = 8, skip: number = 0): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products?limit=${limit}&skip=${skip}`);
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

  // --- Methods for User Authentication ---

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/add`, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }
}
