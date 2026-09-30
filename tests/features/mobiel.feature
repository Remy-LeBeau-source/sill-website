# language: nl
@mobiel
Functionaliteit: Mobiele weergave
  Als bezoeker op mijn telefoon
  wil ik de site goed kunnen gebruiken
  zodat ik niet hoef in te zoomen of opzij te scrollen

  Achtergrond:
    Gegeven ik open de homepage

  Scenario: Hamburgermenu openen, kiezen en automatisch sluiten
    Dan is het mobiele menu gesloten
    Als ik op de menuknop klik
    Dan is het mobiele menu open
    Als ik in het mobiele menu op "Diensten" klik
    Dan is het mobiele menu gesloten
    En de sectie "diensten" is in beeld

  Scenario: Hamburgermenu weer dichtklikken
    Als ik op de menuknop klik
    En ik op de menuknop klik
    Dan is het mobiele menu gesloten

  Scenario: Geen horizontale scroll
    Dan kan de pagina niet horizontaal scrollen
