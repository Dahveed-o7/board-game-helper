import { Observable } from 'rxjs';
import { GameSave } from '../../core/services/indexed-db.service';

export abstract class GameSaveService<T extends GameSave> {
  abstract getSaveList: () => Observable<GameSave[]>;
  abstract getGames: () => Observable<T[]>;
  abstract getSave: (slug: string) => Observable<T>;
  abstract createSave: (item: Object & GameSave) => Observable<boolean>;
  abstract updateSave: (item: Object & GameSave) => Observable<boolean>;
  abstract deleteSave: (slug: string) => Observable<boolean>;
}
