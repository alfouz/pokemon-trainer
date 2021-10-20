import React from "react";
import styles from "./EnemySide.module.scss";
import stats from "../../../../../assets/stats";
import PokemonLifeBar from "../../../../../components/PokemonLifeBar/PokemonLifeBar";
import PokemonSprite from "../../../../../components/PokemonSprite/PokemonSprite";

const EnemySide = ({ pokemon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.lifeContainer}>
          <span className={styles.name}>{pokemon.name}</span>
          <span className={styles.level}>Lvl {pokemon.level}</span>
          <PokemonLifeBar
            currentLife={pokemon.life}
            maxLife={pokemon.stats[stats.HP]}
          />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.imageContainer}>
          <PokemonSprite
            image={pokemon.image}
            name={pokemon.name}
            width={120}
            height={120}
          />
        </div>
      </div>
    </div>
  );
};
export default EnemySide;
