import { Button, StyleSheet, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/basic/ThemedText';
import { ThemedView } from '@/components/basic/ThemedView';

export default function Credits() {
  const params = useLocalSearchParams(); //TODO: DISCOVER HOW THIS WORKS

  return (
    <View style={styles.mainContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Credits</ThemedText>
      </ThemedView>
      <ThemedText style={styles.textContainer}>
        Card game engine for Necromancer CG developed by Rafael Silva de Lima. <br />
        This is a card game created by Game Chinchila for their Tabletop Role Playing game on youtube. <br />
        I do not own the images nor the concept, am merely a fan. <br />
        <br />
        Links for their pages: <br />
        <MaterialCommunityIcons href='https://www.youtube.com/@GameChinchila' name={'youtube'} size={24} color="#FFFFFF" />
        <MaterialCommunityIcons href='https://x.com/gamechinchila' name={'twitter'} size={24} color="#FFFFFF" /> <br /> <br />
      </ThemedText>
      <Link href="/">
        <Button
          onPress={() => {}}
          title="Back"
          color="#841584"
          accessibilityLabel="Go back to main menu"
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textContainer: {
    color: 'white', //TODO: NIGHTMODE
    textAlign: 'center',
  },
});
