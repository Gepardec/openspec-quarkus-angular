# 9. Architekturentscheidungen

Die Entscheidungen liegen als einzelne ADRs im Nygard-Format unter [`../adr/`](../adr/). Alle vier wurden **nachträglich aus dem Code dokumentiert**. Wo das Motiv nicht im Code steht, ist der Kontext als „rekonstruiert, unbestätigt“ markiert.

## Decision Log

| ID | Titel | Status | Datum |
|---|---|---|---|
| ADR-004 | Domänengrenzen im Frontend mit Sheriff erzwingen | Accepted (nachträglich) | 2026-11-25 |
| ADR-003 | Keine Service-Schicht im Backend | Accepted (nachträglich) | 2026-11-25 |
| ADR-002 | Web-App und REST-API als ein Deployment (Quinoa) | Accepted (nachträglich) | 2026-11-25 |
| ADR-001 | H2 in-memory mit drop-and-create | Accepted (nachträglich) | 2026-11-25 |

### ADR-004: Domänengrenzen im Frontend mit Sheriff erzwingen

**Status:** Angenommen – [Vollständiges ADR](../adr/adr-004-sheriff-fuer-domaenengrenzen.md)

**Kurzbeschreibung:** Sheriff prüft beim Linten, dass Frontend-Domänen nur aus sich selbst und `shared` importieren.

### ADR-003: Keine Service-Schicht im Backend

**Status:** Angenommen – [Vollständiges ADR](../adr/adr-003-keine-service-schicht.md)

**Kurzbeschreibung:** Die Resources enthalten die Fachlogik und greifen direkt auf die Panache-Entity zu.

### ADR-002: Web-App und REST-API als ein Deployment (Quinoa)

**Status:** Angenommen – [Vollständiges ADR](../adr/adr-002-ein-deployment-mit-quinoa.md)

**Kurzbeschreibung:** Quarkus liefert die Angular-App über Quinoa aus, ein Prozess, ein Port.

### ADR-001: H2 in-memory mit drop-and-create

**Status:** Angenommen – [Vollständiges ADR](../adr/adr-001-h2-in-memory.md)

**Kurzbeschreibung:** Die Daten liegen flüchtig in H2 und werden bei jedem Start aus `import.sql` neu angelegt.
