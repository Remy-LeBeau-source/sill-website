# Playwright-commando's — website Sill-vyan

Alle commando's om de tests te draaien, te filteren en de rapporten te bekijken.
Typ ze in **CMD** (Opdrachtprompt) of in de terminal van VS Code, altijd vanuit de projectmap:

```cmd
cd C:\sill-website
```

Zie [README.md](README.md) voor wat de tests controleren en hoe de testdata werkt.

---

## 1. Eenmalig installeren

```cmd
npm install
npx playwright install chromium
```

| Commando | Wat het doet |
|---|---|
| `npm install` | Installeert Playwright, playwright-bdd, Allure en de webserver |
| `npx playwright install chromium` | Downloadt de browser waarmee de tests draaien |
| `java -version` | Controleert of Java er is; dat is nodig voor het Allure-rapport |

---

## 2. De snelste manier: npm-scripts

| Commando | Wat het doet |
|---|---|
| `npm test` | Alle tests, laptop én mobiel, headless |
| `npm run test:desktop` | Alleen laptop/desktop (Desktop Chrome), headless |
| `npm run test:mobiel` | Alleen mobiel (Pixel 7), headless |
| `npm run test:headed` | Alle tests met GUI (zichtbare browser) |
| `npm run test:desktop:headed` | Laptop met GUI, één venster tegelijk |
| `npm run test:mobiel:headed` | Mobiel met GUI, één venster tegelijk |
| `npm run test:ui` | Interactieve Playwright UI: tests aanklikken, stap voor stap terugkijken |
| `npm run test:desktop:ui` | Playwright UI met alleen laptop |
| `npm run test:mobiel:ui` | Playwright UI met alleen mobiel |
| `npm run bekijk:mobiel` | De website zelf bekijken als telefoon, zonder tests |
| `npm run bekijk:laptop` | De website zelf bekijken als laptop, zonder tests |
| `npm run docs:refresh` | Alle tests draaien en daarna het Allure-rapport bouwen, ook als er tests falen |
| `npm run report` | Playwright HTML-rapport van de laatste run openen |
| `npm run allure:open` | Allure-rapport openen |
| `npm run livingdoc` | Living doc openen |
| `npm run db:setup` | Testdatabase opnieuw opbouwen |

`npm test` doet vooraf automatisch drie dingen: de testdatabase opbouwen, oude Allure-resultaten
wissen en de feature-bestanden omzetten naar Playwright-tests (`bddgen`). Ook start het zelf een
webserver op poort 4173.

### Extra opties meegeven aan een npm-script

Zet eerst `--` en daarna de Playwright-opties:

```cmd
npm test -- --headed
npm run test:mobiel -- --headed
npm test -- --grep "@mobiel"
npm test -- --project=desktop --grep "Contactformulier"
```

---

## 3. Laptop, mobiel, headless en GUI

Er zijn twee projecten (apparaten), ingesteld in `playwright.config.ts`:

| Project | Apparaat | Draait |
|---|---|---|
| `desktop` | Desktop Chrome, laptopscherm | alles behalve `@mobiel` |
| `mobiel` | Pixel 7, telefoonscherm met touch | alles behalve `@desktop` |

```cmd
npm test -- --project=desktop
npm test -- --project=mobiel
npm test -- --project=desktop --project=mobiel
```

### Headless (geen browservenster)

Dit is de standaard. Alle testcommando's draaien headless, tenzij je `--headed` of `--debug`
toevoegt:

| Commando | Draait |
|---|---|
| `npm test` | Alles, headless (snelst) |
| `npm run test:desktop` | Laptop, headless |
| `npm run test:mobiel` | Mobiel, headless |
| `npm run docs:refresh` | Alles + Allure-rapport, headless |

### GUI: niet headless (zichtbare browser)

| Commando | Wat je ziet |
|---|---|
| `npm run test:desktop:headed` | Laptop, één browservenster tegelijk |
| `npm run test:mobiel:headed` | Mobiel (Pixel 7), één browservenster tegelijk |
| `npm run test:headed` | Alle tests, meerdere vensters tegelijk |
| `npm test -- --headed` | Hetzelfde als `test:headed`, en je kunt het combineren met andere opties |
| `npm test -- --debug` | Altijd zichtbaar, plus de Playwright Inspector om stap voor stap door de test te lopen |
| `npx playwright codegen http://localhost:4173` | Een browser waarin je klikt en waar Playwright testcode van maakt (zie §8) |

De `:headed`-scripts draaien met `--workers=1`, zodat je rustig kunt meekijken. Je kunt ze ook
combineren met een filter:

```cmd
npm run test:mobiel:headed -- --grep "Hamburgermenu"
npm run test:desktop:headed -- contact
```

### GUI: Playwright UI

