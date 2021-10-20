import React, { useCallback } from "react";
import styles from "./MovesComponent.module.scss";
import PokemonMove from "../../../../components/PokemonMove/PokemonMove";

const MovesComponent = ({ pokemon, onClick, disabled }) => {
  const handleClick = useCallback(
    (move) => {
      if (!disabled) {
        onClick && onClick(move);
      }
    },
    [onClick, disabled]
  );
  return (
    <div className={`${styles.container} ${disabled ? styles.disabled : ""}`}>
      {pokemon.currentMoves.map((item) => (
        <PokemonMove move={item} onClick={handleClick} />
      ))}
    </div>
  );
};
export default MovesComponent;
