# Proposal

## Why

Im Tierprofil sieht man zwar, in welchem Gehege ein Tier lebt, aber es gibt keinen schnellen Überblick darüber, welche Tiere in einem bestimmten Gehege leben und wie viele es sind. Zoo-Manager:innen müssen dafür heute jedes Tier einzeln öffnen.

## What Changes

- Neuer REST-Endpunkt `GET /enclosures`, der die registrierten Tiere nach ihrem Gehege gruppiert liefert: je belegtem Gehege der Name, die Zahl seiner Tiere und die Tiere darin. Tiere ohne Gehege tauchen nicht auf.
- Neue Seite „Gehegeübersicht“ unter `/enclosures`, die jedes belegte Gehege mit der Zahl seiner Tiere und den Tieren darin anzeigt; jedes Tier verlinkt auf sein Tierprofil. Gibt es kein belegtes Gehege, zeigt die Seite einen Hinweis.
- Neuer Eintrag „Gehege“ in der Hauptnavigation, der zur Gehegeübersicht führt.
- Das Gehege bleibt ein Freitext-Attribut am Tier; es entsteht keine eigene Gehege-Entität und das Datenmodell ändert sich nicht.
- Nicht Teil dieses Changes: Gehege anlegen oder bearbeiten, Kapazitäten von Gehegen, Tiere Gehegen zuweisen (über die bestehende Tiererfassung und -bearbeitung hinaus).

## Capabilities

### New Capabilities
- `enclosure-overview`: Übersicht über die belegten Gehege des Zoos mit der Zahl ihrer Tiere und den Tieren darin, inklusive REST-Endpunkt, Seite mit Links zu den Tierprofilen und Eintrag in der Hauptnavigation.

### Modified Capabilities
Keine. Die Requirement „Tierliste in der Hauptnavigation“ in `animal-list` verlangt die Einträge Dashboard und Tierliste und bleibt mit einem zusätzlichen Eintrag erfüllt; wie bisher beschreibt jede Capability den Navigationseintrag ihrer eigenen Seite.

## Impact

- **Backend**: Neue JAX-RS-Ressource für `/enclosures` mit Antwort-Records für Gehege und Tiere; Gruppierung auf Basis der bestehenden `Animal`-Entität, keine Schemaänderung. Neue RestAssured-Tests.
- **Frontend**: Neue Domäne `enclosures` unter `src/app/domains/enclosures/` mit Modell, Service, NgRx Signal Store und Feature-Komponente; neue Route `/enclosures`; neuer Eintrag in der Hauptnavigation der App-Shell; neue Übersetzungen in `de.json` und `en.json`.
- **APIs**: Additiv, keine Breaking Changes an bestehenden Endpunkten.
