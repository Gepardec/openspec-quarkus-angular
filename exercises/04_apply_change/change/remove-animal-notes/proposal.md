# Proposal

## Why

Das Freitextfeld Notizen am Tier hat keine Autorin und keinen Zeitstempel, seine Inhalte sind unstrukturiert und veralten unbemerkt. Für Beobachtungen der Tierpfleger:innen soll es später eigene, strukturierte Funktionen geben; bis dahin soll die App keinen Freitext anbieten, auf den sich niemand verlassen kann.

## What Changes

- Das Tierprofil zeigt keine Notizen mehr.
- Die Formulare zum Erfassen und Bearbeiten eines Tiers enthalten kein Feld Notizen mehr.
- **BREAKING**: Die REST-API kennt das Feld `notes` nicht mehr: `GET /animals` und `GET /animals/{id}` liefern es nicht mehr, `POST /animals` und `PUT /animals/{id}` übernehmen es nicht mehr.
- **BREAKING**: Die gespeicherten Notizen werden nicht übernommen; mit dem Feld entfallen auch die vorhandenen Inhalte.
- Die Übersetzungsschlüssel für Notizen entfallen.

## Capabilities

### New Capabilities
<!-- Keine. -->

### Modified Capabilities
- `animal-profile`: Die Requirement „Notizen im Tierprofil anzeigen“ entfällt; „Einzelnes Tier abrufen“ liefert kein Feld `notes` mehr.
- `animal-registration`: „Tier über die API anlegen“ übernimmt kein Feld `notes` mehr; das Formular aus „Formular aus der Tierliste öffnen“ enthält kein Feld Notizen mehr.
- `animal-editing`: „Tier über die API aktualisieren“ ersetzt kein Feld `notes` mehr; das Formular aus „Formular aus dem Tierprofil öffnen“ enthält kein Feld Notizen mehr.

## Impact

- **Backend**: Feld `notes` entfällt aus der Entity `Animal` und damit die Spalte `notes` der Tabelle `animals`; `AnimalResource` übernimmt beim Aktualisieren kein `notes` mehr; Seed-Daten in `import.sql` und die RestAssured-Tests (`AnimalResourceTest`, `DashboardResourceTest`) werden angepasst.
- **Frontend**: Feld `notes` entfällt aus den Modellen `Animal` und `AnimalCreateDto`, aus dem Tierprofil (`animal-profile`) und aus den Formularen `animal-create` und `animal-edit`.
- **i18n**: Schlüssel für Notizen in `public/i18n/de.json` und `public/i18n/en.json` entfallen.
- **API**: Breaking Change für Clients, die `notes` lesen oder schreiben.
- **Daten**: Vorhandene Notizen gehen verloren; es gibt keine Migration und keinen Export.
