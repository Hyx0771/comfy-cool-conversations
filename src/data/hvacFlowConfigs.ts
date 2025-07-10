export const hvacFlowConfigs = {
  'ac-installation': {
    title: 'Airco Installatie',
    steps: [
      { id: 'property-type', field: 'propertyType', content: 'Wat voor type woning heb je?', type: 'choice', options: ['Appartement', 'Rijtjeshuis', 'Vrijstaand huis', 'Kantoor'] },
      { id: 'room-size', field: 'roomSize', content: 'Hoe groot is de ruimte die je wilt koelen?', type: 'choice', options: ['Klein (tot 20m²)', 'Middel (20-40m²)', 'Groot (40-60m²)', 'Extra groot (60m²+)'] },
      { id: 'urgency', field: 'urgency', content: 'Hoe snel wil je de installatie?', type: 'choice', options: ['Deze week', 'Binnen 2 weken', 'Binnen een maand', 'Geen haast'] },
      { id: 'budget', field: 'budget', content: 'Wat is je budget voor de installatie?', type: 'choice', options: ['€500-1000', '€1000-2000', '€2000-3000', '€3000+'] },
      { id: 'existing-system', field: 'existingSystem', content: 'Heb je al een bestaand koelsysteem?', type: 'choice', options: ['Ja, werkt nog', 'Ja, maar kapot', 'Nee, helemaal nieuw'] },
      { id: 'additional-info', field: 'additionalInfo', content: 'Heb je nog aanvullende wensen of opmerkingen?', type: 'text' },
      { id: 'contact-info', field: 'contactInfo', content: 'Perfect! Laat je contactgegevens achter zodat we je kunnen helpen.', type: 'contact' }
    ]
  },
  'heating-repair': {
    title: 'Verwarming Reparatie',
    steps: [
      { id: 'heating-type', field: 'heatingType', content: 'Wat voor verwarmingssysteem heb je?', type: 'choice', options: ['CV-ketel', 'Warmtepomp', 'Radiatoren', 'Vloerverwarming'] },
      { id: 'problem-description', field: 'problemDescription', content: 'Wat is het probleem met je verwarming?', type: 'choice', options: ['Geen warmte', 'Vreemde geluiden', 'Hoge energierekening', 'Anders'] },
      { id: 'urgency', field: 'urgency', content: 'Hoe urgent is de reparatie?', type: 'choice', options: ['Spoeddienst (vandaag)', 'Deze week', 'Binnen 2 weken', 'Kan wachten'] },
      { id: 'system-age', field: 'systemAge', content: 'Hoe oud is je verwarmingssysteem?', type: 'choice', options: ['Minder dan 5 jaar', '5-10 jaar', '10-15 jaar', 'Ouder dan 15 jaar'] },
      { id: 'previous-maintenance', field: 'previousMaintenance', content: 'Wanneer is je systeem voor het laatst onderhouden?', type: 'choice', options: ['Dit jaar', 'Vorig jaar', '2-3 jaar geleden', 'Langer geleden'] },
      { id: 'additional-info', field: 'additionalInfo', content: 'Beschrijf het probleem in detail:', type: 'text' },
      { id: 'contact-info', field: 'contactInfo', content: 'Bijna klaar! Laat je gegevens achter voor een snelle reparatie.', type: 'contact' }
    ]
  },
  'maintenance': {
    title: 'Onderhoud',
    steps: [
      { id: 'system-type', field: 'systemType', content: 'Welk systeem wil je laten onderhouden?', type: 'choice', options: ['Airco', 'CV-ketel', 'Warmtepomp', 'Vloerverwarming'] },
      { id: 'maintenance-type', field: 'maintenanceType', content: 'Wat voor onderhoud heb je nodig?', type: 'choice', options: ['Jaarlijks onderhoud', 'Grote beurt', 'Preventief onderhoud', 'Storing opsporen'] },
      { id: 'system-age', field: 'systemAge', content: 'Hoe oud is het systeem?', type: 'choice', options: ['Minder dan 2 jaar', '2-5 jaar', '5-10 jaar', 'Ouder dan 10 jaar'] },
      { id: 'last-maintenance', field: 'lastMaintenance', content: 'Wanneer is het laatste onderhoud uitgevoerd?', type: 'choice', options: ['Dit jaar', 'Vorig jaar', '2 jaar geleden', 'Langer geleden'] },
      { id: 'urgency', field: 'urgency', content: 'Wanneer wil je het onderhoud laten uitvoeren?', type: 'choice', options: ['Deze week', 'Binnen 2 weken', 'Binnen een maand', 'Flexibel'] },
      { id: 'additional-info', field: 'additionalInfo', content: 'Heb je specifieke wensen of opmerkingen?', type: 'text' },
      { id: 'contact-info', field: 'contactInfo', content: 'Perfect! Laat je gegevens achter en we plannen het onderhoud in.', type: 'contact' }
    ]
  }
};