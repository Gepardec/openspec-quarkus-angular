# dashboard Specification

## Purpose
Bietet Zoo-Manager:innen beim Öffnen der App ein Dashboard als Startseite, das ein konfigurierbares Tier mit einem Fun Fact im Spotlight zeigt.

## Requirements

### Requirement: Spotlight-Tier über die API abrufen
Das System SHALL über `GET /dashboard/spotlight` das konfigurierte Spotlight-Tier als JSON-Objekt mit den Feldern `id`, `name`, `species`, `age`, `enclosure` und `funFact` liefern.

#### Scenario: Konfiguriertes Tier existiert
- **WHEN** ein Client `GET /dashboard/spotlight` aufruft und das konfigurierte Spotlight-Tier registriert ist
- **THEN** antwortet das System mit Status `200` und einem JSON-Objekt mit `id`, `name`, `species`, `age`, `enclosure` und `funFact` dieses Tiers

#### Scenario: Konfiguriertes Tier existiert nicht
- **WHEN** ein Client `GET /dashboard/spotlight` aufruft und zur konfigurierten ID kein Tier registriert ist
- **THEN** antwortet das System mit Status `404`

### Requirement: Spotlight-Tier konfigurierbar
Das System SHALL das Spotlight-Tier über eine Konfigurationseigenschaft mit der ID des Tiers festlegen, ohne dass der Code geändert werden muss.

#### Scenario: Anderes Tier konfigurieren
- **WHEN** in der Konfiguration die ID eines anderen registrierten Tiers als Spotlight-Tier eingetragen ist
- **THEN** liefert `GET /dashboard/spotlight` dieses Tier

### Requirement: Spotlight im Dashboard anzeigen
Das System SHALL im Dashboard das Spotlight-Tier mit Name, Art, Alter, Gehege und Fun Fact anzeigen.

#### Scenario: Spotlight-Tier vorhanden
- **WHEN** der Zoo-Manager das Dashboard öffnet und das konfigurierte Spotlight-Tier registriert ist
- **THEN** zeigt das Dashboard Name, Art, Alter, Gehege und Fun Fact dieses Tiers

### Requirement: Link zum Tierprofil
Das System SHALL im Spotlight einen Link anbieten, der zum Profil des Spotlight-Tiers führt.

#### Scenario: Profil aus dem Spotlight öffnen
- **WHEN** der Zoo-Manager im Spotlight den Link zum Tierprofil wählt
- **THEN** zeigt die App das Profil des Spotlight-Tiers

### Requirement: Hinweis bei fehlendem Spotlight-Tier
Das System SHALL im Dashboard einen Hinweis anzeigen, wenn es das konfigurierte Spotlight-Tier nicht gibt.

#### Scenario: Konfiguriertes Tier existiert nicht
- **WHEN** der Zoo-Manager das Dashboard öffnet und zur konfigurierten ID kein Tier registriert ist
- **THEN** zeigt das Dashboard statt des Spotlights einen Hinweis, dass das Spotlight nicht verfügbar ist

### Requirement: Dashboard als Startseite
Das System SHALL beim Öffnen der App das Dashboard als Startseite anzeigen.

#### Scenario: App öffnen
- **WHEN** der Zoo-Manager die App über ihre Startadresse öffnet
- **THEN** zeigt die App das Dashboard

### Requirement: Dashboard in der Hauptnavigation
Das System SHALL in der Hauptnavigation der App einen Eintrag anbieten, der zum Dashboard führt.

#### Scenario: Dashboard über die Hauptnavigation öffnen
- **WHEN** der Zoo-Manager in der Hauptnavigation den Eintrag für das Dashboard wählt
- **THEN** zeigt die App das Dashboard
