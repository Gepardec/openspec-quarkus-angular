# ADR-004: Domänengrenzen im Frontend mit Sheriff erzwingen

**Status:** Accepted (nachträglich dokumentiert)

**Date:** 2026-11-25

## Kontext

*Kontext rekonstruiert, unbestätigt.* Das Frontend soll nach Fachdomänen wachsen können, ohne dass Domänen kreuz und quer voneinander importieren. Konventionen allein werden in Workshops und mit KI-Agenten leicht übergangen.

Belegt im Code: `frontend/sheriff.config.ts` mit Modulen `domains/<domain>/<feature>`, Abhängigkeitsregeln je Domäne und Typ, Prüfung über ESLint.

## Entscheidung

Das Frontend ist in `domains/<domain>/<typ>` geschnitten. Sheriff prüft beim Linten, dass eine Domäne nur aus sich selbst und `shared` importiert und dass die Typen (`feature`, `data`, `model`, `util`) nur erlaubte Abhängigkeiten haben.

## Konsequenzen

- Positiv: Verstöße fallen bei `ng lint` auf, nicht erst im Review.
- Positiv: Querbezüge laufen sichtbar über Router-Links oder die API.
- Negativ: Die Regeln erlauben `data` → `feature`. Die Schichtung ist also nicht streng.
- Negativ: Die Konfiguration nennt Domänen, die es nicht gibt (`controlling`). Sie muss mit dem Code gepflegt werden.

## Alternativen

| Alternative | Warum verworfen |
|-------------|-----------------|
| Nur Konvention, kein Tool | *unbestätigt:* nicht überprüfbar |
| Nx Module Boundaries | *unbestätigt:* setzt ein Nx-Workspace voraus |

## Implications

- Betroffene Bausteine (→ Section 5): alle Bausteine der Web-App
- Qualitätsziele (→ Section 1.2): offen, vermutlich Wartbarkeit
- Neue Constraints (→ Section 2): neue Domänen brauchen einen Ordner unter `domains/` und ggf. eine Regel in `sheriff.config.ts`
- Risiken (→ Section 11): keine bekannten
