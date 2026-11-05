# Tasks

## 1. Backend: Notizen entfernen

- [ ] 1.1 Feld `notes` aus der Entity `Animal` und die Zuweisung `animal.notes = …` aus `AnimalResource.updateAnimal` entfernen, Spalte `notes` und die Notizen aus allen Zeilen in `import.sql` streichen; mit `./mvnw compile` in `backend` verifizieren und im Start von `./mvnw quarkus:dev` prüfen, dass die Seed-Daten ohne Fehler geladen werden
- [ ] 1.2 Bestehende Tests anpassen: in `AnimalResourceTest` `notes` aus `persistAnimal`, Request-Bodys und Assertions entfernen, in `DashboardResourceTest` Spalte und Parameter `notes` aus dem Native Insert streichen; mit `./mvnw test` in `backend` verifizieren
- [ ] 1.3 RestAssured-Tests in `AnimalResourceTest` gegen die Szenarien ergänzen: „Antwort enthält keine Notizen“ (`GET /animals/{id}` ohne Feld `notes`), „Mitgeschickte Notizen werden ignoriert“ für `POST /animals` (Status `201`, Body und anschließendes `GET` ohne `notes`) und für `PUT /animals/{id}` (Status `200`, Body und anschließendes `GET` ohne `notes`); Abwesenheit z. B. mit `body("$", not(hasKey("notes")))` prüfen; mit `./mvnw test` in `backend` verifizieren

## 2. Frontend: Notizen entfernen

- [ ] 2.1 `notes` aus den Modellen `Animal` und `AnimalCreateDto` (inkl. `initialAnimal`) entfernen und die Felder Notizen aus `animal-profile.html`, `animal-create.html` und `animal-edit.html` löschen („Formular aus der Tierliste öffnen“, „Formular aus dem Tierprofil öffnen“); mit `ng build` und `ng lint` in `frontend` verifizieren und manuell prüfen, dass Steckbrief, Erfassungs- und Bearbeitungsformular kein Feld Notizen mehr zeigen und Speichern weiterhin funktioniert
- [ ] 2.2 Schlüssel `animalProfile.fields.notes`, `animalCreate.fields.notes` und `animalEdit.fields.notes` aus `public/i18n/de.json` und `public/i18n/en.json` entfernen; per Suche verifizieren, dass in `frontend/src` und `frontend/public` kein `notes` mehr vorkommt

## 3. Frontend: Tierprofil heißt „Steckbrief“

- [ ] 3.1 Die Texte laut Tabelle in design.md in `public/i18n/de.json` und `public/i18n/en.json` ändern (Titel „Steckbrief“/„Fact sheet“, Eyebrow, Ladehinweis, Fehlertexte, Eyebrow im Bearbeitungsformular, Aktion im Dashboard), ohne Schlüssel, Routen oder Komponenten umzubenennen („Steckbrief anzeigen“); manuell in beiden Sprachen prüfen, dass die Seite `/animals/{id}` den Titel „Steckbrief“ bzw. „Fact sheet“ trägt und keine Übersetzungsschlüssel roh angezeigt werden

## 4. Integration

- [ ] 4.1 `./mvnw test` in `backend`, `ng build` und `ng lint` in `frontend` ohne Fehler ausführen und in `./mvnw quarkus:dev` prüfen, dass ein neu erfasstes und anschließend bearbeitetes Tier im Steckbrief mit Name, Art, Alter und Gehege erscheint und `GET /api/animals/{id}` kein Feld `notes` liefert

## Workflow follow-up

- Change nach dem Review mit `openspec archive animal-fact-sheet` archivieren.
- Danach den Purpose in `openspec/specs/animal-profile/spec.md`, `openspec/specs/animal-registration/spec.md` und `openspec/specs/animal-editing/spec.md` von Hand anpassen: Die Notizen entfallen, `animal-profile` spricht vom Steckbrief (Delta-Specs können den Purpose nicht ändern).
- Mit `openspec validate --all --strict` das archivierte Ergebnis prüfen.
