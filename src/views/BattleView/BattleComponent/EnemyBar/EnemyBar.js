import React from "react";
import styles from "./EnemyBar.module.scss";

const EnemyBar = ({ pokemon }) => {
  pokemon.level = 64;
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.lifeContainer}>
          <span className={styles.name}>{pokemon.name}</span>
          <span className={styles.level}>Lvl {pokemon.level}</span>
          <div className={styles.hpLife}>
            <span className={styles.hpLabel}>HP</span>
            <div className={styles.outerLifeBar}>
              <div className={styles.innerLifeBar} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={pokemon.image}
            alt={`${pokemon.name} logo`}
          />
        </div>
      </div>
    </div>
  );
};
export default EnemyBar;
