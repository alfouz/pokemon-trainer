import STATS from "../assets/stats";
import CATEGORIES from "../assets/categories";
import { battleDamage, criticalGenerator } from "./statsCalculator";
import ATTACK_DIRECTION from "../assets/attackDirection";
import ACTIONS from "../assets/actions";
import { FIXED_STATUS } from "../assets/status";
import EFFECTIVENESS_TABLE from "../assets/typesEffectiveness";

const stabDamage = 2;
const burnedDamage = 0.5;
const critDamage = 1.5;

export const generateBattleTeam = (team) => {
  return team.map((item) => {
    return {
      stats: item.stats,
      currentMoves: item.currentMoves,
      name: item.name,
      level: item.level,
      types: item.types,
      image: item.image,
      id: item.id,
      life: item.stats[STATS.HP],
      status: [],
      boosts: {
        [STATS.HP]: 1,
        [STATS.ATTACK]: 1,
        [STATS.DEFENSE]: 1,
        [STATS.SPATTACK]: 1,
        [STATS.SPDEFENSE]: 1,
        [STATS.SPEED]: 1,
        [STATS.ACCURACY]: 1,
        [STATS.EVASIVENESS]: 1,
        [STATS.CRITCHANCE]: 1,
      },
    };
  });
};

const generateActionMoveEffect = (move, effect) => {
  // if(move.)
};

const generateActionMoveAux = (pok1, pok2, move) => {
  const isStab = pok1.types.includes(move.type);
  const isBurned = pok1.status.includes(FIXED_STATUS.BURNED);
  const effectiveness = pok2.types.reduce((acc, item) => {
    return acc * EFFECTIVENESS_TABLE[move.type][item];
  }, 1);
  if (move.category === CATEGORIES.PHYSICAL) {
    const damage = battleDamage(
      pok1.level,
      move.power,
      pok1.stats[STATS.ATTACK] * pok1.boosts[STATS.ATTACK],
      pok2.stats[STATS.DEFENSE] * pok2.boosts[STATS.DEFENSE],
      criticalGenerator(pok1.boosts[STATS.CRITCHANCE]) ? critDamage : 1,
      isStab ? stabDamage : 1,
      effectiveness,
      isBurned ? burnedDamage : 1
    );
    return damage;
  }
};

export const generateActionMove = (move, own, enemy, direction) => {
  const actions = [];
  const newOwn = { ...own };
  const newEnemy = { ...enemy };
  if (direction === ATTACK_DIRECTION.ATTACK) {
    const damage = generateActionMoveAux(newOwn, newEnemy, move);
    actions.push({
      action: ACTIONS.EXECUTE_MOVE,
      own: own,
      enemy: { ...enemy, life: enemy.life - damage },
    });
  }

  return actions;
};

export const generateActionStatus = () => {};

export const generateActionChange = () => {};
