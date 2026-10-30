import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  numberAttribute,
} from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { AnimalStore } from '../../data/animal.store';
import { filterEnclosureNames } from '../../data/filter-enclosure-names';
import { initialAnimal } from '../../model/animal-create-dto';

@Component({
  selector: 'app-animal-edit',
  imports: [
    FormField,
    FormRoot,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    TranslocoPipe,
  ],
  templateUrl: './animal-edit.html',
  styleUrl: './animal-edit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalEditComponent {
  protected readonly animalStore = inject(AnimalStore);

  protected readonly id = input.required({ transform: numberAttribute });

  protected readonly model = linkedSignal(() => this.animalStore.selectedAnimal() ?? initialAnimal);

  protected readonly animalEditForm = form(
    this.model,
    (schemaPath) => {
      required(schemaPath.name);
      required(schemaPath.species);
    },
    {
      submission: {
        action: async (field) => {
          this.animalStore.update({ data: field().value(), id: this.id() });
        },
      },
    },
  );

  protected readonly filteredEnclosureNames = computed(() =>
    filterEnclosureNames(
      this.animalStore.enclosureNames(),
      this.animalEditForm.enclosure().value(),
    ),
  );

  constructor() {
    this.animalStore.selectAnimalById(this.id);
    this.animalStore.loadEnclosureNames();
  }
}
