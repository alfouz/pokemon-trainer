export const generateNewMove = (playerPokemon, enemyPokemon) => {
  const random = Math.floor(Math.random() * (3 - 0 + 1) + 0);
  return enemyPokemon.currentMoves[random];
};
