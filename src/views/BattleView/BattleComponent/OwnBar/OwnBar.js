import React from "react";
import stats from "../../../../assets/stats";
import styles from "./OwnBar.module.scss";

const OwnBar = ({ pokemon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={pokemon.image}
            alt={`${pokemon.name} logo`}
          />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.lifeContainer}>
          <span className={styles.name}>{pokemon.name}</span>
          <span className={styles.level}>Lvl {pokemon.level}</span>
          <div className={styles.hpLife}>
            <span className={styles.hpLabel}>HP</span>
            <div className={styles.outerLifeBar}>
              <div
                className={styles.innerLifeBar}
                style={{
                  width: `${
                    (pokemon.life < 0
                      ? 0
                      : pokemon.life / pokemon.stats[stats.HP]) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OwnBar;
