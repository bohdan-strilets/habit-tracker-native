import { StyleSheet, View } from 'react-native';
import {
  BottomTabBar,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AppTabBar = (props: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.shell, { paddingBottom: insets.bottom }]}>
      <BottomTabBar {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  shell: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',

    backgroundColor: '#fff',
  },
});
