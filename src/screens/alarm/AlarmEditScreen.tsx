/**
 * Alarm Creation / Editing Screen
 *
 * Features:
 * - Time picker
 * - Repeat days
 * - Adhkar set selection
 * - Display mode selection
 * - Snooze settings
 * - Emergency unlock toggle
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button, Card } from '../../components';
import { useApp } from '../../context';
import { Alarm, DayOfWeek, AdhkarIntensity, DuaDisplayMode } from '../../types';
import { adhkarSets, getAdhkarSetById } from '../../data/adhkar';

interface AlarmEditScreenProps {
  alarmId?: string;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: 'sun', label: 'S' },
  { key: 'mon', label: 'M' },
  { key: 'tue', label: 'T' },
  { key: 'wed', label: 'W' },
  { key: 'thu', label: 'T' },
  { key: 'fri', label: 'F' },
  { key: 'sat', label: 'S' },
];

export const AlarmEditScreen: React.FC<AlarmEditScreenProps> = ({
  alarmId,
  onSave,
  onCancel,
  onDelete,
}) => {
  const { state, addAlarm, updateAlarm, deleteAlarm } = useApp();
  const existingAlarm = alarmId
    ? state.alarms.find((a) => a.id === alarmId)
    : undefined;

  const [hour, setHour] = useState(existingAlarm ? parseInt(existingAlarm.time.split(':')[0]) : 5);
  const [minute, setMinute] = useState(existingAlarm ? parseInt(existingAlarm.time.split(':')[1]) : 30);
  const [name, setName] = useState(existingAlarm?.name || 'Fajr Alarm');
  const [repeatDays, setRepeatDays] = useState<DayOfWeek[]>(
    existingAlarm?.repeatDays || ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  );
  const [adhkarSetId, setAdhkarSetId] = useState(existingAlarm?.adhkarSetId || 'set_standard');
  const [snoozeEnabled, setSnoozeEnabled] = useState(existingAlarm?.snoozeEnabled ?? true);
  const [emergencyUnlockEnabled, setEmergencyUnlockEnabled] = useState(
    existingAlarm?.emergencyUnlockEnabled ?? true
  );

  const [showAdhkarModal, setShowAdhkarModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const selectedSet = getAdhkarSetById(adhkarSetId);

  const toggleDay = (day: DayOfWeek) => {
    if (repeatDays.includes(day)) {
      if (repeatDays.length > 1) {
        setRepeatDays(repeatDays.filter((d) => d !== day));
      }
    } else {
      setRepeatDays([...repeatDays, day]);
    }
  };

  const handleSave = () => {
    const alarmData: Alarm = {
      id: existingAlarm?.id || `alarm_${Date.now()}`,
      name,
      time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      enabled: existingAlarm?.enabled ?? true,
      repeatDays,
      adhkarSetId,
      snoozeEnabled,
      snoozeDurationMinutes: 5,
      emergencyUnlockEnabled,
      duaDisplayMode: state.preferences.duaDisplayMode,
      createdAt: existingAlarm?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (existingAlarm) {
      updateAlarm(existingAlarm.id, alarmData);
    } else {
      addAlarm(alarmData);
    }

    onSave();
  };

  const handleDelete = () => {
    if (existingAlarm) {
      deleteAlarm(existingAlarm.id);
    }
    setShowDeleteModal(false);
    onDelete?.();
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
          <TouchableOpacity onPress={onCancel} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {existingAlarm ? 'Edit Alarm' : 'New Alarm'}
          </Text>
          <View style={styles.headerButton} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Time Picker */}
          <Card variant="default" padding="lg" style={styles.timeCard}>
            <View style={styles.timeContainer}>
              <View style={styles.timeColumn}>
                <TouchableOpacity
                  style={styles.timeArrow}
                  onPress={() => setHour((hour + 1) % 24)}
                >
                  <Text style={styles.timeArrowText}>▲</Text>
                </TouchableOpacity>
                <Text style={styles.timeValue}>
                  {hour.toString().padStart(2, '0')}
                </Text>
                <TouchableOpacity
                  style={styles.timeArrow}
                  onPress={() => setHour((hour - 1 + 24) % 24)}
                >
                  <Text style={styles.timeArrowText}>▼</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.timeColon}>:</Text>

              <View style={styles.timeColumn}>
                <TouchableOpacity
                  style={styles.timeArrow}
                  onPress={() => setMinute((minute + 5) % 60)}
                >
                  <Text style={styles.timeArrowText}>▲</Text>
                </TouchableOpacity>
                <Text style={styles.timeValue}>
                  {minute.toString().padStart(2, '0')}
                </Text>
                <TouchableOpacity
                  style={styles.timeArrow}
                  onPress={() => setMinute((minute - 5 + 60) % 60)}
                >
                  <Text style={styles.timeArrowText}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          {/* Alarm Name */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Alarm name</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter alarm name"
              placeholderTextColor={colors.text.tertiary}
            />
          </View>

          {/* Repeat Days */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Repeat</Text>
            <View style={styles.daysContainer}>
              {DAYS.map((day) => (
                <TouchableOpacity
                  key={day.key}
                  style={[
                    styles.dayButton,
                    repeatDays.includes(day.key) && styles.dayButtonActive,
                  ]}
                  onPress={() => toggleDay(day.key)}
                >
                  <Text
                    style={[
                      styles.dayButtonText,
                      repeatDays.includes(day.key) && styles.dayButtonTextActive,
                    ]}
                  >
                    {day.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Adhkar Set */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              When this alarm rings, you will recite:
            </Text>
            <TouchableOpacity onPress={() => setShowAdhkarModal(true)}>
              <Card variant="outlined" padding="md">
                <View style={styles.adhkarRow}>
                  <View>
                    <Text style={styles.adhkarTitle}>
                      {selectedSet?.name} morning adhkar
                    </Text>
                    <Text style={styles.adhkarDuration}>
                      {selectedSet?.estimatedDuration}
                    </Text>
                  </View>
                  <Text style={styles.adhkarArrow}>›</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>

          {/* Snooze */}
          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleTitle}>Allow snooze?</Text>
                <Text style={styles.toggleDescription}>
                  Snooze by reciting short dhikr (Subhanallah 10x)
                </Text>
              </View>
              <Switch
                value={snoozeEnabled}
                onValueChange={setSnoozeEnabled}
                trackColor={{
                  false: colors.border.primary,
                  true: colors.accent.primary,
                }}
                thumbColor={colors.text.primary}
              />
            </View>
          </View>

          {/* Emergency Unlock */}
          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleTitle}>Emergency unlock</Text>
                <Text style={styles.toggleDescription}>
                  In case you're unable to speak. Marks alarm as 'skipped dhikr'.
                </Text>
              </View>
              <Switch
                value={emergencyUnlockEnabled}
                onValueChange={setEmergencyUnlockEnabled}
                trackColor={{
                  false: colors.border.primary,
                  true: colors.accent.primary,
                }}
                thumbColor={colors.text.primary}
              />
            </View>
          </View>

          {/* Delete Button */}
          {existingAlarm && (
            <Button
              title="Delete Alarm"
              variant="ghost"
              onPress={() => setShowDeleteModal(true)}
              fullWidth
              textStyle={{ color: colors.status.error }}
              style={styles.deleteButton}
            />
          )}
        </ScrollView>

        {/* Save Button */}
        <View style={styles.bottomContainer}>
          <Button title="Save alarm" onPress={handleSave} fullWidth size="lg" />
        </View>

        {/* Adhkar Selection Modal */}
        <Modal
          visible={showAdhkarModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowAdhkarModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choose adhkar set</Text>

              {adhkarSets.map((set) => (
                <TouchableOpacity
                  key={set.id}
                  onPress={() => {
                    setAdhkarSetId(set.id);
                    setShowAdhkarModal(false);
                  }}
                >
                  <Card
                    variant={adhkarSetId === set.id ? 'highlight' : 'outlined'}
                    padding="md"
                    style={styles.modalCard}
                  >
                    <View style={styles.modalCardContent}>
                      <View style={styles.radioOuter}>
                        {adhkarSetId === set.id && (
                          <View style={styles.radioInner} />
                        )}
                      </View>
                      <View style={styles.modalCardInfo}>
                        <Text style={styles.modalCardTitle}>{set.name}</Text>
                        <Text style={styles.modalCardDescription}>
                          {set.description}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}

              <Button
                title="Done"
                onPress={() => setShowAdhkarModal(false)}
                fullWidth
                style={styles.modalButton}
              />
            </View>
          </View>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          visible={showDeleteModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDeleteModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.deleteModalContent}>
              <Text style={styles.deleteModalTitle}>Delete Alarm?</Text>
              <Text style={styles.deleteModalText}>
                This will permanently remove this alarm.
              </Text>
              <View style={styles.deleteModalButtons}>
                <Button
                  title="Cancel"
                  variant="secondary"
                  onPress={() => setShowDeleteModal(false)}
                  style={styles.deleteModalButton}
                />
                <Button
                  title="Delete"
                  variant="danger"
                  onPress={handleDelete}
                  style={styles.deleteModalButton}
                />
              </View>
            </View>
          </View>
        </Modal>
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
    height: 200,
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
  headerButton: {
    width: 60,
  },
  headerButtonText: {
    ...textStyles.bodyMedium,
    color: colors.accent.primary,
  },
  headerTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  timeCard: {
    marginBottom: spacing.xl,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  timeColumn: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  timeArrow: {
    padding: spacing.sm,
  },
  timeArrowText: {
    ...textStyles.h4,
    color: colors.accent.primary,
  },
  timeValue: {
    fontSize: 56,
    fontWeight: '700',
    color: colors.text.primary,
    width: 90,
    textAlign: 'center',
  },
  timeColon: {
    fontSize: 56,
    fontWeight: '700',
    color: colors.text.primary,
    marginHorizontal: spacing.xxs,
    marginBottom: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
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
  daysContainer: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  dayButton: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 44,
    borderRadius: 22,
    backgroundColor: colors.surface.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  dayButtonActive: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.primary,
  },
  dayButtonText: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
  },
  dayButtonTextActive: {
    color: colors.text.inverse,
  },
  adhkarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adhkarTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
    marginBottom: spacing.xxs,
  },
  adhkarDuration: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
  adhkarArrow: {
    ...textStyles.h2,
    color: colors.text.tertiary,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface.primary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  toggleInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  toggleTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
    marginBottom: spacing.xxs,
  },
  toggleDescription: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
  deleteButton: {
    marginTop: spacing.lg,
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.secondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  modalTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalCard: {
    marginBottom: spacing.sm,
  },
  modalCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent.primary,
  },
  modalCardInfo: {
    flex: 1,
  },
  modalCardTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  modalCardDescription: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
  modalButton: {
    marginTop: spacing.lg,
  },

  // Delete modal
  deleteModalContent: {
    backgroundColor: colors.surface.primary,
    margin: spacing.lg,
    borderRadius: 24,
    padding: spacing.lg,
  },
  deleteModalTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  deleteModalText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  deleteModalButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  deleteModalButton: {
    flex: 1,
  },
});
