import STATS from "../assets/stats";
import CATEGORIES from "../assets/categories";
import { battleDamage, criticalGenerator } from "./statsCalculator";
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

// const generateActionMoveEffects = (move) => {
//   const actions = [];
//   if (move.effect?.stat) {
//     actions.push({
//       moveName: move.name,
//       stat: move.effect?.stat,
//       upgrade: move.effect?.stages,
//       duration: move.effect?.duration,
//     });
//   }
//   if (move.effect?.statusCondition) {
//     actions.push({
//       moveName: move.name,
//       statusCondition: moves.effect?.statusCondition,
//       chance: moves.effect?.chance,
//       duration: move.effect?.duration,
//     });
//   }
// };

// const getNewPokemonState = (pokemon, action) => {
//   if (action.stat) {
//     if (action.stat === STATS.HP) {
//       return {
//         ...pokemon,
//         lifeStatus: [
//           ...pokemon.lifeStatus,
//           {
//             damage: action.upgrade,
//             duration: action.duration?.length
//               ? Math.floor(
//                   Math.random() *
//                     (action.duration[1] - action.duration[0] + 1) +
//                     action.duration[0]
//                 )
//               : action.duration,
//           },
//         ],
//       };
//     } else {
//       return {
//         ...pokemon,
//         boost: {
//           ...pokemon.boost,
//           [action.stat]: pokemon.boost[action.upgrade],
//         },
//       };
//     }
//   }

//   if (action.statusCondition) {
//     if (action.chance) {
//       const random = Math.random();
//       if (random < action.chance) {
//         return {
//           ...pokemon,
//           temporalStatus: {
//             statusCondition: action.statusCondition,
//             duration: action.duration?.length
//               ? Math.floor(
//                   Math.random() *
//                     (action.duration[1] - action.duration[0] + 1) +
//                     action.duration[0]
//                 )
//               : action.duration,
//           },
//         };
//       }
//     } else {
//       return {
//         ...pokemon,
//         temporalStatus: {
//           statusCondition: action.statusCondition,
//           duration: action.duration?.length
//             ? Math.floor(
//                 Math.random() * (action.duration[1] - action.duration[0] + 1) +
//                   action.duration[0]
//               )
//             : action.duration,
//         },
//       };
//     }
//   }
// };

// const generateActionMoveAux = (pok1, pok2, move) => {
//   const isStab = pok1.types.includes(move.type);
//   const isBurned = pok1.status.includes(FIXED_STATUS.BURNED);
//   const effectiveness = pok2.types.reduce((acc, item) => {
//     return acc * EFFECTIVENESS_TABLE[move.type][item];
//   }, 1);
//   if (move.category === CATEGORIES.PHYSICAL) {
//     const damage = battleDamage(
//       pok1.level,
//       move.power,
//       pok1.stats[STATS.ATTACK] * pok1.boosts[STATS.ATTACK],
//       pok2.stats[STATS.DEFENSE] * pok2.boosts[STATS.DEFENSE],
//       criticalGenerator(pok1.boosts[STATS.CRITCHANCE]) ? critDamage : 1,
//       isStab ? stabDamage : 1,
//       effectiveness,
//       isBurned ? burnedDamage : 1
//     );
//     return damage;
//   }
// };

// export const generateActionMove = (move, own, enemy, direction) => {
//   const actions = [];
//   const newOwn = { ...own };
//   const newEnemy = { ...enemy };
//   if (direction === ATTACK_DIRECTION.ATTACK) {
//     const damage = generateActionMoveAux(newOwn, newEnemy, move);
//     if (move.minTimes) {
//       for (let i = 0; i < move.maxTimes; i++) {
//         if (i < move.minTimes) {
//           actions.push({
//             moveName: move.name,
//             action: ACTIONS.EXECUTE_MOVE,
//             own: own,
//             enemy: { ...enemy, life: enemy.life - damage },
//           });
//         } else {
//           const random = Math.random();
//           if (random <= moves.probabilities[i]) {
//             actions.push({
//               moveName: move.name,
//               action: ACTIONS.EXECUTE_MOVE,
//               own: own,
//               enemy: { ...enemy, life: enemy.life - damage },
//             });
//           } else {
//             i = 6; // end loop
//           }
//         }
//       }
//     } else {
//       actions.push({
//         action: ACTIONS.EXECUTE_MOVE,
//         own: own,
//         enemy: { ...enemy, life: enemy.life - damage },
//       });
//     }
//     const effectActions = generateActionMoveEffects(move);
//     effectActions.map((item) => {
//       actions.push({
//         action: ACTIONS.STAT_CHANGE,
//         own: own,
//         enemy: { ...enemy, life: enemy.life - damage },
//       });
//     });
//   }

//   return actions;
// };

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
    return damage;
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

export const generateActionMove = (move, own, enemy) => {
  if (move.category !== CATEGORIES.STATUS) {
    const damage = generateActionMoveCalculateDamage(own, enemy, move);
    console.log(damage);
    enemy.life = enemy.life - damage;
    return [{ action: ACTIONS.EXECUTE_MOVE, own: own, enemy: enemy }];
  }
};

export const generateActionStatus = () => {};

export const generateActionChange = () => {};
