import React from "react";
import styles from "./BattleGround.module.scss";
import useBattleContext from "../../../../context/useBattleContext";
import EnemySide from "./EnemySide/EnemySide";
import OwnSide from "./OwnSide/OwnSide";

const BattleGround = () => {
  const { state } = useBattleContext();
  console.log(state);
  return (
    <div className={styles.container}>
      <EnemySide pokemon={state.enemyPokemon} />
      <OwnSide pokemon={state.ownPokemon} />
    </div>
  );
};
export default BattleGround;
