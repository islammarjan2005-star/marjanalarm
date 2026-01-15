/**
 * Spacing system for MarjanAlarm
 *
 * Uses an 8-point grid system for consistency
 */

export const spacing = {
  // Base unit: 4px
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
  '6xl': 96,
};

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// Shadows (subtle, not aggressive)
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  // Glow effect for accent elements
  glow: {
    shadowColor: '#14B8A6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Layout constants
export const layout = {
  screenPadding: spacing.lg,
  cardPadding: spacing.md,
  sectionGap: spacing.xl,
  itemGap: spacing.md,
  buttonHeight: {
    sm: 36,
    md: 48,
    lg: 56,
  },
  inputHeight: 48,
  iconSize: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
};

export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
