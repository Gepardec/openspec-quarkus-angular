# Spec Delta

## MODIFIED Requirements

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
