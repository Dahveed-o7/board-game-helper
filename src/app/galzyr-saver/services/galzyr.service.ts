import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, throwError } from 'rxjs';
import { GalzyrSave } from '../model/galzyr.types';
import { DEFAULT_SAVE } from '../model/galzyr-save-default';

@Injectable({
  providedIn: 'root',
})
export class GalzyrService {
  private _saves$ = new BehaviorSubject<readonly GalzyrSave[]>([]);

  constructor() {}

  getSaveList$(): Observable<readonly GalzyrSave[]> {
    this.loadList();
    return this._saves$.asObservable();
  }

  getSave$(id: number): Observable<GalzyrSave> {
    this.loadList();
    return this._saves$.asObservable().pipe(
      map((list) => list.find((item) => item.id === id)),
      map((save) => save ?? { ...DEFAULT_SAVE, id }),
      delay(1000)
    );
  }

  updateSave$(save: GalzyrSave): Observable<void> {
    return of();
  }

  deleteSave$(id: number): Observable<void> {
    return of();
  }

  private loadList(): void {
    this._saves$.next([]);
  }
}
