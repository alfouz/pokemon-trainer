import stats from "../assets/stats";
import { FIXED_STATUS } from "../assets/status";

export const calculateStatsMultiplier = (value, isAccuracy) => {
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

// return -1 enemy, 0 random, 1 us
export const getFirstAttack = (ownMove, enemyMove, ownPoke, enemyPoke) => {
  if (ownMove.priority) {
    if (enemyMove.priority) {
      if (enemyMove.priority > ownMove.priority) {
        return -1;
      }
      if (enemyMove.priority < ownMove.priority) {
        return 1;
      }
      const ownSpeed =
        ownPoke.stats[stats.SPEED] *
          calculateStatsMultiplier(ownPoke.boosts[stats.SPEED]) *
          ownPoke.status ===
        FIXED_STATUS.PARALIZED
          ? 0.5
          : 1;
      const enemySpeed =
        enemyPoke.stats[stats.SPEED] *
          calculateStatsMultiplier(enemyPoke.boosts[stats.SPEED]) *
          enemyPoke.status ===
        FIXED_STATUS.PARALIZED
          ? 0.5
          : 1;
      if (ownSpeed >= enemySpeed) {
        return 1;
      } else {
        return -1;
      }
    }
    return 1;
  } else {
    if (enemyMove.priority) {
      return -1;
    }
    const ownSpeedEnemySide =
      ownPoke.stats[stats.SPEED] *
      calculateStatsMultiplier(ownPoke.boosts[stats.SPEED]) *
      (ownPoke.status === FIXED_STATUS.PARALIZED ? 0.5 : 1);
    const enemySpeedEnemySide =
      enemyPoke.stats[stats.SPEED] *
      calculateStatsMultiplier(enemyPoke.boosts[stats.SPEED]) *
      (enemyPoke.status === FIXED_STATUS.PARALIZED ? 0.5 : 1);
    if (ownSpeedEnemySide >= enemySpeedEnemySide) {
      return 1;
    } else {
      return -1;
    }
  }
};

export const executeAnimations = (ms) => {
  return new Promise((res) => setTimeout(res, ms));
};
