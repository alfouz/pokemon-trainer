import React from "react";
import styles from "./PokemonStat.module.scss";
import STATS from "../../assets/stats";

const getColors = {
  [STATS.HP]: styles["card-hp"],
  [STATS.ATTACK]: styles["card-attack"],
  [STATS.DEFENSE]: styles["card-defense"],
  [STATS.SPATTACK]: styles["card-spattack"],
  [STATS.SPDEFENSE]: styles["card-spdefense"],
  [STATS.SPEED]: styles["card-speed"],
};

const PokemonStat = ({ stat, value }) => {
  return (
    <div className={`${styles.card} ${getColors[stat]}`} title={stat}>
      {value}
    </div>
  );
};
export default PokemonStat;
