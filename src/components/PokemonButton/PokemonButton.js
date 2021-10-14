import React from "react";
import styles from "./PokemonButton.module.scss";

const PokemonButton = ({ onClick, text }) => {
  return (
    <button className={styles.container} onClick={onClick}>
      {text}
    </button>
  );
};
export default PokemonButton;
