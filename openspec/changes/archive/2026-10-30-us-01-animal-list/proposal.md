# Proposal

## Why

Zoo-Manager:innen haben derzeit keine Möglichkeit, sich in der App einen Überblick über die im Zoo registrierten Tiere zu verschaffen. Eine Tierliste mit Name und Art ist die Grundlage für alle weiteren Funktionen rund um die Tierverwaltung.

## What Changes

- Neuer REST-Endpunkt `GET /animals`, der alle registrierten Tiere als JSON-Array liefert (mindestens `id`, `name` und `species`).
- Neue Tierliste im Frontend, die alle registrierten Tiere mit Name und Art tabellarisch anzeigt.
- Leerer Zustand: Sind keine Tiere registriert, zeigt die Tierliste einen entsprechenden Hinweis statt einer leeren Tabelle.
- Die Tierliste ist über einen Eintrag in der Navigation der App erreichbar.
- Alle sichtbaren Texte der Tierliste und der Navigation werden über Transloco in Deutsch und Englisch bereitgestellt.

## Capabilities

### New Capabilities
- `animal-list`: Übersicht über alle registrierten Tiere mit Name und Art, inklusive REST-Endpunkt zum Abrufen der Tiere und Erreichbarkeit der Liste über die Navigation der App.

### Modified Capabilities
<!-- Keine: Es existieren noch keine Specs. -->

## Impact

- **Backend**: Neue JAX-RS-Ressource für `/animals` mit `GET`-Methode; Panache-Entity `Animal` (Tabelle `animals`) mit Seed-Daten in `import.sql`; neue RestAssured-Tests für den Endpunkt.
- **Frontend**: Neue Feature-Komponente für die Tierliste unter `src/app/domains/animals/feature/`, Datenzugriff (Service + NgRx Signal Store) unter `src/app/domains/animals/data/`, neue Route und Navigationseintrag in der App-Shell.
- **i18n**: Neue Übersetzungsschlüssel in `public/i18n/de.json` und `public/i18n/en.json`.
- **API**: Neuer, rein lesender Endpunkt; keine Breaking Changes.
