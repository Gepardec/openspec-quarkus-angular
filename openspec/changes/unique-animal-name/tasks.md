# Tasks

## 1. Backend: Namen beim Anlegen prüfen

- [x] 1.1 RestAssured-Tests (`@QuarkusTest`) in `AnimalResourceTest` für die Szenarien „Name ist bereits vergeben“, „Name unterscheidet sich nur in Groß-/Kleinschreibung“ (jeweils `409` und danach unveränderte Anzahl in `GET /api/animals`) und „Name ist noch frei“ (`201`) schreiben; prüfen, dass die beiden `409`-Tests mit `./mvnw test` zunächst fehlschlagen
- [x] 1.2 Statische Methode `Animal.existsByName(String)` mit Vergleich ohne Groß-/Kleinschreibung ergänzen und `AnimalResource.createAnimal` vor `persist()` mit `409` (leerer Body) abbrechen lassen; mit `./mvnw test` verifizieren, dass alle Tests grün sind

## 2. Frontend: Fehler im Formular anzeigen

- [x] 2.1 `AnimalStore.create` so umbauen, dass es ein Promise liefert, bei Erfolg wie bisher zur Tierliste navigiert und einen `409` als „Name vergeben“ an den Aufrufer meldet (`callStatus` weiter setzen); mit `ng build` verifizieren
- [x] 2.2 Submit-Action in `animal-create` auf das Ergebnis warten lassen und bei vergebenem Namen den Fehler `{ kind: 'nameTaken', fieldTree: field.name }` zurückgeben; im Template ein `<mat-error>` für `nameTaken` mit `animalCreate.validation.nameTaken` ergänzen; mit `ng build` verifizieren
- [ ] 2.3 Übersetzung `animalCreate.validation.nameTaken` in `public/i18n/de.json` („Dieser Name ist bereits vergeben.“) und `public/i18n/en.json` („This name is already taken.“) hinterlegen; manuell prüfen, dass in beiden Sprachen kein Schlüssel roh angezeigt wird
- [ ] 2.4 In der laufenden App (`./mvnw quarkus:dev`) manuell verifizieren: Speichern mit „Leo“ bzw. „leo“ zeigt den Hinweis am Feld Name und das Formular bleibt mit den Angaben geöffnet; nach Änderung auf einen freien Namen verschwindet der Hinweis, das Tier wird angelegt und erscheint in der Tierliste
- [x] 2.5 `ng build` und `ng lint` ohne Fehler ausführen
