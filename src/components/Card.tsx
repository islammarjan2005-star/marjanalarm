/**
 * Card component for MarjanAlarm
 *
 * Used for alarm cards, dua cards, and other content containers
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius, shadows } from '../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'highlight';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  onPress,
  style,
}) => {
  const getCardStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.base];

    switch (variant) {
      case 'elevated':
        baseStyles.push(styles.elevated);
        break;
      case 'outlined':
        baseStyles.push(styles.outlined);
        break;
      case 'highlight':
        baseStyles.push(styles.highlight);
        break;
      default:
        baseStyles.push(styles.default);
    }

    switch (padding) {
      case 'sm':
        baseStyles.push(styles.paddingSm);
        break;
      case 'md':
        baseStyles.push(styles.paddingMd);
        break;
      case 'lg':
        baseStyles.push(styles.paddingLg);
        break;
      case 'none':
        break;
    }

    return baseStyles;
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[...getCardStyle(), style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[...getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: colors.surface.primary,
  },
  elevated: {
    backgroundColor: colors.surface.elevated,
    ...shadows.md,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  highlight: {
    backgroundColor: colors.surface.primary,
    borderWidth: 1,
    borderColor: colors.accent.primary,
  },
  paddingSm: {
    padding: spacing.sm,
  },
  paddingMd: {
    padding: spacing.md,
  },
  paddingLg: {
    padding: spacing.lg,
  },
});
