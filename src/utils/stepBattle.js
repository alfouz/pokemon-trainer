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
  setenemyIndex,
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
    default:
      console.log("DEFAULT");
      break;
  }
  console.log("Step");
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
      console.log(item);
      return processAttack(item, action.ownValues);
    });
    setOwnTeam(newOwnTeam);
  }
};

const executeFixedStatusEffect = (move, ownTeam, enemyTeam) => {};

const executeTemporalStatusEffect = (move, ownTeam, enemyTeam) => {};

const executeChangePokemon = (move, ownTeam, enemyTeam) => {};
