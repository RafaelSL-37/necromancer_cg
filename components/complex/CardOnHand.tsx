import { ThemedView } from "../basic/ThemedView";
import { Image, Pressable, StyleSheet } from "react-native";
import { TDeckCard } from "@/app/utils/constructDeck";
import { TPlayedCard } from "@/app/utils/calculateCardValue";
import { playCard } from "@/app/utils/playCard";

type TCardOnHand = {
  card: TDeckCard;
  playerNumber: number;
  cardIndexOnHand: number;
  hand: TDeckCard[]; 
  setHand: any; 
  setModal: any; 
  cardPile: TPlayedCard[]; 
  setCardPile: any;
  skipped?: boolean;
  turn?: number;
  setTurn?: any;
  adversarySkip: boolean;
}

function handleCardOnHandClick(cardIndexOnHand: number, hand: TDeckCard[], setHand: any, setModal: any, cardPile: TPlayedCard[], setCardPile: any, setTurn: any, adversarySkip: boolean): void {
  const effectToBeResolved = playCard(cardIndexOnHand, hand, setHand, cardPile, setCardPile);

  if (!adversarySkip) setTurn(2);
  setModal(true);
}

export function CardOnHand({ card, playerNumber, cardIndexOnHand, hand, setHand, setModal, cardPile, setCardPile, skipped, turn, setTurn, adversarySkip }: TCardOnHand) {
  return <ThemedView style={styles.cardPickerContainer}>
      {playerNumber == 1
        ? <Pressable 
            onPress={() => skipped || turn == 2 ? {} : handleCardOnHandClick(cardIndexOnHand, hand, setHand, setModal, cardPile, setCardPile, setTurn, adversarySkip)} 
            onLongPress={() => {/* TODO: IMPLEMENT VIEW MODAL */}}
          >
            <Image style={styles.cardImage} source={card.url} />
          </Pressable>
        : <Image style={styles.cardBackImage} source={require('@/assets/images/cards/cardback.png')}/>
      }
  </ThemedView>;
}

const styles = StyleSheet.create({
  optionsContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  cardPickerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    width: (1040/750) * 3 * 17,
    height: (1040/750) * 5 * 17,
  },
  cardImage: {
    width: (1040/750) * 3 * 17,
    height: (1040/750) * 5 * 17,
    borderColor: 'black',
    borderRadius: 1,
  },
  cardBackImage: {
    width: (1040/750) * 3 * 17,
    height: (1040/750) * 5 * 17,
    borderColor: 'black',
    borderRadius: 1,
  },
});