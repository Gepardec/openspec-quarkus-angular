import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { form, FormField, FormRoot, required, validate } from '@angular/forms/signals';
import { TranslocoPipe } from '@jsverse/transloco';

import { AnimalStore } from '../../data/animal.store';
import { filterEnclosureNames } from '../../data/filter-enclosure-names';
import { AnimalCreateDto, initialAnimal } from '../../model/animal-create-dto';

@Component({
  selector: 'app-animal-create',
  imports: [
    FormField,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    TranslocoPipe,
    FormRoot,
  ],
  templateUrl: './animal-create.html',
  styleUrl: './animal-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalCreateComponent {
  protected readonly animalStore = inject(AnimalStore);

  protected readonly model = signal<AnimalCreateDto>(initialAnimal);

  protected readonly animalCreateForm = form(
    this.model,
    (schemaPath) => {
      required(schemaPath.name);
      validate(schemaPath.name, ({ value }) =>
        value().trim() === this.animalStore.conflictingName() ? { kind: 'nameTaken' } : undefined,
      );
      required(schemaPath.species);
    },
    {
      submission: {
        action: async (field) => {
          this.animalStore.create(field().value());
        },
      },
    },
  );

  protected readonly filteredEnclosureNames = computed(() =>
    filterEnclosureNames(
      this.animalStore.enclosureNames(),
      this.animalCreateForm.enclosure().value(),
    ),
  );

  constructor() {
    this.animalStore.clearNameConflict();
    this.animalStore.loadEnclosureNames();
  }
}
