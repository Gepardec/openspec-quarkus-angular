# Design

## Context

Das Gehege ist heute das Freitext-Feld `enclosure` der Entity `Animal` (nullable, ohne Validierung). Es gibt keinen Endpunkt, der Tiere nach Gehege zusammenfasst; das Frontend kennt die Domänen `animals`, `dashboard` und `shared`. In den Formularen `animal-create` und `animal-edit` der Domäne `animals` ist das Gehege ein einfaches `matInput` (Signal Forms, `[formField]`) ohne Vorschläge. In den Seed-Daten (`import.sql`) lebt jedes Tier in einem eigenen Gehege. Motivation siehe proposal.md – Why; Anforderungen siehe `specs/enclosure-overview/spec.md` sowie die MODIFIED Requirements in `specs/animal-registration/spec.md` und `specs/animal-editing/spec.md`.

## Goals / Non-Goals

**Goals:**
- Die Gruppierung liegt vollständig im Backend, damit RestAssured-Tests sie als Vertrag abdecken.
- Die Gehegeübersicht ist eine eigene Frontend-Domäne ohne direkte Abhängigkeit von `domain:animals` (Sheriff-Grenzen).
- Die Formulare zum Erfassen und Bearbeiten schlagen bestehende Gehege vor, damit neue Schreibvarianten seltener entstehen, ohne einen neuen Endpunkt oder eine Änderung am Datenmodell.

**Non-Goals:**
- Normalisierung von Gehegenamen über das Ausblenden leerer Namen hinaus (z. B. Groß-/Kleinschreibung oder Leerzeichen am Rand); „Savanne“ und „savanne“ bleiben zwei Gehege.
- Änderungen an den Seed-Daten.
- Vereinheitlichen bestehender Gehegenamen und eine Gruppierung unabhängig von Groß-/Kleinschreibung im Backend; die Vorschläge verhindern nur neue Varianten.
- Ein Pflicht-Auswahlfeld: Das Gehege bleibt Freitext, ein neues Gehege lässt sich weiterhin eintippen.

## Decisions

