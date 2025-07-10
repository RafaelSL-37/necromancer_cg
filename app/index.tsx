import { Image, StyleSheet, Button, SafeAreaView, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Image
            source={require('@/assets/images/title.png')}
            style={styles.title}
          />
          <View style={styles.buttonMenu}> {/* TODO: LANGUAGE OPTIONS */}
            <Link href="/quick_duel">
              <Button
                onPress={() => {}}
                title="Duel"
                color="#841584"
                accessibilityLabel="Build your deck and start a quick duel"
              />
            </Link>
          </View>
          <View style={styles.buttonMenu}>
            <Link href="/settings">
              <Button
                onPress={() => {}}
                title="Settings"
                color="#841584"
                accessibilityLabel="Adjust language and audio settings"
              />
            </Link>
          </View>
          <View style={styles.buttonMenu}>
            <Link href="/credits">
              <Button
                onPress={() => {}}
                title="Credits"
                color="#841584"
                accessibilityLabel="See who is credited for this game"
              />
            </Link>
          </View>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    height: '20%',
    width: '96%',
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: 70,
  },
  buttonMenu: {
    marginBottom: 7,
  }
});