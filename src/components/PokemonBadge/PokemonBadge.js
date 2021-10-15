import React, { useCallback } from "react";
import styles from "./PokemonBadge.module.scss";

const PokemonBadge = ({ badge, onClick, completed }) => {
  const handleClick = useCallback(() => {
    onClick && onClick(badge);
  }, [badge, onClick]);
  return (
    <div
      className={`${styles.card} ${completed ? styles.completedCard : ""}`}
      onClick={handleClick}
    >
      <img
        src={badge.image}
        alt={badge.name}
        width={64}
        height={64}
        className={`${styles.image} ${completed ? styles.completed : ""}`}
      />
    </div>
  );
};
export default PokemonBadge;
