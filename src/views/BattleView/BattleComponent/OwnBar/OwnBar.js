import React from "react";
import stats from "../../../../assets/stats";
import { FIXED_STATUS } from "../../../../assets/status";
import styles from "./OwnBar.module.scss";
import PokemonChangeSquare from "../../../../components/PokemonChangeSquare/PokemonChangeSquare";

const OwnBar = ({ pokemon, team, changePokemon }) => {
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
            <div className={styles.changePokemonContainer}>
              {team.map((item, index) => (
                <PokemonChangeSquare
                  pokemon={item}
                  onClick={() => {
                    changePokemon(index);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OwnBar;
