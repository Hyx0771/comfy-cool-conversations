
import { ConversationFlow } from '../types/conversation-types';

export const hvacFlowConfigs: Record<string, ConversationFlow> = {
  'new-airco': {
    title: 'Nieuwe airco (koelen / verwarmen)',
    steps: [
      {
        id: 'purpose',
        type: 'choice',
        content: 'Waarvoor wil je de airco gebruiken? 🌡️',
        field: 'aircoPurpose',
        choices: ['Alleen koelen', 'Alleen verwarmen', 'Koelen én verwarmen', 'Weet ik nog niet']
      },
      {
        id: 'rooms',
        type: 'choice',
        content: 'Hoeveel kamers wil je koelen/verwarmen? 🏠',
        field: 'roomCount',
        choices: ['1 kamer', '2-3 kamers', '4-5 kamers', 'Meer dan 5 kamers']
      },
      {
        id: 'room-size',
        type: 'choice',
        content: 'Hoe groot is de grootste kamer? 📏',
        field: 'roomSize',
        choices: ['Tot 25 m²', '25-40 m²', '40-60 m²', 'Meer dan 60 m²']
      },
      {
        id: 'house-year',
        type: 'choice',
        content: 'Wanneer is je huis gebouwd? 🏗️',
        field: 'houseYear',
        choices: ['Voor 1980', '1980-2000', '2000-2010', 'Na 2010']
      },
      {
        id: 'wall-material',
        type: 'choice',
        content: 'Wat voor muren heeft je huis? 🧱',
        field: 'wallMaterial',
        choices: ['Baksteen', 'Beton', 'Hout', 'Spouwmuur', 'Weet ik niet']
      },
      {
        id: 'outdoor-location',
        type: 'choice',
        content: 'Waar kan de buitenunit komen? 🌿',
        field: 'outdoorUnitLocation',
        choices: ['Tuin/terras', 'Balkon', 'Dak', 'Tegen gevel', 'Weet ik niet']
      },
      {
        id: 'electrical',
        type: 'choice',
        content: 'Is er een 230V stopcontact in de buurt? ⚡',
        field: 'electrical',
        choices: ['Ja, binnen 3 meter', 'Nee, moet aangelegd worden', 'Weet ik niet']
      },
      {
        id: 'brand-preference',
        type: 'choice',
        content: 'Heb je een voorkeursmerk? 🏷️',
        field: 'brandPreference',
        choices: ['Mitsubishi', 'Daikin', 'LG', 'Panasonic', 'Geen voorkeur']
      },
      {
        id: 'pipe-length',
        type: 'choice',
        content: 'Afstand van binnen- naar buitenunit? 📐',
        field: 'pipeLength',
        choices: ['Tot 5 meter', '5-10 meter', '10-15 meter', 'Meer dan 15 meter']
      },
      {
        id: 'condensation',
        type: 'choice',
        content: 'Hoe kan condenswater weggelopen worden? 💧',
        field: 'condensationDrain',
        choices: ['Via raam naar buiten', 'Via bestaande afvoer', 'Nieuwe afvoer aanleggen', 'Weet ik niet']
      },
      {
        id: 'comments',
        type: 'text',
        content: 'Heb je nog specifieke wensen of vragen? 📝',
        field: 'comments'
      },
      {
        id: 'photos',
        type: 'file',
        content: 'Upload foto\'s van de ruimte en gewenste locaties (optioneel) 📸',
        field: 'photos'
      },
      {
        id: 'personal-details',
        type: 'personal-details',
        content: 'Vul je contactgegevens in voor de offerte 👤',
        field: 'personalDetails'
      },
      {
        id: 'contact-info',
        type: 'contact',
        content: 'Hoe wil je de offerte ontvangen? 📞',
        field: 'contactMethod'
      }
    ]
  },
  'heat-pump': {
    title: 'Warmtepomp',
    steps: [
      {
        id: 'current-heating',
        type: 'choice',
        content: 'Wat is je huidige verwarming? 🔥',
        field: 'currentHeating',
        choices: ['CV-ketel op gas', 'Elektrische verwarming', 'Warmtepomp', 'Andere']
      },
      {
        id: 'insulation',
        type: 'choice',
        content: 'Hoe is de isolatie van je huis? 🏠',
        field: 'insulation',
        choices: ['Goed geïsoleerd (label A/B)', 'Redelijk geïsoleerd (label C/D)', 'Slecht geïsoleerd (label E/F/G)', 'Weet ik niet']
      },
      {
        id: 'gas-consumption',
        type: 'choice',
        content: 'Hoeveel m³ gas verbruik je per jaar? ⛽',
        field: 'gasConsumption',
        choices: ['Minder dan 1000 m³', '1000-1500 m³', '1500-2500 m³', 'Meer dan 2500 m³']
      },
      {
        id: 'heated-area',
        type: 'choice',
        content: 'Hoeveel m² wordt er verwarmd? 📏',
        field: 'heatedArea',
        choices: ['Tot 100 m²', '100-150 m²', '150-200 m²', 'Meer dan 200 m²']
      },
      {
        id: 'emission-system',
        type: 'choice',
        content: 'Wat voor afgiftesysteem heb je? 🌡️',
        field: 'emissionSystem',
        choices: ['Radiatoren', 'Vloerverwarming', 'Combinatie', 'Weet ik niet']
      },
      {
        id: 'pipe-diameter',
        type: 'choice',
        content: 'Diameter van je CV-leidingen? 🔧',
        field: 'pipeDiameter',
        choices: ['22mm', '28mm', 'Weet ik niet']
      },
      {
        id: 'solution-type',
        type: 'choice',
        content: 'Welke oplossing zoek je? 💡',
        field: 'solutionType',
        choices: ['Hybride warmtepomp', 'Volledige warmtepomp', 'Advies op maat']
      },
      {
        id: 'comments',
        type: 'text',
        content: 'Aanvullende informatie of wensen? 📝',
        field: 'comments'
      },
      {
        id: 'personal-details',
        type: 'personal-details',
        content: 'Contactgegevens voor offerte 👤',
        field: 'personalDetails'
      },
      {
        id: 'contact-info',
        type: 'contact',
        content: 'Hoe wil je contact? 📞',
        field: 'contactMethod'
      }
    ]
  }
  // Add more service configurations as needed
};
