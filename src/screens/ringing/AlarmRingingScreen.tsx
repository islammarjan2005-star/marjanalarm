/**
 * Alarm Ringing Screen - The Heart of the App
 *
 * Full-screen, distraction-free recitation UI.
 * Features:
 * - Dark gradient background
 * - Large time display
 * - Dua card with Arabic/transliteration/translation
 * - Voice recognition status
 * - Progress dots
 * - Snooze and emergency buttons
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
  Animated,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '../../theme/colors';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button, Card, DuaText, ProgressDots, VoiceIndicator } from '../../components';
import { useApp } from '../../context';
import { VoiceStatus, DuaCompletionStatus, AlarmHistoryEntry } from '../../types';
import { getAdhkarSetById, snoozeDhikr } from '../../data/adhkar';

interface AlarmRingingScreenProps {
  alarmId: string;
  onDismiss: () => void;
}

export const AlarmRingingScreen: React.FC<AlarmRingingScreenProps> = ({
  alarmId,
  onDismiss,
}) => {
  const { state, recordAlarmHistory, incrementStreak, resetStreak } = useApp();
  const alarm = state.alarms.find((a) => a.id === alarmId);
  const adhkarSet = alarm ? getAdhkarSetById(alarm.adhkarSetId) : undefined;

  const [currentDuaIndex, setCurrentDuaIndex] = useState(0);
  const [completedDuas, setCompletedDuas] = useState(0);
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle');
  const [isReciting, setIsReciting] = useState(false);
  const [showSnoozeModal, setShowSnoozeModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [snoozeReciteCount, setSnoozeReciteCount] = useState(0);

  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  const currentDua = adhkarSet?.duas[currentDuaIndex];
  const totalDuas = adhkarSet?.duas.length || 0;

  // Shimmer animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  // Simulate voice recognition (in real app, use speech recognition API)
  useEffect(() => {
    if (isReciting && voiceStatus === 'listening') {
      // Simulate detection after 2-3 seconds
      const timer = setTimeout(() => {
        setVoiceStatus('detected');
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // Complete dua after brief delay
        setTimeout(() => {
          handleDuaCompleted();
        }, 1500);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isReciting, voiceStatus, currentDuaIndex]);

  const handleStartReciting = () => {
    setIsReciting(true);
    setVoiceStatus('listening');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleDuaCompleted = () => {
    const newCompletedCount = completedDuas + 1;
    setCompletedDuas(newCompletedCount);
    setVoiceStatus('completed');

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (currentDuaIndex < totalDuas - 1) {
      // Move to next dua after brief pause
      setTimeout(() => {
        setCurrentDuaIndex(currentDuaIndex + 1);
        setVoiceStatus('idle');
        setIsReciting(false);
      }, 1500);
    } else {
      // All duas completed!
      handleAllDuasCompleted();
    }
  };

  const handleAllDuasCompleted = () => {
    // Record history
    const historyEntry: AlarmHistoryEntry = {
      id: `history_${Date.now()}`,
      alarmId,
      alarmName: alarm?.name || 'Alarm',
      triggeredAt: new Date().toISOString(),
      dismissedAt: new Date().toISOString(),
      completionStatus: 'completed',
      adhkarSetId: adhkarSet?.id || '',
      adhkarSetName: adhkarSet?.name || '',
      duasCompleted: totalDuas,
      duasTotal: totalDuas,
      snoozeCount: 0,
    };
    recordAlarmHistory(historyEntry);
    incrementStreak();

    // Show success screen
    setShowSuccessScreen(true);
    Animated.timing(successAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleSnooze = () => {
    setShowSnoozeModal(true);
    setSnoozeReciteCount(0);
  };

  const handleSnoozeRecite = () => {
    const newCount = snoozeReciteCount + 1;
    setSnoozeReciteCount(newCount);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (newCount >= 10) {
      // Snooze granted
      setShowSnoozeModal(false);
      // In real app, would set a new alarm for 5 minutes later
      onDismiss();
    }
  };

  const handleExit = () => {
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    // Record as skipped
    const historyEntry: AlarmHistoryEntry = {
      id: `history_${Date.now()}`,
      alarmId,
      alarmName: alarm?.name || 'Alarm',
      triggeredAt: new Date().toISOString(),
      dismissedAt: new Date().toISOString(),
      completionStatus: 'skipped',
      adhkarSetId: adhkarSet?.id || '',
      adhkarSetName: adhkarSet?.name || '',
      duasCompleted: completedDuas,
      duasTotal: totalDuas,
      snoozeCount: 0,
    };
    recordAlarmHistory(historyEntry);
    resetStreak();

    setShowExitModal(false);
    onDismiss();
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  if (showSuccessScreen) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <LinearGradient
          colors={[colors.background.success, colors.background.gradient.end]}
          style={styles.gradient}
        />
        <Animated.View
          style={[
            styles.successContent,
            { opacity: successAnim, transform: [{ scale: successAnim }] },
          ]}
        >
          <Text style={styles.successEmoji}>✨</Text>
          <Text style={styles.successTitle}>Alhamdulillah.</Text>
          <Text style={styles.successSubtitle}>
            You started your day with dhikr.
          </Text>
          <Text style={styles.successStreak}>
            Day {state.streak.currentStreak + 1} of your 'Dhikr mornings' streak.
          </Text>
          <Button
            title="Dismiss"
            onPress={onDismiss}
            size="lg"
            style={styles.dismissButton}
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient
        colors={[colors.background.gradient.start, '#0D0B1E']}
        style={styles.gradient}
      />

      {/* Subtle shimmer overlay */}
      <Animated.View
        style={[
          styles.shimmerOverlay,
          {
            opacity: shimmerAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.02, 0.05],
            }),
          },
        ]}
      />

      {/* Top - Time */}
      <View style={styles.topSection}>
        <Text style={styles.timeDisplay}>{getCurrentTime()}</Text>
        <Text style={styles.alarmName}>{alarm?.name}</Text>
      </View>

      {/* Center - Dua Display */}
      <View style={styles.centerSection}>
        {currentDua && (
          <Card variant="default" padding="lg" style={styles.duaCard}>
            <DuaText
              arabic={currentDua.arabic}
              transliteration={currentDua.transliteration}
              translation={currentDua.translation}
              displayMode={alarm?.duaDisplayMode || 'arabic_transliteration_translation'}
              fontSize={state.preferences.fontSize}
              highlighted={voiceStatus === 'detected' || voiceStatus === 'completed'}
            />
          </Card>
        )}

        {/* Progress dots */}
        <ProgressDots
          total={totalDuas}
          completed={completedDuas}
          current={currentDuaIndex}
          style={styles.progressDots}
        />
      </View>

      {/* Bottom - Voice Status & Actions */}
      <View style={styles.bottomSection}>
        <VoiceIndicator
          status={voiceStatus}
          message={
            voiceStatus === 'completed'
              ? `Dua completed (${completedDuas}/${totalDuas}). ${
                  currentDuaIndex < totalDuas - 1 ? 'Keep going.' : ''
                }`
              : undefined
          }
          style={styles.voiceIndicator}
        />

        <View style={styles.buttonsContainer}>
          {/* Main action button */}
          <Button
            title={isReciting ? 'Listening...' : 'Start reciting'}
            onPress={handleStartReciting}
            size="lg"
            fullWidth
            disabled={isReciting}
            style={styles.mainButton}
          />

          {/* Secondary buttons */}
          <View style={styles.secondaryButtons}>
            {alarm?.snoozeEnabled && (
              <Button
                title="Snooze 5 min"
                variant="secondary"
                size="sm"
                onPress={handleSnooze}
                style={styles.secondaryButton}
              />
            )}
            {alarm?.emergencyUnlockEnabled && (
              <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
                <Text style={styles.exitButtonText}>I'm not able right now</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Snooze Modal */}
      <Modal
        visible={showSnoozeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSnoozeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.snoozeModalContent}>
            <Text style={styles.snoozeModalTitle}>
              To snooze, recite 'Subhanallah' 10 times
            </Text>
            <Text style={styles.snoozeModalArabic}>{snoozeDhikr.arabic}</Text>
            <Text style={styles.snoozeModalTranslit}>
              {snoozeDhikr.transliteration}
            </Text>

            <View style={styles.snoozeProgress}>
              {[...Array(10)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.snoozeProgressDot,
                    i < snoozeReciteCount && styles.snoozeProgressDotActive,
                  ]}
                />
              ))}
            </View>

            <Text style={styles.snoozeCount}>{snoozeReciteCount}/10</Text>

            <Button
              title="I've said it"
              onPress={handleSnoozeRecite}
              fullWidth
              style={styles.snoozeButton}
            />

            <TouchableOpacity
              onPress={() => setShowSnoozeModal(false)}
              style={styles.snoozeCancelButton}
            >
              <Text style={styles.snoozeCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Exit Confirmation Modal */}
      <Modal
        visible={showExitModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowExitModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.exitModalContent}>
            <Text style={styles.exitModalTitle}>Turn off without adhkar?</Text>
            <Text style={styles.exitModalText}>
              We'll turn off the alarm and mark this as 'Skipped dhikr' for
              today. That's okay – you can return stronger tomorrow in shā'
              Allāh.
            </Text>
            <View style={styles.exitModalButtons}>
              <Button
                title="Cancel"
                variant="secondary"
                onPress={() => setShowExitModal(false)}
                style={styles.exitModalButton}
              />
              <Button
                title="Turn off"
                variant="danger"
                onPress={handleConfirmExit}
                style={styles.exitModalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.accent.primary,
  },

  // Top section
  topSection: {
    paddingTop: spacing['4xl'],
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  timeDisplay: {
    ...textStyles.displayLarge,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  alarmName: {
    ...textStyles.bodyLarge,
    color: colors.text.secondary,
  },

  // Center section
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  duaCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
  },
  progressDots: {
    marginTop: spacing.xl,
  },

  // Bottom section
  bottomSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  voiceIndicator: {
    marginBottom: spacing.xl,
  },
  buttonsContainer: {
    gap: spacing.md,
  },
  mainButton: {
    height: 64,
  },
  secondaryButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  exitButton: {
    padding: spacing.sm,
  },
  exitButtonText: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },

  // Success screen
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  successEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  successTitle: {
    ...textStyles.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  successSubtitle: {
    ...textStyles.bodyLarge,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  successStreak: {
    ...textStyles.bodyMedium,
    color: colors.accent.primary,
    marginBottom: spacing['3xl'],
  },
  dismissButton: {
    minWidth: 200,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  snoozeModalContent: {
    backgroundColor: colors.surface.primary,
    borderRadius: 24,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  snoozeModalTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  snoozeModalArabic: {
    fontSize: 32,
    color: colors.text.arabic,
    marginBottom: spacing.sm,
  },
  snoozeModalTranslit: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
  },
  snoozeProgress: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  snoozeProgressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.progress.empty,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  snoozeProgressDotActive: {
    backgroundColor: colors.progress.completed,
    borderColor: colors.progress.completed,
  },
  snoozeCount: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  snoozeButton: {
    marginBottom: spacing.sm,
  },
  snoozeCancelButton: {
    padding: spacing.sm,
  },
  snoozeCancelText: {
    ...textStyles.bodyMedium,
    color: colors.text.tertiary,
  },

  // Exit modal
  exitModalContent: {
    backgroundColor: colors.surface.primary,
    borderRadius: 24,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 360,
  },
  exitModalTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  exitModalText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  exitModalButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  exitModalButton: {
    flex: 1,
  },
});
