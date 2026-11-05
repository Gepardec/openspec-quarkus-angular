# Design

## Context

- `AnimalResource.createAnimal` speichert das Tier direkt per `persist()`. Die Pflichtfelder prüft nur Bean Validation (`@NotBlank`), eine Prüfung auf Duplikate gibt es nicht. Die Tabelle `animals` hat keinen Unique-Constraint auf `name`.
- Im Frontend ruft die Submit-Action von `animal-create` `AnimalStore.create` (ein `rxMethod`) auf und kehrt sofort zurück. Fehler landen nur als Text im `callStatus` des Stores, das Formular bekommt davon nichts mit.
- Das Formular nutzt Angular Signal Forms (Angular 21). Die `submission.action` kann ein `Promise<TreeValidationResult>` liefern. Fehler mit `fieldTree` werden dann dem betroffenen Feld zugeordnet und gelten, bis sich der Wert ändert.

## Goals / Non-Goals

**Goals:**
- Doppelte Namen beim Anlegen im Backend ablehnen; das Backend entscheidet, das Frontend zeigt nur die Antwort an.
- Den Hinweis im Formular mit den Mitteln anzeigen, die Signal Forms und Angular Material schon bieten.

**Non-Goals:**
- Kein Unique-Constraint in der Datenbank und keine Anpassung von `import.sql`.
- Keine Prüfung beim Bearbeiten (`PUT /animals/{id}`).
- Keine Live-Prüfung während der Eingabe (kein asynchroner Validator, kein zusätzlicher Endpoint).

## Decisions

### Prüfung im Resource per Panache-Abfrage
Vor `persist()` zählt `createAnimal` die Tiere mit `lower(name) = lower(?1)` (z. B. `Animal.count(...)` als statische Methode `Animal.existsByName(String)` in der Entity). Gibt es eins, antwortet die Methode mit `409`.

Alternative: Unique-Constraint auf `name` und `ConstraintViolationException` auf `409` mappen. Verworfen: Groß-/Kleinschreibung ignoriert ein normaler Unique-Index in H2 nicht. Außerdem bräuchte es einen Exception-Mapper, und der Workshop soll klein bleiben.

### `409 Conflict` mit leerem Body
`409` ist der passende Status für einen Konflikt mit dem bestehenden Zustand. `400` bleibt für fehlerhafte Eingaben (fehlende Pflichtfelder). Das Frontend unterscheidet nur am Status, deshalb braucht es keinen Fehler-Body.

### Fehler über die Submit-Action an das Feld Name
`AnimalStore.create` bekommt eine Variante, die ein Promise liefert (z. B. `async create(data)` mit `firstValueFrom` statt `rxMethod`). Sie navigiert wie bisher bei Erfolg zur Tierliste und meldet bei `HttpErrorResponse` mit Status `409` „Name vergeben“ an den Aufrufer. Die Submit-Action in `animal-create` liefert dann einen Fehler `{ kind: 'nameTaken', fieldTree: field.name }`. Im Template zeigt ein zusätzliches `<mat-error>` für diesen Fehler-Typ den übersetzten Hinweis `animalCreate.validation.nameTaken`.

Alternative: ein Flag `nameTaken` im Store und ein `<mat-error>`, das darauf hört. Verworfen: Ein `mat-error` erscheint nur, wenn das Feld ungültig ist. Das Flag müsste beim Tippen von Hand zurückgesetzt werden. Signal Forms erledigen beides schon von selbst.

## Risks / Trade-offs

- [Race Condition: zwei gleichzeitige Anfragen mit demselben Namen kommen beide durch die Prüfung] → Für die Workshop-App mit H2 und einzelnen Nutzer:innen akzeptiert. Ein DB-Constraint wäre der nächste Schritt.
- [Seed-Daten oder bereits angelegte Duplikate bleiben bestehen] → Gewollt; die Regel gilt nur für neu angelegte Tiere.
- [Umbau von `create` weg von `rxMethod` weicht vom Muster der anderen Store-Methoden ab] → Auf `create` beschränkt und begründet, weil das Formular das Ergebnis braucht. `callStatus` wird weiter gesetzt.
