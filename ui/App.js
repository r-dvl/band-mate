import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Views
import Feed from './src/tabs/Feed';
import Hideout from './src/tabs/Hideout';
import Playlist from './src/screens/Playlist';
import Settings from './src/tabs/Settings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Crea un StackNavigator para la pestaña Hideout
function HideoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hideout" component={Hideout} options={{ headerShown: false }}/>
      <Stack.Screen name="Playlist" component={Playlist} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Feed">
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Hideout" component={HideoutStack} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
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
