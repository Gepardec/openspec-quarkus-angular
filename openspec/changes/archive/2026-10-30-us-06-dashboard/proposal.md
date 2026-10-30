# Proposal

## Why

Beim Öffnen landet der Zoo-Manager bisher ohne eigene Startseite in der App, und die Navigation kennt nur die Tierliste. Ein Dashboard als Startseite gibt einen freundlichen Einstieg und stellt ein ausgewähltes Tier mit einem Fun Fact in den Mittelpunkt.

## What Changes

- Ein Tier erhält zusätzlich einen optionalen Fun Fact.
- Neuer REST-Endpunkt `GET /dashboard/spotlight`, der das konfigurierte Spotlight-Tier mit Name, Art, Alter, Gehege und Fun Fact liefert und mit `404` antwortet, wenn es das konfigurierte Tier nicht gibt.
- Das Spotlight-Tier wird über eine Konfigurationseigenschaft per Tier-ID festgelegt.
- Neues Dashboard im Frontend, das das Spotlight-Tier mit Name, Art, Alter, Gehege und Fun Fact sowie einem Link zum Tierprofil zeigt; gibt es das Tier nicht, zeigt das Dashboard einen Hinweis.
- Das Dashboard wird zur Startseite der App.
- Aus dem Navigationslink auf die Tierliste wird die Hauptnavigation der App mit den Einträgen Dashboard und Tierliste.
- Alle neuen sichtbaren Texte werden über Transloco in Deutsch und Englisch bereitgestellt.

## Capabilities

### New Capabilities
- `dashboard`: Startseite der App mit einem konfigurierbaren Spotlight-Tier inklusive Fun Fact und Link zum Tierprofil, REST-Endpunkt für das Spotlight und Eintrag in der Hauptnavigation.

### Modified Capabilities
- `animal-list`: Die Requirement „Tierliste über die Navigation erreichbar“ wird umbenannt in „Tierliste in der Hauptnavigation“ und beschreibt künftig den Eintrag der Tierliste in der Hauptnavigation, die neben der Tierliste auch das Dashboard enthält. Den Navigationseintrag zum Dashboard beschreibt die neue Requirement „Dashboard in der Hauptnavigation“ in `dashboard`; eine eigene Capability für die Navigation gibt es nicht.

## Impact

- **Backend**: Entity `Animal` erhält das optionale Feld `funFact` (Spalte `fun_fact`); Seed-Daten in `import.sql` werden ergänzt; neue Resource `DashboardResource` mit `GET /dashboard/spotlight` und Antwortmodell `SpotlightResponse`; neue Konfigurationseigenschaft `dashboard.spotlight.animal-id` in `application.properties`; neue RestAssured-Tests.
- **Frontend**: Neue Domäne `dashboard` unter `src/app/domains/dashboard/` mit Feature-Komponente, Service, NgRx Signal Store und Modell; neue Route `/dashboard`, auf die die Startseite `/` umleitet; die App-Shell erhält die Hauptnavigation mit Dashboard und Tierliste.
- **i18n**: Neue Übersetzungsschlüssel in `public/i18n/de.json` und `public/i18n/en.json`.
- **API**: Neuer, rein lesender Endpunkt; `GET /animals` und `GET /animals/{id}` liefern zusätzlich `funFact`. Keine Breaking Changes.
