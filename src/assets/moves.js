import TYPES from "./types";
import STATS from "./stats";
import {
  FIXED_STATUS,
  TEMPORAL_STATUS,
  MOVES_STATUS,
  FIELD_STATUS,
} from "./status";
import TARGET from "./targets";

export const absorb = {
  name: "absorb",
  type: TYPES.GRASS,
  category: "special",
  power: 20,
  accuracy: 1.0,
  pp: 25,
  recover: 0.5,
};
export const acid = {
  name: "acid",
  type: TYPES.POISON,
  category: "physical",
  power: 40,
  accuracy: 1.0,
  pp: 30,
  effect: { chance: 0.1, stat: STATS.SPDEFENSE, stages: -1 },
};
export const acidArmor = {
  name: "acid armor",
  type: TYPES.POISON,
  category: "status",
  power: null,
  accuracy: null,
  pp: 20,
  effect: { stat: STATS.DEFENSE, stages: 2 },
};
export const agility = {
  name: "agility",
  type: TYPES.PSYCHIC,
  category: "status",
  power: null,
  accuracy: null,
  pp: 30,
  effect: { stat: STATS.SPEED, stages: 2 },
};
export const amnesia = {
  name: "amnesia",
  type: TYPES.PSYCHIC,
  category: "status",
  power: null,
  accuracy: null,
  pp: 20,
  effect: { stat: STATS.SPDEFENSE, stages: 2 },
};
export const auroraBeam = {
  name: "aurora beam",
  type: TYPES.ICE,
  category: "special",
  power: 65,
  accuracy: 1.0,
  pp: 20,
  effect: { chance: 0.1, stat: STATS.ATTACK, stages: -1 },
};
export const barrage = {
  name: "barrage",
  type: TYPES.NORMAL,
  category: "physical",
  power: 15,
  accuracy: 0.85,
  minTimes: 2,
  maxTimes: 5,
  probabilities: [0.3333, 0.3333, 0.1667, 0.1667],
  pp: 20,
};
export const barrier = {
  name: "barrier",
  type: TYPES.PSYCHIC,
  category: "status",
  power: null,
  accuracy: null,
  pp: 20,
  effect: { stat: STATS.DEFENSE, stages: 2 },
};
export const bide = {
  name: "bide",
  type: TYPES.NORMAL,
  category: "physical",
  power: null,
  accuracy: null,
  pp: 10,
  priority: 1,
  effects: {
    status: MOVES_STATUS.BIDING,
    target: TARGET.ENEMY,
    duration: [2, 3],
  },
};
export const bind = {
  name: "bind",
  type: TYPES.NORMAL,
  category: "physical",
  power: 15,
  accuracy: 0.85,
  pp: 20,
  effects: { stat: STATS.HP, stages: 0.125, duration: [4, 5] },
};
export const bite = {
  name: "bite",
  type: TYPES.DARK,
  category: "physical",
  power: 60,
  accuracy: 1.0,
  pp: 25,
  effect: { chance: 0.3, statusCondition: TEMPORAL_STATUS.FLINCHED },
};
export const blizzard = {
  name: "blizzard",
  type: TYPES.ICE,
  category: "special",
  power: 110,
  accuracy: 0.7,
  pp: 5,
  effect: { chance: 0.1, statusCondition: FIXED_STATUS.FREEZED },
};
export const bodySlam = {
  name: "body slam",
  type: TYPES.NORMAL,
  category: "physical",
  power: 85,
  accuracy: 1.0,
  pp: 15,
  effect: { chance: 0.3, statusCondition: FIXED_STATUS.PARALIZED },
};
export const boneClub = {
  name: "bone club",
  type: TYPES.GROUND,
  category: "physical",
  power: 65,
  accuracy: 0.85,
  pp: 20,
  effect: { chance: 0.1, statusCondition: TEMPORAL_STATUS.FLINCHED },
};
export const bonemerang = {
  name: "bonemerang",
  type: TYPES.GROUND,
  category: "physical",
  power: 50,
  accuracy: 0.9,
  pp: 10,
  minTimes: 2,
  maxTimes: 2,
  probabilities: [1],
};
export const bubble = {
  name: "bubble",
  type: TYPES.WATER,
  category: "special",
  power: 40,
  accuracy: 1.0,
  pp: 30,
  effect: { chance: 0.1, stat: STATS.SPEED, stages: -1 },
};
export const bubbleBeam = {
  name: "bubble beam",
  type: TYPES.WATER,
  category: "special",
  power: 65,
  accuracy: 1.0,
  pp: 20,
  effect: { chance: 0.1, stat: STATS.SPEED, stages: -1 },
};
export const clamp = {
  name: "clamp",
  type: TYPES.WATER,
  category: "physical",
  power: 35,
  accuracy: 0.85,
  pp: 15,
  effects: { stat: STATS.HP, stages: 0.125, duration: [4, 5] },
};
export const cometPunch = {
  name: "comet punch",
  type: TYPES.NORMAL,
  category: "physical",
  power: 18,
  accuracy: 0.85,
  pp: 15,
  minTimes: 2,
  maxTimes: 5,
  probabilities: [0.3333, 0.3333, 0.1667, 0.1667],
};
export const confuseRay = {
  name: "confuse ray",
  type: TYPES.GHOST,
  category: "status",
  power: null,
  accuracy: 1.0,
  pp: 10,
  effect: { statusCondition: TEMPORAL_STATUS.CONFUSED },
};
export const confusion = {
  name: "confusion",
  type: TYPES.PSYCHIC,
  category: "special",
  power: 50,
  accuracy: 1.0,
  pp: 25,
  effect: { chance: 0.1, statusCondition: TEMPORAL_STATUS.CONFUSED },
};
export const constrict = {
  name: "constrict",
  type: TYPES.NORMAL,
  category: "physical",
  power: 10,
  accuracy: 1.0,
  pp: 35,
  effect: { chance: 0.1, stat: STATS.SPEED, stages: -1 },
};
export const conversion = {
  name: "conversion",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 30,
  effect: { status: MOVES_STATUS.TYPE_CHANGED, target: TARGET.SELF, value: 0 }, // Cambia por la posición 1 de ataque
};
export const counter = {
  name: "counter",
  type: TYPES.FIGHT,
  category: "physical",
  power: null,
  accuracy: 1.0,
  pp: 20,
  priority: -1,
  effect: { status: MOVES_STATUS.PHYSICAL_COUNTER, value: 2 },
};
export const crabhammer = {
  name: "crabhammer",
  type: TYPES.WATER,
  category: "physical",
  power: 100,
  accuracy: 0.9,
  pp: 10,
  highCriticalHitRatio: true,
};
export const cut = {
  name: "cut",
  type: TYPES.NORMAL,
  category: "physical",
  power: 50,
  accuracy: 0.95,
  pp: 30,
};
export const defenseCurl = {
  name: "defense curl",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 40,
  effect: {
    status: MOVES_STATUS.DEFENSE_CURLED,
    stat: STATS.DEFENSE,
    stages: 1,
  },
};
export const dig = {
  name: "dig",
  type: TYPES.GROUND,
  category: "physical",
  power: 80,
  accuracy: 1.0,
  pp: 10,
  effect: {
    status: MOVES_STATUS.UNDERGROUND,
    target: TARGET.SELF,
    duration: 2,
  },
};
export const disable = {
  name: "disable",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 1,
  pp: 20,
  effect: { status: MOVES_STATUS.DISABLED, target: TARGET.ENEMY, duration: 2 },
};
export const dizzyPunch = {
  name: "dizzy punch",
  type: TYPES.NORMAL,
  category: "physical",
  power: 70,
  accuracy: 1.0,
  pp: 10,
  effect: { statusCondition: TEMPORAL_STATUS.CONFUSED, change: 0.2 },
};
export const doubleKick = {
  name: "double kick",
  type: TYPES.FIGHT,
  category: "physical",
  power: 30,
  accuracy: 1.0,
  pp: 30,
  minTimes: 2,
  maxTimes: 2,
  probabilities: [1],
};
export const doubleSlap = {
  name: "double slap",
  type: TYPES.NORMAL,
  category: "physical",
  power: 15,
  accuracy: 0.85,
  pp: 10,
  minTimes: 2,
  maxTimes: 5,
  probabilities: [0.3333, 0.3333, 0.1667, 0.1667],
};
export const doubleTeam = {
  name: "double team",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 15,
  effect: { stat: STATS.EVASIVENESS, stages: 1 },
};
export const doubleEdge = {
  name: "double-edge",
  type: TYPES.NORMAL,
  category: "physical",
  power: 120,
  accuracy: 1.0,
  pp: 15,
  recoil: 0.333,
};
export const dragonRage = {
  name: "dragon rage",
  type: TYPES.DRAGON,
  category: "special",
  power: null,
  accuracy: 1.0,
  pp: 10,
  fixedPower: 40,
};
export const dreameater = {
  name: "dream eater",
  type: TYPES.PSYCHIC,
  category: "special",
  power: 100,
  accuracy: 1.0,
  pp: 15,
  requirement: { [TARGET.ENEMY]: [FIXED_STATUS.SLEEP] },
};
export const drillPeck = {
  name: "drill peck",
  type: TYPES.FLYING,
  category: "physical",
  power: 80,
  accuracy: 1.0,
  pp: 20,
};
export const earthquake = {
  name: "earthquake",
  type: TYPES.GROUND,
  category: "physical",
  power: 100,
  accuracy: 1.0,
  pp: 10,
};
export const eggBomb = {
  name: "egg bomb",
  type: TYPES.NORMAL,
  category: "physical",
  power: 100,
  accuracy: 0.75,
  pp: 10,
};
export const ember = {
  name: "ember",
  type: TYPES.FIRE,
  category: "special",
  power: 40,
  accuracy: 1.0,
  pp: 25,
  effect: { chance: 0.1, statusCondition: FIXED_STATUS.BURNED },
};
export const explosion = {
  name: "explosion",
  type: TYPES.NORMAL,
  category: "physical",
  power: 250,
  accuracy: 1.0,
  pp: 5,
  effects: { stat: STATS.HP, target: TARGET.SELF, stages: 1 },
};
export const fireBlast = {
  name: "fire blast",
  type: TYPES.FIRE,
  category: "special",
  power: 110,
  accuracy: 0.85,
  pp: 5,
  effect: { chance: 0.1, statusCondition: FIXED_STATUS.BURNED },
};
export const firePunch = {
  name: "fire punch",
  type: TYPES.FIRE,
  category: "physical",
  power: 75,
  accuracy: 1.0,
  pp: 15,
  effect: { chance: 0.1, statusCondition: FIXED_STATUS.BURNED },
};
export const fireSpin = {
  name: "fire spin",
  type: TYPES.FIRE,
  category: "special",
  power: 35,
  accuracy: 0.85,
  pp: 15,
  effects: { stat: STATS.HP, stages: 0.125, duration: [4, 5] },
};
export const fissure = {
  name: "fissure",
  type: TYPES.GROUND,
  category: "physical",
  power: null,
  accuracy: null,
  pp: 5,
  oneHitKOMove: true,
};
export const flamethrower = {
  name: "flamethrower",
  type: TYPES.FIRE,
  category: "special",
  power: 90,
  accuracy: 1.0,
  pp: 15,
  effect: { chance: 0.1, statusCondition: FIXED_STATUS.BURNED },
};
export const flash = {
  name: "flash",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 1,
  pp: 20,
  effect: { stat: STATS.ACCURACY, stages: -1 },
};
export const fly = {
  name: "fly",
  type: TYPES.FLYING,
  category: "physical",
  power: 90,
  accuracy: 0.95,
  pp: 15,
  effect: {
    status: MOVES_STATUS.FLYING,
    target: TARGET.SELF,
    duration: 2,
  },
};
export const focusEnergy = {
  name: "focus energy",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 30,
  effect: {
    statusCondition: TEMPORAL_STATUS.CRITICAL_RATIO_INCREASED,
    stages: 2,
  },
};
export const furyAttack = {
  name: "fury attack",
  type: TYPES.NORMAL,
  category: "physical",
  power: 15,
  accuracy: 0.85,
  pp: 20,
  minTimes: 2,
  maxTimes: 5,
  probabilities: [0.3333, 0.3333, 0.1667, 0.1667],
};
export const furySwipes = {
  name: "fury swipes",
  type: TYPES.NORMAL,
  category: "physical",
  power: 18,
  accuracy: 0.8,
  pp: 15,
  minTimes: 2,
  maxTimes: 5,
  probabilities: [0.3333, 0.3333, 0.1667, 0.1667],
};
export const glare = {
  name: "glare",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 100,
  pp: 30,
  effect: { statusCondition: FIXED_STATUS.PARALIZED },
};
export const growl = {
  name: "growl",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 1.0,
  pp: 40,
  effect: { stat: STATS.ATTACK, stages: -1 },
};
export const growth = {
  name: "growth",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 40,
  effect: { stat: STATS.SPATTACK, stages: 1 },
};
export const guillotine = {
  name: "guillotine",
  type: TYPES.NORMAL,
  category: "physical",
  power: null,
  accuracy: null,
  pp: 5,
  oneHitKOMove: true,
};
export const gust = {
  name: "gust",
  type: TYPES.FLYING,
  category: "special",
  power: 40,
  accuracy: 1.0,
  pp: 35,
};
export const harden = {
  name: "harden",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 30,
  effect: { stat: STATS.DEFENSE, stages: 1 },
};
export const haze = {
  name: "haze",
  type: TYPES.ICE,
  category: "status",
  power: null,
  accuracy: null,
  pp: 30,
  effects: { resetStats: true },
};
export const headbutt = {
  name: "headbutt",
  type: TYPES.NORMAL,
  category: "physical",
  power: 70,
  accuracy: 1.0,
  pp: 15,
  effect: { chance: 0.3, statusCondition: TEMPORAL_STATUS.FLINCHED },
};
export const highJumpKick = {
  name: "high jump kick",
  type: TYPES.FIGHT,
  category: "physical",
  power: 130,
  accuracy: 0.9,
  pp: 10,
  effects: {
    stat: STATS.HP,
    target: TARGET.SELF,
    condition: "miss",
    stages: 0.5,
  },
};
export const hornAttack = {
  name: "horn attack",
  type: TYPES.NORMAL,
  category: "physical",
  power: 65,
  accuracy: 1.0,
  pp: 25,
};
export const hornDrill = {
  name: "horn drill",
  type: TYPES.NORMAL,
  category: "physical",
  power: null,
  accuracy: null,
  pp: 5,
  oneHitKOMove: true,
};
export const hydroPump = {
  name: "hydro pump",
  type: TYPES.WATER,
  category: "special",
  power: 110,
  accuracy: 0.8,
  pp: 5,
};
export const hyperBeam = {
  name: "hyper beam",
  type: TYPES.NORMAL,
  category: "special",
  power: 150,
  accuracy: 0.9,
  pp: 5,
  effect: { target: TARGET.SELF, statusCondition: TEMPORAL_STATUS.RELOADING },
};
export const hyperFang = {
  name: "hyper fang",
  type: TYPES.NORMAL,
  category: "physical",
  power: 80,
  accuracy: 0.9,
  pp: 15,
  effect: { chance: 0.1, statusCondition: TEMPORAL_STATUS.FLINCHED },
};
export const hypnosis = {
  name: "hypnosis",
  type: TYPES.PSYCHIC,
  category: "status",
  power: null,
  accuracy: 0.6,
  pp: 20,
  effect: { statusCondition: FIXED_STATUS.SLEEP },
};
export const iceBeam = {
  name: "ice beam",
  type: TYPES.ICE,
  category: "special",
  power: 90,
  accuracy: 1.0,
  pp: 10,
  effect: { chance: 0.1, statusCondition: FIXED_STATUS.FREEZED },
};
export const icePunch = {
  name: "ice punch",
  type: TYPES.ICE,
  category: "physical",
  power: 75,
  accuracy: 1.0,
  pp: 15,
  effect: { chance: 0.1, statusCondition: FIXED_STATUS.FREEZED },
};
export const jumpKick = {
  name: "jump kick",
  type: TYPES.FIGHT,
  category: "physical",
  power: 100,
  accuracy: 0.95,
  pp: 10,
  effects: {
    stat: STATS.HP,
    target: TARGET.SELF,
    condition: "miss",
    stages: 0.5,
  },
};
export const karateChop = {
  name: "karate chop",
  type: TYPES.FIGHT,
  category: "physical",
  power: 50,
  accuracy: 1.0,
  pp: 25,
  highCriticalHitRatio: true,
};
export const kinesis = {
  name: "kinesis",
  type: TYPES.PSYCHIC,
  category: "status",
  power: null,
  accuracy: 0.8,
  pp: 15,
  effect: { stat: STATS.ACCURACY, stages: -1 },
};
export const leechLife = {
  name: "leech life",
  type: TYPES.BUG,
  category: "physical",
  power: 80,
  accuracy: 1.0,
  pp: 10,
  recover: 0.5,
};
export const leechSeed = {
  name: "leech seed",
  type: TYPES.GRASS,
  category: "status",
  power: null,
  accuracy: 0.9,
  pp: 10,
  effect: { statusCondition: TEMPORAL_STATUS.SEEDED },
};
export const leer = {
  name: "leer",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 1.0,
  pp: 30,
  effect: { stat: STATS.DEFENSE, stages: -1 },
};
export const lick = {
  name: "lick",
  type: TYPES.GHOST,
  category: "physical",
  power: 30,
  accuracy: 1.0,
  pp: 30,
  effect: { chance: 0.3, statusCondition: FIXED_STATUS.PARALIZED },
};
export const lightScreen = {
  name: "light screen",
  type: TYPES.PSYCHIC,
  category: "status",
  power: null,
  accuracy: null,
  pp: 30,
  effects: { field: FIELD_STATUS.LIGHTSCREEN, duration: 5 },
};
export const lovelyKiss = {
  name: "lovely kiss",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 0.75,
  pp: 10,
  effect: { statusCondition: FIXED_STATUS.SLEEP },
};
// TOBEFIXED
export const lowKick = {
  name: "low kick",
  type: TYPES.FIGHT,
  category: "physical",
  power: 50,
  accuracy: 0.9,
  pp: 20,
  effect: { chance: 0.3, statusCondition: TEMPORAL_STATUS.FLINCHED },
};
export const meditate = {
  name: "meditate",
  type: TYPES.PSYCHIC,
  category: "status",
  power: null,
  accuracy: null,
  pp: 40,
  effect: { stat: STATS.ATTACK, stages: 1 },
};
export const megaDrain = {
  name: "mega drain",
  type: TYPES.GRASS,
  category: "special",
  power: 40,
  accuracy: 1.0,
  pp: 10,
  recover: 0.5,
};
export const megaKick = {
  name: "mega kick",
  type: TYPES.NORMAL,
  category: "physical",
  power: 120,
  accuracy: 0.75,
  pp: 5,
};
export const megaPunch = {
  name: "mega punch",
  type: TYPES.NORMAL,
  category: "physical",
  power: 80,
  accuracy: 0.85,
  pp: 20,
};
export const metronome = {
  name: "metronome",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 10,
  randomMove: true,
};
export const mimic = {
  name: "mimic",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 10,
  effect: { status: MOVES_STATUS.MOVE_CHANGED, target: TARGET.SELF },
};
export const minimize = {
  name: "minimize",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 20,
  effect: { stat: STATS.EVASIVENESS, stages: 1 },
};
export const mirrorMove = {
  name: "mirror move",
  type: TYPES.FLYING,
  category: "status",
  power: null,
  accuracy: null,
  pp: 20,
  repeatMove: true,
};
export const mist = {
  name: "mist",
  type: TYPES.ICE,
  category: "status",
  power: null,
  accuracy: null,
  pp: 30,
  effect: {
    statusCondition: TEMPORAL_STATUS.PREVENT_STATS_CHANGED,
    duration: 5,
  },
};
export const nightShade = {
  name: "night shade",
  type: TYPES.GHOST,
  category: "special",
  power: null,
  accuracy: 1.0,
  pp: 15,
  damageOnLevel: true,
};
export const payDay = {
  name: "pay day",
  type: TYPES.NORMAL,
  category: "physical",
  power: 40,
  accuracy: 1.0,
  pp: 20,
};
export const peck = {
  name: "peck",
  type: TYPES.FLYING,
  category: "physical",
  power: 35,
  accuracy: 1.0,
  pp: 35,
};
export const petalDance = {
  name: "petal dance",
  type: TYPES.GRASS,
  category: "special",
  power: 120,
  accuracy: 1.0,
  pp: 10,
  effect: {
    status: MOVES_STATUS.DANCING,
    target: TARGET.SELF,
    duration: [2, 3],
  },
};
export const pinMissile = {
  name: "pin missile",
  type: TYPES.BUG,
  category: "physical",
  power: 25,
  accuracy: 0.95,
  pp: 20,
  minTimes: 2,
  maxTimes: 5,
  probabilities: [0.3333, 0.3333, 0.1667, 0.1667],
};
export const poisonGas = {
  name: "poison gas",
  type: TYPES.POISON,
  category: "status",
  power: null,
  accuracy: 0.9,
  pp: 40,
  effect: { statusCondition: FIXED_STATUS.POISONED },
};
export const poisonPowder = {
  name: "poison powder",
  type: TYPES.POISON,
  category: "status",
  power: null,
  accuracy: 0.75,
  pp: 35,
  effect: { statusCondition: FIXED_STATUS.POISONED },
};
export const poisonSting = {
  name: "poison sting",
  type: TYPES.POISON,
  category: "physical",
  power: 15,
  accuracy: 1.0,
  pp: 35,
  effect: { chance: 0.3, statusCondition: FIXED_STATUS.POISONED },
};
export const pound = {
  name: "pound",
  type: TYPES.NORMAL,
  category: "physical",
  power: 40,
  accuracy: 1.0,
  pp: 35,
};
export const psybeam = {
  name: "psybeam",
  type: TYPES.PSYCHIC,
  category: "special",
  power: 65,
  accuracy: 1.0,
  pp: 20,
  effect: { chance: 0.1, statusCondition: TEMPORAL_STATUS.CONFUSED },
};
export const psychic = {
  name: "psychic",
  type: TYPES.PSYCHIC,
  category: "special",
  power: 90,
  accuracy: 1.0,
  pp: 10,
  effect: { chance: 0.1, stat: STATS.SPDEFENSE, stages: -1 },
};
// TO BE FIXED
export const psywave = {
  name: "psywave",
  type: TYPES.PSYCHIC,
  category: "special",
  power: null,
  accuracy: 1,
  pp: 15,
  minDamage: 1,
  maxDamage: 256,
};
export const quickAttack = {
  name: "quick attack",
  type: TYPES.NORMAL,
  category: "physical",
  power: 40,
  accuracy: 1.0,
  pp: 30,
  priority: 1,
};
export const rage = {
  name: "rage",
  type: TYPES.NORMAL,
  category: "physical",
  power: 20,
  accuracy: 1.0,
  pp: 20,
  effect: { stat: STATS.ATTACK, stages: 1, onHit: true },
};
export const razorLeaf = {
  name: "razor leaf",
  type: TYPES.GRASS,
  category: "physical",
  power: 55,
  accuracy: 0.95,
  pp: 25,
  highCriticalHitRatio: true,
};
export const razorWind = {
  name: "razor wind",
  type: TYPES.NORMAL,
  category: "special",
  power: 80,
  accuracy: 100,
  pp: 10,
  highCriticalHitRatio: true,
  effect: {
    status: MOVES_STATUS.LOADING,
    target: TARGET.SELF,
    duration: 1,
  },
};
export const recover = {
  name: "recover",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 20,
  recover: 0.5,
};
export const reflect = {
  name: "reflect",
  type: TYPES.PSYCHIC,
  category: "status",
  power: null,
  accuracy: null,
  pp: 20,
  effects: { field: FIELD_STATUS.REFLECT, duration: 5 },
};
export const rest = {
  name: "rest",
  type: TYPES.PSYCHIC,
  category: "status",
  power: null,
  accuracy: null,
  pp: 10,
  recover: 1,
  effect: { statusCondition: FIXED_STATUS.SLEEP },
};
export const roar = {
  name: "roar",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 1.0,
  pp: 20,
  priority: -6,
  forceChange: true,
};
export const rockSlide = {
  name: "rock slide",
  type: TYPES.ROCK,
  category: "physical",
  power: 75,
  accuracy: 0.9,
  pp: 10,
  effect: { chance: 0.3, statusCondition: TEMPORAL_STATUS.FLINCHED },
};
export const rockThrow = {
  name: "rock throw",
  type: TYPES.ROCK,
  category: "physical",
  power: 50,
  accuracy: 0.65,
  pp: 15,
};
export const rollingKick = {
  name: "rolling kick",
  type: TYPES.FIGHT,
  category: "physical",
  power: 60,
  accuracy: 0.85,
  pp: 15,
  effect: { chance: 0.3, statusCondition: TEMPORAL_STATUS.FLINCHED },
};
export const sandAttack = {
  name: "sand attack",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 1.0,
  pp: 15,
  effect: { stat: STATS.ACCURACY, stages: -1 },
};
export const scratch = {
  name: "scratch",
  type: TYPES.NORMAL,
  category: "physical",
  power: 40,
  accuracy: 1.0,
  pp: 35,
};
export const screech = {
  name: "screech",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 0.85,
  pp: 40,
  effect: { stat: STATS.DEFENSE, stages: -2 },
};
export const seismicToss = {
  name: "seismic toss",
  type: TYPES.FIGHT,
  category: "physical",
  power: null,
  accuracy: 1.0,
  pp: 20,
  damageOnLevel: true,
};
export const selfDestruct = {
  name: "self-destruct",
  type: TYPES.NORMAL,
  category: "physical",
  power: 200,
  accuracy: 1.0,
  pp: 5,
  effects: { stat: STATS.HP, target: TARGET.SELF, stages: 1 },
};
export const sharpen = {
  name: "sharpen",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 30,
  effect: { stat: STATS.ATTACK, stages: 1 },
};
export const sing = {
  name: "sing",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 0.55,
  pp: 15,
  effect: { statusCondition: FIXED_STATUS.SLEEP },
};
export const skullBash = {
  name: "skull bash",
  type: TYPES.NORMAL,
  category: "physical",
  power: 130,
  accuracy: 1.0,
  pp: 15,
  effect: {
    status: MOVES_STATUS.LOADING,
    target: TARGET.SELF,
    duration: 1,
    stat: STATS.DEFENSE,
    stages: 1,
  },
};
export const skyAttack = {
  name: "sky attack",
  type: TYPES.FLYING,
  category: "physical",
  power: 140,
  accuracy: 0.9,
  pp: 5,
  highCriticalHitRatio: true,
  effect: {
    status: MOVES_STATUS.LOADING,
    target: TARGET.SELF,
    duration: 1,
  },
};
export const slam = {
  name: "slam",
  type: TYPES.NORMAL,
  category: "physical",
  power: 80,
  accuracy: 0.75,
  pp: 20,
};
export const slash = {
  name: "slash",
  type: TYPES.NORMAL,
  category: "physical",
  power: 70,
  accuracy: 1.0,
  pp: 20,
  highCriticalHitRatio: true,
};
export const sleepPowder = {
  name: "sleep powder",
  type: TYPES.GRASS,
  category: "status",
  power: null,
  accuracy: 0.75,
  pp: 15,
  effect: { statusCondition: FIXED_STATUS.SLEEP },
};
export const sludge = {
  name: "sludge",
  type: TYPES.POISON,
  category: "special",
  power: 65,
  accuracy: 1.0,
  pp: 20,
  effect: { chance: 0.3, statusCondition: FIXED_STATUS.POISONED },
};
export const smog = {
  name: "smog",
  type: TYPES.POISON,
  category: "special",
  power: 30,
  accuracy: 0.7,
  pp: 20,
  effect: { chance: 0.4, statusCondition: FIXED_STATUS.POISONED },
};
export const smokescreen = {
  name: "smokescreen",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 1.0,
  pp: 20,
  effect: { stat: STATS.ACCURACY, stages: -1 },
};
export const softBoiled = {
  name: "soft-boiled",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 10,
  recover: 0.5,
};
export const solarBeam = {
  name: "solar beam",
  type: TYPES.GRASS,
  category: "special",
  power: 120,
  accuracy: 1.0,
  pp: 10,
  effect: {
    status: MOVES_STATUS.LOADING,
    target: TARGET.SELF,
    duration: 1,
  },
};
export const sonicBoom = {
  name: "sonic boom",
  type: TYPES.NORMAL,
  category: "special",
  power: null,
  accuracy: 0.9,
  pp: 20,
  fixedPower: 20,
};
export const spikeCannon = {
  name: "spike cannon",
  type: TYPES.NORMAL,
  category: "physical",
  power: 20,
  accuracy: 1.0,
  pp: 15,
  minTimes: 2,
  maxTimes: 5,
  probabilities: [0.3333, 0.3333, 0.1667, 0.1667],
};
export const splash = {
  name: "splash",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 40,
};
export const spore = {
  name: "spore",
  type: TYPES.GRASS,
  category: "status",
  power: null,
  accuracy: 1.0,
  pp: 15,
  effect: { statusCondition: FIXED_STATUS.SLEEP },
};
export const stomp = {
  name: "stomp",
  type: TYPES.NORMAL,
  category: "physical",
  power: 65,
  accuracy: 1.0,
  pp: 20,
  effect: { chance: 0.3, statusCondition: TEMPORAL_STATUS.FLINCHED },
};
export const strength = {
  name: "strength",
  type: TYPES.NORMAL,
  category: "physical",
  power: 80,
  accuracy: 1.0,
  pp: 15,
};
export const stringShot = {
  name: "string shot",
  type: TYPES.BUG,
  category: "status",
  power: null,
  accuracy: 0.95,
  pp: 40,
  effect: { stat: STATS.SPEED, stages: -1 },
};
export const struggle = {
  name: "struggle",
  type: TYPES.NORMAL,
  category: "physical",
  power: 50,
  accuracy: 1.0,
  pp: null,
  defaultMove: true,
};
export const stunSpore = {
  name: "stun spore",
  type: TYPES.GRASS,
  category: "status",
  power: null,
  accuracy: 0.75,
  pp: 30,
  effect: { statusCondition: FIXED_STATUS.PARALIZED },
};
export const submission = {
  name: "submission",
  type: TYPES.FIGHT,
  category: "physical",
  power: 80,
  accuracy: 0.8,
  pp: 25,
  recoil: 0.25,
};
export const substitute = {
  name: "substitute",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 10,
  effects: { statusCondition: TEMPORAL_STATUS.SUBSTITUTE },
};
export const superFang = {
  name: "super fang",
  type: TYPES.NORMAL,
  category: "physical",
  power: null,
  accuracy: 0.9,
  pp: 10,
  effects: {
    stat: STATS.HP,
    target: TARGET.ENEMY,
    stages: 0.5,
    currentValue: true,
  },
};
export const supersonic = {
  name: "supersonic",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 0.55,
  pp: 20,
  effect: { statusCondition: TEMPORAL_STATUS.CONFUSED },
};
export const surf = {
  name: "surf",
  type: TYPES.WATER,
  category: "special",
  power: 90,
  accuracy: 1.0,
  pp: 15,
};
export const swift = {
  name: "swift",
  type: TYPES.NORMAL,
  category: "special",
  power: 60,
  accuracy: null,
  pp: 20,
  unableToMiss: true,
};
export const swordsDance = {
  name: "swords dance",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 30,
  effect: { stat: STATS.ATTACK, stages: 2 },
};
export const tackle = {
  name: "tackle",
  type: TYPES.NORMAL,
  category: "physical",
  power: 40,
  accuracy: 1,
  pp: 35,
};
export const tailWhip = {
  name: "tail whip",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 1.0,
  pp: 30,
  effect: { stat: STATS.DEFENSE, stages: -1 },
};
export const takeDown = {
  name: "take down",
  type: TYPES.NORMAL,
  category: "physical",
  power: 90,
  accuracy: 0.85,
  pp: 20,
  recoil: 0.25,
};
export const teleport = {
  name: "teleport",
  type: TYPES.PSYCHIC,
  category: "status",
  power: null,
  accuracy: null,
  pp: 20,
  allowToChange: true,
};
export const thrash = {
  name: "thrash",
  type: TYPES.NORMAL,
  category: "physical",
  power: 120,
  accuracy: 1.0,
  pp: 10,
  effect: {
    status: MOVES_STATUS.HITTING,
    target: TARGET.SELF,
    duration: [2, 3],
  },
};
export const thunder = {
  name: "thunder",
  type: TYPES.ELECTRIC,
  category: "special",
  power: 110,
  accuracy: 0.7,
  pp: 10,
  effect: { chance: 0.1, statusCondition: FIXED_STATUS.PARALIZED },
};
export const thunderPunch = {
  name: "thunder punch",
  type: TYPES.ELECTRIC,
  category: "physical",
  power: 75,
  accuracy: 1.0,
  pp: 15,
  effect: { chance: 0.1, statusCondition: FIXED_STATUS.PARALIZED },
};
export const thunderShock = {
  name: "thunder shock",
  type: TYPES.ELECTRIC,
  category: "special",
  power: 40,
  accuracy: 1.0,
  pp: 30,
  effect: { chance: 0.1, statusCondition: FIXED_STATUS.PARALIZED },
};
export const thunderWave = {
  name: "thunder wave",
  type: TYPES.ELECTRIC,
  category: "status",
  power: null,
  accuracy: 1.0,
  pp: 20,
  effect: { statusCondition: FIXED_STATUS.PARALIZED },
};
export const thunderbolt = {
  name: "thunderbolt",
  type: TYPES.ELECTRIC,
  category: "special",
  power: 90,
  accuracy: 1.0,
  pp: 15,
  effect: { chance: 0.1, statusCondition: FIXED_STATUS.PARALIZED },
};
export const toxic = {
  name: "toxic",
  type: TYPES.POISON,
  category: "status",
  power: null,
  accuracy: 0.9,
  pp: 10,
  effect: { statusCondition: FIXED_STATUS.BADLY_POISONED },
};
export const transform = {
  name: "transform",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: null,
  pp: 10,
  effect: { statusCondition: TEMPORAL_STATUS.TRANSFORMED },
};
export const triAttack = {
  name: "tri attack",
  type: TYPES.NORMAL,
  category: "special",
  power: 80,
  accuracy: 1.0,
  pp: 10,
  effect: {
    chance: 0.2,
    statusCondition: [
      FIXED_STATUS.PARALIZED,
      FIXED_STATUS.FREEZED,
      FIXED_STATUS.BURNED,
    ],
  },
};
export const twineedle = {
  name: "twineedle",
  type: TYPES.BUG,
  category: "physical",
  power: 25,
  accuracy: 1.0,
  pp: 20,
  minTimes: 2,
  maxTimes: 2,
  probabilities: [1],
  effect: { chance: 0.2, statusCondition: FIXED_STATUS.POISONED },
};
export const viceGrip = {
  name: "vice grip",
  type: TYPES.NORMAL,
  category: "physical",
  power: 55,
  accuracy: 1.0,
  pp: 30,
};
export const vineWhip = {
  name: "vine whip",
  type: TYPES.GRASS,
  category: "physical",
  power: 45,
  accuracy: 1.0,
  pp: 25,
};
export const waterGun = {
  name: "water gun",
  type: TYPES.WATER,
  category: "special",
  power: 40,
  accuracy: 1.0,
  pp: 25,
};
export const waterfall = {
  name: "waterfall",
  type: TYPES.WATER,
  category: "physical",
  power: 80,
  accuracy: 1.0,
  pp: 15,
};
export const whirlwind = {
  name: "whirlwind",
  type: TYPES.NORMAL,
  category: "status",
  power: null,
  accuracy: 0.85,
  pp: 20,
  priority: -6,
  forceChange: true,
};
export const wingAttack = {
  name: "wing attack",
  type: TYPES.FLYING,
  category: "physical",
  power: 60,
  accuracy: 1.0,
  pp: 35,
};
export const withdraw = {
  name: "withdraw",
  type: TYPES.WATER,
  category: "status",
  power: null,
  accuracy: null,
  pp: 40,
  effect: { stat: STATS.DEFENSE, stages: 1 },
};
export const wrap = {
  name: "wrap",
  type: TYPES.NORMAL,
  category: "physical",
  power: 15,
  accuracy: 0.9,
  pp: 20,
  effects: { stat: STATS.HP, stages: 0.125, duration: [4, 5] },
};

