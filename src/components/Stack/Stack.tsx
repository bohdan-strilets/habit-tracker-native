import React from 'react';
import { View, ScrollView } from 'react-native';
import type { StackProps } from './Stack.types';

export const Stack = ({
  children,
  spacing = 12,
  align = 'stretch',
  justify = 'flex-start',
  padding = 0,
  scrollable = false,
  style,
}: StackProps) => {
  const childrenArray = React.Children.toArray(children);

  const childrenWithSpacing = childrenArray.map((child, index) => (
    <View
      key={index}
      style={{ marginBottom: index !== childrenArray.length - 1 ? spacing : 0 }}
    >
      {child}
    </View>
  ));

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={[
          { padding, alignItems: align, justifyContent: justify },
          style,
        ]}
      >
        {childrenWithSpacing}
      </ScrollView>
    );
  }

  return (
    <View
      style={[{ padding, alignItems: align, justifyContent: justify }, style]}
    >
      {childrenWithSpacing}
    </View>
  );
};
