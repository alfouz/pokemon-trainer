import React, { useState, useCallback } from "react";
import BattleComponent from "./BattleComponent/BattleComponent";
import styles from "./BattleView.module.scss";
import useAppContext from "../../context/useAppContext";
import { trainer1, randomTrainer } from "../../assets/enemyTeams/enemyTeams";
import BADGES from "../../assets/badges";
import PokemonBadge from "../../components/PokemonBadge/PokemonBadge";

const BattleView = () => {
  const { state } = useAppContext();
  const [currentFight, setCurrentFight] = useState(undefined);
  const createFight = useCallback(
    (enemyteam) => {
      if (!currentFight && state.currentTeam.length > 0) {
        setCurrentFight(enemyteam);
      }
    },
    [currentFight, state.currentTeam]
  );
  return (
    <div className={styles.container}>
      <div className={styles.badgesContainer}>
        {BADGES.map((item) => (
          <PokemonBadge badge={item} onClick={() => createFight(item.team)} />
        ))}
      </div>
      <div className={styles.battleContainer}>
        {currentFight ? (
          <BattleComponent ownTeam={state.currentTeam} enemyTeam={trainer1} />
        ) : (
          <div
            className={styles.randomBattleButton}
            onClick={() => createFight(randomTrainer)}
          >
            Click for a random battle
          </div>
        )}
      </div>
    </div>
  );
};
export default BattleView;
