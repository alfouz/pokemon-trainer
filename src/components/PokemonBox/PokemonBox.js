import React, { useCallback } from "react";
import styles from "./PokemonBox.module.scss";

const PokemonBox = ({ box, onClick }) => {
  const handleClick = useCallback(() => {
    onClick && onClick(box);
  }, [box, onClick]);
  return (
    <div className={styles.card} onClick={handleClick}>
      Box {box.number} - {box.pokemon.length} Pokemon
    </div>
  );
};
export default PokemonBox;
