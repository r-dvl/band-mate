import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// Components
import DefaultHeader from '@components/headers/DefaultHeader';

export default function TabScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const tab = route.params.tab;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <DefaultHeader {...props} title={`${tab.instrument} - ${tab.title}`} description={tab.description} />,
    });  }, [tab, navigation]);

  return (
    <View style={styles.container}>
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
