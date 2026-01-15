/**
 * ProgressDots component for showing dua completion progress
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface ProgressDotsProps {
  total: number;
  completed: number;
  current?: number;
  style?: ViewStyle;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({
  total,
  completed,
  current,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: total }).map((_, index) => {
        const isCompleted = index < completed;
        const isCurrent = index === current;

        return (
          <View
            key={index}
            style={[
              styles.dot,
              isCompleted && styles.dotCompleted,
              isCurrent && styles.dotCurrent,
              !isCompleted && !isCurrent && styles.dotEmpty,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotCompleted: {
    backgroundColor: colors.progress.completed,
  },
  dotCurrent: {
    backgroundColor: colors.accent.light,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotEmpty: {
    backgroundColor: colors.progress.empty,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
});
