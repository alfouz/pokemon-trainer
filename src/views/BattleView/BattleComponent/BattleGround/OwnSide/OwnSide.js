import React from "react";
import stats from "../../../../../assets/stats";
import styles from "./OwnSide.module.scss";
import PokemonSprite from "../../../../../components/PokemonSprite/PokemonSprite";
import PokemonLifeBar from "../../../../../components/PokemonLifeBar/PokemonLifeBar";

const OwnSide = ({ pokemon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.imageContainer}>
          <PokemonSprite
            image={pokemon.image}
            name={pokemon.name}
            width={120}
            height={120}
            rotate
          />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.lifeContainer}>
          <span className={styles.name}>{pokemon.name}</span>
          <span className={styles.level}>Lvl {pokemon.level}</span>
          <PokemonLifeBar
            currentLife={pokemon.life}
            maxLife={pokemon.stats[stats.HP]}
          />
        </div>
      </div>
    </div>
  );
};
export default OwnSide;
