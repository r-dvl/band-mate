import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext, AuthProvider } from '@components/Auth';
import LoginScreen from '@screens/LoginScreen';
import FeedTab from '@tabs/FeedTab';
import HideoutTab from '@tabs/HideoutTab';
import SettingsTab from '@tabs/SettingsTab';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator initialRouteName="Feed">
          <Tab.Screen
            name="Feed"
            component={FeedTab}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Hideout"
            component={HideoutTab}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsTab}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
