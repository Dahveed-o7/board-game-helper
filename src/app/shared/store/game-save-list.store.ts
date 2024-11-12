import { computed, inject, InjectionToken, ProviderToken } from '@angular/core';
import {
  patchState,
  signalState,
  signalStore,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, pipe, switchMap, tap } from 'rxjs';
import { GameSave } from '../../core/services/indexed-db.service';
import { GameSaveService } from '../interfaces/game-save.interfaces';
import { tapResponse } from '@ngrx/operators';
import {
  entityConfig,
  EntityId,
  EntityState,
  NamedEntityState,
  withEntities,
} from '@ngrx/signals/entities';

type GameListState = {
  gameList: GameSave[];
  isLoading: boolean;
  isDeleting: boolean;
};

export type RequestStatus = 'idle' | 'loading' | 'loaded' | { error: string };
export type RequestStatusState = { requestStatus: RequestStatus };

export function withRequestStatus() {
  return signalStoreFeature(
    withState<RequestStatusState>({ requestStatus: 'idle' }),
    withComputed(({ requestStatus }) => ({
      isLoading: computed(() => requestStatus() === 'loading'),
      isLoaded: computed(() => requestStatus() === 'loaded'),
      error: computed(() => {
        const status = requestStatus();
        return typeof status === 'object' ? status.error : null;
      }),
    }))
  );
}

export function setLoading(): RequestStatusState {
  return { requestStatus: 'loading' };
}

export function setLoaded(): RequestStatusState {
  return { requestStatus: 'loaded' };
}

export function setError(error: string): RequestStatusState {
  return { requestStatus: { error } };
}

export type SelectedGameState = { selectedGameId: EntityId | null };

export function withSelectedGame<Game>() {
  return signalStoreFeature(
    { state: type<NamedEntityState<Game, 'game'>>() },
    withState<SelectedGameState>({ selectedGameId: null }),
    withComputed(({ gameEntityMap, selectedGameId }) => ({
      selectedEntity: computed(() => {
        const selectedId = selectedGameId();
        return selectedId ? gameEntityMap()[selectedId] : null;
      }),
    }))
  );
}

export const gameListStoreFactory = <T extends GameSave>(
  gameService: ProviderToken<GameSaveService<T>>
) => {
  const initialState: GameListState = {
    gameList: [],
    isLoading: false,
    isDeleting: false,
  };

  const gameSaveConfig = entityConfig({
    entity: type<T>(),
    collection: 'game',
    selectId: (game) => game.slug,
  });

  return signalStore(
    withState(initialState),
    withEntities<T, 'game'>(gameSaveConfig),
    withRequestStatus(),
    withMethods((store, saveService = inject(gameService)) => ({
      loadList: rxMethod(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap(() =>
            saveService.getGames().pipe(
              tapResponse({
                next: (items) => patchState(store, { gameList: items }),
                error: (err) => console.log(err),
                finalize: () => patchState(store, setLoaded()),
              })
            )
          )
        )
      ),
      deleteItem: rxMethod<string>(
        pipe(
          debounceTime(300),
          tap(() => patchState(store, { isDeleting: true })),
          switchMap((key) =>
            saveService.deleteSave(key).pipe(
              tapResponse({
                next: (_res) =>
                  patchState(store, (state) => ({
                    gameList: state.gameList.filter(
                      (item) => item.slug !== key
                    ),
                  })),
                error: (err) => console.log(err),
                finalize: () => patchState(store, { isDeleting: false }),
              })
            )
          )
        )
      ),
    })),
    withSelectedGame<T>()
  );
};
