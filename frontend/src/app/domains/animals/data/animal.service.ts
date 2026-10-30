import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AnimalCreateDto } from '../model/animal-create-dto';
import { Animal } from '../model/animal';

@Injectable({ providedIn: 'root' })
export class AnimalService {
  private readonly http = inject(HttpClient);

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>('/api/animals');
  }

  getEnclosureNames(): Observable<string[]> {
    return this.http
      .get<{ name: string }[]>('/api/enclosures')
      .pipe(map((enclosures) => enclosures.map((enclosure) => enclosure.name)));
  }

  createAnimal(data: AnimalCreateDto): Observable<Animal> {
    return this.http.post<Animal>('/api/animals', data);
  }

  updateAnimal(id: number, data: AnimalCreateDto): Observable<Animal> {
    return this.http.put<Animal>(`/api/animals/${id}`, data);
  }

  deleteAnimal(id: number): Observable<void> {
    return this.http.delete<void>(`/api/animals/${id}`);
  }
}
