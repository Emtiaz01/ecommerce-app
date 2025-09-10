import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://dummyjson.com';
  private http = inject(HttpClient);

  // --- Methods for General Product & Category Data ---

  /**
   * Fetches a list of all products with pagination.
   * Used for "Our Products" grids and general listings.
   * @param limit The number of products to fetch per page.
   * @param skip The number of products to skip (for pagination).
   */
  getProducts(limit: number = 8, skip: number = 0): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products?limit=${limit}&skip=${skip}`);
  }

  /**
   * Fetches a single product by its unique ID.
   * Useful for promotional banners and product detail pages.
   */
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }

  /**
   * Fetches a list of all available product category names.
   * Used for the "Browse by Category" section and sidebar menus.
   */
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/categories`);
  }

  /**
   * Fetches all products belonging to a specific category.
   * Called when a user clicks on a category.
   */
  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/category/${category}`);
  }

  /**
   * Searches for products based on a query string.
   */
  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/search?q=${query}`);
  }

  // --- Methods for Specific UI Sections ---

  /**
   * Fetches products suitable for a "Flash Sales" section.
   * This simulates a dedicated endpoint by fetching from multiple categories
   * known to have good discount data and combining the results.
   */
  getFlashSaleProducts(): Observable<any[]> {
    // Make two simultaneous API calls.
    const laptops$ = this.http.get<any>(`${this.baseUrl}/products/category/laptops`);
    const smartphones$ = this.http.get<any>(`${this.baseUrl}/products/category/smartphones`);

    // forkJoin waits for both requests to complete.
    return forkJoin([laptops$, smartphones$]).pipe(
      // The 'map' operator transforms the combined result.
      map(([laptopsResponse, smartphonesResponse]) => {
        // We extract the 'products' array from each response and merge them into a single array.
        return [...laptopsResponse.products, ...smartphonesResponse.products];
      })
    );
  }

  // --- Methods for User Authentication ---

  /**
   * Simulates user registration by sending new user data to the server.
   * The DummyJSON API will simulate a successful creation and return the new user with an ID.
   */
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/add`, user);
  }

  /**
   * Authenticates a user by sending their credentials to the login endpoint.
   * On success, the API returns user details and a JWT token.
   */
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }
}
