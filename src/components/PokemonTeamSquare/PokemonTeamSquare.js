import React from "react";
import styles from "./PokemonTeamSquare.module.scss";
import ReplaceIcon from "../../assets/icons/ReplaceIcon";

const PokemonTeamSquare = ({ pokemon, position, onClick }) => {
  return (
    <div
      className={styles.card}
      title={`Position ${position}`}
      onClick={() => onClick(position)}
    >
      {pokemon?.name ? (
        <>
          <img
            className={styles.image}
            src={pokemon.image}
            alt={`${pokemon.name} logo`}
          />
          <div className={styles.icon}>
            <ReplaceIcon />
          </div>
        </>
      ) : (
        <div className={styles.noData}>+</div>
      )}
    </div>
  );
};
export default PokemonTeamSquare;
