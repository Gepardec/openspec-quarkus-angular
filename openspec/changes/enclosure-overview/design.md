# Design

## Context

Das Gehege ist heute das Freitext-Feld `enclosure` der Entity `Animal` (nullable, ohne Validierung). Es gibt keinen Endpunkt, der Tiere nach Gehege zusammenfasst; das Frontend kennt die Domänen `animals`, `dashboard` und `shared`. In den Seed-Daten (`import.sql`) lebt jedes Tier in einem eigenen Gehege. Motivation siehe proposal.md – Why; Anforderungen siehe `specs/enclosure-overview/spec.md`.

## Goals / Non-Goals

**Goals:**
- Die Gruppierung liegt vollständig im Backend, damit RestAssured-Tests sie als Vertrag abdecken.
- Die Gehegeübersicht ist eine eigene Frontend-Domäne ohne direkte Abhängigkeit von `domain:animals` (Sheriff-Grenzen).

**Non-Goals:**
- Normalisierung von Gehegenamen über das Ausblenden leerer Namen hinaus (z. B. Groß-/Kleinschreibung oder Leerzeichen am Rand); „Savanne“ und „savanne“ bleiben zwei Gehege.
- Änderungen an den Seed-Daten.

## Decisions

- **Eigene Ressource `EnclosureResource` unter `/enclosures`**: Ein eigener Pfad statt `GET /animals?groupBy=enclosure`, weil die Übersicht eine eigene Ressource (Gehege) mit eigenem Antwortmodell liefert. Die Resource lädt per Panache alle Tiere mit nicht leerem Gehege, sortiert nach Gehege und Name (`Animal.list("enclosure is not null and trim(enclosure) <> '' order by enclosure, name")`), und gruppiert sie in Java in einer `LinkedHashMap`, die die Sortierung erhält. Alternative: Gruppierung per `GROUP BY` in JPQL – liefert nur Zählungen, die Tiere bräuchten eine zweite Abfrage.
- **Antwort-Records statt Entity**: `EnclosureResponse(String name, int animalCount, List<EnclosureAnimalResponse> animals)` und `EnclosureAnimalResponse(Long id, String name, String species)`, damit die Übersicht nicht von weiteren Tierfeldern wie `age` oder `funFact` abhängt. `animalCount` wird aus der Größe der Liste berechnet und ist redundant, macht den Vertrag für Clients aber explizit. Alternative: nur `animals` liefern und im Frontend zählen – die Zahl wäre dann nicht durch die Backend-Tests abgedeckt.
- **Domäne `enclosures` im Frontend**: Modell `Enclosure`/`EnclosureAnimal`, `EnclosureService` (`GET /api/enclosures`) und `EnclosureStore` (NgRx Signal Store mit `withCallStatus` aus `domain:shared` und einer Liste der Gehege im State) unter `src/app/domains/enclosures/`. Der Store lädt nicht beim Erzeugen, sondern die Seite stößt das Laden bei jedem Öffnen an, damit Änderungen an Tieren sofort sichtbar sind. Alternative: Gehege im Frontend aus dem `AnimalStore` ableiten – widerspricht der Entscheidung für den Backend-Endpunkt und den Sheriff-Grenzen.
- **Seite `enclosure-overview`**: Feature-Komponente unter `feature/enclosure-overview/`, je Gehege eine `mat-card` mit Name, Anzahl (übersetzt mit Pluralform über einen Parameter) und einer `mat-nav-list` der Tiere; jeder Eintrag verlinkt per `routerLink` auf `/animals/{id}`. Die Verknüpfung zum Tierprofil läuft nur über die URL. Während des Ladens ein Spinner, bei leerer Liste eine Hinweiskarte wie in der Tierliste.
- **Navigation**: Route `/enclosures` per `loadComponent` in `app.routes.ts`; die Hauptnavigation erhält einen dritten `mat-button` „Gehege“ mit Icon und `routerLinkActive`. Wie bei Dashboard und Tierliste beschreibt die Capability der Zielseite ihren Navigationseintrag.

## Risks / Trade-offs

- [Tippfehler oder abweichende Schreibweisen erzeugen scheinbar verschiedene Gehege] → Bewusst in Kauf genommen, solange Gehege Freitext sind; eine eigene Gehege-Entität ist außerhalb des Umfangs.
- [Die Sortierung der Datenbank vergleicht Zeichen binär, Umlaute am Wortanfang landen hinter „Z“] → Für die Übersicht akzeptabel; die Sortierung ist im Vertrag als alphabetisch nach Name beschrieben und kann später auf eine Collation umgestellt werden.
- [In den Seed-Daten hat jedes Gehege genau ein Tier] → Die Zählung wird durch die RestAssured-Tests mit mehreren Tieren pro Gehege abgedeckt; für den manuellen Check ein zweites Tier in ein bestehendes Gehege eintragen.
