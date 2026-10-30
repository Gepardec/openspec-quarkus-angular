# Tasks

## 1. Backend: Notizen entfernen

- [ ] 1.1 Feld `notes` aus der Entity `Animal` und die Übernahme von `notes` in `PUT /animals/{id}` in `AnimalResource` entfernen; prüfen, dass die App mit `./mvnw quarkus:dev` startet
- [ ] 1.2 `notes` aus den Inserts in `import.sql` entfernen und prüfen, dass `GET /api/animals` in der laufenden App die Seed-Tiere ohne `notes` liefert
- [ ] 1.3 RestAssured-Tests in `AnimalResourceTest` anpassen: `notes` aus Testdaten und Erwartungen entfernen, für „Tier existiert“ prüfen, dass die Antwort kein Feld `notes` enthält, und die Szenarien „Notizen werden mitgesendet“ für `POST` und `PUT` ergänzen; `notes` aus dem nativen Insert in `DashboardResourceTest` entfernen; mit `./mvnw test` verifizieren

## 2. Frontend: Notizen entfernen

- [ ] 2.1 `notes` aus den Modellen `Animal` und `AnimalCreateDto` (inklusive `initialAnimal`) entfernen; mit `ng build` verifizieren, dass keine Verwendung übrig bleibt
- [ ] 2.2 Notizen aus dem Tierprofil (`animal-profile`) entfernen; manuell verifizieren, dass das Profil nur Name, Art, Alter und Gehege zeigt
- [ ] 2.3 Feld Notizen aus den Formularen `animal-create` und `animal-edit` entfernen; manuell verifizieren, dass Erfassen und Bearbeiten ohne Notizen funktionieren
- [ ] 2.4 Übersetzungsschlüssel für Notizen (`animalProfile.fields.notes`, `animalCreate.fields.notes`, `animalEdit.fields.notes`) aus `public/i18n/de.json` und `public/i18n/en.json` entfernen und manuell prüfen, dass in der laufenden App keine Übersetzungsschlüssel roh angezeigt werden
- [ ] 2.5 `ng build` und `ng lint` ohne Fehler ausführen

## 3. Specs: Purpose nachziehen

- [ ] 3.1 Den Purpose von `openspec/specs/animal-profile/spec.md`, `openspec/specs/animal-registration/spec.md` und `openspec/specs/animal-editing/spec.md` so anpassen, dass er keine Notizen mehr nennt, und mit `openspec validate --all --strict` verifizieren
