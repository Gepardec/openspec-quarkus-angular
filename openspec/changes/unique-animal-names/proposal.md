# Proposal

## Why

Tiere werden im Zoo-Alltag über ihren Namen angesprochen und wiedergefunden. Heute lassen sich jedoch beliebig viele Tiere mit demselben Namen anlegen oder auf einen bereits vergebenen Namen umbenennen. Das führt zu Verwechslungen in Liste, Profil und Dashboard.

## What Changes

- Der Name eines Tiers MUST eindeutig sein. Die Regel gilt beim Anlegen (`POST /api/animals`) und beim Bearbeiten (`PUT /api/animals/{id}`). Beim Bearbeiten zählt das bearbeitete Tier selbst nicht als Konflikt.
- Der Vergleich berücksichtigt Groß-/Kleinschreibung: „Leo“ und „leo“ sind unterschiedliche Namen.
- Führende und abschließende Leerzeichen werden vor Prüfung und Speicherung serverseitig entfernt. „ Leo “ wird als „Leo“ gespeichert und kollidiert mit einem bestehenden „Leo“.
- Ist der Name bereits vergeben, antwortet der Server mit `409 Conflict`. Auch gleichzeitige Anfragen mit demselben Namen dürfen kein Duplikat erzeugen.
- Die Formulare zum Anlegen und Bearbeiten zeigen bei einem Namenskonflikt eine Fehlermeldung direkt am Namensfeld an (de/en).

**Nicht Teil dieses Changes:**

- Keine Prüfung des Namens bereits während der Eingabe (kein Live-Check, kein zusätzlicher Endpoint).
- Keine Migration oder Bereinigung bestehender Daten: Die Datenbank wird bei jedem Start neu erzeugt, und die Seed-Daten enthalten weder doppelte Namen noch Leerzeichen am Rand.
- Keine Eindeutigkeitsregeln für andere Felder oder andere Domänen (Gehege, Personal).

## Capabilities

### New Capabilities

- `animal-management`: Verwaltung der Tiere des Zoos (Anlegen, Bearbeiten, Löschen, Anzeigen) inklusive der Regeln, die für Tierdaten gelten. Dieser Change führt die Capability mit der Anforderung an eindeutige Tiernamen ein.

### Modified Capabilities

_Keine._

## Impact

- **Backend:** `Animal` (Eindeutigkeit des Namens auf Datenbankebene), `AnimalResource` (Trimmen, Konfliktprüfung bei `POST` und `PUT`, `409 Conflict`), `AnimalResourceTest`.
- **API:** `POST /api/animals` und `PUT /api/animals/{id}` können neu mit `409 Conflict` antworten.
- **Frontend:** `AnimalStore` (Konflikt von anderen Fehlern unterscheiden), Komponenten `animal-create` und `animal-edit` (Fehleranzeige am Namensfeld), Transloco-Übersetzungen (de/en).
- **Daten:** `import.sql` bleibt unverändert, darf aber künftig keine doppelten Namen enthalten.
