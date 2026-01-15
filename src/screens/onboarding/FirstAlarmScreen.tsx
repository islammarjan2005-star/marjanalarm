/**
 * Onboarding Screen 5 - First Alarm Setup
 *
 * Title: "Set your first alarm"
 * Time picker
 * Alarm name
 * Required recitation pill
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button, Card } from '../../components';
import { useApp } from '../../context';
import { Alarm, AdhkarIntensity } from '../../types';
import { adhkarSets, getAdhkarSetByIntensity } from '../../data/adhkar';

interface FirstAlarmScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

// Simple time selector
const TimeSelector: React.FC<{
  hour: number;
  minute: number;
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
}> = ({ hour, minute, onHourChange, onMinuteChange }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  return (
    <View style={styles.timeContainer}>
      <View style={styles.timeColumn}>
        <TouchableOpacity
          style={styles.timeArrow}
          onPress={() => onHourChange((hour + 1) % 24)}
        >
          <Text style={styles.timeArrowText}>▲</Text>
        </TouchableOpacity>
        <Text style={styles.timeValue}>
          {hour.toString().padStart(2, '0')}
        </Text>
        <TouchableOpacity
          style={styles.timeArrow}
          onPress={() => onHourChange((hour - 1 + 24) % 24)}
        >
          <Text style={styles.timeArrowText}>▼</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.timeColon}>:</Text>

      <View style={styles.timeColumn}>
        <TouchableOpacity
          style={styles.timeArrow}
          onPress={() => onMinuteChange((minute + 5) % 60)}
        >
          <Text style={styles.timeArrowText}>▲</Text>
        </TouchableOpacity>
        <Text style={styles.timeValue}>
          {minute.toString().padStart(2, '0')}
        </Text>
        <TouchableOpacity
          style={styles.timeArrow}
          onPress={() => onMinuteChange((minute - 5 + 60) % 60)}
        >
          <Text style={styles.timeArrowText}>▼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const FirstAlarmScreen: React.FC<FirstAlarmScreenProps> = ({
  onComplete,
  onSkip,
}) => {
  const { state, addAlarm, completeOnboarding } = useApp();
  const [hour, setHour] = useState(5);
  const [minute, setMinute] = useState(30);
  const [alarmName, setAlarmName] = useState('Fajr Alarm');

  const selectedSet = getAdhkarSetByIntensity(state.preferences.defaultAdhkarIntensity);

  const handleSaveAlarm = () => {
    const newAlarm: Alarm = {
      id: `alarm_${Date.now()}`,
      name: alarmName,
      time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      enabled: true,
      repeatDays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      adhkarSetId: selectedSet?.id || 'set_standard',
      snoozeEnabled: true,
      snoozeDurationMinutes: 5,
      emergencyUnlockEnabled: true,
      duaDisplayMode: state.preferences.duaDisplayMode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addAlarm(newAlarm);
    completeOnboarding();
    onComplete();
  };

  const handleSkip = () => {
    completeOnboarding();
    onSkip();
  };

  return (
    <LinearGradient
      colors={[colors.background.gradient.start, colors.background.gradient.end]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Set your first alarm</Text>

          {/* Time Picker */}
          <Card variant="default" padding="lg" style={styles.timeCard}>
            <TimeSelector
              hour={hour}
              minute={minute}
              onHourChange={setHour}
              onMinuteChange={setMinute}
            />
          </Card>

          {/* Alarm Name */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Alarm name</Text>
            <TextInput
              style={styles.textInput}
              value={alarmName}
              onChangeText={setAlarmName}
              placeholder="Enter alarm name"
              placeholderTextColor={colors.text.tertiary}
            />
          </View>

          {/* Required Recitation */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Required recitation</Text>
            <Card variant="outlined" padding="md">
              <View style={styles.recitationRow}>
                <View style={styles.recitationInfo}>
                  <Text style={styles.recitationTitle}>
                    {selectedSet?.name} set
                  </Text>
                  <Text style={styles.recitationDuration}>
                    {selectedSet?.estimatedDuration}
                  </Text>
                </View>
                <Text style={styles.recitationArrow}>›</Text>
              </View>
            </Card>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomContainer}>
          <Button title="Save alarm" onPress={handleSaveAlarm} fullWidth size="lg" />
          <TouchableOpacity style={styles.skipLink} onPress={handleSkip}>
            <Text style={styles.skipLinkText}>I'll set alarms later</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  timeCard: {
    marginBottom: spacing.xl,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  timeColumn: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  timeArrow: {
    padding: spacing.sm,
  },
  timeArrowText: {
    ...textStyles.h3,
    color: colors.accent.primary,
  },
  timeValue: {
    fontSize: 64,
    fontWeight: '700',
    color: colors.text.primary,
    width: 100,
    textAlign: 'center',
  },
  timeColon: {
    fontSize: 64,
    fontWeight: '700',
    color: colors.text.primary,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.md,
  },
  inputSection: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  textInput: {
    ...textStyles.bodyLarge,
    backgroundColor: colors.surface.primary,
    color: colors.text.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  recitationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recitationInfo: {
    flex: 1,
  },
  recitationTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
    marginBottom: spacing.xxs,
  },
  recitationDuration: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
  recitationArrow: {
    ...textStyles.h2,
    color: colors.text.tertiary,
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  skipLink: {
    marginTop: spacing.lg,
    padding: spacing.sm,
  },
  skipLinkText: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    textDecorationLine: 'underline',
  },
});
