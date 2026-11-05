# Design

## Context

Das Feld `notes` zieht sich durch alle Schichten: Spalte `notes` in der Tabelle `animals` (Seed-Daten in `import.sql`), öffentliches Feld der Entity `Animal`, die direkt als JSON-Body für `GET`, `POST` und `PUT /animals` dient, Kopie in `AnimalResource.updateAnimal`, die Frontend-Modelle `Animal` und `AnimalCreateDto` sowie je ein Feld in `animal-profile`, `animal-create` und `animal-edit`. Auch `DashboardResourceTest` schreibt per Native Query in die Spalte `notes`. Das Schema entsteht per `drop-and-create` bei jedem Start neu. Motivation siehe proposal.md.

Die Oberfläche nennt das Tierprofil heute „Tierdetails“ (Titel), „Tierprofil“ (Eyebrow im Profil und im Bearbeitungsformular, Ladehinweis, Fehlertexte) und „Profil anzeigen“ (Dashboard).

## Goals / Non-Goals

**Goals:**
- `notes` verschwindet vollständig aus Datenmodell, API, Oberfläche und Übersetzungen.
- Alle sichtbaren Bezeichnungen des Tierprofils lauten „Steckbrief“ bzw. „Fact sheet“.

**Non-Goals:**
- Kein Ersatz für die Notizen (strukturierte Beobachtungen folgen in einem eigenen Change).
- Keine Umbenennung von Routen, Komponenten, Selektoren, Dateien oder Transloco-Schlüsseln (`animalProfile.*` bleibt).
- Keine Datenmigration oder Sicherung der bestehenden Notizen.

## Decisions

**Feld aus der Entity entfernen statt nur aus dem JSON ausblenden.** `Animal.notes` wird gelöscht; durch `drop-and-create` fehlt die Spalte danach im Schema. Alternative `@JsonIgnore` bei bleibender Spalte verworfen: Die Daten werden ohnehin nicht übernommen, eine tote Spalte wäre nur Ballast.

**Mitgeschicktes `notes` ignorieren, nicht mit `400` ablehnen.** Quarkus konfiguriert Jackson standardmäßig mit `fail-on-unknown-properties=false`; unbekannte Felder fallen beim Deserialisieren weg. Das hält alte Clients lauffähig und braucht keinen Code. Die Tests für „Mitgeschickte Notizen werden ignoriert“ sichern das Verhalten ab. Alternative strikte Ablehnung verworfen, weil sie eine globale Konfigurationsänderung bedeutet, die alle Endpunkte trifft.

**„Steckbrief“ nur über Übersetzungstexte.** Geändert werden ausschließlich Werte in `de.json` und `en.json`:

| Schlüssel | Deutsch | Englisch |
|---|---|---|
| `animalProfile.title` | Steckbrief | Fact sheet |
| `animalProfile.eyebrow` | Tierbestand | Animal inventory |
| `animalProfile.loading` | Steckbrief wird geladen | Loading fact sheet |
| `animalProfile.error.title` | Steckbrief konnte nicht geladen werden | Could not load fact sheet |
| `animalProfile.error.description` | Beim Laden des Steckbriefs ist ein Fehler aufgetreten. | An error occurred while loading the fact sheet. |
| `animalEdit.eyebrow` | Steckbrief | Fact sheet |
| `dashboard.actions.viewProfile` | Steckbrief anzeigen | View fact sheet |

Die Eyebrow des Steckbriefs wird zu „Tierbestand“ wie in der Tierliste, damit über dem Titel nicht zweimal „Steckbrief“ steht. Entfernt werden `animalProfile.fields.notes`, `animalCreate.fields.notes` und `animalEdit.fields.notes`.

## Risks / Trade-offs

- [Externe Clients lesen oder schreiben `notes`] → Breaking Change in proposal.md markiert; Schreibzugriffe laufen dank Ignorieren weiter, Lesezugriffe erhalten das Feld nicht mehr.
- [Gespeicherte Notizen gehen verloren] → Bewusste Entscheidung; bei H2 mit `drop-and-create` ohnehin keine dauerhaften Daten.
- [Spec-Texte außerhalb dieses Changes sprechen weiter vom „Tierprofil“] → Requirement-Namen bleiben laut Auftrag; der Begriff kann in einem eigenen Change vereinheitlicht werden.

## Migration Plan

Keine Datenmigration: Neustart erzeugt das Schema ohne Spalte `notes` und lädt die angepassten Seed-Daten. Rollback durch Zurücksetzen des Changes; die Notizen der Seed-Daten kommen damit zurück.
