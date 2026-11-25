# ADR-003: Keine Service-Schicht im Backend

**Status:** Accepted (nachträglich dokumentiert)

**Date:** 2026-11-25

## Kontext

*Kontext rekonstruiert, unbestätigt.* Die Fachlogik ist klein: CRUD für Tiere, eine Gruppierung nach Gehege, ein konfiguriertes Spotlight-Tier. `AGENTS.md` verlangt, Änderungen in der Workshop-App klein und leicht nachvollziehbar zu halten.

Belegt im Code: Die JAX-RS-Resources rufen die Panache-Entity `Animal` direkt auf (`Animal.listAll()`, `persist()`, `deleteById()`). Es gibt keine `@ApplicationScoped`-Services und kein Repository.

## Entscheidung

Fachlogik steht direkt in den Resources. Datenzugriff erfolgt im Active-Record-Stil über die Entity.

## Konsequenzen

- Positiv: Wenig Code, jeder Endpunkt ist in einer Methode vollständig lesbar.
- Positiv: Für OpenSpec-Changes im Workshop überschaubar.
- Negativ: Wiederverwendung über Resources hinweg fehlt. Regeln wie „Name muss eindeutig sein“ (Change `unique-animal-names`) landen in mehreren Methoden.
- Negativ: Fachlogik ist nur über HTTP testbar. Das deckt sich mit der Testvorgabe in `openspec/config.yaml` (nur `@QuarkusTest`).

## Alternativen

| Alternative | Warum verworfen |
|-------------|-----------------|
| Service-Schicht (Resource → Service → Repository) | *unbestätigt:* mehr Klassen ohne fachlichen Mehrwert bei dieser Größe |

## Implications

- Betroffene Bausteine (→ Section 5): AnimalResource, EnclosureResource, DashboardResource, Animal
- Qualitätsziele (→ Section 1.2): offen
- Neue Constraints (→ Section 2): keine
- Risiken (→ Section 11): wächst die Fachlogik, wird die Entscheidung teuer. Kandidat für ein Folge-ADR.
