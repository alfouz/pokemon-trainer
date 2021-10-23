import React, { useState } from "react";
import styles from "./BattleComponent.module.scss";
import useBattleContext from "../../../context/useBattleContext";
import { useEffect } from "react/cjs/react.development";
import InfoComponent from "./InfoComponent/InfoComponent";
import BattleGround from "./BattleGround/BattleGround";
import ActionSelector from "./ActionSelector/ActionSelector";
import { FIXED_STATUS } from "../../../assets/status";

const BattleComponent = ({ ownTeam, enemyTeam, onEndBattle }) => {
  const { state, createBattle, executeMoves, changeEnemyPokemon } =
    useBattleContext();

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
      setForceChange(true);
    }
  }, [state.ownPokemon.status]);

  useEffect(() => {
    if (state.enemyPokemon.status === FIXED_STATUS.FAINTED) {
      changeEnemyPokemon();
    }
  }, [changeEnemyPokemon, state.enemyPokemon.status, state.ownPokemon.status]);

  useEffect(() => {
    if (state.isFinished) {
      onEndBattle(state.results.win, state.results.earns);
    }
  }, [onEndBattle, state.isFinished, state.results.earns, state.results.win]);

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
    </div>
  );
};
export default BattleComponent;
