# Spec Delta

## MODIFIED Requirements

### Requirement: Einzelnes Tier abrufen
Das System SHALL über `GET /animals/{id}` das Tier mit der angegebenen ID als JSON-Objekt liefern. Die Antwort MUST die Felder `id`, `name`, `species`, `age` und `enclosure` enthalten; `age` und `enclosure` dürfen leer sein. Die Antwort MUST kein Feld `notes` enthalten.

#### Scenario: Tier existiert
- **WHEN** ein Client `GET /animals/{id}` mit der ID eines registrierten Tiers aufruft
- **THEN** antwortet das System mit Status `200` und einem JSON-Objekt mit `id`, `name`, `species`, `age` und `enclosure` dieses Tiers, ohne Feld `notes`

#### Scenario: Tier existiert nicht
- **WHEN** ein Client `GET /animals/{id}` mit einer ID aufruft, zu der kein Tier registriert ist
- **THEN** antwortet das System mit Status `404`

## REMOVED Requirements

### Requirement: Notizen im Tierprofil anzeigen
**Reason**: Das Freitextfeld Notizen hat keine Autorin und keinen Zeitstempel, die Inhalte sind unstrukturiert und veralten. Für Beobachtungen der Tierpfleger:innen soll es später eigene, strukturierte Funktionen geben.
**Migration**: Keine. Die gespeicherten Notizen werden nicht übernommen und entfallen mit dem Feld; das Tierprofil zeigt nur noch Name, Art, Alter und Gehege.
