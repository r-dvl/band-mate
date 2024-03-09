import { createStackNavigator } from '@react-navigation/stack';

// Views
import FeedScreen from '@screens/FeedScreen';

const Stack = createStackNavigator();

// Crea un StackNavigator para la pestaña Hideout
export default function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}