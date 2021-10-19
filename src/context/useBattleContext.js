import { useCallback, useContext } from "react";
import { BattleContext } from "../context/battleContext";
import { generateBattleTeam } from "../../utils/battleGenerator";
import ACTIONS from "../context/stateActions";

const useAppContext = () => {
  const { state, dispatch } = useContext(BattleContext);

  const createBattle = useCallback(
    ({ ownPokemon, enemyPokemon }) => {
      dispatch({
        type: ACTIONS.CREATE_BATTLE,
        value: {
          ownPokemon: generateBattleTeam(ownPokemon),
          enemyPokemon: generateBattleTeam(enemyPokemon),
        },
      });
    },
    [dispatch]
  );

  const modifyBattle = useCallback(
    ({ ownPokemon, enemyPokemon, infoMessage, ownIndex, enemyIndex }) => {
      dispatch({
        type: ACTIONS.MODIFY_BATTLE,
        value: { ownPokemon, enemyPokemon, infoMessage, ownIndex, enemyIndex },
      });
    },
    [dispatch]
  );

  return {
    state,
    dispatch,
    createBattle,
    modifyBattle,
  };
};

export default useAppContext;
