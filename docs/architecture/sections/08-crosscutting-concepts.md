# 8. Querschnittliche Konzepte

> Ist-Stand, nachträglich aus dem Code abgeleitet (Branch `loesung`).

## Modulgrenzen mit Sheriff

Das Frontend ist nach `domains/<domain>/<typ>` geschnitten (`feature`, `data`, `model`, `util`). Sheriff (`frontend/sheriff.config.ts`) prüft die Grenzen beim Linten:

- Eine Domäne darf nur aus sich selbst und aus `shared` importieren.
- Jeder Typ darf `model` und `util` nutzen. `feature` darf zusätzlich `data` und `ui` nutzen.
- `data` darf laut Konfiguration auch `feature` und `ui` nutzen (Kommentar dort: „z. B. ein Service, der einen Dialog öffnet“). Damit ist die Richtung feature ↔ data nicht erzwungen.
- Die Konfiguration nennt Domänen (`controlling`, im `AGENTS.md` auch `staff`), die es im Code nicht gibt.

Querbezüge zwischen Domänen laufen über **Router-Links** oder über die **REST-API**, nie über Imports. Siehe [ADR-004](../adr/adr-004-sheriff-fuer-domaenengrenzen.md).

## Zustand mit NgRx Signal Store

Jede Domäne hat einen eigenen Store in `data/`. Der gemeinsame Baustein `withCallStatus` liefert den Ladezustand (`loading`, `loaded`, `error`). Komponenten lesen Signale, alle Komponenten nutzen `OnPush`, die App läuft ohne Zone.js.

## Validierung

Die Pflichtfelder werden doppelt geprüft: im Formular (Angular Forms) und in der API per Bean Validation (`@NotBlank` auf `name` und `species`). Maßgeblich ist die API.

## Internationalisierung

Alle sichtbaren Texte laufen über Transloco. Deutsch ist Standard, Englisch die zweite Sprache (`frontend/public/i18n/de.json`, `en.json`).

## Persistenz

Eine Entity (`Animal`) im Active-Record-Stil von Panache. Das Schema entsteht bei jedem Start neu, Startdaten kommen aus `import.sql` ([ADR-001](../adr/adr-001-h2-in-memory.md)).

## Spezifikation mit OpenSpec

Das fachliche Verhalten ist in `openspec/specs/<capability>/spec.md` beschrieben (Requirements und Szenarien). Änderungen laufen als Change unter `openspec/changes/`. Die REST-Tests (`@QuarkusTest`, RestAssured) sind die Abnahmekriterien eines Changes.
