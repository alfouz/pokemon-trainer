import React from "react";
import stats from "../../../../assets/stats";
import { FIXED_STATUS } from "../../../../assets/status";
import styles from "./EnemyBar.module.scss";

const EnemyBar = ({ pokemon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.lifeContainer}>
          <span className={styles.name}>{pokemon.name}</span>
          <span className={styles.level}>Lvl {pokemon.level}</span>
          <div className={styles.hpLife}>
            <span className={styles.hpLabel}>
              {pokemon.status !== FIXED_STATUS.HEALTHY ? pokemon.status : "HP"}
            </span>
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
