
// HVAC Quote Flow Configurations
// This file defines the step-by-step flow for different service types

export const hvacFlowConfigs = {
  'new-airco': {
    title: '🌬️ Nieuwe airco (koelen / verwarmen)',
    description: 'Complete flow voor nieuwe airconditioning installatie',
    estimatedTime: '5-7 minuten',
    steps: [
      {
        id: 'airco-purpose',
        field: 'aircoPurpose',
        content: '❄️🔥 Wat wilt u precies?',
        type: 'choice',
        options: ['❄️ Alleen koelen', '🔥 Alleen verwarmen', '❄️🔥 Koelen én verwarmen'],
        required: true
      },
      {
        id: 'room-count',
        field: 'roomCount',
        content: '🏠 Hoeveel kamers?',
        type: 'choice',
        options: ['1 kamer', '2 kamers', '3 kamers', '4 of meer kamers'],
        required: true
      },
      {
        id: 'room-size',
        field: 'roomSize',
        content: '📏 Hoe groot is de grootste kamer?',
        type: 'choice',
        options: ['Klein (< 20 m²)', 'Gemiddeld (20-35 m²)', 'Groot (35-50 m²)', 'Zeer groot (> 50 m²)'],
        required: true
      },
      {
        id: 'house-year',
        field: 'houseYear',
        content: '🏚️ Bouwjaar / isolatie huis?',
        type: 'choice',
        options: ['Voor 1990', '1990-2010', 'Na 2010', '🤷‍♂️ Weet ik niet'],
        required: true
      },
      {
        id: 'wall-material',
        field: 'wallMaterial',
        content: '🧱 Materiaal muur binnenunit?',
        type: 'choice',
        options: ['Beton / steen', 'Hout / gips', '🤷‍♂️ Weet ik niet'],
        required: true
      },
      {
        id: 'outdoor-unit-location',
        field: 'outdoorUnitLocation',
        content: '📍 Waar komt de buitenunit?',
        type: 'choice',
        options: ['Begane grond / balkon < 3 m', 'Gevel of dak hoger dan ≥ 3 m', '🤷‍♂️ Onbekend'],
        required: true
      },
      {
        id: 'electrical',
        field: 'electrical',
        content: '⚡ Wat staat er op uw zekeringkast?',
        type: 'choice',
        options: ['1 × 16 A', '1 × > 20 A', '3 × 25 A', '🤳 Weet ik niet'],
        required: true
      },
      {
        id: 'customer-type',
        field: 'customerType',
        content: '🏠 Voor wie is dit?',
        type: 'choice',
        options: ['🏠 Particulier', '🏢 Bedrijf / instelling'],
        required: true
      },
      {
        id: 'brand-preference',
        field: 'brandPreference',
        content: '🏷️ Voorkeursmerk?',
        type: 'choice',
        options: ['🔝 Daikin – topkwaliteit, stil en zuinig', '💰 Haier – voordelige basisoptie', '🤷‍♂️ Geen voorkeur'],
        conditionalOptions: {
          '🏢 Bedrijf / instelling': ['🔝 Daikin – topkwaliteit, stil en zuinig', '💰 Haier – voordelige basisoptie', '🏭 Mitsubishi Heavy – voor bedrijven', '🤷‍♂️ Geen voorkeur']
        },
        required: true
      },
      {
        id: 'pipe-length',
        field: 'pipeLength',
        content: '📐 Geschatte lengte leidingen (binnen → buiten)',
        type: 'choice',
        options: ['< 3 m', '3-10 m', '> 10 m', '🤷‍♂️ Weet ik niet'],
        required: false
      },
      {
        id: 'condensation-drain',
        field: 'condensationDrain',
        content: '💧 Afvoer condenswater?',
        type: 'choice',
        options: ['🔽 Loopt vanzelf weg (natuurlijk afschot)', '💧 Geen afloop / weet ik niet'],
        explanation: 'Als het niet vanzelf wegloopt, plaatsen wij een klein pompje.',
        required: false
      },
      {
        id: 'photos',
        field: 'photos',
        content: '📸 Upload 2 foto\'s – binnenplek + buitenplek (optioneel)',
        type: 'file-upload',
        maxFiles: 5,
        allowedTypes: ['image/*', 'video/*'],
        required: false
      },
      {
        id: 'comments',
        field: 'comments',
        content: 'Is er nog iets wat we moeten weten?',
        type: 'text',
        placeholder: 'Bijzondere wensen, vragen of opmerkingen...',
        required: false
      }
    ]
  },

  'heat-pump': {
    title: '🔥 Warmtepomp',
    description: 'Complete flow voor warmtepomp installatie',
    estimatedTime: '6-8 minuten',
    steps: [
      {
        id: 'current-heating',
        field: 'currentHeating',
        content: '🔥 Huidige verwarming?',
        type: 'choice',
        options: ['CV-ketel < 2010', 'CV-ketel 2010-2020', 'CV-ketel > 2020', 'Volledig elektrisch'],
        required: true
      },
      {
        id: 'insulation',
        field: 'insulation',
        content: '🏚️ Isolatie / energielabel?',
        type: 'choice',
        options: ['Label A/B', 'Label C/D', 'Label E/F/G', '🤷‍♂️ Weet ik niet'],
        required: true
      },
      {
        id: 'gas-consumption',
        field: 'gasConsumption',
        content: '⛽ Jaarlijks gasverbruik (schatting)',
        type: 'choice',
        options: ['< 800 m³', '800-1400 m³', '> 1400 m³', '🤷‍♂️ Weet ik niet'],
        required: true
      },
      {
        id: 'heated-area',
        field: 'heatedArea',
        content: '📏 Verwarmd vloeroppervlak',
        type: 'choice',
        options: ['< 80 m²', '80-120 m²', '120-200 m²', '> 200 m²'],
        required: true
      },
      {
        id: 'emission-system',
        field: 'emissionSystem',
        content: '🌡️ Afgiftesysteem',
        type: 'choice',
        options: ['Vloerverwarming', 'Lage-temperatuur radiatoren', 'Mix van beide', '🤷‍♂️ Onbekend'],
        required: true
      },
      {
        id: 'pipe-diameter',
        field: 'pipeDiameter',
        content: '📐 Diameter cv-leidingen rond de ketel',
        type: 'choice',
        options: ['15 mm (½″)', '22 mm (¾″)', '28 mm (1″)', 'Gemengd / anders', '🤳 Weet ik niet – ik upload een foto'],
        required: true
      },
      {
        id: 'solution-type',
        field: 'solutionType',
        content: '⚙️ Gewenste oplossing',
        type: 'choice',
        options: ['💧 Hybride (ketel + warmtepomp)', '🔌 Volledig elektrisch'],
        required: true
      },
      {
        id: 'photos',
        field: 'photos',
        content: '📸 Upload foto van meterkast + cv-ketel / technische ruimte',
        type: 'file-upload',
        maxFiles: 5,
        allowedTypes: ['image/*'],
        required: false
      },
      {
        id: 'comments',
        field: 'comments',
        content: 'Is er nog iets wat we moeten weten?',
        type: 'text',
        placeholder: 'Bijzondere wensen, vragen of opmerkingen...',
        required: false
      }
    ]
  },

  'maintenance': {
    title: '🛠️ Onderhoud / service',
    description: 'Onderhoudsaanvraag voor bestaande systemen',
    estimatedTime: '3-4 minuten',
    steps: [
      {
        id: 'outdoor-brand',
        field: 'outdoorBrand',
        content: '🏷️ Merk buitendeel',
        type: 'choice',
        options: ['Daikin', 'Mitsubishi', 'Panasonic', 'Anders', '🤷‍♂️ Weet ik niet'],
        required: true
      },
      {
        id: 'system-year',
        field: 'systemYear',
        content: '📅 Bouwjaar systeem',
        type: 'choice',
        options: ['< 2015', '2015-2020', '> 2020', 'Onbekend'],
        required: false
      },
      {
        id: 'last-maintenance',
        field: 'lastMaintenance',
        content: '🔧 Laatste onderhoud',
        type: 'choice',
        options: ['< 12 mnd', '1-2 jaar', '> 2 jaar', 'Nooit'],
        required: false
      },
      {
        id: 'error-code',
        field: 'errorCode',
        content: '⚠️ Foutcode op display?',
        type: 'choice',
        options: ['Ja, ik weet de code', 'Ja, maar weet code niet', 'Nee', 'Geen display'],
        required: false
      },
      {
        id: 'urgency',
        field: 'urgency',
        content: '⏱️ Hoe snel nodig?',
        type: 'choice',
        options: ['🚨 Spoed (≤ 24 u)', 'Binnen 1 week', 'Binnen 2 weken', 'Preventief / controle'],
        required: true
      },
      {
        id: 'photos',
        field: 'photos',
        content: '📸 Optioneel: upload foto van typeplaatje of foutcode',
        type: 'file-upload',
        maxFiles: 3,
        allowedTypes: ['image/*'],
        required: false
      },
      {
        id: 'comments',
        field: 'comments',
        content: 'Beschrijf het probleem of uw wens:',
        type: 'text',
        placeholder: 'Wat doet het systeem precies? Welke geluiden hoort u?',
        required: false
      }
    ]
  },

  'repair': {
    title: '🚑 Reparatie / storing',
    description: 'Spoedige reparatie van defecte systemen',
    estimatedTime: '2-3 minuten',
    steps: [
      {
        id: 'device-type',
        field: 'deviceType',
        content: '📟 Welk apparaat doet het niet?',
        type: 'choice',
        options: ['Airco (split unit)', 'Warmtepomp', 'Monoblock systeem', '🤷‍♂️ Weet ik niet'],
        required: true
      },
      {
        id: 'problem',
        field: 'problem',
        content: '❗ Wat is het probleem?',
        type: 'choice',
        options: ['❄️/🔥 Koelt of verwarmt niet', '💧 Lekt water', '🔊 Maakt lawaai', '⚠️ Foutcode op display', '⚡ Slaat af / geen stroom', 'Anders'],
        required: true
      },
      {
        id: 'problem-start',
        field: 'problemStart',
        content: '📆 Wanneer begon het probleem?',
        type: 'choice',
        options: ['Vandaag', 'Gisteren', 'Afgelopen week', '> 7 dagen geleden', '🤷‍♂️ Weet ik niet'],
        required: false
      },
      {
        id: 'urgency',
        field: 'urgency',
        content: '⏱️ Hoe snel wilt u hulp?',
        type: 'choice',
        options: ['🚨 Vandaag nog (spoed)', '📅 Morgen', '48 uur', '3-5 dagen', 'Niet dringend'],
        required: true
      },
      {
        id: 'media',
        field: 'media',
        content: '📸/🎥 Upload foto of korte video van het probleem',
        type: 'file-upload',
        maxFiles: 5,
        allowedTypes: ['image/*', 'video/*'],
        required: false
      },
      {
        id: 'comments',
        field: 'comments',
        content: 'Beschrijf het probleem in detail:',
        type: 'text',
        placeholder: 'Wat doet het apparaat? Welke geluiden? Wanneer treedt het op?',
        required: false
      }
    ]
  },

  'commissioning': {
    title: '✅ Inbedrijfstelling gekocht systeem',
    description: 'Professionele inbedrijfstelling van zelf gekochte apparatuur',
    estimatedTime: '4-5 minuten',
    steps: [
      {
        id: 'system-brand',
        field: 'systemBrand',
        content: '🏷️ Merk van het systeem',
        type: 'choice',
        options: ['Daikin', 'Mitsubishi', 'Panasonic', 'Samsung', 'LG', 'Anders'],
        required: true
      },
      {
        id: 'system-type',
        field: 'systemType',
        content: '📦 Type systeem',
        type: 'choice',
        options: ['Single split (1 binnen + 1 buiten)', 'Multi split (meerdere binnen)', 'Warmtepomp lucht/water', 'Monoblock systeem'],
        required: true
      },
      {
        id: 'certificate',
        field: 'certificate',
        content: '📜 Is installatie gedaan door gecertificeerde installateur?',
        type: 'choice',
        options: ['Ja, met F-gassen certificaat', 'Ja, maar onbekend of gecertificeerd', 'Nee, zelf geïnstalleerd', '🤷‍♂️ Weet ik niet'],
        required: true
      },
      {
        id: 'pipe-length',
        field: 'pipeLength',
        content: '📐 Lengte koelleidingen',
        type: 'choice',
        options: ['< 15 m', '15-30 m', '> 30 m', '🤷‍♂️ Weet ik niet'],
        required: false
      },
      {
        id: 'vacuum-test',
        field: 'vacuumTest',
        content: '🔧 Is vacuüm- & druktest al gedaan?',
        type: 'choice',
        options: ['Ja, door installateur', 'Nee, nog niet gedaan', '🤷‍♂️ Weet ik niet'],
        required: true
      },
      {
        id: 'pipe-diameter',
        field: 'pipeDiameter',
        content: '⚙️ Diameter leidingen (optioneel)',
        type: 'choice',
        options: ['¼-⅜″', '⅜-⅝″', '⅝-¾″', 'Onbekend'],
        required: false
      },
      {
        id: 'invoice',
        field: 'invoice',
        content: '📄 Upload aankoopfactuur (voor garantie)',
        type: 'file-upload',
        maxFiles: 2,
        allowedTypes: ['image/*', '.pdf'],
        required: false
      },
      {
        id: 'preferred-date',
        field: 'preferredDate',
        content: '📅 Gewenste datum inbedrijfstelling',
        type: 'choice',
        options: ['Deze week', 'Volgende week', 'Over 2 weken', 'Flexibel'],
        required: true
      },
      {
        id: 'comments',
        field: 'comments',
        content: 'Aanvullende informatie:',
        type: 'text',
        placeholder: 'Bijzonderheden over de installatie, toegang, etc.',
        required: false
      }
    ]
  },

  'project-advice': {
    title: '🏢 Advies groot project / VvE',
    description: 'Professioneel advies voor grote projecten',
    estimatedTime: '5-6 minuten',
    steps: [
      {
        id: 'property-type',
        field: 'propertyType',
        content: '🏢 Type pand / project',
        type: 'choice',
        options: ['Woningblok / appartementen', 'Kantoorpand', 'VvE / vereniging', 'Industrieel pand', 'Zorginstelling', 'Anders'],
        required: true
      },
      {
        id: 'project-size',
        field: 'projectSize',
        content: '📏 Omvang project',
        type: 'choice',
        options: ['< 10 woningen / < 500 m²', '10-25 woningen / 500-1000 m²', '25-50 woningen / 1000-2000 m²', '> 50 woningen / > 2000 m²'],
        required: true
      },
      {
        id: 'project-phase',
        field: 'projectPhase',
        content: '📂 In welke fase bevindt het project zich?',
        type: 'choice',
        options: ['✏️ Ontwerp / planning', '📑 Aanbesteding', '🔧 Ready voor installatie', '🛠️ Renovatie bestaand'],
        required: true
      },
      {
        id: 'budget',
        field: 'budget',
        content: '💶 Indicatief budget',
        type: 'choice',
        options: ['< €25.000', '€25.000 - €75.000', '€75.000 - €150.000', '> €150.000', 'Nog geen budget vastgesteld'],
        required: false
      },
      {
        id: 'energy-goal',
        field: 'energyGoal',
        content: '🌱 Energie- / CO₂-doelstelling?',
        type: 'choice',
        options: ['Energielabel verbetering', 'CO₂ neutraal', 'Gasloos', 'Kostenreductie', '🤷‍♂️ Weet ik niet'],
        required: false
      },
      {
        id: 'delivery-date',
        field: 'deliveryDate',
        content: '📅 Gewenste opleverdatum',
        type: 'choice',
        options: ['< 3 maanden', '3-6 maanden', '6-12 maanden', '> 12 maanden', 'Flexibel'],
        required: false
      },
      {
        id: 'decision-makers',
        field: 'decisionMakers',
        content: '👥 Wie zijn betrokken bij besluitvorming?',
        type: 'choice',
        options: ['Alleen ikzelf', 'VvE bestuur', 'Eigenaren vergadering', 'Management + technisch', 'Externe adviseur'],
        required: false
      },
      {
        id: 'comments',
        field: 'comments',
        content: 'Projectomschrijving en wensen:',
        type: 'text',
        placeholder: 'Beschrijf uw project, specifieke wensen, uitdagingen, etc.',
        required: false
      }
    ]
  }
};

