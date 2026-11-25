# Spec Delta

## Purpose

Beschreibt, wie die Tiere des Zoos angelegt, bearbeitet, gelöscht und angezeigt werden und welche Regeln für Tierdaten gelten.

## ADDED Requirements

### Requirement: Tiernamen sind eindeutig
Das System MUST sicherstellen, dass kein Name von mehr als einem Tier verwendet wird. Die Regel gilt beim Anlegen und beim Bearbeiten eines Tiers. Der Vergleich berücksichtigt Groß-/Kleinschreibung. Ein Tier steht beim Bearbeiten nicht im Konflikt mit seinem eigenen Namen.

#### Scenario: Anlegen mit freiem Namen
- **WHEN** ein Tier mit dem Namen „Kira“ angelegt wird und kein Tier „Kira“ heißt
- **THEN** antwortet das System mit `201 Created` und das Tier ist gespeichert

#### Scenario: Anlegen mit vergebenem Namen
- **WHEN** ein Tier mit dem Namen „Leo“ angelegt wird und bereits ein Tier „Leo“ heißt
- **THEN** antwortet das System mit `409 Conflict` und es wird kein Tier gespeichert

#### Scenario: Name unterscheidet sich nur in Groß-/Kleinschreibung
- **WHEN** ein Tier mit dem Namen „leo“ angelegt wird und bereits ein Tier „Leo“ heißt
- **THEN** antwortet das System mit `201 Created` und beide Tiere existieren

#### Scenario: Umbenennen auf vergebenen Namen
- **WHEN** das Tier „Zara“ auf den Namen „Leo“ umbenannt wird und bereits ein anderes Tier „Leo“ heißt
- **THEN** antwortet das System mit `409 Conflict` und das Tier heißt weiterhin „Zara“

#### Scenario: Bearbeiten ohne Namensänderung
- **WHEN** beim Tier „Leo“ andere Felder geändert werden und der Name „Leo“ bleibt
- **THEN** antwortet das System mit `200 OK` und die Änderungen sind gespeichert

#### Scenario: Gleichzeitiges Anlegen mit demselben Namen
- **WHEN** zwei Anfragen gleichzeitig ein Tier mit dem Namen „Kira“ anlegen und kein Tier „Kira“ heißt
- **THEN** wird höchstens ein Tier „Kira“ gespeichert und die andere Anfrage erhält `409 Conflict`

### Requirement: Leerzeichen am Rand des Namens werden entfernt
Das System SHALL führende und abschließende Leerzeichen eines Tiernamens beim Anlegen und Bearbeiten entfernen, bevor es die Eindeutigkeit prüft und den Namen speichert.

#### Scenario: Name mit Rand-Leerzeichen wird bereinigt gespeichert
- **WHEN** ein Tier mit dem Namen „ Kira “ angelegt wird
- **THEN** wird das Tier mit dem Namen „Kira“ gespeichert und zurückgegeben

#### Scenario: Bereinigter Name kollidiert mit vorhandenem Namen
- **WHEN** ein Tier mit dem Namen „ Leo “ angelegt wird und bereits ein Tier „Leo“ heißt
- **THEN** antwortet das System mit `409 Conflict`

#### Scenario: Name besteht nur aus Leerzeichen
- **WHEN** ein Tier mit dem Namen „   “ angelegt wird
- **THEN** antwortet das System mit `400 Bad Request`

### Requirement: Namenskonflikt wird im Formular angezeigt
Die Formulare zum Anlegen und Bearbeiten eines Tiers SHALL bei einem Namenskonflikt eine verständliche Fehlermeldung direkt am Namensfeld anzeigen, in der aktuell gewählten Sprache (Deutsch oder Englisch). Die eingegebenen Daten MUST erhalten bleiben.

#### Scenario: Konflikt beim Anlegen
- **WHEN** im Formular „Tier anlegen“ ein bereits vergebener Name eingegeben und abgesendet wird
- **THEN** bleibt das Formular geöffnet, alle Eingaben bleiben erhalten und am Namensfeld erscheint die Meldung, dass der Name bereits vergeben ist

#### Scenario: Konflikt beim Bearbeiten
- **WHEN** im Formular „Tier bearbeiten“ der Name auf einen bereits vergebenen Namen geändert und gespeichert wird
- **THEN** bleibt das Formular geöffnet, alle Eingaben bleiben erhalten und am Namensfeld erscheint die Meldung, dass der Name bereits vergeben ist

#### Scenario: Meldung auf Englisch
- **WHEN** die Sprache Englisch gewählt ist und ein Namenskonflikt auftritt
- **THEN** wird die Meldung am Namensfeld auf Englisch angezeigt