| Commando | Wat je ziet |
|---|---|
| `npm run test:ui` | Playwright UI met alle tests |
| `npm run test:desktop:ui` | Playwright UI met alleen laptop |
| `npm run test:mobiel:ui` | Playwright UI met alleen mobiel |

In het UI-venster klik je een test of feature aan en druk je op ▶. Je ziet elke stap terug als
schermafbeelding. De browser zelf draait onzichtbaar, tenzij je op het oog-icoon **Show browser**
klikt. Sluit het venster om te stoppen.

### GUI: de website zelf bekijken als telefoon, zonder tests

Hiermee klik en scrol je zelf door de website in een telefoonscherm. Eén commando start de website
en opent meteen de browser. Sluit je de browser, dan stopt de website ook.

| Commando | Scherm |
|---|---|
| `npm run bekijk:mobiel` | Pixel 7 (telefoon) |
| `npm run bekijk:laptop` | Laptop, 1366 × 768 |
| `npm run bekijk -- "Galaxy S24"` | Samsung Galaxy S24 |
| `npm run bekijk -- "iPhone 15"` | iPhone 15 |
| `npm run bekijk -- "iPad Pro 11"` | iPad Pro 11 |

De iPhone en iPad gebruiken WebKit; installeer die eenmalig met `npx playwright install webkit`.

**Op je echte telefoon:** zet de website aan met `npx http-server . -p 4173 -c-1` en open op je
telefoon het adres achter `Available on:` dat met `192.168.` begint, bijvoorbeeld
`http://192.168.0.108:4173`. Je telefoon moet op hetzelfde wifi-netwerk zitten. Laat dat venster
open; **Ctrl+C** stopt de website.

#### Met de hand, in twee vensters

Dit doet `npm run bekijk` voor je. Wil je het zelf doen, gebruik dan **twee** vensters. In VS Code
open je een tweede terminal met de **+** in het terminalpaneel.

Venster 1 start de website. Laat dit venster open en typ er niets meer in:

```cmd
npx http-server . -p 4173 -c-1
```

Venster 2 opent de website:

```cmd
npx playwright open --device="Pixel 7" http://localhost:4173
npx playwright open --viewport-size="1366,768" http://localhost:4173
```

Krijg je `ERR_CONNECTION_REFUSED`, dan draait de website niet meer. Waarschijnlijk is venster 1
gestopt met Ctrl+C. Start hem opnieuw of gebruik `npm run bekijk:mobiel`.

### Alleen rapporten, geen tests

Deze commando's openen wel de browser, maar draaien geen tests: `npm run report`,
`npm run allure:open`, `npm run allure:serve`, `npm run livingdoc` en `npx playwright show-trace`.

---

## 4. Een deel van de tests draaien

### Op feature-bestand

De naam wordt vergeleken met het bestandspad, dus een deel van de naam is genoeg:

```cmd
npm test -- contact
npm test -- faq
npm test -- hero navigatie
```

Feature-bestanden: `contact`, `faq`, `hero`, `mobiel`, `navigatie`, `overig`.

### Op scenario- of functionaliteitsnaam

```cmd
npm test -- --grep "Leeg formulier"
npm test -- --grep "Contactformulier"
npm test -- -g "Hamburgermenu"
```

### Op tag

| Tag | Scenario's |
|---|---|
| `@mobiel` | Alleen mobiel (hamburgermenu, horizontale scroll) |
| `@desktop` | Alleen desktop (menu-links) |
| `@database` | Met testdata uit de SQLite-database |

```cmd
npm test -- --grep "@database"
npm test -- --grep "@mobiel|@desktop"
npm test -- --grep-invert "@database"
```

`--grep-invert` draait alles **behalve** die tag. Met `|` kies je meerdere tags tegelijk.

### Alleen wat de vorige keer faalde

```cmd
npm test -- --last-failed
```

### Eerst bekijken wat er zou draaien

```cmd
npm test -- --list
npm test -- --list --project=mobiel
```

---

## 5. Rapporten: Playwright, Allure en living doc

Na elke `npm test` staan er drie rapporten klaar:

| Rapport | Map | Openen met | Wat je ziet |
|---|---|---|---|
| Playwright | `playwright-report/` | `npm run report` | Per test de stappen, fouten, screenshots en traces |
| Allure | `allure-results/` → `allure-report/` | `npm run allure:generate` en dan `npm run allure:open` | Overzicht met grafieken, looptijden en geschiedenis |
| Living doc | `living-doc/` | `npm run livingdoc` | De Nederlandse features als leesbare documentatie, per stap groen of rood |

### Alles in één keer

```cmd
npm run docs:refresh
npm run allure:open
npm run livingdoc
```

`docs:refresh` draait eerst alle tests en bouwt daarna het Allure-rapport, ook als er tests falen.

Let op: elk rapport toont alleen de **laatste run**. Heb je net alleen `npm run test:mobiel` of een
`--grep` gedraaid, dan staan alleen die tests in het rapport. Voor volledige rapporten draai je
`npm run docs:refresh`.

