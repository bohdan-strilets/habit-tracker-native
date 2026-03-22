import { AppHeader } from '@components/AppHeader';
import { AppTabBar, HapticTabBarButton } from '@components/AppTabBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddHabitScreen, SettingsScreen, StatsScreen } from '@screens';
import {
  getTabBarContainerStyle,
  layout,
  tabBarItemStyle,
  useAppTheme,
} from '@theme';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { HomeStackNavigator } from './HomeStackNavigator';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  const screenOptions = useMemo(
    () => ({
      tabBarActiveTintColor: theme.colors.tab.active,
      tabBarInactiveTintColor: theme.colors.tab.inactive,
      tabBarShowLabel: false,
      tabBarItemStyle,
      tabBarStyle: getTabBarContainerStyle(theme.colors),
      tabBarButton: (props) => <HapticTabBarButton {...props} />,
      tabBarHideOnKeyboard: true,
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
        options={{
          headerShown: true,
          header: () => <AppHeader />,
          title: t('tabs.home'),
          tabBarAccessibilityLabel: t('tabs.home'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={layout.tabIconSize}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          headerShown: true,
          header: () => <AppHeader subtitle={t('header.statistics')} />,
          title: t('tabs.stats'),
          tabBarAccessibilityLabel: t('tabs.stats'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              size={layout.tabIconSize}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddHabit"
        component={AddHabitScreen}
        options={{
          headerShown: true,
          header: () => <AppHeader subtitle={t('header.newHabit')} />,
          title: t('tabs.addHabit'),
          tabBarAccessibilityLabel: t('tabs.addHabit'),
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
          header: () => <AppHeader subtitle={t('header.settings')} />,
          title: t('tabs.settings'),
          tabBarAccessibilityLabel: t('tabs.settings'),
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
