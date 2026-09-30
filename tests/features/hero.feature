# language: nl
Functionaliteit: Hero en cijferbalk
  Als bezoeker
  wil ik direct zien wie Sill-vyan is en wat er geboden wordt

  Achtergrond:
    Gegeven ik open de homepage

  Scenario: Kop en call-to-actions zijn zichtbaar
    Dan zie ik de kop "Minder handwerk."
    En zie ik de knop "Plan een gratis kennismaking"
    En zie ik de knop "Bekijk projecten"

  Scenario: Foto van Sill-vyan wordt goed getoond
    Dan is de foto van Sill-vyan geladen
    En vult de foto de kaart zonder uitgerekt te worden

  Scenario: Cijfers tellen op tot hun eindwaarde
    Als ik naar de cijferbalk scroll
    Dan toont de cijferbalk de waarden:
      | 25 | 10+ | 2 wkn | 100% |
