import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbName = 'myAppDB';
  private dbPromise: Promise<IDBPDatabase<any>>;

  constructor() {

    this.dbPromise = openDB(this.dbName, 3, { 
      upgrade(db, oldVersion) {
        console.log(`Upgrading database from version ${oldVersion} to 3...`);

        if (db.objectStoreNames.contains('users')) {
          db.deleteObjectStore('users');
          console.log("Deleted old 'users' object store.");
        }
        
        db.createObjectStore('users', { keyPath: 'username' });
        console.log("Created new 'users' object store with keyPath: 'username'.");
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
}
