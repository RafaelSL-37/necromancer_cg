import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../basic/ThemedView";
import { ThemedText } from "../basic/ThemedText";
import { View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";

export type TDeckCost = {
    'ONE_COST': number;
    'TWO_COST': number;
    'THREE_COST': number;
    'FIVE_COST': number;
    total: number;
}

type TDeckDashboard = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  currentDeckCost: TDeckCost;
  specialCardLimit: number;
}

export function DeckDashboard({ style, lightColor, darkColor, currentDeckCost, specialCardLimit }: TDeckDashboard) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <ThemedView style={{backgroundColor, ...styles.deckDashboard}}>
    <ThemedView>
        <ThemedText >Select special cards to put on deck</ThemedText>
    </ThemedView>

    <View style={styles.deckDashboardBox}>
        <ThemedText style={styles.deckDashboardText}>Special cards limit: {currentDeckCost.total}/{specialCardLimit}</ThemedText>
        <br />
        <ThemedText style={styles.deckDashboardText}>Special 1-cost cards: {currentDeckCost['ONE_COST']}</ThemedText>
        <ThemedText style={styles.deckDashboardText}>Special 2-cost cards: {currentDeckCost['TWO_COST']}</ThemedText>
        <ThemedText style={styles.deckDashboardText}>Special 3-cost cards: {currentDeckCost['THREE_COST']}</ThemedText>
        <ThemedText style={styles.deckDashboardText}>Special 5-cost cards: {currentDeckCost['FIVE_COST']}</ThemedText>
    </View>
  </ThemedView>;
}

const styles = StyleSheet.create({
  deckDashboard: {
    borderColor: 'gray',
    borderWidth: 2,
  },
  deckDashboardBox: {
    borderColor: 'gray',
    borderTopWidth: 2,
  },
  deckDashboardText: {
    textAlign: 'center',
  },
});