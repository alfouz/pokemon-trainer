import React, { createContext, useReducer } from "react";
import ACTIONS from "./battleActions";
export const BattleContext = createContext();

const initialState = {
  ownTeam: [],
  enemyTeam: [],
  ownPokemon: {},
  enemyPokemon: {},
  infoMessage:
    "Pikachu used thundershock.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.\n Charmander has a damage of 97PS. \n Charmandes is paralyzed.\n Pokachu is dancing.",
  nextTurn: {
    ownMove: undefined,
    enemyMove: undefined,
  },
  isFinished: false,
  results: {
    win: false,
    earns: {},
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.CREATE_BATTLE: {
      const ownPokemon = action?.value?.ownPokemon;
      const enemyPokemon = action?.value?.enemyPokemon;
      const newState = {
        ...initialState,
        ownTeam: ownPokemon,
        enemyTeam: enemyPokemon,
        ownPokemon: ownPokemon[0],
        enemyPokemon: enemyPokemon[0],
      };
      return newState;
    }
    case ACTIONS.SET_MOVES: {
      const ownMove = action?.value?.ownMove;
      const enemyMove = action?.value?.enemyMove;
      const newState = {
        ...state,
        nextTurn: {
          ownMove,
          enemyMove,
        },
      };
      return newState;
    }
    case ACTIONS.FORFEIT_BATTLE: {
      return {
        ...state,
        isFinished: true,
        results: { win: false, earns: {} },
      };
    }
    default: {
      throw new Error(`Unhandled battle action type: ${action.type}`);
    }
  }
}

export const BattleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <BattleContext.Provider value={{ state, dispatch }}>
      {children}
    </BattleContext.Provider>
  );
};
