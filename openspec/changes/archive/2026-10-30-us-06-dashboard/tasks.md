# Tasks

## 1. Backend: Spotlight

- [x] 1.1 Entity `Animal` um das optionale Feld `funFact` (Spalte `fun_fact`) erweitern und in `import.sql` einen Fun Fact für das Spotlight-Tier ergänzen; prüfen, dass die App mit `./mvnw quarkus:dev` startet
- [x] 1.2 Konfigurationseigenschaft `dashboard.spotlight.animal-id` in `application.properties` ergänzen und `DashboardResource` mit `GET /dashboard/spotlight` und dem Record `SpotlightResponse` anlegen, das bei unbekannter ID `NotFoundException` wirft; prüfen, dass `GET /api/dashboard/spotlight` in der laufenden App das konfigurierte Tier liefert
- [x] 1.3 RestAssured-Tests (`@QuarkusTest`) für das Szenario „Konfiguriertes Tier existiert“ und – mit einem Testprofil, das eine unbekannte ID konfiguriert – für „Konfiguriertes Tier existiert nicht“ schreiben und mit `./mvnw test` verifizieren

## 2. Frontend: Datenzugriff Dashboard

- [x] 2.1 Modell `SpotlightResponse` und `SpotlightService` (`GET /api/dashboard/spotlight`) unter `src/app/domains/dashboard/` anlegen; mit `ng build` verifizieren
- [x] 2.2 `SpotlightStore` (NgRx Signal Store mit `withCallStatus` und den Computed Signals `loading` und `error`) mit der Methode `loadSpotlight` anlegen; mit `ng build` und `ng lint` (Sheriff-Grenzen) verifizieren

## 3. Frontend: Dashboard

- [x] 3.1 Komponente `spotlight-card` (`.ts`, `.html`, `.scss`, OnPush) unter `feature/internal/` mit Name, Art, Alter, Gehege, Fun Fact und Link zum Tierprofil anlegen; mit `ng build` verifizieren
- [x] 3.2 Komponente `dashboard-page` (`.ts`, `.html`, `.scss`, OnPush) anlegen, die das Spotlight beim Initialisieren lädt und Spinner, Hinweis oder Spotlight-Karte zeigt; manuell verifizieren, dass das Spotlight-Tier erscheint und der Link sein Profil öffnet
- [x] 3.3 Manuell verifizieren, dass das Dashboard bei einer unbekannten `dashboard.spotlight.animal-id` den Hinweis „Spotlight nicht verfügbar“ zeigt

## 4. Frontend: Startseite und Hauptnavigation

- [x] 4.1 Route `/dashboard` mit `loadComponent` in `app.routes.ts` registrieren und `/` auf `/dashboard` umleiten; manuell verifizieren, dass `http://localhost:8080/` das Dashboard zeigt
- [x] 4.2 Toolbar der App-Shell zur Hauptnavigation mit den Einträgen Dashboard und Tierliste (`routerLinkActive`) umbauen („Dashboard in der Hauptnavigation“, „Tierliste in der Hauptnavigation“) und das Logo auf das Dashboard verlinken; manuell verifizieren, dass beide Einträge auf jeder Seite sichtbar sind und zur jeweiligen Seite führen
- [x] 4.3 Alle sichtbaren Texte des Dashboards und der Hauptnavigation in `public/i18n/de.json` und `public/i18n/en.json` hinterlegen und manuell prüfen, dass in der laufenden App keine Übersetzungsschlüssel roh angezeigt werden
- [x] 4.4 `ng build` und `ng lint` ohne Fehler ausführen
