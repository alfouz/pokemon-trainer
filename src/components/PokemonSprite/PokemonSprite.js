import React from "react";
import styles from "./PokemonSprite.module.scss";

const PokemonSprite = ({ image, name, rotate, height, width }) => {
  return (
    <img
      className={`${styles.image} ${rotate ? styles.rotate : ""}`}
      src={image}
      alt={`${name} logo`}
      width={width}
      height={height}
    />
  );
};
export default PokemonSprite;
