/**
 * Typography system for MarjanAlarm
 *
 * Design philosophy:
 * - Clean rounded sans-serif (System default / SF Pro / Inter vibes)
 * - Arabic font: smooth, legible at large sizes
 * - H1 (times, main titles): very bold
 * - Body text: large enough to read half-asleep
 */

import { Platform, TextStyle } from 'react-native';

// Font families
export const fontFamilies = {
  // System fonts that work well across platforms
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  semibold: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
  // Arabic-optimized fonts
  arabic: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
};

// Font sizes designed for half-asleep reading
export const fontSizes = {
  // Extra small for tiny labels
  xs: 11,
  // Small for secondary info
  sm: 13,
  // Base for body text (larger than typical for sleepy eyes)
  base: 16,
  // Medium for emphasized body
  md: 18,
  // Large for section headers
  lg: 20,
  // XL for screen titles
  xl: 24,
  // 2XL for important info
  '2xl': 28,
  // 3XL for alarm times
  '3xl': 36,
  // 4XL for huge alarm display
  '4xl': 48,
  // 5XL for the main alarm time
  '5xl': 64,
  // 6XL for fullscreen alarm
  '6xl': 80,

  // Arabic-specific (slightly larger for legibility)
  arabic: {
    sm: 18,
    base: 22,
    lg: 28,
    xl: 36,
  },
};

// Line heights
export const lineHeights = {
  tight: 1.1,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
  arabic: 2.0, // Arabic needs more line height
};

// Font weights
export const fontWeights: Record<string, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

// Pre-built text styles
export const textStyles: Record<string, TextStyle> = {
  // Display - for huge alarm times
  displayLarge: {
    fontSize: fontSizes['6xl'],
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes['6xl'] * lineHeights.tight,
    letterSpacing: -2,
  },
  displayMedium: {
    fontSize: fontSizes['5xl'],
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes['5xl'] * lineHeights.tight,
    letterSpacing: -1.5,
  },
  displaySmall: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes['4xl'] * lineHeights.tight,
    letterSpacing: -1,
  },

  // Headlines
  h1: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes['3xl'] * lineHeights.tight,
  },
  h2: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes['2xl'] * lineHeights.normal,
  },
  h3: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.xl * lineHeights.normal,
  },
  h4: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.lg * lineHeights.normal,
  },

  // Body text
  bodyLarge: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.md * lineHeights.relaxed,
  },
  bodyMedium: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.base * lineHeights.relaxed,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.sm * lineHeights.relaxed,
  },

  // Labels
  labelLarge: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.base * lineHeights.normal,
  },
  labelMedium: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.sm * lineHeights.normal,
  },
  labelSmall: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.xs * lineHeights.normal,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Arabic text styles
  arabicLarge: {
    fontSize: fontSizes.arabic.xl,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.arabic.xl * lineHeights.arabic,
    textAlign: 'center',
  },
  arabicMedium: {
    fontSize: fontSizes.arabic.lg,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.arabic.lg * lineHeights.arabic,
    textAlign: 'center',
  },
  arabicSmall: {
    fontSize: fontSizes.arabic.base,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.arabic.base * lineHeights.arabic,
    textAlign: 'center',
  },

  // Transliteration
  transliteration: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.md * lineHeights.relaxed,
    fontStyle: 'italic',
    textAlign: 'center',
  },

  // Translation
  translation: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.sm * lineHeights.relaxed,
    textAlign: 'center',
  },

  // Button text
  buttonLarge: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.md * lineHeights.tight,
    textAlign: 'center',
  },
  buttonMedium: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.base * lineHeights.tight,
    textAlign: 'center',
  },
  buttonSmall: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.sm * lineHeights.tight,
    textAlign: 'center',
  },
};

export type FontSize = keyof typeof fontSizes;
export type TextStyleName = keyof typeof textStyles;
