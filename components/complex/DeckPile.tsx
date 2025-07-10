import { ThemedText } from "../basic/ThemedText";
import { ThemedView } from "../basic/ThemedView";
import { ImageBackground, StyleSheet } from "react-native";

type TDeckPile = {
  deck: any[],
}

export function DeckPile({deck}: TDeckPile) {
  return <ThemedView>
    {deck.length > 0 
      ? <ImageBackground source={require('@/assets/images/cards/cardback.png')} resizeMode='contain' style={styles.imageContainer}> {/* TODO: FIX CONTAIN NOT WORKING PROPERLY */}
          <ThemedText style={styles.filledPileContainer}>
            {deck.length}
          </ThemedText>
        </ImageBackground>
      : <ThemedText style={styles.emptyPileContainer}>Empty</ThemedText>
    }
  </ThemedView>;
}

const styles = StyleSheet.create({
  emptyPileContainer: {
    width: (1040/750) * 3 * 17,
    height: (1040/750) * 5 * 17,
    alignContent: 'center',
    textAlign: 'center',
  },
  filledPileContainer: {
    width: (1040/750) * 3 * 17,
    height: (1040/750) * 5 * 17,
    alignContent: 'center',
    textAlign: 'center',
  },
  imageContainer: {
    height: (1040/750) * 5 * 17,
    width: (1040/750) * 3 * 17,
  },
});