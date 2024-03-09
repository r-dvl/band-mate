import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function TabScreen() {
  const [tab, setTab] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://192.168.1.38:8080/v1/tabs/${route.params.tabId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched tab:', data);
        setTab(data);
        navigation.setOptions({ title: `${data.instrument} - ${data.title}`});
      })
      .catch(error => {
        console.error('Error fetching tab:', error);
      });
  }, [route.params.tabId]);

  if (!tab) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.comment}>Comment: {tab.comment}</Text>
      <Text style={styles.tuning}>Tuning: {tab.tuning}</Text>
      <Text style={styles.tabContent}>{tab.tab}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  instrument: {
    fontSize: 18,
  },
  comment: {
    fontSize: 18,
  },
  tuning: {
    fontSize: 18,
  },
  tab: {
    fontSize: 18,
    marginTop: 20,
  },
  tabContent: {
  },
});
