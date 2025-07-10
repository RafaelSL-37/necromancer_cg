export enum LANGUAGES {
    PORTUGUESE = 'PORTUGUESE',
    ENGLISH = 'ENGLISH',
}

export enum CARD_EFFECTS {
    NONE = 'NONE',
    COPY_VALUE = 'COPY_VALUE',
    ENEMY_DRAW = 'ENEMY_DRAW',
    LOSER_ADVANTAGE = 'LOSER_ADVANTAGE',
    STAY_IN_FIELD = 'STAY_IN_FIELD',
    BETTER_MULLIGAN = 'BETTER_MULLIGAN',
    NEGATE_ENEMY_VALUE = 'NEGATE_ENEMY_VALUE',
    STACKING_ZOMBIE = 'STACKING_ZOMBIE',
}

export enum CARD_COSTS {
    ONE_COST = 'ONE_COST',
    TWO_COST = 'TWO_COST',
    THREE_COST = 'THREE_COST',
    FIVE_COST = 'FIVE_COST',
}

export const cardCostToBaseCardMapper = {
  'ONE_COST': 'oneCost',
  'TWO_COST': 'twoCost',
  'THREE_COST': 'threeCost',
  'FIVE_COST': 'fiveCost',
};

export const baseDeckAmounts = {
  'ONE_COST': 4,
  'TWO_COST': 3,
  'THREE_COST': 2,
  'FIVE_COST': 1,
};

export const baseDeckCards = {
  'oneCost': {
    'identifier': '1',
    'value': 1,
    'cost': CARD_COSTS.ONE_COST,
    'effect': CARD_EFFECTS.NONE,
    url: require('@/assets/images/cards/1.png'),
  },
  'twoCost': {
    'identifier': '2',
    'value': 2,
    'cost': CARD_COSTS.TWO_COST,
    'effect': CARD_EFFECTS.NONE,
    url: require('@/assets/images/cards/2.png'),
  },
  'threeCost': {
    'identifier': '3',
    'value': 3,
    'cost': CARD_COSTS.THREE_COST,
    'effect': CARD_EFFECTS.NONE,
    url: require('@/assets/images/cards/3.png'),
  },
  'fiveCost': {
    'identifier': '5',
    'value': 5,
    'cost': CARD_COSTS.FIVE_COST,
    'effect': CARD_EFFECTS.NONE,
    url: require('@/assets/images/cards/5.png'),
  },
};

export const cardLimits = {
  'oneCost': 4,
  'twoCost': 3,
  'threeCost': 2,
  'fiveCost': 1,
  'deckTotal': 4,
};

export const specialCards = {
  banshee: {
    identifier: 'banshee',
    value: 1,
    cost: CARD_COSTS.THREE_COST,
    effect: CARD_EFFECTS.COPY_VALUE,
    url: require('@/assets/images/cards/banshee.png'),
  },
  dark_knight: {
    identifier: 'dark_knight',
    value: 4,
    cost: CARD_COSTS.FIVE_COST,
    effect: CARD_EFFECTS.LOSER_ADVANTAGE,
    url: require('@/assets/images/cards/dark_knight.png'),
  },
  ghoul: {
    identifier: 'ghoul',
    value: 3,
    cost: CARD_COSTS.ONE_COST,
    effect: CARD_EFFECTS.ENEMY_DRAW,
    url: require('@/assets/images/cards/ghoul.png'),
  },
  lich: {
    identifier: 'lich',
    value: 2,
    cost: CARD_COSTS.FIVE_COST,
    effect: CARD_EFFECTS.STAY_IN_FIELD,
    url: require('@/assets/images/cards/lich.png'),
  },
  necromancer: {
    identifier: 'necromancer',
    value: 1,
    cost: CARD_COSTS.THREE_COST,
    effect: CARD_EFFECTS.BETTER_MULLIGAN,
    url: require('@/assets/images/cards/necromancer.png'),
  },
  vampire: {
    identifier: 'vampire',
    value: 3,
    cost: CARD_COSTS.FIVE_COST,
    effect: CARD_EFFECTS.NEGATE_ENEMY_VALUE,
    url: require('@/assets/images/cards/vampire.png'),
  },
  zombie: {
    identifier: 'zombie',
    value: 1,
    cost: CARD_COSTS.TWO_COST,
    effect: CARD_EFFECTS.STACKING_ZOMBIE,
    url: require('@/assets/images/cards/zombie.png'),
  },
};