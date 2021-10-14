import React from "react";
import styles from "./BoxView.module.scss";
import PokemonSquareCard from "../../components/PokemonSquareCard/PokemonSquareCard";
import useAppContext from "../../context/useAppContext";

const BoxView = ({ box }) => {
  const { state, getPokemon } = useAppContext();
  return (
    <div className={styles.container}>
      {state.pokemonBox.map((item) => (
        <PokemonSquareCard
          pokemon={item}
          onClick={() => {
            getPokemon(item);
          }}
        />
      ))}
    </div>
  );
};
export default BoxView;
