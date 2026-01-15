/**
 * Button component with variants for MarjanAlarm
 *
 * Variants:
 * - primary: Main action button (teal)
 * - secondary: Outlined button
 * - ghost: Text-only button
 * - danger: Destructive action
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/colors';
import { textStyles } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.base, styles[size]];

    if (fullWidth) {
      baseStyles.push(styles.fullWidth);
    }

    switch (variant) {
      case 'primary':
        baseStyles.push(styles.primary);
        if (disabled) baseStyles.push(styles.primaryDisabled);
        break;
      case 'secondary':
        baseStyles.push(styles.secondary);
        if (disabled) baseStyles.push(styles.secondaryDisabled);
        break;
      case 'ghost':
        baseStyles.push(styles.ghost);
        break;
      case 'danger':
        baseStyles.push(styles.danger);
        if (disabled) baseStyles.push(styles.dangerDisabled);
        break;
    }

    return baseStyles;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyles: TextStyle[] = [styles.text, styles[`${size}Text`]];

    switch (variant) {
      case 'primary':
        baseStyles.push(styles.primaryText);
        break;
      case 'secondary':
        baseStyles.push(styles.secondaryText);
        break;
      case 'ghost':
        baseStyles.push(styles.ghostText);
        break;
      case 'danger':
        baseStyles.push(styles.dangerText);
        break;
    }

    if (disabled) {
      baseStyles.push(styles.disabledText);
    }

    return baseStyles;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.text.inverse : colors.accent.primary}
          size="small"
        />
      ) : (
        <>
          {icon && icon}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  fullWidth: {
    width: '100%',
  },

  // Sizes
  sm: {
    height: 36,
    paddingHorizontal: spacing.md,
  },
  md: {
    height: 48,
    paddingHorizontal: spacing.lg,
  },
  lg: {
    height: 56,
    paddingHorizontal: spacing.xl,
  },

  // Variants
  primary: {
    backgroundColor: colors.button.primary,
  },
  primaryDisabled: {
    backgroundColor: colors.button.disabled,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  secondaryDisabled: {
    borderColor: colors.button.disabled,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.button.danger,
  },
  dangerDisabled: {
    backgroundColor: colors.button.disabled,
  },

  // Text
  text: {
    ...textStyles.buttonMedium,
  },
  smText: {
    ...textStyles.buttonSmall,
  },
  mdText: {
    ...textStyles.buttonMedium,
  },
  lgText: {
    ...textStyles.buttonLarge,
  },
  primaryText: {
    color: colors.text.inverse,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  ghostText: {
    color: colors.accent.primary,
  },
  dangerText: {
    color: colors.text.primary,
  },
  disabledText: {
    color: colors.text.tertiary,
  },
});
