import STATS from "../assets/stats";
import CATEGORIES from "../assets/categories";
import { battleDamage, criticalGenerator } from "./statsCalculator";
import ACTIONS from "../assets/actions";
import { FIXED_STATUS, TEMPORAL_STATUS } from "../assets/status";
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
    console.log(Math.abs(value), Math.abs(value), 2 / (2 + Math.abs(value)));
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
        (isCrit
          ? 1
          : calculateStatsMultiplier(pok2.boosts[STATS.DEFENSE], false)),

      isCrit ? critDamage : 1,
      isStab ? stabDamage : 1,
      effectiveness,
      isBurned && !isCrit ? burnedDamage : 1
    );
    console.log(damage);
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
        text: `${own.name}'s ${move.selfBoost[0].stat} ${newLevelTextStat(
          move.selfBoost[0].stages
        )}`,
        own: own,
        enemy: enemy,
        enemyValues: undefined,
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
        text: `${own.name} has been ${move.selfStatus[0].statusCondition}`,
        own: own,
        enemy: enemy,
        enemyValues: undefined,
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
        text: `${own.name} has been ${move.temporalStatus[0].statusCondition} `,
        own: own,
        enemy: enemy,
        enemyValues: undefined,
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
        text: `${enemy.name}'s ${move.enemyBoosts[0].stat} ${newLevelTextStat(
          move.enemyBoosts[0].stages
        )}`,
        own: own,
        enemy: enemy,
        enemyValues: {
          stats: { [move.enemyBoosts[0].stat]: move.enemyBoosts[0].stages },
        },
        ownValues: undefined,
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
        text: `${enemy.name} has been ${move.enemyStatus[0].statusCondition}`,
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
      if (
        !enemy.temporalStatus.some((tempStatus) => {
          return (
            tempStatus.status === move.enemyTemporalStatus[0].statusCondition
          );
        })
      ) {
        actionQueue.push({
          action: ACTIONS.TEMPORAL_STATUS_EFFECT,
          text: `${enemy.name} has been ${move.enemyTemporalStatus[0].statusCondition} `,
          own: own,
          enemy: enemy,
          enemyValues: {
            temporalStatus: {
              status: move.enemyTemporalStatus[0].statusCondition,
              duration: move.enemyTemporalStatus[0].duration | 1,
            },
          },
          ownValues: undefined,
        });
      } else {
        actionQueue.push({
          action: ACTIONS.TEMPORAL_STATUS_EFFECT,
          text: `${enemy.name} is already ${move.enemyTemporalStatus[0].statusCondition} `,
          own: own,
          enemy: enemy,
          enemyValues: undefined,
          ownValues: undefined,
        });
      }
    }
  }

  return actionQueue;
};

