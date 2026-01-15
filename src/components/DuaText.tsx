/**
 * DuaText component for displaying Arabic text with transliteration and translation
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { textStyles, fontSizes } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { DuaDisplayMode, FontSizePreference } from '../types';

interface DuaTextProps {
  arabic: string;
  transliteration?: string;
  translation?: string;
  displayMode: DuaDisplayMode;
  fontSize?: FontSizePreference;
  highlighted?: boolean;
  style?: ViewStyle;
}

export const DuaText: React.FC<DuaTextProps> = ({
  arabic,
  transliteration,
  translation,
  displayMode,
  fontSize = 'medium',
  highlighted = false,
  style,
}) => {
  const getArabicFontSize = () => {
    switch (fontSize) {
      case 'small':
        return fontSizes.arabic.sm;
      case 'large':
        return fontSizes.arabic.xl;
      default:
        return fontSizes.arabic.lg;
    }
  };

  const getTranslitFontSize = () => {
    switch (fontSize) {
      case 'small':
        return fontSizes.sm;
      case 'large':
        return fontSizes.lg;
      default:
        return fontSizes.md;
    }
  };

  const getTranslationFontSize = () => {
    switch (fontSize) {
      case 'small':
        return fontSizes.xs;
      case 'large':
        return fontSizes.base;
      default:
        return fontSizes.sm;
    }
  };

  const showTransliteration =
    displayMode === 'arabic_transliteration' ||
    displayMode === 'arabic_transliteration_translation';

  const showTranslation = displayMode === 'arabic_transliteration_translation';

  return (
    <View style={[styles.container, highlighted && styles.highlighted, style]}>
      <Text
        style={[
          styles.arabic,
          { fontSize: getArabicFontSize(), lineHeight: getArabicFontSize() * 2 },
        ]}
      >
        {arabic}
      </Text>

      {showTransliteration && transliteration && (
        <Text
          style={[
            styles.transliteration,
            { fontSize: getTranslitFontSize(), lineHeight: getTranslitFontSize() * 1.6 },
          ]}
        >
          {transliteration}
        </Text>
      )}

      {showTranslation && translation && (
        <Text
          style={[
            styles.translation,
            { fontSize: getTranslationFontSize(), lineHeight: getTranslationFontSize() * 1.6 },
          ]}
        >
          {translation}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 16,
  },
  highlighted: {
    backgroundColor: 'rgba(20, 184, 166, 0.1)',
    borderWidth: 1,
    borderColor: colors.accent.primary,
  },
  arabic: {
    color: colors.text.arabic,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: spacing.sm,
  },
  transliteration: {
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  translation: {
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});
