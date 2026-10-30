# Übung 4 – Aus der Klärung einen Change machen

## Kontext

Aus Übung 3 wisst ihr, was die Gehegeübersicht können soll.

## Ziel

Macht aus euren Entscheidungen einen Change – Proposal, Specs, Design, Tasks. Lest den Plan, bevor ihr weitermacht: Würdet ihr ihn so umsetzen lassen?

<details>
<summary>Hinweise</summary>

- In Codex: `$openspec-propose`
- Prüfen: `openspec status --change <change-name>`, `openspec show <change-name>`, `openspec validate <change-name> --strict`

</details>

## Erfolgskriterium

`openspec status --change <change-name>` zeigt alle Artefakte als erledigt, `openspec validate <change-name> --strict` meldet keine Fehler. Die Delta-Spec enthält `ADDED`-Requirements für die Gehegeübersicht. Es gibt noch keinen neuen Code.
