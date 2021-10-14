import React, { useCallback } from "react";
import styles from "./MovesComponent.module.scss";
import PokemonMove from "../../../../components/PokemonMove/PokemonMove";
import { generateActionMove } from "../../../../utils/battleGenerator";
import ATTACK_DIRECTION from "../../../../assets/attackDirection";

const MovesComponent = ({ pokemon, enemy }) => {
  const handleClick = useCallback(
    (move) => {
      generateActionMove(move, pokemon, enemy, ATTACK_DIRECTION.ATTACK);
    },
    [enemy, pokemon]
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
