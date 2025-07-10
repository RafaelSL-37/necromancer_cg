import { CARD_COSTS, CARD_EFFECTS } from "./constants"

export type TPlayedCard = {
  cost: CARD_COSTS,
  effect: CARD_EFFECTS,
  identifier: string,
  url: {
    uri: string, 
    width: number, 
    height: number
  },
  value: number,
  calculatedValue: number,
}