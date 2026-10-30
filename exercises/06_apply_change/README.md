# Übung 6 – Umsetzen, prüfen, archivieren

## Kontext

Euer Change aus Übung 4 und 5 ist geplant und angepasst.

## Ziel

Lasst euren AI-Assistenten den Change umsetzen. Prüft das Ergebnis selbst – Tests, Build, Lint, die laufende App und den Code. Archiviert den Change danach ohne AI-Assistenten und schaut euch an, was sich in `openspec/specs/` verändert hat.

<details>
<summary>Hinweise</summary>

- In Codex: `$openspec-apply-change <change-name>`
- Tests: `./mvnw test` in `backend`
- Build und Lint: `ng build` und `ng lint` in `frontend`
- Archivieren: `openspec archive <change-name>`

</details>

## Erfolgskriterium

Alle Tasks sind abgehakt, Tests, Build und Lint sind grün, die Gehegeübersicht ist in der App erreichbar. Nach dem Archivieren zeigt `openspec list` keine aktiven Changes, die neue Spec liegt in `openspec/specs/`, die geänderte Requirement steht in ihrer bestehenden Spec. `openspec validate --all --strict` meldet keine Fehler.
