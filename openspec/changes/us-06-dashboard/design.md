# Design

## Context

Die App besteht bisher nur aus der Domäne `animals` (Tierliste, Profil, Erfassen, Bearbeiten, Löschen). Die App-Shell enthält eine Material-Toolbar mit einem einzelnen Navigationslink auf `/animals`; für den Pfad `/` gibt es keine eigene Seite. Die Entity `Animal` wird direkt als JSON ausgeliefert. Motivation siehe proposal.md – Why; Anforderungen siehe `specs/dashboard/spec.md` und `specs/animal-list/spec.md`.

## Goals / Non-Goals

**Goals:**
- Das Dashboard als eigene Domäne, die nicht direkt von `domain:animals` abhängt (Sheriff-Grenzen).
- Das Spotlight-Tier ohne Codeänderung umstellbar machen.

**Non-Goals:**
- Auswahl des Spotlight-Tiers in der Oberfläche, zufällige oder zeitgesteuerte Rotation.
- Bearbeiten des Fun Facts in den Formularen für Erfassen und Bearbeiten.
- Weitere Kacheln oder Kennzahlen auf dem Dashboard.

## Decisions

- **Fun Fact als Feld der Entity**: `Animal` erhält das nullable Feld `funFact` (Spalte `fun_fact`); `import.sql` ergänzt einen Fun Fact für das Spotlight-Tier. Alternative: Fun Fact in der Konfiguration – würde Tierdaten außerhalb der Datenbank pflegen.
- **Konfiguration per `@ConfigProperty`**: `DashboardResource` liest die Tier-ID aus `dashboard.spotlight.animal-id` in `application.properties`. Die Eigenschaft lässt sich wie jede Quarkus-Konfiguration per Umgebungsvariable oder Testprofil überschreiben. Alternative: Spotlight-Kennzeichen am Tier in der Datenbank – bräuchte eine Oberfläche oder SQL zum Umstellen.
- **Eigenes Antwortmodell `SpotlightResponse`**: `GET /dashboard/spotlight` liefert einen Record mit genau `id`, `name`, `species`, `age`, `enclosure` und `funFact` statt der ganzen Entity, damit das Dashboard nicht von Notizen und künftigen Tierfeldern abhängt. Gibt es das Tier nicht, wirft die Resource `NotFoundException` (`404`).
- **Domäne `dashboard` im Frontend**: Modell `SpotlightResponse`, `SpotlightService` (`GET /api/dashboard/spotlight`) und `SpotlightStore` (NgRx Signal Store mit `withCallStatus` aus `domain:shared` sowie den Computed Signals `loading` und `error`) liegen unter `src/app/domains/dashboard/`. Die Seite `dashboard-page` lädt das Spotlight beim Initialisieren und zeigt je nach Zustand einen Spinner, eine Hinweiskarte „Spotlight nicht verfügbar“ oder die Spotlight-Karte.
- **Spotlight-Karte als internes Feature**: `spotlight-card` unter `feature/internal/` zeigt die Angaben als Beschreibungsliste in einer `mat-card` und verlinkt per `routerLink` auf `/animals/{id}`. Die Verknüpfung zum Tierprofil läuft nur über die URL, nicht über einen Import aus `domain:animals`.
- **Navigation bleibt bei den fachlichen Capabilities**: Jeder Navigationseintrag wird in der Capability seiner Zielseite beschrieben – „Tierliste in der Hauptnavigation“ in `animal-list`, „Dashboard in der Hauptnavigation“ in `dashboard`. Alternative: eine eigene Capability `app-navigation` – lohnt sich erst, wenn die Navigation eigenes Verhalten über die einzelnen Einträge hinaus bekommt.
- **Startseite und Hauptnavigation**: `app.routes.ts` leitet `/` auf `/dashboard` um und lädt das Dashboard per `loadComponent`. Die Toolbar der App-Shell wird zur Hauptnavigation (`<nav>` mit übersetztem `aria-label`) mit den Einträgen Dashboard und Tierliste, jeweils als `mat-button` mit Icon und `routerLinkActive` für den aktiven Eintrag; das Logo verlinkt ebenfalls auf das Dashboard.

## Risks / Trade-offs

- [Die konfigurierte ID passt nicht zu den Daten, z. B. nachdem das Tier gelöscht wurde] → Der Endpunkt antwortet mit `404`, das Dashboard zeigt einen Hinweis statt eines Fehlers.
- [Fun Facts lassen sich nur über die Datenbank pflegen] → Bewusst außerhalb des Umfangs; die Formulare können später erweitert werden.
