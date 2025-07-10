import { StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/basic/ThemedText';
import { ThemedView } from '@/components/basic/ThemedView';
import { DeckDashboard } from '@/components/complex/DeckDashboard';
import { TDeckCost } from '@/components/complex/DeckDashboard';
import { CardDisplay } from '@/components/complex/CardDisplay';
import { useState } from 'react';
import { specialCards } from './utils/constants';

function calculateDeckTotalCost(selectedCards: any[]): TDeckCost {
  const currentDeckCost = {
    'ONE_COST': 0,
    'TWO_COST': 0,
    'THREE_COST': 0,
    'FIVE_COST': 0,
    total: 0,
  } as TDeckCost;

  for (const card of selectedCards) {
    const specialCardCost = specialCards[card as keyof typeof specialCards].cost;

    currentDeckCost[String(specialCardCost) as keyof typeof currentDeckCost] += 1;
    currentDeckCost.total = currentDeckCost.total + 1;
  }

  return currentDeckCost;
}

export default function QuickDuel() {
  const [selectedCards, setselectedCards] = useState<string[]>([])

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Quick Duel</ThemedText>
      </ThemedView>
      <ThemedView style={styles.mainContainer}>
        <DeckDashboard currentDeckCost={calculateDeckTotalCost(selectedCards)} specialCardLimit={4} style={styles.deckDashboard} />

        <CardDisplay selectedCards={selectedCards} setSelectedCards={setselectedCards} />

        <ThemedView style={styles.buttonListContainer}> 
          <Link href={{ pathname: "/play", params: { selectedCards: selectedCards.join(',') } }}>
            <Button 
              onPress={() => {}} 
              title="Duel" 
              color="#841584"
              accessibilityLabel="Start duel"
            />
          </Link>
          <Link href="/">
            <Button
              onPress={() => {}}
              title="Back"
              color="#841584"
              accessibilityLabel="Go back to main menu"
            />
          </Link>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  deckDashboard: {
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 2,
  },
  buttonListContainer: {
    flexDirection: 'row',
    flex: 2,
    columnGap: 20,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    rowGap: 20,
  },
});