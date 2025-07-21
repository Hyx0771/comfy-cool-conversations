
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FAQ[] = [
  {
    id: 1,
    question: "Wat kost een nieuwe airco installatie?",
    answer: "De kosten voor een nieuwe airco installatie variëren tussen €800-€2500, afhankelijk van het type systeem, de grootte van de ruimte en de complexiteit van de installatie. Voor een nauwkeurige prijsopgave maken we graag een vrijblijvende afspraak."
  },
  {
    id: 2,
    question: "Hoe vaak moet ik mijn airco laten onderhouden?",
    answer: "We adviseren jaarlijks onderhoud voor optimale prestaties en levensduur. Voor intensief gebruik (zoals kantoorpanden) adviseren we 2x per jaar onderhoud. Dit voorkomt storingen en houdt uw energierekening laag."
  },
  {
    id: 3,
    question: "Welke merken airco's installeren jullie?",
    answer: "We installeren topmerken zoals Mitsubishi, Daikin, Panasonic en LG. We kiezen altijd het best passende merk voor uw situatie en budget. Alle merken komen met fabrieksgarantie."
  },
  {
    id: 4,
    question: "Hoe lang duurt een airco installatie?",
    answer: "Een standaard airco installatie duurt 4-6 uur. Voor complexere installaties kan dit 1-2 dagen duren. We plannen altijd realistisch en houden u op de hoogte van de voortgang."
  },
  {
    id: 5,
    question: "Wat voor garantie krijg ik?",
    answer: "U krijgt 2 jaar volledige garantie op ons installatiewerk plus de fabrieksgarantie op het apparaat (meestal 5-7 jaar). We bieden ook uitgebreide garantiepakketten aan voor extra zekerheid."
  },
  {
    id: 6,
    question: "Kunnen jullie ook warmtepompen installeren?",
    answer: "Ja, we zijn specialist in zowel lucht-water als lucht-lucht warmtepompen. Van advies tot installatie en onderhoud - we regelen alles voor een duurzame en energiezuinige oplossing."
  }
];

export const fallbackResponse = "Dank je voor je vraag! Ik kan daar niet direct antwoord op geven, maar onze specialisten helpen je graag verder. Laat je contactgegevens achter en we nemen binnen 24 uur contact op! 😊";
