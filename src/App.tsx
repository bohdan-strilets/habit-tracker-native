import { HabitStorageGate } from '@components/HabitStorageGate';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { MainTabNavigator } from '@navigation/MainTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { buildNavigationTheme, ThemeProvider, useAppTheme } from '@theme';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function AppNavigation() {
  const { scheme, theme } = useAppTheme();
  const navigationTheme = useMemo(
    () => buildNavigationTheme(scheme, theme),
    [scheme, theme],
  );

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <NavigationContainer theme={navigationTheme}>
        <MainTabNavigator />
      </NavigationContainer>
    </>
  );
}

const appRootStyles = StyleSheet.create({
  fill: { flex: 1 },
});

export default function App() {
  return (
    <GestureHandlerRootView style={appRootStyles.fill}>
      <SafeAreaProvider>
        <ThemeProvider>
          <BottomSheetModalProvider>
            <HabitStorageGate>
              <AppNavigation />
            </HabitStorageGate>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
