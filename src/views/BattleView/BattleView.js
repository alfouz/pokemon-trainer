import React, { useCallback, useState } from "react";
import BattleComponent from "./BattleComponent/BattleComponent";
import styles from "./BattleView.module.scss";
import useAppContext from "../../context/useAppContext";
import { trainer1, randomTrainer } from "../../assets/enemyTeams/enemyTeams";
import BADGES from "../../assets/badges";
import PokemonBadge from "../../components/PokemonBadge/PokemonBadge";
import { BattleContextProvider } from "../../context/battleContext";

const BattleView = () => {
  const { state } = useAppContext();
  const [newEnemyTeam, setNewEnemyTeam] = useState(undefined);
  const createFight = useCallback(
    (enemyteam) => {
      if (!newEnemyTeam) {
        setNewEnemyTeam(enemyteam);
      }
    },
    [newEnemyTeam]
  );
  return (
    <div className={styles.container}>
      <div className={styles.badgesContainer}>
        {BADGES.map((item) => (
          <PokemonBadge badge={item} onClick={() => createFight(item.team)} />
        ))}
      </div>
      <div className={styles.battleContainer}>
        {state.battle.enemyTeam.length > 0 &&
        state.battle.ownTeam.length > 0 ? (
          <BattleContextProvider>
            <BattleComponent
              ownTeam={state.currentTeam}
              enemyTeam={newEnemyTeam}
            />
          </BattleContextProvider>
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
