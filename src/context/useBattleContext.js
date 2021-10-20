import { useCallback, useContext } from "react";
import { BattleContext } from "../context/battleContext";
import { generateNewMove } from "../utils/enemyIa";
import {
  generateBattleTeam,
  generateMoveEffects,
  generateStatusEffects,
} from "../utils/battleGenerator";
import ACTIONS from "../context/battleActions";
import { getFirstAttack, executeAnimations } from "../utils/battleUtils";

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

  const changePokemon = useCallback(
    ({ ownPokemon, isBetweenTurn }) => {
      dispatch({
        type: ACTIONS.CHANGE_POKEMON,
        value: { ownPokemon, isBetweenTurn },
      });
    },
    [dispatch]
  );

  const executeMoves = useCallback(
    async ({ callback }) => {
      // Set a function to run every "interval" seconds a total of "x" times
      // let x = 4;
      // let interval = 1000;

      // for (var i = 0; i < x; i++) {
      //   setTimeout(function () {
      //     // Do Something
      //   }, i * interval);
      // }
      const { ownMove, enemyMove } = state.nextTurn;
      const turnOrder = getFirstAttack(
        ownMove,
        enemyMove,
        state.ownPokemon,
        state.enemyPokemon
      );
      const delay = 300;
      if (turnOrder >= 0) {
        //Attack own
        const ownAttack = generateMoveEffects(
          state.nextTurn.ownMove,
          state.ownPokemon,
          state.enemyPokemon
        );
        dispatch({
          type: ACTIONS.MODIFY_POKEMON,
          value: {
            ownPokemon: ownAttack.ownPokemon,
            enemyPokemon: ownAttack.enemyPokemon,
            infoMessage: state.infoMessage + ownAttack.infoMessage,
          },
        });
        await executeAnimations(delay);
        //Attackenemy
        const enemyAttack = generateMoveEffects(
          state.nextTurn.enemyMove,
          ownAttack.enemyPokemon,
          ownAttack.ownPokemon
        );
        dispatch({
          type: ACTIONS.MODIFY_POKEMON,
          value: {
            ownPokemon: enemyAttack.ownPokemon,
            enemyPokemon: enemyAttack.enemyPokemon,
            infoMessage: state.infoMessage + enemyAttack.infoMessage,
          },
        });
        await executeAnimations(delay);
        callback();
        // Set a function to run every "interval" seconds a total of "x" times
        // let x = 4;
        // let interval = 1000;
        // for (var i = 0; i < x; i++) {
        //   setTimeout(function () {
        //     // Do Something
        //   }, i * interval);
        // }
      } else {
        //Attackenemy
        const enemyAttack = generateMoveEffects(
          state.nextTurn.enemyMove,
          ownAttack.enemyPokemon,
          ownAttack.ownPokemon
        );
        dispatch({
          type: ACTIONS.MODIFY_POKEMON,
          value: {
            ownPokemon: enemyAttack.ownPokemon,
            enemyPokemon: enemyAttack.enemyPokemon,
            infoMessage: state.infoMessage + enemyAttack.infoMessage,
          },
        });
        await executeAnimations(delay);
        //Attack own
        const ownAttack = generateMoveEffects(
          state.nextTurn.ownMove,
          state.ownPokemon,
          state.enemyPokemon
        );
        dispatch({
          type: ACTIONS.MODIFY_POKEMON,
          value: {
            ownPokemon: ownAttack.ownPokemon,
            enemyPokemon: ownAttack.enemyPokemon,
            infoMessage: state.infoMessage + ownAttack.infoMessage,
          },
        });

        await executeAnimations(delay);
        callback();
      }
    },
    [state, dispatch]
  );

  return {
    state,
    dispatch,
    createBattle,
    setMoves,
    forfeitBattle,
    changePokemon,
    executeMoves,
  };
};

export default useAppContext;
