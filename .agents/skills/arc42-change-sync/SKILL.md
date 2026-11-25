---
name: arc42-change-sync
description: >
  Synchronisiert arc42-Dokumentation mit OpenSpec-Änderungen.
  Verwende diesen Skill NACH openspec-verify-change und VOR openspec-archive-change,
  um sicherzustellen, dass die arc42-Architekturdokumentation konsistent mit den
  implementierten Änderungen ist.
  Trigger bei: "arc42 sync", "arc42 dokumentation anpassen", "arc42 aktualisieren",
  "dokumentation nachbauen", "architekturdoku updaten", "arc42 nachziehen",
  oder wenn der User nach openspec-verify-change fragt "soll ich noch die
  arc42-Doku prüfen?".
  Dieser Skill wird NICHT automatisch von openspec-archive-change getriggert.
  Der User entscheidet bewusst, ob ein arc42-Sync nötig ist.
  Dieser Skill ersetzt KEINE manuelle arc42-Pflege, sondern macht gezielt auf
  Inkonsistenzen aufmerksam und hilft sie zu beheben.
license: MIT
metadata:
  author: atu-lab
  version: "1.0"
---

# arc42-Change-Sync

Synchronisiert die arc42-Architekturdokumentation mit einem OpenSpec-Change.

## Ziel

Nach einem abgeschlossenen Change (implementiert + verified) soll dieser Skill
prüfen, ob Anpassungen an der arc42-Dokumentation nötig sind, und diese ggf.
vornehmen. Das verhindert, dass die Architekturdokumentation hinter der
Implementierung zurückbleibt.

## Wann diesen Skill verwenden

1. **Automatisch**: Immer, wenn `openspec-archive-change` geladen wird und
   eine arc42-Dokumentation im Projekt existiert (`docs/architecture/README.md` oder `docs/architecture/sections/`).
2. **Manuell**: Wenn der User sagt "arc42 sync", "Doku nachziehen",
   "Architekturdokumentation aktualisieren" o.ä.

## Workflow-Integration

```
                   ┌─────────────────────────┐
                   │ openspec-verify-change   │
                   └─────────┬───────────────┘
                             │
                   ┌─────────▼───────────────┐
                   │ arc42-change-sync       │ ← DU BIST HIER
                   │ (prüft & aktualisiert)   │
                   └─────────┬───────────────┘
                             │
                   ┌─────────▼───────────────┐
                   │ openspec-archive-change  │
                   └─────────────────────────┘
```

Der Skill wird NICHT automatisch zwischen verify und archive ausgeführt –
der User muss ihn aktiv laden oder du als Skill erkennst den Kontext.

## Ablauf

### Schritt 1: Change verstehen

Analysiere den aktuellen OpenSpec-Change:

1. Finde den Change-Namen aus dem Kontext (der User hat ihn bereits in der
   aktuellen Session verwendet, z.B. bei `openspec-verify-change`).
2. Lies die Change-Beschreibung:
   - `openspec/changes/<name>/proposal.md` (Was war das Ziel?)
   - `openspec/changes/<name>/<design|spec|tasks>.md` (Was wurde umgesetzt?)
   - Alle `.md`-Dateien im Change-Ordner und in `openspec/changes/<name>/specs/`
3. Extrahiere daraus:
   - **Betroffene Komponenten/Services** (Module, Klassen, APIs)
   - **Neue oder geänderte Schnittstellen**
   - **Geänderte Datenstrukturen oder Abläufe**
   - **Relevanz für Architektur**: Ist die Änderung architekturrelevant oder
     nur intern (z.B. Bugfix in einer Methode)?

### Schritt 2: arc42-Impact-Analyse

Bestimme, welche arc42-Sektionen von der Änderung betroffen sein könnten:

| Änderungstyp | Betroffene arc42-Sektion(en) |
|---|---|
| Neues Modul/Service | 5 (Bausteinsicht), 7 (Deployment), ggf. 3 (Kontext) |
| Neue Schnittstelle (API) | 3 (Kontext & Schnittstellen) |
| Geänderte Schnittstelle | 3 (Schnittstellentabelle aktualisieren) |
| Neuer externer Actor | 3 (Kontextdiagramm + Schnittstellen) |
| Neuer Building Block | 5 (Bausteinsicht Level 1/2) |
| Geänderte Deployment-Topologie | 7 (Deployment View) |
| Neues Querschnittskonzept | 8 (Crosscutting Concepts) |
| Sicherheitsrelevante Änderung | 8 (Security), ggf. 9 (ADR) |
| Performance-relevante Änderung | 10 (Quality Requirements) |
| Neues Risiko / Technical Debt | 11 (Risks & Technical Debt) |
| Neuer Fachbegriff | 12 (Glossary) |
| Reiner Bugfix (keine Architekturänderung) | Keine (nur prüfen & bestätigen) |

### Schritt 3: Prüfung durchführen

Für jede identifizierte betroffene Sektion:

1. Lese die entsprechende Datei in `docs/architecture/sections/`
2. Prüfe, ob die Dokumentation noch mit der implementierten Änderung
   übereinstimmt

**Fokussierte Prüffragen:**

- **Section 3 (Kontextabgrenzung):** Werden neue Schnittstellen (IF-xx) in der
  Tabelle in 3.2 aufgeführt? Sind entfernte Schnittstellen markiert?
- **Section 5 (Bausteinsicht):** Werden neue Module/Services in der
  Bausteintabelle aufgeführt? Sind die Beschreibungen konsistent?
