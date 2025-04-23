import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GameSaveService } from '../../shared/abstract/game-save';
import { GalzyrGameSave } from '../types/galzyr-game.type';
import { Observable, tap } from 'rxjs';
import { GameSave } from '../../core/services/indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class NestJsGalzyrSaveService
  implements GameSaveService<GalzyrGameSave>
{
  readonly #http = inject(HttpClient);
  readonly baseUrl = 'http://localhost:3000/galzyr-save';

  listAll(): Observable<GameSave[]> {
    return this.#http.get<GameSave[]>(`${this.baseUrl}/list`);
  }

  findAll(): Observable<GalzyrGameSave[]> {
    return this.#http.get<GalzyrGameSave[]>(`${this.baseUrl}`);
  }

  findOne(name: string): Observable<GalzyrGameSave> {
    return this.#http.get<GalzyrGameSave>(`${this.baseUrl}/${name}`);
  }

  create(item: GalzyrGameSave): Observable<boolean> {
    return this.#http.post<boolean>(`${this.baseUrl}`, item);
  }

  update(item: GalzyrGameSave): Observable<boolean> {
    return this.#http.patch<boolean>(`${this.baseUrl}/${item.name}`, item);
  }

  remove(name: string): Observable<boolean> {
    return this.#http.delete<boolean>(`${this.baseUrl}/${name}`);
  }
}
