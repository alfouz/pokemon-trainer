import React from "react";
import styles from "./PokemonBox.module.scss";

const PokemonBox = ({ box }) => {
  return (
    <div className={styles.card}>
      Box {box.number} - {box.pokemon.length} Pokemon
    </div>
  );
};
export default PokemonBox;
