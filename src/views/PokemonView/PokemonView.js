import React, { useState, useCallback } from "react";
import styles from "./PokemonView.module.scss";
import PokemonType from "../../components/PokemonType/PokemonType";
import PokemonStat from "../../components/PokemonStat/PokemonStat";
import PokemonMove from "../../components/PokemonMove/PokemonMove";

const PokemonView = ({ pokemon }) => {
  const [currentMove, setCurrentMove] = useState(undefined);
  const handleMoveClick = useCallback((move) => {
    setCurrentMove(move);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.detailContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={pokemon.image}
            alt={`${pokemon.name} logo`}
            width={200}
            height={200}
          />
        </div>
        <div className={styles.rightDetailsContainer}>
          <div className={styles.nameContainer}>
            <h3
              className={styles.title}
            >{`${pokemon.name} - Level ${pokemon.level}`}</h3>
          </div>
          <div className={styles.typesContainer}>
            {pokemon.types.map((item) => (
              <PokemonType type={item} />
            ))}
          </div>
          <div className={styles.statsContainer}>
            <div className={styles.stats}>
              <span className={styles.statsTitle}>Base Stats: </span>
              {Object.keys(pokemon.baseStats).map((item) => (
                <PokemonStat stat={item} value={pokemon.baseStats[item]} />
              ))}
            </div>
            <div className={styles.stats}>
              <span className={styles.statsTitle}>IVs: </span>
              {Object.keys(pokemon.baseStats).map((item) => (
                <PokemonStat stat={item} value={pokemon.ivs[item]} />
              ))}
            </div>
            <div className={styles.stats}>
              <span className={styles.statsTitle}>EVs: </span>
              {Object.keys(pokemon.baseStats).map((item) => (
                <PokemonStat stat={item} value={pokemon.evs[item]} />
              ))}
            </div>
            <div className={styles.statsTotal}>
              <span className={styles.statsTitle}>Stats: </span>
              {Object.keys(pokemon.baseStats).map((item) => (
                <PokemonStat stat={item} value={pokemon.stats[item]} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.movesContainer}>
          {pokemon.currentMoves.map((item) => (
            <PokemonMove
              move={item}
              key={item.name}
              onClick={handleMoveClick}
            />
          ))}
          {currentMove && (
            <div className={styles.movesDetail}>
              <div className={styles.movesElementDetail}>
                <span className={styles.movesDetailTitle}>Name:</span>
                <span className={styles.movesDetailValue}>
                  {currentMove.name}
                </span>
              </div>
              <div className={styles.movesElementDetail}>
                <span className={styles.movesDetailTitle}>Type:</span>
                <span className={styles.movesDetailValue}>
                  <PokemonType type={currentMove.type} />
                </span>
              </div>
              <div className={styles.movesElementDetail}>
                <span className={styles.movesDetailTitle}>Category:</span>
                <span className={styles.movesDetailValue}>
                  {currentMove.category}
                </span>
              </div>
              <div className={styles.movesElementDetail}>
                <span className={styles.movesDetailTitle}>Power:</span>
                <span className={styles.movesDetailValue}>
                  {currentMove.power || "-"}
                </span>
              </div>
              <div className={styles.movesElementDetail}>
                <span className={styles.movesDetailTitle}>Accuracy:</span>
                <span className={styles.movesDetailValue}>
                  {(currentMove.accuracy || 1) * 100}%
                </span>
              </div>
              <div className={styles.movesElementDetail}>
                <span className={styles.movesDetailTitle}>PP:</span>
                <span className={styles.movesDetailValue}>
                  {currentMove.pp}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className={styles.actionsContainer}></div>
      </div>
    </div>
  );
};
export default PokemonView;
