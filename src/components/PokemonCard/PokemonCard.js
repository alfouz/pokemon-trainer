import React from "react";
import styles from "./PokemonCard.module.scss";
import PokemonType from "../PokemonType/PokemonType";
import PokemonStat from "../PokemonStat.js/PokemonStat";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerText}>{pokemon.name}</h2>
        <div className={styles.typesContainer}>
          {pokemon.types.map((item) => (
            <PokemonType type={item} />
          ))}
        </div>
      </div>
      <img
        className={styles.image}
        src={pokemon.image}
        alt={`${pokemon.name} logo`}
      />
      <div className={styles.statsContainer}>
        {Object.keys(pokemon.baseStats).map((item) => (
          <PokemonStat stat={item} value={pokemon.baseStats[item]} />
        ))}
      </div>
    </div>
  );
};
export default PokemonCard;
