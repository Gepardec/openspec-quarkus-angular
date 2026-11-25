workspace "Zoo-Verwaltung" "Architekturmodell der Zoo-Verwaltung (Ist-Stand, Branch loesung), nachträglich aus dem Code abgeleitet." {

    !identifiers hierarchical

    model {
        staff = person "Zoo-Manager:in" "Pflegt Tiere, sieht Gehege und Dashboard. Der Code kennt keine Rollen und keine Anmeldung."

        zoo = softwareSystem "Zoo-Verwaltung" "Verwaltet Tiere, zeigt Gehege-Belegung und ein Spotlight-Tier." {

            spa = container "Web-App" "Single-Page-App mit den Domänen animals, enclosures und dashboard. Sheriff erzwingt die Domänengrenzen." "Angular, NgRx Signal Store, Angular Material, Transloco" {
                tags "Web"
            }

            api = container "REST-API" "Stellt die Fachfunktionen unter /api bereit und liefert die Web-App aus (Quinoa)." "Quarkus, Quarkus REST, Hibernate ORM Panache" {
                animalResource = component "AnimalResource" "CRUD für Tiere unter /api/animals. Validiert per Bean Validation, Logik direkt in der Resource." "JAX-RS Resource"
                enclosureResource = component "EnclosureResource" "GET /api/enclosures: gruppiert Tiere nach ihrem Gehege-Namen. Ein Gehege ist keine eigene Entity." "JAX-RS Resource"
                dashboardResource = component "DashboardResource" "GET /api/dashboard/spotlight: liefert das Tier, dessen ID in der Konfiguration steht." "JAX-RS Resource, MicroProfile Config"
                animalEntity = component "Animal" "Einzige Entity: name, species, age, enclosure (Text), funFact. Active-Record-Zugriff." "Panache Entity"
            }

            db = container "Datenbank" "In-Memory, Schema bei jedem Start neu (drop-and-create), Startdaten aus import.sql." "H2" {
                tags "Database"
            }
        }

        staff -> zoo.spa "Verwaltet Tiere, sieht Gehege und Dashboard" "Browser"
        zoo.spa -> zoo.api "Liest und ändert Daten" "JSON über HTTP, /api"
        zoo.api -> zoo.db "Liest und schreibt" "JDBC"


        zoo.spa -> zoo.api.animalResource "GET, POST, PUT, DELETE /api/animals" "JSON über HTTP"
        zoo.spa -> zoo.api.enclosureResource "GET /api/enclosures" "JSON über HTTP"
        zoo.spa -> zoo.api.dashboardResource "GET /api/dashboard/spotlight" "JSON über HTTP"

        zoo.api.animalResource -> zoo.api.animalEntity "Liest, speichert, löscht" "Panache"
        zoo.api.enclosureResource -> zoo.api.animalEntity "Liest Tiere mit Gehege" "Panache"
        zoo.api.dashboardResource -> zoo.api.animalEntity "Liest Spotlight-Tier" "Panache"
        zoo.api.animalEntity -> zoo.db "Tabelle animals" "JDBC"

        workshop = deploymentEnvironment "Lokal (Workshop)" {
            laptop = deploymentNode "Rechner der Teilnehmenden" "Ein Prozess für alles, gestartet mit ./mvnw quarkus:dev" "macOS, Windows oder Linux" {
                browser = deploymentNode "Browser" "" "Chrome, Firefox, Edge" {
                    containerInstance zoo.spa
                }
                jvm = deploymentNode "JVM" "Quarkus-Prozess, Port 8080. Quinoa startet im Dev-Modus den Angular-Dev-Server und leitet an ihn weiter." "Java, Quarkus" {
                    containerInstance zoo.api
                    containerInstance zoo.db
                }
            }
        }
    }

    views {
        systemContext zoo "context" "Kontextabgrenzung: Wer nutzt die Zoo-Verwaltung? Externe Systeme gibt es nicht." {
            include *
            autoLayout lr
        }

        container zoo "containers" "Bausteinsicht Ebene 1: Container der Zoo-Verwaltung." {
            include *
            autoLayout lr
        }

        component zoo.api "components-api" "Bausteinsicht Ebene 2: REST-API. Keine Service-Schicht, die Resources greifen direkt auf die Entity zu." {
            include zoo.api.animalResource zoo.api.enclosureResource zoo.api.dashboardResource zoo.api.animalEntity zoo.db
            autoLayout lr
        }

        deployment zoo "Lokal (Workshop)" "deployment-lokal" "Verteilungssicht: lokaler Betrieb im Workshop." {
            include *
            autoLayout lr
        }

        styles {
            element "Person" {
                shape Person
                background "#08427B"
                color "#ffffff"
            }
            element "Software System" {
                background "#1168BD"
                color "#ffffff"
            }
            element "Container" {
                background "#438DD5"
                color "#ffffff"
            }
            element "Web" {
                shape WebBrowser
            }
            element "Database" {
                shape Cylinder
            }
            element "Component" {
                background "#85BBF0"
                color "#000000"
            }
            element "Andere Domäne" {
                background "#E8E8E8"
                color "#000000"
            }
            element "Deployment Node" {
                background "#ffffff"
                color "#000000"
            }
        }
    }
}
