import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import DefaultHeader from '@components/headers/DefaultHeader';

export default function SettingsScreen() {
  const navigation = useNavigation();

  // TODO: Fetch real user information and use his band_ids
  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <DefaultHeader {...props} title='Band Selection' description='Select your project'/>,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Band Selection</Text>
      <Text style={styles.subtitle}>Screen under development</Text>
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
