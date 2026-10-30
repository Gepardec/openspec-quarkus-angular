# Übung 7 – Den Change eines Kollegen prüfen

## Kontext

Während ihr an der Gehegeübersicht gearbeitet habt, hat ein Kollege den Change `animal-fact-sheet` umgesetzt: Die Notizen fallen weg, und das Tierprofil heißt künftig Steckbrief. Sein Agent meldet: fertig, alle Tasks abgehakt. Bevor der Change archiviert wird, prüft ihr ihn.

Sichert dazu euren eigenen Stand und wechselt auf den Stand des Kollegen:

```sh
git add -A
git commit -m "Meine Lösung zu Übung 3 bis 6"
git switch -c verify uebung-7-start
```

Gibt es nichts zu sichern, meldet `git commit` das nur – wechselt trotzdem.

## Ziel

Lasst den Change von `verify` gegen seine Artefakte prüfen. `verify` ist nicht im Standardprofil von OpenSpec – schaltet es zuerst frei. Ordnet die Befunde ein, behebt, was das Archivieren blockiert, prüft erneut und archiviert den Change.

<details>
<summary>Hinweise</summary>

- Freischalten: `openspec config profile` (Workflow `verify` dazunehmen), danach `openspec update` im Repo-Root
- Neue Skills sieht Codex erst in einer neuen Session
- In Codex: `$openspec-verify-change animal-fact-sheet`
- Archivieren: `openspec archive animal-fact-sheet`

</details>

## Erfolgskriterium

`verify` meldet keine kritischen Befunde mehr. Zu jedem übrigen Befund könnt ihr sagen, ob ihr ihn behebt und warum. Nach dem Archivieren fehlt in `openspec/specs/animal-profile/spec.md` die Requirement zu den Notizen, und die Requirement zur Anzeige heißt „Steckbrief anzeigen“. `openspec validate --all --strict` meldet keine Fehler.
