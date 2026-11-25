import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { removeEntity, setAllEntities, upsertEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Router } from '@angular/router';
import { pipe, switchMap, tap } from 'rxjs';

import { AnimalCreateDto } from '../model/animal-create-dto';
import { Animal } from '../model/animal';
import {
  setError,
  setLoaded,
  setLoading,
  withCallStatus,
} from '@gpdc-zoo/shared/util/call-status.feature';
import { AnimalService } from './animal.service';

type AnimalProfileState = {
  conflictingName: string | null;
  enclosureNames: string[];
  selectedAnimalId: number | null;
};

type AnimalUpdateInput = {
  data: AnimalCreateDto;
  id: number;
};

export const AnimalStore = signalStore(
  { providedIn: 'root' },
  withEntities<Animal>(),
  withCallStatus(),
  withState<AnimalProfileState>({
    conflictingName: null,
    enclosureNames: [],
    selectedAnimalId: null,
  }),
  withComputed((store) => ({
    selectedAnimal: computed(() =>
      store.entities().find((animal) => animal.id === store.selectedAnimalId()),
    ),
    selectedAnimalNotFound: computed(
      () => !store.entities().some((animal) => animal.id === store.selectedAnimalId()),
    ),
  })),
  withMethods((store) => {
    const animalService = inject(AnimalService);
    const router = inject(Router);

    const handleSaveError = (error: unknown, name: string): void => {
      if (error instanceof HttpErrorResponse && error.status === 409) {
        patchState(store, { conflictingName: name.trim() }, setLoaded());
      } else {
        patchState(store, setError(error));
      }
    };

    return {
      clearNameConflict: (): void => patchState(store, { conflictingName: null }),
      loadAnimals: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap(() =>
            animalService.getAnimals().pipe(
              tapResponse({
                next: (animals) => patchState(store, setAllEntities(animals), setLoaded()),
                error: (error) => patchState(store, setError(error)),
              }),
            ),
          ),
        ),
      ),
      loadEnclosureNames: rxMethod<void>(
        pipe(
          switchMap(() =>
            animalService.getEnclosureNames().pipe(
              tapResponse({
                next: (enclosureNames) => patchState(store, { enclosureNames }),
                error: () => patchState(store, { enclosureNames: [] }),
              }),
            ),
          ),
        ),
      ),
      create: rxMethod<AnimalCreateDto>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap((data) =>
            animalService.createAnimal(data).pipe(
              tapResponse({
                next: (animal) => {
                  patchState(store, upsertEntity(animal), { conflictingName: null }, setLoaded());
                  void router.navigateByUrl('/animals');
                },
                error: (error) => handleSaveError(error, data.name),
              }),
            ),
          ),
        ),
      ),
      update: rxMethod<AnimalUpdateInput>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap(({ data, id }) =>
            animalService.updateAnimal(id, data).pipe(
              tapResponse({
                next: (animal) => {
                  patchState(store, upsertEntity(animal), { conflictingName: null }, setLoaded());
                  void router.navigate(['/animals', id]);
                },
                error: (error) => handleSaveError(error, data.name),
              }),
            ),
          ),
        ),
      ),
      delete: rxMethod<number>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap((id) =>
            animalService.deleteAnimal(id).pipe(
              tapResponse({
                next: () => patchState(store, removeEntity(id), setLoaded()),
                error: (error) => patchState(store, setError(error)),
              }),
            ),
          ),
        ),
      ),
      selectAnimalById: rxMethod<number>(
        pipe(
          tap((selectedAnimalId) => {
            patchState(store, { selectedAnimalId });
          }),
        ),
      ),
    };
  }),
  withHooks({
    onInit: (store) => {
      store.loadAnimals();
    },
  }),
);
