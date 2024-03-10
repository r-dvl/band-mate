import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Components
import { AuthContext, AuthProvider } from '@components/Auth';

// Screens
import LoginScreen from '@screens/LoginScreen';
import BandSelectionScreen from '@screens/BandSelectionScreen'

// Tabs
import MainTabs from '@navigation/tabs/MainTabs';

const Stack = createStackNavigator();

function App() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Feed">
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BandSelectionScreen"
            component={BandSelectionScreen}
          />
        </Stack.Navigator>
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
