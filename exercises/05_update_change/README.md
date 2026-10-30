# Übung 5 – Den Plan an einen Änderungswunsch anpassen

## Kontext

Euer Change ist geplant, aber noch nicht umgesetzt. Da meldet sich der Fachbereich mit einem Änderungswunsch: `AENDERUNGSWUNSCH.md`.

## Ziel

Bringt den Änderungswunsch in euren Change, bevor eine Zeile Code entsteht. Danach müssen Proposal, Specs, Design und Tasks wieder zusammenpassen.

<details>
<summary>Hinweise</summary>

- In Codex: `$openspec-update-change <change-name>`
- Der Wunsch betrifft Verhalten, das es schon gibt: `openspec list --specs`
- Prüfen: `openspec show <change-name> --diff`, `openspec validate <change-name> --strict`

</details>

## Erfolgskriterium

Die Delta-Specs enthalten mindestens einen `MODIFIED`-Block für eine bestehende Spec, das Proposal nennt sie unter den geänderten Capabilities, und es gibt Tasks dafür. `openspec validate <change-name> --strict` meldet keine Fehler. Vergleicht jeden `MODIFIED`-Block mit der Requirement in `openspec/specs/`: Was steht nach dem Archivieren in der Spec?
