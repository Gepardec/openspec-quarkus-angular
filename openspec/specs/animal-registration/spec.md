# animal-registration Specification

## Purpose
Ermöglicht Zoo-Manager:innen, neue Tiere mit Name, Art, Alter, Gehege und Notizen im System zu erfassen, sobald sie in den Zoo kommen.

## Requirements

### Requirement: Tier über die API anlegen
Das System SHALL über `POST /animals` ein neues Tier aus einem JSON-Objekt mit den Feldern `name`, `species`, `age`, `enclosure` und `notes` anlegen. `name` und `species` MUST angegeben und nicht leer sein; `age`, `enclosure` und `notes` sind optional.

#### Scenario: Gültiges Tier anlegen
- **WHEN** ein Client `POST /animals` mit einem JSON-Objekt aufruft, das `name` und `species` enthält
- **THEN** antwortet das System mit Status `201`, einem `Location`-Header auf `/animals/{id}` des neuen Tiers und dem angelegten Tier inklusive vergebener `id` im Body

#### Scenario: Pflichtangabe fehlt
- **WHEN** ein Client `POST /animals` mit einem JSON-Objekt aufruft, in dem `name` oder `species` fehlt oder leer ist
- **THEN** antwortet das System mit Status `400` und legt kein Tier an

### Requirement: Formular aus der Tierliste öffnen
Das System SHALL in der Tierliste eine Aktion anbieten, die das Formular zum Erfassen eines neuen Tiers öffnet.

#### Scenario: Aktion in der Tierliste wählen
- **WHEN** der Zoo-Manager in der Tierliste die Aktion zum Hinzufügen eines Tiers wählt
- **THEN** zeigt die App ein leeres Formular mit den Feldern Name, Art, Alter, Gehege und Notizen

### Requirement: Gehege im Formular eingeben
Das System SHALL im Formular zum Erfassen das Feld Gehege als optionale Texteingabe anbieten, in die der Zoo-Manager den Namen des Geheges frei eintippt.

#### Scenario: Gehege eintippen
- **WHEN** der Zoo-Manager im Feld Gehege „Savanne 1“ eintippt und das Formular mit Name und Art speichert
- **THEN** legt das System das Tier mit dem Gehege „Savanne 1“ an

#### Scenario: Gehege leer lassen
- **WHEN** der Zoo-Manager das Feld Gehege leer lässt und das Formular mit Name und Art speichert
- **THEN** legt das System das Tier ohne Gehege an

### Requirement: Neues Tier speichern
Das System SHALL ein neues Tier mit den im Formular eingegebenen Angaben speichern und danach die Tierliste anzeigen.

#### Scenario: Formular mit gültigen Angaben speichern
- **WHEN** der Zoo-Manager im Formular mindestens Name und Art ausfüllt und speichert
- **THEN** legt das System das Tier an und zeigt die Tierliste, die das neue Tier enthält

### Requirement: Pflichtfelder im Formular
Das System MUST im Formular Name und Art als Pflichtfelder behandeln und ohne diese Angaben kein Tier anlegen.

#### Scenario: Name oder Art fehlt
- **WHEN** der Zoo-Manager das Formular speichert, ohne Name oder Art auszufüllen
- **THEN** legt das System kein Tier an und zeigt am jeweils fehlenden Feld einen Hinweis, dass die Angabe erforderlich ist

### Requirement: Erfassen abbrechen
Das System SHALL im Formular eine Aktion zum Abbrechen anbieten, die ohne Speichern zur Tierliste zurückführt.

#### Scenario: Formular abbrechen
- **WHEN** der Zoo-Manager im Formular Angaben eingibt und Abbrechen wählt
- **THEN** zeigt die App die Tierliste und es wurde kein Tier angelegt
