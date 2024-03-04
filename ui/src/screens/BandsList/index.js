import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Bands() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bands</Text>
      <Text style={styles.subtitle}>Bands you are registered</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
});
