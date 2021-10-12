import React from "react";
import styles from "./PokemonDrop.module.scss";
import PokemonType from "../PokemonType/PokemonType";
import PokemonStat from "../PokemonStat.js/PokemonStat";
import { getRandomPokemon } from "../../utils/pokemonGenerator";

const PokemonDrop = () => {
  const pokemon = getRandomPokemon();
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
      <div className={styles.statsContainer}>
        {Object.keys(pokemon.baseStats).map((item) => (
          <PokemonStat stat={item} value={pokemon.baseStats[item]} />
        ))}
      </div>
      <img
        className={styles.image}
        src={pokemon.image}
        alt={`${pokemon.name} logo`}
      />
      <div className={styles.customDivider} />
      <div className={styles.statsContainer}>{pokemon.level}</div>
      <div className={styles.statsContainer}>
        {Object.keys(pokemon.baseStats).map((item) => (
          <PokemonStat stat={item} value={pokemon.ivs[item]} />
        ))}
      </div>
      <div className={styles.statsContainer}>
        {Object.keys(pokemon.baseStats).map((item) => (
          <PokemonStat stat={item} value={pokemon.evs[item]} />
        ))}
      </div>
      {/* <div className={styles.statsContainer}>
        {Object.keys(pokemon.baseStats).map((item) => (
          <PokemonStat stat={item} value={pokemon.stats[item]} />
        ))}
      </div> */}
    </div>
  );
};
export default PokemonDrop;
