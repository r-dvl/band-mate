import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.1.38:8080/v1/playlists/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.playlists);
        setPlaylists(data.playlists);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {playlists.length > 0 ? (
        <FlatList
          data={playlists}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Button
              title={item.title}
              onPress={() => navigation.navigate('PlaylistScreen', { playlistId: item.id })}
            />
          )}
        />
      ) : (
        <Text>Create playlist</Text>
      )}
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
});