export const generateOwnMoveEffects = ({ move }, own, enemy) => {
  // Create Actions Queue
  let newText = `${own.name} uses ${move.name}.`;
  const newOwn = { ...own };
  const newEnemy = { ...enemy };
  // OWN MOVE
  let itHitsGeneric = true;
  if (move.accuracy != null || move.accuracy < 1) {
    itHitsGeneric = move.accuracy >= Math.random();
  }
  // FREEZE STATUS
  let isFreezed = own.status === FIXED_STATUS.FREEZED;
  if (isFreezed) {
    isFreezed = 0.2 >= Math.round();
    newOwn.status = FIXED_STATUS.HEALTHY;
    newText = newText + `\n${own.name} is no more freeze.`;
  }
  // SLEEP STATUS
  let isSleep = own.status === FIXED_STATUS.SLEEP;
  if (isSleep) {
    isFreezed = 0.3 >= Math.round();
    newOwn.status = FIXED_STATUS.HEALTHY;
    newText = newText + `\n${own.name} awake.`;
  }
  // PARALYZED STATUS
  let isParalyzed = own.status === FIXED_STATUS.PARALIZED;
  if (isParalyzed) {
    isFreezed = 0.25 >= Math.round();
  }

  //FLINCHED
  const isFlinched = own.temporalStatus.some(
    (item) => item.status === TEMPORAL_STATUS.FLINCHED
  );

  if (!isFreezed) {
    if (!isSleep) {
      if (!isParalyzed) {
        if (!isFlinched) {
          if (itHitsGeneric) {
            if (move.category !== CATEGORIES.STATUS) {
              const damage = generateActionMoveCalculateDamage(
                newOwn,
                newEnemy,
                move
              );
              newEnemy.life = newEnemy.life - damage;
              newText =
                newText +
                `\n${own.name} causes a damage of ${damage} PS to ${enemy.name}.`;
              if (move.drain) {
                const drain = damage * move.drain;
                newOwn.life =
                  newOwn.life + drain > newOwn.stats[STATS.HP]
                    ? newOwn.stats[STATS.HP]
                    : newOwn.life + drain;
                newText = newText + `\n${own.name} heals half damage done.`;
              }
            }
            const statusActions = generateStatusActions(move, newOwn, newEnemy);
            statusActions.forEach((item) => {
              switch (item.action) {
                case ACTIONS.STAT_CHANGE:
                  if (item.ownValues) {
                    const stats = Object.keys(item.ownValues.stats);
                    stats.forEach((stat) => {
                      const newStatValue =
                        newOwn.boosts[stat] + item.ownValues.stats[stat];
                      let newStat = newStatValue;
                      if (newStat < -6) {
                        newStat = -6;
                      }
                      if (newStat > 6) {
                        newStat = 6;
                      }
                      newOwn.boosts[stat] = newStat;
                      newText = newText + `\n${item.text}`;
                    });
                  }
                  if (item.enemyValues) {
                    const stats = Object.keys(item.enemyValues.stats);
                    stats.forEach((stat) => {
                      const newStatValue =
                        newEnemy.boosts[stat] + item.enemyValues.stats[stat];
                      let newStat = newStatValue;
                      if (newStat < -6) {
                        newStat = -6;
                      }
                      if (newStat > 6) {
                        newStat = 6;
                      }
                      newEnemy.boosts[stat] = newStat;
                      newText = newText + `\n${item.text}`;
                    });
                  }
                  break;
                case ACTIONS.FIXED_STATUS_EFFECT:
                  if (item.ownValues) {
                    if (newOwn.status === FIXED_STATUS.HEALTHY) {
                      newOwn.status = item.ownValues.status;
                      newText = newText + `\n${item.text}`;
                    }
                  }
                  if (item.enemyValues) {
                    if (newEnemy.status === FIXED_STATUS.HEALTHY) {
                      newEnemy.status = item.enemyValues.status;
                      newText = newText + `\n${item.text}`;
                    }
                  }
                  break;
                case ACTIONS.TEMPORAL_STATUS_EFFECT:
                  if (item.ownValues) {
                    console.log("TEMP STATUS", item.ownValues);
                    newOwn.temporalStatus = [
                      ...newOwn.temporalStatus,
                      {
                        status: item.ownValues.temporalStatus.status,
                        durationLeft: item.ownValues.temporalStatus.duration,
                      },
                    ];
                    newText = newText + `\n${item.text}`;
                  }
                  if (item.enemyValues) {
                    newEnemy.temporalStatus = [
                      ...newEnemy.temporalStatus,
                      {
                        status: item.enemyValues.temporalStatus.status,
                        durationLeft: item.enemyValues.temporalStatus.duration,
                      },
                    ];
                    newText = newText + `\n${item.text}`;
                  }
                  break;
                default:
                  break;
              }
            });
          } else {
            newText = newText + `\n${own.name} misses`;
          }
        } else {
          newText = newText + `\n${own.name} flinched`;
        }
      } else {
        newText = newText + `\n${own.name} is paralyzed`;
      }
    } else {
      newText = newText + `\n${own.name} is sleeping`;
    }
  } else {
    newText = newText + `\n${own.name} is freezed`;
  }
  return { ownPokemon: newOwn, enemyPokemon: newEnemy, text: newText };
};

