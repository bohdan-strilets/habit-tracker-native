import { Card } from '@components/Card';
import { createHabitDetailsSharedStyles } from '@components/HabitDetailsShared';
import { PrimaryButton } from '@components/PrimaryButton';
import { TextField } from '@components/TextField';
import {
  ONBOARDING_GOALS,
  type OnboardingGoalId,
  type OnboardingUserProfile,
} from '@constants/onboarding';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useOnboardingProfileStore } from '@store/useOnboardingProfileStore';
import { fontSize, useAppTheme } from '@theme';
import { isOnboardingGoalId, onboardingGoalLabel } from '@utils/onboardingGoalLabel';
import { saveOnboardingProfile } from '@utils/onboardingStorage';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, Text, View } from 'react-native';

import { createSettingsProfileCardStyles } from './SettingsProfileCard.styles';

export function SettingsProfileCard() {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const profile = useOnboardingProfileStore((s) => s.profile);
  const setProfile = useOnboardingProfileStore((s) => s.setProfile);

  const shared = useMemo(
    () => createHabitDetailsSharedStyles(theme.colors),
    [theme.colors],
  );
  const styles = useMemo(
    () => createSettingsProfileCardStyles(theme.colors),
    [theme.colors],
  );

  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftGoalId, setDraftGoalId] = useState<OnboardingGoalId | null>(null);
  const [saving, setSaving] = useState(false);

  const profileGoalLine = useMemo(
    () =>
      profile?.goalId ? onboardingGoalLabel(profile.goalId, t) : '',
    [profile?.goalId, t],
  );

  const beginEdit = useCallback(() => {
    if (!profile) return;
    setDraftName(profile.name);
    setDraftGoalId(
      isOnboardingGoalId(profile.goalId) ? profile.goalId : 'build',
    );
    setEditing(true);
  }, [profile]);

  const cancelEdit = useCallback(() => {
    setEditing(false);
  }, []);

  const handleSave = useCallback(async () => {
    if (!profile || !draftGoalId) return;
    const trimmed = draftName.trim();
    if (!trimmed) return;

    const updated: OnboardingUserProfile = {
      ...profile,
      name: trimmed,
      goalId: draftGoalId,
    };

    setSaving(true);
    try {
      await saveOnboardingProfile(updated);
      setProfile(updated);
      setEditing(false);
    } catch {
      Alert.alert('', t('settings.profileSaveError'));
    } finally {
      setSaving(false);
    }
  }, [draftGoalId, draftName, profile, setProfile, t]);

  const canSave =
    Boolean(draftName.trim()) && draftGoalId !== null && !saving;

  if (!profile) {
    return null;
  }

  return (
    <Card>
      <Text style={shared.sectionHeading}>{t('settings.profileTitle')}</Text>

      {editing ? (
        <>
          <Text style={styles.fieldLabel}>{t('settings.profileNameLabel')}</Text>
          <TextField
            style={styles.nameField}
            value={draftName}
            onChangeText={setDraftName}
            placeholder={t('onboarding.namePlaceholder')}
            autoCapitalize="words"
            autoCorrect
            returnKeyType="done"
            accessibilityLabel={t('onboarding.nameA11y')}
          />

          <Text
            style={[styles.fieldLabel, styles.fieldLabelSpaced]}
          >
            {t('settings.profileGoalLabel')}
          </Text>
          {ONBOARDING_GOALS.map((g, index) => {
            const selected = draftGoalId === g.id;
            const isLast = index === ONBOARDING_GOALS.length - 1;
            return (
              <Pressable
                key={g.id}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setDraftGoalId(g.id)}
                style={({ pressed }) => [
                  styles.goalRow,
                  isLast && styles.goalRowLast,
                  selected && styles.goalRowSelected,
                  pressed && { opacity: 0.92 },
                ]}
              >
                <Text
                  style={[
                    styles.goalRowLabel,
                    selected && styles.goalRowLabelSelected,
                  ]}
                >
                  {onboardingGoalLabel(g.id, t)}
                </Text>
                <Ionicons
                  name={selected ? 'checkmark-circle' : 'ellipse-outline'}
                  size={fontSize['3xl']}
                  color={
                    selected
                      ? theme.colors.primary.main
                      : theme.colors.text.hint
                  }
                />
              </Pressable>
            );
          })}

          <View style={styles.saveBlock}>
            <PrimaryButton
              title={t('settings.profileSave')}
              onPress={handleSave}
              disabled={!canSave}
              loading={saving}
            />
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={cancelEdit}
            style={styles.cancelPress}
          >
            <Text style={styles.cancelText}>{t('common.cancel')}</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.viewRow}>
            <Text style={styles.viewLabel}>{t('settings.profileNameLabel')}</Text>
            <Text style={styles.viewValue}>{profile.name}</Text>
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.viewLabel}>{t('settings.profileGoalLabel')}</Text>
            <Text style={styles.viewValue}>{profileGoalLine}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={beginEdit}
            style={styles.editLink}
          >
            <Text style={styles.editLinkText}>{t('settings.profileEdit')}</Text>
          </Pressable>
        </>
      )}
    </Card>
  );
}
