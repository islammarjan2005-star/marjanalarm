/**
 * Onboarding Screen 2 - Language & Text Display
 *
 * Title: "How do you want to see the duas?"
 * Options in segmented cards
 * Font size toggle with live preview
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
import { textStyles, fontSizes } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button, Card, DuaText } from '../../components';
import { DuaDisplayMode, FontSizePreference } from '../../types';
import { useApp } from '../../context';

interface LanguageScreenProps {
  onNext: () => void;
}

const displayModeOptions: {
  value: DuaDisplayMode;
  title: string;
  description: string;
}[] = [
  {
    value: 'arabic_transliteration_translation',
    title: 'Arabic + Transliteration + Translation',
    description: 'Full display with all text',
  },
  {
    value: 'arabic_transliteration',
    title: 'Arabic + Transliteration',
    description: 'For those learning pronunciation',
  },
  {
    value: 'arabic_only',
    title: 'Arabic only',
    description: 'Minimal, focused display',
  },
];

const fontSizeOptions: { value: FontSizePreference; label: string }[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

// Sample dua for preview
const previewDua = {
  arabic: 'بِسْمِ ٱللَّٰهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ',
  transliteration: 'Bismillāhil-ladhī lā yaḍurru maʿas-mihi shay\'un',
  translation: 'In the Name of Allah, with whose Name nothing can cause harm',
};

export const LanguageScreen: React.FC<LanguageScreenProps> = ({ onNext }) => {
  const { state, setDuaDisplayMode, setFontSize } = useApp();
  const [selectedMode, setSelectedMode] = useState<DuaDisplayMode>(
    state.preferences.duaDisplayMode
  );
  const [selectedFontSize, setSelectedFontSize] = useState<FontSizePreference>(
    state.preferences.fontSize
  );

  const handleContinue = () => {
    setDuaDisplayMode(selectedMode);
    setFontSize(selectedFontSize);
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
          <Text style={styles.title}>How do you want to see the duas?</Text>

          {/* Display Mode Options */}
          <View style={styles.optionsContainer}>
            {displayModeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setSelectedMode(option.value)}
                activeOpacity={0.7}
              >
                <Card
                  variant={selectedMode === option.value ? 'highlight' : 'outlined'}
                  padding="md"
                  style={styles.optionCard}
                >
                  <View style={styles.optionContent}>
                    <View style={styles.radioOuter}>
                      {selectedMode === option.value && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <View style={styles.optionText}>
                      <Text style={styles.optionTitle}>{option.title}</Text>
                      <Text style={styles.optionDescription}>
                        {option.description}
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>

          {/* Font Size Selector */}
          <View style={styles.fontSizeSection}>
            <Text style={styles.sectionLabel}>Font size</Text>
            <View style={styles.fontSizeContainer}>
              {fontSizeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.fontSizeButton,
                    selectedFontSize === option.value && styles.fontSizeButtonActive,
                  ]}
                  onPress={() => setSelectedFontSize(option.value)}
                >
                  <Text
                    style={[
                      styles.fontSizeButtonText,
                      selectedFontSize === option.value &&
                        styles.fontSizeButtonTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Live Preview */}
          <View style={styles.previewSection}>
            <Text style={styles.sectionLabel}>Preview</Text>
            <Card variant="default" padding="lg">
              <DuaText
                arabic={previewDua.arabic}
                transliteration={previewDua.transliteration}
                translation={previewDua.translation}
                displayMode={selectedMode}
                fontSize={selectedFontSize}
              />
            </Card>
          </View>
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
    marginBottom: spacing.xl,
  },
  optionCard: {
    marginBottom: 0,
  },
  optionContent: {
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
  optionText: {
    flex: 1,
  },
  optionTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
    marginBottom: spacing.xxs,
  },
  optionDescription: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
  fontSizeSection: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  fontSizeContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.xxs,
  },
  fontSizeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  fontSizeButtonActive: {
    backgroundColor: colors.accent.primary,
  },
  fontSizeButtonText: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
  },
  fontSizeButtonTextActive: {
    color: colors.text.inverse,
  },
  previewSection: {
    marginBottom: spacing.lg,
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
