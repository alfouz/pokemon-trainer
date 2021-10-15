import STATS from "./stats";
import {
  tackle,
  growl,
  vineWhip,
  leechSeed,
  tailWhip,
  waterGun,
  withdraw,
  scratch,
  ember,
  smokescreen,
} from "./moves";
import { getPokemon } from "./utils";

const ivs = {
  [STATS.HP]: 10,
  [STATS.ATTACK]: 10,
  [STATS.DEFENSE]: 10,
  [STATS.SPATTACK]: 10,
  [STATS.SPDEFENSE]: 10,
  [STATS.SPEED]: 10,
};

const evs = {
  [STATS.HP]: 0,
  [STATS.ATTACK]: 0,
  [STATS.DEFENSE]: 0,
  [STATS.SPATTACK]: 0,
  [STATS.SPDEFENSE]: 0,
  [STATS.SPEED]: 0,
};

export const initialTeam = [
  getPokemon(0, ivs, evs, 10, [tackle, growl, vineWhip, leechSeed]),

  getPokemon(3, ivs, evs, 10, [tackle, tailWhip, waterGun, withdraw]),

  getPokemon(6, ivs, evs, 10, [scratch, growl, ember, smokescreen]),
];
