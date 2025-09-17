import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IndexedDBService } from '../services/indexeddb.service';

export interface User {
  username: string;
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor(
    private indexedDBService: IndexedDBService,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.indexedDBService.getUserByUsername(username);

    if (!user || user.password !== password) {
      console.error(`[AuthService] Login failed for user '${username}'.`);
      return false;
    }

    console.log(`[AuthService] Login successful for '${username}'.`);
    this.currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  logout(): void {
    this.currentUser.set(null);

    localStorage.removeItem('currentUser');

    this.router.navigate(['/']);
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUser.set(JSON.parse(userJson));
    }
  }
}
