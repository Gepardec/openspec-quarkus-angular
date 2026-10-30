# Design

## Context

`AnimalResource` bietet `GET /animals`, `GET /animals/{id}` und `POST /animals`; `name` und `species` der Entity `Animal` sind per `@NotBlank` Pflichtfelder. Im Frontend gibt es das Erfassungsformular `animal-create` (Signal Forms, Modell `AnimalCreateDto`) und das Tierprofil unter `/animals/:id`, das das gewählte Tier über `selectAnimalById` und `selectedAnimal` aus dem `AnimalStore` liest. Motivation siehe proposal.md – Why; Anforderungen siehe `specs/animal-editing/spec.md`.

## Goals / Non-Goals

**Goals:**
- Dieselben Pflichtfeld-Regeln wie beim Erfassen, im Backend und im Formular.
- Das Bearbeitungsformular nutzt die bestehende Auswahl eines Tiers im `AnimalStore`, statt es erneut zu laden.

**Non-Goals:**
- Teilweise Aktualisierung einzelner Felder (`PATCH`).
- Erkennen gleichzeitiger Änderungen durch mehrere Personen.

## Decisions

- **`PUT` ersetzt alle fachlichen Felder**: Die Resource lädt das Tier per `Animal.findById(id)`, wirft `NotFoundException` (`404`), wenn es fehlt, übernimmt alle Felder aus dem mit `@Valid` geprüften Body und antwortet mit `200` und dem geänderten Tier. Verletzungen der Pflichtfelder beantwortet Bean Validation mit `400`. Alternative: `PATCH` mit Teilaktualisierung – das Formular sendet ohnehin immer alle Felder.
- **Eigene Komponente statt Wiederverwendung von `animal-create`**: `animal-edit` ist eine separate Komponente mit eigenem Template, die ebenfalls Signal Forms und `AnimalCreateDto` nutzt. Alternative: ein gemeinsames Formular für Erfassen und Bearbeiten – spart Markup, vermischt aber unterschiedliche Navigation und Ladezustände in einer Komponente.
- **Vorbelegung per `linkedSignal`**: Das Formularmodell ist ein `linkedSignal`, das aus `selectedAnimal` abgeleitet wird und bis zum Laden auf `initialAnimal` zurückfällt. So wird das Formular automatisch befüllt, sobald der Store das Tier kennt, bleibt aber lokal editierbar.
- **Aktualisieren im `AnimalStore`**: `AnimalService.updateAnimal` ruft `PUT /api/animals/{id}` auf; die Store-Methode `update` (`rxMethod`) übernimmt das Ergebnis per `upsertEntity` und navigiert zum Tierprofil. Liste und Profil zeigen die neuen Werte dadurch ohne erneutes Laden.
- **Route `/animals/:id/edit` und Aktion im Profil**: Die Route wird per `loadComponent` als Kindroute von `/animals` vor `/animals/:id` registriert; die ID kommt per Component Input Binding. Das Tierprofil erhält einen `mat-flat-button` „Bearbeiten“; Abbrechen im Formular ist ein `mat-stroked-button` mit `routerLink` auf `/animals/{id}`. Für eine unbekannte ID zeigt das Formular eine Karte „Tier nicht gefunden“ mit Link zur Tierliste.

## Risks / Trade-offs

- [Gleichzeitige Änderungen überschreiben sich gegenseitig (last write wins)] → Für die Workshop-App akzeptabel; optimistisches Locking kann später ergänzt werden.
- [Zwei Formulare mit sehr ähnlichem Markup] → Bewusst in Kauf genommen, damit jedes Formular für sich einfach bleibt.
