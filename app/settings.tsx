import { Button, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { LANGUAGES } from './utils/constants';
import CheckBox from '@/components/basic/CheckBox';
import { ThemedView } from '@/components/basic/ThemedView';
import { ThemedText } from '@/components/basic/ThemedText';
import DarkModeSelector from '@/components/basic/DarkModeSelector';

export default function QuickDuel() {
  const [soundLevel, setSoundLevel] = useState(100); //TODO: DESCOBRIR COMO PUXAR COISAS PERSISTIDAS (COOKIES?)
  const [isSoundOn, setIsSoundOn] = useState(true) //TODO: DESCOBRIR COMO PUXAR COISAS PERSISTIDAS (COOKIES?)
  const [language, setLanguage] = useState(LANGUAGES.PORTUGUESE) //TODO: DESCOBRIR COMO PUXAR COISAS PERSISTIDAS (COOKIES?)
  const [isDarkModeOn, setIsDarkModeOn] = useState(true) //TODO: DESCOBRIR COMO PUXAR COISAS PERSISTIDAS (COOKIES?)

  return <>
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Settings</ThemedText>
    </ThemedView>
    <ThemedView style={styles.mainContainer}>
      <ThemedView style={styles.optionsContainer}>
        <ThemedView style={{ borderWidth: 2, borderColor: '#BABACA', width: 200, height: 60 }}>
          <ThemedText>Language Options</ThemedText>
          <Picker
            selectedValue={language}
            onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
          >
            <Picker.Item label="Portuguese" value={LANGUAGES.PORTUGUESE} />
            <Picker.Item label="English" value={LANGUAGES.ENGLISH} />
          </Picker>
        </ThemedView>

        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#BABACA', width: 200, height: 160 }}>
          <ThemedText>Sound Options</ThemedText>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={soundLevel} //TODO: CHECAR SE ISSO FUNCIONA
            onSlidingComplete={(value) => setSoundLevel(value)}
          />
          <CheckBox 
            onPress={() => setIsSoundOn(!isSoundOn)}
            title="Master sound control"
            isChecked={isSoundOn}
          />
        </ThemedView>

        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#BABACA', width: 200, height: 60 }}>
          <ThemedText>Night Mode</ThemedText>
          <DarkModeSelector 
            onPress={() => setIsDarkModeOn(!isDarkModeOn)}
            isChecked={isDarkModeOn}
          />
        </ThemedView>
      </ThemedView>
      <Link href="/">
        <Button
          onPress={() => {}}
          title="Back"
          color="#841584" //TODO: NIGHTMODE
          accessibilityLabel="Go back to main menu"
        />
      </Link>
    </ThemedView>
  </>;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  titleContainer: {
    padding: 20,
    alignItems: 'center',
  },
  optionsContainer: {
    rowGap: 30,
    alignItems: 'center',
  }
});
