import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import useAppContext from "../context/useAppContext";
import { generateNewMove } from "./enemyIa";

const BattleProvider = ({
  children,
  ownTeam,
  enemyTeam,
  executeNextAction,
  onActionExecute,
  selectedMove,
  onFinishMove,
}) => {
  const { state, modifyBattle } = useAppContext();

  // Create battle
  //   useEffect(() => {
  //     createBattle({
  //       ownPokemon: generateBattleTeam(ownTeam),
  //       enemyPokemon: generateBattleTeam(enemyTeam),
  //     });
  //   }, [createBattle, ownTeam, enemyTeam]);

  // CREATE ACTIONS
  useEffect(() => {
    if (selectedMove) {
      const enemyMove = generateNewMove(
        state.battle.ownTeam[state.battle.ownIndex],
        state.battle.enemyTeam[state.battle.enemyIndex]
      );
      console.log(selectedMove);
      console.log(enemyMove);
    }
  }, [
    selectedMove,
    onFinishMove,
    state.battle.ownTeam,
    state.battle.ownIndex,
    state.battle.enemyTeam,
    state.battle.enemyIndex,
  ]);

  //   const [battleSteps, setBattleSteps] = {
  //     ownTurn: [],
  //     enemyTurn: [],
  //     statusTurn: [],
  //     temporalStatusTurn: [],
  //   };

  //   const [actions, setActions] = useState([]);

  return <>{children}</>;
};
export default BattleProvider;
