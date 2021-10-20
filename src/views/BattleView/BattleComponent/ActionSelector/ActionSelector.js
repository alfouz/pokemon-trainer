import React from "react";
import styles from "./ActionSelector.module.scss";
import useBattleContext from "../../../../context/useBattleContext";

const ActionSelector = () => {
  const { state } = useBattleContext();
  return (
    <div className={styles.container}>
      <pre>Action Selector</pre>
    </div>
  );
};
export default ActionSelector;
