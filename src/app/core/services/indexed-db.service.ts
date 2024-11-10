import { afterNextRender, Injectable } from '@angular/core';

const DB_NAME = 'BGG_test';
const DB_VERSION = 1;

export enum BGH_DB_STORE {
  Galzyr = 'Galzyr',
  Vagrantsong = 'Vagrantsong',
}

export const DB_GALZYR_STORE = BGH_DB_STORE.Galzyr;
export const DB_VAGRANTSONG_STORE = BGH_DB_STORE.Vagrantsong;

export interface GameSave {
  readonly name: string;
  readonly slug: string;
}

@Injectable({
  providedIn: 'root',
})
export class IDBService {
  #db!: IDBDatabase;

  constructor() {
    afterNextRender({
      read: () => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
          console.error(request.error);
        };

        request.onsuccess = () => {
          this.#db = request.result;
        };

        request.onupgradeneeded = () => {
          const db = request.result;

          const objectStore = db.createObjectStore(DB_GALZYR_STORE, {
            autoIncrement: true,
          });

          objectStore.createIndex('Game slug', 'slug', { unique: true });
          objectStore.createIndex('Game name', 'name', { unique: false });
        };
      },
    });
  }

  #getObjectStore(
    storeName: string,
    mode?: IDBTransactionMode,
    options?: IDBTransactionOptions
  ): IDBObjectStore {
    return this.#db
      .transaction(storeName, mode, options)
      .objectStore(storeName);
  }

  create<T>(store: BGH_DB_STORE, item: T): Promise<boolean> {
    return new Promise<boolean>((resolve, _reject) => {
      const request = this.#getObjectStore(store, 'readwrite').add(item);

      request.onsuccess = () => resolve(true);
    });
  }

  read<T>(store: BGH_DB_STORE, key: string): Promise<T> {
    return new Promise<T>((resolve, _reject) => {
      const request = this.#db
        .transaction(store, 'readonly')
        .objectStore(store)
        .get(key);

      request.onsuccess = () => resolve(request.result);
    });
  }

  update<T>(store: BGH_DB_STORE, data: T): Promise<boolean> {
    return new Promise<boolean>((resolve, _reject) => {
      const request = this.#getObjectStore(store, 'readwrite').put(data);

      request.onsuccess = () => resolve(true);
    });
  }

  delete(store: BGH_DB_STORE, key: string): Promise<boolean> {
    return new Promise<boolean>((resolve, _reject) => {
      const request = this.#getObjectStore(store, 'readwrite').delete(key);

      request.onsuccess = () => resolve(true);
    });
  }

  // todo: experiment
  readList<T>(store: BGH_DB_STORE): Promise<T[]> {
    return new Promise<T[]>((resolve) => {
      const objectStore = this.#db
        .transaction(store, 'readonly')
        .objectStore(store)
        .openCursor();
      const res: T[] = [];

      objectStore.onsuccess = () => {
        const cursor = objectStore.result;

        if (cursor) {
          res.push(cursor.value);
          cursor.continue();
        } else {
          resolve(res);
        }
      };
    });
  }
}
