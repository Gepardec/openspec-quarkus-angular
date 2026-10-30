# Design

## Context

Das Feld `notes` zieht sich durch alle Schichten: Spalte `notes` der Tabelle `animals` (Entity `Animal`, Schema per `drop-and-create`, Seed-Daten in `import.sql`), JSON-Feld in `GET`, `POST` und `PUT` von `/animals`, Modelle `Animal` und `AnimalCreateDto` im Frontend, Anzeige im Tierprofil und Textarea in den Formularen `animal-create` und `animal-edit`, Übersetzungsschlüssel unter `animalProfile`, `animalCreate` und `animalEdit`. `GET /dashboard/spotlight` liefert mit `SpotlightResponse` bereits kein `notes`. Motivation siehe proposal.md – Why; Anforderungen siehe die Delta-Specs unter `specs/`.

## Goals / Non-Goals

**Goals:**
- `notes` vollständig entfernen, sodass kein Code, keine Spalte und kein Übersetzungsschlüssel zurückbleibt.

**Non-Goals:**
- Ersatz durch strukturierte Beobachtungen; das ist Gegenstand eines späteren Changes.
- Sichern oder Exportieren der vorhandenen Notizen.

## Decisions

- **Feld an der Entity entfernen statt ausblenden**: `notes` wird aus `Animal` gelöscht; da die Entity direkt als JSON ausgeliefert und entgegengenommen wird, verschwindet das Feld damit aus allen Antworten von `/animals`. Alternative: Feld behalten und per `@JsonIgnore` ausblenden – ließe tote Daten in der Datenbank zurück, die niemand mehr pflegt.
- **Mitgesendetes `notes` wird ignoriert, nicht abgelehnt**: Quarkus REST mit Jackson ignoriert unbekannte JSON-Felder standardmäßig; alte Clients, die `notes` noch senden, erhalten weiterhin `201` bzw. `200`. Alternative: `400` bei unbekannten Feldern – strenger, bricht aber bestehende Clients ohne fachlichen Gewinn.
- **Keine Datenmigration**: Das Schema entsteht per `drop-and-create` beim Start neu; die Spalte entfällt mit dem Feld. In `import.sql` und im nativen Insert von `DashboardResourceTest` wird `notes` aus der Spaltenliste entfernt.
- **Frontend in einem Zug anpassen**: `notes` entfällt aus `Animal`, `AnimalCreateDto` und `initialAnimal`; damit meldet der Compiler jede verbliebene Verwendung in Templates und Komponenten. Die zugehörigen Übersetzungsschlüssel werden in beiden Sprachen gelöscht.

## Risks / Trade-offs

- [Vorhandene Notizen gehen verloren] → Bewusst so entschieden (siehe proposal.md); die Inhalte gelten als unzuverlässig.
- [Externe Clients lesen oder schreiben `notes`] → Breaking Change in proposal.md gekennzeichnet; schreibende Clients brechen nicht, weil das Feld ignoriert wird.
