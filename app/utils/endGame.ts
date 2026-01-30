import { Alert, Linking } from "react-native";
import { router } from 'expo-router';

export async function endGame(message: string): Promise<void> {
  Alert.alert(
    "Game Over",
    message,
    [
      {
        text: "OK",
        onPress: () => router.push('/quick_duel'),
      },
    ]
  );
}