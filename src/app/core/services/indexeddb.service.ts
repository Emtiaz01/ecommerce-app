import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbName = 'myAppDB';
  private dbPromise: Promise<IDBPDatabase<any>>;

  constructor() {

    this.dbPromise = openDB(this.dbName, 5, { 
      upgrade(db, oldVersion) {
        console.log(`Upgrading database from version ${oldVersion} to 5...`);

        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'username' });
          console.log("Created new 'users' object store with keyPath: 'username'.");
        }

        if (!db.objectStoreNames.contains('cart')) {
          db.createObjectStore('cart', { keyPath: 'id' });
          console.log("Created 'cart' object store with keyPath: 'id'.");
        }

        if (!db.objectStoreNames.contains('wishlist')) {
          db.createObjectStore('wishlist', { keyPath: 'id' });
          console.log("Created 'wishlist' object store with keyPath: 'id'.");
        }
      },
    });
  }

  async addUser(user: any): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('users', 'readwrite');
    try {
      await tx.store.put(user);
      await tx.done;
      console.log(`[IndexedDBService] SUCCESS: User '${user.username}' saved.`);
    } catch (error) {
      console.error(`[IndexedDBService] FAILED to add user '${user.username}':`, error);
      throw error;
    }
  }

  async getUserByUsername(username: string) {
    const db = await this.dbPromise;
    return db.get('users', username);
  }

  async listAllUsers(): Promise<any[]> {
    const db = await this.dbPromise;
    return db.getAll('users');
  }

  // Cart Methods
  async getCart(): Promise<any[]> {
    const db = await this.dbPromise;
    return db.getAll('cart');
  }

  async saveCartItem(item: any): Promise<any> {
    const db = await this.dbPromise;
    return db.put('cart', item);
  }

  async removeCartItem(id: string): Promise<void> {
    const db = await this.dbPromise;
    return db.delete('cart', id);
  }

  async clearCart(): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('cart', 'readwrite');
    await tx.store.clear();
    return tx.done;
  }

  // Wishlist Methods
  async getWishlist(): Promise<any[]> {
    const db = await this.dbPromise;
    return db.getAll('wishlist');
  }

  async saveWishlistItem(item: any): Promise<any> {
    const db = await this.dbPromise;
    return db.put('wishlist', item);
  }

  async removeWishlistItem(id: string): Promise<void> {
    const db = await this.dbPromise;
    return db.delete('wishlist', id);
  }

  async clearWishlist(): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('wishlist', 'readwrite');
    await tx.store.clear();
    return tx.done;
  }
}
