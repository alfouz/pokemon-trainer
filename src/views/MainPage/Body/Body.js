import React, { useState } from "react";
import styles from "./Body.module.scss";
import PokemonSmallCard from "../../../components/PokemonSmallCard/PokemonSmallCard";
import PokemonBox from "../../../components/PokemonBox/PokemonBox";
import useAppContext from "../../../context/useAppContext";
import DropView from "../../DropView/DropView";
import BattleView from "../../BattleView/BattleView";
import Modal from "../../../views/Modal/Modal";
import BoxView from "../../BoxView/BoxView";
import PokemonView from "../../PokemonView/PokemonView";

const Body = () => {
  const { state, getPokemon } = useAppContext();
  const [boxOpen, setBoxOpen] = useState(undefined);
  console.log(state);
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.randomDropContainer}>
          <DropView />
        </div>
        <div className={styles.battleContainer}>
          <BattleView />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.teamContainer}>
          {state.currentTeam.map((item) => (
            <PokemonSmallCard pokemon={item} />
          ))}
        </div>
        <div className={styles.boxContainer}>
          <PokemonBox
            box={{ pokemon: state.pokemonBox }}
            onClick={(box) => setBoxOpen(box)}
          />
        </div>
      </div>
      <Modal
        title={`Box ${boxOpen?.number}`}
        onClose={() => setBoxOpen(undefined)}
        visible={boxOpen !== undefined}
      >
        <BoxView />
      </Modal>
      <Modal
        title={`${state.currentPokemon?.name}`}
        onClose={() => getPokemon()}
        visible={state.currentPokemon?.name !== undefined}
      >
        <PokemonView
          pokemon={state.currentPokemon}
          closeView={() => getPokemon()}
        />
      </Modal>
    </div>
  );
};
export default Body;
