/**
 * VoiceIndicator component for showing mic/voice status
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { textStyles } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import { VoiceStatus } from '../types';

interface VoiceIndicatorProps {
  status: VoiceStatus;
  message?: string;
  style?: ViewStyle;
}

const statusConfig: Record<VoiceStatus, { color: string; icon: string; defaultMessage: string }> = {
  idle: {
    color: colors.text.tertiary,
    icon: '🎤',
    defaultMessage: 'Tap to start reciting',
  },
  listening: {
    color: colors.voice.listening,
    icon: '🎤',
    defaultMessage: 'Listening... recite aloud at your normal pace.',
  },
  detected: {
    color: colors.voice.detected,
    icon: '✓',
    defaultMessage: 'Voice detected',
  },
  not_detected: {
    color: colors.voice.notDetected,
    icon: '🎤',
    defaultMessage: "We didn't catch that. Try a bit louder or clearer.",
  },
  completed: {
    color: colors.voice.detected,
    icon: '✓',
    defaultMessage: 'Completed!',
  },
  error: {
    color: colors.status.error,
    icon: '⚠',
    defaultMessage: 'Something went wrong. Please try again.',
  },
};

export const VoiceIndicator: React.FC<VoiceIndicatorProps> = ({
  status,
  message,
  style,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const config = statusConfig[status];

  useEffect(() => {
    if (status === 'listening') {
      // Pulsing animation when listening
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [status, pulseAnim]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.indicatorRow}>
        <Animated.View
          style={[
            styles.iconContainer,
            { backgroundColor: config.color },
            status === 'listening' && {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <Text style={styles.icon}>{config.icon}</Text>
        </Animated.View>

        {status === 'listening' && (
          <View style={styles.waveformContainer}>
            {[0, 1, 2, 3, 4].map((i) => (
              <WaveBar key={i} delay={i * 100} />
            ))}
          </View>
        )}
      </View>

      <Text style={[styles.message, { color: config.color }]}>
        {message || config.defaultMessage}
      </Text>
    </View>
  );
};

// Animated wave bar for listening state
const WaveBar: React.FC<{ delay: number }> = ({ delay }) => {
  const heightAnim = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(heightAnim, {
          toValue: 24,
          duration: 300,
          delay,
          useNativeDriver: false,
        }),
        Animated.timing(heightAnim, {
          toValue: 8,
          duration: 300,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [heightAnim, delay]);

  return (
    <Animated.View
      style={[
        styles.waveBar,
        { height: heightAnim },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 32,
  },
  waveBar: {
    width: 4,
    backgroundColor: colors.voice.listening,
    borderRadius: 2,
  },
  message: {
    ...textStyles.bodySmall,
    textAlign: 'center',
    maxWidth: 280,
  },
});
