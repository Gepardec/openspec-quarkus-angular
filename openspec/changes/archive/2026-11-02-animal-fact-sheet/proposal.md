# Proposal

## Why

Das Freitextfeld Notizen am Tier hat weder Autorin noch Zeitstempel, die Inhalte sind unstrukturiert und veralten. Für Beobachtungen der Tierpfleger:innen soll es später eigene, strukturierte Funktionen geben; bis dahin stiftet das Feld mehr Verwirrung als Nutzen. Im selben Zug heißt das Tierprofil in der Oberfläche künftig „Steckbrief“.

## What Changes

- **BREAKING**: Das Feld `notes` entfällt aus der REST-API. `GET /animals/{id}` (und damit auch `GET /animals`) liefert kein Feld `notes` mehr; `POST /animals` und `PUT /animals/{id}` übernehmen kein `notes` mehr.
- Die Notizen verschwinden aus dem Tierprofil sowie aus den Formularen zum Erfassen und Bearbeiten eines Tiers.
- Die gespeicherten Notizen werden nicht übernommen: Die Spalte `notes` und die Notizen in den Seed-Daten entfallen ersatzlos.
- Das Tierprofil heißt in der Oberfläche „Steckbrief“; die Seite trägt den Titel „Steckbrief“ (Deutsch) bzw. „Fact sheet“ (Englisch).
- Unverändert bleiben die Routen, die Namen im Code (`animal-profile`) und die übrigen Requirement-Namen.

## Capabilities

### New Capabilities
<!-- Keine -->

### Modified Capabilities
- `animal-profile`: „Einzelnes Tier abrufen“ ohne `notes`; „Tierprofil anzeigen“ wird zu „Steckbrief anzeigen“ und nennt den Seitentitel; „Notizen im Tierprofil anzeigen“ entfällt.
- `animal-registration`: „Tier über die API anlegen“ und „Formular aus der Tierliste öffnen“ ohne Notizen.
- `animal-editing`: „Tier über die API aktualisieren“ und „Formular aus dem Tierprofil öffnen“ ohne Notizen.

## Impact

- **Backend**: Entity `Animal` verliert das Feld `notes`; `AnimalResource.updateAnimal` übernimmt es nicht mehr; `import.sql` ohne Spalte `notes`; `AnimalResourceTest` und `DashboardResourceTest` werden angepasst bzw. ergänzt.
- **Frontend**: Modelle `Animal` und `AnimalCreateDto` ohne `notes`; Feld Notizen entfällt in `animal-profile`, `animal-create` und `animal-edit`.
- **i18n**: Schlüssel für Notizen entfallen in `de.json` und `en.json`; die Texte rund um das Tierprofil heißen künftig „Steckbrief“ bzw. „Fact sheet“.
- **API**: Breaking Change für Clients, die `notes` lesen oder schreiben. Ein mitgeschicktes `notes` wird ignoriert, nicht abgelehnt.
- **Purpose der Specs**: Die Purpose-Abschnitte von `animal-profile`, `animal-registration` und `animal-editing` erwähnen die Notizen noch. Delta-Specs können den Purpose nicht ändern; er wird nach dem Archivieren direkt in den Hauptspecs angepasst (siehe Tasks, Workflow follow-up).
