import { getHP, getStat } from "../utils/statsCalculator";
import STATS from "./stats";
import POKEMON from "./species";
import { generateId } from "../utils/idGenerator";

const getStats = (currentPokemon, ivs, evs) => {
  return {
    [STATS.HP]: getHP(
      currentPokemon.baseStats[STATS.HP],
      ivs[STATS.HP],
      evs[STATS.HP],
      currentPokemon.level
    ),
    [STATS.ATTACK]: getStat(
      currentPokemon.baseStats[STATS.ATTACK],
      ivs[STATS.ATTACK],
      evs[STATS.ATTACK],
      currentPokemon.level
    ),
    [STATS.DEFENSE]: getStat(
      currentPokemon.baseStats[STATS.DEFENSE],
      ivs[STATS.DEFENSE],
      evs[STATS.DEFENSE],
      currentPokemon.level
    ),
    [STATS.SPATTACK]: getStat(
      currentPokemon.baseStats[STATS.SPATTACK],
      ivs[STATS.SPATTACK],
      evs[STATS.SPATTACK],
      currentPokemon.level
    ),
    [STATS.SPDEFENSE]: getStat(
      currentPokemon.baseStats[STATS.SPDEFENSE],
      ivs[STATS.SPDEFENSE],
      evs[STATS.SPDEFENSE],
      currentPokemon.level
    ),
    [STATS.SPEED]: getStat(
      currentPokemon.baseStats[STATS.SPEED],
      ivs[STATS.SPEED],
      evs[STATS.SPEED],
      currentPokemon.level
    ),
  };
};

export const getPokemon = (index, ivs, evs, level, moves) => {
  const currentPokemon = { ...POKEMON[index] };
  currentPokemon.level = level;

  currentPokemon.ivs = { ...ivs };
  currentPokemon.evs = { ...evs };
  currentPokemon.stats = getStats(currentPokemon, ivs, evs);
  currentPokemon.currentMoves = moves;
  currentPokemon.id = generateId();
  return currentPokemon;
};
