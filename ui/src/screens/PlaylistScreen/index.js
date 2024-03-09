import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function PlaylistScreen() {
  const [playlist, setPlaylist] = useState(null);
  const route = useRoute();

  useEffect(() => {
    fetch(`http://192.168.1.38/v1/playlists/${route.params.playlistId}`)
      .then(response => response.json())
      .then(data => setPlaylist(data));
  }, [route.params.playlistId]);

  if (!playlist) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{playlist.title}</Text>
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
});