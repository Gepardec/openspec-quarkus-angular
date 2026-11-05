## ADDED Requirements

### Requirement: Eindeutiger Name beim Anlegen über die API
Das System MUST über `POST /animals` kein Tier anlegen, wenn bereits ein Tier mit demselben `name` registriert ist. Groß-/Kleinschreibung wird beim Vergleich nicht unterschieden. In diesem Fall SHALL das System mit Status `409` antworten.

#### Scenario: Name ist bereits vergeben
- **WHEN** ein Client `POST /animals` mit einem `name` aufruft, unter dem bereits ein Tier registriert ist
- **THEN** antwortet das System mit Status `409` und legt kein weiteres Tier an

#### Scenario: Name unterscheidet sich nur in Groß-/Kleinschreibung
- **WHEN** ein Tier mit dem Namen „Leo“ registriert ist und ein Client `POST /animals` mit dem `name` „leo“ aufruft
- **THEN** antwortet das System mit Status `409` und legt kein weiteres Tier an

#### Scenario: Name ist noch frei
- **WHEN** ein Client `POST /animals` mit einem `name` aufruft, unter dem noch kein Tier registriert ist
- **THEN** antwortet das System mit Status `201` und legt das Tier an

### Requirement: Hinweis auf vergebenen Namen im Formular
Das System SHALL im Formular zum Erfassen eines Tiers am Feld Name einen Hinweis anzeigen, wenn der eingegebene Name bereits vergeben ist. Das Formular MUST dabei geöffnet bleiben und die eingegebenen Angaben behalten.

#### Scenario: Formular mit vergebenem Namen speichern
- **WHEN** der Zoo-Manager im Formular einen Namen eingibt, unter dem bereits ein Tier registriert ist, und speichert
- **THEN** legt das System kein Tier an, zeigt weiterhin das Formular mit den eingegebenen Angaben und am Feld Name einen Hinweis, dass der Name bereits vergeben ist

#### Scenario: Namen nach dem Hinweis ändern
- **WHEN** der Hinweis auf einen vergebenen Namen angezeigt wird und der Zoo-Manager den Namen auf einen freien Namen ändert und speichert
- **THEN** verschwindet der Hinweis, das System legt das Tier an und zeigt die Tierliste, die das neue Tier enthält
