# Proposal

## Why

Die Tierliste zeigt nur Name und Art. Zoo-Manager:innen brauchen eine Detailansicht pro Tier, um Alter, Gehege und die Beobachtungen der Tierpfleger:innen nachzulesen, ohne die Informationen anderswo suchen zu müssen.

## What Changes

- Ein Tier erhält zusätzlich die Angaben Alter, Gehege und Notizen (Freitext für Beobachtungen der Tierpfleger:innen); alle drei sind optional.
- Neuer REST-Endpunkt `GET /animals/{id}`, der ein einzelnes Tier mit allen Angaben liefert und mit `404` antwortet, wenn es das Tier nicht gibt.
- Neues Tierprofil im Frontend mit Name, Art, Alter, Gehege und Notizen; hat ein Tier keine Notizen, bleibt der Notizbereich leer.
- Ein Klick auf ein Tier in der Tierliste öffnet dessen Profil; aus dem Profil führt ein Link zurück zur Tierliste.
- Existiert das aufgerufene Tier nicht, zeigt das Profil einen Hinweis.
- Alle neuen sichtbaren Texte werden über Transloco in Deutsch und Englisch bereitgestellt.

## Capabilities

### New Capabilities
- `animal-profile`: Detailansicht eines einzelnen Tiers mit Name, Art, Alter, Gehege und Notizen, inklusive REST-Endpunkt zum Abrufen eines Tiers sowie Navigation zwischen Tierliste und Profil.

### Modified Capabilities
<!-- Keine: Die Anforderungen an die Tierliste bleiben unverändert; das Öffnen des Profils aus der Liste gehört zur neuen Capability `animal-profile`. -->

## Impact

- **Backend**: Entity `Animal` erhält die optionalen Felder `age`, `enclosure` und `notes`; Seed-Daten in `import.sql` werden ergänzt; `AnimalResource` erhält `GET /animals/{id}`; neue RestAssured-Tests.
- **Frontend**: Modell `Animal` wird um die neuen Felder erweitert; neue Feature-Komponente `animal-profile` unter `src/app/domains/animals/feature/`; `AnimalStore` erhält die Auswahl eines Tiers; neue Route `/animals/:id`; Zeilen der Tierliste werden anklickbar.
- **i18n**: Neue Übersetzungsschlüssel in `public/i18n/de.json` und `public/i18n/en.json`.
- **API**: Neuer, rein lesender Endpunkt; `GET /animals` liefert zusätzlich die neuen Felder. Keine Breaking Changes.
