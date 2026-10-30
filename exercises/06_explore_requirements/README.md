# Übung 6 – Exploration einer unklaren Anforderung

## Kontext

In `REQUIREMENT.md` liegt eine vage Anforderung — noch nicht reif für ein Proposal.

## Ziel

Schärft die Anforderung zuerst mit eurem AI-Assistenten – die Entscheidungen trefft ihr selbst. Danach der vollständige Loop: propose, apply, archive.

<details>
<summary>Hinweise</summary>

- In Codex: `$openspec-explore`, danach `$openspec-propose` und `$openspec-apply-change`
- Prüfen: `openspec validate <change-name> --strict`, `./mvnw test`, `ng build` und `ng lint` in `frontend`
- Archivieren: `openspec archive <change-name>` – die CLI mergt die Delta-Specs selbst, ein eigener Sync-Schritt ist nicht nötig

</details>

## Erfolgskriterium

Ein Proposal existiert, das aus der Exploration hervorgegangen ist und die Anforderung klar beschreibt. Am Ende ist der Change archiviert, `openspec list` zeigt keine aktiven Changes und `openspec validate --all --strict` meldet keine Fehler.
