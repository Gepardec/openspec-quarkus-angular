---
name: arc42-with-structurizr
description: >
  Orchestriert arc42-Dokumentation mit Structurizr C4-Diagrammen.
  Verwende diesen Skill IMMER wenn der Benutzer arc42-Dokumentation erstellt, ergänzt oder reviewed,
  ein arc42-Section-Skill lädt, Architekturdiagramme im C4-Stil anfordert,
  oder ein Structurizr-Diagramm zu einer arc42-Sektion erstellen möchte.
  Wird auch getriggert bei: "diagramm erstellen", "c4 diagramm", "structurizr",
  "arc42 review", "arc42 lint", "architektur dokumentieren".
  Der Skill kombiniert die arc42-section-N Skills (Dokumentation) mit dem structurizr MCP (Diagramme)
  und prüft anschließend die Konsistenz mit arc42-lint und arc42-review.
---

# arc42 mit Structurizr — Workflow

Dieser Skill orchestriert den gesamten arc42-Dokumentationszyklus inklusive C4-Diagramme mit Structurizr, abgeschlossen durch Review und Lint.

## Voraussetzungen (Prerequisites)

Bevor der Skill startet, MÜSSEN diese Prerequisites geprüft werden:

### 1. Structurizr MCP

Prüfe ob der `structurizr` MCP-Server verbunden ist. Der Skill arbeitet NUR mit dem Structurizr MCP (Tools: `structurizr_validate`, `structurizr_parse`, `structurizr_export-plantuml`, `structurizr_export-mermaid`).

- **MCP verfügbar →** fortfahren
- **MCP nicht verfügbar →** den Benutzer informieren: "Der Structurizr MCP-Server ist nicht verbunden. Bitte trage den structurizr MCP in die MCP-Konfiguration deines Agenten ein (Anleitungen: `documents/how-tos/structurizr-setup.md`, für Junie `documents/how-tos/junie-setup.md`)." Ohne Structurizr MCP kann der Skill keine Diagramme erzeugen.

### 2. PlantUML (optional, für SVG-Export)

Prüfe ob `plantuml` auf der Kommandozeile verfügbar ist:
```bash
which plantuml
```

- **Verfügbar →** Standard-Export: `structurizr_export-plantuml` + `plantuml -tsvg`
- **Nicht verfügbar →** frage: "PlantUML ist nicht installiert. Soll ich es installieren (`brew install plantuml`) oder Mermaid-Diagramme verwenden?"
  - Zustimmung → `brew install plantuml` und mit PlantUML fortfahren
  - Ablehnung → `structurizr_export-mermaid` und als Mermaid-Block in die Markdown-Sektion einbetten

### 3. arc42-Section-Skills

Die arc42-section-N Skills müssen im Projekt verfügbar sein (im Skill-Ordner deines Agenten, projektweit oder global – siehe `documents/how-tos/arc42-toolkit-setup.md`). Fehlende Skills werden übersprungen – die Doku wird dann direkt erstellt ohne den Section-Skill.

### 4. arc42-lint / arc42-review

- `arc42-lint` sollte verfügbar sein (prüft Cross-Referenzen)
- `arc42-review` sollte verfügbar sein (prüft Inhalt)
Fehlende Skills werden mit Hinweis übersprungen.

## Ablauf-Übersicht

```
arc42-section-N (befüllen)
  → ggf. Structurizr DSL erstellen (abhängig von Sektion)
  → PlantUML exportieren + SVG rendern
  → In Markdown-Sektion einbinden
  → arc42-lint (Cross-Referenzen prüfen)
  → arc42-review (Inhalt prüfen)
  → Issues fixen anbieten
```

## Mapping: arc42-Sektion ↔ Structurizr-View-Typ

Alle Views liegen in **einem** `workspace.dsl`. Das Modell (Personen, Systeme, Container, Komponenten, Beziehungen) gibt es nur einmal; jede Sicht ist ein View-Key darauf. Getrennte DSL-Dateien pro Sicht würden das Modell duplizieren und auseinanderlaufen.

| arc42-Sektion | Structurizr View | C4-Ebene | View-Key (Beispiel) | Dateiname (SVG) |
|---|---|---|---|---|
| 3 (Kontextabgrenzung) | `systemContext` | C1 | `context` | `03-context.svg` |
| 5 (Bausteinsicht) | `container` + `component` | C2 + C3 | `containers`, `components-{container}` | `05-containers.svg`, `05-components-{container}.svg` |
| 6 (Laufzeitsicht) | `dynamic` | C2/C3 | `runtime-{szenario}` | `06-runtime-{szenario}.svg` |
| 7 (Verteilungssicht) | `deployment` | C2/C3 | `deployment-{umgebung}` | `07-deployment-{umgebung}.svg` |
| 8 (Querschnittskonzepte) | — | — | Nur wenn ein Konzept ein Diagramm erfordert |

