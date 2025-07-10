import { Alert, Linking } from "react-native";

export async function endGame(): Promise<void> {
    const supported = await Linking.canOpenURL('/');

    if (supported) {
      await Linking.openURL('/');
    } else {
      Alert.alert(`Don't know how to open this URL: ${'/'}`);
    }
}