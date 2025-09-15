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
    this.loadUserFromSession();
  }

  async login(username: string, password: string): Promise<boolean> {
    console.log(`[AuthService] Attempting login for user: '${username}'`);

    // Step 1: Try to retrieve the user from the database
    const user = await this.indexedDBService.getUserByUsername(username);

    // Step 2: Check if the user was found
    if (!user) {
      console.error(`[AuthService] LOGIN FAILED: User with username '${username}' was not found in IndexedDB.`);
      return false; // Stop here if no user is found
    }

    console.log(`[AuthService] User '${username}' found:`, user);

    // Step 3: If user was found, check if the passwords match
    if (user.password !== password) {
      console.error(`[AuthService] LOGIN FAILED: Password mismatch for user '${username}'.`);
      console.error(`  - Entered Password: '${password}'`);
      console.error(`  - Stored Password:  '${user.password}'`);
      return false; // Stop here if passwords don't match
    }

    // If both checks pass, the login is successful
    console.log(`[AuthService] SUCCESS: Passwords match. Setting current user.`);
    this.currentUser.set(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  private loadUserFromSession(): void {
    const userJson = sessionStorage.getItem('currentUser');
    if (userJson) {
      this.currentUser.set(JSON.parse(userJson));
    }
  }
}
