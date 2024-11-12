import { inject, Injectable } from '@angular/core';
import {
  BGH_DB_STORE,
  GameSave,
  IDBService,
} from '../../core/services/indexed-db.service';
import { from, Observable } from 'rxjs';
import { GameSaveService } from '../../shared/interfaces/game-save.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GalzyrSaveService implements GameSaveService<Object & GameSave> {
  #DBService = inject(IDBService);

  getSaveList(): Observable<GameSave[]> {
    return from(this.#DBService.readList<GameSave>(BGH_DB_STORE.Galzyr));
  }

  getGames(): Observable<(Object & GameSave)[]> {
    return from(
      this.#DBService.readAll<Object & GameSave>(BGH_DB_STORE.Galzyr)
    );
  }

  getSave(slug: string): Observable<Object & GameSave> {
    return from(
      this.#DBService.read<Object & GameSave>(BGH_DB_STORE.Galzyr, slug)
    );
  }

  createSave(item: Object & GameSave): Observable<boolean> {
    return from(this.#DBService.create(BGH_DB_STORE.Galzyr, item));
  }

  updateSave(item: Object & GameSave): Observable<boolean> {
    return from(this.#DBService.update(BGH_DB_STORE.Galzyr, item));
  }

  deleteSave(slug: string): Observable<boolean> {
    return from(this.#DBService.delete(BGH_DB_STORE.Galzyr, slug));
  }
}
