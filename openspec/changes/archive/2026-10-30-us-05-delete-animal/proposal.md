# Proposal

## Why

Verlässt ein Tier den Zoo, bleibt es bisher in der Tierliste stehen, weil sich erfasste Tiere nicht entfernen lassen. Zoo-Manager:innen brauchen eine Möglichkeit, ein Tier zu löschen, ohne es versehentlich zu tun.

## What Changes

- Neuer REST-Endpunkt `DELETE /animals/{id}`, der ein Tier löscht, mit `204` antwortet und unbekannte IDs mit `404` ablehnt.
- Das Tierprofil erhält eine Aktion zum Löschen.
- Vor dem Löschen erscheint ein Bestätigungsdialog, der das Tier mit Namen nennt; Abbrechen schließt den Dialog, ohne zu löschen.
- Nach dem Bestätigen landet der Zoo-Manager in der Tierliste, in der das gelöschte Tier nicht mehr erscheint.
- Alle neuen sichtbaren Texte werden über Transloco in Deutsch und Englisch bereitgestellt.

## Capabilities

### New Capabilities
- `animal-deletion`: Löschen eines Tiers aus dem Tierprofil mit Bestätigungsdialog, inklusive REST-Endpunkt zum Löschen.

### Modified Capabilities
<!-- Keine: Die bestehenden Anforderungen an Tierliste, Tierprofil, Tiererfassung und Tierbearbeitung ändern sich nicht. -->

## Impact

- **Backend**: `AnimalResource` erhält `DELETE /animals/{id}`; neue RestAssured-Tests.
- **Frontend**: Neue Dialog-Komponente `animal-delete-dialog` unter `src/app/domains/animals/feature/`; `AnimalService` und `AnimalStore` erhalten eine Methode zum Löschen; neue Aktion im Tierprofil.
- **i18n**: Neue Übersetzungsschlüssel in `public/i18n/de.json` und `public/i18n/en.json`.
- **API**: Neuer Endpunkt; keine Breaking Changes. Gelöschte Tiere lassen sich nicht wiederherstellen.
