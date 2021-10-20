import React from "react";
import styles from "./PokemonLifeBar.module.scss";

const PokemonLifeBar = ({ currentLife, maxLife }) => {
  return (
    <div className={styles.hpLife}>
      <span className={styles.hpLabel}>HP</span>
      <div className={styles.outerLifeBar}>
        <div
          className={styles.innerLifeBar}
          style={{
            width: `${(currentLife < 0 ? 0 : currentLife / maxLife) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};
export default PokemonLifeBar;
