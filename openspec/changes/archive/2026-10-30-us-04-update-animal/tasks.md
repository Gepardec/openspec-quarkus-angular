# Tasks

## 1. Backend: Tier aktualisieren

- [x] 1.1 `PUT /animals/{id}` in `AnimalResource` (`@Transactional`, `@Valid`) ergänzen, das bei unbekannter ID `NotFoundException` wirft und alle Felder übernimmt; prüfen, dass ein Aufruf in der laufenden App ein Seed-Tier ändert
- [x] 1.2 RestAssured-Tests (`@QuarkusTest`) für die Szenarien „Bestehendes Tier aktualisieren“, „Pflichtangabe fehlt“ und „Tier existiert nicht“ schreiben und mit `./mvnw test` verifizieren

## 2. Frontend: Datenzugriff

- [x] 2.1 `AnimalService.updateAnimal` (`PUT /api/animals/{id}`) ergänzen; mit `ng build` verifizieren
- [x] 2.2 `AnimalStore` um die Methode `update` erweitern, die das geänderte Tier per `upsertEntity` übernimmt und zum Tierprofil navigiert; mit `ng build` und `ng lint` verifizieren

## 3. Frontend: Formular und Navigation

- [x] 3.1 Komponente `animal-edit` (`.ts`, `.html`, `.scss`, OnPush) mit Signal Forms, den Feldern Name, Art, Alter, Gehege und Notizen und Vorbelegung per `linkedSignal` aus `selectedAnimal` anlegen; mit `ng build` und manuell verifizieren, dass das Formular die aktuellen Angaben eines Seed-Tiers zeigt
- [x] 3.2 Pflichtprüfung für Name und Art mit Fehlermeldung am Feld ergänzen; manuell verifizieren, dass mit geleertem Name oder Art nichts gespeichert wird und der Hinweis erscheint
- [x] 3.3 Hinweis für eine unbekannte Tier-ID im Formular ergänzen; manuell verifizieren, dass `/animals/99999/edit` den Hinweis „Tier nicht gefunden“ zeigt
- [x] 3.4 Route `/animals/:id/edit` mit `loadComponent` vor `/animals/:id` in `app.routes.ts` registrieren und im Tierprofil die Aktion „Bearbeiten“ ergänzen; manuell verifizieren, dass die Aktion das vorbelegte Formular öffnet
- [x] 3.5 Speichern und Abbrechen anbinden; manuell verifizieren, dass nach dem Speichern das Profil die geänderten Angaben zeigt und Abbrechen ohne Änderung zum Profil zurückführt
- [x] 3.6 Alle sichtbaren Texte des Formulars und der neuen Aktion in `public/i18n/de.json` und `public/i18n/en.json` hinterlegen und manuell prüfen, dass in der laufenden App keine Übersetzungsschlüssel roh angezeigt werden
- [x] 3.7 `ng build` und `ng lint` ohne Fehler ausführen
