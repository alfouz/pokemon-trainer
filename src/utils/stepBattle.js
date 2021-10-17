import ACTIONS from "../assets/actions";

const processAttack = (pokemon, actionValues) => {
  return { ...pokemon, life: pokemon.life + actionValues.life };
};

export const executeStep = ({
  action,
  ownTeam,
  enemyTeam,
  setOwnTeam,
  setEnemyTeam,
  ownIndex,
  enemyIndex,
  setOwnIndex,
  setEnemyIndex,
}) => {
  switch (action.action) {
    case ACTIONS.EXECUTE_MOVE:
      executeMove(
        action,
        ownTeam,
        ownIndex,
        enemyTeam,
        enemyIndex,
        setOwnTeam,
        setEnemyTeam
      );
      break;
    case ACTIONS.FIXED_STATUS_EFFECT:
      executeFixedStatusEffect(
        action,
        ownTeam,
        ownIndex,
        enemyTeam,
        enemyIndex,
        setOwnTeam,
        setEnemyTeam
      );
      break;
    case ACTIONS.STAT_CHANGE:
      executeStatChangeEffect(
        action,
        ownTeam,
        ownIndex,
        enemyTeam,
        enemyIndex,
        setOwnTeam,
        setEnemyTeam
      );
      break;
    case ACTIONS.TEMPORAL_STATUS_EFFECT:
      executeTemporalStatusEffect(
        action,
        ownTeam,
        ownIndex,
        enemyTeam,
        enemyIndex,
        setOwnTeam,
        setEnemyTeam
      );
      break;
    case ACTIONS.CHANGE_POKEMON:
      executeChangePokemon(
        action,
        ownTeam,
        ownIndex,
        enemyTeam,
        enemyIndex,
        setOwnTeam,
        setEnemyTeam
      );
      break;
    default:
      console.log("DEFAULT");
      break;
  }
};

const executeMove = (
  action,
  ownTeam,
  ownIndex,
  enemyTeam,
  enemyIndex,
  setOwnTeam,
  setEnemyTeam
) => {
  if (Object.keys(action.enemyValues).length > 0) {
    const newEnemyTeam = enemyTeam.map((item, index) => {
      if (index !== enemyIndex) {
        return item;
      }
      return processAttack(item, action.enemyValues);
    });
    setEnemyTeam(newEnemyTeam);
  }
  if (Object.keys(action.ownValues).length > 0) {
    const newOwnTeam = ownTeam.map((item, index) => {
      if (index !== ownIndex) {
        return item;
      }
      return processAttack(item, action.ownValues);
    });
    setOwnTeam(newOwnTeam);
  }
};

const executeFixedStatusEffect = (
  action,
  ownTeam,
  ownIndex,
  enemyTeam,
  enemyIndex,
  setOwnTeam,
  setEnemyTeam
) => {
  if (Object.keys(action.enemyValues).length > 0) {
    const newEnemyTeam = enemyTeam.map((item, index) => {
      if (index !== enemyIndex) {
        return item;
      }
      return processAttack(item, action.enemyValues);
    });
    setEnemyTeam(newEnemyTeam);
  }
  if (Object.keys(action.ownValues).length > 0) {
    const newOwnTeam = ownTeam.map((item, index) => {
      if (index !== ownIndex) {
        return item;
      }
      return processAttack(item, action.ownValues);
    });
    setOwnTeam(newOwnTeam);
  }
  console.log("EXECUTUNG FIXED STATUS: ", action);
};

const executeTemporalStatusEffect = (
  action,
  ownTeam,
  ownIndex,
  enemyTeam,
  enemyIndex,
  setOwnTeam,
  setEnemyTeam
) => {
  console.log("EXECUTUNG TEMPORAL STATUS: ", action);
};

const executeStatChangeEffect = (
  action,
  ownTeam,
  ownIndex,
  enemyTeam,
  enemyIndex,
  setOwnTeam,
  setEnemyTeam
) => {
  if (Object.keys(action.enemyValues?.stats || {})?.length > 0) {
    const stat = Object.keys(action.enemyValues.stats)[0];
    const newEnemyTeam = enemyTeam.map((item, index) => {
      if (index !== enemyIndex) {
        return item;
      }
      let newStat = item.boosts[stat] + action.enemyValues.stats[stat];
      if (newStat < -6) {
        newStat = -6;
      }
      if (newStat > 6) {
        newStat = 6;
      }
      const newPokemon = {
        ...item,
        boosts: {
          ...item.boosts,
          [stat]: newStat,
        },
      };
      return newPokemon;
    });
    setEnemyTeam(newEnemyTeam);
  }
  if (Object.keys(action.ownValues?.stats || {})?.length > 0) {
    const stat = Object.keys(action.ownValues.stats)[0];
    const newOwnTeam = ownTeam.map((item, index) => {
      if (index !== ownIndex) {
        return item;
      }
      let newStat = item.boosts[stat] + action.ownValues.stats[stat];
      if (newStat < -6) {
        newStat = -6;
      }
      if (newStat > 6) {
        newStat = 6;
      }
      const newPokemon = {
        ...item,
        boosts: {
          ...item.boosts,
          [stat]: newStat,
        },
      };
      return newPokemon;
    });
    setOwnTeam(newOwnTeam);
  }
};

const executeChangePokemon = (
  action,
  ownTeam,
  ownIndex,
  enemyTeam,
  enemyIndex,
  setOwnTeam,
  setEnemyTeam
) => {
  console.log("EXECUTUNG POKEMON CHANGE: ", action);
};
