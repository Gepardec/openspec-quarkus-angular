# Design

## Context

Die Entity `Animal` (Panache Active Record) hat die Felder `name`, `species`, `age`, `enclosure` und `notes`; `AnimalResource` bietet bisher nur lesende Endpunkte. Im Frontend hält der `AnimalStore` alle Tiere als Entities und lädt sie beim Initialisieren; die Tierliste liegt unter `/animals`, das Tierprofil unter `/animals/:id`. Motivation siehe proposal.md – Why; Anforderungen siehe `specs/animal-registration/spec.md`.

## Goals / Non-Goals

**Goals:**
- Pflichtfelder an einer Stelle im Backend durchsetzen, damit auch direkte API-Aufrufe ohne Name oder Art abgelehnt werden.
- Ein Formular, das sich in die Feature-Struktur der Domäne `animals` einfügt und den bestehenden `AnimalStore` nutzt.

**Non-Goals:**
- Weitere Validierungen wie Wertebereiche für das Alter oder eine Auswahlliste für Gehege.
- Erkennen von Duplikaten.

## Decisions

- **Bean Validation an der Entity**: `name` und `species` erhalten `@NotBlank`; `POST /animals` nimmt die Entity mit `@Valid` entgegen. Verletzungen beantwortet Quarkus automatisch mit `400`. Alternative: manuelle Prüfung in der Resource – mehr Code und leicht zu vergessen, wenn später weitere schreibende Endpunkte hinzukommen.
- **`201 Created` mit `Location`**: Die Resource persistiert das Tier in einer `@Transactional`-Methode und antwortet mit `Response.created(...)`, dessen `Location` aus `UriInfo` auf `/animals/{id}` gebildet wird, und dem angelegten Tier im Body.
- **Formular mit Angular Signal Forms**: Die Komponente `animal-create` hält die Formulardaten in einem `signal` vom Typ `AnimalCreateDto` und baut daraus mit `form()` das Formular; `required()` markiert Name und Art. Die Fehlermeldung erscheint, sobald ein Pflichtfeld berührt und ungültig ist. Beim Absenden ruft die Submission-Action die Store-Methode auf; ungültige Formulare werden nicht abgeschickt. Alternative: Reactive Forms – passen weniger gut zur signalbasierten Architektur ohne Zone.js.
- **`AnimalCreateDto` als eigenes Modell**: Die Formulardaten ohne `id` liegen als Typ `AnimalCreateDto` mit Startwerten `initialAnimal` (leere Strings, `age: null`) unter `model/`.
- **Anlegen im `AnimalStore`**: `AnimalService.createAnimal` ruft `POST /api/animals` auf; die Store-Methode `create` (`rxMethod`) fügt das Ergebnis per `upsertEntity` hinzu und navigiert danach zur Tierliste. Die Tierliste zeigt das neue Tier dadurch ohne erneutes Laden.
- **Route `/animals/new` und Aktion in der Liste**: Die Route wird per `loadComponent` als Kindroute von `/animals` vor `/animals/:id` registriert, damit `new` nicht als ID interpretiert wird. Die Tierliste erhält im Kopfbereich einen `mat-flat-button` „Tier hinzufügen“; Abbrechen im Formular ist ein `mat-stroked-button` mit `routerLink` auf `/animals`.

## Risks / Trade-offs

- [Name oder Art nur aus Leerzeichen besteht im Frontend die Pflichtprüfung, wird aber vom Backend mit `400` abgelehnt] → Für die Workshop-App akzeptabel; der Fehler landet im Ladezustand des Stores.
- [Die Entity dient zugleich als Request-Modell, ein Client könnte eine `id` mitsenden] → Panache vergibt die ID beim Persistieren; bei Bedarf kann später ein eigenes Request-DTO eingeführt werden.
