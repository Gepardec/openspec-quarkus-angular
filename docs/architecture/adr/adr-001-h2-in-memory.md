# ADR-001: H2 in-memory mit drop-and-create

**Status:** Accepted (nachträglich dokumentiert)

**Date:** 2026-11-25

## Kontext

*Kontext rekonstruiert, unbestätigt.* Die Zoo-Verwaltung ist die Referenz-App eines Workshops. Teilnehmende sollen sie ohne Installation einer Datenbank starten, und jeder Start soll denselben Datenstand liefern, damit Übungen und Tests reproduzierbar sind.

Belegt im Code: `quarkus.datasource.db-kind=h2`, `quarkus.hibernate-orm.schema-management.strategy=drop-and-create`, Startdaten in `import.sql`.

## Entscheidung

Die Daten liegen in einer H2-Datenbank im Speicher des Quarkus-Prozesses. Das Schema entsteht bei jedem Start neu aus den Entities, die Startdaten kommen aus `import.sql`.

## Konsequenzen

- Positiv: Keine Datenbank zu installieren, Start mit einem Befehl.
- Positiv: Jeder Start und jeder Test beginnt mit bekanntem Datenstand.
- Negativ: Alle Änderungen gehen beim Neustart verloren. Für echten Betrieb ungeeignet.
- Negativ: Keine Migrationen (Flyway/Liquibase). Schemaänderungen fallen erst auf, wenn eine echte Datenbank dazukommt.

## Alternativen

| Alternative | Warum verworfen |
|-------------|-----------------|
| PostgreSQL per Dev Services | *unbestätigt:* setzt Docker auf allen Teilnehmer-Rechnern voraus |
| H2 als Datei | *unbestätigt:* Datenstand wäre nicht mehr bei jedem Start gleich |

## Implications

- Betroffene Bausteine (→ Section 5): Datenbank, Animal
- Qualitätsziele (→ Section 1.2): offen, vermutlich Einfachheit/Reproduzierbarkeit für den Workshop
- Neue Constraints (→ Section 2): kein persistenter Betrieb
- Risiken (→ Section 11): Wechsel auf eine echte Datenbank braucht Migrationen und Tests gegen das Ziel-DBMS
