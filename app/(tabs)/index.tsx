import { Image, StyleSheet, Button, SafeAreaView, View } from 'react-native';

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
          <View style={styles.buttonMenu}>
            <Button
              // onPress={onPressLearnMore}
              title="Quick Duel" //LANGUAGE OPTIONS
              color="#841584"
              accessibilityLabel="Start a quick duel"
            />
            <Button
              // onPress={onPressLearnMore}
              title="Settings"
              color="#841584"
              accessibilityLabel="Adjust settings"
            />
            <Button
              // onPress={onPressLearnMore}
              title="Credits"
              color="#841584"
              accessibilityLabel="See credits for this game"
            />
            {/* <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Welcome!</ThemedText>
              <HelloWave />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">Step 1: Try it</ThemedText>
              <ThemedText>
                Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
                Press{' '}
                <ThemedText type="defaultSemiBold">
                  {Platform.select({
                    ios: 'cmd + d',
                    android: 'cmd + m',
                    web: 'F12'
                  })}
                </ThemedText>{' '}
                to open developer tools.
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">Step 2: Explore</ThemedText>
              <ThemedText>
                Tap the Explore tab to learn more about what's included in this starter app.
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
              <ThemedText>
                When you're ready, run{' '}
                <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
                <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
                <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
                <ThemedText type="defaultSemiBold">app-example</ThemedText>.
              </ThemedText>
            </ThemedView> */}
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
    marginBottom: 10,
  }
});