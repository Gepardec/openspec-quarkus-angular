# Übung 1 – OpenSpec selbst aufsetzen

## Setup

Auf eurer Schulungs-VM ist alles vorbereitet: Das Repo liegt unter `~/openspec-workshop` (Branch `main`), die OpenSpec-CLI ist installiert.

Startet die App in VS Code über das Menü **Terminal → Run Task… → Zoo-App starten**. Sie läuft dann in einem eigenen Terminal-Tab unter http://localhost:8080 – lasst den Tab offen.

<details>
<summary>Ohne VS Code</summary>

```sh
cd ~/openspec-workshop/backend
./mvnw quarkus:dev
```

Lasst die App in diesem Terminal laufen und öffnet für die Übungen ein zweites.

</details>

Alle Befehle der Übungen laufen im **Repo-Root**, nicht in `backend/`. Öffnet dafür ein Terminal (`Ctrl + J`) und prüft Verzeichnis und CLI-Version (erwartet: 2.0.0):

```sh
cd ~/openspec-workshop
pwd
openspec --version
```

## Ziel

Das Repo kennt OpenSpec noch nicht: Es gibt kein `openspec/`-Verzeichnis und keine OpenSpec-Skills, nur die App, `AGENTS.md` und zwei allgemeine Skills (z. B. `frontend-design`).

Richtet OpenSpec im Repo-Root ein und wählt **Codex** aus – damit arbeitet ihr heute:

```sh
cd ~/openspec-workshop
openspec init --language Deutsch
```

Schaut euch mit `git status` und `openspec/config.yaml` an, was angelegt wurde.

Committet den Stand, damit ihr in Übung 2 vergleichen könnt:

```sh
git add -A
git commit -m "Übung 1: openspec init"
```

## Erfolgskriterium

`openspec/` mit `config.yaml`, `specs/` und `changes/` existiert, ebenso die OpenSpec-Skills in `.agents/skills/` – erzeugt von eurer CLI-Version. In `config.yaml` steht unter `context`, dass alle Artefakte auf Deutsch geschrieben werden. `openspec/` liegt neben `backend/` und `frontend/`, nicht darin.