const moves = {
  absorb,
  acid,
  acidArmor,
  agility,
  amnesia,
  auroraBeam,
  barrage,
  barrier,
  bide,
  bind,
  bite,
  blizzard,
  bodySlam,
  boneClub,
  bonemerang,
  bubble,
  bubbleBeam,
  clamp,
  cometPunch,
  confuseRay,
  confusion,
  constrict,
  conversion,
  counter,
  crabhammer,
  cut,
  defenseCurl,
  dig,
  disable,
  dizzyPunch,
  doubleKick,
  doubleSlap,
  doubleTeam,
  doubleEdge,
  dragonRage,
  dreameater,
  drillPeck,
  earthquake,
  eggBomb,
  ember,
  explosion,
  fireBlast,
  firePunch,
  fireSpin,
  fissure,
  flamethrower,
  flash,
  fly,
  focusEnergy,
  furyAttack,
  furySwipes,
  glare,
  growl,
  growth,
  guillotine,
  gust,
  harden,
  haze,
  headbutt,
  highJumpKick,
  hornAttack,
  hornDrill,
  hydroPump,
  hyperBeam,
  hyperFang,
  hypnosis,
  iceBeam,
  icePunch,
  jumpKick,
  karateChop,
  kinesis,
  leechLife,
  leechSeed,
  leer,
  lick,
  lightScreen,
  lovelyKiss,
  lowKick,
  meditate,
  megaDrain,
  megaKick,
  megaPunch,
  metronome,
  mimic,
  minimize,
  mirrorMove,
  mist,
  nightShade,
  payDay,
  peck,
  petalDance,
  pinMissile,
  poisonGas,
  poisonPowder,
  poisonSting,
  pound,
  psybeam,
  psychic,
  psywave,
  quickAttack,
  rage,
  razorLeaf,
  razorWind,
  recover,
  reflect,
  rest,
  roar,
  rockSlide,
  rockThrow,
  rollingKick,
  sandAttack,
  scratch,
  screech,
  seismicToss,
  selfDestruct,
  sharpen,
  sing,
  skullBash,
  skyAttack,
  slam,
  slash,
  sleepPowder,
  sludge,
  smog,
  smokescreen,
  softBoiled,
  solarBeam,
  sonicBoom,
  spikeCannon,
  splash,
  spore,
  stomp,
  strength,
  stringShot,
  struggle,
  stunSpore,
  submission,
  substitute,
  superFang,
  supersonic,
  surf,
  swift,
  swordsDance,
  tackle,
  tailWhip,
  takeDown,
  teleport,
  thrash,
  thunder,
  thunderPunch,
  thunderShock,
  thunderWave,
  thunderbolt,
  toxic,
  transform,
  triAttack,
  twineedle,
  viceGrip,
  vineWhip,
  waterGun,
  waterfall,
  whirlwind,
  wingAttack,
  withdraw,
  wrap,
};

export default moves;
