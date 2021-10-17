import React, { useCallback } from "react";
import styles from "./MovesComponent.module.scss";
import PokemonMove from "../../../../components/PokemonMove/PokemonMove";
// import { generateActionMoves } from "../../../../utils/battleGenerator";
// import { generateNewMove } from "../../../../utils/enemyIa";

const MovesComponent = ({ pokemon, onClick }) => {
  const handleClick = useCallback(
    (move) => {
      // const actions = setOwnMove(move, pokemon, enemy);
      // // const enemyActions = generateEnemyActionMove(generateNewMove(pokemon, enemy), pokemon, enemy);
      // console.log(actions);
      // // console.log(enemyActions);
      onClick && onClick(move);
    },
    [onClick]
  );
  return (
    <div className={styles.container}>
      {pokemon.currentMoves.map((item) => (
        <PokemonMove move={item} onClick={handleClick} />
      ))}
    </div>
  );
};
export default MovesComponent;
