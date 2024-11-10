import { inject, ProviderToken } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { GameSave } from '../../core/services/indexed-db.service';
import { GameSaveService } from '../interfaces/game-save.interfaces';
import { tapResponse } from '@ngrx/operators';

type GameListState = {
  gameList: GameSave[];
  isLoading: boolean;
};

export const gameListStoreFactory = <
  T extends GameSave,
  SaveService extends GameSaveService<T>
>(
  gameService: ProviderToken<SaveService>
) => {
  const initialState: GameListState = {
    gameList: [],
    isLoading: false,
  };

  return signalStore(
    withState(initialState),
    withMethods((store, saveService = inject(gameService)) => ({
      load: rxMethod(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            saveService.getSaveList().pipe(
              tapResponse({
                next: (items) => patchState(store, { gameList: items }),
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
