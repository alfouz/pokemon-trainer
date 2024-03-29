import React, { useState, useCallback, useEffect } from "react";
import styles from "./ActionSelector.module.scss";
import useBattleContext from "../../../../context/useBattleContext";
import ActionsGeneral, {
  currentActions,
} from "./ActionsGeneral/ActionsGeneral";
import ActionsMove from "./ActionsMove/ActionsMove";
import ActionChange from "./ActionChange/ActionChange";

const ActionSelector = ({ setReadyNextTurn, setForceChange, forceChange }) => {
  const {
    state,
    forfeitBattle,
    changePokemon: changePokemonFromTeam,
    setMoves,
    executeEnemyMove,
  } = useBattleContext();
  const [currentAction, setCurrentAction] = useState(undefined);
  const [move, setMove] = useState(undefined);
  const [changePokemon, setChangePokemon] = useState(undefined);

  useEffect(() => {
    if (move) {
      setMoves({ ownMove: move });
      setCurrentAction(undefined);
      setMove(undefined);
      setReadyNextTurn(true);
    }
  }, [move, setMoves, setReadyNextTurn]);

  useEffect(() => {
    if (changePokemon) {
      if (changePokemon.id !== state.ownPokemon.id) {
        changePokemonFromTeam({ ownPokemon: changePokemon });
      }
      setCurrentAction(undefined);
      setChangePokemon(undefined);
    }
  }, [changePokemon, changePokemonFromTeam, state.ownPokemon.id]);

  const renderActions = useCallback(() => {
    if (currentAction === currentActions.ATTACK) {
      return (
        <ActionsMove
          moves={state.ownPokemon.currentMoves}
          goBack={() => {
            setMove(undefined);
            setCurrentAction(undefined);
          }}
          onSelect={(move) => setMove(move)}
        />
      );
    }
    if (currentAction === currentActions.CHANGE) {
      return (
        <ActionChange
          team={state.ownTeam}
          goBack={() => {
            setChangePokemon(undefined);
            setCurrentAction(undefined);
          }}
          onSelect={(newPokemon) => {
            if (newPokemon.id !== state.ownPokemon.id) {
              setChangePokemon(newPokemon);
              if (forceChange) {
                setForceChange(false);
              } else {
                executeEnemyMove({ newOwnPokemon: newPokemon });
              }
            }
          }}
        />
      );
    }

    if (currentAction === currentActions.RUN) {
      setCurrentAction(undefined);
      forfeitBattle();
    }
    return (
      <ActionsGeneral
        onSelect={(action) => {
          setCurrentAction(action);
        }}
        forceChange={forceChange}
      />
    );
  }, [
    currentAction,
    executeEnemyMove,
    forceChange,
    forfeitBattle,
    setForceChange,
    state.ownPokemon.currentMoves,
    state.ownPokemon.id,
    state.ownTeam,
  ]);
  return <div className={styles.container}>{renderActions()}</div>;
};
export default ActionSelector;
