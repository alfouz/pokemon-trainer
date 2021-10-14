import React from "react";
import styles from "./BoxView.module.scss";
import PokemonSquareCard from "../../components/PokemonSquareCard/PokemonSquareCard";

const BoxView = ({ box }) => {
  return (
    <div className={styles.container}>
      {box.pokemon.map((item) => (
        <PokemonSquareCard pokemon={item} />
      ))}
    </div>
  );
};
export default BoxView;
