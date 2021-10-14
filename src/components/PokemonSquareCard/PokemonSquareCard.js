import React from "react";
import styles from "./PokemonSquareCard.module.scss";
import TYPES from "../../assets/types";

const getColors = {
  [TYPES.STEEL]: styles["card-steel"],
  [TYPES.WATER]: styles["card-water"],
  [TYPES.BUG]: styles["card-bug"],
  [TYPES.DRAGON]: styles["card-dragon"],
  [TYPES.ELECTRIC]: styles["card-electric"],
  [TYPES.GHOST]: styles["card-ghost"],
  [TYPES.FIRE]: styles["card-fire"],
  [TYPES.FAIRY]: styles["card-fairy"],
  [TYPES.ICE]: styles["card-ice"],
  [TYPES.FIGHT]: styles["card-fight"],
  [TYPES.NORMAL]: styles["card-normal"],
  [TYPES.GRASS]: styles["card-grass"],
  [TYPES.PSYCHIC]: styles["card-psychic"],
  [TYPES.ROCK]: styles["card-rock"],
  [TYPES.DARK]: styles["card-dark"],
  [TYPES.GROUND]: styles["card-ground"],
  [TYPES.POISON]: styles["card-poison"],
  [TYPES.FLYING]: styles["card-flying"],
};

const PokemonSquareCard = ({ pokemon, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img
        className={styles.image}
        src={pokemon.image}
        alt={`${pokemon.name} logo`}
      />
      <div className={styles.nameContainer}>
        <span className={styles.name}>{pokemon.name}</span>
      </div>
      <div className={styles.levelContainer}>
        <span className={styles.level}>{pokemon.level}</span>
      </div>
      <div className={styles.typeContainer}>
        {pokemon.types.map((item) => (
          <div className={`${styles.typeSquare} ${getColors[item]}`} />
        ))}
      </div>
    </div>
  );
};
export default PokemonSquareCard;
