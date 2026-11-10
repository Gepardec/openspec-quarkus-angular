## MODIFIED Requirements

### Requirement: Tier über die API aktualisieren
Das System SHALL über `PUT /animals/{id}` die Felder `name`, `species`, `age` und `enclosure` des Tiers mit der angegebenen ID durch die Werte aus dem JSON-Body ersetzen. `name` und `species` MUST angegeben und nicht leer sein. Ein mitgeschicktes Feld `notes` MUST ignoriert werden.

#### Scenario: Bestehendes Tier aktualisieren
- **WHEN** ein Client `PUT /animals/{id}` mit der ID eines registrierten Tiers und einem JSON-Objekt aufruft, das `name` und `species` enthält
- **THEN** antwortet das System mit Status `200` und dem geänderten Tier im Body, und `GET /animals/{id}` liefert danach die neuen Werte

#### Scenario: Mitgeschickte Notizen werden ignoriert
- **WHEN** ein Client `PUT /animals/{id}` mit der ID eines registrierten Tiers und einem JSON-Objekt aufruft, das `name`, `species` und `notes` enthält
- **THEN** antwortet das System mit Status `200`, der Body enthält kein Feld `notes`, und `GET /animals/{id}` liefert danach ebenfalls kein Feld `notes`

#### Scenario: Pflichtangabe fehlt
- **WHEN** ein Client `PUT /animals/{id}` mit einem JSON-Objekt aufruft, in dem `name` oder `species` fehlt oder leer ist
- **THEN** antwortet das System mit Status `400` und das Tier bleibt unverändert

#### Scenario: Tier existiert nicht
- **WHEN** ein Client `PUT /animals/{id}` mit einer ID aufruft, zu der kein Tier registriert ist
- **THEN** antwortet das System mit Status `404`

### Requirement: Formular aus dem Tierprofil öffnen
Das System SHALL im Tierprofil eine Aktion anbieten, die das Formular zum Bearbeiten dieses Tiers öffnet. Das Formular MUST mit den aktuellen Angaben des Tiers vorbelegt sein.

#### Scenario: Bearbeiten im Tierprofil wählen
- **WHEN** der Zoo-Manager im Tierprofil die Aktion zum Bearbeiten wählt
- **THEN** zeigt die App ein Formular mit den Feldern Name, Art, Alter und Gehege und ohne Feld Notizen, vorbelegt mit den aktuellen Angaben des Tiers

#### Scenario: Tier existiert nicht
- **WHEN** der Zoo-Manager das Bearbeitungsformular zu einer ID öffnet, zu der kein Tier registriert ist
- **THEN** zeigt die App statt des Formulars einen Hinweis, dass das Tier nicht gefunden wurde
