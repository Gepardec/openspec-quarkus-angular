# Zoo-Verwaltung

Fachsprache der Zoo-Verwaltung: Tiere erfassen und pflegen, Gehege-Belegung sehen, ein Tier im Spotlight zeigen. Quelle sind die Specs unter `openspec/specs/` und der Code.

## Personen

**Zoo-Manager:in**:
Person, die die Zoo-Verwaltung nutzt. Einzige Rolle, die Specs und Code kennen.
_Avoid_: Mitarbeiter:in, Nutzer:in, Admin

**Tierpfleger:in**:
Künftige Rolle für Beobachtungen am Tier, im Change `animal-fact-sheet` angekündigt. Noch nicht umgesetzt.

## Tiere

**Tier**:
Ein registriertes Tier des Zoos mit Name, Art, Alter, Gehege und Fun Fact. Im Code `Animal`.
_Avoid_: Eintrag, Datensatz

**Art**:
Die Tierart, z. B. „Löwe“. Pflichtfeld. Im Code `species`.
_Avoid_: Spezies, Typ

**Steckbrief**:
Die Detailseite eines Tiers in der Oberfläche. Im Code und in den Requirement-Namen heißt sie weiterhin `animal-profile` / Tierprofil.
_Avoid_: Profil (in der Oberfläche), Detailseite

**Fun Fact**:
Ein kurzer, unterhaltsamer Satz zu einem Tier. Wird nur im Spotlight angezeigt. Im Code `funFact`.
_Avoid_: Notiz (die Notizen wurden mit `animal-fact-sheet` entfernt)

**Tierliste**:
Übersicht aller registrierten Tiere, Einstieg zu Steckbrief und Erfassen.

## Gehege

**Gehege**:
Der Ort, an dem ein Tier lebt, z. B. „Savanne 1“. Ein freier Text am Tier, keine eigene Entität. Ein Gehege „existiert“, solange mindestens ein Tier diesen Text trägt.
_Avoid_: Enclosure (in deutschen Texten), Bereich

**Gehegeübersicht**:
Liste der belegten Gehege mit Anzahl und Namen ihrer Tiere. Tiere ohne Gehege fehlen darin.

## Dashboard

**Dashboard**:
Startseite der Anwendung mit dem Spotlight.

**Spotlight-Tier**:
Das Tier, das das Dashboard hervorhebt. Festgelegt per Konfiguration (`dashboard.spotlight.animal-id`), nicht in der Oberfläche wählbar.
_Avoid_: Tier des Tages, Highlight
