import { Observable } from 'rxjs';
import { GameSave } from '../../core/services/indexed-db.service';

export interface GameSaveService<T extends GameSave> {
  getSaveList: () => Observable<GameSave[]>;
  getGames: () => Observable<T[]>;
  getSave: (slug: string) => Observable<T>;
  createSave: (item: Object & GameSave) => Observable<boolean>;
  updateSave: (item: Object & GameSave) => Observable<boolean>;
  deleteSave: (slug: string) => Observable<boolean>;
}
