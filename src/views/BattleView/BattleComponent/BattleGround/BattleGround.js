import React from "react";
import styles from "./BattleGround.module.scss";
import useBattleContext from "../../../../context/useBattleContext";

const BattleGround = () => {
  const { state } = useBattleContext();
  return (
    <div className={styles.container}>
      <pre>BattleGround Component</pre>
    </div>
  );
};
export default BattleGround;
