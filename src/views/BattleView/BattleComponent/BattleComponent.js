import React, { useState, useEffect } from "react";
import styles from "./BattleComponent.module.scss";
import EnemyBar from "./EnemyBar/EnemyBar";
import OwnBar from "./OwnBar/OwnBar";
import InfoBox from "./InfoBox/InfoBox";
import MovesComponent from "./MovesComponent/MovesComponent";
import { generateBattleTeam } from "../../../utils/battleGenerator";
import { executeStep } from "../../../utils/stepBattle";

const BattleComponent = ({ ownTeam, enemyTeam }) => {
  const [actions, setActions] = useState([]);
  const [executeNextAction, setExecuteNextAction] = useState(false);
  const [ownTeamBattle, setOwnTeamBattle] = useState(
    generateBattleTeam(ownTeam)
  );
  const [enemyTeamBattle, setEnemyTeamBattle] = useState(
    generateBattleTeam(enemyTeam)
  );
  const [ownCurrentPokemonIndex, setOwnCurrentPokemonIndex] = useState(0);
  const [enemyCurrentPokemonIndex, setEnemyCurrentPokemonIndex] = useState(0);

  useEffect(() => {
    if (actions.length > 0) {
      if (executeNextAction) {
        setExecuteNextAction(false);
        console.log("Actions", actions);
        console.log("Executing action");
        executeStep({
          action: actions[0],
          ownTeam: ownTeamBattle,
          enemyTeam: enemyTeamBattle,
          setOwnTeam: setOwnTeamBattle,
          setEnemyTeam: setEnemyTeamBattle,
          ownIndex: ownCurrentPokemonIndex,
          enemyIndex: enemyCurrentPokemonIndex,
          setOwnIndex: setOwnCurrentPokemonIndex,
          setenemyIndex: setEnemyCurrentPokemonIndex,
        });
        setActions(actions.slice(1));
      }
    }
  }, [
    actions,
    executeNextAction,
    enemyCurrentPokemonIndex,
    enemyTeamBattle,
    ownCurrentPokemonIndex,
    ownTeamBattle,
  ]);

  return (
    <div className={styles.container}>
      <EnemyBar pokemon={enemyTeamBattle[enemyCurrentPokemonIndex]} />
      <OwnBar pokemon={ownTeamBattle[ownCurrentPokemonIndex]} />
      {actions.length > 0 ? (
        <InfoBox
          message={actions[0].text}
          onClick={() => setExecuteNextAction(true)}
        />
      ) : (
        <MovesComponent
          pokemon={ownTeamBattle[ownCurrentPokemonIndex]}
          enemy={enemyTeamBattle[enemyCurrentPokemonIndex]}
          onClick={(actions) => setActions(actions)}
        />
      )}
    </div>
  );
};
export default BattleComponent;
