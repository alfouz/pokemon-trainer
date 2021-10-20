import React, { createContext, useReducer } from "react";
import ACTIONS from "./battleActions";
export const BattleContext = createContext();

const initialState = {
  ownTeam: [],
  enemyTeam: [],
  ownPokemon: {},
  enemyPokemon: {},
  infoMessage: "A new battle has started \n",
  nextTurn: {
    ownMove: undefined,
    enemyMove: undefined,
  },
  isFinished: false,
  started: false,
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
        started: true,
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
      console.log(newState);
      return newState;
    }
    case ACTIONS.FORFEIT_BATTLE: {
      return {
        ...state,
        isFinished: true,
        results: { win: false, earns: {} },
      };
    }
    case ACTIONS.CHANGE_POKEMON: {
      const ownNewPokemon = action?.value?.ownPokemon;
      return {
        ...state,
        ownPokemon: state.ownTeam.find((item) => item.id === ownNewPokemon.id),
        infoMessage:
          state.infoMessage + `\n${ownNewPokemon.name} appears to battle`,
      };
    }
    case ACTIONS.MODIFY_POKEMON: {
      const ownNewPokemon = action?.value?.ownPokemon;
      const enemyNewPokemon = action?.value?.enemyPokemon;
      const infoMessage = action?.value?.infoMessage;

      return {
        ...state,
        ownPokemon: ownNewPokemon,
        ownTeam: state.ownTeam.map((pok) => {
          if (pok.id === ownNewPokemon.id) {
            return ownNewPokemon;
          }
          return pok;
        }),
        enemyPokemon: enemyNewPokemon,
        enemyTeam: state.enemyTeam.map((pok) => {
          if (pok.id === enemyNewPokemon.id) {
            return enemyNewPokemon;
          }
          return pok;
        }),
        infoMessage: infoMessage,
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
