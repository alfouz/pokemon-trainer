import STATS from "../assets/stats";
import CATEGORIES from "../assets/categories";
import { battleDamage, criticalGenerator } from "./statsCalculator";
import ACTIONS from "../assets/actions";
import { FIXED_STATUS } from "../assets/status";
import EFFECTIVENESS_TABLE from "../assets/typesEffectiveness";
import { generateNewMove } from "./enemyIa";

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
      status: FIXED_STATUS.HEALTHY,
      lifeStatus: [],
      temporalStatus: [],
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

const generateActionMoveCalculateDamage = (pok1, pok2, move) => {
  const isStab = pok1.types.includes(move.type);
  const isBurned = pok1.status.includes(FIXED_STATUS.BURNED);
  const effectiveness = pok2.types.reduce((acc, item) => {
    return acc * EFFECTIVENESS_TABLE[move.type][item];
  }, 1);
  const isCrit = criticalGenerator(pok1.boosts[STATS.CRITCHANCE]);
  if (move.category === CATEGORIES.PHYSICAL) {
    const damage = battleDamage(
      pok1.level,
      move.power,
      pok1.stats[STATS.ATTACK] * pok1.boosts[STATS.ATTACK],
      pok2.stats[STATS.DEFENSE] * (isCrit ? 1 : pok2.boosts[STATS.DEFENSE]),
      isCrit ? critDamage : 1,
      isStab ? stabDamage : 1,
      effectiveness,
      isBurned && !isCrit ? burnedDamage : 1
    );
    return Math.floor(damage);
  } else {
    const damage = battleDamage(
      pok1.level,
      move.power,
      pok1.stats[STATS.SPATTACK] * pok1.boosts[STATS.SPATTACK],
      pok2.stats[STATS.SPDEFENSE] * (isCrit ? 1 : pok2.boosts[STATS.SPDEFENSE]),
      isCrit ? critDamage : 1,
      isStab ? stabDamage : 1,
      effectiveness,
      1
    );
    return Math.floor(damage);
  }
};

export const generateActionMoves = (move, own, enemy) => {
  // Create Actions Queue
  const actionsQueue = [];
  // OWN MOVE
  if (move.category !== CATEGORIES.STATUS) {
    const damage = generateActionMoveCalculateDamage(own, enemy, move);
    actionsQueue.push({
      action: ACTIONS.EXECUTE_MOVE,
      text: `${own.name} causes a damage of ${damage} PS to ${enemy.name}`,
      own: own,
      enemy: enemy,
      enemyValues: { life: -damage },
      ownValues: {},
    });
  }

  // Enemy actions
  const enemyMove = generateNewMove(own, enemy);
  if (enemyMove.category !== CATEGORIES.STATUS) {
    const damage = generateActionMoveCalculateDamage(enemy, own, enemyMove);
    actionsQueue.push({
      action: ACTIONS.EXECUTE_MOVE,
      text: `${enemy.name} causes a damage of ${damage} PS damage to ${own.name}`,
      own: own,
      enemy: enemy,
      enemyValues: {},
      ownValues: { life: -damage },
    });
  }

  return actionsQueue;
};

export const generateEnemyActionMove = (move, own, enemy) => {
  if (move.category !== CATEGORIES.STATUS) {
    const damage = generateActionMoveCalculateDamage(enemy, own, move);
    console.log(damage);
    return [
      {
        action: ACTIONS.EXECUTE_MOVE,
        own: own,
        enemy: enemy,
        enemyValues: {},
        ownValues: { life: -damage },
      },
    ];
  }
};

export const generateActionStatus = () => {};

export const generateActionChange = () => {};
