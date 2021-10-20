import { useCallback, useContext } from "react";
import { BattleContext } from "../context/battleContext";
import { generateNewMove } from "../utils/enemyIa";
import { generateBattleTeam } from "../utils/battleGenerator";
import ACTIONS from "../context/battleActions";

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

  const setMoves = useCallback(
    ({ ownMove }) => {
      const { ownPokemon, enemyPokemon } = state;
      const enemyMove = generateNewMove(ownPokemon, enemyPokemon);
      dispatch({
        type: ACTIONS.SET_MOVES,
        value: { ownMove, enemyMove },
      });
    },
    [dispatch, state]
  );

  const forfeitBattle = useCallback(() => {
    dispatch({
      type: ACTIONS.FORFEIT_BATTLE,
    });
  }, [dispatch]);

  return {
    state,
    dispatch,
    createBattle,
    setMoves,
    forfeitBattle,
  };
};

export default useAppContext;
