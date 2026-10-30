# Tasks

## 1. Backend: Tier anlegen

- [x] 1.1 Abhängigkeit `quarkus-hibernate-validator` in `pom.xml` sicherstellen und `name` und `species` der Entity `Animal` mit `@NotBlank` markieren; prüfen, dass die App mit `./mvnw quarkus:dev` startet
- [x] 1.2 `POST /animals` in `AnimalResource` (`@Transactional`, `@Valid`) ergänzen, das mit `201`, `Location`-Header und dem angelegten Tier antwortet; prüfen, dass ein Aufruf in der laufenden App ein Tier anlegt
- [x] 1.3 RestAssured-Tests (`@QuarkusTest`) für die Szenarien „Gültiges Tier anlegen“ (Status, `Location`, Body) und „Pflichtangabe fehlt“ schreiben und mit `./mvnw test` verifizieren

## 2. Frontend: Datenzugriff

- [x] 2.1 Modell `AnimalCreateDto` mit Startwerten `initialAnimal` unter `src/app/domains/animals/model/` anlegen und `AnimalService.createAnimal` (`POST /api/animals`) ergänzen; mit `ng build` verifizieren
- [x] 2.2 `AnimalStore` um die Methode `create` erweitern, die das neue Tier per `upsertEntity` übernimmt und zur Tierliste navigiert; mit `ng build` und `ng lint` verifizieren

## 3. Frontend: Formular und Navigation

- [x] 3.1 Komponente `animal-create` (`.ts`, `.html`, `.scss`, OnPush) mit Signal Forms und den Feldern Name, Art, Alter, Gehege und Notizen anlegen; mit `ng build` verifizieren
- [x] 3.2 Pflichtprüfung für Name und Art mit Fehlermeldung am Feld ergänzen; manuell verifizieren, dass ohne Name oder Art kein Tier angelegt wird und der Hinweis erscheint
- [x] 3.3 Route `/animals/new` mit `loadComponent` vor `/animals/:id` in `app.routes.ts` registrieren und in der Tierliste die Aktion „Tier hinzufügen“ ergänzen; manuell verifizieren, dass die Aktion ein leeres Formular öffnet
- [x] 3.4 Speichern und Abbrechen anbinden; manuell verifizieren, dass ein gespeichertes Tier in der Tierliste erscheint und Abbrechen ohne neues Tier zur Tierliste zurückführt
- [x] 3.5 Alle sichtbaren Texte des Formulars und der neuen Aktion in `public/i18n/de.json` und `public/i18n/en.json` hinterlegen und manuell prüfen, dass in der laufenden App keine Übersetzungsschlüssel roh angezeigt werden
- [x] 3.6 `ng build` und `ng lint` ohne Fehler ausführen
