# 5. Bausteinsicht

> Ist-Stand, nachträglich aus dem Code abgeleitet (Branch `loesung`).

## 5.1 Ebene 1: Container

![Container der Zoo-Verwaltung](../diagrams/05-containers.svg)

Quelle: `diagrams/structurizr/workspace.dsl`, View `containers`

| Baustein | Verantwortung | Schnittstellen | Technologie | Quellcode |
|---|---|---|---|---|
| Web-App | Oberfläche mit den Domänen `animals`, `enclosures`, `dashboard` | IF-01; nutzt API-01 bis API-03 | Angular, NgRx Signal Store, Angular Material, Transloco | `frontend/` |
| REST-API | Fachfunktionen unter `/api`, liefert die Web-App aus (Quinoa) | IF-01 (Auslieferung); bietet API-01 bis API-03 | Quarkus, Quarkus REST, Hibernate ORM Panache | `backend/` |
| Datenbank | Speichert Tiere, bei jedem Start neu aus `import.sql` | – (nur intern, JDBC) | H2 in-memory | `backend/src/main/resources/import.sql` |

Web-App und REST-API sind logisch getrennte Container, werden aber **gemeinsam ausgeliefert** (ein Quarkus-Prozess, siehe [Sektion 7](07-deployment-view.md) und [ADR-002](../adr/adr-002-ein-deployment-mit-quinoa.md)).

### Interne Schnittstellen

Die REST-Endpunkte sind keine externen Schnittstellen (die Web-App ist der einzige Nutzer) und tragen deshalb `API-xx` statt `IF-xx`.

| ID | Endpunkt | Anbieter | Nutzer |
|---|---|---|---|
| API-01 | `GET/POST /api/animals`, `GET/PUT/DELETE /api/animals/{id}` | AnimalResource | Web-App, Domäne animals |
| API-02 | `GET /api/enclosures` | EnclosureResource | Web-App, Domänen enclosures und animals (Gehege-Namen) |
| API-03 | `GET /api/dashboard/spotlight` | DashboardResource | Web-App, Domäne dashboard |

## 5.2 Ebene 2: REST-API

![Komponenten der REST-API](../diagrams/05-components-api.svg)

Quelle: `diagrams/structurizr/workspace.dsl`, View `components-api`

| Bestandteil | Verantwortung |
|---|---|
| AnimalResource | CRUD für Tiere (API-01), Bean Validation, Logik direkt in der Resource |
| EnclosureResource | API-02: gruppiert Tiere nach dem Text im Feld `enclosure` |
| DashboardResource | API-03: liefert das Tier mit der ID aus `dashboard.spotlight.animal-id` |
| Animal | einzige Entity (Panache, Active Record), Tabelle `animals` |

**Befunde:**

- Es gibt **keine Service-Schicht**. Die Resources greifen direkt auf die Entity zu ([ADR-003](../adr/adr-003-keine-service-schicht.md)).
- Ein **Gehege ist keine Entity**, sondern ein freier Text am Tier. „Gehege“ existiert nur als Gruppierung in API-02.
