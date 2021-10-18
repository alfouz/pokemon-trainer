import React, { useCallback } from "react";
import BattleComponent from "./BattleComponent/BattleComponent";
import styles from "./BattleView.module.scss";
import useAppContext from "../../context/useAppContext";
import { trainer1, randomTrainer } from "../../assets/enemyTeams/enemyTeams";
import BADGES from "../../assets/badges";
import PokemonBadge from "../../components/PokemonBadge/PokemonBadge";
import { generateBattleTeam } from "../../utils/battleGenerator";

const BattleView = () => {
  const { state, createBattle } = useAppContext();
  const createFight = useCallback(
    (enemyteam) => {
      if (state.currentTeam.length > 0 && state.battle.enemyTeam.length <= 0) {
        createBattle({
          ownPokemon: generateBattleTeam(state.currentTeam),
          enemyPokemon: generateBattleTeam(enemyteam),
        });
      }
    },
    [state.currentTeam, createBattle, state.battle.enemyTeam.length]
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
