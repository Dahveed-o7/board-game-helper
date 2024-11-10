import { inject, Injectable } from '@angular/core';
import {
  BGH_DB_STORE,
  IDBService,
} from '../../core/services/indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class GalzyrSaveService {
  #DBService = inject(IDBService);

  async getSaveList(): Promise<Object[]> {
    return await this.#DBService.readList(BGH_DB_STORE.Galzyr);
  }
}
