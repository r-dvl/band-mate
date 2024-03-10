import { createStackNavigator } from '@react-navigation/stack';

// Screens
import FeedScreen from '@screens/FeedScreen';

const Stack = createStackNavigator();

export default function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}