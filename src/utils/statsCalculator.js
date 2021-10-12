export const getHP = (base, iv, ev, level) => {
  return Math.floor(
    0.01 * (2 * base + iv + Math.floor(0.25 * ev)) + level + 10
  );
};

export const getStat = (base, iv, ev, level) => {
  return Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + 5;
};
