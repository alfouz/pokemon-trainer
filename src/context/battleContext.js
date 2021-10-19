import React, { createContext, useReducer } from "react";
import ACTIONS from "./stateActions";
export const BattleContext = createContext();

const initialState = {
  ownTeam: [],
  enemyTeam: [],
  ownPokemon: {},
  enemyPokemon: {},
  chat: "",
};

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.CREATE_BATTLE: {
      const ownPokemon = action?.value?.ownPokemon;
      const enemyPokemon = action?.value?.enemyPokemon;
      const newState = {
        ...state,
        battle: {
          ownTeam: ownPokemon,
          enemyTeam: enemyPokemon,
          ownIndex: 0,
          enemyIndex: 0,
          message: undefined,
        },
      };
      return newState;
    }
    case ACTIONS.MODIFY_BATTLE: {
      const ownPokemon = action?.value?.ownPokemon;
      const enemyPokemon = action?.value?.enemyPokemon;
      const infoMessage = action?.value?.infoMessage;
      const newOwnIndex = action?.value?.ownIndex;
      const newEnemyIndex = action?.value?.enemyIndex;

      const newState = {
        ...state,
        battle: {
          ownTeam: ownPokemon,
          enemyTeam: enemyPokemon,
          ownIndex: newOwnIndex || state.battle.ownIndex,
          enemyIndex: newEnemyIndex || state.battle.enemyIndex,
          infoMessage,
        },
      };
      return newState;
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
