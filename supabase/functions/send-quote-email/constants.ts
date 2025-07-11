export const SERVICE_DISPLAY_NAMES: { [key: string]: string } = {
  'new-airco': '🌬️ Nieuwe airco (koelen / verwarmen)',
  'heat-pump': '🔥 Warmtepomp',
  'maintenance': '🛠️ Onderhoud / service',
  'repair': '🚑 Reparatie / storing',
  'commissioning': '✅ Inbedrijfstelling gekocht systeem',
  'project-advice': '🏢 Advies groot project / VvE'
};

export const SERVICE_DETAIL_MAPPINGS: { [key: string]: string[] } = {
  'new-airco': [
    'Doel: {aircoPurpose}',
    'Aantal kamers: {roomCount}',
    'Grootte grootste kamer: {roomSize}',
    'Bouwjaar huis: {houseYear}',
    'Muurmateriaal: {wallMaterial}',
    'Locatie buitenunit: {outdoorUnitLocation}',
    'Elektrische aansluiting: {electrical}',
    'Voorkeursmerk: {brandPreference}',
    'Leidinglengte: {pipeLength}',
    'Condenswater afvoer: {condensationDrain}',
    'Opmerkingen: {comments}'
  ],
  'heat-pump': [
    'Huidige verwarming: {currentHeating}',
    'Isolatie/energielabel: {insulation}',
    'Gasverbruik per jaar: {gasConsumption}',
    'Verwarmd vloeroppervlak: {heatedArea}',
    'Afgiftesysteem: {emissionSystem}',
    'CV-leidingen diameter: {pipeDiameter}',
    'Gewenste oplossing: {solutionType}',
    'Opmerkingen: {comments}'
  ],
  'maintenance': [
    'Merk buitendeel: {outdoorBrand}',
    'Bouwjaar systeem: {systemYear}',
    'Laatste onderhoud: {lastMaintenance}',
    'Foutcode op display: {errorCode}',
    'Urgentie: {urgency}',
    'Opmerkingen: {comments}'
  ],
  'repair': [
    'Type apparaat: {deviceType}',
    'Probleem: {problem}',
    'Wanneer begon het: {problemStart}',
    'Urgentie: {urgency}',
    'Opmerkingen: {comments}'
  ],
  'commissioning': [
    'Merk systeem: {systemBrand}',
    'F-gassen certificaat: {certificate}',
    'Lengte koelleidingen: {pipeLength}',
    'Vacuum & druktest: {vacuumTest}',
    'Diameter leidingen: {pipeDiameter}',
    'Gewenste datum: {date}',
    'Opmerkingen: {comments}'
  ],
  'project-advice': [
    'Type pand/project: {propertyType}',
    'Omvang project: {projectSize}',
    'Projectfase: {projectPhase}',
    'Indicatief budget: {budget}',
    'Energie/CO2-doel: {energyGoal}',
    'Gewenste opleverdatum: {deliveryDate}',
    'Opmerkingen: {comments}'
  ]
};