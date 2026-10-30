# Zoo-Management – Übungen zum OpenSpec-Workshop

In diesem Repo arbeitet ihr während des Workshops. Es enthält eine kleine Zoo-Verwaltung (Tiere anlegen, ansehen, bearbeiten, löschen, dazu ein Dashboard) und sieben Übungen, in denen ihr die App mit [OpenSpec](https://github.com/Fission-AI/OpenSpec) weiterentwickelt.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `backend/` | REST-Backend (Quarkus), liefert auch das Frontend aus |
| `frontend/` | Web-Oberfläche (Angular) |
| `exercises/` | die sieben Übungen, je mit eigener README |
| `openspec/` | Specs und Changes der App |
| `AGENTS.md` | Projektwissen für AI-Assistenten: Stack, Befehle, Konventionen |

## Befehle

```sh
cd backend
./mvnw quarkus:dev      # App unter http://localhost:8080, Frontend inklusive
./mvnw test             # Backend-Tests
```

```sh
cd frontend
ng build                # Frontend bauen
ng lint                 # Frontend prüfen
```

Voraussetzungen, falls ihr nicht auf der Schulungs-VM arbeitet: Java 21 oder neuer, Node.js mit pnpm, die Angular CLI und die OpenSpec-CLI (`npm install -g @fission-ai/openspec@1.14.1` – genau diese Version, mit ihr sind die Übungsstände erzeugt).

## Übungen

1. [OpenSpec selbst aufsetzen](exercises/01_init_openspec/README.md)
2. [Workshop-Setup übernehmen](exercises/02_setup_openspec/README.md)
3. [Eine vage Anforderung klären](exercises/03_explore_requirement/README.md)
4. [Aus der Klärung einen Change machen](exercises/04_propose_change/README.md)
5. [Den Plan an einen Änderungswunsch anpassen](exercises/05_update_change/README.md)
6. [Umsetzen, prüfen, archivieren](exercises/06_apply_change/README.md)
7. [Den Change eines Kollegen prüfen](exercises/07_verify_change/README.md)

Übung 3 bis 6 bauen aufeinander auf: eine Gehegeübersicht, von der vagen Anforderung bis ins Archiv. Übung 7 startet für alle auf demselben vorbereiteten Stand.

## Aufholen

Hängt ihr bei einer Übung fest, setzt euren Stand auf das Ergebnis der vorigen Übung. Achtung: Das verwirft alle eigenen Änderungen im Repo.

| vor Übung | Befehl |
| --- | --- |
| 2 | `git reset --hard uebung-1 && git clean -fd` |
| 3 | `git reset --hard uebung-2 && git clean -fd` |
| 4 | `git reset --hard uebung-3 && git clean -fd` |
| 5 | `git reset --hard uebung-4 && git clean -fd` |
| 6 | `git reset --hard uebung-5 && git clean -fd` |

Übung 3 ändert keine Dateien, `uebung-3` ist deshalb derselbe Stand wie `uebung-2`. Für Übung 7 wechseln alle auf `uebung-7-start`, siehe dort.

Die Tags zeigen auf den Branch `loesung`, der jede Übung als eigene Commits enthält. Er ist eine mögliche Lösung, nicht die einzige: Eure Artefakte dürfen anders aussehen.

## Branches

- `main`: Startzustand für die Übungen
- `loesung`: Referenzlösung; je ein Commit für propose (Übung 4), update (Übung 5), apply und archive (Übung 6) sowie für den Stand des Kollegen und die Lösung von Übung 7
- `quiz`: Stand für das CLI-Quiz im Workshop

## Lizenz

Apache License 2.0, siehe [LICENSE](LICENSE) und [NOTICE](NOTICE).
