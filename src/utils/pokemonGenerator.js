import POKEMON from "../assets/species";
import STATS from "../assets/stats";
import { getHP, getStat } from "./statsCalculator";

const minPokemon = 0;
const maxPokemon = 25;

export const getRandomPokemon = () => {
  const random = Math.floor(
    Math.random() * (maxPokemon - minPokemon + 1) + minPokemon
  );

  const currentPokemon = POKEMON[random];
  currentPokemon.level = getRandomLevel();
  currentPokemon.ivs = getRandomIVs();
  currentPokemon.evs = getRandomEVs();
  currentPokemon.stats = getStats(currentPokemon);
  return currentPokemon;
};

const getRandomLevel = () => {
  return Math.floor(Math.random() * (100 - 0 + 1) + 0);
};

const getRandomIV = () => {
  return Math.floor(Math.random() * (31 - 0 + 1) + 0);
};

const getRandomIVs = () => {
  return {
    [STATS.HP]: getRandomIV(),
    [STATS.ATTACK]: getRandomIV(),
    [STATS.DEFENSE]: getRandomIV(),
    [STATS.SPATTACK]: getRandomIV(),
    [STATS.SPDEFENSE]: getRandomIV(),
    [STATS.SPEED]: getRandomIV(),
  };
};

const getRandomEVs = () => {
  let evAllow = 510;
  const maxByStat = 255;

  const temporaryEvs = [0, 0, 0, 0, 0, 0];

  for (evAllow; evAllow--; evAllow > 0) {
    const random = Math.floor(Math.random() * (5 - 0 + 1) + 0);
    if (temporaryEvs[random] < maxByStat) {
      temporaryEvs[random]++;
    }
  }

  const evs = {
    [STATS.HP]: temporaryEvs[0],
    [STATS.ATTACK]: temporaryEvs[1],
    [STATS.DEFENSE]: temporaryEvs[2],
    [STATS.SPATTACK]: temporaryEvs[3],
    [STATS.SPDEFENSE]: temporaryEvs[4],
    [STATS.SPEED]: temporaryEvs[5],
  };

  return evs;
};

const getStats = (currentPokemon) => {
  return {
    [STATS.HP]: getHP(
      currentPokemon.baseStats[STATS.HP],
      currentPokemon.ivs[STATS.HP],
      currentPokemon.evs[STATS.HP],
      currentPokemon.level
    ),
    [STATS.ATTACK]: getStat(
      currentPokemon.baseStats[STATS.ATTACK],
      currentPokemon.ivs[STATS.ATTACK],
      currentPokemon.evs[STATS.ATTACK],
      currentPokemon.level
    ),
    [STATS.DEFENSE]: getStat(
      currentPokemon.baseStats[STATS.DEFENSE],
      currentPokemon.ivs[STATS.DEFENSE],
      currentPokemon.evs[STATS.DEFENSE],
      currentPokemon.level
    ),
    [STATS.SPATTACK]: getStat(
      currentPokemon.baseStats[STATS.SPATTACK],
      currentPokemon.ivs[STATS.SPATTACK],
      currentPokemon.evs[STATS.SPATTACK],
      currentPokemon.level
    ),
    [STATS.SPDEFENSE]: getStat(
      currentPokemon.baseStats[STATS.SPDEFENSE],
      currentPokemon.ivs[STATS.SPDEFENSE],
      currentPokemon.evs[STATS.SPDEFENSE],
      currentPokemon.level
    ),
    [STATS.SPEED]: getStat(
      currentPokemon.baseStats[STATS.SPEED],
      currentPokemon.ivs[STATS.SPEED],
      currentPokemon.evs[STATS.SPEED],
      currentPokemon.level
    ),
  };
};
