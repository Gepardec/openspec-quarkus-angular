# Design

## Context

Motivation und Umfang: siehe `proposal.md`. Die Anforderungen stehen in `specs/animal-management/spec.md`.

Aktueller Stand, soweit für den Ansatz relevant:

- **Backend:** `AnimalResource` nimmt das `Animal`-Entity direkt als Request-Body entgegen (`@Valid`, `@NotBlank` auf `name`) und speichert es per Panache. `@Transactional` sitzt auf `POST` und `PUT`. Es gibt keine Prüfung auf vorhandene Namen und keine Unique-Constraint. Das Schema erzeugt Hibernate bei jedem Start neu (`drop-and-create`), die Seed-Daten kommen aus `import.sql`.
- **Frontend:** `AnimalStore` (NgRx Signal Store, `providedIn: 'root'`) führt `create` und `update` als `rxMethod` aus und navigiert bei Erfolg weg. Fehler landen generisch in `callStatus` (`setError`), die Formulare zeigen sie nicht an. `animal-create` und `animal-edit` nutzen Angular Signal Forms (`form()`, `[formField]`, `[formRoot]` mit `submission.action`). Am Namensfeld zeigt ein `mat-error` nur „Name ist erforderlich“, und zwar für jeden ungültigen Zustand.
- Im Frontend gibt es keine Unit-Tests (`*.spec.ts`). Die Backend-Tests (`AnimalResourceTest`) leeren die Tabelle vor jedem Test.

## Goals / Non-Goals

**Goals:**

- Die Eindeutigkeit wird an einer Stelle durchgesetzt, auf die sich alle Clients verlassen können: Server und Datenbank.
- Der Konflikt wird über die bestehende Store-Architektur ins Formular gebracht, ohne das `rxMethod`-Muster aufzubrechen.
- Die Fehlermeldung verhält sich wie die übrigen Feld-Validierungen: Sie hängt am Feld, verschwindet bei Änderung des Namens und blockiert ein erneutes Absenden mit demselben Namen.

**Non-Goals:**

- Kein strukturierter Fehler-Body (z. B. Problem Details) für den `409`. Das Frontend wertet nur den Statuscode aus.
- Keine generelle Fehleranzeige für andere Serverfehler in den Formularen. Das bleibt ein eigenes Thema.
- Kein eigenes Request-DTO im Backend. Das Entity bleibt Request-Body.

## Decisions

### 1. Trimmen im Resource nach der Bean Validation

`AnimalResource` entfernt in `POST` und `PUT` mit `String.trim()` Leerzeichen am Rand des Namens, bevor es prüft und speichert. `@Valid` läuft vorher. Ein Name nur aus Leerzeichen scheitert also bereits an `@NotBlank` mit `400`, wie die Spec es verlangt.

- *Alternative:* Normalisierung im Entity (`@PrePersist`/`@PreUpdate` oder Setter). Verworfen, weil der Lifecycle-Hook erst beim Flush greift, also nach der Konfliktprüfung. Das Panache-Muster mit öffentlichen Feldern hat zudem keine Setter.
- `trim()` statt `strip()`, weil `@NotBlank` (Hibernate Validator) mit derselben `trim()`-Semantik prüft. Mit `strip()` könnte ein Name nur aus Unicode-Leerzeichen `@NotBlank` passieren, danach zu `""` werden und gespeichert werden.

### 2. Konfliktprüfung als Finder im Entity plus Unique-Constraint

- `Animal` erhält eine statische Panache-Abfrage, z. B. `existsByName(String name, Long excludeId)`, die ein anderes Tier mit exakt diesem Namen sucht. Beim Anlegen ist `excludeId` `null`. Das folgt der Projektkonvention, Repository-Logik im Entity zu halten.
- Findet sie ein Tier, antwortet der Resource mit `409 Conflict`, z. B. per `WebApplicationException(Response.Status.CONFLICT)`.
- `Animal.name` bekommt `@Column(unique = true)`. Durch `drop-and-create` legt Hibernate die Constraint beim Start automatisch an.
- *Warum beides?* Die Vorabprüfung liefert den Normalfall sauber und lesbar. Die Constraint fängt den Fall gleichzeitiger Anfragen ab, den eine Prüfung im Code allein nicht verhindern kann.
- Der Vergleich ist exakt. H2 vergleicht und indiziert standardmäßig mit Beachtung der Groß-/Kleinschreibung. Abfrage und Constraint stimmen damit überein.

### 3. Constraint-Verletzung wird zu 409

Damit eine Verletzung der Constraint (Race) nicht als `500` endet:

