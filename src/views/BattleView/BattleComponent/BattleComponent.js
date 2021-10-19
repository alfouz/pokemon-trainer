import React, { useState } from "react";
import styles from "./BattleComponent.module.scss";
import EnemyBar from "./EnemyBar/EnemyBar";
import OwnBar from "./OwnBar/OwnBar";
import InfoBox from "./InfoBox/InfoBox";
import MovesComponent from "./MovesComponent/MovesComponent";
import BattleProvider from "../../../utils/BattleProvider";
import useAppContext from "../../../context/useAppContext";

const BattleComponent = () => {
  const [currentSelectedMove, setCurrentSelectedMove] = useState(undefined);
  const { state } = useAppContext();

  const [executeNextAction, setExecuteNextAction] = useState(false);
  const [changePokemonTo, setChangePokemonTo] = useState(undefined);

  return (
    <BattleProvider
      executeNextAction={executeNextAction}
      onActionExecute={() => setExecuteNextAction(false)}
      selectedMove={currentSelectedMove}
      onFinishMove={() => setCurrentSelectedMove(undefined)}
      changePokemonTo={changePokemonTo}
      setChangePokemonTo={setChangePokemonTo}
    >
      <div className={styles.container}>
        <EnemyBar pokemon={state.battle.enemyTeam[state.battle.enemyIndex]} />
        <OwnBar
          pokemon={state.battle.ownTeam[state.battle.ownIndex]}
          team={state.battle.ownTeam}
          changePokemon={(index) => {
            if (index !== state.battle.ownIndex) {
              console.log("INSIDE ", index);
              setChangePokemonTo(index);
              setExecuteNextAction(true);
            }
          }}
        />
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
