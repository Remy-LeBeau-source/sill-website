# language: nl
Functionaliteit: Veelgestelde vragen
  Als bezoeker
  wil ik antwoorden kunnen openklappen
  zodat ik alleen lees wat voor mij relevant is

  Achtergrond:
    Gegeven ik open de homepage

  Scenario: Alle vragen zijn standaard dicht
    Dan zijn alle 5 vragen dicht

  Scenario: Vraag openen en weer sluiten
    Als ik op de vraag "Hoe snel kan mijn website live?" klik
    Dan zie ik het antwoord "binnen 2 tot 3 weken"
    Als ik op de vraag "Hoe snel kan mijn website live?" klik
    Dan zie ik het antwoord "binnen 2 tot 3 weken" niet meer

  @database
  Scenario: Alle vragen uit de database geven het juiste antwoord
    Dan geeft elke vraag uit de database het verwachte antwoord
