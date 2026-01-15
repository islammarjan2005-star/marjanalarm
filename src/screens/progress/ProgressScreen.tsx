/**
 * Progress / Streak Screen
 *
 * Features:
 * - Current streak display
 * - Total dhikr mornings
 * - Weekly view
 * - History list
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Card } from '../../components';
import { useApp } from '../../context';
import { DuaCompletionStatus } from '../../types';

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Get status color
const getStatusColor = (status: DuaCompletionStatus) => {
  switch (status) {
    case 'completed':
      return colors.progress.completed;
    case 'partial':
    case 'manual':
      return colors.progress.partial;
    case 'skipped':
      return colors.progress.skipped;
    default:
      return colors.progress.empty;
  }
};

// Get status text
const getStatusText = (status: DuaCompletionStatus) => {
  switch (status) {
    case 'completed':
      return 'Completed adhkar';
    case 'partial':
      return 'Partial adhkar';
    case 'manual':
      return 'Manual confirmation';
    case 'skipped':
      return 'Skipped adhkar';
    default:
      return 'Unknown';
  }
};

// Format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const ProgressScreen: React.FC = () => {
  const { state } = useApp();
  const { streak, history } = state;

  // Get last 7 days' data
  const getWeeklyData = () => {
    const today = new Date();
    const weekData: { day: string; status: DuaCompletionStatus | null }[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayIndex = date.getDay();

      // Find any history entry for this date
      const entry = history.find((h) => {
        const entryDate = new Date(h.triggeredAt).toISOString().split('T')[0];
        return entryDate === dateStr;
      });

      weekData.push({
        day: DAYS_OF_WEEK[dayIndex],
        status: entry?.completionStatus || null,
      });
    }

    return weekData;
  };

  const weeklyData = getWeeklyData();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background.gradient.start, colors.background.primary]}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Dhikr mornings</Text>
            <Text style={styles.subtitle}>
              How often you turned off alarms by reciting.
            </Text>
          </View>

          {/* Main Stats Card */}
          <Card variant="elevated" padding="lg" style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{streak.currentStreak}</Text>
                <Text style={styles.statLabel}>Current streak</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{streak.totalDhikrMornings}</Text>
                <Text style={styles.statLabel}>Total mornings</Text>
              </View>
            </View>
          </Card>

          {/* Weekly View */}
          <View style={styles.weeklySection}>
            <Text style={styles.sectionTitle}>This week</Text>
            <View style={styles.weeklyContainer}>
              {weeklyData.map((day, index) => (
                <View key={index} style={styles.dayColumn}>
                  <View
                    style={[
                      styles.dayIndicator,
                      day.status === 'completed' && styles.dayCompleted,
                      day.status === 'partial' && styles.dayPartial,
                      day.status === 'skipped' && styles.daySkipped,
                      !day.status && styles.dayEmpty,
                    ]}
                  >
                    {day.status === 'completed' && (
                      <Text style={styles.dayCheckmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.dayLabel}>{day.day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* History List */}
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>Recent history</Text>
            {history.length === 0 ? (
              <Card variant="outlined" padding="lg">
                <Text style={styles.emptyText}>
                  No alarm history yet. Set an alarm to get started!
                </Text>
              </Card>
            ) : (
              history.slice(0, 10).map((entry) => (
                <Card
                  key={entry.id}
                  variant="default"
                  padding="md"
                  style={styles.historyCard}
                >
                  <View style={styles.historyRow}>
                    <View style={styles.historyInfo}>
                      <Text style={styles.historyAlarmName}>
                        {entry.alarmName}
                      </Text>
                      <Text style={styles.historyDate}>
                        {formatDate(entry.triggeredAt)}
                      </Text>
                    </View>
                    <View style={styles.historyStatus}>
                      <View
                        style={[
                          styles.statusDot,
                          { backgroundColor: getStatusColor(entry.completionStatus) },
                        ]}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(entry.completionStatus) },
                        ]}
                      >
                        {getStatusText(entry.completionStatus)}
                      </Text>
                    </View>
                  </View>
                  {entry.completionStatus !== 'skipped' && (
                    <Text style={styles.historyAdhkar}>
                      {entry.adhkarSetName} ({entry.duasCompleted}/{entry.duasTotal} duas)
                    </Text>
                  )}
                </Card>
              ))
            )}
          </View>

          {/* Motivational footer */}
          {streak.currentStreak > 0 && (
            <View style={styles.motivationalFooter}>
              <Text style={styles.motivationalText}>
                {streak.currentStreak >= 7
                  ? "Mā shā' Allāh! You've built a strong habit."
                  : streak.currentStreak >= 3
                  ? "Keep it up! You're building momentum."
                  : "Every morning counts. Keep going!"}
              </Text>
            </View>
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
    height: 200,
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

  // Header
  header: {
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },

  // Stats card
  statsCard: {
    marginBottom: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...textStyles.displaySmall,
    color: colors.accent.primary,
    marginBottom: spacing.xxs,
  },
  statLabel: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: colors.border.primary,
  },

  // Weekly section
  weeklySection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  weeklyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
  },
  dayColumn: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  dayIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCompleted: {
    backgroundColor: colors.progress.completed,
  },
  dayPartial: {
    backgroundColor: colors.progress.partial,
  },
  daySkipped: {
    backgroundColor: colors.progress.skipped,
  },
  dayEmpty: {
    backgroundColor: colors.progress.empty,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  dayCheckmark: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '700',
  },
  dayLabel: {
    ...textStyles.labelSmall,
    color: colors.text.tertiary,
  },

  // History section
  historySection: {
    marginBottom: spacing.lg,
  },
  historyCard: {
    marginBottom: spacing.sm,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  historyInfo: {
    flex: 1,
  },
  historyAlarmName: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  historyDate: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
  historyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    ...textStyles.labelSmall,
  },
  historyAdhkar: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
  emptyText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
  },

  // Motivational footer
  motivationalFooter: {
    padding: spacing.md,
    backgroundColor: colors.accent.primary + '15',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.accent.primary + '30',
  },
  motivationalText: {
    ...textStyles.bodyMedium,
    color: colors.accent.light,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
