import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import PokemonDrop from "./components/PokemonDrop/PokemonDrop";
import species from "./assets/species";
import MainPage from "./views/MainPage/MainPage";
import useAppContext from "./context/useAppContext";
import { getRandomPokemon } from "./utils/pokemonGenerator";

function App() {
  const { capturePokemon } = useAppContext();

  useEffect(() => {
    capturePokemon({ value: getRandomPokemon() });
    capturePokemon({ value: getRandomPokemon() });
    capturePokemon({ value: getRandomPokemon() });
    capturePokemon({ value: getRandomPokemon() });
    capturePokemon({ value: getRandomPokemon() });
    capturePokemon({ value: getRandomPokemon() });
  }, [capturePokemon]);

  return (
    <MainPage />
    // <div className={styles.container}>
    //   <PokemonDrop />
    // </div>
  );
}

export default App;
