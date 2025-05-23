import { afterNextRender, computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  signalStoreFeature,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntities,
  addEntity,
  entityConfig,
  EntityId,
  NamedEntityState,
  removeEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { GameSave } from '../../core/services/indexed-db.service';
import { GameSaveService } from '../abstract/game-save';

export type RequestStatus = 'idle' | 'loading' | 'loaded' | { error: string };
export type RequestStatusState = { requestStatus: RequestStatus };
export type RequestStatusEntity<T extends string> = {
  status: RequestStatus;
  name: T;
};

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

export function withNamedStatus<T extends string>(statusNames: T[]) {
  const config = entityConfig({
    entity: type<RequestStatusEntity<T>>(),
    collection: '_status',
    selectId: (entity) => entity.name,
  });

  return signalStoreFeature(
    withEntities<RequestStatusEntity<T>, '_status'>(config),
    withMethods((store) => ({
      isLoading(statusName: T) {
        return computed(
          () => store._statusEntityMap()[statusName].status === 'loading'
        );
      },
      isLoaded(statusName: T) {
        return computed(
          () => store._statusEntityMap()[statusName].status === 'loaded'
        );
      },
      isIdle(statusName: T) {
        return computed(
          () => store._statusEntityMap()[statusName].status === 'idle'
        );
      },
      isError(statusName: T) {
        return computed(() => {
          const status = store._statusEntityMap()[statusName].status;
          return typeof status === 'object' ? status.error : undefined;
        });
      },
      setLoading(statusName: T) {
        console.log(statusName, 'loading');
        patchState(
          store,
          updateEntity(
            { id: statusName, changes: { status: 'loading' } },
            { collection: '_status', selectId: (status) => status.name }
          )
        );
      },
      setLoaded(statusName: T) {
        console.log(statusName, 'loaded');
        patchState(
          store,
          updateEntity(
            { id: statusName, changes: { status: 'loaded' } },
            { collection: '_status', selectId: (status) => status.name }
          )
        );
      },
      setError(statusName: T, error: string) {
        console.log(statusName, 'error');
        patchState(
          store,
          updateEntity(
            { id: statusName, changes: { status: { error } } },
            { collection: '_status', selectId: (status) => status.name }
          )
        );
      },
    })),
    withHooks({
      onInit(store) {
        statusNames.forEach((name) => {
          const entity: RequestStatusEntity<T> = {
            name,
            status: 'idle',
          };
          patchState(
            store,
            addEntity(entity, {
              collection: '_status',
              selectId: (status) => status.name,
            })
          );
        });
      },
    })
  );
}

export type SelectedGameState = { selectedGameId: EntityId | undefined };

export function withSelectedGame<Game>() {
  return signalStoreFeature(
    { state: type<NamedEntityState<Game, 'game'>>() },
    withState<SelectedGameState>({ selectedGameId: undefined }),
    withComputed(({ gameEntityMap, selectedGameId }) => ({
      selectedGame: computed(() => {
        const selectedId = selectedGameId();
        return selectedId ? gameEntityMap()[selectedId] : undefined;
      }),
    }))
  );
}

export const gameStoreFactory = <T extends GameSave>() => {
  const gameSaveConfig = entityConfig({
    entity: type<T>(),
    collection: 'game',
    selectId: (game) => game.name,
  });

  return signalStore(
    withEntities<T, 'game'>(gameSaveConfig),
    withNamedStatus(['games', 'delete', 'save', 'create']),
    withSelectedGame<T>(),
    withMethods((store, saveService = inject(GameSaveService<T>)) => ({
      loadList: rxMethod<void>(
        pipe(
          tap(() => store.setLoading('games')),
          switchMap(() =>
            saveService.findAll().pipe(
              tap((a) => console.log('items from BE:', a)),
              tapResponse({
                next: (items) => {
                  console.log(items);
                  patchState(
                    store,
                    addEntities(items, {
                      collection: 'game',
                      selectId: (entity) => entity.name,
                    })
                  );
                },
                error: (err) => console.log(err),
                finalize: () => store.setLoaded('games'),
              })
            )
          )
        )
      ),
      createSave: rxMethod<T>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => store.setLoading('create')),
          switchMap((game) => {
            return saveService.create(game).pipe(
              tapResponse({
                next: (_res) =>
                  patchState(
                    store,
                    addEntity(game, {
                      collection: 'game',
                      selectId: (entity) => entity.name,
                    })
                  ),
                error: (err) => console.log(err),
                finalize: () => store.setLoaded('create'),
              })
            );
          })
        )
      ),
      saveGame: rxMethod<T>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => store.setLoading('save')),
          switchMap((game) =>
            saveService.update(game).pipe(
              tapResponse({
                next: (_res) =>
                  patchState(
                    store,
                    updateEntity(
                      { changes: game, id: game.name },
                      {
                        collection: 'game',
                        selectId: (entity) => entity.name,
                      }
                    )
                  ),
                error: (err) => console.log(err),
                finalize: () => store.setLoaded('save'),
              })
            )
          )
        )
      ),
      deleteSave: rxMethod<string>(
        pipe(
          debounceTime(300),
          tap(() => store.setLoading('delete')),
          switchMap((key) =>
            saveService.remove(key).pipe(
              tapResponse({
                next: (_res) =>
                  patchState(store, removeEntity(key, { collection: 'game' })),
                error: (err) => console.log(err),
                finalize: () => store.setLoaded('delete'),
              })
            )
          )
        )
      ),
      selectSave: (name: string) => {
        patchState(store, { selectedGameId: name });
      },
      checkNameAvailable: (name: string) => {
        return !store.gameIds().includes(name);
      },
    })),
    withHooks({
      onInit: (store) => {
        afterNextRender({
          read: () => {
            store.loadList();
          },
        });
      },
    })
  );
};
