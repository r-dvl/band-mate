import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// Components
import DefaultHeader from '@components/headers/DefaultHeader';

export default function SongScreen() {
  const [tabs, setTabs] = useState([]);
  const [error, setError] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();

  const song = route.params.song;

  useEffect(() => {
    // Fetch each tab in the song
    Promise.all(song.tab_ids.map(tabId =>
      fetch(`http://192.168.1.38:8080/v1/tabs/${tabId}`)
        .then(response => response.json())
    ))
    .then(tabsData => {
      console.log('Fetched tabs:', tabsData);
      setTabs(tabsData);
    })
    .catch(error => {
      console.error('Error fetching tabs:', error);
      setError(error.toString());
    });

    // TODO: Use song.description instead of song.comment
    navigation.setOptions({
      headerTitle: props => <DefaultHeader {...props} title={`${song.title} - ${song.band}`} description={song.comment} />,
    });
  }, [song, navigation]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading song</Text>
      </View>
    );
  }

  if (!song) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (tabs.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tabs</Text>
        <FlatList
          data={tabs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.buttonContainer}>
            <Button
              title={`${item.instrument} - ${item.title}`}
              onPress={() => navigation.navigate('TabScreen', { tab: item })}
            />
            </View>
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>There are not tabs for this song.</Text>
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
