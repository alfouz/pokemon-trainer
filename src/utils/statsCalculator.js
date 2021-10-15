export const getHP = (base, iv, ev, level) => {
  return (
    Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) +
    level +
    10
  );
};

export const getStat = (base, iv, ev, level) => {
  return Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + 5;
};

export const battleDamage = (
  level,
  power,
  attack,
  defense,
  critical,
  stab,
  effectiveness,
  burn
) => {
  console.log("level: ", level);
  console.log("power: ", power);
  console.log("attack: ", attack);
  console.log("defense: ", defense);
  console.log("critical: ", critical);
  console.log("stab: ", stab);
  console.log("effectiveness: ", effectiveness);
  console.log("burn: ", burn);
  const randomMultiplier = (Math.random() * (100 - 85 + 1) + 85) / 100;
  return (
    ((((2 * level) / 5) * power * attack) / defense / 50 + 2) *
    critical *
    randomMultiplier *
    stab *
    effectiveness *
    burn
  );
};

export const criticalGenerator = (level) => {
  let critChance = 0;
  if (level <= 0) {
    critChance = 1 / 24;
  } else {
    if (level === 1) {
      critChance = 1 / 8;
    } else {
      if (level === 2) {
        critChance = 1 / 2;
      } else {
        critChance = 1;
      }
    }
  }
  return Math.random() <= critChance;
};
