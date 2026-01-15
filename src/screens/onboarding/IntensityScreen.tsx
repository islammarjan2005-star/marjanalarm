/**
 * Onboarding Screen 3 - Adhkar Intensity
 *
 * Title: "How much do you want to recite when the alarm rings?"
 * 3 big cards: Light, Standard, Full
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button, Card } from '../../components';
import { AdhkarIntensity } from '../../types';
import { useApp } from '../../context';

interface IntensityScreenProps {
  onNext: () => void;
}

const intensityOptions: {
  value: AdhkarIntensity;
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    value: 'light',
    title: 'Light',
    description: '1–2 short duas, ~20 seconds',
    icon: '🌙',
  },
  {
    value: 'standard',
    title: 'Standard',
    description: 'Core morning adhkar, ~1–2 minutes',
    icon: '⭐',
  },
  {
    value: 'full',
    title: 'Full',
    description: 'Extended adhkar set, ~5+ minutes',
    icon: '✨',
  },
];

export const IntensityScreen: React.FC<IntensityScreenProps> = ({ onNext }) => {
  const { state, setAdhkarIntensity } = useApp();
  const [selectedIntensity, setSelectedIntensity] = useState<AdhkarIntensity>(
    state.preferences.defaultAdhkarIntensity
  );

  const handleContinue = () => {
    setAdhkarIntensity(selectedIntensity);
    onNext();
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
          <Text style={styles.title}>
            How much do you want to recite when the alarm rings?
          </Text>

          {/* Intensity Options */}
          <View style={styles.optionsContainer}>
            {intensityOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setSelectedIntensity(option.value)}
                activeOpacity={0.7}
              >
                <Card
                  variant={selectedIntensity === option.value ? 'highlight' : 'outlined'}
                  padding="lg"
                  style={styles.optionCard}
                >
                  <View style={styles.optionHeader}>
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                    <View style={styles.radioOuter}>
                      {selectedIntensity === option.value && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                  </View>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.footerNote}>
            You can change this later for each alarm.
          </Text>
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomContainer}>
          <Button title="Continue" onPress={handleContinue} fullWidth size="lg" />
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
  optionsContainer: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  optionCard: {
    marginBottom: 0,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  optionIcon: {
    fontSize: 32,
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
  optionTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.xxs,
  },
  optionDescription: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  footerNote: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