- Der Resource flusht nach dem Speichern explizit (`persistAndFlush()` bzw. `Animal.flush()` beim `PUT`). Eine Verletzung tritt dann noch innerhalb der Methode auf, nicht erst beim Commit außerhalb.
- Ein `ExceptionMapper` für `jakarta.persistence.PersistenceException` durchsucht die Cause-Kette nach `org.hibernate.exception.ConstraintViolationException`. Findet er sie, liefert er `409 Conflict`, sonst `500`. Die Transaktion wird dabei zurückgerollt. Der Mapper hängt an `PersistenceException`, weil Hibernate bzw. der Transaktions-Interceptor die Exception je nach Pfad einpacken kann. Ein Mapper direkt auf den Hibernate-Typ würde dann nicht greifen. Die Bean-Validation-Exception `jakarta.validation.ConstraintViolationException` ist ein anderer Typ und bleibt bei `400`.
- *Alternative:* `try/catch` im Resource. Verworfen, weil es die Methode aufbläht und für `POST` und `PUT` doppelt nötig wäre.
- Die einzige DB-Constraint, die im Betrieb verletzt werden kann, ist die neue Unique-Constraint. Pflichtfelder fängt die Bean Validation vorher ab. Die Zuordnung „Constraint-Verletzung = Konflikt“ ist deshalb für diese App korrekt.

### 4. Konflikt im Store: der belegte Name als State

`AnimalStore` erhält den State `conflictingName: string | null`.

- In den `error`-Zweigen von `create` und `update` setzt der Store bei einer `HttpErrorResponse` mit Status `409` `conflictingName` auf den gesendeten Namen (getrimmt) und `callStatus` auf `loaded`. Es gibt keine Navigation. Andere Fehler laufen wie bisher über `setError`.
- Eine Methode `clearNameConflict()` setzt den Wert zurück. Beide Formular-Komponenten rufen sie beim Erzeugen auf, damit ein alter Konflikt nicht in ein neu geöffnetes Formular übernommen wird. Ein erfolgreiches `create`/`update` setzt den Wert ebenfalls zurück.
- *Alternative:* Ein boolesches `nameConflict`-Flag. Verworfen, weil die Komponente dann selbst wissen müsste, wann der Fehler veraltet ist. Mit dem konkreten Namen ergibt sich das von selbst (siehe 5).
- *Alternative:* Die `submission.action` der Signal Forms gibt die Server-Fehler direkt zurück und wartet dafür auf ein Promise vom Service. Verworfen, weil das am Store vorbei liefe und Navigation und State-Update für diesen einen Fall anders behandelt würden als sonst.

### 5. Feldfehler über einen Validator, der den Store liest

Beide Formulare registrieren im Schema zusätzlich zu `required(schemaPath.name)` einen Validator am Namensfeld. Er meldet einen Fehler der Art `nameTaken`, wenn der aktuelle Wert (getrimmt) gleich `animalStore.conflictingName()` ist.

- Dadurch erscheint der Fehler sofort nach der `409`-Antwort, verschwindet, sobald der Name geändert wird, und kommt zurück, wenn der Nutzer wieder den belegten Namen eintippt. Das Formular ist währenddessen ungültig, ein erneutes Absenden mit demselben Namen wird also verhindert.
- Weil das Feld wirklich ungültig ist, zeigt `mat-form-field` den `mat-error` an. Ein `mat-error` ohne Fehlerzustand des Feldes würde Material nicht darstellen.
- Die Templates unterscheiden am Namensfeld nach Fehlerart. `required` zeigt weiterhin `validation.nameRequired`, `nameTaken` zeigt `validation.nameTaken`.
- Die Eingaben bleiben erhalten, weil bei einem Fehler keine Navigation stattfindet und das Modell-Signal unverändert bleibt.

### 6. Übersetzungen

Neue Keys `animalCreate.validation.nameTaken` und `animalEdit.validation.nameTaken` in `de.json` und `en.json`, passend zur bestehenden Struktur pro Formular. Zum Beispiel „Dieser Name ist bereits vergeben.“ / „This name is already taken.“

## Risks / Trade-offs

- [Sollte das Backend später auf eine Datenbank mit Collation ohne Beachtung der Groß-/Kleinschreibung umziehen (z. B. MySQL-Standard), würde die Constraint „Leo“ und „leo“ als gleich behandeln und von der Spec abweichen.] → Akzeptiert für H2. Bei einem DB-Wechsel muss die Collation der Spalte geprüft werden.
- [Der `ExceptionMapper` übersetzt jede künftige DB-Constraint-Verletzung in `409`, auch solche, die keine Namenskonflikte sind.] → Heute gibt es nur diese eine Constraint. Kommen weitere hinzu, muss der Mapper anhand des Constraint-Namens unterscheiden.
- [Der Race-Fall (gleichzeitige Anfragen) ist mit RestAssured nur schwer deterministisch zu testen.] → Getestet wird die Durchsetzung der Constraint selbst: Ein direktes Speichern eines Duplikats scheitert und wird über die API als `409` gemeldet. Die Gleichzeitigkeit wird nicht simuliert.
- [`conflictingName` liegt in einem Root-Store und lebt über Seitenwechsel hinweg.] → Wird beim Öffnen beider Formulare und nach Erfolg zurückgesetzt.
- [Seed-Daten mit doppelten Namen ließen die App künftig beim Start scheitern.] → Gewollt: Der Fehler fällt früh auf. Die aktuellen Seed-Daten sind konfliktfrei.

## Migration Plan

Nicht nötig. Die Datenbank wird bei jedem Start per `drop-and-create` neu angelegt, eine Datenmigration entfällt (siehe `proposal.md`). Die Constraint wird beim Start aus der Entity-Annotation erzeugt. Rollback heißt den Change zurücknehmen und neu starten.
