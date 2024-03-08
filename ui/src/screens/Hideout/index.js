import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Hideout() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hideout</Text>
      <Text style={styles.subtitle}>Tab under development</Text>
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
