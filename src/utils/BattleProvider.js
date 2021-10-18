import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import {
  generateOwnMoveEffects,
  generateStatusEffects,
} from "./battleGenerator";
import useAppContext from "../context/useAppContext";
import { generateNewMove } from "./enemyIa";
import STATS from "../assets/stats";

const BattleProvider = ({
  children,
  executeNextAction,
  onActionExecute,
  selectedMove,
  onFinishMove,
  changePokemonTo,
  setChangePokemonTo,
}) => {
  const { state, modifyBattle } = useAppContext();

  const [moveOrder, setMoveOrder] = useState([]);

  // CREATE ACTIONS
  useEffect(() => {
    const ownPokemon = state.battle.ownTeam[state.battle.ownIndex];
    const enemyPokemon = state.battle.enemyTeam[state.battle.enemyIndex];
    if (changePokemonTo) {
      const enemyMove = generateNewMove(ownPokemon, enemyPokemon);
      setMoveOrder([
        { origin: "own", changePokemonTo },
        { origin: "enemy", move: enemyMove },
        { origin: "auto", statusEffect: true },
        { origin: "endTurn" },
      ]);
      setChangePokemonTo(undefined);
    }
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
    changePokemonTo,
    setChangePokemonTo,
  ]);

  // EXECUTE OPTIONS
  useEffect(() => {
    const ownTempPokemon = state.battle.ownTeam[state.battle.ownIndex];
    const enemyTempPokemon = state.battle.enemyTeam[state.battle.enemyIndex];
    let resetMovement = false;
    if (moveOrder.length > 0) {
      if (executeNextAction) {
        switch (moveOrder[0].origin) {
          case "own":
            if (moveOrder[0].changePokemonTo) {
              modifyBattle({
                ownPokemon: state.battle.ownTeam.map((pok) => {
                  if (
                    pok.id === state.battle.ownTeam[state.battle.ownIndex].id
                  ) {
                    return {
                      ...state.battle.ownTeam[state.battle.ownIndex],
                      temporalStatus: [],
                      boosts: {
                        [STATS.HP]: 0,
                        [STATS.ATTACK]: 0,
                        [STATS.DEFENSE]: 0,
                        [STATS.SPATTACK]: 0,
                        [STATS.SPDEFENSE]: 0,
                        [STATS.SPEED]: 0,
                        [STATS.ACCURACY]: 0,
                        [STATS.EVASIVENESS]: 0,
                        [STATS.CRITCHANCE]: 0,
                      },
                    };
                  }
                  return pok;
                }),
                ownIndex: moveOrder[0].changePokemonTo,
                enemyPokemon: state.battle.enemyTeam,
                infoMessage: `\nChanged pokemon to ${
                  state.battle.ownTeam[moveOrder[0].changePokemonTo].name
                }`,
              });
            } else {
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
            }
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
            const autoData = generateStatusEffects(
              ownTempPokemon,
              enemyTempPokemon
            );
            if (autoData) {
              modifyBattle({
                ownPokemon: state.battle.ownTeam.map((pok) => {
                  if (pok.id === autoData.ownPokemon.id) {
                    return autoData.ownPokemon;
                  }
                  return pok;
                }),
                enemyPokemon: state.battle.enemyTeam.map((pok) => {
                  if (pok.id === autoData.enemyPokemon.id) {
                    return autoData.enemyPokemon;
                  }
                  return pok;
                }),
                infoMessage: autoData.text,
              });
            } else {
              resetMovement = true;
              setMoveOrder([]);
              modifyBattle({
                ownPokemon: state.battle.ownTeam,
                enemyPokemon: state.battle.enemyTeam,
                infoMessage: undefined,
              });
            }
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
        if (!resetMovement) {
          setMoveOrder(moveOrder.slice(1));
        }
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

  return <>{children}</>;
};
export default BattleProvider;
