import React, { useState, useCallback } from "react";
import styles from "./ActionSelector.module.scss";
import useBattleContext from "../../../../context/useBattleContext";
import ActionsGeneral, {
  currentActions,
} from "./ActionsGeneral/ActionsGeneral";
import ActionsMove from "./ActionsMove/ActionsMove";
import ActionChange from "./ActionChange/ActionChange";

const ActionSelector = () => {
  const { state, forfeitBattle } = useBattleContext();
  const [currentAction, setCurrentAction] = useState(undefined);
  const [move, setMove] = useState(undefined);
  const [changePokemon, setChangePokemon] = useState(undefined);

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
          onSelect={(newPokemon) => setChangePokemon(newPokemon)}
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
      />
    );
  }, [
    currentAction,
    forfeitBattle,
    state.ownPokemon.currentMoves,
    state.ownTeam,
  ]);
  return <div className={styles.container}>{renderActions()}</div>;
};
export default ActionSelector;
