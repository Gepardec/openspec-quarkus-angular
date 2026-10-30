# Proposal

## Why

Die Angaben zu einem Tier ändern sich: Es zieht in ein anderes Gehege, wird älter oder die Tierpfleger:innen ergänzen neue Beobachtungen. Bisher lassen sich erfasste Tiere nur ansehen, nicht korrigieren oder aktualisieren.

## What Changes

- Neuer REST-Endpunkt `PUT /animals/{id}`, der Name, Art, Alter, Gehege und Notizen eines bestehenden Tiers ersetzt, mit `200` und dem geänderten Tier antwortet, fehlende Pflichtangaben mit `400` und unbekannte IDs mit `404` ablehnt.
- Neues Formular im Frontend zum Bearbeiten eines Tiers mit den Feldern Name, Art, Alter, Gehege und Notizen, vorbelegt mit den aktuellen Daten; Name und Art sind Pflichtfelder.
- Das Tierprofil erhält eine Aktion, die das Formular öffnet.
- Abbrechen führt ohne Speichern zurück zum Tierprofil; nach dem Speichern landet der Zoo-Manager im Tierprofil, das die geänderten Daten zeigt.
- Existiert das zu bearbeitende Tier nicht, zeigt das Formular einen Hinweis.
- Alle neuen sichtbaren Texte werden über Transloco in Deutsch und Englisch bereitgestellt.

## Capabilities

### New Capabilities
- `animal-editing`: Ändern der Angaben eines bestehenden Tiers über ein vorbelegtes Formular mit Pflichtfeldern Name und Art, inklusive REST-Endpunkt zum Aktualisieren und Erreichbarkeit des Formulars aus dem Tierprofil.

### Modified Capabilities
<!-- Keine: Die bestehenden Anforderungen an Tierliste, Tierprofil und Tiererfassung ändern sich nicht. -->

## Impact

- **Backend**: `AnimalResource` erhält `PUT /animals/{id}` mit Bean Validation; neue RestAssured-Tests.
- **Frontend**: Neue Feature-Komponente `animal-edit` unter `src/app/domains/animals/feature/`; `AnimalService` und `AnimalStore` erhalten eine Methode zum Aktualisieren; neue Route `/animals/:id/edit`; neue Aktion im Tierprofil.
- **i18n**: Neue Übersetzungsschlüssel in `public/i18n/de.json` und `public/i18n/en.json`.
- **API**: Neuer schreibender Endpunkt; keine Breaking Changes.
