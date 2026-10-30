# Design

## Context

Die Entity `Animal` speichert bisher nur Name und Art; `GET /animals` liefert die Entity direkt aus. Im Frontend hält der `AnimalStore` (NgRx Signal Store mit `withEntities` und `withCallStatus`) alle Tiere, geladen beim Initialisieren über `GET /animals`. Es gibt nur die Route `/animals` für die Tierliste. Motivation siehe proposal.md – Why; Anforderungen siehe `specs/animal-profile/spec.md`.

## Goals / Non-Goals

**Goals:**
- Das Datenmodell `Animal` um die optionalen Angaben Alter, Gehege und Notizen erweitern, ohne bestehende Endpunkte zu brechen.
- Ein Tierprofil, das sich in die bestehende Feature-Struktur der Domäne `animals` einfügt.

**Non-Goals:**
- Bearbeiten oder Löschen eines Tiers aus dem Profil.
- Formatierung oder Historie der Notizen; sie bleiben ein einfacher Freitext.

## Decisions

- **Neue Felder direkt an der Entity**: `age` (`Integer`), `enclosure` und `notes` (`String`) werden als nullable Spalten in `Animal` ergänzt; `name` und `species` bleiben Pflichtfelder. Alternative: eigene Entity für Notizen – für einen einzelnen Freitext unnötig komplex.
- **`GET /animals/{id}` mit `404`**: Die Methode lädt das Tier per `Animal.findById(id)` und wirft `NotFoundException`, wenn es fehlt; JAX-RS macht daraus Status `404`.
- **Profil liest aus dem `AnimalStore`**: Der Store erhält den Zustand `selectedAnimalId`, eine Methode `selectAnimalById` sowie die Computed Signals `selectedAnimal` und `selectedAnimalNotFound`. Da der Store beim Initialisieren bereits alle Tiere über `GET /animals` lädt, wird das Profil aus den vorhandenen Entities abgeleitet. Alternative: das Profil lädt das Tier separat über `GET /animals/{id}` – zusätzlicher Request und zweiter Ladezustand ohne Mehrwert, solange die Tierliste klein ist.
- **Route `/animals/:id` mit Component Input Binding**: Die Route wird per `loadComponent` unter `/animals` als Kindroute registriert; `withComponentInputBinding()` bindet den Pfadparameter als Input `id` (mit `numberAttribute`) an die Profil-Komponente, die ihn an `selectAnimalById` übergibt.
- **Darstellung mit `mat-card` und `mat-list`**: Das Profil zeigt die Angaben als Liste mit Beschriftung und Wert; leere optionale Angaben werden als leerer Wert dargestellt. Ein `mat-button`-Link oberhalb der Karte führt zurück zur Tierliste. Für eine unbekannte ID zeigt eine eigene Karte den Hinweis „Tier nicht gefunden“.
- **Klickbare Zeilen in der Tierliste**: Jede Zeile der `mat-table` erhält einen `routerLink` auf `/animals/{id}`; die Zeile zeigt per Cursor und Hover-Hintergrund an, dass sie anklickbar ist.

## Risks / Trade-offs

- [Direkter Aufruf eines Profils, bevor der Store die Tiere geladen hat] → Das Profil zeigt den Inhalt, sobald die Entities geladen sind; die Ableitung über Computed Signals aktualisiert die Ansicht automatisch.
- [Neue Felder werden über `GET /animals` automatisch mitgeliefert] → Für die Workshop-App akzeptabel; bei Bedarf kann später ein DTO eingeführt werden.
