# Tasks

## 1. Backend: Trimmen und Eindeutigkeit

- [ ] 1.1 `Animal.name` mit `@Column(unique = true)` versehen und eine statische Abfrage `existsByName(String name, Long excludeId)` im Entity ergänzen (exakter Vergleich, `excludeId` optional); prüfen, dass die App mit den Seed-Daten aus `import.sql` weiterhin startet (`./mvnw test` läuft ohne Startfehler)
- [ ] 1.2 In `AnimalResource.createAnimal` den Namen per `trim()` bereinigen, bei vorhandenem Namen `409 Conflict` liefern und mit `persistAndFlush()` speichern; in `AnimalResourceTest` Tests ergänzen für: freier Name → `201`, vergebener Name → `409` ohne neues Tier, „leo“ neben „Leo“ → `201`, „ Kira “ → gespeichert und zurückgegeben als „Kira“, „ Leo “ neben „Leo“ → `409`, Name nur aus Leerzeichen → `400`; `./mvnw test` ist grün
- [ ] 1.3 In `AnimalResource.updateAnimal` den Namen ebenso bereinigen, bei einem anderen Tier mit demselben Namen `409 Conflict` liefern (eigene `id` ausgenommen) und nach der Zuweisung flushen; Tests ergänzen für: Umbenennen auf vergebenen Namen → `409` und Name bleibt unverändert, Bearbeiten ohne Namensänderung → `200`; `./mvnw test` ist grün
- [ ] 1.4 `ExceptionMapper` für `jakarta.persistence.PersistenceException` anlegen, der die Cause-Kette nach `org.hibernate.exception.ConstraintViolationException` durchsucht und dann `409 Conflict` liefert, sonst `500`; mit zwei Tests absichern: (a) zwei Tiere mit demselben Namen direkt über das Entity speichern und flushen → Constraint-Verletzung wird geworfen; (b) eine Test-Resource unter `src/test/java` speichert innerhalb von `@Transactional` ein Duplikat per `persistAndFlush()`, der HTTP-Aufruf darauf liefert `409` (prüft den echten Weg über Interceptor und Mapper); `./mvnw test` ist grün

## 2. Frontend: Konflikt im Store

- [ ] 2.1 `AnimalStore` um den State `conflictingName: string | null` und die Methode `clearNameConflict()` erweitern; in den `error`-Zweigen von `create` und `update` bei `HttpErrorResponse` mit Status `409` `conflictingName` auf den getrimmten gesendeten Namen und `callStatus` auf `loaded` setzen (keine Navigation), andere Fehler unverändert über `setError`; bei Erfolg `conflictingName` zurücksetzen; `ng build` und `ng lint` laufen fehlerfrei

## 3. Frontend: Fehleranzeige in den Formularen

- [ ] 3.1 Übersetzungen `animalCreate.validation.nameTaken` und `animalEdit.validation.nameTaken` in `frontend/public/i18n/de.json` („Dieser Name ist bereits vergeben.“) und `en.json` („This name is already taken.“) ergänzen; prüfen, dass beide Dateien gültiges JSON sind und dieselben Keys enthalten
- [ ] 3.2 `animal-create`: beim Erzeugen `clearNameConflict()` aufrufen, im Form-Schema einen Validator am Namensfeld ergänzen, der `nameTaken` meldet, wenn der getrimmte Wert gleich `animalStore.conflictingName()` ist, und im Template am Namensfeld je nach Fehlerart `nameRequired` oder `nameTaken` anzeigen; `ng build` und `ng lint` laufen fehlerfrei
- [ ] 3.3 `animal-edit`: dieselben Änderungen wie in 3.2 mit den `animalEdit`-Keys umsetzen; `ng build` und `ng lint` laufen fehlerfrei

## 4. Integration

- [ ] 4.1 Mit `./mvnw quarkus:dev` die Spec-Szenarien im Browser durchspielen: „Leo“ anlegen → Meldung am Namensfeld, Eingaben bleiben erhalten, Meldung verschwindet beim Ändern des Namens; „Zara“ auf „Leo“ umbenennen → Meldung im Bearbeiten-Formular; „leo“ anlegen → erfolgreich; Sprache auf Englisch umstellen → englische Meldung
