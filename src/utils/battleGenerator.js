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
        [STATS.HP]: 0,
        [STATS.ATTACK]: 0,
        [STATS.DEFENSE]: 0,
        [STATS.SPATTACK]: 0,
        [STATS.SPDEFENSE]: 0,
        [STATS.SPEED]: 0,
        [STATS.ACCURACY]: 0,
        [STATS.EVASIVENESS]: 0,
        [STATS.CRITCHANCE]: 0,
      },
    };
  });
};

const calculateStatsMultiplier = (value, isAccuracy) => {
  if (value === 0) {
    return 1;
  }
  if (value <= 0) {
    return isAccuracy ? 3 / (3 + Math.abs(value)) : 2 / (2 + Math.abs(value));
  }
  if (value >= 0) {
    return isAccuracy ? (3 + Math.abs(value)) / 3 : (2 + Math.abs(value)) / 2;
  }
};

const generateActionMoveCalculateDamage = (pok1, pok2, move) => {
  const isStab = pok1.types.includes(move.type);
  const isBurned = pok1.status.includes(FIXED_STATUS.BURNED);
  const effectiveness = pok2.types.reduce((acc, item) => {
    return acc * EFFECTIVENESS_TABLE[move.type][item];
  }, 1);
  const isCrit = criticalGenerator(pok1.boosts[STATS.CRITCHANCE]); // Need to build critchance enhancement
  if (move.category === CATEGORIES.PHYSICAL) {
    const damage = battleDamage(
      pok1.level,
      move.power,
      pok1.stats[STATS.ATTACK] *
        calculateStatsMultiplier(pok1.boosts[STATS.ATTACK], false),
      pok2.stats[STATS.DEFENSE] *
        (isCrit ? 1 : calculateStatsMultiplier(pok2.boosts[STATS.DEFENSE]),
        false),
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
      pok1.stats[STATS.SPATTACK] *
        calculateStatsMultiplier(pok1.boosts[STATS.SPATTACK], false),
      pok2.stats[STATS.SPDEFENSE] *
        (isCrit ? 1 : calculateStatsMultiplier(pok2.boosts[STATS.SPDEFENSE]),
        false),
      isCrit ? critDamage : 1,
      isStab ? stabDamage : 1,
      effectiveness,
      1
    );
    return Math.floor(damage);
  }
};

const newLevelTextStat = (value) => {
  if (value === 1) {
    return "has risen";
  }
  if (value >= 2) {
    return "has risen sharply";
  }
  if (value === -1) {
    return "has decreased";
  }
  if (value <= -1) {
    return "has decreased sharply";
  }
  return "stays the same";
};
const generateStatusActions = (move, own, enemy) => {
  const actionQueue = [];
  if (move.selfBoost.length > 0) {
    let itHits = true;
    if (move.selfBoost[0].chance) {
      itHits = move.selfBoost[0].chance >= Math.random();
    }
    if (itHits) {
      actionQueue.push({
        action: ACTIONS.STAT_CHANGE,
        text: `${own.name} uses ${move.name}. ${own.name}'s ${
          move.selfBoost[0].stat
        } ${newLevelTextStat(move.selfBoost[0].stages)}`,
        own: own,
        enemy: enemy,
        enemyValues: {},
        ownValues: {
          stats: { [move.selfBoost[0].stat]: move.selfBoost[0].stages },
        },
      });
    }
  }
  if (move.selfStatus.length > 0) {
    let itHits = true;
    if (move.selfStatus[0].chance) {
      itHits = move.selfStatus[0].chance >= Math.random();
    }
    if (itHits) {
      actionQueue.push({
        action: ACTIONS.FIXED_STATUS_EFFECT,
        text: `${own.name} uses ${move.name}. ${own.name} has been ${move.selfStatus[0].statusCondition}`,
        own: own,
        enemy: enemy,
        enemyValues: {},
        ownValues: {
          status: move.selfStatus[0].statusCondition,
        },
      });
    }
  }
  if (move.temporalStatus.length > 0) {
    let itHits = true;
    if (move.temporalStatus[0].chance) {
      itHits = move.temporalStatus[0].chance >= Math.random();
    }
    if (itHits) {
      actionQueue.push({
        action: ACTIONS.TEMPORAL_STATUS_EFFECT,
        text: `${own.name} uses ${move.name}. ${own.name} has been ${move.temporalStatus[0].statusCondition} `,
        own: own,
        enemy: enemy,
        enemyValues: {},
        ownValues: {
          temporalStatus: {
            status: move.temporalStatus[0].statusCondition,
            duration: move.temporalStatus[0].duration | 1,
          },
        },
      });
    }
  }
  if (move.enemyBoosts.length > 0) {
    let itHits = true;
    if (move.enemyBoosts[0].chance) {
      itHits = move.enemyBoosts[0].chance >= Math.random();
    }
    if (itHits) {
      actionQueue.push({
        action: ACTIONS.STAT_CHANGE,
        text: `${own.name} uses ${move.name}. ${enemy.name}'s ${
          move.enemyBoosts[0].stat
        } ${newLevelTextStat(move.enemyBoosts[0].stages)}`,
        own: own,
        enemy: enemy,
        enemyValues: {
          stats: { [move.enemyBoosts[0].stat]: move.enemyBoosts[0].stages },
        },
        ownValues: {},
      });
    }
  }
  if (move.enemyStatus.length > 0) {
    let itHits = true;
    if (move.enemyStatus[0].chance) {
      itHits = move.enemyStatus[0].chance >= Math.random();
    }
    if (itHits) {
      actionQueue.push({
        action: ACTIONS.FIXED_STATUS_EFFECT,
        text: `${own.name} uses ${move.name}. ${enemy.name} has been ${move.enemyStatus[0].statusCondition}`,
        own: own,
        enemy: enemy,
        enemyValues: { status: move.enemyStatus[0].statusCondition },
        ownValues: {},
      });
    }
  }
  if (move.enemyTemporalStatus.length > 0) {
    let itHits = true;
    if (move.enemyTemporalStatus[0].chance) {
      itHits = move.enemyTemporalStatus[0].chance >= Math.random();
    }
    if (itHits) {
      actionQueue.push({
        action: ACTIONS.TEMPORAL_STATUS_EFFECT,
        text: `${own.name} uses ${move.name}. ${enemy.name} has been ${move.enemyTemporalStatus[0].statusCondition} `,
        own: own,
        enemy: enemy,
        enemyValues: {
          temporalStatus: {
            status: move.enemyTemporalStatus[0].statusCondition,
            duration: move.enemyTemporalStatus[0].duration | 1,
          },
        },
        ownValues: {},
      });
    }
  }

  return actionQueue;
};

