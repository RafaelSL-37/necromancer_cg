import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/basic/ThemedText';
import { ThemedView } from '@/components/basic/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText type="title">You tried to access somewhere that doesn't exists.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
