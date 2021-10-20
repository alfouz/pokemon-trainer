import React from "react";
import styles from "./ActionsMove.module.scss";
import PokemonMove from "../../../../../components/PokemonMove/PokemonMove";

export const currentActions = {
  ATTACK: "ATTACK",
  CHANGE: "CHANGE",
  RUN: "RUN",
};

const ActionsMove = ({ moves, onSelect, goBack }) => {
  return (
    <div className={styles.container}>
      {moves.map((move) => (
        <PokemonMove move={move} onClick={() => onSelect(move)} />
      ))}
      <div className={styles.backButton} onClick={() => goBack()}>
        Back
      </div>
    </div>
  );
};
export default ActionsMove;