export const generateStatusEffects = (own, enemy) => {
  let newText = "";
  const newOwn = { ...own };
  const newEnemy = { ...enemy };

  if (newOwn.status !== FIXED_STATUS.HEALTHY) {
    switch (newOwn.status) {
      case FIXED_STATUS.BURNED:
        newOwn.life = newOwn.life - (1 / 16) * newOwn.stats[STATS.HP];
        newText = newText + `\n${own.name} gets burn damage`;
        break;
      case FIXED_STATUS.POISONED:
        newOwn.life = newOwn.life - (1 / 86) * newOwn.stats[STATS.HP];
        newText = newText + `\n${own.name} gets burn damage`;
        break;
      case FIXED_STATUS.BADLY_POISONED:
        newOwn.life = newOwn.life - (1 / 86) * newOwn.stats[STATS.HP];
        newText = newText + `\n${own.name} gets burn damage`;
        break;
      default:
        break;
    }
  }
  if (newEnemy.status !== FIXED_STATUS.HEALTHY) {
    switch (newEnemy.status) {
      case FIXED_STATUS.BURNED:
        newEnemy.life =
          newEnemy.life - Math.floor((1 / 16) * newEnemy.stats[STATS.HP]);
        newText = newText + `\n${newEnemy.name} gets burn damage`;
        break;
      case FIXED_STATUS.POISONED:
        newEnemy.life =
          newEnemy.life - Math.floor((1 / 8) * newEnemy.stats[STATS.HP]);
        newText = newText + `\n${newEnemy.name} gets burn damage`;
        break;
      case FIXED_STATUS.BADLY_POISONED:
        newEnemy.life =
          newEnemy.life - Math.floor((1 / 8) * newEnemy.stats[STATS.HP]);
        newText = newText + `\n${newEnemy.name} gets burn damage`;
        break;
      default:
        break;
    }
  }

  if (newOwn.temporalStatus.length > 0) {
    newOwn.temporalStatus = newOwn.temporalStatus.filter((item) => {
      switch (item.status) {
        case TEMPORAL_STATUS.FLINCHED: {
          return false;
        }
        case TEMPORAL_STATUS.RELOADING: {
          return false;
        }
        case TEMPORAL_STATUS.SEEDED: {
          const damage = Math.floor(newEnemy.stats[STATS.HP] / 16);
          newOwn.life = newOwn.life - damage;
          newEnemy.life =
            newEnemy.life + damage > newEnemy.stats[STATS.HP]
              ? newEnemy.stats[STATS.HP]
              : newEnemy.life + damage;
          newText =
            newText +
            `\n${newOwn.name} is seeded. ${newEnemy.name} recover a bit health.`;
          return true;
        }
        default:
          return true;
      }
    });
  }

  if (newEnemy.temporalStatus.length > 0) {
    newEnemy.temporalStatus = newEnemy.temporalStatus.filter((item) => {
      switch (item.status) {
        case TEMPORAL_STATUS.FLINCHED: {
          return false;
        }
        case TEMPORAL_STATUS.RELOADING: {
          return false;
        }
        case TEMPORAL_STATUS.SEEDED: {
          const damage = Math.floor(newOwn.stats[STATS.HP] / 16);
          newEnemy.life = newEnemy.life - damage;
          newOwn.life =
            newOwn.life + damage > newOwn.stats[STATS.HP]
              ? newOwn.stats[STATS.HP]
              : newOwn.life + damage;
          newText =
            newText +
            `\n${newEnemy.name} is seeded. ${newOwn.name} recover a bit health.`;
          return true;
        }
        default:
          return true;
      }
    });
  }

  return { ownPokemon: newOwn, enemyPokemon: newEnemy, text: newText };
};
