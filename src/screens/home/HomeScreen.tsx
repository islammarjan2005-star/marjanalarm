/**
 * Home Screen - Daily Overview
 *
 * Features:
 * - Greeting with user name
 * - Next alarm card (prominent)
 * - List of other alarms
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Card, Button } from '../../components';
import { useApp } from '../../context';
import { Alarm } from '../../types';
import { getAdhkarSetById } from '../../data/adhkar';

interface HomeScreenProps {
  onEditAlarm: (alarmId?: string) => void;
  onViewProgress: () => void;
  onViewSettings: () => void;
}

// Get next alarm based on current time
const getNextAlarm = (alarms: Alarm[]): Alarm | undefined => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const enabledAlarms = alarms.filter((a) => a.enabled);
  if (enabledAlarms.length === 0) return undefined;

  // Find the next alarm today or tomorrow
  let nextAlarm: Alarm | undefined;
  let minDiff = Infinity;

  for (const alarm of enabledAlarms) {
    const [hours, minutes] = alarm.time.split(':').map(Number);
    const alarmTime = hours * 60 + minutes;

    let diff = alarmTime - currentTime;
    if (diff <= 0) diff += 24 * 60; // Next day

    if (diff < minDiff) {
      minDiff = diff;
      nextAlarm = alarm;
    }
  }

  return nextAlarm;
};

// Format time for display
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')}`;
};

const formatTimeFull = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onEditAlarm,
  onViewProgress,
  onViewSettings,
}) => {
  const { state, toggleAlarm } = useApp();
  const { alarms, preferences } = state;

  const nextAlarm = getNextAlarm(alarms);
  const otherAlarms = alarms.filter((a) => a.id !== nextAlarm?.id);

  const getAdhkarSetName = (setId: string) => {
    const set = getAdhkarSetById(setId);
    return set ? `${set.name} adhkar set` : 'No adhkar linked';
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background.gradient.start, colors.background.primary]}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Assalamu alaikum{preferences.displayName ? `, ${preferences.displayName}` : ''}
            </Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {preferences.displayName ? preferences.displayName[0].toUpperCase() : 'M'}
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Next Alarm Card */}
          {nextAlarm ? (
            <Card variant="elevated" padding="lg" style={styles.nextAlarmCard}>
              <View style={styles.nextAlarmHeader}>
                <Text style={styles.nextAlarmLabel}>Next alarm</Text>
                <View
                  style={[
                    styles.duaLockPill,
                    preferences.micPermissionGranted
                      ? styles.duaLockActive
                      : styles.duaLockInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.duaLockText,
                      preferences.micPermissionGranted
                        ? styles.duaLockTextActive
                        : styles.duaLockTextInactive,
                    ]}
                  >
                    {preferences.micPermissionGranted ? 'Dua-locked' : 'Normal alarm'}
                  </Text>
                </View>
              </View>

              <Text style={styles.nextAlarmTime}>
                {formatTimeFull(nextAlarm.time)}
              </Text>
              <Text style={styles.nextAlarmName}>{nextAlarm.name}</Text>

              <Text style={styles.nextAlarmAdhkar}>
                You'll recite: {getAdhkarSetName(nextAlarm.adhkarSetId)}
              </Text>

              <View style={styles.nextAlarmActions}>
                <Button
                  title="Edit"
                  variant="secondary"
                  size="sm"
                  onPress={() => onEditAlarm(nextAlarm.id)}
                  style={styles.nextAlarmButton}
                />
                <Button
                  title="Disable today"
                  variant="secondary"
                  size="sm"
                  onPress={() => toggleAlarm(nextAlarm.id)}
                  style={styles.nextAlarmButton}
                />
              </View>
            </Card>
          ) : (
            <Card variant="outlined" padding="lg" style={styles.noAlarmCard}>
              <Text style={styles.noAlarmText}>No alarms set</Text>
              <Button
                title="Create your first alarm"
                onPress={() => onEditAlarm()}
                style={styles.createAlarmButton}
              />
            </Card>
          )}

          {/* Other Alarms */}
          {otherAlarms.length > 0 && (
            <View style={styles.otherAlarmsSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Other alarms</Text>
                <TouchableOpacity onPress={() => onEditAlarm()}>
                  <Text style={styles.addAlarmText}>+ Add</Text>
                </TouchableOpacity>
              </View>

              {otherAlarms.map((alarm) => (
                <TouchableOpacity
                  key={alarm.id}
                  onPress={() => onEditAlarm(alarm.id)}
                  activeOpacity={0.7}
                >
                  <Card variant="default" padding="md" style={styles.alarmCard}>
                    <View style={styles.alarmCardContent}>
                      <View style={styles.alarmCardInfo}>
                        <View style={styles.alarmCardTimeRow}>
                          <Text style={styles.alarmCardTime}>
                            {formatTimeFull(alarm.time)}
                          </Text>
                          <Text style={styles.alarmCardName}>
                            {alarm.name}
                          </Text>
                        </View>
                        <Text style={styles.alarmCardAdhkar}>
                          {getAdhkarSetName(alarm.adhkarSetId)}
                        </Text>
                      </View>
                      <Switch
                        value={alarm.enabled}
                        onValueChange={() => toggleAlarm(alarm.id)}
                        trackColor={{
                          false: colors.border.primary,
                          true: colors.accent.primary,
                        }}
                        thumbColor={colors.text.primary}
                      />
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Add Alarm Button (if alarms exist) */}
          {alarms.length > 0 && alarms.length < 5 && (
            <Button
              title="+ Add new alarm"
              variant="secondary"
              onPress={() => onEditAlarm()}
              fullWidth
              style={styles.addButton}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  greeting: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  avatarText: {
    ...textStyles.labelLarge,
    color: colors.accent.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },

  // Next Alarm Card
  nextAlarmCard: {
    marginBottom: spacing.xl,
  },
  nextAlarmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  nextAlarmLabel: {
    ...textStyles.labelSmall,
    color: colors.text.tertiary,
  },
  duaLockPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.full,
  },
  duaLockActive: {
    backgroundColor: colors.duaLock.active + '20',
  },
  duaLockInactive: {
    backgroundColor: colors.surface.secondary,
  },
  duaLockText: {
    ...textStyles.labelSmall,
  },
  duaLockTextActive: {
    color: colors.duaLock.active,
  },
  duaLockTextInactive: {
    color: colors.duaLock.inactive,
  },
  nextAlarmTime: {
    ...textStyles.displayMedium,
    color: colors.text.primary,
    marginBottom: spacing.xxs,
  },
  nextAlarmName: {
    ...textStyles.bodyLarge,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  nextAlarmAdhkar: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    marginBottom: spacing.lg,
  },
  nextAlarmActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  nextAlarmButton: {
    flex: 1,
  },

  // No Alarm Card
  noAlarmCard: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  noAlarmText: {
    ...textStyles.bodyLarge,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  createAlarmButton: {
    minWidth: 200,
  },

  // Other Alarms
  otherAlarmsSection: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
  },
  addAlarmText: {
    ...textStyles.labelMedium,
    color: colors.accent.primary,
  },
  alarmCard: {
    marginBottom: spacing.sm,
  },
  alarmCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alarmCardInfo: {
    flex: 1,
  },
  alarmCardTimeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginBottom: spacing.xxs,
  },
  alarmCardTime: {
    ...textStyles.h3,
    color: colors.text.primary,
  },
  alarmCardName: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  alarmCardAdhkar: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },

  addButton: {
    marginTop: spacing.md,
  },
});
