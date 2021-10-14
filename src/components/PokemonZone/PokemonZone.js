import React from "react";
import styles from "./PokemonZone.module.scss";

const PokemonZone = ({ zone, selected, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img
        src={zone.image}
        alt={zone.name}
        width={50}
        height={50}
        className={`${styles.image} ${selected ? styles.selected : ""}`}
      />
    </div>
  );
};
export default PokemonZone;
