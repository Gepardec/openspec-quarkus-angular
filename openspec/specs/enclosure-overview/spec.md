# enclosure-overview Specification

## Purpose
Gibt Zoo-Manager:innen einen schnellen Überblick darüber, welche Tiere in welchem Gehege leben und wie viele Tiere jedes belegte Gehege hat.

## Requirements

### Requirement: Belegte Gehege abrufen
Das System SHALL über `GET /enclosures` alle belegten Gehege als JSON-Array liefern. Ein Gehege ist belegt, wenn mindestens ein registriertes Tier es als Gehege angibt; Tiere mit gleichem Gehegenamen gehören zum selben Gehege. Jeder Eintrag MUST die Felder `name`, `animalCount` und `animals` enthalten; jedes Tier in `animals` MUST die Felder `id`, `name` und `species` enthalten. Die Gehege MUST alphabetisch nach Name sortiert sein, die Tiere eines Geheges alphabetisch nach Name.

#### Scenario: Mehrere Tiere in einem Gehege
- **WHEN** ein Client `GET /enclosures` aufruft und zwei registrierte Tiere das Gehege „Savanne“ angeben
- **THEN** antwortet das System mit Status `200` und einem JSON-Array mit genau einem Eintrag für „Savanne“, dessen `animalCount` `2` ist und dessen `animals` beide Tiere mit `id`, `name` und `species` enthält

#### Scenario: Sortierung
- **WHEN** ein Client `GET /enclosures` aufruft und Tiere in den Gehegen „Savanne“ und „Afrika-Haus“ registriert sind
- **THEN** enthält die Antwort zuerst „Afrika-Haus“ und dann „Savanne“, und die Tiere jedes Geheges sind alphabetisch nach Name sortiert

#### Scenario: Keine belegten Gehege
- **WHEN** ein Client `GET /enclosures` aufruft und kein registriertes Tier ein Gehege angibt
- **THEN** antwortet das System mit Status `200` und einem leeren JSON-Array

### Requirement: Tiere ohne Gehege ausblenden
Das System SHALL Tiere, die kein Gehege angeben, in der Gehegeübersicht nicht aufführen. Ein leerer Gehegename gilt als kein Gehege.

#### Scenario: Tier ohne Gehege
- **WHEN** ein Client `GET /enclosures` aufruft und ein registriertes Tier kein oder ein leeres Gehege angibt
- **THEN** erscheint dieses Tier in keinem Eintrag der Antwort, und es gibt keinen Eintrag für ein leeres Gehege

### Requirement: Gehegeübersicht anzeigen
Das System SHALL auf der Seite „Gehegeübersicht“ jedes belegte Gehege mit seinem Namen, der Zahl seiner Tiere und den Tieren darin anzeigen, jedes Tier mit Name und Art.

#### Scenario: Gehegeübersicht mit belegten Gehegen
- **WHEN** der Zoo-Manager die Gehegeübersicht öffnet und Tiere in Gehegen registriert sind
- **THEN** zeigt die Seite für jedes belegte Gehege dessen Namen, die Zahl seiner Tiere und für jedes Tier darin Name und Art

### Requirement: Tierprofil aus der Gehegeübersicht öffnen
Das System SHALL das Profil eines Tiers öffnen, wenn der Zoo-Manager das Tier in der Gehegeübersicht anklickt.

#### Scenario: Tier in der Gehegeübersicht anklicken
- **WHEN** der Zoo-Manager in der Gehegeübersicht auf ein Tier klickt
- **THEN** zeigt die App das Profil dieses Tiers an

### Requirement: Hinweis bei leerer Gehegeübersicht
Das System SHALL in der Gehegeübersicht einen Hinweis anzeigen, wenn kein Gehege belegt ist.

#### Scenario: Keine belegten Gehege
- **WHEN** der Zoo-Manager die Gehegeübersicht öffnet und kein registriertes Tier ein Gehege angibt
- **THEN** zeigt die Seite anstelle der Gehege einen Hinweis, dass keine belegten Gehege vorhanden sind

### Requirement: Gehegeübersicht in der Hauptnavigation
Das System SHALL in der Hauptnavigation der App einen Eintrag anbieten, der zur Gehegeübersicht führt.

#### Scenario: Gehegeübersicht über die Hauptnavigation öffnen
- **WHEN** der Zoo-Manager in der Hauptnavigation den Eintrag für die Gehegeübersicht wählt
- **THEN** zeigt die App die Gehegeübersicht an
