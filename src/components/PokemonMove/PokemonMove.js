import React from "react";
import styles from "./PokemonMove.module.scss";
import TYPES from "../../assets/types";

const getColors = {
  [TYPES.STEEL]: styles["card-steel"],
  [TYPES.WATER]: styles["card-water"],
  [TYPES.BUG]: styles["card-bug"],
  [TYPES.DRAGON]: styles["card-dragon"],
  [TYPES.ELECTRIC]: styles["card-electric"],
  [TYPES.GHOST]: styles["card-ghost"],
  [TYPES.FIRE]: styles["card-fire"],
  [TYPES.FAIRY]: styles["card-fairy"],
  [TYPES.ICE]: styles["card-ice"],
  [TYPES.FIGHT]: styles["card-fight"],
  [TYPES.NORMAL]: styles["card-normal"],
  [TYPES.GRASS]: styles["card-grass"],
  [TYPES.PSYCHIC]: styles["card-psychic"],
  [TYPES.ROCK]: styles["card-rock"],
  [TYPES.DARK]: styles["card-dark"],
  [TYPES.GROUND]: styles["card-ground"],
  [TYPES.POISON]: styles["card-poison"],
  [TYPES.FLYING]: styles["card-flying"],
};

const PokemonMove = ({ move, onClick }) => {
  return (
    <div
      className={`${styles.card} ${getColors[move.type]}`}
      onClick={() => onClick && onClick(move)}
    >
      {move.name}
    </div>
  );
};
export default PokemonMove;
