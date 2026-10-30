# Übung 2 – Workshop-Setup übernehmen

## Kontext

Das von `openspec init` erzeugte Verzeichnis ist bewusst minimal. Für die weiteren Übungen braucht ihr den vollständigen Workshop-Stand.

Kopiert das vorkonfigurierte `openspec/`-Verzeichnis in euer Repo-Root (ohne `/` am Ende des Quellpfads):

```sh
cp -R exercises/02_setup_openspec/openspec .
```

## Ziel

Erkundet das Setup — Changes, Specs und `config.yaml`. Vergleicht `config.yaml` mit eurem Stand aus Übung 1 (`git diff openspec/config.yaml`): Die drei Sprachzeilen aus `init` bleiben, dazu kommen im `context` die Constraints, die OpenSpec jedem Artefakt mitgibt, z. B. welche Tests ein Change braucht. Tech-Stack, Befehle und Code-Konventionen stehen dagegen in `AGENTS.md` – die liest jede Agent-Session ohnehin.

<details>
<summary>Hinweise</summary>

```sh
openspec list
openspec list --specs
openspec show us-06-dashboard
```

</details>

## Erfolgskriterium

`openspec list` zeigt `us-06-dashboard` als aktiven Change. `openspec validate --all --strict` meldet keine Fehler.
