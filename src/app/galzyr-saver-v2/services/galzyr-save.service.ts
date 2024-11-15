import { inject, Injectable } from '@angular/core';
import {
  BGH_DB_STORE,
  GameSave,
  IDBService,
} from '../../core/services/indexed-db.service';
import { from, Observable } from 'rxjs';
import { GameSaveService } from '../../shared/abstract/game-save';
import { GalzyrGameSave } from '../types/galzyr-game.type';

@Injectable({
  providedIn: 'root',
})
export class GalzyrSaveService implements GameSaveService<GalzyrGameSave> {
  #DBService = inject(IDBService);

  getSaveList(): Observable<GameSave[]> {
    return from(this.#DBService.readList<GameSave>(BGH_DB_STORE.Galzyr));
  }

  getGames(): Observable<GalzyrGameSave[]> {
    return from(this.#DBService.readAll<GalzyrGameSave>(BGH_DB_STORE.Galzyr));
  }

  getSave(slug: string): Observable<GalzyrGameSave> {
    return from(
      this.#DBService.read<GalzyrGameSave>(BGH_DB_STORE.Galzyr, slug)
    );
  }

  createSave(item: GalzyrGameSave): Observable<boolean> {
    return from(this.#DBService.create(BGH_DB_STORE.Galzyr, item));
  }

  updateSave(item: GalzyrGameSave): Observable<boolean> {
    return from(this.#DBService.update(BGH_DB_STORE.Galzyr, item));
  }

  deleteSave(slug: string): Observable<boolean> {
    return from(this.#DBService.delete(BGH_DB_STORE.Galzyr, slug));
  }
}