- **Section 7 (Deployment):** Ist die Deployment-Topologie aktuell?
- **Section 9 (ADRs):** Wurde eine signifikante Architekturentscheidung getroffen,
  die ein ADR erfordert?
- **Weitere Sektionen:** Je nach Impact-Analyse.

### Schritt 4: Ergebnis präsentieren

Erstelle einen klaren Report:

```
## arc42-Sync Report

**Change:** <name>
**Impact:** <hoch/mittel/niedrig/keine>

### Geprüfte Sektionen:
| Sektion | Status | Aktion |
|---------|--------|--------|
| 03-context-and-scope | ✅ aktuell | – |
| 05-building-block-view | ⚠️ Update nötig | Neues Modul "xyz" fehlt |
| ... | ... | ... |

### Empfohlene Anpassungen:
1. **Section 5** – Neues Modul `atu-service-xyz` in Tabelle 5.1 ergänzen
2. **Section 3** – Schnittstelle IF-42 (xyz-API) in Tabelle 3.2 ergänzen

### Status: ⚠️ Handlungsbedarf / ✅ Alles aktuell / ℹ️ Nur Doku-Check
```

**Wichtig:** Der Skill macht Vorschläge und führt Änderungen NUR nach
Bestätigung durch den User durch. Er ist ein Assistent, kein automatischer
Überschreiber.

### Schritt 4a (automatisch): ADR-Bedarf aus Change-Design prüfen

Nach der Impact-Analyse prüfe automatisch, ob der Change architekturrelevante
Entscheidungen im Design-Dokument enthält, die noch kein ADR haben:

1. **Design-Dokument analysieren:** Lies `openspec/changes/<name>/design.md`.
   Suche nach Entscheidungen mit Kontext, Alternativen und Trade-offs
   (z.B. "### D1:", "**Entscheidung:**", "**Decision:**" Blöcke).

2. **Auf bestehende ADRs prüfen:** Liste die vorhandenen ADR-Dateien in
   `docs/architecture/adr/`. Prüfe, ob die Entscheidungen aus dem Design
   bereits als ADR dokumentiert sind.

3. **ADR-Bedarf melden:** Wenn Entscheidungen im Design-Dokument gefunden
   wurden, die noch kein ADR haben, nenne sie im Sync-Report unter
   "ADR-Bedarf" und biete an, sie mit dem `arc42-adr` Skill zu generieren.

Die Prüfung ist **informierend, nicht blockierend** — der User entscheidet,
ob ADRs erstellt werden sollen.

### Schritt 5: Änderungen umsetzen (optional, nach User-Bestätigung)

Wenn der User zustimmt:

1. **Für einfache Änderungen** (neue Zeile in Tabelle, aktualisierte
   Beschreibung): Führe sie direkt durch (edit der betroffenen Sektionsdatei).
2. **Für komplexe Änderungen** (neuer ADR, neues Diagramm): Lade den
   passenden arc42-section-N Skill, um die Sektion strukturiert zu befüllen.
   Verwende dazu den `arc42-with-structurizr` Skill, wenn auch Diagramme
   betroffen sind.
3. **Für neue Architekturentscheidungen**: Verwende den `arc42-adr` Skill,
   um ADRs im Nygard-Format als separate Markdown-Dateien in `docs/architecture/adr/`
   zu erstellen und Section 9 als Übersichtsseite zu aktualisieren.
   Der `arc42-adr` Skill extrahiert Entscheidungen automatisch aus dem
   Change-Design-Dokument (`design.md`).

## Konventionen für dieses Projekt

### Projekt-Struktur
- arc42 Einstieg: `docs/architecture/README.md`
- arc42 Sektionen: `docs/architecture/sections/`
  - `01-introduction-and-goals.md` bis `12-glossary.md`
- Diagramme: `docs/architecture/diagrams/`
- Structurizr: ein Workspace `docs/architecture/diagrams/structurizr/workspace.dsl` mit allen Views
- OpenSpec Changes: `openspec/changes/<name>/`
- OpenSpec Specs: `openspec/specs/<capability>/`

### Sprachkonvention
- Die arc42-Dokumentation ist auf Deutsch (arc42-Vorlage DE)
- Fachbegriffe, Bezeichner, Modul- und Servicenamen bleiben englisch

### Was ist architekturrelevant?
Nicht jede Code-Änderung erfordert ein arc42-Update. Als architekturrelevant
gelten:
- Neue Module oder Services
- Neue oder geänderte Schnittstellen zwischen Systemen/Komponenten
- Änderungen an der Deployment-Topologie
- Einführung neuer Technologien
- Änderungen an Sicherheitskonzepten
- Signifikante Refactorings (Strukturänderungen)
- Neue externe Abhängigkeiten

Nicht architekturrelevant (kein arc42-Update nötig):
- Bugfixes in bestehenden Komponenten (ohne Schnittstellenänderung)
- Interne Refactorings einer Methode/Klasse
- UI-Änderungen
- Konfigurationsänderungen

## Guardrails
- Ändere NIE arc42-Dokumentation ohne explizite Bestätigung des Users
- Bei Unsicherheit, ob eine Änderung architekturrelevant ist: frage nach
- Wenn der Change kein Proposal hat (z.B. legacy): frage den User nach
  einer Zusammenfassung der Änderungen
- Überschreibe keine manuell gepflegten Abschnitte – weise den User darauf hin
- Verwende `edit`-Tool für gezielte Änderungen, nicht `write` für ganze Dateien
