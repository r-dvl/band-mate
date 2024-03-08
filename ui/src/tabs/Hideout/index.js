import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Screen components
import Comments from './components/Comments';
import Playlists from './components/Playlists';

export default function Hideout() {
  return (
    <View style={styles.container}>
      <Playlists />
      <Comments />
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