**Vorrang vor den Section-Skills:** Die arc42-section-N Skills schreiben Diagramme als eigene PlantUML-Dateien nach `docs/diagrams/`. In diesem Workflow gilt das NICHT: Alle C4-Diagramme (Sektion 3, 5, 6, 7) entstehen ausschließlich aus dem `workspace.dsl`. Die Diagramm-Anweisungen der Section-Skills werden ignoriert, ihre Fragen und Textvorlagen gelten weiter. Ausnahme: Diagramme ohne C4-Entsprechung (z. B. Domänenmodell in Sektion 8) dürfen weiter als eigene `.puml` unter `docs/architecture/diagrams/` liegen.

## Verzeichnisstruktur

```
docs/architecture/
├── README.md           # Einstieg: Inhaltsverzeichnis der Sektionen
├── sections/           # arc42-Sektionen (*.md), z. B. 05-bausteinsicht.md
├── adr/                # ADRs (siehe arc42-adr)
└── diagrams/
    ├── structurizr/
    │   └── workspace.dsl   # EIN Workspace mit allen Views
    ├── *.puml          # Exportierte PlantUML-Dateien (generiert)
    └── *.svg           # Gerenderte Diagramme (generiert)
```

## Schritt 1: Sektion befüllen

Lade den passenden arc42-section-N Skill. Frage ob Ist, Ziel oder beide Zustände dokumentiert werden sollen.

**Besonderheiten:**
- **Section 3 (Kontextabgrenzung):** Frage nach Personen (Akteuren) und externen Systemen + Schnittstellen (IF-xx). Die Tabelle in 3.2 dient als Grundlage für das C1-Diagramm.
- **Section 5 (Bausteinsicht):** Frage nach Containern (C2) und ggf. Komponenten (C3) für einen repräsentativen Service. Die Tabellen in Section 5 sind die Grundlage.
- **Section 7 (Verteilungssicht):** Frage nach Infrastruktur (VMs, Server, Ports) für das Deployment-Diagramm.

## Schritt 2: Structurizr DSL erstellen

Sobald die arc42-Sektion befüllt ist (oder parallel dazu), ergänze Modell und View im bestehenden `workspace.dsl`. Lege nur dann eine neue Datei an, wenn es noch keinen Workspace gibt.

### DSL-Struktur (gültige Structurizr DSL)

```dsl
workspace "Title" "Description" {
    model {
        person "Name" "Beschreibung"
        softwareSystem "Name" "Beschreibung" {
            tags "Tag"
        }
        // Relationships
        person -> softwareSystem "Label" "Technology"
    }
    views {
        // View-Typ je nach Sektion:
        // Section 3: systemContext <system> "Key" "Description"
        // Section 5: container <system> "Key" "Description"
        // Section 5: component <container> "Key" "Description"
        // Section 6: dynamic <container|system> "Key" "Description" { a -> b "Schritt" ... }
        // Section 7: deployment * "EnvironmentName"

        styles {
            element "Tag" {
                background "#hex"
                color "#hex"
                fontSize N
            }
        }
    }
}
```

### Wichtige DSL-Regeln (aus Fehlern gelernt)

1. **Keine `=`- oder `-`-Kommentare** innerhalb von `model {}`, `container {}` oder `views {}` – diese führen zu Parse-Fehlern.
2. **Tags** werden als `tags "TagName"` im Element-Body gesetzt, z.B. `person "Name" "Beschreibung" { tags "Person" }`.
3. **Container** innerhalb eines Software-Systems referenziert man im Model mit `softwareSystem "X" { container "Name" ... }`.
4. **Deployment Views** brauchen `deploymentEnvironment "Name" { deploymentNode ... }` und der View wird deklariert als `deployment * "EnvironmentName" { include * autoLayout }`.
5. **`containerInstance`** kann nur für Container verwendet werden, nicht für Software-Systeme. Externe Systeme im Deployment müssen als Container definiert werden.
6. **Personen** haben automatisch das C4-Aussehen (Person-Symbol). Externe Systeme bekommen `shape Box`.

## Schritt 2.5: Export-Format wählen

**Standard ist PlantUML.** Prüfe zuerst ob `plantuml` auf dem System verfügbar ist:

```bash
which plantuml
```

- **PlantUML verfügbar →** verwende `structurizr_export-plantuml` und rendere SVGs mit `plantuml -tsvg`.
- **PlantUML nicht verfügbar →** frage den Benutzer: "PlantUML ist nicht installiert. Soll ich es installieren (`brew install plantuml`) oder sollen Mermaid-Diagramme verwendet werden?"
  - Bei Zustimmung: `brew install plantuml` ausführen und mit PlantUML fortfahren.
  - Bei Ablehnung: `structurizr_export-mermaid` verwenden. Mermaid-Diagramme werden direkt im Markdown-Codeblock gerendert (kein separater SVG-Export nötig).

