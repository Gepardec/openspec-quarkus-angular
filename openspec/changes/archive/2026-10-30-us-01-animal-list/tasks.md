# Tasks

## 1. Backend: Tiere abrufen

- [x] 1.1 Panache-Entity `Animal` (Tabelle `animals`) mit den Pflichtfeldern `name` und `species` anlegen und prüfen, dass die App mit `./mvnw quarkus:dev` startet und das Schema erzeugt
- [x] 1.2 Seed-Daten mit einigen Beispieltieren in `import.sql` ergänzen und prüfen, dass `GET /api/animals` in der laufenden App die Beispieltiere liefert
- [x] 1.3 `AnimalResource` unter `/animals` mit `GET` anlegen, die alle Tiere als JSON-Array liefert, und prüfen, dass der Endpunkt mit Status `200` antwortet
- [x] 1.4 RestAssured-Tests (`@QuarkusTest`) für die Szenarien „Tiere sind registriert“ und „Keine Tiere registriert“ schreiben und mit `./mvnw test` verifizieren

## 2. Frontend: Datenzugriff

- [x] 2.1 Modell `Animal` unter `src/app/domains/animals/model/` anlegen und `AnimalService` mit `getAnimals()` (`GET /api/animals`) unter `src/app/domains/animals/data/` implementieren; mit `ng build` verifizieren
- [x] 2.2 Wiederverwendbares Store-Feature `withCallStatus` für den Ladezustand unter `src/app/domains/shared/util/` anlegen; mit `ng build` und `ng lint` (Sheriff-Grenzen) verifizieren
- [x] 2.3 `AnimalStore` (NgRx Signal Store mit `withEntities` und `withCallStatus`) anlegen, der die Tiere beim Initialisieren lädt; mit `ng build` und `ng lint` verifizieren

## 3. Frontend: Tierliste und Navigation

- [x] 3.1 Komponente `animal-list` (`.ts`, `.html`, `.scss`, OnPush) mit `mat-table` und den Spalten Name und Art anlegen; mit `ng build` und manuell in der laufenden App verifizieren, dass alle Seed-Tiere mit Name und Art erscheinen
- [x] 3.2 Ladezustand (Fortschrittsbalken) und Hinweis bei leerer Tierliste ergänzen; manuell verifizieren, dass ohne Tiere der Hinweis statt der Tabelle erscheint
- [x] 3.3 Route `/animals` mit `loadComponent` in `app.routes.ts` registrieren und in der App-Shell eine Material-Toolbar mit Navigationslink zur Tierliste ergänzen; manuell verifizieren, dass der Link die Tierliste öffnet
- [x] 3.4 Alle sichtbaren Texte der Tierliste und der Navigation in `public/i18n/de.json` und `public/i18n/en.json` hinterlegen und manuell prüfen, dass in der laufenden App keine Übersetzungsschlüssel roh angezeigt werden
- [x] 3.5 `ng build` und `ng lint` ohne Fehler ausführen
