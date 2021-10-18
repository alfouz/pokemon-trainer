import React, { useState } from "react";
import styles from "./BattleComponent.module.scss";
import EnemyBar from "./EnemyBar/EnemyBar";
import OwnBar from "./OwnBar/OwnBar";
import InfoBox from "./InfoBox/InfoBox";
import MovesComponent from "./MovesComponent/MovesComponent";
import BattleProvider from "../../../utils/BattleProvider";
import useAppContext from "../../../context/useAppContext";

const BattleComponent = ({ ownTeam, enemyTeam }) => {
  const [currentSelectedMove, setCurrentSelectedMove] = useState(undefined);
  const { state } = useAppContext();

  const [executeNextAction, setExecuteNextAction] = useState(false);

  return (
    <BattleProvider
      executeNextAction={executeNextAction}
      onActionExecute={() => setExecuteNextAction(false)}
      selectedMove={currentSelectedMove}
      onFinishMove={() => setCurrentSelectedMove(undefined)}
    >
      <div className={styles.container}>
        <EnemyBar pokemon={state.battle.enemyTeam[state.battle.enemyIndex]} />
        <OwnBar pokemon={state.battle.ownTeam[state.battle.ownIndex]} />
        {state.battle.infoMessage ? (
          <InfoBox
            message={state.battle.infoMessage}
            onClick={() => setExecuteNextAction(true)}
          />
        ) : (
          <MovesComponent
            pokemon={state.battle.ownTeam[state.battle.ownIndex]}
            onClick={(move) => {
              setCurrentSelectedMove(move);
              setExecuteNextAction(true);
            }}
          />
        )}
      </div>
    </BattleProvider>
  );
};
export default BattleComponent;
