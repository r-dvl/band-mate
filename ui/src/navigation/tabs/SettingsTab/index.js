import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SettingsScreen from '@screens/SettingsScreen';

const Stack = createStackNavigator();

export default function SettingsTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}