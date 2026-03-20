import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from '../../theme';
import type { FieldRequirementBadgeProps } from './FieldRequirementBadge.types';
import { createFieldRequirementBadgeStyles } from './FieldRequirementBadge.styles';

export const FieldRequirementBadge = ({ kind }: FieldRequirementBadgeProps) => {
  const { theme } = useAppTheme();
  const s = useMemo(
    () => createFieldRequirementBadgeStyles(theme.colors),
    [theme.colors],
  );
  const req = kind === 'required';
  return (
    <View style={[s.badge, req ? s.badgeRequired : s.badgeOptional]}>
      <Text style={req ? s.badgeRequiredText : s.badgeOptionalText}>
        {req ? 'Required' : 'Optional'}
      </Text>
    </View>
  );
};
