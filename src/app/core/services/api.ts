import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface DetailedCategory {
  slug: string;
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllProduct(limit: number = 100, skip: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString());
    return this.http.get<any>(`${this.baseUrl}/products`, { params });
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

  getProductsByCategory(category: string, limit: number = 8, skip: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString());
    return this.http.get<any>(`${this.baseUrl}/products/category/${category}`, { params });
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/search?q=${query}`);
  }

  getFlashSaleProducts(): Observable<any[]> {
    const laptops$ = this.getProductsByCategory('laptops');
    const smartphones$ = this.getProductsByCategory('smartphones');

    return forkJoin([laptops$, smartphones$]).pipe(
      map(([laptopsResponse, smartphonesResponse]) => {
        return [...laptopsResponse.products, ...smartphonesResponse.products];
      })
    );
  }
  getExploreProducts(): Observable<any[]> {
    return this.getProductsByCategory('mobile-accessories').pipe(
      map(response => response.products)
    );
  }

  getJustForYou(): Observable<any[]> {
    return this.getProductsByCategory('mens-shirts').pipe(
      map(response => response.products)
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/add`, user);
  }

  // Store username locally whenever login succeeds!
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credentials);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, userData);
  }
}
