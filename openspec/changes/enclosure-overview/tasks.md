# Tasks

## 1. Backend: Endpunkt `GET /enclosures`

- [ ] 1.1 Records `EnclosureResponse` (`name`, `animalCount`, `animals`) und `EnclosureAnimalResponse` (`id`, `name`, `species`) anlegen; mit `./mvnw compile` in `backend` verifizieren
- [ ] 1.2 `EnclosureResource` mit `GET /enclosures` anlegen, die alle Tiere mit nicht leerem Gehege nach Gehege und Name sortiert lädt und nach Gehegename gruppiert („Belegte Gehege abrufen“, „Tiere ohne Gehege ausblenden“); mit den Tests aus 1.3 verifizieren
- [ ] 1.3 RestAssured-Tests `EnclosureResourceTest` gegen die Szenarien schreiben: mehrere Tiere in einem Gehege (`animalCount` `2`, Tiere mit `id`, `name`, `species`), Sortierung von Gehegen und Tieren, leeres Array ohne belegte Gehege, Tiere ohne oder mit leerem Gehege erscheinen nicht; mit `./mvnw test` in `backend` verifizieren

## 2. Frontend: Domäne `enclosures`

- [ ] 2.1 Modell `Enclosure`/`EnclosureAnimal`, `EnclosureService` (`GET /api/enclosures`) und `EnclosureStore` (NgRx Signal Store mit `withCallStatus` und Methode `loadEnclosures`) unter `src/app/domains/enclosures/` anlegen; mit `ng build` und `ng lint` in `frontend` verifizieren
- [ ] 2.2 Feature-Komponente `enclosure-overview` (OnPush, eigene `.ts`/`.html`/`.scss`) anlegen, die beim Öffnen lädt und je belegtem Gehege eine `mat-card` mit Name, Zahl der Tiere und einer Liste der Tiere (Name, Art) zeigt, jedes Tier per `routerLink` auf `/animals/{id}`; Spinner beim Laden, Hinweiskarte bei leerer Liste („Gehegeübersicht anzeigen“, „Tierprofil aus der Gehegeübersicht öffnen“, „Hinweis bei leerer Gehegeübersicht“); manuell verifizieren, dass alle belegten Gehege mit korrekter Zahl erscheinen und ein Klick auf ein Tier dessen Profil öffnet
- [ ] 2.3 Route `/enclosures` per `loadComponent` in `app.routes.ts` und Eintrag „Gehege“ mit Icon und `routerLinkActive` in der Hauptnavigation ergänzen („Gehegeübersicht in der Hauptnavigation“); manuell verifizieren, dass der Eintrag auf jeder Seite sichtbar ist und zur Gehegeübersicht führt
- [ ] 2.4 Alle sichtbaren Texte der Gehegeübersicht und des Navigationseintrags in `public/i18n/de.json` und `public/i18n/en.json` hinterlegen; manuell prüfen, dass in beiden Sprachen keine Übersetzungsschlüssel roh angezeigt werden

## 3. Frontend: Gehegevorschläge in den Tierformularen

- [ ] 3.1 `AnimalService` um `getEnclosureNames()` (`GET /api/enclosures`, abgebildet auf `name`) und `AnimalStore` um den State `enclosureNames` mit der Methode `loadEnclosureNames` erweitern, ohne Import aus `domain:enclosures`; mit `ng build` und `ng lint` in `frontend` verifizieren
- [ ] 3.2 Feld Gehege in `animal-create` um `mat-autocomplete` ergänzen, das beim Öffnen die Gehegenamen lädt und per `computed` nach dem eingegebenen Text filtert, ohne Groß-/Kleinschreibung („Gehege im Formular eingeben“); manuell verifizieren, dass bestehende Gehege vorgeschlagen werden, ein gewählter Vorschlag in genau dieser Schreibweise gespeichert wird und ein neu eingetippter Name gespeichert wird
- [ ] 3.3 Feld Gehege in `animal-edit` ebenso um `mat-autocomplete` ergänzen, vorbelegt mit dem aktuellen Gehege („Gehege im Formular ändern“); manuell verifizieren wie in 3.2 und dass das Formular weiterhin mit den aktuellen Angaben vorbelegt ist

## 4. Integration

- [ ] 4.1 `./mvnw test` in `backend`, `ng build` und `ng lint` in `frontend` ohne Fehler ausführen und in `./mvnw quarkus:dev` prüfen, dass `GET /api/enclosures` und die Seite `/enclosures` für „Savanne 1“ die Zahl `2` mit Leo und Nala zeigen, Kasimir ohne Gehege nicht erscheint und ein Tier, dessen Gehege über den Vorschlag im Formular gewählt wurde, im gewählten Gehege mitgezählt wird

## Workflow follow-up

- Change nach dem Review mit `openspec archive enclosure-overview` archivieren.
- Mit `openspec validate --all --strict` das archivierte Ergebnis prüfen.
