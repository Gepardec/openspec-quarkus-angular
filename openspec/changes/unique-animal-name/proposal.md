# Proposal

## Why

Heute lässt sich ein Tier anlegen, auch wenn schon ein Tier mit demselben Namen erfasst ist. Gleichnamige Tiere sind in der Tierliste und im Dashboard nicht auseinanderzuhalten. Deshalb soll beim Anlegen ein bereits vergebener Name abgelehnt werden.

## What Changes

- `POST /animals` lehnt ein neues Tier ab, wenn bereits ein Tier mit demselben Namen existiert, und antwortet mit Status `409`. Der Vergleich ignoriert Groß-/Kleinschreibung („Leo“ und „leo“ gelten als gleich).
- Das Formular zum Erfassen eines Tiers zeigt in diesem Fall am Feld Name einen Hinweis, dass der Name bereits vergeben ist, und bleibt mit den eingegebenen Angaben geöffnet.
- Nicht Teil dieser Änderung: das Bearbeiten eines Tiers (`PUT /animals/{id}`) prüft den Namen weiterhin nicht. Bestehende Daten werden nicht bereinigt.

## Capabilities

### New Capabilities

_Keine._

### Modified Capabilities

- `animal-registration`: Neue Anforderungen, dass ein bereits vergebener Name über die API mit `409` abgelehnt und im Formular als Hinweis am Feld Name angezeigt wird.

## Impact

- Backend: `AnimalResource.createAnimal`, Abfrage in der Entity `Animal`, neue RestAssured-Tests in `AnimalResourceTest`.
- Frontend: `AnimalStore.create` bzw. die Submit-Action in `animal-create`, Fehlermeldung im Formular, neue Übersetzungen in `public/i18n/de.json` und `public/i18n/en.json`.
- API: `POST /animals` liefert einen neuen Fehlerstatus `409`. Clients, die bisher Duplikate angelegt haben, bekommen jetzt einen Fehler.