// Service display names for UI
export const serviceDisplayNames = {
  'new-airco': '🌬️ Nieuwe airco (koelen / verwarmen)',
  'heat-pump': '🔥 Warmtepomp',
  'maintenance': '🛠️ Onderhoud / service',
  'repair': '🚑 Reparatie / storing',
  'commissioning': '✅ Inbedrijfstelling gekocht systeem',
  'project-advice': '🏢 Advies groot project / VvE'
};

// Helper functions
export function getFlowConfig(serviceType) {
  return hvacFlowConfigs[serviceType] || null;
}

export function getServiceDisplayName(serviceType) {
  return serviceDisplayNames[serviceType] || serviceType;
}

export function getAllServices() {
  return Object.keys(hvacFlowConfigs);
}

export function getStepById(serviceType, stepId) {
  const config = getFlowConfig(serviceType);
  return config?.steps.find(step => step.id === stepId) || null;
}

// Validation helpers
export function validateStepResponse(serviceType, stepId, response) {
  const step = getStepById(serviceType, stepId);
  if (!step) return { valid: false, error: 'Step not found' };
  
  if (step.required && (!response || response === '')) {
    return { valid: false, error: 'This field is required' };
  }
  
  if (step.type === 'choice' && response && !step.options.includes(response)) {
    return { valid: false, error: 'Invalid choice' };
  }
  
  return { valid: true };
}

// Export default
export default hvacFlowConfigs;
