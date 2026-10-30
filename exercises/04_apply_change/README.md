# Übung 4 – Einen vorbereiteten Change anwenden

## Kontext

Im Unterordner `change/` liegt ein fertig ausformulierter Change. Kopiert ihn in `openspec/changes/`:

```sh
cp -R exercises/04_apply_change/change/remove-animal-notes openspec/changes/
```

## Ziel

Lasst euren AI-Assistenten den Change implementieren, prüft das Ergebnis selbst und archiviert ihn.

<details>
<summary>Hinweise</summary>

- Anwenden in Codex: `$openspec-apply-change remove-animal-notes`
- Tests: `./mvnw test` in `backend`
- Build und Lint im Frontend: `ng build` und `ng lint` in `frontend`
- Archivieren: `openspec archive remove-animal-notes`

</details>

## Erfolgskriterium

Alle Tasks sind abgehakt, Tests, Build und Lint sind grün. `openspec list` zeigt keine aktiven Changes. Die geänderten Requirements sind in `openspec/specs/` eingeflossen.
