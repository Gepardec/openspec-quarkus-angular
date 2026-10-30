# Tasks

## 1. Backend: Tier abrufen

- [x] 1.1 Entity `Animal` um die optionalen Felder `age` (`Integer`), `enclosure` und `notes` erweitern und prüfen, dass die App mit `./mvnw quarkus:dev` startet und das Schema erzeugt
- [x] 1.2 Seed-Daten in `import.sql` um Alter, Gehege und Notizen ergänzen und prüfen, dass `GET /api/animals` in der laufenden App die neuen Felder liefert
- [x] 1.3 `GET /animals/{id}` in `AnimalResource` ergänzen, das bei unbekannter ID `NotFoundException` wirft, und prüfen, dass der Endpunkt für ein Seed-Tier mit Status `200` antwortet
- [x] 1.4 RestAssured-Tests (`@QuarkusTest`) für die Szenarien „Tier existiert“ (alle Felder inklusive `notes`) und „Tier existiert nicht“ schreiben und mit `./mvnw test` verifizieren

## 2. Frontend: Datenzugriff

- [x] 2.1 Modell `Animal` unter `src/app/domains/animals/model/` um `age`, `enclosure` und `notes` erweitern; mit `ng build` verifizieren
- [x] 2.2 `AnimalStore` um den Zustand `selectedAnimalId`, die Methode `selectAnimalById` und die Computed Signals `selectedAnimal` und `selectedAnimalNotFound` erweitern; mit `ng build` und `ng lint` verifizieren

## 3. Frontend: Tierprofil und Navigation

- [x] 3.1 Komponente `animal-profile` (`.ts`, `.html`, `.scss`, OnPush) mit `mat-card` und `mat-list` für Name, Art, Alter, Gehege und Notizen anlegen; mit `ng build` und manuell in der laufenden App verifizieren, dass ein Seed-Tier mit allen Angaben erscheint
- [x] 3.2 Hinweis für eine unbekannte Tier-ID im Profil ergänzen; manuell verifizieren, dass `/animals/99999` den Hinweis „Tier nicht gefunden“ zeigt
- [x] 3.3 Route `/animals/:id` mit `loadComponent` in `app.routes.ts` registrieren und `withComponentInputBinding()` im Router aktivieren; manuell verifizieren, dass die URL eines Seed-Tiers dessen Profil öffnet
- [x] 3.4 Zeilen der Tierliste per `routerLink` auf `/animals/{id}` anklickbar machen und im Profil einen Link zurück zur Tierliste ergänzen; manuell verifizieren, dass beide Wege funktionieren
- [x] 3.5 Manuell verifizieren, dass das Profil eines Tiers ohne Notizen die übrigen Angaben zeigt und der Notizbereich leer bleibt
- [x] 3.6 Alle sichtbaren Texte des Profils in `public/i18n/de.json` und `public/i18n/en.json` hinterlegen und manuell prüfen, dass in der laufenden App keine Übersetzungsschlüssel roh angezeigt werden
- [x] 3.7 `ng build` und `ng lint` ohne Fehler ausführen
