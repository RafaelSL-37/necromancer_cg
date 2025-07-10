import { baseDeckAmounts, baseDeckCards, CARD_COSTS, CARD_EFFECTS, cardCostToBaseCardMapper, specialCards } from "./constants";

export type TDeckCard = {
  cost: CARD_COSTS,
  effect: CARD_EFFECTS,
  identifier: string,
  url: {
    uri: string, 
    width: number, 
    height: number
  },
  value: number,
}

function constructDeck(selectedCards: string[]): TDeckCard[] {
  const constructedDeck: TDeckCard[] = [];
  
  for (const cardValue of Object.keys(baseDeckAmounts)) {
    let baseAmount = baseDeckAmounts[cardValue as keyof typeof baseDeckAmounts];

    for (const selectedCard of selectedCards) {
      if (!selectedCard) continue
      const specialCardInfo = specialCards[selectedCard as keyof typeof specialCards];

      if (specialCardInfo.cost == cardValue) {
        baseAmount = baseAmount - 1;
        constructedDeck.push(specialCardInfo);
      }
    }
    
    for (let i = 0; i < baseAmount!; i++) {
      constructedDeck.push(baseDeckCards[cardCostToBaseCardMapper[cardValue as keyof typeof cardCostToBaseCardMapper] as keyof typeof baseDeckCards]);
    }
  }
  
  return constructedDeck;
}

export default constructDeck;