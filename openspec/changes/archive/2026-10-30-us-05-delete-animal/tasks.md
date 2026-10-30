# Tasks

## 1. Backend: Tier löschen

- [x] 1.1 `DELETE /animals/{id}` in `AnimalResource` (`@Transactional`) ergänzen, das mit `204` antwortet oder mit `404`, wenn kein Tier gelöscht wurde; prüfen, dass ein Aufruf in der laufenden App ein Seed-Tier entfernt
- [x] 1.2 RestAssured-Tests (`@QuarkusTest`) für die Szenarien „Bestehendes Tier löschen“ (inklusive `404` beim anschließenden `GET`) und „Tier existiert nicht“ schreiben und mit `./mvnw test` verifizieren

## 2. Frontend: Datenzugriff

- [x] 2.1 `AnimalService.deleteAnimal` (`DELETE /api/animals/{id}`) ergänzen; mit `ng build` verifizieren
- [x] 2.2 `AnimalStore` um die Methode `delete` erweitern, die das Tier nach Erfolg per `removeEntity` entfernt; mit `ng build` und `ng lint` verifizieren

## 3. Frontend: Bestätigungsdialog und Aktion im Profil

- [x] 3.1 Komponente `animal-delete-dialog` (`.ts`, `.html`, `.scss`, OnPush) mit `MatDialog`, Namen des Tiers aus `MAT_DIALOG_DATA` und den Aktionen Löschen und Abbrechen anlegen; mit `ng build` verifizieren
- [x] 3.2 Im Tierprofil die Aktion „Löschen“ ergänzen, die den Dialog öffnet und nur nach Bestätigung löscht und zur Tierliste navigiert; manuell verifizieren, dass der Dialog den Namen nennt, Abbrechen das Tier erhält und Löschen zur Tierliste ohne das Tier führt
- [x] 3.3 Alle sichtbaren Texte des Dialogs und der neuen Aktion in `public/i18n/de.json` und `public/i18n/en.json` hinterlegen und manuell prüfen, dass in der laufenden App keine Übersetzungsschlüssel roh angezeigt werden
- [x] 3.4 `ng build` und `ng lint` ohne Fehler ausführen
