# Spec Delta

## MODIFIED Requirements

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
