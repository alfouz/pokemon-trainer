import React, { useState } from "react";
import styles from "./App.module.scss";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import species from "./assets/species";

function App() {
  const [index, setIndex] = useState(0);
  return (
    <div className={styles.container}>
      <button onClick={() => setIndex((151 + index - 1) % 151)}>
        Previous
      </button>
      <PokemonCard pokemon={species[index]} />
      <button onClick={() => setIndex((index + 1) % 151)}>Next</button>
    </div>
  );
}

export default App;
