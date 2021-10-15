import STATS from "../stats";
import { flamethrower, ember, scratch, growl } from "../moves";
import { getPokemon } from "../utils";

const ivs = {
  [STATS.HP]: 10,
  [STATS.ATTACK]: 10,
  [STATS.DEFENSE]: 10,
  [STATS.SPATTACK]: 10,
  [STATS.SPDEFENSE]: 10,
  [STATS.SPEED]: 10,
};

const evs = {
  [STATS.HP]: 50,
  [STATS.ATTACK]: 50,
  [STATS.DEFENSE]: 50,
  [STATS.SPATTACK]: 50,
  [STATS.SPDEFENSE]: 50,
  [STATS.SPEED]: 50,
};

export const trainer1 = [
  getPokemon(4, ivs, evs, 10, [flamethrower, ember, scratch, growl]),

  getPokemon(5, ivs, evs, 10, [flamethrower, ember, scratch, growl]),

  getPokemon(6, ivs, evs, 10, [flamethrower, ember, scratch, growl]),
];

export const randomTrainer = [
  getPokemon(6, ivs, evs, 10, [flamethrower, ember, scratch, growl]),
];
