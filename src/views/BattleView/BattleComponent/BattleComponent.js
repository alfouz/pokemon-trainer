import React, { useState } from "react";
import styles from "./BattleComponent.module.scss";
import useBattleContext from "../../../context/useBattleContext";
import { useEffect } from "react/cjs/react.development";
import InfoComponent from "./InfoComponent/InfoComponent";
import BattleGround from "./BattleGround/BattleGround";
import ActionSelector from "./ActionSelector/ActionSelector";
import { FIXED_STATUS } from "../../../assets/status";
import ModalEndBattle from "./ModalEndBattle/ModalEndBattle";

const BattleComponent = ({ ownTeam, enemyTeam, onEndBattle }) => {
  const {
    state,
    createBattle,
    executeMoves,
    changeEnemyPokemon,
    restartBattle,
    endBattle,
  } = useBattleContext();

  const [loading, setLoading] = useState(true);
  const [readyNextTurn, setReadyNextTurn] = useState(false);
  const [forceChange, setForceChange] = useState(false);

  // useEffect(() => {
  //   if (!state.started) {
  //     createBattle({ ownPokemon: ownTeam, enemyPokemon: enemyTeam });
  //   }
  // }, [createBattle, enemyTeam, ownTeam, state.started]);
  useEffect(() => {
    createBattle({ ownPokemon: ownTeam, enemyPokemon: enemyTeam });
    setLoading(false);
  }, []);

  useEffect(() => {
    const executeTurn = async () => {
      if (readyNextTurn) {
        if (
          state.ownPokemon.status !== FIXED_STATUS.FAINTED &&
          state.enemyPokemon.status !== FIXED_STATUS.FAINTED
        ) {
          await executeMoves({ callback: () => setReadyNextTurn(false) });
        }
      }
    };
    executeTurn();
  }, [
    executeMoves,
    readyNextTurn,
    state.enemyPokemon.status,
    state.ownPokemon.status,
  ]);

  useEffect(() => {
    if (state.ownPokemon.status === FIXED_STATUS.FAINTED) {
      if (
        state.ownTeam.filter((item) => item.status !== FIXED_STATUS.FAINTED)
          .length > 0
      ) {
        setForceChange(true);
      } else {
        endBattle({ win: false, earns: {} });
      }
    }
  }, [endBattle, state.ownPokemon.status, state.ownTeam]);

  useEffect(() => {
    if (state.enemyPokemon.status === FIXED_STATUS.FAINTED) {
      if (
        state.enemyTeam.filter((item) => item.status !== FIXED_STATUS.FAINTED)
          .length > 0
      ) {
        changeEnemyPokemon();
      } else {
        endBattle({ win: true, earns: {} });
      }
    }
  }, [
    changeEnemyPokemon,
    endBattle,
    state.enemyPokemon,
    state.enemyPokemon.status,
    state.enemyTeam,
    state.ownPokemon.status,
  ]);

  if (loading) {
    return <div />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.leftTopContainer}>
          <BattleGround />
        </div>
        <div className={styles.leftBottomContainer}>
          <ActionSelector
            setReadyNextTurn={setReadyNextTurn}
            setForceChange={setForceChange}
            forceChange={forceChange}
          />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <InfoComponent />
      </div>
      <ModalEndBattle
        isWin={state.results.win}
        visible={state.isFinished}
        onAccept={() => {
          onEndBattle(state.results.win, state.results.earns);
          restartBattle();
        }}
      >
        END BATTLE
      </ModalEndBattle>
    </div>
  );
};
export default BattleComponent;
