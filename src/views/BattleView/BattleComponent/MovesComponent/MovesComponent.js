import React from "react";
import styles from "./MovesComponent.module.scss";
import PokemonMove from "../../../../components/PokemonMove/PokemonMove";

const MovesComponent = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div className={styles.container}>
      {pokemon.currentMoves.map((item) => (
        <PokemonMove move={item} />
      ))}
    </div>
  );
};
export default MovesComponent;
