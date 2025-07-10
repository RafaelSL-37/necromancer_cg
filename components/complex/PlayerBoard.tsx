import { cardLimits, specialCards } from "@/app/utils/constants";
import { ThemedText } from "../basic/ThemedText";
import { ThemedView } from "../basic/ThemedView";
import { Button, Image, StyleSheet } from "react-native";

type TCardPicker = {
  cardIdentifier: string;
  addedCardAmount: number;
  selectedCards: string[];
  setSelectedCards: any
}

function addCardToDeck(cardIdentifier: string, selectedCards: string[], setSelectedCards: any) {
  const countedCards = {
      'oneCost': 0,
      'twoCost': 0,
      'threeCost': 0,
      'fiveCost': 0,
      'deckTotal': selectedCards.length,
  };

  for (const selectedCard of selectedCards) {
    if (selectedCard == 'ghoul') countedCards['oneCost'] = countedCards['oneCost'] + 1;
    if (selectedCard == 'zombie') countedCards['twoCost'] = countedCards['twoCost'] + 1;
    if (selectedCard == 'banshee' || selectedCard == 'necromancer') countedCards['threeCost'] = countedCards['threeCost'] + 1;
    if (selectedCard == 'dark_knight' || selectedCard == 'lich' || selectedCard == 'vampire') countedCards['fiveCost'] = countedCards['fiveCost'] + 1;
  }

  if (
    countedCards['deckTotal'] < cardLimits['deckTotal'] 
    && (countedCards['oneCost'] < cardLimits['oneCost'] || cardIdentifier != 'ghoul')
    && (countedCards['twoCost'] < cardLimits['twoCost'] || cardIdentifier != 'zombie')
    && (countedCards['threeCost'] < cardLimits['threeCost'] || (cardIdentifier != 'banshee' && cardIdentifier != 'necromancer'))
    && (countedCards['fiveCost'] < cardLimits['fiveCost'] || (cardIdentifier != 'dark_knight' && cardIdentifier != 'lich' && cardIdentifier != 'vampire'))
  ) {
    setSelectedCards([...selectedCards, cardIdentifier])
  }
}

function removeCardFromDeck(cardIdentifier: string, selectedCards: string[], setSelectedCards: any){
  const nonRelatedCards = selectedCards.filter(selectedCard => selectedCard != cardIdentifier);

  const relatedCards = selectedCards.filter(selectedCard => selectedCard == cardIdentifier);
  relatedCards.pop();

  setSelectedCards([...nonRelatedCards, ...relatedCards])
}

export function CardPicker({ 
  cardIdentifier, 
  addedCardAmount, 
  selectedCards, 
  setSelectedCards
}: TCardPicker) {
  return <ThemedView style={styles.cardPickerContainer}>
    <ThemedView>
      <Image
        style={styles.cardPickerImage}
        source={specialCards[cardIdentifier as keyof typeof specialCards].url}
        // onPressIn={() => {}} //TODO: ADD EVENT FOR POP UP
        // onPressOut={() => {}} //TODO: ADD EVENT FOR POP UP
      />
    </ThemedView>
    <ThemedView style={styles.optionsContainer}>
      <Button
        onPress={() => {removeCardFromDeck(cardIdentifier, selectedCards, setSelectedCards)}}
        title="-"
        color="#841584"
        accessibilityLabel="Remove card from deck"
      />

      <ThemedText style={{ color: '#808080', margin: 5 }}>{addedCardAmount}</ThemedText>
      
      <Button
        onPress={() => {addCardToDeck(cardIdentifier, selectedCards, setSelectedCards)}}
        title="+"
        color="#841584"
        accessibilityLabel="Add card to deck"
      />
    </ThemedView>
  </ThemedView>;
}

const styles = StyleSheet.create({
  optionsContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  cardPickerContainer: {
    flexDirection: 'column',
  },
  // cardPickerImage: {
  //   width: 150,
  //   height: 250,
  // },
  cardPickerImage: {
    width: 30,
    height: 50,
  },
});