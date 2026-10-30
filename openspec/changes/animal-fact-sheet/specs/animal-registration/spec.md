## MODIFIED Requirements

### Requirement: Tier über die API anlegen
Das System SHALL über `POST /animals` ein neues Tier aus einem JSON-Objekt mit den Feldern `name`, `species`, `age` und `enclosure` anlegen. `name` und `species` MUST angegeben und nicht leer sein; `age` und `enclosure` sind optional. Ein mitgeschicktes Feld `notes` MUST ignoriert werden.

#### Scenario: Gültiges Tier anlegen
- **WHEN** ein Client `POST /animals` mit einem JSON-Objekt aufruft, das `name` und `species` enthält
- **THEN** antwortet das System mit Status `201`, einem `Location`-Header auf `/animals/{id}` des neuen Tiers und dem angelegten Tier inklusive vergebener `id` im Body

#### Scenario: Mitgeschickte Notizen werden ignoriert
- **WHEN** ein Client `POST /animals` mit einem JSON-Objekt aufruft, das `name`, `species` und `notes` enthält
- **THEN** antwortet das System mit Status `201`, der Body enthält kein Feld `notes`, und `GET /animals/{id}` des neuen Tiers liefert ebenfalls kein Feld `notes`

#### Scenario: Pflichtangabe fehlt
- **WHEN** ein Client `POST /animals` mit einem JSON-Objekt aufruft, in dem `name` oder `species` fehlt oder leer ist
- **THEN** antwortet das System mit Status `400` und legt kein Tier an

### Requirement: Formular aus der Tierliste öffnen
Das System SHALL in der Tierliste eine Aktion anbieten, die das Formular zum Erfassen eines neuen Tiers öffnet.

#### Scenario: Aktion in der Tierliste wählen
- **WHEN** der Zoo-Manager in der Tierliste die Aktion zum Hinzufügen eines Tiers wählt
- **THEN** zeigt die App ein leeres Formular mit den Feldern Name, Art, Alter und Gehege und ohne Feld Notizen
