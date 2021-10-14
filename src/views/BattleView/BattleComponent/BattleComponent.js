import React from "react";
import styles from "./BattleComponent.module.scss";
import EnemyBar from "./EnemyBar/EnemyBar";
import { chansey, charmander } from "../../../assets/species";
import OwnBar from "./OwnBar/OwnBar";
import InfoBox from "./InfoBox/InfoBox";
import MovesComponent from "./MovesComponent/MovesComponent";
import { getRandomPokemon } from "../../../utils/pokemonGenerator";

const BattleComponent = () => {
  return (
    <div className={styles.container}>
      <EnemyBar pokemon={chansey} />
      <OwnBar pokemon={charmander} />
      {/* <InfoBox message="TEEEEST" /> */}
      <MovesComponent pokemon={getRandomPokemon()} />
    </div>
  );
};
export default BattleComponent;
