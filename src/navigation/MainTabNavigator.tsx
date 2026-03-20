import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { AppHeader } from '../components/AppHeader';
import { AppTabBar } from '../components/AppTabBar';
import { AddHabitScreen } from '../screens/AddHabitScreen';
import { HomeStackNavigator } from './HomeStackNavigator';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_BAR_ACTIVE = '#2e7d32';
const TAB_BAR_INACTIVE = '#888';
const TAB_ICON_SIZE = 26;

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: TAB_BAR_ACTIVE,
        tabBarInactiveTintColor: TAB_BAR_INACTIVE,
        tabBarShowLabel: false,
        tabBarItemStyle: { paddingTop: 8, paddingBottom: 8 },
        tabBarStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={({ route }) => {
          const focused = getFocusedRouteNameFromRoute(route) ?? 'Home';
          return {
            headerShown: focused === 'Home',
            header: () => <AppHeader />,
            title: 'Home',
            tabBarAccessibilityLabel: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={TAB_ICON_SIZE}
                color={color}
              />
            ),
            tabBarStyle:
              focused === 'HabitDetails'
                ? { display: 'none' }
                : { backgroundColor: '#fff' },
          };
        }}
      />
      <Tab.Screen
        name="AddHabit"
        component={AddHabitScreen}
        options={{
          headerShown: true,
          header: () => <AppHeader subtitle="New habit" />,
          title: 'Add habit',
          tabBarAccessibilityLabel: 'Add habit',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={TAB_ICON_SIZE}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
