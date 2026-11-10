# animal-registration Specification

## Purpose
Ermöglicht Zoo-Manager:innen, neue Tiere mit Name, Art, Alter und Gehege im System zu erfassen, sobald sie in den Zoo kommen.

## Requirements

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

### Requirement: Gehege im Formular eingeben
Das System SHALL im Formular zum Erfassen das Feld Gehege als optionale Texteingabe anbieten, in die der Zoo-Manager den Namen des Geheges frei eintippt. Das Feld MUST die Namen der bereits belegten Gehege als Vorschläge anbieten und MUST weiterhin die freie Eingabe eines neuen Gehegenamens erlauben.

#### Scenario: Gehege eintippen
- **WHEN** der Zoo-Manager im Feld Gehege „Savanne 1“ eintippt und das Formular mit Name und Art speichert
- **THEN** legt das System das Tier mit dem Gehege „Savanne 1“ an

#### Scenario: Gehege leer lassen
- **WHEN** der Zoo-Manager das Feld Gehege leer lässt und das Formular mit Name und Art speichert
- **THEN** legt das System das Tier ohne Gehege an

#### Scenario: Bestehende Gehege vorschlagen
- **WHEN** der Zoo-Manager im Formular das Feld Gehege bearbeitet und Tiere in den Gehegen „Savanne 1“ und „Afrika-Haus“ registriert sind
- **THEN** schlägt die App unter dem Feld die Gehege vor, deren Name den bisher eingegebenen Text unabhängig von Groß- und Kleinschreibung enthält, bei leerem Feld beide Gehege

#### Scenario: Vorgeschlagenes Gehege übernehmen
- **WHEN** der Zoo-Manager im Feld Gehege „sav“ eingibt, den Vorschlag „Savanne 1“ wählt und das Formular speichert
- **THEN** legt das System das Tier mit dem Gehege „Savanne 1“ in genau dieser Schreibweise an

#### Scenario: Neues Gehege eintippen
- **WHEN** der Zoo-Manager im Feld Gehege einen Namen eingibt, den noch kein Tier als Gehege angibt, keinen Vorschlag wählt und das Formular speichert
- **THEN** legt das System das Tier mit dem eingegebenen Gehegenamen an

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
