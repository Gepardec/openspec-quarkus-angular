# 1. Einführung und Ziele

> **Entwurf mit offenen Punkten.** Aufgabenstellung und Stakeholder sind aus Code, `AGENTS.md` und Specs abgeleitet. Die **Qualitätsziele stehen nicht im Code**: Sie sind hier als Vorschläge markiert und müssen im Interview (Skill `arc42-section-01`, danach `arc42-section-10`) bestätigt oder verworfen werden.

## 1.1 Aufgabenstellung

Die Zoo-Verwaltung hilft Zoo-Manager:innen, die Tiere ihres Zoos zu verwalten.

| Funktion | Spec |
|---|---|
| Tiere auflisten, erfassen, bearbeiten, löschen | `animal-list`, `animal-registration`, `animal-editing`, `animal-deletion` |
| Steckbrief eines Tiers ansehen | `animal-profile` |
| Belegte Gehege mit ihren Tieren sehen | `enclosure-overview` |
| Dashboard mit einem Spotlight-Tier als Startseite | `dashboard` |

Zweiter Zweck: Die App ist die **Referenz-App eines OpenSpec-Workshops** und soll bewusst überschaubar bleiben (`AGENTS.md`, `openspec/config.yaml`).

## 1.2 Qualitätsziele

| Prio | Qualitätsziel (Vorschlag) | Motivation | Status |
|---|---|---|---|
| 1 | Verständlichkeit des Codes | Teilnehmende sollen Changes in kurzer Zeit nachvollziehen | **offen**, abgeleitet aus `AGENTS.md` („intentionally kept approachable“) |
| 2 | Einfacher Start | ein Befehl, keine Datenbank, gleicher Datenstand bei jedem Start | **offen**, abgeleitet aus ADR-001 und ADR-002 |
| 3 | Änderbarkeit entlang der Domänen | neue Funktionen bleiben in ihrer Domäne | **offen**, abgeleitet aus ADR-004 |

**Fragen fürs Interview:**

- Sind das die Top 3, oder fehlt etwas, das der Code nicht zeigen kann (z. B. Bedienbarkeit, Barrierefreiheit)?
- Gilt die App nur als Workshop-App, oder soll sie je produktiv laufen? Davon hängen Datenhaltung, Sicherheit und Rollen ab (siehe [Sektion 3](03-context-and-scope.md)).
- Woran messen wir „verständlich“? Konkrete Szenarien gehören nach Sektion 10.

## 1.3 Stakeholder

| Rolle | Erwartung | Status |
|---|---|---|
| Zoo-Manager:in | verlässliche Tierdaten, schneller Überblick | aus den Specs |
| Workshop-Teilnehmende | Code, Specs und Doku schnell verstehen und ändern | aus `AGENTS.md` |
| Trainer:innen | stabile Basis für Übungen, reproduzierbarer Datenstand | **offen**, vermutet |
| Tierpfleger:in | künftig strukturierte Beobachtungen am Tier | **offen**, aus Change `animal-fact-sheet` |
