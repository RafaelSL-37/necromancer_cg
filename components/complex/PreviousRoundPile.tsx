import { ThemedText } from "../basic/ThemedText";
import { ThemedView } from "../basic/ThemedView";
import { StyleSheet, Image, Pressable } from "react-native";

type TPreviousRoundPile = {
  cardsPlayedOnRound: any[],
  setIsModalOpen: any,
  roundReference: number,
}

export function PreviousRoundPile({roundReference, setIsModalOpen, cardsPlayedOnRound}: TPreviousRoundPile) {
  return <ThemedView style={styles.pileContainer}>
    <ThemedText style={{alignContent: 'center', textAlign: 'center',}}>Round {roundReference}</ThemedText>
    {cardsPlayedOnRound.length > 0 
      ? <Pressable onPress={() => {setIsModalOpen(true)}}>
          <Image source={require('@/assets/images/cards/cardback.png')} style={styles.filledPileContainer} />
        </Pressable>
      : <ThemedText style={styles.emptyPileContainer}>Round not played.</ThemedText>
    }
  </ThemedView>;
}

const styles = StyleSheet.create({
  pileContainer: {
    borderWidth: 2,
    borderColor: '#BABACA',
  },
  emptyPileContainer: {
    width: 90,
    height: 150,
    alignContent: 'center',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'orange',
  },
  filledPileContainer: {
    width: 90,
    height: 150,
    borderWidth: 2,
    borderColor: 'orange',
  },
});