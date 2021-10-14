import React, { createContext, useReducer } from "react";
import ACTIONS, { RELEASE_POKEMON } from "./stateActions";
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
    case ACTIONS.ADD_TO_TEAM: {
      const pokemon = action?.value?.pokemon;
      const position = action?.value?.position;
      let newTeam = [];
      const indexCurrent = state.currentTeam.findIndex(
        (item) => item.id === pokemon.id
      );
      if (indexCurrent >= 0) {
        if (indexCurrent !== position) {
          if (state.currentTeam[position]) {
            newTeam = state.currentTeam.map((item, index) => {
              if (index === indexCurrent) {
                return state.currentTeam[position];
              }
              if (index === position) {
                return state.currentTeam[indexCurrent];
              }
              return item;
            });
          } else {
            const lastIndex = state.currentTeam.length - 1;
            newTeam = state.currentTeam.map((item, index) => {
              if (index === indexCurrent) {
                return state.currentTeam[lastIndex];
              }
              if (index === lastIndex) {
                return state.currentTeam[indexCurrent];
              }
              return item;
            });
          }
        } else {
          newTeam = state.currentTeam;
        }
      } else {
        if (state.currentTeam.length >= 6) {
          newTeam = state.currentTeam.map((item, index) =>
            index === position ? pokemon : item
          );
        } else {
          if (position >= state.currentTeam.length) {
            newTeam = [...state.currentTeam, pokemon];
          } else {
            if (state.currentTeam.length === 0) {
              newTeam = [pokemon];
            } else {
              newTeam = state.currentTeam.map((item, index) =>
                index === position ? pokemon : item
              );
            }
          }
        }
      }
      const newState = {
        ...state,
        currentTeam: newTeam,
      };
      return newState;
    }
    case RELEASE_POKEMON: {
      const pokemon = action?.value?.pokemon;
      const newPokemonList = state.pokemonBox.filter(
        (item) => item.id !== pokemon.id
      );
      const newPokemonTeam = state.currentTeam.filter(
        (item) => item.id !== pokemon.id
      );
      const newState = {
        ...state,
        currentTeam: newPokemonTeam,
        pokemonBox: newPokemonList,
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
