import React, { useState, useEffect } from "react";
import styles from "./BattleComponent.module.scss";
import EnemyBar from "./EnemyBar/EnemyBar";
import OwnBar from "./OwnBar/OwnBar";
import InfoBox from "./InfoBox/InfoBox";
import MovesComponent from "./MovesComponent/MovesComponent";
import {
  generateBattleTeam,
  generateOwnAction,
} from "../../../utils/battleGenerator";
import { executeStep } from "../../../utils/stepBattle";
import STATS from "../../../assets/stats";
import BattleProvider from "../../../utils/BattleProvider";
import useAppContext from "../../../context/useAppContext";

const BattleComponent = ({ ownTeam, enemyTeam }) => {
  const [currentSelectedMove, setCurrentSelectedMove] = useState(undefined);
  const { state } = useAppContext();

  // const [ownTeamBattle, setOwnTeamBattle] = useState(
  //   generateBattleTeam(ownTeam)
  // );
  // const [enemyTeamBattle, setEnemyTeamBattle] = useState(
  //   generateBattleTeam(enemyTeam)
  // );
  // const [ownCurrentPokemonIndex, setOwnCurrentPokemonIndex] = useState(0);
  // const [enemyCurrentPokemonIndex, setEnemyCurrentPokemonIndex] = useState(0);

  // const [battleSteps, setBattleSteps] = {
  //   ownTurn: [],
  //   enemyTurn: [],
  //   statusTurn: [],
  //   temporalStatusTurn: [],
  // };

  // CREATE ACTIONS
  // useEffect(() => {
  //   if (currentSelectedMove) {
  //     if (
  //       ownTeamBattle[ownCurrentPokemonIndex].stats[STATS.SPEED] >=
  //       enemyTeamBattle[enemyCurrentPokemonIndex].stats[STATS.SPEED]
  //     ) {
  //       // executeActions({currentMove:currentSelectedMove })
  //       // generateOwnAction(
  //       //   currentSelectedMove,
  //       //   ownTeamBattle[ownCurrentPokemonIndex],
  //       //   enemyTeamBattle[enemyCurrentPokemonIndex]
  //       // );
  //     }
  //   }
  // }, [
  //   currentSelectedMove,
  //   enemyCurrentPokemonIndex,
  //   enemyTeamBattle,
  //   ownTeamBattle,
  //   ownCurrentPokemonIndex,
  // ]);

  // const [actions, setActions] = useState([]);
  const [executeNextAction, setExecuteNextAction] = useState(false);

  // useEffect(() => {
  //   if (actions.length > 0) {
  //     if (executeNextAction) {
  //       setExecuteNextAction(false);
  //       console.log("Actions", actions);
  //       console.log("Executing action");
  //       executeStep({
  //         action: actions[0],
  //         ownTeam: ownTeamBattle,
  //         enemyTeam: enemyTeamBattle,
  //         setOwnTeam: setOwnTeamBattle,
  //         setEnemyTeam: setEnemyTeamBattle,
  //         ownIndex: ownCurrentPokemonIndex,
  //         enemyIndex: enemyCurrentPokemonIndex,
  //         setOwnIndex: setOwnCurrentPokemonIndex,
  //         setEnemyIndex: setEnemyCurrentPokemonIndex,
  //       });
  //       setActions(actions.slice(1));
  //     }
  //   }
  // }, [
  //   actions,
  //   executeNextAction,
  //   enemyCurrentPokemonIndex,
  //   enemyTeamBattle,
  //   ownCurrentPokemonIndex,
  //   ownTeamBattle,
  // ]);

  console.log(state);
  return (
    <BattleProvider
      executeNextAction={executeNextAction}
      onActionExecute={() => setExecuteNextAction(false)}
      ownTeam={ownTeam}
      enemyTeam={enemyTeam}
      selectedMove={currentSelectedMove}
      onFinishMove={() => setCurrentSelectedMove(undefined)}
    >
      <div className={styles.container}>
        <EnemyBar pokemon={state.battle.enemyTeam[state.battle.enemyIndex]} />
        <OwnBar pokemon={state.battle.ownTeam[state.battle.ownIndex]} />
        {state.battle.message ? (
          <InfoBox
            message={state.battle.message}
            onClick={() => setExecuteNextAction(true)}
          />
        ) : (
          <MovesComponent
            pokemon={state.battle.ownTeam[state.battle.ownIndex]}
            onClick={(move) => setCurrentSelectedMove(move)}
          />
        )}
      </div>
    </BattleProvider>
  );
};
export default BattleComponent;
