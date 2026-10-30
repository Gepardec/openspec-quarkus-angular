# Spec Delta

## MODIFIED Requirements

### Requirement: Formular aus dem Tierprofil öffnen
Das System SHALL im Tierprofil eine Aktion anbieten, die das Formular zum Bearbeiten dieses Tiers öffnet. Das Formular MUST mit den aktuellen Angaben des Tiers vorbelegt sein. Das Feld Gehege MUST die Namen der bereits belegten Gehege als Vorschläge anbieten und MUST weiterhin die freie Eingabe eines neuen Gehegenamens erlauben.

#### Scenario: Bearbeiten im Tierprofil wählen
- **WHEN** der Zoo-Manager im Tierprofil die Aktion zum Bearbeiten wählt
- **THEN** zeigt die App ein Formular mit den Feldern Name, Art, Alter, Gehege und Notizen, vorbelegt mit den aktuellen Angaben des Tiers

#### Scenario: Tier existiert nicht
- **WHEN** der Zoo-Manager das Bearbeitungsformular zu einer ID öffnet, zu der kein Tier registriert ist
- **THEN** zeigt die App statt des Formulars einen Hinweis, dass das Tier nicht gefunden wurde

#### Scenario: Bestehende Gehege vorschlagen
- **WHEN** der Zoo-Manager im Bearbeitungsformular das Feld Gehege bearbeitet und Tiere in den Gehegen „Savanne 1“ und „Afrika-Haus“ registriert sind
- **THEN** schlägt die App unter dem Feld die Gehege vor, deren Name den bisher eingegebenen Text unabhängig von Groß- und Kleinschreibung enthält, bei leerem Feld beide Gehege

#### Scenario: Vorgeschlagenes Gehege übernehmen
- **WHEN** der Zoo-Manager im Feld Gehege „sav“ eingibt, den Vorschlag „Savanne 1“ wählt und die Änderungen speichert
- **THEN** speichert das System das Tier mit dem Gehege „Savanne 1“ in genau dieser Schreibweise

#### Scenario: Neues Gehege eintippen
- **WHEN** der Zoo-Manager im Feld Gehege einen Namen eingibt, den noch kein Tier als Gehege angibt, keinen Vorschlag wählt und die Änderungen speichert
- **THEN** speichert das System das Tier mit dem eingegebenen Gehegenamen
