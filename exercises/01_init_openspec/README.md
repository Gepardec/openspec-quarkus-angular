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

Das Repo ist bereits mit `openspec init` eingerichtet: das `openspec/`-Verzeichnis und die Skills und Slash-Commands für Codex und Claude Code. Damit ihr seht, was `init` in einem Projekt ohne OpenSpec anlegt, entfernt zuerst beides:

```sh
git rm -rq openspec '.*/skills/openspec-*' .agents/skills/.openspec-target .claude/commands/opsx
```

Die anderen Skills (z. B. `frontend-design`) bleiben erhalten.

Führt danach `openspec init --language Deutsch` im Repo-Root aus und wählt **Codex** aus – damit arbeitet ihr heute. Das Repo war zusätzlich für Claude Code eingerichtet. Schaut euch mit `git status` und `openspec/config.yaml` an, was angelegt wurde – wählt ihr Codex und Claude Code, entsteht exakt der Stand von vorher.

## Erfolgskriterium

`openspec/` mit `config.yaml`, `specs/` und `changes/` existiert, ebenso die Skills (und, wo das Tool sie unterstützt, Slash-Commands) für eure AI-Assistenten – erzeugt von eurer CLI-Version. In `config.yaml` steht unter `context`, dass alle Artefakte auf Deutsch geschrieben werden.
