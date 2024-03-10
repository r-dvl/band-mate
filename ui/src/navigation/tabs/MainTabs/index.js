import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Stacks
import FeedStack from '@navigation/stacks/FeedStack';
import HideoutStack from '@navigation/stacks/HideoutStack';
import SettingsStack from '@navigation/stacks/SettingsStack';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedStack} />
        <Tab.Screen name="Hideout" component={HideoutStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    );
  }