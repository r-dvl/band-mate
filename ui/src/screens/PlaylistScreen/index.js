import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function PlaylistScreen() {
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://192.168.1.38:8080/v1/playlists/${route.params.playlistId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched playlist:', data);
        setPlaylist(data);
        navigation.setOptions({ title: data.title });

        // Fetch each song in the playlist
        Promise.all(data.song_ids.map(songId =>
          fetch(`http://192.168.1.38:8080/v1/songs/${songId}`)
            .then(response => response.json())
        ))
        .then(songsData => {
          console.log('Fetched songs:', songsData);
          setSongs(songsData);
        })
        .catch(error => {
          console.error('Error fetching songs:', error);
        });
      })
      .catch(error => {
        console.error('Error fetching playlist:', error);
        setError(error.toString());
      });
  }, [route.params.playlistId, navigation]);

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
        <Text style={styles.description}>{playlist.description}</Text>
        <FlatList
          data={songs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Button
              title={`${item.title} - ${item.band}`}
              onPress={() => navigation.navigate('SongScreen', { songId: item.id })}
            />
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
});
