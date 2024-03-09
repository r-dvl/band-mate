import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function PlaylistScreen() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();

  const playlist = route.params.playlist;

  useEffect(() => {
    // Fetch each song in the playlist
    Promise.all(playlist.song_ids.map(songId =>
      fetch(`http://192.168.1.38:8080/v1/songs/${songId}`)
        .then(response => response.json())
    ))
      .then(songsData => {
        console.log('Fetched songs:', songsData);
        setSongs(songsData);
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
        setError(error.toString());
      });

    navigation.setOptions({ title: playlist.title });
  }, [playlist, navigation]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading songs</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error laoading playlist: {error}</Text>
      </View>
    );
  }

  if (!playlist) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (songs.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Songs</Text>
        <FlatList
          data={songs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.buttonContainer}>
              <Button
                title={`${item.title} - ${item.band}`}
                onPress={() => navigation.navigate('SongScreen', { song: item })}
              />
            </View>
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>There are not songs in this playlist</Text>
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
  description: {
    fontSize: 18,
  },
  buttonContainer: {
    margin: 10,
  },
});
