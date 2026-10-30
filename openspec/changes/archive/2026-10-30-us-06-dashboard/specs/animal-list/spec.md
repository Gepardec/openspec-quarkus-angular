# Spec Delta

## RENAMED Requirements

- FROM: `### Requirement: Tierliste über die Navigation erreichbar`
- TO: `### Requirement: Tierliste in der Hauptnavigation`

## MODIFIED Requirements

### Requirement: Tierliste in der Hauptnavigation
Das System SHALL in der Hauptnavigation der App einen Eintrag anbieten, der zur Tierliste führt. Die Hauptnavigation MUST die Einträge Dashboard und Tierliste enthalten.

#### Scenario: Tierliste über die Navigation öffnen
- **WHEN** der Zoo-Manager in der Hauptnavigation der App den Eintrag für die Tierliste wählt
- **THEN** zeigt die App die Tierliste an

#### Scenario: Hauptnavigation enthält Dashboard und Tierliste
- **WHEN** der Zoo-Manager eine beliebige Seite der App geöffnet hat
- **THEN** zeigt die Hauptnavigation die Einträge Dashboard und Tierliste
