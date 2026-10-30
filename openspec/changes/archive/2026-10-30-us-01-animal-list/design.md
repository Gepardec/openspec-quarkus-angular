# Design

## Context

Die Tierliste ist das erste fachliche Feature der App: Es gibt noch kein Datenmodell für Tiere, keinen REST-Endpunkt und keine Feature-Struktur im Frontend. Die Änderung betrifft Backend (Quarkus, Panache, H2) und Frontend (Angular, NgRx Signal Store, Angular Material, Transloco) gleichermaßen. Motivation siehe proposal.md – Why; Anforderungen siehe `specs/animal-list/spec.md`.

## Goals / Non-Goals

**Goals:**
- Ein schlankes Datenmodell `Animal`, das Name und Art speichert und von späteren Features erweitert werden kann.
- Eine Frontend-Struktur für die Domäne `animals` (Feature, Data, Model), an die weitere Tier-Features andocken.

**Non-Goals:**
- Paginierung, Sortierung oder Filterung der Tierliste.
- Weitere Tierattribute oder Aktionen auf einzelnen Tieren.

## Decisions

- **Panache Active Record für `Animal`**: Die Entity erweitert `PanacheEntity` und wird in der Tabelle `animals` gespeichert; `GET /animals` liefert `Animal.listAll()` direkt als JSON. Alternative: separates DTO und Repository – für ein einziges lesendes Feature unnötiger Aufwand, gemäß Projektkonvention ist Active Record bevorzugt.
- **Seed-Daten über `import.sql`**: Einige Beispieltiere werden beim Start eingespielt, damit die Liste in der laufenden App sofort Inhalt hat. Die Tests räumen den Bestand vor jedem Test selbst auf und legen die benötigten Tiere an.
- **NgRx Signal Store mit `withEntities`**: Ein `AnimalStore` (providedIn root) hält die Tiere als Entities und einen Ladezustand (`callStatus`) über ein wiederverwendbares Store-Feature in `domain:shared`. Der Store lädt die Tiere beim Initialisieren über einen `AnimalService` (HttpClient). Alternative: Komponente ruft den Service direkt auf – widerspricht der Konvention, Zustand in Feature-Stores zu halten.
- **Darstellung mit `mat-table`**: Die Tierliste nutzt eine Material-Tabelle mit den Spalten Name und Art; der leere Zustand wird als eigener Hinweisblock statt einer leeren Tabelle gezeigt. Während des Ladens wird ein Fortschrittsbalken angezeigt.
- **Route `/animals` mit Lazy Loading**: Die Tierliste wird per `loadComponent` unter `/animals` geladen; die App-Shell erhält eine Material-Toolbar mit einem Navigationslink auf `/animals`.

## Risks / Trade-offs

- [Seed-Daten in `import.sql` beeinflussen Tests] → Tests löschen vor jedem Lauf alle Tiere und legen ihre Testdaten selbst an.
- [`GET /animals` liefert die Entity direkt aus, spätere Felder werden automatisch mitgeliefert] → Für die Workshop-App akzeptabel; bei Bedarf kann später ein DTO eingeführt werden.