## Schritt 3: Validieren + Exportieren

Nachdem die DSL geschrieben wurde:

1. **Validieren** mit `structurizr_validate` (DSL als String übergeben) – bei Fehlern korrigieren.
2. **PlantUML exportieren** mit `structurizr_export-plantuml` (DSL + viewKey).
3. **PUML-Datei schreiben**: Extrahiere das `definition`-Feld aus dem Export-Ergebnis. Die Definition enthält `\n` als Escape-Sequenzen – diese MÜSSEN durch echte Newlines ersetzt werden (das `definition`-Feld ist ein JSON-String mit escaped newlines).
4. **SVG rendern**: `plantuml -tsvg pfad/zu/datei.puml`

**Alternativ (Mermaid):**
- Exportiere mit `structurizr_export-mermaid` (DSL + viewKey).
- Extrahiere den `definition`-Wert und bette ihn als ```` ```mermaid ```` -Codeblock in die Markdown-Sektion ein (GitHub und IntelliJ rendern das direkt, kein separates SVG nötig).

**Dateinamen-Konvention:**
- `{sektion}-{view-key}.puml` und `{sektion}-{view-key}.svg`
- z.B. `03-context.svg`, `05-containers.svg`, `06-runtime-tier-anlegen.svg`

## Schritt 4: In Markdown einbinden

Füge die SVG-Referenz in die entsprechende arc42-Sektion ein. Verwende:

```markdown
### Beschreibender Titel

![Beschreibung](../diagrams/05-containers.svg)

Quelle: `diagrams/structurizr/workspace.dsl`, View `containers`
```

## Schritt 5: Review + Lint (automatisch am Ende)

Nachdem eine oder mehrere Sektionen bearbeitet wurden:

1. **Lade `arc42-lint` Skill** – prüft Cross-Referenz-Konsistenz:
   - IF-xx IDs zwischen Section 3 und Section 5
   - Q42-Tags zwischen Section 1 und Section 10
   - RISK-xx zwischen Section 9 und Section 11
   - Building-Block-Namen zwischen Section 5 und Section 7

2. **Lade `arc42-review` Skill** – prüft Inhalt, Vollständigkeit, Konsistenz der bearbeiteten Sektion(en).

3. **Präsentiere Ergebnisse** und frage: "Soll ich die gefundenen Issues jetzt fixen?"

## Konventionen & Empfehlungen

- **Ist + Ziel trennen**: Nur wenn wirklich beides dokumentiert wird, zwei Workspaces anlegen (`workspace-as-is.dsl`, `workspace-to-be.dsl`). Sonst ein Workspace für den Ist-Stand.
- **Konsistente Farben**:
  - Person: `#08427B` (dunkelblau), Text weiß
  - Eigenes System: `#1168BD` (blau), Text weiß
  - Container: `#438DD5` (hellblau), Text weiß
  - Externes System: `#B3D9FF` (pastellblau), Text schwarz, Shape Box
  - Component: `#85BBF0` (hellblau), Text schwarz
  - Deployment Node: `#E8E8E8` (hellgrau), Text schwarz
- **C3 Component** nur für repräsentative Container oder Domänen, nicht für jeden. Sind mehrere strukturell gleich, reicht einer als Beispiel.
- **Deployment Environment** immer mit aussagekräftigem Namen wie `"Produktion (Ist)"` oder `"Produktion (Ziel)"`.

## Fehlerbehebung Structurizr

| Fehler | Ursache | Lösung |
|---|---|---|
| `!element "Tag" not found` | `!element` im Model-Bereich | Tags in `styles {}`, nicht in `model {}` deklarieren |
| `= XYZ` unexpected tokens | Kommentare mit `=` im Model | Entfernen; Structurizr DSL erlaubt keine `=`-Kommentare |
| `containerInstance X does not exist` | Referenz auf SoftwareSystem statt Container | Externes System muss Container haben: `softwareSystem "X" { container "X" "..." }` |
| `The environment "Key" does not exist` | Falscher Environment-Name im deployment View | View-Schreibweise: `deployment * "EnvironmentName" { ... }` |
| `!include <C4/C4>` Error (C4 not found) | C4-Bibliothek nicht lokal installiert | Standard-PlantUML-Export verwenden (export-plantuml, nicht c4plantuml) |
| PlantUML-Befehl nicht gefunden | `which plantuml` schlägt fehl | `brew install plantuml` anbieten oder auf Mermaid wechseln |
