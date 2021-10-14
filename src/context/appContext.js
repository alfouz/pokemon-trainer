import React, { createContext, useReducer } from "react";
import ACTIONS from "./stateActions";
import ZONES from "../assets/zones";
export const AppContext = createContext();

const initialState = {
  pokemonBox: [],
  currentPokemon: {},
  currentTeam: [],
  zones: [ZONES.CITY, ZONES.RANCH, ZONES.VOLCAN, ZONES.CLASSIC, ZONES.SEA],
  currentZone: ZONES.RANCH,
};

function appReducer(state, action) {
  switch (action.type) {
    // Load a new pokemon as current
    case ACTIONS.LOAD_POKEMON: {
      const newPokemon = action?.value;
      const newState = {
        ...state,
        currentPokemon: newPokemon || {},
      };
      return newState;
    }
    // Capture pokemon
    case ACTIONS.CAPTURE_POKEMON: {
      const newPokemon = action?.value;
      const newState = {
        ...state,
        pokemonBox: newPokemon
          ? [...state.pokemonBox, newPokemon]
          : state.pokemonList,
      };
      return newState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
