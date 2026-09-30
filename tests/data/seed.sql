INSERT INTO contact_testdata (sleutel, omschrijving, naam, email, bericht, verwacht_geldig, ongeldig_veld) VALUES
  ('geldige-aanvraag',    'Standaard aanvraag',                 'Jan Jansen',  'jan@voorbeeld.nl',  'Ik wil een website',                    1, NULL),
  ('zonder-bericht',      'Bericht is optioneel',               'Piet de Vries','piet@voorbeeld.nl', '',                                      1, NULL),
  ('speciale-tekens',     'Accenten, & en % moeten goed door',  'Zoë & Dévi',  'zoe@voorbeeld.nl',  'Vraag: 50% korting? Ja/nee — graag!',   1, NULL),
  ('ongeldig-email',      'E-mailadres zonder @',               'Test',        'geen-email',        'Hallo',                                 0, 'E-mail'),
  ('lege-naam',           'Naam is verplicht',                  '',            'leeg@voorbeeld.nl', 'Hallo',                                 0, 'Naam'),
  ('leeg-email',          'E-mail is verplicht',                'Karin',       '',                  'Hallo',                                 0, 'E-mail');

INSERT INTO navigatie_testdata (link, sectie) VALUES
  ('Werk',      'werk'),
  ('Diensten',  'diensten'),
  ('Werkwijze', 'werkwijze'),
  ('Pakketten', 'pakketten'),
  ('FAQ',       'faq');

INSERT INTO faq_testdata (vraag, antwoord_fragment) VALUES
  ('Hoe snel kan mijn website live?',                    'binnen 2 tot 3 weken'),
  ('Wat kost een website of automatisering?',            'vaste prijs'),
  ('Ben ik na oplevering afhankelijk van Sill-vyan?',    'overdraagbaar'),
  ('Werk je alleen aan AI-projecten?',                   'alleen een website'),
  ('Moet ik zelf technische kennis hebben?',             'begrijpelijke taal');
