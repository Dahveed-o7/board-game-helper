import { Observable } from 'rxjs';
import { GameSave } from '../../core/services/indexed-db.service';

export abstract class GameSaveService<T extends GameSave> {
  abstract listAll: () => Observable<GameSave[]>;
  abstract findAll: () => Observable<T[]>;
  abstract findOne: (name: string) => Observable<T>;
  abstract create: (item: T) => Observable<boolean>;
  abstract update: (item: T) => Observable<boolean>;
  abstract remove: (name: string) => Observable<boolean>;
}
