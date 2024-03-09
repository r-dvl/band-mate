import { createStackNavigator } from '@react-navigation/stack';

// Views
import HideoutScreen from '@screens/HideoutScreen';
import PlaylistScreen from '@screens/PlaylistScreen';
import SongScreen from '@screens/SongScreen';
import TabScreen from '@screens/TabScreen';

const Stack = createStackNavigator();

export default function HideoutTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HideoutScreen" component={HideoutScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Stack.Screen name="SongScreen" component={SongScreen} />
      <Stack.Screen name="TabScreen" component={TabScreen} />
    </Stack.Navigator>
  );
}