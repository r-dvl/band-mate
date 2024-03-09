import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import TouchableHeader from '@components/headers/TouchableHeader';

// Screen specific components
import Comments from './components/Comments';
import Playlists from './components/Playlists';

export default function HideoutScreen() {
  const navigation = useNavigation();

  // TODO: Fetch and use real band information
  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <TouchableHeader {...props} title='The Sodawaves' description='🎸Rasty🎤Naisen🪇Change' screen='BandSelectionScreen'/>,
    });
  }, [navigation]);

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
