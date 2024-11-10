import { inject, ProviderToken } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { GameSave } from '../../core/services/indexed-db.service';
import { GameSaveService } from '../interfaces/game-save.interfaces';
import { tapResponse } from '@ngrx/operators';

type GameSaveState<T extends GameSave> = {
  gameSlug: string;
  game: T | undefined;
  isLoading: boolean;
};

export const gameListStoreFactory = <
  T extends GameSave,
  SaveService extends GameSaveService<T>
>(
  saveServiceToken: ProviderToken<SaveService>
) => {
  const initialState: GameSaveState<T> = {
    gameSlug: '',
    game: undefined,
    isLoading: false,
  };

  return signalStore(
    withState(initialState),
    withMethods((store, saveService = inject(saveServiceToken)) => ({
      loadGame: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          filter((slug) => slug !== ''),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((slug) =>
            saveService.getSave(slug).pipe(
              tapResponse({
                next: (item) => patchState(store, { game: item }),
                error: (err) => console.log(err),
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
    }))
  );
};
