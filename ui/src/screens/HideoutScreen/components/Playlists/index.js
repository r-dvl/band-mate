import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // TODO: Fetch each playlist in the band
    // TODO: Protect API URL
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
        setError(error.toString());
      });
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading playlists</Text>
      </View>
    );
  } else if (playlists.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Playlists</Text>
        <FlatList
          data={playlists}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.buttonContainer}>
              <Button
                title={item.title}
                onPress={() => navigation.navigate('PlaylistScreen', { playlist: item })}
              />
            </View>
          )}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>There are not playlists in this band</Text>
      </View>
    );
  }
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
  buttonContainer: {
    margin: 10,
  },
});
