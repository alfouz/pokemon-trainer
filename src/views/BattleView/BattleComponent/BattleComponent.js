import React from "react";
import styles from "./BattleComponent.module.scss";
import useBattleContext from "../../../context/useBattleContext";
import { useEffect } from "react/cjs/react.development";
import InfoComponent from "./InfoComponent/InfoComponent";
import BattleGround from "./BattleGround/BattleGround";
import ActionSelector from "./ActionSelector/ActionSelector";

const BattleComponent = ({ ownTeam, enemyTeam, onEndBattle }) => {
  const { state, createBattle } = useBattleContext();

  useEffect(() => {
    createBattle({ ownPokemon: ownTeam, enemyPokemon: enemyTeam });
  }, [createBattle, enemyTeam, ownTeam]);

  useEffect(() => {
    if (state.isFinished) {
      onEndBattle(state.results.win, state.results.earns);
    }
  }, [onEndBattle, state.isFinished, state.results.earns, state.results.win]);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.leftTopContainer}>
          <BattleGround />
        </div>
        <div className={styles.leftBottomContainer}>
          <ActionSelector />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <InfoComponent />
      </div>
    </div>
  );
};
export default BattleComponent;
