import React, { useState } from "react";
import styles from "./Body.module.scss";
import PokemonSmallCard from "../../../components/PokemonSmallCard/PokemonSmallCard";
import PokemonBox from "../../../components/PokemonBox/PokemonBox";
import useAppContext from "../../../context/useAppContext";
import DropView from "../../DropView/DropView";
import BattleView from "../../BattleView/BattleView";
import Modal from "../../../views/Modal/Modal";
import BoxView from "../../BoxView/BoxView";

const Body = ({ stat, value }) => {
  const { state } = useAppContext();
  const [boxOpen, setBoxOpen] = useState(undefined);
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
          {state.pokemonBox.map((item) => (
            <PokemonSmallCard pokemon={item} />
          ))}
        </div>
        <div className={styles.boxContainer}>
          <PokemonBox
            box={{ number: 1, pokemon: state.pokemonBox }}
            onClick={(box) => setBoxOpen(box)}
          />
        </div>
      </div>
      <Modal
        title={`Box ${boxOpen?.number}`}
        onClose={() => setBoxOpen(undefined)}
        visible={boxOpen !== undefined}
      >
        <BoxView box={boxOpen} />
      </Modal>
    </div>
  );
};
export default Body;
