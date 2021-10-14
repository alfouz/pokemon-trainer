import React from "react";
import BattleComponent from "./BattleComponent/BattleComponent";
import styles from "./BattleView.module.scss";

const BattleView = () => {
  return (
    <div className={styles.container}>
      <BattleComponent />
    </div>
  );
};
export default BattleView;
