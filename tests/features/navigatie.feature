# language: nl
@desktop
Functionaliteit: Navigatie
  Als bezoeker
  wil ik via het menu snel naar de juiste sectie gaan
  zodat ik vind wat ik zoek

  Achtergrond:
    Gegeven ik open de homepage

  Abstract Scenario: Menu-link "<link>" brengt me naar de sectie
    Als ik in het menu op "<link>" klik
    Dan is de sectie "<sectie>" in beeld
    En de URL eindigt op "#<sectie>"

    Voorbeelden:
      | link      | sectie    |
      | Werk      | werk      |
      | Diensten  | diensten  |
      | Werkwijze | werkwijze |
      | Pakketten | pakketten |
      | FAQ       | faq       |

  @database
  Scenario: Alle menu-links uit de database werken
    Dan brengt elke menu-link uit de database me naar de juiste sectie

  Scenario: Knop "Gratis gesprek" in de header gaat naar contact
    Als ik op de knop "Gratis gesprek" in de header klik
    Dan is de sectie "contact" in beeld
