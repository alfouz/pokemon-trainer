import React from "react";
import styles from "./InfoComponent.module.scss";
import useBattleContext from "../../../../context/useBattleContext";

const InfoComponent = () => {
  const { state } = useBattleContext();
  return (
    <div className={styles.container}>
      <pre>{state.infoMessage}</pre>
    </div>
  );
};
export default InfoComponent;
