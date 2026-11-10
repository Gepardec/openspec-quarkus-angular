# Übung 1 – OpenSpec selbst aufsetzen

## Setup

Auf eurer Schulungs-VM ist alles vorbereitet: Das Repo liegt unter `~/openspec-quarkus-angular` (Branch `main`), die OpenSpec-CLI ist installiert. Prüft die Version (erwartet: 1.14.1) und startet die App:

```sh
cd ~/openspec-quarkus-angular
openspec --version
```

```sh
cd ~/openspec-quarkus-angular/backend
./mvnw quarkus:dev
```

Die App läuft unter http://localhost:8080. Lasst sie in diesem Terminal laufen und öffnet für die Übungen ein zweites Terminal im Repo-Root.

## Ziel

Das Repo kennt OpenSpec noch nicht: Es gibt kein `openspec/`-Verzeichnis und keine OpenSpec-Skills, nur die App, `AGENTS.md` und zwei allgemeine Skills (z. B. `frontend-design`).

Führt `openspec init --language Deutsch` im Repo-Root aus und wählt **Codex** aus – damit arbeitet ihr heute. Schaut euch mit `git status` und `openspec/config.yaml` an, was angelegt wurde.

Committet den Stand, damit ihr in Übung 2 vergleichen könnt:

```sh
git add -A
git commit -m "Übung 1: openspec init"
```

## Erfolgskriterium

`openspec/` mit `config.yaml`, `specs/` und `changes/` existiert, ebenso die Skills (und, wo das Tool sie unterstützt, Slash-Commands) für eure AI-Assistenten – erzeugt von eurer CLI-Version. In `config.yaml` steht unter `context`, dass alle Artefakte auf Deutsch geschrieben werden.