export const generateOwnAction = (move, own, enemy) => {
  // Create Actions Queue
  let actionsQueue = [];
  // OWN MOVE
  let itHitsGeneric = true;
  if (move.accuracy != null || move.accuracy < 1) {
    itHitsGeneric = move.accuracy >= Math.random();
  }
  if (itHitsGeneric) {
    if (move.category !== CATEGORIES.STATUS) {
      const damage = generateActionMoveCalculateDamage(own, enemy, move);
      actionsQueue.push({
        action: ACTIONS.EXECUTE_MOVE,
        text: `${own.name} uses ${move.name}. ${own.name} causes a damage of ${damage} PS to ${enemy.name}`,
        own: own,
        enemy: enemy,
        enemyValues: { life: -damage },
        ownValues: {},
      });
    }
    const statusActions = generateStatusActions(move, own, enemy);
    actionsQueue = [...actionsQueue, ...statusActions];
  } else {
    actionsQueue.push({
      action: ACTIONS.MISS,
      text: `${own.name} misses`,
      own: own,
      enemy: enemy,
      enemyValues: {},
      ownValues: {},
    });
  }
  return actionsQueue;
};

export const generateEnemyAction = (move, own, enemy) => {
  // Create Actions Queue
  let actionsQueue = [];
  // Enemy actions
  const enemyMove = generateNewMove(own, enemy);
  let itHitsEnemyGeneric = true;
  if (enemyMove.accuracy != null || enemyMove.accuracy < 1) {
    itHitsEnemyGeneric = enemyMove.accuracy >= Math.random();
  }
  if (itHitsEnemyGeneric) {
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
    const statusEnemyActions = generateStatusActions(enemyMove, enemy, own);
    actionsQueue = [...actionsQueue, ...statusEnemyActions];
  } else {
    actionsQueue.push({
      action: ACTIONS.MISS,
      text: `${enemy.name} misses`,
      own: own,
      enemy: enemy,
      enemyValues: {},
      ownValues: {},
    });
  }

  return actionsQueue;
};

export const generateActionMoves = (move, own, enemy) => {
  // Create Actions Queue
  let actionsQueue = [];
  // OWN MOVE
  let itHitsGeneric = true;
  if (move.accuracy != null || move.accuracy < 1) {
    itHitsGeneric = move.accuracy >= Math.random();
  }
  if (itHitsGeneric) {
    if (move.category !== CATEGORIES.STATUS) {
      const damage = generateActionMoveCalculateDamage(own, enemy, move);
      actionsQueue.push({
        action: ACTIONS.EXECUTE_MOVE,
        text: `${own.name} uses ${move.name}. ${own.name} causes a damage of ${damage} PS to ${enemy.name}`,
        own: own,
        enemy: enemy,
        enemyValues: { life: -damage },
        ownValues: {},
      });
    }
    const statusActions = generateStatusActions(move, own, enemy);
    actionsQueue = [...actionsQueue, ...statusActions];
  } else {
    actionsQueue.push({
      action: ACTIONS.MISS,
      text: `${own.name} misses`,
      own: own,
      enemy: enemy,
      enemyValues: {},
      ownValues: {},
    });
  }
  // Enemy actions
  const enemyMove = generateNewMove(own, enemy);
  let itHitsEnemyGeneric = true;
  if (enemyMove.accuracy != null || enemyMove.accuracy < 1) {
    itHitsEnemyGeneric = enemyMove.accuracy >= Math.random();
  }
  if (itHitsEnemyGeneric) {
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
  } else {
    actionsQueue.push({
      action: ACTIONS.MISS,
      text: `${enemy.name} misses`,
      own: own,
      enemy: enemy,
      enemyValues: {},
      ownValues: {},
    });
  }

  const statusEnemyActions = generateStatusActions(enemyMove, enemy, own);
  actionsQueue = [...actionsQueue, ...statusEnemyActions];

  return actionsQueue;
};
