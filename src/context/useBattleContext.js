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
import { FIXED_STATUS } from "../assets/status";

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

  const addText = useCallback(
    ({ text }) => {
      dispatch({
        type: ACTIONS.MODIFY_POKEMON,
        value: {
          ownPokemon: state.ownPokemon,
          enemyPokemon: state.enemyPokemon,
          infoMessage: state.infoMessage + "\n" + text,
        },
      });
    },
    [dispatch, state.enemyPokemon, state.infoMessage, state.ownPokemon]
  );

  const changeEnemyPokemon = useCallback(() => {
    const enemyLeftPokemon = state.enemyTeam.filter(
      (item) => item.status !== FIXED_STATUS.FAINTED
    );
    console.log(enemyLeftPokemon);
    if (enemyLeftPokemon.length > 0) {
      const newRandomIndex = Math.floor(
        Math.random() * (enemyLeftPokemon.length - 0 + 1) + 0
      );
      const randomEnemyPokemon = enemyLeftPokemon[newRandomIndex];
      dispatch({
        type: ACTIONS.MODIFY_POKEMON,
        value: {
          ownPokemon: state.ownPokemon,
          enemyPokemon: randomEnemyPokemon,
          infoMessage:
            state.infoMessage + `\n${randomEnemyPokemon.name} appears`,
        },
      });
    } else {
      dispatch({
        type: ACTIONS.WIN_BATTLE,
        value: { earns: {} },
      });
    }
  }, [dispatch, state.enemyTeam, state.infoMessage, state.ownPokemon]);

  const executeEnemyMove = useCallback(({ callback }) => {
    // const enemyAttack = generateMoveEffects(
    //   state.nextTurn.enemyMove,
    //   ownAttack.enemyPokemon,
    //   ownAttack.ownPokemon
    // );
    // console.log("ATACK ENEMY SLOWER", enemyAttack);
    // dispatch({
    //   type: ACTIONS.MODIFY_POKEMON,
    //   value: {
    //     ownPokemon: enemyAttack.enemyPokemon,
    //     enemyPokemon: enemyAttack.ownPokemon,
    //     infoMessage:
    //       state.infoMessage +
    //       "\n" +
    //       ownAttack.text +
    //       "\n" +
    //       enemyAttack.text,
    //   },
    // });
    // await executeAnimations(delay);
    // const statusEffects = generateStatusEffects(
    //   enemyAttack.enemyPokemon,
    //   enemyAttack.ownPokemon
    // );
    // if (statusEffects) {
    //   console.log("EFFECTS STATUS", statusEffects);
    //   dispatch({
    //     type: ACTIONS.MODIFY_POKEMON,
    //     value: {
    //       ownPokemon: statusEffects.ownPokemon,
    //       enemyPokemon: statusEffects.enemyPokemon,
    //       infoMessage:
    //         state.infoMessage +
    //         "\n" +
    //         ownAttack.text +
    //         "\n" +
    //         enemyAttack.text +
    //         "\n" +
    //         statusEffects.text,
    //     },
    //   });
    // }
  });

  const executeMoves = useCallback(
    async ({ callback }) => {
      callback();
      const { ownMove, enemyMove } = state.nextTurn;
      const turnOrder = getFirstAttack(
        ownMove,
        enemyMove,
        state.ownPokemon,
        state.enemyPokemon
      );
      const delay = 1000;

      if (turnOrder >= 0) {
        //Attack own
        const ownAttack = generateMoveEffects(
          state.nextTurn.ownMove,
          state.ownPokemon,
          state.enemyPokemon
        );
        console.log("ATACK OWN FASTER", ownAttack);
        dispatch({
          type: ACTIONS.MODIFY_POKEMON,
          value: {
            ownPokemon: ownAttack.ownPokemon,
            enemyPokemon: ownAttack.enemyPokemon,
            infoMessage: state.infoMessage + "\n" + ownAttack.text,
          },
        });
        await executeAnimations(delay);
        //Attackenemy
        const enemyAttack = generateMoveEffects(
          state.nextTurn.enemyMove,
          ownAttack.enemyPokemon,
          ownAttack.ownPokemon
        );
        console.log("ATACK ENEMY SLOWER", enemyAttack);
        dispatch({
          type: ACTIONS.MODIFY_POKEMON,
          value: {
            ownPokemon: enemyAttack.enemyPokemon,
            enemyPokemon: enemyAttack.ownPokemon,
            infoMessage:
              state.infoMessage +
              "\n" +
              ownAttack.text +
              "\n" +
              enemyAttack.text,
          },
        });
        await executeAnimations(delay);
        const statusEffects = generateStatusEffects(
          enemyAttack.enemyPokemon,
          enemyAttack.ownPokemon
        );
        if (statusEffects) {
          console.log("EFFECTS STATUS", statusEffects);
          dispatch({
            type: ACTIONS.MODIFY_POKEMON,
            value: {
              ownPokemon: statusEffects.ownPokemon,
              enemyPokemon: statusEffects.enemyPokemon,
              infoMessage:
                state.infoMessage +
                "\n" +
                ownAttack.text +
                "\n" +
                enemyAttack.text +
                "\n" +
                statusEffects.text,
            },
          });
        }
      } else {
        //Attackenemy
        const enemyAttack = generateMoveEffects(
          state.nextTurn.enemyMove,
          state.enemyPokemon,
          state.ownPokemon
        );
        console.log("ATACK ENEMY FASTER", enemyAttack);
        dispatch({
          type: ACTIONS.MODIFY_POKEMON,
          value: {
            ownPokemon: enemyAttack.enemyPokemon,
            enemyPokemon: enemyAttack.ownPokemon,
            infoMessage: state.infoMessage + "\n" + enemyAttack.text,
          },
        });
        await executeAnimations(delay);
        //Attack own
        const ownAttack = generateMoveEffects(
          state.nextTurn.ownMove,
          enemyAttack.enemyPokemon,
          enemyAttack.ownPokemon
        );
        console.log("ATACK OWN SLOWER", ownAttack);
        dispatch({
          type: ACTIONS.MODIFY_POKEMON,
          value: {
            ownPokemon: ownAttack.ownPokemon,
            enemyPokemon: ownAttack.enemyPokemon,
            infoMessage:
              state.infoMessage +
              "\n" +
              enemyAttack.text +
              "\n" +
              ownAttack.text,
          },
        });

        await executeAnimations(delay);
        const statusEffects = generateStatusEffects(
          ownAttack.ownPokemon,
          ownAttack.enemyPokemon
        );
        if (statusEffects) {
          console.log("EFFECTS STATUS", statusEffects);
          dispatch({
            type: ACTIONS.MODIFY_POKEMON,
            value: {
              ownPokemon: statusEffects.ownPokemon,
              enemyPokemon: statusEffects.enemyPokemon,
              infoMessage:
                state.infoMessage +
                "\n" +
                enemyAttack.text +
                "\n" +
                ownAttack.text +
                "\n" +
                statusEffects.text,
            },
          });
        }
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
    addText,
    changeEnemyPokemon,
  };
};

export default useAppContext;
