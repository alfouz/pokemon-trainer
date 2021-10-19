import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import {
  generateOwnMoveEffects,
  generateStatusEffects,
} from "./battleGenerator";
import useAppContext from "../context/useAppContext";
import { generateNewMove } from "./enemyIa";
import STATS from "../assets/stats";
import { FAINTED, FIXED_STATUS } from "../assets/status";

const BattleProvider = ({
  children,
  executeNextAction,
  onActionExecute,
  selectedMove,
  onFinishMove,
  changePokemonTo,
  setChangePokemonTo,
  forceChange,
  setForceChange,
}) => {
  const { state, modifyBattle } = useAppContext();

  const [moveOrder, setMoveOrder] = useState([]);

  const [faintChangingThisTurn, setFaintChangingThisTurn] = useState(false);

  // CREATE ACTIONS
  useEffect(() => {
    const ownPokemon = state.battle.ownTeam[state.battle.ownIndex];
    const enemyPokemon = state.battle.enemyTeam[state.battle.enemyIndex];
    if (changePokemonTo !== undefined) {
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
            if (moveOrder[0].changePokemonTo !== undefined) {
              if (forceChange) {
                setFaintChangingThisTurn(true);
              }
              modifyBattle({
                ownPokemon: state.battle.ownTeam.map((pok) => {
                  if (
                    pok.id ===
                    state.battle.ownTeam[moveOrder[0].changePokemonTo].id
                  ) {
                    return {
                      ...state.battle.ownTeam[moveOrder[0].changePokemonTo],
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
              setForceChange(false);
            } else {
              // IF alive attack
              if (ownTempPokemon.status !== FIXED_STATUS.FAINTED) {
                const ownData = generateOwnMoveEffects(
                  moveOrder[0],
                  ownTempPokemon,
                  enemyTempPokemon
                );
                // IF kills, set as killed
                const newEnemyTempPokemon = { ...ownData.enemyPokemon };
                if (newEnemyTempPokemon.life <= 0) {
                  newEnemyTempPokemon.status = FIXED_STATUS.FAINTED;
                }
                modifyBattle({
                  ownPokemon: state.battle.ownTeam.map((pok) => {
                    if (pok.id === ownData.ownPokemon.id) {
                      return ownData.ownPokemon;
                    }
                    return pok;
                  }),
                  enemyPokemon: state.battle.enemyTeam.map((pok) => {
                    if (pok.id === newEnemyTempPokemon.id) {
                      return newEnemyTempPokemon;
                    }
                    return pok;
                  }),
                  infoMessage: ownData.text,
                });
              } else {
                //reset turn
                resetMovement = true;
                setMoveOrder([]);
                modifyBattle({
                  ownPokemon: state.battle.ownTeam,
                  enemyPokemon: state.battle.enemyTeam,
                  infoMessage: undefined,
                });
              }
            }
            break;
          case "enemy":
            if (!faintChangingThisTurn) {
              // IF alive, attacks
              if (enemyTempPokemon.status !== FIXED_STATUS.FAINTED) {
                const enemyData = generateOwnMoveEffects(
                  moveOrder[0],
                  enemyTempPokemon,
                  ownTempPokemon
                );
                // IF kills, set as killed
                const newEnemyTempPokemon = { ...enemyData.enemyPokemon };
                if (newEnemyTempPokemon.life <= 0) {
                  console.log("KILL");
                  newEnemyTempPokemon.status = FIXED_STATUS.FAINTED;
                }
                modifyBattle({
                  ownPokemon: state.battle.ownTeam.map((pok) => {
                    if (pok.id === newEnemyTempPokemon.id) {
                      return newEnemyTempPokemon;
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
              } else {
                //reset turn
                resetMovement = true;
                setMoveOrder([]);
                modifyBattle({
                  ownPokemon: state.battle.ownTeam,
                  enemyPokemon: state.battle.enemyTeam,
                  infoMessage: undefined,
                });
              }
            }
            break;
          case "auto":
            if (!faintChangingThisTurn) {
              const autoData = generateStatusEffects(
                ownTempPokemon,
                enemyTempPokemon
              );
              if (autoData) {
                // IF kills, set as killed
                const newOwnTempPokemon = { ...autoData.ownPokemon };
                if (newOwnTempPokemon.life <= 0) {
                  newOwnTempPokemon.status = FIXED_STATUS.FAINTED;
                }
                // IF kills, set as killed
                const newEnemyTempPokemon = { ...autoData.enemyPokemon };
                if (newEnemyTempPokemon.life <= 0) {
                  newEnemyTempPokemon.status = FIXED_STATUS.FAINTED;
                }
                modifyBattle({
                  ownPokemon: state.battle.ownTeam.map((pok) => {
                    if (pok.id === newOwnTempPokemon.id) {
                      return newOwnTempPokemon;
                    }
                    return pok;
                  }),
                  enemyPokemon: state.battle.enemyTeam.map((pok) => {
                    if (pok.id === newEnemyTempPokemon.id) {
                      return newEnemyTempPokemon;
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
            }
            break;
          case "endTurn":
            if (ownTempPokemon.status === FIXED_STATUS.FAINTED) {
              if (
                state.battle.ownTeam.some((item) => item.status !== FAINTED)
              ) {
                setForceChange(true);
              }
              console.log("you lose");
              modifyBattle({
                ownPokemon: state.battle.ownTeam,
                enemyPokemon: state.battle.enemyTeam,
                infoMessage: "You loose",
                result: "lose",
              });
            }
            if (enemyTempPokemon.status === FIXED_STATUS.FAINTED) {
              if (
                state.battle.enemyTeam.length - 1 <
                state.battle.enemyIndex + 1
              ) {
                console.log("you win");
                modifyBattle({
                  ownPokemon: state.battle.ownTeam,
                  enemyPokemon: state.battle.enemyTeam,
                  infoMessage: "Congratulations, you win!",
                  result: "win",
                });
              } else {
                console.log(
                  state.battle.enemyTeam.length - 1,
                  state.battle.enemyIndex + 1
                );
                modifyBattle({
                  ownPokemon: state.battle.ownTeam,
                  enemyPokemon: state.battle.enemyTeam,
                  enemyIndex: state.battle.enemyIndex + 1,
                  infoMessage: undefined,
                });
              }
            } else {
              modifyBattle({
                ownPokemon: state.battle.ownTeam,
                enemyPokemon: state.battle.enemyTeam,
                infoMessage: undefined,
              });
            }
            if (faintChangingThisTurn) {
              setFaintChangingThisTurn(false);
            }
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
    faintChangingThisTurn,
    forceChange,
    setForceChange,
  ]);

  return <>{children}</>;
};
export default BattleProvider;