### Allure los

| Commando | Wat het doet |
|---|---|
| `npm run allure:generate` | Bouwt `allure-report/` uit `allure-results/` |
| `npm run allure:open` | Opent het gebouwde rapport in de browser |
| `npm run allure:serve` | Bouwt een tijdelijk rapport en opent het meteen, in één stap |
| `npm run allure:clean` | Wist `allure-results/` (gebeurt ook automatisch bij `npm test`) |

`allure:open`, `allure:serve` en `livingdoc` starten een kleine webserver. Stop die met **Ctrl+C**.

---

## 6. Traces, screenshots en video

Standaard maakt Playwright een screenshot bij een gefaalde test.

```cmd
npm test -- --trace on
npx playwright show-trace test-results\<map-van-de-test>\trace.zip
```

| Optie | Wat het doet |
|---|---|
| `--trace on` | Trace van elke test: tijdlijn, DOM, netwerk en console |
| `--trace retain-on-failure` | Trace alleen bewaren als een test faalt |

In het Playwright-rapport (`npm run report`) open je een trace ook met één klik.

---

## 7. Snelheid, herhalen en stabiliteit

| Commando | Wat het doet |
|---|---|
| `npm test -- --workers=1` | Eén test tegelijk (handig bij debuggen) |
| `npm test -- --workers=4` | Vier tests tegelijk |
| `npm test -- --retries=2` | Een gefaalde test maximaal twee keer opnieuw proberen |
| `npm test -- --repeat-each=5` | Elke test vijf keer draaien, om instabiele (flaky) tests te vinden |
| `npm test -- --max-failures=1` | Stoppen bij de eerste fout |
| `npm test -- --timeout=60000` | Maximaal 60 seconden per test |
| `npm test -- --fully-parallel` | Ook scenario's binnen één feature parallel |

---

## 8. Tests opnemen (codegen)

Playwright kan klikken in de browser omzetten naar testcode. Start eerst de website in een eigen
CMD-venster en daarna codegen in een tweede:

```cmd
npx http-server . -p 4173 -c-1
```

```cmd
npx playwright codegen http://localhost:4173
npx playwright codegen --device="Pixel 7" http://localhost:4173
```

Gebruik de opgenomen code als basis voor een step definition in `tests/steps/`.

---

## 9. BDD: features en steps (playwright-bdd)

| Commando | Wat het doet |
|---|---|
| `npx bddgen` | Zet `tests/features/*.feature` om naar tests in `.features-gen/` |
| `npx bddgen export` | Lijst van alle beschikbare stappen (`Gegeven`, `Als`, `Dan`) |
| `npx bddgen test --tags "@mobiel"` | Alleen scenario's met die tag omzetten |
| `npx bddgen env` | Versies van Playwright en playwright-bdd tonen |

`npx bddgen export` is handig bij het schrijven van een nieuw scenario: je ziet welke zinnen al een
step definition hebben.

---

## 10. Playwright direct aanroepen (zonder npm)

Kan ook, maar dan moet je de voorbereiding zelf doen:

```cmd
npm run db:setup
npx bddgen
npx playwright test --project=mobiel --headed
```

Zonder `npm run db:setup` falen de `@database`-scenario's met *unable to open database file*.
Zonder `npx bddgen` draaien wijzigingen in de feature-bestanden niet mee.

---

## 11. Onderhoud

| Commando | Wat het doet |
|---|---|
| `npx playwright --version` | Geïnstalleerde Playwright-versie |
| `npm install -D @playwright/test@latest` | Playwright bijwerken |
| `npx playwright install chromium` | Na een update: de passende browser downloaden |
| `npx playwright install` | Alle browsers (Chromium, Firefox, WebKit) downloaden |

---

## 12. Bekende foutmeldingen

| Melding | Oplossing |
|---|---|
| `Executable doesn't exist at ...ms-playwright...` | `npx playwright install chromium` |
| `ERR_CONNECTION_REFUSED at http://localhost:4173` | De website draait niet; gebruik `npm run bekijk:mobiel` of start `npx http-server . -p 4173 -c-1` in een apart venster |
| `ExperimentalWarning: SQLite is an experimental feature` | Onschuldig, negeren; de database werkt gewoon |
| `unable to open database file` | `npm run db:setup` |
| `To get "bddgen" CLI please install "playwright-bdd"` | `npm install` (de pakketten ontbreken) |
| `'allure' is not recognized` of een Java-fout | `npm install` en controleer `java -version` |
| `Total: 0 tests in 0 files` | Controleer de schrijfwijze bij `--grep` en gebruik dubbele aanhalingstekens `"..."` (CMD kent geen enkele `'...'`) |
| Poort 4173 bezet | Sluit het andere venster met `http-server`, of laat het open: Playwright hergebruikt die server |
