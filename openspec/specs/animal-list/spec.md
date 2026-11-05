# animal-list Specification

## Purpose
Gibt Zoo-Manager:innen einen Überblick über alle im Zoo registrierten Tiere, indem sie in einer Liste mit Name und Art angezeigt werden.

## Requirements

### Requirement: Registrierte Tiere abrufen
Das System SHALL über `GET /animals` alle registrierten Tiere als JSON-Array liefern. Jeder Eintrag MUST mindestens die Felder `id`, `name` und `species` enthalten.

#### Scenario: Tiere sind registriert
- **WHEN** ein Client `GET /animals` aufruft und Tiere registriert sind
- **THEN** antwortet das System mit Status `200` und einem JSON-Array, das für jedes registrierte Tier einen Eintrag mit `id`, `name` und `species` enthält

#### Scenario: Keine Tiere registriert
- **WHEN** ein Client `GET /animals` aufruft und keine Tiere registriert sind
- **THEN** antwortet das System mit Status `200` und einem leeren JSON-Array

### Requirement: Tierliste anzeigen
Das System SHALL in der Tierliste alle registrierten Tiere anzeigen, jeweils mit Name und Art.

#### Scenario: Tierliste mit registrierten Tieren
- **WHEN** der Zoo-Manager die Tierliste öffnet und Tiere registriert sind
- **THEN** zeigt die Tierliste für jedes registrierte Tier eine Zeile mit dessen Name und Art

### Requirement: Hinweis bei leerer Tierliste
Das System SHALL in der Tierliste einen Hinweis anzeigen, wenn keine Tiere registriert sind.

#### Scenario: Keine Tiere vorhanden
- **WHEN** der Zoo-Manager die Tierliste öffnet und keine Tiere registriert sind
- **THEN** zeigt die Tierliste anstelle einer Tabelle einen Hinweis, dass keine Tiere registriert sind

### Requirement: Tierliste über die Navigation erreichbar
Das System SHALL in der Navigation der App einen Eintrag anbieten, der zur Tierliste führt.

#### Scenario: Tierliste über die Navigation öffnen
- **WHEN** der Zoo-Manager in der Navigation der App den Eintrag für die Tierliste wählt
- **THEN** zeigt die App die Tierliste an
