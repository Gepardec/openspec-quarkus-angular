# animal-profile Specification

## Purpose
Ermöglicht Zoo-Manager:innen, alle Angaben zu einem einzelnen Tier in seinem Steckbrief nachzulesen.

## Requirements

### Requirement: Einzelnes Tier abrufen
Das System SHALL über `GET /animals/{id}` das Tier mit der angegebenen ID als JSON-Objekt liefern. Die Antwort MUST die Felder `id`, `name`, `species`, `age` und `enclosure` enthalten; `age` und `enclosure` dürfen leer sein. Die Antwort MUST kein Feld `notes` enthalten.

#### Scenario: Tier existiert
- **WHEN** ein Client `GET /animals/{id}` mit der ID eines registrierten Tiers aufruft
- **THEN** antwortet das System mit Status `200` und einem JSON-Objekt mit `id`, `name`, `species`, `age` und `enclosure` dieses Tiers

#### Scenario: Antwort enthält keine Notizen
- **WHEN** ein Client `GET /animals/{id}` mit der ID eines registrierten Tiers aufruft
- **THEN** enthält das JSON-Objekt der Antwort kein Feld `notes`

#### Scenario: Tier existiert nicht
- **WHEN** ein Client `GET /animals/{id}` mit einer ID aufruft, zu der kein Tier registriert ist
- **THEN** antwortet das System mit Status `404`

### Requirement: Tierprofil aus der Tierliste öffnen
Das System SHALL das Profil eines Tiers öffnen, wenn der Zoo-Manager das Tier in der Tierliste anklickt.

#### Scenario: Tier in der Tierliste anklicken
- **WHEN** der Zoo-Manager in der Tierliste auf die Zeile eines Tiers klickt
- **THEN** zeigt die App das Profil dieses Tiers an

### Requirement: Steckbrief anzeigen
Das System SHALL im Steckbrief eines Tiers Name, Art, Alter und Gehege des Tiers anzeigen. Die Seite MUST den Titel „Steckbrief“ tragen.

#### Scenario: Profil eines registrierten Tiers
- **WHEN** der Zoo-Manager den Steckbrief eines registrierten Tiers öffnet
- **THEN** zeigt die App eine Seite mit dem Titel „Steckbrief“, die Name, Art, Alter und Gehege dieses Tiers und keinen Bereich Notizen enthält

#### Scenario: Tier existiert nicht
- **WHEN** der Zoo-Manager den Steckbrief zu einer ID öffnet, zu der kein Tier registriert ist
- **THEN** zeigt die App einen Hinweis, dass das Tier nicht gefunden wurde

### Requirement: Zurück zur Tierliste
Das System SHALL im Tierprofil einen Link anbieten, der zurück zur Tierliste führt.

#### Scenario: Vom Profil zur Tierliste zurückkehren
- **WHEN** der Zoo-Manager im Tierprofil den Link zurück zur Tierliste wählt
- **THEN** zeigt die App die Tierliste an
