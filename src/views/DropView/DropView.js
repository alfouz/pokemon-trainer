import React, { useEffect, useState, useCallback } from "react";
import styles from "./DropView.module.scss";
import { getRandomPokemon } from "../../utils/pokemonGenerator";
import PokemonDrop from "../../components/PokemonDrop/PokemonDrop";
import PokemonLoader from "../../components/PokemonLoader/PokemonLoader";
import useAppContext from "../../context/useAppContext";

const chanceNewDrop = 1;

const DropView = ({ stat, value }) => {
  const [currentPokemon, setCurrentPokemon] = useState({});
  const { capturePokemon } = useAppContext();

  const handleCapture = useCallback(() => {
    capturePokemon({ value: currentPokemon });
    setCurrentPokemon({});
  }, [currentPokemon, capturePokemon]);

  const handleRun = useCallback(() => {
    setCurrentPokemon({});
  }, [setCurrentPokemon]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!currentPokemon.name) {
        const random = Math.random();
        if (chanceNewDrop >= random) {
          setCurrentPokemon(getRandomPokemon());
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentPokemon]);
  return (
    <div className={styles.container}>
      <div className={styles.dropContainer}>
        {currentPokemon.name ? (
          <PokemonDrop
            pokemon={currentPokemon}
            handleCapture={handleCapture}
            handleRun={handleRun}
          />
        ) : (
          <PokemonLoader />
        )}
      </div>
      <div className={styles.dropBottomContainer}></div>
    </div>
  );
};
export default DropView;
