export const hvacFlowConfigs = {
  'new-airco': {
    title: 'Nieuwe airco (koelen / verwarmen)',
    steps: [
      { id: 'airco-purpose', field: 'aircoPurpose', content: 'Wat wilt u precies?', type: 'choice', options: ['Alleen koelen', 'Alleen verwarmen', 'Koelen én verwarmen'] },
      { id: 'room-count', field: 'roomCount', content: 'Hoeveel kamers?', type: 'choice', options: ['1 kamer', '2', '3', '4 of meer'] },
      { id: 'room-size', field: 'roomSize', content: 'Hoe groot is de grootste kamer?', type: 'choice', options: ['Klein (< 20 m²)', 'Gemiddeld (20-35 m²)', 'Groot (35-50 m²)', 'Zeer groot (> 50 m²)'] },
      { id: 'house-year', field: 'houseYear', content: 'Bouwjaar / isolatie huis?', type: 'choice', options: ['Voor 1990', '1990-2010', 'Na 2010', 'Weet ik niet'] },
      { id: 'wall-material', field: 'wallMaterial', content: 'Materiaal muur binnenunit?', type: 'choice', options: ['Beton / steen', 'Hout / gips', 'Weet ik niet'] },
      { id: 'outdoor-unit-location', field: 'outdoorUnitLocation', content: 'Waar komt de buitenunit?', type: 'choice', options: ['Begane grond / balkon < 3 m', 'Gevel of dak hoger dan ≥ 3 m', 'Onbekend'] },
      { id: 'electrical', field: 'electrical', content: 'Wat staat er op uw zekeringkast?', type: 'choice', options: ['1 × 16 A', '1 × > 20 A', '3 × 25 A', 'Weet ik niet'] },
      { id: 'brand-preference', field: 'brandPreference', content: 'Voorkeursmerk?', type: 'choice', options: ['Daikin', 'Mitsubishi Heavy', 'Panasonic', 'Geen voorkeur'] },
      { id: 'pipe-length', field: 'pipeLength', content: 'Geschatte lengte leidingen (binnen → buiten)', type: 'choice', options: ['< 3 m', '3-10 m', '> 10 m', 'Weet ik niet'] },
      { id: 'condensation-drain', field: 'condensationDrain', content: 'Afvoer condenswater?', type: 'choice', options: ['Regenpijp buiten', 'Muurdoorvoer', 'Binnenafvoer', 'Onbekend'] },
      { id: 'photos', field: 'photos', content: 'Upload 2 foto\'s – binnenplek + buitenplek (optioneel)', type: 'text' },
      { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
      { id: 'personal-details', field: 'personalDetails', content: 'We hebben je persoonlijke gegevens nodig voor de offerte.', type: 'contact' },
      { id: 'contact-info', field: 'contactInfo', content: 'Bijna klaar! Laat je gegevens achter voor een snelle offerte.', type: 'contact' }
    ]
  },
  'heat-pump': {
    title: 'Warmtepomp',
    steps: [
      { id: 'current-heating', field: 'currentHeating', content: 'Huidige verwarming?', type: 'choice', options: ['CV-ketel < 2010', 'CV-ketel 2010-2020', 'CV-ketel > 2020', 'Volledig elektrisch'] },
      { id: 'insulation', field: 'insulation', content: 'Isolatie / energielabel?', type: 'choice', options: ['Label A/B', 'Label C/D', 'Label E/F/G', 'Weet ik niet'] },
      { id: 'gas-consumption', field: 'gasConsumption', content: 'Jaarlijks gasverbruik (schatting)', type: 'choice', options: ['< 800 m³', '800-1400 m³', '> 1400 m³', 'Weet ik niet'] },
      { id: 'heated-area', field: 'heatedArea', content: 'Verwarmd vloeroppervlak', type: 'choice', options: ['< 80 m²', '80-120 m²', '120-200 m²', '> 200 m²'] },
      { id: 'emission-system', field: 'emissionSystem', content: 'Afgiftesysteem', type: 'choice', options: ['Vloerverwarming', 'Lage-temperatuur radiatoren', 'Mix van beide', 'Onbekend'] },
      { id: 'pipe-diameter', field: 'pipeDiameter', content: 'Diameter cv-leidingen rond de ketel', type: 'choice', options: ['15 mm (½″)', '22 mm (¾″)', '28 mm (1″)', 'Gemengd / anders', 'Weet ik niet – ik upload een foto'] },
      { id: 'solution-type', field: 'solutionType', content: 'Gewenste oplossing', type: 'choice', options: ['Hybride (ketel + warmtepomp)', 'Volledig elektrisch'] },
      { id: 'photos', field: 'photos', content: 'Upload foto van meterkast + cv-ketel / technische ruimte', type: 'text' },
      { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
      { id: 'personal-details', field: 'personalDetails', content: 'We hebben je persoonlijke gegevens nodig voor de offerte.', type: 'contact' },
      { id: 'contact-info', field: 'contactInfo', content: 'Perfect! Laat je gegevens achter en we sturen je een uitgebreide offerte.', type: 'contact' }
    ]
  },
  'maintenance': {
    title: 'Onderhoud / service',
    steps: [
      { id: 'outdoor-brand', field: 'outdoorBrand', content: 'Merk buitendeel', type: 'choice', options: ['Daikin', 'Mitsubishi', 'Panasonic', 'Anders', 'Weet ik niet'] },
      { id: 'system-year', field: 'systemYear', content: 'Bouwjaar systeem', type: 'choice', options: ['< 2015', '2015-2020', '> 2020', 'Onbekend'] },
      { id: 'last-maintenance', field: 'lastMaintenance', content: 'Laatste onderhoud', type: 'choice', options: ['< 12 mnd', '1-2 jaar', '> 2 jaar', 'Nooit'] },
      { id: 'error-code', field: 'errorCode', content: 'Foutcode op display?', type: 'choice', options: ['Ja', 'Nee', 'Geen display'] },
      { id: 'urgency', field: 'urgency', content: 'Hoe snel nodig?', type: 'choice', options: ['Spoed (≤ 24 u)', 'Binnen 1 week', 'Preventief / controle'] },
      { id: 'photos', field: 'photos', content: 'Optioneel: upload foto van typeplaatje of foutcode', type: 'text' },
      { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
      { id: 'personal-details', field: 'personalDetails', content: 'We hebben je persoonlijke gegevens nodig voor de offerte.', type: 'contact' },
      { id: 'contact-info', field: 'contactInfo', content: 'We nemen zo snel mogelijk contact met je op voor het onderhoud!', type: 'contact' }
    ]
  },
  'repair': {
    title: 'Reparatie / storing',
    steps: [
      { id: 'device-type', field: 'deviceType', content: 'Welk apparaat doet het niet?', type: 'choice', options: ['Airco', 'Warmtepomp', 'Weet ik niet'] },
      { id: 'problem', field: 'problem', content: 'Wat is het probleem?', type: 'choice', options: ['Koelt of verwarmt niet', 'Lekt water', 'Maakt lawaai', 'Foutcode op display', 'Anders'] },
      { id: 'problem-start', field: 'problemStart', content: 'Wanneer begon het?', type: 'choice', options: ['Vandaag', 'Afgelopen week', '> 7 dagen', 'Weet ik niet'] },
      { id: 'urgency', field: 'urgency', content: 'Hoe snel wilt u hulp?', type: 'choice', options: ['Spoed (≤ 24 u)', '48 u', '3-5 dagen', 'Niet dringend'] },
      { id: 'media', field: 'media', content: 'Upload foto of korte video', type: 'text' },
      { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
      { id: 'personal-details', field: 'personalDetails', content: 'We hebben je persoonlijke gegevens nodig voor de offerte.', type: 'contact' },
      { id: 'contact-info', field: 'contactInfo', content: 'We gaan meteen aan de slag om je probleem op te lossen!', type: 'contact' }
    ]
  },
  'commissioning': {
    title: 'Inbedrijfstelling gekocht systeem',
    steps: [
      { id: 'system-brand', field: 'systemBrand', content: 'Merk van het systeem', type: 'choice', options: ['Daikin', 'Mitsubishi', 'Panasonic', 'Anders'] },
      { id: 'certificate', field: 'certificate', content: 'F-gassen certificaat installateur?', type: 'choice', options: ['Ja', 'Nee', 'Weet ik niet'] },
      { id: 'pipe-length', field: 'pipeLength', content: 'Lengte koelleidingen', type: 'choice', options: ['< 15 m', '15-30 m', '> 30 m', 'Weet ik niet'] },
      { id: 'vacuum-test', field: 'vacuumTest', content: 'Vacuüm- & druktest al gedaan?', type: 'choice', options: ['Ja', 'Nee', 'Weet ik niet'] },
      { id: 'pipe-diameter', field: 'pipeDiameter', content: 'Diameter leidingen (optioneel)', type: 'choice', options: ['¼-⅜″', '⅜-⅝″', 'Onbekend'] },
      { id: 'invoice', field: 'invoice', content: 'Upload aankoopfactuur', type: 'text' },
      { id: 'date', field: 'date', content: 'Gewenste datum inbedrijfstelling', type: 'text' },
      { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
      { id: 'personal-details', field: 'personalDetails', content: 'We hebben je persoonlijke gegevens nodig voor de offerte.', type: 'contact' },
      { id: 'contact-info', field: 'contactInfo', content: 'We plannen de inbedrijfstelling zo snel mogelijk in!', type: 'contact' }
    ]
  },
  'project-advice': {
    title: 'Advies groot project / VvE',
    steps: [
      { id: 'property-type', field: 'propertyType', content: 'Type pand / project', type: 'choice', options: ['Woningblok', 'Kantoorpand', 'VvE', 'Industrie', 'Anders'] },
      { id: 'project-size', field: 'projectSize', content: 'Omvang project', type: 'choice', options: ['< 10 won. / < 500 m²', '10-25 won. / 500-1 000 m²', '25 won. / > 1 000 m²', 'Weet ik niet'] },
      { id: 'project-phase', field: 'projectPhase', content: 'Projectfase', type: 'choice', options: ['Ontwerp', 'Aanbesteding', 'Installatie', 'Renovatie'] },
      { id: 'budget', field: 'budget', content: 'Indicatief budget', type: 'choice', options: ['< €25k', '€25-75k', '€75-150k', '> €150k', 'Nog geen budget'] },
      { id: 'energy-goal', field: 'energyGoal', content: 'Energie- / CO₂-doel (EPC/BENG)', type: 'choice', options: ['< 0,4', '0,4-0,6', '> 0,6', 'Weet ik niet'] },
      { id: 'delivery-date', field: 'deliveryDate', content: 'Gewenste opleverdatum', type: 'choice', options: ['< 3 mnd', '3-6 mnd', '> 6 mnd', 'Flexibel'] },
      { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
      { id: 'personal-details', field: 'personalDetails', content: 'We hebben je persoonlijke gegevens nodig voor de offerte.', type: 'contact' },
      { id: 'contact-info', field: 'contactInfo', content: 'We nemen contact op voor een uitgebreid adviesgesprek!', type: 'contact' }
    ]
  }
};