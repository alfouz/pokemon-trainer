import React from "react";
import styles from "./ActionChange.module.scss";
import PokemonChangeSquare from "../../../../../components/PokemonChangeSquare/PokemonChangeSquare";
import { FIXED_STATUS } from "../../../../../assets/status";

const ActionChange = ({ team, onSelect, goBack }) => {
  return (
    <div className={styles.container}>
      <div className={styles.changePokemonContainer}>
        {team.map((item, index) => (
          <PokemonChangeSquare
            selectable={item.status !== FIXED_STATUS.FAINTED}
            pokemon={item}
            onClick={() => {
              onSelect(item);
            }}
          />
        ))}
      </div>

      <div className={styles.backButton} onClick={() => goBack()}>
        Back
      </div>
    </div>
  );
};
export default ActionChange;
