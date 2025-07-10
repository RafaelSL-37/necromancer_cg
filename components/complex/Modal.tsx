import { ThemedText } from "../basic/ThemedText";
import { ThemedView } from "../basic/ThemedView";
import { Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

type TCardPicker = {
  modalType: string;
  setIsModalOpen: any;
}

export function Modal({ modalType, setIsModalOpen }: TCardPicker) {
  return <ThemedView style={styles.modalContainer}>
    <ThemedView style={styles.messageContainer}>
      <ThemedText></ThemedText>
    </ThemedView>

    <ThemedView style={styles.buttonsContainer}>
      <Link href="/quick_duel" style={{display: 'flex'}}>
        <Button
          onPress={() => {}}
          title="Give Up"
          color="#841584"
          accessibilityLabel="Give up and go back to deck builder"
        />
      </Link>  
      <Button
        onPress={() => {setIsModalOpen(false)}}
        title="Cancel"
        color="#841584"
        accessibilityLabel="Cancel"
      />
    </ThemedView>
  </ThemedView>;
}

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
  },
  messageContainer: {
    flex: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});