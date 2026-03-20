import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { AppHeader } from '../components/AppHeader';
import { AppTabBar } from '../components/AppTabBar';
import { AddHabitScreen } from '../screens/AddHabitScreen';
import {
  colors,
  layout,
  tabBarContainerStyle,
  tabBarIconStyle,
  tabBarItemStyle,
} from '../theme';
import { HomeStackNavigator } from './HomeStackNavigator';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colors.tab.active,
        tabBarInactiveTintColor: colors.tab.inactive,
        tabBarShowLabel: false,
        tabBarItemStyle,
        tabBarIconStyle,
        tabBarStyle: tabBarContainerStyle,
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
                size={layout.tabIconSize}
                color={color}
              />
            ),
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
              size={layout.tabIconSize}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
