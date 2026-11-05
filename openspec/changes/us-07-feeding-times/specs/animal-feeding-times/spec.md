# Spec Delta

## Purpose

Ermöglicht Zoo-Manager:innen nachzulesen, zu welchen Uhrzeiten ein Tier täglich gefüttert wird, damit die Tierpfleger:innen ihre Runden danach planen können.

## ADDED Requirements

### Requirement: Fütterungszeiten eines Tiers abrufen
Das System SHALL über `GET /animals/{id}/feeding-times` die täglichen Fütterungszeiten des Tiers mit der angegebenen ID als JSON-Array liefern. Jedes Element MUST das Feld `time` mit der Uhrzeit im Format `HH:mm` enthalten. Das Array MUST aufsteigend nach Uhrzeit sortiert sein.

#### Scenario: Tier mit Fütterungszeiten
- **WHEN** ein Client `GET /animals/{id}/feeding-times` mit der ID eines Tiers aufruft, das Fütterungszeiten um `14:30` und `08:00` hat
- **THEN** antwortet das System mit Status `200` und einem JSON-Array mit den Elementen `{"time": "08:00"}` und `{"time": "14:30"}` in dieser Reihenfolge

#### Scenario: Tier ohne Fütterungszeiten
- **WHEN** ein Client `GET /animals/{id}/feeding-times` mit der ID eines registrierten Tiers aufruft, zu dem keine Fütterungszeiten erfasst sind
- **THEN** antwortet das System mit Status `200` und einem leeren JSON-Array

#### Scenario: Tier existiert nicht
- **WHEN** ein Client `GET /animals/{id}/feeding-times` mit einer ID aufruft, zu der kein Tier registriert ist
- **THEN** antwortet das System mit Status `404`

### Requirement: Fütterungszeiten im Tierprofil anzeigen
Das System SHALL im Tierprofil die täglichen Fütterungszeiten des Tiers aufsteigend nach Uhrzeit anzeigen.
