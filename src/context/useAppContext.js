import { useCallback, useContext } from "react";
import { AppContext } from "../context/appContext";
import ACTIONS from "../context/stateActions";

const useAppContext = (context) => {
  const { state, dispatch } = useContext(context || AppContext);

  const loadInitialTeam = useCallback(
    (value) => {
      dispatch({ type: ACTIONS.LOAD_INITIAL_TEAM, value: value });
    },
    [dispatch]
  );
  const getPokemon = useCallback(
    (value) => {
      dispatch({ type: ACTIONS.LOAD_POKEMON, value: value });
    },
    [dispatch]
  );

  const capturePokemon = useCallback(
    ({ value }) => {
      dispatch({ type: ACTIONS.CAPTURE_POKEMON, value: value });
    },
    [dispatch]
  );

  const addToTeam = useCallback(
    ({ pokemon, position }) => {
      dispatch({ type: ACTIONS.ADD_TO_TEAM, value: { pokemon, position } });
    },
    [dispatch]
  );

  const releasePokemon = useCallback(
    ({ pokemon }) => {
      dispatch({ type: ACTIONS.RELEASE_POKEMON, value: { pokemon } });
    },
    [dispatch]
  );

  const createBattle = useCallback(
    ({ ownPokemon, enemyPokemon }) => {
      dispatch({
        type: ACTIONS.CREATE_BATTLE,
        value: { ownPokemon, enemyPokemon },
      });
    },
    [dispatch]
  );

  const modifyBattle = useCallback(
    ({ ownPokemon, enemyPokemon }) => {
      dispatch({
        type: ACTIONS.CREATE_BATTLE,
        value: { ownPokemon, enemyPokemon },
      });
    },
    [dispatch]
  );

  return {
    state,
    dispatch,
    capturePokemon,
    getPokemon,
    addToTeam,
    releasePokemon,
    createBattle,
    modifyBattle,
    loadInitialTeam,
  };
};

export default useAppContext;
