---
name: arc42-adr
description: Erstellt Architecture Decision Records (ADRs) im Nygard-Format als separate Markdown-Dateien und aktualisiert die arc42 Section 9 (Architekturentscheidungen). IMMER verwenden, wenn der User eine Architekturentscheidung dokumentieren will, ein ADR erstellen oder aktualisieren möchte, oder nach einem OpenSpec-Change architekturrelevante Entscheidungen in ADRs überführt werden sollen (siehe arc42-change-sync). Auch triggern bei: "entscheidung dokumentieren", "adr anlegen", "architekturentscheidung festhalten", "neues adr", "adr für ...". Verwende DIESEN Skill, nicht arc42-section-09, wenn es um ADRs im Nygard-Markdown-Format mit separaten Dateien geht. Verwende NICHT, wenn nur eine textuelle Beschreibung der Architektur gewünscht ist (dann arc42-section-09).
---
# arc42-adr — ADR-Workflow

Erstellt Architecture Decision Records (ADRs) im Nygard-Format und pflegt die arc42 Section 9 als Übersichtsseite.

## ADR-Lebenszyklus

Ein ADR durchläuft folgende Status:
- **Proposed** — vorgeschlagen, noch nicht entschieden
- **Accepted** — angenommen und gültig
- **Superseded by ADR-XXX** — durch eine neuere Entscheidung abgelöst (die alte bleibt als Record erhalten)
- **Deprecated** — nicht mehr gültig, ohne Nachfolger

Wichtig: ADRs sind immutable history. Wenn sich eine Entscheidung ändert, wird ein NEUES ADR angelegt und das alte auf "Superseded by ADR-XXX" gesetzt. Niemals ein bestehendes ADR editieren oder löschen.

## Datei-Struktur

```
docs/architecture/
├── adr/
│   ├── adr-001-strangler-fig-statt-big-bang.md
│   ├── adr-002-quarkus-als-laufzeit.md
│   └── adr-<next-id>-<kurztitel>.md
└── sections/
    └── 09-architecture-decisions.md      # Übersichtsseite (Decision Log + Kurzbeschreibungen)
```

## ADR-Format (Nygard + Implications)

Jedes ADR ist eine einzelne Markdown-Datei mit folgendem Aufbau:

```markdown
# ADR-<XXX>: <Titel>

**Status:** Accepted  (oder Proposed | Superseded by ADR-XXX | Deprecated)

**Date:** YYYY-MM-DD

**Supersedes:** [ADR-XXX](adr-XXX-titel.md)  (optional, nur wenn dieses ADR ein älteres ablöst)

## Kontext

Warum war eine Entscheidung nötig? Welches Problem wurde adressiert? 
Welche Randbedingungen oder Constraints gab es? Beschreibe die Situation 
so, dass jemand ohne Vorkenntnisse den Grund für die Entscheidung versteht.

## Entscheidung

Was wurde konkret beschlossen? Eine klare, prägnante Aussage.

## Konsequenzen

- Positiv: Vorteil 1
- Positiv: Vorteil 2
- Negativ: Nachteil 1 — sei ehrlich, jede Entscheidung hat Trade-offs
- Negativ: Nachteil 2

## Alternativen

| Alternative | Warum verworfen |
|-------------|-----------------|
| Option A | Konkreter Grund — Kosten, Risiko, Passung, Constraint |
| Option B | Konkreter Grund |

Die Tabelle kann entfallen, wenn keine Alternativen ernsthaft evaluiert wurden.

## Implications

- Betroffene Bausteine (→ Section 5): Welche Komponenten sind betroffen
- Qualitätsziele (→ Section 1.2): Welche QGs werden adressiert
- Neue Constraints (→ Section 2): Falls die Entscheidung neue Randbedingungen schafft
- Risiken (→ Section 11): Falls die Entscheidung neue Risiken oder Technical Debt einführt
```

## Workflow: Neues ADR aus OpenSpec-Change

Wenn ADRs aus einem OpenSpec-Change abgeleitet werden sollen, lies die Change-Artefakte:
1. `openspec/changes/<name>/proposal.md` — War der Change?
2. `openspec/changes/<name>/design.md` — Welche Entscheidungen wurden getroffen? (Hier stehen die Architekturentscheidungen mit Alternativen und Trade-offs)
3. `openspec/changes/<name>/tasks.md` — Was wurde umgesetzt?

Extrahiere daraus die architekturrelevanten Entscheidungen. Orientiere dich am Change-Design: Jede "Decision D1..Dn" im Design-Dokument ist typischerweise ein eigenes ADR (sofern sie architekturrelevant ist und nicht nur eine Implementierungsdetails).

Prüfkriterien für Architekturrelevanz:
- ❌ Nicht architekturrelevant: reine Implementierungsdetails, Build-Konfiguration ohne Alternativen, Tool-Wahl ohne Trade-offs
- ✅ Architekturrelevant: schwer umkehrbare Entscheidungen, Entscheidungen mit signifikanten Trade-offs, Entscheidungen die mehrere Komponenten betreffen

## Workflow: Section 9 aktualisieren

Nachdem alle ADR-Dateien geschrieben sind, aktualisiere die Übersichtsseite `docs/architecture/sections/09-architecture-decisions.md`:

1. **Decision Log**: Füge die neuen ADRs oben in die Tabelle ein (neueste zuerst). Die Tabelle hat Spalten: ID, Titel, Status, Datum.

2. **Kurzbeschreibung**: Füge für jedes neue ADR einen Abschnitt mit Status-Link und Kurzbeschreibung ein, Format:
   ```markdown
   ### ADR-<XXX>: <Titel>

   **Status:** Angenommen – [Vollständiges ADR](../adr/adr-<xxx>-<titel>.md)

   **Kurzbeschreibung:** Ein Satz zur Entscheidung.
   ```

3. Überprüfe die Cross-References: Andere Sektionen verlinken ADRs über die Überschrift in Section 9 (`09-architecture-decisions.md#adr-xxx-titel`) oder direkt auf die ADR-Datei. Diese Links müssen auflösen.

## Workflow: Einzelnes ADR anlegen (User gibt Kontext)

Wenn der User eine einzelne Entscheidung dokumentieren will (nicht aus einem Change):

1. Frage systematisch die ADR-Felder ab:
   - Was war der Kontext / das Problem?
   - Was wurde entschieden?
   - Welche Alternativen wurden betrachtet und warum verworfen?
   - Was sind die positiven und negativen Konsequenzen?
   - Welche arc42-Sektionen sind betroffen (Bausteine, Qualitätsziele, Risiken)?
   - Entscheidungsdatum und Status?

2. Generiere die nächste freie ADR-ID (prüfe vorhandene Dateien in `docs/architecture/adr/`).

3. Erstelle die Datei und aktualisiere Section 9.

## Wichtige Konventionen

- Dateiname: `adr-<XXX>-<kurztitel>.md` (nur Kleinbuchstaben, Bindestriche, max 50 Zeichen)
- Sprache: Deutsch (wie die arc42-Dokumentation), Fachbegriffe und Code-Bezeichner bleiben englisch
- Querverweise zu anderen ADRs: `[ADR-006a](adr-006a-deployment-je-domaene.md)`
- Querverweise zu arc42-Sektionen: Nutze die Implications-Tabelle im ADR
- Ein neues ADR bekommt immer die nächste freie ID (max ID aus vorhandenen Dateien + 1)
