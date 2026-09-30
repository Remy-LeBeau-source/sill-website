# language: nl
Functionaliteit: Contactformulier
  Als bezoeker
  wil ik via het formulier contact opnemen
  zodat ik een kennismaking kan aanvragen

  Achtergrond:
    Gegeven het openen van het mailprogramma wordt onderschept
    En ik open de homepage
    En ik scroll naar het contactformulier

  Scenario: Leeg formulier wordt niet verstuurd
    Als ik het formulier verstuur
    Dan wordt er geen mail geopend
    En is het veld "Naam" ongeldig

  Scenario: Ongeldig e-mailadres wordt geweigerd
    Als ik "Test" invul bij "Naam"
    En ik "geen-email" invul bij "E-mail"
    En ik het formulier verstuur
    Dan wordt er geen mail geopend
    En is het veld "E-mail" ongeldig

  Scenario: Geldig formulier opent een mail met de ingevulde gegevens
    Als ik "Jan Jansen" invul bij "Naam"
    En ik "jan@voorbeeld.nl" invul bij "E-mail"
    En ik "Ik wil een website" invul bij "Waar kan ik je mee helpen?"
    En ik het formulier verstuur
    Dan wordt er een mail geopend naar "info@sill-vyan.nl"
    En heeft de mail het onderwerp "Kennismaking aanvraag — Jan Jansen"
    En bevat de mailtekst "jan@voorbeeld.nl"
    En bevat de mailtekst "Ik wil een website"
    En zie ik de bevestiging "Bedankt!"

  @database
  Abstract Scenario: Testdata "<testdata>" uit de database
    Als ik het formulier invul met testdata "<testdata>"
    En ik het formulier verstuur
    Dan klopt de uitkomst met de verwachting voor testdata "<testdata>"

    Voorbeelden:
      | testdata         |
      | geldige-aanvraag |
      | zonder-bericht   |
      | speciale-tekens  |
      | ongeldig-email   |
      | lege-naam        |
      | leeg-email       |
