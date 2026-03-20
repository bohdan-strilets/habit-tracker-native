import React from 'react';
import { ScrollView, View } from 'react-native';
import { stackLayoutStyle } from './Stack.styles';
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

  const containerStyle = stackLayoutStyle(padding, align, justify, style);

  if (scrollable) {
    return (
      <ScrollView contentContainerStyle={containerStyle}>
        {childrenWithSpacing}
      </ScrollView>
    );
  }

  return <View style={containerStyle}>{childrenWithSpacing}</View>;
};
