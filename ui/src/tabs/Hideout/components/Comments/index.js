import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Comments() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>
      <Text style={styles.subtitle}>Component under development</Text>
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
