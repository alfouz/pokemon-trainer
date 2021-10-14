import React from "react";
import styles from "./BattleComponent.module.scss";
import EnemyBar from "./EnemyBar/EnemyBar";
import { chansey } from "../../../assets/species";

const BattleComponent = () => {
  return (
    <div className={styles.container}>
      <EnemyBar pokemon={chansey} />
    </div>
  );
};
export default BattleComponent;
