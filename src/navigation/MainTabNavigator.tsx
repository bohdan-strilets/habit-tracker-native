import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useMemo } from 'react';
import { AppHeader } from '../components/AppHeader';
import { AppTabBar } from '../components/AppTabBar';
import { AddHabitScreen } from '../screens/AddHabitScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import {
  getTabBarContainerStyle,
  layout,
  tabBarIconStyle,
  tabBarItemStyle,
  useAppTheme,
} from '../theme';
import { HomeStackNavigator } from './HomeStackNavigator';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  const { theme } = useAppTheme();

  const screenOptions = useMemo(
    () => ({
      tabBarActiveTintColor: theme.colors.tab.active,
      tabBarInactiveTintColor: theme.colors.tab.inactive,
      tabBarShowLabel: false,
      tabBarItemStyle,
      tabBarIconStyle,
      tabBarStyle: getTabBarContainerStyle(theme.colors),
    }),
    [theme.colors],
  );

  return (
    <Tab.Navigator
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={() => ({
          headerShown: true,
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
        })}
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
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          header: () => <AppHeader subtitle="Settings" />,
          title: 'Settings',
          tabBarAccessibilityLabel: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={layout.tabIconSize}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
