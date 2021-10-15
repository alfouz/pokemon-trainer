import ACTIONS from "../assets/actions";

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
      const newEnemyTeam = enemyTeam.map((item, index) => {
        if (index !== enemyIndex) {
          return item;
        }
        return action.enemy;
      });
      setEnemyTeam(newEnemyTeam);
      break;
    default:
      console.log("DEFAULT");
      break;
  }
  console.log("Step");
};

const executeMove = (move, ownTeam, enemyTeam) => {};

const executeFixedStatusEffect = (move, ownTeam, enemyTeam) => {};

const executeTemporalStatusEffect = (move, ownTeam, enemyTeam) => {};

const executeChangePokemon = (move, ownTeam, enemyTeam) => {};
