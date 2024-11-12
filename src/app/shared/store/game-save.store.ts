import { inject, InjectionToken, ProviderToken } from '@angular/core';
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
  isSaving: boolean;
  isDeleting: boolean;
};

export const gameStoreFactory = <
  T extends GameSave,
  SaveService extends GameSaveService<T>
>(
  saveServiceToken: ProviderToken<SaveService>
) => {
  const initialState: GameSaveState<T> = {
    gameSlug: '',
    game: undefined,
    isLoading: true,
    isSaving: false,
    isDeleting: false,
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
      createGame: rxMethod<T>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isSaving: true })),
          switchMap((game) =>
            saveService.createSave(game).pipe(
              tapResponse({
                next: (_res) => patchState(store, { game }),
                error: (err) => console.log(err),
                finalize: () => patchState(store, { isSaving: false }),
              })
            )
          )
        )
      ),
      saveGame: rxMethod<T>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isSaving: true })),
          switchMap((game) =>
            saveService.updateSave(game).pipe(
              tapResponse({
                next: (_res) => patchState(store, { game }),
                error: (err) => console.log(err),
                finalize: () => patchState(store, { isSaving: false }),
              })
            )
          )
        )
      ),
      deleteGame: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isDeleting: true })),
          switchMap((key) =>
            saveService.deleteSave(key).pipe(
              tapResponse({
                next: (_res) => patchState(store, { game: undefined }),
                error: (err) => console.log(err),
                finalize: () => patchState(store, { isDeleting: false }),
              })
            )
          )
        )
      ),
    }))
  );
};

export type GameSaveStore = ReturnType<typeof gameStoreFactory>;
