import React, { useState } from "react";
import styles from "./App.module.scss";
import PokemonDrop from "./components/PokemonDrop/PokemonDrop";
import species from "./assets/species";

function App() {
  return (
    <div className={styles.container}>
      <PokemonDrop />
    </div>
  );
}

export default App;
