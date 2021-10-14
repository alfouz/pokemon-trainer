import { useCallback, useContext } from "react";
import { AppContext } from "../context/appContext";
import ACTIONS from "../context/stateActions";

const useAppContext = (context) => {
  const { state, dispatch } = useContext(context || AppContext);

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

  return {
    state,
    dispatch,
    capturePokemon,
    getPokemon,
    addToTeam,
  };
};

export default useAppContext;
