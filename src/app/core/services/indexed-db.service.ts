import { afterNextRender, Injectable } from '@angular/core';
import { BehaviorSubject, filter, take } from 'rxjs';

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
  #indexedDb?: IDBFactory;

  constructor() {
    afterNextRender({
      read: () => {
        this.#indexedDb = indexedDB;
      },
    });
  }

  #connect(): Promise<IDBDatabase> {
    if (this.#db) {
      return Promise.resolve(this.#db);
    }

    return new Promise<IDBDatabase>((resolve) => {
      // TODO: more sophisticated error handling
      try {
        if (!this.#indexedDb) {
          throw 'no IDB';
        }
      } catch (err) {
        // this only runs at server side
        return;
      }

      const request = this.#indexedDb.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (asd) => {
        this.#db = request.result;
        const transaction = request.transaction;

        const objectStore = this.#db.createObjectStore(DB_GALZYR_STORE, {
          keyPath: 'slug',
        });

        objectStore.createIndex('Game slug', 'slug', { unique: true });
        objectStore.createIndex('Game name', 'name', { unique: false });
      };

      request.onsuccess = () => {
        this.#db = request.result;

        resolve(this.#db);
      };
    });
  }

  // TODO: handle promise rrejet here
  async #getObjectStore(
    storeName: string,
    mode?: IDBTransactionMode,
    options?: IDBTransactionOptions
  ): Promise<IDBObjectStore> {
    return (await this.#connect())
      .transaction(storeName, mode, options)
      .objectStore(storeName);
  }

  create<T extends GameSave>(store: BGH_DB_STORE, item: T): Promise<boolean> {
    return new Promise<boolean>(async (resolve, _reject) => {
      const request = (await this.#getObjectStore(store, 'readwrite')).add(
        item
      );

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

  update<T extends GameSave>(store: BGH_DB_STORE, data: T): Promise<boolean> {
    return new Promise<boolean>(async (resolve, _reject) => {
      const request = (await this.#getObjectStore(store, 'readwrite')).put(
        data
      );

      request.onerror = () => console.error('fuck');

      request.onsuccess = () => resolve(true);
    });
  }

  delete(store: BGH_DB_STORE, key: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, _reject) => {
      const request = (await this.#getObjectStore(store, 'readwrite')).delete(
        key
      );

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

  async readAll<T extends GameSave>(store: BGH_DB_STORE): Promise<T[]> {
    return new Promise<T[]>(async (resolve) => {
      const request = (await this.#connect())
        .transaction(store, 'readonly')
        .objectStore(store)
        .getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => console.log(request.error);
    });
  }
}
