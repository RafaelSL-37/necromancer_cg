import { TPlayedCard } from "./calculateCardValue"
import { CARD_EFFECTS } from "./constants";
import { TDeckCard } from "./constructDeck";

export function playCard(
    cardIndexOnHand: number, 
    hand: TDeckCard[], 
    setHand: any, 
    cardPile: TPlayedCard[], 
    setCardPile: any, 
): CARD_EFFECTS {
    const newHand = [...hand.slice(0, cardIndexOnHand), ...hand.slice(cardIndexOnHand+1)];

    const playedCard = hand[cardIndexOnHand] as TPlayedCard;
    playedCard.calculatedValue = playedCard.value;

    setHand(newHand);
    setCardPile([...cardPile, playedCard]);

    return playedCard.effect;
}