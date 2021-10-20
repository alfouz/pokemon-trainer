import React from "react";
import styles from "./ActionsGeneral.module.scss";

export const currentActions = {
  ATTACK: "ATTACK",
  CHANGE: "CHANGE",
  RUN: "RUN",
};

const ActionsGeneral = ({ onSelect }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.button}
        onClick={() => onSelect(currentActions.ATTACK)}
      >
        ATTACK
      </div>
      <div
        className={styles.button}
        onClick={() => onSelect(currentActions.CHANGE)}
      >
        CHANGE
      </div>
      <div
        className={styles.button}
        onClick={() => onSelect(currentActions.RUN)}
      >
        FORFEIT
      </div>
    </div>
  );
};
export default ActionsGeneral;
