import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Views
import FeedTab from '@tabs/FeedTab';
import HideoutTab from '@tabs/HideoutTab';
import SettingsTab from '@tabs/SettingsTab';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Feed">
        <Tab.Screen name="Feed" component={FeedTab} />
        <Tab.Screen name="Hideout" component={HideoutTab} />
        <Tab.Screen name="Settings" component={SettingsTab} />
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
