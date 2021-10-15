import React, { useCallback } from "react";
import styles from "./MovesComponent.module.scss";
import PokemonMove from "../../../../components/PokemonMove/PokemonMove";
import { generateActionMove } from "../../../../utils/battleGenerator";

const MovesComponent = ({ pokemon, enemy, onClick }) => {
  const handleClick = useCallback(
    (move) => {
      const actions = generateActionMove(move, pokemon, enemy);
      console.log(actions);
      onClick && onClick(actions);
    },
    [enemy, pokemon, onClick]
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
