import React from "react";
import styles from "./Body.module.scss";
import PokemonSmallCard from "../../../components/PokemonSmallCard/PokemonSmallCard";
import PokemonBox from "../../../components/PokemonBox/PokemonBox";
import useAppContext from "../../../context/useAppContext";
import DropView from "../../DropView/DropView";

const Body = ({ stat, value }) => {
  const { state } = useAppContext();
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.randomDropContainer}>
          <DropView />
        </div>
        <div className={styles.battleContainer}>RANDOM DROP</div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.teamContainer}>
          {state.pokemonBox.map((item) => (
            <PokemonSmallCard pokemon={item} />
          ))}
        </div>
        <div className={styles.boxContainer}>
          <PokemonBox box={{ number: 1, pokemon: state.pokemonBox }} />
        </div>
      </div>
    </div>
  );
};
export default Body;
