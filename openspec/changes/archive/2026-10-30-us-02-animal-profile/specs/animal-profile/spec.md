# Spec Delta

## Purpose

Ermöglicht Zoo-Manager:innen, alle Angaben zu einem einzelnen Tier in seinem Profil nachzulesen, einschließlich der Notizen der Tierpfleger:innen.

## ADDED Requirements

### Requirement: Einzelnes Tier abrufen
Das System SHALL über `GET /animals/{id}` das Tier mit der angegebenen ID als JSON-Objekt liefern. Die Antwort MUST die Felder `id`, `name`, `species`, `age`, `enclosure` und `notes` enthalten; `age`, `enclosure` und `notes` dürfen leer sein.

#### Scenario: Tier existiert
- **WHEN** ein Client `GET /animals/{id}` mit der ID eines registrierten Tiers aufruft
- **THEN** antwortet das System mit Status `200` und einem JSON-Objekt mit `id`, `name`, `species`, `age`, `enclosure` und `notes` dieses Tiers

#### Scenario: Tier existiert nicht
- **WHEN** ein Client `GET /animals/{id}` mit einer ID aufruft, zu der kein Tier registriert ist
- **THEN** antwortet das System mit Status `404`

### Requirement: Tierprofil aus der Tierliste öffnen
Das System SHALL das Profil eines Tiers öffnen, wenn der Zoo-Manager das Tier in der Tierliste anklickt.

#### Scenario: Tier in der Tierliste anklicken
- **WHEN** der Zoo-Manager in der Tierliste auf die Zeile eines Tiers klickt
- **THEN** zeigt die App das Profil dieses Tiers an

### Requirement: Tierprofil anzeigen
Das System SHALL im Tierprofil Name, Art, Alter und Gehege des Tiers anzeigen.

#### Scenario: Profil eines registrierten Tiers
- **WHEN** der Zoo-Manager das Profil eines registrierten Tiers öffnet
- **THEN** zeigt das Profil Name, Art, Alter und Gehege dieses Tiers an

#### Scenario: Tier existiert nicht
- **WHEN** der Zoo-Manager das Profil zu einer ID öffnet, zu der kein Tier registriert ist
- **THEN** zeigt die App einen Hinweis, dass das Tier nicht gefunden wurde

### Requirement: Notizen im Tierprofil anzeigen
Das System SHALL im Tierprofil die Notizen zum Tier anzeigen, einen Freitext für Beobachtungen der Tierpfleger:innen. Ein Tier MAY keine Notizen haben.

#### Scenario: Tier mit Notizen
- **WHEN** der Zoo-Manager das Profil eines Tiers öffnet, zu dem Notizen erfasst sind
- **THEN** zeigt das Profil die Notizen des Tiers an

#### Scenario: Tier ohne Notizen
- **WHEN** der Zoo-Manager das Profil eines Tiers öffnet, zu dem keine Notizen erfasst sind
- **THEN** zeigt das Profil die übrigen Angaben des Tiers an und der Bereich Notizen bleibt leer

### Requirement: Zurück zur Tierliste
Das System SHALL im Tierprofil einen Link anbieten, der zurück zur Tierliste führt.

#### Scenario: Vom Profil zur Tierliste zurückkehren
- **WHEN** der Zoo-Manager im Tierprofil den Link zurück zur Tierliste wählt
- **THEN** zeigt die App die Tierliste an
