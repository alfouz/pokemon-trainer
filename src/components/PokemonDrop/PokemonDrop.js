import React from "react";
import styles from "./PokemonDrop.module.scss";
import PokemonType from "../PokemonType/PokemonType";
import PokemonStat from "../PokemonStat/PokemonStat";
import PokemonMove from "../PokemonMove/PokemonMove";

const PokemonDrop = ({ pokemon, handleCapture, handleRun }) => {
  return pokemon.name ? (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerText}>{pokemon.name}</h2>
        <div className={styles.statsContainer}>Lvl {pokemon.level}</div>
        <div className={styles.typesContainer}>
          {pokemon.types.map((item) => (
            <PokemonType type={item} key={item} />
          ))}
        </div>
      </div>
      <img
        className={styles.image}
        src={pokemon.image}
        alt={`${pokemon.name} logo`}
      />
      <div className={styles.customDivider} />
      <div className={styles.statsContainer}>
        {Object.keys(pokemon.baseStats).map((item) => (
          <PokemonStat stat={item} value={pokemon.stats[item]} key={item} />
        ))}
      </div>
      <div className={styles.movesContainer}>
        {pokemon.currentMoves.map((item) => (
          <PokemonMove move={item} key={item.name} />
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.captureButton} onClick={handleCapture}>
          Capture
        </div>
        <div className={styles.runButton} onClick={handleRun}>
          Run
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
};
export default PokemonDrop;
