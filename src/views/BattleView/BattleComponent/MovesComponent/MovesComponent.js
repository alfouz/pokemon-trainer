import React, { useCallback } from "react";
import styles from "./MovesComponent.module.scss";
import PokemonMove from "../../../../components/PokemonMove/PokemonMove";

const MovesComponent = ({ pokemon, onClick }) => {
  const handleClick = useCallback(
    (move) => {
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
