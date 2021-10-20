import React, { useState } from "react";
import styles from "./BattleComponent.module.scss";
import useBattleContext from "../../../context/useBattleContext";
// import useBattleContext from "../../context/useBattleContext";
import { useEffect } from "react/cjs/react.development";
import InfoComponent from "./InfoComponent/InfoComponent";
import BattleGround from "./BattleGround/BattleGround";
import ActionSelector from "./ActionSelector/ActionSelector";

const BattleComponent = ({ ownTeam, enemyTeam }) => {
  const { state, createBattle } = useBattleContext();
  useEffect(() => {
    createBattle({ ownPokemon: ownTeam, enemyPokemon: enemyTeam });
  }, []);
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
