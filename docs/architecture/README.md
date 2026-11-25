# Architekturdokumentation Zoo-Verwaltung (arc42)

Ist-Stand der Zoo-Verwaltung, **nachträglich aus dem Code abgeleitet** (Brownfield). Was der Code nicht hergibt, ist als offener Punkt markiert.

| Sektion | Inhalt |
|---|---|
| [1. Einführung und Ziele](sections/01-introduction-and-goals.md) | Aufgabenstellung, Qualitätsziele (offen), Stakeholder |
| [3. Kontextabgrenzung](sections/03-context-and-scope.md) | C4 System Context |
| [5. Bausteinsicht](sections/05-building-block-view.md) | C4 Container, Komponenten der Web-App (Domäne animals) und der REST-API |
| [6. Laufzeitsicht](sections/06-runtime-view.md) | Tier anlegen (Dynamic View) |
| [7. Verteilungssicht](sections/07-deployment-view.md) | lokaler Betrieb |
| [8. Querschnittliche Konzepte](sections/08-crosscutting-concepts.md) | Sheriff, Signal Store, Validierung, i18n, Persistenz, OpenSpec |
| [9. Architekturentscheidungen](sections/09-architecture-decisions.md) | vier nachträgliche ADRs |
| [12. Glossar](sections/12-glossary.md) | Verweis auf `GLOSSARY.md` |

Nicht befüllt: 2 (Randbedingungen), 4 (Lösungsstrategie), 10 (Qualitätsanforderungen), 11 (Risiken).

## Diagramme

Alle C4-Diagramme kommen aus **einem** Structurizr-Workspace: [`diagrams/structurizr/workspace.dsl`](diagrams/structurizr/workspace.dsl).

Neu erzeugen (braucht `structurizr` und `plantuml` im PATH):

```bash
docs/architecture/diagrams/render.sh
```

Interaktiv ansehen: Structurizr Lite (Docker-Image `structurizr/lite`) mit `docs/architecture/diagrams/structurizr` als Workspace-Ordner starten.

## Skills

Erstellt mit den Skills unter `.agents/skills/` (`arc42-with-structurizr`, `arc42-section-*`, `arc42-adr`, `domain-modeling`). Änderungen aus OpenSpec-Changes zieht `arc42-change-sync` nach (zwischen `openspec-verify-change` und `openspec-archive-change`).
