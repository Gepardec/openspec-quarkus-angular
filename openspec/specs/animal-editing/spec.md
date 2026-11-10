# animal-editing Specification

## Purpose
Ermöglicht Zoo-Manager:innen, die Angaben eines bereits erfassten Tiers zu ändern, wenn sich Name, Art, Alter, Gehege oder Notizen ändern.

## Requirements

### Requirement: Tier über die API aktualisieren
Das System SHALL über `PUT /animals/{id}` die Felder `name`, `species`, `age`, `enclosure` und `notes` des Tiers mit der angegebenen ID durch die Werte aus dem JSON-Body ersetzen. `name` und `species` MUST angegeben und nicht leer sein.

#### Scenario: Bestehendes Tier aktualisieren
- **WHEN** ein Client `PUT /animals/{id}` mit der ID eines registrierten Tiers und einem JSON-Objekt aufruft, das `name` und `species` enthält
- **THEN** antwortet das System mit Status `200` und dem geänderten Tier im Body, und `GET /animals/{id}` liefert danach die neuen Werte

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
- **THEN** zeigt die App ein Formular mit den Feldern Name, Art, Alter, Gehege und Notizen, vorbelegt mit den aktuellen Angaben des Tiers

#### Scenario: Tier existiert nicht
- **WHEN** der Zoo-Manager das Bearbeitungsformular zu einer ID öffnet, zu der kein Tier registriert ist
- **THEN** zeigt die App statt des Formulars einen Hinweis, dass das Tier nicht gefunden wurde

### Requirement: Gehege im Formular ändern
Das System SHALL im Bearbeitungsformular das Feld Gehege als optionale Texteingabe anbieten, in der der Zoo-Manager den Namen des Geheges frei ändert. Das Feld MUST die Namen der bereits belegten Gehege als Vorschläge anbieten und MUST weiterhin die freie Eingabe eines neuen Gehegenamens erlauben.

#### Scenario: Gehege ändern
- **WHEN** der Zoo-Manager im Feld Gehege „Savanne 1“ durch „Savanne 2“ ersetzt und speichert
- **THEN** speichert das System das Tier mit dem Gehege „Savanne 2“

#### Scenario: Gehege leeren
- **WHEN** der Zoo-Manager das Feld Gehege leert und speichert
- **THEN** speichert das System das Tier ohne Gehege

#### Scenario: Bestehende Gehege vorschlagen
- **WHEN** der Zoo-Manager im Bearbeitungsformular das Feld Gehege bearbeitet und Tiere in den Gehegen „Savanne 1“ und „Afrika-Haus“ registriert sind
- **THEN** schlägt die App unter dem Feld die Gehege vor, deren Name den bisher eingegebenen Text unabhängig von Groß- und Kleinschreibung enthält, bei leerem Feld beide Gehege

#### Scenario: Vorgeschlagenes Gehege übernehmen
- **WHEN** der Zoo-Manager im Feld Gehege „sav“ eingibt, den Vorschlag „Savanne 1“ wählt und die Änderungen speichert
- **THEN** speichert das System das Tier mit dem Gehege „Savanne 1“ in genau dieser Schreibweise

#### Scenario: Neues Gehege eintippen
- **WHEN** der Zoo-Manager im Feld Gehege einen Namen eingibt, den noch kein Tier als Gehege angibt, keinen Vorschlag wählt und die Änderungen speichert
- **THEN** speichert das System das Tier mit dem eingegebenen Gehegenamen

### Requirement: Änderungen speichern
Das System SHALL die im Formular geänderten Angaben speichern und danach das Tierprofil mit den geänderten Daten anzeigen.

#### Scenario: Formular mit gültigen Angaben speichern
- **WHEN** der Zoo-Manager im Formular Angaben ändert, Name und Art ausgefüllt lässt und speichert
- **THEN** speichert das System die Änderungen und zeigt das Tierprofil mit den geänderten Angaben

### Requirement: Pflichtfelder beim Bearbeiten
Das System MUST im Bearbeitungsformular Name und Art als Pflichtfelder behandeln und ohne diese Angaben keine Änderungen speichern.

#### Scenario: Name oder Art geleert
- **WHEN** der Zoo-Manager im Formular Name oder Art leert und speichert
- **THEN** speichert das System keine Änderungen und zeigt am jeweils fehlenden Feld einen Hinweis, dass die Angabe erforderlich ist

### Requirement: Bearbeiten abbrechen
Das System SHALL im Bearbeitungsformular eine Aktion zum Abbrechen anbieten, die ohne Speichern zum Tierprofil zurückführt.

#### Scenario: Formular abbrechen
- **WHEN** der Zoo-Manager im Formular Angaben ändert und Abbrechen wählt
- **THEN** zeigt die App das Tierprofil mit den unveränderten Angaben
