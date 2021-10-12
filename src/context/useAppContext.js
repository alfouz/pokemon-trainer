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

  return {
    state,
    dispatch,
    capturePokemon,
    getPokemon,
  };
};

export default useAppContext;
