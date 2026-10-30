# Proposal

## Why

Neue Tiere, die in den Zoo kommen, lassen sich bisher nicht in der App erfassen: Die Tierliste und das Tierprofil zeigen nur Tiere, die bereits im System sind. Zoo-Manager:innen brauchen ein Formular, um ein neues Tier mit seinen Angaben anzulegen.

## What Changes

- Neuer REST-Endpunkt `POST /animals`, der ein neues Tier mit Name, Art, Alter, Gehege und Notizen anlegt, mit `201` und dem angelegten Tier antwortet und fehlende Pflichtangaben mit `400` ablehnt.
- Neues Formular im Frontend zum Erfassen eines Tiers mit den Feldern Name, Art, Alter, Gehege und Notizen; Name und Art sind Pflichtfelder.
- Die Tierliste erhält eine Aktion, die das Formular öffnet.
- Abbrechen führt ohne Speichern zurück zur Tierliste; nach dem Speichern landet der Zoo-Manager in der Tierliste, die das neue Tier enthält.
- Alle neuen sichtbaren Texte werden über Transloco in Deutsch und Englisch bereitgestellt.

## Capabilities

### New Capabilities
- `animal-registration`: Erfassen eines neuen Tiers über ein Formular mit Pflichtfeldern Name und Art, inklusive REST-Endpunkt zum Anlegen und Erreichbarkeit des Formulars aus der Tierliste.

### Modified Capabilities
<!-- Keine: Die bestehenden Anforderungen an Tierliste und Tierprofil ändern sich nicht. -->

## Impact

- **Backend**: `AnimalResource` erhält `POST /animals` mit Bean Validation (`quarkus-hibernate-validator`); `name` und `species` der Entity `Animal` werden als `@NotBlank` markiert; neue RestAssured-Tests.
- **Frontend**: Neue Feature-Komponente `animal-create` unter `src/app/domains/animals/feature/`; neues Modell für die Formulardaten; `AnimalService` und `AnimalStore` erhalten eine Methode zum Anlegen; neue Route `/animals/new`; neue Aktion in der Tierliste.
- **i18n**: Neue Übersetzungsschlüssel in `public/i18n/de.json` und `public/i18n/en.json`.
- **API**: Neuer schreibender Endpunkt; keine Breaking Changes.
