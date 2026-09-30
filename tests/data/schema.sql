-- Testdata voor de Playwright-tests van de Sill-vyan-site.
-- Wordt opgebouwd met: npm run db:setup  (maakt tests/data/testdata.db)

DROP TABLE IF EXISTS contact_testdata;
CREATE TABLE contact_testdata (
  sleutel         TEXT PRIMARY KEY,          -- naam waarmee een scenario de rij ophaalt
  omschrijving    TEXT NOT NULL,
  naam            TEXT NOT NULL,
  email           TEXT NOT NULL,
  bericht         TEXT NOT NULL,
  verwacht_geldig INTEGER NOT NULL CHECK (verwacht_geldig IN (0, 1)),
  ongeldig_veld   TEXT                        -- label van het veld dat de browser moet afkeuren
);

DROP TABLE IF EXISTS navigatie_testdata;
CREATE TABLE navigatie_testdata (
  link   TEXT PRIMARY KEY,                    -- tekst van de menu-link
  sectie TEXT NOT NULL                        -- id van de sectie waar de link heen moet
);

DROP TABLE IF EXISTS faq_testdata;
CREATE TABLE faq_testdata (
  vraag             TEXT PRIMARY KEY,
  antwoord_fragment TEXT NOT NULL             -- stukje tekst dat in het antwoord moet staan
);
