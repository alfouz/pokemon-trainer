import React, { useCallback, useState } from "react";
import BattleComponent from "./BattleComponent/BattleComponent";
import styles from "./BattleView.module.scss";
import useAppContext from "../../context/useAppContext";
import { randomTrainer } from "../../assets/enemyTeams/enemyTeams";
import BADGES from "../../assets/badges";
import PokemonBadge from "../../components/PokemonBadge/PokemonBadge";
import { BattleContextProvider } from "../../context/battleContext";

const BattleView = () => {
  const { state } = useAppContext();
  const [newEnemyTeam, setNewEnemyTeam] = useState(undefined);
  const createFight = useCallback(
    (enemyteam) => {
      if (!newEnemyTeam) {
        console.log(enemyteam);
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
        {newEnemyTeam && newEnemyTeam.length > 0 ? (
          <BattleContextProvider>
            <BattleComponent
              ownTeam={state.currentTeam}
              enemyTeam={newEnemyTeam}
              onEndBattle={(win, earns) => {
                console.log(win ? "CONGRATULATIONS, YOU WIN" : "NOB");
                setNewEnemyTeam(undefined);
              }}
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
