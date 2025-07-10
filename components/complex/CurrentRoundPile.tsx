import { ThemedText } from "../basic/ThemedText";
import { ThemedView } from "../basic/ThemedView";
import { StyleSheet, Image, Pressable } from "react-native";

type TCurrentRoundPile = {
  cardsPlayedOnRound: any[],
  setIsModalOpen: any,
}

export function CurrentRoundPile({setIsModalOpen, cardsPlayedOnRound}: TCurrentRoundPile) {
  console.log(cardsPlayedOnRound.length > 0 ? cardsPlayedOnRound[-1] : 'PILE IS Empty' + cardsPlayedOnRound)

  return <ThemedView style={styles.pileContainer}>
    {cardsPlayedOnRound.length > 0 
      ? <Pressable onPress={() => {setIsModalOpen(true)}}>
          <Image source={cardsPlayedOnRound[cardsPlayedOnRound.length-1].url} style={styles.filledPileContainer} />
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