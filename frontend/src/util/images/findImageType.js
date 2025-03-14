import {
  builderhallNames,
  builderleagueNames,
  clanwarleagueNames,
  heroequipmentNames,
  heroNames,
  miscNames,
  petNames,
  siegeNames,
  spellNames,
  superTroopNames,
  townhallNames,
  troopNames,
} from './imageCategories'; // Import the lists

function findImageType(name) {
  if (builderhallNames.includes(name)) return 'builderhalls';
  if (builderleagueNames.includes(name)) return 'builderleagues';
  if (clanwarleagueNames.includes(name)) return 'clanwarleagues';
  if (heroequipmentNames.includes(name)) return 'heroequipment';
  if (heroNames.includes(name)) return 'heroes';
  if (miscNames.includes(name)) return 'misc';
  if (petNames.includes(name)) return 'pets';
  if (siegeNames.includes(name)) return 'sieges';
  if (spellNames.includes(name)) return 'spells';
  if (superTroopNames.includes(name)) return 'supers';
  if (townhallNames.includes(name)) return 'townhalls';
  if (troopNames.includes(name)) return 'troops';

  console.warn(`Unknown image category for: ${name}`);
  return null;
}

export default findImageType;
