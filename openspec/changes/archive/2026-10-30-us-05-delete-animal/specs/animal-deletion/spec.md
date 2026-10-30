# Spec Delta

## Purpose

Ermöglicht Zoo-Manager:innen, ein Tier zu löschen, wenn es den Zoo verlässt, und schützt durch eine Bestätigung vor versehentlichem Löschen.

## ADDED Requirements

### Requirement: Tier über die API löschen
Das System SHALL über `DELETE /animals/{id}` das Tier mit der angegebenen ID löschen.

#### Scenario: Bestehendes Tier löschen
- **WHEN** ein Client `DELETE /animals/{id}` mit der ID eines registrierten Tiers aufruft
- **THEN** antwortet das System mit Status `204`, und `GET /animals/{id}` antwortet danach mit Status `404`

#### Scenario: Tier existiert nicht
- **WHEN** ein Client `DELETE /animals/{id}` mit einer ID aufruft, zu der kein Tier registriert ist
- **THEN** antwortet das System mit Status `404`

### Requirement: Löschen im Tierprofil anbieten
Das System SHALL im Tierprofil eine Aktion zum Löschen des Tiers anbieten.

#### Scenario: Löschen im Tierprofil wählen
- **WHEN** der Zoo-Manager im Tierprofil die Aktion zum Löschen wählt
- **THEN** zeigt die App einen Bestätigungsdialog, bevor das Tier gelöscht wird

### Requirement: Löschen bestätigen
Das System MUST vor dem Löschen eines Tiers eine Bestätigung in einem Dialog verlangen, der das Tier mit seinem Namen nennt.

#### Scenario: Dialog nennt das Tier
- **WHEN** der Bestätigungsdialog für ein Tier geöffnet ist
- **THEN** nennt der Dialog den Namen des Tiers und bietet die Aktionen Löschen und Abbrechen an

#### Scenario: Löschen abbrechen
- **WHEN** der Zoo-Manager im Bestätigungsdialog Abbrechen wählt
- **THEN** schließt sich der Dialog, das Tier bleibt erhalten und die App zeigt weiterhin das Tierprofil

### Requirement: Nach dem Löschen zur Tierliste
Das System SHALL nach dem bestätigten Löschen die Tierliste anzeigen, in der das gelöschte Tier nicht mehr erscheint.

#### Scenario: Löschen bestätigen
- **WHEN** der Zoo-Manager im Bestätigungsdialog Löschen wählt
- **THEN** löscht das System das Tier und zeigt die Tierliste, in der das Tier nicht mehr enthalten ist
