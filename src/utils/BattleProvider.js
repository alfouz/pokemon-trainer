import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { generateOwnMoveEffects } from "./battleGenerator";
import useAppContext from "../context/useAppContext";
import { generateNewMove } from "./enemyIa";

const BattleProvider = ({
  children,
  executeNextAction,
  onActionExecute,
  selectedMove,
  onFinishMove,
}) => {
  const { state, modifyBattle } = useAppContext();

  const [moveOrder, setMoveOrder] = useState([]);

  // Create battle
  //   useEffect(() => {
  //     createBattle({
  //       ownPokemon: generateBattleTeam(ownTeam),
  //       enemyPokemon: generateBattleTeam(enemyTeam),
  //     });
  //   }, [createBattle, ownTeam, enemyTeam]);

  // CREATE ACTIONS
  useEffect(() => {
    const ownPokemon = state.battle.ownTeam[state.battle.ownIndex];
    const enemyPokemon = state.battle.enemyTeam[state.battle.enemyIndex];
    if (selectedMove) {
      const enemyMove = generateNewMove(ownPokemon, enemyPokemon);
      if (enemyMove.priority === selectedMove.priority) {
        if (ownPokemon.stats.speed >= enemyPokemon.stats.speed) {
          setMoveOrder([
            { origin: "own", move: selectedMove },
            { origin: "enemy", move: enemyMove },
            { origin: "auto", statusEffect: true },
            { origin: "endTurn" },
          ]);
        } else {
          setMoveOrder([
            { origin: "enemy", move: enemyMove },
            { origin: "own", move: selectedMove },
            { origin: "auto", statusEffect: true },
            { origin: "endTurn" },
          ]);
        }
      } else {
        if (enemyMove.priority > selectedMove.priority) {
          setMoveOrder([
            { origin: "enemy", move: enemyMove },
            { origin: "own", move: selectedMove },
            { origin: "auto", statusEffect: true },
            { origin: "endTurn" },
          ]);
        } else {
          setMoveOrder([
            { origin: "own", move: selectedMove },
            { origin: "enemy", move: enemyMove },
            { origin: "auto", statusEffect: true },
            { origin: "endTurn" },
          ]);
        }
      }
      onFinishMove();
    }
  }, [
    selectedMove,
    onFinishMove,
    state.battle.ownTeam,
    state.battle.ownIndex,
    state.battle.enemyTeam,
    state.battle.enemyIndex,
  ]);

  // EXECUTE OPTIONS
  useEffect(() => {
    const ownTempPokemon = state.battle.ownTeam[state.battle.ownIndex];
    const enemyTempPokemon = state.battle.enemyTeam[state.battle.enemyIndex];
    if (moveOrder.length > 0) {
      if (executeNextAction) {
        switch (moveOrder[0].origin) {
          case "own":
            const ownData = generateOwnMoveEffects(
              moveOrder[0],
              ownTempPokemon,
              enemyTempPokemon
            );
            modifyBattle({
              ownPokemon: state.battle.ownTeam.map((pok) => {
                if (pok.id === ownData.ownPokemon.id) {
                  return ownData.ownPokemon;
                }
                return pok;
              }),
              enemyPokemon: state.battle.enemyTeam.map((pok) => {
                if (pok.id === ownData.enemyPokemon.id) {
                  return ownData.enemyPokemon;
                }
                return pok;
              }),
              infoMessage: ownData.text,
            });
            console.log("ATTACKING OWN", ownData);
            break;
          case "enemy":
            const enemyData = generateOwnMoveEffects(
              moveOrder[0],
              enemyTempPokemon,
              ownTempPokemon
            );
            modifyBattle({
              ownPokemon: state.battle.ownTeam.map((pok) => {
                if (pok.id === enemyData.enemyPokemon.id) {
                  return enemyData.enemyPokemon;
                }
                return pok;
              }),
              enemyPokemon: state.battle.enemyTeam.map((pok) => {
                if (pok.id === enemyData.ownPokemon.id) {
                  return enemyData.ownPokemon;
                }
                return pok;
              }),
              infoMessage: enemyData.text,
            });
            break;
          case "auto":
            break;
          case "endTurn":
            modifyBattle({
              ownPokemon: state.battle.ownTeam,
              enemyPokemon: state.battle.enemyTeam,
              infoMessage: undefined,
            });
            break;
          default:
            modifyBattle({
              ownPokemon: state.battle.ownTeam,
              enemyPokemon: state.battle.enemyTeam,
              infoMessage: undefined,
            });
            break;
        }
        setMoveOrder(moveOrder.slice(1));
        onActionExecute();
      }
    }
  }, [
    moveOrder,
    executeNextAction,
    onActionExecute,
    state.battle.ind,
    state.battle.ownTeam,
    state.battle.ownIndex,
    state.battle.enemyTeam,
    state.battle.enemyIndex,
    modifyBattle,
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
