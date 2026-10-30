# Design

## Context

`AnimalResource` bietet Lesen, Anlegen und Aktualisieren von Tieren. Im Frontend zeigt das Tierprofil (`animal-profile`) das gewählte Tier aus dem `AnimalStore` an und hat bereits eine Aktion „Bearbeiten“. Dialoge gibt es in der App noch nicht. Motivation siehe proposal.md – Why; Anforderungen siehe `specs/animal-deletion/spec.md`.

## Goals / Non-Goals

**Goals:**
- Ein schlanker Bestätigungsdialog mit Angular Material.
- Liste und Profil spiegeln das Löschen ohne erneutes Laden aller Tiere wider.

**Non-Goals:**
- Wiederherstellen gelöschter Tiere oder ein Papierkorb.
- Löschen direkt aus der Tierliste oder Löschen mehrerer Tiere auf einmal.

## Decisions

- **Hartes Löschen per `deleteById`**: `DELETE /animals/{id}` ruft in einer `@Transactional`-Methode `Animal.deleteById(id)` auf und antwortet mit `204`, oder mit `404`, wenn nichts gelöscht wurde. Alternative: Soft Delete mit Status-Flag – würde alle lesenden Endpunkte betreffen und ist für die Anforderung nicht nötig.
- **Dialog mit `MatDialog`**: Eine eigene Komponente `animal-delete-dialog` (`mat-dialog-title`, `mat-dialog-content`, `mat-dialog-actions`) erhält den Namen des Tiers über `MAT_DIALOG_DATA` und schließt sich mit `true` (Löschen) oder `false` (Abbrechen). Der Name wird über einen Transloco-Parameter in den Bestätigungstext eingesetzt. Alternative: `window.confirm` – nicht stilbar und nicht übersetzbar über Transloco.
- **Ablauf im Tierprofil**: Die Aktion „Löschen“ öffnet den Dialog; nur bei Ergebnis `true` ruft das Profil `AnimalStore.delete(id)` auf und navigiert zur Tierliste. Die Aktion ist als `mat-stroked-button` mit Warnfarbe (`app-danger-button`) gestaltet, damit sie sich von „Bearbeiten“ abhebt.
- **Löschen im `AnimalStore`**: `AnimalService.deleteAnimal` ruft `DELETE /api/animals/{id}` auf; die Store-Methode `delete` (`rxMethod`) entfernt das Tier nach Erfolg per `removeEntity`, sodass die Tierliste es nicht mehr zeigt.

## Risks / Trade-offs

- [Die Navigation zur Tierliste erfolgt, bevor der Server das Löschen bestätigt hat] → Das Tier verschwindet aus der Liste, sobald die Antwort eintrifft; schlägt das Löschen fehl, bleibt es sichtbar und der Fehler steht im Ladezustand des Stores.
- [Gelöschte Tiere sind endgültig weg] → Der Bestätigungsdialog nennt das Tier mit Namen, um Verwechslungen vorzubeugen.
