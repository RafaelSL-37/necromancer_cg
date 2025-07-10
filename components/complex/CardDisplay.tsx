import { ThemedView } from "../basic/ThemedView";
import { ViewProps, StyleSheet, ScrollView } from "react-native";
import { specialCards } from "@/app/utils/constants";
import { CardPicker } from "./CardPicker";

type TCardCarousel = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  selectedCards: string[];
  setSelectedCards: any;
}

function fetchCardAmountOnSelected(selectedCards: string[], cardIdentifier: string): number {
  return selectedCards.reduce((value, selectedCardIdentifier) => cardIdentifier == selectedCardIdentifier ? value + 1 : value, 0);
} 

export function CardDisplay({ style, lightColor, darkColor, selectedCards, setSelectedCards, ...otherProps }: TCardCarousel) { 
  return <ThemedView style={styles.cardPickerContainer}> 
      {Object.keys(specialCards).map((specialCard: string) => {
        return <CardPicker 
          cardIdentifier={specialCards[specialCard as keyof typeof specialCards].identifier} 
          addedCardAmount={fetchCardAmountOnSelected(selectedCards, specialCards[specialCard as keyof typeof specialCards].identifier)}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          key={specialCards[specialCard as keyof typeof specialCards].identifier}
        />
      })}
  </ThemedView>;
}

const styles = StyleSheet.create({
  cardPickerContainer: {
    justifyContent: 'space-evenly',
    rowGap: 10,
    columnGap: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  scrollContainer: {
    rowGap: 10,
    columnGap: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardPicker: {
    flex: 1,
  }
});