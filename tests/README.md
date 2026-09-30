# Tests — website Sill-vyan

End-to-end tests met [Playwright](https://playwright.dev) en [playwright-bdd](https://vitalets.github.io/playwright-bdd/).
De testcases staan als Gherkin-scenario's in het Nederlands (`# language: nl`) in `tests/features/`,
de step definitions in TypeScript in `tests/steps/`.

## Draaien

```bash
npm install                    # eenmalig
npx playwright install chromium # eenmalig
npm test                       # alle tests, desktop + mobiel
npm run test:desktop           # alleen desktop
npm run test:mobiel            # alleen mobiel
npm run test:ui                # interactieve Playwright UI
npm run test:mobiel:ui         # Playwright UI, alleen mobiel (ook: test:desktop:ui)
npm run test:headed            # met zichtbare browser
npm run test:mobiel:headed     # mobiel met zichtbare browser (ook: test:desktop:headed)
npm run report                 # HTML-rapport van de laatste run
npm run docs:refresh           # tests + Allure-rapport bouwen
npm run allure:open            # Allure-rapport openen
npm run livingdoc              # living doc openen
```

`npm test` start zelf een lokale webserver op poort 4173 (`http-server`).

Alle commando's (filteren op tag of scenario, headless/headed, traces, codegen, Allure, living doc)
staan in [PLAYWRIGHT-COMMANDOS.md](PLAYWRIGHT-COMMANDOS.md).

## Projecten en tags

| Project   | Apparaat       | Draait                               |
|-----------|----------------|--------------------------------------|
| `desktop` | Desktop Chrome | alles behalve `@mobiel`              |
| `mobiel`  | Pixel 7        | alles behalve `@desktop`             |

## Testcases

| Feature | Scenario | Wat wordt gecontroleerd |
|---|---|---|
| Navigatie `@desktop` | Menu-link brengt me naar de sectie (5 voorbeelden) | Werk, Diensten, Werkwijze, Pakketten, FAQ scrollen naar hun sectie en zetten de juiste `#anchor` in de URL |
| | Knop "Gratis gesprek" | Header-knop gaat naar het contactblok |
| Mobiele weergave `@mobiel` | Hamburgermenu openen, kiezen, sluiten | Menu opent, link scrollt naar sectie, menu sluit vanzelf |
| | Hamburgermenu dichtklikken | Tweede klik sluit het menu |
| | Geen horizontale scroll | Pagina is niet breder dan het scherm |
| Hero en cijferbalk | Kop en call-to-actions | H1 en beide knoppen zichtbaar |
| | Foto goed getoond | Foto geladen, vult de kaart precies, `object-fit: cover` (regressie op de uitgerekte-fotobug) |
| | Cijfers tellen op | Tellers eindigen op 25, 10+, 2 wkn, 100% |
| Veelgestelde vragen | Standaard dicht | 5 vragen, geen open |
| | Openen en sluiten | Antwoord verschijnt en verdwijnt weer |
| Contactformulier | Leeg formulier | Niet verstuurd, veld Naam ongeldig |
| | Ongeldig e-mailadres | Niet verstuurd, veld E-mail ongeldig |
| | Geldig formulier | `mailto:` met juist adres, onderwerp en tekst; bevestiging zichtbaar |
| Pakketten, footer, pagina-info | Titel | Juiste `<title>` |
| | Pakketten | 3 pakketten, "Website + Automatisering" uitgelicht als "Meest compleet" |
| | Footer | Toont het huidige jaartal |

## Testdatabase (SQLite)

Scenario's met de tag `@database` halen hun testdata uit `tests/data/testdata.db`.

- `tests/data/schema.sql`: de tabellen `contact_testdata`, `navigatie_testdata` en `faq_testdata`
- `tests/data/seed.sql`: de testdata zelf; pas die hier aan en niet in de `.db`
- `npm run db:setup`: bouwt de database opnieuw op (gebeurt ook automatisch bij `npm test`)
- `tests/steps/db.ts`: de functies waarmee step definitions de data lezen

Het `.db`-bestand wordt gegenereerd en staat niet in git.

**Bekijken in VS Code:** open SQLTools (het database-icoon links) en kies de verbinding
**Sill-vyan testdata**. De eerste keer vraagt SQLTools of het de SQLite-driver mag installeren;
klik op **Install**.

Nieuwe testdata toevoegen: zet een rij in `seed.sql`, bijvoorbeeld een nieuwe `contact_testdata`-rij,
en voeg de `sleutel` toe aan de `Voorbeelden`-tabel in `contact.feature`.

## Mailprogramma in de test

Het contactformulier opent het mailprogramma via `window.openMail(url)` in `script.js`.
De test vervangt die functie (zie `contact.steps.ts`), zodat er geen echt mailprogramma opengaat
en de `mailto:`-link gecontroleerd kan worden.
