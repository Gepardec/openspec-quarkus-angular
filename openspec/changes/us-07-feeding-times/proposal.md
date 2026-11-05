# Proposal

## Why

Die Tierpfleger:innen planen ihre Runden nach den Fütterungszeiten, die heute nur auf Papierlisten an den Gehegen stehen. Der Zoo-Manager soll in der App sehen, wann ein Tier gefüttert wird, damit die Zeiten an einer Stelle nachlesbar sind.

## What Changes

- Ein Tier hat eine oder mehrere tägliche Fütterungszeiten, jeweils eine Uhrzeit.
- Neuer, rein lesender REST-Endpunkt `GET /animals/{id}/feeding-times`, der die Fütterungszeiten eines Tiers aufsteigend nach Uhrzeit liefert und mit `404` antwortet, wenn es das Tier nicht gibt.
- Das Tierprofil zeigt die Fütterungszeiten des Tiers; hat ein Tier keine, zeigt das Profil einen Hinweis.
- Die Fütterungszeiten der vorhandenen Tiere werden als Seed-Daten bereitgestellt.
- Alle neuen sichtbaren Texte werden über Transloco in Deutsch und Englisch bereitgestellt.

Nicht Teil dieses Changes: Fütterungszeiten anlegen, ändern oder löschen (weder über die API noch in der App), Futterart oder -menge, eine Übersicht über die Fütterungen aller Tiere.

## Capabilities

### New Capabilities
- `animal-feeding-times`: Tägliche Fütterungszeiten eines Tiers, abrufbar über eine eigene REST-Ressource unter dem Tier und angezeigt im Tierprofil.

### Modified Capabilities
<!-- Keine. Das Tierprofil erhält einen zusätzlichen Bereich; die bestehenden Requirements von `animal-profile` bleiben unverändert. -->

## Impact

- **Backend**: Neue Entity `FeedingTime` (Tabelle `feeding_times`) mit Bezug auf `Animal` und einer Uhrzeit; neue Resource für `GET /animals/{id}/feeding-times`; Seed-Daten in `import.sql`; beim Löschen eines Tiers werden seine Fütterungszeiten mitgelöscht; neue RestAssured-Tests.
- **Frontend**: Modell, Service und Laden der Fütterungszeiten in der Domäne `animals`; neuer Bereich im Tierprofil (`animal-profile`).
- **i18n**: Neue Übersetzungsschlüssel in `public/i18n/de.json` und `public/i18n/en.json`.
- **API**: Neuer, rein lesender Endpunkt; `GET /animals` und `GET /animals/{id}` bleiben unverändert. Keine Breaking Changes.
