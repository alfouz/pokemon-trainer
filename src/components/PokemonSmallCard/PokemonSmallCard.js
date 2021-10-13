import React from "react";
import styles from "./PokemonSmallCard.module.scss";
import TYPES from "../../assets/types";
import PokemonStat from "../PokemonStat/PokemonStat";

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

const PokemonSmallCard = ({ pokemon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.leftCard}>
        <img
          className={styles.image}
          src={pokemon.image}
          alt={`${pokemon.name} logo`}
        />
        <div className={styles.infoContainer}>
          <div className={styles.nameContainer}>
            {pokemon.name} - Level {pokemon.level}
          </div>
          <div className={styles.statsContainer}>
            {Object.keys(pokemon.baseStats).map((item) => (
              <PokemonStat stat={item} value={pokemon.stats[item]} key={item} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.rightCard}>
        {pokemon.types.map((item) => (
          <div
            className={`${styles.typeSquare} ${getColors[item]}`}
            key={item}
          />
        ))}
      </div>
    </div>
  );
};
export default PokemonSmallCard;
