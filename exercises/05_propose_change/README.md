# Übung 5 – Proposal aus einer User Story

## Kontext

In `USER_STORY.md` liegt eine fertige User Story.

## Ziel

Macht aus der User Story einen vollständigen Change – Proposal, Specs, Design, Tasks – und bringt ihn bis ins Archiv.

<details>
<summary>Hinweise</summary>

- In Codex: `$openspec-propose`, danach `$openspec-apply-change`
- Prüfen: `openspec validate <change-name> --strict`, `./mvnw test`, `ng build` und `ng lint` in `frontend` – Frontend-Tests gibt es im Projekt bewusst keine
- Archivieren: `openspec archive <change-name>`

</details>

## Erfolgskriterium

Vor dem Apply: `openspec status --change <change-name>` zeigt alle Artefakte als erledigt, `openspec show <change-name>` zeigt das Proposal. Am Ende: Die Tierliste lässt sich nach Tierart filtern, `openspec list` zeigt keine aktiven Changes und die neuen bzw. geänderten Requirements stehen in `openspec/specs/`.