- **Eigene Ressource `EnclosureResource` unter `/enclosures`**: Ein eigener Pfad statt `GET /animals?groupBy=enclosure`, weil die Übersicht eine eigene Ressource (Gehege) mit eigenem Antwortmodell liefert. Die Resource lädt per Panache alle Tiere mit nicht leerem Gehege, sortiert nach Gehege und Name (`Animal.list("enclosure is not null and trim(enclosure) <> '' order by enclosure, name")`), und gruppiert sie in Java in einer `LinkedHashMap`, die die Sortierung erhält. Alternative: Gruppierung per `GROUP BY` in JPQL – liefert nur Zählungen, die Tiere bräuchten eine zweite Abfrage.
- **Antwort-Records statt Entity**: `EnclosureResponse(String name, int animalCount, List<EnclosureAnimalResponse> animals)` und `EnclosureAnimalResponse(Long id, String name, String species)`, damit die Übersicht nicht von weiteren Tierfeldern wie `age` oder `funFact` abhängt. `animalCount` wird aus der Größe der Liste berechnet und ist redundant, macht den Vertrag für Clients aber explizit. Alternative: nur `animals` liefern und im Frontend zählen – die Zahl wäre dann nicht durch die Backend-Tests abgedeckt.
- **Domäne `enclosures` im Frontend**: Modell `Enclosure`/`EnclosureAnimal`, `EnclosureService` (`GET /api/enclosures`) und `EnclosureStore` (NgRx Signal Store mit `withCallStatus` aus `domain:shared` und einer Liste der Gehege im State) unter `src/app/domains/enclosures/`. Der Store lädt nicht beim Erzeugen, sondern die Seite stößt das Laden bei jedem Öffnen an, damit Änderungen an Tieren sofort sichtbar sind. Alternative: Gehege im Frontend aus dem `AnimalStore` ableiten – widerspricht der Entscheidung für den Backend-Endpunkt und den Sheriff-Grenzen.
- **Seite `enclosure-overview`**: Feature-Komponente unter `feature/enclosure-overview/`, je Gehege eine `mat-card` mit Name, Anzahl (übersetzt mit Pluralform über einen Parameter) und einer `mat-nav-list` der Tiere; jeder Eintrag verlinkt per `routerLink` auf `/animals/{id}`. Die Verknüpfung zum Tierprofil läuft nur über die URL. Während des Ladens ein Spinner, bei leerer Liste eine Hinweiskarte wie in der Tierliste.
- **Gehegevorschläge aus `GET /enclosures`**: Die Formulare nutzen den Endpunkt dieses Changes und davon nur die Felder `name`; es gibt keinen eigenen Endpunkt für Gehegenamen. Damit `domain:animals` nicht von `domain:enclosures` abhängt (Sheriff), erhält der `AnimalService` eine Methode `getEnclosureNames()` (`GET /api/enclosures`, abgebildet auf die Namen) und der `AnimalStore` den State `enclosureNames` mit der Methode `loadEnclosureNames`. Beide Formulare stoßen das Laden beim Öffnen an. Schlägt das Laden fehl, bleibt die Liste leer und das Feld funktioniert als Freitext weiter. Alternativen: den `EnclosureService` nach `domain:shared` verschieben – macht das Modell der Übersicht zum Allgemeingut, obwohl die Formulare nur Namen brauchen; ein eigener Endpunkt `GET /enclosures/names` – vom Fachbereich ausgeschlossen.
- **`mat-autocomplete` am Feld Gehege**: Das bestehende `matInput` erhält `[matAutocomplete]`; ein `computed` filtert `enclosureNames` nach dem aktuellen Feldwert (enthält, ohne Groß-/Kleinschreibung) und liefert bei leerem Feld alle Namen. Die Auswahl übernimmt den Namen in genau der Schreibweise des Backends. Weil `mat-autocomplete` freie Eingaben nicht verwirft, bleibt ein neuer Name ohne Zusatzlogik erlaubt; Validierung und Speichern ändern sich nicht. Die Filterung im Frontend unabhängig von Groß-/Kleinschreibung ändert nichts an der Gruppierung im Backend. Alternative: `mat-select` – würde kein neues Gehege zulassen.
- **Navigation**: Route `/enclosures` per `loadComponent` in `app.routes.ts`; die Hauptnavigation erhält einen dritten `mat-button` „Gehege“ mit Icon und `routerLinkActive`. Wie bei Dashboard und Tierliste beschreibt die Capability der Zielseite ihren Navigationseintrag.

## Risks / Trade-offs

- [Tippfehler oder abweichende Schreibweisen erzeugen scheinbar verschiedene Gehege] → Die Vorschläge in den Formularen machen neue Varianten seltener, verhindern sie aber nicht, solange Gehege Freitext sind; eine eigene Gehege-Entität ist außerhalb des Umfangs.
- [Bereits vorhandene Varianten wie „Savanne 1“ und „savanne 1“ erscheinen beide als Vorschlag] → Bewusst in Kauf genommen; bestehende Daten werden nicht vereinheitlicht, betroffene Tiere lassen sich über das Bearbeitungsformular auf eine Schreibweise umstellen.
- [Nur belegte Gehege werden vorgeschlagen; ein Gehege, dessen letztes Tier entfernt wurde, verschwindet aus den Vorschlägen] → Folgt daraus, dass es keine Gehege-Entität gibt; der Name lässt sich wieder eintippen.
- [Die Sortierung der Datenbank vergleicht Zeichen binär, Umlaute am Wortanfang landen hinter „Z“] → Für die Übersicht akzeptabel; die Sortierung ist im Vertrag als alphabetisch nach Name beschrieben und kann später auf eine Collation umgestellt werden.
- [In den Seed-Daten hat jedes Gehege genau ein Tier] → Die Zählung wird durch die RestAssured-Tests mit mehreren Tieren pro Gehege abgedeckt; für den manuellen Check ein zweites Tier in ein bestehendes Gehege eintragen.
