# ADR-002: Web-App und REST-API als ein Deployment (Quinoa)

**Status:** Accepted (nachträglich dokumentiert)

**Date:** 2026-11-25

## Kontext

*Kontext rekonstruiert, unbestätigt.* Frontend (Angular) und Backend (Quarkus) liegen im selben Repository. Für den Workshop soll ein Befehl die ganze Anwendung starten, ohne zweiten Dev-Server, Proxy-Konfiguration oder CORS.

Belegt im Code: Abhängigkeit `quarkus-quinoa`, `quarkus.quinoa.ui-dir=../frontend`, `quarkus.quinoa.enable-spa-routing=true`, REST-Wurzel `/api`.

## Entscheidung

Quarkus liefert die Angular-App über Quinoa aus. Im Dev-Modus startet Quinoa den Angular-Dev-Server und leitet an ihn weiter, im Build landet das Frontend im Quarkus-JAR. Die API liegt unter `/api`, alle anderen Pfade gehen an die SPA.

## Konsequenzen

- Positiv: Ein Prozess, ein Port, ein Befehl (`./mvnw quarkus:dev`).
- Positiv: Gleiche Origin für App und API, kein CORS.
- Negativ: Frontend und Backend lassen sich nicht unabhängig ausliefern oder skalieren.
- Negativ: Der Frontend-Build hängt am Maven-Build.

## Alternativen

| Alternative | Warum verworfen |
|-------------|-----------------|
| Getrennte Auslieferung (z. B. nginx + Quarkus) | *unbestätigt:* zwei Prozesse und Proxy-Konfiguration im Workshop |

## Implications

- Betroffene Bausteine (→ Section 5): Web-App, REST-API
- Qualitätsziele (→ Section 1.2): offen, vermutlich einfacher Start
- Neue Constraints (→ Section 2): REST-Endpunkte müssen unter `/api` liegen
- Risiken (→ Section 11): keine bekannten
