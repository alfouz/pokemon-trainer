import React from "react";
import BattleComponent from "./BattleComponent/BattleComponent";
import styles from "./BattleView.module.scss";
import useAppContext from "../../context/useAppContext";

const BattleView = () => {
  const { state } = useAppContext();
  return (
    <div className={styles.container}>
      {state.currentTeam.length > 0 ? (
        <BattleComponent
          ownTeam={state.currentTeam}
          enemyTeam={state.currentTeam}
        />
      ) : (
        <div>NO DATA FOR NOW</div>
      )}
    </div>
  );
};
export default BattleView;
